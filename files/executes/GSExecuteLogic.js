"use strict";

exports.GSExecuteLogic = void 0;
const i = e("../GameScriptDefines"),
  n = e("../GameScriptValueType"),
  a = e("./GSInstructionHelper"),
  s = e("../GSParam"),
  r = e("../GSRunnerMng");
exports.GSExecuteLogic = class {
  constructor(e, t, o) {
    this.isLoop = !1;
    this.reset(e, t, o);
  }
  reset(e, t, o) {
    this._logicType = e;
    this._a = t;
    this._b = o;
    this._isExcute = !1;
  }
  excute() {
    let e = r.GSRunnerMng.instance.getRunner(this.runnerId);
    if (!e) return null;
    if (this._isExcute) {
      let t = e.getLastResult(),
        o = !t || t.getValue(),
        a = !(t = e.getLastResult()) || t.getValue(),
        r = !1;
      this._logicType == i.GSLogicType.AND ? r = a && o : this._logicType == i.GSLogicType.OR && (r = a || o);
      e.log(`>>logic ${a} ${i.GSLogicType[this._logicType]} ${o} result = ${r}`);
      return new s.GSParam(!1, n.NewGSValue(i.GSValueType.BOOL, r + ""));
    }
    this._isExcute = !0;
    e.pushInstruction(this);
    this._a && i.HaseReturnValue(this._a.nodeType) ? a.GSInstructionHelper.ProcessGSNode(e, this._a) : a.GSInstructionHelper.ProcessGSNode(e, i.GSNodeBuildHelper.NewIGSNodeValue(!1, -1, i.GSValueType.BOOL, "1"));
    this._b && i.HaseReturnValue(this._b.nodeType) ? a.GSInstructionHelper.ProcessGSNode(e, this._b) : a.GSInstructionHelper.ProcessGSNode(e, i.GSNodeBuildHelper.NewIGSNodeValue(!1, -1, i.GSValueType.BOOL, "1"));
    return null;
  }
  isComplete() {
    return !0;
  }
};