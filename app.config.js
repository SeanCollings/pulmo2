import 'dotenv/config';
import { BUILD_VERSION, ANDROID_VERSION, IOS_VERSION } from './version';

export default ({ config }) => {
  return {
    ...config,
    version: BUILD_VERSION,
    android: { ...config.android, versionCode: ANDROID_VERSION },
    ios: { ...config.ios, buildNumber: IOS_VERSION },
    extra: {
      setupData: process.env.SETUP_DATA,
    },
    splash: {},
  };
};
