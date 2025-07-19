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
  r = e("../../Frame/Panel"),
  l = e("../../Frame/SceneManager"),
  c = e("../../Game/Player/Mng"),
  d = e("../../Scene/EditWorldScene/EditWorldScene"),
  {
    ccclass: h,
    property: p
  } = cc._decorator;
let u = class extends r.default {
  constructor() {
    super(...arguments);
    this.list = null;
    this.okBtn = null;
    this.selectCall = null;
  }
  onLoad() {
    super.onLoad();
    this.list.node.on(s.default.CLICK_ITEM, this.onClickItem, this);
    this.list.canSelect = e => !!e;
    this.okBtn.node.on(a.default.CLICK, this.onOkBtn, this);
    cc.game.on("refreshGameRankList", this.refreshList, this);
  }
  onDestroy() {
    cc.game.off("refreshGameRankList", this.refreshList, this);
  }
  setData(e) {
    return n(this, void 0, void 0, function* () {
      yield this.refreshList();
      this.select(e);
    });
  }
  refreshList() {
    return n(this, void 0, void 0, function* () {
      let e = l.default.ins.findScene(d.default);
      if (e) {
        let t = e.gameData.gameRankIds,
          o = (yield c.Mng.Ins.gameRankMng.loadMany(t.concat(c.Mng.Ins.gameRankMng.extraIds))).concat(null);
        this.list.setDataArr(o);
      }
    });
  }
  select(e) {
    let t = this.list.getDataArr().findIndex(t => t && t.id == e);
    t < 0 && (t = 0);
    this.list.selectByIdx(t);
  }
  onClickItem(e, t) {
    null == t && l.default.ins.OpenPanelByName("CreateGameRankPanel", e => {
      e.toCreateStyle();
      e.createCall = e => n(this, void 0, void 0, function* () {
        yield this.refreshList();
        this.select(e.id);
      });
    });
  }
  onOkBtn() {
    this.closePanel();
    let e = null,
      t = this.list.getCurData();
    t && (e = t.id);
    this.selectCall && this.selectCall(e);
  }
};
i([p(s.default)], u.prototype, "list", void 0);
i([p(a.default)], u.prototype, "okBtn", void 0);
u = i([h], u);
exports.default = u;