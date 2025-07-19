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
    this.introLabel = null;
    this.reportCntLabel = null;
    this.banBtn = null;
    this.headIcon = null;
    this.data = null;
  }
  onLoad() {
    this.banBtn.node.on(a.default.CLICK, this.onBanBtn, this);
    this.node.on(r.default.SET_DATA, this.setData, this);
    this.headIcon.node.on(a.default.CLICK, this.onHeadIcon, this);
  }
  setData(e) {
    return n(this, void 0, void 0, function* () {
      this.data = e;
      this.nameLabel.string = e.userName;
      this.introLabel.string = e.userIntro;
      this.reportCntLabel.string = e.reportCnt;
      this.headIcon.loadUrl(e.userImg);
    });
  }
  getReasonStr(e) {
    let t = e.info.reports || [],
      o = new Map();
    for (let e = 0; e < t.length; e++) {
      let i = t[e];
      for (let e in i.item) {
        let t = o.get(e) || 0;
        o.set(e, t + 1);
      }
    }
    let i = "";
    o.forEach((e, t) => {
      i += `${t}(${e}),`;
    });
    return i;
  }
  onBanBtn() {
    this.data.playerId && l.default.ins.OpenPanelByName("BanPlayerPanel", e => {
      e.setData(this.data.playerId);
    });
  }
  onHeadIcon() {
    l.default.ins.Enter("FriendScene", e => {
      e.setData(this.data.playerId);
    }, l.ShiftAnima.moveLeftShift);
  }
};
i([d(cc.Label)], h.prototype, "nameLabel", void 0);
i([d(cc.Label)], h.prototype, "introLabel", void 0);
i([d(cc.Label)], h.prototype, "reportCntLabel", void 0);
i([d(a.default)], h.prototype, "banBtn", void 0);
i([d(s.default)], h.prototype, "headIcon", void 0);
h = i([c], h);
exports.default = h;