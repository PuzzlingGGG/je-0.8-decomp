"use strict";

var i = this && this.__decorate || function (e, t, o, i) {
  var n,
    a = arguments.length,
    s = a < 3 ? t : null === i ? i = Object.getOwnPropertyDescriptor(t, o) : i;
  if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) s = Reflect.decorate(e, t, o, i);else for (var r = e.length - 1; r >= 0; r--) (n = e[r]) && (s = (a < 3 ? n(s) : a > 3 ? n(t, o, s) : n(t, o)) || s);
  return a > 3 && s && Object.defineProperty(t, o, s), s;
};
const n = e("../../CustomUI/Button"),
  a = e("../../Frame/Panel"),
  s = e("../../Frame/Top"),
  r = e("../../Game/Hortor"),
  {
    ccclass: l,
    property: c
  } = cc._decorator;
let d = class extends a.default {
  constructor() {
    super(...arguments);
    this.getCodeBtn = null;
    this.loginBtn = null;
    this.labelGetCode = null;
    this.editMobileNumber = null;
    this.editCodeNumaber = null;
    this.call = null;
    this._clickTimer = 0;
    this._sendSmsTimer = 0;
  }
  onLoad() {
    super.onLoad();
    this.getCodeBtn.node.on(n.default.CLICK, this.onGetCode, this);
    this.loginBtn.node.on(n.default.CLICK, this.onLogin, this);
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
  reSendSmsLeftTime() {
    let e = this._sendSmsTimer - cc.director.getTotalTime();
    return e > 0 ? Math.ceil(e / 1e3) : 0;
  }
  update() {
    let e = this.reSendSmsLeftTime();
    if (e > 0) {
      this.labelGetCode.string = `${e}秒`;
      this.getCodeBtn.interactable && (this.getCodeBtn.interactable = !1);
    } else {
      this.labelGetCode.string = "获取验证码";
      this.getCodeBtn.interactable || (this.getCodeBtn.interactable = !0);
    }
  }
  onGetCode() {
    if (this.isInClickCd()) return;
    let e = this.editMobileNumber.string;
    if (0 == e.length) {
      s.default.showToast("请输入手机号");
      return;
    }
    let t = parseInt(e);
    if (Number.isNaN(t) || 11 != e.length) s.default.showToast("请输入正确手机号");else {
      this.resetClickCd();
      r.Hortor.sendSMSCode(e, e => {
        if (e) {
          s.default.showToast("发送验证码成功，请查看短信");
          this._sendSmsTimer = 6e4 + cc.director.getTotalTime();
        } else s.default.showToast("发送验证码失败，请稍后再试");
      });
    }
  }
  onLogin() {
    if (this.isInClickCd()) return;
    let e = this.editMobileNumber.string;
    if (0 == e.length) {
      s.default.showToast("请输入手机号");
      return;
    }
    let t = parseInt(e);
    if (Number.isNaN(t) || 11 != e.length) {
      s.default.showToast("请输入正确手机号");
      return;
    }
    let o = this.editCodeNumaber.string;
    if (0 == o.length) {
      s.default.showToast("请输入验证码");
      return;
    }
    let i = parseInt(o);
    if (Number.isNaN(i) || 6 != o.length) s.default.showToast("请输入正确验证码");else {
      this.resetClickCd();
      this.closePanel();
      this.call && this.call({
        mobile: e,
        smsCode: o
      });
    }
  }
};
i([c(n.default)], d.prototype, "getCodeBtn", void 0);
i([c(n.default)], d.prototype, "loginBtn", void 0);
i([c(cc.Label)], d.prototype, "labelGetCode", void 0);
i([c(cc.EditBox)], d.prototype, "editMobileNumber", void 0);
i([c(cc.EditBox)], d.prototype, "editCodeNumaber", void 0);
d = i([l], d);
exports.default = d;