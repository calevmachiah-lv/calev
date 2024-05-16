import React from 'react';
import { CLOSE_ICON_BLACK } from '../../assets';
import { Icon } from './closeIcon.styles';

function CloseIcon({
  onClick,
  css = {},
}: {
  onClick: () => void;
  css?: Record<string, string>;
}) {
  return <Icon src={CLOSE_ICON_BLACK} onClick={onClick} style={css} />;
}

export default CloseIcon;
