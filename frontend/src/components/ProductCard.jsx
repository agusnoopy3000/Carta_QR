import { useState } from 'react'
import { 
  ChevronDown, 
  ChevronUp, 
  Star, 
  Anchor, 
  Users, 
  Flame,
  AlertTriangle,
  Fish,
  TrendingUp
} from 'lucide-react'
import { formatPrice, calculateDiscount } from '../utils/formatters'
import { useLanguage } from '../context/LanguageContext'
import { getTranslations } from '../utils/translations'
import ProductTag from './ProductTag'
import ProductOptions from './ProductOptions'

export default function ProductCard({ product, isFeatured, isCatchOfDay, compact }) {
  const [isExpanded, setIsExpanded] = useState(false)
  const { language } = useLanguage()
  const t = getTranslations(language)

  const hasMultipleOptions = product.options && product.options.length > 1
  const priceFrom = product.priceFrom || product.options?.[0]?.price
  const firstOption = product.options?.[0]
  const hasDiscount = firstOption?.originalPrice && firstOption.originalPrice > firstOption.price

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
        relative bg-white rounded-2xl shadow-coastal hover:shadow-lg transition-all duration-300 overflow-hidden border
        ${isExpanded ? 'ring-2 ring-ocean-400 shadow-lg shadow-ocean-100 border-ocean-200' : 'hover:scale-[1.01] border-sand-200'}
        ${isStarProduct ? 'ring-2 ring-sunset-300 bg-gradient-to-br from-sunset-50/50 via-white to-sand-50' : ''}
        ${compact ? '' : 'animate-fade-in'}
      `}
      onClick={() => !compact && hasMultipleOptions && setIsExpanded(!isExpanded)}
    >
      {/* Badge superior izquierdo - Destacado */}
      {isFeatured && (
        <div className="absolute top-3 left-3 z-10 flex items-center gap-1 px-2.5 py-1 bg-gradient-to-r from-sunset-400 to-sunset-600 text-white text-xs font-bold rounded-full shadow-lg shadow-sunset-300">
          <Star className="w-3 h-3 fill-white" />
          {t.featured}
        </div>
      )}
      
      {/* Badge superior derecho - Pesca del día */}
      {isCatchOfDay && (
        <div className="absolute top-3 right-3 z-10 flex items-center gap-1 px-2.5 py-1 bg-gradient-to-r from-ocean-500 to-ocean-600 text-white text-xs font-bold rounded-full shadow-lg shadow-ocean-300">
          <Anchor className="w-3 h-3" />
          {t.catchOfDay}
        </div>
      )}

      {/* Main Content */}
      <div className="p-5">
        <div className="flex justify-between items-start gap-4">
          {/* Product Info */}
          <div className="flex-1 min-w-0">
            <h3 className={`font-display font-bold text-driftwood-800 leading-tight ${isStarProduct ? 'text-xl' : 'text-lg'}`}>
              {product.name || product.nameEs}
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
            <p className="text-driftwood-500 text-sm mt-2.5 leading-relaxed line-clamp-2">
              {product.description || product.descriptionEs}
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
                {formatPrice(firstOption.originalPrice)}
              </p>
            )}
            <p className={`font-display font-extrabold ${isStarProduct ? 'text-2xl text-sunset-600' : 'text-xl text-ocean-700'}`}>
              {formatPrice(priceFrom)}
            </p>
            {hasMultipleOptions && !isExpanded && (
              <p className="text-xs text-ocean-500 font-medium mt-0.5">{t.from}</p>
            )}
            {hasDiscount && (
              <span className="inline-flex items-center gap-0.5 mt-1.5 px-2 py-0.5 bg-gradient-to-r from-red-500 to-rose-500 text-white text-xs font-bold rounded-full">
                <TrendingUp className="w-3 h-3" />
                -{calculateDiscount(firstOption.originalPrice, firstOption.price)}%
              </span>
            )}
          </div>
        </div>

        {/* Serving info for single option products */}
        {!hasMultipleOptions && firstOption?.servesPeople > 1 && (
          <div className="flex items-center gap-1.5 mt-4 px-3 py-2 bg-ocean-50 rounded-xl text-ocean-700 border border-ocean-100">
            <Users className="w-4 h-4" />
            <span className="text-sm font-medium">
              {t.serves} {firstOption.servesPeople} {firstOption.servesPeople > 1 ? t.people : t.person}
            </span>
          </div>
        )}

        {/* Expand indicator for multiple options */}
        {hasMultipleOptions && !compact && (
          <div className="flex items-center justify-center mt-4 pt-4 border-t border-sand-100">
            <button className={`
              flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-200
              ${isExpanded 
                ? 'bg-gradient-to-r from-ocean-500 to-ocean-600 text-white shadow-lg shadow-ocean-200' 
                : 'bg-sand-100 text-driftwood-600 hover:bg-ocean-50 hover:text-ocean-600'}
            `}>
              {isExpanded ? (
                <>
                  <span>{t.seeLess}</span>
                  <ChevronUp className="w-4 h-4" />
                </>
              ) : (
                <>
                  <Fish className="w-4 h-4" />
                  <span>{t.options} ({product.options.length})</span>
                  <ChevronDown className="w-4 h-4" />
                </>
              )}
            </button>
          </div>
        )}
      </div>

      {/* Expanded Options */}
      {isExpanded && hasMultipleOptions && (
        <div 
          className="border-t border-sand-100 p-5 bg-gradient-to-b from-sand-50/50 to-white animate-fade-in"
          onClick={(e) => e.stopPropagation()}
        >
          <p className="text-sm font-bold text-driftwood-700 mb-3 flex items-center gap-2">
            <Fish className="w-4 h-4 text-ocean-500" />
            {language === 'es' ? 'Opciones disponibles:' : 'Available options:'}
          </p>
          <ProductOptions options={product.options} />

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
