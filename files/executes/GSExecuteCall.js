"use strict";

exports.GSExecuteCall = void 0;
const i = e("../GSCmdMng");
exports.GSExecuteCall = class {
  constructor(e, t) {
    this.isLoop = !1;
    this.reset(e, t);
  }
  reset(e, t) {
    this._cmdType = e;
    this._param = t;
    this._isExcute = !1;
  }
  excute() {
    if (this._isExcute) this._cmd && this._cmd.setp();else {
      this._isExcute = !0;
      this._cmd = i.GSCmdMng.instance.getCmd(this.runnerId, this._cmdType);
      this._cmd.setParam(this._param);
      this._cmd.excute();
    }
    return null;
  }
  isComplete() {
    return !this._cmd || this._cmd.isComplete();
  }
};