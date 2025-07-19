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
  c = e("../../Frame/Util"),
  d = e("../../Game/Player/Mng"),
  {
    ccclass: h,
    property: p
  } = cc._decorator;
let u = class extends cc.Component {
  constructor() {
    super(...arguments);
    this.normalNode = null;
    this.createNode = null;
    this.actorSprite = null;
    this.shopSprite = null;
    this.nameLabel = null;
    this.propSprite = null;
    this.optionBtn = null;
    this.data = null;
  }
  onLoad() {
    this.node.on(s.default.SET_DATA, this.setData, this);
    this.node.on(s.default.ITEM_STATE_CHANGE, this.onStateChange, this);
    this.optionBtn.node.on(a.default.CLICK, this.onOptionBtn, this);
  }
  setData(e) {
    return n(this, void 0, void 0, function* () {
      this.data = e;
      this.normalNode.active = !1;
      this.createNode.active = !1;
      if (e) {
        this.normalNode.active = !0;
        this.nameLabel.string = e.name;
        let t = yield d.Mng.Ins.actorMng.loadOne(e.actorId);
        d.Mng.Ins.spriteMng.setActorSprite(this.actorSprite, t.textureName, 50);
        d.Mng.Ins.spriteMng.setShopSprite(this.shopSprite, e.textureName, 120);
        c.Util.makeBro(this.propSprite.node, e.goodses.length, (t, o) => n(this, void 0, void 0, function* () {
          let i = e.goodses[o],
            n = yield d.Mng.Ins.propMng.loadOne(i.propId),
            a = t.getComponent(cc.Sprite);
          d.Mng.Ins.spriteMng.setPropSprite(a, n.textureName, 60);
        }));
      } else this.createNode.active = !0;
    });
  }
  onOptionBtn() {
    r.default.ins.OpenPanelByName("CreateGameShopPanel", e => {
      e.toEditStyle(this.data);
      e.saveCall = e => {
        this.setData(e);
      };
    });
  }
  onStateChange(e) {
    this.node.color = e && this.data ? l.UIColor.blue : cc.Color.WHITE;
  }
};
i([p(cc.Node)], u.prototype, "normalNode", void 0);
i([p(cc.Node)], u.prototype, "createNode", void 0);
i([p(cc.Sprite)], u.prototype, "actorSprite", void 0);
i([p(cc.Sprite)], u.prototype, "shopSprite", void 0);
i([p(cc.Label)], u.prototype, "nameLabel", void 0);
i([p(cc.Sprite)], u.prototype, "propSprite", void 0);
i([p(a.default)], u.prototype, "optionBtn", void 0);
u = i([h], u);
exports.default = u;