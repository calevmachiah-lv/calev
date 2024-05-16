import React, { useCallback, useEffect, useMemo } from 'react';
import {
  getIsInStock,
  getNotInStockUnselected,
  setNotInStockUnselected,
} from '../../store/threekitSlicer';
import { useAttributes } from '../../utils/threekitHooks';
import {
  AttributeValue,
  AttributeValuesContainer,
} from './attributeValues.styles';
import { useDispatch, useSelector } from 'react-redux';
import useAvaibility from '../../hooks/useAvaibility';
import { isChooseValue } from '../../utils/function/functions';

function AttributeValues({
  attributeNames,
  selectedValues,
}: {
  attributeNames: string[];
  selectedValues: any[];
}) {
  const dispatch = useDispatch();
  const maxSelections = attributeNames.length;
  const attributesObject = useAttributes(attributeNames);
  const inStockData = useSelector(getIsInStock);
  const notInStockUnselected = useSelector(getNotInStockUnselected);
  // const { isLoading } = useAvaibility(attributesObject, attributeNames); // TODO: fix it

  const values = useMemo(
    () =>
      attributesObject?.[attributeNames?.[0]]?.data?.values?.filter(
        (v: any) => !isChooseValue(v)
      ) || [],
    [attributesObject, attributeNames]
  );

  const orderedValues = useMemo(
    () =>
      values?.sort((a: any, b: any) =>
        inStockData?.[a?.sku] === inStockData?.[b?.sku]
          ? 0
          : inStockData?.[a?.sku]
            ? -1
            : 1
      ),
    [values, inStockData]
  );

  const notSelectedAttributes = useMemo(
    () =>
      Object.keys(attributesObject).filter(
        (attributeName) =>
          attributesObject[attributeName].data?.values?.find(
            (value: any) => value?.selected && isChooseValue(value)
          )
      ),
    [attributesObject]
  );

  const changeAllValues = useCallback(
    (values: any[]) => {
      attributesObject.changeAll(
        values.reduce((acc: Record<string, string>, selectedValue, index) => {
          acc[attributeNames[index]] = selectedValue?.assetId || '';
          console.log(acc)
          return acc;
        }, {})
      );
    },
    [attributesObject, attributeNames]
  );

  const handleClick = useCallback(
    (value: any) => {
      const indexAlreadySelected = selectedValues?.findIndex(
        (selectedValue) =>
          selectedValue?.assetId === value?.assetId && !isChooseValue(value)
      );
      if (maxSelections === 1) {
        const attributeName = attributeNames[0];
        const newValue = indexAlreadySelected > -1 ? '' : value;
        attributesObject[attributeName]?.change(newValue?.assetId || '');
      } else {
        if (indexAlreadySelected > -1) {
          const newSelectedValues = [...selectedValues]?.map((selectedValue) =>
            selectedValue?.assetId === value?.assetId ? '' : selectedValue
          );
          changeAllValues(newSelectedValues);
        } else if (notSelectedAttributes?.length) {
          const notSelectedAttribute = notSelectedAttributes[0];
          attributesObject[notSelectedAttribute]?.change(value?.assetId);
        } else {
          const newSelectedValues = [...selectedValues];
          newSelectedValues?.shift();
          newSelectedValues?.push(value);
          changeAllValues(newSelectedValues);
        }
      }
    },
    [
      attributeNames,
      attributesObject,
      notSelectedAttributes,
      selectedValues,
      maxSelections,
      changeAllValues,
    ]
  );

  const firstInStockValue = useMemo(
    () =>
      orderedValues.find((value: any) => inStockData?.[value?.sku] !== false),
    [orderedValues, inStockData]
  );

  useEffect(() => {
    if (!orderedValues?.length || !inStockData || notInStockUnselected) return;
    selectedValues?.forEach((selectedValue) => {
      if (isChooseValue(selectedValue)) return;
      if (inStockData?.[selectedValue?.sku] === false) {
        handleClick(firstInStockValue ? firstInStockValue : { assetId: '' });
      }
    });
    dispatch(setNotInStockUnselected(true));
  }, [
    orderedValues,
    selectedValues,
    handleClick,
    firstInStockValue,
    notInStockUnselected,
    inStockData,
    dispatch,
  ]);

  return (
    <AttributeValuesContainer>
      {orderedValues?.map((value: any) => {
        const isSelected = selectedValues.some(
          (selectedValue) =>
            selectedValue?.assetId && selectedValue.assetId === value?.assetId
        );
        const inStock = inStockData?.[value?.sku] !== false;

        return (
          <AttributeValue
            key={value.name || value?.label}
            isSelected={isSelected}
            inStock={inStock}
            onClick={() => handleClick(value)}
            img={
              value?._thumbnailUrl ||
              'https://lv-kitting.s3.eu-north-1.amazonaws.com/tutorial/product-new-0.png'
            }
          >
            <img
              src={
                value?._thumbnailUrl ||
                'https://lv-kitting.s3.eu-north-1.amazonaws.com/tutorial/product-new-0.png'
              }
              alt={value?.name}
            />
          </AttributeValue>
        );
      })}
    </AttributeValuesContainer>
  );
}

export default AttributeValues;
