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
const s = e("../../Frame/Util"),
  r = e("../Player/Mng"),
  l = e("../World/Tile"),
  c = e("./Platform"),
  {
    ccclass: d,
    property: h
  } = cc._decorator;
var p;
(function (e) {
  e[e.Left = 0] = "Left";
  e[e.Right = 1] = "Right";
  e[e.Up = 2] = "Up";
  e[e.Down = 3] = "Down";
})(p || (p = {}));
const u = new cc.Vec2(),
  m = new cc.Vec2();
let f = i = class extends c.Platform {
  constructor() {
    super(...arguments);
    this.platform = null;
    this.content = null;
    this.mask = null;
    this.edge = null;
    this.moveRoot = null;
    this._moveDir = new cc.Vec2();
    this._moveSpeed = 0;
    this._moveTarget = new cc.Vec2();
    this._moveStart = new cc.Vec2();
    this._onPlatformActors = [];
  }
  get width() {
    return this._boxCollider.size.width;
  }
  get height() {
    return this._boxCollider.size.height;
  }
  onLoad() {
    super.onLoad();
    s.Util.makeBro(this.platform, 0);
    this._moveStart.set(this.moveRoot.position);
  }
  setCutting(e) {
    if (this.content) {
      let t = this.data.extra.cnt * this.data.extra.cnty;
      t > this.content.childrenCount && (t = this.content.childrenCount);
      for (let o = 0; o < t; ++o) this.content.children[o].active = !e;
    }
  }
  initCollider() {
    this._boxCollider = this.content.getComponent(cc.BoxCollider);
  }
  onActorOnPlatform(e) {
    this._onPlatformActors.indexOf(e) < 0 && this._onPlatformActors.push(e);
  }
  onActorExistPlatform(e) {
    let t = this._onPlatformActors.indexOf(e);
    t >= 0 && this._onPlatformActors.splice(t, 1);
  }
  lateUpdate(e) {
    this.world.playing && this.updateState(e);
  }
  setData(e, t) {
    super.setData(e, t);
    (e = this.data).extra || (e.extra = {
      moveDir: p.Right,
      speed: 2.5,
      cnt: 3,
      cnty: 1
    });
    e.extra.cnty = e.extra.cnty || 1;
    this.refresh(e, t);
  }
  refresh(e, t) {
    this._moveDir.x = 0;
    this._moveDir.y = 0;
    switch (e.extra.moveDir) {
      case p.Left:
        this._moveDir.x = -1;
        break;
      case p.Right:
        this._moveDir.x = 1;
        break;
      case p.Up:
        this._moveDir.y = 1;
        break;
      case p.Down:
        this._moveDir.y = -1;
    }
    let o = e.extra.cnt + 1,
      i = e.extra.cnty + 1,
      n = this._moveDir.x > 0 ? -1 : 0,
      a = this._moveDir.y > 0 ? -1 : 0;
    s.Util.makeBro(this.platform, o * i, (e, i) => {
      let s = i % o + n,
        l = Math.floor(i / o) + a,
        c = cc.v2(64 * s, 64 * l);
      e.position = c;
      let d = e.getComponent(cc.Sprite);
      d.node.scaleX = 0 != this._moveDir.x ? this._moveDir.x : 1;
      0 != this._moveDir.y ? this._moveDir.y < 0 ? d.node.angle = 90 : d.node.angle = -90 : d.node.angle = 0;
      r.Mng.Ins.spriteMng.setDeviceSprite(d, t.textureName, 64);
    });
    let c = this._boxCollider.size;
    c.width = 64 * e.extra.cnt;
    c.height = 64 * e.extra.cnty;
    this._boxCollider.size = c;
    let d = this._boxCollider.offset;
    d.x = .5 * c.width - 32;
    d.y = .5 * c.height - 32;
    this._boxCollider.offset = d;
    this.mask.node.width = c.width;
    this.mask.node.height = c.height;
    if (0 != this._moveDir.y) {
      this.edge.node.angle = 90;
      this.edge.node.width = c.height;
      this.edge.node.height = c.width;
      this.edge.node.x = 0;
      this.edge.node.y = this.edge.node.width;
    } else {
      this.edge.node.angle = 0;
      this.edge.node.width = c.width;
      this.edge.node.height = c.height;
      this.edge.node.x = 0;
      this.edge.node.y = 0;
    }
    this._moveSpeed = e.extra.speed * l.default.SIZE;
    this.startMove();
  }
  startMove() {
    this.moveRoot.position = this._moveStart;
    cc.Vec2.scaleAndAdd(this._moveTarget, this._moveStart, this._moveDir, l.default.SIZE);
  }
  updateState(e) {
    if (this._moveSpeed <= 0) return;
    let t = this._moveSpeed * e,
      o = u;
    o.set(this.moveRoot.position);
    let i = cc.Vec2.distance(this._moveTarget, o);
    if (i <= t || i < Number.EPSILON) {
      m.set(this._moveTarget);
      this.moveRoot.position = m;
      this.startMove();
    } else {
      cc.Vec2.lerp(m, o, this._moveTarget, t / i);
      this.moveRoot.position = m;
    }
    for (let e of this._onPlatformActors) e.PositionMoveDelta(t * this._moveDir.x, t * this._moveDir.y);
  }
  initInspector(e) {
    i.initInspector(e, this.conf, this, this.data);
  }
  static initInspector(e, t, o = null, i = null) {
    let n = i || t;
    n.extra = n.extra || {
      moveDir: p.Right,
      speed: 2.5,
      cnt: 3,
      cnty: 1
    };
    o && e.addHead(t.name, t.textureName);
    let s = [{
        str: "左",
        type: p.Left
      }, {
        str: "右",
        type: p.Right
      }, {
        str: "上",
        type: p.Up
      }, {
        str: "下",
        type: p.Down
      }],
      r = s.findIndex(e => e.type == n.extra.moveDir);
    -1 == r && (r = 0);
    e.addDropDownBox("移动方向", s, r, (e, t) => a(this, void 0, void 0, function* () {
      n.extra.moveDir = t.type;
    }));
    e.addNumberEditBox("移动速度(格/秒)", n.extra.speed, 0, 99, e => {
      n.extra.speed = e;
    });
    e.addNumberEditBox("横向个数", n.extra.cnt, 1, 64, e => {
      n.extra.cnt = e;
      o && o.refresh(i, t);
    });
    e.addNumberEditBox("纵向个数", n.extra.cnty, 1, 64, e => {
      n.extra.cnty = e;
      o && o.refresh(i, t);
    });
  }
};
n([h(cc.Node)], f.prototype, "platform", void 0);
n([h(cc.Node)], f.prototype, "content", void 0);
n([h(cc.Mask)], f.prototype, "mask", void 0);
n([h(cc.Sprite)], f.prototype, "edge", void 0);
n([h(cc.Node)], f.prototype, "moveRoot", void 0);
f = i = n([d], f);
exports.default = f;