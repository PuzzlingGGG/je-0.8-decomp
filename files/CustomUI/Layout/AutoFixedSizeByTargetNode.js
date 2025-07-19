"use strict";

var i,
  n = this && this.__decorate || function (e, t, o, i) {
    var n,
      a = arguments.length,
      s = a < 3 ? t : null === i ? i = Object.getOwnPropertyDescriptor(t, o) : i;
    if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) s = Reflect.decorate(e, t, o, i);else for (var r = e.length - 1; r >= 0; r--) (n = e[r]) && (s = (a < 3 ? n(s) : a > 3 ? n(t, o, s) : n(t, o)) || s);
    return a > 3 && s && Object.defineProperty(t, o, s), s;
  };
const {
  ccclass: a,
  menu: s,
  property: r
} = cc._decorator;
let l = i = class extends cc.Component {
  constructor() {
    super(...arguments);
    this.fixedWidth = !0;
    this.fixedHeight = !1;
    this.extsize = new cc.Vec2();
    this.target = null;
    this.minWidth = 0;
    this.minHeight = 0;
    this._inited = !1;
  }
  onLoad() {
    this._inited || (this._inited = !0);
  }
  lateUpdate() {
    this.updateNodeSizeByChild(!1);
  }
  updateNodeSizeByChild(e) {
    if (e) for (let t of this.node.children) {
      if (!t.active) continue;
      let o = t.getComponent(i);
      o && o.updateNodeSizeByChild(e);
    }
    if (this.target) {
      if (this.fixedWidth) {
        let e = this.target.width > this.minWidth ? this.target.width + this.extsize.x : this.minWidth;
        this.node.width = e;
      }
      if (this.fixedHeight) {
        let e = this.target.height > this.minHeight ? this.target.height + this.extsize.y : this.minHeight;
        this.node.height = e;
      }
      return;
    }
    let t = this.node,
      o = 0,
      n = 0,
      a = 0,
      s = 0;
    for (let e = 0; e < t.childrenCount; ++e) {
      let i = t.children[e];
      if (i.active) {
        if (this.fixedWidth) {
          let t = i.x - i.width * i.anchorX,
            a = i.x + i.width * (1 - i.anchorX);
          (0 == e || o > t) && (o = t);
          (0 == e || n < a) && (n = a);
        }
        if (this.fixedHeight) {
          let t = i.y - i.height * i.anchorY,
            o = i.y + i.height * (1 - i.anchorY);
          (0 == e || a > t) && (a = t);
          (0 == e || s < o) && (s = o);
        }
      }
    }
    if (this.fixedWidth) {
      let e = n - o + this.extsize.x;
      t.width = e > this.minWidth ? e : this.minWidth;
    }
    if (this.fixedHeight) {
      let e = s - a + this.extsize.y;
      t.height = e > this.minHeight ? e : this.minHeight;
    }
  }
};
n([r], l.prototype, "fixedWidth", void 0);
n([r], l.prototype, "fixedHeight", void 0);
n([r(cc.Vec2)], l.prototype, "extsize", void 0);
n([r(cc.Node)], l.prototype, "target", void 0);
n([r], l.prototype, "minWidth", void 0);
n([r], l.prototype, "minHeight", void 0);
l = i = n([a, s("自定义UI/AutoFixedSize")], l);
exports.default = l;