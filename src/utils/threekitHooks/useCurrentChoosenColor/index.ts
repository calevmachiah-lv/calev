import { useMemo } from 'react';
import { getForm, getFormValidAttributes } from '../../../store/threekitSlicer';
import { useSelector } from 'react-redux';
import { getStep } from '../../../store/globalSettingsSlicer/selectors';

interface Props {
  groupIndex?: number;
}

interface ColorData {
  currentColorUrl: string;
  currentColorName: string;
}

function useCurrentChosenColor(props: Props): ColorData {
  const form = useSelector(getFormValidAttributes);
  const currentStep = useSelector(getStep);
  const groupIndex: number =
    props?.groupIndex || props?.groupIndex === 0
      ? props?.groupIndex
      : currentStep;
  const currentColorData: ColorData | undefined = useMemo(() => {
    const currentGroup = Object.values(form)[groupIndex];
    if (!currentGroup)
      return {
        currentColorName: '',
        currentColorUrl: '',
      };
    const colorAttribute: any = Object.values(currentGroup).find(
      (attribute: any) => attribute.type === 'Asset' && attribute.values.length
    );
    const currentColorAssetId = colorAttribute?.value?.assetId;
    const currentColor = colorAttribute?.values?.find(
      (value: any) => value?.assetId === currentColorAssetId
    );
    const currentColorUrl =
      currentColor?.metadata?.thumbnailPath ||
      currentColor?.metadata?.thumbnail;
    const currentColorName = currentColor?.name;
    return { currentColorUrl, currentColorName };
  }, [form, groupIndex]);

  const { currentColorUrl, currentColorName } = currentColorData;

  return { currentColorUrl, currentColorName };
}

export default useCurrentChosenColor;
