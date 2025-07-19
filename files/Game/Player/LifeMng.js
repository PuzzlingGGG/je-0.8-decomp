"use strict";

exports.LifeMng = void 0;
const i = e("../../Frame/CrossPlatform");
class n {
  constructor() {
    this.max = 3;
    this.map = new Map();
    this.recoverTime = 9e5;
  }
  getLife(e) {
    if (this.map.has(e)) return this.map.get(e);
    {
      let t = i.crossPlatform.getStorageSync("life" + e);
      "" === t && (t = 3);
      this.map.set(e, t);
      return t;
    }
  }
  setLife(e, t) {
    this.map.set(e, t);
    if (t == this.max) {
      i.crossPlatform.removeStorageSync("life" + e);
      i.crossPlatform.removeStorageSync("lifeStamp" + e);
    } else i.crossPlatform.setStorageSync("life" + e, t);
    t <= 0 && "" == i.crossPlatform.getStorageSync("lifeStamp" + e) && i.crossPlatform.setStorageSync("lifeStamp" + e, orange.TimeUtil.serverTime);
  }
  getLifeStamp(e) {
    return i.crossPlatform.getStorageSync("lifeStamp" + e) || 0;
  }
}
exports.LifeMng = n;
n.Ins = new n();