import { Check, Users, TrendingDown, ChefHat, Flame } from 'lucide-react'
import { formatPrice, calculateDiscount } from '../utils/formatters'
import { useLanguage } from '../context/LanguageContext'
import { getTranslations } from '../utils/translations'

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
  'al horno': '♨️'
}

const getPreparationIcon = (name) => {
  const lowerName = name.toLowerCase()
  for (const [key, icon] of Object.entries(preparationIcons)) {
    if (lowerName.includes(key)) return icon
  }
  return '🍽️'
}

export default function ProductOptions({ options, selectedOption, onSelect }) {
  const { language } = useLanguage()
  const t = getTranslations(language)

  if (!options || options.length === 0) return null

  // Group options by type if there are multiple types
  const hasMultipleTypes = new Set(options.map(o => o.optionType)).size > 1

  return (
    <div className="space-y-2" onClick={(e) => e.stopPropagation()}>
      {/* Header */}
      <div className="flex items-center gap-2 mb-3">
        <ChefHat className="w-4 h-4 text-cyan-600" />
        <span className="text-sm font-semibold text-gray-700">
          {language === 'es' ? 'Elige tu opción:' : 'Choose your option:'}
        </span>
      </div>

      {options.map((option, index) => {
        const isSelected = selectedOption?.id === option.id
        const hasDiscount = option.originalPrice && option.originalPrice > option.price
        const discount = calculateDiscount(option.originalPrice, option.price)
        const prepIcon = getPreparationIcon(option.name)

        return (
          <button
            key={option.id}
            onClick={() => onSelect(option)}
            className={`
              w-full flex items-center justify-between p-4 rounded-2xl
              transition-all duration-200 transform active:scale-[0.98]
              min-h-[64px]
              ${isSelected 
                ? 'bg-gradient-to-r from-cyan-50 via-blue-50 to-cyan-50 border-2 border-cyan-400 shadow-lg shadow-cyan-100/50 ring-2 ring-cyan-200' 
                : 'bg-white border-2 border-gray-200 hover:border-cyan-200 hover:shadow-md hover:bg-gray-50'}
            `}
            style={{
              animationDelay: `${index * 50}ms`
            }}
          >
            {/* Left side - Option Info */}
            <div className="flex items-center gap-3 flex-1 min-w-0">
              {/* Emoji indicator */}
              <span className="text-2xl flex-shrink-0" role="img" aria-hidden="true">
                {prepIcon}
              </span>

              <div className="flex-1 text-left min-w-0">
                {/* Option Name */}
                <div className="flex items-center gap-2 flex-wrap">
                  <span className={`font-bold text-base ${isSelected ? 'text-cyan-700' : 'text-gray-800'}`}>
                    {option.name}
                  </span>
                </div>

                {/* Description or serves info */}
                <div className="flex items-center gap-2 mt-0.5 flex-wrap">
                  {option.servesPeople > 1 && (
                    <span className={`
                      inline-flex items-center gap-1 text-xs px-2 py-0.5 rounded-full font-semibold
                      ${isSelected 
                        ? 'bg-purple-100 text-purple-700 border border-purple-200' 
                        : 'bg-purple-50 text-purple-600'}
                    `}>
                      <Users className="w-3 h-3" />
                      {option.servesPeople} {language === 'es' ? 'pers.' : 'ppl'}
                    </span>
                  )}
                  {option.description && (
                    <p className="text-xs text-gray-500 truncate">{option.description}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Right side - Price + Selection */}
            <div className="flex items-center gap-3 ml-3 flex-shrink-0">
              {/* Price Block */}
              <div className="text-right">
                {hasDiscount && (
                  <div className="flex items-center justify-end gap-1">
                    <span className="text-xs text-gray-400 line-through">
                      {formatPrice(option.originalPrice)}
                    </span>
                    <span className="inline-flex items-center gap-0.5 text-[10px] text-red-600 font-bold bg-red-50 px-1.5 py-0.5 rounded-full">
                      <TrendingDown className="w-2.5 h-2.5" />
                      -{discount}%
                    </span>
                  </div>
                )}
                <p className={`
                  font-display font-extrabold text-xl transition-all duration-200
                  ${isSelected ? 'text-cyan-600 scale-105' : 'text-gray-800'}
                  ${hasDiscount ? 'text-red-600' : ''}
                `}>
                  {formatPrice(option.price)}
                </p>
              </div>

              {/* Selection Indicator */}
              <div className={`
                w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200 flex-shrink-0
                ${isSelected 
                  ? 'bg-gradient-to-br from-cyan-500 to-blue-600 text-white shadow-lg shadow-cyan-300/50 scale-110' 
                  : 'border-2 border-gray-300 bg-white hover:border-cyan-300'}
              `}>
                {isSelected && <Check className="w-5 h-5" strokeWidth={3} />}
              </div>
            </div>
          </button>
        )
      })}

      {/* Tip for multiple options */}
      {options.length > 1 && (
        <p className="text-center text-xs text-gray-400 mt-2 flex items-center justify-center gap-1">
          <Flame className="w-3 h-3 text-amber-500" />
          {language === 'es' 
            ? 'Toca para seleccionar tu preparación favorita'
            : 'Tap to select your favorite preparation'}
        </p>
      )}
    </div>
  )
}
