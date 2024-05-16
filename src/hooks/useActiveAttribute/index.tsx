import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { getActiveAttribute } from '../../store/threekitSlicer';
import { useAttribute } from '../../utils/threekitHooks';

function useActiveAttribute() {
  const activeAttribute = useSelector(getActiveAttribute);
  const [attributeData, handleChange] = useAttribute(activeAttribute as string);
  const dataDrivenAttributes =
    window?.dataDrivenConfiguratorExtension?.getStatus()
      ?.validAttributesAndTheirValues_typeB;
  const selectedValues: any[] = useMemo(() => {
    if (!attributeData?.groupName)
      return [attributeData?.values.find((value: any) => value?.selected)];
    else {
      const attributesInGroup = dataDrivenAttributes?.filter(
        (attribute: any) => attribute.groupName === attributeData.groupName
      );
      const selected = attributesInGroup?.map((attribute: any) =>
        attribute.values.find((value: any) => value?.selected)
      );
      return selected;
    }
  }, [attributeData, dataDrivenAttributes]);

  return { attributeData, selectedValues, handleChange, activeAttribute };
}

export default useActiveAttribute;
