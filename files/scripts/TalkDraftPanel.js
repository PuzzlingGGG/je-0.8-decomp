"use strict";

var i = this && this.__decorate || function (e, t, o, i) {
  var n,
    a = arguments.length,
    s = a < 3 ? t : null === i ? i = Object.getOwnPropertyDescriptor(t, o) : i;
  if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) s = Reflect.decorate(e, t, o, i);else for (var r = e.length - 1; r >= 0; r--) (n = e[r]) && (s = (a < 3 ? n(s) : a > 3 ? n(t, o, s) : n(t, o)) || s);
  return a > 3 && s && Object.defineProperty(t, o, s), s;
};
const n = e("../../CustomUI/ScrollList"),
  a = e("../../Frame/Panel"),
  s = e("../../Game/Player/TalkDraftMng"),
  {
    ccclass: r,
    property: l
  } = cc._decorator;
let c = class extends a.default {
  constructor() {
    super(...arguments);
    this.scrollList = null;
    this.emptyLabel = null;
  }
  onLoad() {
    super.onLoad();
    this.node.on("TalkDraftCell.deleteDraft", this.refresh, this);
    this.refresh();
  }
  refresh() {
    let e = s.default.Ins.loadDraftList();
    this.scrollList.setDataArr(e);
    this.emptyLabel.node.active = 0 == e.length;
  }
};
i([l(n.default)], c.prototype, "scrollList", void 0);
i([l(cc.Label)], c.prototype, "emptyLabel", void 0);
c = i([r], c);
exports.default = c;