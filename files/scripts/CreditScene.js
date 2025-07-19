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
  s = e("../../CustomUI/ProgressBar"),
  r = e("../../CustomUI/ScrollList"),
  l = e("../../Frame/Scene"),
  c = e("../../Frame/SceneManager"),
  d = e("../../Frame/UIColor"),
  h = e("../../Frame/Util"),
  p = e("../../Game/OperationFlow"),
  u = e("../../Game/Player/CreditMng"),
  {
    ccclass: m,
    property: f
  } = cc._decorator;
let g = class extends l.default {
  constructor() {
    super(...arguments);
    this.backBtn = null;
    this.aboutBtn = null;
    this.list = null;
    this.progressBar = null;
    this.cridtPoint = null;
  }
  onLoad() {
    return n(this, void 0, void 0, function* () {
      this.backBtn.node.on(a.default.CLICK, this.onBackBtn, this);
      this.aboutBtn.node.on(a.default.CLICK, this.onAboutBtn, this);
      this.cridtPoint.parent.on(cc.Node.EventType.TOUCH_END, this.onAboutBtn, this);
      yield u.CreditMng.Ins.loadData();
      h.Util.makeBro(this.cridtPoint, 3, (e, t) => {
        e.color = t < u.CreditMng.Ins.credit ? d.UIColor.green : d.UIColor.gray;
      });
      this.list.setDataArr(u.CreditMng.Ins.userCreditMsgList);
      this.progressBar.node.active = u.CreditMng.Ins.credit < 3;
      this.progressBar.setRange(0, 1);
      this.progressBar.setValue(u.CreditMng.Ins.creditScoreRecoverProcess);
    });
  }
  onShow(e) {
    p.OperationFlow.deelOnShow(e);
  }
  onBackBtn() {
    c.default.ins.Back(() => {}, c.ShiftAnima.moveRightShift);
  }
  onAboutBtn() {
    c.default.ins.OpenPanelByName("AboutPanel", e => {
      e.setData("信誉积分说明", "    \n    发布以下违规内容将会被扣除积分：  \n        1.色情低俗,\n        2.政治敏感,\n        3.挑拨引战,\n        4.引人不适,\n    当缺失1个积分时，不可发布或编辑游戏，不可更改头像。\n    当缺失2个积分时，不可搜索，评论，点赞，收藏，催更。\n    当缺失3个积分时，封号。\n");
    });
  }
};
i([f(a.default)], g.prototype, "backBtn", void 0);
i([f(a.default)], g.prototype, "aboutBtn", void 0);
i([f(r.default)], g.prototype, "list", void 0);
i([f(s.default)], g.prototype, "progressBar", void 0);
i([f(cc.Node)], g.prototype, "cridtPoint", void 0);
g = i([m], g);
exports.default = g;