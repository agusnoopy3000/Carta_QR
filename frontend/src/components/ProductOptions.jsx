import { Users, TrendingDown } from 'lucide-react'
import { formatPrice, calculateDiscount } from '../utils/formatters'
import { useLanguage } from '../context/LanguageContext'

// Icons for different preparation types
const preparationIcons = {
  'pil-pil': '🔥',
  'parmesano': '🧀',
  'salsa verde': '🌿',
  'ajillo': '🧄',
  'natural': '🍃',
  'al vapor': '💨',
  'frito': '🍳',
  'a la plancha': '🔥',
  'al horno': '♨️',
  'media': '🐟',
  'entera': '🐟🐟',
  'personal': '👤',
  'familiar': '👨‍👩‍👧‍👦'
}

const getPreparationIcon = (name) => {
  if (!name) return '🍽️'
  const lowerName = name.toLowerCase()
  for (const [key, icon] of Object.entries(preparationIcons)) {
    if (lowerName.includes(key)) return icon
  }
  return '🍽️'
}

export default function ProductOptions({ options }) {
  const { language } = useLanguage()

  if (!options || options.length === 0) return null

  return (
    <div className="space-y-2">
      {options.map((option) => {
        const hasDiscount = option.originalPrice && option.originalPrice > option.price
        const discount = calculateDiscount(option.originalPrice, option.price)
        const prepIcon = getPreparationIcon(option.name)

        return (
          <div
            key={option.id}
            className="flex items-center justify-between py-2.5 px-3 rounded-xl bg-gradient-to-r from-sand-50 to-white border border-sand-200 hover:border-ocean-200 transition-colors"
          >
            {/* Left - Option name with icon */}
            <div className="flex items-center gap-2.5 flex-1 min-w-0">
              <span className="text-lg flex-shrink-0" role="img" aria-hidden="true">
                {prepIcon}
              </span>
              
              <div className="flex-1 min-w-0">
                <span className="font-semibold text-driftwood-700 text-sm">
                  {option.name}
                </span>
                
                {/* Serves people badge */}
                {option.servesPeople > 1 && (
                  <span className="ml-2 inline-flex items-center gap-1 text-xs px-1.5 py-0.5 rounded-full bg-ocean-100 text-ocean-700 font-medium">
                    <Users className="w-3 h-3" />
                    {option.servesPeople}
                  </span>
                )}
              </div>
            </div>

            {/* Right - Price */}
            <div className="text-right flex-shrink-0 ml-3">
              {hasDiscount && (
                <div className="flex items-center justify-end gap-1.5 mb-0.5">
                  <span className="text-xs text-gray-400 line-through">
                    {formatPrice(option.originalPrice)}
                  </span>
                  <span className="inline-flex items-center gap-0.5 text-[10px] text-white font-bold bg-gradient-to-r from-red-500 to-rose-500 px-1.5 py-0.5 rounded-full">
                    <TrendingDown className="w-2.5 h-2.5" />
                    -{discount}%
                  </span>
                </div>
              )}
              <span className={`font-display font-extrabold text-lg ${hasDiscount ? 'text-rose-600' : 'text-ocean-700'}`}>
                {formatPrice(option.price)}
              </span>
            </div>
          </div>
        )
      })}
    </div>
  )
}
