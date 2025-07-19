"use strict";

exports.GSExecuteBlock = void 0;
const i = e("./GSInstructionHelper"),
  n = e("../GSRunnerMng");
exports.GSExecuteBlock = class {
  constructor(e) {
    this.isLoop = !1;
    this._executeList = [];
    this._exeIdx = 0;
    this.reset(e);
  }
  reset(e) {
    this._childs = e;
    this._isExcute = !1;
  }
  excute() {
    let e = n.GSRunnerMng.instance.getRunner(this.runnerId);
    if (!e) return null;
    if (!this._isExcute) {
      this._isExcute = !0;
      this._exeIdx = 0;
      this._executeList.length = 0;
      if (n.GSRunnerMng.instance.getRunner(this.runnerId) && this._childs && this._childs.length > 0) {
        let e = this._childs.length;
        for (let t = 0; t < e; ++t) {
          let e = i.GSInstructionHelper.CreateExecute(this._childs[t], this.runnerId);
          this._executeList.push(e);
        }
      }
    }
    if (this._exeIdx < this._executeList.length) {
      let t = this._executeList[this._exeIdx++];
      this._exeIdx < this._executeList.length && e.pushInstruction(this);
      t.e && e.pushInstruction(t.e);
      t.p && e.pushParam(t.p);
    }
    return null;
  }
  isComplete() {
    return !0;
  }
};