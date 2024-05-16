import { useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getSavedConfig } from '../../utils/ApiCalls/ApiCalls';
import { useWindowSize } from '../../utils/threekitHooks';

export const useSavedConfiguration = (recipeId: string) => {
  const { isMobile } = useWindowSize();
  const queryKey = useMemo(() => ['savedConfiguration', recipeId], [recipeId]);

  const {
    data: savedConfigurationData,
    isLoading: isLoadingSavedConfigurationData,
    isError: isErrorSavedConfigurationData,
    error: errorSavedConfigurationData,
  } = useQuery({
    queryKey,
    queryFn: () => getSavedConfig({ recipeId, isMobile }),
    staleTime: 300000,
    enabled: !!recipeId,
    retry: false,
  });

  return {
    savedConfigurationData,
    isLoadingSavedConfigurationData,
    isErrorSavedConfigurationData,
    errorSavedConfigurationData,
  };
};

export default useSavedConfiguration;
