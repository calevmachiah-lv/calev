import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import * as validationReducers from './reducers';

export interface FormState {
  requiredAndChecked: Record<string, any>;
  textInputFields: Record<string, any>;
  warningMessages: Record<string, any>;
}

interface ValidationState {
  form: FormState;
}

const initialState: ValidationState = {
  form: {
    requiredAndChecked: {},
    textInputFields: {},
    warningMessages: {},
  },
};

type ValidationReducers = {
  [K in keyof typeof validationReducers]: (
    state: ValidationState,
    action: PayloadAction<any>
  ) => void;
};

const validationSlice = createSlice({
  name: 'validationSlice',
  initialState,
  reducers: validationReducers as unknown as ValidationReducers,
});

export const {
  setFormRequiredAndChecked,
  setFormWarningMessages,
  setFormTextInputFields,
  setInitialFormTextInputFields,
} = validationSlice.actions;

export default validationSlice.reducer;

export * from './reducers';
export * from './selectors';
