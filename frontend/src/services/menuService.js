const API_BASE_URL = '/api'

class MenuService {
  async getFullMenu(language = 'es') {
    try {
      const response = await fetch(`${API_BASE_URL}/v1/menu?lang=${language}`)
      if (!response.ok) {
        throw new Error('Error al obtener la carta')
      }
      return await response.json()
    } catch (error) {
      console.error('MenuService.getFullMenu error:', error)
      throw error
    }
  }

  async getProductsByCategory(categoryCode, language = 'es') {
    try {
      const response = await fetch(
        `${API_BASE_URL}/v1/menu/categories/${categoryCode}?lang=${language}`
      )
      if (!response.ok) {
        throw new Error('Error al obtener productos')
      }
      return await response.json()
    } catch (error) {
      console.error('MenuService.getProductsByCategory error:', error)
      throw error
    }
  }

  async getAvailableProducts(language = 'es') {
    try {
      const response = await fetch(
        `${API_BASE_URL}/v1/menu/products/available?lang=${language}`
      )
      if (!response.ok) {
        throw new Error('Error al obtener productos disponibles')
      }
      return await response.json()
    } catch (error) {
      console.error('MenuService.getAvailableProducts error:', error)
      throw error
    }
  }

  async getFeaturedProducts(language = 'es') {
    try {
      const response = await fetch(
        `${API_BASE_URL}/v1/menu/featured?lang=${language}`
      )
      if (!response.ok) {
        throw new Error('Error al obtener productos destacados')
      }
      return await response.json()
    } catch (error) {
      console.error('MenuService.getFeaturedProducts error:', error)
      throw error
    }
  }

  async getCatchOfDay(language = 'es') {
    try {
      const response = await fetch(
        `${API_BASE_URL}/v1/menu/catch-of-day?lang=${language}`
      )
      if (!response.ok) {
        throw new Error('Error al obtener pesca del día')
      }
      return await response.json()
    } catch (error) {
      console.error('MenuService.getCatchOfDay error:', error)
      throw error
    }
  }
}

export const menuService = new MenuService()
