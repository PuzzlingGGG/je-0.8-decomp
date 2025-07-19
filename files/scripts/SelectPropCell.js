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
    this.propSprite = null;
    this.normalNode = null;
    this.createNew = null;
    this.noProp = null;
    this.optionBtn = null;
    this.conf = null;
  }
  onLoad() {
    this.node.on(s.default.SET_DATA, this.setData, this);
    this.node.on(s.default.ITEM_STATE_CHANGE, this.onStateChange, this);
    this.optionBtn.node.on(a.default.CLICK, this.onOptionBtnTap, this);
  }
  setData(e) {
    return n(this, void 0, void 0, function* () {
      this.conf = e;
      this.createNew.active = !1;
      this.noProp.active = !1;
      this.normalNode.active = !1;
      if (e.createNew) this.createNew.active = !0;else if (e.noProp) this.noProp.active = !0;else {
        this.normalNode.active = !0;
        c.Mng.Ins.spriteMng.setPropSprite(this.propSprite, e.textureName, 120);
      }
    });
  }
  onStateChange(e) {
    this.node.color = e ? l.UIColor.blue : cc.Color.WHITE;
  }
  onOptionBtnTap() {
    r.default.ins.OpenPanelByName("CommonOptionPanel", e => {
      e.setData(this.conf);
    });
  }
};
i([h(cc.Sprite)], p.prototype, "propSprite", void 0);
i([h(cc.Node)], p.prototype, "normalNode", void 0);
i([h(cc.Node)], p.prototype, "createNew", void 0);
i([h(cc.Node)], p.prototype, "noProp", void 0);
i([h(a.default)], p.prototype, "optionBtn", void 0);
p = i([d], p);
exports.default = p;