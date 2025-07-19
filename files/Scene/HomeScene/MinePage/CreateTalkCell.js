"use strict";

var i = this && this.__decorate || function (e, t, o, i) {
  var n,
    a = arguments.length,
    s = a < 3 ? t : null === i ? i = Object.getOwnPropertyDescriptor(t, o) : i;
  if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) s = Reflect.decorate(e, t, o, i);else for (var r = e.length - 1; r >= 0; r--) (n = e[r]) && (s = (a < 3 ? n(s) : a > 3 ? n(t, o, s) : n(t, o)) || s);
  return a > 3 && s && Object.defineProperty(t, o, s), s;
};
const n = e("../../../CustomUI/Button"),
  a = e("../../../Frame/SceneManager"),
  s = e("../../../Frame/Top"),
  r = e("../../../Game/Hortor"),
  l = e("../../../Game/OperationFlow"),
  c = e("../../../Game/Player/DynamicMng"),
  d = e("../../../Game/Player/TalkMng"),
  h = e("../../../Role"),
  p = e("../../../TGA"),
  {
    ccclass: u,
    property: m
  } = cc._decorator;
let f = class extends cc.Component {
  constructor() {
    super(...arguments);
    this.createBtn = null;
    this.draftBtn = null;
  }
  onLoad() {
    this.createBtn.node.on(n.default.CLICK, this.onCreateBtn, this);
    this.draftBtn.node.on(n.default.CLICK, this.onDraftBtn, this);
  }
  onCreateBtn() {
    if (!c.DynamicMng.Ins.isDisable(c.FunctionEnum.PublishTalk, !0)) if (r.Hortor.isVisitor()) l.OperationFlow.openVisitorPanel();else if (h.default.Ins.role.level < d.default.UnlockPublishLvl) s.default.showToast("等级5解锁");else {
      p.TGA.track("Talk", {
        step: "clickCreateBtn"
      });
      a.default.ins.Enter("EditTalkScene", e => {
        e.toCreateStyle();
      }, a.ShiftAnima.moveLeftShift);
    }
  }
  onDraftBtn() {
    c.DynamicMng.Ins.isDisable(c.FunctionEnum.PublishTalk, !0) || (r.Hortor.isVisitor() ? l.OperationFlow.openVisitorPanel() : h.default.Ins.role.level < d.default.UnlockPublishLvl ? s.default.showToast("等级5解锁") : a.default.ins.OpenPanelByName("TalkDraftPanel"));
  }
};
i([m(n.default)], f.prototype, "createBtn", void 0);
i([m(n.default)], f.prototype, "draftBtn", void 0);
f = i([u], f);
exports.default = f;