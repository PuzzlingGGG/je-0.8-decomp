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
const a = e("../../../CustomUI/Button"),
  s = e("../../../CustomUI/HeadIcon"),
  r = e("../../../Frame/SceneManager"),
  l = e("../../../Frame/Top"),
  c = e("../../../Frame/UIColor"),
  d = e("../../../Frame/Util"),
  h = e("../../../Game/Hortor"),
  p = e("../../../Game/OperationFlow"),
  u = e("../../../Game/Player/CollectionMng"),
  m = e("../../../Game/Player/CreditMng"),
  f = e("../../../Game/Player/DynamicMng"),
  g = e("../../../Role"),
  {
    ccclass: y,
    property: v
  } = cc._decorator;
let C = class extends cc.Component {
  constructor() {
    super(...arguments);
    this.nameLabel = null;
    this.introLabel = null;
    this.levelBtn = null;
    this.editNameBtn = null;
    this.headIcon = null;
    this.followBtn = null;
    this.fansBtn = null;
    this.cridtPoint = null;
    this.collectionBtn = null;
  }
  onLoad() {
    cc.game.on(g.default.UserInfoChange, this.refreshUserInfo, this);
    cc.game.on(g.default.UserImgChange, this.refreshUserImg, this);
    cc.game.on("CreditChange", this.updateCreditPoint, this);
    this.followBtn && this.followBtn.node.on(a.default.CLICK, this.onFollowBtn, this);
    this.fansBtn && this.fansBtn.node.on(a.default.CLICK, this.onFansBtn, this);
    this.collectionBtn && this.collectionBtn.node.on(a.default.CLICK, this.onCollectionBtn, this);
    this.editNameBtn && this.editNameBtn.node.on(a.default.CLICK, this.openEditUserInfoPanel, this);
    this.nameLabel && this.nameLabel.node.on(cc.Node.EventType.TOUCH_END, this.openEditUserInfoPanel, this);
    this.introLabel && this.introLabel.node.on(cc.Node.EventType.TOUCH_END, this.openEditUserInfoPanel, this);
    this.headIcon && this.headIcon.node.on(a.default.CLICK, this.openEditUserInfoPanel, this);
    if (this.levelBtn) {
      this.levelBtn.node.on(a.default.CLICK, this.onLevelBtnTap, this);
      this.levelBtn.label.string = g.default.Ins.role.level + "";
    }
    this.cridtPoint.parent.on(a.default.CLICK, this.onClickCreditPoint, this);
  }
  onDestroy() {
    cc.game.off(g.default.UserInfoChange, this.refreshUserInfo, this);
    cc.game.off(g.default.UserImgChange, this.refreshUserImg, this);
    cc.game.off("CreditChange", this.updateCreditPoint, this);
  }
  updateCreditPoint(e) {
    d.Util.makeBro(this.cridtPoint, 3, (t, o) => {
      t.color = o < e ? c.UIColor.green : c.UIColor.gray;
    });
  }
  onEnable() {
    this.refreshUserInfo();
    this.refreshUserImg();
    this.refresFollowAndFans();
    this.updateCreditPoint(m.CreditMng.Ins.credit);
  }
  refreshUserInfo() {
    this.nameLabel.string = d.Util.clampStr(g.default.Ins.userName, 10, "..");
    this.introLabel.string = g.default.Ins.userIntro;
  }
  refreshUserImg() {
    this.headIcon.loadUrl(g.default.Ins.userImg);
  }
  refresFollowAndFans() {
    return n(this, void 0, void 0, function* () {
      if (this.followBtn && this.fansBtn) {
        this.followBtn.label.string = "" + g.default.Ins.role.follows.length;
        this.fansBtn.label.string = "" + g.default.Ins.role.fansCount;
        const e = u.CollectionMng.Ins.getNumCollection();
        this.collectionBtn.label.string = "" + e;
        d.Util.updateAllLayout(this.followBtn.node.parent);
      }
    });
  }
  onFollowBtn() {
    r.default.ins.Enter("FollowScene", e => {
      e.init("follow", g.default.Ins.role.uId);
    }, r.ShiftAnima.moveLeftShift);
  }
  onFansBtn() {
    r.default.ins.Enter("FollowScene", e => {
      e.init("fans", g.default.Ins.role.uId);
    }, r.ShiftAnima.moveLeftShift);
  }
  onCollectionBtn() {
    r.default.ins.Enter("CollectionScene", e => {
      e.init();
    }, r.ShiftAnima.moveLeftShift);
  }
  openEditUserInfoPanel() {
    f.DynamicMng.Ins.isDisable(f.FunctionEnum.PublishUserInfo, !0) || (h.Hortor.isVisitor() ? p.OperationFlow.openVisitorPanel() : m.CreditMng.Ins.credit <= 2 ? l.default.showToast("近期违规，不能创造或编辑") : r.default.ins.OpenPanelByName("EditUserInfoPanel"));
  }
  onClickCreditPoint() {
    r.default.ins.Enter("CreditScene", () => {}, r.ShiftAnima.moveLeftShift);
  }
  onLevelBtnTap() {
    r.default.ins.OpenPanelByName("LevelHelpPanel", () => {});
  }
};
i([v(cc.Label)], C.prototype, "nameLabel", void 0);
i([v(cc.Label)], C.prototype, "introLabel", void 0);
i([v(a.default)], C.prototype, "levelBtn", void 0);
i([v(a.default)], C.prototype, "editNameBtn", void 0);
i([v(s.default)], C.prototype, "headIcon", void 0);
i([v(a.default)], C.prototype, "followBtn", void 0);
i([v(a.default)], C.prototype, "fansBtn", void 0);
i([v(cc.Node)], C.prototype, "cridtPoint", void 0);
i([v(a.default)], C.prototype, "collectionBtn", void 0);
C = i([y], C);
exports.default = C;