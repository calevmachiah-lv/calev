import { PayloadAction } from '@reduxjs/toolkit';
import { FlowState } from '..';

export const setDisplayTutorial = (
  state: FlowState,
  action: PayloadAction<boolean>
) => {
  state.tutorial.displayTutorial = action.payload;
};

export const setTutorialStep = (
  state: FlowState,
  action: PayloadAction<number>
) => {
  state.tutorial.tutorialStep = action.payload;
};

export const setTutorialStepsNumber = (
  state: FlowState,
  action: PayloadAction<number>
) => {
  state.tutorial.tutorialStepsNumber = action.payload;
};

export const setTutorialSlideDirection = (
  state: FlowState,
  action: PayloadAction<'next' | 'prev'>
) => {
  state.tutorial.tutorialSlideDirection = action.payload;
};

export const setDisplayRecap = (
  state: FlowState,
  action: PayloadAction<boolean>
) => {
  state.recap.displayRecap = action.payload;
};

export const setRecapOpenPercentage = (
  state: FlowState,
  action: PayloadAction<number>
) => {
  state.recap.recapOpenPercentage = action.payload;
};

export const openRecap = (state: FlowState) => {
  state.recap.displayRecap = true;
  state.recap.recapOpenPercentage = 100;
};

export const closeRecap = (state: FlowState) => {
  state.recap.displayRecap = false;
  state.recap.recapOpenPercentage = 0;
};
