import React from 'react';
import {
  SelectedValue,
  SelectedValuesContainer,
} from './selectedValuesOfAttribute.styles';
import { useSelector } from 'react-redux';
import { getIsInStock } from '../../store/threekitSlicer';

function SelectedValuesOfAttribute({
  selectedValues,
}: {
  selectedValues: any[];
}) {
  const inStockData = useSelector(getIsInStock);

  return (
    <SelectedValuesContainer>
      {selectedValues?.map((value, i) => {
        const inStock = inStockData?.[value?.sku] !== false;
        return (
          <SelectedValue
            key={`selectedValue-${value?.displayName}`}
            inStock={inStock}
          >
            {value?.displayName}
            <span style={{ color: '#767676' }}>
              {i !== selectedValues.length - 1 && '  | '}
            </span>
          </SelectedValue>
        );
      })}
    </SelectedValuesContainer>
  );
}

export default SelectedValuesOfAttribute;
