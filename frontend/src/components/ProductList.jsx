import { useLanguage } from '../context/LanguageContext'
import ProductCard from './ProductCard'
import { Anchor, Fish, UtensilsCrossed, Wine, Coffee, Baby } from 'lucide-react'

// Category icons and colors mapping
const categoryConfig = {
  MENU: {
    icon: Anchor,
    emoji: '🦐',
    gradient: 'from-cyan-500 to-blue-600',
    lightBg: 'bg-cyan-50',
    description: {
      es: 'Los tesoros del mar de Caldera',
      en: 'Treasures from Caldera sea'
    }
  },
  PESCADOS: {
    icon: Fish,
    emoji: '🐟',
    gradient: 'from-blue-500 to-indigo-600',
    lightBg: 'bg-blue-50',
    description: {
      es: 'Pescados frescos con arroz, ensalada, tomate y papas',
      en: 'Fresh fish with rice, salad, tomato and fries'
    }
  },
  BAR: {
    icon: Wine,
    emoji: '🍷',
    gradient: 'from-purple-500 to-pink-600',
    lightBg: 'bg-purple-50',
    description: {
      es: 'Cervezas, vinos y tragos',
      en: 'Beers, wines and cocktails'
    }
  },
  BEBESTIBLES: {
    icon: Coffee,
    emoji: '🥤',
    gradient: 'from-amber-500 to-orange-600',
    lightBg: 'bg-amber-50',
    description: {
      es: 'Bebidas y refrescos',
      en: 'Beverages and soft drinks'
    }
  },
  MENU_NINO: {
    icon: Baby,
    emoji: '👶',
    gradient: 'from-pink-500 to-rose-600',
    lightBg: 'bg-pink-50',
    description: {
      es: 'Especial para los pequeños marineros',
      en: 'Special for little sailors'
    }
  }
}

export default function ProductList({ category }) {
  const { language } = useLanguage()
  
  if (!category) {
    return (
      <div className="p-8 text-center">
        <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
          <Anchor className="w-8 h-8 text-gray-400" />
        </div>
        <p className="text-gray-500 font-medium">
          {language === 'es' ? 'Selecciona una categoría' : 'Select a category'}
        </p>
      </div>
    )
  }

  if (!category.products || category.products.length === 0) {
    return (
      <div className="p-8 text-center">
        <div className="w-16 h-16 mx-auto mb-4 bg-cyan-50 rounded-full flex items-center justify-center">
          <Fish className="w-8 h-8 text-cyan-400" />
        </div>
        <p className="text-gray-500 font-medium">
          {language === 'es' 
            ? 'No hay productos disponibles en esta categoría' 
            : 'No products available in this category'}
        </p>
      </div>
    )
  }

  // Get category configuration
  const config = categoryConfig[category.code] || categoryConfig.MENU
  const IconComponent = config.icon
  const categoryDescription = category.description || config.description[language]

  return (
    <section className="px-4 py-5">
      {/* Category Header - Coastal Style */}
      <div className="mb-5">
        <div className="flex items-center gap-3 mb-2">
          {/* Icon with gradient background */}
          <div className={`p-3 bg-gradient-to-br ${config.gradient} rounded-2xl shadow-lg`}>
            <IconComponent className="w-5 h-5 text-white" />
          </div>
          
          {/* Title with emoji */}
          <div className="flex-1">
            <h2 className="font-display text-xl font-extrabold text-gray-800 flex items-center gap-2">
              <span>{config.emoji}</span>
              <span>{category.name}</span>
            </h2>
            <p className="text-sm text-gray-500">
              {categoryDescription}
            </p>
          </div>
        </div>

        {/* Product count badge */}
        <div className={`inline-flex items-center gap-1.5 px-3 py-1 ${config.lightBg} rounded-full text-xs font-semibold text-gray-600 mt-2`}>
          <span>{category.products.length}</span>
          <span>{language === 'es' ? 'productos' : 'products'}</span>
        </div>
      </div>

      {/* Products Grid/List */}
      <div className="space-y-4">
        {category.products.map((product, index) => (
          <div 
            key={product.id}
            className="animate-fade-in"
            style={{ 
              animationDelay: `${Math.min(index * 50, 300)}ms`,
              animationFillMode: 'backwards'
            }}
          >
            <ProductCard 
              product={product} 
              categoryCode={category.code}
            />
          </div>
        ))}
      </div>

      {/* Category footer note for PESCADOS */}
      {category.code === 'PESCADOS' && (
        <div className="mt-6 p-4 bg-gradient-to-r from-cyan-50 to-blue-50 rounded-2xl border border-cyan-100">
          <div className="flex items-start gap-3">
            <span className="text-2xl">ℹ️</span>
            <div>
              <p className="text-sm font-semibold text-cyan-800 mb-1">
                {language === 'es' ? 'Todos nuestros pescados incluyen:' : 'All our fish include:'}
              </p>
              <div className="flex flex-wrap gap-2">
                {['🍚 Arroz', '🍅 Tomate', '🥗 Ensalada', '🍟 Papas fritas'].map((item, idx) => (
                  <span key={idx} className="text-xs bg-white px-2 py-1 rounded-full text-cyan-700 font-medium shadow-sm">
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Macho size note */}
      <div className="mt-6 text-center">
        <p className="text-xs text-gray-400 flex items-center justify-center gap-2">
          <span>💪</span>
          <span className="font-medium">
            {language === 'es' 
              ? '¡Porciones de Macho! - Caldera, Chile'
              : 'Macho Size Portions! - Caldera, Chile'}
          </span>
          <span>🇨🇱</span>
        </p>
      </div>
    </section>
  )
}
