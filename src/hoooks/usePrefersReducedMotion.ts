/**
 * Reference: https://www.joshwcomeau.com/react/prefers-reduced-motion/
 */
import { useEffect, useState } from 'react';

const QUERY = '(prefers-reduced-motion: no-preference)';
const getInitialState = () =>
  typeof window === 'object' ? !window.matchMedia(QUERY).matches : false;

function usePrefersReducedMotion() {
  const [prefersReducedMotion, setPrefersReducedMotion] =
    useState(getInitialState);
  useEffect(() => {
    const mediaQueryList = window.matchMedia(QUERY);
    const listener = (event) => {
      setPrefersReducedMotion(!event.matches);
    };
    mediaQueryList.addEventListener('change', listener);
    return () => {
      mediaQueryList.removeEventListener('change', listener);
    };
  }, []);
  return prefersReducedMotion;
}

export default usePrefersReducedMotion;
