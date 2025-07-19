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
const a = e("../../../../i18n/i18nLabel"),
  s = e("../../../../i18n/i18nMgr"),
  r = e("../../../CustomUI/ScrollList"),
  l = e("../../../CustomUI/ToggleGroup"),
  c = e("../../../Frame/Util"),
  d = e("../../../Game/Player/DynamicMng"),
  h = e("../../../Game/Player/GiftRankMng"),
  {
    ccclass: p,
    property: u
  } = cc._decorator;
let m = class extends cc.Component {
  constructor() {
    super(...arguments);
    this.scrollList = null;
    this.loadingNode = null;
    this.toggleGroup = null;
    this.emptyNode = null;
    this.rankConfs = [{
      rankType: 1,
      rankName: "周榜"
    }, {
      rankType: 2,
      rankName: "月榜"
    }, {
      rankType: 3,
      rankName: "总榜"
    }, {
      rankType: 4,
      rankName: "暑假榜"
    }];
    this.lastClearStamp = 0;
  }
  onLoad() {
    return n(this, void 0, void 0, function* () {
      yield this.initToggles();
      this.loadingNode.width = this.loadingNode.height = 0;
      this.toggleGroup.node.on(l.default.TOGGLE_CHANGE, this.onToggleChange, this);
      yield this.refresh();
    });
  }
  initToggles() {
    return n(this, void 0, void 0, function* () {
      let e = yield d.DynamicMng.Ins.loadOne("GiftRank");
      e && (this.rankConfs = e.GiftRankSubPage.ranks);
      let t = this.toggleGroup.toggleItems[0];
      c.Util.makeBro(t.node, this.rankConfs.length, (e, t) => {
        let o = this.rankConfs[t],
          i = e.getComponentsInChildren(a.default);
        for (let e = 0; e < i.length; e++) i[e].tid = s.I18nMgr.getI18nTidByZh(o.rankName);
      });
    });
  }
  idx2RankType(e) {
    var t;
    return (null === (t = this.rankConfs[e]) || void 0 === t ? void 0 : t.rankType) || 1;
  }
  onToggleChange(e, t, o) {
    return n(this, void 0, void 0, function* () {
      if (o) {
        yield this.refresh();
        this.scrollList.scrollToTop(.3, !1);
      }
    });
  }
  refresh() {
    return n(this, void 0, void 0, function* () {
      let e = this.toggleGroup.idx,
        t = this.idx2RankType(e),
        o = h.GiftRankMng.Ins.getGiftRank(t);
      o.length < 12 && (o = yield h.GiftRankMng.Ins.appendLoadGiftRank(t, 12));
      this.scrollList.setDataArr(o);
      this.emptyNode.active = 0 == o.length;
    });
  }
  onScrollEvt(e, t) {
    return n(this, void 0, void 0, function* () {
      let o = this.toggleGroup.idx,
        i = this.idx2RankType(o),
        n = -e.getScrollOffset().y;
      switch (t) {
        case cc.ScrollView.EventType.BOUNCE_TOP:
          if (n > 100) {
            let e = c.Util.getTimeStamp();
            if (e - this.lastClearStamp > 500) {
              h.GiftRankMng.Ins.deleteGiftRank(i);
              yield this.refresh();
              this.lastClearStamp = e;
            }
          }
          break;
        case cc.ScrollView.EventType.BOUNCE_BOTTOM:
          yield h.GiftRankMng.Ins.appendLoadGiftRank(i, 12);
          yield this.refresh();
          break;
        case cc.ScrollView.EventType.SCROLLING:
          if (n > 0) {
            this.loadingNode.width = this.loadingNode.height = Math.min(n, 100);
            this.loadingNode.angle = n;
          } else this.loadingNode.width = this.loadingNode.height = 0;
      }
    });
  }
};
i([u(r.default)], m.prototype, "scrollList", void 0);
i([u(cc.Node)], m.prototype, "loadingNode", void 0);
i([u(l.default)], m.prototype, "toggleGroup", void 0);
i([u(cc.Node)], m.prototype, "emptyNode", void 0);
m = i([p], m);
exports.default = m;