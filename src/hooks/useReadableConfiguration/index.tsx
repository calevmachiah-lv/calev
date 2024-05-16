import { useEffect, useState } from 'react';
import { useValidAttributes } from '../../utils/threekitHooks';
import { IAttribute } from 'store/threekitSlicer';

function useReadableConfiguration(attributes: Array<IAttribute>) {
  const [readableConfiguration, setReadableConfiguration] = useState({});
  const { getIsAttributeValid } = useValidAttributes();

  useEffect(() => {
    const getReadableConfiguration = () => {
      const configuration =
        window?.threekit?.controller.getReadableConfiguration();
      delete configuration['_SKU'];

      const result: Record<string, any> = {};
      Object.entries(configuration).forEach(([attributeName, value]: any) => {
        if (!getIsAttributeValid(attributeName)) return;
        const defaultValue = attributes?.[attributeName]?.defaultValue;
        result[attributeName] = {
          ...value,
          attributeType:
            defaultValue === ''
              ? 'text'
              : value.thumbnailPath || value.thumbnail
                ? 'asset'
                : 'text',
        };
      });

      return result;
    };

    if (!window?.threekit?.controller.getReadableConfiguration) return;
    const configuration = getReadableConfiguration();
    setReadableConfiguration(configuration);
  }, [attributes, window?.threekit?.controller.getReadableConfiguration]);

  return readableConfiguration;
}

export default useReadableConfiguration;
