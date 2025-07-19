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
  s = e("../../../scripts/_autogen/data/data"),
  r = e("../../CustomUI/Button"),
  l = e("../../CustomUI/HeadIcon"),
  c = e("../../Frame/NetworkMgr"),
  d = e("../../Frame/Panel"),
  h = e("../../Frame/Top"),
  p = e("../../Game/OperationFlow"),
  u = e("../../Role"),
  {
    ccclass: m,
    property: f
  } = cc._decorator;
let g = class extends d.default {
  constructor() {
    super(...arguments);
    this.nameEditBox = null;
    this.introEditBox = null;
    this.headIcon = null;
    this.paintBtn = null;
    this.okBtn = null;
    this.tipLabel = null;
  }
  onLoad() {
    super.onLoad();
    this.okBtn.node.on(r.default.CLICK, this.onBtnClick, this);
    this.paintBtn.node.on(r.default.CLICK, this.onPaintBnt, this);
    this.headIcon.node.on(r.default.CLICK, this.onPaintBnt, this);
    this.tipLabel.node.on(r.default.CLICK, this.onTipLabel, this);
    this.updateUI();
  }
  updateUI() {
    this.nameEditBox.string = u.default.Ins.userName;
    this.introEditBox.string = u.default.Ins.userIntro;
    this.tipLabel.node.active = !1;
    console.log(u.default.Ins.role.newUserImgReviewStatus);
    switch (u.default.Ins.role.newUserImgReviewStatus) {
      case s.ManReviewStatus.inReview:
        this.headIcon.loadUrl(u.default.Ins.role.newUserImg);
        this.tipLabel.node.active = !0;
        this.tipLabel.string = "新头像审核中";
        break;
      case s.ManReviewStatus.success:
        this.headIcon.loadUrl(u.default.Ins.role.userImg);
        break;
      case s.ManReviewStatus.fail:
        this.headIcon.loadUrl(u.default.Ins.role.userImg);
        this.tipLabel.node.active = !0;
        this.tipLabel.string = "新头像审核失败";
        break;
      default:
        this.headIcon.loadUrl(u.default.Ins.role.userImg);
    }
  }
  onBtnClick() {
    return n(this, void 0, void 0, function* () {
      let e = this.nameEditBox.textLabel.string,
        t = this.introEditBox.textLabel.string;
      h.default.showLoading("修改中");
      let o = {
          userName: e,
          userImg: null,
          userIntro: t
        },
        i = yield c.NetIns.SendCmdAsync({
          cmd: a.CMDS.Game_UpdateUserInfo,
          params: o
        }, a.Game_RUpdateUserInfo);
      if (i) {
        if (i.sensitiveWords && i.sensitiveWords.length > 0) h.default.hideLoading("审核失败：" + i.sensitiveWords.join(","));else {
          u.default.Ins.userName = e;
          u.default.Ins.userIntro = t;
          cc.game.emit(u.default.UserInfoChange);
          this.closePanel();
          h.default.hideLoading("修改成功");
        }
      } else h.default.hideLoading("网络错误，保存失败!");
    });
  }
  onPaintBnt() {
    p.OperationFlow.paintHeadIcon(u.default.Ins.userImg, () => {
      this.updateUI();
    });
  }
  onTipLabel() {}
};
i([f(cc.EditBox)], g.prototype, "nameEditBox", void 0);
i([f(cc.EditBox)], g.prototype, "introEditBox", void 0);
i([f(l.default)], g.prototype, "headIcon", void 0);
i([f(r.default)], g.prototype, "paintBtn", void 0);
i([f(r.default)], g.prototype, "okBtn", void 0);
i([f(cc.Label)], g.prototype, "tipLabel", void 0);
g = i([m], g);
exports.default = g;