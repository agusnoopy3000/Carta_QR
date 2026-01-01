/**
 * ♿ Controles de Accesibilidad
 * Toggle alto contraste, tamaño de texto
 */
import { useState } from 'react';
import { 
  Settings, 
  Sun, 
  Moon, 
  Type, 
  Minus, 
  Plus, 
  X,
  Eye,
  Zap
} from 'lucide-react';
import { useAccessibility } from '../context/AccessibilityContext';
import { useLanguage } from '../context/LanguageContext';
import { useHaptic } from '../hooks/useHaptic';

export default function AccessibilityControls() {
  const [isOpen, setIsOpen] = useState(false);
  const { 
    highContrast, 
    fontSize, 
    reducedMotion,
    toggleHighContrast, 
    setFontSize,
    toggleReducedMotion 
  } = useAccessibility();
  const { language } = useLanguage();
  const { lightTap } = useHaptic();

  const fontSizes = ['small', 'normal', 'large', 'xlarge'];
  const currentIndex = fontSizes.indexOf(fontSize);

  const decreaseFont = () => {
    if (currentIndex > 0) {
      lightTap();
      setFontSize(fontSizes[currentIndex - 1]);
    }
  };

  const increaseFont = () => {
    if (currentIndex < fontSizes.length - 1) {
      lightTap();
      setFontSize(fontSizes[currentIndex + 1]);
    }
  };

  const t = {
    es: {
      accessibility: 'Accesibilidad',
      highContrast: 'Alto Contraste',
      fontSize: 'Tamaño de Texto',
      reducedMotion: 'Menos Animaciones',
      close: 'Cerrar'
    },
    en: {
      accessibility: 'Accessibility',
      highContrast: 'High Contrast',
      fontSize: 'Text Size',
      reducedMotion: 'Reduce Motion',
      close: 'Close'
    }
  };

  const texts = t[language] || t.es;

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => { lightTap(); setIsOpen(true); }}
        className={`
          fixed bottom-6 left-6 z-50
          w-12 h-12 rounded-full
          bg-gradient-to-br from-purple-500 to-indigo-600
          text-white shadow-lg shadow-purple-500/30
          flex items-center justify-center
          transform transition-all duration-300
          hover:scale-110 active:scale-95
        `}
        aria-label={texts.accessibility}
      >
        <Settings className="w-5 h-5" />
      </button>

      {/* Modal Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-end justify-center p-4"
          onClick={() => setIsOpen(false)}
        >
          {/* Panel */}
          <div 
            className="w-full max-w-md bg-white rounded-t-3xl shadow-2xl animate-slide-up"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-5 border-b border-gray-100">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-purple-100 rounded-xl">
                  <Settings className="w-5 h-5 text-purple-600" />
                </div>
                <h2 className="font-display font-bold text-lg text-gray-800">
                  {texts.accessibility}
                </h2>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>

            {/* Controls */}
            <div className="p-5 space-y-4">
              {/* High Contrast Toggle */}
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl">
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-xl ${highContrast ? 'bg-yellow-100' : 'bg-gray-200'}`}>
                    {highContrast ? (
                      <Sun className="w-5 h-5 text-yellow-600" />
                    ) : (
                      <Eye className="w-5 h-5 text-gray-600" />
                    )}
                  </div>
                  <span className="font-medium text-gray-700">{texts.highContrast}</span>
                </div>
                <button
                  onClick={() => { lightTap(); toggleHighContrast(); }}
                  className={`
                    w-14 h-8 rounded-full p-1 transition-all duration-300
                    ${highContrast ? 'bg-yellow-500' : 'bg-gray-300'}
                  `}
                >
                  <div className={`
                    w-6 h-6 bg-white rounded-full shadow-md transition-transform duration-300
                    ${highContrast ? 'translate-x-6' : 'translate-x-0'}
                  `} />
                </button>
              </div>

              {/* Font Size Control */}
              <div className="p-4 bg-gray-50 rounded-2xl">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-blue-100 rounded-xl">
                      <Type className="w-5 h-5 text-blue-600" />
                    </div>
                    <span className="font-medium text-gray-700">{texts.fontSize}</span>
                  </div>
                  <span className="text-sm font-bold text-blue-600 uppercase">{fontSize}</span>
                </div>
                <div className="flex items-center justify-center gap-4">
                  <button
                    onClick={decreaseFont}
                    disabled={currentIndex === 0}
                    className={`
                      w-12 h-12 rounded-xl flex items-center justify-center
                      transition-all duration-200
                      ${currentIndex === 0 
                        ? 'bg-gray-200 text-gray-400' 
                        : 'bg-blue-100 text-blue-600 hover:bg-blue-200 active:scale-95'}
                    `}
                  >
                    <Minus className="w-5 h-5" />
                  </button>
                  <div className="flex-1 flex justify-center gap-1">
                    {fontSizes.map((size, idx) => (
                      <div
                        key={size}
                        className={`
                          w-3 h-3 rounded-full transition-all duration-300
                          ${idx <= currentIndex ? 'bg-blue-500' : 'bg-gray-300'}
                        `}
                      />
                    ))}
                  </div>
                  <button
                    onClick={increaseFont}
                    disabled={currentIndex === fontSizes.length - 1}
                    className={`
                      w-12 h-12 rounded-xl flex items-center justify-center
                      transition-all duration-200
                      ${currentIndex === fontSizes.length - 1 
                        ? 'bg-gray-200 text-gray-400' 
                        : 'bg-blue-100 text-blue-600 hover:bg-blue-200 active:scale-95'}
                    `}
                  >
                    <Plus className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Reduced Motion Toggle */}
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl">
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-xl ${reducedMotion ? 'bg-orange-100' : 'bg-gray-200'}`}>
                    <Zap className={`w-5 h-5 ${reducedMotion ? 'text-orange-600' : 'text-gray-600'}`} />
                  </div>
                  <span className="font-medium text-gray-700">{texts.reducedMotion}</span>
                </div>
                <button
                  onClick={() => { lightTap(); toggleReducedMotion(); }}
                  className={`
                    w-14 h-8 rounded-full p-1 transition-all duration-300
                    ${reducedMotion ? 'bg-orange-500' : 'bg-gray-300'}
                  `}
                >
                  <div className={`
                    w-6 h-6 bg-white rounded-full shadow-md transition-transform duration-300
                    ${reducedMotion ? 'translate-x-6' : 'translate-x-0'}
                  `} />
                </button>
              </div>
            </div>

            {/* Safe area padding */}
            <div className="h-8" />
          </div>
        </div>
      )}
    </>
  );
}
