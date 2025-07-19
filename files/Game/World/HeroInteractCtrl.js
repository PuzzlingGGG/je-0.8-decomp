"use strict";

var i = this && this.__decorate || function (e, t, o, i) {
  var n,
    a = arguments.length,
    s = a < 3 ? t : null === i ? i = Object.getOwnPropertyDescriptor(t, o) : i;
  if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) s = Reflect.decorate(e, t, o, i);else for (var r = e.length - 1; r >= 0; r--) (n = e[r]) && (s = (a < 3 ? n(s) : a > 3 ? n(t, o, s) : n(t, o)) || s);
  return a > 3 && s && Object.defineProperty(t, o, s), s;
};
const n = e("../../CustomUI/Button"),
  a = e("../CollisionEmiter"),
  s = e("./Interactable"),
  {
    ccclass: r,
    property: l
  } = cc._decorator;
let c = class extends cc.Component {
  constructor() {
    super(...arguments);
    this.interactBtn = null;
    this._actor = null;
    this._curInteract = null;
    this._curDistance2 = 0;
    this._interactList = [];
  }
  onLoad() {
    this.interactBtn.node.on(n.default.CLICK, this.onInteractBtn, this);
    this.interactBtn.node.active = !1;
  }
  setHero(e) {
    this.clear();
    this._actor = e;
    if (e) {
      let e = this._actor.node.getComponent(a.default);
      e || (e = this._actor.node.addComponent(a.default));
      e.target = this._actor.node;
      this._actor.node.on(a.default.onCollisionEnter, this.onCollisionEnter, this);
      this._actor.node.on(a.default.onCollisionStay, this.onCollisionStay, this);
      this._actor.node.on(a.default.onCollisionExit, this.onCollisionExit, this);
    }
  }
  onCollisionEnter(e, t) {
    if (this._actor && t.node == this._actor.node) {
      let t = this._curInteract,
        o = e.node.getComponent(s.default);
      if (o && o.canInteract) {
        if (t) {
          let e = this._actor.node.position.sub(t.node.position);
          this._curDistance2 = e.magSqr();
        }
        if (this._curInteract != o) {
          let e = this._actor.node.position.sub(o.node.position).magSqr();
          if (null == t || e < this._curDistance2) {
            t = o;
            this._curDistance2 = e;
          }
        }
        this.switchInteract(t);
        o != this._curInteract && this._interactList.indexOf(o) < 0 && this._interactList.push(o);
      }
    }
  }
  onCollisionStay(e, t) {
    if (this._actor && t.node == this._actor.node) {
      let t = this._curInteract,
        o = e.node.getComponent(s.default);
      if (o && o.canInteract) {
        if (t) {
          let e = this._actor.node.position.sub(t.node.position);
          this._curDistance2 = e.magSqr();
        }
        if (this._curInteract != o) {
          let e = this._actor.node.position.sub(o.node.position).magSqr();
          if (null == t || e < this._curDistance2) {
            t = o;
            this._curDistance2 = e;
          }
        }
        this.switchInteract(t);
        if (o == this._curInteract) {
          let e = this._interactList.indexOf(o);
          e >= 0 && this._interactList.splice(e, 1);
        }
      }
    }
  }
  onCollisionExit(e, t) {
    if (this._actor && t.node == this._actor.node) if (this._curInteract && this._curInteract.node == e.node) {
      let e = null;
      this._interactList.length > 0 && (e = this._interactList.pop());
      this.switchInteract(e);
    } else {
      let t = e.node.getComponent(s.default);
      if (t) {
        let e = this._interactList.indexOf(t);
        e >= 0 && this._interactList.splice(e, 1);
      }
    }
  }
  switchInteract(e) {
    let t = this._actor.world;
    if (e != this._curInteract) if (e) {
      t.interactGizmos.show(e.node);
      this._curInteract = e;
      this.interactBtn.node.active = !0;
    } else {
      t.interactGizmos.hide();
      this._curInteract = null;
      this.interactBtn.node.active = !1;
    }
  }
  onInteractBtn() {
    this._curInteract && this._curInteract.node.emit(s.default.INTERACT);
  }
  clear() {
    this.interactBtn.node.active = !1;
    if (this._actor) {
      this._actor.node.off(a.default.onCollisionEnter, this.onCollisionEnter, this);
      this._actor.node.off(a.default.onCollisionExit, this.onCollisionExit, this);
      this._actor = null;
    }
    this._curInteract = null;
    this._interactList.length = 0;
  }
};
i([l(n.default)], c.prototype, "interactBtn", void 0);
c = i([r], c);
exports.default = c;