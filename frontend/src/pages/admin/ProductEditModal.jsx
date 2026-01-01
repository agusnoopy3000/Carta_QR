import { useState, useEffect } from 'react'
import { adminService } from '../../services/adminService'
import { 
  X, Save, DollarSign, Package, FileText, 
  ToggleLeft, ToggleRight, Plus, Trash2, AlertCircle
} from 'lucide-react'

export default function ProductEditModal({ product, onClose, onSave }) {
  const [formData, setFormData] = useState({
    id: product.id,
    nameEs: product.nameEs || '',
    nameEn: product.nameEn || '',
    descriptionEs: product.descriptionEs || '',
    descriptionEn: product.descriptionEn || '',
    basePrice: product.basePrice || 0,
    available: product.available ?? true,
    featured: product.featured ?? false,
    imageUrl: product.imageUrl || '',
    categoryId: product.categoryId,
    options: product.options || []
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [activeTab, setActiveTab] = useState('general')

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleOptionChange = (index, field, value) => {
    const newOptions = [...formData.options]
    newOptions[index] = { ...newOptions[index], [field]: value }
    setFormData(prev => ({ ...prev, options: newOptions }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const updated = await adminService.updateProduct(product.id, formData)
      onSave(updated)
    } catch (err) {
      setError('Error al guardar los cambios')
    } finally {
      setLoading(false)
    }
  }

  const handleQuickPriceUpdate = async (optionId, newPrice) => {
    try {
      await adminService.quickUpdatePrice(optionId, newPrice)
      handleOptionChange(
        formData.options.findIndex(o => o.id === optionId),
        'price',
        newPrice
      )
    } catch (err) {
      setError('Error al actualizar precio')
    }
  }

  const formatPrice = (price) => {
    return new Intl.NumberFormat('es-CL', {
      style: 'currency',
      currency: 'CLP',
      minimumFractionDigits: 0
    }).format(price)
  }

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-end sm:items-center justify-center sm:p-4">
      <div className="bg-white rounded-t-2xl sm:rounded-2xl shadow-2xl w-full sm:max-w-2xl max-h-[95vh] sm:max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="bg-gradient-to-r from-slate-800 to-slate-900 text-white px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-between">
          <div className="flex items-center gap-2 sm:gap-3">
            <Package className="w-5 h-5 sm:w-6 sm:h-6 text-cyan-400" />
            <div>
              <h2 className="font-semibold text-base sm:text-lg">Editar Producto</h2>
              <p className="text-cyan-300 text-xs sm:text-sm truncate max-w-[200px] sm:max-w-none">{product.nameEs}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-white/10 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tabs - Scrollable on mobile */}
        <div className="flex border-b border-gray-200 overflow-x-auto">
          <button
            onClick={() => setActiveTab('general')}
            className={`flex-1 min-w-[100px] py-2.5 sm:py-3 text-xs sm:text-sm font-medium transition-colors whitespace-nowrap ${
              activeTab === 'general'
                ? 'text-cyan-600 border-b-2 border-cyan-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            General
          </button>
          <button
            onClick={() => setActiveTab('prices')}
            className={`flex-1 min-w-[100px] py-2.5 sm:py-3 text-xs sm:text-sm font-medium transition-colors whitespace-nowrap ${
              activeTab === 'prices'
                ? 'text-cyan-600 border-b-2 border-cyan-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Precios
          </button>
          <button
            onClick={() => setActiveTab('translations')}
            className={`flex-1 min-w-[100px] py-2.5 sm:py-3 text-xs sm:text-sm font-medium transition-colors whitespace-nowrap ${
              activeTab === 'translations'
                ? 'text-cyan-600 border-b-2 border-cyan-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Inglés
          </button>
        </div>

        {/* Content */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto">
          <div className="p-4 sm:p-6 space-y-4 sm:space-y-5">
            {/* Error */}
            {error && (
              <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-lg sm:rounded-xl text-red-600 text-xs sm:text-sm">
                <AlertCircle className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
                <span>{error}</span>
              </div>
            )}

            {/* General Tab */}
            {activeTab === 'general' && (
              <>
                {/* Nombre */}
                <div>
                  <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1.5 sm:mb-2">
                    Nombre del producto
                  </label>
                  <input
                    type="text"
                    value={formData.nameEs}
                    onChange={(e) => handleChange('nameEs', e.target.value)}
                    className="w-full px-3 sm:px-4 py-2 sm:py-2.5 border border-gray-300 rounded-lg sm:rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                    required
                  />
                </div>

                {/* Descripción */}
                <div>
                  <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1.5 sm:mb-2">
                    Descripción
                  </label>
                  <textarea
                    value={formData.descriptionEs}
                    onChange={(e) => handleChange('descriptionEs', e.target.value)}
                    rows={2}
                    className="w-full px-3 sm:px-4 py-2 sm:py-2.5 border border-gray-300 rounded-lg sm:rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent resize-none"
                  />
                </div>

                {/* URL Imagen */}
                <div>
                  <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1.5 sm:mb-2">
                    URL de imagen (opcional)
                  </label>
                  <input
                    type="url"
                    value={formData.imageUrl}
                    onChange={(e) => handleChange('imageUrl', e.target.value)}
                    placeholder="https://..."
                    className="w-full px-3 sm:px-4 py-2 sm:py-2.5 border border-gray-300 rounded-lg sm:rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                  />
                </div>

                {/* Toggles - Stack on mobile */}
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                  <label className="flex items-center gap-3 cursor-pointer p-2.5 sm:p-3 bg-gray-50 rounded-lg sm:rounded-xl flex-1">
                    <button
                      type="button"
                      onClick={() => handleChange('available', !formData.available)}
                      className={`p-1 rounded-lg transition-colors ${
                        formData.available ? 'text-green-500' : 'text-gray-400'
                      }`}
                    >
                      {formData.available ? <ToggleRight className="w-7 h-7 sm:w-8 sm:h-8" /> : <ToggleLeft className="w-7 h-7 sm:w-8 sm:h-8" />}
                    </button>
                    <div>
                      <p className="font-medium text-gray-900 text-sm">Disponible</p>
                      <p className="text-[10px] sm:text-xs text-gray-500">Mostrar en la carta</p>
                    </div>
                  </label>

                  <label className="flex items-center gap-3 cursor-pointer p-2.5 sm:p-3 bg-gray-50 rounded-lg sm:rounded-xl flex-1">
                    <button
                      type="button"
                      onClick={() => handleChange('featured', !formData.featured)}
                      className={`p-1 rounded-lg transition-colors ${
                        formData.featured ? 'text-amber-500' : 'text-gray-400'
                      }`}
                    >
                      {formData.featured ? <ToggleRight className="w-7 h-7 sm:w-8 sm:h-8" /> : <ToggleLeft className="w-7 h-7 sm:w-8 sm:h-8" />}
                    </button>
                    <div>
                      <p className="font-medium text-gray-900 text-sm">Destacado</p>
                      <p className="text-[10px] sm:text-xs text-gray-500">Mostrar como especial</p>
                    </div>
                  </label>
                </div>
              </>
            )}

            {/* Prices Tab */}
            {activeTab === 'prices' && (
              <>
                {/* Precio base si no tiene opciones */}
                {(!formData.options || formData.options.length === 0) && (
                  <div>
                    <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1.5 sm:mb-2">
                      Precio base
                    </label>
                    <div className="relative">
                      <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
                      <input
                        type="number"
                        value={formData.basePrice}
                        onChange={(e) => handleChange('basePrice', parseInt(e.target.value) || 0)}
                        className="w-full pl-9 sm:pl-10 pr-4 py-2 sm:py-2.5 border border-gray-300 rounded-lg sm:rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                      />
                    </div>
                  </div>
                )}

                {/* Opciones con precios */}
                {formData.options && formData.options.length > 0 && (
                  <div>
                    <h4 className="text-xs sm:text-sm font-medium text-gray-700 mb-2 sm:mb-3">
                      Opciones y Precios
                    </h4>
                    <div className="space-y-2 sm:space-y-3">
                      {formData.options.map((option, index) => (
                        <div
                          key={option.id || index}
                          className={`p-3 sm:p-4 rounded-lg sm:rounded-xl border ${
                            option.available ? 'bg-white border-gray-200' : 'bg-gray-50 border-gray-200'
                          }`}
                        >
                          <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 sm:items-center">
                            <div className="flex items-center gap-2 sm:gap-4">
                              {/* Toggle disponibilidad */}
                              <button
                                type="button"
                                onClick={() => handleOptionChange(index, 'available', !option.available)}
                                className={`p-1 transition-colors ${
                                  option.available ? 'text-green-500' : 'text-gray-400'
                                }`}
                              >
                                {option.available ? <ToggleRight className="w-5 h-5 sm:w-6 sm:h-6" /> : <ToggleLeft className="w-5 h-5 sm:w-6 sm:h-6" />}
                              </button>

                              {/* Nombre opción */}
                              <div className="flex-1">
                                <input
                                  type="text"
                                  value={option.nameEs}
                                  onChange={(e) => handleOptionChange(index, 'nameEs', e.target.value)}
                                  className="w-full px-2 sm:px-3 py-1.5 sm:py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent text-sm"
                                  placeholder="Nombre"
                                />
                              </div>
                            </div>

                            {/* Precio */}
                            <div className="w-full sm:w-36 flex items-center gap-2">
                              <span className="text-gray-500 text-sm sm:hidden">Precio:</span>
                              <div className="relative flex-1 sm:flex-none sm:w-36">
                                <span className="absolute left-2 sm:left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">$</span>
                                <input
                                  type="number"
                                  value={option.price}
                                  onChange={(e) => handleOptionChange(index, 'price', parseInt(e.target.value) || 0)}
                                  className="w-full pl-6 sm:pl-7 pr-2 sm:pr-3 py-1.5 sm:py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent text-sm text-right"
                                />
                              </div>
                              <span className="text-xs text-gray-500 whitespace-nowrap">{formatPrice(option.price)}</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Tip sobre cambios de precio */}
                <div className="bg-amber-50 border border-amber-200 rounded-lg sm:rounded-xl p-3 sm:p-4">
                  <p className="text-xs sm:text-sm text-amber-800">
                    <strong>💡 Tip:</strong> Los cambios se reflejarán inmediatamente en la carta.
                  </p>
                </div>
              </>
            )}

            {/* Translations Tab */}
            {activeTab === 'translations' && (
              <>
                <div className="bg-blue-50 border border-blue-200 rounded-lg sm:rounded-xl p-3 sm:p-4 mb-3 sm:mb-4">
                  <p className="text-xs sm:text-sm text-blue-800">
                    <strong>🌐 Inglés:</strong> Se mostrará cuando el cliente cambie el idioma.
                  </p>
                </div>

                {/* Nombre en inglés */}
                <div>
                  <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1.5 sm:mb-2">
                    Nombre (Inglés)
                  </label>
                  <input
                    type="text"
                    value={formData.nameEn}
                    onChange={(e) => handleChange('nameEn', e.target.value)}
                    placeholder="Product name in English"
                    className="w-full px-3 sm:px-4 py-2 sm:py-2.5 border border-gray-300 rounded-lg sm:rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                  />
                </div>

                {/* Descripción en inglés */}
                <div>
                  <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1.5 sm:mb-2">
                    Descripción (Inglés)
                  </label>
                  <textarea
                    value={formData.descriptionEn}
                    onChange={(e) => handleChange('descriptionEn', e.target.value)}
                    rows={2}
                    placeholder="Product description in English"
                    className="w-full px-3 sm:px-4 py-2 sm:py-2.5 border border-gray-300 rounded-lg sm:rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent resize-none"
                  />
                </div>
              </>
            )}
          </div>
        </form>

        {/* Footer - Mobile optimized */}
        <div className="border-t border-gray-200 px-4 sm:px-6 py-3 sm:py-4 bg-gray-50 flex items-center justify-end gap-2 sm:gap-3">
          <button
            type="button"
            onClick={onClose}
            className="px-3 sm:px-5 py-2 sm:py-2.5 text-gray-600 hover:bg-gray-200 rounded-lg sm:rounded-xl text-sm font-medium transition-colors"
          >
            Cancelar
          </button>
          <button
            onClick={handleSubmit}
            disabled={loading}
            className={`
              px-4 sm:px-5 py-2 sm:py-2.5 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-lg sm:rounded-xl text-sm font-medium
              shadow-lg shadow-cyan-500/30 hover:shadow-xl transition-all flex items-center gap-2
              ${loading ? 'opacity-70 cursor-not-allowed' : 'hover:shadow-cyan-500/40'}
            `}
          >
            {loading ? (
              <>
                <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
                <span className="hidden sm:inline">Guardando...</span>
              </>
            ) : (
              <>
                <Save className="w-4 h-4" />
                <span>Guardar</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  )
}
