import { IForm } from 'store/threekitSlicer';
import { getStepNumberByAttributeName } from './attributesHelperFn';
import { isEmptyObj } from './functions';
import { FormState } from 'store/validationSlicer';

export const shouldDisableButton = ({
  form,
  formRequiredAndCheckedFields,
  currentStep,
  isCarousel,
}: {
  form: IForm | undefined;
  formRequiredAndCheckedFields: FormState['requiredAndChecked'];
  currentStep: number;
  isCarousel: boolean;
}): boolean => {
  if (!form) return false;
  if (isEmptyObj(formRequiredAndCheckedFields)) return false;
  let result = false;
  const object = formRequiredAndCheckedFields;
  Object.entries(object).forEach(([attributeName, attributeValue]) => {
    const inputValue = attributeValue;
    const attributeStep = getStepNumberByAttributeName({
      form,
      attributeName,
    });
    if (
      ((isCarousel && currentStep === attributeStep) || !isCarousel) &&
      !inputValue
    ) {
      result = true;
    }
  });
  return result;
};
