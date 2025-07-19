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
  s = e("../../Frame/Panel"),
  r = e("../../Frame/Top"),
  {
    ccclass: l,
    property: c
  } = cc._decorator;
let d = class extends s.default {
  constructor() {
    super(...arguments);
    this.editBox = null;
    this.okBtn = null;
    this._editData = null;
  }
  onLoad() {
    super.onLoad();
    this.okBtn.node.on(a.default.CLICK, this.onOkBtn, this);
  }
  setData(e, t) {
    this._opCallBack = t;
    this._editData = e;
    this._editData ? this.editBox.string = this._editData.content : this.editBox.string = "Game Over";
  }
  onOkBtn() {
    if ("" != this.editBox.string) {
      this.closePanel();
      if (this._opCallBack) {
        let e = this._editData || n.GSDataNodeBuildHelper.NewGSDataNode(n.GSDataNodeType.GSYS_ShowGameOver);
        e.content = this.editBox.string;
        this._opCallBack(e);
      }
    } else r.default.showToast("请输入内容");
  }
};
i([c(cc.EditBox)], d.prototype, "editBox", void 0);
i([c(a.default)], d.prototype, "okBtn", void 0);
d = i([l], d);
exports.default = d;