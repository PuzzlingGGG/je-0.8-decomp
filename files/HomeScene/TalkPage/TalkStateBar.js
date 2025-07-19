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
const a = e("../../../../i18n/i18nMgr"),
  s = e("../../../CustomUI/Button"),
  r = e("../../../CustomUI/ScrollList"),
  l = e("../../../Frame/UIColor"),
  c = e("../../../Game/Player/TalkMng"),
  d = e("../../../TGA"),
  {
    ccclass: h,
    property: p
  } = cc._decorator;
let u = class extends cc.Component {
  constructor() {
    super(...arguments);
    this.commentCntLabel = null;
    this.upBtn = null;
    this.data = null;
  }
  onLoad() {
    this.node.on(r.default.SET_DATA, this.setData, this);
    this.upBtn.node.on(s.default.CLICK, this.onUpBtn, this);
  }
  setData(e) {
    return n(this, void 0, void 0, function* () {
      this.data = e;
      this.commentCntLabel.string = e.talkData.commentsCntSum + a.I18nMgr.getI18nStringByZh("评论");
      this.upBtn.label.string = e.talkData.upCnt + a.I18nMgr.getI18nStringByZh("点赞");
      this.upBtn.icon.node.color = this.data.talkData.isUp ? l.UIColor.blue : l.UIColor.white;
    });
  }
  onUpBtn() {
    return n(this, void 0, void 0, function* () {
      if (this.data.talkData.isUp) yield c.default.Ins.cancelUpTalk(this.data.talkData.uId);else if (this.data.talkData.isDown) yield c.default.Ins.cancelDownTalk(this.data.talkData.uId);else {
        yield c.default.Ins.upTalk(this.data.talkData.uId);
        d.TGA.track("Talk", {
          step: "clickThumbBtn2"
        });
      }
      this.setData(this.data);
    });
  }
};
i([p(cc.Label)], u.prototype, "commentCntLabel", void 0);
i([p(s.default)], u.prototype, "upBtn", void 0);
u = i([h], u);
exports.default = u;