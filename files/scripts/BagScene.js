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
  r = e("../../Frame/Scene"),
  l = e("../../Frame/SceneManager"),
  c = e("../../Game/OperationFlow"),
  {
    ccclass: d,
    property: h
  } = cc._decorator;
let p = class extends r.default {
  constructor() {
    super(...arguments);
    this.backBtn = null;
    this.list = null;
    this.emptyLabel = null;
    this.backCall = null;
  }
  onLoad() {
    this.backBtn.node.on(a.default.CLICK, this.onBackBtn, this);
    this.emptyLabel.node.active = !1;
  }
  onBackBtn() {
    l.default.ins.Back(() => {
      this.backCall && this.backCall();
    }, l.ShiftAnima.moveRightShift);
  }
  onShow(e) {
    c.OperationFlow.deelOnShow(e);
  }
  start() {
    return n(this, void 0, void 0, function* () {});
  }
};
i([h(a.default)], p.prototype, "backBtn", void 0);
i([h(s.default)], p.prototype, "list", void 0);
i([h(cc.Label)], p.prototype, "emptyLabel", void 0);
p = i([d], p);
exports.default = p;