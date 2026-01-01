/**
 * 🦐 Hook para Haptic Feedback
 * Vibración sutil en dispositivos móviles
 */
export const useHaptic = () => {
  const vibrate = (pattern = 10) => {
    if ('vibrate' in navigator) {
      navigator.vibrate(pattern);
    }
  };

  const lightTap = () => vibrate(10);
  const mediumTap = () => vibrate(25);
  const successTap = () => vibrate([10, 50, 10]);
  const errorTap = () => vibrate([50, 30, 50]);

  return { vibrate, lightTap, mediumTap, successTap, errorTap };
};

export default useHaptic;
