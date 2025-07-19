"use strict";

exports.GSCmdCameraShake = void 0;
const i = e("../../Frame/SceneManager"),
  n = e("../../Frame/TweenUtil"),
  a = e("../../Scene/GameScene/GameScene"),
  s = e("../GSRunnerMng");
exports.GSCmdCameraShake = class {
  constructor() {}
  setParam(e) {
    this._isComplete = !1;
    let t = s.GSRunnerMng.instance.getRunner(this.runnerId);
    if (t) {
      t.log(`>>call game script camera shake command!speed[${!e.speed}], range[${e.range}], times[${e.times}]`);
      let o = i.default.ins.findScene(a.default);
      if (o) {
        let t = o.world;
        n.TweenUtil.applyShake(t.camera.node, e, () => {
          this._isComplete = !0;
        });
      }
    }
  }
  excute() {}
  setp() {}
  isComplete() {
    return this._isComplete;
  }
};