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
  r = e("../../Frame/Util"),
  l = e("../../Game/Player/GuideMng"),
  {
    ccclass: c,
    property: d
  } = cc._decorator;
let h = class extends cc.Component {
  constructor() {
    super(...arguments);
    this.titleLabel = null;
    this.stateLabel = null;
    this.btn = null;
    this.data = null;
  }
  onLoad() {
    this.node.on(s.default.SET_DATA, this.setData, this);
    this.btn.node.on(a.default.CLICK, this.onClick, this);
  }
  setData(e) {
    return n(this, void 0, void 0, function* () {
      this.data = e;
      this.titleLabel.string = e.title;
      let t = l.default.Ins.isComplete(e.id);
      this.stateLabel.node.active = t;
      this.btn.node.active = !t;
    });
  }
  onClick() {
    this.node.dispatchEvent(r.Util.customEvent("closePanel"));
    l.default.Ins.doGuide(this.data.id);
  }
};
i([d(cc.Label)], h.prototype, "titleLabel", void 0);
i([d(cc.Label)], h.prototype, "stateLabel", void 0);
i([d(a.default)], h.prototype, "btn", void 0);
h = i([c], h);
exports.default = h;