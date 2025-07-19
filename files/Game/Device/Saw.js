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
  s = e("../../GameData/GameTypeDefine"),
  r = e("../Player/Mng"),
  l = e("../World/Device"),
  {
    ccclass: c,
    property: d
  } = cc._decorator;
let h = i = class extends l.default {
  constructor() {
    super(...arguments);
    this.sprite = null;
    this.speed = 300;
    this.damager = null;
  }
  onLoad() {
    super.onLoad();
    this.damager = this.sprite.getComponent(a.default);
  }
  update(e) {
    this.world.playing && (this.sprite.node.angle += this.speed * e);
  }
  setData(e, t) {
    super.setData(e, t);
    e = this.data;
    r.Mng.Ins.spriteMng.setDeviceSprite(this.sprite, t.textureName, 64);
    e.extra || (e.extra = {
      speed: 300,
      dmg: 1,
      scale: 1
    });
    this.speed = e.extra.speed;
    this.damager.dmg = e.extra.dmg;
    this.damager.ignoreTeam = this.data.ignoreDmgEnemy ? s.Team.Enemy : s.Team.None;
    this.node.scale = e.extra.scale;
  }
  initInspector(e) {
    i.initInspector(e, this.conf, this, this.data);
  }
  static initInspector(e, t, o = null, i = null) {
    let n = i || t;
    n.extra = n.extra || {
      speed: 300,
      dmg: 1,
      scale: 1
    };
    o && e.addHead(t.name, t.textureName);
    e.addNumberEditBox("转速(度/秒)", n.extra.speed, -999999, 999999, e => {
      n.extra.speed = e;
    });
    e.addToggle("伤害敌人", !n.ignoreDmgEnemy, e => {
      n.ignoreDmgEnemy = !e;
    });
    e.addNumberEditBox("伤害", n.extra.dmg, 0, 999999, e => {
      n.extra.dmg = e;
    });
    e.addNumberEditBox("缩放", n.extra.scale, .2, 8, e => {
      n.extra.scale = e;
      if (o) {
        o.node.scale = e;
        o.world.placeGizmos.setScale(e);
      }
    });
  }
};
n([d({
  override: !0,
  type: cc.Sprite
})], h.prototype, "sprite", void 0);
h = i = n([c], h);
exports.default = h;