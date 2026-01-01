import { Anchor, Compass, Waves } from 'lucide-react'

export default function LoadingScreen() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-cyan-900 flex flex-col items-center justify-center p-4 relative overflow-hidden">
      
      {/* Animated waves background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Wave layers */}
        <div className="absolute bottom-0 left-0 right-0 h-48 opacity-10">
          <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="w-full h-full animate-wave">
            <path d="M0,60 C150,120 350,0 600,60 C850,120 1050,0 1200,60 L1200,120 L0,120 Z" fill="currentColor" className="text-cyan-400"/>
          </svg>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-32 opacity-15" style={{ animationDelay: '0.5s' }}>
          <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="w-full h-full animate-wave">
            <path d="M0,80 C200,20 400,100 600,50 C800,0 1000,80 1200,40 L1200,120 L0,120 Z" fill="currentColor" className="text-blue-400"/>
          </svg>
        </div>
      </div>

      {/* Rosa de los vientos de fondo - slow rotation */}
      <div className="absolute inset-0 flex items-center justify-center opacity-[0.03]">
        <Compass 
          className="w-[600px] h-[600px] text-white" 
          style={{ animation: 'spin 60s linear infinite' }} 
        />
      </div>

      {/* Stars/bubbles decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full opacity-30"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `twinkle ${2 + Math.random() * 3}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 2}s`
            }}
          />
        ))}
      </div>

      {/* Main Logo Container */}
      <div className="relative mb-10 z-10">
        {/* Glow effect */}
        <div className="absolute inset-0 w-28 h-28 bg-cyan-500/30 rounded-full blur-2xl animate-pulse" />
        
        {/* Main circle with anchor */}
        <div className="relative w-28 h-28 bg-gradient-to-br from-cyan-400 via-cyan-500 to-blue-600 rounded-full flex items-center justify-center shadow-2xl shadow-cyan-500/40">
          <Anchor className="w-14 h-14 text-white drop-shadow-lg" strokeWidth={1.5} />
        </div>
        
        {/* Rotating ring */}
        <div 
          className="absolute -inset-3 border-2 border-cyan-400/30 rounded-full"
          style={{ animation: 'spin 10s linear infinite' }}
        />
        
        {/* Outer ripples */}
        <div 
          className="absolute -inset-4 border border-cyan-400/20 rounded-full animate-ping"
          style={{ animationDuration: '2s' }}
        />
        <div 
          className="absolute -inset-6 border border-cyan-400/10 rounded-full animate-ping"
          style={{ animationDuration: '2.5s', animationDelay: '0.5s' }}
        />
      </div>

      {/* Restaurant Name with coastal flair */}
      <div className="text-center z-10 mb-2">
        <h1 className="font-display text-5xl font-black tracking-tight">
          <span className="bg-gradient-to-r from-cyan-300 via-white to-cyan-300 bg-clip-text text-transparent drop-shadow-lg">
            El Macho
          </span>
        </h1>
      </div>

      {/* Tagline */}
      <div className="flex items-center gap-2 mb-8 z-10">
        <Waves className="w-4 h-4 text-cyan-400" />
        <p className="text-cyan-200 text-lg font-medium tracking-wide">
          Productos del Mar
        </p>
        <Waves className="w-4 h-4 text-cyan-400" />
      </div>

      {/* Loading indicator */}
      <div className="flex flex-col items-center gap-4 z-10">
        {/* Loading bar */}
        <div className="w-48 h-1.5 bg-slate-700 rounded-full overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full"
            style={{
              animation: 'loading 1.5s ease-in-out infinite'
            }}
          />
        </div>
        
        {/* Loading text with animated dots */}
        <div className="flex items-center gap-2 text-white/80">
          <span className="text-sm font-medium">Cargando carta</span>
          <div className="flex gap-1">
            <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
            <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
            <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
          </div>
        </div>
      </div>

      {/* Seafood decorative footer */}
      <div className="absolute bottom-8 flex items-center gap-6 opacity-50 z-10">
        <span className="text-3xl animate-wave" style={{ animationDelay: '0s' }}>🦐</span>
        <span className="text-3xl animate-wave" style={{ animationDelay: '0.2s' }}>🦀</span>
        <span className="text-3xl animate-wave" style={{ animationDelay: '0.4s' }}>🐟</span>
        <span className="text-3xl animate-wave" style={{ animationDelay: '0.6s' }}>��</span>
        <span className="text-3xl animate-wave" style={{ animationDelay: '0.8s' }}>🦞</span>
      </div>

      {/* Location badge */}
      <div className="absolute bottom-4 text-center z-10">
        <p className="text-xs text-cyan-400/60 font-medium tracking-wider">
          📍 CALDERA, CHILE
        </p>
      </div>

      {/* Custom animations */}
      <style>{`
        @keyframes loading {
          0% { transform: translateX(-100%); }
          50% { transform: translateX(0); }
          100% { transform: translateX(100%); }
        }
        @keyframes twinkle {
          0%, 100% { opacity: 0.3; transform: scale(1); }
          50% { opacity: 0.8; transform: scale(1.5); }
        }
      `}</style>
    </div>
  )
}
