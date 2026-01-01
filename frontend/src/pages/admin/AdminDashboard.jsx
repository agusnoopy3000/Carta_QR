import { useState, useEffect } from 'react'
import { useAuth } from '../../context/AuthContext'
import { adminService } from '../../services/adminService'
import { 
  Anchor, LogOut, Package, Tag, RefreshCw, 
  Search, Filter, ChevronRight, Edit3, 
  ToggleLeft, ToggleRight, DollarSign, Eye, EyeOff,
  CheckCircle, XCircle, AlertTriangle
} from 'lucide-react'
import ProductEditModal from './ProductEditModal'

export default function AdminDashboard() {
  const { logout } = useAuth()
  const [categories, setCategories] = useState([])
  const [products, setProducts] = useState([])
  const [selectedCategory, setSelectedCategory] = useState(null)
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [showUnavailable, setShowUnavailable] = useState(true)
  const [editingProduct, setEditingProduct] = useState(null)
  const [toast, setToast] = useState(null)

  useEffect(() => {
    loadCategories()
  }, [])

  useEffect(() => {
    if (selectedCategory) {
      loadProducts(selectedCategory.id)
    } else {
      loadAllProducts()
    }
  }, [selectedCategory])

  const loadCategories = async () => {
    try {
      const data = await adminService.getCategories()
      setCategories(data)
    } catch (error) {
      showToast('Error al cargar categorías', 'error')
    }
  }

  const loadAllProducts = async () => {
    setLoading(true)
    try {
      const data = await adminService.getProducts()
      setProducts(data)
    } catch (error) {
      showToast('Error al cargar productos', 'error')
    } finally {
      setLoading(false)
    }
  }

  const loadProducts = async (categoryId) => {
    setLoading(true)
    try {
      const data = await adminService.getProductsByCategory(categoryId)
      setProducts(data)
    } catch (error) {
      showToast('Error al cargar productos', 'error')
    } finally {
      setLoading(false)
    }
  }

  const handleToggleAvailable = async (product) => {
    try {
      await adminService.toggleProductAvailable(product.id, !product.available)
      setProducts(products.map(p => 
        p.id === product.id ? { ...p, available: !p.available } : p
      ))
      showToast(
        `${product.nameEs} ahora está ${!product.available ? 'disponible' : 'no disponible'}`,
        !product.available ? 'success' : 'warning'
      )
    } catch (error) {
      showToast('Error al cambiar disponibilidad', 'error')
    }
  }

  const handleProductUpdated = (updatedProduct) => {
    setProducts(products.map(p => 
      p.id === updatedProduct.id ? updatedProduct : p
    ))
    setEditingProduct(null)
    showToast('Producto actualizado correctamente', 'success')
  }

  const showToast = (message, type = 'info') => {
    setToast({ message, type })
    setTimeout(() => setToast(null), 3000)
  }

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.nameEs?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.descriptionEs?.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesAvailable = showUnavailable || product.available
    return matchesSearch && matchesAvailable
  })

  const stats = {
    total: products.length,
    available: products.filter(p => p.available).length,
    unavailable: products.filter(p => !p.available).length
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header - Mobile optimized */}
      <header className="bg-gradient-to-r from-slate-800 to-slate-900 text-white sticky top-0 z-50 shadow-lg">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 py-3 sm:py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-cyan-400 to-blue-600 rounded-lg sm:rounded-xl flex items-center justify-center">
                <Anchor className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
              </div>
              <div>
                <h1 className="font-bold text-base sm:text-lg">El Macho</h1>
                <p className="text-cyan-300 text-[10px] sm:text-xs">Panel Admin</p>
              </div>
            </div>
            
            <div className="flex items-center gap-2 sm:gap-3">
              <a
                href="/"
                target="_blank"
                className="p-2 sm:px-3 sm:py-2 bg-white/10 hover:bg-white/20 rounded-lg text-sm font-medium transition-colors flex items-center gap-2"
                title="Ver Carta"
              >
                <Eye className="w-4 h-4" />
                <span className="hidden sm:inline">Ver Carta</span>
              </a>
              <button
                onClick={logout}
                className="p-2 sm:px-3 sm:py-2 bg-red-500/20 hover:bg-red-500/30 text-red-300 rounded-lg text-sm font-medium transition-colors flex items-center gap-2"
                title="Cerrar sesión"
              >
                <LogOut className="w-4 h-4" />
                <span className="hidden sm:inline">Salir</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-3 sm:px-4 py-4 sm:py-6">
        {/* Stats Cards - Mobile optimized */}
        <div className="grid grid-cols-3 gap-2 sm:gap-4 mb-4 sm:mb-6">
          <div className="bg-white rounded-lg sm:rounded-xl p-2 sm:p-4 shadow-sm border border-gray-100">
            <div className="flex flex-col sm:flex-row items-center sm:gap-3 text-center sm:text-left">
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-blue-100 rounded-lg flex items-center justify-center mb-1 sm:mb-0">
                <Package className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600" />
              </div>
              <div>
                <p className="text-lg sm:text-2xl font-bold text-gray-900">{stats.total}</p>
                <p className="text-[10px] sm:text-xs text-gray-500">Total</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg sm:rounded-xl p-2 sm:p-4 shadow-sm border border-gray-100">
            <div className="flex flex-col sm:flex-row items-center sm:gap-3 text-center sm:text-left">
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-green-100 rounded-lg flex items-center justify-center mb-1 sm:mb-0">
                <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-green-600" />
              </div>
              <div>
                <p className="text-lg sm:text-2xl font-bold text-gray-900">{stats.available}</p>
                <p className="text-[10px] sm:text-xs text-gray-500">Disponibles</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg sm:rounded-xl p-2 sm:p-4 shadow-sm border border-gray-100">
            <div className="flex flex-col sm:flex-row items-center sm:gap-3 text-center sm:text-left">
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-red-100 rounded-lg flex items-center justify-center mb-1 sm:mb-0">
                <XCircle className="w-4 h-4 sm:w-5 sm:h-5 text-red-600" />
              </div>
              <div>
                <p className="text-lg sm:text-2xl font-bold text-gray-900">{stats.unavailable}</p>
                <p className="text-[10px] sm:text-xs text-gray-500">No disp.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Category Filter - Mobile horizontal scroll */}
        <div className="bg-white rounded-lg sm:rounded-xl p-3 sm:p-4 shadow-sm border border-gray-100 mb-4 sm:mb-6">
          <h3 className="text-xs sm:text-sm font-semibold text-gray-700 mb-2 sm:mb-3 flex items-center gap-2">
            <Tag className="w-3 h-3 sm:w-4 sm:h-4" />
            Categoría
          </h3>
          <div className="flex gap-2 overflow-x-auto pb-2 -mx-3 px-3 sm:mx-0 sm:px-0 sm:flex-wrap scrollbar-hide">
            <button
              onClick={() => setSelectedCategory(null)}
              className={`px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg text-xs sm:text-sm font-medium transition-all flex-shrink-0 ${
                !selectedCategory 
                  ? 'bg-cyan-500 text-white shadow-md' 
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              Todas
            </button>
            {categories.map(cat => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg text-xs sm:text-sm font-medium transition-all flex items-center gap-1 sm:gap-2 flex-shrink-0 ${
                  selectedCategory?.id === cat.id
                    ? 'bg-cyan-500 text-white shadow-md'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                <span className="text-sm sm:text-base">{cat.iconUrl || '📦'}</span>
                <span className="whitespace-nowrap">{cat.nameEs}</span>
                <span className="text-[10px] sm:text-xs opacity-70">({cat.productCount || 0})</span>
              </button>
            ))}
          </div>
        </div>

        {/* Search and Filters - Mobile optimized */}
        <div className="bg-white rounded-lg sm:rounded-xl p-3 sm:p-4 shadow-sm border border-gray-100 mb-4 sm:mb-6">
          <div className="flex flex-col gap-3 sm:gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Buscar productos..."
                className="w-full pl-9 sm:pl-10 pr-4 py-2 sm:py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
              />
            </div>
            
            <div className="flex items-center justify-between sm:justify-start gap-2 sm:gap-4">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={showUnavailable}
                  onChange={(e) => setShowUnavailable(e.target.checked)}
                  className="w-4 h-4 text-cyan-500 rounded focus:ring-cyan-500"
                />
                <span className="text-xs sm:text-sm text-gray-600">Mostrar no disponibles</span>
              </label>
              
              <button
                onClick={() => selectedCategory ? loadProducts(selectedCategory.id) : loadAllProducts()}
                className="p-2 sm:px-4 sm:py-2.5 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm font-medium transition-colors flex items-center gap-2"
                title="Actualizar lista"
              >
                <RefreshCw className="w-4 h-4" />
                <span className="hidden sm:inline">Actualizar</span>
              </button>
            </div>
          </div>
        </div>

        {/* Products Grid */}
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="text-center">
              <RefreshCw className="w-8 h-8 text-cyan-500 animate-spin mx-auto mb-3" />
              <p className="text-gray-500">Cargando productos...</p>
            </div>
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="text-center py-20">
            <Package className="w-12 h-12 text-gray-300 mx-auto mb-3" />
            <p className="text-gray-500">No se encontraron productos</p>
          </div>
        ) : (
          <div className="grid gap-4">
            {filteredProducts.map(product => (
              <ProductCard
                key={product.id}
                product={product}
                onEdit={() => setEditingProduct(product)}
                onToggleAvailable={() => handleToggleAvailable(product)}
              />
            ))}
          </div>
        )}
      </div>

      {/* Edit Modal */}
      {editingProduct && (
        <ProductEditModal
          product={editingProduct}
          onClose={() => setEditingProduct(null)}
          onSave={handleProductUpdated}
        />
      )}

      {/* Toast - Mobile optimized */}
      {toast && (
        <div className={`
          fixed bottom-4 left-4 right-4 sm:left-auto sm:right-4 sm:max-w-sm px-4 py-3 rounded-xl shadow-lg flex items-center gap-3 z-50 animate-slide-up
          ${toast.type === 'success' ? 'bg-green-500 text-white' : ''}
          ${toast.type === 'error' ? 'bg-red-500 text-white' : ''}
          ${toast.type === 'warning' ? 'bg-amber-500 text-white' : ''}
          ${toast.type === 'info' ? 'bg-cyan-500 text-white' : ''}
        `}>
          {toast.type === 'success' && <CheckCircle className="w-5 h-5 flex-shrink-0" />}
          {toast.type === 'error' && <XCircle className="w-5 h-5 flex-shrink-0" />}
          {toast.type === 'warning' && <AlertTriangle className="w-5 h-5 flex-shrink-0" />}
          <span className="font-medium text-sm sm:text-base">{toast.message}</span>
        </div>
      )}

      <style>{`
        @keyframes slide-up {
          from { transform: translateY(100%); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        .animate-slide-up {
          animation: slide-up 0.3s ease-out;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  )
}

// Product Card Component - Mobile optimized
function ProductCard({ product, onEdit, onToggleAvailable }) {
  const formatPrice = (price) => {
    return new Intl.NumberFormat('es-CL', {
      style: 'currency',
      currency: 'CLP',
      minimumFractionDigits: 0
    }).format(price)
  }

  return (
    <div className={`
      bg-white rounded-lg sm:rounded-xl p-3 sm:p-4 shadow-sm border transition-all
      ${product.available ? 'border-gray-100' : 'border-red-200 bg-red-50/50'}
    `}>
      <div className="flex items-start gap-3 sm:gap-4">
        {/* Image placeholder */}
        <div className={`
          w-12 h-12 sm:w-16 sm:h-16 rounded-lg flex items-center justify-center flex-shrink-0
          ${product.available ? 'bg-cyan-100' : 'bg-gray-200'}
        `}>
          {product.imageUrl ? (
            <img src={product.imageUrl} alt={product.nameEs} className="w-full h-full object-cover rounded-lg" />
          ) : (
            <Package className={`w-6 h-6 sm:w-8 sm:h-8 ${product.available ? 'text-cyan-500' : 'text-gray-400'}`} />
          )}
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2 mb-1">
            <h3 className={`font-semibold text-sm sm:text-base ${product.available ? 'text-gray-900' : 'text-gray-500'}`}>
              {product.nameEs}
            </h3>
            {!product.available && (
              <span className="px-1.5 sm:px-2 py-0.5 bg-red-100 text-red-600 text-[10px] sm:text-xs font-medium rounded-full flex-shrink-0">
                No disp.
              </span>
            )}
          </div>
          
          {product.descriptionEs && (
            <p className="text-xs sm:text-sm text-gray-500 line-clamp-1 mb-2">{product.descriptionEs}</p>
          )}

          {/* Options/Prices */}
          <div className="flex flex-wrap gap-1 sm:gap-2">
            {product.options?.slice(0, 3).map(option => (
              <span
                key={option.id}
                className={`
                  px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-md text-[10px] sm:text-xs font-medium
                  ${option.available 
                    ? 'bg-gray-100 text-gray-700' 
                    : 'bg-gray-100 text-gray-400 line-through'}
                `}
              >
                {option.nameEs}: {formatPrice(option.price)}
              </span>
            ))}
            {product.options?.length > 3 && (
              <span className="px-1.5 py-0.5 bg-gray-100 text-gray-500 rounded-md text-[10px] font-medium">
                +{product.options.length - 3} más
              </span>
            )}
            {product.basePrice && !product.options?.length && (
              <span className="px-1.5 sm:px-2 py-0.5 sm:py-1 bg-cyan-100 text-cyan-700 rounded-md text-[10px] sm:text-xs font-medium">
                {formatPrice(product.basePrice)}
              </span>
            )}
          </div>
        </div>

        {/* Actions - Vertical on mobile */}
        <div className="flex flex-col sm:flex-row items-center gap-1.5 sm:gap-2 flex-shrink-0">
          <button
            onClick={onToggleAvailable}
            className={`
              p-1.5 sm:p-2 rounded-lg transition-colors
              ${product.available 
                ? 'bg-green-100 text-green-600 hover:bg-green-200' 
                : 'bg-gray-100 text-gray-400 hover:bg-gray-200'}
            `}
            title={product.available ? 'Marcar como no disponible' : 'Marcar como disponible'}
          >
            {product.available ? <ToggleRight className="w-4 h-4 sm:w-5 sm:h-5" /> : <ToggleLeft className="w-4 h-4 sm:w-5 sm:h-5" />}
          </button>
          
          <button
            onClick={onEdit}
            className="p-1.5 sm:p-2 bg-cyan-100 text-cyan-600 hover:bg-cyan-200 rounded-lg transition-colors"
            title="Editar producto"
          >
            <Edit3 className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
        </div>
      </div>
    </div>
  )
}
