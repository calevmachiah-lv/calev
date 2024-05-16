import { useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { t } from 'i18next';
import { useSelector } from 'react-redux';
import { getGlobalSettingsParams } from '../../store/globalSettingsSlicer/selectors';
import { useWindowSize } from '../../utils/threekitHooks';

export const useAvaibility = (attributesObject?: any, attributeNames?: any) => {
  return {
    leadTime: { min: 0, max: 5 },
    orderedValues: [0, 5],
    isLoading: false,
    isError: false,
    error: '',
  };
};

export default useAvaibility;
