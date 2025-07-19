"use strict";

exports.GSParam = void 0;
const i = e("./GameScriptDefines"),
  n = e("./GSVariableMng");
exports.GSParam = class {
  constructor(e, t, o = i.GSValueRefType.VARIABLE) {
    this._isRef = e;
    this._value = t;
    this._refType = o;
  }
  getValueType() {
    return this._value.valueType;
  }
  getValue() {
    if (this._isRef) {
      let e = this._value.getValue();
      if (this._refType == i.GSValueRefType.ITEM) return n.GSVariableMng.instance.getItemVariable(e);
      {
        let t = n.GSVariableMng.instance.getValue(e);
        return t ? t.getValue() : null;
      }
    }
    return this._value.getValue();
  }
  setValue(e) {
    if (this._isRef) {
      let t = this._value.getValue();
      if (this._refType == i.GSValueRefType.ITEM) {
        let o = parseFloat(e);
        Number.isNaN(o) || n.GSVariableMng.instance.setItemVariable(t, o);
      } else {
        let o = n.GSVariableMng.instance.getValue(t);
        o && o.setValue(e);
      }
    } else this._value.setValue(e);
  }
};