"use strict";

var i = this && this.__decorate || function (e, t, o, i) {
  var n,
    a = arguments.length,
    s = a < 3 ? t : null === i ? i = Object.getOwnPropertyDescriptor(t, o) : i;
  if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) s = Reflect.decorate(e, t, o, i);else for (var r = e.length - 1; r >= 0; r--) (n = e[r]) && (s = (a < 3 ? n(s) : a > 3 ? n(t, o, s) : n(t, o)) || s);
  return a > 3 && s && Object.defineProperty(t, o, s), s;
};
exports.CommentHeadCellData = void 0;
const n = e("../../../i18n/i18nMgr"),
  a = e("../../CustomUI/ScrollList"),
  {
    ccclass: s,
    property: r
  } = cc._decorator;
exports.CommentHeadCellData = class {};
let l = class extends cc.Component {
  constructor() {
    super(...arguments);
    this.commentCntLabel = null;
  }
  onLoad() {
    this.node.on(a.default.SET_DATA, this.setData, this);
  }
  setData(e) {
    this.commentCntLabel.string = n.I18nMgr.exceI18nStringByZh("评论(${detail.cnt})", [{
      paramName: "detail.cnt",
      param: e.cnt
    }]);
  }
};
i([r(cc.Label)], l.prototype, "commentCntLabel", void 0);
l = i([s], l);
exports.default = l;