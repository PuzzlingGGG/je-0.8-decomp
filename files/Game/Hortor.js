"use strict";

var i = this && this.__awaiter || function (e, t, o, i) {
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
exports.Hortor = exports.PlatType = exports.PlatformSysBigType = void 0;
const n = e("../Frame/CrossPlatform"),
  a = e("../Frame/Top"),
  s = e("../Role"),
  r = e("./GameEnv");
var l;
(function (e) {
  e[e.ad = 0] = "ad";
  e[e.share = 1] = "share";
  e[e.timeline = 2] = "timeline";
})(l || (l = {}));
const c = -20003;
var d, h;
(function (e) {
  e[e.Editor = 0] = "Editor";
  e[e.IOS = 1] = "IOS";
  e[e.Android = 2] = "Android";
  e[e.TtMiniGame = 3] = "TtMiniGame";
  e[e.WxMiniGame = 4] = "WxMiniGame";
  e[e.H5 = 5] = "H5";
})(d = o.PlatformSysBigType || (exports.PlatformSysBigType = {}));
(function (e) {
  e[e.None = -1] = "None";
  e[e.Visitor = 0] = "Visitor";
  e[e.WeChat = 1] = "WeChat";
  e[e.QQ = 2] = "QQ";
  e[e.Apple = 3] = "Apple";
  e[e.TT = 4] = "TT";
  e[e.Mobile = 5] = "Mobile";
  e[e.YingYongBao = 6] = "YingYongBao";
  e[e.TheCanvas = 7] = "TheCanvas";
})(h = o.PlatType || (exports.PlatType = {}));
class p {
  static get hasMiniGameSdk() {
    return !!this.miniGameSdk;
  }
  static initChannel() {
    let e = "tt";
    this.isApp() ? e = this.platformSysBigType == d.Android ? r.gameEnv.androidChannel : "apple" : n.tt ? e = "tt" : n.wx && (e = "wx");
    this.channel = e;
  }
  static initJSBridge() {
    return i(this, void 0, void 0, function* () {
      if (this.isApp()) {
        let e = yield HAPP.getBuildKey();
        this.isMobileLogin = e.isMobileLogin;
        r.gameEnv.androidChannel = e.channel;
        r.gameEnv.toponAdPlacementId_Android = e.placementId;
        console.warn("getBuildKey res 233", JSON.stringify(e));
      }
    });
  }
  static InitMiniSDK() {
    return i(this, void 0, void 0, function* () {
      if (this.miniSdkInited) return;
      this.miniSdkInited = !0;
      let e = window.hortorConfig;
      if (e) {
        e.gameVersion = r.gameEnv.creatorVersion;
        e.env = r.gameEnv.env;
        e.gameId = r.gameEnv.gameId;
        e.stdAutoUpload = !0;
        this.isMiniGameTt() ? e.channel = "tt" : this.isMiniGameWx() && (e.channel = "wx");
      }
      p.miniGameSdk.apm.init(e);
      p.miniGameSdk.init(e);
      this.initShare();
    });
  }
  static InitAppSDK() {
    return i(this, void 0, void 0, function* () {
      if (this.appSdkInited) return;
      this.appSdkInited = !0;
      let e = {};
      e.gameVersion = r.gameEnv.creatorVersion;
      e.env = r.gameEnv.env;
      e.gameId = this.isApp() ? r.gameEnv.appGameId : r.gameEnv.gameId;
      e.wechatAppID = "wx5b598df89b63f26e";
      e.qqAppId = "101936682";
      e.universalLink = "https://ios-app.hortorgames.com/creator/";
      e.stdAutoUpload = !0;
      e.channel = this.platformSysBigType == d.IOS ? "apple" : r.gameEnv.androidChannel;
      e.isEnableLog = !0;
      console.log(">>hortorConfig>>", JSON.stringify(e));
      let t = yield HAPP.init(e);
      this.distinctId = t.distinctId;
    });
  }
  static onQueryChange(e) {
    this.isApp() && HAPP.onQueryChange({
      listener: t => {
        let o = {
          type: t.type,
          isMine: t.isMine,
          cyGameId: t.cyGameId,
          goodsId: t.goodsId
        };
        e && e(o);
      }
    });
  }
  static checkSwitches(e) {
    return i(this, void 0, void 0, function* () {
      let t = {
        channel: this.channel
      };
      return this.isMiniGame() ? this.miniGameSdk.checkSwitches(e, t) : this.isApp() ? HAPP.checkSwitches({
        switches: e,
        params: t
      }) : void 0;
    });
  }
  static isMiniGame() {
    return this.platformSysBigType == d.TtMiniGame || this.platformSysBigType == d.WxMiniGame;
  }
  static isApp() {
    return !1;
  }
  static isMiniGameWx() {
    return this.platformSysBigType == d.WxMiniGame;
  }
  static isMiniGameTt() {
    return this.platformSysBigType == d.TtMiniGame;
  }
  static get platformSysBigType() {
    return cc.sys.platform == cc.sys.IPHONE || cc.sys.platform == cc.sys.IPAD ? d.IOS : cc.sys.platform == cc.sys.ANDROID ? d.Android : cc.sys.platform == cc.sys.EDITOR_PAGE || cc.sys.platform == cc.sys.EDITOR_CORE ? d.Editor : cc.sys.platform == cc.sys.MOBILE_BROWSER || cc.sys.platform == cc.sys.DESKTOP_BROWSER ? d.H5 : n.wx ? d.WxMiniGame : n.tt ? d.TtMiniGame : void 0;
  }
  static logoutApp() {
    this.hasLogin = !1;
    HAPP.logout();
  }
  static logoutWeb() {
    this.hasLogin = !1;
  }
  static loginApp(e) {
    console.log(`>>try login:[type = ${h[e]}]`);
    this.loginPlatType = e;
    this.isPlatformVisitorLogin = this.loginPlatType == h.Visitor || this.loginPlatType == h.TT;
    return new Promise(t => {
      HAPP.tryLogin().then(e => {
        console.log("try login success", JSON.stringify(e));
        this.hasLogin = !0;
        this.platformUid = e.uniqueId;
        t(e);
      }).catch(() => {
        console.log("尝试登录失败，请选择登录方式，如游客登录");
        let o = null;
        (e == h.WeChat ? HAPP.wechatLogin() : e == h.QQ ? HAPP.qqLogin() : e == h.Apple ? HAPP.appleLogin() : HAPP.visitorLogin()).then(o => {
          console.log(`>>${h[e]} login success`, JSON.stringify(o));
          this.hasLogin = !0;
          this.platformUid = o.uniqueId;
          t(o);
        }).catch(o => {
          o.errCode == c ? a.default.showToast("请安装微信") : -20004 != o.errCode && -50003 != o.errCode && a.default.showToast("登录失败，请重试！");
          console.log(`>>${h[e]} login fail`, JSON.stringify(o));
          t(null);
        });
      });
    });
  }
  static isVisitor() {
    let e = s.default.Ins.role.createAt.getTime() > 1627056e6;
    return this.isApp() && this.loginPlatType == h.Visitor && e;
  }
  static sendSMSCode(e, t) {
    this.isApp() && HAPP.sendSMSCode({
      phoneNumber: e
    }).then(() => {
      console.log("发送短信成功！");
      t && t(!0);
    }).catch(e => {
      console.log("发送短信失败！", JSON.stringify(e));
      t && t(!1);
    });
  }
  static loginWithMobile(e) {
    this.loginPlatType = h.Mobile;
    if (this.isApp()) return new Promise(t => {
      HAPP.tryLogin().then(e => {
        console.log("try login success", JSON.stringify(e));
        this.hasLogin = !0;
        this.platformUid = e.uniqueId;
        t(e);
      }).catch(() => {
        HAPP.smsLogin({
          phoneNumber: e.mobile,
          smsCode: e.smsCode
        }).then(e => {
          console.log("手机号登录成功！", JSON.stringify(e));
          this.hasLogin = !0;
          this.platformUid = e.uniqueId;
          t(e);
        }).catch(e => {
          console.log("手机号登录失败！", JSON.stringify(e));
          t(null);
        });
      });
    });
    this.hasLogin = !0;
    return Promise.resolve(null);
  }
  static loginMiniGame() {
    return i(this, void 0, void 0, function* () {
      if (this.miniGameSdk) {
        this.hasLogin = !0;
        this.isMiniGameWx() ? this.loginPlatType = h.WeChat : this.loginPlatType = h.TT;
        console.log("loginMiniGame");
        return this.miniGameSdk.weakLogin();
      }
      return Promise.resolve(null);
    });
  }
  static tgaTrack(e, t) {
    console.log(">>tgaTrack>>eventName:", e, ">>extend:", JSON.stringify(t));
    if (this.isApp()) HAPP.postGameLog({
      eventName: e,
      customData: t
    });else if (this.isMiniGame() && this.miniGameSdk) {
      const o = this.miniGameSdk.getGameLogTypes();
      this.miniGameSdk.postGameLog({
        logType: o.TGA,
        eventType: "track",
        eventName: e,
        extend: t
      });
    }
  }
  static userSet(e) {
    if (this.isApp()) HAPP.postGameLog({
      eventType: HAPP.EventType.UserSet,
      eventName: "",
      customData: e
    });else if (this.miniGameSdk) {
      const t = this.miniGameSdk.getGameLogTypes();
      this.miniGameSdk.postGameLog({
        logType: t.TGA,
        eventType: "user_set",
        eventName: "",
        extend: e
      });
    }
  }
  static initShare() {
    n.crossPlatform.onShareAppMessage(e => {
      const t = Object.assign({
        channel: e.channel
      }, {
        shareType: "default",
        title: "创游编辑器"
      });
      e.channel;
      return t;
    });
  }
  static wxShare(e, t, o = 0) {
    return i(this, void 0, void 0, function* () {
      if (this.miniGameSdk) if (t) {
        let i = () => {
            n.crossPlatform.showModal({
              title: "提示",
              content: "分享失败，请尝试不同的群",
              showCancel: !0,
              cancelText: "取消",
              confirmText: "去分享",
              success: i => {
                i.confirm ? this.wxShare(e, t, o + 1) : i.cancel && e.fail && e.fail();
              }
            });
          },
          a = () => {
            e.success && e.success();
          };
        this.miniGameSdk.shareMessage(e).then(() => {
          0 == o ? i() : a();
        }).catch(() => {
          i();
        });
      } else this.miniGameSdk.shareMessage(e).then(() => {
        e.success && e.success();
      }).catch(() => {
        e.fail && e.fail();
      });
    });
  }
  static appShare(e, t, o, n) {
    return i(this, void 0, void 0, function* () {
      console.log(">>HSDK Share");
      if (this.isApp()) {
        if (e == h.WeChat) {
          console.log(">>wxShare share");
          HAPP.wxShareImage({
            imagePath: t.img,
            scene: t.scene
          }).then(() => {
            console.log("wxShare success");
            o && o();
          }).catch(e => {
            console.log("wxShare err", JSON.stringify(e));
            n && n();
          });
        } else o && o();
      } else o && o();
    });
  }
  static shareImg(e, t, o, n) {
    return i(this, void 0, void 0, function* () {
      console.log(">>HSDK ShareImg");
      if (this.isApp()) {
        if (e == h.WeChat) {
          console.log(">>wxShare share");
          HAPP.wxShareImageAndText({
            imagePath: t,
            scene: HAPP.WXScene.Session,
            from: "",
            url: "",
            desc: "",
            title: ""
          }).then(() => {
            console.log(">>wxShare success");
            o && o();
          }).catch(e => {
            console.log(">>wsShare err", JSON.stringify(e));
            if (e.errCode == c) {
              a.default.showToast("请安装微信");
              n && n(e.errCode);
            } else n && n();
          });
        } else if (e == h.QQ) {
          console.log(">>qqShare share filePath", t);
          HAPP.qqShareImage({
            imagePath: t,
            title: "创游编辑器",
            desc: "分享游戏",
            from: "",
            scene: HAPP.QQScene.Friend
          }).then(e => {
            console.log(">>qqShare success", JSON.stringify(e));
            o && o();
          }).catch(e => {
            console.error(">>qqShare err", JSON.stringify(e));
            n && n();
          });
        } else o && o();
      } else o && o();
    });
  }
  static converterEngine(e) {
    for (var t = new Uint8Array(e), o = t.length, i = []; o--;) i[o] = String.fromCharCode(t[o]);
    return window.btoa(i.join(""));
  }
  static getImageBase64(e, t, o) {
    var i,
      n = new XMLHttpRequest();
    n.open("GET", e, !0);
    n.responseType = "arraybuffer";
    n.onload = function () {
      if (200 == this.status || 304 == this.status) {
        i = p.converterEngine(this.response);
        t && t(i);
      } else o && o();
    };
    n.send();
  }
  static showRewardvideoAd(e, t, o) {
    if (this.isApp()) {
      console.log("asdasdasd", "channel", this.channel);
      if ("233" == this.channel) HAPP.show233Ad({
        id: "999000000",
        onReward() {
          o && o(!0);
        },
        onShowFail(e) {
          console.log(JSON.stringify({
            err: e
          }));
        }
      });else {
        a.default.showLoading("广告加载中");
        HAPP.preloadVideoAd({
          id: e
        }).then(() => {
          setTimeout(() => {
            HAPP.showVideoAd({
              id: e,
              onReward() {
                a.default.hideLoading();
                o && o(!0);
              },
              onShowFail(e) {
                a.default.hideLoading("播放失败");
                console.log(JSON.stringify(e));
              },
              onPlayStart() {
                a.default.hideLoading();
              },
              onLoad(e) {
                console.log("广告加载完成", JSON.stringify(e));
              }
            });
          }, 500);
        }).catch(e => {
          a.default.hideLoading("广告加载失败，请重试");
          console.warn("err", e);
        });
      }
    }
  }
  static downloadNewPkg(e, t, o) {
    if (this.isApp()) {
      console.log(">>downloadNewPkg>>", e);
      if (this.platformSysBigType == d.IOS) cc.sys.openURL(e);else {
        console.log(">>start download>>", e);
        HAPP.downloadFile({
          url: e,
          isAutoInstall: !0,
          fileName: "tmp.apk",
          onProgress(e) {
            console.warn("onProgress", JSON.stringify(e));
            t && t(e / 100);
          },
          onComplete() {
            o && o(!0);
          },
          onError(e) {
            console.warn("onError", JSON.stringify(e));
            o && o(!1);
          }
        });
      }
    }
  }
  static copyTextToClipboard(e) {}
}
exports.Hortor = p;
p.isMobileLogin = !0;
p.miniGameSdk = window.hortorSDK;
p.linkAccountType = h.None;
p.hasLogin = !1;
p.launchQueryData = null;
p.isPlatformVisitorLogin = !1;
p.distinctId = "";
p.channel = "";
p.miniSdkInited = !1;
p.appSdkInited = !1;