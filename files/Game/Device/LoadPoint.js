"use strict";

var i,
  n = this && this.__decorate || function (e, t, o, i) {
    var n,
      a = arguments.length,
      s = a < 3 ? t : null === i ? i = Object.getOwnPropertyDescriptor(t, o) : i;
    if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) s = Reflect.decorate(e, t, o, i);else for (var r = e.length - 1; r >= 0; r--) (n = e[r]) && (s = (a < 3 ? n(s) : a > 3 ? n(t, o, s) : n(t, o)) || s);
    return a > 3 && s && Object.defineProperty(t, o, s), s;
  };
const a = e("../../Frame/SceneManager"),
  s = e("../../GameData/GameTypeDefine"),
  r = e("../Player/Mng"),
  l = e("../Player/TriggerMng"),
  c = e("../World/Device"),
  d = e("../World/Interactable"),
  {
    ccclass: h,
    property: p
  } = cc._decorator;
let u = i = class extends c.default {
  constructor() {
    super(...arguments);
    this.sprite = null;
  }
  onLoad() {
    super.onLoad();
    this.node.on(d.default.INTERACT, this.onInteract, this);
  }
  setData(e, t) {
    super.setData(e, t);
    e = this.data;
    r.Mng.Ins.spriteMng.setDeviceSprite(this.sprite, t.textureName, 64);
    e.extra || (e.extra = {
      scale: 1,
      onInteract: [{
        act: s.TriggerAct.Load
      }]
    });
    let o = this.getComponent(d.default);
    o && (exports.canInteract = !0);
    e.extra.scale = e.extra.scale || 1;
    this.node.scale = e.extra.scale;
  }
  onInteract() {
    l.default.Ins.emitTrigger(this.data.extra.onInteract, this.node);
  }
  initInspector(e) {
    i.initInspector(e, this.conf, this, this.data);
  }
  static initInspector(e, t, o = null, i = null) {
    let n = i || t;
    n.extra = n.extra || {
      scale: 1,
      onInteract: [{
        act: s.TriggerAct.Save
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
    e.addButton("存档说明：", "查看", () => {
      a.default.ins.OpenPanelByName("AboutPanel", e => {
        e.setData("存档说明", "\n    1.进入游戏不会自动读档，推荐在你的游戏大厅内放置一个读档点。\n    2.读档后，将会直接进入上次所在的地图。\n                ");
      });
    });
    e.addTrigger("点击互动时：", n.extra.onInteract, !0);
  }
};
n([p({
  override: !0,
  type: cc.Sprite
})], u.prototype, "sprite", void 0);
u = i = n([h], u);
exports.default = u;