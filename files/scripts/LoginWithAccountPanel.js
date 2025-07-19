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
  {
    ccclass: s,
    property: r
  } = cc._decorator;
let l = class extends a.default {
  constructor() {
    super(...arguments);
    this.editBoxUsername = null;
    this.editBoxPassword = null;
    this.tipLabel = null;
    this.loginBtn = null;
    this.onLogin = null;
    this.onCancel = null;
    this.passwordIsOk = !1;
    this.usernameIsOk = !1;
  }
  onLoad() {
    super.onLoad();
    this.loginBtn.node.on(n.default.CLICK, this.onClickLoginBtn, this);
    this.editBoxPassword.node.on("text-changed", this.onEditingPassword, this);
    this.editBoxUsername.node.on("text-changed", this.onEditingUserName, this);
    this.tipLabel.node.active = !1;
  }
  onCloseBtnTap() {
    super.onCloseBtnTap();
    this.onCancel && this.onCancel();
  }
  onEditingPassword() {
    if (this.editBoxPassword.string.length < 6 || this.editBoxPassword.string.length > 18) {
      this.passwordIsOk = !1;
      this.updateTipLabel("Password length must be 6-18", !0);
    } else if (new RegExp(/^[a-zA-Z]\w{5,17}$/).test(this.editBoxPassword.string)) {
      this.passwordIsOk = !0;
      this.updateTipLabel("", !1);
    } else {
      this.passwordIsOk = !1;
      this.updateTipLabel("Password must start with a letter and can only contain letters, numbers and '_'.", !0);
    }
  }
  onEditingUserName() {
    if (this.editBoxUsername.string.length < 5 || this.editBoxUsername.string.length > 16) {
      this.passwordIsOk = !1;
      this.updateTipLabel("Username length must be 5-16", !0);
    } else if (new RegExp(/^[a-zA-Z][a-zA-Z0-9_]{4,15}$/).test(this.editBoxUsername.string)) {
      this.usernameIsOk = !0;
      this.updateTipLabel("", !1);
    } else {
      this.usernameIsOk = !1;
      this.updateTipLabel("Username must start with a letter and can only contain letters, numbers and '_'.", !0);
    }
  }
  onClickLoginBtn() {
    if (this.editBoxUsername.string.trim()) {
      if (this.editBoxPassword.string) {
        if (this.passwordIsOk && this.usernameIsOk) {
          this.closePanel();
          this.onLogin && this.onLogin({
            account: this.editBoxUsername.string,
            otp: "",
            password: this.editBoxPassword.string
          });
        }
      } else this.updateTipLabel("Password cannot be empty", !0);
    } else this.updateTipLabel("Username cannot be empty", !0);
  }
  updateTipLabel(e, t) {
    this.tipLabel.node.active = !0;
    if (t) {
      this.tipLabel.string = e;
      this.tipLabel.node.color = cc.color(239, 101, 126);
    } else {
      this.tipLabel.string = e;
      this.tipLabel.node.color = cc.color(110, 239, 153);
    }
  }
};
i([r(cc.EditBox)], l.prototype, "editBoxUsername", void 0);
i([r(cc.EditBox)], l.prototype, "editBoxPassword", void 0);
i([r(cc.Label)], l.prototype, "tipLabel", void 0);
i([r(n.default)], l.prototype, "loginBtn", void 0);
l = i([s], l);
exports.default = l;