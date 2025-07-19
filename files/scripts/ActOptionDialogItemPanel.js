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
  r = e("../../Frame/Util"),
  l = e("../../Scene/EditWorldScene/Inspector/TriggerItem"),
  {
    ccclass: c,
    property: d
  } = cc._decorator;
let h = class extends s.default {
  constructor() {
    super(...arguments);
    this.editBox = null;
    this.triggerItem = null;
    this.okBtn = null;
    this.deleteBtn = null;
    this.okCall = null;
    this.deleteCall = null;
    this.item = null;
  }
  onLoad() {
    super.onLoad();
    this.okBtn.node.on(a.default.CLICK, this.onOkBtn, this);
    this.deleteBtn.node.on(a.default.CLICK, this.onDeleteBtn, this);
  }
  setData(e) {
    return n(this, void 0, void 0, function* () {
      e = r.Util.deepCopy(e);
      this.item = e;
      this.editBox.string = e.str;
      this.triggerItem.setData("选择此项时：", e.evts, !1);
    });
  }
  onOkBtn() {
    this.closePanel();
    this.item.str = this.editBox.string;
    this.okCall && this.okCall(this.item);
  }
  onDeleteBtn() {
    this.closePanel();
    this.deleteCall && this.deleteCall(this.item);
  }
};
i([d(cc.EditBox)], h.prototype, "editBox", void 0);
i([d(l.default)], h.prototype, "triggerItem", void 0);
i([d(a.default)], h.prototype, "okBtn", void 0);
i([d(a.default)], h.prototype, "deleteBtn", void 0);
h = i([c], h);
exports.default = h;