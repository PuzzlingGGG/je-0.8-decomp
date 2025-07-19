"use strict";

exports.GSExecuteWhileCount = void 0;
const i = e("./GSInstructionHelper"),
  n = e("../GSRunnerMng");
exports.GSExecuteWhileCount = class {
  constructor(e, t) {
    this.isLoop = !0;
    this._count = 0;
    this.reset(e, t);
  }
  reset(e, t) {
    this._pcount = e;
    this._block = t;
    this._isExcute = !1;
  }
  excute() {
    if (!n.GSRunnerMng.instance.getRunner(this.runnerId)) return null;
    if (this._isExcute) this._count > 0 && this.do();else {
      this._isExcute = !0;
      this._count = this._pcount;
      this.do();
    }
    return null;
  }
  isComplete() {
    return !0;
  }
  do() {
    let e = n.GSRunnerMng.instance.getRunner(this.runnerId);
    if (!e) return null;
    e.pushInstruction(this);
    this._block && i.GSInstructionHelper.ProcessGSNode(e, this._block);
    --this._count;
  }
};