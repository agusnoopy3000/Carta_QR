import { Anchor, Compass } from 'lucide-react'

export default function Header({ restaurantName, slogan, language, onLanguageChange }) {
  return (
    <header className="relative overflow-hidden bg-gradient-to-br from-slate-800 via-slate-700 to-slate-900 text-white">
      {/* Rosa de los vientos de fondo (inspirada en la carta física) */}
      <div className="absolute inset-0 flex items-center justify-center opacity-10">
        <Compass className="w-96 h-96 text-white" strokeWidth={0.5} />
      </div>
      
      {/* Patrón de olas decorativo */}
      <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-slate-900/50 to-transparent" />
      
      <div className="relative z-10 pt-8 pb-10 px-4">
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
          {/* Logo con ancla */}
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-cyan-400 to-blue-600 rounded-full mb-4 shadow-lg shadow-cyan-500/30 border-4 border-white/20">
            <Anchor className="w-10 h-10 text-white" strokeWidth={2.5} />
          </div>
          
          {/* Nombre del restaurante */}
          <h1 className="font-display text-4xl font-extrabold mb-2 tracking-tight">
            <span className="bg-gradient-to-r from-cyan-300 via-white to-cyan-300 bg-clip-text text-transparent">
              {restaurantName || 'El Macho'}
            </span>
          </h1>
          
          {/* Slogan */}
          <p className="text-cyan-200 text-base font-medium mb-4 tracking-wide">
            {language === 'es' ? 'Productos del Mar' : 'Seafood Restaurant'}
          </p>
          
          {/* Badge de porciones */}
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full shadow-lg shadow-orange-500/30">
            <span className="text-xl">💪</span>
            <span className="font-bold text-sm tracking-wide">
              {language === 'es' ? '¡PORCIONES DE MACHO!' : 'MACHO SIZE PORTIONS!'}
            </span>
          </div>
        </div>
      </div>
      
      {/* Ola decorativa inferior */}
      <svg className="absolute bottom-0 left-0 right-0" viewBox="0 0 1440 60" fill="none">
        <path d="M0 60L60 55C120 50 240 40 360 35C480 30 600 30 720 33.3C840 36.7 960 43.3 1080 45C1200 46.7 1320 43.3 1380 41.7L1440 40V60H1380C1320 60 1200 60 1080 60C960 60 840 60 720 60C600 60 480 60 360 60C240 60 120 60 60 60H0Z" fill="#f8fafc"/>
      </svg>
    </header>
  )
}
