import { useCallback, useEffect, useState } from "react";

export function useWindowScrollTop() {
    const [scrollTop, setScrollTop] = useState(0);

    useEffect(() => {
        const onScroll = () => {
            setScrollTop(document.documentElement.scrollTop);
        };

        onScroll();
        window.addEventListener("scroll", onScroll);

        return () => {
            window.removeEventListener("scroll", onScroll);
        };
    }, []);

    return scrollTop;
}

export function useWindowHeight() {
    const [height, setHeight] = useState(0);

    useEffect(() => {
        const onResize = () => {
            setHeight(window.innerHeight);
        };

        onResize();
        window.addEventListener("resize", onResize);

        return () => {
            window.removeEventListener("resize", onResize);
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
        window.addEventListener("scroll", onScrollCallback);

        return () => {
            window.removeEventListener("scroll", onScrollCallback);
        };
    }, [onScroll]);

}