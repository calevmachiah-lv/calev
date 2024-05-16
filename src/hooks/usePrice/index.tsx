import { useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { FormattedNumber } from 'react-intl';
import { useSelector } from 'react-redux';
import { useWindowSize } from '../../utils/threekitHooks';
import { getPriceWithCurrency } from '../../utils/function/apiFn';
import { getGlobalSettingsParams } from '../../store/globalSettingsSlicer';
import { fetchPrice } from '../../utils/ApiCalls/ApiCalls';

const usePrice = () => {
  const { isMobile } = useWindowSize();
  const params = useSelector(getGlobalSettingsParams);
  const { storeCode, country, lng, sku } = params || {};
  const skus = window?.dataDrivenConfiguratorExtension?.getStatus()
    ?.skus?.[0] || [sku];

  const queryKey = useMemo(
    () => ['productPrice', storeCode, skus, country, lng],
    [storeCode, skus, country, lng]
  );

  const { data, isLoading, isError, error } = useQuery({
    queryKey,
    queryFn: () => fetchPrice({ lng, storeCode, skus, country, isMobile }),
    staleTime: 300000,
    refetchOnWindowFocus: false,
    enabled: Boolean(skus && storeCode && country && lng),
    retry: false,
  });

  return useMemo(() => {
    if (isLoading || isError) {
      return { isLoading, isError, error };
    }

    const priceInfos = data?.skuList?.[0]?.priceSpecification;
    const price = priceInfos?.price;
    const currency = data?.currency;
    const priceWithCurrency = getPriceWithCurrency(price, currency);
    const priceFormated =
      currency && price ? (
        <FormattedNumber style="currency" currency={currency} value={price} />
      ) : (
        ''
      );

    return {
      price,
      priceWithCurrency,
      priceFormated,
      currency,
      isLoading,
      isError,
      error,
    };
  }, [data, isLoading, isError, error]);
};

export default usePrice;
