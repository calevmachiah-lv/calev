import connection from '../services/connection';
import threekitAPI from '../services';
import {
  shallowCompare,
  deepCompare,
  dataURItoFile,
} from '../utils/function/functions';
import {
  SNAPSHOT_FORMATS,
  SKU_ATTRIBUTE_NAME,
  DEFAULT_PLAYER_CONFIG,
  TK_SAVED_CONFIG_PARAM_KEY,
  METADATA_RESERVED,
  ATTRIBUTE_TYPES,
  DEFAULT_CAMERA_CONFIG,
  TK_PLAYER_DIV_ID_3D,
} from '../utils/constants';
import { objectToQueryStr } from '../utils/function/objectToQueryString';
import {
  assetsRules,
  getCameraPosition,
  setCameraPosition,
} from '../utils/function/attributesHelperFn';
import { prepAttributeForComponent } from '../utils/function/attributeFn';
import { getParams } from '../utils/function/navigationParams';
import { waitForDataDrivenExtensionConfigurator } from '../utils/function/dataDrivenFn';
import { IAttribute } from 'store/threekitSlicer';

class Controller {
  private _product: any;
  private _api: any;
  private _player: any;
  private _currentLanguage: any;
  private _translations: Record<any, string>;
  private _history: [any, any][];
  private _historyPosition: number;
  private _toolsList: Set<string>;
  private _savedConfiguration: string | undefined;
  private _config: any;
  private _attributeGrouping: { [groupName: string]: string[] };
  private _codeData: any;
  private _settings: any;
  private _priceConfig: any;
  constructor({
    product,
    api,
    player,
    configurator,
    translations,
    language,
    toolsList,
    attributeGrouping,
    config,
    settings,
  }: {
    product: any;
    api: any;
    player: any;
    translations: Record<any, string>;
    configurator: any;
    language: string;
    toolsList: Set<string>;
    attributeGrouping: { [groupName: string]: string[] };
    config: any;
    settings: any;
  }) {
    this._product = product;
    this._api = threekitAPI;
    this._player = player.enableApi('player');
    this._translations = translations;
    this._currentLanguage = language;
    this._history = [[{}, configurator.getConfiguration()]];
    this._historyPosition = 0;
    this._toolsList = toolsList || new Set([]);
    this._savedConfiguration = '';
    this._config = config;
    this._settings = settings;
    this._attributeGrouping = Object.entries(attributeGrouping || {})?.reduce(
      (output, [groupName, attrs]) =>
        Object.assign(output, {
          [groupName]: attrs?.map((el) => el?.trim()),
        }),
      {}
    );
    this._codeData = Object.entries(configurator.getMetadata()).reduce(
      (output: any, [key, value]: [string, any]) => {
        if (
          !key.includes('.code') &&
          !key.includes('.type') &&
          !key.includes(`.${METADATA_RESERVED.valueSku}`) &&
          !key.includes(`.${METADATA_RESERVED.valueCode}`)
        )
          return output;

        const [attrName, dataKey, stringKey] = key.split('.');

        if (dataKey === METADATA_RESERVED.valueCode) {
          const val = { [stringKey]: value };
          if (output[attrName]) {
            output[attrName].codeValues = Object.assign(
              {},
              output[attrName]?.codeValues,
              val
            );
          } else output[attrName] = { codeValues: val };
        } else if (dataKey === METADATA_RESERVED.valueSku) {
          const val = { [stringKey]: value };
          if (output[attrName]) {
            output[attrName].skuValues = Object.assign(
              {},
              output[attrName]?.skuValues,
              val
            );
          } else output[attrName] = { skuValues: val };
        } else {
          if (output[attrName]) output[attrName][dataKey] = value;
          else output[attrName] = { [dataKey]: value };
        }

        return output;
      },
      {}
    );
  }

