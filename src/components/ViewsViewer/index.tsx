import { useCallback, useEffect } from 'react';
import {
  ViewDot,
  ViewDotsContainer,
  Arrow,
  ArrowContainer,
} from './viewsViewer.styles';
import { LEFT_ARROW_SLIDER, RIGHT_ARROW_SLIDER } from '../../assets';
import useSwipe from '../../hooks/useSwipe';
import { HOME_CONTAINER } from '../../utils/constants';
import {
  getTutorial,
  setTutorialSlideDirection,
  setTutorialStep,
} from '../../store/flowSlicer';
import { useDispatch, useSelector } from 'react-redux';

function ViewsViewer({ data, isMobile, isHelper }: any) {
  const dispatch = useDispatch();
  const { tutorialStep } = useSelector(getTutorial);
  const tutorialDataLength = data?.length;

  const previousIndex = useCallback(() => {
    if (tutorialStep > 0) {
      dispatch(setTutorialStep(tutorialStep - 1));
      dispatch(setTutorialSlideDirection('prev'));
    }
  }, [tutorialStep, dispatch]);

  const nextIndex = useCallback(() => {
    if (tutorialStep < tutorialDataLength - 1) {
      dispatch(setTutorialStep(tutorialStep + 1));
      dispatch(setTutorialSlideDirection('next'));
    }
  }, [tutorialStep, tutorialDataLength, dispatch]);

  const { handleTouchStart, handleTouchEnd } = useSwipe(
    previousIndex,
    nextIndex,
    100
  );

  useEffect(() => {
    const tuturialDiv = document.getElementById(HOME_CONTAINER);
    if (!tuturialDiv) return;

    tuturialDiv.addEventListener('touchstart', handleTouchStart, false);
    tuturialDiv.addEventListener('touchend', handleTouchEnd, false);

    return () => {
      tuturialDiv.removeEventListener('touchstart', handleTouchStart, false);
      tuturialDiv.removeEventListener('touchend', handleTouchEnd, false);
    };
  }, [handleTouchStart, handleTouchEnd]);

  return isMobile ? (
    <ViewDotsContainer>
      {data?.map((view: Record<string, any>, key: number) => (
        <ViewDot
          isHelper={isHelper}
          key={key}
          isActive={tutorialStep === key}
          onClick={() => dispatch(setTutorialStep(key))}
        />
      ))}
    </ViewDotsContainer>
  ) : (
    data?.length > 0 && (
      <ArrowContainer>
        <Arrow onClick={previousIndex} disable={tutorialStep < 1}>
          <img src={LEFT_ARROW_SLIDER} />
        </Arrow>
        <Arrow
          onClick={nextIndex}
          disable={tutorialStep > tutorialDataLength - 2}
        >
          <img src={RIGHT_ARROW_SLIDER} />
        </Arrow>
      </ArrowContainer>
    )
  );
}

export default ViewsViewer;
