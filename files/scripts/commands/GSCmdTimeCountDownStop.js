"use strict";

exports.GSCmdTimeCountDownStop = void 0;
const i = e("../../Frame/SceneManager"),
  n = e("../../Scene/GameScene/GameScene"),
  a = e("../GSRunnerMng");
exports.GSCmdTimeCountDownStop = class {
  constructor() {}
  setParam(e) {
    this._isComplete = !1;
    let t = a.GSRunnerMng.instance.getRunner(this.runnerId);
    t ? t.log(">>call game script time count down stop command!") : console.log(">>call game script time count down stop command!");
    this.stopTime();
  }
  excute() {}
  setp() {}
  isComplete() {
    return this._isComplete;
  }
  stopTime() {
    let e = i.default.ins.findScene(n.default);
    e && e.onStopGameTimer();
    this._isComplete = !0;
  }
};