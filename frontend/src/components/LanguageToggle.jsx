import { useLanguage } from '../context/LanguageContext'

export default function LanguageToggle() {
  const { language, setLanguage } = useLanguage()

  return (
    <div className="fixed top-4 right-4 z-50">
      <div className="bg-white rounded-full shadow-lg border border-gray-200 p-1 flex">
        <button
          onClick={() => setLanguage('es')}
          className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all duration-200 ${
            language === 'es'
              ? 'bg-macho-500 text-white'
              : 'text-gray-600 hover:bg-gray-100'
          }`}
        >
          ES
        </button>
        <button
          onClick={() => setLanguage('en')}
          className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all duration-200 ${
            language === 'en'
              ? 'bg-macho-500 text-white'
              : 'text-gray-600 hover:bg-gray-100'
          }`}
        >
          EN
        </button>
      </div>
    </div>
  )
}
