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
  s = e("../../../Game/Player/DiscoverMng"),
  {
    ccclass: r,
    property: l
  } = cc._decorator;
let c = class extends cc.Component {
  constructor() {
    super(...arguments);
    this.list = null;
    this.emptyLabel = null;
  }
  onLoad() {
    return n(this, void 0, void 0, function* () {
      yield this.refresh();
    });
  }
  onEnable() {
    this.emptyLabel.string = "还没有任何作品";
  }
  refresh() {
    return n(this, void 0, void 0, function* () {
      yield s.default.Ins.initLoadCreativeGames(20);
      let e = s.default.Ins.creativeGameDatas;
      this.list.setDataArr(e);
      this.emptyLabel.node.active = 0 == e.length;
    });
  }
  onScrollEvt(e, t) {
    return n(this, void 0, void 0, function* () {
      e.getScrollOffset().y;
      switch (t) {
        case cc.ScrollView.EventType.BOUNCE_BOTTOM:
          yield s.default.Ins.appendLoadCreativeGames(20);
          this.refresh();
      }
    });
  }
};
i([l(a.default)], c.prototype, "list", void 0);
i([l(cc.Label)], c.prototype, "emptyLabel", void 0);
c = i([r], c);
exports.default = c;