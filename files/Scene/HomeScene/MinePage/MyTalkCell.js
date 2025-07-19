"use strict";

var i,
  n = this && this.__decorate || function (e, t, o, i) {
    var n,
      a = arguments.length,
      s = a < 3 ? t : null === i ? i = Object.getOwnPropertyDescriptor(t, o) : i;
    if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) s = Reflect.decorate(e, t, o, i);else for (var r = e.length - 1; r >= 0; r--) (n = e[r]) && (s = (a < 3 ? n(s) : a > 3 ? n(t, o, s) : n(t, o)) || s);
    return a > 3 && s && Object.defineProperty(t, o, s), s;
  },
  a = this && this.__awaiter || function (e, t, o, i) {
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
const s = e("../../../../i18n/i18nMgr"),
  r = e("../../../../scripts/_autogen/data/data"),
  l = e("../../../CustomUI/Button"),
  c = e("../../../CustomUI/ScrollList"),
  d = e("../../../Frame/SceneManager"),
  h = e("../../../Frame/UIColor"),
  p = e("../../../Frame/Util"),
  u = e("../../../Game/OperationFlow"),
  m = e("../../../Game/Player/TalkMng"),
  f = e("../../../TGA"),
  {
    ccclass: g,
    property: y
  } = cc._decorator;
let v = i = class extends cc.Component {
  constructor() {
    super(...arguments);
    this.titleLabel = null;
    this.stateLabel = null;
    this.menuBtn = null;
    this.commentCntLabel = null;
    this.upBtn = null;
    this.data = null;
  }
  onLoad() {
    this.node.on(l.default.CLICK, this.onClickCell, this);
    this.node.on(c.default.SET_DATA, this.setData, this);
    this.menuBtn.node.on(l.default.CLICK, () => {
      m.default.Ins.onMenuBtn(this.data, this.menuBtn);
    }, this);
    this.stateLabel.node.on(l.default.CLICK, this.onStateBtn, this);
    this.upBtn.node.on(l.default.CLICK, this.onUpBtn, this);
  }
  setData(e) {
    this.data = e;
    this.titleLabel.string = p.Util.clampStr(e.title, 45, `..(${p.Util.parseDataString(e.upStamp)})`);
    p.Util.updateLabel(this.titleLabel);
    this.node.height = this.titleLabel.node.height + 150;
    this.stateLabel.node.getComponent(l.default).interactable = !1;
    this.stateLabel.node.color = h.UIColor.gray;
    this.stateLabel.node.active = !1;
    this.upBtn.node.active = !1;
    this.commentCntLabel.node.parent.active = !1;
    this.upBtn.icon.node.color = e.isUp ? h.UIColor.blue : h.UIColor.white;
    switch (e.status) {
      case r.ManReviewStatus.noPublish:
        this.stateLabel.node.active = !0;
        this.stateLabel.string = s.I18nMgr.getI18nStringByZh("未发布");
        break;
      case r.ManReviewStatus.inReview:
        this.stateLabel.node.active = !0;
        this.stateLabel.string = s.I18nMgr.getI18nStringByZh("审核中");
        this.stateLabel.node.color = h.UIColor.black;
        break;
      case r.ManReviewStatus.success:
        this.upBtn.node.active = !0;
        this.commentCntLabel.node.parent.active = !0;
        this.upBtn.label.string = Math.max(e.upCnt, 0) + s.I18nMgr.getI18nStringByZh("点赞");
        this.commentCntLabel.string = e.commentsCntSum + s.I18nMgr.getI18nStringByZh("评论");
        break;
      case r.ManReviewStatus.fail:
        this.stateLabel.node.active = !0;
        this.stateLabel.string = s.I18nMgr.getI18nStringByZh("审核未通过");
        this.stateLabel.node.color = h.UIColor.red;
        this.stateLabel.node.getComponent(l.default).interactable = !0;
        break;
      case r.ManReviewStatus.off:
        this.stateLabel.node.active = !0;
        this.stateLabel.string = s.I18nMgr.getI18nStringByZh("已下架");
        break;
      case r.ManReviewStatus.delete:
        this.stateLabel.node.active = !0;
        this.stateLabel.string = s.I18nMgr.getI18nStringByZh("已被删除");
        break;
      case r.ManReviewStatus.unknown:
        this.stateLabel.node.active = !0;
        this.stateLabel.string = s.I18nMgr.getI18nStringByZh("未知错误");
    }
  }
  calcuHeight(e) {
    let t = i.calcuHeightCache.get(e.uId);
    if (!t) {
      this.titleLabel.string = p.Util.clampStr(e.title, 45, `..(${p.Util.parseDataString(e.upStamp)})`);
      p.Util.updateLabel(this.titleLabel);
      t = this.titleLabel.node.height + 150;
      i.calcuHeightCache.set(e.uId, t);
    }
    return t;
  }
  onClickCell() {
    return a(this, void 0, void 0, function* () {
      d.default.ins.Enter("TalkScene", e => {
        e.setData(this.data.uId);
      }, d.ShiftAnima.moveLeftShift);
    });
  }
  onClickEdit() {
    return a(this, void 0, void 0, function* () {
      let e = yield m.default.Ins.loadTalkDetail(this.data.uId);
      d.default.ins.Enter("EditTalkScene", t => {
        t.toModifyStyle(e);
      }, d.ShiftAnima.moveLeftShift);
    });
  }
  onStateBtn() {
    return a(this, void 0, void 0, function* () {
      d.default.ins.OpenPanelByName("ReviewFailReasonPanel", e => {
        let t = u.OperationFlow.makeOffReason(this.data.offReason);
        e.setData(t);
      });
    });
  }
  onUpBtn() {
    return a(this, void 0, void 0, function* () {
      if (this.data.isUp) yield m.default.Ins.cancelUpTalk(this.data.uId);else if (this.data.isDown) yield m.default.Ins.cancelDownTalk(this.data.uId);else {
        yield m.default.Ins.upTalk(this.data.uId);
        f.TGA.track("Talk", {
          step: "clickThumbBtn3"
        });
      }
      this.setData(this.data);
    });
  }
};
v.calcuHeightCache = new Map();
n([y(cc.Label)], v.prototype, "titleLabel", void 0);
n([y(cc.Label)], v.prototype, "stateLabel", void 0);
n([y(l.default)], v.prototype, "menuBtn", void 0);
n([y(cc.Label)], v.prototype, "commentCntLabel", void 0);
n([y(l.default)], v.prototype, "upBtn", void 0);
v = i = n([g], v);
exports.default = v;