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
  s = e("../../CustomUI/DropDownBox"),
  r = e("../../Frame/Panel"),
  l = e("../../Frame/SceneManager"),
  c = e("../../GameData/GameTypeDefine"),
  {
    ccclass: d,
    property: h
  } = cc._decorator;
let p = class extends r.default {
  constructor() {
    super(...arguments);
    this.nameEditBox = null;
    this.sprite = null;
    this.actorTypeBox = null;
    this.confirmBtn = null;
    this.conf = null;
    this.confirmCall = null;
  }
  onLoad() {
    super.onLoad();
    this.confirmBtn.node.on(a.default.CLICK, this.onConfitmBtn1, this);
    let e = [{
      str: "主角",
      type: c.Team.Hero
    }, {
      str: "敌人",
      type: c.Team.Enemy
    }, {
      str: "NPC",
      type: c.Team.NPC
    }, {
      str: "队友",
      type: c.Team.Ally
    }];
    this.actorTypeBox.setDataArr(e);
    this.actorTypeBox.node.on(s.default.SELECT_CHANGE, this.onTypeStateChange, this);
  }
  onTypeStateChange(e, t, o) {
    o && (this.conf.team = t.type);
  }
  setData(e, t) {
    this.conf = e;
    this.nameEditBox.string = n.I18nMgr.getI18nStringByZh(e.name);
    this.conf.team = c.Team.Hero;
    this.actorTypeBox.selectByIdx(0);
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
    l.default.ins.Enter("PaintScene");
  }
  onConfitmBtn1() {
    let e = this.conf;
    e.name = this.nameEditBox.textLabel.string;
    this.confirmCall && this.confirmCall(e);
    this.closePanel();
  }
};
i([h(cc.EditBox)], p.prototype, "nameEditBox", void 0);
i([h(cc.Sprite)], p.prototype, "sprite", void 0);
i([h(s.default)], p.prototype, "actorTypeBox", void 0);
i([h(a.default)], p.prototype, "confirmBtn", void 0);
p = i([d], p);
exports.default = p;