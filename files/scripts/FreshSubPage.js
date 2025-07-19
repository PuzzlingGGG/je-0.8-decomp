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
  s = e("../../../Frame/Top"),
  r = e("../../../Game/Player/FreshGameMng"),
  l = e("../../../Game/Player/GameCellDataMng"),
  {
    ccclass: c,
    property: d
  } = cc._decorator;
let h = class extends cc.Component {
  constructor() {
    super(...arguments);
    this.list = null;
    this.loadingNode = null;
    this.emptyNode = null;
  }
  onLoad() {
    return n(this, void 0, void 0, function* () {
      this.loadingNode.width = this.loadingNode.height = 0;
      yield this.refresh(!0);
    });
  }
  refresh(e) {
    return n(this, void 0, void 0, function* () {
      let t = yield r.default.Ins.loadIds(e);
      this.list.setDataArr(t);
      this.emptyNode.active = 0 == t.length;
    });
  }
  onScrollEvt(e, t) {
    return n(this, void 0, void 0, function* () {
      let o = -e.getScrollOffset().y;
      switch (t) {
        case cc.ScrollView.EventType.BOUNCE_TOP:
          if (o > 100) {
            r.default.Ins.clear();
            l.default.Ins.deleteAllCache();
            yield this.refresh(!0);
            s.default.showToast("已刷新");
          }
          break;
        case cc.ScrollView.EventType.BOUNCE_BOTTOM:
          this.refresh(!1);
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
i([d(a.default)], h.prototype, "list", void 0);
i([d(cc.Node)], h.prototype, "loadingNode", void 0);
i([d(cc.Node)], h.prototype, "emptyNode", void 0);
h = i([c], h);
exports.default = h;