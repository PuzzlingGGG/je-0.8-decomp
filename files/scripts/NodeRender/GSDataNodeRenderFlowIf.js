"use strict";

exports.GSDataNodeRenderFlowIf = void 0;
exports.GSDataNodeRenderFlowIf = class {
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
    let i = this._info.data;
    o.nodeInfo1.node.active = !0;
    o.nodeInfo2.node.active = !1;
    o.nodeInfo1.hasCondition = !0;
    o.nodeInfo1.setData(this._info, 0, i.condition, i.childs);
  }
};