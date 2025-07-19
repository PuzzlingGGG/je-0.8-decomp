"use strict";

var i = this && this.__decorate || function (e, t, o, i) {
  var n,
    a = arguments.length,
    s = a < 3 ? t : null === i ? i = Object.getOwnPropertyDescriptor(t, o) : i;
  if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) s = Reflect.decorate(e, t, o, i);else for (var r = e.length - 1; r >= 0; r--) (n = e[r]) && (s = (a < 3 ? n(s) : a > 3 ? n(t, o, s) : n(t, o)) || s);
  return a > 3 && s && Object.defineProperty(t, o, s), s;
};
const n = e("../../../i18n/i18nMgr"),
  a = e("../../CustomUI/Button"),
  s = e("../../Frame/Panel"),
  r = e("../../Frame/SceneManager"),
  {
    ccclass: l,
    property: c
  } = cc._decorator;
let d = class extends s.default {
  constructor() {
    super(...arguments);
    this.nameEditBox = null;
    this.introEditBox = null;
    this.sprite = null;
    this.confirmBtn = null;
    this.conf = null;
    this.confirmCall = null;
  }
  onLoad() {
    super.onLoad();
    this.confirmBtn.node.on(a.default.CLICK, this.onConfitmBtn4, this);
  }
  setData(e, t) {
    this.conf = e;
    this.nameEditBox.string = n.I18nMgr.getI18nStringByZh(e.name);
    this.introEditBox.string = e.intro;
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
    r.default.ins.Enter("PaintScene");
  }
  onConfitmBtn4() {
    let e = this.conf;
    e.name = this.nameEditBox.textLabel.string;
    e.intro = this.introEditBox.textLabel.string;
    this.confirmCall && this.confirmCall(e);
    this.closePanel();
  }
};
i([c(cc.EditBox)], d.prototype, "nameEditBox", void 0);
i([c(cc.EditBox)], d.prototype, "introEditBox", void 0);
i([c(cc.Sprite)], d.prototype, "sprite", void 0);
i([c(a.default)], d.prototype, "confirmBtn", void 0);
d = i([l], d);
exports.default = d;