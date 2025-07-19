"use strict";

exports.GSCmdMng = void 0;
class i {
  constructor() {
    this._map = new Map();
  }
  static get instance() {
    this._instance = this._instance || new i();
    return this._instance;
  }
  registCmd(e, t) {
    this._map.set(e, t);
  }
  getCmd(e, t) {
    let o = this._map.get(t),
      i = o ? new o() : null;
    i && (i.runnerId = e);
    return i;
  }
}
exports.GSCmdMng = i;