import memoizeOne from 'memoize-one';
import { RootState } from 'store';

export const getTutorial = memoizeOne(
  (state: RootState) => state.flow.tutorial
);
export const getDisplayTutorial = (state: RootState) =>
  state.flow.tutorial.displayTutorial;
export const getTutorialStep = (state: RootState) =>
  state.flow.tutorial.tutorialStep;
export const getTutorialStepsNumber = (state: RootState) =>
  state.flow.tutorial.tutorialStepsNumber;
export const getTutorialSlideDirection = (state: RootState) =>
  state.flow.tutorial.tutorialSlideDirection;

export const getRecap = memoizeOne((state: RootState) => state.flow.recap);
export const getDisplayRecap = (state: RootState) =>
  state.flow.recap.displayRecap;
export const getRecapOpenPercentage = (state: RootState) =>
  state.flow.recap.recapOpenPercentage;
