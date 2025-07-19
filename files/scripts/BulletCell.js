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
const a = e("../../CustomUI/Button"),
  s = e("../../CustomUI/ScrollList"),
  r = e("../../Frame/SceneManager"),
  l = e("../../Frame/UIColor"),
  c = e("../../Game/Player/Mng"),
  {
    ccclass: d,
    property: h
  } = cc._decorator;
let p = class extends cc.Component {
  constructor() {
    super(...arguments);
    this.bulletSprite = null;
    this.normalNode = null;
    this.createNew = null;
    this.optionBtn = null;
    this.bulletConf = null;
    this.from = "MinePage";
  }
  onLoad() {
    this.node.on(s.default.SET_DATA, this.setData, this);
    this.node.on(s.default.ITEM_STATE_CHANGE, this.onStateChange, this);
    this.optionBtn.node.on(a.default.CLICK, this.onOptionBtnTap, this);
  }
  setData(e) {
    return n(this, void 0, void 0, function* () {
      this.bulletConf = e;
      this.createNew.active = e.createNew;
      this.bulletSprite.node.active = !e.createNew;
      e.createNew || c.Mng.Ins.spriteMng.setBullletSprite(this.bulletSprite, e.textureName, 120);
    });
  }
  onStateChange(e) {
    "MinePage" == this.from || "SelectBulletPanel" == this.from && (this.node.color = e ? l.UIColor.blue : cc.Color.WHITE);
  }
  onOptionBtnTap() {
    this.bulletConf && r.default.ins.OpenPanelByName("CommonOptionPanel", e => {
      e.setData(this.bulletConf);
    });
  }
};
i([h(cc.Sprite)], p.prototype, "bulletSprite", void 0);
i([h(cc.Node)], p.prototype, "normalNode", void 0);
i([h(cc.Node)], p.prototype, "createNew", void 0);
i([h(a.default)], p.prototype, "optionBtn", void 0);
i([h], p.prototype, "from", void 0);
p = i([d], p);
exports.default = p;