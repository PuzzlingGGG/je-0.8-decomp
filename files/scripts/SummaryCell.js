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
  s = e("../../CustomUI/ScrollList"),
  r = e("../../Frame/Util"),
  l = e("../../Game/Player/GameIconMng"),
  c = e("../../Game/Player/Mng"),
  {
    ccclass: d,
    property: h
  } = cc._decorator;
let p = class extends cc.Component {
  constructor() {
    super(...arguments);
    this.sprite = null;
    this.nameLabel = null;
    this.coinLabel = null;
    this.saleCntLabel = null;
  }
  onLoad() {
    this.node.on(s.default.SET_DATA, this.setData, this);
  }
  setData(e) {
    return n(this, void 0, void 0, function* () {
      if (e.type == a.SaleGoodsType.shopGoods) {
        this.nameLabel.string = e.name;
        this.coinLabel.string = "新增收入：" + e.earnCoin;
        this.saleCntLabel.string = "新增下载：" + e.saleCnt;
        c.Mng.Ins.spriteMng.setSprite(this.sprite, e.textureName, 120);
      } else if (e.type == a.SaleGoodsType.gameGoods) {
        this.nameLabel.string = e.name;
        this.coinLabel.string = "新增收入：" + e.earnCoin;
        this.saleCntLabel.string = "新增购买：" + e.saleCnt;
        "icon1" == e.textureName ? l.GameIconMng.Ins.setSprite(this.sprite, e.textureName, 120) : c.Mng.Ins.spriteMng.setSprite(this.sprite, e.textureName, 120);
      } else if (e.type == a.SaleGoodsType.gameReborn) {
        this.coinLabel.string = "新增收入：" + e.earnCoin;
        this.saleCntLabel.string = "复活次数" + e.saleCnt;
        let t = yield c.Mng.Ins.gameMng.loadOne(e.gameId);
        if (t) {
          this.nameLabel.string = t.name;
          c.Mng.Ins.spriteMng.setSprite(this.sprite, t.iconTextureName, 120);
        } else {
          this.nameLabel.string = "";
          c.Mng.Ins.spriteMng.setSprite(this.sprite, e.textureName, 120);
        }
      } else if (e.type == a.SaleGoodsType.gameAdvert) {
        this.coinLabel.string = "新增收入：" + e.earnCoin;
        this.saleCntLabel.string = "广告次数" + e.saleCnt;
        this.nameLabel.string = r.Util.clampStr(e.name, 9, "..");
        if (e.textureName) c.Mng.Ins.spriteMng.setSprite(this.sprite, e.textureName, 120);else {
          let t = yield c.Mng.Ins.gameMng.loadOne(e.gameId);
          t && c.Mng.Ins.spriteMng.setSprite(this.sprite, t.iconTextureName, 120);
        }
      }
    });
  }
};
i([h(cc.Sprite)], p.prototype, "sprite", void 0);
i([h(cc.Label)], p.prototype, "nameLabel", void 0);
i([h(cc.Label)], p.prototype, "coinLabel", void 0);
i([h(cc.Label)], p.prototype, "saleCntLabel", void 0);
p = i([d], p);
exports.default = p;