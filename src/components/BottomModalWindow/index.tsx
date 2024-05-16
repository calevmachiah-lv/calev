// import React, { useCallback, useMemo, useRef, useState } from 'react';
import React, { useMemo, useRef } from 'react';
import {
  BarLine,
  BarLineWrapper,
  BottomModalWindowText,
  BottomModalWindowTitle,
  BottomModalWindowWrapper,
} from './bottomModalWindow.styles';
import { BAR_LINE_ICON } from '../../assets';
import { useWindowSize } from '../../utils/threekitHooks';

interface BottomModalWindowProps {
  show: boolean;
  title: string;
  text: string;
  heightInVH?: number;
}

function BottomModalWindow({
  show,
  title,
  text,
  heightInVH = 43,
}: BottomModalWindowProps) {
  const modalRef = useRef(null);
  const { height: screenHeight } = useWindowSize();

  const minTopPosition = useMemo(
    () => screenHeight * (1 - heightInVH / 100),
    [screenHeight, heightInVH]
  );

  return (
    <BottomModalWindowWrapper
      style={{
        top: show ? `${minTopPosition}px` : '110%',
      }}
      ref={modalRef}
      onClick={(e) => e.stopPropagation()}
    >
      <BarLineWrapper>
        <BarLine src={BAR_LINE_ICON} />
      </BarLineWrapper>
      <BottomModalWindowTitle>{title}</BottomModalWindowTitle>
      <BottomModalWindowText>{text}</BottomModalWindowText>
    </BottomModalWindowWrapper>
  );
}

export default BottomModalWindow;
