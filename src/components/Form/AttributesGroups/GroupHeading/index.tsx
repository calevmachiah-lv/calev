import React from 'react';
import { t } from 'i18next';
import { useCurrentChosenColor } from '../../../../utils/threekitHooks';
import {
  ChosenColor,
  ColorNameWrapper,
  HeadingTitle,
  HeadingWrapper,
  IconStyle,
  ValueTitle,
  WrapperAtr,
} from './groupHeading.styled';
import { useWindowSize } from '../../../../utils/threekitHooks';
import { MINUS_ICON, PLUS_ICON } from '../../../../assets';

function GroupHeading({
  title,
  isActive,
  handleClick,
  groupIndex,
}: {
  title: string;
  isActive: string | boolean | null;
  handleClick: () => void;
  groupIndex: number;
  warningMessage?: string;
  currentStep?: number;
  totalSteps?: number;
}) {
  const { currentColorUrl, currentColorName } = useCurrentChosenColor({
    groupIndex,
  });
  const { isMobile } = useWindowSize();

  return (
    <HeadingWrapper isActive={isActive} onClick={handleClick}>
      <WrapperAtr>
        <HeadingTitle>{title}</HeadingTitle>
      </WrapperAtr>
      <WrapperAtr>
        <ColorNameWrapper>
          <ValueTitle>
            {currentColorName && t(currentColorName, currentColorName)}
          </ValueTitle>
          {currentColorUrl && <ChosenColor src={currentColorUrl} />}
        </ColorNameWrapper>
        {!isMobile ? (
          <IconStyle key="icon" src={isActive ? MINUS_ICON : PLUS_ICON} />
        ) : null}
      </WrapperAtr>
    </HeadingWrapper>
  );
}

export default GroupHeading;
