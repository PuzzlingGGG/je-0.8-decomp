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
  r = e("../../Frame/NetworkMgr"),
  l = e("../../Frame/Panel"),
  c = e("../../Frame/SceneManager"),
  d = e("../../Frame/Top"),
  h = e("../../Frame/UIColor"),
  p = e("../../Game/Hortor"),
  {
    ccclass: u,
    property: m
  } = cc._decorator;
let f = class extends l.default {
  constructor() {
    super(...arguments);
    this.editBox = null;
    this.tipLabel = null;
    this.btnLink = null;
    this.onSucc = null;
    this.onGiveUp = null;
  }
  onLoad() {
    super.onLoad();
    this.btnLink.node.on(s.default.CLICK, this.onClickLink, this);
  }
  onCloseBtnTap() {
    super.onCloseBtnTap();
    this.onGiveUp && this.onGiveUp();
  }
  onClickLink() {
    let e = this.editBox.string;
    null != e && "" != e ? this.tipLabel.node.active ? c.default.ins.OpenPanelByName("MessageBox", t => {
      t.label.string = "是否确认关联？\n关联后，将以抖音账号为主，当前帐号将被覆盖！";
      t.setLeftBtn({
        text: "是",
        color: h.UIColor.pink,
        call: () => n(this, void 0, void 0, function* () {
          this.requestLink(e);
        })
      });
      t.setRightBtn({
        text: "点错了",
        color: h.UIColor.blue
      });
    }) : this.requestLink(e) : d.default.showToast("密钥不能为空");
  }
  requestLink(e) {
    return n(this, void 0, void 0, function* () {
      let t = {
          code: e,
          info: p.Hortor.loginAuthInfo,
          platform: p.Hortor.loginPlatform
        },
        o = yield r.NetIns.SendCmdAsync({
          cmd: a.CMDS.Game_BindRole,
          params: t
        }, a.Game_RBindRole);
      if (o && 0 == o.errorCode) {
        this.closePanel();
        this.onSucc && this.onSucc();
      } else d.default.showToast("关联失败");
    });
  }
};
i([m(cc.EditBox)], f.prototype, "editBox", void 0);
i([m(cc.Label)], f.prototype, "tipLabel", void 0);
i([m(s.default)], f.prototype, "btnLink", void 0);
f = i([u], f);
exports.default = f;