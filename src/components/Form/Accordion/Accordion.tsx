import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getStep } from '../../../store/globalSettingsSlicer';
import { getForm, getIsChina } from '../../../store/threekitSlicer';
import AttributesGroups from '../AttributesGroups';
import { AccordionContainer, FinishButtonContainer } from './Accordion.styles';

import useNotOrderable from '../../../hooks/useNotOrderable';
import { getFormRequiredAndChecked } from '../../../store/validationSlicer';
import { DONE_BUTTON_LABEL, SURPRISE_ME_BUTTON_LABEL } from '../../../utils/constants';
import {} from '../../../utils/function/functions';
import OptionsButton from '../OptionsButton';
import {
  getParams,
  paramsObjectToNavigationString,
} from '../../../utils/function/navigationParams';
import { shouldDisableButton } from '../../../utils/function/logicalFn';

const Accordion = () => {
  const [isDisabled, setIsDisabled] = useState<boolean>(true);
  const navigate = useNavigate();
  const currentStep: number = parseInt(useSelector(getStep).toString());
  const isChina = useSelector(getIsChina);
  const form = useSelector(getForm);
  const formRequiredAndCheckedFields = useSelector(getFormRequiredAndChecked);
  const { isNotOrderable, notOrderableError } = useNotOrderable();

  useEffect(() => {
    const newDisabledState =
      shouldDisableButton({
        form,
        formRequiredAndCheckedFields,
        currentStep,
        isCarousel: false,
      }) || isNotOrderable;

    setIsDisabled(newDisabledState);
  }, [form, formRequiredAndCheckedFields, currentStep, isNotOrderable]);

  useEffect(() => {
    const params = getParams();
    params.step = currentStep;
    const finalParams = paramsObjectToNavigationString(params, isChina);
    navigate(`/${finalParams}`);
  }, [currentStep, navigate, isChina]);

  return (
    <AccordionContainer>
      <AttributesGroups />
      <FinishButtonContainer>
      <OptionsButton
            buttonName={SURPRISE_ME_BUTTON_LABEL}
          />
        <OptionsButton
          buttonName={DONE_BUTTON_LABEL}
          disable={isDisabled}
          notOrderable={isNotOrderable}
          notOrderableMessage={notOrderableError}
        />
        
      </FinishButtonContainer>
    </AccordionContainer>
  );
};

export default Accordion;
