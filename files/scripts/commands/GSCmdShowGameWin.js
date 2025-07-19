"use strict";

exports.GSCmdShowGameWin = void 0;
const i = e("../../Frame/SceneManager"),
  n = e("../../Scene/GameScene/GameScene"),
  a = e("../GSRunnerMng");
exports.GSCmdShowGameWin = class {
  constructor() {}
  setParam(e) {
    this._isComplete = !1;
    let t = a.GSRunnerMng.instance.getRunner(this.runnerId);
    if (t) {
      t.log(`>>call game script show game win command!content[${!e.content}]`);
      let o = i.default.ins.findScene(n.default);
      o && o.gameWin({
        str: e.content
      }, () => {
        t.stop();
      });
    }
  }
  excute() {}
  setp() {}
  isComplete() {
    return this._isComplete;
  }
};