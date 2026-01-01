/**
 * ♿ Contexto de Accesibilidad
 * Controla alto contraste, tamaño de texto, y preferencias de accesibilidad
 */
import { createContext, useContext, useState, useEffect } from 'react';

const AccessibilityContext = createContext({
  highContrast: false,
  fontSize: 'normal', // 'small', 'normal', 'large', 'xlarge'
  reducedMotion: false,
  toggleHighContrast: () => {},
  setFontSize: () => {},
  toggleReducedMotion: () => {},
});

export const AccessibilityProvider = ({ children }) => {
  const [highContrast, setHighContrast] = useState(() => {
    return localStorage.getItem('elmacho-high-contrast') === 'true';
  });
  
  const [fontSize, setFontSizeState] = useState(() => {
    return localStorage.getItem('elmacho-font-size') || 'normal';
  });
  
  const [reducedMotion, setReducedMotion] = useState(() => {
    return localStorage.getItem('elmacho-reduced-motion') === 'true' ||
           window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  });

  // Apply settings to document
  useEffect(() => {
    const root = document.documentElement;
    
    // High contrast
    if (highContrast) {
      root.classList.add('high-contrast');
    } else {
      root.classList.remove('high-contrast');
    }
    localStorage.setItem('elmacho-high-contrast', highContrast);

    // Font size
    root.classList.remove('font-small', 'font-normal', 'font-large', 'font-xlarge');
    root.classList.add(`font-${fontSize}`);
    localStorage.setItem('elmacho-font-size', fontSize);

    // Reduced motion
    if (reducedMotion) {
      root.classList.add('reduced-motion');
    } else {
      root.classList.remove('reduced-motion');
    }
    localStorage.setItem('elmacho-reduced-motion', reducedMotion);
  }, [highContrast, fontSize, reducedMotion]);

  const toggleHighContrast = () => setHighContrast(prev => !prev);
  const setFontSize = (size) => setFontSizeState(size);
  const toggleReducedMotion = () => setReducedMotion(prev => !prev);

  return (
    <AccessibilityContext.Provider value={{
      highContrast,
      fontSize,
      reducedMotion,
      toggleHighContrast,
      setFontSize,
      toggleReducedMotion,
    }}>
      {children}
    </AccessibilityContext.Provider>
  );
};

export const useAccessibility = () => useContext(AccessibilityContext);

export default AccessibilityContext;
