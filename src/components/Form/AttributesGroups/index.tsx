import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { t } from 'i18next';
import Attributes from './Attributes';
import {
  GroupWrapper,
  GroupsWrapper,
  ProgressBarWrapper,
} from './attributesGroups.styled';
import {
  getForm,
  getFormValidAttributes,
  getTotalSteps,
} from '../../../store/threekitSlicer';
import { useDispatch, useSelector } from 'react-redux';
import { getStep } from '../../../store/globalSettingsSlicer/selectors';
import { useProgressBar } from '../../../hooks';
import GroupHeading from './GroupHeading';
import { useWindowSize } from '../../../utils/threekitHooks';
import { setStep } from '../../../store/globalSettingsSlicer';
import { NEXT_LABEL, PREVIOUS_LABEL } from '../../../utils/constants';
import {
  FormState,
  getFormRequiredAndChecked,
  setFormWarningMessages,
} from '../../../store/validationSlicer';

function AttributesGroups() {
  const dispatch = useDispatch();
  const { isMobile } = useWindowSize();
  const form = useSelector(getForm);
  const lastStepNumber = useMemo(
    (): number => (!form ? 0 : Object.keys(form).length - 1),
    [form]
  );
  const currentStep = useSelector(getStep);
  const [fakeCurrentStep, setFakeCurrentStep] = useState<number>(currentStep);
  const [lastStep, setLastStep] = useState<number>(currentStep);
  const formValidAttributes = useSelector(getFormValidAttributes);
  const totalSteps = useSelector(getTotalSteps);
  const formRequiredAndCheckedFields = useSelector(getFormRequiredAndChecked);

  useEffect(() => {
    if (currentStep !== fakeCurrentStep) {
      setLastStep(fakeCurrentStep);
      setFakeCurrentStep(currentStep);
    }
  }, [currentStep]);

  useEffect(() => {
    if (currentStep > lastStepNumber) {
      dispatch(setStep(lastStepNumber));
    }
  }, []);

  const title = useMemo(
    (): string => Object.keys(formValidAttributes)[currentStep],
    [formValidAttributes, currentStep]
  );
  const allTitles = useMemo(
    (): string[] => Object.keys(formValidAttributes),
    [formValidAttributes]
  );

  // NOTE: Build warning messages for every empty required field.
  const buildWarningMessages = useCallback(
    (formRequiredAndCheckedFields: FormState['requiredAndChecked']): void => {
      const entries = Object.entries(formRequiredAndCheckedFields);
      if (entries.length > 0) {
        let messages: Record<string, any> = {};
        entries.forEach((el: any) => {
          // Validate required field isEmpty
          if (el[1].length === 0) {
            messages[el[0]] = t(el[0], el[0]);
          }
        });

        if (Object.keys(messages).length > 0) {
          dispatch(setFormWarningMessages({ ...messages }));
        } else {
          dispatch(setFormWarningMessages({}));
        }
      } else {
        dispatch(setFormWarningMessages({}));
      }
    },
    [dispatch]
  );

  useEffect(() => {
    buildWarningMessages(formRequiredAndCheckedFields);
  }, [formRequiredAndCheckedFields, buildWarningMessages]);

  const ProgressBarComponent = useProgressBar({
    useNumbers: true,
    currentNumber: currentStep + 1,
    totalNumbers: totalSteps,
  });

  const handleGroupClick = (index: number): void => {
    if (!isMobile && currentStep === index) {
      dispatch(setStep(-1));
    } else {
      dispatch(setStep(index));
    }
  };

  return (
    <GroupsWrapper>
      {Object.values(formValidAttributes).map((attributes: any, index) => {
        const active =
          currentStep === index
            ? lastStep < currentStep
              ? NEXT_LABEL
              : PREVIOUS_LABEL
            : null;
        const numOfAttrs = Object.keys(attributes)?.length || 0;
        return (
          <GroupWrapper
            key={index}
            isActive={isMobile ? active !== null : true}
          >
            <>
              <GroupHeading
                title={
                  isMobile
                    ? t(title, title)
                    : t(allTitles[index], allTitles[index])
                }
                isActive={isMobile ? active : currentStep === index}
                handleClick={() => handleGroupClick(index)}
                groupIndex={index}
              />

              {isMobile && currentStep === index && (
                <ProgressBarWrapper>{ProgressBarComponent}</ProgressBarWrapper>
              )}
            </>
            {
              <Attributes
                isActive={isMobile ? active : currentStep === index}
                attributes={attributes}
                numOfAttrs={numOfAttrs}
              />
            }
          </GroupWrapper>
        );
      })}
    </GroupsWrapper>
  );
}

export default AttributesGroups;
