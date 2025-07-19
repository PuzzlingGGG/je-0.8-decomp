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
  s = e("../Player/Mng"),
  r = e("../World/AICtrl/Com/AiComDirLineMover"),
  l = e("./Platform"),
  {
    ccclass: c,
    property: d
  } = cc._decorator;
var h;
(function (e) {
  e[e.Up = 0] = "Up";
  e[e.UpLeft = 1] = "UpLeft";
  e[e.UpRight = 2] = "UpRight";
  e[e.Down = 3] = "Down";
  e[e.DownLeft = 4] = "DownLeft";
  e[e.DownRight = 5] = "DownRight";
  e[e.Left = 6] = "Left";
  e[e.Right = 7] = "Right";
})(h || (h = {}));
new cc.Vec2(), new cc.Vec2(), new cc.Vec2();
let p = i = class extends l.Platform {
  constructor() {
    super(...arguments);
    this.platform = null;
    this.content = null;
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
    a.Util.makeBro(this.platform, 0);
    this._aiMove = new r.AiComDirLineMover();
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
    this.world.playing && this._aiMove.run(e);
  }
  setData(e, t) {
    super.setData(e, t);
    (e = this.data).extra || (e.extra = {
      moveDir: h.Up,
      speed: 2,
      distance: 2,
      cnt: 3,
      cnty: 1
    });
    e.extra.cnty = e.extra.cnty || 1;
    this.refresh(e, t);
    this._aiMove.setData(this, e.extra);
  }
  refresh(e, t) {
    let o = e.extra.cnt,
      i = e.extra.cnty;
    a.Util.makeBro(this.platform, o * i, (e, i) => {
      let n = i % o,
        a = Math.floor(i / o),
        r = cc.v2(64 * n, 64 * a);
      e.position = r;
      let l = e.getComponent(cc.Sprite);
      s.Mng.Ins.spriteMng.setDeviceSprite(l, t.textureName, 64);
    });
    let n = this._boxCollider.size;
    n.width = 64 * e.extra.cnt;
    n.height = 64 * e.extra.cnty;
    this._boxCollider.size = n;
    let r = this._boxCollider.offset;
    r.x = .5 * n.width - 32;
    r.y = .5 * n.height - 32;
    this._boxCollider.offset = r;
  }
  PositionMoveDelta(e, t) {
    super.PositionMoveDelta(e, t);
    for (let o of this._onPlatformActors) o.PositionMoveDelta(e, t);
  }
  initInspector(e) {
    i.initInspector(e, this.conf, this, this.data);
  }
  static initInspector(e, t, o = null, i = null) {
    let n = i || t;
    n.extra = n.extra || {
      moveDir: h.Up,
      speed: 2,
      distance: 2,
      cnt: 3,
      cnty: 1
    };
    o && e.addHead(t.name, t.textureName);
    r.AiComDirLineMover.displayInspector(e, n.extra);
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
n([d(cc.Node)], p.prototype, "platform", void 0);
n([d(cc.Node)], p.prototype, "content", void 0);
p = i = n([c], p);
exports.default = p;