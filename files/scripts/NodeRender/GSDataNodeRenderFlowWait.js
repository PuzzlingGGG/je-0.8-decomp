"use strict";

exports.GSDataNodeRenderFlowWait = void 0;
const i = e("./GSDataNodeRender");
exports.GSDataNodeRenderFlowWait = class {
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
    let n = this._info.data;
    this._info.infoDesc = `等待 <color=${i.G_ValueColor.toHEX()}>${n.waitSecond}</c>秒`;
    o.nodeInfo1.setData(this._info, 0);
  }
};