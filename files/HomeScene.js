"use strict";

var i,
  n = this && this.__decorate || function (e, t, o, i) {
    var n,
      a = arguments.length,
      s = a < 3 ? t : null === i ? i = Object.getOwnPropertyDescriptor(t, o) : i;
    if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) s = Reflect.decorate(e, t, o, i);else for (var r = e.length - 1; r >= 0; r--) (n = e[r]) && (s = (a < 3 ? n(s) : a > 3 ? n(t, o, s) : n(t, o)) || s);
    return a > 3 && s && Object.defineProperty(t, o, s), s;
  },
  a = this && this.__awaiter || function (e, t, o, i) {
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
exports.HomePageIdx = void 0;
const s = e("../../Frame/Scene"),
  r = e("../../CustomUI/ToggleGroup"),
  l = e("../../Frame/SceneManager"),
  c = e("../../Frame/Util"),
  d = e("../../Frame/CrossPlatform"),
  h = e("../../Game/Player/DynamicMng"),
  p = e("../../Game/Player/GameCellDataMng"),
  u = e("../../Game/Player/ShopMng"),
  m = e("../../Game/OperationFlow"),
  f = e("../../Game/Player/Mng"),
  g = e("../../Frame/UIColor"),
  y = e("../../TGA"),
  v = e("../../Game/Hortor"),
  C = e("../../Game/Player/CoinMng"),
  _ = e("../../Game/GameEnv"),
  S = e("../GameCoverScene/GameCoverScene"),
  I = e("../../Game/Player/GuideMng"),
  G = e("../../../i18n/i18nMgr"),
  T = e("../../CustomUI/Button"),
  {
    ccclass: b,
    menu: M,
    property: P
  } = cc._decorator;
(function (e) {
  e[e.Game = 0] = "Game";
  e[e.Shop = 1] = "Shop";
  e[e.Talk = 2] = "Talk";
  e[e.Msg = 3] = "Msg";
  e[e.Mine = 4] = "Mine";
})(o.HomePageIdx || (exports.HomePageIdx = {}));
let D = i = class extends s.default {
  constructor() {
    super(...arguments);
    this.toggleGroup = null;
    this.content = null;
    this.createGameButton = null;
    this.pageMap = new Map();
    this.pageNames = ["DiscoverPage", "ShopPage", "CreateNewGame", "MsgPage", "MinePage"];
    this.promiseCache = new Map();
  }
  onLoad() {
    this.toggleGroup.node.on(r.default.TOGGLE_CHANGE, this.onToggleChange, this);
  }
  onEnterScene() {
    cc.game.emit(i.HomeScene_Enterd, this);
  }
  onShow(e) {
    m.OperationFlow.deelOnShow(e);
  }
  onToggleChange(e) {
    return a(this, void 0, void 0, function* () {
      if (2 == e) ;else {
        this.pageMap.forEach(e => {
          e.active = !1;
        });
        let t = this.pageNames[e],
          o = this.pageMap.get(t);
        if (!o) {
          let i = this.promiseCache.get(t);
          if (!i) {
            i = c.Util.loadBundleRes("Scene/HomeScene/" + t);
            this.promiseCache.set(t, i);
          }
          let n = new Date().getTime(),
            a = yield i,
            s = new Date().getTime();
          console.log("pageName", s - n);
          if (e !== this.toggleGroup.idx) return;
          if (!(o = this.pageMap.get(t))) {
            o = cc.instantiate(a);
            this.content.addChild(o);
            this.pageMap.set(t, o);
          }
        }
        exports.active = !0;
        cc.game.emit(i.PAGE_LOADED, o);
      }
    });
  }
  seletePage(e) {
    this.toggleGroup.selectIdx(e);
  }
  checkPanel(e) {
    return a(this, void 0, void 0, function* () {
      this.scheduleOnce(() => a(this, void 0, void 0, function* () {
        let t = yield h.DynamicMng.Ins.loadOne("Notice");
        t && t.msg && t.version == _.gameEnv.creatorVersion && l.default.ins.pushPanel("NoticePanel", e => {
          e.label.string = t.msg;
          e.closeCallback = () => {
            t.exitGame && d.crossPlatform.exitMiniProgram();
          };
        });
        e.canObtainTTCoin && l.default.ins.pushPanel("GainCoinPanel", e => a(this, void 0, void 0, function* () {
          let t = yield C.default.Ins.requestTTCoin0319();
          e.setData(t.cnt, "  儿童节快乐！", "  别人家小朋友有的，我家小朋友也要有！");
        }));
        let o = e.offLineChangeMsg;
        o && o.incExp > 0 && l.default.ins.pushPanel("LevelUpgradePanel", e => {
          e.setData(o);
        });
        e.unlockGameRewards && e.unlockGameRewards.forEach(e => {
          l.default.ins.pushPanel("UnlockPanel", t => {
            t.setData("游戏栏位+1", `Lv.${e}游戏栏位已解锁`);
          });
        });
        e.unlockGoodsRewards && e.unlockGoodsRewards.forEach(e => {
          l.default.ins.pushPanel("UnlockPanel", t => {
            t.setData("商品栏位+1", `Lv.${e}商品栏位已解锁`);
          });
        });
        let i = e.saleSummarys || [],
          n = e.gameSaleSummarys || [],
          s = e.rebornSummarys || [],
          r = e.adSummarys || [];
        (i.length > 0 || n.length > 0 || r.length > 0) && l.default.ins.pushPanel("SummaryPanel", e => {
          e.setData(i, n, s, r);
        });
        let m = d.crossPlatform.getStorageSync("EditWorldSceneTempSave");
        if (m && m.gameId && m.worldId && m.worldLayout) {
          let e = (yield f.Mng.Ins.gameMng.loadAll()).find(e => e.id == m.gameId);
          if (e) {
            let t = m.worldId,
              o = yield f.Mng.Ins.worldMng.loadOne(t, !0);
            e.worldIds.indexOf(t) >= 0 && o && l.default.ins.pushPanel("MessageBox", t => {
              t.label.string = G.I18nMgr.getI18nStringByZh("上次编辑地图时非正常退出，是否继续编辑？");
              t.setLeftBtn({
                text: G.I18nMgr.getI18nStringByZh("放弃"),
                color: g.UIColor.pink,
                call: () => a(this, void 0, void 0, function* () {
                  d.crossPlatform.removeStorageSync("EditWorldSceneTempSave");
                })
              });
              t.setRightBtn({
                text: G.I18nMgr.getI18nStringByZh("继续编辑"),
                color: g.UIColor.blue,
                call: () => {
                  l.default.ins.Enter("EditGameScene", t => a(this, void 0, void 0, function* () {
                    yield t.setData(e);
                    l.default.ins.Enter("EditWorldScene", t => a(this, void 0, void 0, function* () {
                      t.setData(e, o, m.worldLayout);
                    }));
                  }));
                }
              });
            });
          }
        }
        let T = null;
        if (v.Hortor.isApp()) T = v.Hortor.launchQueryData;else if (c.Util.compareSDKVersion("1.12.0")) {
          let e = d.crossPlatform.getLaunchOptionsSync();
          e && e.query && (T = e.query);
        }
        if (T) {
          let e = T.type || "game";
          if ("game" == e) {
            let e = T.cyGameId || T.gameId;
            e && (e = e.replace("_", ":"));
            if (e && !e.includes("game-")) {
              let t = yield p.default.Ins.loadGames([e]);
              t && t[0] && l.default.ins.pushPanel("OpenGamePanel", o => {
                let i = "";
                i = !0 === T.isMine || void 0 === T.isMine ? G.I18nMgr.getI18nStringByZh("欢迎你玩我的游戏！") : G.I18nMgr.getI18nStringByZh("这个游戏超好玩！");
                o.setData(i, t[0]);
                y.TGA.track("clickGameCell", {
                  gameId: e,
                  from: "OpenGamePanel"
                });
              });
            }
          }
          if ("goods" == e) {
            let e = T.goodsId;
            if (e) {
              let t = yield u.default.Ins.loadGoodsInfos([e]);
              t && t[0] && l.default.ins.pushPanel("BuyGoodsPanel", e => {
                e.setData(t[0]);
                e.buyCall = () => {
                  cc.game.emit("RefreshShopList");
                };
              });
            }
          }
          "gameRank" == e && l.default.ins.pushCall(() => {
            this.scheduleOnce(() => {
              let e = T.cyGameId;
              l.default.ins.Enter("GameCoverScene", t => a(this, void 0, void 0, function* () {
                t.setData(e);
                let o = yield c.Util.once(S.default.GameCoverScene_GamePackLoaded),
                  i = yield f.Mng.Ins.gameRankMng.loadOne(T.gameRankId);
                i && e == o.gameData.id && l.default.ins.OpenPanelByName("GameRankPanel", e => {
                  e.setData(i, o.gameData);
                });
              }));
            }, .5);
          });
        }
        l.default.ins.pushCall(() => {
          I.default.Ins.isComplete(I.GuideId.Intro) || I.default.Ins.guideIntro();
        });
        l.default.ins.checkNextPanel();
      }));
    });
  }
};
D.PAGE_LOADED = "PAGE_LOADED";
D.HomeScene_Enterd = "HomeScene_Enterd";
n([P(r.default)], D.prototype, "toggleGroup", void 0);
n([P(cc.Node)], D.prototype, "content", void 0);
n([P(T.default)], D.prototype, "createGameButton", void 0);
D = i = n([b, M("场景/HomeScene")], D);
exports.default = D;