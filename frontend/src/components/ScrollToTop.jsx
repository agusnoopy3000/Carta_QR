/**
 * 🧭 Botón flotante para volver arriba
 */
import { useState, useEffect } from 'react';
import { ArrowUp, Anchor } from 'lucide-react';
import { useHaptic } from '../hooks/useHaptic';

export default function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);
  const { lightTap } = useHaptic();

  useEffect(() => {
    const toggleVisibility = () => {
      setIsVisible(window.scrollY > 400);
    };

    window.addEventListener('scroll', toggleVisibility, { passive: true });
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    lightTap();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  if (!isVisible) return null;

  return (
    <button
      onClick={scrollToTop}
      className={`
        fixed bottom-6 right-6 z-50
        w-14 h-14 rounded-full
        bg-gradient-to-br from-cyan-500 to-blue-600
        text-white shadow-lg shadow-cyan-500/40
        flex items-center justify-center
        transform transition-all duration-300
        hover:scale-110 active:scale-95
        animate-fade-in
      `}
      aria-label="Volver arriba"
    >
      <div className="relative">
        <ArrowUp className="w-6 h-6" strokeWidth={2.5} />
        {/* Ripple effect on mount */}
        <div className="absolute inset-0 rounded-full bg-white/30 animate-ping" style={{ animationDuration: '2s' }} />
      </div>
    </button>
  );
}
