"use strict";

var i = this && this.__decorate || function (e, t, o, i) {
  var n,
    a = arguments.length,
    s = a < 3 ? t : null === i ? i = Object.getOwnPropertyDescriptor(t, o) : i;
  if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) s = Reflect.decorate(e, t, o, i);else for (var r = e.length - 1; r >= 0; r--) (n = e[r]) && (s = (a < 3 ? n(s) : a > 3 ? n(t, o, s) : n(t, o)) || s);
  return a > 3 && s && Object.defineProperty(t, o, s), s;
};
const n = e("../../../../scripts/_autogen/data/data"),
  a = e("../../../CustomUI/Button"),
  s = e("../../../CustomUI/HeadIcon"),
  r = e("../../../CustomUI/ScrollList"),
  l = e("../../../Frame/SceneManager"),
  c = e("../../../Frame/Util"),
  d = e("../../../Game/Player/GameIconMng"),
  h = e("../../../Game/Player/Mng"),
  p = e("../../../TGA"),
  {
    ccclass: u,
    property: m
  } = cc._decorator;
let f = class extends cc.Component {
  constructor() {
    super(...arguments);
    this.headIcon = null;
    this.nameLabel = null;
    this.msgLabel = null;
    this.icon = null;
    this.dot = null;
    this.data = null;
  }
  onLoad() {
    this.node.on(r.default.SET_DATA, this.setData, this);
    this.headIcon.node.on(a.default.CLICK, this.onHeadIcon, this);
    this.nameLabel.node.on(a.default.CLICK, this.onHeadIcon, this);
    this.msgLabel.node.on(a.default.CLICK, this.onMsgLabel, this);
    this.node.on(a.default.CLICK, this.onClick, this);
  }
  onHeadIcon() {
    if (!this.data) return;
    let e = this.data.userInfoList[0];
    l.default.ins.Enter("FriendScene", t => {
      t.setData(e.playerId);
    }, l.ShiftAnima.moveLeftShift);
  }
  onMsgLabel() {
    if (!this.data) return;
    let e = [];
    for (let t = 0; t < this.data.userInfoList.length; t++) e.push(this.data.userInfoList[t].playerId);
    let t = "";
    switch (this.data.type) {
      case n.MsgType.collectionGame:
        t = "收藏了你的游戏";
        break;
      case n.MsgType.thumbGame:
        t = "点赞了你的游戏";
        break;
      case n.MsgType.playGame:
        t = "玩了你的游戏";
        break;
      case n.MsgType.hurryGame:
        t = "催更了你的游戏";
        break;
      case n.MsgType.buyGoods:
        t = "购买了你的素材";
    }
    this.data.isNew = !1;
    this.dot.active = !1;
    l.default.ins.Enter("PlayerListScene", o => {
      o.setData(t, e);
    }, l.ShiftAnima.moveLeftShift);
  }
  setData(e) {
    this.data = e;
    let t = e.userInfoList[0],
      o = c.Util.clampStr(t.userName, 9, "..");
    this.nameLabel.string = o;
    this.headIcon.loadUrl(t.userImg);
    this.headIcon.setLevel(t.userLevel);
    this.dot.active = e.isNew;
    let i = "";
    if (e.userInfoList.length > 1) {
      i = `等${e.userInfoList.length}人`;
      this.msgLabel.getComponent(a.default).interactable = !0;
    } else this.msgLabel.getComponent(a.default).interactable = !1;
    switch (e.type) {
      case n.MsgType.collectionGame:
        d.GameIconMng.Ins.setSprite(this.icon, e.gameIcon, 120);
        this.msgLabel.string = i + "收藏了你的游戏";
        break;
      case n.MsgType.thumbGame:
        d.GameIconMng.Ins.setSprite(this.icon, e.gameIcon, 120);
        this.msgLabel.string = i + "点赞了你的游戏";
        break;
      case n.MsgType.playGame:
        d.GameIconMng.Ins.setSprite(this.icon, e.gameIcon, 120);
        this.msgLabel.string = i + "玩了你的游戏";
        break;
      case n.MsgType.hurryGame:
        d.GameIconMng.Ins.setSprite(this.icon, e.gameIcon, 120);
        this.msgLabel.string = i + "催更了你的游戏";
        break;
      case n.MsgType.buyGoods:
        h.Mng.Ins.spriteMng.setSprite(this.icon, e.goodsTextureName, 120);
        this.msgLabel.string = i + "购买了你的素材";
    }
  }
  onClick() {
    let e = this.data;
    switch (e.type) {
      case n.MsgType.collectionGame:
      case n.MsgType.thumbGame:
      case n.MsgType.playGame:
      case n.MsgType.hurryGame:
        this.enterGameCoverScene(e.gameId);
        break;
      case n.MsgType.buyGoods:
    }
  }
  enterGameCoverScene(e) {
    this.data.isNew = !1;
    this.dot.active = !1;
    l.default.ins.Enter("GameCoverScene", t => {
      t.setData(e);
      t.backAnima = l.ShiftAnima.moveRightShift;
    }, l.ShiftAnima.moveLeftShift);
    p.TGA.track("clickGameCell", {
      gameId: this.data.gameId,
      from: "MsgCell"
    });
  }
};
i([m(s.default)], f.prototype, "headIcon", void 0);
i([m(cc.Label)], f.prototype, "nameLabel", void 0);
i([m(cc.Label)], f.prototype, "msgLabel", void 0);
i([m(cc.Sprite)], f.prototype, "icon", void 0);
i([m(cc.Node)], f.prototype, "dot", void 0);
f = i([u], f);
exports.default = f;