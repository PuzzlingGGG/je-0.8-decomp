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
  s = e("../../../../scripts/_autogen/cmd/cmd"),
  r = e("../../../../scripts/_autogen/data/data"),
  l = e("../../../CustomUI/Button"),
  c = e("../../../CustomUI/DropDownBox"),
  d = e("../../../CustomUI/ScrollList"),
  h = e("../../../CustomUI/ToggleGroup"),
  p = e("../../../Frame/CrossPlatform"),
  u = e("../../../Frame/NetworkMgr"),
  m = e("../../../Frame/SceneManager"),
  f = e("../../../Frame/Top"),
  g = e("../../../Frame/Util"),
  y = e("../../../Game/Hortor"),
  v = e("../../../Game/OperationFlow"),
  C = e("../../../Game/Player/CreditMng"),
  _ = e("../../../Game/Player/DynamicMng"),
  S = e("../../../Game/Player/Mng"),
  I = e("../../../Game/Player/TalkMng"),
  G = e("../../../Role"),
  T = e("../../../TGA"),
  {
    ccclass: b,
    property: M
  } = cc._decorator;
let P = class extends cc.Component {
  constructor() {
    super(...arguments);
    this.talkList = null;
    this.toggleGroup = null;
    this.sortDropDown = null;
    this.addBtn = null;
    this.createNewBtn = null;
    this.draftBtn = null;
    this.loadingNode = null;
    this.emptyLabel = null;
    this.searchBox = null;
    this.closeSearchBtn = null;
    this.block = null;
    this.searchName = "";
    this.searchDatas = [];
    this.refreshing = !1;
  }
  onLoad() {
    return n(this, void 0, void 0, function* () {
      cc.game.on(I.default.Talk_StatusChange, this.refresh, this);
      cc.game.on(I.default.Talk_Refresh, this.refresh, this);
      this.closeSearchBtn.node.on(l.default.CLICK, this.onCloseSearch, this);
      this.addBtn.node.on(l.default.CLICK, this.onCreateNewBtn, this);
      this.createNewBtn.node.on(l.default.CLICK, this.onCreateNewBtn, this);
      this.draftBtn.node.on(l.default.CLICK, this.onDraftBtn, this);
      this.toggleGroup.node.on(h.default.TOGGLE_CHANGE, this.onToggleChange, this);
      this.sortDropDown.node.on(c.default.SELECT_CHANGE, this.onSortChange, this);
      this.block.on(l.default.CLICK, this.onClickBlock, this);
      this.closeSearchBtn.node.active = !1;
      this.loadingNode.width = this.loadingNode.height = 0;
      this.sortDropDown.setDataArr([{
        str: a.I18nMgr.getI18nStringByZh("默认"),
        sort: r.TalkSortType.newCommentTime
      }, {
        str: a.I18nMgr.getI18nStringByZh("最新"),
        sort: r.TalkSortType.talkTime
      }, {
        str: a.I18nMgr.getI18nStringByZh("热门"),
        sort: r.TalkSortType.thumbCnt
      }]);
      T.TGA.track("Talk", {
        step: "talkPageShow"
      });
      this.block.active = !1;
      this.draftBtn.node.active = !1;
      this.createNewBtn.node.active = !1;
      this.addBtn.node.active = !1;
      this.emptyLabel.node.active = !1;
    });
  }
  onClickBlock() {
    this.block.active = !1;
    p.crossPlatform.hideKeyboard({});
  }
  onEnable() {
    this.refresh();
  }
  onDestroy() {
    cc.game.off(I.default.Talk_StatusChange, this.refresh, this);
    cc.game.off(I.default.Talk_Refresh, this.refresh, this);
  }
  onCreateNewBtn() {
    if (!_.DynamicMng.Ins.isDisable(_.FunctionEnum.PublishTalk, !0)) if (y.Hortor.isVisitor()) v.OperationFlow.openVisitorPanel();else if (G.default.Ins.role.level < I.default.UnlockPublishLvl) f.default.showToast("等级5解锁");else {
      T.TGA.track("Talk", {
        step: "clickCreateBtn"
      });
      m.default.ins.Enter("EditTalkScene", e => {
        e.toCreateStyle();
      }, m.ShiftAnima.moveLeftShift);
    }
  }
  onDraftBtn() {
    _.DynamicMng.Ins.isDisable(_.FunctionEnum.PublishTalk, !0) || (y.Hortor.isVisitor() ? v.OperationFlow.openVisitorPanel() : G.default.Ins.role.level < I.default.UnlockPublishLvl ? f.default.showToast("等级5解锁") : m.default.ins.OpenPanelByName("TalkDraftPanel"));
  }
  onToggleChange(e, t, o) {
    if (o) {
      this.talkList.node.getComponent(cc.Widget).bottom = e < 3 ? 0 : 140;
      g.Util.updateAllWidget(this.node);
      I.default.Ins.clearCache();
      this.refresh();
      this.hideSearch();
      this.talkList.scrollTo(cc.Vec2.ONE, .3);
    }
  }
  onSortChange(e, t, o) {
    if (o) {
      I.default.Ins.clearCache();
      this.refresh();
      this.hideSearch();
      this.talkList.scrollTo(cc.Vec2.ONE, .3);
    }
  }
  refresh() {
    return n(this, void 0, void 0, function* () {
      if (!this.node.activeInHierarchy) return;
      if (this.refreshing) return;
      yield I.default.Ins.bindTalkCell(this.talkList);
      this.refreshing = !0;
      let e = this.toggleGroup.idx;
      this.sortDropDown.node.active = !1;
      this.addBtn.node.active = !1;
      this.createNewBtn.node.active = !1;
      this.draftBtn.node.active = !1;
      let t = [];
      if (_.DynamicMng.Ins.isDisable(_.FunctionEnum.PublishTalk, !1)) {
        t = [];
        this.emptyLabel.string = "暂无帖子";
      } else if (this.searchName) {
        t = this.searchDatas;
        this.emptyLabel.string = "暂无帖子";
      } else {
        let o = this.sortDropDown.getCurData().sort;
        if (e < 3) {
          this.sortDropDown.node.active = !0;
          this.addBtn.node.active = 0 == e;
          let i = r.TalkType.trends;
          switch (e) {
            case 0:
              i = r.TalkType.trends;
              break;
            case 1:
              i = r.TalkType.chosen;
              break;
            case 2:
              i = r.TalkType.official;
          }
          (t = I.default.Ins.getTalkList(i, o)).length < 3 && (t = yield I.default.Ins.appendLoadTalkList(i, o, 10));
          this.emptyLabel.string = "暂无帖子";
        } else {
          this.draftBtn.node.active = !0;
          this.createNewBtn.node.active = !0;
          this.addBtn.node.active = !1;
          let e = yield I.default.Ins.loadTalksByUserId();
          t = t.concat(e);
          this.emptyLabel.string = "您还未发过贴子";
        }
      }
      yield this.preloadGame(t);
      this.talkList.setDataArr(t);
      this.emptyLabel.node.active = 0 == t.length;
      this.refreshing = !1;
    });
  }
  preloadGame(e) {
    return n(this, void 0, void 0, function* () {
      let t = new Set();
      for (let o = 0; o < e.length; o++) {
        let i = e[o],
          n = i.simpleContent,
          a = n.specialSection || n.firstSection;
        if (a && a.type == I.TalkSectionType.Project) {
          a.talkId = i.uId;
          t.add(a.gameId);
        }
      }
      yield S.Mng.Ins.gameMng.loadMany(Array.from(t));
    });
  }
  onScrollEvt(e, t, o) {
    return n(this, void 0, void 0, function* () {
      let o = this.toggleGroup.idx,
        i = this.sortDropDown.getCurData().sort,
        n = r.TalkType.trends,
        a = -e.getScrollOffset().y;
      switch (o) {
        case 0:
          n = r.TalkType.trends;
          break;
        case 1:
          n = r.TalkType.chosen;
          break;
        case 2:
          n = r.TalkType.official;
      }
      r.TalkType.trends;
      switch (t) {
        case cc.ScrollView.EventType.BOUNCE_TOP:
          I.default.Ins.clearCache();
          this.refresh();
          break;
        case cc.ScrollView.EventType.BOUNCE_BOTTOM:
          if (this.searchName) {
            let e = this.searchDatas.length,
              t = e + 5,
              o = {
                searchName: this.searchName,
                start: e,
                end: t
              },
              i = yield u.NetIns.SendCmdAsync({
                cmd: s.CMDS.Game_SearchTalk,
                params: o
              }, s.Game_RSearchTalk);
            if (i) for (let e = 0; e < i.talkList.length; e++) {
              let t = i.talkList[e];
              t.status == r.ManReviewStatus.success && this.searchDatas.push(t);
            }
            this.refresh();
          } else if (o < 3) {
            let e = yield I.default.Ins.appendLoadTalkList(n, i, 10);
            yield this.preloadGame(e);
            this.talkList.setDataArr(e);
          }
          break;
        case cc.ScrollView.EventType.SCROLLING:
          if (a > 0) {
            this.loadingNode.width = this.loadingNode.height = Math.min(a, 100);
            this.loadingNode.angle = a;
          } else this.loadingNode.width = this.loadingNode.height = 0;
      }
    });
  }
  onEditBegin() {
    this.block.active = !0;
  }
  onEditEnd() {
    this.block.active = !1;
  }
  onSearch(e) {
    return n(this, void 0, void 0, function* () {
      if (_.DynamicMng.Ins.isDisable(_.FunctionEnum.PublishTalk, !0)) return;
      if (C.CreditMng.Ins.credit <= 1) {
        f.default.showToast("近期违规，不可搜索商品");
        return;
      }
      this.closeSearchBtn.node.active = !0;
      let t = e.textLabel.string;
      this.searchName = t;
      this.searchDatas = [];
      if (t) {
        if (t && !_.DynamicMng.Ins.isViolationsName(t) && !_.DynamicMng.Ins.isInspectVersion()) {
          let e = this.searchDatas.length,
            o = {
              searchName: t,
              start: e,
              end: e + 5
            },
            i = yield u.NetIns.SendCmdAsync({
              cmd: s.CMDS.Game_SearchTalk,
              params: o
            }, s.Game_RSearchTalk);
          if (i) for (let e = 0; e < i.talkList.length; e++) {
            let t = i.talkList[e];
            t.status == r.ManReviewStatus.success && this.searchDatas.push(t);
          }
        }
        yield this.refresh();
        this.talkList.scrollTo(cc.Vec2.ONE, .3);
      } else this.onCloseSearch();
    });
  }
  onCloseSearch() {
    this.hideSearch();
    this.refresh();
  }
  hideSearch() {
    this.searchDatas = [];
    this.searchName = "";
    this.searchBox.string = "";
    this.closeSearchBtn.node.active = !1;
  }
};
i([M(d.default)], P.prototype, "talkList", void 0);
i([M(h.default)], P.prototype, "toggleGroup", void 0);
i([M(c.default)], P.prototype, "sortDropDown", void 0);
i([M(l.default)], P.prototype, "addBtn", void 0);
i([M(l.default)], P.prototype, "createNewBtn", void 0);
i([M(l.default)], P.prototype, "draftBtn", void 0);
i([M(cc.Node)], P.prototype, "loadingNode", void 0);
i([M(cc.Label)], P.prototype, "emptyLabel", void 0);
i([M(cc.EditBox)], P.prototype, "searchBox", void 0);
i([M(l.default)], P.prototype, "closeSearchBtn", void 0);
i([M(cc.Node)], P.prototype, "block", void 0);
P = i([b], P);
exports.default = P;