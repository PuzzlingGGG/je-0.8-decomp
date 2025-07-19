"use strict";

var i,
  n = this && this.__awaiter || function (e, t, o, i) {
    return new (o || (o = Promise))(function (n, a) {
      function s(e) {
        try {
          l(i.next(e));
        } catch (e) {
          a(e);
        }
      }
      function r(e) {
        try {
          l(i.throw(e));
        } catch (e) {
          a(e);
        }
      }
      function l(e) {
        e.done ? n(e.value) : (t = e.value, t instanceof o ? t : new o(function (e) {
          e(t);
        })).then(s, r);
        var t;
      }
      l((i = i.apply(e, t || [])).next());
    });
  };
exports.JSBridge = void 0;
(function (e) {
  const t = cc.sys.os === cc.sys.OS_IOS,
    o = cc.sys.os === cc.sys.OS_ANDROID;
  e.getAppChannel = function () {
    var e = "";
    o && (e = jsb.reflection.callStaticMethod("com/hortor/creator/JSBridge", "getAppChannel", "()Ljava/lang/String;"));
    console.log(">>getAppChannel>>", e);
    return e;
  };
  e.getPlacementId = function () {
    var e = "";
    o && (e = jsb.reflection.callStaticMethod("com/hortor/creator/JSBridge", "getPlacementId", "()Ljava/lang/String;"));
    console.log(">>getPlacementId>>", e);
    return e;
  };
  e.getIsMobileLogin = function () {
    var e = !1;
    o && (e = jsb.reflection.callStaticMethod("com/hortor/creator/JSBridge", "getIsMobileLogin", "()Z"));
    console.log(">>getIsMobileLogin>>", e);
    return e;
  };
  e.hideBannerAd = function () {
    o && jsb.reflection.callStaticMethod("com/hortor/creator/JSBridge", "hideBanner", "()V");
  };
  e.showBannerAd = function (e, t) {
    return n(this, void 0, void 0, function* () {
      o && jsb.reflection.callStaticMethod("com/hortor/creator/JSBridge", "showBanner", "(Ljava/lang/String;I)V", e, t);
    });
  };
  e.bannerAdCallback = function () {};
  e.showInterstitialAd = function (e) {
    return n(this, void 0, void 0, function* () {
      o && jsb.reflection.callStaticMethod("com/hortor/creator/JSBridge", "showInterstitialAd", "(Ljava/lang/String;)V", e);
    });
  };
  let i;
  e.interstitialAdCallback = function (e, t) {
    (void 0)(e, t);
  };
  let a,
    s = !1;
  e.showRewardvideoAd = function (e, a) {
    return n(this, void 0, void 0, function* () {
      console.log(`>>showRewardvideoAd>>placementId=${e} | adType=${a}`);
      if (o) jsb.reflection.callStaticMethod("com/hortor/creator/JSBridge", "showRewardvideoAd", "(Ljava/lang/String;Ljava/lang/String;)V", e, a);else if (t) {
        cc.audioEngine.pauseMusic();
        s = !0;
        jsb.reflection.callStaticMethod("JSBridge", "showRewardvideoAd:withType:", e, a);
      }
      return new Promise(e => {
        i = e;
      });
    });
  };
  e.rewardvideoAdCallback = function (e) {
    console.log("rewardvideoAdCallback  " + e);
    i && i(!0);
    i = null;
  };
  e.preloadRewardVideo = function (e) {
    o ? jsb.reflection.callStaticMethod("com/hortor/creator/JSBridge", "preloadRewardVideo", "(Ljava/lang/String;)V", e) : t && jsb.reflection.callStaticMethod("JSBridge", "preloadRewardvideoAd:", e);
  };
  e.show233Ad = function (e) {
    return n(this, void 0, void 0, function* () {
      console.log("asdasdasd", "show233Ad", e, o);
      if (o) jsb.reflection.callStaticMethod("com/hortor/creator/JSBridge", "show233Ad", "(Ljava/lang/String;)V", e);else if (t) {
        cc.audioEngine.pauseMusic();
        s = !0;
        jsb.reflection.callStaticMethod("JSBridge", "show233Ad:withType:", e);
      }
      return new Promise(e => {
        a = e;
      });
    });
  };
  e.ad233Callback = function (e, o) {
    console.log("asdasdasd", "ad233Callback", e, o);
    if ("onVideoReward" === e) {
      a && a(!0);
      a = null;
    } else if ("onVideoClose" === e || "onError" === e) {
      if (t && s) {
        s = !1;
        cc.audioEngine.resumeMusic();
      }
    } else if (e.startsWith("onVideoShowFail:")) {
      if (t && s) {
        s = !1;
        cc.audioEngine.resumeMusic();
      }
      a && a(!1);
      a = null;
    }
  };
})(i = o.JSBridge || (exports.JSBridge = {}));
window.JSBridge = i;