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
const a = e("../../../i18n/i18nMgr"),
  s = e("../../CustomUI/Button"),
  r = e("../../CustomUI/GameIcon"),
  l = e("../../CustomUI/ScrollList"),
  c = e("../../Frame/SceneManager"),
  d = e("../../Frame/Util"),
  h = e("../../Game/Player/RcmdMng"),
  p = e("../../TGA"),
  u = e("../GameCoverScene/GameCoverScene"),
  {
    ccclass: m,
    property: f
  } = cc._decorator;
let g = class extends cc.Component {
  constructor() {
    super(...arguments);
    this.rankLabel = null;
    this.gameIcon = null;
    this.nameLabel = null;
    this.adLabel = null;
    this.playCntLabel = null;
    this.timeLabel = null;
    this.playBtn = null;
    this.from = "";
    this.nameLen = 6;
    this.advertLen = 12;
    this.clickCall = null;
    this.data = null;
    this.bk = "";
    this.st = "";
    this.spriteSize = 120;
  }
  onLoad() {
    this.playBtn && this.playBtn.node.on(s.default.CLICK, this.onClick, this);
    this.node.on(l.default.SET_DATA, this.setData, this);
  }
  setData(e, t, o = "", i = "") {
    this.bk = o;
    this.st = i;
    this.node.active = !0;
    if (e) {
      h.default.Ins.gameShow(e.id, this.from, t, o, i);
      this.data = e;
      this.nameLabel && (this.nameLabel.string = d.Util.clampStr(e.name, this.nameLen, ".."));
      this.adLabel && (this.adLabel.string = d.Util.clampStr(e.advert, this.advertLen, ".."));
      this.rankLabel && (this.rankLabel.string = "" + e.rank);
      this.playCntLabel && (this.playCntLabel.string = d.Util.bigNumStr(e.playCnt) + a.I18nMgr.getI18nStringByZh("人玩过"));
      this.timeLabel && (this.timeLabel.string = d.Util.parseDataString(e.lastPublishTime));
      this.gameIcon.loadUrl(e.iconTextureName);
      this.gameIcon.showSubIcon(e.openCreativeGame);
    } else this.node.active = !1;
  }
  onClick() {
    return n(this, void 0, void 0, function* () {
      if (!this.data) return;
      h.default.Ins.gameClick(this.data.id, this.from, this.bk, this.st);
      let e = c.default.ins.findScene(u.default);
      e && e.node.active ? e.setData(this.data.id) : c.default.ins.Enter("GameCoverScene", e => {
        e.setData(this.data.id);
      });
      p.TGA.track("clickGameCell", {
        gameId: this.data.id,
        from: this.from
      });
      this.clickCall && this.clickCall();
    });
  }
};
i([f(cc.Label)], g.prototype, "rankLabel", void 0);
i([f(r.default)], g.prototype, "gameIcon", void 0);
i([f(cc.Label)], g.prototype, "nameLabel", void 0);
i([f(cc.Label)], g.prototype, "adLabel", void 0);
i([f(cc.Label)], g.prototype, "playCntLabel", void 0);
i([f(cc.Label)], g.prototype, "timeLabel", void 0);
i([f(s.default)], g.prototype, "playBtn", void 0);
i([f], g.prototype, "from", void 0);
i([f], g.prototype, "nameLen", void 0);
i([f], g.prototype, "advertLen", void 0);
g = i([m], g);
exports.default = g;