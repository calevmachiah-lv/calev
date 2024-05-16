import React from 'react';
import {
  AttributeLabel,
  AttributeThumbnail,
  AttributeValue,
  AttributeWrapper,
  TextSummary,
  BackgroundColor,
} from './ConfigurationSectionContent.styles';

interface AttributeProps {
  attributeValueDisplayName?: string;
  thumbnail?: string;
  thumbnailColor?: string;
  page: string;
  value?: string;
  uiVisible?: boolean;
  uiPositionIndex?: number;
  attributeDisplayName?: string;
}

const getAttributeValueComponent = (name: string, props: AttributeProps) => {
  const { attributeValueDisplayName, thumbnail, thumbnailColor, page, value } =
    { ...props };
  const attributeValue = attributeValueDisplayName || value;
  const hasThumbnail = thumbnail || thumbnailColor;

  const isPatch = name?.includes('patch') && name?.includes('text');
  if (!attributeValue) return null;
  return (
    <AttributeValue isPatchAttribute={isPatch} page={page}>
      {hasThumbnail && thumbnail && (
        <>
          <AttributeThumbnail page={page} src={thumbnail} />
          <TextSummary isPatchAttribute={isPatch} page={page}>
            {attributeValueDisplayName}
          </TextSummary>
        </>
      )}

      {hasThumbnail && !thumbnail && (
        <>
          <BackgroundColor backgroundColor={thumbnailColor} />
          <TextSummary page={page}>{attributeValueDisplayName}</TextSummary>
        </>
      )}

      {!hasThumbnail && (
        <TextSummary isPatchAttribute={isPatch} page={page}>
          {attributeValue}
        </TextSummary>
      )}
    </AttributeValue>
  );
};


function ConfigurationSectionContent({attributesToDisplay}:any) {

  const page = 'summary';

  const sortedAttributesToDisplay = attributesToDisplay
    ?.filter((item: any) => item[1].uiPositionIndex !== undefined)
    .sort((a: any, b: any) => a[1].uiPositionIndex - b[1].uiPositionIndex);

  return sortedAttributesToDisplay?.map((el: any) => {
    const name = el[0];
    const attributeProps = el[1];
    const ValueComponent = getAttributeValueComponent(name, {
      ...attributeProps,
      page,
    });

    return ValueComponent && attributeProps?.uiVisible ? (
      <AttributeWrapper key={name} page={page}>
        <AttributeLabel page={page}>
          {attributeProps?.attributeDisplayName}
        </AttributeLabel>
        {ValueComponent}
      </AttributeWrapper>
    ) : null;
  });
}

export default ConfigurationSectionContent;
