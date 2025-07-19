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
  c = e("../../../CustomUI/HeadIcon"),
  d = e("../../../CustomUI/ScrollList"),
  h = e("../../../Frame/SceneManager"),
  p = e("../../../Frame/UIColor"),
  u = e("../../../Frame/Util"),
  m = e("../../../Game/OperationFlow"),
  f = e("../../../Game/Player/TalkMng"),
  g = e("../../../TGA"),
  y = e("./TalkSectionGame"),
  v = e("./TalkSectionGoods"),
  C = e("./TalkSectionImgs"),
  _ = e("./TalkSectionProject"),
  S = e("./TalkSectionText"),
  {
    ccclass: I,
    property: G
  } = cc._decorator;
let T = i = class extends cc.Component {
  constructor() {
    super(...arguments);
    this.content = null;
    this.titleLabel = null;
    this.sectionPrefabs = [];
    this.bestSubTalk = null;
    this.top = null;
    this.chosen = null;
    this.official = null;
    this.headIcon = null;
    this.nameLabel = null;
    this.timeLabel = null;
    this.menuBtn = null;
    this.commentCntlabel = null;
    this.upBtn = null;
    this.subTalkLabel = null;
    this.stateLabel = null;
    this.publishedStateNode = null;
    this.sectionText = null;
    this.sectionImgs = null;
    this.sectionGame = null;
    this.sectionGoods = null;
    this.sectionProject = null;
    this.data = null;
  }
  onLoad() {
    this.node.on(d.default.SET_DATA, this.setData, this);
    this.node.on(l.default.CLICK, this.onClick, this);
    this.headIcon.node.on(l.default.CLICK, this.enterFriendScene, this);
    this.menuBtn.node.on(l.default.CLICK, () => {
      f.default.Ins.onMenuBtn(this.data, this.menuBtn);
    }, this);
    this.upBtn.node.on(l.default.CLICK, this.onUpBtn, this);
    this.stateLabel.node.on(l.default.CLICK, this.onStateBtn, this);
    for (let e = 0; e < this.sectionPrefabs.length; e++) {
      let t = this.sectionPrefabs[e],
        o = cc.instantiate(t);
      exports.x = 0;
      this.content.addChild(o);
    }
    this.sectionPrefabs = [];
    this.sectionText = this.content.getComponentInChildren(S.default);
    this.sectionImgs = this.content.getComponentInChildren(C.default);
    this.sectionGame = this.content.getComponentInChildren(y.default);
    this.sectionGoods = this.content.getComponentInChildren(v.default);
    this.sectionProject = this.content.getComponentInChildren(_.default);
    this.sectionProject.showWorlds = !1;
  }
  setData(e, t = !1) {
    this.data = e;
    if (!t) {
      this.timeLabel.string = u.Util.parseDataString(e.upStamp);
      this.headIcon.loadUrl(e.userImg);
      this.headIcon.setLevel(e.userLevel);
      this.nameLabel.string = u.Util.clampStr(e.userName, 10, "..");
      this.top.active = e.isTop;
      this.chosen.active = e.talkType == r.TalkType.chosen;
      this.official.active = e.talkType == r.TalkType.official;
    }
    this.titleLabel.string = e.title;
    u.Util.updateLabel(this.titleLabel);
    let o = e.simpleContent;
    this.sectionText.node.active = !!o.text;
    this.sectionText.setData({
      type: f.TalkSectionType.Text,
      text: o.text
    });
    let i = o.specialSection || o.firstSection,
      n = null == i ? void 0 : i.type;
    this.sectionImgs.node.active = n == f.TalkSectionType.Imgs;
    this.sectionGame.node.active = n == f.TalkSectionType.Game;
    this.sectionGoods.node.active = n == f.TalkSectionType.Goods;
    this.sectionProject.node.active = n == f.TalkSectionType.Project;
    switch (n) {
      case f.TalkSectionType.Text:
        this.sectionText.setData(i);
        break;
      case f.TalkSectionType.Imgs:
        t ? this.sectionImgs.node.height = this.sectionImgs.calcuH(i) : this.sectionImgs.setData(i);
        break;
      case f.TalkSectionType.Game:
        t || this.sectionGame.setData(i);
        break;
      case f.TalkSectionType.Goods:
        t || this.sectionGoods.setData(i);
        break;
      case f.TalkSectionType.Project:
        t && (this.sectionProject.showWorlds = !1);
        this.sectionProject.setData(i);
    }
    if (e.comments && e.comments.length && e.comments[0].content) {
      let t = e.comments[0].content;
      this.subTalkLabel.string = t.msg;
      this.bestSubTalk.active = !0;
      u.Util.updateLabel(this.subTalkLabel);
    } else this.bestSubTalk.active = !1;
    if (!t) {
      this.stateLabel.node.getComponent(l.default).interactable = !1;
      this.stateLabel.string = "";
      this.stateLabel.node.color = p.UIColor.black;
      this.publishedStateNode.active = !1;
      this.refreshUpDown();
      switch (e.status) {
        case r.ManReviewStatus.noPublish:
          this.stateLabel.string = s.I18nMgr.getI18nStringByZh("未发布");
          break;
        case r.ManReviewStatus.inReview:
          this.stateLabel.string = s.I18nMgr.getI18nStringByZh("审核中");
          this.stateLabel.node.color = p.UIColor.black;
          break;
        case r.ManReviewStatus.success:
          this.publishedStateNode.active = !0;
          this.commentCntlabel.string = e.commentsCntSum + s.I18nMgr.getI18nStringByZh("评论");
          break;
        case r.ManReviewStatus.fail:
          this.stateLabel.string = s.I18nMgr.getI18nStringByZh("审核未通过");
          this.stateLabel.node.color = p.UIColor.red;
          this.stateLabel.node.getComponent(l.default).interactable = !0;
          break;
        case r.ManReviewStatus.off:
          this.stateLabel.string = s.I18nMgr.getI18nStringByZh("已下架");
          break;
        case r.ManReviewStatus.delete:
          this.stateLabel.string = s.I18nMgr.getI18nStringByZh("已被删除");
          break;
        case r.ManReviewStatus.unknown:
          this.stateLabel.string = s.I18nMgr.getI18nStringByZh("未知错误");
      }
    }
    u.Util.updateAllLayout(this.node);
  }
  refreshUpDown() {
    cc.warn(this.data);
    let e = this.data;
    this.upBtn.label.string = Math.max(e.upCnt, 0) + s.I18nMgr.getI18nStringByZh("点赞");
    this.upBtn.icon.node.color = e.isUp ? p.UIColor.blue : p.UIColor.white;
  }
  calcuHeight(e) {
    let t = i.calcuHeightCache.get(e.uId);
    if (!t) {
      this.setData(e, !0);
      t = this.node.height;
      i.calcuHeightCache.set(e.uId, t);
    }
    return t;
  }
  onClick() {
    g.TGA.track("Talk", {
      step: "clickTalkCell"
    });
    h.default.ins.Enter("TalkScene", e => {
      e.setData(this.data.uId);
    }, h.ShiftAnima.moveLeftShift);
  }
  enterFriendScene() {
    this.data && h.default.ins.Enter("FriendScene", e => {
      e.setData(this.data.playerId);
    }, h.ShiftAnima.moveLeftShift);
  }
  onUpBtn() {
    return a(this, void 0, void 0, function* () {
      if (this.data.isUp) yield f.default.Ins.cancelUpTalk(this.data.uId);else if (this.data.isDown) yield f.default.Ins.cancelDownTalk(this.data.uId);else {
        yield f.default.Ins.upTalk(this.data.uId);
        g.TGA.track("Talk", {
          step: "clickThumbBtn1"
        });
      }
      this.setData(this.data);
    });
  }
  onStateBtn() {
    return a(this, void 0, void 0, function* () {
      h.default.ins.OpenPanelByName("ReviewFailReasonPanel", e => {
        let t = m.OperationFlow.makeOffReason(this.data.offReason);
        e.setData(t);
      });
    });
  }
};
T.calcuHeightCache = new Map();
n([G(cc.Node)], T.prototype, "content", void 0);
n([G(cc.Label)], T.prototype, "titleLabel", void 0);
n([G([cc.Prefab])], T.prototype, "sectionPrefabs", void 0);
n([G(cc.Node)], T.prototype, "bestSubTalk", void 0);
n([G(cc.Node)], T.prototype, "top", void 0);
n([G(cc.Node)], T.prototype, "chosen", void 0);
n([G(cc.Node)], T.prototype, "official", void 0);
n([G(c.default)], T.prototype, "headIcon", void 0);
n([G(cc.Label)], T.prototype, "nameLabel", void 0);
n([G(cc.Label)], T.prototype, "timeLabel", void 0);
n([G(l.default)], T.prototype, "menuBtn", void 0);
n([G(cc.Label)], T.prototype, "commentCntlabel", void 0);
n([G(l.default)], T.prototype, "upBtn", void 0);
n([G(cc.Label)], T.prototype, "subTalkLabel", void 0);
n([G(cc.Label)], T.prototype, "stateLabel", void 0);
n([G(cc.Node)], T.prototype, "publishedStateNode", void 0);
T = i = n([I], T);
exports.default = T;