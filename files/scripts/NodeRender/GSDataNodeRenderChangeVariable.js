"use strict";

exports.GSDataNodeRenderChangeVariable = void 0;
const i = e("../../../GameScript/index"),
  n = e("./GSDataNodeRender");
exports.GSDataNodeRenderChangeVariable = class {
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
      s = a.v && a.v.isRef ? i.GSVariableMng.instance.getVariable(a.v.refId) : null,
      r = a.a && a.a.isRef ? i.GSVariableMng.instance.getVariable(a.a.refId) : null;
    this._info.error = !s || a.a.isRef && !r;
    if (s) {
      let e = a.a ? a.a.valueType == i.GSValueType.BOOL ? "1" == a.a.value ? "开" : "关" : a.a.value : "null",
        t = r ? `<color=${n.G_NameColor.toHEX()}>${"#" + r.name}</c>` : `<color=${n.G_ValueColor.toHEX()}>${e}</c>`;
      this._info.infoDesc = `${s ? `<color=${n.G_NameColor.toHEX()}>${"#" + s.name}</c>` : void 0} ${i.GSComputeTypeStrMap.get(a.computeType)} ${t} `;
    } else this._info.infoDesc = "...";
    o.nodeInfo1.setData(this._info, 0);
  }
};