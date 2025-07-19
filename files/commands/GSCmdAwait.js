"use strict";

exports.GSCmdAwait = void 0;
const i = e("../GSRunnerMng");
exports.GSCmdAwait = class {
  constructor() {}
  setParam(e) {
    this._waitTime = e;
  }
  excute() {
    let e = i.GSRunnerMng.instance.getRunner(this.runnerId);
    e && e.log(">>call game script await command!wait..", this._waitTime, "秒");
    this._isComplete = !1;
    this._timer = 1e3 * this._waitTime + cc.director.getTotalTime();
  }
  setp() {
    this._timer < cc.director.getTotalTime() && (this._isComplete = !0);
  }
  isComplete() {
    return this._isComplete;
  }
};