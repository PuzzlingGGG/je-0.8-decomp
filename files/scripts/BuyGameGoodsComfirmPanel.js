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
const a = e("../../CustomUI/Button"),
  s = e("../../Frame/Panel"),
  r = e("../../Frame/SceneManager"),
  l = e("../../Game/Player/CoinMng"),
  c = e("../../Game/Player/Mng"),
  d = e("../../Scene/GameScene/GameScene"),
  {
    ccclass: h,
    property: p
  } = cc._decorator;
let u = class extends s.default {
  constructor() {
    super(...arguments);
    this.label1 = null;
    this.costIcon = null;
    this.label2 = null;
    this.sprite = null;
    this.buyBtn = null;
    this.buyCall = null;
    this.goods = null;
  }
  onLoad() {
    super.onLoad();
    this.buyBtn.node.on(a.default.CLICK, this.onBuyBtn, this);
  }
  setData(e) {
    return n(this, void 0, void 0, function* () {
      this.goods = e;
      this.label1.string = `Do you want to spend ${e.price}`;
      let t = yield c.Mng.Ins.gameShopMng.getCostIconUrl(e.costType);
      this.buyBtn.label.string = `${e.price} Buy`;
      c.Mng.Ins.spriteMng.setSprite(this.costIcon, t, 50);
      c.Mng.Ins.spriteMng.setSprite(this.buyBtn.icon, t, 60);
      let o = yield c.Mng.Ins.propMng.loadOne(e.propId);
      this.label2.string = `Buy ${o.name}?`;
      c.Mng.Ins.spriteMng.setSprite(this.sprite, o.textureName, 150);
    });
  }
  onBuyBtn() {
    return n(this, void 0, void 0, function* () {
      if (l.default.Ins.coin < this.goods.price) r.default.ins.OpenPanelByName("LackCoinPanel", e => {
        e.titleLabel.string = "Not enough G coin";
        let t = r.default.ins.findScene(d.default);
        t && e.setGameData(t.gameData);
      });else {
        this.buyCall && this.buyCall();
        this.closePanel();
      }
    });
  }
};
i([p(cc.Label)], u.prototype, "label1", void 0);
i([p(cc.Sprite)], u.prototype, "costIcon", void 0);
i([p(cc.Label)], u.prototype, "label2", void 0);
i([p(cc.Sprite)], u.prototype, "sprite", void 0);
i([p(a.default)], u.prototype, "buyBtn", void 0);
u = i([h], u);
exports.default = u;