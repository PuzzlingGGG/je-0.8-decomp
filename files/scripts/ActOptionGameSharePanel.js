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
    this.eidtBox = null;
    this.succTriggerItem = null;
    this.failTriggerItem = null;
    this.okBtn = null;
    this.call = null;
    this.evt = null;
  }
  onLoad() {
    const e = Object.create(null, {
      onLoad: {
        get: () => super.onLoad
      }
    });
    return n(this, void 0, void 0, function* () {
      e.onLoad.call(this);
      this.okBtn.node.on(a.default.CLICK, this.onOkBtn, this);
    });
  }
  setData(e) {
    return n(this, void 0, void 0, function* () {
      e = r.Util.deepCopy(e);
      this.evt = e;
      e.extra = e.extra || {
        str: "",
        onSucc: [],
        onFail: []
      };
      this.succTriggerItem.setData("分享成功时：", e.extra.onSucc, !1);
      this.failTriggerItem.setData("分享失败时：", e.extra.onFail, !1);
    });
  }
  onOkBtn() {
    this.closePanel();
    this.evt.extra.str = this.eidtBox.textLabel.string;
    this.call && this.call(this.evt);
  }
};
i([d(cc.EditBox)], h.prototype, "eidtBox", void 0);
i([d(l.default)], h.prototype, "succTriggerItem", void 0);
i([d(l.default)], h.prototype, "failTriggerItem", void 0);
i([d(a.default)], h.prototype, "okBtn", void 0);
h = i([c], h);
exports.default = h;