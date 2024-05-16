import { PLUS_ATTRIBUTE_ICON } from '../../assets';
import {
  AttributeCircleContainer,
  AttributeName,
  CircleContainer,
  CircleImage,
  Image,
} from './attributeCircle.styles';

function AttributeCircle({
  attributeName,
  openAttribute,
  selectedValue,
  isActive,
  inStock,
  isSelected,
  isTutorialCurrentStep = false,
}: {
  attributeName: string;
  openAttribute: () => void;
  selectedValue: any;
  isActive: boolean;
  inStock: boolean;
  isSelected: boolean;
  isTutorialCurrentStep?: boolean;
}) {
  const img = isSelected
    ? selectedValue?._thumbnailUrl ||
      'https://lv-kitting.s3.eu-north-1.amazonaws.com/tutorial/product-new-0.png'
    : PLUS_ATTRIBUTE_ICON;
  return (
    <AttributeCircleContainer isActive={isActive}>
      <CircleContainer
        onClick={openAttribute}
        inStock={inStock}
        img={img}
        isSelected={isSelected}
        isTutorialCurrentStep={isTutorialCurrentStep}
      >
        <CircleImage>
          <Image src={img} />
        </CircleImage>
      </CircleContainer>
      <AttributeName
        isTutorialCurrentStep={isTutorialCurrentStep}
        isActive={isActive}
      >
        {attributeName}
      </AttributeName>
    </AttributeCircleContainer>
  );
}

export default AttributeCircle;
