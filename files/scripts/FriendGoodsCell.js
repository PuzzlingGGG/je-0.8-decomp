"use strict";

var i,
  n = this && this.__decorate || function (e, t, o, i) {
    var n,
      a = arguments.length,
      s = a < 3 ? t : null === i ? i = Object.getOwnPropertyDescriptor(t, o) : i;
    if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) s = Reflect.decorate(e, t, o, i);else for (var r = e.length - 1; r >= 0; r--) (n = e[r]) && (s = (a < 3 ? n(s) : a > 3 ? n(t, o, s) : n(t, o)) || s);
    return a > 3 && s && Object.defineProperty(t, o, s), s;
  };
const a = e("../../CustomUI/Button"),
  s = e("../../CustomUI/ScrollList"),
  r = e("../../Frame/SceneManager"),
  l = e("../../Game/Player/Mng"),
  c = e("../../Game/Player/RcmdMng"),
  {
    ccclass: d,
    property: h
  } = cc._decorator;
let p = i = class extends cc.Component {
  constructor() {
    super(...arguments);
    this.sprite = null;
    this.nameLabel = null;
    this.priceLabel = null;
    this.saleCntLabel = null;
    this.buyBtn = null;
    this.info = null;
  }
  onLoad() {
    this.node.on(s.default.SET_DATA, this.setData, this);
    this.node.on(a.default.CLICK, this.onBuyBtn, this);
  }
  setData(e) {
    this.info = e;
    c.default.Ins.goodsShow(e.id, "FriendGameCell");
    this.nameLabel.string = e.name;
    this.priceLabel.string = e.price + "";
    this.saleCntLabel.string = e.saleCnt + "";
    l.Mng.Ins.spriteMng.setSprite(this.sprite, e.iconTextureName, 160);
  }
  onBuyBtn() {
    if (!i.clickLock) {
      i.clickLock = !0;
      r.default.ins.OpenPanelByName("BuyGoodsPanel", e => {
        i.clickLock = !1;
        e.setData(this.info);
      });
    }
  }
};
p.clickLock = !1;
n([h(cc.Sprite)], p.prototype, "sprite", void 0);
n([h(cc.Label)], p.prototype, "nameLabel", void 0);
n([h(cc.Label)], p.prototype, "priceLabel", void 0);
n([h(cc.Label)], p.prototype, "saleCntLabel", void 0);
n([h(a.default)], p.prototype, "buyBtn", void 0);
p = i = n([d], p);
exports.default = p;