import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import * as flowReducers from './reducers';

export interface FlowState {
  tutorial: {
    displayTutorial: boolean;
    tutorialStep: number;
    tutorialStepsNumber: number;
    tutorialSlideDirection: 'next' | 'prev';
  };
  recap: {
    displayRecap: boolean;
    recapOpenPercentage: number;
  };
}

const initialState: FlowState = {
  tutorial: {
    displayTutorial: true,
    tutorialStep: 0,
    tutorialStepsNumber: 0,
    tutorialSlideDirection: 'next',
  },
  recap: {
    displayRecap: false,
    recapOpenPercentage: 0,
  },
};

type FlowReducers = {
  [K in keyof typeof flowReducers]: (
    state: FlowState,
    action: PayloadAction<any>
  ) => void;
};

const flowSlice = createSlice({
  name: 'flowSlice',
  initialState,
  reducers: flowReducers as unknown as FlowReducers,
});

export const {
  setDisplayTutorial,
  setTutorialStep,
  setTutorialSlideDirection,
  setDisplayRecap,
  setRecapOpenPercentage,
  setTutorialStepsNumber,
  openRecap,
  closeRecap,
} = flowSlice.actions;

export default flowSlice.reducer;

export * from './reducers';
export * from './selectors';
