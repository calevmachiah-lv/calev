import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { AttributesWrapper } from './attributes.styled';
import {
  OptionalGroup,
  OptionalGroupIcons,
} from '../../../AttributesComponents';
import { OOB_APPNAME } from '../../../../utils/constants';
import { getGlobalSettingsParams } from '../../../../store/globalSettingsSlicer/selectors';
import { useWindowSize } from '../../../../utils/threekitHooks';
import Attribute from '../Attribute';
import { IAttribute } from 'store/threekitSlicer';

interface IAttributes {
  attributes: Record<string, IAttribute> | IAttribute[];
  isActive?: boolean | string | null;
  numOfAttrs?: number;
  insideOptionalGroup?: boolean;
  optionalGroupIcon?: boolean;
}

function Attributes({
  attributes,
  isActive,
  numOfAttrs,
  insideOptionalGroup = false,
  optionalGroupIcon = false,
}: IAttributes) {
  const { appName } = useSelector(getGlobalSettingsParams);
  const { isDesktop } = useWindowSize();
  const [optionalGroupAttribute, elseAttributes] = useMemo((): [
    IAttribute | undefined,
    IAttribute[],
  ] => {
    let optionalGroupAttribute;
    let elseAttributes: IAttribute[] = [];
    Object.values(attributes).forEach((attribute: IAttribute) => {
      if (
        attribute.frontComponent === 'OptionalGroup' ||
        [
          'HDS_Has_Custom_Text',
          'HDS_Has_Lock_Number',
          'has patch',
          'has lock number',
        ].includes(attribute.name!)
      ) {
        optionalGroupAttribute = attribute;
      } else {
        elseAttributes.push(attribute);
      }
    });
    return [optionalGroupAttribute, elseAttributes];
  }, [attributes]);

  return (
    <AttributesWrapper
      isActive={isActive}
      insideOptionalGroup={insideOptionalGroup}
      optionalGroupIcon={optionalGroupIcon}
    >
      {optionalGroupAttribute ? (
        appName === OOB_APPNAME && isDesktop ? (
          <OptionalGroupIcons
            key={optionalGroupAttribute.id}
            attribute={optionalGroupAttribute}
            attributesInGroup={numOfAttrs}
            elseAttributes={elseAttributes}
          />
        ) : (
          <OptionalGroup
            key={optionalGroupAttribute?.id}
            attribute={optionalGroupAttribute}
            attributesInGroup={numOfAttrs}
            elseAttributes={elseAttributes}
          />
        )
      ) : (
        Object.values(attributes).map((attribute: any) => (
          <Attribute
            key={attribute.id}
            attribute={attribute}
            attributesInGroup={numOfAttrs}
            insideOptionalGroup={insideOptionalGroup}
          />
        ))
      )}
    </AttributesWrapper>
  );
}

export default Attributes;
