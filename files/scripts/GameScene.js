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
const s = e("../../GameScript/index"),
  r = e("../../CustomUI/Button"),
  l = e("../../CustomUI/HeroHeadIcon"),
  c = e("../../CustomUI/HpBar"),
  d = e("../../Frame/Config"),
  h = e("../../Frame/EngineManager"),
  p = e("../../Frame/FightSystem"),
  u = e("../../Frame/GameRecorder"),
  m = e("../../Frame/Scene"),
  f = e("../../Frame/SceneManager"),
  g = e("../../Frame/Top"),
  y = e("../../Frame/TweenUtil"),
  v = e("../../Frame/Util"),
  C = e("../../Game/DialogBox"),
  _ = e("../../Game/GameBoard"),
  S = e("../../Game/Player/Mng"),
  I = e("../../Game/Player/RunDataMng"),
  G = e("../../Game/World/Actor"),
  T = e("../../Game/World/AICtrl/GridRandomCtrl"),
  b = e("../../Game/World/AICtrl/GridStaticCtrl"),
  M = e("../../Game/World/AICtrl/PlatformJumpAiMoveCtrl"),
  P = e("../../Game/World/AICtrl/PlatformJumpAiStaticCtrl"),
  D = e("../../Game/World/Mover/GridMover"),
  w = e("../../Game/World/HeroContactTileCtrl"),
  B = e("../../Game/World/HeroInteractCtrl"),
  R = e("../../Game/World/MoverCtrl/DragMoverCtrl"),
  x = e("../../Game/World/MoverCtrl/GridMoverCtrl"),
  L = e("../../Game/World/MoverCtrl/PlatformJumpMoverCtrl"),
  k = e("../../Game/World/World"),
  F = e("../../TGA"),
  N = e("../../Game/Player/LifeMng"),
  A = e("../../Game/World/AICtrl/PlatformJumpAiFollowHeroCtrl"),
  O = e("../../CustomUI/ScrollList"),
  U = e("../../Game/Player/GamePetMng"),
  E = e("../../Game/World/AICtrl/PlatformJumpAiComMoveCtrl"),
  j = e("./ShiftWorldAnim"),
  H = e("../../Game/Player/GameBagMng"),
  W = e("../../Frame/UIColor"),
  V = e("../../Game/Player/GameSaveMng"),
  K = e("../../Game/Player/TriggerMng"),
  J = e("./GameBagBar"),
  Z = e("../../Game/World/Mover/DragMover"),
  z = e("../../Game/World/Mover/Mover"),
  X = e("../../Game/World/Mover/PlatformJumpMover"),
  q = e("../../Game/World/MoverCtrl/RpgMoverCtrl"),
  Y = e("../../Game/World/Mover/RpgMover"),
  $ = e("../../Game/World/CameraFollowers/WorldRpgCameraFollower"),
  Q = e("../../Game/World/CameraFollowers/WorldJumpCameraFollower"),
  ee = e("../../Frame/CrossPlatform"),
  te = e("./GameTimerComp"),
  oe = e("../../Game/Player/GameRankDataMng"),
  ie = e("../../../scripts/_autogen/data/data"),
  ne = e("../../Game/Player/GameRankMng"),
  ae = e("../../GameData/GameTypeDefine"),
  se = e("../../Game/Player/CoinMng"),
  re = e("../../Game/OperationFlow"),
  {
    ccclass: le,
    property: ce
  } = cc._decorator;
