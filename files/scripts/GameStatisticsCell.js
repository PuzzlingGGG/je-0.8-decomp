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
  l = e("../../Frame/Util"),
  c = e("../../Game/Player/GameIconMng"),
  d = e("../GameCoverScene/GameCoverScene"),
  {
    ccclass: h,
    property: p
  } = cc._decorator;
let u = class extends cc.Component {
  constructor() {
    super(...arguments);
    this.rankLabel = null;
    this.sprite = null;
    this.nameLabel = null;
    this.infoLabel1 = null;
    this.infoLabel2 = null;
    this.infoLabel3 = null;
    this.playBtn = null;
    this.data = null;
    this.spriteSize = 120;
  }
  onLoad() {
    this.playBtn && this.playBtn.node.on(a.default.CLICK, this.onClick, this);
    this.node.on(s.default.SET_DATA, this.setData, this);
    this.spriteSize = this.sprite.node.width - 6;
  }
  setData(e) {
    return n(this, void 0, void 0, function* () {
      this.node.active = !0;
      if (e) {
        this.data = e;
        this.nameLabel && (this.nameLabel.string = l.Util.clampStr(e.name, 6, ".."));
        this.rankLabel && (this.rankLabel.string = "" + e.rank);
        this.infoLabel1.string = `人均${l.Util.fixedNum(e.playAveTime, 3)}s`;
        this.infoLabel2.string = `x${e.playCntStatistics}人`;
        this.infoLabel3.string = `人均${l.Util.fixedNum(e.playAllCnt / e.playCntStatistics, 3)}次`;
        c.GameIconMng.Ins.setSprite(this.sprite, e.iconTextureName, this.spriteSize);
      } else this.node.active = !1;
    });
  }
  onClick() {
    return n(this, void 0, void 0, function* () {
      if (!this.data) return;
      let e = r.default.ins.findScene(d.default);
      e && e.node.active ? e.setData(this.data.id) : r.default.ins.Enter("GameCoverScene", e => {
        e.setData(this.data.id);
      });
    });
  }
};
i([p(cc.Label)], u.prototype, "rankLabel", void 0);
i([p(cc.Sprite)], u.prototype, "sprite", void 0);
i([p(cc.Label)], u.prototype, "nameLabel", void 0);
i([p(cc.Label)], u.prototype, "infoLabel1", void 0);
i([p(cc.Label)], u.prototype, "infoLabel2", void 0);
i([p(cc.Label)], u.prototype, "infoLabel3", void 0);
i([p(a.default)], u.prototype, "playBtn", void 0);
u = i([h], u);
exports.default = u;