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
const s = e("../../Frame/Damager"),
  r = e("../../Frame/Util"),
  l = e("../../GameData/GameTypeDefine"),
  c = e("../CollisionEmiter"),
  d = e("../PhyObj"),
  h = e("../Player/Mng"),
  p = e("../World/Device"),
  u = e("../World/Tile"),
  {
    ccclass: m,
    property: f
  } = cc._decorator;
var g;
(function (e) {
  e[e.idle = 0] = "idle";
  e[e.move = 1] = "move";
  e[e.waitSpawn = 2] = "waitSpawn";
})(g || (g = {}));
let y = i = class extends p.default {
  constructor() {
    super(...arguments);
    this.sprite = null;
    this.content = null;
    this.damager = null;
    this._v2_t = new cc.Vec2();
    this._rect_t = new cc.Rect();
    this._contentPhyObj = null;
    this._originPos = new cc.Vec2();
    this._timer = 0;
    this._state = g.idle;
    this._dir = new cc.Vec2();
    this._triggerRect = new cc.Rect();
    this._speed = 0;
    this._acc = 1500;
  }
  onLoad() {
    super.onLoad();
    this.damager = this.sprite.getComponent(s.default);
    this.collider = this.sprite.getComponent(cc.Collider);
    this.node.on(c.default.onCollisionEnter, this.onCollisionEnter, this);
    this.doCollisionTile = () => {
      this._state != g.waitSpawn && this.gotoState(g.waitSpawn);
    };
    this._contentPhyObj = this.content.getComponent(d.default);
    if (!this._contentPhyObj) {
      this._contentPhyObj = this.content.addComponent(d.default);
      this._contentPhyObj.needDestroy = !1;
    }
  }
  onCollisionEnter(e, t) {
    this.world.playing && this.isHeroActor(e) && this._state != g.waitSpawn && this.gotoState(g.waitSpawn);
  }
  update(e) {
    let t = this.world;
    if (t.playing) {
      this._timer > 0 && (this._timer -= e);
      switch (this._state) {
        case g.idle:
          if (this.data.extra.autoTrigger) this._timer <= 0 && this.gotoState(g.move);else {
            let e = t.hero,
              o = e.node.width * Math.abs(e.node.scale),
              i = e.node.height * e.node.scale;
            this._v2_t.set(e.node.position);
            this._v2_t.x -= this.node.x;
            this._v2_t.y -= this.node.y;
            this._v2_t.rotateSelf(-this.node.angle * Math.PI / 180);
            this._rect_t.x = this._v2_t.x - .5 * o;
            this._rect_t.y = this._v2_t.y - .5 * i;
            this._rect_t.width = o;
            this._rect_t.height = i;
            this._triggerRect.intersects(this._rect_t) && this.gotoState(g.move);
          }
          break;
        case g.move:
          {
            this.data.extra.isAcc && (this._speed += this._acc * e);
            let t = this._speed * e,
              o = t * this._dir.x,
              i = t * this._dir.y;
            this.PositionMoveDelta(o, i);
            this._timer <= 0 && this.gotoState(g.waitSpawn);
          }
          break;
        case g.waitSpawn:
          this._timer <= 0 && this.spawn();
      }
    }
  }
  gotoState(e) {
    let t = this.world;
    switch (e) {
      case g.idle:
        this.node.setPosition(this._originPos);
        this.SetPosition(this._originPos.x, this._originPos.y);
        this.damager.enabled = !0;
        this.content.parent = this.node;
        this.content.active = !0;
        this.content.opacity = 255;
        this.content.angle = 0;
        this.content.x = 0;
        this.content.y = 0;
        this.content.scale = 1;
        this._timer = this.data.extra.autoTimer || .01;
        break;
      case g.move:
        this.data.extra.isAcc ? this._speed = 0 : this._speed = this.data.extra.speed || 300;
        this._timer = 30;
        break;
      case g.waitSpawn:
        this.scheduleOnce(() => {
          this.damager.enabled = !1;
        }, .01);
        this._timer = this.data.extra.respawnTimer;
        if (t.worldLayout.type == l.WorldType.Jump) {
          this.content.parent = this.content.parent.parent;
          this.content.x = this.node.x;
          this.content.y = this.node.y;
          this.content.angle = this.node.angle;
          this.content.scale = this.node.scale;
          this._contentPhyObj.fly(r.Util.randomInt(-100, 100), r.Util.randomInt(200, 300), r.Util.randomInt(-300, 300));
        }
        this._contentPhyObj.fadeOut();
    }
    this._state = e;
  }
  spawn() {
    this.gotoState(g.idle);
  }
  static initExtra(e) {
    e || (e = {
      autoTrigger: !1,
      autoTimer: 1,
      isAcc: !1,
      speed: 4 * u.default.SIZE,
      acc: 20 * u.default.SIZE,
      respawnTimer: 2,
      dmg: 1,
      scale: 1,
      checkDistance: 10 * u.default.SIZE
    });
    return e;
  }
  setData(e, t) {
    const o = Object.create(null, {
      setData: {
        get: () => super.setData
      }
    });
    return a(this, void 0, void 0, function* () {
      o.setData.call(this, e, t);
      e = this.data;
      this._originPos.set(this.node.position);
      e.extra = i.initExtra(e.extra);
      this.data.ignoreDmgEnemy = !0;
      yield h.Mng.Ins.spriteMng.setDeviceSprite(this.sprite, t.textureName, 64);
      this.node.height;
      this.node.scale = this.data.extra.scale;
      this.damager.dmg = e.extra.dmg;
      this.damager.ignoreTeam = this.data.ignoreDmgEnemy ? l.Team.Enemy : l.Team.None;
      this._acc = this.data.extra.acc || 1500;
      this._dir.x = 0;
      this._dir.y = -1;
      this._dir.rotateSelf(this.node.angle * Math.PI / 180);
      let n = this.node.width * this.node.scale,
        a = this.node.height * this.node.scale;
      this._triggerRect.x = .5 * -n;
      this._triggerRect.y = .5 * -a - this.data.extra.checkDistance;
      this._triggerRect.width = n;
      this._triggerRect.height = n + this.data.extra.checkDistance;
      this.gotoState(g.idle);
    });
  }
  initInspector(e) {
    i.initInspector(e, this.conf, this, this.data);
  }
  static initInspector(e, t, o = null, i = null) {
    let n = i || t;
    n.extra = n.extra || {
      autoTrigger: !1,
      autoTimer: 1,
      isAcc: !1,
      speed: 4 * u.default.SIZE,
      acc: 20 * u.default.SIZE,
      respawnTimer: 2,
      dmg: 1,
      scale: 1,
      checkDistance: 10 * u.default.SIZE
    };
    o && e.addHead(t.name, t.textureName);
    e.addNumberEditBox("重生时间(秒)", n.extra.respawnTimer, 0, 999, e => {
      n.extra.respawnTimer = e;
    });
    e.addNumberEditBox("检测距离(格)", n.extra.checkDistance / u.default.SIZE, 1, 999, e => {
      n.extra.checkDistance = e * u.default.SIZE;
    });
    let a = null;
    e.addToggle("自动掉落", n.extra.autoTrigger, e => {
      n.extra.autoTrigger = e;
      a && (a.node.active = e);
    });
    (a = e.addNumberEditBox("自动掉落延时(秒)", n.extra.autoTimer, .01, 999, e => {
      n.extra.autoTimer = e;
    })).node.active = n.extra.autoTrigger;
    let s = null;
    e.addToggle("加速模式", n.extra.isAcc, e => {
      n.extra.isAcc = e;
      if (s) {
        s.node.active = e;
        s.node.active = !e;
      }
    });
    (s = e.addNumberEditBox("加速度(格/秒)", n.extra.acc / u.default.SIZE, .1, 99, e => {
      n.extra.acc = e * u.default.SIZE;
    })).node.active = n.extra.isAcc;
    e.addNumberEditBox("速度(格/秒)", n.extra.speed / u.default.SIZE, .1, 99, e => {
      n.extra.speed = e * u.default.SIZE;
    });
    s.node.active = !n.extra.isAcc;
    e.addNumberEditBox("缩放", n.extra.scale, .2, 8, e => {
      n.extra.scale = e;
      if (o) {
        o.node.scale = n.extra.scale;
        o.world.placeGizmos.setScale(e);
      }
    });
    e.addNumberEditBox("伤害", n.extra.dmg, 0, 999999, e => {
      n.extra.dmg = e;
    });
  }
};
n([f({
  override: !0,
  type: cc.Sprite
})], y.prototype, "sprite", void 0);
n([f(cc.Node)], y.prototype, "content", void 0);
y = i = n([m], y);
exports.default = y;