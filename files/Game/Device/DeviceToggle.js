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
    this.state = !1;
  }
  onLoad() {
    super.onLoad();
    this.node.on(l.default.INTERACT, this.onInteract, this);
  }
  setData(e, t) {
    super.setData(e, t);
    (e = this.data).extra || (e.extra = {
      state: !1,
      scale: 1,
      onOpen: [],
      onClose: []
    });
    e.extra.scale = e.extra.scale || 1;
    this.setState(e.extra.state);
    this.node.scale = e.extra.scale;
    let o = this.getComponent(l.default);
    o && (exports.canInteract = !0);
  }
  setState(e) {
    this.state = e;
    e ? a.Mng.Ins.spriteMng.setDeviceSprite(this.sprite, this.conf.textureName, 64) : a.Mng.Ins.spriteMng.setDeviceSprite(this.sprite, this.conf.textureName2, 64);
  }
  onInteract() {
    this.setState(!this.state);
    this.state ? s.default.Ins.emitTrigger(this.data.extra.onOpen, this.node) : s.default.Ins.emitTrigger(this.data.extra.onClose, this.node);
  }
  initInspector(e) {
    i.initInspector(e, this.conf, this, this.data);
  }
  static initInspector(e, t, o = null, i = null) {
    let n = i || t;
    n.extra = n.extra || {
      scale: 1,
      state: !1,
      onOpen: [],
      onClose: []
    };
    o && e.addHead(t.name, t.textureName);
    e.addToggle("初始状态：", n.extra.state, e => {
      n.extra.state = e;
    });
    e.addNumberEditBox("缩放", n.extra.scale, .2, 8, e => {
      n.extra.scale = e;
    });
    e.addTrigger("打开时：", n.extra.onOpen, !0);
    e.addTrigger("关闭时：", n.extra.onClose, !0);
  }
};
n([d({
  override: !0,
  type: cc.Sprite
})], h.prototype, "sprite", void 0);
h = i = n([c], h);
exports.default = h;