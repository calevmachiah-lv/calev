import { t } from 'i18next';
import React from 'react';
import { PRICE_PLACEHOLDER } from '../../utils/constants';
import { ProductPriceShimmer, StyledProductPrice } from './Price.styles';
import usePrice from '../../hooks/usePrice';

const ProductPrice = React.memo(() => {
  const { isLoading, isError, priceFormated } = usePrice();

  if (isLoading) {
    return <ProductPriceShimmer />;
  }

  if (isError || !priceFormated) {
    return (
      <StyledProductPrice>
        {t('product.label.missing_price', { defaultValue: PRICE_PLACEHOLDER })}
      </StyledProductPrice>
    );
  }

  return <StyledProductPrice>{priceFormated}</StyledProductPrice>;
});

export default ProductPrice;
