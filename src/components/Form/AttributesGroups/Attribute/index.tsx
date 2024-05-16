import React, { useMemo } from 'react';
import { t } from 'i18next';
import attributeComponents, {
  BigAssetsAttr,
  OptionalGroup,
  RadioButtons,
  SmallAssetsAttr,
  PatchStyleAttr,
  TextInput,
  TextInputNumbers,
  VerticalAssetsAttr,
  DynamicSizeAssetsAttr,
  InitialBigAssetsAttr,
} from '../../../AttributesComponents';
import { AttributeLabel, AttributeWrapper } from './attributes.styled';
import {
  useValidAttributes,
  useWindowSize,
} from '../../../../utils/threekitHooks';
import { OOB_APPNAME } from '../../../../utils/constants';
import { getGlobalSettingsParams } from '../../../../store/globalSettingsSlicer/selectors';
import { useSelector } from 'react-redux';
import { IAttribute } from 'store/threekitSlicer';

const mockAttributeNameToComponent: Record<string, React.FC<any>> = {
  HDS_Exterior: BigAssetsAttr,
  HDS_Exterior_Material: VerticalAssetsAttr,
  HDS_Interior1: SmallAssetsAttr,
  HDS_Interior2: SmallAssetsAttr,
  HDS_Interior3: SmallAssetsAttr,
  HDS_Custom_Text_Line_1: TextInput,
  HDS_Custom_Text_Line_2: TextInput,
  HDS_Custom_Text_Color: BigAssetsAttr,
  HDS_Has_Custom_Text: OptionalGroup,
  HDS_Lock_Number: TextInputNumbers,
  HDS_Has_Lock_Number: RadioButtons,
  'MODEL Taille': RadioButtons,
  'Exterior material': BigAssetsAttr,
  'Exterior Material': RadioButtons,
  'Exterior Material Color': DynamicSizeAssetsAttr,
  'Lining Material': BigAssetsAttr,
  'Lining Color': SmallAssetsAttr,
  'has lock number': RadioButtons,
  'perso + / Lock number exists': TextInputNumbers,
  'has patch': RadioButtons,
  'perso + / patch style': PatchStyleAttr,
  'perso + / patch text line 1': TextInput,
  'perso + / patch text line 2': TextInput,
  'Metallic finition - WOMEN': VerticalAssetsAttr,
  species: RadioButtons,
  Theme: RadioButtons,
  'MODEL taille': RadioButtons,
  'Choix du Lining': BigAssetsAttr,
  'Patch text color - WOMEN': PatchStyleAttr,
  'sens ouverture': InitialBigAssetsAttr
};

function Attribute({
  attribute,
  attributesInGroup,
  insideOptionalGroup,
}: {
  attribute: IAttribute;
  attributesInGroup?: number;
  insideOptionalGroup: boolean;
}) {
  const { appName } = useSelector(getGlobalSettingsParams) || {};
  const { isDesktop } = useWindowSize();
  const { isAttributeValid, validAttributes: validValues } = useValidAttributes(
    attribute?.name
  );

  const AttributeComponent = useMemo(
    (): React.FC<any> =>
      attribute?.metadata?.frontComponent
        ? attributeComponents[attribute?.metadata?.frontComponent]
        : mockAttributeNameToComponent[attribute.name!]
          ? mockAttributeNameToComponent[attribute.name!]
          : SmallAssetsAttr,
    [attribute.name, attribute?.metadata?.frontComponent]
  );

  return AttributeComponent ? (
    <AttributeWrapper
      attributesInGroup={attributesInGroup}
      show={isAttributeValid && validValues?.length !== 1}
      insideOptionalGroup={insideOptionalGroup}
    >
      {attributesInGroup &&
        attributesInGroup > 1 &&
        !(appName === OOB_APPNAME && isDesktop && insideOptionalGroup) && (
          <AttributeLabel insideOptionalGroup={true}>
            {t(attribute.name!, attribute.name!)}
          </AttributeLabel>
        )}
      <AttributeComponent
        attribute={attribute}
        insideOptionalGroup={insideOptionalGroup}
        validValues={validValues}
      />
    </AttributeWrapper>
  ) : (
    <div>{attribute.name}</div>
  );
}

export default Attribute;
