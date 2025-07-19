"use strict";

exports.default = class {
  constructor() {
    this._timer = -1;
  }
  name() {
    return cc.sys.os === cc.sys.OS_ANDROID ? "app_Android" : "app_iOS";
  }
  start(e) {
    cc.sys.os === cc.sys.OS_ANDROID ? jsb.reflection.callStaticMethod("org/cocos2dx/javascript/AppActivity", "startRecordingScreen", "()V") : jsb.reflection.callStaticMethod("AppController", "startRecordingScreen");
  }
  stop() {
    cc.sys.os === cc.sys.OS_ANDROID ? jsb.reflection.callStaticMethod("org/cocos2dx/javascript/AppActivity", "stopRecordingScreen", "()V") : jsb.reflection.callStaticMethod("AppController", "stopRecordingScreen");
  }
  onStart(e) {
    this._onStart = e;
  }
  onStop(e) {
    this._onStop = e;
  }
  isButtonShare() {
    return !0;
  }
  share(e) {
    if (cc.sys.os === cc.sys.OS_ANDROID) {
      if (!jsb.reflection.callStaticMethod("org/cocos2dx/javascript/AppActivity", "isTikTokInstalled", "()Z")) {
        e.fail({
          success: !1,
          errMsg: "Please Install TikTok"
        });
        return;
      }
      jsb.reflection.callStaticMethod("org/cocos2dx/javascript/AppActivity", "shareVideo", "(Ljava/lang/String;Ljava/lang/String;)V", e.extra.videoPath, e.query);
    } else {
      if (!jsb.reflection.callStaticMethod("AppController", "isTikTokInstalled")) {
        e.fail({
          success: !1,
          errMsg: "Please Install TikTok"
        });
        return;
      }
      jsb.reflection.callStaticMethod("AppController", "shareVideoWithPath:andQuery:", e.extra.videoPath, e.query);
    }
    this._onShareSuccess = e.success;
    this._onShareFail = e.fail;
    this._timer = setTimeout(() => {
      this._onShareFail({
        success: !1
      });
    }, 15e3);
  }
  onNativeStarted() {
    this._onStart({});
  }
  onNativeStopped(e) {
    console.log("video path:" + e);
    this._onStop({
      videoPath: e
    });
  }
  onNativeShareEnd(e) {
    if (this._timer > 0) {
      clearTimeout(this._timer);
      this._timer = -1;
    }
    e ? this._onShareSuccess({
      success: !0
    }) : this._onShareFail({
      success: !1
    });
  }
};