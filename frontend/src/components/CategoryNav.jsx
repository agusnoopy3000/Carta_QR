import { useRef, useEffect } from 'react'
import { 
  UtensilsCrossed, 
  Fish, 
  Wine, 
  GlassWater, 
  Baby,
  Shell,
  Anchor
} from 'lucide-react'

// Iconos personalizados por categoría + emojis de respaldo
const categoryConfig = {
  MENU: { icon: Shell, emoji: '🦪', color: 'from-cyan-500 to-blue-600' },
  PESCADOS: { icon: Fish, emoji: '🐟', color: 'from-blue-500 to-indigo-600' },
  BAR: { icon: Wine, emoji: '🍹', color: 'from-purple-500 to-pink-600' },
  BEBESTIBLES: { icon: GlassWater, emoji: '🥤', color: 'from-green-500 to-teal-600' },
  MENU_NINO: { icon: Baby, emoji: '👶', color: 'from-orange-400 to-amber-500' }
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
    <nav className="sticky top-12 z-40 bg-white/95 backdrop-blur-md shadow-lg shadow-gray-100/50 border-b border-gray-100">
      <div 
        ref={scrollRef}
        className="flex gap-2 px-3 py-2.5 overflow-x-auto scrollbar-hide"
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
                flex items-center gap-1.5 px-3 py-2 rounded-lg font-medium text-xs whitespace-nowrap
                transition-all duration-200 transform active:scale-95 flex-shrink-0
                ${isActive 
                  ? `bg-gradient-to-r ${config.color} text-white shadow-md` 
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}
              `}
              style={isActive ? { boxShadow: '0 3px 10px rgba(0,0,0,0.12)' } : {}}
            >
              {/* Emoji o icono */}
              <span className="text-base">{category.iconUrl || config.emoji}</span>
              
              <span className="font-semibold">{category.name}</span>
              
              {/* Badge con número de productos */}
              {category.productCount > 0 && (
                <span className={`
                  text-[10px] px-1.5 py-0.5 rounded-full font-bold
                  ${isActive ? 'bg-white/25 text-white' : 'bg-gray-200 text-gray-600'}
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
