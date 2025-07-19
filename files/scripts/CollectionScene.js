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
const a = e("../../CustomUI/Button"),
  s = e("../../CustomUI/ScrollList"),
  r = e("../../CustomUI/ToggleGroup"),
  l = e("../../Frame/Scene"),
  c = e("../../Frame/SceneManager"),
  d = e("../../Game/OperationFlow"),
  h = e("../../Game/Player/CollectionMng"),
  p = e("../../Game/Player/TalkMng"),
  u = e("../HomeScene/ShopPage/GoodsCell"),
  m = e("../HomeScene/TalkPage/TalkCell"),
  {
    ccclass: f,
    property: g
  } = cc._decorator;
let y = class extends l.default {
  constructor() {
    super(...arguments);
    this.backBtn = null;
    this.toggleGroup = null;
    this.gameList = null;
    this.talkList = null;
    this.goodsList = null;
    this.emptyLabel = null;
    this.backCall = null;
  }
  onLoad() {
    this.backBtn.node.on(a.default.CLICK, this.onBackBtn, this);
    this.toggleGroup.node.on(r.default.TOGGLE_CHANGE, this.onToggleChange, this);
    this.emptyLabel.node.active = !1;
  }
  init() {
    return n(this, void 0, void 0, function* () {
      this.onToggleChange(0, -1, !0);
    });
  }
  onToggleChange(e, t, o) {
    return n(this, void 0, void 0, function* () {
      if (o) {
        this.talkList.node.active = !1;
        this.gameList.node.active = !1;
        this.goodsList.node.active = !1;
        if (0 == e) {
          this.gameList.node.active = !0;
          let e = yield h.CollectionMng.Ins.loadGames();
          e = e.concat();
          this.gameList.setDataArr(e);
          this.emptyLabel.node.active = 0 == e.length;
        }
        if (1 == e) {
          this.goodsList.node.active = !0;
          let e = yield h.CollectionMng.Ins.loadGoods();
          e = e.concat();
          let t = this.node.getComponentsInChildren(u.default);
          for (let e = 0; e < t.length; e++) t[e].from = "collection";
          this.goodsList.setDataArr(e);
          this.emptyLabel.node.active = 0 == e.length;
        }
        if (2 == e) {
          this.talkList.node.active = !0;
          yield p.default.Ins.bindTalkCell(this.talkList);
          m.default.calcuHeightCache.clear();
          let e = yield h.CollectionMng.Ins.loadTalks();
          e = e.concat();
          this.talkList.setDataArr(e);
          this.emptyLabel.node.active = 0 == e.length;
        }
      }
    });
  }
  onBackBtn() {
    c.default.ins.Back(() => {
      this.backCall && this.backCall();
    }, c.ShiftAnima.moveRightShift);
  }
  onShow(e) {
    d.OperationFlow.deelOnShow(e);
  }
};
i([g(a.default)], y.prototype, "backBtn", void 0);
i([g(r.default)], y.prototype, "toggleGroup", void 0);
i([g(s.default)], y.prototype, "gameList", void 0);
i([g(s.default)], y.prototype, "talkList", void 0);
i([g(s.default)], y.prototype, "goodsList", void 0);
i([g(cc.Label)], y.prototype, "emptyLabel", void 0);
y = i([f], y);
exports.default = y;