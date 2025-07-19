"use strict";

var i = this && this.__decorate || function (e, t, o, i) {
  var n,
    a = arguments.length,
    s = a < 3 ? t : null === i ? i = Object.getOwnPropertyDescriptor(t, o) : i;
  if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) s = Reflect.decorate(e, t, o, i);else for (var r = e.length - 1; r >= 0; r--) (n = e[r]) && (s = (a < 3 ? n(s) : a > 3 ? n(t, o, s) : n(t, o)) || s);
  return a > 3 && s && Object.defineProperty(t, o, s), s;
};
const n = e("../../CustomUI/Button"),
  a = e("../../CustomUI/HeadIcon"),
  s = e("../../CustomUI/ScrollList"),
  r = e("../../Frame/SceneManager"),
  l = e("../../Frame/Top"),
  c = e("../../Frame/UIColor"),
  d = e("../../Frame/Util"),
  h = e("../../Game/Player/GiftRankMng"),
  p = e("../../Role"),
  u = e("./GiftRankDetialIconCell"),
  m = e("./GiftRankDetialScene"),
  {
    ccclass: f,
    property: g
  } = cc._decorator;
let y = class extends cc.Component {
  constructor() {
    super(...arguments);
    this.headIcon = null;
    this.rankSprite = null;
    this.rankLabel = null;
    this.nameLabel = null;
    this.pointLabel = null;
    this.sendGiftBtn = null;
    this.gameId = null;
    this.gameUser = null;
    this.userData = null;
    this.isBottom = !1;
    this.userId = null;
    this.icon = null;
  }
  onLoad() {
    this.headIcon.node.on(n.default.CLICK, this.onHeadIconBtn, this);
    this.node.on(n.default.CLICK, this.onClick, this);
    this.sendGiftBtn && this.sendGiftBtn.node.on(n.default.CLICK, this.onSendGift, this);
    this.node.on(s.default.SET_DATA, this.setData, this);
  }
  onHeadIconBtn() {
    this.showUserScene();
  }
  showUserScene() {
    r.default.ins.Enter("FriendScene", e => {
      e.setData(this.userId);
    }, r.ShiftAnima.moveLeftShift);
  }
  onClick() {}
  onSendGift() {
    p.default.Ins.role.id != this.gameUser ? r.default.ins.OpenPanelByName("GiftChoosePanel", e => {
      e.init(this.gameId);
      e.closeCallback = () => {
        cc.game.emit(m.default.RELOAD);
      };
    }) : l.default.showToast("～不能给自己打赏～");
  }
  init(e, t) {
    this.gameId = e;
    this.gameUser = t;
  }
  setData(e) {
    this.userData = e;
    let t = "" == e.userName ? p.default.Ins.role.userName : e.userName;
    this.nameLabel.string = this.nameLabel.string = d.Util.clampStr(t, 9, "..");
    this.pointLabel && (this.pointLabel.string = e.score + "");
    let o = e.rank;
    if (0 == o) {
      this.rankLabel.node.active = !0;
      this.rankSprite.node.active = !1;
      this.rankLabel.string = "未上榜";
      this.headIcon.loadUrl(p.default.Ins.role.userImg);
      this.headIcon.setLevel(p.default.Ins.role.level);
      this.userId = p.default.Ins.role.id;
    } else {
      this.headIcon.loadUrl(e.userImg);
      this.headIcon.setLevel(e.userLevel);
      this.userId = this.userData.roleId;
      let t = e.rank <= 3;
      this.rankLabel.node.active = !t;
      this.rankSprite.node.active = t;
      let i = c.UIColor.getRankColor(o);
      this.node.color = i;
      this.rankSprite.node.color = i;
      t ? d.Util.loadBundleRes("Atlas/UI/rank" + o, cc.SpriteFrame).then(e => {
        this.rankSprite.spriteFrame = e;
      }) : this.rankLabel.string = o + "";
    }
    let i = e.giftDatas;
    i.sort(function (e, t) {
      return h.GiftRankMng.Ins.getCost(t.giftID + "") - h.GiftRankMng.Ins.getCost(e.giftID + "");
    });
    let n = Math.min(i.length, 3);
    d.Util.makeBro(this.icon.node, n, (e, t) => {
      e.getComponent(u.default).setData(i[t]);
    });
    d.Util.updateLayout(this.node);
  }
};
i([g(a.default)], y.prototype, "headIcon", void 0);
i([g(cc.Sprite)], y.prototype, "rankSprite", void 0);
i([g(cc.Label)], y.prototype, "rankLabel", void 0);
i([g(cc.Label)], y.prototype, "nameLabel", void 0);
i([g(cc.Label)], y.prototype, "pointLabel", void 0);
i([g(n.default)], y.prototype, "sendGiftBtn", void 0);
i([g(u.default)], y.prototype, "icon", void 0);
y = i([f], y);
exports.default = y;