cordova.define('cordova/plugin_list', function(require, exports, module) {
module.exports = [
    {
        "file": "plugins/cordova-plugin-whitelist/whitelist.js",
        "id": "cordova-plugin-whitelist.whitelist",
        "pluginId": "cordova-plugin-whitelist",
        "runs": true
    },
    {
        "file": "plugins/cordova-plugin-barcodescanner/www/barcodescanner.js",
        "id": "cordova-plugin-barcodescanner.BarcodeScanner",
        "pluginId": "cordova-plugin-barcodescanner",
        "clobbers": [
            "cordova.plugins.barcodeScanner"
        ]
    },
    {
        "file": "plugins/de.appplant.cordova.plugin.email-composer/www/email_composer.js",
        "id": "de.appplant.cordova.plugin.email-composer.EmailComposer",
        "pluginId": "de.appplant.cordova.plugin.email-composer",
        "clobbers": [
            "cordova.plugins.email",
            "plugin.email"
        ]
    },
    {
        "file": "plugins/me.tassoevan.cordova.gohome/www/evan.js",
        "id": "me.tassoevan.cordova.gohome.evan",
        "pluginId": "me.tassoevan.cordova.gohome",
        "clobbers": [
            "cordova.Evan"
        ]
    }
];
module.exports.metadata = 
// TOP OF METADATA
{
    "cordova-plugin-whitelist": "1.2.1",
    "cordova-plugin-barcodescanner": "0.7.0",
    "de.appplant.cordova.plugin.email-composer": "0.8.3dev",
    "me.tassoevan.cordova.gohome": "0.1.1"
}
// BOTTOM OF METADATA
});