"use strict";

exports.GSDataNodeRenderChangeActProperty = void 0;
const i = e("../../../Frame/SceneManager"),
  n = e("../../../Game/Player/Mng"),
  a = e("../../../GameScript/index"),
  s = e("../../../Scene/EditWorldScene/EditWorldScene"),
  r = e("../../GSDataNodeChangeActPanel/GSDataNodeActPropertyHelper"),
  l = e("./GSDataNodeRender");
exports.GSDataNodeRenderChangeActProperty = class {
  render(e, t, o) {
    if (this._info) {
      this._info.depth = e;
      this._info.data = t;
      this._info.error = !1;
      this._info.root = o.node;
    } else this._info = {
      render: this,
      depth: e,
      error: !1,
      data: t,
      root: o.node,
      infoDesc: ""
    };
    o.nodeInfo1.node.active = !0;
    o.nodeInfo2.node.active = !1;
    o.nodeInfo1.hasCondition = !1;
    let c,
      d,
      h = i.default.ins.findScene(s.default).worldData.id,
      p = this._info.data,
      u = r.GSDataNodeActPropertyHelper.instance.GetPropertyInfo(p.actType, p.propertyName);
    switch (p.actType) {
      case a.ActType.Tile:
        {
          let e = n.Mng.Ins.worldMng.getTileData(h, p.actorId);
          if (e) {
            d = n.Mng.Ins.tileMng.getOne(e.data.confId).name;
            c = e;
          }
        }
        break;
      case a.ActType.Hero:
      case a.ActType.Enemy:
      case a.ActType.Npc:
        {
          let e = n.Mng.Ins.worldMng.getActorData(h, p.actorId);
          if (e) {
            let t = n.Mng.Ins.actorMng.getOne(e.data.confId);
            d = t ? t.name : e.data.name;
            c = e;
          }
        }
        break;
      case a.ActType.Device:
        {
          let e = n.Mng.Ins.worldMng.getDeviceData(h, p.actorId);
          if (e) {
            let t = n.Mng.Ins.deviceMng.getOne(e.data.confId);
            d = t ? t.name : void 0;
            c = e;
          }
        }
    }
    this._info.error = !c || !u;
    if (c) {
      if (u) {
        let e = u.valueType == a.ActPropertyValueType.Bool ? "1" == p.propertyValue ? "是" : "否" : r.GSDataNodeActPropertyHelper.instance.GetFieldDisplayStr(p.propertyValue, u),
          t = `<color=${l.G_ValueColor.toHEX()}>${e}</c>`,
          o = u.valueType == a.ActPropertyValueType.Float ? p.opType == a.GSComputeType.SUB ? "减少" : p.opType == a.GSComputeType.ADD ? "增加" : "设置" : "设置";
        u.valueType == a.ActPropertyValueType.Float && p.opType != a.GSComputeType.EQUAL ? this._info.infoDesc = `${o}对象<color=${l.G_NameColor.toHEX()}>${"#" + d}</c>的<color=${l.G_NameColor.toHEX()}>${"#" + u.str} ${t}</c>` : this._info.infoDesc = `${o}对象<color=${l.G_NameColor.toHEX()}>${"#" + d}</c>的<color=${l.G_NameColor.toHEX()}>${"#" + u.str}</c>为${t}`;
      } else this._info.infoDesc = `<color=${cc.Color.RED.toHEX()}>指令无效请删除</c>`;
    } else this._info.infoDesc = "...";
    o.nodeInfo1.setData(this._info, 0);
  }
};