"use strict";

var i,
  n = this && this.__decorate || function (e, t, o, i) {
    var n,
      a = arguments.length,
      s = a < 3 ? t : null === i ? i = Object.getOwnPropertyDescriptor(t, o) : i;
    if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) s = Reflect.decorate(e, t, o, i);else for (var r = e.length - 1; r >= 0; r--) (n = e[r]) && (s = (a < 3 ? n(s) : a > 3 ? n(t, o, s) : n(t, o)) || s);
    return a > 3 && s && Object.defineProperty(t, o, s), s;
  },
  a = this && this.__awaiter || function (e, t, o, i) {
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
const s = e("../../../../i18n/i18nMgr"),
  r = e("../../../../scripts/_autogen/data/data"),
  l = e("../../../CustomUI/Button"),
  c = e("../../../CustomUI/ScrollList"),
  d = e("../../../Frame/SceneManager"),
  h = e("../../../Frame/Util"),
  p = e("../../../Game/Player/Mng"),
  u = e("../../../Game/Player/ShopMng"),
  {
    ccclass: m,
    property: f
  } = cc._decorator;
let g = i = class extends cc.Component {
  constructor() {
    super(...arguments);
    this.sprite = null;
    this.nameLabel = null;
    this.advertLabel = null;
    this.priceLabel = null;
    this.discountLabel = null;
    this.saleCntLabel = null;
    this.packageSizeLabel = null;
    this.from = "";
    this.goodsCellData = null;
    this.bk = "";
    this.st = "";
    this.discount = 1;
  }
  onLoad() {
    this.node.on(c.default.SET_DATA, this.setData, this);
    this.node.on(l.default.CLICK, this.onClick, this);
    this.setDiscount(1);
  }
  setData(e, t) {
    return a(this, void 0, void 0, function* () {
      let t = null;
      if (e instanceof r.GoodsCellData) {
        t = e;
        this.bk = "";
        this.st = "";
      } else {
        t = e.goodsCellData;
        this.bk = e.bk;
        this.st = e.st;
      }
      this.goodsCellData = t;
      this.nameLabel.string = t.name + ":";
      this.advertLabel.string = h.Util.clampStr(t.advert, 38, "..");
      this.priceLabel.string = t.price + "";
      this.saleCntLabel.string = t.saleCnt + s.I18nMgr.getI18nStringByZh("次下载");
      h.Util.updateLabel(this.nameLabel);
      h.Util.updateLabel(this.advertLabel);
      h.Util.updateLabel(this.priceLabel);
      h.Util.updateLabel(this.saleCntLabel);
      h.Util.updateAllLayout(this.node);
      this.packageSizeLabel.string = t.goodsContentCnt + "";
      p.Mng.Ins.spriteMng.setSprite(this.sprite, t.iconTextureName, 200);
    });
  }
  setDiscount(e) {
    return a(this, void 0, void 0, function* () {
      if (null != this.discountLabel) {
        this.discount = e;
        this.discountLabel.string = 10 * e + "折";
        this.discountLabel.node.parent.active = e < 1;
      }
    });
  }
  onClick() {
    return a(this, void 0, void 0, function* () {
      if (i.clickLock) return;
      i.clickLock = !0;
      let e = yield u.default.Ins.loadGoodsInfos([this.goodsCellData.id]);
      e && e[0] ? d.default.ins.OpenPanelByName("BuyGoodsPanel", t => {
        i.clickLock = !1;
        t.setData(e[0]);
        t.setDiscount(this.discount);
        t.buyCall = () => {
          cc.game.emit("RefreshShopList");
        };
      }) : i.clickLock = !1;
    });
  }
};
g.clickLock = !1;
n([f(cc.Sprite)], g.prototype, "sprite", void 0);
n([f(cc.Label)], g.prototype, "nameLabel", void 0);
n([f(cc.Label)], g.prototype, "advertLabel", void 0);
n([f(cc.Label)], g.prototype, "priceLabel", void 0);
n([f(cc.Label)], g.prototype, "discountLabel", void 0);
n([f(cc.Label)], g.prototype, "saleCntLabel", void 0);
n([f(cc.Label)], g.prototype, "packageSizeLabel", void 0);
n([f], g.prototype, "from", void 0);
g = i = n([m], g);
exports.default = g;