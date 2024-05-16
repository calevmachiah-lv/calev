import React, { useEffect, useRef } from 'react';
import {
  AboveFormContainer,
  FormContainer,
  FormContentWrapper,
  SlideBar,
  SlideBarContainer,
} from './portraitForm.styles';
import FormTitle from '../../../components/FormTitle';
import ProductPrice from '../../../components/ProductPrice';
import Attributes from '../../../components/Attributes';
import useSliderBar from '../../../hooks/useSliderBar';
import {
  closeRecap,
  getDisplayRecap,
  getRecapOpenPercentage,
  getTutorial,
  openRecap,
  setRecapOpenPercentage,
} from '../../../store/flowSlicer';
import { useDispatch, useSelector } from 'react-redux';
import RecapPage from '../../RecapPage';
import FunctionalButtons from '../../../components/FunctionalButtons';
import {
  PORTRAIT_FORM_BASE_HEIGHT_IN_PX,
  PORTRAIT_FORM_MAX_HEIGHT_IN_PX,
  PORTRAIT_FORM_SLIDE_PERCENTS_TO_CLOSE,
  PORTRAIT_FORM_SLIDE_PERCENTS_TO_OPEN,
} from '../../../utils/constants';
import ProductInfos from './ProductInfos';

interface PortraitFormProps {}

const PortraitForm: React.FC<PortraitFormProps> = () => {
  const dispatch = useDispatch();
  const displayRecap = useSelector(getDisplayRecap);
  const { displayTutorial, tutorialStep } = useSelector(getTutorial);
  const formRef = useRef<HTMLDivElement>(null);
  const [slidePercentsToOpenRecap, setSlidePercentsToOpenRecap] =
    React.useState(
      displayRecap
        ? PORTRAIT_FORM_SLIDE_PERCENTS_TO_CLOSE
        : PORTRAIT_FORM_SLIDE_PERCENTS_TO_OPEN
    );
  const { handleTouchStart, handleTouchMove, handleTouchEnd, openPercentage } =
    useSliderBar({
      onSlideUp: () => {
        dispatch(openRecap(true));
      },
      onSlideDown: () => {
        dispatch(closeRecap(true));
      },
      baseHeightInPX: PORTRAIT_FORM_BASE_HEIGHT_IN_PX,
      maxHeightInPX: PORTRAIT_FORM_MAX_HEIGHT_IN_PX,
      dragElementRef: formRef,
      slidePercentsToOpen: slidePercentsToOpenRecap,
    });
  const recapOpenPercentage = useSelector(getRecapOpenPercentage);

  useEffect(() => {
    dispatch(setRecapOpenPercentage(openPercentage));
  }, [openPercentage, dispatch]);

  useEffect(() => {
    setSlidePercentsToOpenRecap(
      displayRecap
        ? PORTRAIT_FORM_SLIDE_PERCENTS_TO_CLOSE
        : PORTRAIT_FORM_SLIDE_PERCENTS_TO_OPEN
    );
  }, [displayRecap]);

  return (
    <FormContainer
      ref={formRef}
      recap={displayRecap}
      baseHeightInVH={PORTRAIT_FORM_BASE_HEIGHT_IN_PX}
      maxHeightInVH={PORTRAIT_FORM_MAX_HEIGHT_IN_PX}
      tutorial={displayTutorial}
    >
      <RecapPage
        show={displayRecap}
        slidePercentsToOpen={slidePercentsToOpenRecap}
        handleTouchStart={handleTouchStart}
        handleTouchMove={handleTouchMove}
        handleTouchEnd={handleTouchEnd}
      />
      <FormContentWrapper
        openPercentage={recapOpenPercentage}
        slidePercentsToClose={slidePercentsToOpenRecap}
      >
        <SlideBarContainer
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <SlideBar />
        </SlideBarContainer>
        <AboveFormContainer>
          <ProductInfos />
        </AboveFormContainer>
        <Attributes
          tutorialStep={tutorialStep}
          displayTutorial={displayTutorial}
        />
        <FunctionalButtons />
      </FormContentWrapper>
    </FormContainer>
  );
};

export default PortraitForm;
