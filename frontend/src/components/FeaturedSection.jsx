import { Star, Anchor, Sparkles, Flame, ArrowRight, Crown, Fish } from 'lucide-react'
import ProductCard from './ProductCard'
import { getTranslations } from '../utils/translations'
import { formatPrice } from '../utils/formatters'

export default function FeaturedSection({ featured, catchOfDay, language }) {
  const t = getTranslations(language)

  if ((!featured || featured.length === 0) && (!catchOfDay || catchOfDay.length === 0)) {
    return null
  }

  // Get minimum price from product options
  const getMinPrice = (product) => {
    if (!product.options || product.options.length === 0) return null
    return Math.min(...product.options.map(opt => opt.price))
  }

  return (
    <section className="relative overflow-hidden">
      {/* Background with coastal gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-amber-50/80 via-orange-50/40 to-white pointer-events-none" />
      
      {/* Decorative wave pattern */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-400 via-amber-400 to-cyan-400 opacity-60" />
      
      <div className="relative px-4 py-6">
        {/* Catch of the Day - Pesca del Día - HERO SECTION */}
        {catchOfDay && catchOfDay.length > 0 && (
          <div className="mb-8">
            {/* Section Header */}
            <div className="flex items-center gap-3 mb-5">
              <div className="relative">
                <div className="p-3 bg-gradient-to-br from-cyan-500 via-blue-500 to-cyan-600 rounded-2xl shadow-lg shadow-cyan-200/50">
                  <Anchor className="w-6 h-6 text-white" />
                </div>
                {/* Animated ripple */}
                <div className="absolute inset-0 rounded-2xl bg-cyan-400/30 animate-ping" style={{ animationDuration: '2s' }} />
              </div>
              <div className="flex-1">
                <h2 className="font-display text-xl font-extrabold text-gray-800 flex items-center gap-2">
                  🎣 {t.catchOfDay}
                </h2>
                <p className="text-sm text-cyan-600 font-medium">
                  {language === 'es' ? 'Fresco del mar de Caldera' : 'Fresh from Caldera sea'}
                </p>
              </div>
            </div>

            {/* Fish Cards - Horizontal Scroll */}
            <div 
              className="flex gap-3 overflow-x-auto pb-3 -mx-4 px-4 scrollbar-hide"
              style={{ scrollSnapType: 'x mandatory' }}
            >
              {catchOfDay.slice(0, 5).map((product, index) => (
                <div 
                  key={product.id} 
                  className="flex-shrink-0 w-44 scroll-snap-start"
                  style={{ scrollSnapAlign: 'start' }}
                >
                  <div className="bg-gradient-to-br from-cyan-50 to-blue-50 rounded-2xl p-4 border-2 border-cyan-200 shadow-lg shadow-cyan-100/50 h-full">
                    {/* Fish emoji header */}
                    <div className="text-center mb-2">
                      <span className="text-3xl">🐟</span>
                    </div>
                    
                    {/* Fish name */}
                    <h3 className="font-display font-bold text-gray-800 text-center text-sm leading-tight mb-2">
                      {product.name}
                    </h3>
                    
                    {/* Price */}
                    <div className="text-center">
                      <span className="text-xs text-cyan-600 font-medium">{t.from}</span>
                      <p className="font-display font-extrabold text-lg text-cyan-700">
                        {formatPrice(getMinPrice(product))}
                      </p>
                    </div>
                    
                    {/* Badge */}
                    <div className="mt-2 flex justify-center">
                      <span className="inline-flex items-center gap-1 px-2 py-1 bg-cyan-500 text-white text-[10px] font-bold rounded-full uppercase">
                        <Fish className="w-3 h-3" />
                        {language === 'es' ? 'Fresco' : 'Fresh'}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Note about accompaniments */}
            <div className="mt-3 p-3 bg-cyan-50/80 rounded-xl border border-cyan-100">
              <p className="text-xs text-cyan-700 text-center flex items-center justify-center gap-2">
                <span>🍚</span>
                {language === 'es' 
                  ? 'Todos incluyen: arroz, tomate, ensalada y papas fritas'
                  : 'All include: rice, tomato, salad and fries'}
                <span>🥗</span>
              </p>
            </div>
          </div>
        )}

        {/* Featured Products - Lo Más Pedido - HERO SECTION */}
        {featured && featured.length > 0 && (
          <div>
            {/* Section Header */}
            <div className="flex items-center gap-3 mb-5">
              <div className="relative">
                <div className="p-3 bg-gradient-to-br from-amber-400 via-orange-500 to-red-500 rounded-2xl shadow-lg shadow-orange-200/50">
                  <Flame className="w-6 h-6 text-white" />
                </div>
                {/* Fire glow */}
                <div className="absolute -inset-1 rounded-2xl bg-gradient-to-br from-amber-400 to-orange-500 opacity-20 blur-md" />
              </div>
              <div className="flex-1">
                <h2 className="font-display text-xl font-extrabold text-gray-800 flex items-center gap-2">
                  {language === 'es' ? '🔥 Lo Más Pedido' : '🔥 Most Popular'}
                  <Sparkles className="w-5 h-5 text-amber-500" />
                </h2>
                <p className="text-sm text-orange-600 font-medium">
                  {language === 'es' ? 'Los favoritos de nuestros clientes' : 'Our customers\' favorites'}
                </p>
              </div>
            </div>
            
            {/* Featured Carousel - Big impressive cards */}
            <div 
              className="flex gap-4 overflow-x-auto pb-4 -mx-4 px-4 scrollbar-hide"
              style={{ scrollSnapType: 'x mandatory' }}
            >
              {featured.map((product, index) => (
                <div 
                  key={product.id} 
                  className="flex-shrink-0 w-72 scroll-snap-start"
                  style={{ scrollSnapAlign: 'start' }}
                >
                  <div className="relative bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 rounded-2xl overflow-hidden border-2 border-amber-300 shadow-xl shadow-amber-100/50">
                    {/* Crown badge for #1 */}
                    {index === 0 && (
                      <div className="absolute top-3 right-3 z-10">
                        <div className="p-2 bg-gradient-to-br from-yellow-400 to-amber-500 rounded-full shadow-lg">
                          <Crown className="w-4 h-4 text-white" />
                        </div>
                      </div>
                    )}
                    
                    {/* Rank badge */}
                    <div className="absolute top-3 left-3 z-10">
                      <div className="w-8 h-8 bg-gradient-to-br from-orange-500 to-red-500 rounded-full flex items-center justify-center shadow-lg">
                        <span className="text-white font-bold text-sm">#{index + 1}</span>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-5 pt-14">
                      {/* Product emoji/icon */}
                      <div className="text-center mb-3">
                        <span className="text-4xl">
                          {product.name.toLowerCase().includes('ostión') ? '🦪' :
                           product.name.toLowerCase().includes('macha') ? '🐚' :
                           product.name.toLowerCase().includes('camarón') ? '🦐' :
                           product.name.toLowerCase().includes('jaiba') || product.name.toLowerCase().includes('cangrejo') ? '🦀' :
                           product.name.toLowerCase().includes('ceviche') ? '��' :
                           product.name.toLowerCase().includes('caldillo') || product.name.toLowerCase().includes('paila') ? '🍲' :
                           '🦞'}
                        </span>
                      </div>

                      {/* Name */}
                      <h3 className="font-display font-extrabold text-gray-800 text-center text-lg leading-tight mb-2">
                        {product.name}
                      </h3>

                      {/* Description snippet */}
                      {product.description && (
                        <p className="text-xs text-gray-500 text-center line-clamp-2 mb-3">
                          {product.description}
                        </p>
                      )}

                      {/* Tags */}
                      {product.tags && product.tags.length > 0 && (
                        <div className="flex flex-wrap justify-center gap-1 mb-3">
                          {product.tags.slice(0, 2).map((tag, idx) => (
                            <span 
                              key={idx}
                              className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold"
                              style={{
                                backgroundColor: tag.backgroundColor || '#fef3c7',
                                color: tag.textColor || '#92400e'
                              }}
                            >
                              {tag.text}
                            </span>
                          ))}
                        </div>
                      )}

                      {/* Price */}
                      <div className="text-center pt-2 border-t border-amber-200">
                        <span className="text-xs text-amber-600 font-medium uppercase tracking-wide">{t.from}</span>
                        <p className="font-display font-black text-2xl text-amber-700">
                          {formatPrice(getMinPrice(product))}
                        </p>
                      </div>

                      {/* CTA Button */}
                      <button className="w-full mt-3 py-2.5 bg-gradient-to-r from-amber-500 to-orange-500 text-white font-bold rounded-xl shadow-lg shadow-amber-200 flex items-center justify-center gap-2 active:scale-95 transition-transform">
                        <span>{language === 'es' ? 'Ver opciones' : 'See options'}</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Bottom wave decoration */}
      <svg className="w-full h-4 text-white" viewBox="0 0 1200 30" preserveAspectRatio="none">
        <path d="M0,30 C200,10 400,20 600,15 C800,10 1000,25 1200,20 L1200,30 L0,30 Z" fill="currentColor"/>
      </svg>
    </section>
  )
}
