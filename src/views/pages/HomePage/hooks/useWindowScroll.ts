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
    window.addEventListener('resize', onResize);

    return () => {
      window.removeEventListener('resize', onResize);
    };
  }, []);

  return height;
}

export function useWindowScorllEffect(callback: (scrollTop: number) => void) {
  const onScroll = useCallback(callback, []);

  useEffect(() => {
    const onScrollCallback = () => {
      onScroll(document.documentElement.scrollTop);
    };
    onScrollCallback();
    window.addEventListener('scroll', onScrollCallback);

    return () => {
      window.removeEventListener('scroll', onScrollCallback);
    };
  }, [onScroll]);
}
