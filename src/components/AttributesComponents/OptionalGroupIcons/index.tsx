import { useCallback, useMemo } from 'react';
import {
  ADD_OPTIONAL_SELECTED,
  ADD_OPTIONAL_UNSELECTED,
  DONT_ADD_OPTIONAL_SELECTED,
  DONT_ADD_OPTIONAL_UNSELECTED,
} from '../../../assets';
import { useAttribute } from '../../../utils/threekitHooks';
import {
  ClickableArea,
  IconsWrapper,
  OptionalGroupWrapper,
  Icon,
  IconTitle,
} from './optionalGroupIcons.styled';
import Attributes from '../../Form/AttributesGroups/Attributes';
import { IAttribute } from 'store/threekitSlicer';

interface IOptionalGroupIconsProps {
  attribute: IAttribute;
  attributesInGroup?: number;
  elseAttributes: IAttribute[];
}

function OptionalGroupIcons({
  attribute,
  attributesInGroup = 1,
  elseAttributes = [],
}: IOptionalGroupIconsProps) {
  const [attributeData, handleChange] = useAttribute(attribute.name!);
  const openValue = useMemo(
    (): Record<string, any> =>
      attributeData?.values?.find(
        (val: Record<string, any>) => val?.name?.toLowerCase() === 'yes'
      ),
    [attributeData]
  );
  const closeValue = useMemo(
    (): Record<string, any> =>
      attributeData?.values?.find(
        (val: Record<string, any>) => val?.name?.toLowerCase() === 'no'
      ),
    [attributeData]
  );

  const isOpen = useMemo((): boolean => {
    return attributeData?.value?.assetId === openValue?.assetId;
  }, [attributeData, openValue?.assetId]);

  const handleClose = useCallback(() => {
    handleChange(closeValue?.assetId);
  }, [handleChange, closeValue?.assetId]);

  const handleOpen = useCallback(() => {
    handleChange(openValue?.assetId);
  }, [handleChange, openValue?.assetId]);

  return (
    <OptionalGroupWrapper>
      <IconsWrapper>
        <ClickableArea onClick={handleOpen}>
          <Icon
            src={isOpen ? ADD_OPTIONAL_SELECTED : ADD_OPTIONAL_UNSELECTED}
          />
          <IconTitle>{openValue?.displayName}</IconTitle>
        </ClickableArea>
        <ClickableArea onClick={handleClose}>
          <Icon
            src={
              isOpen ? DONT_ADD_OPTIONAL_UNSELECTED : DONT_ADD_OPTIONAL_SELECTED
            }
          />
          <IconTitle>{closeValue?.displayName}</IconTitle>
        </ClickableArea>
      </IconsWrapper>
      <Attributes
        attributes={elseAttributes}
        insideOptionalGroup={true}
        optionalGroupIcon={true}
        isActive={isOpen}
        numOfAttrs={attributesInGroup}
      />
    </OptionalGroupWrapper>
  );
}

export default OptionalGroupIcons;
