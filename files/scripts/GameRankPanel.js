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
const a = e("../../Frame/Panel"),
  s = e("../../Frame/Util"),
  r = e("../../Game/GameRankComp"),
  {
    ccclass: l,
    property: c
  } = cc._decorator;
let d = class extends a.default {
  setData(e, t) {
    return n(this, void 0, void 0, function* () {
      let o = yield s.Util.loadBundleRes("Prefab/GameRankComp"),
        i = cc.instantiate(o);
      this.node.insertChild(i, 0);
      i.getComponent(r.default).setData(e, t, !0);
    });
  }
};
d = i([l], d);
exports.default = d;