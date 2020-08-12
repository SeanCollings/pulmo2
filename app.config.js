import { BUILD_VERSION, ANDROID_VERSION, IOS_VERSION } from './version';

export default ({ config }) => {
  console.log('---------- VARIABLES - BuildId::', process?.env?.Build?.BuildId);
  console.log(
    '---------- VARIABLES - BuildNumber::',
    process?.env?.Build?.BuildNumber
  );
  console.log(
    '---------- VARIABLES - Release.ReleaseId::',
    process?.env?.Release?.ReleaseId
  );

  return {
    ...config,
    version: BUILD_VERSION,
    android: { ...config.android, versionCode: ANDROID_VERSION },
    ios: { ...config.ios, buildNumber: IOS_VERSION },
  };
};
