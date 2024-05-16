import AssetsAttr from './AssetsAttr';
import TextInput from './TextInput';
import OptionalGroup from './OptionalGroup';
import OptionalGroupIcons from './OptionalGroupIcons';
import RadioButtons from './RadioButtons';
import {
  BIG_SIZE_LABEL,
  PATCH_STYLE_LABEL,
  SMALL_SIZE_LABEL,
  VERTICAL_SIZE_LABEL,
} from '../../utils/constants';
import { IAttribute } from 'store/threekitSlicer';

export interface ITextInputEngraving {
  attribute: IAttribute;
  type: string;
  insideOptionalGroup: boolean;
}

interface Attribute {
  name: string;
  values: {
    assetId: string;
  }[];
  metadata?: {
    isFiltered?: string;
  };
  isFiltered?: boolean;
}

export interface AssetsAttrProps {
  attribute: Attribute;
  size?: string;
  insideOptionalGroup: boolean;
  validValues: any[];
  noImage: boolean;
}

const TextInputNumbers = (props: ITextInputEngraving) =>
  TextInput({ ...props, type: 'number' });
const SmallAssetsAttr = (props: AssetsAttrProps) =>
  AssetsAttr({ ...props, size: SMALL_SIZE_LABEL });
const PatchStyleAttr = (props: AssetsAttrProps) =>
  AssetsAttr({ ...props, size: PATCH_STYLE_LABEL });
const BigAssetsAttr = (props: AssetsAttrProps) =>
  AssetsAttr({ ...props, size: BIG_SIZE_LABEL, noImage: false });
const InitialBigAssetsAttr = (props: AssetsAttrProps) =>
  AssetsAttr({ ...props, size: BIG_SIZE_LABEL, noImage: true });
const VerticalAssetsAttr = (props: AssetsAttrProps) =>
  AssetsAttr({ ...props, size: VERTICAL_SIZE_LABEL });
const DynamicSizeAssetsAttr = (props: AssetsAttrProps) => {
  if (props.validValues.length > 5) {
    return AssetsAttr({ ...props, size: SMALL_SIZE_LABEL });
  } else {
    return AssetsAttr({ ...props, size: BIG_SIZE_LABEL });
  }
};

const toExport: Record<string, React.FC<any>> = {
  AssetsAttr: AssetsAttr,
  SmallAssetsAttr: SmallAssetsAttr,
  BigAssetsAttr: BigAssetsAttr,
  InitialBigAssetsAttr: InitialBigAssetsAttr,
  VerticalAssetsAttr: VerticalAssetsAttr,
  PatchStyleAttr: PatchStyleAttr,
  TextInput: TextInput,
  OptionalGroup: OptionalGroup,
  OptionalGroupIcons: OptionalGroupIcons,
  TextInputNumbers: TextInputNumbers,
  RadioButtons: RadioButtons,
  DynamicSizeAssetsAttr: DynamicSizeAssetsAttr,
};

export default toExport;

export {
  AssetsAttr,
  SmallAssetsAttr,
  PatchStyleAttr,
  BigAssetsAttr,
  InitialBigAssetsAttr,
  VerticalAssetsAttr,
  TextInput,
  OptionalGroup,
  OptionalGroupIcons,
  TextInputNumbers,
  RadioButtons,
  DynamicSizeAssetsAttr,
};
