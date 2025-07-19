"use strict";

exports.CommonOptionHelperFactory = void 0;
const i = e("../../GameData/GameTypeDefine"),
  n = e("./ActorOptionHelper"),
  a = e("./BulletOptionHelper"),
  s = e("./DeviceOptionHelper"),
  r = e("./PropOptionHelper"),
  l = e("./TileOptionHelper"),
  c = e("./WeaponOptionHelper");
class d {
  constructor() {
    this._helperCatchTable = new Map();
  }
  static get instance() {
    if (!this._instance) {
      this._instance = new d();
      this._instance.AddHelperInfo(i.CommonDataType.Tile, l.TileOptionHelper);
      this._instance.AddHelperInfo(i.CommonDataType.Actor, n.ActorOptionHelper);
      this._instance.AddHelperInfo(i.CommonDataType.Device, s.DeviceOptionHelper);
      this._instance.AddHelperInfo(i.CommonDataType.Prop, r.PropOptionHelper);
      this._instance.AddHelperInfo(i.CommonDataType.Weapon, c.WeaponOptionHelper);
      this._instance.AddHelperInfo(i.CommonDataType.Bullet, a.BulletOptionHelper);
    }
    return this._instance;
  }
  AddHelperInfo(e, t) {
    this._helperCatchTable.has(e) || this._helperCatchTable.set(e, {
      typeIns: t,
      catch: null
    });
  }
  GetGommonOptionHelper(e) {
    if (this._helperCatchTable.has(e.type)) {
      let t = this._helperCatchTable.get(e.type);
      t.catch || (t.catch = new t.typeIns());
      t.catch.setConf(e);
      return t.catch;
    }
    return null;
  }
}
exports.CommonOptionHelperFactory = d;