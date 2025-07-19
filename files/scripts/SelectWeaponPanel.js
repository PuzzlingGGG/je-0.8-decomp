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
  l = e("../../Frame/Config"),
  c = e("../../Frame/Panel"),
  d = e("../../Game/OperationFlow"),
  h = e("../../Game/Player/DynamicMng"),
  p = e("../../Game/Player/Mng"),
  u = e("../../GameData/GameTypeDefine"),
  {
    ccclass: m,
    property: f
  } = cc._decorator;
let g = class extends c.default {
  constructor() {
    super(...arguments);
    this.listToggle = null;
    this.list = null;
    this.toggleGroup = null;
    this.okBtn = null;
    this.selectCall = null;
    this._selectWeaponType = u.WeaponType.Gun;
  }
  onLoad() {
    super.onLoad();
    cc.game.on("refreshWeaponList", this.refreshList, this);
    this.toggleGroup.node.on(r.default.TOGGLE_CHANGE, this.onClickType, this);
    this.list.node.on(s.default.CLICK_ITEM, this.onClickCell, this);
    this.okBtn.node.on(a.default.CLICK, this.onOkBtn, this);
  }
  onDestroy() {
    cc.game.off("refreshWeaponList", this.refreshList, this);
  }
  onClickType(e, t, o) {
    if (o) {
      this._selectWeaponType = e;
      this.refreshList();
    }
  }
  setData(e) {
    return n(this, void 0, void 0, function* () {
      this._selGunId = e;
      this.listToggle.setDataArr(l.Config.weaponTypeConfs);
      let t = yield p.Mng.Ins.weaponMng.loadOne(e);
      if (t) {
        this._selectWeaponType = t.weaponType;
        this.toggleGroup.selectIdx(this._selectWeaponType);
      }
      yield this.refreshList();
    });
  }
  refreshList() {
    return n(this, void 0, void 0, function* () {
      let e = yield p.Mng.Ins.weaponMng.loadAll(),
        t = [];
      h.DynamicMng.Ins.isDisable(h.FunctionEnum.PaintAsset, !1) || t.push({
        createNew: !0
      });
      t.push({
        noWeapon: !0,
        id: "",
        name: "无武器"
      });
      let o = [];
      o = (o = o.concat(e)).concat(l.Config.weaponConfs);
      for (let e of o) e && e.weaponType == this._selectWeaponType && t.push(e);
      this.list.setDataArr(t);
      let i = -1;
      for (let e = 0; e < t.length; e++) if (t[e].id == this._selGunId) {
        this.list.selectByIdx(e);
        i = e;
        break;
      }
      -1 == i && this.list.selectByIdx(-1);
    });
  }
  onClickCell(e, t) {
    t.createNew && d.OperationFlow.paintWeapon(this._selectWeaponType, e => {
      this._selGunId = e;
      this.refreshList();
    });
  }
  onOkBtn() {
    this.closePanel();
    let e = this.list.getCurData();
    this.selectCall && this.selectCall(e);
  }
};
i([f(s.default)], g.prototype, "listToggle", void 0);
i([f(s.default)], g.prototype, "list", void 0);
i([f(r.default)], g.prototype, "toggleGroup", void 0);
i([f(a.default)], g.prototype, "okBtn", void 0);
g = i([m], g);
exports.default = g;