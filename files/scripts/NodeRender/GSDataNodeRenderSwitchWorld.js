"use strict";

exports.GSDataNodeRenderSwitchWorld = void 0;
const i = e("../../../Game/Player/Mng"),
  n = e("./GSDataNodeRender");
exports.GSDataNodeRenderSwitchWorld = class {
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
    let a = this._info.data,
      s = a.worldId ? i.Mng.Ins.worldMng.getOne(a.worldId) : null;
    this._info.error = !s;
    this._info.infoDesc = s ? `进入地图<color=${n.G_NameColor.toHEX()}>${"#" + s.info.name}</c> <color=${n.G_ValueColor.toHEX()}>坐标:[${a.coor.iCol}, ${a.coor.iCol}]</c>` : "...";
    o.nodeInfo1.setData(this._info, 0);
  }
};