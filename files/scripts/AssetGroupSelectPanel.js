"use strict";

var i = this && this.__decorate || function (e, t, o, i) {
  var n,
    a = arguments.length,
    s = a < 3 ? t : null === i ? i = Object.getOwnPropertyDescriptor(t, o) : i;
  if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) s = Reflect.decorate(e, t, o, i);else for (var r = e.length - 1; r >= 0; r--) (n = e[r]) && (s = (a < 3 ? n(s) : a > 3 ? n(t, o, s) : n(t, o)) || s);
  return a > 3 && s && Object.defineProperty(t, o, s), s;
};
const n = e("../../CustomUI/Button"),
  a = e("../../CustomUI/ScrollList"),
  s = e("../../Frame/Panel"),
  r = e("../../Game/Player/Mng"),
  {
    ccclass: l,
    property: c
  } = cc._decorator;
let d = class extends s.default {
  constructor() {
    super(...arguments);
    this.labelTitle = null;
    this.scrollList = null;
    this.btnOk = null;
    this._selectedGroupList = [];
    this._groupSelectDatas = [];
  }
  onLoad() {
    super.onLoad();
    this.btnOk.node.on(n.default.CLICK, this.onClickOk, this);
    this.scrollList.content.on("onRefreshGroup", () => {
      this.refresh();
    }, this);
  }
  setData(e, t, o, i) {
    this._callback = i;
    this._ignoreGroup = t;
    this._canCreateNew = o;
    this.labelTitle.string = e;
    this.refresh();
  }
  refresh() {
    let e = r.Mng.Ins.assetGroupMng.customGroups;
    this._groupSelectDatas.length = 0;
    if (e) for (let t of e) this._ignoreGroup && t.groupName == this._ignoreGroup || this._groupSelectDatas.push({
      isSelect: !1,
      groupName: t.groupName
    });
    this._canCreateNew && e.length < 10 && this._groupSelectDatas.push({
      isSelect: !1,
      groupName: "",
      isCreateBtn: !0
    });
    this.scrollList.setDataArr(this._groupSelectDatas);
  }
  onClickOk() {
    this.closePanel();
    this._selectedGroupList.length = 0;
    for (let e of this._groupSelectDatas) e.isSelect && this._selectedGroupList.push(e.groupName);
    this._callback && this._callback(this._selectedGroupList);
  }
};
i([c(cc.Label)], d.prototype, "labelTitle", void 0);
i([c(a.default)], d.prototype, "scrollList", void 0);
i([c(n.default)], d.prototype, "btnOk", void 0);
d = i([l], d);
exports.default = d;