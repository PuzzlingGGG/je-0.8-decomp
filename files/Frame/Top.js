"use strict";

var i,
  n = this && this.__decorate || function (e, t, o, i) {
    var n,
      a = arguments.length,
      s = a < 3 ? t : null === i ? i = Object.getOwnPropertyDescriptor(t, o) : i;
    if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) s = Reflect.decorate(e, t, o, i);else for (var r = e.length - 1; r >= 0; r--) (n = e[r]) && (s = (a < 3 ? n(s) : a > 3 ? n(t, o, s) : n(t, o)) || s);
    return a > 3 && s && Object.defineProperty(t, o, s), s;
  },
  a = this && this.__awaiter || function (e, t, o, i) {
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
const s = e("./Util"),
  r = e("./DataBind"),
  l = e("../CustomUI/Button"),
  c = e("./UIColor"),
  d = e("../../i18n/i18nMgr"),
  {
    ccclass: h,
    property: p
  } = cc._decorator;
let u = i = class extends r.DB.DataBindComponent {
  constructor() {
    super(...arguments);
    this.block = null;
    this.toastPrefab = null;
    this.loading = null;
    this.menu = null;
  }
  onLoad() {
    i.ins = this;
    i.node = this.node;
    this.toastPrefab.active = !1;
    this.loading.active = !1;
    this.menu.active = !1;
    this.block = this.getComponent(cc.BlockInputEvents);
    i.blockInput(!1);
  }
  static blockInput(e = !0, t = "normal") {
    if (!i.ins) return;
    let o = this.blockKeys.indexOf(t);
    e && o < 0 ? this.blockKeys.push(t) : !e && o >= 0 && this.blockKeys.splice(o, 1);
    i.ins.block.enabled = 0 != this.blockKeys.length;
  }
  static isBlocking() {
    return i.ins.block.enabled;
  }
  static tempBlockInput(e) {
    this.blockInput(!0);
    i.ins.scheduleOnce(() => {
      this.blockInput(!1);
    }, e);
  }
  static showToast(e) {
    let t = cc.instantiate(this.ins.toastPrefab);
    t.active = !0;
    t.getComponentInChildren(cc.Label).string = d.I18nMgr.getI18nStringByZh(e);
    i.ins.node.addChild(t);
    t.opacity = 0;
    t.y = -20;
    cc.tween(t).to(.1, {
      opacity: 255,
      y: 0
    }).delay(1.5).to(.1, {
      opacity: 0,
      y: 20
    }).call(() => {
      i.ins.node.removeChild(t);
    }).start();
  }
  static showLoading(e) {
    if (!i.ins) return;
    i.blockInput(!0, "loading");
    let t = i.ins.loading;
    t.active = !0;
    t.getComponentInChildren(cc.Label).string = e;
  }
  static hideLoading(e = null) {
    i.ins.loading.active = !1;
    i.blockInput(!1, "loading");
    e && i.showToast(e);
  }
  static showMenu(e, t) {
    if (t.length < 0) return;
    let o = i.ins.menu;
    exports.active = !0;
    exports.position = s.Util.convertPosition(e, o.parent, cc.v2(-e.width / 2, -e.height / 2));
    let n = o.children[0];
    i.blockInput(!0, "showMenu");
    i.node.on(cc.Node.EventType.TOUCH_END, i.hideMenu, this);
    s.Util.makeBro(n, t.length, (e, o) => a(this, void 0, void 0, function* () {
      let n = t[o],
        a = e.getComponent(l.default);
      a.label.string = d.I18nMgr.getI18nStringByZh(n.str);
      a.background.node.color = n.color || c.UIColor.blue;
      a.icon.spriteFrame = null;
      a.icon.spriteFrame = yield s.Util.loadBundleRes(n.icon.url, cc.SpriteFrame);
      a.icon.node.color = n.icon.color;
      a.icon.node.width = n.icon.w;
      a.icon.node.height = n.icon.h;
      a.node.on(l.default.CLICK, () => {
        i.hideMenu();
        n.call();
      }, this);
    }));
  }
  static hideMenu() {
    i.node.off(cc.Node.EventType.TOUCH_END, i.hideMenu, this);
    i.blockInput(!1, "showMenu");
    let e = i.ins.menu;
    e.active = !1;
    e.children.forEach(e => {
      e.targetOff(this);
    });
  }
  static showFloatLabel(e, t, o) {
    let i = t.convertToWorldSpaceAR(o.offset || cc.Vec2.ZERO);
    i = t.convertToNodeSpaceAR(i);
    let n = new cc.Node(),
      a = n.addComponent(cc.Label);
    t.addChild(n);
    n.position = i;
    a.string = e;
    a.fontSize = o.fontSize || 25;
    a.node.color = o.color || cc.Color.BLACK;
    if (o.stroke) {
      let e = n.addComponent(cc.LabelOutline);
      e.color = o.strokeColor || cc.Color.BLACK;
      e.width = o.stroke;
    }
    cc.tween(n).to(.1, {
      y: n.y + 5
    }).delay(o.duration || 1.5).to(.1, {
      y: n.y + 20,
      opacity: 0
    }).call(() => {
      n.removeFromParent();
    }).start();
    return a;
  }
  static bezierSprite(e) {
    return a(this, void 0, void 0, function* () {
      e.cnt = e.cnt || 1;
      e.time = e.time || 1;
      e.fromScale = e.fromScale || 1;
      e.toScale = e.toScale || 1;
      e.deltaT = e.deltaT || .05;
      e.color = e.color || cc.Color.WHITE;
      let t = new cc.Node(),
        o = null;
      if (e.url) o = yield s.Util.loadBundleRes(e.url, cc.SpriteFrame);else {
        if (!e.spriteFrame) throw Error("bezierSprite参数中，url和spriteFrame不能同时为空");
        o = e.spriteFrame;
      }
      for (let n = 0; n < e.cnt; n++) setTimeout(() => {
        let a = null;
        if (t) {
          a = t;
          t = null;
        } else a = new cc.Node();
        a.scale = e.fromScale;
        i.ins.node.addChild(a);
        a.addComponent(cc.Sprite).spriteFrame = o;
        let r = e.from.add(cc.v2(s.Util.randomInt(-200, 200), s.Util.randomInt(-200, 200)));
        a.position = e.from;
        a.color = e.color;
        e.onBegin && e.onBegin(n == e.cnt - 1);
        a.runAction(cc.spawn(cc.sequence(cc.bezierTo(e.time, [e.from, r, e.to]), cc.callFunc(() => {
          a.removeFromParent();
          e.onEnd && e.onEnd(n == e.cnt - 1);
        })), cc.scaleTo(e.time, e.toScale)));
      }, n * e.deltaT * 1e3);
      return t;
    });
  }
  static bezierNode(e) {
    e.time = e.time || 1;
    e.targetScale = e.targetScale || e.node.scale;
    e.parentNode = e.parentNode || i.node;
    let t = e.node;
    if (t.parent) {
      let o = s.Util.convertPosition(t, e.parentNode);
      t.removeFromParent();
      e.parentNode.addChild(t);
      t.position = o;
    } else e.parentNode.addChild(t);
    let o = t.position,
      n = null;
    if (e.dCtrlPos) n = o.add(e.dCtrlPos);else {
      let e = 200;
      n = o.add(cc.v2(s.Util.randomInt(-e, e), s.Util.randomInt(-e, e)));
    }
    e.onBegin && e.onBegin();
    let a = s.Util.convertPosition(e.targetNode, i.node);
    t.runAction(cc.sequence(cc.spawn(cc.bezierTo(e.time, [o, n, a]), cc.scaleTo(e.time, e.targetScale)), cc.callFunc(() => {
      t.removeFromParent();
      e.onEnd && e.onEnd();
    })));
    return t;
  }
};
u.ins = null;
u.node = null;
u.blockKeys = [];
n([p(cc.Node)], u.prototype, "toastPrefab", void 0);
n([p(cc.Node)], u.prototype, "loading", void 0);
n([p(cc.Node)], u.prototype, "menu", void 0);
u = i = n([h], u);
exports.default = u;