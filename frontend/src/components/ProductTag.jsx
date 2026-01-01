import { 
  Users, 
  Utensils, 
  Star, 
  Tag, 
  Share2, 
  Flame, 
  Home,
  Anchor,
  Leaf,
  TrendingUp,
  Maximize,
  Scale,
  Zap,
  Award,
  ChefHat,
  Heart,
  ThumbsUp,
  Sparkles,
  Crown,
  Fish
} from 'lucide-react'

const iconMap = {
  users: Users,
  utensils: Utensils,
  star: Star,
  tag: Tag,
  'share-2': Share2,
  share: Share2,
  flame: Flame,
  fire: Flame,
  home: Home,
  anchor: Anchor,
  leaf: Leaf,
  plate: Utensils,
  'trending-up': TrendingUp,
  maximize: Maximize,
  scale: Scale,
  zap: Zap,
  award: Award,
  'chef-hat': ChefHat,
  heart: Heart,
  'thumbs-up': ThumbsUp,
  sparkles: Sparkles,
  crown: Crown,
  fish: Fish
}

// Pre-defined gradient backgrounds with coastal theme
const tagGradients = {
  portion: 'from-seafoam-400 to-seafoam-500',      // Espuma de mar
  sharing: 'from-ocean-400 to-ocean-600',          // Océano
  value: 'from-sunset-400 to-sunset-600',          // Atardecer
  special: 'from-coral-400 to-coral-600',          // Coral
  dietary: 'from-seafoam-300 to-seafoam-400',      // Verde mar
  promo: 'from-ocean-500 to-ocean-700',            // Azul profundo
  default: 'from-driftwood-400 to-driftwood-600'   // Madera de bote
}

export default function ProductTag({ tag, size = 'normal' }) {
  const IconComponent = iconMap[tag.iconName] || Tag
  
  // Determine if we should use gradient (for important tags) or solid color
  const useGradient = tag.important || tag.type === 'PORTION' || tag.type === 'SHARING'
  
  // Get appropriate gradient based on tag type
  const getGradientClass = () => {
    if (tag.type === 'PORTION') return tagGradients.portion
    if (tag.type === 'SHARING') return tagGradients.sharing
    if (tag.type === 'VALUE') return tagGradients.value
    if (tag.type === 'SPECIAL') return tagGradients.special
    if (tag.type === 'DIETARY') return tagGradients.dietary
    if (tag.type === 'PROMO') return tagGradients.promo
    return tagGradients.default
  }

  const sizeClasses = {
    small: 'text-[10px] px-1.5 py-0.5 gap-0.5',
    normal: 'text-xs px-2.5 py-1 gap-1',
    large: 'text-sm px-3 py-1.5 gap-1.5'
  }

  const iconSizes = {
    small: 'w-2.5 h-2.5',
    normal: 'w-3.5 h-3.5',
    large: 'w-4 h-4'
  }

  if (useGradient) {
    return (
      <span 
        className={`
          inline-flex items-center rounded-full font-bold uppercase tracking-wide
          bg-gradient-to-r ${getGradientClass()} text-white
          shadow-sm
          ${sizeClasses[size]}
        `}
      >
        <IconComponent className={iconSizes[size]} strokeWidth={2.5} />
        <span className="whitespace-nowrap">{tag.text}</span>
      </span>
    )
  }

  // Solid color version for less prominent tags - coastal colors
  return (
    <span 
      className={`
        inline-flex items-center rounded-full font-semibold
        transition-all duration-200 bg-sand-100 text-driftwood-700
        ${sizeClasses[size]}
      `}
      style={{
        backgroundColor: tag.backgroundColor || undefined,
        color: tag.textColor || undefined
      }}
    >
      <IconComponent className={iconSizes[size]} />
      <span className="whitespace-nowrap">{tag.text}</span>
    </span>
  )
}

// Specialized badges with coastal theme
export function PortionBadge({ text, language = 'es' }) {
  return (
    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold uppercase tracking-wide bg-gradient-to-r from-seafoam-400 to-seafoam-500 text-white shadow-sm">
      <Maximize className="w-3.5 h-3.5" />
      <span>{text || (language === 'es' ? 'Porción abundante' : 'Large portion')}</span>
    </span>
  )
}

export function SharingBadge({ people, language = 'es' }) {
  return (
    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold uppercase tracking-wide bg-gradient-to-r from-ocean-400 to-ocean-600 text-white shadow-sm">
      <Users className="w-3.5 h-3.5" />
      <span>
        {people} {language === 'es' ? 'personas' : 'people'}
      </span>
    </span>
  )
}

export function RecommendedBadge({ language = 'es' }) {
  return (
    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold uppercase tracking-wide bg-gradient-to-r from-sunset-400 to-sunset-600 text-white shadow-sm">
      <Star className="w-3.5 h-3.5" fill="currentColor" />
      <span>{language === 'es' ? 'Recomendado' : 'Recommended'}</span>
    </span>
  )
}

export function CatchOfDayBadge({ language = 'es' }) {
  return (
    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold uppercase tracking-wide bg-gradient-to-r from-ocean-500 to-ocean-700 text-white shadow-sm animate-pulse">
      <Fish className="w-3.5 h-3.5" />
      <span>{language === 'es' ? 'Pesca del día' : 'Catch of the day'}</span>
    </span>
  )
}

export function MachoSizeBadge({ language = 'es' }) {
  return (
    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold uppercase tracking-wide bg-gradient-to-r from-sunset-500 to-coral-500 text-white shadow-sm">
      <Flame className="w-3.5 h-3.5" />
      <span>{language === 'es' ? '¡Tamaño Macho!' : 'Macho Size!'}</span>
    </span>
  )
}
