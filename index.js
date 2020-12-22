/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import Variables from './components/Variables';
import OneSignal from 'react-native-onesignal';
import {name as appName} from './app.json';

OneSignal.init(Variables.OneSignalAppId, { kOSSettingsKeyAutoPrompt: false, kOSSettingsKeyInAppLaunchURL: false, kOSSettingsKeyInFocusDisplayOption: 2 });

AppRegistry.registerComponent(appName, () => App);
