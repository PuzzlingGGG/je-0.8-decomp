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
  s = e("../../../scripts/_autogen/data/data"),
  r = e("../../CustomUI/Button"),
  l = e("../../CustomUI/CoinBar"),
  c = e("../../Frame/CrossPlatform"),
  d = e("../../Frame/GameRecorder"),
  h = e("../../Frame/Panel"),
  p = e("../../Frame/SceneManager"),
  u = e("../../Frame/ScreenRect"),
  m = e("../../Frame/Top"),
  f = e("../../Frame/TweenUtil"),
  g = e("../../Frame/UIColor"),
  y = e("../../Frame/Util"),
  v = e("../../Game/GameRankComp"),
  C = e("../../Game/Hortor"),
  _ = e("../../Game/OperationFlow"),
  S = e("../../Game/PhyObj"),
  I = e("../../Game/Player/CoinMng"),
  G = e("../../Game/Player/LifeMng"),
  T = e("../../Game/Player/Mng"),
  b = e("../../Role"),
  M = e("../../Scene/GameScene/GameScene"),
  {
    ccclass: P,
    property: D
  } = cc._decorator;
let w = class extends h.default {
  constructor() {
    super(...arguments);
    this.titleNode = null;
    this.sprite = null;
    this.titleLabel = null;
    this.timeLabel = null;
    this.heart = null;
    this.backBtn = null;
    this.replayBtn = null;
    this.shareVideoBtn = null;
    this.layout = null;
    this.replayCall = null;
    this.data = null;
  }
  onLoad() {
    if (!d.default.isResultShareable()) {
      this.shareVideoBtn.node.active = !1;
      this.replayBtn.node.width = 500;
    }
    this.backBtn.node.on("click", this.onBackBtnTap, this);
    this.replayBtn.node.on("click", this.onReplayBtnTap, this);
    this.shareVideoBtn.node.on("click", this.onShareVideoBtnTap, this);
    if (C.Hortor.isApp() || c.wx) {
      this.shareVideoBtn.node.active = !1;
      this.replayBtn.node.width = 500;
    }
    this.backBtn.node.on(r.default.CLICK, this.onBackBtnTap, this);
    this.replayBtn.node.on(r.default.CLICK, this.onReplayBtnTap, this);
    this.shareVideoBtn.node.on(r.default.CLICK, this.onShareVideoBtnTap, this);
  }
  onEnable() {
    let e = u.default.height / 2 - 470;
    l.default.Ins.show(200, e);
  }
  onDisable() {
    l.default.Ins.hide();
  }
  setData(e) {
    return n(this, void 0, void 0, function* () {
      this.data = e;
      this.playTitleAnim(e.titleStr, () => {
        d.default.stop();
      });
      let t = G.LifeMng.Ins.getLife(this.data.gameData.id);
      y.Util.makeBro(this.heart, G.LifeMng.Ins.max, (e, o) => {
        e.color = o < t ? g.UIColor.red : g.UIColor.gray;
      });
      t--;
      G.LifeMng.Ins.setLife(e.gameData.id, t);
      if (t > 0) {
        this.timeLabel.node.active = !1;
        this.replayBtn.icon.node.color = g.UIColor.red;
        this.replayBtn.label.string = "复活";
        this.replayBtn.dot.active = !1;
      } else {
        this.timeLabel.node.active = !0;
        this.replayBtn.icon.node.color = g.UIColor.gray;
        this.replayBtn.label.string = "补满";
        this.replayBtn.dot.active = !0;
        if (e.gameData.playerId == b.default.Ins.role.id) {
          this.replayBtn.dotLabel.string = "作者免费";
          y.Util.searchChild(this.replayBtn.dot, "coin").active = !1;
        } else this.replayBtn.dotLabel.string = "使用100";
        this.updateTimeLabel();
        this.schedule(this.updateTimeLabel, 1);
      }
      this.dropHeartAnim(t, () => {});
      if (c.tt) {
        let t = c.crossPlatform.getStorageSync("lastShareVideoStamp") || 0;
        this.shareVideoBtn.dot.active = !y.Util.isToday(t) && e.isProd;
      }
      let o = yield T.Mng.Ins.actorMng.loadOne(e.actorConfId);
      o && T.Mng.Ins.spriteMng.setActorSprite(this.sprite, o.textureName, 200);
      if (e.gameRankId) {
        let t = yield T.Mng.Ins.gameRankMng.loadOne(e.gameRankId);
        if (t) {
          this.layout.spacingY = 20;
          y.Util.moveNode(this.titleNode, this.node);
          this.titleNode.position = cc.v2(220, 400);
          this.titleNode.scale = .6;
          this.sprite.node.active = !1;
          let o = yield y.Util.loadBundleRes("Prefab/GameRankComp"),
            i = cc.instantiate(o);
          this.layout.node.insertChild(i, 1);
          i.getComponent(v.default).setData(t, e.gameData, !1);
          i.height = 700;
        }
      }
    });
  }
  closeAnim(e) {
    e && e();
  }
  updateTimeLabel() {
    let e = G.LifeMng.Ins.getLifeStamp(this.data.gameData.id) + G.LifeMng.Ins.recoverTime - orange.TimeUtil.serverTime;
    e > 0 ? this.timeLabel.string = y.Util.parseTimeHHMMSS(e) + a.I18nMgr.getI18nStringByZh("后补满") : this.fillHeart();
  }
  playTitleAnim(e, t = null) {
    m.default.blockInput(!0, "playTitleAnim");
    f.TweenUtil.applayTextAnim(this.titleLabel, e, .1, () => {
      m.default.blockInput(!1, "playTitleAnim");
      t && t();
    });
  }
  dropHeartAnim(e, t = null) {
    let o = this.heart.parent.children[e];
    if (!o) return;
    m.default.blockInput(!0, "dropHeartAnim");
    let i = cc.tween(o),
      n = o.position.sub(cc.v2(7, 0)),
      a = o.position.add(cc.v2(7, 0));
    for (let e = 0; e < 15; e++) i.to(.05, {
      position: e % 2 == 0 ? n : a
    });
    i.to(.05, {
      position: o.position
    }).call(() => {
      let e = cc.instantiate(o);
      exports.color = g.UIColor.gray;
      this.node.addChild(e);
      e.position = y.Util.convertPosition(o, this.node);
      let t = e.addComponent(S.default);
      t.fly(y.Util.randomInt(-100, 100), y.Util.randomInt(200, 300), y.Util.randomInt(-300, 300));
      t.fadeOut();
    }).delay(.5).call(() => {
      m.default.blockInput(!1, "dropHeartAnim");
      t && t();
    });
    i.start();
  }
  fillHeart(e = null) {
    this.timeLabel.node.active = !1;
    this.replayBtn.dot.active = !1;
    this.replayBtn.label.string = "复活";
    this.unschedule(this.updateTimeLabel);
    G.LifeMng.Ins.setLife(this.data.gameData.id, G.LifeMng.Ins.max);
    m.default.blockInput(!0, "fillHeartAnim");
    let t = this.heart.parent,
      o = t.childrenCount,
      i = this.heart.scale;
    for (let n = 0; n < o; n++) {
      let a = t.children[n];
      cc.tween(a).delay(.1 * n).to(.1, {
        scale: 1.5 * i
      }).call(() => {
        a.color = g.UIColor.red;
      }).to(.1, {
        scale: i
      }).call(() => {
        if (n == o - 1) {
          this.replayBtn.icon.node.color = g.UIColor.red;
          f.TweenUtil.applyScaleBounce2(this.replayBtn.node, 1, 1.5, null, () => {
            m.default.blockInput(!1, "fillHeartAnim");
            e && e();
          });
        }
      }).start();
    }
  }
  onBackBtnTap() {
    this.closePanel();
    d.default.stopAndClear();
    p.default.ins.Back();
    cc.game.emit(M.default.GameScene_EXIT, !1);
  }
  onReplayBtnTap() {
    return n(this, void 0, void 0, function* () {
      if (G.LifeMng.Ins.getLife(this.data.gameData.id) > 0) {
        d.default.stopAndClear();
        this.closePanel();
        this.replayCall && this.replayCall();
      } else if (this.data.gameData.playerId == b.default.Ins.role.id) this.fillHeart(() => {
        this.onReplayBtnTap();
      });else if (I.default.Ins.coin >= 100) {
        yield I.default.Ins.requestCostCoinInGame(s.SaleGoodsType.gameReborn, 100, this.data.gameData.id, "玩家复活", this.data.gameData.iconTextureName);
        this.fillHeart(() => {
          this.onReplayBtnTap();
        });
      } else p.default.ins.OpenPanelByName("LackCoinPanel");
    });
  }
  onShareVideoBtnTap() {
    if (d.default.hasVideo) {
      let e = ["创游编辑器"];
      this.data && e.push(this.data.gameData.name);
      d.default.share({
        video_title: "这个游戏超好玩！",
        topics: e,
        query: y.Util.toQueryStr({
          type: "game",
          isMine: this.data.gameData.playerId == b.default.Ins.role.id,
          gameId: this.data.gameData.id
        }),
        tgaFrom: "GameOverPanel",
        succ: () => n(this, void 0, void 0, function* () {
          if (this.shareVideoBtn.dot.active) {
            this.shareVideoBtn.dot.active = !1;
            c.crossPlatform.setStorageSync("lastShareVideoStamp", orange.TimeUtil.serverTime);
            let e = yield I.default.Ins.requestAddCoinByShare();
            if (!e) return;
            _.OperationFlow.openRewards(e, () => {});
          }
        })
      });
    } else m.default.showToast("录屏时间太短");
  }
};
i([D(cc.Node)], w.prototype, "titleNode", void 0);
i([D(cc.Sprite)], w.prototype, "sprite", void 0);
i([D(cc.Label)], w.prototype, "titleLabel", void 0);
i([D(cc.Label)], w.prototype, "timeLabel", void 0);
i([D(cc.Node)], w.prototype, "heart", void 0);
i([D(r.default)], w.prototype, "backBtn", void 0);
i([D(r.default)], w.prototype, "replayBtn", void 0);
i([D(r.default)], w.prototype, "shareVideoBtn", void 0);
i([D(cc.Layout)], w.prototype, "layout", void 0);
w = i([P], w);
exports.default = w;