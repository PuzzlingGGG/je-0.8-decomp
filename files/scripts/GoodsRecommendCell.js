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
  l = e("../../../Frame/Util"),
  c = e("../../../Game/Player/Mng"),
  d = e("../../../Game/Player/RcmdMng"),
  h = e("../../../Game/Player/ShopMng"),
  {
    ccclass: p,
    property: u
  } = cc._decorator;
let m = class extends cc.Component {
  constructor() {
    super(...arguments);
    this.btn = null;
    this.data = null;
  }
  onLoad() {
    this.node.on(s.default.SET_DATA, this.setData, this);
  }
  setData(e) {
    return n(this, void 0, void 0, function* () {
      this.data = e;
      l.Util.makeBro(this.btn.node, e.goodsInfoList.length, (t, o) => {
        let i = e.goodsInfoList[o];
        d.default.Ins.goodsShow(i.id, "GoodsRecommendCell");
        let n = t.getComponent(a.default);
        c.Mng.Ins.spriteMng.setSprite(n.icon, i.iconTextureName, 130);
        n.label.string = "" + Math.ceil(.6 * i.price);
        n.node.off(a.default.CLICK, this.onClick, this);
        n.node.on(a.default.CLICK, this.onClick, this);
      });
    });
  }
  onClick(e) {
    return n(this, void 0, void 0, function* () {
      let t = e.target.parent.getSiblingIndex(),
        o = this.data.goodsInfoList[t],
        i = yield h.default.Ins.loadGoodsInfos([o.id]);
      i && i[0] && r.default.ins.OpenPanelByName("BuyGoodsPanel", e => {
        e.setData(i[0]);
        e.setDiscount(.6);
        e.buyCall = () => {
          cc.game.emit("RefreshShopList");
        };
      });
    });
  }
};
i([u(a.default)], m.prototype, "btn", void 0);
m = i([p], m);
exports.default = m;