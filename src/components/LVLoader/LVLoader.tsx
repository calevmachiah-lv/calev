import React from 'react';
import { LoaderContainer } from './LVLoader.styles';
import { LV_LOADER } from '../../assets';

interface LVLoaderProps {
  display?: boolean;
  isPlayerLoading?: boolean;
  currentMode?: string;
  currentSize?: {
    height: number;
    width: number;
  };
}

const loader = LV_LOADER;

const LVLoader: React.FC<LVLoaderProps> = ({
  display,
  isPlayerLoading,
  currentMode,
  currentSize,
}) => {
  return display || isPlayerLoading ? (
    <LoaderContainer currentMode={currentMode!} playerSize={currentSize!}>
      <img src={loader} alt={'loading animation'} />
    </LoaderContainer>
  ) : null;
};

export default LVLoader;
