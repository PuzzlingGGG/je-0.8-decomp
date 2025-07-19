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
    this.sprite = null;
    this.editBox = null;
    this.headBtn = null;
    this.nameLabel = null;
    this._data = null;
  }
  onLoad() {
    this.node.on(s.default.SET_DATA, this.setData, this);
    this.node.on(s.default.ITEM_STATE_CHANGE, this.onStateChange, this);
    this.headBtn.node.on(a.default.CLICK, this.onHeadBtn, this);
  }
  setData(e) {
    return n(this, void 0, void 0, function* () {
      this._data = e;
      this.editBox.string = e.dialogue;
      let t = yield c.Mng.Ins.actorMng.loadOne(e.actorConfId);
      if (t) {
        this.nameLabel.string = t.name;
        c.Mng.Ins.spriteMng.setActorSprite(this.sprite, t.textureName, 120);
      } else this.nameLabel.string = "";
    });
  }
  onEditBoxTextChange() {
    this._data.dialogue = this.editBox.textLabel.string;
  }
  onStateChange(e) {
    this.node.color = e ? l.UIColor.blue : cc.color(230, 230, 230);
  }
  onHeadBtn() {
    r.default.ins.OpenPanelByName("SelectActorPanel", e => {
      e.setData(this._data.actorConfId);
      e.selectCall = e => {
        this._data.actorConfId = e.id;
        this.setData(this._data);
      };
    });
  }
};
i([h(cc.Sprite)], p.prototype, "sprite", void 0);
i([h(cc.EditBox)], p.prototype, "editBox", void 0);
i([h(a.default)], p.prototype, "headBtn", void 0);
i([h(cc.Label)], p.prototype, "nameLabel", void 0);
p = i([d], p);
exports.default = p;