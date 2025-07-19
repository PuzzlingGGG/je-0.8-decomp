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
  s = e("../../Frame/Panel"),
  r = e("../../Frame/Top"),
  {
    ccclass: l,
    property: c
  } = cc._decorator;
let d = class extends s.default {
  constructor() {
    super(...arguments);
    this.tipLabel = null;
    this.editBox = null;
    this.sumbitBtn = null;
    this.call = null;
  }
  onLoad() {
    super.onLoad();
    this.sumbitBtn.node.on(a.default.CLICK, this.onSubmitBtn, this);
  }
  onSubmitBtn() {
    return n(this, void 0, void 0, function* () {
      let e = this.editBox.textLabel.string.trim();
      if ("" != e) {
        this.call && this.call(e);
        this.closePanel();
      } else r.default.showToast("多写几个字～");
    });
  }
};
i([c(cc.Label)], d.prototype, "tipLabel", void 0);
i([c(cc.EditBox)], d.prototype, "editBox", void 0);
i([c(a.default)], d.prototype, "sumbitBtn", void 0);
d = i([l], d);
exports.default = d;