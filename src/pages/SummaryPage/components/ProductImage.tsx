import React, { useState } from 'react';
import { ProductImg, ProductImgLoader } from '../SummaryPage.styles';
import { MAIN_ATTACHMENT_KEY } from '../../../utils/constants';
import { PICTURE_PLACEHOLDER } from '../../../assets';
import { LVLoader } from '../../../components';
import { SUMMARY_IMG } from '../../../assets';
export const ProductImage = ({
  productImages,
  isLoading,
}: {
  productImages: Record<string, any>;
  isLoading: boolean;
}) => {
  const [imageLoaded, setImageLoaded] = useState({
    loaded: false,
    error: false,
  });

  const productImg = imageLoaded.error
    ? PICTURE_PLACEHOLDER
    : productImages?.[MAIN_ATTACHMENT_KEY]
      ? productImages[MAIN_ATTACHMENT_KEY] + ',1.webp'
      : Object.values(productImages)?.[0];

  const loading = isLoading || imageLoaded.loaded;
  return (
    <>
      <ProductImgLoader>
        {loading && <LVLoader />}
       {  <ProductImg
          imageToDisplay={SUMMARY_IMG}
          onAbort={() => setImageLoaded({ ...imageLoaded, error: true })}
          onError={() => setImageLoaded({ ...imageLoaded, error: true })}
          onLoad={() => setImageLoaded({ ...imageLoaded, loaded: true })}
        /> }
      </ProductImgLoader>
    </>
  );
};

export default ProductImage;
