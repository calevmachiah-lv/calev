import { useSelector } from 'react-redux';
import { useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getGlobalSettingsParams } from '../../store/globalSettingsSlicer/selectors';
import { fetchSkusAvailability } from '../../utils/ApiCalls/ApiCalls';

export const useStock = ({ skus }: { skus: string[] }) => {
  const { storeCode, appName } = useSelector(getGlobalSettingsParams) || {};

  const queryKey = useMemo(
    () => ['productStock', storeCode, skus],
    [storeCode, skus]
  );

  const skuToQtyArr = useMemo(() => {
    const skuToQty: {
      [key: string]: number;
    } = skus
      ?.filter((el) => el?.length > 4)
      ?.reduce((acc: any, sku) => {
        acc[sku] = (acc[sku] || 0) + 1;
        return acc;
      }, {});

    const arr = Object.entries(skuToQty).map(([sku, qty]) => ({
      item_id: sku,
      qty,
    }));

    return arr;
  }, [skus]);

  const { data, isLoading, isError, error } = useQuery({
    queryKey: queryKey,
    queryFn: () =>
      fetchSkusAvailability({
        items: skuToQtyArr,
        storeCode: storeCode || 'NJ1',
        appName,
      }),
    staleTime: 300000,
    enabled: skus?.length > 0,
    refetchOnWindowFocus: false,
    retry: false,
  });

  return { data, isLoading, isError, error };
};

export default useStock;
