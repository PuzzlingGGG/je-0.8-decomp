"use strict";

exports.GSVariableMng = void 0;
const i = e("../Frame/Util"),
  n = e("./GSVariable");
class a {
  constructor() {
    this._map = new Map();
    this._nameMap = new Map();
    this._idOrderList = [];
    this._itemVariableMap = new Map();
  }
  static get instance() {
    this._instance = this._instance || new a();
    return this._instance;
  }
  clearItem() {
    this._itemVariableMap.clear();
  }
  transIdString(e) {
    if (void 0 === e) return;
    let t = e.split(":");
    return parseInt(t[2]);
  }
  load(e) {
    if (!e) return;
    this._itemVariableMap.clear();
    this._map.clear();
    this._nameMap.clear();
    this._idOrderList.length = 0;
    e.sort((e, t) => e && t ? e.idx - t.idx : -1);
    let t = 0;
    for (let o of e) {
      if (!o) continue;
      let e = o;
      e.idx = t++;
      this.insertVariable(e);
    }
  }
  resetValues() {
    let e = Array.from(this._map.values());
    for (let t of e) t.setValue(t.defaultValue);
  }
  getSaveData() {
    let e = [];
    this._nameMap.clear();
    let t = this._idOrderList.length;
    for (let o = 0; o < t; ++o) {
      let t = this._idOrderList[o],
        i = this._map.get(t);
      if (i) {
        this._nameMap.set(i.name, t);
        e.push(this.buildDataByNode(o, i));
      }
    }
    return e;
  }
  getVariableData(e) {
    let t = this.transIdString(e);
    if (!t) return null;
    let o = this._idOrderList.length;
    for (let e = 0; e < o; ++e) {
      let o = this._idOrderList[e];
      if (o == t) {
        let t = this._map.get(o);
        return this.buildDataByNode(e, t);
      }
    }
    return null;
  }
  buildDataByNode(e, t) {
    return {
      id: t.idstr,
      idx: e,
      name: t.name,
      desc: t.desc,
      readonly: t.readonly,
      valueType: t.valueType,
      defaultValue: t.defaultValue
    };
  }
  addVariable(e) {
    if (!e) return;
    let t = this.transIdString(e.id),
      o = new n.GSVariable();
    o.setParam(e.valueType, e.defaultValue, e.readonly);
    exports.idstr = e.id;
    exports.name = e.name;
    exports.desc = e.desc;
    this._map.set(t, o);
    this._nameMap.has(e.name) || this._nameMap.set(e.name, t);
  }
  addNewVariable(e) {
    if (!e || void 0 === e.id) return;
    let t = this.transIdString(e.id);
    this.addVariable(e);
    return t;
  }
  insertVariable(e) {
    let t = this.addNewVariable(e);
    e.idx >= 0 && this._idOrderList.splice(e.idx, 0, t);
    return t;
  }
  removeVariable(e) {
    if (!this._map.has(e)) return;
    this._nameMap.delete(this._map.get(e).name);
    this._map.delete(e);
    let t = this._idOrderList.indexOf(e);
    t >= 0 && this._idOrderList.splice(t, 1);
  }
  swapVariablePosition(e, t) {
    if (e >= 0 && e < this._idOrderList.length && t >= 0 && t < this._idOrderList.length) {
      let o = this._idOrderList[e],
        i = this._idOrderList[t];
      this._idOrderList[e] = i;
      this._idOrderList[t] = o;
    }
  }
  hasName(e) {
    return this._nameMap.has(e);
  }
  changeName(e, t) {
    if (this._nameMap.has(t) && this._nameMap.get(t) != e) return !1;
    this._nameMap.delete(t);
    this._nameMap.set(t, e);
    this.getVariable(e).name = t;
    return !0;
  }
  getDefaultNameNum() {
    let e = Array.from(this._nameMap.keys());
    return i.Util.getDefaultNameNum("变量", e);
  }
  get defaultVariableId() {
    return this._idOrderList.length > 0 ? this._idOrderList[0] : -1;
  }
  setVariable(e, t) {
    this._map.has(e) ? this._map.get(e).setValue(t) : console.warn(">>set variable value failed:variable is not exist !!!");
  }
  getVariable(e) {
    return this._map.has(e) ? this._map.get(e) : null;
  }
  getVariableByName(e) {
    if (!this._nameMap.has(e)) return null;
    let t = this._nameMap.get(e);
    return this.getVariable(t);
  }
  getValue(e) {
    let t = this.getVariable(e);
    return t ? t.getValue() : null;
  }
  getVariableIdList() {
    return this._idOrderList;
  }
  getItemVariable(e) {
    return this._itemVariableMap.has(e) ? this._itemVariableMap.get(e) : 0;
  }
  setItemVariable(e, t) {
    let o = 0;
    this._itemVariableMap.has(e) && (o = 0);
    o = t;
    this._itemVariableMap.set(e, o);
  }
  makeData() {
    let e = {
      list: []
    };
    this._map.forEach(t => {
      e.list.push({
        idStr: t.idstr,
        value: t.getValue().getValue()
      });
    });
    return e;
  }
  initWithData(e) {
    e.list.forEach(e => {
      let t = this.transIdString(e.idStr);
      this._map.has(t) && this._map.get(t).setValue(e.value + "");
    });
  }
  getValueByJulian(e) {
    let t = this.transIdString(e);
    return this._map.has(t) ? this._map.get(t).getValue().getValue() : 0;
  }
}
exports.GSVariableMng = a;