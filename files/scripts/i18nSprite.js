"use strict";

var i = this && this.__decorate || function (e, t, o, i) {
  var n,
    a = arguments.length,
    s = a < 3 ? t : null === i ? i = Object.getOwnPropertyDescriptor(t, o) : i;
  if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) s = Reflect.decorate(e, t, o, i);else for (var r = e.length - 1; r >= 0; r--) (n = e[r]) && (s = (a < 3 ? n(s) : a > 3 ? n(t, o, s) : n(t, o)) || s);
  return a > 3 && s && Object.defineProperty(t, o, s), s;
};
exports.i18nSprite = void 0;
const n = e("./i18nMgr"),
  {
    ccclass: a,
    property: s,
    executeInEditMode: r,
    disallowMultiple: l,
    requireComponent: c,
    menu: d
  } = cc._decorator;
let h = class extends cc.Component {
  constructor() {
    super(...arguments);
    this.i18n_string = "";
  }
  start() {
    n.I18nMgr._addOrDelSprite(this, !0);
    this._resetValue();
  }
  get string() {
    return this.i18n_string;
  }
  set string(e) {
    this.i18n_string = e;
    let t = this.getComponent(cc.Sprite);
    cc.isValid(t) && n.I18nMgr.getSprite(e, e => {
      cc.isValid(t) && (t.spriteFrame = e);
    });
  }
  _resetValue() {
    this.string = this.i18n_string;
  }
  onDestroy() {
    n.I18nMgr._addOrDelSprite(this, !1);
  }
};
i([s({
  visible: !1
})], h.prototype, "i18n_string", void 0);
i([s({
  type: cc.String
})], h.prototype, "string", null);
h = i([a, r, c(cc.Sprite), l, d("多语言/i18nSprite")], h);
exports.i18nSprite = h;