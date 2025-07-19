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
  c = e("../../Game/Player/ShopMng"),
  {
    ccclass: d,
    property: h
  } = cc._decorator;
let p = class extends cc.Component {
  constructor() {
    super(...arguments);
    this.nameLabel = null;
    this.introLabel = null;
    this.reportCntLabel = null;
    this.banBtn = null;
    this.sprite = null;
    this.data = null;
  }
  onLoad() {
    this.banBtn.node.on(a.default.CLICK, this.onBanBtn, this);
    this.node.on(s.default.SET_DATA, this.setData, this);
    this.sprite.node.on(a.default.CLICK, this.onIcon, this);
  }
  setData(e) {
    return n(this, void 0, void 0, function* () {
      this.data = e;
      this.nameLabel.string = e.name;
      this.reportCntLabel.string = e.reportCnt;
      l.Mng.Ins.spriteMng.setSprite(this.sprite, e.iconTextureName, 120);
    });
  }
  onBanBtn() {
    this.data.id && r.default.ins.OpenPanelByName("BanGoodsPanel", e => {
      e.setData(this.data.id);
    });
  }
  onIcon() {
    return n(this, void 0, void 0, function* () {
      let e = yield c.default.Ins.loadGoodsInfos([this.data.id]);
      e && e[0] && r.default.ins.OpenPanelByName("BuyGoodsPanel", t => {
        t.setData(e[0]);
        t.buyCall = () => {
          cc.game.emit("RefreshShopList");
        };
      });
    });
  }
};
i([h(cc.Label)], p.prototype, "nameLabel", void 0);
i([h(cc.Label)], p.prototype, "introLabel", void 0);
i([h(cc.Label)], p.prototype, "reportCntLabel", void 0);
i([h(a.default)], p.prototype, "banBtn", void 0);
i([h(cc.Sprite)], p.prototype, "sprite", void 0);
p = i([d], p);
exports.default = p;