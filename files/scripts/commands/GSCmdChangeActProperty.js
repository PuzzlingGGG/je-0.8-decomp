"use strict";

exports.GSCmdChangeActProperty = void 0;
const i = e("../../Frame/SceneManager"),
  n = e("../../Scene/GameScene/GameScene"),
  a = e("../GameScriptData"),
  s = e("../GameScriptDefines"),
  r = e("../GSRunnerMng");
exports.GSCmdChangeActProperty = class {
  constructor() {}
  setParam(e) {
    if (!e) return;
    this._isComplete = !1;
    let t,
      o = i.default.ins.findScene(n.default),
      l = e.opType == s.GSComputeType.SUB,
      c = e.opType == s.GSComputeType.ADD;
    switch (e.actType) {
      case a.ActType.Tile:
        {
          let i = t = o.world.GetTileByDataId(e.actorId);
          i && i.setProperty(e.propertyName, e.propertyValue, l, c, e.isTileUnit);
        }
        break;
      case a.ActType.Hero:
      case a.ActType.Enemy:
      case a.ActType.Npc:
      case a.ActType.Device:
        {
          let i = t = o.world.GetActNodeByDataId(e.actorId);
          i && i.setProperty && i.setProperty(e.propertyName, e.propertyValue, l, c, e.isTileUnit);
        }
    }
    let d = r.GSRunnerMng.instance.getRunner(this.runnerId);
    t || d && d.error(`>>not found act[${e.actType}] actorId[${e.actorId}]`);
    d && d.log(`>>call game script op[${e.opType}] act property command!act[${e.actType}] property[${e.propertyName}] value[${e.propertyValue}]`);
  }
  excute() {
    this._isComplete = !0;
  }
  setp() {}
  isComplete() {
    return this._isComplete;
  }
};