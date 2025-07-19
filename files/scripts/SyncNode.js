"use strict";

var i = this && this.__decorate || function (e, t, o, i) {
  var n,
    a = arguments.length,
    s = a < 3 ? t : null === i ? i = Object.getOwnPropertyDescriptor(t, o) : i;
  if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) s = Reflect.decorate(e, t, o, i);else for (var r = e.length - 1; r >= 0; r--) (n = e[r]) && (s = (a < 3 ? n(s) : a > 3 ? n(t, o, s) : n(t, o)) || s);
  return a > 3 && s && Object.defineProperty(t, o, s), s;
};
const {
  ccclass: n,
  property: a
} = cc._decorator;
let s = class extends cc.Component {
  constructor() {
    super(...arguments);
    this.target = null;
    this.always = !1;
  }
  onLoad() {
    if (this.target) {
      this.target.on(cc.Node.EventType.POSITION_CHANGED, () => {
        this.node.position = this.target.position;
      }, this);
      this.target.on(cc.Node.EventType.SIZE_CHANGED, () => {
        this.node.width = this.target.width;
        this.node.height = this.target.height;
      }, this);
      this.target.on(cc.Node.EventType.ANCHOR_CHANGED, () => {
        this.node.anchorX = this.target.anchorX;
        this.node.anchorY = this.target.anchorY;
      }, this);
    }
  }
  update() {
    this.always && this.sync();
  }
  sync() {
    if (this.target) {
      this.node.position = this.target.position;
      this.node.width = this.target.width;
      this.node.height = this.target.height;
      this.node.anchorX = this.target.anchorX;
      this.node.anchorY = this.target.anchorY;
    }
  }
};
i([a(cc.Node)], s.prototype, "target", void 0);
i([a], s.prototype, "always", void 0);
s = i([n], s);
exports.default = s;