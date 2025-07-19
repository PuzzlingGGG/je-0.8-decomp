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
const a = e("../../Frame/Panel"),
  s = e("../../CustomUI/Toggle"),
  r = e("../../CustomUI/Button"),
  l = e("../../Frame/Vibrate"),
  c = e("../../Frame/Sound"),
  d = e("../../Frame/Music"),
  h = e("../../Frame/CrossPlatform"),
  p = e("../../CustomUI/HeadIcon"),
  u = e("../../Game/Hortor"),
  m = e("../../Frame/SceneManager"),
  f = e("../../Role"),
  g = e("../../Frame/Top"),
  y = e("../../../scripts/_autogen/cmd/cmd"),
  v = e("../../Frame/NetworkMgr"),
  C = e("../../../scripts/_autogen/data/data"),
  _ = e("../../Game/Player/DynamicMng"),
  {
    ccclass: S,
    property: I
  } = cc._decorator;
let G = class extends a.default {
  constructor() {
    super(...arguments);
    this.soundSlider = null;
    this.vibrateToggle = null;
    this.btnExitAccount = null;
    this.btnKeyAccount = null;
    this.idCard = null;
    this.btnLinkAccount = null;
    this.headIcon = null;
    this.labelId = null;
    this.labelAccountType = null;
    this.okBtn = null;
    this.editBoxPassword = null;
    this.setPasswordBtn = null;
    this.passwordTipLabel = null;
    this.passwordBox = null;
    this.bottomLayout = null;
    this.facebookBtn = null;
    this.passwordIsOk = !1;
  }
  onLoad() {
    super.onLoad();
    this.soundSlider.progress = c.Sound.volume;
    this.vibrateToggle.isChecked = l.Vibrate.enable;
    this.closeCallback = () => {
      c.Sound.volume = this.soundSlider.progress;
      l.Vibrate.enable = this.vibrateToggle.isChecked;
      h.crossPlatform.setStorageSync("setting", {
        music: d.default.volume,
        sound: c.Sound.volume,
        vibrate: l.Vibrate.enable
      });
    };
    this.btnLinkAccount.node.on(r.default.CLICK, this.onClickLinkAccount, this);
    this.btnExitAccount.node.on(r.default.CLICK, this.onClickExitAccount, this);
    this.btnKeyAccount.node.on(r.default.CLICK, this.onClickKeyAccount, this);
    this.okBtn.node.on(r.default.CLICK, this.closePanel, this);
    this.editBoxPassword.node.on("text-changed", this.onEditingPassword, this);
    this.setPasswordBtn.node.on(r.default.CLICK, this.onClickSetPassword, this);
    this.facebookBtn.node.on(r.default.CLICK, this.onClickSetFaceBook, this);
    this.onRefresh();
  }
  onRefresh() {
    this.btnLinkAccount.node.active = !1;
    this.btnExitAccount.node.active = !1;
    this.btnKeyAccount.node.active = !1;
    this.okBtn.node.active = !1;
    this.headIcon.loadUrl(f.default.Ins.userImg);
    this.labelId.string = "ID: " + f.default.Ins.role.id;
    let e = u.Hortor.loginPlatType;
    console.log(">>loginPlatType>>", u.Hortor.loginPlatType);
    if (u.Hortor.isApp()) {
      console.log(">>linkAccountType>>", u.Hortor.linkAccountType);
      this.btnExitAccount.node.active = !0;
      e == u.PlatType.Visitor && u.Hortor.linkAccountType >= 0 && (e = u.Hortor.linkAccountType);
      console.log(">>platType>>", e);
      e != u.PlatType.Visitor || u.Hortor.isMobileLogin || (this.btnLinkAccount.node.active = !0);
    } else if (u.Hortor.isMiniGame()) {
      if (_.DynamicMng.Ins.isInspectVersion()) {
        this.okBtn.node.active = !0;
        this.idCard.active = !1;
      } else this.btnKeyAccount.node.active = !0;
    } else this.btnExitAccount.node.active = !0;
    e == u.PlatType.Visitor ? this.labelAccountType.string = "游客账号" : e == u.PlatType.Apple ? this.labelAccountType.string = "苹果账号" : e == u.PlatType.WeChat ? this.labelAccountType.string = "微信账号" : e == u.PlatType.QQ ? this.labelAccountType.string = "QQ账号" : e == u.PlatType.TT ? this.labelAccountType.string = "抖音账号" : e == u.PlatType.Mobile && (this.labelAccountType.string = "手机账号");
    let t = h.crossPlatform.getStorageSync("isSetPassword");
    this.passwordBox.active = !t;
    let o = h.crossPlatform.getStorageSync("isSetFaceBook");
    this.facebookBtn.active = !o;
    this.bottomLayout.updateLayout();
    this.node.height = this.bottomLayout.node.height + 370;
  }
  onClickLinkAccount() {
    m.default.ins.OpenPanelByName("LinkAccountPanel", e => {
      e.onSucc = () => {
        this.closePanel();
        u.Hortor.logoutApp();
        m.default.ins.Enter("LoginScene");
      };
    });
  }
  onClickKeyAccount() {
    this.requestKeyAccount();
  }
  requestKeyAccount() {
    return n(this, void 0, void 0, function* () {
      let e = C.GDBindType.tikTok;
      u.Hortor.loginPlatType == u.PlatType.WeChat ? e = C.GDBindType.wechat : u.Hortor.loginPlatType == u.PlatType.QQ ? e = C.GDBindType.qQ : u.Hortor.loginPlatType == u.PlatType.Apple && (e = C.GDBindType.apple);
      let t = {
          bindType: e
        },
        o = yield v.NetIns.SendCmdAsync({
          cmd: y.CMDS.Game_GetBindRoleMsg,
          params: t
        }, y.Game_RGetBindRoleMsg);
      console.log(">>Game_GetBindRoleMsg>>", o ? JSON.stringify(o) : o);
      o && h.crossPlatform.setClipboardData({
        data: o.code,
        success: () => {
          g.default.showToast("密钥已复制");
          this.btnKeyAccount.label.string = o.code;
        }
      });
    });
  }
  onClickExitAccount() {
    this.closePanel();
    if (u.Hortor.isApp()) {
      h.crossPlatform.setStorageSync("lastLoginSelectPlat", "");
      u.Hortor.logoutApp();
    } else {
      if (!h.crossPlatform.getStorageSync("isSetPassword")) {
        g.default.showToast("Can't logout before setup password");
        return;
      }
      h.crossPlatform.setStorageSync("lastLoginAccount", "");
      h.crossPlatform.setStorageSync("lastLoginOTP", "");
      h.crossPlatform.setStorageSync("isSetPassword", !1);
      u.Hortor.logoutWeb();
    }
    m.default.ins.Enter("LoginScene");
  }
  onEditingPassword() {
    if (this.editBoxPassword.string.length < 6 || this.editBoxPassword.string.length > 18) {
      this.passwordIsOk = !1;
      this.updateTipLabel("Password length must be 6-18", !0);
    } else if (new RegExp(/^[a-zA-Z]\w{5,17}$/).test(this.editBoxPassword.string)) {
      this.passwordIsOk = !0;
      this.updateTipLabel("Available", !1);
    } else {
      this.passwordIsOk = !1;
      this.updateTipLabel("Password must start with a letter and can only contain letters, numbers and '_'.", !0);
    }
  }
  onClickSetPassword() {
    return n(this, void 0, void 0, function* () {
      if (!this.passwordIsOk) return;
      let e = {
        oldPassword: "",
        password: this.editBoxPassword.string
      };
      if (yield v.NetIns.SendCmdAsync({
        cmd: y.CMDS.Account_SetPassword,
        params: e
      }, y.Account_SetPasswordR)) {
        g.default.showToast("Set password Success");
        h.crossPlatform.setStorageSync("isSetPassword", !0);
        cc.game.emit("refreshPasswordDot");
        this.passwordBox.active = !1;
        this.bottomLayout.updateLayout();
        this.node.height = this.bottomLayout.node.height + 370;
      }
    });
  }
  onClickSetFaceBook() {
    return n(this, void 0, void 0, function* () {
      cc.sys.os === cc.sys.OS_ANDROID && jsb.reflection.callStaticMethod("org/cocos2dx/javascript/AppActivity", "loginFacebook", "(Ljava/lang/String;Ljava/lang/String;)V", "", "");
    });
  }
  updateTipLabel(e, t) {
    this.passwordTipLabel.node.active = !0;
    if (t) {
      this.passwordTipLabel.string = e;
      this.passwordTipLabel.node.color = cc.color(239, 101, 126);
    } else {
      this.passwordTipLabel.string = e;
      this.passwordTipLabel.node.color = cc.color(110, 239, 153);
    }
  }
};
i([I(cc.Slider)], G.prototype, "soundSlider", void 0);
i([I(s.default)], G.prototype, "vibrateToggle", void 0);
i([I(r.default)], G.prototype, "btnExitAccount", void 0);
i([I(r.default)], G.prototype, "btnKeyAccount", void 0);
i([I(cc.Node)], G.prototype, "idCard", void 0);
i([I(r.default)], G.prototype, "btnLinkAccount", void 0);
i([I(p.default)], G.prototype, "headIcon", void 0);
i([I(cc.Label)], G.prototype, "labelId", void 0);
i([I(cc.Label)], G.prototype, "labelAccountType", void 0);
i([I(r.default)], G.prototype, "okBtn", void 0);
i([I(cc.EditBox)], G.prototype, "editBoxPassword", void 0);
i([I(r.default)], G.prototype, "setPasswordBtn", void 0);
i([I(cc.Label)], G.prototype, "passwordTipLabel", void 0);
i([I(cc.Node)], G.prototype, "passwordBox", void 0);
i([I(cc.Layout)], G.prototype, "bottomLayout", void 0);
i([I(r.default)], G.prototype, "facebookBtn", void 0);
G = i([S], G);
exports.default = G;