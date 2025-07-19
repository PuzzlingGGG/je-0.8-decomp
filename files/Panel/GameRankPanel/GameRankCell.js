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
  s = e("../../CustomUI/HeadIcon"),
  r = e("../../Frame/Util"),
  l = e("../../Game/Player/Mng"),
  c = e("../../CustomUI/Button"),
  d = e("../../Role"),
  h = e("../../Game/Player/GameRankDataMng"),
  p = e("../../Game/Player/GameRankMng"),
  {
    ccclass: u,
    property: m
  } = cc._decorator;
let f = class extends cc.Component {
  constructor() {
    super(...arguments);
    this.nameLabel = null;
    this.headIcon = null;
    this.scoreLabel = null;
    this.rankLabel = null;
    this.unitLabel = null;
    this.icon = null;
    this.trophy = null;
    this.deleteBtn = null;
    this.data = null;
  }
  onLoad() {
    this.node.on(a.default.SET_DATA, this.setData, this);
    this.deleteBtn && this.deleteBtn.node.on(c.default.CLICK, this.onDelete, this);
  }
  setData(e) {
    return n(this, void 0, void 0, function* () {
      this.data = e;
      if (!e) return;
      this.nameLabel.string = e.userName + "";
      this.scoreLabel.string = e.score + "";
      if (e.score < 999) this.scoreLabel.overflow = cc.Label.Overflow.NONE;else {
        this.scoreLabel.overflow = cc.Label.Overflow.SHRINK;
        this.scoreLabel.node.width = 60;
      }
      r.Util.updateLabel(this.scoreLabel);
      this.headIcon.loadUrl(e.userImg);
      this.headIcon.setLevel(e.userLevel);
      let t = e.rankConf;
      this.deleteBtn && (this.deleteBtn.node.active = t.roleId == d.default.Ins.role.id);
      switch (t.rankType) {
        case p.GameRankType.ShortTime:
        case p.GameRankType.LongTime:
          this.setUnit("秒", null);
          break;
        case p.GameRankType.PropRank:
          {
            let e = yield l.Mng.Ins.propMng.loadOne(t.propId);
            this.setUnit(null, e.textureName);
            break;
          }
        case p.GameRankType.CustomRank:
          this.setUnit(null, null);
      }
      this.trophy.node.active = !1;
      this.rankLabel.node.active = !1;
      if (e.rank <= 3) {
        this.trophy.node.active = !0;
        r.Util.loadBundleRes("Atlas/UI/trophy" + e.rank, cc.SpriteFrame).then(e => {
          this.trophy.spriteFrame = e;
        });
      } else if (e.rank <= h.default.Ins.max) {
        this.rankLabel.string = e.rank + "";
        this.rankLabel.node.active = !0;
      } else {
        this.rankLabel.string = h.default.Ins.max + "+";
        this.rankLabel.node.active = !0;
      }
    });
  }
  setUnit(e, t) {
    return n(this, void 0, void 0, function* () {
      this.unitLabel.node.active = !!e;
      this.unitLabel.string = e;
      this.icon.node.active = !!t;
      t && (yield l.Mng.Ins.spriteMng.setSprite(this.icon, t, 64, 1));
      r.Util.updateLabel(this.unitLabel);
      r.Util.updateAllLayout(this.unitLabel.node.parent);
    });
  }
  onDelete() {
    this.node.dispatchEvent(r.Util.customEvent("GameRankCell.onDelete", !0, this.data));
  }
};
i([m(cc.Label)], f.prototype, "nameLabel", void 0);
i([m(s.default)], f.prototype, "headIcon", void 0);
i([m(cc.Label)], f.prototype, "scoreLabel", void 0);
i([m(cc.Label)], f.prototype, "rankLabel", void 0);
i([m(cc.Label)], f.prototype, "unitLabel", void 0);
i([m(cc.Sprite)], f.prototype, "icon", void 0);
i([m(cc.Sprite)], f.prototype, "trophy", void 0);
i([m(c.default)], f.prototype, "deleteBtn", void 0);
f = i([u], f);
exports.default = f;