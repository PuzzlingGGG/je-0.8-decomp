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
  r = e("../../Frame/Config"),
  l = e("../../Frame/Panel"),
  c = e("../../Game/OperationFlow"),
  d = e("../../Game/Player/DynamicMng"),
  h = e("../../Game/Player/Mng"),
  {
    ccclass: p,
    property: u
  } = cc._decorator;
let m = class extends l.default {
  constructor() {
    super(...arguments);
    this.list = null;
    this.okBtn = null;
    this.selectCall = null;
  }
  onLoad() {
    super.onLoad();
    cc.game.on("refreshBulletList", this.refreshList, this);
    this.list.node.on(s.default.CLICK_ITEM, this.onClickCell, this);
    this.okBtn.node.on(a.default.CLICK, this.onOkBtn, this);
  }
  onDestroy() {
    cc.game.off("refreshBulletList", this.refreshList, this);
  }
  setData(e) {
    return n(this, void 0, void 0, function* () {
      yield this.refreshList();
      this.select(e);
    });
  }
  select(e) {
    let t = this.list.getDataArr();
    for (let o = 0; o < t.length; o++) if (t[o].id == e) {
      this.list.selectByIdx(o);
      break;
    }
  }
  refreshList() {
    return n(this, void 0, void 0, function* () {
      let e = yield h.Mng.Ins.bulletMng.loadAll(),
        t = [];
      d.DynamicMng.Ins.isDisable(d.FunctionEnum.PaintAsset, !1) || t.push({
        createNew: !0
      });
      t = (t = t.concat(e)).concat(r.Config.bulletConfs);
      this.list.setDataArr(t);
    });
  }
  onClickCell(e, t) {
    t.createNew && c.OperationFlow.paintBullet(e => n(this, void 0, void 0, function* () {
      yield this.refreshList();
      this.select(e);
    }));
  }
  onOkBtn() {
    this.closePanel();
    let e = this.list.getCurData();
    this.selectCall && this.selectCall(e);
  }
};
i([u(s.default)], m.prototype, "list", void 0);
i([u(a.default)], m.prototype, "okBtn", void 0);
m = i([p], m);
exports.default = m;