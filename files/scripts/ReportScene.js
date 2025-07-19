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
const a = e("../../CustomUI/Button"),
  s = e("../../CustomUI/Toggle"),
  r = e("../../Frame/Scene"),
  l = e("../../Frame/SceneManager"),
  c = e("../../Frame/Top"),
  d = e("../../Frame/UIColor"),
  h = e("../../Frame/Util"),
  p = e("../../Game/OperationFlow"),
  u = e("../../Game/Player/ReportMng"),
  {
    ccclass: m,
    property: f
  } = cc._decorator;
let g = class extends r.default {
  constructor() {
    super(...arguments);
    this.title = null;
    this.subTitle = null;
    this.backBtn = null;
    this.okBtn = null;
    this.toggle = null;
    this.editBox = null;
    this.id = 0;
    this.reportType = u.ReportType.game;
  }
  onLoad() {
    this.backBtn.node.on(a.default.CLICK, this.onBackBtn, this);
    this.okBtn.node.on(a.default.CLICK, this.onOkBtn, this);
  }
  onShow(e) {
    p.OperationFlow.deelOnShow(e);
  }
  initReportGame(e) {
    this.reportType = u.ReportType.game;
    this.id = e;
    this.title.string = "举报游戏";
    this.subTitle.string = "你觉得这个游戏有什么问题？";
    let t = ["色情低俗", "政治敏感", "挑拨引战", "引人不适", "其他问题"];
    h.Util.makeBro(this.toggle.node, t.length, (e, o) => {
      e.getComponent(s.default).label.string = t[o];
    });
  }
  initReportPlayer(e) {
    this.reportType = u.ReportType.player;
    this.id = e;
    this.title.string = "举报玩家";
    this.subTitle.string = "你觉得这个玩家有什么问题？";
    let t = ["图标违规", "名称违规", "其他问题"];
    h.Util.makeBro(this.toggle.node, t.length, (e, o) => {
      e.getComponent(s.default).label.string = t[o];
    });
  }
  initReportGoods(e) {
    this.reportType = u.ReportType.goods;
    this.id = e;
    this.title.string = "举报商品";
    this.subTitle.string = "你觉得这个素材有什么问题？";
    let t = ["色情低俗", "政治敏感", "挑拨引战", "引人不适", "其他问题"];
    h.Util.makeBro(this.toggle.node, t.length, (e, o) => {
      e.getComponent(s.default).label.string = t[o];
    });
  }
  initReportComments(e) {
    this.reportType = u.ReportType.comment;
    this.id = e;
    this.title.string = "举报评论";
    this.subTitle.string = "你觉得这个素材有什么问题？";
    let t = ["色情低俗", "政治敏感", "挑拨引战", "引人不适", "其他问题"];
    h.Util.makeBro(this.toggle.node, t.length, (e, o) => {
      e.getComponent(s.default).label.string = t[o];
    });
  }
  initReportTalk(e) {
    this.reportType = u.ReportType.talk;
    this.id = e;
    this.title.string = "举报帖子";
    this.subTitle.string = "你觉得这个帖子有什么问题？";
    let t = ["色情低俗", "政治敏感", "挑拨引战", "引人不适", "其他问题"];
    h.Util.makeBro(this.toggle.node, t.length, (e, o) => {
      e.getComponent(s.default).label.string = t[o];
    });
  }
  onBackBtn() {
    l.default.ins.Back(() => {}, l.ShiftAnima.moveRightShift);
  }
  onOkBtn() {
    return n(this, void 0, void 0, function* () {
      let e = this.toggle.node.parent.getComponentsInChildren(s.default),
        t = 0;
      for (let o = 0; o < e.length; o++) e[o].isChecked && t++;
      if (t <= 0) c.default.showToast("至少选择一项");else {
        c.default.showLoading("上报中");
        this.reportType == u.ReportType.game ? yield u.ReportMng.Ins.reportGame(this.id) : this.reportType == u.ReportType.player ? yield u.ReportMng.Ins.reportPlayer(this.id) : this.reportType == u.ReportType.goods ? yield u.ReportMng.Ins.reportGoods(this.id) : this.reportType == u.ReportType.comment ? yield u.ReportMng.Ins.reportComment(this.id) : this.reportType == u.ReportType.talk && (yield u.ReportMng.Ins.reportTalk(this.id));
        c.default.hideLoading();
        l.default.ins.OpenPanelByName("MessageBox", e => {
          e.titleLabel.string = "反馈成功";
          e.label.string = "感谢您的反馈！";
          e.leftBtn.node.active = !1;
          e.closeBtn.node.active = !1;
          e.setRightBtn({
            text: "确定",
            color: d.UIColor.green,
            call: () => {
              this.onBackBtn();
            }
          });
        });
      }
    });
  }
};
i([f(cc.Label)], g.prototype, "title", void 0);
i([f(cc.Label)], g.prototype, "subTitle", void 0);
i([f(a.default)], g.prototype, "backBtn", void 0);
i([f(a.default)], g.prototype, "okBtn", void 0);
i([f(s.default)], g.prototype, "toggle", void 0);
i([f(cc.EditBox)], g.prototype, "editBox", void 0);
g = i([m], g);
exports.default = g;