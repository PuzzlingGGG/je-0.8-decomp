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
const a = e("../../../CustomUI/Button"),
  s = e("../../../CustomUI/ScrollList"),
  r = e("../../../Frame/SceneManager"),
  {
    ccclass: l,
    property: c
  } = cc._decorator;
let d = class extends cc.Component {
  constructor() {
    super(...arguments);
    this.moreBtn = null;
    this.list = null;
    this.data = null;
  }
  onLoad() {
    this.moreBtn.node.on(a.default.CLICK, this.onMoreBtn, this);
    this.node.on(s.default.SET_DATA, this.setData, this);
  }
  setData(e) {
    this.data = e;
    this.list.setDataArr(e.games);
  }
  onMoreBtn() {
    r.default.ins.Enter("GameListScene", e => {
      e.setData({
        title: "我的关注",
        games: this.data.games,
        from: "MyFollowComp",
        appendFunc: () => n(this, void 0, void 0, function* () {
          return [];
        })
      });
    });
  }
};
i([c(a.default)], d.prototype, "moreBtn", void 0);
i([c(s.default)], d.prototype, "list", void 0);
d = i([l], d);
exports.default = d;