"use strict";

var i,
  n = this && this.__decorate || function (e, t, o, i) {
    var n,
      a = arguments.length,
      s = a < 3 ? t : null === i ? i = Object.getOwnPropertyDescriptor(t, o) : i;
    if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) s = Reflect.decorate(e, t, o, i);else for (var r = e.length - 1; r >= 0; r--) (n = e[r]) && (s = (a < 3 ? n(s) : a > 3 ? n(t, o, s) : n(t, o)) || s);
    return a > 3 && s && Object.defineProperty(t, o, s), s;
  };
const a = e("../../CustomUI/CustomSpriteLine"),
  s = e("../../Frame/Util"),
  r = e("../CollisionEmiter"),
  l = e("../Player/TriggerMng"),
  c = e("../World/Device"),
  d = e("../World/Tile"),
  {
    ccclass: h,
    property: p
  } = cc._decorator;
let u = i = class extends c.default {
  constructor() {
    super(...arguments);
    this.linePrefab = null;
    this.content = null;
  }
  get width() {
    return this._boxCollider.size.width;
  }
  get height() {
    return this._boxCollider.size.height;
  }
  setCutting(e) {
    if (this.content) for (let t = 0; t < this.content.childrenCount; ++t) this.content.children[t].active = !e;
  }
  initCollider() {
    this._boxCollider = this.content.getComponent(cc.BoxCollider);
  }
  registCollider() {
    this.node.on(r.default.onCollisionEnter, this.onCollisionEnter, this);
    this.node.on(r.default.onCollisionExit, this.onCollisionExit, this);
  }
  onCollisionEnter(e, t) {
    this.world.playing && this.isHeroActor(e) && l.default.Ins.emitTrigger(this.data.extra.onActorEnter, this.node);
  }
  onCollisionExit(e, t) {
    this.world.playing && this.isHeroActor(e) && l.default.Ins.emitTrigger(this.data.extra.onActorExit, this.node);
  }
  onLoad() {
    super.onLoad();
    s.Util.makeBro(this.linePrefab.node, 0);
    this.initCollider();
    this.registCollider();
  }
  update(e) {
    this.world.playing;
  }
  setData(e, t) {
    super.setData(e, t);
    (e = this.data).extra || (e.extra = {
      width: 3 * d.default.SIZE,
      height: 3 * d.default.SIZE,
      onActorEnter: [],
      onActorExit: []
    });
    e.extra.scale = 1;
    this.refresh(e, t);
  }
  refresh(e, t) {
    let o = e.extra.width,
      i = e.extra.height;
    if (this.world.isGameScene) s.Util.makeBro(this.linePrefab.node, 0);else {
      let e = [{
        sx: 0,
        sy: 0,
        ex: o,
        ey: 0,
        len: o
      }, {
        sx: 0,
        sy: 0,
        ex: 0,
        ey: i,
        len: i
      }, {
        sx: 0,
        sy: i,
        ex: o,
        ey: i,
        len: o
      }, {
        sx: o,
        sy: 0,
        ex: o,
        ey: i,
        len: i
      }];
      s.Util.makeBro(this.linePrefab.node, e.length, (t, o) => {
        let i = e[o];
        t.getComponent(a.default).drawLine(i.sx, i.sy, i.ex, i.ey, 16, i.len);
      });
    }
    let n = this._boxCollider.size;
    n.width = o;
    n.height = i;
    this._boxCollider.size = n;
    let r = this._boxCollider.offset;
    r.x = .5 * n.width;
    r.y = .5 * n.height;
    this._boxCollider.offset = r;
  }
  initInspector(e) {
    i.initInspector(e, this.conf, this, this.data);
  }
  static initInspector(e, t, o = null, i = null) {
    let n = i || t;
    n.extra = n.extra || {
      onActorEnter: [],
      onActorExit: []
    };
    o && e.addHead(t.name, t.textureName);
    e.addNumberEditBox("宽（格）", n.extra.width / d.default.SIZE, 1, 64, e => {
      n.extra.width = e * d.default.SIZE;
      o && o.refresh(i, t);
    });
    e.addNumberEditBox("高（格）", n.extra.height / d.default.SIZE, 1, 64, e => {
      n.extra.height = e * d.default.SIZE;
      o && o.refresh(i, t);
    });
    e.addTrigger("当接触主角时：", n.extra.onActorEnter, !0);
    e.addTrigger("当主角离开时：", n.extra.onActorExit, !0);
  }
};
n([p(a.default)], u.prototype, "linePrefab", void 0);
n([p(cc.Node)], u.prototype, "content", void 0);
u = i = n([h], u);
exports.default = u;