"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.closeRecap = exports.openRecap = exports.setRecapOpenPercentage = exports.setDisplayRecap = exports.setTutorialSlideDirection = exports.setTutorialStepsNumber = exports.setTutorialStep = exports.setDisplayTutorial = void 0;
const setDisplayTutorial = (state, action) => {
    state.tutorial.displayTutorial = action.payload;
};
exports.setDisplayTutorial = setDisplayTutorial;
const setTutorialStep = (state, action) => {
    state.tutorial.tutorialStep = action.payload;
};
exports.setTutorialStep = setTutorialStep;
const setTutorialStepsNumber = (state, action) => {
    state.tutorial.tutorialStepsNumber = action.payload;
};
exports.setTutorialStepsNumber = setTutorialStepsNumber;
const setTutorialSlideDirection = (state, action) => {
    state.tutorial.tutorialSlideDirection = action.payload;
};
exports.setTutorialSlideDirection = setTutorialSlideDirection;
const setDisplayRecap = (state, action) => {
    state.recap.displayRecap = action.payload;
};
exports.setDisplayRecap = setDisplayRecap;
const setRecapOpenPercentage = (state, action) => {
    state.recap.recapOpenPercentage = action.payload;
};
exports.setRecapOpenPercentage = setRecapOpenPercentage;
const openRecap = (state) => {
    state.recap.displayRecap = true;
    state.recap.recapOpenPercentage = 100;
};
exports.openRecap = openRecap;
const closeRecap = (state) => {
    state.recap.displayRecap = false;
    state.recap.recapOpenPercentage = 0;
};
exports.closeRecap = closeRecap;
