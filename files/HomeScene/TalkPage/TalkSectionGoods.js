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
  s = e("../../../CustomUI/ScrollList"),
  r = e("../../../Frame/SceneManager"),
  l = e("../../../Game/Player/Mng"),
  c = e("../../../Game/Player/ShopMng"),
  {
    ccclass: d,
    property: h
  } = cc._decorator;
let p = class extends cc.Component {
  constructor() {
    super(...arguments);
    this.sprite = null;
    this.nameLabel = null;
    this.priceLabel = null;
    this.cntLabel = null;
    this.data = null;
  }
  onLoad() {
    this.node.on(s.default.SET_DATA, this.setData, this);
    this.node.on(a.default.CLICK, this.onClick, this);
  }
  setData(e) {
    this.data = e;
    this.refresh();
  }
  refresh() {
    return n(this, void 0, void 0, function* () {
      let e = null;
      this.data.goodsId && (e = (yield c.default.Ins.loadGoodsCellDatas([this.data.goodsId]))[0]);
      if (e) {
        this.nameLabel.string = e.name;
        this.priceLabel.string = e.price + "";
        this.cntLabel.string = e.saleCnt + "";
        l.Mng.Ins.spriteMng.setSprite(this.sprite, e.iconTextureName, 180, 1);
      } else {
        this.nameLabel.string = "商品链接失效啦";
        this.priceLabel.string = "--";
        this.cntLabel.string = "--";
        this.sprite.spriteFrame = null;
      }
    });
  }
  onClick() {
    return n(this, void 0, void 0, function* () {
      let e = yield c.default.Ins.loadGoodsInfos([this.data.goodsId]);
      e && e[0] && r.default.ins.OpenPanelByName("BuyGoodsPanel", t => {
        t.setData(e[0]);
      });
    });
  }
  calcuH(e) {
    return this.node.height;
  }
};
i([h(cc.Sprite)], p.prototype, "sprite", void 0);
i([h(cc.Label)], p.prototype, "nameLabel", void 0);
i([h(cc.Label)], p.prototype, "priceLabel", void 0);
i([h(cc.Label)], p.prototype, "cntLabel", void 0);
p = i([d], p);
exports.default = p;