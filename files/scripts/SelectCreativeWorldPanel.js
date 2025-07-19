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
  s = e("../../CustomUI/Toggle"),
  r = e("../../Frame/Panel"),
  l = e("../../Frame/Util"),
  {
    ccclass: c,
    property: d
  } = cc._decorator;
let h = class extends r.default {
  constructor() {
    super(...arguments);
    this.mainToggle = null;
    this.toggle = null;
    this.tipLabel = null;
    this.okBtn = null;
    this.call = null;
  }
  onLoad() {
    super.onLoad();
    this.okBtn.node.on(a.default.CLICK, this.onOkBtn, this);
    this.mainToggle.node.on(a.default.CLICK, this.onMainToggle, this);
  }
  setData(e, t) {
    return n(this, void 0, void 0, function* () {
      l.Util.makeBro(this.toggle.node, e.length, (o, i) => {
        let n = e[i],
          a = o.getComponent(s.default);
        a.label.string = l.Util.clampStr(n.info.name, 10, "..");
        a.worldId = n.id;
        a.node.on(s.default.STATE_CHANGE, this.onToggleState, this);
        t.isOpenAll ? a.isChecked = !0 : t.isClose ? a.isChecked = !1 : a.isChecked = t.openWorldIds.includes(n.id);
      });
      this.updateTip();
    });
  }
  onMainToggle() {
    let e = this.toggle.node.parent.getComponentsInChildren(s.default);
    if (e.every(e => e.isChecked)) {
      e.forEach(e => {
        e.isChecked = !1;
      });
      this.mainToggle.icon.node.active = !1;
    } else {
      e.forEach(e => {
        e.isChecked = !0;
      });
      this.mainToggle.icon.node.active = !0;
    }
    this.updateTip();
  }
  onToggleState() {
    let e = this.toggle.node.parent.getComponentsInChildren(s.default).every(e => e.isChecked);
    this.mainToggle.icon.node.active = !!e;
    this.updateTip();
  }
  updateTip() {
    let e = this.toggle.node.parent.getComponentsInChildren(s.default).every(e => !e.isChecked);
    this.tipLabel.string = e ? "全不勾选，代表关闭创意工坊功能。" : "共享以上地图，及地图中出现的素材。";
  }
  onOkBtn() {
    this.closePanel();
    let e = this.toggle.node.parent.getComponentsInChildren(s.default),
      t = e.every(e => e.isChecked),
      o = e.every(e => !e.isChecked),
      i = [];
    e.forEach(e => {
      e.isChecked && i.push(e.worldId);
    });
    this.call && this.call({
      isOpenAll: t,
      isClose: o,
      openWorldIds: i
    });
  }
};
i([d(a.default)], h.prototype, "mainToggle", void 0);
i([d(s.default)], h.prototype, "toggle", void 0);
i([d(cc.Label)], h.prototype, "tipLabel", void 0);
i([d(a.default)], h.prototype, "okBtn", void 0);
h = i([c], h);
exports.default = h;