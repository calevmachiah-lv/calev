import React, { useMemo } from 'react';
import { IAttribute } from '../../store/threekitSlicer';
import {
  ActiveAttributeSelectorContainer,
  CloseButton,
  ValuesContainer,
} from './activeAttributeSelector.styles';
import { useWindowSize } from '../../utils/threekitHooks';
import AttributeValues from '../AttributeValues';
import ActiveAttributeTitle from '../ActiveAttributeTitle';
import SelectedValuesOfAttribute from '../SlectedValuesOfAttribute';
import CloseIcon from '../CloseIcon';

function ActiveAttributeSelector({
  attributes,
  isActive,
  closeAttribute,
  selectedValues,
}: {
  attributes: IAttribute[];
  isActive: boolean;
  closeAttribute: () => void;
  selectedValues: any[];
}) {
  return (
    <ActiveAttributeSelectorContainer
      style={{
        bottom: isActive ? `0px` : '-110%',
      }}
      onClick={(e) => e.stopPropagation()}
    >
      <CloseIcon onClick={closeAttribute} />
      <ActiveAttributeTitle />
      <SelectedValuesOfAttribute selectedValues={selectedValues} />
      <ValuesContainer>
        <AttributeValues
          attributeNames={attributes.map((attribute) => attribute.name)}
          selectedValues={selectedValues}
        />
      </ValuesContainer>
      <CloseButton onClick={closeAttribute}>Apply</CloseButton>
    </ActiveAttributeSelectorContainer>
  );
}

export { ActiveAttributeSelector };
