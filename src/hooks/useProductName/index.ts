import { useSelector } from 'react-redux';
import { getMetadata } from '../../store/threekitSlicer/selectors';
import { PRODUCTNAME_PLACEHOLDER } from '../../utils/constants';
import { getGlobalSettingsParams } from '../../store/globalSettingsSlicer';

const useProductName = (): string => {
  const { productName: productNameUrl } =
    useSelector(getGlobalSettingsParams) || {};
  const { ProductName: productNameConfigurator } = useSelector(getMetadata) || {
    ProductName: null,
  };

  return productNameConfigurator || productNameUrl || PRODUCTNAME_PLACEHOLDER;
};

export default useProductName;
