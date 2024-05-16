import memoizeOne from 'memoize-one';
import { stateRoot } from 'store';
import { FormState } from '..';

export const getFormRequiredAndChecked: (
  state: stateRoot
) => FormState['requiredAndChecked'] = memoizeOne((state) => {
  return state.validation.form.requiredAndChecked;
});

export const getFormWarningMessages: (
  state: stateRoot
) => FormState['warningMessages'] = memoizeOne((state) => {
  return state.validation.form.warningMessages;
});

export const getFormTextInputFields: (
  state: stateRoot
) => FormState['textInputFields'] = memoizeOne((state) => {
  return state.validation.form.textInputFields;
});
