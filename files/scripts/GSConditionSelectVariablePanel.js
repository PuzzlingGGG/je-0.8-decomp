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
  s = e("../../Frame/Panel"),
  r = e("../../CustomUI/DropDownBox"),
  l = e("../../Frame/SceneManager"),
  c = e("../../Frame/Top"),
  d = e("../../CustomUI/ToggleGroup"),
  {
    ccclass: h,
    property: p
  } = cc._decorator;
let u = class extends s.default {
  constructor() {
    super(...arguments);
    this.btnVariable = null;
    this.compareBox = null;
    this.nodeNumber = null;
    this.nodeSwitch = null;
    this.toggleGroupValue = null;
    this.valueEdit = null;
    this.btnValueVariable = null;
    this.toggleGroupOpen = null;
    this.btnDelete = null;
    this.btnOk = null;
    this._editData = null;
    this._isNumber = !1;
    this._isValue = !0;
    this._selVariableId = -1;
    this._selValueVariableId = -1;
    this._isSwithOpen = !0;
  }
  onLoad() {
    super.onLoad();
    this.btnVariable.node.on(a.default.CLICK, this.onClickVarible, this);
    this.btnValueVariable.node.on(a.default.CLICK, this.onClickValueVarible, this);
    this.toggleGroupValue.node.on(d.default.TOGGLE_CHANGE, this.onToggleValueStateChange, this);
    this.toggleGroupOpen.node.on(d.default.TOGGLE_CHANGE, this.onToggleOpenStateChange, this);
    this.compareBox.node.on(r.default.SELECT_CHANGE, this.onCompareTypeChange, this);
    this.btnDelete.node.on(a.default.CLICK, this.onClickDelete, this);
    this.btnOk.node.on(a.default.CLICK, this.onClickOk, this);
    this._compareType = n.GSCompareType.EQUAL;
  }
  setData(e, t) {
    this._editData = e;
    this._opCallBack = t;
    if (this._editData) {
      this._selVariableId = this._editData.variableId;
      this._selValueVariableId = this._editData.compareVariableId;
      this._compareType = this._editData.compare;
      this._isValue = this._editData.compareVariableId <= 0;
      this._isSwithOpen = !!this._editData.compareValue && this._editData.compareValue > 0;
      this.valueEdit.string = this._editData.compareValue ? this._editData.compareValue + "" : "0";
      this.toggleGroupValue.selectIdx(this._isValue ? 0 : 1);
      this.toggleGroupOpen.selectIdx(this._isSwithOpen ? 0 : 1);
    } else {
      this.btnOk.node.width = 500;
      this.btnDelete.node.active = !1;
    }
    this._selVariableId <= 0 && (this._selVariableId = n.GSVariableMng.instance.defaultVariableId);
    this.onRefresh();
  }
  onRefresh() {
    this.btnValueVariable.interactable = !this._isValue;
    this.refreshVariable();
    this.refreshValueVariable();
  }
  refreshVariable() {
    let e = null;
    if (this._selVariableId > 0) {
      e = n.GSVariableMng.instance.getVariable(this._selVariableId);
      this.btnVariable.label.string = e ? e.name : "";
    } else this.btnVariable.label.string = "";
    this._isNumber = !1;
    let t = [];
    if (e) {
      if (e.valueType == n.GSValueType.FLOAT) {
        this._isNumber = !0;
        t = [{
          str: "等于",
          type: n.GSCompareType.EQUAL
        }, {
          str: "大于",
          type: n.GSCompareType.GREATER
        }, {
          str: "大于等于",
          type: n.GSCompareType.GREATER_EQUAL
        }, {
          str: "小于",
          type: n.GSCompareType.LESS
        }, {
          str: "小于等于",
          type: n.GSCompareType.LESS_EQUAL
        }, {
          str: "不等于",
          type: n.GSCompareType.NONEQUAL
        }];
      } else t = [{
        str: "等于",
        type: n.GSCompareType.EQUAL
      }, {
        str: "不等于",
        type: n.GSCompareType.NONEQUAL
      }];
    } else t = [{
      str: "等于",
      type: n.GSCompareType.EQUAL
    }, {
      str: "不等于",
      type: n.GSCompareType.NONEQUAL
    }];
    let o = t.findIndex(e => e.type == this._compareType);
    o <= 0 && (o = 0);
    this.compareBox.setDataArr(t);
    this.compareBox.selectByIdx(o);
    this.nodeNumber.active = this._isNumber;
    this.nodeSwitch.active = !this._isNumber;
  }
  refreshValueVariable() {
    if (this._isNumber) if (this._selValueVariableId > 0) {
      let e = n.GSVariableMng.instance.getVariable(this._selValueVariableId);
      this.btnValueVariable.label.string = e ? e.name : "";
    } else this.btnValueVariable.label.string = "";
  }
  onEditValueChange() {
    if (this._isValue) {
      let e = parseFloat(this.valueEdit.string);
      isNaN(e) && (e = 0);
      this.valueEdit.string = e + "";
    } else this.valueEdit.string = "";
  }
  onCompareTypeChange(e, t, o) {
    this._compareType = t.type;
  }
  onToggleValueStateChange(e, t, o) {
    this._isValue = 0 == e;
    this.onRefresh();
  }
  onClickValueVarible() {
    l.default.ins.OpenPanelByName("VariablesPanel", e => {
      e.setData(null, this._selValueVariableId, !0);
      e.callSelect = e => {
        this._selValueVariableId = e;
        this.refreshValueVariable();
      };
    });
  }
  onClickVarible() {
    l.default.ins.OpenPanelByName("VariablesPanel", e => {
      e.setData(null, this._selVariableId, !0);
      e.callSelect = e => {
        this._selVariableId = e;
        this.onRefresh();
      };
    });
  }
  onToggleOpenStateChange(e, t, o) {
    this._isSwithOpen = 0 == e;
  }
  onClickDelete() {
    this.closePanel();
    this._editData && this._opCallBack && this._opCallBack(null);
  }
  onClickOk() {
    if (this._selVariableId <= 0) c.default.showToast("请正确设置变量");else if (this._isNumber && !this._isValue && this._selValueVariableId <= 0) c.default.showToast("请正确设置值变量");else {
      this.closePanel();
      if (this._opCallBack) {
        let e = this._editData || n.GSDataNodeBuildHelper.NewGSDataCompareValue();
        e.type = n.GSSelectValueType.Variable;
        e.variableId = this._selVariableId;
        e.compare = this._compareType;
        if (this._isNumber && !this._isValue) e.compareVariableId = this._selValueVariableId;else {
          e.compareVariableId = -1;
          if (this._isNumber) {
            let t = parseFloat(this.valueEdit.string);
            isNaN(t) && (t = 0);
            e.compareValue = t;
          } else e.compareValue = this._isSwithOpen ? 1 : 0;
        }
        this._opCallBack(e);
      }
    }
  }
};
i([p(a.default)], u.prototype, "btnVariable", void 0);
i([p(r.default)], u.prototype, "compareBox", void 0);
i([p(cc.Node)], u.prototype, "nodeNumber", void 0);
i([p(cc.Node)], u.prototype, "nodeSwitch", void 0);
i([p(d.default)], u.prototype, "toggleGroupValue", void 0);
i([p(cc.EditBox)], u.prototype, "valueEdit", void 0);
i([p(a.default)], u.prototype, "btnValueVariable", void 0);
i([p(d.default)], u.prototype, "toggleGroupOpen", void 0);
i([p(a.default)], u.prototype, "btnDelete", void 0);
i([p(a.default)], u.prototype, "btnOk", void 0);
u = i([h], u);
exports.default = u;