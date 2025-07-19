"use strict";

exports.GSCmdSetVariable = void 0;
const i = e("../GSRunnerMng"),
  n = e("../GSVariableMng");
exports.GSCmdSetVariable = class {
  constructor() {}
  setParam(e) {
    this._id = e.id;
    this._value = e.value;
  }
  excute() {
    let e = i.GSRunnerMng.instance.getRunner(this.runnerId);
    e && e.log(">>call game script set variable command! id=", this._id, ", value=" + this._value);
    n.GSVariableMng.instance.setVariable(this._id, this._value);
    this._isComplete = !1;
  }
  setp() {
    this._isComplete = !0;
  }
  isComplete() {
    return this._isComplete;
  }
};