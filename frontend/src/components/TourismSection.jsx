import { useState } from 'react'
import { 
  MapPin, 
  Clock, 
  Car, 
  Waves, 
  Sun, 
  Camera,
  ChevronRight,
  X,
  Navigation,
  Palmtree,
  Umbrella
} from 'lucide-react'

// Datos de las playas y rutas de Caldera
const beaches = [
  {
    id: 1,
    nameEs: 'Bahía Inglesa',
    nameEn: 'English Bay',
    descriptionEs: 'Aguas cristalinas color turquesa, arena blanca. La playa más famosa del norte de Chile.',
    descriptionEn: 'Crystal clear turquoise waters, white sand. The most famous beach in northern Chile.',
    distance: '5 km',
    time: '8 min',
    features: ['🏊 Aguas calmas', '🏖️ Arena blanca', '🍽️ Restaurantes'],
    featuresEn: ['🏊 Calm waters', '🏖️ White sand', '🍽️ Restaurants'],
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400&h=300&fit=crop',
    mapUrl: 'https://maps.google.com/?q=Bahia+Inglesa+Chile',
    highlight: true
  },
  {
    id: 2,
    nameEs: 'Playa La Virgen',
    nameEn: 'La Virgen Beach',
    descriptionEs: 'Playa virgen con formaciones rocosas únicas. Ideal para snorkel y fotografía.',
    descriptionEn: 'Virgin beach with unique rock formations. Ideal for snorkeling and photography.',
    distance: '15 km',
    time: '20 min',
    features: ['📷 Paisajes únicos', '🤿 Snorkel', '🌅 Atardeceres'],
    featuresEn: ['📷 Unique landscapes', '🤿 Snorkeling', '🌅 Sunsets'],
    image: 'https://images.unsplash.com/photo-1519046904884-53103b34b206?w=400&h=300&fit=crop',
    mapUrl: 'https://maps.google.com/?q=Playa+La+Virgen+Chile'
  },
  {
    id: 3,
    nameEs: 'Playa Las Machas',
    nameEn: 'Las Machas Beach',
    descriptionEs: 'Playa local con oleaje moderado. Perfecta para caminar y recolectar conchas.',
    descriptionEn: 'Local beach with moderate waves. Perfect for walking and collecting shells.',
    distance: '2 km',
    time: '5 min',
    features: ['🚶 Caminatas', '🐚 Conchas', '🎣 Pesca'],
    featuresEn: ['🚶 Walks', '🐚 Shells', '🎣 Fishing'],
    image: 'https://images.unsplash.com/photo-1473116763249-2faaef81ccda?w=400&h=300&fit=crop',
    mapUrl: 'https://maps.google.com/?q=Playa+Las+Machas+Caldera'
  },
  {
    id: 4,
    nameEs: 'Playa El Chuncho',
    nameEn: 'El Chuncho Beach',
    descriptionEs: 'Pequeña caleta con aguas tranquilas, ideal para familias con niños.',
    descriptionEn: 'Small cove with calm waters, ideal for families with children.',
    distance: '8 km',
    time: '12 min',
    features: ['👨‍👩‍👧 Familiar', '🏊 Segura', '🅿️ Estacionamiento'],
    featuresEn: ['👨‍👩‍👧 Family-friendly', '🏊 Safe', '🅿️ Parking'],
    image: 'https://images.unsplash.com/photo-1506953823976-52e1fdc0149a?w=400&h=300&fit=crop',
    mapUrl: 'https://maps.google.com/?q=Playa+Chuncho+Caldera'
  },
  {
    id: 5,
    nameEs: 'Playa Rodillo',
    nameEn: 'Rodillo Beach',
    descriptionEs: 'Aguas color esmeralda rodeadas de dunas. Un paraíso escondido.',
    descriptionEn: 'Emerald waters surrounded by dunes. A hidden paradise.',
    distance: '12 km',
    time: '18 min',
    features: ['💎 Aguas esmeralda', '🏜️ Dunas', '🔇 Tranquila'],
    featuresEn: ['💎 Emerald waters', '🏜️ Dunes', '🔇 Quiet'],
    image: 'https://images.unsplash.com/photo-1520454974749-611b7248ffdb?w=400&h=300&fit=crop',
    mapUrl: 'https://maps.google.com/?q=Playa+Rodillo+Chile'
  }
]

