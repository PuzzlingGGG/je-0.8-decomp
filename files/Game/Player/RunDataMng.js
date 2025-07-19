"use strict";

class i {
  constructor() {
    this.map = new Map();
  }
  get(e) {
    let t = this.map.get(e);
    return t ? t.value : null;
  }
  set(e, t) {
    let o = this.map.get(e);
    if (!o) {
      o = {
        key: e,
        value: t
      };
      this.map.set(e, o);
    }
    exports.value = t;
    return o;
  }
  clear() {
    this.map.clear();
  }
}
exports.default = i;
i.Ins = new i();