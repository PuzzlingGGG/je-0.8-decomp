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
  s = e("../../Frame/SceneManager"),
  r = e("../../Game/Player/Mng"),
  l = e("../../Game/Player/ShopMng"),
  c = e("../../Game/Player/TalkMng"),
  d = e("./TalkSectionEditorBase"),
  {
    ccclass: h,
    property: p
  } = cc._decorator;
let u = class extends d.default {
  constructor() {
    super(...arguments);
    this.sprite = null;
    this.nameLabel = null;
    this.priceLabel = null;
    this.cntLabel = null;
    this.goodsId = "";
  }
  onLoad() {
    this.node.on(a.default.CLICK, this.onClick, this);
    this.refresh();
  }
  refresh() {
    return n(this, void 0, void 0, function* () {
      if (this.goodsId) {
        let e = (yield l.default.Ins.loadGoodsCellDatas([this.goodsId]))[0];
        if (e) {
          this.nameLabel.string = e.name;
          this.priceLabel.string = e.price + "";
          this.cntLabel.string = e.saleCnt + "";
          r.Mng.Ins.spriteMng.setSprite(this.sprite, e.iconTextureName, 180, 1);
        } else this.nameLabel.string = "商品链接失效";
      } else {
        this.nameLabel.string = "点我选择商品";
        this.priceLabel.string = "--";
        this.cntLabel.string = "--";
        r.Mng.Ins.spriteMng.setSprite(this.sprite, "Tile/Jump/grass2", 180, 1);
      }
    });
  }
  onClick() {
    s.default.ins.OpenPanelByName("SelectGoodsPanel", e => {
      e.setData(!0);
      e.call = e => {
        this.goodsId = e;
        this.refresh();
      };
    });
  }
  reset() {
    this.goodsId = "";
    this.refresh();
  }
  setData(e) {
    this.goodsId = e.goodsId;
    this.refresh();
  }
  getData() {
    return {
      type: c.TalkSectionType.Goods,
      goodsId: this.goodsId
    };
  }
};
i([p(cc.Sprite)], u.prototype, "sprite", void 0);
i([p(cc.Label)], u.prototype, "nameLabel", void 0);
i([p(cc.Label)], u.prototype, "priceLabel", void 0);
i([p(cc.Label)], u.prototype, "cntLabel", void 0);
u = i([h], u);
exports.default = u;