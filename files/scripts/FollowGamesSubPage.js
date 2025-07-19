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
  s = e("../../../CustomUI/ScrollList"),
  r = e("../../../Game/Player/DiscoverMng"),
  l = e("../../../Game/Player/DynamicMng"),
  c = e("../../../Game/Player/FollowMng"),
  {
    ccclass: d,
    property: h
  } = cc._decorator;
let p = class extends cc.Component {
  constructor() {
    super(...arguments);
    this.list = null;
    this.loadingNode = null;
    this.emptyLabel = null;
  }
  onLoad() {
    return n(this, void 0, void 0, function* () {
      this.loadingNode.width = this.loadingNode.height = 0;
      yield this.refresh();
    });
  }
  onEnable() {
    this.emptyLabel.string = a.I18nMgr.getI18nStringByZh(c.FollowMng.Ins.followIds.length > 0 ? "暂无游戏" : "您还未关注任何作者");
  }
  refresh() {
    return n(this, void 0, void 0, function* () {
      let e = r.default.Ins.followGameDatas;
      l.DynamicMng.Ins.isInspectVersion() && (e = []);
      this.list.setDataArr(e);
      this.emptyLabel.node.active = 0 == e.length;
    });
  }
  onScrollEvt(e, t) {
    return n(this, void 0, void 0, function* () {
      let o = -e.getScrollOffset().y;
      switch (t) {
        case cc.ScrollView.EventType.BOUNCE_BOTTOM:
          yield r.default.Ins.appendLoadFollowGames(20);
          this.refresh();
          break;
        case cc.ScrollView.EventType.SCROLLING:
          if (o > 0) {
            this.loadingNode.width = this.loadingNode.height = Math.min(o, 100);
            this.loadingNode.angle = o;
          } else this.loadingNode.width = this.loadingNode.height = 0;
      }
    });
  }
};
i([h(s.default)], p.prototype, "list", void 0);
i([h(cc.Node)], p.prototype, "loadingNode", void 0);
i([h(cc.Label)], p.prototype, "emptyLabel", void 0);
p = i([d], p);
exports.default = p;