import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  IAttribute,
  getActiveAttribute,
  getGroupedAttributes,
  getIsInStock,
  setActiveAttribute,
} from '../../store/threekitSlicer';
import AttributeCircle from '../AttributeCircle';
import { AttributesContainer, AttributesFlex } from './attributes.styles';
import { useWindowSize } from '../../utils/threekitHooks';
import { ActiveAttributeSelector } from '../ActiveAttributeSelector';
import {
  getDisplayRecap,
  setRecapOpenPercentage,
} from '../../store/flowSlicer';
import { isChooseValue } from '../../utils/function/functions';

interface AttributesProps {
  tutorialStep?: number;
  displayTutorial?: boolean;
}

const Attributes: React.FC<AttributesProps> = ({
  tutorialStep,
  displayTutorial,
}) => {
  const dispatch = useDispatch();
  const groupedAttributes = useSelector(getGroupedAttributes) || {};
  const activeAttribute = useSelector(getActiveAttribute);
  const displayRecap = useSelector(getDisplayRecap);
  const inStockData = useSelector(getIsInStock);
  const { isMobile, width } = useWindowSize();

  const openAttribute = useCallback(
    (attribute: IAttribute) => {
      dispatch(setActiveAttribute(attribute.name));
    },
    [dispatch]
  );

  const closeAttribute = useCallback(() => {
    dispatch(setActiveAttribute(''));
  }, [dispatch]);

  useEffect(() => {
    if (
      width !== 0 &&
      !isMobile &&
      !activeAttribute &&
      Object.keys(groupedAttributes).length
    ) {
      openAttribute(Object.values(groupedAttributes)[0][0]);
    } else if (isMobile && displayRecap && activeAttribute) {
      closeAttribute();
      dispatch(setRecapOpenPercentage(100));
    }
  }, [
    activeAttribute,
    openAttribute,
    isMobile,
    groupedAttributes,
    width,
    displayRecap,
    closeAttribute,
    dispatch,
  ]);

  useEffect(() => {
    if (displayTutorial) {
      closeAttribute();
    }
  }, [displayTutorial, closeAttribute]);

  return (
    <AttributesContainer>
      <AttributesFlex>
        {Object.entries(groupedAttributes).map(
          ([groupName, attributes]: [string, IAttribute[]], index: number) => {
            const selectedValues = attributes.map((attribute) =>
              attribute.values.find((value: any) => value?.selected)
            );
            const isGroup = attributes[0]?.groupName;
            const selectedValue = selectedValues[0];
            const isSelected = selectedValues.some(
              (value) => value?.assetId && !isChooseValue(value)
            );
            return (
              <React.Fragment key={attributes[0].name}>
                <AttributeCircle
                  attributeName={isGroup ? groupName : attributes[0].name || ''}
                  isActive={activeAttribute === attributes[0].name}
                  isTutorialCurrentStep={
                    tutorialStep === index && displayTutorial
                  }
                  selectedValue={selectedValue}
                  isSelected={isSelected}
                  openAttribute={() => openAttribute(attributes[0])}
                  inStock={selectedValues?.every(
                    (value) => inStockData?.[value?.sku] !== false
                  )}
                />
                {isMobile && (
                  <ActiveAttributeSelector
                    attributes={attributes}
                    selectedValues={selectedValues}
                    isActive={activeAttribute === attributes[0].name}
                    closeAttribute={closeAttribute}
                  />
                )}
              </React.Fragment>
            );
          }
        )}
      </AttributesFlex>
    </AttributesContainer>
  );
};

export default Attributes;
