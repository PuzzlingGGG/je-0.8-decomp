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
  s = e("../../Frame/Config"),
  r = e("../../Frame/Panel"),
  l = e("../../Game/Player/Mng"),
  {
    ccclass: c,
    property: d
  } = cc._decorator;
let h = class extends r.default {
  constructor() {
    super(...arguments);
    this.list = null;
    this.selectCall = null;
  }
  setData(e) {
    return n(this, void 0, void 0, function* () {
      let t = yield l.Mng.Ins.actorMng.loadAll(),
        o = s.Config.actorConfs.filter(e => !e.disuse),
        i = t.concat(o);
      this.list.setDataArr(i);
      this.list.node.on(a.default.CLICK_ITEM, this.onClickCell, this);
      let n = i.findIndex(t => t.id == e);
      this.list.selectByIdx(n);
    });
  }
  onClickCell(e, t) {
    this.closePanel();
    this.selectCall && this.selectCall(t);
  }
};
i([d(a.default)], h.prototype, "list", void 0);
h = i([c], h);
exports.default = h;