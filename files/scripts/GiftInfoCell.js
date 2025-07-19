"use strict";

var i = this && this.__decorate || function (e, t, o, i) {
  var n,
    a = arguments.length,
    s = a < 3 ? t : null === i ? i = Object.getOwnPropertyDescriptor(t, o) : i;
  if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) s = Reflect.decorate(e, t, o, i);else for (var r = e.length - 1; r >= 0; r--) (n = e[r]) && (s = (a < 3 ? n(s) : a > 3 ? n(t, o, s) : n(t, o)) || s);
  return a > 3 && s && Object.defineProperty(t, o, s), s;
};
exports.GiftInfoData = void 0;
const n = e("../../CustomUI/Button"),
  a = e("../../CustomUI/HeadIcon"),
  s = e("../../CustomUI/ScrollList"),
  r = e("../../Frame/SceneManager"),
  l = e("../../Frame/Top"),
  c = e("../../Frame/UIColor"),
  d = e("../../Frame/Util"),
  h = e("../../Role"),
  p = e("./GameCoverScene"),
  {
    ccclass: u,
    property: m
  } = cc._decorator;
exports.GiftInfoData = class {
  constructor(e) {
    this.userId = null;
    this.score = null;
    this.rankList = null;
    this.gameId = null;
    this.gameName = null;
    this.game = null;
    this.detail = null;
    this.detail = e;
    this.rankList = e.rankList;
    this.score = e.releaseGameData.gDGiftScoreInfo;
    this.userId = e.authorMsg.id;
    this.game = e.releaseGameData;
    this.gameId = e.releaseGameData.id;
    this.gameName = e.releaseGameData.name;
  }
};
let f = class extends cc.Component {
  constructor() {
    super(...arguments);
    this.moreBtn = null;
    this.addCoinBtn = null;
    this.headIcon = null;
    this.gameId = "";
    this.data = null;
  }
  onLoad() {
    this.node.on(s.default.SET_DATA, this.setData, this);
    this.moreBtn.node.on(n.default.CLICK, this.onMoreRank, this);
    this.addCoinBtn.node.on(n.default.CLICK, this.onAddCoin, this);
  }
  setData(e) {
    this.data = e;
    this.gameId = e.gameId;
    let t = [c.UIColor.yellow, c.UIColor.lightGray, c.UIColor.orange];
    d.Util.makeBro(this.headIcon.node, 3, (o, i) => {
      let s = e.rankList[i],
        r = o.getComponent(a.default),
        l = d.Util.searchChild(o, "crown"),
        c = d.Util.searchChild(o, "scoreLabel").getComponent(cc.Label);
      l.active = !!s;
      r.level.node.parent.active = !!s;
      r.node.targetOff(this);
      if (s) {
        r.loadUrl(s.userImg);
        r.setLevel(s.userLevel);
        r.node.on(n.default.CLICK, () => {
          this.onMoreRank();
        }, this);
        l.color = t[i];
        c.string = "+" + s.score;
      } else {
        r.loadUrl(null);
        c.string = "--";
        r.node.on(n.default.CLICK, () => {
          this.onAddCoin();
        }, this);
      }
    });
  }
  onMoreRank() {
    r.default.ins.Enter("GiftRankDetialScene", e => {
      e.init(this.data);
    }, r.ShiftAnima.moveLeftShift);
  }
  onAddCoin() {
    h.default.Ins.role.id != this.data.userId ? r.default.ins.OpenPanelByName("GiftChoosePanel", e => {
      e.init(this.gameId);
      e.closeCallback = () => {
        cc.game.emit(p.default.GameCoverScene_ReLoad);
      };
    }) : l.default.showToast("～不能给自己打赏～");
  }
  onLvUp() {}
};
i([m(cc.Button)], f.prototype, "moreBtn", void 0);
i([m(cc.Button)], f.prototype, "addCoinBtn", void 0);
i([m(a.default)], f.prototype, "headIcon", void 0);
f = i([u], f);
exports.default = f;