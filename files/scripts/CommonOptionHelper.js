"use strict";

exports.CommonOptionHelper = void 0;
exports.CommonOptionHelper = class {
  constructor() {
    this.conf = null;
  }
  setConf(e) {
    this.conf = e;
  }
  close() {}
  paintCall(e) {
    e.toPaintTile();
  }
};