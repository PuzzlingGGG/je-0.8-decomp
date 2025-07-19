"use strict";

var i = this && this.__decorate || function (e, t, o, i) {
  var n,
    a = arguments.length,
    s = a < 3 ? t : null === i ? i = Object.getOwnPropertyDescriptor(t, o) : i;
  if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) s = Reflect.decorate(e, t, o, i);else for (var r = e.length - 1; r >= 0; r--) (n = e[r]) && (s = (a < 3 ? n(s) : a > 3 ? n(t, o, s) : n(t, o)) || s);
  return a > 3 && s && Object.defineProperty(t, o, s), s;
};
const n = e("../../CustomUI/Button"),
  a = e("../../Frame/Panel"),
  s = e("../../Frame/SceneManager"),
  {
    ccclass: r,
    property: l
  } = cc._decorator;
let c = class extends a.default {
  constructor() {
    super(...arguments);
    this.nameEditBox = null;
    this.sprite = null;
    this.confirmBtn = null;
    this.conf = null;
    this.confirmCall = null;
  }
  onLoad() {
    super.onLoad();
    this.confirmBtn.node.on(n.default.CLICK, this.onConfitmBtn5, this);
  }
  setData(e, t) {
    this.conf = e;
    this.nameEditBox.string = e.name;
    this.setSpriteByPixels(t);
  }
  setSpriteByPixels(e) {
    let t = new cc.RenderTexture();
    t.setFilters(cc.Texture2D.Filter.NEAREST, cc.Texture2D.Filter.NEAREST);
    t.initWithData(e, cc.Texture2D.PixelFormat.RGBA8888, 256, 256);
    this.sprite.spriteFrame = new cc.SpriteFrame(t);
    this.sprite.node.width = this.sprite.node.height = 192;
  }
  onPaintBtnClick() {
    s.default.ins.Enter("PaintScene");
  }
  onConfitmBtn5() {
    let e = this.conf;
    e.name = this.nameEditBox.textLabel.string;
    this.confirmCall && this.confirmCall(e);
    this.closePanel();
  }
};
i([l(cc.EditBox)], c.prototype, "nameEditBox", void 0);
i([l(cc.Sprite)], c.prototype, "sprite", void 0);
i([l(n.default)], c.prototype, "confirmBtn", void 0);
c = i([r], c);
exports.default = c;