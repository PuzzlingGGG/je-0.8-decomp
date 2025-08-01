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
const a = e("../BaseGainPanel/BaseGainPanel"),
  s = e("../../Game/Player/Mng"),
  {
    ccclass: r,
    menu: l,
    property: c
  } = cc._decorator;
let d = class extends a.default {
  constructor() {
    super(...arguments);
    this.id = "";
    this.nameLabel = null;
    this.cntLabel = null;
    this.sprite = null;
  }
  setData(e, t, o) {
    return n(this, void 0, void 0, function* () {
      this.id = e;
      this.gainCallback = o;
      this.cntLabel.string = "x" + t;
      let i = yield s.Mng.Ins.propMng.loadOne(e);
      this.nameLabel.string = i.name;
      yield s.Mng.Ins.spriteMng.setPropSprite(this.sprite, i.textureName, 200);
    });
  }
};
i([c(cc.Label)], d.prototype, "nameLabel", void 0);
i([c(cc.Label)], d.prototype, "cntLabel", void 0);
i([c(cc.Sprite)], d.prototype, "sprite", void 0);
d = i([r, l("面板/RewardPanel")], d);
exports.default = d;