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
  s = e("../../CustomUI/GameIcon"),
  r = e("../../CustomUI/ScrollList"),
  l = e("../../Frame/SceneManager"),
  c = e("../../Frame/Util"),
  d = e("../../Game/GameEnv"),
  {
    ccclass: h,
    property: p
  } = cc._decorator;
let u = class extends cc.Component {
  constructor() {
    super(...arguments);
    this.gameIcon = null;
    this.nameLabel = null;
    this.adLabel = null;
    this.playBtn = null;
    this.data = null;
  }
  onLoad() {
    this.playBtn && this.playBtn.node.on(a.default.CLICK, this.onClick, this);
    this.node.on(r.default.SET_DATA, this.setData, this);
  }
  setData(e) {
    return n(this, void 0, void 0, function* () {
      this.data = e;
      this.nameLabel && (this.nameLabel.string = c.Util.clampStr(e.name, 10, ".."));
      this.adLabel && (this.adLabel.string = c.Util.clampStr(e.advert, 10, ".."));
      this.gameIcon.loadUrl(e.iconTextureName);
      this.gameIcon.showSubIcon(e.openCreativeGame);
    });
  }
  onClick() {
    return n(this, void 0, void 0, function* () {
      console.log(d.gameEnv.fileCDN + this.data.iconTextureName);
      l.default.ins.Enter("GameCoverScene", e => {
        e.setData(this.data.id);
      });
    });
  }
};
i([p(s.default)], u.prototype, "gameIcon", void 0);
i([p(cc.Label)], u.prototype, "nameLabel", void 0);
i([p(cc.Label)], u.prototype, "adLabel", void 0);
i([p(a.default)], u.prototype, "playBtn", void 0);
u = i([h], u);
exports.default = u;