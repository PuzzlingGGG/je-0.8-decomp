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
const {
  ccclass: s,
  property: r
} = cc._decorator;
let l = i = class extends cc.Component {
  constructor() {
    super(...arguments);
    this.canvas = null;
    this.menuBtnPos = null;
  }
  onLoad() {
    return a(this, void 0, void 0, function* () {
      this.node.width = this.canvas.designResolution.width;
      this.node.height = this.canvas.designResolution.height;
      let e = cc.winSize,
        t = this.node.height / this.node.width,
        o = e.height / e.width;
      if (o < t) this.node.scale = o / t;else {
        this.node.height = e.height;
        this.node.width = e.width;
      }
      i.width = this.node.width;
      i.height = this.node.height;
      i.Ins = this;
    });
  }
};
l.Ins = null;
l.width = 1334;
l.height = 750;
n([r(cc.Canvas)], l.prototype, "canvas", void 0);
n([r(cc.Node)], l.prototype, "menuBtnPos", void 0);
l = i = n([s], l);
exports.default = l;