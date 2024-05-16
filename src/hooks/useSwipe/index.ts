import { useCallback, useState } from 'react';

type SwipeCallback = () => void;

interface StartTouch {
  x: number;
  y: number;
  time: number;
}

const useSwipe = (
  onSwipePrev: SwipeCallback,
  onSwipeNext: SwipeCallback,
  sensitivity: number = 180
) => {
  const [startTouch, setStartTouch] = useState<StartTouch>({
    x: 0,
    y: 0,
    time: 0,
  });

  const handleTouchStart = useCallback((event: TouchEvent) => {
    const touch = event.touches[0];
    setStartTouch({
      x: touch.clientX,
      y: touch.clientY,
      time: new Date().getTime(),
    });
  }, []);

  const handleTouchEnd = useCallback(
    (event: TouchEvent) => {
      const touch = event.changedTouches[0];
      const endX = touch.clientX;
      const endTime = new Date().getTime();

      const distanceX = endX - startTouch.x;
      const timeElapsed = endTime - startTouch.time;

      if (Math.abs(distanceX) > sensitivity && timeElapsed < 1000) {
        if (distanceX > 0) {
          onSwipePrev();
        } else {
          onSwipeNext();
        }
      }
    },
    [onSwipeNext, onSwipePrev, sensitivity, startTouch]
  );

  return { handleTouchStart, handleTouchEnd };
};

export default useSwipe;
