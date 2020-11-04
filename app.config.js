import 'dotenv/config';
import {
  BUILD_VERSION,
  ANDROID_VERSION,
  IOS_VERSION,
  APP_ENV,
  ENV_STAGING,
} from './release-constants';

export default ({ config }) => {
  return {
    ...config,
    version: BUILD_VERSION,
    android: { ...config.android, versionCode: parseInt(ANDROID_VERSION) },
    ios: { ...config.ios, buildNumber: IOS_VERSION },
    extra: {
      setupData: process.env.SETUP_DATA,
    },
    ...(APP_ENV === ENV_STAGING ? { name: `${config.name} (beta)` } : {}),
  };
};
