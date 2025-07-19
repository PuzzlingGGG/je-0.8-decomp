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
  r = e("../../CustomUI/ToggleGroup"),
  l = e("../../Frame/Panel"),
  c = e("../../Frame/Top"),
  d = e("../../Game/Player/CollectionMng"),
  h = e("../../Game/Player/Mng"),
  {
    ccclass: p,
    property: u
  } = cc._decorator;
let m = class extends l.default {
  constructor() {
    super(...arguments);
    this.toggleGroup = null;
    this.list = null;
    this.emptyLabel = null;
    this.call = null;
    this.checkStatus = !1;
  }
  onLoad() {
    super.onLoad();
    this.toggleGroup.node.on(r.default.TOGGLE_CHANGE, this.onToggleChange, this);
    this.list.node.on(s.default.CLICK_ITEM, this.onClick, this);
  }
  setData(e, t) {
    this.checkStatus = e;
    this.toggleGroup.toggleItems[1].node.active = t;
  }
  onToggleChange(e) {
    return n(this, void 0, void 0, function* () {
      let t = [];
      t = 0 == e ? yield h.Mng.Ins.gameMng.loadAll() : yield d.CollectionMng.Ins.loadGames();
      this.list.setDataArr(t);
      this.emptyLabel.node.active = 0 == t.length;
    });
  }
  onClick(e, t) {
    if (t && this.checkStatus) switch (t.status) {
      case a.GameStatus.noPublish:
        c.default.showToast("此游戏未发布");
        return;
      case a.GameStatus.inReview:
        c.default.showToast("此游戏正在审核中");
        return;
      case a.GameStatus.fail:
        c.default.showToast("此游戏审核未通过");
        return;
      case a.GameStatus.off:
        c.default.showToast("此游戏已下架");
        return;
    }
    if (t) {
      this.closePanel();
      this.call && this.call(t.id);
    }
  }
};
i([u(r.default)], m.prototype, "toggleGroup", void 0);
i([u(s.default)], m.prototype, "list", void 0);
i([u(cc.Label)], m.prototype, "emptyLabel", void 0);
m = i([p], m);
exports.default = m;