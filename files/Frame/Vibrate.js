"use strict";

exports.Vibrate = void 0;
const i = e("./CrossPlatform");
(function (e) {
  e.enable = !0;
  e.short = function () {
    e.enable && i.crossPlatform.vibrateShort();
  };
  e.long = function () {
    e.enable && i.crossPlatform.vibrateLong();
  };
})(o.Vibrate || (exports.Vibrate = {}));