const IOS_VERSION = '1.0.0';
const APP_ENV = '#{APP_ENV}#';
const RELEASE_ID = '#{Release.ReleaseId}#';
const ANDROID_VERSION = '#{ANDROID_BUILD_VERSION}#';
const EXPO_VERSION = '1.0.0';

const ENV_DEV = 'development';
const ENV_STAGING = 'staging';
const ENV_PRODUCTION = 'production';

module.exports = {
  EXPO_VERSION,
  ANDROID_VERSION,
  IOS_VERSION,
  RELEASE_ID,
  APP_ENV,
  ENV_DEV,
  ENV_STAGING,
  ENV_PRODUCTION,
};
