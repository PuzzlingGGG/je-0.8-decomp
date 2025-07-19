"use strict";

exports.GSDataNodeRenderDialogue = void 0;
const i = e("./GSDataNodeRender"),
  n = e("../../../Game/Player/Mng");
exports.GSDataNodeRenderDialogue = class {
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
      s = a.dialogueLines && a.dialogueLines.length > 0 ? a.dialogueLines[0] : null,
      r = s && s.actorConfId ? n.Mng.Ins.actorMng.getOne(s.actorConfId) : null;
    this._info.error = !r || !r || !s;
    this._info.infoDesc = a && s ? `${r ? `<color=${i.G_NameColor.toHEX()}>${r.name}</c>` : void 0}: ${s.dialogue}` : "...";
    o.nodeInfo1.setData(this._info, 0);
  }
};