  takeSnapshots = async (snapshotsConfig?: any) => {
    const size = snapshotsConfig?.size || DEFAULT_CAMERA_CONFIG.size;
    const format: 'jpeg' | 'png' =
      snapshotsConfig?.format || DEFAULT_CAMERA_CONFIG.format;
    const attributeName =
      snapshotsConfig?.attributeName || DEFAULT_CAMERA_CONFIG.attributeName;

    let snapshotsRaw = {};

    const cameras = window.threekit.configurator
      .getDisplayAttributes()
      .find((el: any) => el.name === attributeName)
      ?.values.filter((el: any) => el.tags.includes('snapshot'));

    const currentCamera =
      window.threekit.configurator
        .getDisplayAttributes()
        .find((el: any) => el.name === attributeName)?.value || undefined;
    const cameraPosition = getCameraPosition(window.threekit.player.camera);

    snapshotsRaw = (await getSnapshots(cameras)) || {};

    await window.threekit.configurator.setConfiguration({
      [attributeName]: currentCamera,
    });

    setCameraPosition(window.threekit.player.camera, cameraPosition);

    const files = Object.entries(snapshotsRaw).reduce(
      (output: any, [key, el]: [string, any]) => {
        const file = dataURItoFile(el, `${key}.${format}`);
        return Object.assign(output, { [key]: file });
      },
      {}
    );
    return Promise.resolve(files);

    function getSnapshots(cameras?: any) {
      let snapshots: { [key: string]: string } = {};

      return cameras?.reduce(
        async (snapshotPromise: Promise<void>, camera: any) => {
          await snapshotPromise;
          return await new Promise(async (resolve) => {
            if (camera)
              await window.threekit.configurator.setConfiguration({
                [attributeName]: { assetId: camera.assetId },
              });
            const snapshotStr = await window.threekit.player.snapshotAsync({
              size,
              mimeType: `image/${SNAPSHOT_FORMATS[format]}`,
            });
            snapshots[camera.name] = snapshotStr;
            resolve(snapshots);
          });
        },
        Promise.resolve(snapshots)
      );
    }
  };

  static createPlayerLoaderEl() {
    let playerElement = document.getElementById('player-root');
    if (playerElement) return playerElement;

    playerElement = document.createElement('div');
    playerElement.setAttribute('id', 'player-root');
    playerElement.style.height = '100%';

    const playerLoader = document.createElement('div');
    playerLoader.appendChild(playerElement);
    playerLoader.style.opacity = '0';
    playerLoader.style.position = 'fixed';
    playerLoader.style.top = '-110%';
    playerLoader.style.height = '1px';

    document.body.appendChild(playerLoader);
    return playerElement;
  }

  static createThreekitScriptEl(
    threekitEnv: string,
    scriptPath: string
  ): Promise<void> {
    return new Promise((resolve) => {
      const script = document.createElement('script');
      if (scriptPath) {
        script.src = `${threekitEnv}${scriptPath}`;
      } else {
        script.src = `${threekitEnv}/app/js/threekit-player-bundle.js`;
      }
      script.id = 'threekit-player-bundle';
      script.onload = () => resolve();
      document.head.appendChild(script);
    });
  }

  static initThreekit(config: any): Promise<{
    player: any;
    configurator: any;
    player3DPromise: Promise<any> | null;
  }> {
    return new Promise(async (resolve) => {
      const updatedConfig = {
        ...config,
      };
      console.time('player 2D');

      const player = await window.threekitPlayer(updatedConfig);

      window.player = player;
      const configurator = await player.getConfigurator();
      await waitForDataDrivenExtensionConfigurator();
      await window.dataDrivenConfiguratorExtension?.getStatus();

      const productAttributes = await configurator?.getDisplayAttributes();
      const isProduct3D =
        productAttributes.find(
          (el: any) =>
            el.values?.find((attr: any) => attr.metadata?.isPlayer3D === 'true')
        ) !== undefined;

      const player3DPromise = isProduct3D
        ? new Promise(async (resolve) => {
          const player3D = await window.threekitPlayer({
            orgId: updatedConfig.orgId,
            authToken: updatedConfig.authToken,
            showLoadingThumbnail: false,
            showLoadingProgress: false,
            showAR: false,
            el: updatedConfig.el3D,
            assetId: 'baa61e2d-511d-4f9f-a7d1-0e53e5026258',
            display: 'webgl',
            tools: [],
          });

          window.playerMonogram = player3D;

          const playerMonogramDiv = document.getElementById('player-3d');
          if (playerMonogramDiv) {
            playerMonogramDiv.style.width = '100%';
            playerMonogramDiv.style.height = '0px';
            playerMonogramDiv.style.display = 'block';
          }

          window.configuratorMonogram = await player3D.getConfigurator();

          let player: HTMLElement = document.getElementById(
            'player-3d'
          ) as HTMLElement;
          const playerWrapper = document.getElementById(TK_PLAYER_DIV_ID_3D);
          playerWrapper?.appendChild(player);
          resolve(player3D);
        })
        : null;

      if (player3DPromise) {
        player3DPromise.then((player3D) => {
          configurator.prefetchAttributes(['Rotate Model']);
        });
      } else {
        configurator.prefetchAttributes(['Rotate Model']);
      }

      resolve({ player, configurator, player3DPromise });
    });
  }

