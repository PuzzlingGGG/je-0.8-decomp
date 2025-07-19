"use strict";

exports.GSDataNodeRenderTimeCountDownStart = void 0;
const i = e("../../../Frame/Util"),
  n = e("./GSDataNodeRender");
exports.GSDataNodeRenderTimeCountDownStart = class {
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
      s = a.timer,
      r = a.timerType || 0;
    this._info.error = !a;
    this._info.infoDesc = a ? 0 == r ? `开始倒计时：<color=${n.G_NameColor.toHEX()}>${i.Util.parseLeftTime(s)}</c>` : `开始正计时：<color=${n.G_NameColor.toHEX()}>${i.Util.parseLeftTime(s)}</c>` : "...";
    o.nodeInfo1.setData(this._info, 0);
  }
};