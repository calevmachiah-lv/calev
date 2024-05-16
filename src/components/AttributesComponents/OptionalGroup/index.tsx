import { useCallback, useMemo } from 'react';
import {
  CHECKED_RADIO_BUTTON_ICON,
  UNCHECKED_RADIO_BUTTON_ICON,
} from '../../../assets';
import { useAttribute } from '../../../utils/threekitHooks';
import {
  ClickableArea,
  ClosedAttributes,
  OpenedAttributes,
  OptionalGroupWrapper,
  RadioButton,
  RadioButtonTitle,
} from './optionalGroup.styled';
import Attributes from '../../Form/AttributesGroups/Attributes';
import { IAttribute } from 'store/threekitSlicer';

interface IOptionalGroupProps {
  attribute: IAttribute;
  attributesInGroup?: number;
  elseAttributes: IAttribute[];
}

function OptionalGroup({
  attribute,
  attributesInGroup = 1,
  elseAttributes,
}: IOptionalGroupProps) {
  const [attributeData, handleChange] = useAttribute(attribute.name);
  const openValue = useMemo(
    (): Record<string, any> =>
      attributeData?.values?.find(
        (val: Record<string, any>) =>
          val?.name?.toLowerCase().includes('yes ') ||
          val?.name?.toLowerCase() === 'yes'
      ),
    [attributeData]
  );

  const closeValue = useMemo(
    (): Record<string, any> =>
      attributeData?.values?.find(
        (val: Record<string, any>) =>
          val?.name?.toLowerCase().includes('no ') ||
          val?.name?.toLowerCase() === 'no'
      ),
    [attributeData]
  );

  const isOpen = useMemo((): boolean => {
    return attributeData?.value?.assetId === openValue?.assetId;
  }, [attributeData, openValue]);

  const handleClose = useCallback(() => {
    handleChange(closeValue?.assetId);
  }, [handleChange, closeValue?.assetId]);

  const handleOpen = useCallback(() => {
    handleChange(openValue?.assetId);
  }, [handleChange, openValue?.assetId]);

  return (
    <OptionalGroupWrapper>
      {
        <ClosedAttributes>
          <ClickableArea onClick={handleClose}>
            <RadioButton
              src={
                isOpen ? UNCHECKED_RADIO_BUTTON_ICON : CHECKED_RADIO_BUTTON_ICON
              }
            />
            <RadioButtonTitle>{closeValue?.displayName}</RadioButtonTitle>
          </ClickableArea>
        </ClosedAttributes>
      }
      <OpenedAttributes open={isOpen} disabled={false}>
        <ClickableArea onClick={handleOpen}>
          <RadioButton
            src={
              isOpen ? CHECKED_RADIO_BUTTON_ICON : UNCHECKED_RADIO_BUTTON_ICON
            }
          />
          <RadioButtonTitle>{openValue?.displayName}</RadioButtonTitle>
        </ClickableArea>
        <Attributes
          attributes={elseAttributes}
          insideOptionalGroup={true}
          isActive={isOpen}
          numOfAttrs={attributesInGroup}
        />
      </OpenedAttributes>
    </OptionalGroupWrapper>
  );
}

export default OptionalGroup;
