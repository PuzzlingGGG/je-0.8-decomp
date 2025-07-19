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
const a = e("../../CustomUI/Button"),
  s = e("../../CustomUI/Toggle"),
  r = e("../../Frame/Panel"),
  l = e("../../Frame/SceneManager"),
  c = e("../../Frame/Top"),
  d = e("../../Frame/Util"),
  h = e("../../Game/GameEnv"),
  p = e("../../Game/Hortor"),
  {
    ccclass: u,
    property: m
  } = cc._decorator;
let f = class extends r.default {
  constructor() {
    super(...arguments);
    this.guestBtn = null;
    this.wechatBtn = null;
    this.qqBtn = null;
    this.ttBtn = null;
    this.bigQQBtn = null;
    this.bigAppleBtn = null;
    this.userAgreeLine = null;
    this.userAgreeBtn = null;
    this.userPrivacyBtn = null;
    this.toggle = null;
    this.call = null;
    this._clickTimer = 0;
  }
  onLoad() {
    super.onLoad();
    this.toggle.node.on(s.default.STATE_CHANGE, this.onToggleChange, this);
    this.bigQQBtn.node.on(a.default.CLICK, this.onQQBtn, this);
    this.bigAppleBtn.node.on(a.default.CLICK, this.onAppleBtn, this);
    this.guestBtn.node.on(a.default.CLICK, this.onGuestBtn, this);
    this.wechatBtn.node.on(a.default.CLICK, this.onWechatBtn, this);
    this.qqBtn.node.on(a.default.CLICK, this.onQQBtn, this);
    this.ttBtn.node.on(a.default.CLICK, this.onTTBtn, this);
    this.userAgreeBtn.node.on(a.default.CLICK, this.onUserAgreeBtn, this);
    this.userPrivacyBtn.node.on(a.default.CLICK, this.onUserPrivacyBtn, this);
    this.bigAppleBtn.node.active = p.Hortor.platformSysBigType == p.PlatformSysBigType.IOS;
    this.bigQQBtn.node.active = !this.bigAppleBtn.node.active;
    this.qqBtn.node.active = this.bigAppleBtn.node.active;
    "yingyongbao" == h.gameEnv.androidChannel && (this.ttBtn.node.active = !1);
  }
  isInClickCd() {
    return this._clickTimer > cc.director.getTotalTime();
  }
  resetClickCd() {
    this._clickTimer = cc.director.getTotalTime() + 2e3;
  }
  clearClickCd() {
    this._clickTimer = 0;
  }
  onToggleChange(e) {
    e && p.Hortor.InitAppSDK();
  }
  onLogin(e) {
    if (!this.isInClickCd()) if (this.toggle.isChecked) {
      this.resetClickCd();
      this.closePanel();
      this.call && this.call(e);
    } else c.default.showToast("请先同意《用户协议》和《隐私政策》");
  }
  onGuestBtn() {
    this.onLogin(p.PlatType.Visitor);
  }
  onAppleBtn() {
    this.onLogin(p.PlatType.Apple);
  }
  onWechatBtn() {
    this.onLogin(p.PlatType.WeChat);
  }
  onQQBtn() {
    this.onLogin(p.PlatType.QQ);
  }
  onTTBtn() {
    this.onLogin(p.PlatType.TT);
  }
  onUserAgreeBtn() {
    return n(this, void 0, void 0, function* () {
      let e = yield d.Util.loadBundleRes("Text/UserAgree", cc.TextAsset);
      l.default.ins.Enter("DocumentScene", t => {
        t.setData("用户协议", e.text);
      }, l.ShiftAnima.moveLeftShift);
    });
  }
  onUserPrivacyBtn() {
    return n(this, void 0, void 0, function* () {
      let e = yield d.Util.loadBundleRes("Text/UserPrivacy", cc.TextAsset);
      l.default.ins.Enter("DocumentScene", t => {
        t.setData("隐私政策", e.text);
      }, l.ShiftAnima.moveLeftShift);
    });
  }
};
i([m(a.default)], f.prototype, "guestBtn", void 0);
i([m(a.default)], f.prototype, "wechatBtn", void 0);
i([m(a.default)], f.prototype, "qqBtn", void 0);
i([m(a.default)], f.prototype, "ttBtn", void 0);
i([m(a.default)], f.prototype, "bigQQBtn", void 0);
i([m(a.default)], f.prototype, "bigAppleBtn", void 0);
i([m(cc.Node)], f.prototype, "userAgreeLine", void 0);
i([m(a.default)], f.prototype, "userAgreeBtn", void 0);
i([m(a.default)], f.prototype, "userPrivacyBtn", void 0);
i([m(s.default)], f.prototype, "toggle", void 0);
f = i([u], f);
exports.default = f;