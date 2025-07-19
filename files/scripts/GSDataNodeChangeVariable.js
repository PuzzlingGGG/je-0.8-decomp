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
    this.opBox = null;
    this.nodeNumber = null;
    this.nodeSwitch = null;
    this.toggleGroupValue = null;
    this.valueEdit = null;
    this.btnValueVariable = null;
    this.toggleGroupOpen = null;
    this.btnMng = null;
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
    this.opBox.node.on(r.default.SELECT_CHANGE, this.onOpTypeChange, this);
    this.btnMng.node.on(a.default.CLICK, this.onClickMng, this);
    this.btnOk.node.on(a.default.CLICK, this.onClickOk, this);
    this._opType = -1;
  }
  setData(e, t) {
    this._editData = e;
    this._opCallBack = t;
    if (this._editData) {
      this._selVariableId = this._editData.v.refId;
      this._selVariableId <= 0 && (this._selVariableId = n.GSVariableMng.instance.defaultVariableId);
      let e = this._editData.v.refId > 0 ? n.GSVariableMng.instance.getVariable(this._editData.v.refId) : null;
      e && (this._editData.v.valueType = e.valueType);
      this._selValueVariableId = this._editData.a.isRef ? this._editData.a.refId : -1;
      this._opType = this._editData.hasCompute ? this._editData.computeType : -1;
      this._isValue = !this._editData.a.isRef;
      let t = this._editData.a && this._editData.a.value ? parseFloat(this._editData.a.value) : 0;
      isNaN(t) && (t = 0);
      this._isSwithOpen = t > 0;
      this.valueEdit.string = t + "";
      this.toggleGroupValue.selectIdx(this._isValue ? 0 : 1);
      this.toggleGroupOpen.selectIdx(this._isSwithOpen ? 0 : 1);
    } else this._selVariableId <= 0 && (this._selVariableId = n.GSVariableMng.instance.defaultVariableId);
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
          str: "设置为",
          type: -1
        }, {
          str: "加上",
          type: n.GSComputeType.ADD
        }, {
          str: "减去",
          type: n.GSComputeType.SUB
        }, {
          str: "乘以",
          type: n.GSComputeType.MUL
        }, {
          str: "除以",
          type: n.GSComputeType.DIV
        }];
      } else t = [{
        str: "设置为",
        type: -1
      }];
    } else t = [{
      str: "设置为",
      type: -1
    }];
    let o = t.findIndex(e => e.type == this._opType);
    o <= 0 && (o = 0);
    this.opBox.setDataArr(t);
    this.opBox.selectByIdx(o);
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
  onOpTypeChange(e, t, o) {
    this._opType = t.type;
  }
  onToggleValueStateChange(e, t, o) {
    if (o) {
      this._isValue = 0 == e;
      this.onRefresh();
    }
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
    o && (this._isSwithOpen = 0 == e);
  }
  onClickMng() {
    l.default.ins.OpenPanelByName("VariablesPanel", e => {
      e.setData(null, -1, !1);
    });
  }
  onClickOk() {
    if (this._selVariableId <= 0) c.default.showToast("请正确设置变量");else if (this._isNumber && !this._isValue && this._selValueVariableId <= 0) c.default.showToast("请正确设置值变量");else {
      this.closePanel();
      if (this._opCallBack) {
        let e = this._editData || n.GSDataNodeBuildHelper.NewGSDataNode(n.GSDataNodeType.GDATA_ChangeVariable);
        e.hasCompute = -1 != this._opType;
        e.computeType = this._opType;
        e.v.refId = this._selVariableId;
        let t = e.v.isRef && e.v.refId > 0 ? n.GSVariableMng.instance.getVariable(e.v.refId) : null;
        t && (e.v.valueType = t.valueType);
        e.a.isRef = !this._isValue;
        if (this._isNumber && !this._isValue) e.a.refId = this._selValueVariableId;else {
          e.a.refId = -1;
          if (this._isNumber) {
            let t = parseFloat(this.valueEdit.string);
            isNaN(t) && (t = 0);
            e.a.valueType = n.GSValueType.FLOAT;
            e.a.value = t + "";
          } else {
            e.a.isRef = !1;
            e.a.valueType = n.GSValueType.BOOL;
            e.a.value = this._isSwithOpen ? "1" : "0";
          }
        }
        this._opCallBack(e);
      }
    }
  }
};
i([p(a.default)], u.prototype, "btnVariable", void 0);
i([p(r.default)], u.prototype, "opBox", void 0);
i([p(cc.Node)], u.prototype, "nodeNumber", void 0);
i([p(cc.Node)], u.prototype, "nodeSwitch", void 0);
i([p(d.default)], u.prototype, "toggleGroupValue", void 0);
i([p(cc.EditBox)], u.prototype, "valueEdit", void 0);
i([p(a.default)], u.prototype, "btnValueVariable", void 0);
i([p(d.default)], u.prototype, "toggleGroupOpen", void 0);
i([p(a.default)], u.prototype, "btnMng", void 0);
i([p(a.default)], u.prototype, "btnOk", void 0);
u = i([h], u);
exports.default = u;