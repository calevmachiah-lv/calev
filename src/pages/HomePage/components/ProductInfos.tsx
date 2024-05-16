import { ProductInfosContainer, ProductName } from '../Home.styles';
import ProductPrice from '../../../components/ProductPrice';
import { useProductName } from '../../../hooks';
import AutoDisappearElement from './AutoDisappearElement';


export const ProductInfos = () => {
  const productName = useProductName();
  return (
    <ProductInfosContainer>
      <AutoDisappearElement>
        <ProductName>{productName}</ProductName>
      </AutoDisappearElement>
      <ProductPrice />
    </ProductInfosContainer>
  );
};

export default ProductInfos;
