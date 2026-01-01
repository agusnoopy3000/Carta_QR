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
  Crown
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
  crown: Crown
}

// Pre-defined gradient backgrounds for different tag types
const tagGradients = {
  portion: 'from-emerald-500 to-green-600',
  sharing: 'from-purple-500 to-violet-600',
  value: 'from-amber-500 to-orange-600',
  special: 'from-rose-500 to-red-600',
  dietary: 'from-lime-500 to-green-600',
  promo: 'from-cyan-500 to-blue-600',
  default: 'from-gray-500 to-slate-600'
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
        style={{
          boxShadow: `0 2px 6px ${tag.backgroundColor}50`
        }}
      >
        <IconComponent className={iconSizes[size]} strokeWidth={2.5} />
        <span className="whitespace-nowrap">{tag.text}</span>
      </span>
    )
  }

  // Solid color version for less prominent tags
  return (
    <span 
      className={`
        inline-flex items-center rounded-full font-semibold
        transition-all duration-200
        ${sizeClasses[size]}
      `}
      style={{
        backgroundColor: tag.backgroundColor || '#E5E7EB',
        color: tag.textColor || '#374151',
        boxShadow: `0 1px 3px ${tag.backgroundColor}30`
      }}
    >
      <IconComponent className={iconSizes[size]} />
      <span className="whitespace-nowrap">{tag.text}</span>
    </span>
  )
}

// Specialized badges for common use cases
export function PortionBadge({ text, language = 'es' }) {
  return (
    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold uppercase tracking-wide bg-gradient-to-r from-emerald-500 to-green-600 text-white shadow-sm shadow-green-200">
      <Maximize className="w-3.5 h-3.5" />
      <span>{text || (language === 'es' ? 'Porción abundante' : 'Large portion')}</span>
    </span>
  )
}

export function SharingBadge({ people, language = 'es' }) {
  return (
    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold uppercase tracking-wide bg-gradient-to-r from-purple-500 to-violet-600 text-white shadow-sm shadow-purple-200">
      <Users className="w-3.5 h-3.5" />
      <span>
        {people} {language === 'es' ? 'personas' : 'people'}
      </span>
    </span>
  )
}

export function RecommendedBadge({ language = 'es' }) {
  return (
    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold uppercase tracking-wide bg-gradient-to-r from-amber-400 to-orange-500 text-white shadow-sm shadow-amber-200">
      <Star className="w-3.5 h-3.5" fill="currentColor" />
      <span>{language === 'es' ? 'Recomendado' : 'Recommended'}</span>
    </span>
  )
}

export function CatchOfDayBadge({ language = 'es' }) {
  return (
    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold uppercase tracking-wide bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-sm shadow-cyan-200 animate-pulse">
      <Anchor className="w-3.5 h-3.5" />
      <span>{language === 'es' ? 'Pesca del día' : 'Catch of the day'}</span>
    </span>
  )
}

export function MachoSizeBadge({ language = 'es' }) {
  return (
    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold uppercase tracking-wide bg-gradient-to-r from-red-500 to-rose-600 text-white shadow-sm shadow-red-200">
      <Flame className="w-3.5 h-3.5" />
      <span>{language === 'es' ? '¡Tamaño Macho!' : 'Macho Size!'}</span>
    </span>
  )
}
