"use strict";

exports.GSDataNodeRenderChangeHeroProperty = void 0;
const i = e("../../../GameScript/index"),
  n = e("../../GSDataNodeChangeActPanel/GSDataNodeActPropertyHelper"),
  a = e("./GSDataNodeRender");
exports.GSDataNodeRenderChangeHeroProperty = class {
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
    let s = this._info.data,
      r = n.GSDataNodeActPropertyHelper.instance.GetPropertyInfo(i.ActType.Hero, s.propertyName);
    this._info.error = !r;
    if (r) {
      let e = r.valueType == i.ActPropertyValueType.Bool ? "1" == s.propertyValue ? "是" : "否" : n.GSDataNodeActPropertyHelper.instance.GetFieldDisplayStr(s.propertyValue, r),
        t = `<color=${a.G_ValueColor.toHEX()}>${e}</c>`,
        o = r.valueType == i.ActPropertyValueType.Float ? s.opType == i.GSComputeType.SUB ? "减少" : s.opType == i.GSComputeType.ADD ? "增加" : "设置" : "设置";
      r.valueType == i.ActPropertyValueType.Float && s.opType != i.GSComputeType.EQUAL ? this._info.infoDesc = `${o}<color=${a.G_NameColor.toHEX()}>主角</c>的<color=${a.G_NameColor.toHEX()}>${"#" + r.str} ${t}</c>` : this._info.infoDesc = `${o}<color=${a.G_NameColor.toHEX()}>主角</c>的<color=${a.G_NameColor.toHEX()}>${"#" + r.str}</c>为${t}`;
    } else this._info.infoDesc = `<color=${cc.Color.RED.toHEX()}>指令无效请删除</c>`;
    o.nodeInfo1.setData(this._info, 0);
  }
};