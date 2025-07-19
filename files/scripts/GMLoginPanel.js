"use strict";

var i = this && this.__decorate || function (e, t, o, i) {
  var n,
    a = arguments.length,
    s = a < 3 ? t : null === i ? i = Object.getOwnPropertyDescriptor(t, o) : i;
  if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) s = Reflect.decorate(e, t, o, i);else for (var r = e.length - 1; r >= 0; r--) (n = e[r]) && (s = (a < 3 ? n(s) : a > 3 ? n(t, o, s) : n(t, o)) || s);
  return a > 3 && s && Object.defineProperty(t, o, s), s;
};
const n = e("../../../i18n/i18nMgr"),
  a = e("../../CustomUI/Button"),
  s = e("../../Frame/Panel"),
  r = e("../../Frame/Pool"),
  l = e("../../Scene/EditWorldScene/Inspector/ButtonItem"),
  c = e("../../Scene/EditWorldScene/Inspector/EditBoxItem"),
  {
    ccclass: d,
    property: h
  } = cc._decorator;
let p = class extends s.default {
  constructor() {
    super(...arguments);
    this.okBtn = null;
    this.content = null;
    this.buttonPool = null;
    this.editBoxPool = null;
    this._roleId = 0;
    this._secret = "";
  }
  onLoad() {
    super.onLoad();
    this.okBtn.node.on(a.default.CLICK, this.onOkBtn, this);
  }
  reset() {
    for (let e = this.content.childrenCount - 1; e >= 0; e--) {
      let t = this.content.children[e];
      t.emit(r.default.PUT);
      t.scale = 1;
    }
  }
  Show(e) {
    this.reset();
    this._setCallBack = e;
    this.addEditBox(n.I18nMgr.getI18nStringByZh("用户ID"), "", e => {
      this._roleId = parseInt(e);
    });
    this.addEditBox(n.I18nMgr.getI18nStringByZh("密码"), "", e => {
      this._secret = e;
    });
  }
  closePanel() {
    super.closePanel();
    this._setCallBack && this._setCallBack(this._roleId, this._secret);
  }
  onOkBtn() {
    this.closePanel();
  }
  addButton(e, t, o) {
    let i = this.buttonPool.get().getComponent(l.default);
    this.content.addChild(i.node);
    i.setData(e, t, o);
    return i;
  }
  addEditBox(e, t, o) {
    let i = this.editBoxPool.get().getComponent(c.default);
    this.content.addChild(i.node);
    i.setData(e, t, o);
    return i;
  }
};
i([h(cc.Button)], p.prototype, "okBtn", void 0);
i([h(cc.Node)], p.prototype, "content", void 0);
i([h(r.default)], p.prototype, "buttonPool", void 0);
i([h(r.default)], p.prototype, "editBoxPool", void 0);
p = i([d], p);
exports.default = p;