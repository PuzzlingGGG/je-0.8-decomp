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
const a = e("../../CustomUI/ScrollList"),
  s = e("../../Frame/Util"),
  r = e("../../CustomUI/Button"),
  l = e("../../Frame/SceneManager"),
  c = e("../../TGA"),
  d = e("../../CustomUI/GameIcon"),
  h = e("../../Game/Player/RcmdMng"),
  {
    ccclass: p,
    property: u
  } = cc._decorator;
let m = class extends cc.Component {
  constructor() {
    super(...arguments);
    this.nameLabel = null;
    this.playLabel = null;
    this.playBtn = null;
    this.gameIcon = null;
    this.gameData = null;
  }
  onLoad() {
    this.node.on(a.default.SET_DATA, this.setData, this);
    this.node.on(r.default.CLICK, this.onPlayBtn, this);
  }
  setData(e) {
    return n(this, void 0, void 0, function* () {
      this.gameData = e;
      this.nameLabel.string = "";
      if (e) {
        h.default.Ins.gameShow(e.id, "FriendGame");
        this.nameLabel.string = s.Util.clampStr(e.name, 6, "..");
        this.gameIcon.loadUrl(e.iconTextureName);
        this.gameIcon.showSubIcon(e.openCreativeGame);
        let t = e.playCnt || 0;
        this.playLabel.string = "" + t;
        this.playLabel.node.parent.active = 0 != t;
      } else this.gameIcon.loadUrl("icon1");
    });
  }
  onPlayBtn() {
    return n(this, void 0, void 0, function* () {
      l.default.ins.Enter("GameCoverScene", e => {
        e.setData(this.gameData.id);
      }, l.ShiftAnima.moveLeftShift);
      c.TGA.track("clickGameCell", {
        gameId: this.gameData.id,
        from: "FriendGameCell"
      });
    });
  }
};
i([u(cc.Label)], m.prototype, "nameLabel", void 0);
i([u(cc.Label)], m.prototype, "playLabel", void 0);
i([u(r.default)], m.prototype, "playBtn", void 0);
i([u(d.default)], m.prototype, "gameIcon", void 0);
m = i([p], m);
exports.default = m;