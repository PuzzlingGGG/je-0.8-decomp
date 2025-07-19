"use strict";

exports.GSCmdShowGameOver = void 0;
const i = e("../../Frame/SceneManager"),
  n = e("../../Scene/GameScene/GameScene"),
  a = e("../GSRunnerMng");
exports.GSCmdShowGameOver = class {
  constructor() {}
  setParam(e) {
    this._isComplete = !1;
    let t = a.GSRunnerMng.instance.getRunner(this.runnerId);
    if (t) {
      t.log(`>>call game script show game over command!content[${!e.content}]`);
      let o = i.default.ins.findScene(n.default);
      o && o.gameOver({
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