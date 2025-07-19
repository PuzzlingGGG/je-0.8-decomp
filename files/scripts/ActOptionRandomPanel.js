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
  l = e("../../Frame/UIColor"),
  c = e("../../Frame/Util"),
  d = e("../../Scene/EditWorldScene/Inspector/TriggerItem"),
  h = e("../../../i18n/i18nMgr"),
  {
    ccclass: p,
    property: u
  } = cc._decorator;
let m = class extends s.default {
  constructor() {
    super(...arguments);
    this.addBtn = null;
    this.subBtn = null;
    this.bar = null;
    this.handler = null;
    this.triggerItem = null;
    this.okBtn = null;
    this.call = null;
    this.colors = [l.UIColor.green, l.UIColor.pink, l.UIColor.yellow, l.UIColor.purple];
    this.evt = null;
  }
  onLoad() {
    super.onLoad();
    this.addBtn.node.on(a.default.CLICK, this.onAddBtn, this);
    this.subBtn.node.on(a.default.CLICK, this.onSubBtn, this);
    this.okBtn.node.on(a.default.CLICK, this.onOkBtn, this);
  }
  setData(e) {
    return n(this, void 0, void 0, function* () {
      e = c.Util.deepCopy(e);
      this.evt = e;
      e.extra || (e.extra = {
        probabilitys: [{
          value: .2,
          evts: []
        }, {
          value: .8,
          evts: []
        }]
      });
      this.refresh();
    });
  }
  onAddBtn() {
    let e = this.evt.extra.probabilitys;
    if (e.length >= 4) {
      r.default.showToast("不能再多了");
      return;
    }
    let t = e[e.length - 1];
    t.value /= 2;
    e.push({
      value: t.value,
      evts: []
    });
    this.refresh();
  }
  onSubBtn() {
    let e = this.evt.extra.probabilitys;
    if (e.length <= 2) {
      r.default.showToast("不能再少了");
      return;
    }
    let t = e.pop();
    e[e.length - 1].value += t.value;
    this.refresh();
  }
  refresh() {
    let e = this.bar.parent,
      t = this.evt.extra.probabilitys,
      o = [],
      i = 0;
    c.Util.makeBro(this.bar, t.length, (n, a) => {
      let s = t[a],
        r = n.getComponentInChildren(cc.Label);
      i += s.value;
      let l = Math.round(100 * i);
      for (let e = 0; e < o.length; e++) l -= o[e];
      o.push(l);
      r.string = l + "%";
      n.width = e.width * l / 100;
      n.color = this.colors[a];
    });
    c.Util.updateAllLayout(e);
    c.Util.makeBro(this.handler, t.length - 1, (t, o) => {
      let i = e.children[o];
      t.x = i.x + i.width / 2;
      t.targetOff(this);
      t.on(cc.Node.EventType.TOUCH_MOVE, this.onTouchMove, this);
    });
    c.Util.makeBro(this.triggerItem.node, t.length, (e, i) => {
      let n = e.getComponent(d.default),
        a = t[i],
        s = o[i];
      n.setData(s + h.I18nMgr.getI18nStringByZh("执行："), a.evts, null);
    });
  }
  onTouchMove(e) {
    let t = this.bar.parent,
      o = e.target.getSiblingIndex(),
      i = this.evt.extra.probabilitys,
      n = e.getDeltaX() / t.width,
      a = i[o],
      s = i[o + 1];
    if (0 <= a.value + n && a.value + n <= 1 && 0 <= s.value - n && s.value - n <= 1) {
      a.value += n;
      s.value -= n;
      this.refresh();
    }
  }
  onOkBtn() {
    this.closePanel();
    this.call && this.call(this.evt);
  }
};
i([u(a.default)], m.prototype, "addBtn", void 0);
i([u(a.default)], m.prototype, "subBtn", void 0);
i([u(cc.Node)], m.prototype, "bar", void 0);
i([u(cc.Node)], m.prototype, "handler", void 0);
i([u(d.default)], m.prototype, "triggerItem", void 0);
i([u(a.default)], m.prototype, "okBtn", void 0);
m = i([p], m);
exports.default = m;