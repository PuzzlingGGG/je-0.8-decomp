"use strict";

exports.CreateCommonHelperFactory = void 0;
const i = e("../../GameData/GameTypeDefine"),
  n = e("./CreateBulletHelper"),
  a = e("./CreateTileHelper"),
  s = e("./CreateWeaponHelper");
class r {
  constructor() {
    this._helperCatchTable = new Map();
  }
  static get instance() {
    if (!this._instance) {
      this._instance = new r();
      this._instance.AddHelperInfo(i.CommonDataType.Tile, a.TileOptionHelper);
      this._instance.AddHelperInfo(i.CommonDataType.Weapon, s.CreateWeaponHelper);
      this._instance.AddHelperInfo(i.CommonDataType.Bullet, n.CreateBulletHelper);
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
    if (this._helperCatchTable.has(e)) {
      let t = this._helperCatchTable.get(e);
      t.catch || (t.catch = new t.typeIns());
      return t.catch;
    }
    return null;
  }
}
exports.CreateCommonHelperFactory = r;