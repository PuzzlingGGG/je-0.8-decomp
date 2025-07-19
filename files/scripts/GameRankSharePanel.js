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
const a = e("../../Frame/Top"),
  s = e("../../Frame/Util"),
  r = e("../../Game/GameEnv"),
  l = e("../../Game/Player/GameRankMng"),
  c = e("../../Game/Player/Mng"),
  d = e("../../Game/Player/TalkMng"),
  h = e("../../TGA"),
  p = e("../BaseGainPanel/BaseGainPanel"),
  u = e("../../Frame/Share"),
  {
    ccclass: m,
    property: f
  } = cc._decorator;
let g = class extends p.default {
  constructor() {
    super(...arguments);
    this.scoreLabel = null;
    this.unitLabel = null;
    this.icon = null;
    this.data = null;
    this.rank = null;
    this.gameData = null;
    this.shareCall = null;
  }
  onLoad() {
    super.onLoad();
  }
  setData(e, t, o) {
    return n(this, void 0, void 0, function* () {
      this.data = e;
      this.rank = t;
      this.gameData = o;
      let i = e.rankConf;
      this.scoreLabel.string = e.score + "";
      switch (i.rankType) {
        case l.GameRankType.ShortTime:
        case l.GameRankType.LongTime:
          this.setUnit("秒", null);
          break;
        case l.GameRankType.PropRank:
          {
            let e = yield c.Mng.Ins.propMng.loadOne(i.propId);
            this.setUnit(null, e.textureName);
            break;
          }
        case l.GameRankType.CustomRank:
          this.setUnit(null, null);
      }
    });
  }
  setUnit(e, t) {
    return n(this, void 0, void 0, function* () {
      this.unitLabel.node.active = !!e;
      this.unitLabel.string = e;
      this.icon.node.active = !!t;
      t && (yield c.Mng.Ins.spriteMng.setSprite(this.icon, t, 64, 1));
      s.Util.updateLabel(this.unitLabel);
      s.Util.updateAllLayout(this.unitLabel.node.parent);
    });
  }
  onGainBtnTap() {
    return n(this, void 0, void 0, function* () {
      let e = {
          type: "gameRank",
          cyGameId: this.gameData.id,
          gameRankId: this.rank.id
        },
        t = "";
      if (this.rank.rankType == l.GameRankType.LongTime || this.rank.rankType == l.GameRankType.ShortTime) t = `"${this.rank.name}"${this.data.score}秒！不服来战！`;else if (this.rank.rankType == l.GameRankType.PropRank) {
        let e = yield c.Mng.Ins.propMng.loadOne(this.rank.propId);
        t = `"${this.rank.name}"${this.data.score}个${e.name}！不服来战！`;
      } else this.rank.rankType == l.GameRankType.CustomRank && (t = `"${this.rank.name}"数值【${this.data.score}】！不服来战！`);
      let o = {
          shareType: "shareGame",
          title: t,
          desc: this.gameData.advert,
          imageUrl: "",
          query: s.Util.toQueryStr(e),
          imageName: this.gameData.iconTextureName,
          talk: {
            title: t,
            sections: [{
              type: d.TalkSectionType.Game,
              gameId: this.gameData.id
            }]
          },
          success: () => {
            a.default.showToast("分享成功");
            h.TGA.track("share", e);
            this.closePanel();
          },
          fail: () => {
            a.default.showToast("分享失败");
          }
        },
        i = this.gameData.iconTextureName;
      i && "icon1" !== i ? exports.imageUrl = r.gameEnv.fileCDN + i : delete o.imageUrl;
      u.Share.share(o);
    });
  }
};
i([f(cc.Label)], g.prototype, "scoreLabel", void 0);
i([f(cc.Label)], g.prototype, "unitLabel", void 0);
i([f(cc.Sprite)], g.prototype, "icon", void 0);
g = i([m], g);
exports.default = g;