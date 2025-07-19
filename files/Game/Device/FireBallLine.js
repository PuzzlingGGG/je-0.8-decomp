"use strict";

var i,
  n = this && this.__decorate || function (e, t, o, i) {
    var n,
      a = arguments.length,
      s = a < 3 ? t : null === i ? i = Object.getOwnPropertyDescriptor(t, o) : i;
    if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) s = Reflect.decorate(e, t, o, i);else for (var r = e.length - 1; r >= 0; r--) (n = e[r]) && (s = (a < 3 ? n(s) : a > 3 ? n(t, o, s) : n(t, o)) || s);
    return a > 3 && s && Object.defineProperty(t, o, s), s;
  };
const a = e("../../Frame/Damager"),
  s = e("../../Frame/Util"),
  r = e("../../GameData/GameTypeDefine"),
  l = e("../Player/Mng"),
  c = e("../World/Device"),
  {
    ccclass: d,
    property: h
  } = cc._decorator;
let p = i = class extends c.default {
  constructor() {
    super(...arguments);
    this.ball = null;
    this.content = null;
    this._width = 0;
    this._height = 0;
  }
  onLoad() {
    super.onLoad();
    s.Util.makeBro(this.ball, 0);
  }
  setCutting(e) {
    if (this.content) {
      let t = this.data.extra.cnt;
      t > this.content.childrenCount && (t = this.content.childrenCount);
      for (let o = 0; o < t; ++o) this.content.children[o].active = !e;
    }
  }
  get width() {
    return this._width;
  }
  get height() {
    return this._height;
  }
  update(e) {
    if (!this.world.playing) return;
    let t = this.data.extra.speed * e;
    this.content.angle += t;
    for (let e = 0; e < this.content.childrenCount; e++) this.content.children[e].angle -= t;
  }
  setData(e, t) {
    super.setData(e, t);
    (e = this.data).extra || (e.extra = {
      speed: 300,
      dmg: 1,
      cnt: 3,
      angle: 0
    });
    this.refresh(e, t);
  }
  refresh(e, t) {
    s.Util.makeBro(this.ball, e.extra.cnt, (o, i) => {
      let n = s.Util.angleToVec2(e.extra.angle).mulSelf(50 * i);
      exports.position = n;
      let c = o.getComponent(a.default);
      c.dmg = e.extra.dmg;
      c.ignoreTeam = this.data.ignoreDmgEnemy ? r.Team.Enemy : r.Team.None;
      let d = o.getComponent(cc.Sprite);
      l.Mng.Ins.spriteMng.setDeviceSprite(d, t.textureName, 64);
    });
    this._width = this.node.width * e.extra.cnt;
    this._height = this.node.height;
  }
  initInspector(e) {
    i.initInspector(e, this.conf, this, this.data);
  }
  static initInspector(e, t, o = null, i = null) {
    let n = i || t;
    n.extra = n.extra || {
      speed: 300,
      dmg: 1,
      cnt: 3,
      angle: 0
    };
    o && e.addHead(t.name, t.textureName);
    e.addNumberEditBox("转速(度/秒)", n.extra.speed, -999999, 999999, e => {
      n.extra.speed = e;
    });
    e.addNumberEditBox("个数", n.extra.cnt, 1, 64, e => {
      n.extra.cnt = e;
      o && o.refresh(i, t);
    });
    e.addNumberEditBox("初始角度", n.extra.angle, -999999, 999999, e => {
      n.extra.angle = e;
      o && o.refresh(i, t);
    });
    e.addToggle("伤害敌人", !n.ignoreDmgEnemy, e => {
      n.ignoreDmgEnemy = !e;
    });
    e.addNumberEditBox("伤害", n.extra.dmg, 0, 999999, e => {
      n.extra.dmg = e;
    });
  }
};
n([h(cc.Node)], p.prototype, "ball", void 0);
n([h(cc.Node)], p.prototype, "content", void 0);
p = i = n([d], p);
exports.default = p;