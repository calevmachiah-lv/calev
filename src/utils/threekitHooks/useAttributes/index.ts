import { useSelector, useDispatch } from 'react-redux';
import {
  IAttribute,
  getAttributes,
  setConfiguration,
} from '../../../store/threekitSlicer';
import { AnyAction, ThunkDispatch } from '@reduxjs/toolkit';
import { RootState } from 'store';
import { selectionToConfiguration } from '../../../utils/function/attributesHelperFn';
import { getChooseValue } from '../../function/functions';

const useAttributes = (attributes: string[]) => {
  type AppThunkDispatch = ThunkDispatch<RootState, any, AnyAction>;
  const dispatch = useDispatch<AppThunkDispatch>();
  const attributesFromStore = useSelector(getAttributes());
  const attributesToUse: IAttribute[] = Object.values(
    attributesFromStore
  )?.filter((attribute: IAttribute) => attributes.includes(attribute.name));
  if (!attributesToUse) return {};

  const dataAndChangeObject: Record<string, any> = attributesToUse?.reduce(
    (acc: any, attribute: IAttribute) => {
      acc[attribute.name] = {
        data: attributesFromStore?.[attribute?.name],
        change: (value: string) => {
          const chooseValue = getChooseValue(attribute?.values)?.assetId || '';
          const valueToUse = !value ? (chooseValue ? chooseValue : '') : value;
          if (!valueToUse) return;
          const preppedValue = selectionToConfiguration(
            valueToUse,
            attribute.type
          );

          if (!preppedValue && preppedValue !== '') return;
          dispatch(setConfiguration({ [attribute.name]: preppedValue }));
        },
      };
      return acc;
    },
    {}
  );

  dataAndChangeObject.changeAll = (values: Record<string, string>) => {
    const newConfiguration = Object.keys(values).reduce(
      (acc: Record<string, string>, key: string) => {
        const attribute = attributesFromStore[key];
        const chooseValue = getChooseValue(attribute?.values)?.assetId || '';
        const valueToUse = !values[key]
          ? chooseValue
            ? chooseValue
            : ''
          : values[key];
        if (!valueToUse) return acc;
        const preppedValue = selectionToConfiguration(
          valueToUse,
          attribute.type
        );
        acc[key] = preppedValue;
        return acc;
      },
      {}
    );
    dispatch(setConfiguration(newConfiguration));
  };

  return dataAndChangeObject;
};

export default useAttributes;
