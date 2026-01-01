import { useState, useEffect } from 'react'
import { LanguageProvider } from './context/LanguageContext'
import { AccessibilityProvider } from './context/AccessibilityContext'
import { ToastProvider, useToast } from './components/ui/Toast'
import Header from './components/Header'
import CategoryNav from './components/CategoryNav'
import ProductList from './components/ProductList'
import LoadingScreen from './components/LoadingScreen'
import ScrollToTop from './components/ScrollToTop'
import AccessibilityControls from './components/AccessibilityControls'
import { menuService } from './services/menuService'
import { RefreshCw, WifiOff, Anchor, MapPin, Clock, Instagram, Facebook, Waves, Bell } from 'lucide-react'

// Componente interno que usa el Toast
function AppContent() {
  const [menu, setMenu] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [activeCategory, setActiveCategory] = useState(null)
  const [language, setLanguage] = useState('es')
  const [callingWaiter, setCallingWaiter] = useState(false)
  const [lastUpdate, setLastUpdate] = useState(null)
  const { addToast } = useToast()

  // Cargar menú inicial
  useEffect(() => {
    loadMenu()
  }, [language])

  // Auto-refresh cada 30 segundos (silencioso, sin loading)
  useEffect(() => {
    const intervalId = setInterval(() => {
      refreshMenuSilently()
    }, 30000) // 30 segundos

    return () => clearInterval(intervalId)
  }, [language])

  // Refresh cuando la pestaña vuelve a estar visible
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        refreshMenuSilently()
      }
    }
    document.addEventListener('visibilitychange', handleVisibilityChange)
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange)
  }, [language])

  const loadMenu = async () => {
    try {
      setLoading(true)
      setError(null)
      const data = await menuService.getFullMenu(language)
      setMenu(data)
      setLastUpdate(new Date())
      if (data.categories && data.categories.length > 0 && !activeCategory) {
        setActiveCategory(data.categories[0].code)
      }
    } catch (err) {
      setError(err.message)
      console.error('Error loading menu:', err)
    } finally {
      setLoading(false)
    }
  }

  // Refresh silencioso sin mostrar loading
  const refreshMenuSilently = async () => {
    try {
      const data = await menuService.getFullMenu(language)
      setMenu(data)
      setLastUpdate(new Date())
      console.log('Menu refreshed silently at', new Date().toLocaleTimeString())
    } catch (err) {
      console.warn('Silent refresh failed:', err)
      // No mostrar error al usuario para no interrumpir
    }
  }

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'es' ? 'en' : 'es')
  }

  // Función para llamar al garzón
  const callWaiter = async () => {
    if (callingWaiter) return
    
    setCallingWaiter(true)
    try {
      const response = await fetch('/api/v1/waiter/call', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
      })
      
      if (response.ok) {
        addToast(
          language === 'es' 
            ? '¡Garzón notificado! Ya viene en camino 🏃' 
            : 'Waiter notified! Coming your way 🏃',
          'success'
        )
        // Haptic feedback
        if (navigator.vibrate) {
          navigator.vibrate([100, 50, 100])
        }
      } else {
        throw new Error('Error calling waiter')
      }
    } catch (err) {
      console.error('Error calling waiter:', err)
      addToast(
        language === 'es' 
          ? 'Error al llamar al garzón. Intenta de nuevo.' 
          : 'Error calling waiter. Try again.',
        'error'
      )
    } finally {
      setTimeout(() => setCallingWaiter(false), 3000) // Cooldown de 3 segundos
    }
  }

  if (loading) {
    return <LoadingScreen />
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-800 to-slate-900 flex items-center justify-center p-4">
        <div className="text-center max-w-sm">
          <div className="w-24 h-24 mx-auto mb-6 bg-red-500/20 rounded-full flex items-center justify-center">
            <WifiOff className="w-12 h-12 text-red-400" />
          </div>
          <h2 className="text-2xl font-bold text-white mb-3">
            {language === 'es' ? 'Sin conexión' : 'No connection'}
          </h2>
          <p className="text-gray-400 mb-8 leading-relaxed">
            {language === 'es' 
              ? 'No pudimos cargar la carta. Verifica tu conexión a internet e intenta nuevamente.'
              : 'We couldn\'t load the menu. Check your internet connection and try again.'}
          </p>
          <button 
            onClick={loadMenu}
            className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-2xl font-bold text-lg shadow-lg shadow-cyan-500/30 hover:shadow-xl active:scale-95 transition-all duration-200"
          >
            <RefreshCw className="w-5 h-5" />
            {language === 'es' ? 'Reintentar' : 'Retry'}
          </button>
        </div>
      </div>
    )
  }

  const currentCategory = menu?.categories?.find(c => c.code === activeCategory)

  return (
    <LanguageProvider value={{ language, setLanguage }}>
      <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-100">
        
        {/* Botón Llamar Garzón - Fijo en la parte superior */}
        <div className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-amber-500 to-orange-500 shadow-lg">
          <button
            onClick={callWaiter}
            disabled={callingWaiter}
            className={`
              w-full py-3 px-4 flex items-center justify-center gap-3
              text-white font-bold text-base
              transition-all duration-300
              ${callingWaiter 
                ? 'opacity-70 cursor-not-allowed' 
                : 'hover:from-amber-600 hover:to-orange-600 active:scale-[0.98]'}
            `}
          >
            <Bell className={`w-5 h-5 ${callingWaiter ? 'animate-pulse' : 'animate-bounce'}`} />
            <span>
              {callingWaiter 
                ? (language === 'es' ? '¡Garzón en camino!' : 'Waiter on the way!')
                : (language === 'es' ? '🔔 Llamar Garzón - ¡Estoy listo para pedir!' : '🔔 Call Waiter - Ready to order!')}
            </span>
          </button>
        </div>

        {/* Spacer para el botón fijo */}
        <div className="h-12" />

        {/* Header con selector de idioma integrado */}
        <Header 
          restaurantName={menu?.restaurantName} 
          slogan={menu?.slogan}
          language={language}
          onLanguageChange={toggleLanguage}
        />

        {/* Category Navigation - Sticky */}
        <CategoryNav 
          categories={menu?.categories || []}
          activeCategory={activeCategory}
          onCategoryChange={setActiveCategory}
        />

        {/* Products List */}
        <ProductList 
          category={currentCategory}
          language={language}
        />

        {/* Footer Costero - Identidad El Macho */}
        <footer className="relative mt-12 overflow-hidden">
          {/* Wave top decoration */}
          <div className="absolute top-0 left-0 right-0 overflow-hidden">
            <svg viewBox="0 0 1200 60" preserveAspectRatio="none" className="w-full h-8 text-slate-800">
              <path d="M0,60 C200,20 400,40 600,30 C800,20 1000,50 1200,35 L1200,60 L0,60 Z" fill="currentColor"/>
            </svg>
          </div>
          
          <div className="bg-gradient-to-b from-slate-800 to-slate-900 pt-12 pb-8 px-6">
            {/* Compass background decoration */}
            <div className="absolute inset-0 flex items-center justify-center opacity-[0.02] pointer-events-none">
              <Anchor className="w-96 h-96 text-white" />
            </div>

            {/* Main Footer Content */}
            <div className="relative z-10 max-w-md mx-auto">
              {/* Logo area */}
              <div className="text-center mb-6">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-2xl shadow-lg shadow-cyan-500/30 mb-3">
                  <Anchor className="w-8 h-8 text-white" />
                </div>
                <h3 className="font-display text-2xl font-bold text-white mb-1">
                  El Macho
                </h3>
                <p className="text-cyan-400 text-sm font-medium">
                  Productos del Mar
                </p>
              </div>

              {/* Contact Info */}
              <div className="space-y-3 mb-6">
                {/* Location */}
                <a 
                  href="https://maps.google.com/?q=Caldera,Chile" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-3 bg-white/5 hover:bg-white/10 rounded-xl transition-colors"
                >
                  <div className="w-10 h-10 bg-cyan-500/20 rounded-full flex items-center justify-center">
                    <MapPin className="w-5 h-5 text-cyan-400" />
                  </div>
                  <div>
                    <p className="text-white font-medium text-sm">Caldera, Chile</p>
                    <p className="text-gray-400 text-xs">
                      {language === 'es' ? 'Costa del Pacífico' : 'Pacific Coast'}
                    </p>
                  </div>
                </a>

                {/* Hours */}
                <div className="flex items-center gap-3 p-3 bg-white/5 rounded-xl">
                  <div className="w-10 h-10 bg-amber-500/20 rounded-full flex items-center justify-center">
                    <Clock className="w-5 h-5 text-amber-400" />
                  </div>
                  <div>
                    <p className="text-white font-medium text-sm">
                      {language === 'es' ? 'Lunes a Domingo' : 'Monday to Sunday'}
                    </p>
                    <p className="text-gray-400 text-xs">12:00 - 22:00</p>
                  </div>
                </div>
              </div>

              {/* Social Links */}
              <div className="flex justify-center gap-3 mb-6">
                <a 
                  href="#" 
                  className="w-12 h-12 bg-gradient-to-br from-pink-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg shadow-pink-500/20 hover:scale-105 active:scale-95 transition-transform"
                  aria-label="Instagram"
                >
                  <Instagram className="w-5 h-5 text-white" />
                </a>
                <a 
                  href="#" 
                  className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-700 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/20 hover:scale-105 active:scale-95 transition-transform"
                  aria-label="Facebook"
                >
                  <Facebook className="w-5 h-5 text-white" />
                </a>
              </div>

              {/* Tagline */}
              <div className="text-center mb-6">
                <p className="inline-flex items-center gap-2 text-amber-400 font-bold text-lg">
                  <span>💪</span>
                  {language === 'es' ? '¡Porciones de Macho!' : 'Macho Size Portions!'}
                  <span>💪</span>
                </p>
              </div>

              {/* Divider with wave */}
              <div className="flex items-center gap-3 mb-4">
                <div className="flex-1 h-px bg-gradient-to-r from-transparent via-slate-600 to-transparent" />
                <Waves className="w-5 h-5 text-slate-600" />
                <div className="flex-1 h-px bg-gradient-to-r from-transparent via-slate-600 to-transparent" />
              </div>

              {/* Copyright */}
              <div className="text-center">
                <p className="text-gray-500 text-xs">
                  © 2024 El Macho - Productos del Mar
                </p>
                <p className="text-gray-600 text-xs mt-1">
                  {language === 'es' 
                    ? 'Hecho con ❤️ en Caldera, Chile 🇨🇱'
                    : 'Made with ❤️ in Caldera, Chile 🇨🇱'}
                </p>
              </div>

              {/* Seafood decoration */}
              <div className="flex justify-center gap-4 mt-4 opacity-40">
                <span className="text-xl">🦐</span>
                <span className="text-xl">🦀</span>
                <span className="text-xl">🐟</span>
                <span className="text-xl">🦑</span>
                <span className="text-xl">🦞</span>
              </div>
            </div>
          </div>

          {/* Safe area for iOS */}
          <div className="bg-slate-900 h-safe-area-inset-bottom" />
        </footer>

        {/* Floating Controls */}
        <ScrollToTop />
        <AccessibilityControls />
      </div>
    </LanguageProvider>
  )
}

function App() {
  return (
    <AccessibilityProvider>
      <ToastProvider>
        <AppContent />
      </ToastProvider>
    </AccessibilityProvider>
  )
}

export default App
