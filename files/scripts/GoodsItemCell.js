"use strict";

var i = this && this.__decorate || function (e, t, o, i) {
  var n,
    a = arguments.length,
    s = a < 3 ? t : null === i ? i = Object.getOwnPropertyDescriptor(t, o) : i;
  if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) s = Reflect.decorate(e, t, o, i);else for (var r = e.length - 1; r >= 0; r--) (n = e[r]) && (s = (a < 3 ? n(s) : a > 3 ? n(t, o, s) : n(t, o)) || s);
  return a > 3 && s && Object.defineProperty(t, o, s), s;
};
const n = e("../../CustomUI/Button"),
  a = e("../../CustomUI/ScrollList"),
  s = e("../../Frame/SceneManager"),
  r = e("../../Frame/Util"),
  l = e("../../Game/Player/Mng"),
  {
    ccclass: c,
    property: d
  } = cc._decorator;
let h = class extends cc.Component {
  constructor() {
    super(...arguments);
    this.label = null;
    this.sprite = null;
    this.typeLabel = null;
    this.conf = null;
  }
  onLoad() {
    this.node.on(a.default.SET_DATA, this.setData, this);
    this.node.on(n.default.CLICK, this.onClick, this);
  }
  setData(e) {
    if (e && e.conf) {
      this.conf = e.conf;
      this.label.string = r.Util.clampStr(e.conf.name, 6, "..");
      l.Mng.Ins.spriteMng.setSprite(this.sprite, e.conf.textureName, 120);
      let t = e.conf.typeName;
      this.typeLabel.node.active = !!t;
      this.typeLabel.string = t;
      r.Util.updateLabel(this.typeLabel);
      this.typeLabel.node.parent.width = this.typeLabel.node.width + 20;
    }
  }
  onClick() {
    s.default.ins.OpenPanelByName("ImagePreviewPanel", e => {
      e.setData(this.conf.name, this.conf.textureName);
    });
  }
};
i([d(cc.Label)], h.prototype, "label", void 0);
i([d(cc.Sprite)], h.prototype, "sprite", void 0);
i([d(cc.Label)], h.prototype, "typeLabel", void 0);
h = i([c], h);
exports.default = h;