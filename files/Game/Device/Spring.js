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
const s = e("../CollisionEmiter"),
  r = e("../Player/Mng"),
  l = e("../World/Actor"),
  c = e("../World/Device"),
  d = e("../World/Tile"),
  {
    ccclass: h,
    property: p
  } = cc._decorator;
new cc.Vec2();
let u = i = class extends c.default {
  constructor() {
    super(...arguments);
    this.sprite = null;
    this.anim = null;
    this.bouncing = !1;
    this.testRect = cc.rect();
    this.touchingColliders = [];
  }
  onLoad() {
    this.anim = this.node.getComponent(cc.Animation);
    this.anim.on(cc.Animation.EventType.FINISHED, this.onAnimEnd, this);
    this.node.on(s.default.onCollisionEnter, this.onCollisionEnter, this);
    this.node.on(s.default.onCollisionStay, this.onCollisionStay, this);
    this.node.on(s.default.onCollisionExit, this.onCollisionExit, this);
  }
  onCollisionEnter(e, t) {
    let o = e.world.aabb,
      n = t.world.aabb,
      a = this.testRect;
    n.intersection(a, o);
    if (a.width > 0 && a.height >= 0 && o.y + o.height / 2 > n.yMax) {
      this.playBound();
      this.touchingColliders.push(e);
      let t = e.getComponent(l.default);
      if (t) {
        let e = t.PositionX - t.node.x,
          o = t.PositionY - t.node.y;
        o < 0 && (o = 0);
        t.SetPosition(t.node.x + e, t.node.y + o + a.height - 6);
        t.node.emit(i.ENTERSPRING, this.data.extra.jumpHight);
      }
    }
  }
  onCollisionStay(e, t) {
    if (!this.bouncing) return;
    let o = e.world.aabb,
      i = t.world.aabb,
      n = this.testRect;
    i.intersection(n, o);
    let a = e.getComponent(l.default);
    if (a) {
      let e = a.PositionX - a.node.x,
        t = a.PositionY - a.node.y;
      t < 0 && (t = 0);
      a.SetPosition(a.node.x + e, a.node.y + t + n.height - 6);
    }
  }
  onCollisionExit(e, t) {
    let o = this.touchingColliders.indexOf(e);
    o >= 0 && this.touchingColliders.splice(o, 1);
    let n = e.getComponent(l.default);
    n && n.node.emit(i.EXISTSPRING);
  }
  playBound() {
    if (!this.bouncing) {
      this.bouncing = !0;
      this.anim.play();
    }
  }
  onAnimEnd() {
    this.bouncing = !1;
  }
  rebound() {
    for (let e = 0; e < this.touchingColliders.length; e++) this.touchingColliders[e].node.emit(i.REBOUND, .5 * this.data.extra.jumpHight);
  }
  setData(e, t) {
    const o = Object.create(null, {
      setData: {
        get: () => super.setData
      }
    });
    return a(this, void 0, void 0, function* () {
      o.setData.call(this, e, t);
      (e = this.data).extra || (e.extra = {
        jumpHight: 3 * d.default.SIZE,
        scale: 1
      });
      e.extra.scale = e.extra.scale || 1;
      this.node.scale = e.extra.scale;
      yield r.Mng.Ins.spriteMng.setDeviceSprite(this.sprite, t.textureName, 64);
      let i = this.sprite.node.height;
      this.sprite.node.anchorY = (i - 64) / 2 / i;
    });
  }
  initInspector(e) {
    i.initInspector(e, this.conf, this, this.data);
  }
  static initInspector(e, t, o = null, i = null) {
    let n = i || t;
    n.extra = n.extra || {
      jumpHight: 3 * d.default.SIZE,
      scale: 1
    };
    o && e.addHead(t.name, t.textureName);
    e.addNumberEditBox("缩放", n.extra.scale, .2, 8, e => {
      n.extra.scale = e;
      if (o) {
        o.node.scale = e;
        o.world.placeGizmos.setScale(e);
      }
    });
    e.addNumberEditBox("反弹高度(格)", n.extra.jumpHight / d.default.SIZE, 1, 99, e => {
      n.extra.jumpHight = e * d.default.SIZE;
    });
  }
};
u.REBOUND = "REBOUND";
u.ENTERSPRING = "ENTERSPRING";
u.EXISTSPRING = "EXISTSPRING";
n([p({
  override: !0,
  type: cc.Sprite
})], u.prototype, "sprite", void 0);
u = i = n([h], u);
exports.default = u;