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
  s = e("../../CustomUI/ScrollList"),
  r = e("../../Frame/SceneManager"),
  l = e("../../Frame/Top"),
  c = e("../../Frame/UIColor"),
  d = e("../../Frame/Util"),
  h = e("../../Game/Player/CollectionMng"),
  p = e("../../Game/Player/CreditMng"),
  u = e("../../Game/Player/TalkMng"),
  m = e("../../TGA"),
  f = e("../HomeScene/MinePage/MyTalkCell"),
  {
    ccclass: g,
    property: y
  } = cc._decorator;
let v = class extends cc.Component {
  constructor() {
    super(...arguments);
    this.titleLabel = null;
    this.menuBtn = null;
    this.commentCntLabel = null;
    this.upBtn = null;
    this.data = null;
  }
  onLoad() {
    this.node.on(a.default.CLICK, this.onClickCell, this);
    this.node.on(s.default.SET_DATA, this.setData, this);
    this.menuBtn.node.on(a.default.CLICK, this.onMenuBtn, this);
    this.upBtn.node.on(a.default.CLICK, this.onUpBtn, this);
  }
  setData(e) {
    this.data = e;
    this.titleLabel.string = d.Util.clampStr(e.title, 45, `..(${d.Util.parseDataString(e.upStamp)})`);
    d.Util.updateLabel(this.titleLabel);
    this.node.height = this.titleLabel.node.height + 150;
    this.upBtn.node.active = !1;
    this.commentCntLabel.node.parent.active = !1;
    this.upBtn.icon.node.color = e.isUp ? c.UIColor.blue : c.UIColor.white;
  }
  calcuHeight(e) {
    let t = f.default.calcuHeightCache.get(e.uId);
    if (!t) {
      this.titleLabel.string = d.Util.clampStr(e.title, 45, `..(${d.Util.parseDataString(e.upStamp)})`);
      d.Util.updateLabel(this.titleLabel);
      t = this.titleLabel.node.height + 150;
      f.default.calcuHeightCache.set(e.uId, t);
    }
    return t;
  }
  onClickCell() {
    return n(this, void 0, void 0, function* () {
      r.default.ins.Enter("TalkScene", e => {
        e.setData(this.data.uId);
      }, r.ShiftAnima.moveLeftShift);
    });
  }
  onUpBtn() {
    return n(this, void 0, void 0, function* () {
      if (this.data.isUp) yield u.default.Ins.cancelUpTalk(this.data.uId);else if (this.data.isDown) yield u.default.Ins.cancelDownTalk(this.data.uId);else {
        yield u.default.Ins.upTalk(this.data.uId);
        m.TGA.track("Talk", {
          step: "clickThumbBtn3"
        });
      }
      this.setData(this.data);
    });
  }
  onReportBtn() {
    p.CreditMng.Ins.credit <= 2 ? l.default.showToast("近期违规，不可举报") : this.data && r.default.ins.Enter("ReportScene", e => {
      e.initReportTalk(this.data.uId);
    }, r.ShiftAnima.moveLeftShift);
  }
  onMenuBtn() {
    let e = this.data,
      t = [];
    t.push({
      str: "举报",
      icon: {
        url: "Atlas/UI/reportBtn",
        color: c.UIColor.white,
        w: 50,
        h: 40
      },
      call: () => {
        this.onReportBtn();
      }
    });
    let o = h.CollectionMng.Ins.isCollectTalk(e.uId);
    t.push({
      str: o ? "取消收藏" : "收藏",
      icon: {
        url: "Atlas/Paint/pencil",
        color: o ? c.UIColor.yellow : c.UIColor.gray,
        w: 40,
        h: 40
      },
      call: () => n(this, void 0, void 0, function* () {
        o ? h.CollectionMng.Ins.unCollectTalk(e.uId) : h.CollectionMng.Ins.collectTalk(e.uId);
      })
    });
    l.default.showMenu(this.menuBtn.node, t);
  }
};
v.calcuHeightCache = new Map();
i([y(cc.Label)], v.prototype, "titleLabel", void 0);
i([y(a.default)], v.prototype, "menuBtn", void 0);
i([y(cc.Label)], v.prototype, "commentCntLabel", void 0);
i([y(a.default)], v.prototype, "upBtn", void 0);
v = i([g], v);
exports.default = v;