"use strict";

var i = this && this.__decorate || function (e, t, o, i) {
    var n,
      a = arguments.length,
      s = a < 3 ? t : null === i ? i = Object.getOwnPropertyDescriptor(t, o) : i;
    if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) s = Reflect.decorate(e, t, o, i);else for (var r = e.length - 1; r >= 0; r--) (n = e[r]) && (s = (a < 3 ? n(s) : a > 3 ? n(t, o, s) : n(t, o)) || s);
    return a > 3 && s && Object.defineProperty(t, o, s), s;
  },
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
const a = e("../Game/GameEnv"),
  s = e("./qr-code"),
  r = e("./Util"),
  {
    menu: l,
    ccclass: c,
    property: d
  } = cc._decorator;
let h = class extends cc.Component {
  constructor() {
    super(...arguments);
    this.qrCode = null;
    this.labelTitle = null;
    this.labelInfo = null;
    this.gameCover = null;
    this.spQrCode = null;
    this.spDebug = null;
  }
  fillData(e) {
    e = e.replace(/:/g, "_");
    console.log(">>queryStr>>" + e);
    this.qrCode.string = `https://ios-app.hortorgames.com/creator/#/?gameId=${a.gameEnv.appGameId}&channel=${a.gameEnv.androidChannel}&${e}`;
    console.log(">>qrCode>>" + this.qrCode.string);
    this.qrCode.setContent();
  }
  generateShareImage(e, t, o, i) {
    return n(this, void 0, void 0, function* () {
      let n = this.node.width,
        a = this.node.height;
      this.node.active = !0;
      this.node.scaleY = -1;
      this.labelTitle.string = o;
      this.labelInfo.string = i;
      r.Util.updateLabel(this.labelTitle);
      r.Util.updateLabel(this.labelInfo);
      r.Util.updateAllLayout(this.node);
      this.fillData(e);
      this.gameCover.spriteFrame = t;
      let s = r.Util.screenShotToTexture(this.node);
      this.node.active = !1;
      let l = s.readPixels();
      this.spDebug && this.spDebug.node.active && (this.spDebug.spriteFrame = new cc.SpriteFrame(s));
      {
        const e = jsb.fileUtils.getWritablePath() + "share.png";
        jsb.saveImageData(l, n, a, e);
        return e;
      }
    });
  }
};
i([d(s.QRCodeComponent)], h.prototype, "qrCode", void 0);
i([d(cc.Label)], h.prototype, "labelTitle", void 0);
i([d(cc.Label)], h.prototype, "labelInfo", void 0);
i([d(cc.Sprite)], h.prototype, "gameCover", void 0);
i([d(cc.Sprite)], h.prototype, "spQrCode", void 0);
i([d(cc.Sprite)], h.prototype, "spDebug", void 0);
h = i([c], h);
exports.default = h;