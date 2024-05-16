import {
  usePlayerLoadingStatus,
  useThreekitInitStatus,
} from '../../../utils/threekitHooks';
import { LVLoader } from '../..';
import { useSelector } from 'react-redux';
import { getCurrentMode, getPlayerSize } from '../../../store/threekitSlicer';
import { FC, ReactNode } from 'react';

interface Props {
  children?: ReactNode;
}

const AwaitPlayerLoad: FC<Props> = ({ children }) => {
  const isLoaded = useThreekitInitStatus();
  const isPlayerLoading = usePlayerLoadingStatus();
  const currentMode = useSelector(getCurrentMode);
  const playerSize = useSelector(getPlayerSize);

  return (
    <>
      <LVLoader
        display={!isLoaded}
        isPlayerLoading={isPlayerLoading}
        currentMode={currentMode}
        currentSize={playerSize}
      />
      {children}
    </>
  );
};

export default AwaitPlayerLoad;
