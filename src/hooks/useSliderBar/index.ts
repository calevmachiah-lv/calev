import React, {
  RefObject,
  TouchEvent,
  TouchEventHandler,
  useState,
} from 'react';

function useSliderBar({
  baseHeightInPX = 200,
  maxHeightInPX = 500,
  dragElementRef,
  onSlideUp,
  onSlideDown,
  onSlideMove,
  slidePercentsToOpen = 10,
}: {
  baseHeightInPX: number;
  maxHeightInPX: number;
  dragElementRef: RefObject<HTMLDivElement>;
  onSlideUp?: () => void;
  onSlideDown?: () => void;
  onSlideMove?: () => void;
  slidePercentsToOpen?: number;
}) {
  const form = dragElementRef.current;
  const [startTouchY, setStartTouchY] = useState(0);
  const [currentTouchY, setCurrentTouchY] = useState(0);
  const [lastTouchY, setLastTouchY] = useState(0);
  const [openPercentage, setOpenPercentage] = useState(0);

  const formHeightInPX = form?.getBoundingClientRect().height || 0;

  const closeDragElement = () => {
    if (!form) return;
    form.style.height = '0';
  };

  const resetElementHeight = () => {
    if (!form) return;
    form.style.height = `${baseHeightInPX}px`;
  };

  const handleTouchStart: TouchEventHandler = (e: TouchEvent<Element>) => {
    setStartTouchY(e.touches[0].clientY);
    setCurrentTouchY(e.touches[0].clientY);
    setLastTouchY(e.touches[0].clientY);
  };
  const isScrollableUp = (element: HTMLElement): boolean => {
    let el: HTMLElement | null = element;

    while (el !== null) {
      if (el.scrollHeight > el.clientHeight && el.scrollTop > 0) {
        return true;
      }
      el = el.parentElement;
    }

    return false;
  };

  const handleTouchMove: TouchEventHandler = (e: TouchEvent<Element>) => {
    if (!form) return;
    if (!lastTouchY) {
      setLastTouchY(e.touches[0].clientY);
      return;
    }
    if (
      e.target &&
      isScrollableUp(e.target as HTMLElement) &&
      openPercentage === 100
    ) {
      setLastTouchY(e.touches[0].clientY);
      return;
    }

    const deltaY = (e.touches[0].clientY - lastTouchY) * 0.5;
    const newHeight = form.offsetHeight - deltaY;

    form.style.transition = 'none';
    form.style.height = `min(max(${newHeight}px, ${baseHeightInPX}px), ${maxHeightInPX}px)`;
    onSlideMove && onSlideMove();

    setOpenPercentage(
      Math.min(
        100,
        formHeightInPX > baseHeightInPX
          ? ((formHeightInPX - baseHeightInPX) /
              (maxHeightInPX - baseHeightInPX)) *
              100
          : 0
      )
    );

    setLastTouchY(e.touches[0].clientY);
  };

  const handleTouchEnd = () => {
    if (!form) return;
    form.style.transition = 'height 0.3s';
    if (openPercentage > slidePercentsToOpen) {
      onSlideUp && onSlideUp();
      form.style.height = '';
      setOpenPercentage(100);
    } else {
      onSlideDown && onSlideDown();
      resetElementHeight();
      setOpenPercentage(0);
    }
  };

  return { handleTouchStart, handleTouchMove, handleTouchEnd, openPercentage };
}

export default useSliderBar;
