import Joi from 'joi';
import { DEFAULT_SERVER_URL } from '../utils/constants';

const connectionObj = Joi.object({
  authToken: Joi.string()
    .guid({
      version: ['uuidv4'],
    })
    .required(),
  orgId: Joi.string().required(),
  assetId: Joi.string(),
  threekitEnv: Joi.string(),
  authProductToken: Joi.string(),
  threekitProductEnv: Joi.string(),
  serverUrl: Joi.string().allow(''),
  useProxy: Joi.boolean(),
});

const checkRuntime = new Function(
  'try { return this === window; } catch(e) { return false; }'
);

class ThreekitConnection {
  private _authToken: string;
  private _orgId: string;
  private _assetId: string;
  private _threekitEnv: string;
  private _isServerEnv: boolean;
  private _serverUrl: string;
  private _useProxy: boolean;
  constructor() {
    this._authToken = '';
    this._orgId = '';
    this._assetId = '';
    this._threekitEnv = '';
    this._isServerEnv = !checkRuntime();
    this._serverUrl = DEFAULT_SERVER_URL;
    this._useProxy = false;
  }

  async connect(config: any) {
    const preppedConfig = {
      ...config,
      authToken: this._authToken || config.authToken,
      orgId: this._orgId || config.orgId,
    };
    const { value, error } = connectionObj.validate(preppedConfig);
    if (error) throw new Error(error.details[0].message);
    this._authToken = value.authToken;
    this._orgId = value.orgId;
    this._assetId = value.assetId;
    if (value.threekitEnv) this._threekitEnv = `${value.threekitEnv}`;
    if (value.serverUrl?.length) this._serverUrl = value.serverUrl;

    if (preppedConfig.useProxy) this._useProxy = true;
  }

  getConnection() {
    if (!this._authToken)
      throw new Error('Connection has not been established');
    return {
      authToken: this._authToken,
      orgId: this._orgId,
      assetId: this._assetId,
      threekitEnv: this._threekitEnv,
      isServerEnv: this._isServerEnv,
      serverUrl: this._serverUrl,
      useProxy: this._useProxy,
    };
  }
}

const connection = new ThreekitConnection();

export default connection;
