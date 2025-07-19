"use strict";

exports.GSExecuteIf = void 0;
const i = e("./GSInstructionHelper"),
  n = e("../GSRunnerMng");
exports.GSExecuteIf = class {
  constructor(e, t, o) {
    this.isLoop = !1;
    this.reset(e, t, o);
  }
  reset(e, t, o) {
    this._compare = e;
    this._logic = t;
    this._block = o;
    this._isExcute = !1;
  }
  excute() {
    let e = n.GSRunnerMng.instance.getRunner(this.runnerId);
    if (!e) return null;
    if (this._isExcute) {
      let t = !1;
      if (e) {
        let o = e.getLastResult();
        o && (t = o.getValue());
      }
      t && this._block && i.GSInstructionHelper.ProcessGSNode(e, this._block);
    } else {
      this._isExcute = !0;
      if (this._compare) {
        e.pushInstruction(this);
        i.GSInstructionHelper.ProcessGSNode(e, this._compare);
      } else if (this._logic) {
        e.pushInstruction(this);
        i.GSInstructionHelper.ProcessGSNode(e, this._logic);
      }
    }
    return null;
  }
  isComplete() {
    return !0;
  }
};