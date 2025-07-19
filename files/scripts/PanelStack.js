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
const {
    ccclass: a,
    property: s
  } = cc._decorator,
  r = e("./Panel"),
  l = e("./Top"),
  c = e("./Util");
let d = class extends cc.Component {
  constructor() {
    super(...arguments);
    this.blockInput = null;
    this.stack = [];
    this.list = [];
  }
  onLoad() {
    this.blockInput.node.active = !1;
  }
  showBlockInput(e) {
    this.blockInput.node.stopAllActions();
    this.blockInput.node.opacity = 180;
    if (this.blockInput.node.active != e) if (e) {
      this.blockInput.node.active = !0;
      this.blockInput.node.opacity = 0;
      cc.tween(this.blockInput.node).to(.15, {
        opacity: 180
      }).start();
    } else {
      this.blockInput.node.opacity = 180;
      cc.tween(this.blockInput.node).to(.15, {
        opacity: 0
      }).call(() => {
        this.blockInput.node.active = !1;
      }).start();
    }
  }
  OpenByName(e, t = () => {}) {
    this.list.push({
      name: e,
      call: t
    });
    1 == this.list.length && this.checkNext();
  }
  checkNext() {
    return n(this, void 0, void 0, function* () {
      if (this.list.length > 0) {
        this.showBlockInput(!0);
        let t = this.list[0];
        l.default.showLoading("界面加载中");
        let o = yield c.Util.loadBundleRes(`Panel/${t.name}/${t.name}`);
        l.default.hideLoading();
        var e = cc.instantiate(o);
        e.name = t.name;
        e.position = cc.Vec2.ZERO;
        let i = e.getComponent(r.default);
        if (i) {
          if (this.stack.length > 0) {
            let e = this.stack[this.stack.length - 1];
            i.autoHidePrePanel && e.closeAnim();
          }
          i.panelStack = this;
          this.blockInput.node.setSiblingIndex(this.node.childrenCount - 1);
          this.node.addChild(i.node);
          this.stack.push(i);
          t.call(i);
          i.openAnim();
          this.printStack();
        } else {
          this.showBlockInput(!1);
          console.error("PanelManager: cannot find panel component on node : ");
        }
        this.list.shift();
        this.checkNext();
      }
    });
  }
  PopCurrent() {
    let e = !0;
    if (this.stack.length > 0) {
      let t = this.stack.pop();
      e = t.autoHidePrePanel;
      t.closeAnim(() => {
        t.closeCallback && t.closeCallback();
        t.panelStack = null;
        t.node.destroy();
        this.printStack();
      });
    }
    if (this.stack.length > 0) {
      let t = this.stack[this.stack.length - 1];
      this.blockInput.node.setSiblingIndex(this.node.childrenCount - 1);
      t.node.setSiblingIndex(this.node.childrenCount - 1);
      e && t.openAnim();
    } else this.showBlockInput(!1);
  }
  printStack() {
    let e = "PanelStack:";
    for (let t = 0; t < this.node.childrenCount; t++) e += this.node.children[t].name + " >> ";
    console.log(e);
  }
};
i([s(cc.BlockInputEvents)], d.prototype, "blockInput", void 0);
d = i([a], d);
exports.default = d;