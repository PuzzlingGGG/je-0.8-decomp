"use strict";

var i,
  n = this && this.__decorate || function (e, t, o, i) {
    var n,
      a = arguments.length,
      s = a < 3 ? t : null === i ? i = Object.getOwnPropertyDescriptor(t, o) : i;
    if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) s = Reflect.decorate(e, t, o, i);else for (var r = e.length - 1; r >= 0; r--) (n = e[r]) && (s = (a < 3 ? n(s) : a > 3 ? n(t, o, s) : n(t, o)) || s);
    return a > 3 && s && Object.defineProperty(t, o, s), s;
  };
const a = e("../Player/Mng"),
  s = e("../Player/TriggerMng"),
  r = e("../World/Device"),
  l = e("../World/Interactable"),
  {
    ccclass: c,
    property: d
  } = cc._decorator;
let h = i = class extends r.default {
  constructor() {
    super(...arguments);
    this.sprite = null;
  }
  onLoad() {
    super.onLoad();
    this.node.on(l.default.INTERACT, this.onInteract, this);
  }
  setData(e, t) {
    super.setData(e, t);
    e = this.data;
    a.Mng.Ins.spriteMng.setDeviceSprite(this.sprite, t.textureName, 64);
    e.extra || (e.extra = {
      scale: 1,
      onInteract: []
    });
    e.extra.scale = e.extra.scale || 1;
    this.node.scale = this.data.extra.scale;
    let o = this.getComponent(l.default);
    o && (exports.canInteract = !0);
  }
  onInteract() {
    s.default.Ins.emitTrigger(this.data.extra.onInteract, this.node);
  }
  initInspector(e) {
    i.initInspector(e, this.conf, this, this.data);
  }
  static initInspector(e, t, o = null, i = null) {
    let n = i || t;
    n.extra = n.extra || {
      scale: 1,
      onInteract: []
    };
    o && e.addHead(t.name, t.textureName);
    e.addNumberEditBox("缩放", n.extra.scale, .2, 8, e => {
      n.extra.scale = e;
      if (o) {
        o.node.scale = e;
        o.world.placeGizmos.setScale(e);
      }
    });
    e.addTrigger("点击时：", n.extra.onInteract, !0);
  }
};
n([d({
  override: !0,
  type: cc.Sprite
})], h.prototype, "sprite", void 0);
h = i = n([c], h);
exports.default = h;