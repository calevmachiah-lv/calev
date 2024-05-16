import memoizeOne from 'memoize-one';
import { createSelector } from 'reselect';
import { stateRoot } from 'store';
import { ConfigurationState } from '..';
import { Selector } from 'react-redux';

export const getConfiguration: (state: stateRoot) => ConfigurationState =
  memoizeOne((state) => state?.threekit?.configuration);

export const getProduct: (state: stateRoot) => ConfigurationState['product'] =
  memoizeOne((state) => state?.threekit?.configuration?.product);

export const getInitialConfiguration: (
  state: stateRoot
) => ConfigurationState['initialConfiguration'] = memoizeOne(
  (state) => state?.threekit?.configuration?.initialConfiguration
);

export const getMetadata: (state: stateRoot) => ConfigurationState['metadata'] =
  memoizeOne((state) => state?.threekit?.configuration?.metadata);

export const getProductName: (state: stateRoot) => string = memoizeOne(
  (state) => state?.threekit?.configuration?.metadata?.ProductName || ''
);

export const getAllAttributes: (
  state: stateRoot
) => ConfigurationState['attributes'] = memoizeOne(
  (state) => state?.threekit?.configuration?.attributes
);

export const getSku: (
  state: stateRoot
) => ConfigurationState['dataDrivenConfiguratorExtensionStatus']['sku'] =
  memoizeOne(
    (state) =>
      state?.threekit?.configuration?.dataDrivenConfiguratorExtensionStatus.sku
  );

export const getFormValidAttributes: (
  state: stateRoot
) => ConfigurationState['formValidAttributes'] = memoizeOne(
  (state) => state?.threekit?.configuration?.formValidAttributes
);

export const getTotalSteps: (state: stateRoot) => number = memoizeOne(
  (state) =>
    Object?.keys(state?.threekit?.configuration?.formValidAttributes)?.length
);

const getInternalAttributeState: (
  state: stateRoot
) => ConfigurationState['attributes'] = memoizeOne((state) => {
  if (!state.threekit.settings.isThreekitLoaded) return {};
  return state.threekit.configuration.attributes;
});

export const getForm: (state: stateRoot) => ConfigurationState['form'] =
  createSelector([getConfiguration], (configuration) => {
    if (!configuration) return {};
    return configuration.form;
  });

export const getGroupedAttributes: (
  state: stateRoot
) => ConfigurationState['groupedAttributes'] = createSelector(
  [getConfiguration],
  (configuration) => {
    if (!configuration) return {};
    return configuration.groupedAttributes;
  }
);

export const getIsInStock: (
  state: stateRoot
) => ConfigurationState['isInStock'] = createSelector(
  [getConfiguration],
  (configuration) => {
    if (!configuration) return {};
    return configuration.isInStock;
  }
);

export const getAttributes: (
  attribute?: string
) => Selector<stateRoot, Record<string, any>> = (attribute) =>
  createSelector([getInternalAttributeState], (attributes) => {
    if (!attributes) return {};
    if (!attribute) return attributes;
    return attributes[attribute] || {};
  });

export const getActiveAttribute: (state: stateRoot) => string | undefined =
  createSelector([getConfiguration], (configuration) => {
    if (!configuration) return undefined;
    return configuration.activeAttribute;
  });

export const getAttributeValues: (
  attributeName?: string
) => Selector<stateRoot, any[]> = (attributeName) =>
  createSelector(getInternalAttributeState, (attributes) => {
    if (!attributes || !attributeName) return [];
    return attributes[attributeName]?.values || [];
  });

export const getReadableValidAttributesFromDataDriven: () => Record<
  string,
  any
>[] = () => {
  const readableValidAttributes = [];
  const status = window.dataDrivenConfiguratorExtension?.getStatus();
  if (!status) return [];
  const validAttributes = status?.validAttributesAndTheirValues_typeB;
  for (let validAttribute of validAttributes) {
    if (validAttribute?.children?.length > 0) {
      validAttribute.children.forEach((child: any) => {
        readableValidAttributes.push(child);
      });
      continue;
    }
    readableValidAttributes.push(validAttribute);
  }
  return readableValidAttributes;
};

export const getValidAttributesNamesFromDataDriven: () => string[] = () => {
  const validAttributesNames = [];
  const status = window.dataDrivenConfiguratorExtension?.getStatus();
  if (!status) return [];
  const validAttributes = status?.validAttributesAndTheirValues_typeB;
  for (let validAttribute of validAttributes) {
    if (validAttribute?.name) validAttributesNames.push(validAttribute.name);
    if (validAttribute?.children?.length > 0) {
      validAttribute.children.forEach((child: any) => {
        if (child?.name) validAttributesNames.push(child.name);
      });
    }
  }
  return validAttributesNames;
};

export const getReadableConfigurationWithAttributeType: (
  attributes?: Record<string, any>
) => Selector<stateRoot, Record<string, any>> = () =>
  createSelector(getAllAttributes, (attributes) => {
    if (!attributes) return {};
    const readableValidAttributesFromDataDriven =
      getReadableValidAttributesFromDataDriven();
    if (
      !readableValidAttributesFromDataDriven ||
      !readableValidAttributesFromDataDriven.length
    )
      return {};
    const result: Record<string, any> = {};
    readableValidAttributesFromDataDriven.forEach(
      ({ type, displayName, ...rest }) => {
        const selected =
          rest?.values?.find((value: any) => value?.selected) || rest;
        result[displayName] = {
          ...selected,
          value: type === 'Asset' ? selected?.displayName : selected?.value,
          attributeType:
            rest?.thumbnailPath || rest?.thumbnail ? 'asset' : 'text',
        };
      }
    );
    return result;
  });
