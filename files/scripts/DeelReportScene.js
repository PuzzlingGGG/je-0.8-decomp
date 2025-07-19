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
const a = e("../../../scripts/_autogen/data/data"),
  s = e("../../CustomUI/Button"),
  r = e("../../CustomUI/ScrollList"),
  l = e("../../Frame/Scene"),
  c = e("../../Frame/SceneManager"),
  d = e("../../Frame/UIColor"),
  h = e("../../Game/Player/ReportMng"),
  {
    ccclass: p,
    property: u
  } = cc._decorator;
let m = class extends l.default {
  constructor() {
    super(...arguments);
    this.list = null;
    this.backBtn = null;
    this.titleLabel = null;
    this.clearBtn = null;
    this.reportType = h.ReportType.game;
  }
  onLoad() {
    super.onLoad();
    this.backBtn.node.on(s.default.CLICK, this.onBackBtn, this);
    this.clearBtn.node.on(s.default.CLICK, this.onClearBtn, this);
    this.node.on("refreshList", this.refreshList, this);
    this.list.getPrefabName = e => e instanceof a.GameCellData ? "DeelReportGameCell" : e instanceof a.UserSimpleMsg ? "DeelReportPlayerCell" : e instanceof a.GoodsCellData ? "DeelReportGoodsCell" : e instanceof a.GameComment ? "DeelReportCommentCell" : e instanceof a.TalkData ? "DeelReportTalkCell" : void 0;
  }
  onBackBtn() {
    c.default.ins.Back();
  }
  setData(e) {
    return n(this, void 0, void 0, function* () {
      this.reportType = e;
      this.refreshList();
    });
  }
  refreshList() {
    return n(this, void 0, void 0, function* () {
      let e = [];
      if (this.reportType == h.ReportType.game) {
        this.titleLabel.string = "违规游戏";
        e = yield h.ReportMng.Ins.loadGames();
      }
      if (this.reportType == h.ReportType.player) {
        this.titleLabel.string = "违规玩家";
        e = yield h.ReportMng.Ins.loadPlayer();
      }
      if (this.reportType == h.ReportType.goods) {
        this.titleLabel.string = "违规商品";
        e = yield h.ReportMng.Ins.loadGoods();
      }
      if (this.reportType == h.ReportType.comment) {
        this.titleLabel.string = "违规评论";
        e = yield h.ReportMng.Ins.loadComments();
      }
      if (this.reportType == h.ReportType.talk) {
        this.titleLabel.string = "违规帖子";
        e = yield h.ReportMng.Ins.loadTalks();
      }
      this.list.setDataArr(e);
    });
  }
  onClearBtn() {
    c.default.ins.OpenPanelByName("MessageBox", e => {
      e.label.string = "真的要重新计数吗？";
      e.setLeftBtn({
        text: "是的",
        color: d.UIColor.pink,
        call: () => n(this, void 0, void 0, function* () {
          this.reportType == h.ReportType.game && (yield h.ReportMng.Ins.clearGame());
          this.reportType == h.ReportType.player && (yield h.ReportMng.Ins.clearPlayer());
          this.reportType == h.ReportType.goods && (yield h.ReportMng.Ins.clearGoods());
          this.reportType == h.ReportType.comment && (yield h.ReportMng.Ins.clearComments());
          this.reportType == h.ReportType.comment && (yield h.ReportMng.Ins.clearTalks());
          this.refreshList();
        })
      });
      e.setRightBtn({
        text: "关闭",
        color: d.UIColor.blue
      });
    });
  }
};
i([u(r.default)], m.prototype, "list", void 0);
i([u(s.default)], m.prototype, "backBtn", void 0);
i([u(cc.Label)], m.prototype, "titleLabel", void 0);
i([u(s.default)], m.prototype, "clearBtn", void 0);
m = i([p], m);
exports.default = m;