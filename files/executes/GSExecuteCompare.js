"use strict";

exports.GSExecuteCompare = void 0;
const i = e("../GameScriptDefines"),
  n = e("../GameScriptValueType"),
  a = e("../GSParam"),
  s = e("../GSRunnerMng"),
  r = e("./GSInstructionHelper");
exports.GSExecuteCompare = class {
  constructor(e, t, o) {
    this.isLoop = !1;
    this.reset(e, t, o);
  }
  reset(e, t, o) {
    this._compareType = e;
    this._a = t;
    this._b = o;
    this._isExcute = !1;
  }
  excute() {
    let e = s.GSRunnerMng.instance.getRunner(this.runnerId);
    if (!e) return null;
    if (this._isExcute) {
      let t = e.getLastResult(),
        o = t ? t.getValue() : null,
        s = (t = e.getLastResult()) ? t.getValue() : null,
        r = !1;
      null == s || null == o ? r = !1 : this._compareType == i.GSCompareType.NONEQUAL ? r = s != o : this._compareType == i.GSCompareType.EQUAL ? r = s == o : this._compareType == i.GSCompareType.GREATER ? r = s > o : this._compareType == i.GSCompareType.GREATER_EQUAL ? r = s >= o : this._compareType == i.GSCompareType.LESS ? r = s < o : this._compareType == i.GSCompareType.LESS_EQUAL && (r = s <= o);
      e.log(`>>compare ${s} ${i.GSCompareType[this._compareType]} ${o} result = ${r}`);
      return new a.GSParam(!1, n.NewGSValue(i.GSValueType.BOOL, r + ""));
    }
    this._isExcute = !0;
    e.pushInstruction(this);
    this._a && i.HaseReturnValue(this._a.nodeType) ? r.GSInstructionHelper.ProcessGSNode(e, this._a) : r.GSInstructionHelper.ProcessGSNode(e, i.GSNodeBuildHelper.NewIGSNodeValue(!1, -1, i.GSValueType.BOOL, "1"));
    this._b && i.HaseReturnValue(this._b.nodeType) ? r.GSInstructionHelper.ProcessGSNode(e, this._b) : r.GSInstructionHelper.ProcessGSNode(e, i.GSNodeBuildHelper.NewIGSNodeValue(!1, -1, i.GSValueType.BOOL, "1"));
    return null;
  }
  isComplete() {
    return !0;
  }
};