"use strict";

exports.GSDataNodeActPropertyHelper = void 0;
const i = e("../../Game/Player/Mng"),
  n = e("../../Game/World/Tile"),
  a = e("../../GameScript/index");
class s {
  constructor() {
    this._s_tile_propertyInfos = [{
      str: "显示",
      filedName: "isShow",
      valueType: a.ActPropertyValueType.Bool,
      defaultValue: "true"
    }, {
      str: "血量",
      filedName: "hp",
      valueType: a.ActPropertyValueType.Float,
      valueRange: [0, 999999],
      defaultValue: "1"
    }, {
      str: "阻挡通行",
      filedName: "block",
      valueType: a.ActPropertyValueType.Bool,
      defaultValue: "true"
    }, {
      str: "可摧毁",
      filedName: "canDestroy",
      valueType: a.ActPropertyValueType.Bool,
      defaultValue: "false"
    }];
    this._s_hero_propertyInfos = [{
      str: "血量",
      filedName: "hp",
      valueType: a.ActPropertyValueType.Float,
      valueRange: [0, 999999],
      defaultValue: "1"
    }, {
      str: "血量上限",
      filedName: "hpMax",
      valueType: a.ActPropertyValueType.Float,
      valueRange: [0, 999999],
      defaultValue: "1"
    }, {
      str: "移动速度(格/秒)",
      filedName: "moveSpeed",
      valueType: a.ActPropertyValueType.Float,
      valueRange: [0, 99],
      defaultValue: "160",
      isTileUnit: !0
    }, {
      str: "武器",
      filedName: "gunId",
      valueType: a.ActPropertyValueType.Weapon,
      defaultValue: ""
    }, {
      str: "缩放",
      filedName: "scale",
      valueType: a.ActPropertyValueType.Float,
      valueRange: [.1, 8],
      defaultValue: "1"
    }, {
      str: "跳跃段数",
      filedName: "jumpStep",
      valueType: a.ActPropertyValueType.Float,
      valueRange: [1, 999999],
      defaultValue: "2"
    }, {
      str: "跳跃高度(格)",
      filedName: "jumpHight",
      valueType: a.ActPropertyValueType.Float,
      valueRange: [0, 10],
      defaultValue: "160",
      isTileUnit: !0
    }, {
      str: "爬墙跳",
      filedName: "enableClimbWall",
      valueType: a.ActPropertyValueType.Bool,
      defaultValue: "false"
    }];
    this._s_enemy_propertyInfos = [{
      str: "显示",
      filedName: "isShow",
      valueType: a.ActPropertyValueType.Bool,
      defaultValue: "true"
    }, {
      str: "血量",
      filedName: "hp",
      valueType: a.ActPropertyValueType.Float,
      valueRange: [0, 999999],
      defaultValue: "1"
    }, {
      str: "武器",
      filedName: "gunId",
      valueType: a.ActPropertyValueType.Weapon,
      defaultValue: ""
    }, {
      str: "缩放",
      filedName: "scale",
      valueType: a.ActPropertyValueType.Float,
      valueRange: [.1, 8],
      defaultValue: "1"
    }];
    this._s_npc_propertyInfos = [{
      str: "显示",
      filedName: "isShow",
      valueType: a.ActPropertyValueType.Bool,
      defaultValue: "true"
    }];
    this._s_device_propertyInfos = [{
      str: "显示",
      filedName: "isShow",
      valueType: a.ActPropertyValueType.Bool,
      defaultValue: "true"
    }];
  }
  static get instance() {
    this._instance || (this._instance = new s());
    return this._instance;
  }
  GetPropertyInfoArray(e) {
    switch (e) {
      case a.ActType.Tile:
        return this._s_tile_propertyInfos;
      case a.ActType.Hero:
        return this._s_hero_propertyInfos;
      case a.ActType.Enemy:
        return this._s_enemy_propertyInfos;
      case a.ActType.Npc:
        return this._s_npc_propertyInfos;
      case a.ActType.Device:
        return this._s_device_propertyInfos;
    }
  }
  GetPropertyInfo(e, t) {
    let o = this.GetPropertyInfoArray(e),
      i = o ? o.find(e => e.filedName == t) : null;
    i || console.error(`Not found actor[${a.ActType[e]}] property[${t}]`);
    return i;
  }
  GetFieldDefaultValue(e) {
    let t = "0";
    if (!e) return t;
    let o = e.defaultValue;
    switch (e.valueType) {
      case a.ActPropertyValueType.Float:
        {
          let i = parseFloat(o) || 0;
          e.isTileUnit && (i /= n.default.SIZE);
          t = i + "";
        }
        break;
      case a.ActPropertyValueType.Bool:
        o && (t = ("true" == o || parseFloat(o) > 0) + "");
        break;
      case a.ActPropertyValueType.Weapon:
        o && (t = o + "");
    }
    return t;
  }
  GetFieldValue(e, t) {
    let o = "0";
    if (!t) return o;
    let i = e[t.filedName];
    if (i) switch (t.valueType) {
      case a.ActPropertyValueType.Float:
        {
          let e = parseFloat(i) || 0;
          t.isTileUnit && (e /= n.default.SIZE);
          o = e + "";
        }
        break;
      case a.ActPropertyValueType.Bool:
        i && (o = ("true" == i || parseFloat(i) > 0) + "");
        break;
      case a.ActPropertyValueType.Weapon:
        i && (o = i + "");
    }
    return o;
  }
  GetFieldDisplayStr(e, t) {
    if (!t) return e;
    let o = e;
    if (t.valueType == a.ActPropertyValueType.Weapon) {
      let t = i.Mng.Ins.weaponMng.getOne(e);
      t && (o = t.name);
    }
    return o;
  }
}
exports.GSDataNodeActPropertyHelper = s;