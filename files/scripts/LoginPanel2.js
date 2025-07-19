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
  h = e("../../Game/Hortor"),
  {
    ccclass: p,
    property: u
  } = cc._decorator;
let m = class extends r.default {
  constructor() {
    super(...arguments);
    this.guestBtn = null;
    this.mobileBtn = null;
    this.userAgreeLine = null;
    this.userAgreeBtn = null;
    this.userPrivacyBtn = null;
    this.toggle = null;
    this.call = null;
    this._clickTimer = 0;
  }
  onLoad() {
    super.onLoad();
    this.guestBtn.node.on(a.default.CLICK, this.onGuestBtn, this);
    this.mobileBtn.node.on(a.default.CLICK, this.onMobileBtn, this);
    this.userAgreeBtn.node.on(a.default.CLICK, this.onUserAgreeBtn, this);
    this.userPrivacyBtn.node.on(a.default.CLICK, this.onUserPrivacyBtn, this);
    this.toggle.node.on(s.default.STATE_CHANGE, this.onToggleChange, this);
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
    e && h.Hortor.InitAppSDK();
  }
  onGuestBtn() {
    this.onLogin(h.PlatType.Visitor);
  }
  onMobileBtn() {
    this.onLogin(h.PlatType.Mobile);
  }
  onLogin(e) {
    return n(this, void 0, void 0, function* () {
      if (this.isInClickCd()) return;
      if (!this.toggle.isChecked) {
        c.default.showToast("请先同意《用户协议》和《隐私政策》");
        return;
      }
      this.resetClickCd();
      let t = this.call;
      if (e == h.PlatType.Mobile) l.default.ins.OpenPanelByName("MobileLoginPanel", o => {
        exports.call = o => {
          t && t(e, o);
          this.closePanel();
        };
      });else {
        this.closePanel();
        t && t(e);
      }
    });
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
i([u(a.default)], m.prototype, "guestBtn", void 0);
i([u(a.default)], m.prototype, "mobileBtn", void 0);
i([u(cc.Node)], m.prototype, "userAgreeLine", void 0);
i([u(a.default)], m.prototype, "userAgreeBtn", void 0);
i([u(a.default)], m.prototype, "userPrivacyBtn", void 0);
i([u(s.default)], m.prototype, "toggle", void 0);
m = i([p], m);
exports.default = m;