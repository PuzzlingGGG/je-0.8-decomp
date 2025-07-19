"use strict";

var i,
  n = this && this.__decorate || function (e, t, o, i) {
    var n,
      a = arguments.length,
      s = a < 3 ? t : null === i ? i = Object.getOwnPropertyDescriptor(t, o) : i;
    if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) s = Reflect.decorate(e, t, o, i);else for (var r = e.length - 1; r >= 0; r--) (n = e[r]) && (s = (a < 3 ? n(s) : a > 3 ? n(t, o, s) : n(t, o)) || s);
    return a > 3 && s && Object.defineProperty(t, o, s), s;
  };
const a = e("../../GameData/GameTypeDefine"),
  s = e("../Player/Mng"),
  r = e("../Player/TriggerMng"),
  l = e("../World/Device"),
  {
    ccclass: c,
    property: d
  } = cc._decorator;
let h = i = class extends l.default {
  constructor() {
    super(...arguments);
    this.sprite = null;
  }
  onCollisionEnter(e, t) {
    this.world.playing && this.isHeroActor(e) && r.default.Ins.emitTrigger(this.data.extra.onActorEnter, this.node);
  }
  isHeroActor(e) {
    return this.world.isHeroActor(e.node);
  }
  setData(e, t) {
    super.setData(e, t);
    e = this.data;
    s.Mng.Ins.spriteMng.setDeviceSprite(this.sprite, t.textureName, 64);
    e.extra || (e.extra = {
      scale: 1,
      onActorEnter: [{
        act: a.TriggerAct.GameWin,
        extra: {
          str: "恭喜过关!"
        }
      }]
    });
    e.extra.scale = e.extra.scale || 1;
    this.node.scale = e.extra.scale;
  }
  initInspector(e) {
    i.initInspector(e, this.conf, this, this.data);
  }
  static initInspector(e, t, o = null, i = null) {
    let n = i || t;
    n.extra = n.extra || {
      scale: 1,
      onActorEnter: [{
        act: a.TriggerAct.GameWin,
        extra: {
          str: "恭喜过关!"
        }
      }]
    };
    o && e.addHead(t.name, t.textureName);
    e.addNumberEditBox("缩放", n.extra.scale, .2, 8, e => {
      n.extra.scale = e;
      if (o) {
        o.node.scale = e;
        o.world.placeGizmos.setScale(e);
      }
    });
    e.addTrigger("当接触主角时：", n.extra.onActorEnter, !0);
  }
};
n([d({
  override: !0,
  type: cc.Sprite
})], h.prototype, "sprite", void 0);
h = i = n([c], h);
exports.default = h;