let de = i = class extends m.default {
  constructor() {
    super(...arguments);
    this.backBtn = null;
    this.recorderBtn = null;
    this.nameLabel = null;
    this.bagBtn = null;
    this.hpBar = null;
    this.heroHeadIcon = null;
    this.petList = null;
    this.shiftWorldAnim = null;
    this.bagBar = null;
    this.countDownTimeNode = null;
    this.countDownTimeLabel = null;
    this.gameTimer = null;
    this.heroContactTileCtrl = null;
    this.heroInteractCtrl = null;
    this.dialogBox = null;
    this.gameData = null;
    this.moverCtrl = null;
    this.world = null;
    this.backCall = null;
    this._mode = "Test";
    this.busy = !1;
    this.curWorldId = null;
    this.firstWorldId = "";
    this.testHero = null;
    this.shiftWorlding = !1;
    this.tempSave = null;
    this._heroDataMap = new Map();
    this._cameraFollowersMap = new Map();
    this._heroPetDatas = [];
  }
  get mode() {
    return this._mode;
  }
  set mode(e) {
    this._mode = e;
  }
  onLoad() {
    this.backBtn.node.on(r.default.CLICK, this.onBackBtnTap, this);
    this.bagBtn.node.on(r.default.CLICK, this.onBagBtnTap, this);
    cc.game.on(i.SHOW_DIALOG_BOX, this.showDialog, this);
    cc.game.on(i.GAME_SHOP, this.onGameShop, this);
    cc.game.on(i.GAME_RANK, this.onGameRank, this);
    cc.game.on(i.UPLOAD_GAME_RANK_SCORE, this.updateRankScore, this);
    cc.game.on(i.GAME_OVER, this.gameOver, this);
    cc.game.on(i.GAME_WIN, this.gameWin, this);
    cc.game.on(i.HERO_PET_CHANGE, this.heroPetChange, this);
    cc.game.on(i.SHARE_GAME, this.onShareGame, this);
    cc.game.on(i.SHOW_AD, this.onShowAd, this);
    this.heroContactTileCtrl = this.node.getComponent(w.default);
    this.heroInteractCtrl = this.node.getComponent(B.default);
    this.heroPetChange();
  }
  onDestroy() {
    u.default.dettachRecordButton();
    cc.game.off(i.SHOW_DIALOG_BOX, this.showDialog, this);
    cc.game.off(i.GAME_SHOP, this.onGameShop, this);
    cc.game.off(i.GAME_RANK, this.onGameRank, this);
    cc.game.off(i.UPLOAD_GAME_RANK_SCORE, this.updateRankScore, this);
    cc.game.off(i.GAME_OVER, this.gameOver, this);
    cc.game.off(i.GAME_WIN, this.gameWin, this);
    cc.game.off(i.HERO_PET_CHANGE, this.heroPetChange, this);
  }
  onEnterScene() {
    _.GameBoard.IS_EDITOR_MODE = !1;
    h.default.Ins.mainCamera.node.active = !1;
    this.recorderBtn.node.active = !ee.tt;
    this.resetRecorderBtn();
  }
  resetRecorderBtn() {
    this.recorderBtn.background.node.color = W.UIColor.green;
    this.recorderBtn.label.string = "录屏";
  }
  onExitScene() {
    S.Mng.Ins.worldMng.tempCache.clear();
    h.default.Ins.mainCamera.node.active = !0;
    p.FightSystem.enable = !1;
    this.backCall && this.backCall();
  }
  onBackBtnTap() {
    return a(this, void 0, void 0, function* () {
      if ("Test" == this.mode) {
        V.default.Ins.clearFlag();
        u.default.stopAndClear();
        f.default.ins.Back();
        this.resetWorld();
        this.gameTimer.stop();
        cc.game.emit(i.GameScene_EXIT, !1);
      } else if ("Prod" == this.mode) {
        this.pauseAll();
        f.default.ins.OpenPanelByName("PausePanel", e => {
          e.resumeCall = () => {
            this.resumeAll();
          };
          e.exitCall = () => a(this, void 0, void 0, function* () {
            V.default.Ins.clearFlag();
            u.default.stopAndClear();
            this.resetWorld();
            f.default.ins.Back();
            this.gameTimer.stop();
            cc.game.emit(i.GameScene_EXIT, !1);
            F.TGA.track("gamePlay", {
              gameId: this.gameData.id,
              step: "giveup"
            });
          });
        });
      }
    });
  }
  onBagBtnTap() {
    this.pauseAll();
    f.default.ins.OpenPanelByName("BagPanel", e => {
      let t = this.world.findHeroActor();
      t && (e.triggerSource = t.node);
      e.closeCallback = () => {
        this.resumeAll();
      };
    });
  }
  ProcessHeroEnter(e, t) {
    return a(this, void 0, void 0, function* () {
      let o = !1;
      if (e.isEnteredWorldTypes) e.isEnteredWorldTypes[t] || (o = !0);else {
        o = !0;
        e.isEnteredWorldTypes = [];
      }
      if (o) {
        let o = yield S.Mng.Ins.actorMng.getOne(e.confId);
        t == ae.WorldType.Rpg ? d.FillActorDataHelper.fillActorDataByRpgConf(e, o.rpgConf) : t == ae.WorldType.Jump && d.FillActorDataHelper.fillActorDataByJumpPlatformConf(e, o.jumpPlatformConf);
      }
    });
  }
  play(e, t = null, o = null) {
    return a(this, void 0, void 0, function* () {
      u.default.attachRecordButton(this.recorderBtn, {
        video_title: "This game is so much fun！",
        topics: ["创游编辑器"],
        tgaFrom: "GameScene",
        query: v.Util.toQueryStr({
          type: "game",
          isMine: !1,
          cyGameId: e.id
        }).replace(/:/g, "_"),
        succ: () => a(this, void 0, void 0, function* () {
          if (this.recorderBtn.dot.active) {
            let e = yield se.default.Ins.requestAddCoinByShare();
            if (!e) return;
            re.OperationFlow.openRewards(e, () => {});
          }
        })
      });
      this.closeAllPanel();
      this.gameData = e;
      this.testHero = o;
      this.firstWorldId = t || e.firstWorldId;
      let i = this.firstWorldId;
      this.world && (this.world.hero = null);
      this._heroDataMap.clear();
      this._heroConfId = "";
      this.tempSave = null;
      if (o) {
        this._heroConfId = o.confId;
        this._heroDataMap.set(o.confId, o);
      }
      this.resetWorld();
      this.clearDialog();
      let n = N.LifeMng.Ins.getLife(e.id);
      if (n <= 0 && N.LifeMng.Ins.getLifeStamp(e.id) + N.LifeMng.Ins.recoverTime - orange.TimeUtil.serverTime <= 0) {
        n = N.LifeMng.Ins.max;
        N.LifeMng.Ins.setLife(e.id, N.LifeMng.Ins.max);
      }
      s.GSVariableMng.instance.resetValues();
      H.default.Ins.clear();
      I.default.Ins.clear();
      U.GamePetMng.Ins.Clear();
      V.default.Ins.clearFlag();
      k.default.unionActSet.clear();
      this.gameTimer.reset();
      if (n > 0) {
        this.shiftWorldById({
          id: i,
          onWorldReady: () => {
            ee.tt && u.default.start();
          }
        });
        F.TGA.track("gamePlay", {
          gameId: e.id,
          step: "beginPlay"
        });
      } else {
        this.curWorldId = i;
        this.gameOver({
          str: "生命不足"
        });
      }
    });
  }
  resetWorld() {
    this.busy = !1;
    this.moverCtrl && this.moverCtrl.setMover(null);
    this.world && this.world.reset();
  }
  clearDialog() {
    this.dialogBox && this.dialogBox.hide();
  }
  shiftWorldById(e) {
    return a(this, void 0, void 0, function* () {
      e.animId = e.animId || 2;
      let t = yield S.Mng.Ins.worldMng.loadOne(e.id, !0);
      if (!t) {
        g.default.showToast("加载地图失败");
        return;
      }
      if (this.shiftWorlding) return;
      this.shiftWorlding = !0;
      let o = v.Util.deepCopy(t.worldLayout);
      exports.type = t.info.type;
      let n = null;
      this.world && this.world.hero && (n = this.world.hero.data);
      n || (n = this._heroDataMap.get(this._heroConfId));
      n && (n.team = ae.Team.Hero);
      this.pauseAll();
      this.resetWorld();
      this.setHeroActor(null);
      this.curWorldId = t.id;
      this.shiftWorldAnim.play(t, e.animId, () => a(this, void 0, void 0, function* () {
        let i = this.world;
        if (!i) {
          let e = yield v.Util.loadBundleRes("Prefab/World"),
            t = cc.instantiate(e);
          this.node.addChild(t);
          i = t.getComponent(k.default);
        }
        this.world = i;
        i.isGameScene = !0;
        this.nameLabel.string = t.info.name;
        i.setWorldData(t);
        yield i.initByWorldLayout(o, t.id);
        let a = d.Config.getWorldConfByType(t.info.type);
        yield this.shiftMoverCtrl(a.moveType);
        let s = i.findHeroActor();
        if (s) {
          this._heroConfId = s.data.confId;
          n && this._heroDataMap.set(n.confId, n);
        } else if (n) {
          yield this.ProcessHeroEnter(n, t.info.type);
          s = i.addActor(this.world.worldLayout.startPoint.pos);
          yield s.setData(n);
        }
        if (s) {
          s.SetPosition(o.startPoint.pos.x, o.startPoint.pos.y);
          s.ApplyPosition();
        }
        this.setHeroActor(s);
        this.initOtherMover(t.info.type);
        s && n && k.default.unionActSet.union(n.id, s.data.id);
        e.onWorldReady && (yield e.onWorldReady());
        U.GamePetMng.Ins.InitWorldPets(i);
        i.ready();
        this.heroPetChange();
        this.shiftWorldAnim.worldIsReady();
      }), () => {
        this.resumeAll();
        this.shiftWorlding = !1;
        this.world.play();
        e.onShiftEnd && e.onShiftEnd();
        cc.game.emit(i.GameScene_SHIFT_WORLD_END);
      });
    });
  }
  shiftMoverCtrl(e) {
    return a(this, void 0, void 0, function* () {
      this.moverCtrl && this.moverCtrl.node.destroy();
      if (e == ae.MoveType.PlatformJump) {
        let e = yield v.Util.loadBundleRes("Prefab/MoverCtrl/PlatformJumpMoverCtrl"),
          t = cc.instantiate(e);
        this.node.insertChild(t, 0);
        this.moverCtrl = t.getComponent(L.default);
      } else if (e == ae.MoveType.GridMove) {
        let e = yield v.Util.loadBundleRes("Prefab/MoverCtrl/GridMoverCtrl"),
          t = cc.instantiate(e);
        this.node.insertChild(t, 0);
        this.moverCtrl = t.getComponent(x.default);
      } else if (e == ae.MoveType.Drag) {
        let e = yield v.Util.loadBundleRes("Prefab/MoverCtrl/DragMoverCtrl"),
          t = cc.instantiate(e);
        this.node.insertChild(t, 0);
        this.moverCtrl = t.getComponent(R.default);
      } else if (e == ae.MoveType.RpgMove) {
        let e = yield v.Util.loadBundleRes("Prefab/MoverCtrl/RpgMoverCtrl"),
          t = cc.instantiate(e);
        this.node.insertChild(t, 0);
        this.moverCtrl = t.getComponent(q.default);
      }
    });
  }
  refreshHpBar() {
    let e = this.world.findHeroActor();
    if (e) {
      this.hpBar.hp = e.hper.hp;
      this.hpBar.hpMax = e.hper.HpMax;
      this.hpBar.refresh();
    }
  }
  onHeroBeaten(e) {
    if (e.dmg > 0) {
      y.TweenUtil.applyShakeShort(this.hpBar.node);
      y.TweenUtil.applyShakeShort(this.heroHeadIcon.node);
    }
  }
  setHeroActor(e) {
    return a(this, void 0, void 0, function* () {
      this.heroInteractCtrl.setHero(null);
      this.heroContactTileCtrl.setHero(null);
      this.setCameraFollow(null);
      this.hpBar.hide();
      this.heroHeadIcon.loadTexture(null);
      if (this.moverCtrl) {
        this.moverCtrl.setMover(null);
        this.moverCtrl.hide();
      }
      if (this.world) {
        let e = this.world.findHeroActor();
        if (e) {
          let t = e.node.getComponent(z.default);
          if (t) {
            e.node.removeComponent(t);
            e.node.off(z.default.ActorMove, this.onHeroMove, this);
          }
          let o = e.hper.getEmitTarget();
          o.off(p.FightSystem.Event.HpChange, this.refreshHpBar, this);
          o.off(p.FightSystem.Event.HpMaxChange, this.refreshHpBar, this);
          o.off(p.FightSystem.Event.Beaten, this.onHeroBeaten, this);
        }
      }
      this.world && (this.world.hero = e);
      if (e) {
        if (this.moverCtrl instanceof L.default) {
          let t = e.node.addComponent(X.default);
          t.setActor(e);
          this.moverCtrl.setMover(t);
          t.node.on(z.default.ActorMove, this.onHeroMove, this);
        } else if (this.moverCtrl instanceof x.default) {
          let t = e.node.addComponent(D.default);
          t.setActor(e);
          this.moverCtrl.setMover(t);
          t.node.on(z.default.ActorMove, this.onHeroMove, this);
        } else if (this.moverCtrl instanceof R.default) {
          let t = e.node.addComponent(Z.default);
          this.moverCtrl.setMover(t);
          t.node.on(z.default.ActorMove, this.onHeroMove, this);
        } else if (this.moverCtrl instanceof q.default) {
          let t = e.node.addComponent(Y.default);
          t.setActor(e);
          this.moverCtrl.setMover(t);
          t.node.on(z.default.ActorMove, this.onHeroMove, this);
        }
        this.hpBar.show();
        this.moverCtrl.show();
        let t = e.hper.getEmitTarget();
        t.on(p.FightSystem.Event.HpChange, this.refreshHpBar, this);
        t.on(p.FightSystem.Event.HpMaxChange, this.refreshHpBar, this);
        t.on(p.FightSystem.Event.Beaten, this.onHeroBeaten, this);
        this.refreshHpBar();
        this.heroContactTileCtrl.setHero(e);
        this.heroInteractCtrl.setHero(e);
        this.setCameraFollow(e);
        let o = yield S.Mng.Ins.actorMng.loadOne(e.data.confId);
        o && this.heroHeadIcon.loadTexture(o.textureName);
      }
      this.heroPetChange();
    });
  }
  shiftHero(e) {
    return a(this, void 0, void 0, function* () {
      let t = yield S.Mng.Ins.actorMng.loadOne(e);
      if (t && this.world) {
        let o = this.world.hero;
        if (o) this._heroDataMap.set(o.data.confId, o.data);else {
          o = this.world.addActor(this.world.worldLayout.startPoint.pos);
          this.setHeroActor(o);
        }
        let i = this._heroDataMap.get(e);
        i || (i = G.default.createActorData(t, ae.Team.Hero, this.world.worldLayout));
        this._heroConfId = e;
        o.setData(i);
        this.heroHeadIcon.loadTexture(t.textureName);
      }
    });
  }
  onHeroMove(e) {
    this.world && this.world.isValid && this.world.node.emit(k.default.HERO_MOVE, e);
  }
  initAi(e, t) {
    k.default.clearAi(t);
    if (t.data.team == ae.Team.Enemy || t.data.team == ae.Team.Ally) {
      if (e == ae.WorldType.Jump) if (t.data.aiMoveType == ae.AIMoveType.PlatformJump_Static || t.data.aiMoveType == ae.AIMoveType.None) t.node.addComponent(P.default).setActor(t);else if (t.data.aiMoveType == ae.AIMoveType.PlatformJump_IDLE) {
        t.node.addComponent(X.default).setActor(t);
        t.node.addComponent(P.default).setActor(t);
      } else if (t.data.aiMoveType == ae.AIMoveType.PlatformJump_Ground_WallBack || t.data.aiMoveType == ae.AIMoveType.PlatformJump_Ground_MisstepBack || t.data.aiMoveType == ae.AIMoveType.PlatformJump_Jump_WallBack || t.data.aiMoveType == ae.AIMoveType.PlatformJump_Jump_Trace) {
        let e = t.node.addComponent(X.default);
        e.setActor(t);
        t.node.addComponent(M.default).setMover(e);
      } else t.data.aiMoveType == ae.AIMoveType.PlatformJump_FollowHero ? t.node.addComponent(A.default).setActor(t) : t.node.addComponent(E.default).setActor(t);
      if (e == ae.WorldType.Rpg) if (t.data.aiMoveType == ae.AIMoveType.Grid_Random) {
        let e = t.node.addComponent(D.default);
        e.setActor(t);
        t.node.addComponent(T.default).setMover(e);
      } else if (t.data.aiMoveType == ae.AIMoveType.Grid_Static) {
        let e = t.node.addComponent(D.default);
        e.setActor(t);
        t.node.addComponent(b.default).setMover(e);
      } else t.data.aiMoveType == ae.AIMoveType.PlatformJump_FollowHero ? t.node.addComponent(A.default).setActor(t) : t.node.addComponent(E.default).setActor(t);
    }
  }
  initOtherMover(e) {
    for (let t = 0; t < this.world.actors.length; t++) {
      let o = this.world.actors[t];
      o.data.team != ae.Team.Enemy && o.data.team != ae.Team.Ally || this.initAi(e, o);
    }
  }
  setCameraFollow(e) {
    if (!this.world) return;
    if (0 == this._cameraFollowersMap.size) {
      this._cameraFollowersMap.set(ae.WorldType.Rpg, new $.WorldRpgCameraFollower());
      this._cameraFollowersMap.set(ae.WorldType.Jump, new Q.WorldJumpCameraFollower());
    }
    let t = this.world.worldLayout.type,
      o = this.world.cameraFollowCtrl;
    o.setCamera(this.world.camera, this._cameraFollowersMap.get(t));
    switch (t) {
      case ae.WorldType.Jump:
      case ae.WorldType.Rpg:
        if (e) {
          o.setTarget(e.node);
          o.centerOnTarget();
        } else o.setTarget(null);
        break;
      case ae.WorldType.Shoot:
        o.setTarget(null);
    }
    this.world.centerLayers();
  }
  showDialog(e, t, o) {
    return a(this, void 0, void 0, function* () {
      if (!this.dialogBox) {
        let e = yield v.Util.loadBundleRes("Prefab/DialogBox"),
          t = cc.instantiate(e);
        this.node.addChild(t);
        this.dialogBox = t.getComponent(C.default);
      }
      if (this.dialogBox.check(e)) {
        this.pauseAll();
        this.dialogBox.showing ? this.dialogBox.insert(e) : this.dialogBox.show(e, t);
        this.dialogBox.closeCall = () => {
          this.resumeAll();
          o && o();
        };
      }
    });
  }
  onGameShop(e, t) {
    return a(this, void 0, void 0, function* () {
      if (!e) return;
      let t = "";
      t = "string" == typeof e ? e : e.gameShopId;
      let o = yield S.Mng.Ins.gameShopMng.loadOne(t);
      if (o) {
        this.pauseAll();
        f.default.ins.OpenPanelByName("GameShopPanel", e => {
          e.setData(o);
          e.closeCallback = () => {
            this.resumeAll();
          };
        });
      }
    });
  }
  onGameRank(e, t) {
    return a(this, void 0, void 0, function* () {
      if (!e) return;
      let t = e.gameRankId,
        o = yield S.Mng.Ins.gameRankMng.loadOne(t);
      if (o) {
        this.pauseAll();
        f.default.ins.OpenPanelByName("GameRankPanel", e => {
          e.setData(o, this.gameData);
          e.closeCallback = () => {
            this.resumeAll();
          };
        });
      }
    });
  }
  updateRankScore(e, t) {
    return a(this, void 0, void 0, function* () {
      if (e) {
        let o = 0,
          i = e.gameRankId,
          n = yield S.Mng.Ins.gameRankMng.loadOne(i);
        if (n) {
          switch (n.rankType) {
            case ne.GameRankType.ShortTime:
            case ne.GameRankType.LongTime:
              if (!this.gameTimer.started) {
                this.world.playFloatLabel({
                  str: "计时器未启动",
                  pos: t.position,
                  color: W.UIColor.yellow,
                  anim: "FlashLabel",
                  size: 40
                });
                return;
              }
              if ("timer" == this.gameTimer.mode) o = this.gameTimer.getCurTimer();else if ("countDown" == this.gameTimer.mode) {
                this.world.playFloatLabel({
                  str: "倒计时不能上传排行榜",
                  pos: t.position,
                  color: W.UIColor.yellow,
                  anim: "FlashLabel",
                  size: 40
                });
                return;
              }
              break;
            case ne.GameRankType.PropRank:
              o = H.default.Ins.getCnt(n.propId);
              break;
            case ne.GameRankType.CustomRank:
              o = s.GSVariableMng.instance.getValueByJulian(n.variableId);
          }
          let e = new ie.ScoreInfo();
          e.id = i;
          e.score = o;
          yield oe.default.Ins.uploadScore(this.gameData.id, [e]);
          this.world.playFloatLabel({
            str: "分数已上传",
            pos: t.position,
            color: W.UIColor.yellow,
            anim: "JumpLabel",
            size: 40
          });
        }
      }
    });
  }
  onShareGame(e, t) {
    this.pauseAll();
    f.default.ins.OpenPanelByName("GameSharePanel", o => {
      o.setData(this.gameData, e, t);
      exports.closeCallback = () => {
        this.resumeAll();
      };
    });
  }
  onShowAd(e, t) {
    this.pauseAll();
    f.default.ins.OpenPanelByName("GameAdPanel", o => {
      o.setData(this.gameData, e, t);
      exports.closeCallback = () => {
        this.resumeAll();
      };
    });
  }
  gameOver(e, t) {
    return a(this, void 0, void 0, function* () {
      if (this.busy) return;
      this.busy = !0;
      this.pauseAll();
      this.gameTimer.stop();
      this.resetRecorderBtn();
      let o = "2";
      if (this.world) {
        let e = this.world.findHeroActor();
        e && (o = e.data.confId);
      }
      f.default.ins.OpenPanelByName("GameOverPanel", i => {
        i.setData({
          actorConfId: o,
          titleStr: (null == e ? void 0 : e.str) || "Game Over",
          gameData: this.gameData,
          isProd: "Prod" == this.mode,
          gameRankId: null == e ? void 0 : e.gameRankId
        });
        i.replayCall = () => a(this, void 0, void 0, function* () {
          this.busy = !1;
          t && t();
          if (this.tempSave) this.initWithSave(this.tempSave);else {
            let e = V.default.Ins.load(this.gameData.id);
            this.initWithSave(e);
          }
          F.TGA.track("gamePlay", {
            gameId: this.gameData.id,
            step: "reborn"
          });
        });
      });
      F.TGA.track("gamePlay", {
        gameId: this.gameData.id,
        step: "gameOver"
      });
    });
  }
  gameWin(e, t) {
    return a(this, void 0, void 0, function* () {
      if (this.busy) return;
      this.busy = !0;
      this.pauseAll();
      this.gameTimer.stop();
      let o = this.world.findHeroActor(),
        n = yield S.Mng.Ins.actorMng.loadOne(o.data.confId);
      f.default.ins.OpenPanelByName("GameWinPanel", o => {
        o.setData({
          textureName: n.textureName,
          titleStr: (null == e ? void 0 : e.str) || "恭喜过关!",
          gameData: this.gameData,
          isProd: "Prod" == this.mode,
          gameRankId: null == e ? void 0 : e.gameRankId
        });
        exports.backCall = () => {
          this.busy = !1;
          t && t();
          f.default.ins.Back();
          cc.game.emit(i.GameScene_EXIT, !0);
        };
        exports.replayCall = () => {
          this.busy = !1;
          this.play(this.gameData, this.firstWorldId, this.testHero);
        };
      });
      F.TGA.track("gamePlay", {
        gameId: this.gameData.id,
        step: "gameWin"
      });
    });
  }
  heroPetChange() {
    this._heroPetDatas.length = 0;
    if (this.world && this.world.hero) {
      let e = this.world.hero.petList;
      for (let t of e) t.conf && this._heroPetDatas.push({
        id: t.id,
        icon: t.conf.textureName,
        onDelete: this.onDeletePet.bind(this)
      });
    }
    this.petList.setDataArr(this._heroPetDatas);
  }
  onDeletePet(e) {
    this.world && this.world.hero && this.world.hero.removePet(e);
  }
  pauseAll() {
    p.FightSystem.enable = !1;
    this.world && this.world.pause();
    this.moverCtrl && this.moverCtrl.hide();
    this.bagBar.hide();
    this.hpBar.hide();
    this.heroHeadIcon.hide();
    this.bagBtn.node.active = !1;
    this.recorderBtn.node.active = !1;
    this.gameTimer.pause();
  }
  resumeAll() {
    p.FightSystem.enable = !0;
    this.world && this.world.resume();
    this.moverCtrl && this.moverCtrl.show();
    this.bagBar.show();
    this.hpBar.show();
    this.heroHeadIcon.show();
    this.bagBtn.node.active = !0;
    this.recorderBtn.node.active = !ee.tt;
    this.gameTimer.resume();
  }
  makeSave() {
    let e = this.world.hero,
      t = this.world.worldData;
    if (this.world.hero) {
      let e = v.Util.deepCopy(this.world.hero.data);
      this._heroDataMap.set(this.world.hero.data.confId, e);
    }
    return {
      gameId: this.gameData.id,
      worldId: t.id,
      heroPos: {
        x: e.PositionX,
        y: e.PositionY
      },
      heroDataArray: Array.from(this._heroDataMap),
      heroConfId: this._heroConfId,
      bag: H.default.Ins.makeData(),
      variables: s.GSVariableMng.instance.makeData(),
      flag: V.default.Ins.makeSaveData(),
      pets: U.GamePetMng.Ins.Save()
    };
  }
  initWithSave(e) {
    return a(this, void 0, void 0, function* () {
      this.gameTimer.stop();
      if (e) {
        let t = e.worldId;
        this._heroDataMap = new Map(e.heroDataArray);
        this._heroConfId = e.heroConfId || "";
        let o = this._heroDataMap.get(this._heroConfId);
        H.default.Ins.initWithData(e.bag);
        s.GSVariableMng.instance.initWithData(e.variables);
        V.default.Ins.initSaveData(e.flag);
        U.GamePetMng.Ins.Read(e.pets);
        this.shiftWorldById({
          id: t,
          onWorldReady: () => a(this, void 0, void 0, function* () {
            if (this.world.hero) {
              let t = e.heroPos;
              this.world.hero.SetPosition(t.x, t.y);
              this.world.hero.ApplyPosition();
              o && (yield this.world.hero.setData(o));
            }
          }),
          onShiftEnd: () => {
            ee.tt && u.default.start();
          }
        });
      } else this.shiftWorldById({
        id: this.firstWorldId,
        onWorldReady: () => {
          H.default.Ins.clear();
          s.GSVariableMng.instance.resetValues();
        },
        onShiftEnd: () => {
          ee.tt && u.default.start();
        }
      });
    });
  }
  save(e, t) {
    if (this.gameTimer.started) {
      g.default.showToast("计时期间不能存档");
      return;
    }
    let o = this.makeSave();
    this.tempSave = o;
    V.default.Ins.save(this.gameData.id, o);
    t && this.world.playFloatLabel({
      str: "已保存",
      pos: t.position,
      color: W.UIColor.yellow,
      anim: "JumpLabel",
      size: 40
    });
  }
  load(e, t) {
    let o = V.default.Ins.load(this.gameData.id);
    o ? this.initWithSave(o) : t && this.world.playFloatLabel({
      str: "暂无存档",
      pos: t.position,
      color: W.UIColor.yellow,
      anim: "JumpLabel",
      size: 40
    });
  }
  clearSave(e, t) {
    V.default.Ins.remove(this.gameData.id);
    t && this.world.playFloatLabel({
      str: "已删除存档",
      pos: t.position,
      color: W.UIColor.yellow,
      anim: "JumpLabel",
      size: 40
    });
  }
  triggerShiftWorld(e) {
    e.extra && this.shiftWorldById({
      id: e.extra.worldId,
      animId: e.extra.animId,
      onWorldReady: () => {
        this.world.hero && this.world.moveActor(this.world.hero, e.extra.coor);
      },
      onShiftEnd: () => a(this, void 0, void 0, function* () {
        e.extra.evts && Array.isArray(e.extra.evts) && (yield K.default.Ins.emitTrigger(e.extra.evts, null));
        this.tempSave = this.makeSave();
      })
    });
  }
  onStartGameTimer(e, t, o) {
    0 == (t = t || 0) ? this.gameTimer.startCountDown(e, o) : this.gameTimer.startTimer(e, o);
  }
  onStopGameTimer() {
    this.gameTimer.stop();
  }
};
de.GameScene_EXIT = "GameScene_EXIT";
de.GameScene_SHIFT_WORLD_END = "GameScene_SHIFT_WORLD_END";
de.SHOW_DIALOG_BOX = "SHOW_DIALOG_BOX";
de.GAME_SHOP = "GAME_SHOP";
de.GAME_RANK = "GAME_RANK";
de.UPLOAD_GAME_RANK_SCORE = "UPLOAD_GAME_RANK_SCORE";
de.GAME_OVER = "GAME_OVER";
de.GAME_WIN = "GAME_WIN";
de.HERO_MOVE = "HERO_MOVE";
de.HERO_PET_CHANGE = "HERO_PET_CHANGE";
de.SHARE_GAME = "SHARE_GAME";
de.SHOW_AD = "SHOW_AD";
n([ce(r.default)], de.prototype, "backBtn", void 0);
n([ce(r.default)], de.prototype, "recorderBtn", void 0);
n([ce(cc.Label)], de.prototype, "nameLabel", void 0);
n([ce(r.default)], de.prototype, "bagBtn", void 0);
n([ce(c.default)], de.prototype, "hpBar", void 0);
n([ce(l.default)], de.prototype, "heroHeadIcon", void 0);
n([ce(O.default)], de.prototype, "petList", void 0);
n([ce(j.default)], de.prototype, "shiftWorldAnim", void 0);
n([ce(J.default)], de.prototype, "bagBar", void 0);
n([ce(cc.Node)], de.prototype, "countDownTimeNode", void 0);
n([ce(cc.Label)], de.prototype, "countDownTimeLabel", void 0);
n([ce(te.GameTimerComp)], de.prototype, "gameTimer", void 0);
de = i = n([le], de);
exports.default = de;