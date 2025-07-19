"use strict";

exports.default = class {
  name() {
    return "test";
  }
  start(e) {
    setTimeout(() => {
      var e;
      null === (e = this._onStart) || void 0 === e || e.call(this, null);
    }, 100);
  }
  stop() {
    setTimeout(() => {
      var e;
      null === (e = this._onStop) || void 0 === e || e.call(this, {
        videoPath: "test"
      });
    }, 100);
  }
  onStart(e) {
    this._onStart = e.bind(this);
  }
  onStop(e) {
    this._onStop = e.bind(this);
  }
  isButtonShare() {
    return !0;
  }
  share(e) {
    setTimeout(() => {
      e.success && e.success({
        success: !0
      });
    }, 5e3);
  }
};