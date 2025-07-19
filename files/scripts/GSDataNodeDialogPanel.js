"use strict";

var i = this && this.__decorate || function (e, t, o, i) {
  var n,
    a = arguments.length,
    s = a < 3 ? t : null === i ? i = Object.getOwnPropertyDescriptor(t, o) : i;
  if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) s = Reflect.decorate(e, t, o, i);else for (var r = e.length - 1; r >= 0; r--) (n = e[r]) && (s = (a < 3 ? n(s) : a > 3 ? n(t, o, s) : n(t, o)) || s);
  return a > 3 && s && Object.defineProperty(t, o, s), s;
};
const n = e("../../GameScript/index"),
  a = e("../../CustomUI/Button"),
  s = e("../../CustomUI/ScrollList"),
  r = e("../../Frame/Panel"),
  {
    ccclass: l,
    property: c
  } = cc._decorator;
let d = class extends r.default {
  constructor() {
    super(...arguments);
    this.addBtn = null;
    this.deleteBtn = null;
    this.moveUpBtn = null;
    this.moveDownBtn = null;
    this.okBtn = null;
    this.list = null;
    this.emptyNode = null;
    this._editData = null;
    this._dialogueLines = null;
  }
  onLoad() {
    super.onLoad();
    this.okBtn.node.on(a.default.CLICK, this.onOkBtn, this);
    this.addBtn.node.on(a.default.CLICK, this.onAddBtn, this);
    this.deleteBtn.node.on(a.default.CLICK, this.onDeleteBtn, this);
    this.moveUpBtn.node.on(a.default.CLICK, this.onMoveUpBtn, this);
    this.moveDownBtn.node.on(a.default.CLICK, this.onMoveDownBtn, this);
  }
  setData(e, t) {
    this._opCallBack = t;
    this._editData = e;
    this._dialogueLines = this._editData ? this._editData.dialogueLines : [];
    this.list.setDataArr(this._dialogueLines);
    this.emptyNode.active = 0 == this._dialogueLines.length;
    this.list.selectByIdx(0);
  }
  onOkBtn() {
    this.closePanel();
    if (!this._editData) {
      this._editData = n.GSDataNodeBuildHelper.NewGSDataNode(n.GSDataNodeType.GINTERACTION_Dialog);
      this._editData.dialogueLines = this._dialogueLines;
    }
    this._opCallBack && this._opCallBack(this._editData);
  }
  onAddBtn() {
    let e = this.list.curSelectIdx;
    this._dialogueLines.splice(e + 1, 0, {
      dialogue: "Conversation",
      actorConfId: "2"
    });
    this.list.setDataArr(this._dialogueLines);
    this.list.selectByIdx(e + 1);
    this.emptyNode.active = 0 == this._dialogueLines.length;
  }
  onDeleteBtn() {
    let e = this.list.curSelectIdx;
    this._dialogueLines.splice(e, 1);
    this.list.setDataArr(this._dialogueLines);
    this.emptyNode.active = 0 == this._dialogueLines.length;
  }
  onMoveUpBtn() {
    let e = this.list.curSelectIdx;
    if (e > 0) {
      let t = this._dialogueLines[e],
        o = this._dialogueLines[e - 1];
      this._dialogueLines[e] = o;
      this._dialogueLines[e - 1] = t;
      this.list.setDataArr(this._dialogueLines);
      this.list.selectByIdx(e - 1);
    }
  }
  onMoveDownBtn() {
    let e = this.list.curSelectIdx;
    if (e < this._dialogueLines.length - 1) {
      let t = this._dialogueLines[e],
        o = this._dialogueLines[e + 1];
      this._dialogueLines[e] = o;
      this._dialogueLines[e + 1] = t;
      this.list.setDataArr(this._dialogueLines);
      this.list.selectByIdx(e + 1);
    }
  }
};
i([c(a.default)], d.prototype, "addBtn", void 0);
i([c(a.default)], d.prototype, "deleteBtn", void 0);
i([c(a.default)], d.prototype, "moveUpBtn", void 0);
i([c(a.default)], d.prototype, "moveDownBtn", void 0);
i([c(a.default)], d.prototype, "okBtn", void 0);
i([c(s.default)], d.prototype, "list", void 0);
i([c(cc.Node)], d.prototype, "emptyNode", void 0);
d = i([l], d);
exports.default = d;