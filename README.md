# Pulmo2

A React-Native mobile application using Expo.

### Getting Started

Use `yarn` to install all packages instead of `npm` as at the time of writing, npm doesn't install jest correctly and the tests fail to run.

```
> git clone https://github.com/SeanCollings/pulmo2.git
> cd pulmo2
> yarn
> npm start
```

### To upload to Google Play store

```
> npx expo publish
> npx expo build:android -t app-bundle
> npx expo fetch:android:keystore
```
