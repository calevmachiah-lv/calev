import { useEffect, useMemo, useRef, useState } from 'react';
import { Heading, CarouselContainer } from './SummaryCarousel.styles';
import Attributes from '../AttributesGroups/Attributes';
import { CAROUSSEL_CLASSNAME } from '../../../utils/constants';
import { IForm } from 'store/threekitSlicer';

const SummaryCarousel = (props: { config: IForm }) => {
  const configData = props.config;
  const currentStep = 0;

  const [
    [currentAttributesGroupKey, currentAttributesGroup],
    setCurrentCategory,
  ] = useState(Object.entries(configData)[currentStep]);

  const totalSteps = useMemo(
    () => Object.keys(configData).length,
    [configData]
  );

  const carousel = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setCurrentCategory(Object.entries(configData)[currentStep]);
  }, [currentStep, configData, totalSteps]);

  useEffect(() => {
    if (carousel?.current) carousel.current.scrollTo(0, 0);
  }, [currentStep]);

  return (
    <CarouselContainer className={CAROUSSEL_CLASSNAME} ref={carousel}>
      <Heading>{currentAttributesGroupKey}</Heading>
      <Attributes attributes={currentAttributesGroup} />
    </CarouselContainer>
  );
};

export default SummaryCarousel;
