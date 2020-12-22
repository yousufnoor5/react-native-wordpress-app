# react-native-wordpress-app
React Native Wordpress app to convert any wordpress blog or news site to an android app. This app supports Google Admob banner & interstitial ads. Firebase Analytics and OneSignal Notifications are also supported. <br>

![alt text](https://i.imgur.com/m8rCPXk.jpg)<br>

#####First Install all modules

```npm install
```

To change wordpress url, admob ad units, onesignal app id, or colors : ```Goto > components/Variables.js```<br>

#####NOTE : App will not work if you don't do this :<br>

Replace your Admob app id from firebase.json file (You will find it in the root).<br>
Also you need to replace google-services.json in ```android > app``` folder. google-services.json can be generated through firebase. After doing this you need to change your pkg name also. I recommend you to use Android Studio for this, it will make your work fast.

#####To change logo and splash screen :<br>
```Goto > android > app > src > main > res```
Replace logo and splash images from all of these folders mipmap-hdpi, mipmap-mdpi, mipmap-xhdpi,mipmap-xxhdpi,mipmap-xxxhdpi

#####After all you can run the app in android emulator :<br>
```react-native run-android```<br>

Thats it !
