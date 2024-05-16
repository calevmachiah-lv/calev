import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  TCurrentGroup,
  findAttributeNotRotable,
  findModelPresentationOpen,
  updateForm,
} from '../../utils/function/attributeFn';
import { useAttribute, useValidAttributes } from '../../utils/threekitHooks';
import {
  getCurrentMode,
  getCurrentModelView,
  getReadableConfigurationWithAttributeType,
  setCurrentModelView,
  setFormValidAttributes,
} from '../../store/threekitSlicer';
import {
  setFormRequiredAndChecked,
  setInitialFormTextInputFields,
} from '../../store/validationSlicer';
import { stateRoot } from 'store';

function useUpdateFormAndPlayer({ form, currentStep }: any) {
  const dispatch = useDispatch();
  const [playerMode, setPlayerMode] = useState<string>();
  const [isRotable, setIsRotable] = useState(true);
  const currentModelPresentation = useSelector(getCurrentModelView);
  const [validAttributes, setValidAttributes] = useState();
  const allAttributes = useSelector(
    (state: stateRoot) => state.threekit.configuration.attributes
  );
  const readableConfiguration = useSelector(
    getReadableConfigurationWithAttributeType()
  );

  const { getIsAttributeValid } = useValidAttributes();
  const [modelPresentationData, setModelPresentation] =
    useAttribute('Model Presentation');

  useEffect(() => {
    if (!form) return;

    // update form valid attributes
    const formValidAttributes: any = updateForm(form, getIsAttributeValid);
    setValidAttributes(formValidAttributes);

    dispatch(setFormValidAttributes(formValidAttributes));
    const currentGroup: any | TCurrentGroup = Object.values(
      formValidAttributes
    )?.[currentStep] || { 'MODEL Taille': {} };
    const currentModelPresentationOpen =
      findModelPresentationOpen(currentGroup);

    if (allAttributes && readableConfiguration) {
      const allAttrArray = Object.entries(allAttributes)?.map(
        (el) => Object.values(el)[1]
      );
      const allAttrArrayRequired = allAttrArray?.filter(
        (el: any) => el?.metadata?.isRequired === 'true'
      );
      const readableConfigurationNames = Object.values(
        readableConfiguration
      ).map((el: any) => el?.name);
      const currentRequiredAttributesState: Record<string, any> = {};
      allAttrArrayRequired?.forEach((el: any) => {
        const name = el?.name;
        const value = el?.value;
        if (readableConfigurationNames.includes(name)) {
          currentRequiredAttributesState[name] = value;
        }
      });
      dispatch(setFormRequiredAndChecked(currentRequiredAttributesState));
      // update text input fields
      const allAttrArrayTextInput = allAttrArray?.filter(
        (el: any) => el?.metadata?.frontComponent === 'TextInput'
      );
      const currentTextInputAttributesState: Record<string, any> = {};
      allAttrArrayTextInput?.forEach((el: any) => {
        const name = el?.name;
        const value = el?.value;
        if (readableConfigurationNames.includes(name)) {
          currentTextInputAttributesState[name] = value;
        }
      });
      dispatch(setInitialFormTextInputFields(currentTextInputAttributesState));
    }
  }, [form, currentModelPresentation]);

  useEffect(() => {
    try {
      if (!form) return;
      const formValidAttributes: any = updateForm(form, getIsAttributeValid);
      setValidAttributes(formValidAttributes);
      dispatch(setFormValidAttributes(formValidAttributes));
      const currentGroup: any | TCurrentGroup = Object.values(
        formValidAttributes
      )?.[currentStep] || { 'MODEL Taille': {} };
      if (currentStep === -1 || !formValidAttributes) return;

      const currentModelPresentationOpen =
        findModelPresentationOpen(currentGroup);
      const newModelPresentation = currentModelPresentationOpen
        ? 'Open'
        : 'Closed';
      if (
        newModelPresentation !== currentModelPresentation &&
        playerMode === '2D'
      ) {
        setModelPresentation(newModelPresentation);
        dispatch(setCurrentModelView(newModelPresentation));
      }
    } catch (e) {
      console.log(e);
    }
  }, [currentStep]);

  return { isRotable };
}

export default useUpdateFormAndPlayer;
