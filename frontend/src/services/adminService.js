const API_BASE_URL = '/api/v1/admin'

class AdminService {
  constructor() {
    this.credentials = null
  }

  setCredentials(username, password) {
    this.credentials = btoa(`${username}:${password}`)
  }

  clearCredentials() {
    this.credentials = null
  }

  getAuthHeaders() {
    if (!this.credentials) {
      throw new Error('No autenticado')
    }
    return {
      'Authorization': `Basic ${this.credentials}`,
      'Content-Type': 'application/json'
    }
  }

  // ============== AUTENTICACIÓN ==============

  async login(username, password) {
    this.setCredentials(username, password)
    try {
      const response = await fetch(`${API_BASE_URL}/categories`, {
        headers: this.getAuthHeaders()
      })
      if (!response.ok) {
        this.clearCredentials()
        throw new Error('Credenciales inválidas')
      }
      // Guardar en localStorage para persistencia
      localStorage.setItem('adminAuth', this.credentials)
      return true
    } catch (error) {
      this.clearCredentials()
      throw error
    }
  }

  logout() {
    this.clearCredentials()
    localStorage.removeItem('adminAuth')
  }

  restoreSession() {
    const saved = localStorage.getItem('adminAuth')
    if (saved) {
      this.credentials = saved
      return true
    }
    return false
  }

  isAuthenticated() {
    return !!this.credentials
  }

  // ============== CATEGORÍAS ==============

  async getCategories() {
    const response = await fetch(`${API_BASE_URL}/categories`, {
      headers: this.getAuthHeaders()
    })
    if (!response.ok) throw new Error('Error al obtener categorías')
    return await response.json()
  }

  async getCategoryById(id) {
    const response = await fetch(`${API_BASE_URL}/categories/${id}`, {
      headers: this.getAuthHeaders()
    })
    if (!response.ok) throw new Error('Error al obtener categoría')
    return await response.json()
  }

  async updateCategory(id, data) {
    const response = await fetch(`${API_BASE_URL}/categories/${id}`, {
      method: 'PUT',
      headers: this.getAuthHeaders(),
      body: JSON.stringify(data)
    })
    if (!response.ok) throw new Error('Error al actualizar categoría')
    return await response.json()
  }

  async toggleCategoryActive(id, active) {
    const response = await fetch(`${API_BASE_URL}/categories/${id}/toggle-active`, {
      method: 'PATCH',
      headers: this.getAuthHeaders(),
      body: JSON.stringify({ active })
    })
    if (!response.ok) throw new Error('Error al cambiar estado de categoría')
  }

  // ============== PRODUCTOS ==============

  async getProducts() {
    const response = await fetch(`${API_BASE_URL}/products`, {
      headers: this.getAuthHeaders()
    })
    if (!response.ok) throw new Error('Error al obtener productos')
    return await response.json()
  }

  async getProductsByCategory(categoryId) {
    const response = await fetch(`${API_BASE_URL}/products/category/${categoryId}`, {
      headers: this.getAuthHeaders()
    })
    if (!response.ok) throw new Error('Error al obtener productos')
    return await response.json()
  }

  async getProductById(id) {
    const response = await fetch(`${API_BASE_URL}/products/${id}`, {
      headers: this.getAuthHeaders()
    })
    if (!response.ok) throw new Error('Error al obtener producto')
    return await response.json()
  }

  async updateProduct(id, data) {
    const response = await fetch(`${API_BASE_URL}/products/${id}`, {
      method: 'PUT',
      headers: this.getAuthHeaders(),
      body: JSON.stringify(data)
    })
    if (!response.ok) throw new Error('Error al actualizar producto')
    return await response.json()
  }

  async toggleProductAvailable(id, available) {
    const response = await fetch(`${API_BASE_URL}/products/${id}/toggle-available`, {
      method: 'PATCH',
      headers: this.getAuthHeaders(),
      body: JSON.stringify({ available })
    })
    if (!response.ok) throw new Error('Error al cambiar disponibilidad')
  }

  async toggleProductFeatured(id, featured) {
    const response = await fetch(`${API_BASE_URL}/products/${id}/toggle-featured`, {
      method: 'PATCH',
      headers: this.getAuthHeaders(),
      body: JSON.stringify({ featured })
    })
    if (!response.ok) throw new Error('Error al cambiar destacado')
  }

  // ============== PRECIOS ==============

  async quickUpdatePrice(optionId, newPrice) {
    const response = await fetch(`${API_BASE_URL}/prices/quick-update`, {
      method: 'PATCH',
      headers: this.getAuthHeaders(),
      body: JSON.stringify({ optionId, newPrice })
    })
    if (!response.ok) throw new Error('Error al actualizar precio')
  }

  async bulkUpdatePrices(updates) {
    const response = await fetch(`${API_BASE_URL}/prices/bulk-update`, {
      method: 'PATCH',
      headers: this.getAuthHeaders(),
      body: JSON.stringify(updates)
    })
    if (!response.ok) throw new Error('Error al actualizar precios')
  }

  async toggleOptionAvailable(optionId, available) {
    const response = await fetch(`${API_BASE_URL}/options/${optionId}/toggle-available`, {
      method: 'PATCH',
      headers: this.getAuthHeaders(),
      body: JSON.stringify({ available })
    })
    if (!response.ok) throw new Error('Error al cambiar disponibilidad de opción')
  }
}

export const adminService = new AdminService()
