"use strict";

exports.GSDataNodeRenderFlowIfElse = void 0;
const i = e("../../../GameScript/index");
exports.GSDataNodeRenderFlowIfElse = class {
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
    let n = this._info.data;
    o.nodeInfo1.node.active = !0;
    o.nodeInfo2.node.active = !0;
    o.nodeInfo1.hasCondition = !0;
    o.nodeInfo2.hasCondition = !0;
    let a = 72;
    if (n.childs_true && n.childs_true.length > 0) for (let e of n.childs_true) a += i.GSUtil.caculateNodeRenderHeight(e, 70, 2) + 2;
    o.nodeInfo2.node.y = -a;
    o.nodeInfo1.setData(this._info, 0, n.condition, n.childs_true);
    o.nodeInfo2.setData(this._info, 1, null, n.childs_false);
  }
};