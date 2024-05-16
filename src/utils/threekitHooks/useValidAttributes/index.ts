import { useCallback, useMemo, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  setGlobalSettingsParams,
  getGlobalSettingsParams,
} from '../../../store/globalSettingsSlicer/index';
import { IAttribute } from 'store/threekitSlicer';

function useValidAttributes(attributeName?: string) {
  const dataDrivenStatus = window.dataDrivenConfiguratorExtension?.getStatus();

  const validAttributes = useMemo(() => {
    return dataDrivenStatus?.validAttributesAndTheirValues_typeB || [];
  }, [dataDrivenStatus]);

  const dispatch = useDispatch();
  const globalSettingsParams = useSelector(getGlobalSettingsParams);

  const sku: string = useMemo(() => {
    const skus = dataDrivenStatus?.skus;
    return skus && skus.hasOwnProperty('Code ERP') ? skus['Code ERP'] : '';
  }, [dataDrivenStatus]);

  useEffect(() => {
    if (sku.toString() !== '') {
      dispatch(setGlobalSettingsParams({ ...globalSettingsParams, sku }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    // NOTE: potential circular dependency if we add globalSettingsParams.
    // there is maybe a solution for this.
  }, [dispatch, sku]);

  const getIsAttributeValid = useCallback(
    (attributeNameParam?: string) => {
      const attributeNameToCheck = attributeNameParam || attributeName;
      if (attributeNameToCheck) {
        return validAttributes?.some((attribute: IAttribute) => {
          return (
            attribute?.name === attributeNameToCheck ||
            attribute?.children?.some(
              (child: any) => child?.name === attributeNameToCheck
            )
          );
        });
      }
    },
    [attributeName, validAttributes]
  );

  const isAttributeValid = useMemo(() => {
    if (attributeName) return getIsAttributeValid();
  }, [getIsAttributeValid, attributeName]);

  const currentAttribute = useMemo(() => {
    if (attributeName) {
      const attr = validAttributes?.find((attribute: IAttribute) => {
        return attribute?.name === attributeName;
      });
      if (attr) return attr;
      else {
        let currChild;
        validAttributes?.forEach((attribute: IAttribute) => {
          attribute?.children?.forEach((child: any) => {
            if (child?.name === attributeName) currChild = child;
          });
        });
        return currChild;
      }
    }
  }, [attributeName, validAttributes]);

  const attributeValidValues = useMemo(() => {
    if (attributeName) {
      const attributeValidValues = currentAttribute?.values;
      return attributeValidValues;
    }
  }, [attributeName, currentAttribute]);

  const isValueValid = useCallback(
    (value: any) => {
      return attributeValidValues?.some((attribute: IAttribute) => {
        return attribute?.name === value;
      });
    },
    [attributeValidValues]
  );

  const toReturn = useMemo(() => {
    if (attributeName)
      return isAttributeValid
        ? {
          isAttributeValid,
          getIsAttributeValid,
          validAttributes: attributeValidValues,
          sku: sku,
          isValueValid,
        }
        : {
          getIsAttributeValid,
          isAttributeValid,
          validAttributes: [],
          sku: sku,
          isValueValid,
        };
    else {
      return {
        getIsAttributeValid,
        validAttributes: validAttributes,
        sku: sku,
      };
    }
  }, [
    validAttributes,
    sku,
    attributeName,
    attributeValidValues,
    isValueValid,
    getIsAttributeValid,
    isAttributeValid,
  ]);

  return toReturn;
}

export default useValidAttributes;
