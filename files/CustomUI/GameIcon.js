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
const a = e("../Game/Player/GameIconMng"),
  {
    ccclass: s,
    property: r
  } = cc._decorator;
let l = class extends cc.Component {
  constructor() {
    super(...arguments);
    this.sprite = null;
    this.subIcon = null;
    this.url = null;
  }
  onLoad() {
    this.showSubIcon(!1);
  }
  loadUrl(e) {
    return n(this, void 0, void 0, function* () {
      this.url = e;
      this.sprite.spriteFrame = null;
      yield a.GameIconMng.Ins.setSprite(this.sprite, e, this.node.width);
    });
  }
  showSubIcon(e) {
    return n(this, void 0, void 0, function* () {
      this.subIcon && (this.subIcon.node.active = !!e);
    });
  }
};
i([r(cc.Sprite)], l.prototype, "sprite", void 0);
i([r(cc.Sprite)], l.prototype, "subIcon", void 0);
l = i([s], l);
exports.default = l;