import { useState, useEffect, useCallback } from 'react';

const useWindowSize = () => {
  const [windowSize, setWindowSize] = useState({
    width: 0,
    height: 0,
    isMobile: false,
    isIpad: false,
    isDesktop: false,
  });

  const isMobileScreen = useCallback(() => {
    const userAgent =
      typeof window.navigator === 'undefined' ? '' : navigator.userAgent;
    return Boolean(
      userAgent.match(
        /Android|iPhone|iPod|iPad|WeCom|Opera Mini|IEMobile|WPDesktop|iPad/i
      )
    );
  }, []);

  const handleResize = useCallback(() => {
    const width = Math.max(
      window.screen.width,
      window.innerWidth,
      document.documentElement.clientWidth
    );
    const height = Math.min(
      window.screen.height,
      window.innerHeight,
      document.documentElement.clientHeight
    );
    if (isMobileScreen()) {
      setWindowSize((prevWindowSize) => ({
        ...prevWindowSize,
        height,
        width,
        isMobile: height > width,
        isIpad: (width > 769 && width <= 1024) || (height <= width && width <= 769),
        isDesktop: width > 1024,
      }));
    } else {
      setWindowSize((prevWindowSize) => ({
        ...prevWindowSize,
        height:
          width > 1024
            ? height
            : Math.max(
              window.screen.height,
              document.documentElement.clientHeight,
              window.innerHeight
            ),
        width,
        isMobile: width <= 769 || height > width,
        isIpad: (width > 769 && width <= 1024) || (height <= width && width <= 769),
        isDesktop: width > 1024,
      }));
    }
  }, [isMobileScreen]);

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, [handleResize]);

  return windowSize;
};

export default useWindowSize;