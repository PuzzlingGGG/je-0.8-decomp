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
exports.ShiftAnima = void 0;
const {
    ccclass: s,
    property: r
  } = cc._decorator,
  l = e("./Scene"),
  c = e("./ScreenRect"),
  d = e("./Util"),
  h = e("./CrossPlatform"),
  p = e("./Top");
let u = i = class extends cc.Component {
  constructor() {
    super(...arguments);
    this.stack = [];
    this.curScene = null;
    this.firstScene = "";
    this.homeScene = "";
    this.content = null;
    this.blockInput = null;
    this.prefabCache = new Map();
  }
  onLoad() {
    i.ins = this;
    for (let e = 0; e < this.content.childrenCount; e++) this.content.children[e].active = !1;
    h.crossPlatform.onShow(this.onShow.bind(this));
    h.crossPlatform.onHide(this.onHide.bind(this));
    this.blockInput.node.active = !1;
    this.Enter(this.firstScene);
  }
  Enter(e, t = null, o = m.simpleShift) {
    return a(this, void 0, void 0, function* () {
      let i = yield this.createScene(e);
      if (i) {
        this.shiftScene(i, o);
        this.stack.push(i);
        t && t(i);
      }
    });
  }
  Back(e = null, t = m.simpleShift) {
    return a(this, void 0, void 0, function* () {
      if (this.stack.length >= 2) {
        let o = this.stack.pop(),
          i = this.stack[this.stack.length - 1];
        this.shiftScene(i, t, () => {
          o.node.destroy();
        });
        e && e(i);
      } else console.error("前面没有场景了!");
    });
  }
  BackTo(e, t = null, o = m.simpleShift) {
    let i = this.stack.pop();
    for (; this.stack.length > 1 && e != this.stack[this.stack.length - 1].node.name;) this.stack.pop().destroy();
    let n = this.stack[this.stack.length - 1];
    this.shiftScene(n, o, () => {
      i.node.destroy();
    });
    t && t(n);
  }
  shiftScene(e, t, o = null) {
    let i = this.curScene;
    this.curScene = e;
    this.blockInput.node.active = !0;
    t(i, e, () => {
      i && i.onExitScene();
      e.onEnterScene();
      this.printState();
      o && o();
      this.blockInput.node.active = !1;
    });
    return e;
  }
  createScene(e) {
    return a(this, void 0, void 0, function* () {
      p.default.showLoading("界面加载中");
      let t = this.prefabCache.get(e);
      if (!t) {
        if (!(t = yield d.Util.loadBundleRes("Scene/" + e + "/" + e))) {
          p.default.hideLoading("界面加载失败");
          return;
        }
        this.prefabCache.set(e, t);
      }
      var o = cc.instantiate(t);
      exports.name = e;
      exports.position = cc.Vec2.ZERO;
      exports.active = !1;
      let i = o.getComponent(l.default);
      i ? this.content.addChild(i.node, 0) : cc.error("这个场景有问题！：" + e);
      p.default.hideLoading();
      return i;
    });
  }
  findScene(e) {
    for (let t = this.stack.length - 1; t >= 0; t--) {
      let o = this.stack[t].getComponent(e);
      if (o) return o;
    }
  }
  OpenPanelByName(e, t = () => {}) {
    this.curScene.OpenPanelByName(e, t);
  }
  pushPanel(e, t = null, o = !1) {
    this.curScene.pushPanel(e, t, o);
  }
  pushCall(e = null, t = !1) {
    this.curScene.pushCall(e, t);
  }
  checkNextPanel() {
    this.curScene.checkNextPanel();
  }
  popPanel() {
    this.curScene && this.curScene.panelStack && this.curScene.panelStack.PopCurrent();
  }
  printState() {
    let e = "\n++++++++++++SceneManager++++++++++++\n+ stack: ";
    for (let t = 0; t < this.stack.length; t++) e += " >> " + this.stack[t];
    e += "\n+ cache: ";
    for (let t = 0; t < this.content.childrenCount; t++) e += `${t}:${this.content.children[t].name},`;
    e += "\n++++++++++++++++++++++++++++++++++++\n";
    console.log(e);
  }
  onShow(e) {
    console.log("onShow", e);
    this.curScene && this.curScene.onShow(e);
  }
  onHide(e) {
    console.log("onHide", e);
    this.curScene && this.curScene.onHide(e);
  }
};
u.ins = null;
n([r], u.prototype, "firstScene", void 0);
n([r], u.prototype, "homeScene", void 0);
n([r(cc.Node)], u.prototype, "content", void 0);
n([r(cc.BlockInputEvents)], u.prototype, "blockInput", void 0);
u = i = n([s], u);
exports.default = u;
var m;
(function (e) {
  e.simpleShift = function (e, t, o) {
    e && (e.node.active = !1);
    if (t) {
      t.node.active = !0;
      t.node.position = cc.Vec2.ZERO;
    }
    o();
  };
  e.moveLeftShift = function (e, t, o) {
    if (e) {
      e.node.position = cc.v2(0, 0);
      cc.tween(e.node).to(.5, {
        position: cc.v2(.25 * -c.default.width, 0)
      }, {
        easing: "quintOut"
      }).call(() => {
        e.node.active = !1;
      }).start();
    }
    if (t) {
      let e = t.node.getComponent(cc.Widget);
      if (e) {
        e.updateAlignment();
        e.enabled = !1;
      }
      t.node.position = cc.v2(c.default.width, 0);
      t.node.active = !0;
      cc.tween(t.node).to(.5, {
        position: cc.v2(0, 0)
      }, {
        easing: "quintOut"
      }).call(() => {
        o();
      }).start();
    }
  };
  e.moveRightShift = function (e, t, o) {
    if (e) {
      e.node.position = cc.v2(0, 0);
      cc.tween(e.node).to(.5, {
        position: cc.v2(c.default.width, 0)
      }, {
        easing: "quintOut"
      }).call(() => {
        e.node.active = !1;
      }).start();
    }
    if (t) {
      let e = t.node.getComponent(cc.Widget);
      if (e) {
        e.updateAlignment();
        e.enabled = !1;
      }
      t.node.position = cc.v2(.25 * -c.default.width, 0);
      t.node.active = !0;
      cc.tween(t.node).to(.5, {
        position: cc.v2(0, 0)
      }, {
        easing: "quintOut"
      }).call(() => {
        o();
      }).start();
    }
  };
  e.moveUpShift = function (e, t, o) {
    if (e) {
      e.node.position = cc.v2(0, 0);
      cc.tween(e.node).to(.5, {
        position: cc.v2(0, c.default.height)
      }, {
        easing: "quintOut"
      }).call(() => {
        e.node.active = !1;
      }).start();
    }
    if (t) {
      let e = t.node.getComponent(cc.Widget);
      if (e) {
        e.updateAlignment();
        e.enabled = !1;
      }
      t.node.position = cc.v2(0, -c.default.height);
      t.node.active = !0;
      cc.tween(t.node).to(.5, {
        position: cc.v2(0, 0)
      }, {
        easing: "quintOut"
      }).call(() => {
        o();
      }).start();
    }
  };
  e.moveDownShift = function (e, t, o) {
    if (e) {
      e.node.position = cc.v2(0, 0);
      cc.tween(e.node).to(.5, {
        position: cc.v2(0, -c.default.height)
      }, {
        easing: "quintOut"
      }).call(() => {
        e.node.active = !1;
      }).start();
    }
    if (t) {
      let e = t.node.getComponent(cc.Widget);
      if (e) {
        e.updateAlignment();
        e.enabled = !1;
      }
      t.node.position = cc.v2(0, c.default.height);
      t.node.active = !0;
      cc.tween(t.node).to(.5, {
        position: cc.v2(0, 0)
      }, {
        easing: "quintOut"
      }).call(() => {
        o();
      }).start();
    }
  };
  e.scaleShift = function (e, t, o) {
    if (e) {
      e.node.scale = 1;
      cc.tween(e.node).to(1, {
        scale: 0
      }).call(() => {
        e.node.active = !1;
      }).start();
    }
    if (t) {
      e.node.scale = 0;
      t.node.active = !0;
      cc.tween(t.node).delay(1).to(1e3, {
        scale: 1
      }).call(() => {
        o();
      }).start();
    }
  };
  e.blackShift = function (e, t, o) {
    return a(this, void 0, void 0, function* () {
      let i = new cc.Node();
      i.color = cc.Color.BLACK;
      let n = i.addComponent(cc.Sprite),
        a = yield d.Util.loadBundleRes("Atlas/UI/white", cc.SpriteFrame);
      n.spriteFrame = a;
      i.width = e.node.width;
      i.height = e.node.height;
      i.opacity = 0;
      e.node.addChild(i);
      cc.tween(i).to(.15, {
        opacity: 255
      }).call(() => {
        e.node.active = !1;
        i.removeFromParent();
        t.node.addChild(i);
        t.node.active = !0;
      }).to(.15, {
        opacity: 0
      }).call(() => {
        i.removeFromParent();
        o();
      }).start();
    });
  };
})(m = o.ShiftAnima || (exports.ShiftAnima = {}));