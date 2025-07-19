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
const a = e("../../../../i18n/i18nMgr"),
  s = e("../../../../scripts/_autogen/cmd/cmd"),
  r = e("../../../../scripts/_autogen/data/data"),
  l = e("../../../CustomUI/Button"),
  c = e("../../../CustomUI/CoinBar"),
  d = e("../../../CustomUI/DropDownBox"),
  h = e("../../../CustomUI/ScrollList"),
  p = e("../../../CustomUI/ToggleGroup"),
  u = e("../../../Frame/CrossPlatform"),
  m = e("../../../Frame/NetworkMgr"),
  f = e("../../../Frame/Top"),
  g = e("../../../Game/GameEnv"),
  y = e("../../../Game/Player/CreditMng"),
  v = e("../../../Game/Player/DynamicMng"),
  C = e("../../../Game/Player/ShopMng"),
  _ = e("../../../Role"),
  S = e("./GoodsCell"),
  {
    ccclass: I,
    property: G
  } = cc._decorator;
let T = class extends cc.Component {
  constructor() {
    super(...arguments);
    this.toggleGroup = null;
    this.typeDropDownBox = null;
    this.sortDropDownBox = null;
    this.goodsList = null;
    this.myGoodsList = null;
    this.emptyNode = null;
    this.loadingNode = null;
    this.searchBox = null;
    this.closeSearchBtn = null;
  }
  onLoad() {
    cc.game.on("RefreshShopList", this.refreshList, this);
    cc.game.on("MyGoodsChange", this.refreshList, this);
    this.closeSearchBtn.node.on(l.default.CLICK, this.onCloseSearch, this);
    this.toggleGroup.node.on(p.default.TOGGLE_CHANGE, this.onToggleChange, this);
    this.typeDropDownBox.node.on(d.default.SELECT_CHANGE, this.onTypeChange, this);
    this.sortDropDownBox.node.on(d.default.SELECT_CHANGE, this.onTypeChange, this);
    this.typeDropDownBox.setDataArr([{
      str: a.I18nMgr.getI18nStringByZh("全部"),
      type: r.GoodsType.all
    }, {
      str: a.I18nMgr.getI18nStringByZh("合集"),
      type: r.GoodsType.package
    }, {
      str: a.I18nMgr.getI18nStringByZh("地块"),
      type: r.GoodsType.tile
    }, {
      str: a.I18nMgr.getI18nStringByZh("角色"),
      type: r.GoodsType.actor
    }, {
      str: a.I18nMgr.getI18nStringByZh("装置"),
      type: r.GoodsType.device
    }, {
      str: a.I18nMgr.getI18nStringByZh("道具"),
      type: r.GoodsType.prop
    }, {
      str: a.I18nMgr.getI18nStringByZh("武器"),
      type: r.GoodsType.weapon
    }]);
    this.sortDropDownBox.setDataArr([{
      str: a.I18nMgr.getI18nStringByZh("综合"),
      sort: r.GoodsSortType.comprehensive
    }, {
      str: a.I18nMgr.getI18nStringByZh("销量"),
      sort: r.GoodsSortType.goodsSaleDesc
    }, {
      str: a.I18nMgr.getI18nStringByZh("最新"),
      sort: r.GoodsSortType.goodsUpStampDesc
    }, {
      str: a.I18nMgr.getI18nStringByZh("便宜优先"),
      sort: r.GoodsSortType.goodsPriceAsc
    }, {
      str: a.I18nMgr.getI18nStringByZh("高价优先"),
      sort: r.GoodsSortType.goodsPriceDesc
    }]);
    this.loadingNode.width = this.loadingNode.height = 0;
    this.goodsList.node.active = !0;
    this.myGoodsList.node.active = !1;
    this.myGoodsList.getPrefabName = e => {
      if (e.id) return "MyGoodsCell";
      if (e) {
        if ("create" == e.type) return "CreateGoodsCell";
        if ("lock" == e.type) return "LockGoodsCell";
      }
    };
    this.refreshList();
    this.closeSearchBtn.node.active = !1;
    (v.DynamicMng.Ins.isDisable(v.FunctionEnum.GoodsPage, !1) || u.wx && g.gameEnv.isWxReviewCity) && (v.DynamicMng.Ins.isGmPlayer() || (this.toggleGroup.toggleItems[1].node.active = !1));
  }
  onEnable() {
    c.default.Ins.show(50);
  }
  onDisable() {
    c.default.Ins.hide();
  }
  onDestroy() {
    cc.game.off("RefreshShopList", this.refreshList, this);
    cc.game.off("MyGoodsChange", this.refreshList, this);
  }
  onToggleChange(e, t, o) {
    return n(this, void 0, void 0, function* () {
      if (o) {
        this.hideSearch();
        this.refreshList();
        this.goodsList.scrollToTop(.3);
      }
    });
  }
  onTypeChange(e, t, o) {
    return n(this, void 0, void 0, function* () {
      if (o) {
        this.hideSearch();
        this.refreshList();
        this.goodsList.scrollToTop(.3);
      }
    });
  }
  onSortChange(e, t, o) {
    return n(this, void 0, void 0, function* () {
      if (o) {
        this.hideSearch();
        this.refreshList();
        this.goodsList.scrollToTop(.3);
      }
    });
  }
  refreshList() {
    return n(this, void 0, void 0, function* () {
      let e = this.toggleGroup.idx,
        t = this.typeDropDownBox.getCurData().type,
        o = this.sortDropDownBox.getCurData().sort;
      if (0 == e) {
        this.goodsList.node.active = !0;
        this.myGoodsList.node.active = !1;
        let e = C.default.Ins.getChosenIds(t, o);
        e.length < 11 && (e = yield C.default.Ins.appendLoadChosenIds(t, o));
        let i = yield C.default.Ins.loadGoodsCellDatas(e),
          n = this.node.getComponentsInChildren(S.default);
        for (let e = 0; e < n.length; e++) n[e].from = "chosen";
        this.goodsList.setDataArr(i);
        this.emptyNode.active = 0 == i.length;
      } else if (1 == e) {
        this.goodsList.node.active = !0;
        this.myGoodsList.node.active = !1;
        let e = C.default.Ins.getRankIds(t, o);
        e.length < 11 && (e = yield C.default.Ins.appendLoadRankIds(t, o));
        let i = yield C.default.Ins.loadGoodsCellDatas(e),
          n = this.node.getComponentsInChildren(S.default);
        for (let e = 0; e < n.length; e++) n[e].from = "rank";
        this.goodsList.setDataArr(i);
        this.emptyNode.active = 0 == i.length;
      } else if (2 == e) {
        this.myGoodsList.node.active = !0;
        this.goodsList.node.active = !1;
        let e = [];
        e = yield C.default.Ins.loadGoodsInfos(C.default.Ins.myGoodsIds);
        f.default.hideLoading();
        if (e.length < _.default.Ins.role.myGoodsMaxCnt) e.push({
          type: "create"
        });else {
          let t = _.default.Ins.goodsSlotUnlockLvls[_.default.Ins.role.myGoodsMaxCnt];
          e.push({
            type: "lock",
            str: a.I18nMgr.exceI18nStringByZh("等级${lvl}解锁新栏位", [{
              paramName: "lvl",
              param: t
            }])
          });
        }
        this.myGoodsList.setDataArr(e);
      }
    });
  }
  sort(e) {
    let t = this.sortDropDownBox.getCurData().sort;
    t == r.GoodsSortType.goodsSaleDesc && e.sort((e, t) => t.saleCnt - e.saleCnt);
    t == r.GoodsSortType.goodsUpStampDesc && e.sort((e, t) => t.upStamp - e.upStamp);
    t == r.GoodsSortType.goodsPriceAsc && e.sort((e, t) => e.price - t.price);
    t == r.GoodsSortType.goodsPriceDesc && e.sort((e, t) => t.price - e.price);
  }
  onScrollEvt(e, t) {
    return n(this, void 0, void 0, function* () {
      let o = -e.getScrollOffset().y;
      if (!this.closeSearchBtn.node.active) switch (t) {
        case cc.ScrollView.EventType.BOUNCE_TOP:
          if (o > 100) {
            C.default.Ins.clear();
            yield this.refreshList();
            f.default.showToast("已刷新");
          }
          break;
        case cc.ScrollView.EventType.BOUNCE_BOTTOM:
          let e = this.toggleGroup.idx,
            i = this.typeDropDownBox.getCurData().type,
            n = this.sortDropDownBox.getCurData().sort;
          0 == e ? yield C.default.Ins.appendLoadChosenIds(i, n) : 1 == e && (yield C.default.Ins.appendLoadRankIds(i, n));
          this.refreshList();
          break;
        case cc.ScrollView.EventType.SCROLLING:
          if (o > 0) {
            this.loadingNode.width = this.loadingNode.height = Math.min(o, 100);
            this.loadingNode.angle = o;
          } else this.loadingNode.width = this.loadingNode.height = 0;
      }
    });
  }
  onSearch(e) {
    return n(this, void 0, void 0, function* () {
      if (v.DynamicMng.Ins.isDisable(v.FunctionEnum.GoodsPage, !0)) return;
      if (y.CreditMng.Ins.credit <= 1) {
        f.default.showToast("近期违规，不可搜索商品");
        return;
      }
      this.closeSearchBtn.node.active = !0;
      let t = [],
        o = e.textLabel.string;
      if (o) {
        if (o && !v.DynamicMng.Ins.isViolationsName(o)) if (v.DynamicMng.Ins.isInspectVersion()) t = [];else {
          let e = {
              searchName: o,
              start: 0,
              end: 50
            },
            i = yield m.NetIns.SendCmdAsync({
              cmd: s.CMDS.Game_NewSearchGoods,
              params: e
            }, s.Game_RNewSearchGoods);
          i && (t = i.goodsInfoList);
        }
        this.goodsList.setDataArr(t);
        this.emptyNode.active = 0 == t.length;
        this.goodsList.scrollToTop(.3);
      } else this.onCloseSearch();
    });
  }
  onCloseSearch() {
    this.hideSearch();
    this.refreshList();
    this.goodsList.scrollToTop(.3);
  }
  hideSearch() {
    this.searchBox.string = "";
    this.closeSearchBtn.node.active = !1;
  }
};
i([G(p.default)], T.prototype, "toggleGroup", void 0);
i([G(d.default)], T.prototype, "typeDropDownBox", void 0);
i([G(d.default)], T.prototype, "sortDropDownBox", void 0);
i([G(h.default)], T.prototype, "goodsList", void 0);
i([G(h.default)], T.prototype, "myGoodsList", void 0);
i([G(cc.Node)], T.prototype, "emptyNode", void 0);
i([G(cc.Node)], T.prototype, "loadingNode", void 0);
i([G(cc.EditBox)], T.prototype, "searchBox", void 0);
i([G(l.default)], T.prototype, "closeSearchBtn", void 0);
T = i([I], T);
exports.default = T;