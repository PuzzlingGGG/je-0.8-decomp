"use strict";

exports.GSExecuteBreak = void 0;
const i = e("../GSRunnerMng");
exports.GSExecuteBreak = class {
  constructor() {
    this.isLoop = !1;
    this.reset();
  }
  reset() {}
  excute() {
    let e = i.GSRunnerMng.instance.getRunner(this.runnerId);
    if (!e) return null;
    e.break();
    return null;
  }
  isComplete() {
    return !0;
  }
};