"use strict";

exports.GSExecuteIfElse = void 0;
const i = e("./GSInstructionHelper"),
  n = e("../GSRunnerMng");
exports.GSExecuteIfElse = class {
  constructor(e, t, o, i) {
    this.isLoop = !1;
    this.reset(e, t, o, i);
  }
  reset(e, t, o, i) {
    this._compare = e;
    this._logic = t;
    this._block1 = o;
    this._block2 = i;
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
      t ? this._block1 && i.GSInstructionHelper.ProcessGSNode(e, this._block1) : this._block2 && i.GSInstructionHelper.ProcessGSNode(e, this._block2);
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