export default function TourismSection({ language = 'es' }) {
  const [isExpanded, setIsExpanded] = useState(false)
  const [selectedBeach, setSelectedBeach] = useState(null)

  const t = {
    title: language === 'es' ? '🏖️ Explora Caldera' : '🏖️ Explore Caldera',
    subtitle: language === 'es' ? 'Las mejores playas del norte de Chile' : 'The best beaches in northern Chile',
    seeAll: language === 'es' ? 'Ver todas las playas' : 'See all beaches',
    hide: language === 'es' ? 'Ocultar' : 'Hide',
    fromHere: language === 'es' ? 'desde aquí' : 'from here',
    howToGet: language === 'es' ? 'Cómo llegar' : 'How to get there',
    recommended: language === 'es' ? '⭐ Recomendada' : '⭐ Recommended',
    close: language === 'es' ? 'Cerrar' : 'Close'
  }

  return (
    <section className="bg-gradient-to-br from-ocean-50 via-sand-50 to-ocean-50 py-6 px-4">
      {/* Header de la sección */}
      <div className="max-w-lg mx-auto mb-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-ocean-900 flex items-center gap-2">
              <Waves className="w-6 h-6 text-ocean-500" />
              {t.title}
            </h2>
            <p className="text-sm text-ocean-600">{t.subtitle}</p>
          </div>
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-sm font-medium text-sunset-600 hover:text-sunset-700 flex items-center gap-1"
          >
            {isExpanded ? t.hide : t.seeAll}
            <ChevronRight className={`w-4 h-4 transition-transform ${isExpanded ? 'rotate-90' : ''}`} />
          </button>
        </div>
      </div>

      {/* Carrusel horizontal de playas */}
      <div className="max-w-lg mx-auto">
        <div 
          className={`
            flex gap-3 overflow-x-auto pb-3 scrollbar-hide
            ${isExpanded ? 'flex-wrap justify-center' : ''}
          `}
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {beaches.slice(0, isExpanded ? beaches.length : 3).map((beach) => (
            <BeachCard 
              key={beach.id}
              beach={beach}
              language={language}
              t={t}
              onClick={() => setSelectedBeach(beach)}
              isExpanded={isExpanded}
            />
          ))}
        </div>
      </div>

      {/* Modal de detalle de playa */}
      {selectedBeach && (
        <BeachDetailModal
          beach={selectedBeach}
          language={language}
          t={t}
          onClose={() => setSelectedBeach(null)}
        />
      )}
    </section>
  )
}

// Tarjeta de playa
function BeachCard({ beach, language, t, onClick, isExpanded }) {
  return (
    <button
      onClick={onClick}
      className={`
        relative flex-shrink-0 bg-white rounded-2xl overflow-hidden shadow-md 
        hover:shadow-lg transition-all duration-300 group border border-ocean-100
        ${isExpanded ? 'w-full sm:w-[calc(50%-6px)]' : 'w-[260px]'}
      `}
    >
      {/* Imagen */}
      <div className="relative h-32 overflow-hidden">
        <img
          src={beach.image}
          alt={language === 'es' ? beach.nameEs : beach.nameEn}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
        
        {/* Badge destacada */}
        {beach.highlight && (
          <span className="absolute top-2 left-2 px-2 py-1 bg-sunset-500 text-white text-xs font-bold rounded-full shadow-lg">
            {t.recommended}
          </span>
        )}
        
        {/* Nombre sobre la imagen */}
        <div className="absolute bottom-2 left-3 right-3">
          <h3 className="text-white font-bold text-lg drop-shadow-lg">
            {language === 'es' ? beach.nameEs : beach.nameEn}
          </h3>
        </div>
      </div>
      
      {/* Info */}
      <div className="p-3">
        <div className="flex items-center justify-between text-sm text-driftwood-600 mb-2">
          <span className="flex items-center gap-1">
            <Car className="w-4 h-4 text-ocean-500" />
            {beach.distance}
          </span>
          <span className="flex items-center gap-1">
            <Clock className="w-4 h-4 text-ocean-500" />
            {beach.time}
          </span>
        </div>
        
        {/* Features */}
        <div className="flex flex-wrap gap-1">
          {(language === 'es' ? beach.features : beach.featuresEn).slice(0, 2).map((feature, i) => (
            <span key={i} className="text-xs bg-ocean-50 text-ocean-700 px-2 py-0.5 rounded-full">
              {feature}
            </span>
          ))}
        </div>
      </div>
    </button>
  )
}

// Modal de detalle
function BeachDetailModal({ beach, language, t, onClose }) {
  return (
    <div 
      className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-end sm:items-center justify-center p-0 sm:p-4"
      onClick={onClose}
    >
      <div 
        className="bg-white rounded-t-3xl sm:rounded-2xl w-full sm:max-w-md max-h-[85vh] overflow-hidden animate-slide-up"
        onClick={e => e.stopPropagation()}
      >
        {/* Imagen grande */}
        <div className="relative h-48 sm:h-56">
          <img
            src={beach.image}
            alt={language === 'es' ? beach.nameEs : beach.nameEn}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          
          {/* Cerrar */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 bg-black/30 hover:bg-black/50 rounded-full text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
          
          {/* Título */}
          <div className="absolute bottom-4 left-4 right-4">
            <h2 className="text-white font-bold text-2xl drop-shadow-lg">
              {language === 'es' ? beach.nameEs : beach.nameEn}
            </h2>
            <div className="flex items-center gap-3 text-white/90 text-sm mt-1">
              <span className="flex items-center gap-1">
                <Car className="w-4 h-4" />
                {beach.distance} {t.fromHere}
              </span>
              <span className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                {beach.time}
              </span>
            </div>
          </div>
        </div>
        
        {/* Contenido */}
        <div className="p-5">
          <p className="text-driftwood-700 mb-4">
            {language === 'es' ? beach.descriptionEs : beach.descriptionEn}
          </p>
          
          {/* Features */}
          <div className="flex flex-wrap gap-2 mb-5">
            {(language === 'es' ? beach.features : beach.featuresEn).map((feature, i) => (
              <span key={i} className="text-sm bg-ocean-50 text-ocean-700 px-3 py-1.5 rounded-full font-medium">
                {feature}
              </span>
            ))}
          </div>
          
          {/* Botón de navegación */}
          <a
            href={beach.mapUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 w-full py-3.5 bg-gradient-to-r from-ocean-500 to-ocean-600 text-white font-bold rounded-xl shadow-lg shadow-ocean-500/30 hover:shadow-xl transition-all"
          >
            <Navigation className="w-5 h-5" />
            {t.howToGet}
          </a>
        </div>
      </div>
    </div>
  )
}