  static attachPlayerToComponent(moveToElementId: string) {
    const addPlayer = (tryCount = 0) => {
      if (tryCount >= 10) return;

      let player = document.getElementById('player-root');
      const playerWrapper = document.getElementById(moveToElementId);

      if (!player || !playerWrapper)
        return setTimeout(() => {
          addPlayer(tryCount + 1);
        }, 0.05 * 1000);

      if (!player) throw new Error('Initial Player element not found');
      if (!playerWrapper) throw new Error('Move To element not found');

      playerWrapper?.appendChild(player);
    };

    addPlayer();
  }

  static getConfiguration(configurationId: string): Promise<any> {
    return new Promise(async (resolve) => {
      if (!configurationId) {
        if (!window.threekit) return resolve(null);
        resolve(window.threekit.controller._player.getFullConfiguration());
      }
      const config = await threekitAPI.configurations.getSavedConfiguration(
        configurationId
      );
      if (!config) throw new Error('No config find for this Recipe Id');
      resolve(config);
    });
  }

  static async launch(config?: any): Promise<void | Controller> {
    return new Promise(async (resolve) => {
      if (window.threekit) resolve();

      const {
        authToken,
        orgId,
        elementId,
        cache,
        stageId,
        showConfigurator,
        initialConfiguration: initialConfigurationRaw,
        showLoadingThumbnail,
        showLoadingProgress,
        onLoadingProgress,
        showAR,
        showShare,
        locale,
        allowMobileVerticalOrbit,
        publishStage,
        threekitEnv: threekitEnvRaw,
        serverUrl,
        useProxy,
        additionalTools,
        attrGroupingTableId,
        scriptPath,
        threekitProductEnv,
        authProductToken,
        isChina,
        compression,
        productInfos,
      } = Object.assign(DEFAULT_PLAYER_CONFIG, config);

      let el = document.getElementById(elementId);
      if (!el) el = this.createPlayerLoaderEl();

      let el3D = document.getElementById('player-3d');
      if (!el3D) el3D = this.createPlayer3D();

      // const params = getParams();

      // const sku = params?.sku;
      // let productId;
      // if (sku) {
      //   productId = await threekitAPI.configurations.getProductIdBySku(sku);
      //   console.log(productId)
      // }

      let connectionConfig = {
        authToken,
        orgId,
        threekitEnv: threekitEnvRaw,
        serverUrl,
        useProxy,
        threekitProductEnv,
        authProductToken,
        assetId: productInfos?.id,
      };
      connection.connect(connectionConfig);
      const scriptPromise = this.createThreekitScriptEl(
        threekitEnvRaw,
        scriptPath
      );

      let initialConfiguration = { ...initialConfigurationRaw };
      let attrGroupingTableIdPrepped = attrGroupingTableId;

      const { threekitEnv } = connection.getConnection();

      const product = productInfos;

      await scriptPromise;
      // await this.createThreekitScriptEl(threekitEnv, scriptPath);
      const [{ player, configurator, player3DPromise }, attributeGrouping]: [
        { player: any; configurator: any; player3DPromise: any },
        attributeGrouping: any,
      ] = await Promise.all([
        this.initThreekit({
          el,
          el3D,
          authToken,
          orgId,
          cache,
          stageId,
          assetId: productInfos?.id,
          threekitEnv,
          showConfigurator,
          initialConfiguration,
          showLoadingThumbnail,
          showLoadingProgress,
          onLoadingProgress,
          showAR,
          showShare,
          locale,
          allowMobileVerticalOrbit,
          publishStage,
          isChina,
          compression,
        }),
        // threekitAPI.products.fetchTranslations(),
        threekitAPI.configurations.getAttributeGrouping({
          id: attrGroupingTableIdPrepped,
        }),
      ]);
      let toolsList: any = new Set([]);
      if (additionalTools?.length) {
        additionalTools.flat().forEach((toolFunc: any) => {
          const tool = toolFunc(player);
          if (toolsList.has(tool.key)) return;
          toolsList.add(tool.key);
          player.tools.addTool(tool);
        });
      }

      window.threekit = {
        player,
        player3DPromise,
        configurator,
        controller: new Controller({
          product,
          api: threekitAPI,
          player,
          configurator,
          translations: {},
          language: locale,
          toolsList,
          attributeGrouping,
          config: {
            initialConfiguration,
          },
          settings: config,
        }),
      };
      resolve();
    });
  }

