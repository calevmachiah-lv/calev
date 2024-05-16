import React, { useState, useEffect, ReactNode } from 'react';
import { Version } from '../../../styles/global';
import { VERSION } from '../../../utils/constants';

interface AutoDisappearElementProps {
  children: ReactNode;
}

function AutoDisappearElement({ children }: AutoDisappearElementProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [timerId, setTimerId] = useState<NodeJS.Timeout | null>(null);

  const handlePointerDown = () => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 5000);

    setTimerId(timer);
  };

  const handlePointerUp = () => {
    if (timerId) {
      clearTimeout(timerId);
      setIsVisible(false);
    }
  };

  useEffect(() => {
    return () => {
      if (timerId) {
        clearTimeout(timerId);
      }
    };
  }, [timerId]);

  return (
    <div>
      <div
        onTouchStart={handlePointerDown}
        onMouseDown={handlePointerDown}
        onTouchEnd={handlePointerUp}
        onMouseUp={handlePointerUp}
        onMouseLeave={handlePointerUp}
      >
        {children}
      </div>
      {isVisible && <Version>{VERSION}</Version>}
    </div>
  );
}

export default AutoDisappearElement;
