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
  l = e("../../Game/Player/Mng"),
  {
    ccclass: c,
    property: d
  } = cc._decorator;
let h = class extends cc.Component {
  constructor() {
    super(...arguments);
    this.sprite = null;
    this.select = null;
    this.optionBtn = null;
    this.createNew = null;
    this.conf = null;
  }
  onLoad() {
    this.node.on(s.default.SET_DATA, this.setData, this);
    this.node.on(s.default.ITEM_STATE_CHANGE, this.onSelectStateChange, this);
    this.optionBtn.node.on(a.default.CLICK, this.onOptionBtnTap, this);
  }
  setData(e) {
    return n(this, void 0, void 0, function* () {
      this.conf = e;
      this.optionBtn.node.active = !e.createNew;
      if (e.createNew) this.createNew.active = !0;else {
        this.createNew.active = !1;
        l.Mng.Ins.spriteMng.setTileSprite(this.sprite, e.textureName, this.node.width);
      }
    });
  }
  onSelectStateChange(e) {
    this.select.active = e;
  }
  onOptionBtnTap() {
    r.default.ins.OpenPanelByName("CommonOptionPanel", e => {
      e.setData(this.conf);
    });
  }
};
i([d(cc.Sprite)], h.prototype, "sprite", void 0);
i([d(cc.Node)], h.prototype, "select", void 0);
i([d(a.default)], h.prototype, "optionBtn", void 0);
i([d(cc.Node)], h.prototype, "createNew", void 0);
h = i([c], h);
exports.default = h;