import { useState, useEffect } from 'react'
import { LanguageProvider } from './context/LanguageContext'
import { AccessibilityProvider } from './context/AccessibilityContext'
import { ToastProvider, useToast } from './components/ui/Toast'
import Header from './components/Header'
import CategoryNav from './components/CategoryNav'
import ProductList from './components/ProductList'
import TourismSection from './components/TourismSection'
import LoadingScreen from './components/LoadingScreen'
import ScrollToTop from './components/ScrollToTop'
import AccessibilityControls from './components/AccessibilityControls'
import { menuService } from './services/menuService'
import { RefreshCw, WifiOff, Anchor, MapPin, Clock, Instagram, Facebook, Waves, Bell, Ship } from 'lucide-react'

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
      <div className="min-h-screen bg-gradient-to-b from-sand-50 via-white to-ocean-50">
        
        {/* Botón Llamar Garzón - Diseño costero mejorado */}
        <div className="fixed top-0 left-0 right-0 z-50">
          <button
            onClick={callWaiter}
            disabled={callingWaiter}
            className={`
              w-full py-3.5 px-4 flex items-center justify-center gap-3
              bg-gradient-to-r from-sunset-500 via-sunset-600 to-sunset-500 
              text-white font-bold text-base
              shadow-lg shadow-sunset-500/30
              transition-all duration-300
              ${callingWaiter 
                ? 'opacity-80 cursor-not-allowed' 
                : 'hover:from-sunset-600 hover:via-sunset-700 hover:to-sunset-600 active:scale-[0.99]'}
            `}
            style={{
              backgroundSize: '200% 100%',
              animation: callingWaiter ? 'none' : 'shimmer 3s linear infinite'
            }}
          >
            <Bell className={`w-5 h-5 ${callingWaiter ? 'animate-pulse' : 'animate-bounce'}`} />
            <span className="drop-shadow-sm">
              {callingWaiter 
                ? (language === 'es' ? '🏃 ¡Garzón en camino!' : '🏃 Waiter on the way!')
                : (language === 'es' ? '🔔 Llamar Garzón' : '🔔 Call Waiter')}
            </span>
            {!callingWaiter && (
              <span className="hidden sm:inline text-sunset-200 text-sm font-normal">
                {language === 'es' ? '- ¡Estoy listo para pedir!' : '- Ready to order!'}
              </span>
            )}
          </button>
        </div>

        {/* Spacer para el botón fijo */}
        <div className="h-[52px]" />

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

        {/* Sección de Turismo - Playas de Caldera */}
        <TourismSection language={language} />

        {/* Footer Costero - Identidad El Macho Caldera */}
        <footer className="relative mt-8 overflow-hidden">
          {/* Wave top decoration - más elaborada */}
          <div className="absolute top-0 left-0 right-0 overflow-hidden">
            <svg viewBox="0 0 1200 80" preserveAspectRatio="none" className="w-full h-12">
              <path d="M0,80 C150,40 350,60 500,45 C650,30 800,55 950,40 C1100,25 1150,50 1200,35 L1200,80 L0,80 Z" fill="#164e63" fillOpacity="0.5"/>
              <path d="M0,80 C200,50 400,65 600,50 C800,35 1000,60 1200,45 L1200,80 L0,80 Z" fill="#164e63"/>
            </svg>
          </div>
          
          <div className="bg-gradient-to-b from-ocean-900 via-ocean-950 to-driftwood-900 pt-16 pb-8 px-6">
            {/* Fondo de red de pesca */}
            <div className="absolute inset-0 opacity-[0.03]" style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 30h60M30 0v60' stroke='%23ffffff' stroke-width='1' fill='none'/%3E%3C/svg%3E")`,
              backgroundSize: '30px 30px'
            }} />

            {/* Main Footer Content */}
            <div className="relative z-10 max-w-md mx-auto">
              {/* Logo area */}
              <div className="text-center mb-6">
                <div className="inline-flex items-center justify-center w-18 h-18 bg-gradient-to-br from-sunset-400 to-sunset-600 rounded-2xl shadow-lg shadow-sunset-500/30 mb-3 p-4">
                  <Anchor className="w-10 h-10 text-white" />
                </div>
                <h3 className="font-display text-3xl font-black text-white mb-1">
                  El Macho
                </h3>
                <p className="text-ocean-300 text-sm font-medium tracking-wide">
                  {language === 'es' ? 'Productos del Mar' : 'Seafood Restaurant'}
                </p>
              </div>

              {/* Tagline destacado */}
              <div className="text-center mb-6">
                <div className="inline-flex items-center gap-3 px-5 py-2.5 bg-gradient-to-r from-sunset-500/20 to-sunset-600/20 rounded-full border border-sunset-500/30">
                  <span className="text-xl">💪</span>
                  <span className="text-sunset-300 font-bold">
                    {language === 'es' ? '¡Porciones de Macho!' : 'Macho Size Portions!'}
                  </span>
                  <span className="text-xl">💪</span>
                </div>
              </div>

              {/* Contact Info - Estilo náutico */}
              <div className="space-y-3 mb-6">
                {/* Location */}
                <a 
                  href="https://maps.google.com/?q=Caldera,Chile" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-3 bg-white/5 hover:bg-white/10 rounded-xl transition-colors border border-white/5"
                >
                  <div className="w-11 h-11 bg-ocean-500/20 rounded-xl flex items-center justify-center">
                    <MapPin className="w-5 h-5 text-ocean-400" />
                  </div>
                  <div>
                    <p className="text-white font-semibold text-sm">Caldera, Atacama</p>
                    <p className="text-ocean-400 text-xs flex items-center gap-1">
                      <Ship className="w-3 h-3" />
                      {language === 'es' ? 'Frente al mar • lll Región de Chile' : 'Oceanfront • Atacama Region, Chile'}
                    </p>
                  </div>
                </a>

                {/* Hours */}
                <div className="flex items-center gap-3 p-3 bg-white/5 rounded-xl border border-white/5">
                  <div className="w-11 h-11 bg-sunset-500/20 rounded-xl flex items-center justify-center">
                    <Clock className="w-5 h-5 text-sunset-400" />
                  </div>
                  <div>
                    <p className="text-white font-semibold text-sm">
                      {language === 'es' ? 'Lunes a Domingo' : 'Monday to Sunday'}
                    </p>
                    <p className="text-sand-400 text-xs">12:00 - 22:00 hrs</p>
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

              {/* Divider con ola */}
              <div className="flex items-center gap-3 mb-4">
                <div className="flex-1 h-px bg-gradient-to-r from-transparent via-ocean-700 to-transparent" />
                <Waves className="w-5 h-5 text-ocean-600" />
                <div className="flex-1 h-px bg-gradient-to-r from-transparent via-ocean-700 to-transparent" />
              </div>

              {/* Decoración mariscos */}
              <div className="flex justify-center gap-3 mb-4 opacity-60">
                <span className="text-lg">🦐</span>
                <span className="text-lg">🦀</span>
                <span className="text-lg">🐟</span>
                <span className="text-lg">🦑</span>
                <span className="text-lg">🦞</span>
              </div>

              {/* Copyright */}
              <div className="text-center">
                <p className="text-ocean-600 text-xs">
                  © 2025 El Macho - Productos del Mar
                </p>
                <p className="text-ocean-700 text-xs mt-1">
                  {language === 'es' 
                    ? 'Hecho con ❤️ en Caldera, Chile 🇨🇱'
                    : 'Made with ❤️ in Caldera, Chile 🇨🇱'}
                </p>
              </div>
            </div>
          </div>

          {/* Safe area for iOS */}
          <div className="bg-driftwood-900 h-safe-area-inset-bottom" />
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
