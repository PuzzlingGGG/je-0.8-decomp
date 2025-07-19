"use strict";

exports.NewGSValue = exports.GSComputeValue = exports.GSString = exports.GSBool = exports.GSFloat = exports.GSInt = void 0;
const i = e("./GameScriptDefines");
class n {
  constructor() {
    this._value = 0;
  }
  setValue(e) {
    this.readonly || (this._value = parseInt(e) || 0);
  }
  getValue() {
    return this._value;
  }
}
exports.GSInt = n;
class a {
  constructor() {
    this._value = 0;
  }
  setValue(e) {
    this.readonly || (this._value = parseFloat(e) || 0);
  }
  getValue() {
    return this._value;
  }
}
exports.GSFloat = a;
class s {
  constructor() {
    this._value = !1;
  }
  setValue(e) {
    if (!this.readonly) if ("true" == e) this._value = !0;else if ("false" == e) this._value = !1;else {
      let t = parseInt(e);
      this._value = t > 0;
    }
  }
  getValue() {
    return this._value;
  }
}
exports.GSBool = s;
class r {
  constructor() {
    this._value = "";
  }
  setValue(e) {
    this.readonly || (this._value = e || "");
  }
  getValue() {
    return this._value;
  }
}
exports.GSString = r;
exports.GSComputeValue = function (e, t, o) {
  let n = e.getValueType(),
    a = t.getValueType();
  switch (n) {
    case i.GSValueType.INT:
      if (a != i.GSValueType.INT && a != i.GSValueType.FLOAT) {
        console.warn(`>>compute value type a[${i.GSValueType[n]}] not match b[${i.GSValueType[a]}]`);
        return e.getValue();
      }
      switch (o) {
        case i.GSComputeType.ADD:
          return e.getValue() + Math.floor(t.getValue());
        case i.GSComputeType.SUB:
          return e.getValue() - Math.floor(t.getValue());
        case i.GSComputeType.MUL:
          return e.getValue() * Math.floor(t.getValue());
        case i.GSComputeType.DIV:
          {
            let o = Math.floor(t.getValue());
            return 0 == o ? void 0 : e.getValue() / o;
          }
      }
    case i.GSValueType.FLOAT:
      if (a != i.GSValueType.INT && a != i.GSValueType.FLOAT) {
        console.warn(`>>compute value type a[${i.GSValueType[n]}] not match b[${i.GSValueType[a]}]`);
        return e.getValue();
      }
      switch (o) {
        case i.GSComputeType.ADD:
          return e.getValue() + t.getValue();
        case i.GSComputeType.SUB:
          return e.getValue() - t.getValue();
        case i.GSComputeType.MUL:
          return e.getValue() * t.getValue();
        case i.GSComputeType.DIV:
          {
            let o = t.getValue();
            return 0 == o ? void 0 : e.getValue() / o;
          }
      }
    case i.GSValueType.BOOL:
      switch (o) {
        case i.GSComputeType.ADD:
          return e.getValue() && t.getValue();
        case i.GSComputeType.SUB:
          return e.getValue() || t.getValue();
        case i.GSComputeType.MUL:
          return e.getValue() && t.getValue();
        case i.GSComputeType.DIV:
          return e.getValue() || t.getValue();
      }
    case i.GSValueType.STRING:
      if (o == i.GSComputeType.ADD) return e.getValue() + t.getValue();
      console.warn(`>>compute value op[${i.GSComputeType[o]}] not support a[${i.GSValueType[n]}]`);
      return e.getValue();
  }
};
exports.NewGSValue = function (e, t) {
  let o = null;
  switch (e) {
    case i.GSValueType.INT:
      o = new n();
      break;
    case i.GSValueType.FLOAT:
      o = new a();
      break;
    case i.GSValueType.BOOL:
      o = new s();
      break;
    case i.GSValueType.STRING:
      o = new r();
  }
  if (o) {
    exports.valueType = e;
    o.setValue(t);
  }
  return o;
};