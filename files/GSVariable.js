"use strict";

exports.GSVariable = void 0;
const i = e("./GameScriptValueType");
exports.GSVariable = class {
  setParam(e, t, o = !1) {
    this.valueType = e;
    this.defaultValue = t;
    this._gsvalue = i.NewGSValue(e, t);
    this.readonly = this._gsvalue.readonly = o;
  }
  getValue() {
    return this._gsvalue;
  }
  setValue(e) {
    this.readonly || this._gsvalue.setValue(e);
  }
};