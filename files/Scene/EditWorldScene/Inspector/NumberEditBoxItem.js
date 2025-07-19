"use strict";

var i = this && this.__decorate || function (e, t, o, i) {
    var n,
      a = arguments.length,
      s = a < 3 ? t : null === i ? i = Object.getOwnPropertyDescriptor(t, o) : i;
    if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) s = Reflect.decorate(e, t, o, i);else for (var r = e.length - 1; r >= 0; r--) (n = e[r]) && (s = (a < 3 ? n(s) : a > 3 ? n(t, o, s) : n(t, o)) || s);
    return a > 3 && s && Object.defineProperty(t, o, s), s;
  },
  n = this && this.__awaiter || function (e, t, o, i) {
    return new (o || (o = Promise))(function (n, a) {
      function s(e) {
        try {
          l(i.next(e));
        } catch (e) {
          a(e);
        }
      }
      function r(e) {
        try {
          l(i.throw(e));
        } catch (e) {
          a(e);
        }
      }
      function l(e) {
        e.done ? n(e.value) : (t = e.value, t instanceof o ? t : new o(function (e) {
          e(t);
        })).then(s, r);
        var t;
      }
      l((i = i.apply(e, t || [])).next());
    });
  };
const a = e("../../../CustomUI/Button"),
  s = e("../../../Frame/SceneManager"),
  {
    ccclass: r,
    property: l
  } = cc._decorator;
let c = class extends cc.Component {
  constructor() {
    super(...arguments);
    this.nameLabel = null;
    this.surfixLabel = null;
    this.editor = null;
    this.label_num = null;
    this.onChange = null;
  }
  setData(e, t, o) {
    this.editor.off(a.default.CLICK, this.onClickBtn, this);
    this.editor.removeComponent(a.default);
    this.editor.addComponent(a.default);
    this.editor.on(a.default.CLICK, this.onClickBtn, this);
    this.onChange = o;
    this._name = e;
    this.nameLabel && (this.nameLabel.string = e);
    this.surfixLabel && (this.surfixLabel.string = "");
    this.label_num.node.active = !0;
    this.label_num.string = t;
  }
  setDataWithSurfix(e, t, o, i) {
    this.editor.off(a.default.CLICK, this.onClickBtn, this);
    this.editor.removeComponent(a.default);
    this.editor.addComponent(a.default);
    this.editor.on(a.default.CLICK, this.onClickBtn, this);
    this.onChange = i;
    this._name = e;
    this.nameLabel && (this.nameLabel.string = e);
    this.surfixLabel && (this.surfixLabel.string = t);
    this.label_num.node.active = !0;
    this.label_num.string = o;
  }
  onClickBtn() {
    return n(this, void 0, void 0, function* () {
      s.default.ins.OpenPanelByName("NumberInputPanel", e => {
        e.setData(this._name, this.label_num.string, e => {
          this.label_num.string = e;
          this.onChange && this.onChange(e);
        });
      });
    });
  }
};
i([l(cc.Label)], c.prototype, "nameLabel", void 0);
i([l(cc.Label)], c.prototype, "surfixLabel", void 0);
i([l(cc.Node)], c.prototype, "editor", void 0);
i([l(cc.Label)], c.prototype, "label_num", void 0);
c = i([r], c);
exports.default = c;