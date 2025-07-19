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
const a = e("./Panel"),
  s = e("./Util"),
  {
    ccclass: r,
    property: l
  } = cc._decorator;
let c = class extends cc.Component {
  constructor() {
    super();
    this.queue = [];
    this.curPanel = null;
  }
  pushPanel(e, t = null, o = !1) {
    this.pushCheckFunc((o, i) => n(this, void 0, void 0, function* () {
      let n = yield s.Util.loadBundleRes(`Panel/${e}/${e}`);
      var r = cc.instantiate(n);
      r.name = e;
      r.position = cc.Vec2.ZERO;
      let l = r.getComponent(a.default);
      if (l) {
        o(l);
        t && t(l);
      } else i();
    }), o);
  }
  pushCall(e, t = !1) {
    this.pushCheckFunc((t, o) => {
      o();
      e();
    }, t);
  }
  pushCheckFunc(e, t = !1) {
    t ? this.queue.unshift(e) : this.queue.push(e);
  }
  checkNext() {
    if (this.curPanel) {
      this.curPanel.closeCallback && this.curPanel.closeCallback();
      this.curPanel.node.removeFromParent();
      this.curPanel.node.destroy();
      this.curPanel = null;
      this.printQueue();
    }
    let e = () => {
      if (this.queue.length > 0) {
        this.node.active = !0;
        this.queue.shift()(e => {
          e.panelQueue = this;
          this.node.addChild(e.node);
          e.openAnim();
          this.curPanel = e;
          this.printQueue();
        }, () => {
          e();
        });
      } else this.node.active = !1;
    };
    e();
  }
  printQueue() {
    let e = "PanelQueue:";
    for (let t = 0; t < this.node.childrenCount; t++) e += this.node.children[t].name + " >> ";
    console.log(e);
  }
};
c = i([r], c);
exports.default = c;