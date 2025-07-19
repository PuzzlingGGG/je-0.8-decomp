"use strict";

exports.GSDataNodeRenderSwitchHero = void 0;
const i = e("../../../Game/Player/Mng"),
  n = e("./GSDataNodeRender");
exports.GSDataNodeRenderSwitchHero = class {
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
      s = a.confId ? i.Mng.Ins.actorMng.getOne(a.confId) : null;
    this._info.error = !s;
    this._info.infoDesc = s ? `切换主角为：<color=${n.G_NameColor.toHEX()}>${"#" + s.name}</c>` : "...";
    o.nodeInfo1.setData(this._info, 0);
  }
};