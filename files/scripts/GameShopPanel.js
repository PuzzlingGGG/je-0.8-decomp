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
const a = e("../../../scripts/_autogen/data/data"),
  s = e("../../CustomUI/Button"),
  r = e("../../CustomUI/CoinBar"),
  l = e("../../CustomUI/ScrollList"),
  c = e("../../Frame/Panel"),
  d = e("../../Frame/SceneManager"),
  h = e("../../Frame/Top"),
  p = e("../../Frame/TweenUtil"),
  u = e("../../Frame/UIColor"),
  m = e("../../Frame/Util"),
  f = e("../../Game/Player/CoinMng"),
  g = e("../../Game/Player/GameBagMng"),
  y = e("../../Game/Player/Mng"),
  v = e("../../GameData/GameTypeDefine"),
  C = e("../../Scene/GameScene/GameScene"),
  {
    ccclass: _,
    property: S
  } = cc._decorator;
let I = class extends c.default {
  constructor() {
    super(...arguments);
    this.bubbleLabel = null;
    this.nameLabel = null;
    this.shopSprite = null;
    this.shopManSprite = null;
    this.heroSprite = null;
    this.goodsList = null;
    this.bagItemList = null;
    this.bagEmptyNode = null;
    this.buyBtn = null;
    this.coinCntLabel = null;
  }
  onLoad() {
    super.onLoad();
    this.goodsList.node.on(l.default.CLICK_ITEM, this.onClickGoodsItem, this);
    this.bagItemList.node.on(l.default.CLICK_ITEM, this.onClickBagItem, this);
    this.buyBtn.node.on(s.default.CLICK, this.onBuyBtn, this);
    this.buyBtn.node.active = !1;
  }
  onEnable() {
    r.default.Ins.show(200);
  }
  onDisable() {
    r.default.Ins.hide();
  }
  setData(e) {
    return n(this, void 0, void 0, function* () {
      this.nameLabel.string = e.name;
      this.bubbleLabel.node.parent.scale = 0;
      let t = yield y.Mng.Ins.actorMng.loadOne(e.actorId);
      y.Mng.Ins.spriteMng.setActorSprite(this.shopManSprite, t.textureName, 160);
      y.Mng.Ins.spriteMng.setShopSprite(this.shopSprite, e.textureName, 750);
      this.goodsList.setDataArr(e.goodses);
      this.goodsList.selectByIdx(0);
      this.updateBuyBtn();
      this.refreshBagList();
      this.bagItemList.selectByIdx(0);
      this.updateCoinLabel();
      let o = d.default.ins.findScene(C.default);
      o && o.world && o.world.hero && y.Mng.Ins.spriteMng.setActorSprite(this.heroSprite, o.world.hero.conf.textureName, 160);
      e.welcome && this.scheduleOnce(() => {
        this.showBubble(e.welcome);
      }, .5);
    });
  }
  refreshBagList() {
    let e = g.default.Ins.propList.filter(e => !g.default.Ins.isCoin(e.propConfId));
    this.bagItemList.setDataArr(e);
    this.bagEmptyNode.active = 0 == e.length;
  }
  showBubble(e) {
    this.bubbleLabel.string = e;
    m.Util.updateLabel(this.bubbleLabel);
    let t = this.bubbleLabel.node.height,
      o = this.bubbleLabel.node.parent;
    exports.height = t + 50;
    o.stopAllActions();
    exports.scale = 0;
    cc.tween(o).to(.3, {
      scaleX: -1,
      scaleY: 1
    }, {
      easing: p.Easing.backOut
    }).start();
  }
  hidBubble() {
    let e = this.bubbleLabel.node.parent;
    cc.tween(e).to(.2, {
      scaleX: 0,
      scaleY: 0
    }).start();
  }
  onClickGoodsItem(e, t) {
    return n(this, void 0, void 0, function* () {
      let e = t.advert,
        o = yield y.Mng.Ins.propMng.loadOne(t.propId);
      if (o) {
        e || (e = o.intro);
        e || (e = o.name);
      }
      e ? this.showBubble(e) : this.hidBubble();
      this.updateBuyBtn();
    });
  }
  updateBuyBtn() {
    return n(this, void 0, void 0, function* () {
      let e = this.goodsList.getCurData();
      this.buyBtn.node.active = !!e;
    });
  }
  updateCoinLabel() {
    let e = g.default.Ins.getCoinCnt();
    this.coinCntLabel.string = "x" + e;
  }
  onBuyBtn() {
    let e = this.goodsList.getCurData();
    e.costType == v.GameGoodsCostType.GCoin && d.default.ins.OpenPanelByName("BuyGameGoodsComfirmPanel", t => {
      t.setData(e);
      t.buyCall = () => n(this, void 0, void 0, function* () {
        let t = d.default.ins.findScene(C.default),
          o = yield y.Mng.Ins.propMng.loadOne(e.propId);
        (yield f.default.Ins.requestCostCoinInGame(a.SaleGoodsType.gameGoods, e.price, t.gameData.id, o.name, o.textureName)) ? d.default.ins.OpenPanelByName("GainGameGoodsPanel", t => n(this, void 0, void 0, function* () {
          t.setData(e.propId, 1, () => n(this, void 0, void 0, function* () {
            g.default.Ins.add(e.propId, 1);
            this.refreshBagList();
            this.updateCoinLabel();
          }));
        })) : h.default.showToast("购买失败");
      });
    });
    e.costType == v.GameGoodsCostType.Coin && (g.default.Ins.getCoinCnt() >= e.price ? d.default.ins.OpenPanelByName("MessageBox", t => n(this, void 0, void 0, function* () {
      let o = yield y.Mng.Ins.propMng.loadOne(e.propId);
      t.label.string = `Whether to spend ${e.price} coins to buy 1 ${o.name}`;
      t.setLeftBtn({
        text: "点错了",
        color: u.UIColor.blue
      });
      t.setRightBtn({
        text: "购买",
        color: u.UIColor.green,
        call: () => n(this, void 0, void 0, function* () {
          d.default.ins.OpenPanelByName("GainGameGoodsPanel", t => n(this, void 0, void 0, function* () {
            t.setData(e.propId, 1, () => n(this, void 0, void 0, function* () {
              g.default.Ins.costCoin(e.price);
              g.default.Ins.add(e.propId, 1);
              this.refreshBagList();
              this.updateCoinLabel();
            }));
          }));
        })
      });
    })) : this.showBubble("硬币不足！"));
  }
  onClickBagItem(e, t) {
    d.default.ins.OpenPanelByName("SaleGameBagItemPanel", e => {
      e.setData(t);
      e.call = e => n(this, void 0, void 0, function* () {
        d.default.ins.OpenPanelByName("GainGameGoodsPanel", o => n(this, void 0, void 0, function* () {
          let i = ((yield y.Mng.Ins.propMng.loadOne(t.propConfId)).salePrice || 1) * e;
          o.setData(g.default.Ins.coinPropId, i, () => n(this, void 0, void 0, function* () {
            g.default.Ins.addCoin(i);
            g.default.Ins.sub(t.propConfId, e);
            this.refreshBagList();
            this.updateCoinLabel();
          }));
        }));
      });
    });
  }
};
i([S(cc.Label)], I.prototype, "bubbleLabel", void 0);
i([S(cc.Label)], I.prototype, "nameLabel", void 0);
i([S(cc.Sprite)], I.prototype, "shopSprite", void 0);
i([S(cc.Sprite)], I.prototype, "shopManSprite", void 0);
i([S(cc.Sprite)], I.prototype, "heroSprite", void 0);
i([S(l.default)], I.prototype, "goodsList", void 0);
i([S(l.default)], I.prototype, "bagItemList", void 0);
i([S(cc.Node)], I.prototype, "bagEmptyNode", void 0);
i([S(s.default)], I.prototype, "buyBtn", void 0);
i([S(cc.Label)], I.prototype, "coinCntLabel", void 0);
I = i([_], I);
exports.default = I;