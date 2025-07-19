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
const a = e("../../../scripts/_autogen/cmd/cmd"),
  s = e("../../CustomUI/Button"),
  r = e("../../Frame/CrossPlatform"),
  l = e("../../Frame/NetworkMgr"),
  c = e("../../Frame/Panel"),
  {
    ccclass: d,
    property: h
  } = cc._decorator;
let p = class extends c.default {
  constructor() {
    super(...arguments);
    this.editBox = null;
    this.tipLabel = null;
    this.createBtn = null;
    this.onCreate = null;
    this.onCancel = null;
    this.accountCheckOk = !0;
  }
  onLoad() {
    super.onLoad();
    this.createBtn.node.on(s.default.CLICK, this.onClickCreateBtn, this);
    this.editBox.node.on("text-changed", this.onEditing, this);
    this.tipLabel.node.active = !1;
    this.updateBtnStatus();
  }
  onCloseBtnTap() {
    super.onCloseBtnTap();
    this.onCancel && this.onCancel();
  }
  onClickCreateBtn() {
    this.createAccount(this.editBox.string);
  }
  onEditing() {
    this.unscheduleAllCallbacks();
    if (this.editBox.string.length < 5 || this.editBox.string.length > 16) {
      this.accountCheckOk = !1;
      this.updateTipLabel("Username length must be 5-16", !0);
      this.updateBtnStatus();
    } else if (new RegExp(/^[a-zA-Z][a-zA-Z0-9_]{4,15}$/).test(this.editBox.string)) {
      this.updateTipLabel("", !1);
      this.scheduleOnce(() => {
        this.checkAccount(this.editBox.string);
      }, .5);
    } else {
      this.accountCheckOk = !1;
      this.updateTipLabel("Username must start with a letter and can only contain letters, numbers and '_'.", !0);
      this.updateBtnStatus();
    }
  }
  createAccount(e) {
    return n(this, void 0, void 0, function* () {
      this.unscheduleAllCallbacks();
      yield this.checkAccount(e);
      if (!this.accountCheckOk) return;
      let t = {
          account: e
        },
        o = (yield l.NetIns.sendHttpAsync({
          cmd: a.CMDS.Login_CreateAccount,
          params: t
        })).decBody;
      if (o && o.oTP && o.account) {
        r.crossPlatform.setStorageSync("lastLoginOTP", o.oTP);
        r.crossPlatform.setStorageSync("lastLoginAccount", o.account);
        this.closePanel();
        this.onCreate && this.onCreate({
          account: o.account,
          otp: o.oTP,
          password: ""
        });
      }
    });
  }
  checkAccount(e) {
    return n(this, void 0, void 0, function* () {
      if (this.editBox.string.length < 5 || this.editBox.string.length > 16) {
        this.accountCheckOk = !1;
        this.updateTipLabel("Username length must be 5-16", !0);
        this.updateBtnStatus();
        return;
      }
      if (!new RegExp(/^[a-zA-Z][a-zA-Z0-9_]{4,15}$/).test(this.editBox.string)) {
        this.accountCheckOk = !1;
        this.updateTipLabel("Username must start with a letter and can only contain letters, numbers and '_'.", !0);
        this.updateBtnStatus();
        return;
      }
      let t = {
          account: e
        },
        o = (yield l.NetIns.sendHttpAsync({
          cmd: a.CMDS.Login_CheckAccount,
          params: t
        })).decBody;
      this.accountCheckOk = o && o.ok;
      this.updateTipLabel(this.accountCheckOk ? "Available" : "Already taken", !this.accountCheckOk);
      this.updateBtnStatus();
    });
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
  updateBtnStatus() {}
};
i([h(cc.EditBox)], p.prototype, "editBox", void 0);
i([h(cc.Label)], p.prototype, "tipLabel", void 0);
i([h(s.default)], p.prototype, "createBtn", void 0);
p = i([d], p);
exports.default = p;