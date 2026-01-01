import { useRef, useEffect } from 'react'
import { 
  Fish, 
  Wine, 
  GlassWater, 
  Baby,
  Shell,
  Anchor,
  Waves
} from 'lucide-react'

// Configuración de categorías con paleta costera de Caldera
const categoryConfig = {
  MENU: { 
    icon: Shell, 
    emoji: '🦪', 
    gradient: 'from-ocean-600 to-ocean-700',
    bgLight: 'bg-ocean-50',
    textLight: 'text-ocean-700',
    shadow: 'shadow-ocean-500/25'
  },
  PESCADOS: { 
    icon: Fish, 
    emoji: '🐟', 
    gradient: 'from-ocean-500 to-ocean-600',
    bgLight: 'bg-ocean-50',
    textLight: 'text-ocean-600',
    shadow: 'shadow-ocean-500/25'
  },
  BAR: { 
    icon: Wine, 
    emoji: '🍹', 
    gradient: 'from-sunset-500 to-sunset-600',
    bgLight: 'bg-sunset-50',
    textLight: 'text-sunset-600',
    shadow: 'shadow-sunset-500/25'
  },
  BEBESTIBLES: { 
    icon: GlassWater, 
    emoji: '🥤', 
    gradient: 'from-seafoam-400 to-seafoam-500',
    bgLight: 'bg-seafoam-100',
    textLight: 'text-seafoam-600',
    shadow: 'shadow-seafoam-500/25'
  },
  MENU_NINO: { 
    icon: Baby, 
    emoji: '👶', 
    gradient: 'from-sand-400 to-sand-500',
    bgLight: 'bg-sand-100',
    textLight: 'text-sand-600',
    shadow: 'shadow-sand-500/25'
  }
}

export default function CategoryNav({ categories, activeCategory, onCategoryChange }) {
  const scrollRef = useRef(null)
  const activeRef = useRef(null)

  // Scroll to active category when it changes
  useEffect(() => {
    if (activeRef.current && scrollRef.current) {
      const container = scrollRef.current
      const activeEl = activeRef.current
      
      const containerRect = container.getBoundingClientRect()
      const activeRect = activeEl.getBoundingClientRect()
      
      const scrollLeft = activeRect.left - containerRect.left - (containerRect.width / 2) + (activeRect.width / 2)
      
      container.scrollBy({
        left: scrollLeft,
        behavior: 'smooth'
      })
    }
  }, [activeCategory])

  if (!categories || categories.length === 0) return null

  return (
    <nav className="sticky top-12 z-40 bg-sand-50/95 backdrop-blur-md shadow-lg shadow-driftwood-400/10 border-b border-sand-200">
      {/* Decoración de ola sutil */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-ocean-400 via-ocean-500 to-ocean-400 opacity-80" />
      
      <div 
        ref={scrollRef}
        className="flex gap-2 px-3 py-3 overflow-x-auto scrollbar-hide"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {categories.map((category) => {
          const config = categoryConfig[category.code] || categoryConfig.MENU
          const Icon = config.icon
          const isActive = category.code === activeCategory

          return (
            <button
              key={category.code}
              ref={isActive ? activeRef : null}
              onClick={() => onCategoryChange(category.code)}
              className={`
                flex items-center gap-2 px-4 py-2.5 rounded-xl font-semibold text-sm whitespace-nowrap
                transition-all duration-300 transform active:scale-95 flex-shrink-0
                ${isActive 
                  ? `bg-gradient-to-r ${config.gradient} text-white shadow-lg ${config.shadow}` 
                  : `${config.bgLight} ${config.textLight} hover:shadow-md border border-transparent hover:border-ocean-200`}
              `}
            >
              {/* Emoji del mar */}
              <span className={`text-lg ${isActive ? 'animate-wave' : ''}`}>
                {category.iconUrl || config.emoji}
              </span>
              
              <span>{category.name}</span>
              
              {/* Badge con número de productos */}
              {category.productCount > 0 && (
                <span className={`
                  text-[10px] px-2 py-0.5 rounded-full font-bold min-w-[20px] text-center
                  ${isActive 
                    ? 'bg-white/25 text-white' 
                    : 'bg-driftwood-200/50 text-driftwood-600'}
                `}>
                  {category.productCount}
                </span>
              )}
            </button>
          )
        })}
      </div>
    </nav>
  )
}
