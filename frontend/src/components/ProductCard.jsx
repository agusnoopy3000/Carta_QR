import { useState } from 'react'
import { 
  ChevronDown, 
  ChevronUp, 
  Star, 
  Anchor, 
  Users, 
  Flame,
  AlertTriangle,
  Sparkles,
  Award,
  Zap,
  TrendingUp
} from 'lucide-react'
import { formatPrice, calculateDiscount } from '../utils/formatters'
import { useLanguage } from '../context/LanguageContext'
import { getTranslations } from '../utils/translations'
import ProductTag from './ProductTag'
import ProductOptions from './ProductOptions'

export default function ProductCard({ product, isFeatured, isCatchOfDay, compact }) {
  const [isExpanded, setIsExpanded] = useState(false)
  const [selectedOption, setSelectedOption] = useState(
    product.options?.find(o => o.isDefault) || product.options?.[0]
  )
  const { language } = useLanguage()
  const t = getTranslations(language)

  const hasMultipleOptions = product.options && product.options.length > 1
  const currentPrice = selectedOption?.price || product.priceFrom
  const originalPrice = selectedOption?.originalPrice
  const hasDiscount = originalPrice && originalPrice > currentPrice

  // Detectar si es un producto "estrella" (Jardín del Mar, etc)
  const isStarProduct = product.code === 'JARDIN_MAR' || 
    (product.tags?.some(t => t.code === 'TAMANO_MACHO' || t.code === 'IMPERDIBLE'))

  // Spicy level indicators
  const renderSpicyLevel = () => {
    if (!product.spicyLevel) return null
    return (
      <div className="flex items-center gap-0.5">
        {[...Array(product.spicyLevel)].map((_, i) => (
          <Flame key={i} className="w-3 h-3 text-red-500 fill-red-500" />
        ))}
      </div>
    )
  }

  return (
    <article 
      className={`
        relative bg-white rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden
        ${isExpanded ? 'ring-2 ring-cyan-400 shadow-lg shadow-cyan-100' : 'hover:scale-[1.01]'}
        ${isStarProduct ? 'ring-2 ring-amber-300 bg-gradient-to-br from-amber-50 to-white' : ''}
        ${compact ? '' : 'animate-fade-in'}
      `}
      onClick={() => !compact && setIsExpanded(!isExpanded)}
    >
      {/* Badge superior izquierdo - Destacado */}
      {isFeatured && (
        <div className="absolute top-3 left-3 z-10 flex items-center gap-1 px-2.5 py-1 bg-gradient-to-r from-amber-400 to-orange-500 text-white text-xs font-bold rounded-full shadow-lg shadow-orange-200">
          <Star className="w-3 h-3 fill-white" />
          {t.featured}
        </div>
      )}
      
      {/* Badge superior derecho - Pesca del día */}
      {isCatchOfDay && (
        <div className="absolute top-3 right-3 z-10 flex items-center gap-1 px-2.5 py-1 bg-gradient-to-r from-cyan-500 to-blue-600 text-white text-xs font-bold rounded-full shadow-lg shadow-blue-200">
          <Anchor className="w-3 h-3" />
          {t.catchOfDay}
        </div>
      )}

      {/* Main Content */}
      <div className="p-5">
        <div className="flex justify-between items-start gap-4">
          {/* Product Info */}
          <div className="flex-1 min-w-0">
            <h3 className={`font-display font-bold text-gray-800 leading-tight ${isStarProduct ? 'text-xl' : 'text-lg'}`}>
              {product.name}
            </h3>
            
            {/* Tags - Percepción de valor */}
            {product.tags && product.tags.length > 0 && (
              <div className="flex flex-wrap gap-1.5 mt-2.5">
                {product.tags.slice(0, 3).map((tag) => (
                  <ProductTag key={tag.id} tag={tag} />
                ))}
              </div>
            )}

            {/* Description */}
            <p className="text-gray-500 text-sm mt-2.5 leading-relaxed line-clamp-2">
              {product.description}
            </p>

            {/* Spicy Level */}
            {product.spicyLevel > 0 && (
              <div className="mt-2">{renderSpicyLevel()}</div>
            )}
          </div>

          {/* Price Block */}
          <div className="text-right flex-shrink-0 flex flex-col items-end">
            {hasDiscount && (
              <p className="text-sm text-gray-400 line-through mb-0.5">
                {formatPrice(originalPrice)}
              </p>
            )}
            <p className={`font-display font-extrabold ${isStarProduct ? 'text-2xl text-amber-600' : 'text-xl text-gray-800'}`}>
              {formatPrice(currentPrice)}
            </p>
            {hasMultipleOptions && !isExpanded && (
              <p className="text-xs text-cyan-600 font-medium mt-0.5">{t.from}</p>
            )}
            {hasDiscount && (
              <span className="inline-flex items-center gap-0.5 mt-1.5 px-2 py-0.5 bg-gradient-to-r from-red-500 to-rose-500 text-white text-xs font-bold rounded-full">
                <TrendingUp className="w-3 h-3" />
                -{calculateDiscount(originalPrice, currentPrice)}%
              </span>
            )}
          </div>
        </div>

        {/* Serving info - prominente */}
        {selectedOption?.servesPeople > 1 && (
          <div className="flex items-center gap-1.5 mt-4 px-3 py-2 bg-purple-50 rounded-xl text-purple-700">
            <Users className="w-4 h-4" />
            <span className="text-sm font-medium">
              {t.serves} {selectedOption.servesPeople} {selectedOption.servesPeople > 1 ? t.people : t.person}
            </span>
          </div>
        )}

        {/* Expand indicator for multiple options */}
        {hasMultipleOptions && !compact && (
          <div className="flex items-center justify-center mt-4 pt-4 border-t border-gray-100">
            <button className={`
              flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-200
              ${isExpanded 
                ? 'bg-cyan-500 text-white shadow-lg shadow-cyan-200' 
                : 'bg-gray-100 text-gray-600 hover:bg-cyan-50 hover:text-cyan-600'}
            `}>
              {isExpanded ? (
                <>
                  <span>{t.seeLess}</span>
                  <ChevronUp className="w-4 h-4" />
                </>
              ) : (
                <>
                  <span>{t.options} ({product.options.length})</span>
                  <ChevronDown className="w-4 h-4" />
                </>
              )}
            </button>
          </div>
        )}
      </div>

      {/* Expanded Options - con animación suave */}
      {isExpanded && hasMultipleOptions && (
        <div className="border-t border-gray-100 p-5 bg-gradient-to-b from-gray-50 to-white animate-fade-in">
          <p className="text-sm font-bold text-gray-700 mb-4 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-cyan-500" />
            {t.selectOption}:
          </p>
          <ProductOptions 
            options={product.options}
            selectedOption={selectedOption}
            onSelect={setSelectedOption}
          />

          {/* Allergens */}
          {product.allergens && (
            <div className="mt-4 p-3 bg-amber-50 rounded-xl flex items-start gap-2 border border-amber-100">
              <AlertTriangle className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-xs font-bold text-amber-800">{t.allergens}:</p>
                <p className="text-xs text-amber-700">{product.allergens}</p>
              </div>
            </div>
          )}
        </div>
      )}
    </article>
  )
}
