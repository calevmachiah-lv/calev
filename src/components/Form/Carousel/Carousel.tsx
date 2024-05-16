import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { LEFT_ARROW, RIGHT_ARROW } from '../../../assets';
import useNotOrderable from '../../../hooks/useNotOrderable';
import { getStep, setStep } from '../../../store/globalSettingsSlicer';
import {
  getForm,
  getIsChina,
  getTotalSteps,
} from '../../../store/threekitSlicer';
import {
  getFormRequiredAndChecked,
  getFormWarningMessages,
} from '../../../store/validationSlicer';
import {
  CAROUSSEL_CLASSNAME,
  DONE_BUTTON_LABEL,
  SURPRISE_ME_BUTTON_LABEL,
} from '../../../utils/constants';
import AttributesGroups from '../AttributesGroups';
import OptionsButton from '../OptionsButton';
import {
  ButtonContainer,
  ButtonImg,
  CarouselContainer,
  NextButton,
  PreviousButton,
  Slide,
} from './Carousel.styles';
import { showPopUp } from '../../PopUp/ShowPopUp';
import { popUpTypes } from '../../PopUp/PopUpType';
import { useWindowSize } from '../../../utils/threekitHooks';
import {
  getParams,
  paramsObjectToNavigationString,
} from '../../../utils/function/navigationParams';
import { shouldDisableButton } from '../../../utils/function/logicalFn';
import { isRightToLeft } from '../../../utils/function/functions';

const Carousel = () => {
  const { isMobile } = useWindowSize();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const carousel = useRef(null);
  const [clicked, setClicked] = useState<boolean>(false);
  //@ts-ignore
  const currentStep = useSelector(getStep);
  const isChina = useSelector(getIsChina);
  const formRequiredAndCheckedFields = useSelector(getFormRequiredAndChecked);
  const formWarningMessages = useSelector(getFormWarningMessages);
  const form = useSelector(getForm) || {};
  const { isNotOrderable, notOrderableError } = useNotOrderable();
  const dataDrivenSku =
    window.dataDrivenConfiguratorExtension?.getStatus().sku?.value;

  const totalSteps = useSelector(getTotalSteps);
  const isLastStep = useMemo(
    (): boolean => currentStep === totalSteps - 1,
    [currentStep, totalSteps]
  );
  const isRtl = useMemo(() => isRightToLeft(), []);

  const [isDisabled, setIsDisabled] = useState<boolean>(false);
  const previousDisabled = useMemo(
    (): boolean => currentStep === 0,
    [currentStep]
  );

  type ButtonDirections = 'previous' | 'next';

  const disabledParameters = useMemo(() => {
    return {
      form,
      formRequiredAndCheckedFields,
      currentStep,
      isCarousel: true,
    };
  }, [form, formRequiredAndCheckedFields, currentStep]);

  const handleNextStep = useCallback(() => {
    if (currentStep < totalSteps - 1) {
      dispatch(setStep(currentStep + 1));
    }
  }, [currentStep, totalSteps, dispatch]);

  const handlePreviousStep = useCallback(() => {
    if (currentStep > 0) {
      dispatch(setStep(currentStep - 1));
    }
  }, [currentStep, dispatch]);

  useEffect(() => {
    const params = getParams();
    params.step = currentStep;
    const finalParams = paramsObjectToNavigationString(params, isChina);
    navigate(`/${finalParams}`);
    setClicked(false);
  }, [currentStep, navigate, isChina]);

  const validateAndNavigate = useCallback(
    (buttonDirection: ButtonDirections): void => {
      const newDisabledState = shouldDisableButton(disabledParameters);
      if (newDisabledState) {
        setClicked(true);
        if (formWarningMessages) {
          const lines = Object.values(formWarningMessages);
          console.info({ lines });
          lines?.map((line) =>
            showPopUp({
              popUpType: popUpTypes.missingFieldError,
              message: line,
              functionOnClose: () => setClicked(false),
              isMobile,
            })
          );
        }
      } else {
        if (buttonDirection === 'previous') {
          handlePreviousStep();
        } else if (buttonDirection === 'next') {
          handleNextStep();
        }
      }
      setIsDisabled(newDisabledState);
    },
    [
      disabledParameters,
      handleNextStep,
      handlePreviousStep,
      isMobile,
      formWarningMessages,
    ]
  );

  useEffect(() => {
    setClicked(false);
  }, [dataDrivenSku]);

  return (
    <>
      <CarouselContainer className={CAROUSSEL_CLASSNAME} ref={carousel}>
        <Slide>
          <AttributesGroups />
        </Slide>
        <ButtonContainer>
          <OptionsButton buttonName={SURPRISE_ME_BUTTON_LABEL} />

          <OptionsButton
            buttonName={DONE_BUTTON_LABEL}
            notOrderable={isNotOrderable}
            notOrderableMessage={notOrderableError}
          />
        </ButtonContainer>
      </CarouselContainer>
    </>
  );
};

export default Carousel;
