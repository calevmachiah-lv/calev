import { useCallback, useEffect, useState } from 'react';
import { useAttribute, useWindowSize } from '../../../utils/threekitHooks';
import {
  ClickableArea,
  DescriptionIcon,
  DescriptionIconWrapper,
  DescriptionText,
  RadioButton,
  RadioButtonHeader,
  RadioButtonLabel,
  RadioButtonWrapper,
  RadioButtonsWrapper,
} from './radioButtons.styles';
import {
  CHECKED_RADIO_BUTTON_ICON,
  DESCRIPTION_ICON,
  UNCHECKED_RADIO_BUTTON_ICON,
} from '../../../assets';
import { DESCRIPTION_PLACEHOLDER } from '../../../utils/constants';
import { getAttributeIndex } from '../../../utils/function/attributesHelperFn';
import { t } from 'i18next';

interface AttributeValue {
  name: string;
  metadata: {
    description: string;
  };
  assetId: string;
}

interface Attribute {
  name: string;
  values: AttributeValue[];
  value?: {
    assetId: string;
  };
}

interface ValidValue {
  name: string;
  displayName: string;
  description: string;
  assetId?: string;
}

interface RadioButtonsProps {
  attribute: Attribute;
  validValues: ValidValue[];
}

function RadioButtons({ attribute, validValues }: RadioButtonsProps) {
  const [attributeData, handleChange] = useAttribute(attribute.name);
  const [descriptionOpened, setDescriptionOpened] = useState<string | null>(
    null
  );
  useWindowSize();
  const [selected, setSelected] = useState<string | undefined>(
    attributeData?.value?.assetId
  );
  const [mappedValidAttributes, setMappedValidAttributes] = useState<
    ValidValue[]
  >([]);

  useEffect(() => {
    const attributeMap = Object.fromEntries(
      attribute.values.map((attr) => [attr.name, attr.metadata.description])
    );

    const updatedValidAttributes = validValues.map((validAttribute) => ({
      ...validAttribute,
      description: attributeMap[validAttribute.name] || '',
    }));

    // Set the state with the updated array
    setMappedValidAttributes(updatedValidAttributes);
  }, [attribute.values, validValues]);

  useEffect(() => {
    setSelected(attributeData?.value?.assetId);
  }, [attributeData?.value?.assetId]);

  const toggleDescription = useCallback(
    (name: string) => {
      if (descriptionOpened === name) {
        setDescriptionOpened(null);
      } else {
        setDescriptionOpened(name);
      }
    },
    [descriptionOpened]
  );

  const handleSelect = useCallback(
    (value: ValidValue) => {
      handleChange(value?.assetId);
      toggleDescription(value?.assetId || '');
    },
    [handleChange, toggleDescription]
  );

  useEffect(() => {
    if (selected === '' && getAttributeIndex(attributeData?.name) === 0) {
      handleChange(attributeData?.values?.[0]?.assetId);
    }
  }, [selected, handleChange, attributeData?.name, attributeData?.values]);

  return (
    <RadioButtonsWrapper>
      {mappedValidAttributes.map((value, index) => {
        const showDescription = descriptionOpened === value?.name;

        return (
          <RadioButtonWrapper
            key={index}
            showDescription={showDescription}
            onClick={() => handleSelect(value)}
          >
            <RadioButtonHeader>
              <ClickableArea showDescription={showDescription}>
                <RadioButton
                  src={
                    selected === value?.assetId
                      ? CHECKED_RADIO_BUTTON_ICON
                      : UNCHECKED_RADIO_BUTTON_ICON
                  }
                />
                <RadioButtonLabel>{value?.displayName}</RadioButtonLabel>
              </ClickableArea>
              {value?.description && (
                <DescriptionIconWrapper
                  showDescription={showDescription}
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleDescription(value?.name);
                  }}
                >
                  <DescriptionIcon src={DESCRIPTION_ICON} />
                </DescriptionIconWrapper>
              )}
            </RadioButtonHeader>
            <DescriptionText
              style={{
                maxHeight: showDescription ? 'min-content' : 0,
                opacity: showDescription ? 1 : 0,
                margin: showDescription ? '0 20px 18px 20px' : '0 20px 0 20px',
              }}
            >
              {t(value?.description, DESCRIPTION_PLACEHOLDER)}
            </DescriptionText>
          </RadioButtonWrapper>
        );
      })}
    </RadioButtonsWrapper>
  );
}

export default RadioButtons;
