"use strict";

exports.GSCmdChangeBagItem = void 0;
const i = e("../../Game/Player/GameBagMng"),
  n = e("../GSRunnerMng");
exports.GSCmdChangeBagItem = class {
  constructor() {}
  setParam(e) {
    this._isComplete = !1;
    let t = n.GSRunnerMng.instance.getRunner(this.runnerId),
      o = e.itemId,
      a = e.addValue || 0;
    if (o && 0 != a) {
      e.isReduce ? i.default.Ins.sub(o, a) : i.default.Ins.add(o, a);
      t ? t.log(`>>call game script change bag item command!add[${!e.isReduce}] [${e.itemId}] ${a}]`) : console.log(`>>call game change bag item command!add[${!e.isReduce}] [${e.itemId}] ${a}]`);
    }
  }
  excute() {
    this._isComplete = !0;
  }
  setp() {}
  isComplete() {
    return this._isComplete;
  }
};