"use strict";

var i = this && this.__decorate || function (e, t, o, i) {
  var n,
    a = arguments.length,
    s = a < 3 ? t : null === i ? i = Object.getOwnPropertyDescriptor(t, o) : i;
  if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) s = Reflect.decorate(e, t, o, i);else for (var r = e.length - 1; r >= 0; r--) (n = e[r]) && (s = (a < 3 ? n(s) : a > 3 ? n(t, o, s) : n(t, o)) || s);
  return a > 3 && s && Object.defineProperty(t, o, s), s;
};
const n = e("../../CustomUI/Button"),
  a = e("../../CustomUI/ScrollList"),
  s = e("../../CustomUI/Toggle"),
  r = e("../../Frame/Panel"),
  l = e("../../Frame/Util"),
  {
    ccclass: c,
    property: d
  } = cc._decorator;
let h = class extends r.default {
  constructor() {
    super(...arguments);
    this.addBtn = null;
    this.deleteBtn = null;
    this.moveUpBtn = null;
    this.moveDownBtn = null;
    this.okBtn = null;
    this.toggle = null;
    this.list = null;
    this.emptyNode = null;
    this.evt = null;
    this.call = null;
  }
  onLoad() {
    super.onLoad();
    this.okBtn.node.on(n.default.CLICK, this.onOkBtn, this);
    this.addBtn.node.on(n.default.CLICK, this.onAddBtn, this);
    this.deleteBtn.node.on(n.default.CLICK, this.onDeleteBtn, this);
    this.moveUpBtn.node.on(n.default.CLICK, this.onMoveUpBtn, this);
    this.moveDownBtn.node.on(n.default.CLICK, this.onMoveDownBtn, this);
    this.toggle.node.on(s.default.STATE_CHANGE, this.onStateChange, this);
  }
  onStateChange(e, t) {
    t && (this.evt.extra.onlyOnce = e);
  }
  setData(e) {
    this.evt = l.Util.deepCopy(e);
    this.evt.extra || (this.evt.extra = {
      onlyOnce: !0,
      lines: []
    });
    let t = this.evt.extra;
    this.list.setDataArr(t.lines);
    this.emptyNode.active = 0 == t.lines.length;
    this.toggle.isChecked = this.evt.extra.onlyOnce;
    t.lines.length > 0 && this.list.selectByIdx(0);
  }
  onOkBtn() {
    this.closePanel();
    this.call && this.call(this.evt);
  }
  onAddBtn() {
    let e = this.list.curSelectIdx,
      t = this.evt.extra,
      o = this.list.getCurData(),
      i = null;
    i = o ? {
      str: "Conversation",
      actorConfId: o.actorConfId,
      items: []
    } : {
      str: "Conversation",
      actorConfId: "2",
      items: []
    };
    t.lines.splice(e + 1, 0, i);
    this.list.setDataArr(t.lines);
    this.emptyNode.active = 0 == t.lines.length;
    this.list.selectByIdx(e + 1);
  }
  onDeleteBtn() {
    let e = this.list.curSelectIdx,
      t = this.evt.extra;
    t.lines.splice(e, 1);
    this.list.setDataArr(t.lines);
    this.emptyNode.active = 0 == t.lines.length;
  }
  onMoveUpBtn() {
    let e = this.list.curSelectIdx,
      t = this.evt.extra;
    if (e > 0) {
      let o = t.lines[e],
        i = t.lines[e - 1];
      t.lines[e] = i;
      t.lines[e - 1] = o;
      this.list.setDataArr(t.lines);
      this.list.selectByIdx(e - 1);
    }
  }
  onMoveDownBtn() {
    let e = this.list.curSelectIdx,
      t = this.evt.extra;
    if (e < t.lines.length - 1) {
      let o = t.lines[e],
        i = t.lines[e + 1];
      t.lines[e] = i;
      t.lines[e + 1] = o;
      this.list.setDataArr(t.lines);
      this.list.selectByIdx(e + 1);
    }
  }
};
i([d(n.default)], h.prototype, "addBtn", void 0);
i([d(n.default)], h.prototype, "deleteBtn", void 0);
i([d(n.default)], h.prototype, "moveUpBtn", void 0);
i([d(n.default)], h.prototype, "moveDownBtn", void 0);
i([d(n.default)], h.prototype, "okBtn", void 0);
i([d(s.default)], h.prototype, "toggle", void 0);
i([d(a.default)], h.prototype, "list", void 0);
i([d(cc.Node)], h.prototype, "emptyNode", void 0);
h = i([c], h);
exports.default = h;