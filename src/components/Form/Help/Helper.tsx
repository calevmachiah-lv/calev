import { CLOSE_ICON_HELPER } from '../../../assets';
import {
  Container,
  ContentContainer,
  DescriptionContainer,
  DescriptionText,
  DescriptionTitle,
  Icon,
  InnerContainer,
  PictureContainer,
  StepSlide,
  StepTitle,
  Title,
  TitleContainer,
} from './Helper.style';
import { helperData } from '../../../utils/mockData';
import ViewsViewer from '../../ViewsViewer';
import { useState } from 'react';
import { HELPER_DIV_ID } from '../../../utils/constants';

interface HelperProps {
  displayHelper: boolean;
  setDisplayHelper: React.Dispatch<React.SetStateAction<boolean>>;
}
const Helper = ({ displayHelper, setDisplayHelper }: HelperProps) => {
  const [activeStep, setActiveStep] = useState<number>(0);
  const [open, setOpen] = useState<boolean>(true);
  const [slideDirection, setSlideDirection] = useState<'next' | 'prev'>('next');

  return (
    <Container id={HELPER_DIV_ID} open={displayHelper}>
      {helperData?.map((item, index) => {
        return (
          <StepSlide key={index} isActive={activeStep === index}>
            
            <InnerContainer open={displayHelper}>
              <TitleContainer>
                <Title>How to Custome your Lucky Louis</Title>
                <Icon
                  src={CLOSE_ICON_HELPER}
                  onClick={() => {
                    setDisplayHelper(false);
                  }}
                />
              </TitleContainer>

              <ContentContainer>
                <PictureContainer
                  image={item?.imageUrl}
                  slideDirection={slideDirection}
                >
                  <ViewsViewer
                    data={helperData}
                    setActiveStep={setActiveStep}
                    setSlideDirection={setSlideDirection}
                    activeStep={activeStep}
                    isMobile={true}
                    isHelper
                    containerID={HELPER_DIV_ID}
                  />
                </PictureContainer>

                <DescriptionContainer>
                  <StepTitle>Step - 0{activeStep + 1}</StepTitle>
                  <DescriptionTitle>
                    Select your {item?.title}
                  </DescriptionTitle>
                  <DescriptionText>
                    {item?.description}
                  </DescriptionText>
                </DescriptionContainer>
              </ContentContainer>
            </InnerContainer>
          </StepSlide>
        );
      })}
    </Container>
  );
};

export default Helper;
