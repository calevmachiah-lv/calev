import { PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../index';
import { FormState } from '..';

export const setFormRequiredAndChecked = (
  state: RootState,
  action: PayloadAction<FormState['requiredAndChecked']>
) => {
  return {
    ...state,
    form: {
      ...state.form,
      requiredAndChecked: action.payload,
    },
  };
};

export const setFormWarningMessages = (
  state: RootState,
  action: PayloadAction<FormState['warningMessages']>
) => {
  return {
    ...state,
    form: {
      ...state.form,
      warningMessages: action.payload,
    },
  };
};

export const setFormTextInputFields = (
  state: RootState,
  action: PayloadAction<FormState['textInputFields']>
) => {
  return {
    ...state,
    form: {
      ...state.form,
      textInputFields: action.payload,
    },
  };
};

export const setInitialFormTextInputFields = (
  state: RootState,
  action: PayloadAction<FormState['textInputFields']>
) => {
  const textInputFields = state.form.textInputFields;
  return {
    ...state,
    form: {
      ...state.form,
      textInputFields: {
        ...action.payload,
        ...textInputFields,
      },
    },
  };
};
