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
exports.TalkCommentMoreCellData = void 0;
const a = e("../../../../i18n/i18nMgr"),
  s = e("../../../CustomUI/Button"),
  r = e("../../../CustomUI/ScrollList"),
  l = e("../../../Frame/Util"),
  c = e("../../../Game/Player/TalkMng"),
  d = e("./TalkCommentMng"),
  {
    ccclass: h,
    property: p
  } = cc._decorator;
exports.TalkCommentMoreCellData = class {};
let u = class extends cc.Component {
  constructor() {
    super(...arguments);
    this.moreBtn = null;
    this.data = null;
  }
  onLoad() {
    this.node.on(r.default.SET_DATA, this.setData, this);
    this.moreBtn.node.on(s.default.CLICK, this.onMoreBtn, this);
  }
  setData(e) {
    this.data = e;
    let t = e.comment;
    if (t.openCnt < t.subCommentsCnt) {
      this.moreBtn.label.string = a.I18nMgr.exceI18nStringByZh("展开${comment.subCommentsCnt - comment.openCnt}条回复", [{
        paramName: "comment.subCommentsCnt - comment.openCnt",
        param: t.subCommentsCnt - t.openCnt
      }]);
      this.moreBtn.icon.node.angle = 90;
    } else {
      this.moreBtn.label.string = "收起";
      this.moreBtn.icon.node.angle = -90;
    }
    l.Util.updateLabel(this.moreBtn.label);
    l.Util.updateAllLayout(this.moreBtn.node);
  }
  onMoreBtn() {
    return n(this, void 0, void 0, function* () {
      let e = this.data.comment;
      if (this.moreBtn.label.string.includes(a.I18nMgr.getI18nStringByZh("展开"))) {
        let t = yield d.TalkCommentMng.Ins.loadSubTalkComment(e.id);
        e.openCnt = Math.min(t.length, e.openCnt + 5);
      } else e.openCnt = 0;
      cc.game.emit(c.default.Talk_Refresh);
    });
  }
};
i([p(s.default)], u.prototype, "moreBtn", void 0);
u = i([h], u);
exports.default = u;