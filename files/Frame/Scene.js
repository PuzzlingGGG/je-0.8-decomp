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
  r = e("./DataBind"),
  l = e("./PanelStack"),
  c = e("./Util"),
  d = e("./PanelQueue"),
  h = e("./SceneManager");
let p = class extends r.DB.DataBindComponent {
  constructor() {
    super(...arguments);
    this.panelStack = null;
    this.panelQueue = null;
    this.panelQueuePromise = null;
  }
  onLoad() {}
  onExitScene() {}
  onEnterScene() {}
  onShow(e) {}
  onHide(e) {}
  initPanelStack() {
    return n(this, void 0, void 0, function* () {
      if (!this.panelStack) {
        let e = yield c.Util.loadBundleRes("Prefab/PanelStack");
        if (this.panelStack) return this.panelStack;
        let t = cc.instantiate(e);
        this.node.addChild(t);
        this.panelStack = t.getComponent(l.default);
        this.panelStack.scene = this;
      }
      return this.panelStack;
    });
  }
  OpenPanelByName(e, t = () => {}) {
    if (this.panelStack) {
      this.panelStack.node.setSiblingIndex(this.node.childrenCount - 1);
      this.panelStack.OpenByName(e, t);
    } else this.initPanelStack().then(o => {
      o.node.setSiblingIndex(this.node.childrenCount - 1);
      o.OpenByName(e, t);
    });
  }
  PopPanel() {
    this.panelStack && h.default.ins.popPanel();
  }
  initPanelQueue() {
    if (!this.panelQueuePromise) {
      h.default.ins.blockInput.node.active = !0;
      this.panelQueuePromise = new Promise(e => n(this, void 0, void 0, function* () {
        if (this.panelQueue) {
          h.default.ins.blockInput.node.active = !1;
          e(this.panelQueue);
        } else {
          let t = yield c.Util.loadBundleRes("Prefab/PanelQueue");
          h.default.ins.blockInput.node.active = !1;
          let o = cc.instantiate(t);
          this.node.addChild(o);
          this.panelQueue = o.getComponent(d.default);
          this.panelQueue.scene = this;
          e(this.panelQueue);
        }
      }));
    }
    return this.panelQueuePromise;
  }
  pushPanel(e, t = null, o = !1) {
    if (this.panelQueue) {
      this.panelQueue.node.setSiblingIndex(this.node.childrenCount - 1);
      this.panelQueue.pushPanel(e, t, o);
    } else this.initPanelQueue().then(i => {
      i.node.setSiblingIndex(this.node.childrenCount - 1);
      i.pushPanel(e, t, o);
    });
  }
  pushCall(e = null, t = !1) {
    if (this.panelQueue) {
      this.panelQueue.node.setSiblingIndex(this.node.childrenCount - 1);
      this.panelQueue.pushCall(e, t);
    } else this.initPanelQueue().then(o => {
      o.node.setSiblingIndex(this.node.childrenCount - 1);
      o.pushCall(e, t);
    });
  }
  checkNextPanel() {
    if (this.panelQueue) {
      this.panelQueue.node.setSiblingIndex(this.node.childrenCount - 1);
      this.panelQueue.checkNext();
    } else this.initPanelQueue().then(e => {
      e.node.setSiblingIndex(this.node.childrenCount - 1);
      e.checkNext();
    });
  }
  closeCurPanel() {
    this.panelQueue && this.panelQueue.node.active && this.checkNextPanel();
    this.panelStack && this.panelStack.node.active && this.PopPanel();
  }
  closeAllPanel() {
    var e, t;
    null === (e = this.panelQueue) || void 0 === e || e.node.destroy();
    null === (t = this.panelStack) || void 0 === t || t.node.destroy();
    this.panelQueue = null;
    this.panelStack = null;
  }
};
p = i([a], p);
exports.default = p;