  _prepThumbnails(attr: IAttribute) {
    if (attr.type.toLowerCase() !== 'asset') return attr;
    const { useProxy, threekitEnv } = connection.getConnection();
    const attribute = { ...attr };
    attribute.values = attribute.values.map((el: any) => {
      const prepped = { ...el };
      if (prepped.metadata._thumbnail) {
        prepped.metadata._thumbnail = `${threekitEnv}/api/images/webp/200x0/${useProxy
          ? `${prepped.metadata._thumbnail.replace(
            'https://preview.threekit.com',
            threekitEnv
          )}?cacheScope=123&cacheMaxAge=31536000`
          : prepped.metadata._thumbnail
          }`;
      }
      return prepped;
    });
    return attribute;
  }

  static createPlayer3D() {
    let playerElement3D = document.createElement('div');
    playerElement3D.setAttribute('id', 'player-3d');
    playerElement3D.style.display = 'none';
    playerElement3D.style.height = '100%';
    playerElement3D.style.width = '100%';

    document.body.appendChild(playerElement3D);
    return playerElement3D;
  }

  _translateValidAttributes(data: any) {
    return data.map((attr: IAttribute) => {
      const translatedName =
        this._translations?.[attr.name!]?.[this._currentLanguage] || attr.name;

      return {
        ...attr,
        name: translatedName,
      };
    });
  }

  _translateAttribute(attr: IAttribute) {
    return {
      ...attr,
      label:
        this._translations?.[attr.name!]?.[this._currentLanguage] || attr.name,
      values: !Array.isArray(attr.values)
        ? attr.values
        : attr.values.map((el: any) =>
          Object.assign({}, el, {
            label:
              this._translations?.[
              attr.type === ATTRIBUTE_TYPES.string ? el.label : el.name
              ]?.[this._currentLanguage] ||
              (attr.type === ATTRIBUTE_TYPES.string ? el.label : el.name),
            name:
              this._translations?.[
              attr.type === ATTRIBUTE_TYPES.string ? el.label : el.name
              ]?.[this._currentLanguage] ||
              (attr.type === ATTRIBUTE_TYPES.string ? el.label : el.name),
          })
        ),
    };
  }

  _getAttributeValues(config: any) {
    const attributes =
      window.threekit.configurator.getDisplayAttributes(config);
    return attributes.reduce((output: any, attr: IAttribute) => {
      const valueData = attr.values?.find((el: any) => {
        if (attr.type === ATTRIBUTE_TYPES.asset)
          return el.assetId === attr.value.assetId;
        else return el.value === attr.value;
      });
      if (!valueData) return output;

      return Object.assign(output, {
        [attr.name!]: Object.assign(
          {},
          attr.type === ATTRIBUTE_TYPES.asset ? attr.value : undefined,
          valueData
        ),
      });
    }, {});
  }

  _compareAttributes(attributes1: IAttribute[], attributes2: IAttribute[]) {
    let updatedAttributes = new Set<string>([]);

    const attributesObj1 = attributes1.reduce(
      (output: Record<string, IAttribute>, el: IAttribute) =>
        Object.assign(output, { [el.name!]: el }),
      {}
    );
    const attributesObj2 = attributes2.reduce(
      (output: Record<string, IAttribute>, el: IAttribute) =>
        Object.assign(output, { [el.name!]: el }),
      {}
    );
    const attrKeys1 = Object.keys(attributesObj1);
    const attrKeys2 = Object.keys(attributesObj2);

    //  We compare the attributes on in each object
    attrKeys2
      .filter((attribute) => attrKeys1.indexOf(attribute) === -1)
      .forEach((attribute) => updatedAttributes?.add(attribute));
    attrKeys1
      .filter((attribute) => attrKeys2.indexOf(attribute) === -1)
      .forEach((attribute) => updatedAttributes.add(attribute));

    for (let key of attrKeys1) {
      const attr1 = attributesObj1[key];
      const attr2 = attributesObj2[key];

      if (!attr1 || !attr2) continue;

      if (!shallowCompare(attr1.value, attr2.value)) {
        updatedAttributes.add(key);
        continue;
      }

      if (!deepCompare(attr1.values, attr2.values)) {
        updatedAttributes.add(key);
        continue;
      }
    }

    return Array.from(updatedAttributes);
  }

