"use strict";

exports.GSCmdChangeHeroProperty = void 0;
const i = e("../../Frame/SceneManager"),
  n = e("../../Scene/GameScene/GameScene"),
  a = e("../GameScriptDefines"),
  s = e("../GSRunnerMng");
exports.GSCmdChangeHeroProperty = class {
  constructor() {}
  setParam(e) {
    if (!e) return;
    this._isComplete = !1;
    let t = i.default.ins.findScene(n.default),
      o = e.opType == a.GSComputeType.SUB,
      r = e.opType == a.GSComputeType.ADD,
      l = t.world.hero,
      c = s.GSRunnerMng.instance.getRunner(this.runnerId);
    if (l) {
      l.setProperty && l.setProperty(e.propertyName, e.propertyValue, o, r, e.isTileUnit);
      c && c.log(`>>call game script op[${e.opType}] hero property command!hero[${l.data.name}] property[${e.propertyName}] value[${e.propertyValue}]`);
    } else c && c.error(">>not found hero");
  }
  excute() {
    this._isComplete = !0;
  }
  setp() {}
  isComplete() {
    return this._isComplete;
  }
};