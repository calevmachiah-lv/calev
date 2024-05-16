import React, {
  useCallback,
  useEffect,
  useRef,
  ReactNode,
  useState,
} from 'react';
import Controller from '../../../controller';
import { Picture, StepPicture, Wrapper } from './Player2D.styles';
import add2DSpinTool from '../../Tools/add2DSpin';
import {
  useAttribute,
  useThreekitInitStatus,
} from '../../../utils/threekitHooks';
import { OptionsButton } from '../../../components';
import {
  CLASS_NAME_PREFIX,
  DEFAULT_CLASS_NAME,
  HELPER_BUTTON_LABEL,
  LANDSCAPE_FORM_MAX_HEIGHT_IN_PX,
  TK_PLAYER_ATTRIBUTE_ID,
  TK_PLAYER_DIV_ID_2D,
} from '../../../utils/constants';
import { useSelector, useDispatch } from 'react-redux';
import {
  getIsFullScreen,
  getLastAngle,
  setViewUpdate,
  setIsFullScreen,
  setLastAngle,
  setPlayerLoading,
  setPlayerSize,
} from '../../../store/threekitSlicer';
import {
  addOpacityAnimation,
  getEventPosition,
  isWithinTapArea,
} from '../../../utils/function/functions';
import { getTutorial, setDisplayTutorial } from '../../../store/flowSlicer';

interface TutorialStep {
  index: number;
  title: string;
  description: string;
  imageUrl: string;
  stepLabelImageURL: string;
  stepLabelId: string;
}

interface TutorialData {
  productName: string;
  sku: string;
  productImageURL: string;
  steps: TutorialStep[];
}

interface Player2DProps {
  height?: string;
  width?: string;
  border?: string;
  cssDisplay?: boolean;
  className?: string;
  homePage?: boolean;
  children?: ReactNode;
  clientPage?: boolean;
  isMobile?: boolean;
  isLoaded: boolean;
  isRotable: boolean;
  tutorialData?: TutorialData;
}

const Player2D: React.FC<Player2DProps> = ({
  height = `calc(100vh - ${LANDSCAPE_FORM_MAX_HEIGHT_IN_PX}px)`,
  width = '100%',
  border = 'none',
  cssDisplay,
  className,
  isRotable,
  isLoaded,
  tutorialData,
}) => {
  const playerRef = useRef<HTMLDivElement>(null);
  const previousAngleValue = useSelector(getLastAngle);
  const { displayTutorial, tutorialStep, tutorialSlideDirection } =
    useSelector(getTutorial);
  const [_, setRotateModel] = useAttribute('Rotate Model');
  const [, setToggleButton] = useState(true);
  const isFullScreen = useSelector(getIsFullScreen);
  const [lastTapTime, setLastTapTime] = useState(0);
  const [lastTapPosition, setLastTapPosition] = useState({ x: 0, y: 0 });
  const dispatch = useDispatch();
  const playerReady = useThreekitInitStatus();
  const productImageTutorial = tutorialData?.productImageURL;

  const handleLastAngle = useCallback(
    (lastAngle: number) => {
      dispatch(setLastAngle(lastAngle));
    },
    [dispatch]
  );

  useEffect(() => {
    if (playerReady) {
      Controller.attachPlayerToComponent(TK_PLAYER_DIV_ID_2D);
    }
  }, [playerReady]);

  useEffect(() => {
    if (playerReady) {
      const { clientWidth = 0, clientHeight = 0 } = playerRef.current || {};
      dispatch(setPlayerSize({ width: clientWidth, height: clientHeight }));
    }
  }, [playerReady]);

  useEffect(() => {
    if (isRotable) {
      setRotateModel(previousAngleValue);
    } else {
      setRotateModel('0');
    }
    if (playerReady) {
      add2DSpinTool(
        { attributeId: TK_PLAYER_ATTRIBUTE_ID },
        handleLastAngle,
        isRotable,
        isFullScreen,
        setToggleButton,
        changeZoom
      );
    }
  }, [playerReady, isRotable, isFullScreen]);

  const handleDoubleTap = (event: any) => {
    const currentTime = new Date().getTime();
    const tapLength = currentTime - lastTapTime;
    const currentPosition = getEventPosition(event);
    if (
      tapLength < 500 &&
      tapLength > 0 &&
      isWithinTapArea(lastTapPosition, currentPosition, 15)
    ) {
      changeZoom();
    }
    setLastTapTime(currentTime);
    setLastTapPosition({
      ...lastTapPosition,
      ...currentPosition,
    });
  };

  const changeZoom = () => {
    dispatch(setViewUpdate(true));

    if (isFullScreen) {
      while (
        document.getElementById(TK_PLAYER_DIV_ID_2D)!.style.pointerEvents !==
        'none'
      ) {
        document
          .getElementById(TK_PLAYER_DIV_ID_2D)!
          .style.setProperty('pointer-events', 'none');
      }
      dispatch(setPlayerLoading(true));
      setTimeout(() => {
        if (
          document.getElementById(TK_PLAYER_DIV_ID_2D)!.style.pointerEvents ===
          'none'
        ) {
          addOpacityAnimation(TK_PLAYER_DIV_ID_2D, 100);
          document
            .getElementById(TK_PLAYER_DIV_ID_2D)!
            .style.removeProperty('pointer-events');
          dispatch(setIsFullScreen(!isFullScreen));
          dispatch(setPlayerLoading(false));
        }
      }, 50);

      setTimeout(() => {
        dispatch(setViewUpdate(false));
      }, 1000);

      return;
    }
    dispatch(setIsFullScreen(!isFullScreen));
    setTimeout(() => {
      dispatch(setViewUpdate(false));
    }, 1000);
  };
  const newClassName = `${DEFAULT_CLASS_NAME} ${CLASS_NAME_PREFIX}-player ${className}`;

  return (
    <Wrapper
      className={newClassName}
      height={height}
      width={width}
      border={border}
      isRotable={isRotable}
      conditionalCSS={cssDisplay}
      ref={playerRef}
      fullScreen={isFullScreen}
      displayTutorial={displayTutorial}
    >
      <div
        id={TK_PLAYER_DIV_ID_2D}
        onDoubleClick={changeZoom}
        onTouchEnd={(e) => handleDoubleTap(e)}
      />

      {productImageTutorial && isLoaded && displayTutorial && (
        <Picture
          src={productImageTutorial}
          slideDirection={tutorialSlideDirection}
        />
      )}

      {isLoaded &&
        displayTutorial &&
        tutorialData?.steps?.map((item, idx) => {
          return idx === tutorialStep ? (
            <StepPicture
              key={idx}
              src={tutorialData?.steps?.[tutorialStep || 0]?.imageUrl}
              slideDirection={tutorialSlideDirection}
            />
          ) : null;
        })}

      {isLoaded && (
        <OptionsButton
          buttonName={HELPER_BUTTON_LABEL}
          fnButton={() => dispatch(setDisplayTutorial(!displayTutorial))}
        />
      )}
    </Wrapper>
  );
};

export default Player2D;
