"use strict";

exports.GSCmdSwitchMap = void 0;
const i = e("../../Frame/SceneManager"),
  n = e("../../Scene/GameScene/GameScene"),
  a = e("../GSRunnerMng");
exports.GSCmdSwitchMap = class {
  constructor() {}
  setParam(e) {
    this._isComplete = !1;
    let t = a.GSRunnerMng.instance.getRunner(this.runnerId);
    if (t) {
      t.log(`>>call game script switch map command!map[${!e.worldId}], coor[${e.coor.iCol}, ${e.coor.iRow}]`);
      let o = i.default.ins.findScene(n.default);
      o && o.shiftWorldById({
        id: e.worldId,
        onWorldReady: () => {
          t.stop();
          o.world.hero && o.world.moveActor(o.world.hero, e.coor);
        }
      });
    }
  }
  excute() {}
  setp() {}
  isComplete() {
    return this._isComplete;
  }
};