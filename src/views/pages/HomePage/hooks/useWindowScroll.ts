import { useCallback, useEffect, useState } from 'react';

export function useWindowScrollTop(active = false) {
  const [scrollTop, setScrollTop] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      setScrollTop(document.documentElement.scrollTop);
    };
    onScroll();

    if (active) {
      window.addEventListener('scroll', onScroll, { passive: true });
    }
    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, [active]);

  return scrollTop;
}

export function useWindowHeight() {
  const [height, setHeight] = useState(0);

  useEffect(() => {
    const onResize = () => {
      setHeight(window.innerHeight);
    };

    onResize();
    window.addEventListener('resize', onResize, { passive: true });

    return () => {
      window.removeEventListener('resize', onResize);
    };
  }, []);

  return height;
}
