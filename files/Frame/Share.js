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
exports.Share = exports.ShareData = void 0;
const n = e("../Game/Hortor"),
  a = e("../Game/Player/GameIconMng"),
  s = e("./CrossPlatform"),
  r = e("./SceneManager");
exports.ShareData = class {};
(function (e) {
  e.share = function (e) {
    n.Hortor.isApp() ? r.default.ins.OpenPanelByName("SharePanel", t => {
      t.setData(e);
    }) : s.tt ? s.tt.shareAppMessage(e) : s.wx ? n.Hortor.wxShare(e, e.useTricks) : r.default.ins.OpenPanelByName("SharePanel", t => {
      t.setData(e);
    });
  };
  e.appShare2QQ = function (e, t) {
    return i(this, void 0, void 0, function* () {
      let o = yield a.GameIconMng.Ins.getSF(e.imageName);
      if (o) {
        let i = yield t.generateShareImage(e.query, o, e.title, e.desc);
        n.Hortor.appSdkInited && HAPP.getFilePath({
          filePath: i
        }).then(t => {
          console.log(">>filePath>>" + i);
          console.log(`getFilePath success filePath: ${t.filePath}`);
          n.Hortor.shareImg(n.PlatType.QQ, t.filePath, e.success, e.fail);
        }).catch(t => {
          console.log(`getFilePath fail : ${JSON.stringify(t)}`);
          e.fail && e.fail();
        });
      }
    });
  };
  e.share2Facebook = function () {
    return i(this, void 0, void 0, function* () {
      cc.sys.os === cc.sys.OS_ANDROID && jsb.reflection.callStaticMethod("org/cocos2dx/javascript/AppActivity", "share2Facebook", "(Ljava/lang/String;Ljava/lang/String;)V", "", "");
    });
  };
  e.appShare2WX = function (e, t) {
    return i(this, void 0, void 0, function* () {
      let o = yield a.GameIconMng.Ins.getSF(e.imageName);
      if (o) {
        let i = yield t.generateShareImage(e.query, o, e.title, e.desc);
        n.Hortor.shareImg(n.PlatType.WeChat, i, e.success, e.fail);
      }
    });
  };
  e.miniShare2TT = function (e) {
    return i(this, void 0, void 0, function* () {
      s.tt.shareAppMessage(e);
    });
  };
  e.miniShare2WX = function e(t, o = 0) {
    return i(this, void 0, void 0, function* () {
      if (this._miniGameSdk) if (t.useTricks) {
        let i = () => {
            s.wx.showModal({
              title: "提示",
              content: "分享失败，请尝试不同的群",
              showCancel: !0,
              cancelText: "取消",
              confirmText: "去分享",
              success: i => {
                i.confirm ? e(t, o + 1) : i.cancel && t.fail && t.fail();
              }
            });
          },
          a = () => {
            t.success && t.success();
          };
        n.Hortor.miniGameSdk.shareMessage(t).then(() => {
          0 == o ? i() : a();
        }).catch(() => {
          i();
        });
      } else n.Hortor.miniGameSdk.shareMessage(t).then(() => {
        t.success && t.success();
      }).catch(() => {
        t.fail && t.fail();
      });
    });
  };
  e.share2Talk = function (e) {
    return i(this, void 0, void 0, function* () {
      let t = e.talk;
      r.default.ins.Enter("EditTalkScene", o => {
        o.toModifyStyleTitleSections(t.title, t.sections);
        exports.publishCall = e.success;
        exports.cancelCall = e.fail;
      }, r.ShiftAnima.moveLeftShift);
    });
  };
})(o.Share || (exports.Share = {}));