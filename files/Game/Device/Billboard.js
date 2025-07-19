"use strict";

var i,
  n = this && this.__decorate || function (e, t, o, i) {
    var n,
      a = arguments.length,
      s = a < 3 ? t : null === i ? i = Object.getOwnPropertyDescriptor(t, o) : i;
    if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) s = Reflect.decorate(e, t, o, i);else for (var r = e.length - 1; r >= 0; r--) (n = e[r]) && (s = (a < 3 ? n(s) : a > 3 ? n(t, o, s) : n(t, o)) || s);
    return a > 3 && s && Object.defineProperty(t, o, s), s;
  };
const a = e("../CollisionEmiter"),
  s = e("../Player/Mng"),
  r = e("../World/Device"),
  {
    ccclass: l,
    property: c
  } = cc._decorator;
let d = i = class extends r.default {
  constructor() {
    super(...arguments);
    this.boxCollider = null;
    this.bubble = null;
  }
  setCutting(e) {
    this.sprite && (this.sprite.enabled = !e);
  }
  onLoad() {
    super.onLoad();
    this.node.on(a.default.onCollisionEnter, this.onCollisionEnter, this);
    this.node.on(a.default.onCollisionExit, this.onCollisionExit, this);
  }
  clearBubble() {
    this.bubble && this.bubble.hide();
    this.bubble = null;
  }
  onCollisionEnter(e, t) {
    if (this.world.playing && this.isHeroActor(e) && this.data.extra.text) {
      this.clearBubble();
      let e = this.world;
      this.bubble = e.showTextBubble({
        parent: this.node,
        text: this.data.extra.text
      });
    }
  }
  onCollisionExit(e, t) {
    this.world.playing && this.isHeroActor(e) && this.clearBubble();
  }
  setData(e, t) {
    super.setData(e, t);
    e = this.data;
    s.Mng.Ins.spriteMng.setDeviceSprite(this.sprite, t.textureName, 64);
    e.extra || (e.extra = {
      scale: 1,
      text: "我是告示牌"
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
      text: "我是告示牌"
    };
    o && e.addHead(t.name, t.textureName);
    e.addEditBox("文字", n.extra.text, e => {
      n.extra.text = e;
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
n([c(cc.BoxCollider)], d.prototype, "boxCollider", void 0);
d = i = n([l], d);
exports.default = d;