  _updateConfiguration(configuration: any) {
    return new Promise<string[]>(async (resolve) => {
      const currentState = JSON.parse(
        JSON.stringify(window.threekit.configurator.getDisplayAttributes())
      );
      await window.threekit.configurator.setConfiguration(configuration);
      const updatedState = window.threekit.configurator.getDisplayAttributes();
      const updatedAttrs = this._compareAttributes(currentState, updatedState);
      if (updatedAttrs?.length) this._savedConfiguration = undefined;
      resolve(updatedAttrs);
    });
  }

  getForm(config: any) {
    const attributeArr =
      window.threekit.configurator.getDisplayAttributes(config);
    const attributes = attributeArr.reduce((output: any, attr: any) => {
      const prepped = this._prepThumbnails(attr);
      return Object.assign(output, {
        [attr.name]: prepped,
        //[attr.name]: this._translateAttribute(prepped),
      });
    }, {});
    if (!this._attributeGrouping || config?.groupAttributes === false)
      return attributes;

    const formGroupEntries = new Map(Object.entries(this._attributeGrouping));
    const attributeEntries = Object.entries(attributes).filter(
      (el) => el[0] !== 'CameraAngle'
    );

    const form = new Map();
    attributeEntries.forEach(([attrName, attrData]) => {
      for (let [groupName, groupAttributes] of formGroupEntries) {
        if (
          Array.isArray(groupAttributes) &&
          groupAttributes.includes(attrName)
        ) {
          const preppedAttr = prepAttributeForComponent(
            attrData as IAttribute,
            {},
            'form'
          );

          if (form.has(groupName)) {
            form.get(groupName)[attrName] = preppedAttr;
          } else {
            form.set(groupName, { [attrName]: preppedAttr });
          }
          break;
        }
      }
    });

    return Object.fromEntries(form);
  }

  getProduct() {
    if (!window.threekit) return undefined;
    return window.threekit.controller._product;
  }

  getAttributeGrouping() {
    if (!window.threekit) return undefined;
    return window.threekit.controller._attributeGrouping;
  }

  getConfig() {
    if (!window.threekit) return undefined;
    return window.threekit.controller._config;
  }

  addTool(tools: any) {
    if (!tools) return;
    const toolsToAdd = Array.isArray(tools) ? tools : [tools];

    toolsToAdd.flat().forEach((toolFunc) => {
      const tool = toolFunc(window.threekit.player);
      if (this._toolsList.has(tool.key))
        return console.log(`The tool '${tool.label} has already been added.'`);
      this._toolsList.add(tool.key);
      window.threekit.player.tools.addTool(tool);
      window.threekit.player.tools.removeTool('pan');
    });
  }

  setLanguage(language: string) {
    if (!language) return;
    this._currentLanguage = language;
    return this.getAttributes();
  }

  getLanguage() {
    return this._currentLanguage;
  }

  getLanguageOptions() {
    return Object.keys(Object.values(this._translations)[0]);
  }

  getAttributes(attrNames?: any) {
    const attributes = window.threekit.configurator
      .getDisplayAttributes()
      .filter((el: any) => el.name !== 'CameraAngle');
    const attributesObj =
      attrNames?.reduce(
        (output: any, el: any) => Object.assign(output, { [el]: undefined }),
        {}
      ) || {};
    return attributes.reduce((output: any, attr: any) => {
      if (attrNames && !attrNames.includes(attr.name)) return output;
      return Object.assign(output, {
        [attr.name]: attr,
        //[attr.name]: this._translateAttribute(attr),
      });
    }, attributesObj);
  }

  async setAttributes(configuration: any) {
    const updatedAttrNames = await this._updateConfiguration(configuration);
    if (!updatedAttrNames.length) return {};
    return this.getAttributes();
  }

