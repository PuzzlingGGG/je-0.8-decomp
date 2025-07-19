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
  s = e("../../CustomUI/DropDownBox"),
  r = e("../../CustomUI/ScrollList"),
  l = e("../../Frame/SceneManager"),
  c = e("../../Frame/Util"),
  d = e("../../Game/Player/Mng"),
  h = e("../../GameData/GameTypeDefine"),
  {
    ccclass: p,
    property: u
  } = cc._decorator;
let m = class extends cc.Component {
  constructor() {
    super(...arguments);
    this.normalNode = null;
    this.createNode = null;
    this.deleteBtn = null;
    this.propBtn = null;
    this.advertEditBox = null;
    this.priceBtn = null;
    this.costTypeDropDownBox = null;
    this.data = null;
  }
  onLoad() {
    this.node.on(r.default.SET_DATA, this.setData, this);
    this.propBtn.node.on(a.default.CLICK, this.onPropBtn, this);
    this.priceBtn.node.on(a.default.CLICK, this.onPriceBtn, this);
    this.deleteBtn.node.on(a.default.CLICK, this.onDeleteBtn, this);
    this.costTypeDropDownBox.node.on(s.default.SELECT_CHANGE, this.onCostTypeChange, this);
  }
  setData(e) {
    return n(this, void 0, void 0, function* () {
      this.normalNode.active = !1;
      this.createNode.active = !1;
      if (e) {
        this.normalNode.active = !0;
        this.data = e;
        this.advertEditBox.string = e.advert;
        this.priceBtn.label.string = e.price + "";
        this.setProp(e.propId);
        this.setCostType(e.costType);
      } else this.createNode.active = !0;
    });
  }
  setProp(e) {
    return n(this, void 0, void 0, function* () {
      let t = yield d.Mng.Ins.propMng.loadOne(e);
      d.Mng.Ins.spriteMng.setPropSprite(this.propBtn.icon, t.textureName, 100);
    });
  }
  setCostType(e) {
    return n(this, void 0, void 0, function* () {
      let t = [{
        img: yield d.Mng.Ins.gameShopMng.getCostIconUrl(h.GameGoodsCostType.Coin),
        type: h.GameGoodsCostType.Coin
      }, {
        img: yield d.Mng.Ins.gameShopMng.getCostIconUrl(h.GameGoodsCostType.GCoin),
        type: h.GameGoodsCostType.GCoin
      }];
      this.costTypeDropDownBox.setDataArr(t);
      let o = t.findIndex(t => t.type == e);
      o >= 0 && this.costTypeDropDownBox.selectByIdx(o);
    });
  }
  onAdvertEditBoxEnd() {
    this.data.advert = this.advertEditBox.textLabel.string;
  }
  onPriceBtn() {
    l.default.ins.OpenPanelByName("NumberInputPanel", e => {
      e.setData("价格", this.data.price, e => n(this, void 0, void 0, function* () {
        e = c.Util.clamp(e, 1, 1e3);
        e = Math.round(e);
        this.data.price = e;
        this.priceBtn.label.string = e;
      }));
    });
  }
  onPropBtn() {
    l.default.ins.OpenPanelByName("SelectPropPanel", e => {
      e.setData(this.data.propId);
      e.selectCall = e => {
        if (this.data.propId != e.id) {
          this.advertEditBox.string = "";
          this.data.advert = "";
          let t = e.defaultPrice || 10;
          this.priceBtn.label.string = t + "";
          this.setCostType(h.GameGoodsCostType.Coin);
        }
        this.data.propId = e.id;
        this.setProp(e.id);
      };
    });
  }
  onDeleteBtn() {
    this.node.dispatchEvent(c.Util.customEvent("CreateGameShopCell.onDeleteBtn", !0, this.data));
  }
  onCostTypeChange(e, t, o) {
    this.data.costType = t.type;
  }
};
i([u(cc.Node)], m.prototype, "normalNode", void 0);
i([u(cc.Node)], m.prototype, "createNode", void 0);
i([u(a.default)], m.prototype, "deleteBtn", void 0);
i([u(a.default)], m.prototype, "propBtn", void 0);
i([u(cc.EditBox)], m.prototype, "advertEditBox", void 0);
i([u(a.default)], m.prototype, "priceBtn", void 0);
i([u(s.default)], m.prototype, "costTypeDropDownBox", void 0);
m = i([p], m);
exports.default = m;