cordova.define('cordova/plugin_list', function(require, exports, module) {
  module.exports = [
    {
      "id": "cordova-plugin-device.device",
      "file": "plugins/cordova-plugin-device/www/device.js",
      "pluginId": "cordova-plugin-device",
      "clobbers": [
        "device"
      ]
    },
    {
      "id": "cordova-sms-reader.smsreader",
      "file": "plugins/cordova-sms-reader/www/smsreader.js",
      "pluginId": "cordova-sms-reader",
      "clobbers": [
        "smsreader"
      ]
    }
  ];
  module.exports.metadata = {
    "cordova-plugin-whitelist": "1.3.4",
    "cordova-plugin-device": "2.0.3",
    "cordova-sms-reader": "0.0.3"
  };
});