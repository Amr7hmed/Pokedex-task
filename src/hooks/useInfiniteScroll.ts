import { useEffect } from "react";

export const useInfiniteScroll = (callback: () => void, hasMore: boolean) => {
  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout> | null = null;

    const handleScroll = () => {
      if (!hasMore) return;

      const scrollPosition = window.innerHeight + window.scrollY;
      const bottom = document.documentElement.offsetHeight - 300;

      if (scrollPosition >= bottom) {
        if (!timeoutId) {
          timeoutId = setTimeout(() => {
            callback();
            timeoutId = null;
          }, 1000);
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [callback, hasMore]);
};
