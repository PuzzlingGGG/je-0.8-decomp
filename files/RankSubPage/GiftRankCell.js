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
exports.GiftRankCellData = void 0;
const a = e("../../../CustomUI/Button"),
  s = e("../../../CustomUI/ScrollList"),
  r = e("../../../Frame/SceneManager"),
  l = e("../../../Frame/UIColor"),
  c = e("../../../Frame/Util"),
  d = e("../../../Game/Player/GameIconMng"),
  {
    ccclass: h,
    property: p
  } = cc._decorator;
exports.GiftRankCellData = class {
  constructor(e, t, o, i, n) {
    this.gameId = null;
    this.gameName = null;
    this.gameIcon = null;
    this.rank = null;
    this.score = null;
    this.gameId = e;
    this.gameName = t;
    this.gameIcon = o;
    this.rank = i;
    this.score = n;
  }
};
let u = class extends cc.Component {
  constructor() {
    super(...arguments);
    this.btn = null;
    this.rankLabel = null;
    this.rankSprite = null;
    this.nameLabel = null;
    this.coinLabel = null;
    this.iconSprite = null;
    this.data = null;
  }
  onLoad() {
    this.btn.node.on(a.default.CLICK, this.onClick, this);
    this.node.on(s.default.SET_DATA, this.setData, this);
  }
  setData(e) {
    return n(this, void 0, void 0, function* () {
      this.data = e;
      let t = e.rank,
        o = t <= 3;
      this.rankLabel.node.active = !o;
      this.rankSprite.node.active = o;
      d.GameIconMng.Ins.setSprite(this.iconSprite, e.gameIcon, this.iconSprite.node.width);
      let i = l.UIColor.getRankColor(t);
      this.node.color = i;
      this.rankSprite.node.color = i;
      this.nameLabel.string = c.Util.clampStr(e.gameName, 9, "..");
      this.coinLabel.string = e.score + "";
      this.rankSprite.spriteFrame = null;
      o ? this.rankSprite.spriteFrame = yield c.Util.loadBundleRes("Atlas/UI/rank" + t, cc.SpriteFrame) : this.rankLabel.string = t + "";
    });
  }
  onClick() {
    return n(this, void 0, void 0, function* () {
      r.default.ins.Enter("GameCoverScene", e => {
        e.setData(this.data.gameId);
      });
    });
  }
};
i([p(cc.Button)], u.prototype, "btn", void 0);
i([p(cc.Label)], u.prototype, "rankLabel", void 0);
i([p(cc.Sprite)], u.prototype, "rankSprite", void 0);
i([p(cc.Label)], u.prototype, "nameLabel", void 0);
i([p(cc.Label)], u.prototype, "coinLabel", void 0);
i([p(cc.Sprite)], u.prototype, "iconSprite", void 0);
u = i([h], u);
exports.default = u;