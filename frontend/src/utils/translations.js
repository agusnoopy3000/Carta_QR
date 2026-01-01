/**
 * 🦐 EL MACHO - Sistema de Traducciones
 * Textos de la aplicación en múltiples idiomas
 * Caldera, Chile - Productos del Mar
 */
export const translations = {
  es: {
    // General
    loading: 'Cargando carta...',
    error: 'Error al cargar',
    retry: 'Reintentar',
    noConnection: 'Sin conexión',
    checkConnection: 'Verifica tu conexión a internet',
    
    // Pricing
    from: 'Desde',
    price: 'Precio',
    originalPrice: 'Precio original',
    
    // Products
    featured: 'Destacados',
    catchOfDay: 'Pesca del Día',
    mostPopular: 'Lo Más Pedido',
    recommended: 'Recomendado',
    available: 'Disponible',
    unavailable: 'No disponible',
    
    // Options
    options: 'Opciones',
    selectOption: 'Elige tu opción',
    chooseOption: 'Elige tu opción:',
    preparation: 'Preparación',
    size: 'Tamaño',
    
    // Serving info
    serves: 'Sirve',
    people: 'personas',
    person: 'persona',
    ideal: 'Ideal para',
    
    // Actions
    seeMore: 'Ver más',
    seeLess: 'Ver menos',
    seeOptions: 'Ver opciones',
    select: 'Seleccionar',
    
    // Product details
    allergens: 'Alérgenos',
    spicyLevel: 'Nivel de picante',
    description: 'Descripción',
    ingredients: 'Ingredientes',
    
    // Promos & Discounts
    discount: 'descuento',
    newPrice: 'Nuevo precio',
    promo: 'Promoción',
    specialOffer: 'Oferta especial',
    
    // Tags
    largePortion: 'Porción abundante',
    machoSize: '¡Tamaño Macho!',
    forSharing: 'Para compartir',
    houseSpecialty: 'Especialidad de la casa',
    customerFavorite: 'Favorito del cliente',
    freshDaily: 'Fresco del día',
    
    // Categories
    categories: {
      MENU: 'Menú del Mar',
      PESCADOS: 'Pescados',
      BAR: 'Bar',
      BEBESTIBLES: 'Bebestibles',
      MENU_NINO: 'Menú Niño'
    },
    
    // Category descriptions
    categoryDescriptions: {
      MENU: 'Los tesoros del mar de Caldera',
      PESCADOS: 'Pescados frescos con arroz, ensalada, tomate y papas',
      BAR: 'Cervezas, vinos y tragos',
      BEBESTIBLES: 'Bebidas y refrescos',
      MENU_NINO: 'Especial para los pequeños marineros'
    },
    
    // Fish accompaniments note
    fishNote: 'Todos nuestros pescados incluyen:',
    fishAccompaniments: ['Arroz', 'Tomate', 'Ensalada', 'Papas fritas'],
    
    // Footer
    location: 'Caldera, Chile',
    pacificCoast: 'Costa del Pacífico',
    hours: 'Lunes a Domingo',
    machoPortions: '¡Porciones de Macho!',
    madeWithLove: 'Hecho con ❤️ en Caldera, Chile',
    
    // Accessibility
    selectCategory: 'Selecciona una categoría',
    noProducts: 'No hay productos disponibles en esta categoría',
    tapToSelect: 'Toca para seleccionar tu preparación favorita',
    
    // Time
    today: 'Hoy',
    fresh: 'Fresco',
    daily: 'Del día'
  },
  
  en: {
    // General
    loading: 'Loading menu...',
    error: 'Error loading',
    retry: 'Retry',
    noConnection: 'No connection',
    checkConnection: 'Check your internet connection',
    
    // Pricing
    from: 'From',
    price: 'Price',
    originalPrice: 'Original price',
    
    // Products
    featured: 'Featured',
    catchOfDay: 'Catch of the Day',
    mostPopular: 'Most Popular',
    recommended: 'Recommended',
    available: 'Available',
    unavailable: 'Unavailable',
    
    // Options
    options: 'Options',
    selectOption: 'Select an option',
    chooseOption: 'Choose your option:',
    preparation: 'Preparation',
    size: 'Size',
    
    // Serving info
    serves: 'Serves',
    people: 'people',
    person: 'person',
    ideal: 'Ideal for',
    
    // Actions
    seeMore: 'See more',
    seeLess: 'See less',
    seeOptions: 'See options',
    select: 'Select',
    
    // Product details
    allergens: 'Allergens',
    spicyLevel: 'Spicy level',
    description: 'Description',
    ingredients: 'Ingredients',
    
    // Promos & Discounts
    discount: 'off',
    newPrice: 'New price',
    promo: 'Promo',
    specialOffer: 'Special offer',
    
    // Tags
    largePortion: 'Large portion',
    machoSize: 'Macho Size!',
    forSharing: 'For sharing',
    houseSpecialty: 'House specialty',
    customerFavorite: 'Customer favorite',
    freshDaily: 'Fresh daily',
    
    // Categories
    categories: {
      MENU: 'Seafood Menu',
      PESCADOS: 'Fish',
      BAR: 'Bar',
      BEBESTIBLES: 'Beverages',
      MENU_NINO: 'Kids Menu'
    },
    
    // Category descriptions
    categoryDescriptions: {
      MENU: 'Treasures from Caldera sea',
      PESCADOS: 'Fresh fish with rice, salad, tomato and fries',
      BAR: 'Beers, wines and cocktails',
      BEBESTIBLES: 'Beverages and soft drinks',
      MENU_NINO: 'Special for little sailors'
    },
    
    // Fish accompaniments note
    fishNote: 'All our fish include:',
    fishAccompaniments: ['Rice', 'Tomato', 'Salad', 'Fries'],
    
    // Footer
    location: 'Caldera, Chile',
    pacificCoast: 'Pacific Coast',
    hours: 'Monday to Sunday',
    machoPortions: 'Macho Size Portions!',
    madeWithLove: 'Made with ❤️ in Caldera, Chile',
    
    // Accessibility
    selectCategory: 'Select a category',
    noProducts: 'No products available in this category',
    tapToSelect: 'Tap to select your favorite preparation',
    
    // Time
    today: 'Today',
    fresh: 'Fresh',
    daily: 'Daily'
  }
}

/**
 * Obtiene las traducciones para un idioma específico
 * @param {string} language - Código del idioma (es/en)
 * @returns {object} Objeto con las traducciones
 */
export const getTranslations = (language) => {
  return translations[language] || translations.es
}

/**
 * Traduce una clave específica
 * @param {string} key - Clave de traducción (soporta notación de punto)
 * @param {string} language - Código del idioma
 * @returns {string} Texto traducido
 */
export const translate = (key, language = 'es') => {
  const t = getTranslations(language)
  const keys = key.split('.')
  let result = t
  
  for (const k of keys) {
    if (result && typeof result === 'object' && k in result) {
      result = result[k]
    } else {
      return key // Return key if translation not found
    }
  }
  
  return typeof result === 'string' ? result : key
}
