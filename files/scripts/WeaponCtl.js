"use strict";

exports.WeaponCtl = void 0;
exports.WeaponCtl = class {
  constructor(e) {
    this.timer = 0;
    this._weapon = e;
  }
  get weapon() {
    return this._weapon;
  }
};