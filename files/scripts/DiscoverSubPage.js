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
const a = e("../../../CustomUI/ScrollList"),
  s = e("../../../Frame/CrossPlatform"),
  r = e("../../../Game/Player/DiscoverMng"),
  l = e("../../../Game/Player/DynamicMng"),
  c = e("../../../Game/Player/GameCellDataMng"),
  d = e("../../../Game/Player/GiftRankMng"),
  h = e("../../../CustomUI/Button"),
  {
    ccclass: p,
    property: u
  } = cc._decorator;
let m = class extends cc.Component {
  constructor() {
    super(...arguments);
    this.loading = null;
    this.list = null;
    this.bannerBtn = null;
  }
  onLoad() {
    this.loading.width = this.loading.height = 0;
    this.list.getPrefabName = e => e.prefabName;
    this.list.calculateSizeFunc = (e, t) => {
      if ("GiftRankComp" == e.prefabName) {
        let o = Math.min(e.ranks.length, 3);
        return {
          w: t.prefab.width,
          h: 135 * o + 120
        };
      }
      return {
        w: t.prefab.width,
        h: t.prefab.height
      };
    };
    this.bannerBtn && this.bannerBtn.node.on(h.default.CLICK, this.onBannerClick, this);
    this.refresh();
  }
  refresh() {
    return n(this, void 0, void 0, function* () {
      if (l.DynamicMng.Ins.isInspectVersion()) {
        this.initFakeData();
        return;
      }
      let e = [];
      e.push({
        prefabName: "GameTagComp"
      });
      e.push({
        prefabName: "Space",
        w: 0,
        h: 50
      });
      let t = (yield l.DynamicMng.Ins.loadOne("GameChosenIds")) || [];
      if (s.wx) {
        let e = (yield l.DynamicMng.Ins.loadOne("IpGameIds")) || [];
        t = t.filter(t => !e.includes(t));
      }
      t = t.slice(0, 12);
      e.push({
        prefabName: "ChosenComp",
        games: yield c.default.Ins.loadGames(t)
      });
      e.push({
        prefabName: "Space",
        w: 0,
        h: 50
      });
      let o = yield l.DynamicMng.Ins.loadOne("GiftRank");
      if (o) {
        let t = o.DiscoverSubPage;
        if (t) {
          let o = t.rankType,
            i = t.rankName,
            n = [];
          (n = d.GiftRankMng.Ins.getGiftRank(o)).length < 3 && (n = yield d.GiftRankMng.Ins.appendLoadGiftRank(o, 3));
          n.length && e.push({
            name: i,
            rankType: o,
            prefabName: "GiftRankComp",
            ranks: n
          });
        }
      }
      e.push({
        prefabName: "Space",
        w: 0,
        h: 50
      });
      e.push({
        prefabName: "RecommendHeadComp"
      });
      let i = r.default.Ins.rcmdGames;
      i.length < 12 && (i = yield r.default.Ins.appendLoadRcmdGames(12));
      for (let t = 0; t < i.length; t += 3) {
        let o = {
          prefabName: "RecommendComp",
          games: [i[t], i[t + 1], i[t + 2]]
        };
        e.push(o);
      }
      this.list.setDataArr(e);
    });
  }
  initFakeData() {
    return n(this, void 0, void 0, function* () {
      let e = yield c.default.Ins.loadGames(l.DynamicMng.Ins.inspectGameIds),
        t = [];
      t.push({
        prefabName: "GameBannerComp",
        games: e
      });
      t.push({
        prefabName: "Space",
        w: 0,
        h: 50
      });
      t.push({
        prefabName: "RecommendHeadComp"
      });
      t.push({
        prefabName: "RecommendComp",
        games: [e[0], e[1], e[2]]
      });
      t.push({
        prefabName: "RecommendComp",
        games: [e[3], e[4], e[5]]
      });
      this.list.setDataArr(t);
    });
  }
  onScrollEvt(e, t, o) {
    return n(this, void 0, void 0, function* () {
      let o = -e.getScrollOffset().y;
      switch (t) {
        case cc.ScrollView.EventType.BOUNCE_TOP:
          if (o > 100) {
            let e = 0,
              t = yield l.DynamicMng.Ins.loadOne("GiftRankActivity");
            t && (e = t.rankType);
            d.GiftRankMng.Ins.deleteGiftRank(e);
            this.refresh();
          }
          break;
        case cc.ScrollView.EventType.BOUNCE_BOTTOM:
          yield r.default.Ins.appendLoadRcmdGames(12);
          this.refresh();
          break;
        case cc.ScrollView.EventType.SCROLLING:
          if (o > 0) {
            this.loading.width = this.loading.height = Math.min(o, 100);
            this.loading.angle = o;
          } else this.loading.width = this.loading.height = 0;
      }
    });
  }
  onBannerClick() {
    return n(this, void 0, void 0, function* () {
      cc.sys.openURL("https://discord.gg/m98qqFeQAM");
    });
  }
};
i([u(cc.Node)], m.prototype, "loading", void 0);
i([u(a.default)], m.prototype, "list", void 0);
i([u(h.default)], m.prototype, "bannerBtn", void 0);
m = i([p], m);
exports.default = m;