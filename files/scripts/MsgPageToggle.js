"use strict";

var i = this && this.__decorate || function (e, t, o, i) {
  var n,
    a = arguments.length,
    s = a < 3 ? t : null === i ? i = Object.getOwnPropertyDescriptor(t, o) : i;
  if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) s = Reflect.decorate(e, t, o, i);else for (var r = e.length - 1; r >= 0; r--) (n = e[r]) && (s = (a < 3 ? n(s) : a > 3 ? n(t, o, s) : n(t, o)) || s);
  return a > 3 && s && Object.defineProperty(t, o, s), s;
};
const n = e("../../../CustomUI/Button"),
  a = e("../../../Frame/Util"),
  s = e("../../../Game/Player/FollowMng"),
  r = e("../../../Game/Player/MsgMng"),
  l = e("../../../TGA"),
  {
    ccclass: c,
    property: d
  } = cc._decorator;
let h = class extends cc.Component {
  constructor() {
    super(...arguments);
    this.dot = null;
    this.label = null;
  }
  onLoad() {
    cc.game.on("refreshDot", this.refresh, this);
    this.node.on(n.default.CLICK, this.onClick, this);
  }
  onDestroy() {
    cc.game.off("refreshDot", this.refresh, this);
  }
  onEnable() {
    this.refresh();
  }
  onClick() {
    l.TGA.track("click", {
      btn: "msgBtn"
    });
  }
  refresh() {
    let e = s.FollowMng.Ins.newFansCnt + r.MsgMng.Ins.newAggregateMsgCnt + r.MsgMng.Ins.newCommentCnt;
    this.dot.active = e > 0;
    this.label.string = a.Util.dotLabelString(e);
  }
};
i([d(cc.Node)], h.prototype, "dot", void 0);
i([d(cc.Label)], h.prototype, "label", void 0);
h = i([c], h);
exports.default = h;