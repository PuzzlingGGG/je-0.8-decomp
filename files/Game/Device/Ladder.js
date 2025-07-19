"use strict";

var i,
  n = this && this.__decorate || function (e, t, o, i) {
    var n,
      a = arguments.length,
      s = a < 3 ? t : null === i ? i = Object.getOwnPropertyDescriptor(t, o) : i;
    if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) s = Reflect.decorate(e, t, o, i);else for (var r = e.length - 1; r >= 0; r--) (n = e[r]) && (s = (a < 3 ? n(s) : a > 3 ? n(t, o, s) : n(t, o)) || s);
    return a > 3 && s && Object.defineProperty(t, o, s), s;
  };
const a = e("../../Frame/Util"),
  s = e("../CollisionEmiter"),
  r = e("../Player/Mng"),
  l = e("../World/Actor"),
  c = e("../World/Device"),
  d = e("../World/Tile"),
  h = e("../World/WorldNodeBody"),
  {
    ccclass: p,
    property: u
  } = cc._decorator;
new cc.Vec2();
let m = i = class extends c.default {
  constructor() {
    super(...arguments);
    this.ladder = null;
    this.content = null;
    this._speed = 0;
  }
  get width() {
    return this._boxCollider.size.width;
  }
  get height() {
    return this._boxCollider.size.height;
  }
  onLoad() {
    super.onLoad();
    a.Util.makeBro(this.ladder, 0);
    this._boxCollider = this.content.getComponent(cc.BoxCollider);
    this.node.on(s.default.onCollisionEnter, this.onCollisionStay, this);
    this.node.on(s.default.onCollisionStay, this.onCollisionStay, this);
    this.node.on(s.default.onCollisionExit, this.onCollisionExit, this);
  }
  setCutting(e) {
    if (this.content) {
      let t = this.data.extra.cnt;
      t > this.content.childrenCount && (t = this.content.childrenCount);
      for (let o = 0; o < t; ++o) this.content.children[o].active = !e;
    }
  }
  onCollisionStay(e, t) {
    let o = e.getComponent(l.default);
    if (o) {
      let n = e.world.aabb,
        a = t.world.aabb,
        s = .5 * (n.xMin + n.xMax),
        r = s - 5,
        l = s + 5,
        c = n.yMin,
        d = c + 5;
      if (r <= a.xMax && l >= a.xMin && c <= a.yMax && d >= a.yMin) {
        o.enterCollider(h.WorldBodyColliderType.Ladder, t);
        o.node.emit(i.INLADDER, this._speed);
      }
    }
  }
  onCollisionExit(e, t) {
    let o = e.getComponent(l.default);
    if (o) {
      o.existCollider(h.WorldBodyColliderType.Ladder, t);
      o.node.emit(i.OUTLADDER);
    }
  }
  setData(e, t) {
    super.setData(e, t);
    (e = this.data).extra || (e.extra = {
      speed: 2,
      cntx: 1,
      cnty: 3
    });
    this.refresh(e, t);
  }
  refresh(e, t) {
    let o = e.extra.cnty,
      i = e.extra.cntx;
    a.Util.makeBro(this.ladder, i * o, (e, o) => {
      let n = o % i,
        a = Math.floor(o / i),
        s = cc.v2(64 * n, 64 * a);
      e.position = s;
      let l = e.getComponent(cc.Sprite);
      r.Mng.Ins.spriteMng.setDeviceSprite(l, t.textureName, 64);
    });
    let n = this._boxCollider.size;
    n.width = 64 * e.extra.cntx;
    n.height = 64 * e.extra.cnty;
    this._boxCollider.size = n;
    let s = this._boxCollider.offset;
    s.x = .5 * n.width - 32;
    s.y = .5 * n.height - 32;
    this._boxCollider.offset = s;
    this._speed = e.extra.speed * d.default.SIZE;
  }
  initInspector(e) {
    i.initInspector(e, this.conf, this, this.data);
  }
  static initInspector(e, t, o = null, i = null) {
    let n = i || t;
    n.extra = n.extra || {
      speed: 2,
      cntx: 1,
      cnty: 3
    };
    o && e.addHead(t.name, t.textureName);
    e.addNumberEditBox("速度(格/秒)", n.extra.speed, -999999, 999999, e => {
      n.extra.speed = e;
    });
    e.addNumberEditBox("横向个数", n.extra.cntx, 1, 64, e => {
      n.extra.cntx = e;
      o && o.refresh(i, t);
    });
    e.addNumberEditBox("纵向个数", n.extra.cnty, 1, 64, e => {
      n.extra.cnty = e;
      o && o.refresh(i, t);
    });
  }
};
m.INLADDER = "INLADDER";
m.OUTLADDER = "OUTLADDER";
n([u(cc.Node)], m.prototype, "ladder", void 0);
n([u(cc.Node)], m.prototype, "content", void 0);
m = i = n([p], m);
exports.default = m;