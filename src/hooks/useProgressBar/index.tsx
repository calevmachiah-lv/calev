import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Wrapper } from './progressBar.styled';

interface ProgressBarOptions {
  containerId?: string;
  containerRef?: React.RefObject<any>;
  useChildren?: boolean;
  useNumbers?: boolean;
  currentNumber?: number;
  totalNumbers?: number;
  useHeight?: boolean;
  isVertical?: boolean;
  barWidth?: string;
  barHeight?: string;
  currentIndex?: number;
}

function useProgressBar({
  containerId,
  containerRef,
  useChildren,
  useNumbers,
  currentNumber,
  totalNumbers,
  useHeight,
  isVertical,
  barWidth = '100%',
  barHeight = '1px',
  currentIndex,
}: ProgressBarOptions): React.ReactElement {
  const [progressWidth, setProgressWidth] = useState('0%');
  const container = useMemo(
    () =>
      !useNumbers
        ? containerId
          ? document.getElementById(containerId)
          : containerRef?.current
        : null,
    [containerId, containerRef, useNumbers]
  );

  const updateProgress = useCallback(() => {
    let progress;
    if (useNumbers && currentNumber && totalNumbers) {
      progress = (currentNumber / totalNumbers) * 100;
    } else if (useChildren) {
      const containerChildrenLength = container?.children?.length;
      progress = (((currentIndex || 0) + 1) / containerChildrenLength) * 100;
    } else {
      const containerWidth = useHeight
        ? container?.scrollHeight
        : container?.scrollWidth;
      const displayWidth = useHeight
        ? container?.offsetHeight
        : container?.offsetWidth;
      if (containerWidth <= displayWidth) {
        progress = 100;
      } else {
        const scrollLeft = useHeight
          ? container?.scrollTop
          : container?.scrollLeft;
        progress = (scrollLeft / (containerWidth - displayWidth)) * 100;
      }
    }
    setProgressWidth(progress + '%');
  }, [
    container,
    useHeight,
    currentIndex,
    useChildren,
    currentNumber,
    totalNumbers,
    useNumbers,
  ]);

  useEffect(() => {
    if (useNumbers) return;
    updateProgress();
    container?.addEventListener('scroll', updateProgress);

    return () => {
      container?.removeEventListener('scroll', updateProgress);
    };
  }, [
    currentIndex,
    container,
    useHeight,
    useChildren,
    updateProgress,
    useNumbers,
  ]);

  useEffect(() => {
    if (!useNumbers) return;
    updateProgress();
  }, [currentNumber]);

  return (
    <Wrapper
      progressPercents={progressWidth}
      isVertical={isVertical}
      barWidth={barWidth}
      barHeight={barHeight}
    />
  );
}

export default useProgressBar;
