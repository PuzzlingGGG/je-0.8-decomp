"use strict";

var i = this && this.__decorate || function (e, t, o, i) {
  var n,
    a = arguments.length,
    s = a < 3 ? t : null === i ? i = Object.getOwnPropertyDescriptor(t, o) : i;
  if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) s = Reflect.decorate(e, t, o, i);else for (var r = e.length - 1; r >= 0; r--) (n = e[r]) && (s = (a < 3 ? n(s) : a > 3 ? n(t, o, s) : n(t, o)) || s);
  return a > 3 && s && Object.defineProperty(t, o, s), s;
};
const n = e("../../GameScript/index"),
  a = e("../../CustomUI/Button"),
  s = e("./GSUIItemConditionCell"),
  r = e("./SimpleNodeList"),
  l = e("../../Frame/SceneManager"),
  {
    ccclass: c,
    property: d
  } = cc._decorator;
let h = class extends cc.Component {
  constructor() {
    super(...arguments);
    this.cellList = null;
    this.cell = null;
    this.newBtn = null;
    this.addCompareBtn = null;
    this._inited = !1;
    this._data = null;
    this._cellDataList = [];
  }
  init() {
    if (!this._inited) {
      this._inited = !0;
      this.addCompareBtn.node.on(a.default.CLICK, this.onClickAddCompare, this);
      this.newBtn.node.on(a.default.CLICK, this.onClickAddNew, this);
      this.cellList.node.on("DELETECONDITION", this.onClickDelete, this);
      this.cellList.SetItemPrefab(this.cell.node, s.default);
      this.cellList.callThis = this;
      this.cellList.itemRender = this.onCellRender;
    }
  }
  setData(e) {
    this.init();
    this._data = e;
    this._cellDataList.length = 0;
    let t = e;
    for (; t && t.a;) {
      this._cellDataList.push(t);
      t = t.next;
    }
    this.onRefresh();
  }
  onRefresh() {
    if (this._inited) {
      this.cellList.numberItems = this._cellDataList.length;
      this.addCompareBtn.node.active = 0 == this._cellDataList.length;
      this.newBtn.node.active = !this.addCompareBtn.node.active;
      this.cellList.node.active = !this.addCompareBtn.node.active;
    }
  }
  onClickAddCompare() {
    l.default.ins.OpenPanelByName("GSConditionSelectTypePanel", e => {
      e.setData((t => {
        let o = this._cellDataList.length,
          i = o > 0 ? this._cellDataList[o - 1] : null;
        if (i) {
          let e = n.GSDataNodeBuildHelper.NewGSDataConditione(t);
          i.next = e;
          this._cellDataList.push(e);
        } else {
          this._data.a = t;
          this._cellDataList.push(this._data);
        }
        this.onRefresh();
        e.closePanel();
      }).bind(this));
    });
  }
  onClickAddNew() {
    this.onClickAddCompare();
  }
  onClickDelete(e) {
    if (!e) return;
    let t = this._cellDataList.indexOf(e);
    if (t >= 0) {
      this._cellDataList.splice(t, 1);
      let o = this._data;
      for (; o && o.next != e;) o = o.next;
      o && o.next == e && (exports.next = e.next ? e.next.next : null);
      this.onRefresh();
    }
  }
  onCellRender(e, t) {
    let o = this._cellDataList[e];
    t.setData(o);
  }
};
i([d(r.default)], h.prototype, "cellList", void 0);
i([d(s.default)], h.prototype, "cell", void 0);
i([d(a.default)], h.prototype, "newBtn", void 0);
i([d(a.default)], h.prototype, "addCompareBtn", void 0);
h = i([c], h);
exports.default = h;