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
  c = e("../../Frame/UIColor"),
  d = e("../../Game/Player/Mng"),
  h = e("../../GameData/GameTypeDefine"),
  {
    ccclass: p,
    property: u
  } = cc._decorator;
new Map([[h.Team.Hero, {
  color: c.UIColor.green,
  name: "主角"
}], [h.Team.Enemy, {
  color: c.UIColor.red,
  name: "敌人"
}], [h.Team.NPC, {
  color: c.UIColor.blue,
  name: "NPC"
}], [h.Team.Ally, {
  color: c.UIColor.yellow,
  name: "队友"
}]]);
let m = class extends cc.Component {
  constructor() {
    super(...arguments);
    this.sprite = null;
    this.optionBtn = null;
    this.createNewNode = null;
    this.spTeam = null;
    this.lbTeam = null;
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
      }) : d.Mng.Ins.spriteMng.setActorSprite(this.sprite, e.textureName, 100);
    });
  }
  onOptionBtnTap() {
    l.default.ins.OpenPanelByName("CommonOptionPanel", e => {
      e.setData(this.conf);
    });
  }
};
i([u(cc.Sprite)], m.prototype, "sprite", void 0);
i([u(s.default)], m.prototype, "optionBtn", void 0);
i([u(cc.Node)], m.prototype, "createNewNode", void 0);
i([u(cc.Sprite)], m.prototype, "spTeam", void 0);
i([u(cc.Label)], m.prototype, "lbTeam", void 0);
m = i([p], m);
exports.default = m;