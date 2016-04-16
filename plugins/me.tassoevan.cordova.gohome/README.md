Cordova Evan Plugin GoHome
==========================

Implements "goHome" action for Cordova apps running in Android devices.

Based on [Backbutton plugin for Cordova / PhoneGap](https://github.com/mohamed-salah/phonegap-backbutton-plugin)

Install
-------

```sh
cordova plugin add https://github.com/tassoevan/cordova-plugin-evan-gohome.git
```

Usage
-----

```js
cordova.Evan.goHome(function() {
  console.log('success');
}, function() {
  console.log('fail');
});
```