import { useSelector, useDispatch } from 'react-redux';
import { selectionToConfiguration } from '../../function/attributesHelperFn';
import { getAttributes, setConfiguration } from '../../../store/threekitSlicer';
import { AnyAction, ThunkDispatch } from '@reduxjs/toolkit';
import { RootState } from 'store';

const useAttribute = (attribute: string) => {
  type AppThunkDispatch = ThunkDispatch<RootState, any, AnyAction>;
  const dispatch = useDispatch<AppThunkDispatch>();
  const attributeData = useSelector(getAttributes(attribute));

  if (!attribute || !attributeData || !Object.keys(attributeData).length)
    return [undefined, () => { }];

  const handleChange = (value: any) => {

    const preppedValue = selectionToConfiguration(value, attributeData.type);

    if (!preppedValue && preppedValue !== '') return;
    dispatch(setConfiguration({ [attribute]: preppedValue }));
  };

  const dataDrivenAttributes =
    window.dataDrivenConfiguratorExtension.getStatus()
      ?.validAttributesAndTheirValues_typeB;
  const mergerAttributes = dataDrivenAttributes?.reduce((acc: any, el: any) => {
    acc[el.name] = el;
    if (el.children?.length > 0) {
      el.children.forEach((el2: any) => (acc[el2.name] = el2));
    }
    return acc;
  }, {});

  const newAttributes = { ...attributeData, ...mergerAttributes?.[attribute] };

  return [newAttributes, handleChange];
};

export default useAttribute;
