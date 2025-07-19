"use strict";

exports.GSExecuteAssign = void 0;
const i = e("../GameScriptDefines"),
  n = e("./GSInstructionHelper"),
  a = e("../GSRunnerMng");
exports.GSExecuteAssign = class {
  constructor(e, t) {
    this.isLoop = !1;
    this.reset(e, t);
  }
  reset(e, t) {
    this._a = n.GSInstructionHelper.CreateExecute(e, this.runnerId).p;
    this._b = t;
    this._isExcute = !1;
  }
  excute() {
    let e = a.GSRunnerMng.instance.getRunner(this.runnerId);
    if (!e) return null;
    if (this._isExcute) {
      let t = e.getLastResult(),
        o = t ? t.getValue() : null;
      this._a.setValue(o + "");
      e.log(`>>assign a = ${o}`);
    } else {
      this._isExcute = !0;
      if (this._b && i.HaseReturnValue(this._b.nodeType)) {
        e.pushInstruction(this);
        n.GSInstructionHelper.ProcessGSNode(e, this._b);
      }
    }
    return null;
  }
  isComplete() {
    return !0;
  }
};