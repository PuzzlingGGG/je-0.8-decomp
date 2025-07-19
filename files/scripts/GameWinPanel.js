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
  s = e("../../Frame/CrossPlatform"),
  r = e("../../Frame/GameRecorder"),
  l = e("../../Frame/Panel"),
  c = e("../../Frame/Top"),
  d = e("../../Frame/TweenUtil"),
  h = e("../../Frame/Util"),
  p = e("../../Game/GameRankComp"),
  u = e("../../Game/OperationFlow"),
  m = e("../../Game/Player/CoinMng"),
  f = e("../../Game/Player/LifeMng"),
  g = e("../../Game/Player/Mng"),
  y = e("../../Role"),
  {
    ccclass: v,
    property: C
  } = cc._decorator;
let _ = class extends l.default {
  constructor() {
    super(...arguments);
    this.sprite = null;
    this.titleLabel = null;
    this.backBtn = null;
    this.replayBtn = null;
    this.shareVideoBtn = null;
    this.layout = null;
    this.data = null;
    this.replayCall = null;
    this.backCall = null;
  }
  onLoad() {
    this.replayBtn.node.on(a.default.CLICK, this.onReplayBtnTap, this);
    this.backBtn.node.on(a.default.CLICK, this.onBackBtnTap, this);
    this.shareVideoBtn.node.on(a.default.CLICK, this.onShareVideoBtnTap, this);
    console.log("button share " + r.default.isResultShareable());
    if (!r.default.isResultShareable()) {
      this.shareVideoBtn.node.active = !1;
      this.replayBtn.node.width = 500;
    }
  }
  closeAnim(e) {
    e && e();
  }
  setData(e) {
    return n(this, void 0, void 0, function* () {
      this.data = e;
      this.playTitleAnim(e.titleStr, () => {
        r.default.stop();
      });
      g.Mng.Ins.spriteMng.setActorSprite(this.sprite, e.textureName, 200);
      this.data.isProd && f.LifeMng.Ins.setLife(this.data.gameData.id, f.LifeMng.Ins.max);
      if (s.tt) {
        let t = s.crossPlatform.getStorageSync("lastShareVideoStamp") || 0;
        this.shareVideoBtn.dot.active = !h.Util.isToday(t) && e.isProd;
      }
      if (e.gameRankId) {
        let t = yield g.Mng.Ins.gameRankMng.loadOne(e.gameRankId);
        if (t) {
          this.layout.spacingY = 0;
          this.sprite.node.active = !1;
          let o = yield h.Util.loadBundleRes("Prefab/GameRankComp"),
            i = cc.instantiate(o);
          this.layout.node.insertChild(i, 1);
          i.getComponent(p.default).setData(t, e.gameData, !1);
          i.height = 700;
        }
      }
    });
  }
  playTitleAnim(e, t = null) {
    c.default.blockInput(!0, "playTitleAnim");
    d.TweenUtil.applayTextAnim(this.titleLabel, e, .1, () => {
      c.default.blockInput(!1, "playTitleAnim");
      t && t();
    });
  }
  onBackBtnTap() {
    this.closePanel();
    r.default.stopAndClear();
    this.backCall && this.backCall();
  }
  onReplayBtnTap() {
    r.default.stopAndClear();
    this.closePanel();
    this.replayCall && this.replayCall();
  }
  onShareVideoBtnTap() {
    if (r.default.hasVideo) {
      let e = ["创游编辑器"];
      this.data && e.push(this.data.gameData.name);
      r.default.share({
        video_title: "这个游戏超好玩！",
        topics: e,
        query: h.Util.toQueryStr({
          type: "goods",
          isMine: this.data.gameData.playerId == y.default.Ins.role.id,
          gameId: this.data.gameData.id
        }),
        tgaFrom: "GameWinPanel",
        succ: () => n(this, void 0, void 0, function* () {
          if (this.shareVideoBtn.dot.active) {
            this.shareVideoBtn.dot.active = !1;
            s.crossPlatform.setStorageSync("lastShareVideoStamp", orange.TimeUtil.serverTime);
            let e = yield m.default.Ins.requestAddCoinByShare();
            u.OperationFlow.openRewards(e, () => {});
          }
        })
      });
    } else c.default.showToast("录屏时间太短");
  }
};
i([C(cc.Sprite)], _.prototype, "sprite", void 0);
i([C(cc.Label)], _.prototype, "titleLabel", void 0);
i([C(a.default)], _.prototype, "backBtn", void 0);
i([C(a.default)], _.prototype, "replayBtn", void 0);
i([C(a.default)], _.prototype, "shareVideoBtn", void 0);
i([C(cc.Layout)], _.prototype, "layout", void 0);
_ = i([v], _);
exports.default = _;