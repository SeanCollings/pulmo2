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

### Setup test data

If you would like to start from a clean slate - i.e. having no initial data like saved activities, profile, settings etc. - ignore this step. <br/>
If you would like to pre-load data to work with, do the following:

- create a `.env` file in your root directory
- inside the `.env` file, create and set the variable `SETUP_DATA=true`
- run the command `npm start` to start the app
- this will load all the test data to the phones memory
- set the variable `SETUP_DATA=false` to run the app as normal with the pre-loaded data
- run the command `npm start` to start the app
- NB: do not commit this file to github!

### To upload to Google Play store

```
> npx expo publish
> npx expo build:android -t app-bundle
> npx expo fetch:android:keystore
```
