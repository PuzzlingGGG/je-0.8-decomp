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
  s = e("../../../CustomUI/ToggleGroup"),
  r = e("../../../Frame/Top"),
  l = e("../../../Frame/Util"),
  c = e("../../../Game/Player/DynamicMng"),
  d = e("../../../Game/Player/GameCellDataMng"),
  h = e("../../../Game/Player/HotGameMng"),
  p = e("../../../Panel/PublishGamePanel/TagCell"),
  u = e("../GameCell"),
  {
    ccclass: m,
    property: f
  } = cc._decorator;
let g = class extends cc.Component {
  constructor() {
    super(...arguments);
    this.loadingNode = null;
    this.emptyLabel = null;
    this.toggleGroup = null;
    this.list = null;
    this.tagCell = null;
    this.curTag = "";
  }
  start() {
    return n(this, void 0, void 0, function* () {
      this.loadingNode.width = this.loadingNode.height = 0;
      this.toggleGroup.node.on(s.default.TOGGLE_CHANGE, this.onToggleGroup, this);
      let e = yield c.DynamicMng.Ins.loadOne("GameTags");
      l.Util.makeBro(this.tagCell.node, e.length, (t, o) => {
        let i = e[o];
        t.getComponent(p.default).setTag(i.key, i.str);
      });
      this.refresh(0);
    });
  }
  onToggleGroup(e) {
    return n(this, void 0, void 0, function* () {
      this.refresh(e);
    });
  }
  refresh(e) {
    return n(this, void 0, void 0, function* () {
      let t = (yield c.DynamicMng.Ins.loadOne("GameTags"))[e];
      this.node.getComponentsInChildren(u.default).forEach(e => {
        e.from = "Hot." + t.str;
      });
      this.curTag = t.key;
      let o = yield h.default.Ins.load(t.key),
        i = yield d.default.Ins.loadGames(o);
      for (let e = 0; e < i.length; e++) i[e].rank = e + 1;
      this.list.setDataArr(i);
      this.emptyLabel.active = 0 == i.length;
    });
  }
  onScrollEvt(e, t, o) {
    return n(this, void 0, void 0, function* () {
      let o = -e.getScrollOffset().y;
      switch (t) {
        case cc.ScrollView.EventType.BOUNCE_TOP:
          if (o > 100) {
            h.default.Ins.clearTag(this.curTag);
            d.default.Ins.deleteAllCache();
            r.default.showToast("已刷新");
            this.refresh(this.toggleGroup.idx);
          }
          break;
        case cc.ScrollView.EventType.BOUNCE_BOTTOM:
          this.refresh(this.toggleGroup.idx);
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
i([f(cc.Node)], g.prototype, "loadingNode", void 0);
i([f(cc.Node)], g.prototype, "emptyLabel", void 0);
i([f(s.default)], g.prototype, "toggleGroup", void 0);
i([f(a.default)], g.prototype, "list", void 0);
i([f(p.default)], g.prototype, "tagCell", void 0);
g = i([m], g);
exports.default = g;