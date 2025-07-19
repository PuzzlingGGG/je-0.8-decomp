"use strict";

const i = e("../../Frame/CrossPlatform");
exports.default = class {
  name() {
    return "tt";
  }
  isButtonShare() {
    return !0;
  }
  share(e) {
    i.tt.shareAppMessage(e);
  }
  start(e) {
    i.tt.getGameRecorderManager().start({
      duration: e
    });
  }
  stop() {
    i.tt.getGameRecorderManager().stop();
  }
  onStart(e) {
    i.tt.getGameRecorderManager().onStart(t => {
      e(t);
    });
  }
  onStop(e) {
    i.tt.getGameRecorderManager().onStop(t => {
      e(t);
    });
  }
};