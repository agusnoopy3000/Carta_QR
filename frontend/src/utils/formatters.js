/**
 * Formatea un precio en formato de moneda chilena
 * @param {number} price - Precio a formatear
 * @returns {string} Precio formateado
 */
export const formatPrice = (price) => {
  if (price === null || price === undefined) return ''
  
  return new Intl.NumberFormat('es-CL', {
    style: 'currency',
    currency: 'CLP',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(price)
}

/**
 * Formatea el precio sin símbolo de moneda
 * @param {number} price - Precio a formatear
 * @returns {string} Precio formateado sin símbolo
 */
export const formatPriceNumber = (price) => {
  if (price === null || price === undefined) return ''
  
  return new Intl.NumberFormat('es-CL', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(price)
}

/**
 * Calcula el porcentaje de descuento
 * @param {number} originalPrice - Precio original
 * @param {number} currentPrice - Precio actual
 * @returns {number} Porcentaje de descuento
 */
export const calculateDiscount = (originalPrice, currentPrice) => {
  if (!originalPrice || !currentPrice || originalPrice <= currentPrice) return 0
  return Math.round(((originalPrice - currentPrice) / originalPrice) * 100)
}
