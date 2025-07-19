"use strict";

var i = this && this.__decorate || function (e, t, o, i) {
    var n,
      a = arguments.length,
      s = a < 3 ? t : null === i ? i = Object.getOwnPropertyDescriptor(t, o) : i;
    if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) s = Reflect.decorate(e, t, o, i);else for (var r = e.length - 1; r >= 0; r--) (n = e[r]) && (s = (a < 3 ? n(s) : a > 3 ? n(t, o, s) : n(t, o)) || s);
    return a > 3 && s && Object.defineProperty(t, o, s), s;
  },
  n = this && this.__awaiter || function (e, t, o, i) {
    return new (o || (o = Promise))(function (n, a) {
      function s(e) {
        try {
          l(i.next(e));
        } catch (e) {
          a(e);
        }
      }
      function r(e) {
        try {
          l(i.throw(e));
        } catch (e) {
          a(e);
        }
      }
      function l(e) {
        e.done ? n(e.value) : (t = e.value, t instanceof o ? t : new o(function (e) {
          e(t);
        })).then(s, r);
        var t;
      }
      l((i = i.apply(e, t || [])).next());
    });
  };
const a = e("../../../i18n/i18nMgr"),
  s = e("../../CustomUI/Button"),
  r = e("../../CustomUI/ScrollList"),
  l = e("../../Frame/SceneManager"),
  c = e("../../Game/Player/Mng"),
  {
    ccclass: d,
    property: h
  } = cc._decorator;
let p = class extends cc.Component {
  constructor() {
    super(...arguments);
    this.sprite = null;
    this.optionBtn = null;
    this.createNewNode = null;
    this.conf = null;
  }
  onLoad() {
    this.node.on(r.default.SET_DATA, this.setData, this);
    this.optionBtn.node.on(s.default.CLICK, this.onOptionBtnTap, this);
  }
  setData(e) {
    return n(this, void 0, void 0, function* () {
      this.conf = e;
      this.optionBtn.node.active = !e.createNew;
      this.createNewNode.active = e.createNew;
      e.createNew ? a.I18nMgr.getSprite("createNewBtn", e => {
        cc.isValid(this.sprite) && (this.sprite.spriteFrame = e);
      }) : c.Mng.Ins.spriteMng.setPropSprite(this.sprite, e.textureName, 100);
    });
  }
  onOptionBtnTap() {
    l.default.ins.OpenPanelByName("CommonOptionPanel", e => {
      e.setData(this.conf);
    });
  }
};
i([h(cc.Sprite)], p.prototype, "sprite", void 0);
i([h(s.default)], p.prototype, "optionBtn", void 0);
i([h(cc.Node)], p.prototype, "createNewNode", void 0);
p = i([d], p);
exports.default = p;