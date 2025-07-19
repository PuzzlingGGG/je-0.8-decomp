"use strict";

var i = this && this.__decorate || function (e, t, o, i) {
  var n,
    a = arguments.length,
    s = a < 3 ? t : null === i ? i = Object.getOwnPropertyDescriptor(t, o) : i;
  if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) s = Reflect.decorate(e, t, o, i);else for (var r = e.length - 1; r >= 0; r--) (n = e[r]) && (s = (a < 3 ? n(s) : a > 3 ? n(t, o, s) : n(t, o)) || s);
  return a > 3 && s && Object.defineProperty(t, o, s), s;
};
const n = e("../../CustomUI/Button"),
  a = e("../../Frame/Panel"),
  {
    ccclass: s,
    property: r
  } = cc._decorator;
let l = class extends a.default {
  constructor() {
    super(...arguments);
    this.label_title = null;
    this.okBtn = null;
    this.backBtn = null;
    this.btn1 = null;
    this.btn2 = null;
    this.btn3 = null;
    this.btn4 = null;
    this.btn5 = null;
    this.btn6 = null;
    this.btn7 = null;
    this.btn8 = null;
    this.btn9 = null;
    this.btn0 = null;
    this.btnc = null;
    this.btnSign = null;
    this.ed_box = null;
    this.call = null;
  }
  onLoad() {
    super.onLoad();
    this.okBtn.node.on(n.default.CLICK, this.onClickOk, this);
    this.backBtn.node.on(n.default.CLICK, this.onClickBack, this);
    this.btn0.node.on(n.default.CLICK, this.onClickNumber, this);
    this.btn1.node.on(n.default.CLICK, this.onClickNumber, this);
    this.btn2.node.on(n.default.CLICK, this.onClickNumber, this);
    this.btn3.node.on(n.default.CLICK, this.onClickNumber, this);
    this.btn4.node.on(n.default.CLICK, this.onClickNumber, this);
    this.btn5.node.on(n.default.CLICK, this.onClickNumber, this);
    this.btn6.node.on(n.default.CLICK, this.onClickNumber, this);
    this.btn7.node.on(n.default.CLICK, this.onClickNumber, this);
    this.btn8.node.on(n.default.CLICK, this.onClickNumber, this);
    this.btn9.node.on(n.default.CLICK, this.onClickNumber, this);
    this.btnc.node.on(n.default.CLICK, this.onClickNumber, this);
    this.btnSign.node.on(n.default.CLICK, this.onSignBtn, this);
  }
  onSignBtn() {
    let e = this.ed_box.textLabel.string || "";
    e && (e = e.includes("-") ? e.substr(1, e.length - 1) : "-" + e);
    this.ed_box.string = e;
  }
  onClickNumber(e) {
    let t = this.ed_box.textLabel.string || "";
    if (!(t.length >= this.ed_box.maxLength)) {
      switch (e.node.name[e.node.name.length - 1]) {
        case "1":
          t += "1";
          break;
        case "2":
          t += "2";
          break;
        case "3":
          t += "3";
          break;
        case "4":
          t += "4";
          break;
        case "5":
          t += "5";
          break;
        case "6":
          t += "6";
          break;
        case "7":
          t += "7";
          break;
        case "8":
          t += "8";
          break;
        case "9":
          t += "9";
          break;
        case "0":
          t += "0";
          break;
        case "c":
          t.includes(".") || (t += ".");
      }
      this.ed_box.string = t;
    }
  }
  onClickBack() {
    let e = this.ed_box.textLabel.string;
    e = e.slice(0, -1);
    this.ed_box.string = e;
  }
  onClickOk() {
    let e = this.ed_box.textLabel.string,
      t = Number.parseFloat(e) || 0;
    this.call && this.call(t);
    this.closePanel();
  }
  setData(e, t, o) {
    this.label_title.string = e;
    this.ed_box.string = t;
    this.call = o;
  }
};
i([r(cc.Label)], l.prototype, "label_title", void 0);
i([r(n.default)], l.prototype, "okBtn", void 0);
i([r(n.default)], l.prototype, "backBtn", void 0);
i([r(n.default)], l.prototype, "btn1", void 0);
i([r(n.default)], l.prototype, "btn2", void 0);
i([r(n.default)], l.prototype, "btn3", void 0);
i([r(n.default)], l.prototype, "btn4", void 0);
i([r(n.default)], l.prototype, "btn5", void 0);
i([r(n.default)], l.prototype, "btn6", void 0);
i([r(n.default)], l.prototype, "btn7", void 0);
i([r(n.default)], l.prototype, "btn8", void 0);
i([r(n.default)], l.prototype, "btn9", void 0);
i([r(n.default)], l.prototype, "btn0", void 0);
i([r(n.default)], l.prototype, "btnc", void 0);
i([r(n.default)], l.prototype, "btnSign", void 0);
i([r(cc.EditBox)], l.prototype, "ed_box", void 0);
l = i([s], l);
exports.default = l;