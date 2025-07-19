"use strict";

const i = e("../../Frame/CrossPlatform");
exports.default = class {
  name() {
    return "wechat";
  }
  start(e) {
    i.wx.getGameRecorder().start({
      duration: e,
      hookBgm: !1
    }).then(e => {
      console.log("wx GameRecorde.start then", e);
    }).catch(e => {
      console.log("wx GameRecorde.start catch", e);
    });
  }
  stop() {
    i.wx.getGameRecorder().stop().then(e => {
      console.log("GameRecorde.stop then", e);
    }).catch(e => {
      console.log("GameRecorde.stop catch", e);
    });
  }
  onStart(e) {
    i.wx.getGameRecorder().on("start", t => {
      e(t);
    });
  }
  onStop(e) {
    i.wx.getGameRecorder().on("stop", t => {
      e(t);
    });
  }
  isButtonShare() {
    return !1;
  }
  share(e) {
    i.wx.shareAppMessage(e);
  }
};