  getSku(config: any) {
    const configuration = window.threekit.configurator.getConfiguration();
    if (configuration[SKU_ATTRIBUTE_NAME])
      return [configuration[SKU_ATTRIBUTE_NAME]];
    const attributeSelections = this._getAttributeValues(config);
    return Object.entries(attributeSelections).reduce(
      (output: any, [attrName, attrVal]: any) => {
        let value;
        if (this._codeData[attrName]?.type.toLowerCase() === 'string')
          value = this._codeData[attrName].skuValues?.[attrVal.value] || '';
        else if (attrVal.metadata?.[METADATA_RESERVED.sku]?.length)
          value = attrVal.metadata[METADATA_RESERVED.sku];

        if (value?.length) return [...output, value];
        return output;
      },
      []
    );
  }

  getReadableConfiguration(config: any) {
    const attributesArr =
      window.threekit.configurator.getDisplayAttributes(config);
    return attributesArr
      .filter(assetsRules)
      .reduce((output: any, attr: any) => {
        let value;
        if (attr.values) {
          value = attr.values.find((el: any) => {
            if (attr.type.toLowerCase() === 'asset')
              return el.assetId === attr.value.assetId;
            else return el.value === attr.value;
          });
        }
        if (attr.value && attr.type === 'String' && attr.values.length === 0) {
          value = attr.value;
        }

        return Object.assign(output, {
          [attr.name]: {
            value: value?.name || value?.label || (value && value),
            thumbnail:
              value?.metadata?.thumbnailPath ||
              value?.metadata?.thumbnail ||
              undefined,
          },
        });
      }, {});
  }

  getOutputs(config?: any) {
    const preppedConfig = Object.assign(
      {
        sku: { includeHidden: false },
        industrialCode: { includeHidden: true },
        readableConfiguration: { includeHidden: true },
      },
      config
    );

    const sku = this.getSku(preppedConfig.sku);
    const readableConfiguration = this.getReadableConfiguration(
      preppedConfig.readableConfiguration
    );

    const threekitConfiguration =
      window.threekit.configurator.getConfiguration();

    //   function encodeToUnicodeEscape(input) {
    //     return input.replace(/[\s\S]/g, function (char) {
    //         if (char === ' ') {
    //             return '\\u0020';
    //         } else {
    //             const charCode = char.charCodeAt(0);
    //             return '\\u' + charCode.toString(16).padStart(4, '0');
    //         }
    //     });
    // }

    // if (readableConfiguration) {
    //     readableConfiguration.EngravingText.value = encodeToUnicodeEscape(
    //         readableConfiguration.EngravingText?.value
    //     );
    // }

    return {
      sku,
      readableConfiguration,
      threekitConfiguration,
    };
  }

  saveConfiguration({
    priceWithCurrency,
    productName,
  }: {
    priceWithCurrency: string;
    productName: string;
  }) {
    return new Promise(async (resolve) => {
      const attachments = await this.takeSnapshots();
      let configuration = window.threekit.configurator.getConfiguration();
      let preppedConfiguration = configuration;
      let metadataPrepped = Object.assign({}, this.getOutputs(), {
        price: priceWithCurrency,
        productName: productName,
      });

      if (!preppedConfiguration) {
        preppedConfiguration = window.threekit.configurator.getConfiguration();
        preppedConfiguration = Object.entries(preppedConfiguration).reduce(
          (output, [attrName, attrData]) =>
            attrName.startsWith('_')
              ? output
              : Object.assign(output, { [attrName]: attrData }),
          {}
        );
      }

      const [response, error] = await threekitAPI.configurations.save({
        assetId: window.threekit.player.assetId,
        configuration: preppedConfiguration,
        metadata: metadataPrepped,
        attachments,
      });

      if (error) resolve(undefined);

      const params = Object.assign(getParams(), {
        [TK_SAVED_CONFIG_PARAM_KEY]: response?.shortId,
      });
      const url = window.location.href.replace(window.location.search, '');

      const output = {
        ...response,
        resumableUrl: `${url}${objectToQueryStr(params)}`,
        thumbnailUrls: Object.values(response?.attachments),
      };

      this._savedConfiguration = JSON.stringify(output);

      resolve(output);
    });
  }

  resumeConfiguration(configurationId: string) {
    return new Promise(async (resolve) => {
      try {
        const config = await Controller.getConfiguration(configurationId);
        this.setAttributes(config?.variant || config?.configuration || config);
        resolve(config);
      } catch (e) {
        throw new Error(e);
      }
    });
  }
}

export default Controller;
