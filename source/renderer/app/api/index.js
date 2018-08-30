// @flow
import { remote } from 'electron';
import AdaApi from './ada/index';
import EtcApi from './etc/index';
import LocalStorageApi from './localStorage/index';
import environment from '../../../common/environment';

export type Api = {
  ada: AdaApi,
  etc: EtcApi,
  localStorage: LocalStorageApi,
};

export const setupApi = (): Api => ({
  ada: new AdaApi(environment.isTest(), {
    port: environment.WALLET_PORT,
    ca: remote.getGlobal('ca'),
    key: remote.getGlobal('clientKey'),
    cert: remote.getGlobal('clientCert'),
  }),
  etc: new EtcApi(),
  localStorage: new LocalStorageApi(),
});
