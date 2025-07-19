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
  s = e("../../CustomUI/Slider"),
  r = e("../../Frame/Panel"),
  l = e("../../Frame/Util"),
  c = e("../../Game/Player/GameBagMng"),
  d = e("../../Game/Player/Mng"),
  h = e("../../GameData/GameTypeDefine"),
  {
    ccclass: p,
    property: u
  } = cc._decorator;
let m = class extends r.default {
  constructor() {
    super(...arguments);
    this.titleLabel = null;
    this.sprite = null;
    this.saleCntLabel = null;
    this.slider = null;
    this.saleBtn = null;
    this.call = null;
    this.data = null;
    this.prop = null;
  }
  onLoad() {
    super.onLoad();
    this.saleBtn.node.on(a.default.CLICK, this.onSaleBtn, this);
    this.slider.node.on(s.default.MOVE, this.onSliderMove, this);
  }
  setData(e) {
    return n(this, void 0, void 0, function* () {
      this.data = e;
      let t = yield d.Mng.Ins.propMng.loadOne(e.propConfId);
      this.prop = t;
      this.titleLabel.string = "Sell " + t.name;
      let o = c.default.Ins.getCnt(e.propConfId);
      this.slider.setRange(1, o);
      this.slider.step = o;
      this.slider.value = 1;
      d.Mng.Ins.spriteMng.setPropSprite(this.sprite, t.textureName, 150);
      let i = yield d.Mng.Ins.gameShopMng.getCostIconUrl(h.GameGoodsCostType.Coin);
      d.Mng.Ins.spriteMng.setPropSprite(this.saleBtn.icon, i, 50);
    });
  }
  onSliderMove(e) {
    this.saleCntLabel.string = `${e}`;
    let t = this.prop.salePrice || 1;
    this.saleBtn.label.string = `Get ${e * t}`;
  }
  onSaleBtn() {
    let e = this.slider.value || 1,
      t = c.default.Ins.getCnt(this.data.propConfId);
    e = l.Util.clamp(e, 1, t);
    this.call && this.call(e);
    this.closePanel();
  }
};
i([u(cc.Label)], m.prototype, "titleLabel", void 0);
i([u(cc.Sprite)], m.prototype, "sprite", void 0);
i([u(cc.Label)], m.prototype, "saleCntLabel", void 0);
i([u(s.default)], m.prototype, "slider", void 0);
i([u(a.default)], m.prototype, "saleBtn", void 0);
m = i([p], m);
exports.default = m;