import { useMemo } from 'react';
import useLeadTime from '../useAvaibility';
import usePrice from '../usePrice';
import useStock from '../useStock';
import { useSelector } from 'react-redux';
import { getSku } from '../../store/threekitSlicer';

export const useNotOrderable = (): {
  isNotOrderable: boolean;
  notOrderableError: string;
} => {
  const sku = useSelector(getSku);
  const {
    price,
    isLoading: priceIsLoading,
    isError: priceIsError,
    error: priceError,
  } = usePrice();
  const {
    leadTime,
    isLoading: leadTimeIsLoading,
    isError: leadTimeIsError,
    error: leadTimeError,
  } = useLeadTime();
  const {
    data: stockQuantity,
    isLoading: stockIsLoading,
    isError: stockIsError,
    error: stockError,
  } = useStock({
    skus: [sku],
  });

  const minLeadTime = leadTime?.min;
  const maxLeadTime = leadTime?.max;

  const isNotOrderable = useMemo(() => {
    return (
      ((stockQuantity === undefined ||
        typeof stockQuantity !== 'number' ||
        stockQuantity < 1) &&
        (minLeadTime === undefined || minLeadTime === null) &&
        (maxLeadTime === undefined || maxLeadTime === null)) ||
      !price ||
      priceIsError ||
      (leadTimeIsError && stockIsError) ||
      priceIsLoading ||
      leadTimeIsLoading ||
      stockIsLoading
    );
  }, [
    stockQuantity,
    price,
    priceIsError,
    leadTimeIsError,
    stockIsError,
    priceIsLoading,
    leadTimeIsLoading,
    stockIsLoading,
    minLeadTime,
    maxLeadTime,
  ]);

  const notOrderableError = `${priceError ? priceError + ' ' : ''}${leadTimeError ? leadTimeError + ' ' : ''
    }${stockError ? stockError : ''}`.trim();

  return { isNotOrderable, notOrderableError };
};

export default useNotOrderable;
