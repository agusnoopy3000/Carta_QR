import { Anchor, Compass, MapPin, Ship } from 'lucide-react'

export default function Header({ restaurantName, slogan, language, onLanguageChange }) {
  return (
    <header className="relative overflow-hidden bg-gradient-to-br from-ocean-900 via-ocean-800 to-ocean-950 text-white">
      {/* Fondo con textura de red de pesca */}
      <div className="absolute inset-0 opacity-5" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 30h60M30 0v60' stroke='%23ffffff' stroke-width='1' fill='none'/%3E%3C/svg%3E")`,
        backgroundSize: '30px 30px'
      }} />
      
      {/* Rosa de los vientos de fondo */}
      <div className="absolute inset-0 flex items-center justify-center opacity-[0.07]">
        <Compass className="w-[500px] h-[500px] text-white" strokeWidth={0.3} />
      </div>

      {/* Gaviotas decorativas */}
      <div className="absolute top-6 left-8 opacity-20 animate-float">
        <svg width="40" height="20" viewBox="0 0 40 20" fill="currentColor">
          <path d="M20 10 C15 5, 5 8, 0 3 M20 10 C25 5, 35 8, 40 3" stroke="white" strokeWidth="2" fill="none"/>
        </svg>
      </div>
      <div className="absolute top-10 right-12 opacity-15 animate-float" style={{ animationDelay: '1s' }}>
        <svg width="30" height="15" viewBox="0 0 40 20" fill="currentColor">
          <path d="M20 10 C15 5, 5 8, 0 3 M20 10 C25 5, 35 8, 40 3" stroke="white" strokeWidth="2" fill="none"/>
        </svg>
      </div>
      
      <div className="relative z-10 pt-6 pb-12 px-4">
        {/* Selector de idioma */}
        <div className="absolute top-4 right-4">
          <button
            onClick={onLanguageChange}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-white/10 hover:bg-white/20 rounded-full text-sm font-medium transition-all duration-200 backdrop-blur-sm border border-white/20"
          >
            <span className="text-lg">{language === 'es' ? '🇨🇱' : '🇺🇸'}</span>
            <span>{language === 'es' ? 'ES' : 'EN'}</span>
          </button>
        </div>

        <div className="max-w-lg mx-auto text-center">
          {/* Logo con ancla - más grande y destacado */}
          <div className="relative inline-flex items-center justify-center w-24 h-24 mb-4">
            {/* Círculo exterior con gradiente */}
            <div className="absolute inset-0 bg-gradient-to-br from-sunset-400 via-sunset-500 to-sunset-600 rounded-full shadow-sunset" />
            {/* Borde decorativo */}
            <div className="absolute inset-1 border-2 border-white/30 rounded-full" />
            {/* Icono */}
            <Anchor className="relative w-12 h-12 text-white drop-shadow-lg" strokeWidth={2.5} />
          </div>
          
          {/* Nombre del restaurante con estilo náutico */}
          <h1 className="font-display text-5xl font-black mb-1 tracking-tight">
            <span className="bg-gradient-to-r from-sand-200 via-white to-sand-200 bg-clip-text text-transparent drop-shadow-lg">
              {restaurantName || 'El Macho'}
            </span>
          </h1>
          
          {/* Subtítulo con ubicación */}
          <div className="flex items-center justify-center gap-2 mb-4">
            <span className="text-ocean-300 text-lg font-medium">
              {language === 'es' ? 'Productos del Mar' : 'Seafood Restaurant'}
            </span>
          </div>

          {/* Ubicación Caldera */}
          <div className="flex items-center justify-center gap-1.5 text-ocean-400 text-sm mb-5">
            <MapPin className="w-4 h-4" />
            <span>Caldera, Atacama - Chile</span>
            <span className="mx-1">•</span>
            <Ship className="w-4 h-4" />
            <span>{language === 'es' ? 'Frente al Mar' : 'Oceanfront'}</span>
          </div>
          
          {/* Badges destacados */}
          <div className="flex flex-wrap items-center justify-center gap-2">
            {/* Badge porciones */}
            <div className="inline-flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-sunset-500 to-sunset-600 rounded-full shadow-sunset">
              <span className="text-xl">💪</span>
              <span className="font-bold text-sm tracking-wide text-white">
                {language === 'es' ? '¡PORCIONES DE MACHO!' : 'MACHO SIZE!'}
              </span>
            </div>
            
            {/* Badge pescado fresco */}
            <div className="inline-flex items-center gap-2 px-3 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20">
              <span className="text-lg">🐟</span>
              <span className="font-semibold text-sm text-ocean-200">
                {language === 'es' ? 'Pescado Fresco' : 'Fresh Fish'}
              </span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Ola decorativa inferior - más elaborada */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg className="w-full" viewBox="0 0 1440 80" fill="none" preserveAspectRatio="none">
          <path d="M0 80L48 75C96 70 192 60 288 52C384 44 480 38 576 40C672 42 768 52 864 55C960 58 1056 54 1152 48C1248 42 1344 34 1392 30L1440 26V80H0Z" fill="#f0fdff" fillOpacity="0.3"/>
          <path d="M0 80L60 72C120 64 240 48 360 42C480 36 600 40 720 44C840 48 960 52 1080 50C1200 48 1320 40 1380 36L1440 32V80H0Z" fill="#fefdf8"/>
        </svg>
      </div>
    </header>
  )
}
