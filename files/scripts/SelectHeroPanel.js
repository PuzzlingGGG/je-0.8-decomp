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
  s = e("../../CustomUI/ScrollList"),
  r = e("../../Frame/Config"),
  l = e("../../Frame/Panel"),
  c = e("../../Game/Player/Mng"),
  {
    ccclass: d,
    property: h
  } = cc._decorator;
let p = class extends l.default {
  constructor() {
    super(...arguments);
    this.titleLabel = null;
    this.list = null;
    this.btnOk = null;
    this.selectCall = null;
  }
  onLoad() {
    super.onLoad();
    this.btnOk.node.on(a.default.CLICK, this.onClickOk, this);
  }
  closeAnim(e = null) {
    e && e();
  }
  setData(e) {
    return n(this, void 0, void 0, function* () {
      let t = yield c.Mng.Ins.actorMng.loadAll(),
        o = r.Config.actorConfs.filter(e => !e.disuse),
        i = t.concat(o);
      this.list.setDataArr(i);
      let n = 0;
      e && "" != e && (n = i.findIndex(t => t.id == e)) < 0 && (n = 0);
      this.list.selectByIdx(n);
    });
  }
  onClickOk() {
    this.closePanel();
    let e = this.list.getCurData();
    e && this.selectCall && this.selectCall(e);
  }
};
i([h(cc.Label)], p.prototype, "titleLabel", void 0);
i([h(s.default)], p.prototype, "list", void 0);
i([h(a.default)], p.prototype, "btnOk", void 0);
p = i([d], p);
exports.default = p;