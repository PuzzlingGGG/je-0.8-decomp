"use strict";

exports.GSCmdTest = void 0;
const i = e("../GSRunnerMng");
exports.GSCmdTest = class {
  constructor() {}
  setParam(e) {
    this.param = e;
  }
  excute() {
    let e = i.GSRunnerMng.instance.getRunner(this.runnerId);
    e && e.log(">>call game script test command!", this.param);
    this._isComplete = !1;
  }
  setp() {
    this._isComplete = !0;
  }
  isComplete() {
    return this._isComplete;
  }
};