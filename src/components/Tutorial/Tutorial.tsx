import { useDispatch, useSelector } from 'react-redux';
import { t } from 'i18next';
import { useWindowSize } from '../../utils/threekitHooks';
import {
    Container,
    DescriptionText,
    DescriptionContainer,
    StepLabel,
    StepTitle,
    TutorialContainer,
    StepSlide,
    Wrapper
} from './Tutorial.styles';
import React, { useEffect, useRef, useState } from 'react';
import ViewsViewer from '../ViewsViewer';
import { TUTORIAL_DIV_ID, CLOSE_BUTTON_LABEL } from '../../utils/constants';
import OptionsButton from '../Form/OptionsButton';
import { setDisplayTutorial, getTutorial } from '../../store/flowSlicer';

const Tutorial = ({ tutorialData }: any) => {
    const dispatch = useDispatch();
    const { isMobile } = useWindowSize();
    const stepInfoRef = useRef<HTMLDivElement | null>(null);
    const { tutorialStep } = useSelector(getTutorial);

    return (
        <Container id={TUTORIAL_DIV_ID}>
            {tutorialData?.steps?.map((item: any, index: number) => {
                return (
                    <StepSlide
                        ref={stepInfoRef}
                        key={index}
                        isActive={tutorialStep === index}
                    >
                        <TutorialContainer>
                            <StepLabel>{`${t('label.step', { defaultValue: 'Step' })} - 0${index + 1
                                }`}</StepLabel>
                            {item?.title && (
                                <StepTitle>{`${t(
                                    'label.choice',
                                    'Select your'
                                )} ${item?.title}`}</StepTitle>
                            )}
                        </TutorialContainer>
                        <Wrapper>
                            {item?.description && (
                                <DescriptionContainer>
                                    <DescriptionText>
                                        {t('item?.description', { defaultValue: item?.description })}
                                    </DescriptionText>
                                </DescriptionContainer>
                            )}
                            <ViewsViewer
                                data={tutorialData?.steps}
                                isMobile={isMobile}
                                containerID={TUTORIAL_DIV_ID}
                            />
                        </Wrapper>
                    </StepSlide>
                );
            })}
            <OptionsButton
                buttonName={CLOSE_BUTTON_LABEL}
                fnButton={() => dispatch(setDisplayTutorial(false))}
            />
        </Container>
    );
};

export default Tutorial;
