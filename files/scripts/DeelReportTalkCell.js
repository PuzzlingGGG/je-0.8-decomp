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
  s = e("../../CustomUI/HeadIcon"),
  r = e("../../CustomUI/ScrollList"),
  l = e("../../Frame/SceneManager"),
  {
    ccclass: c,
    property: d
  } = cc._decorator;
let h = class extends cc.Component {
  constructor() {
    super(...arguments);
    this.nameLabel = null;
    this.titleLabel = null;
    this.reportCntLabel = null;
    this.banBtn = null;
    this.headIcon = null;
    this.data = null;
  }
  onLoad() {
    this.banBtn.node.on(a.default.CLICK, this.onBanBtn, this);
    this.node.on(r.default.SET_DATA, this.setData, this);
    this.headIcon.node.on(a.default.CLICK, this.onIcon, this);
  }
  setData(e) {
    return n(this, void 0, void 0, function* () {
      this.data = e;
      this.nameLabel.string = e.userName;
      this.titleLabel.string = e.title;
      this.reportCntLabel.string = e.reportCnt + "";
      this.headIcon.loadUrl(e.userImg);
    });
  }
  onBanBtn() {
    this.data.uId && l.default.ins.OpenPanelByName("BanTalkPanel", e => {
      e.setData(this.data);
    });
  }
  onIcon() {
    l.default.ins.Enter("TalkScene", e => {
      e.setData(this.data.uId);
    }, l.ShiftAnima.moveLeftShift);
  }
};
i([d(cc.Label)], h.prototype, "nameLabel", void 0);
i([d(cc.Label)], h.prototype, "titleLabel", void 0);
i([d(cc.Label)], h.prototype, "reportCntLabel", void 0);
i([d(a.default)], h.prototype, "banBtn", void 0);
i([d(s.default)], h.prototype, "headIcon", void 0);
h = i([c], h);
exports.default = h;