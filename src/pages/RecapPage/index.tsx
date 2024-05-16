import React, { useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  getGroupedAttributes,
  getIsInStock,
  setActiveAttribute,
} from '../../store/threekitSlicer';
import FormTitle from '../../components/FormTitle';
import CloseIcon from '../../components/CloseIcon';
import { closeRecap, getRecapOpenPercentage } from '../../store/flowSlicer';
import ProductPrice from '../../components/ProductPrice';
import {
  AttributeTitle,
  AttributeWrapper,
  ConfigurationWrapper,
  AttributeValues,
  Value,
  ValueImg,
  RecapWrapper,
  ValueWrapper,
  DoneButtonWrapper,
  PlusContainer,
  PlusImage,
} from './recapPage.styles';

import { OptionsButton } from '../../components';
import { DONE_BUTTON_LABEL } from '../../utils/constants';
import { SummaryButtons } from '../../components/SummaryButtons';
import { PLUS_ATTRIBUTE_ICON } from '../../assets';
import { isChooseValue } from '../../utils/function/functions';

function RecapPage({
  show,
  slidePercentsToOpen,
  handleTouchStart,
  handleTouchMove,
  handleTouchEnd,
}: {
  show: boolean;
  slidePercentsToOpen?: number;
  handleTouchStart?: (e: React.TouchEvent) => void;
  handleTouchMove?: (e: React.TouchEvent) => void;
  handleTouchEnd?: (e: React.TouchEvent) => void;
}) {
  const dispatch = useDispatch();
  const groupedAttributes = useSelector(getGroupedAttributes) || {};
  const recapOpenPercentage = useSelector(getRecapOpenPercentage);
  const inStockData = useSelector(getIsInStock) || {};
  const disabledDoneButton = useMemo(() => {
    let disabled = true;
    if (
      !Object.values(
        window?.dataDrivenConfiguratorExtension?.getStatus()?.attributes
      ).includes('NA')
    ) {
      disabled = false;
    }
    return disabled;
  }, [window?.dataDrivenConfiguratorExtension?.getStatus()?.attributes]);
  return (
    <RecapWrapper
      show={show}
      openPercentage={recapOpenPercentage}
      slidePercentsToOpen={slidePercentsToOpen || 0}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <CloseIcon
        onClick={() => dispatch(closeRecap(true))}
        css={{ position: 'absolute', margin: '0 0 20px auto' }}
      />
      <FormTitle />
      <ProductPrice />
      <ConfigurationWrapper>
        {Object.keys(groupedAttributes).map((key) => {
          const isGroup = groupedAttributes[key].length > 1;
          const values = groupedAttributes[key]
            .map((attribute) =>
              attribute.values.filter((value: any) => value.selected)
            )
            .flat();

          return (
            <AttributeWrapper key={key}>
              <AttributeTitle>{key}</AttributeTitle>
              <AttributeValues
                onClick={() => {
                  dispatch(closeRecap(true));
                  dispatch(setActiveAttribute(groupedAttributes[key][0]?.name));
                }}
              >
                {values?.length ? (
                  values.map((value) => {
                    const isEmpty = isChooseValue(value);
                    const inStock = inStockData[value?.sku] !== false;
                    return (
                      <ValueWrapper
                        key={value.name}
                        inStock={inStock || isEmpty}
                        isEmpty={isEmpty}
                      >
                        {isEmpty ? (
                          <Value isEmpty={true}>+</Value>
                        ) : (
                          <>
                            {!isGroup && <Value>{value.name}</Value>}
                            <ValueImg
                              key={value.name}
                              src={
                                value._thumbnailUrl ||
                                'https://lv-kitting.s3.eu-north-1.amazonaws.com/tutorial/product-new-0.png'
                              }
                            />
                          </>
                        )}
                      </ValueWrapper>
                    );
                  })
                ) : (
                  <PlusContainer img={PLUS_ATTRIBUTE_ICON}>
                    <PlusImage src={PLUS_ATTRIBUTE_ICON} />
                  </PlusContainer>
                )}
              </AttributeValues>
            </AttributeWrapper>
          );
        })}
      </ConfigurationWrapper>
      <DoneButtonWrapper>
        <OptionsButton
          disable={disabledDoneButton}
          buttonName={DONE_BUTTON_LABEL}
        />
      </DoneButtonWrapper>
    </RecapWrapper>
  );
}

export default RecapPage;
