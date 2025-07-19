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
const a = e("../../../scripts/_autogen/data/data"),
  s = e("../../CustomUI/ScrollList"),
  r = e("../../Frame/Panel"),
  l = e("../../Frame/Top"),
  c = e("../../Game/Player/ShopMng"),
  {
    ccclass: d,
    property: h
  } = cc._decorator;
let p = class extends r.default {
  constructor() {
    super(...arguments);
    this.list = null;
    this.emptyLabel = null;
    this.call = null;
    this.checkStatus = !1;
  }
  onLoad() {
    const e = Object.create(null, {
      onLoad: {
        get: () => super.onLoad
      }
    });
    return n(this, void 0, void 0, function* () {
      e.onLoad.call(this);
      this.list.node.on(s.default.CLICK_ITEM, this.onClick, this);
      let t = yield c.default.Ins.loadMyGoodsInfos();
      this.list.setDataArr(t);
      this.emptyLabel.node.active = 0 == t.length;
    });
  }
  setData(e) {
    this.checkStatus = e;
  }
  onClick(e, t) {
    if (t && this.checkStatus) switch (t.status) {
      case a.GoodsStatus.noPublish:
        l.default.showToast("此商品未发布");
        return;
      case a.GoodsStatus.inReview:
        l.default.showToast("此商品正在审核中");
        return;
      case a.GoodsStatus.fail:
        l.default.showToast("此商品审核未通过");
        return;
      case a.GoodsStatus.off:
        l.default.showToast("此商品已下架");
        return;
    }
    if (t) {
      this.closePanel();
      this.call && this.call(t.id);
    }
  }
};
i([h(s.default)], p.prototype, "list", void 0);
i([h(cc.Label)], p.prototype, "emptyLabel", void 0);
p = i([d], p);
exports.default = p;