"use strict";

exports.GSExecuteCompute = void 0;
const i = e("../GameScriptDefines"),
  n = e("./GSInstructionHelper"),
  a = e("../GSRunnerMng"),
  s = e("../GSParam"),
  r = e("../GameScriptValueType");
exports.GSExecuteCompute = class {
  constructor(e, t, o) {
    this.isLoop = !1;
    this.reset(e, t, o);
  }
  reset(e, t, o) {
    this._computeType = e;
    this._a = t;
    this._b = o;
    this._isExcute = !1;
  }
  excute() {
    let e = a.GSRunnerMng.instance.getRunner(this.runnerId);
    if (!e) return null;
    if (this._isExcute) {
      let t, o;
      this._b && i.HaseReturnValue(this._b.nodeType) && (o = e.getLastResult());
      this._a && i.HaseReturnValue(this._a.nodeType) && (t = e.getLastResult());
      let n = null;
      t && o ? n = new s.GSParam(!1, r.NewGSValue(t.getValueType(), r.GSComputeValue(t, o, this._computeType))) : t ? n = new s.GSParam(!1, r.NewGSValue(t.getValueType(), t.getValue())) : o && (n = new s.GSParam(!1, r.NewGSValue(o.getValueType(), o.getValue())));
      e.log(`>>compute: ${n ? n.getValue() : null} = ${t.getValue()} ${i.GSComputeType[this._computeType]} ${o.getValue()}`);
      return n;
    }
    this._isExcute = !0;
    if (this._a && i.HaseReturnValue(this._a.nodeType) || this._b && i.HaseReturnValue(this._b.nodeType)) {
      e.pushInstruction(this);
      this._a && i.HaseReturnValue(this._a.nodeType) && n.GSInstructionHelper.ProcessGSNode(e, this._a);
      this._b && i.HaseReturnValue(this._b.nodeType) && n.GSInstructionHelper.ProcessGSNode(e, this._b);
    } else {
      e.warn(`>>compute a[${i.GSNodeType[this._a.nodeType]}] ${this._computeType} b[${i.GSNodeType[this._a.nodeType]}] error!!!`);
      n.GSInstructionHelper.ProcessGSNode(e, i.GSNodeBuildHelper.NewIGSNodeValue(!1, -1, i.GSValueType.INT, "0"));
    }
    return null;
  }
  isComplete() {
    return !0;
  }
};