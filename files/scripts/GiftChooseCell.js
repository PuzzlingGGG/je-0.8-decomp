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
const a = e("../../CustomUI/ScrollList"),
  s = e("../../Frame/Util"),
  r = e("../../Game/Player/GiftRankMng"),
  l = e("./GiftChoosePanel"),
  {
    ccclass: c,
    property: d
  } = cc._decorator;
let h = class extends cc.Component {
  constructor() {
    super(...arguments);
    this.icon = null;
    this.nameLabel = null;
    this.priceLabel = null;
    this.bg = null;
  }
  onLoad() {
    this.node.on(a.default.ITEM_STATE_CHANGE, this.itemChange, this);
    this.node.on(a.default.SET_DATA, this.setData, this);
  }
  setData(e) {
    return n(this, void 0, void 0, function* () {
      l.default.isSetFirst || (l.default.isSetFirst = !0);
      this.bg.node.opacity = 255;
      this.nameLabel.string = e.name;
      this.priceLabel.string = e.coin + "";
      s.Util.updateLabel(this.priceLabel);
      s.Util.updateLayout(this.priceLabel.node.parent);
      r.GiftRankMng.Ins.loadSF(e.id + "").then(e => {
        this.icon.spriteFrame = e;
      });
    });
  }
  itemChange(e) {
    this.bg.node.opacity = e ? 255 : 0;
  }
};
i([d(cc.Sprite)], h.prototype, "icon", void 0);
i([d(cc.Label)], h.prototype, "nameLabel", void 0);
i([d(cc.Label)], h.prototype, "priceLabel", void 0);
i([d(cc.Sprite)], h.prototype, "bg", void 0);
h = i([c], h);
exports.default = h;