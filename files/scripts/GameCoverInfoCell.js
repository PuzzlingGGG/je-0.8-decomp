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
  s = e("../../../scripts/_autogen/cmd/cmd"),
  r = e("../../CustomUI/Button"),
  l = e("../../CustomUI/GameIcon"),
  c = e("../../CustomUI/HeadIcon"),
  d = e("../../CustomUI/ProgressBar"),
  h = e("../../CustomUI/ScrollList"),
  p = e("../../Frame/NetworkMgr"),
  u = e("../../Frame/SceneManager"),
  m = e("../../Frame/Share"),
  f = e("../../Frame/Top"),
  g = e("../../Frame/UIColor"),
  y = e("../../Frame/Util"),
  v = e("../../Game/GameEnv"),
  C = e("../../Game/Hortor"),
  _ = e("../../Game/OperationFlow"),
  S = e("../../Game/Player/CollectionMng"),
  I = e("../../Game/Player/CreditMng"),
  G = e("../../Game/Player/DynamicMng"),
  T = e("../../Game/Player/FollowMng"),
  b = e("../../Game/Player/GameCellDataMng"),
  M = e("../../Game/Player/GamePackageMng"),
  P = e("../../Game/Player/HurryMng"),
  D = e("../../Game/Player/Mng"),
  w = e("../../Game/Player/TalkMng"),
  B = e("../../Game/Player/ThumbMng"),
  R = e("../../Role"),
  x = e("../../TGA"),
  L = e("./GameCoverScene"),
  {
    ccclass: k,
    property: F
  } = cc._decorator;
let N = class extends cc.Component {
  constructor() {
    super(...arguments);
    this.hurryBtn = null;
    this.thumbBtn = null;
    this.collectionBtn = null;
    this.authorLabel = null;
    this.advertLabel = null;
    this.timeLabel = null;
    this.followHeBtn = null;
    this.headIcon = null;
    this.followBtn = null;
    this.fansBtn = null;
    this.gameIcon = null;
    this.gameNameLabel = null;
    this.versionLabel = null;
    this.progressBar = null;
    this.progressLabel = null;
    this.shareBtn = null;
    this.playBtn = null;
    this.playTimesLabel = null;
    this.menuBtn = null;
    this.creativeBtn = null;
    this.detail = null;
    this.gamePackage = null;
    this.played = !1;
  }
  onLoad() {
    this.node.on(h.default.SET_DATA, this.setData, this);
    this.hurryBtn.node.on(r.default.CLICK, this.onHurryBtn, this);
    this.thumbBtn.node.on(r.default.CLICK, this.onThumbBtn, this);
    this.collectionBtn.node.on(r.default.CLICK, this.onCollectionBtn, this);
    this.followHeBtn.node.on(r.default.CLICK, this.onFollowHeBtn, this);
    this.headIcon.node.on(r.default.CLICK, this.onHeadIconBtn, this);
    this.authorLabel.node.on(r.default.CLICK, this.onHeadIconBtn, this);
    this.shareBtn.node.on(r.default.CLICK, this.onShareBtn, this);
    this.playBtn.node.on(r.default.CLICK, this.onPlayBtn, this);
    this.menuBtn.node.on(r.default.CLICK, this.onMenuBtn, this);
    this.creativeBtn.node.on(r.default.CLICK, this.onCreativeBtn, this);
    this.fansBtn.node.on(r.default.CLICK, this.onShowFansBtn, this);
    this.followBtn.node.on(r.default.CLICK, this.onShowFollowsBtn, this);
    this.gameIcon.node.on(r.default.CLICK, this.onGameIcon, this);
    this.progressBar.setRange(0, 100);
    this.progressBar.setValue(0);
    this.progressBar.onProgressChange = (e, t, o) => {
      this.progressLabel.string = Math.floor(o) + "%";
    };
    this.shareBtn.node.active = !1;
    this.playBtn.node.active = !1;
    this.creativeBtn.node.active = !1;
    this.menuBtn.node.active = !1;
  }
  setData(e) {
    return n(this, void 0, void 0, function* () {
      this.detail = e;
      this.progressBar.setValue(0);
      if (!e) {
        this.progressBar.stopAnim();
        this.progressLabel.string = a.I18nMgr.getI18nStringByZh("加载出错");
        f.default.showToast("游戏已被删除");
      }
      this.headIcon.loadUrl(e.authorMsg.userImg);
      this.headIcon.setLevel(e.authorMsg.level);
      _.OperationFlow.setNameLabel(this.authorLabel, e.authorMsg.userName, e.authorMsg.id, 10);
      this.fansBtn.label.string = e.authorMsg.fansCount + "";
      this.followBtn.label.string = e.authorMsg.followsCount + "";
      if (e.authorMsg.id == R.default.Ins.role.id) this.followHeBtn.node.active = !1;else {
        this.followHeBtn.node.active = !0;
        this.followHeBtn.label.string = a.I18nMgr.getI18nStringByZh(e.authorMsg.isFollow ? "已关注" : "关注");
      }
      this.advertLabel.string = e.releaseGameData.advert;
      this.thumbBtn.label.string = e.releaseGameData.thumbCnt + a.I18nMgr.getI18nStringByZh("点赞");
      this.collectionBtn.label.string = e.releaseGameData.collectionCnt + " " + a.I18nMgr.getI18nStringByZh("收藏");
      this.hurryBtn.label.string = e.releaseGameData.hurryCnt + a.I18nMgr.getI18nStringByZh("催更");
      this.thumbBtn.icon.node.color = e.releaseGameData.isThumb ? g.UIColor.blue : g.UIColor.gray;
      this.collectionBtn.icon.node.color = e.releaseGameData.isCollection ? g.UIColor.yellow : g.UIColor.gray;
      let t = e.releaseGameData.lastPublishTime || 0;
      if (t) {
        this.timeLabel.node.active = !0;
        this.timeLabel.string = a.I18nMgr.getI18nStringByZh("发布于：") + y.Util.parseDataString(t);
      } else this.timeLabel.node.active = !1;
      this.gameNameLabel.overflow = cc.Label.Overflow.NONE;
      this.gameNameLabel.string = e.releaseGameData.name;
      y.Util.updateLabel(this.gameNameLabel);
      if (this.gameNameLabel.node.width > 500) {
        this.gameNameLabel.overflow = cc.Label.Overflow.RESIZE_HEIGHT;
        this.gameNameLabel.node.width = 500;
        this.gameNameLabel.node.scale = .7;
      } else {
        this.gameNameLabel.overflow = cc.Label.Overflow.NONE;
        this.gameNameLabel.node.scale = 1;
      }
      this.versionLabel.string = e.releaseGameData.dataVersion;
      this.playTimesLabel.string = e.releaseGameData.playCnt + a.I18nMgr.getI18nStringByZh("人玩过");
      let o = this.detail.releaseGameData.openCreativeGame && e.creativeGameData.id,
        i = this.creativeBtn.getComponentInChildren(l.default);
      i.node.active = !1;
      if (o) {
        if (e.releaseGameData.id == e.creativeGameData.id) {
          this.creativeBtn.icon.node.active = !1;
          e.creativeGameData.secondaryCnt > 0 ? this.creativeBtn.label.string = `${e.creativeGameData.secondaryCnt}${a.I18nMgr.getI18nStringByZh("次二创")}` : this.creativeBtn.label.string = a.I18nMgr.getI18nStringByZh("创意工坊");
        } else {
          i.node.active = !0;
          i.loadUrl(e.creativeGameData.iconTextureName);
          this.creativeBtn.label.string = a.I18nMgr.getI18nStringByZh("查看原创");
        }
      } else if ("" == e.creativeGameData.id) {
        this.creativeBtn.icon.node.active = !0;
        this.creativeBtn.label.string = "创意工坊";
      } else {
        this.creativeBtn.icon.node.active = !1;
        i.node.active = !0;
        i.loadUrl(e.creativeGameData.iconTextureName);
        this.creativeBtn.label.string = "查看原创";
      }
      this.gameIcon.loadUrl(e.releaseGameData.iconTextureName);
      this.progressBar.animaTo(60, 1);
      let s = yield M.default.Ins.load(e.releaseGameData.gameDataCdnUrl);
      if (s) {
        this.gamePackage = s;
        cc.game.emit(L.default.GameCoverScene_GamePackLoaded, s);
        this.progressBar.animaTo(100, 1, () => n(this, void 0, void 0, function* () {
          this.shareBtn.node.active = !0;
          this.playBtn.node.active = !0;
          this.menuBtn.node.active = !0;
          this.creativeBtn.node.active = !0;
          this.progressBar.node.active = !1;
        }));
      } else {
        this.progressBar.stopAnim();
        this.progressLabel.string = "加载出错";
      }
    });
  }
  calcuHeight(e) {
    let t = -this.timeLabel.node.y;
    e.releaseGameData.lastPublishTime && (t += 40);
    if (e.releaseGameData.advert) {
      this.advertLabel.string = e.releaseGameData.advert;
      y.Util.updateLabel(this.advertLabel);
      t += this.advertLabel.node.height;
    }
    t += 10;
    this.node.height = t;
    return t;
  }
  onThumbBtn() {
    return n(this, void 0, void 0, function* () {
      if (I.CreditMng.Ins.credit <= 1) f.default.showToast("近期违规，不可点赞");else if (this.detail) {
        if (this.detail.releaseGameData.isThumb) {
          yield B.ThumbMng.Ins.unThumbGame(this.detail.releaseGameData.id);
          this.detail.releaseGameData.thumbCnt = Math.max(0, this.detail.releaseGameData.thumbCnt - 1);
          this.detail.releaseGameData.isThumb = !1;
          this.thumbBtn.icon.node.color = g.UIColor.gray;
        } else {
          yield B.ThumbMng.Ins.thumbGame(this.detail.releaseGameData.id);
          this.detail.releaseGameData.thumbCnt = Math.max(0, this.detail.releaseGameData.thumbCnt);
          this.detail.releaseGameData.thumbCnt++;
          this.detail.releaseGameData.isThumb = !0;
          this.thumbBtn.icon.node.color = g.UIColor.blue;
          x.TGA.track("thumb", {
            gameId: this.detail.releaseGameData.id,
            name: this.detail.releaseGameData.name
          });
        }
        this.thumbBtn.label.string = this.detail.releaseGameData.thumbCnt + a.I18nMgr.getI18nStringByZh("点赞");
      }
    });
  }
  onCollectionBtn() {
    return n(this, void 0, void 0, function* () {
      if (I.CreditMng.Ins.credit <= 2) f.default.showToast("近期违规，不可收藏");else if (this.detail) {
        if (this.detail.releaseGameData.isCollection) {
          yield S.CollectionMng.Ins.unCollectGame(this.detail.releaseGameData.id);
          this.detail.releaseGameData.collectionCnt = Math.max(0, this.detail.releaseGameData.collectionCnt - 1);
          this.detail.releaseGameData.isCollection = !1;
          this.collectionBtn.icon.node.color = g.UIColor.gray;
        } else {
          yield S.CollectionMng.Ins.collectGame(this.detail.releaseGameData.id);
          this.detail.releaseGameData.collectionCnt = Math.max(0, this.detail.releaseGameData.collectionCnt);
          this.detail.releaseGameData.collectionCnt++;
          this.detail.releaseGameData.isCollection = !0;
          this.collectionBtn.icon.node.color = g.UIColor.yellow;
          x.TGA.track("collection", {
            gameId: this.detail.releaseGameData.id,
            name: this.detail.releaseGameData.name
          });
        }
        this.collectionBtn.label.string = this.detail.releaseGameData.collectionCnt + " " + a.I18nMgr.getI18nStringByZh("收藏");
      }
    });
  }
  onHurryBtn() {
    return n(this, void 0, void 0, function* () {
      if (I.CreditMng.Ins.credit <= 1) f.default.showToast("近期违规，不可催更");else {
        f.default.showToast("快更新！");
        if (this.detail && !this.detail.releaseGameData.isHurry) {
          yield P.HurryMng.Ins.hurryGame(this.detail.releaseGameData.id);
          this.detail.releaseGameData.hurryCnt = Math.max(0, this.detail.releaseGameData.hurryCnt);
          this.detail.releaseGameData.hurryCnt++;
          this.detail.releaseGameData.isHurry = !0;
          this.hurryBtn.label.string = this.detail.releaseGameData.hurryCnt + a.I18nMgr.getI18nStringByZh("催更");
          x.TGA.track("hurry", {
            gameId: this.detail.releaseGameData.id,
            name: this.detail.releaseGameData.name
          });
        }
      }
    });
  }
  onFollowHeBtn() {
    return n(this, void 0, void 0, function* () {
      if (this.detail.authorMsg.isFollow) {
        if (1 == (yield T.FollowMng.Ins.unFollow(this.detail.authorMsg.id))) {
          this.detail.authorMsg.isFollow = !1;
          this.followHeBtn.label.string = "关注";
          this.fansBtn.label.string = this.detail.authorMsg.fansCount.toString();
        }
      } else if (1 == (yield T.FollowMng.Ins.follow(this.detail.authorMsg.id))) {
        this.detail.authorMsg.isFollow = !0;
        this.followHeBtn.label.string = "已关注";
        this.fansBtn.label.string = this.detail.authorMsg.fansCount.toString();
        x.TGA.track("follow", {
          target: this.detail.authorMsg.id
        });
      }
    });
  }
  onHeadIconBtn() {
    this.detail && u.default.ins.Enter("FriendScene", e => {
      e.setData(this.detail.authorMsg.id);
      e.followChangeCall = () => {
        this.followHeBtn.label.string = this.detail.authorMsg.isFollow ? "已关注" : "关注";
        this.fansBtn.label.string = this.detail.authorMsg.fansCount.toString();
      };
    }, u.ShiftAnima.moveLeftShift);
  }
  onShareBtn() {
    let e = {
        type: "game",
        isMine: this.detail.authorMsg.id == R.default.Ins.role.id,
        cyGameId: this.detail.releaseGameData.id
      },
      t = {
        shareType: "shareGame",
        title: C.Hortor.isApp() ? `《${this.detail.releaseGameData.name}》` : `《${this.detail.releaseGameData.name}》${this.detail.releaseGameData.advert}`,
        desc: this.detail.releaseGameData.advert,
        imageUrl: "",
        query: y.Util.toQueryStr(e),
        imageName: this.detail.releaseGameData.iconTextureName,
        talk: {
          title: "",
          sections: [{
            type: w.TalkSectionType.Game,
            gameId: this.detail.releaseGameData.id
          }]
        },
        success: () => {
          f.default.showToast("分享成功");
          x.TGA.track("share", e);
        },
        fail: () => {
          f.default.showToast("分享失败");
        }
      },
      o = this.detail.releaseGameData.iconTextureName;
    o && "icon1" !== o ? t.imageUrl = v.gameEnv.fileCDN + o : delete t.imageUrl;
    m.Share.share(t);
  }
  onReportBtn() {
    if (I.CreditMng.Ins.credit <= 2) f.default.showToast("近期违规，不可举报");else if (this.detail) {
      u.default.ins.Enter("ReportScene", e => {
        e.initReportGame(this.detail.releaseGameData.id);
      }, u.ShiftAnima.moveLeftShift);
      x.TGA.track("reportGame", {
        gameId: this.detail.releaseGameData.id,
        name: this.detail.releaseGameData.name,
        step: "clickBtn"
      });
    }
  }
  onPlayBtn() {
    return n(this, void 0, void 0, function* () {
      if (!this.gamePackage) return;
      D.Mng.switchGamePackage(this.gamePackage);
      let e = this.detail.releaseGameData.id,
        t = yield D.Mng.Ins.gameMng.loadOne(e);
      yield D.Mng.Ins.variableMng.switchGame(t);
      u.default.ins.Enter("GameScene", o => {
        exports.mode = "Prod";
        o.play(t);
        let i = orange.TimeUtil.serverTime;
        exports.backCall = () => n(this, void 0, void 0, function* () {
          let n = orange.TimeUtil.serverTime,
            a = {
              id: e,
              playTime: (n - i) / 1e3
            };
          yield p.NetIns.SendCmdAsync({
            cmd: s.CMDS.Game_PlayGameStatistics,
            params: a
          }, s.Game_RPlayGameStatistics);
          exports.backCall = null;
          D.Mng.switchMine();
          cc.game.emit(L.default.PLAY_END, {
            gameData: t,
            userName: this.detail.authorMsg.userName
          });
        });
      });
      if (!this.detail.releaseGameData.isPlay && !this.played) {
        let t = {
            ids: [e]
          },
          o = yield p.NetIns.SendCmdAsync({
            cmd: s.CMDS.Game_PlayGames,
            params: t
          }, s.Game_RPlayGames);
        if (o) {
          this.detail.releaseGameData.playCnt = o.playCntList[0] || 0;
          this.detail.releaseGameData.isPlay = !0;
          this.played = !0;
          this.playTimesLabel.string = this.detail.releaseGameData.playCnt + a.I18nMgr.getI18nStringByZh("人玩过");
        }
      }
    });
  }
  onGameIcon() {
    u.default.ins.OpenPanelByName("ImagePreviewPanel", e => {
      e.setData("", this.detail.releaseGameData.iconTextureName);
    });
  }
  onMenuBtn() {
    return n(this, void 0, void 0, function* () {
      let e = this.detail.releaseGameData.id,
        t = [{
          str: "举报",
          icon: {
            url: "Atlas/UI/reportBtn",
            color: g.UIColor.white,
            w: 50,
            h: 40
          },
          call: () => {
            this.onReportBtn();
          }
        }, {
          str: "分享",
          icon: {
            url: "Atlas/UI/ttShare",
            color: g.UIColor.green,
            w: 50,
            h: 40
          },
          call: () => {
            this.onShareBtn();
          }
        }];
      if (G.DynamicMng.Ins.isGmPlayer() || C.Hortor.platformSysBigType == C.PlatformSysBigType.H5) {
        let o = (yield G.DynamicMng.Ins.loadOne("GameChosenIds")) || [],
          i = (yield G.DynamicMng.Ins.loadOne("IpGameIds")) || [];
        t.push({
          str: o.includes(e) ? "移除精选" : "加入精选",
          icon: {
            url: "Atlas/UI/ttShare",
            color: g.UIColor.green,
            w: 50,
            h: 40
          },
          call: () => {
            this.onAddChosenBtn();
          }
        });
        t.push({
          str: i.includes(e) ? "取消Ip" : "标记IP",
          icon: {
            url: "Atlas/UI/ttShare",
            color: g.UIColor.green,
            w: 50,
            h: 40
          },
          call: () => {
            if (i.includes(e)) {
              let t = i.indexOf(e);
              i.splice(t, 1);
            } else i.unshift(e);
            cc.game.emit("refreshChosenSubPage");
          }
        });
        t.push({
          str: "下架",
          icon: {
            url: "Atlas/UI/ttShare",
            color: g.UIColor.green,
            w: 50,
            h: 40
          },
          call: () => {
            this.onBanBtn();
          }
        });
        t.push({
          str: "游戏信息",
          icon: {
            url: "Atlas/UI/reportBtn",
            color: g.UIColor.white,
            w: 50,
            h: 40
          },
          call: () => {
            u.default.ins.OpenPanelByName("AboutPanel", e => {
              let t = a.I18nMgr.exceI18nStringByZh("游戏ID：${this.detail.releaseGameData.id}\n游戏包CND地址：${this.detail.releaseGameData.gameDataCdnUrl}", [{
                paramName: "this.detail.releaseGameData.id",
                param: this.detail.releaseGameData.id
              }, {
                paramName: "this.detail.releaseGameData.gameDataCdnUrl",
                param: this.detail.releaseGameData.gameDataCdnUrl
              }]);
              e.setData("游戏信息", t);
              console.log(t);
            });
          }
        });
      }
      f.default.showMenu(this.menuBtn.node, t);
    });
  }
  onAddChosenBtn() {
    return n(this, void 0, void 0, function* () {
      let e = this.detail.releaseGameData.id,
        t = (yield G.DynamicMng.Ins.loadOne("GameChosenIds")) || [];
      if (t) {
        if (t.includes(e)) {
          let o = t.indexOf(e);
          t.splice(o, 1);
        } else t.unshift(e);
        cc.game.emit("refreshChosenSubPage");
      }
    });
  }
  onBanBtn() {
    return n(this, void 0, void 0, function* () {
      let e = this.detail.releaseGameData.id,
        t = yield b.default.Ins.loadGames([e]);
      t[0] && u.default.ins.OpenPanelByName("BanGamePanel", e => {
        e.setData(t[0]);
      });
    });
  }
  onCreativeBtn() {
    return n(this, void 0, void 0, function* () {
      G.DynamicMng.Ins.isDisable(G.FunctionEnum.CreativeGame, !0) || (this.detail.creativeGameData.id ? u.default.ins.Enter("CreativeSpaceScene", e => {
        e.setData(this.detail);
      }, u.ShiftAnima.moveLeftShift) : f.default.showToast("作者未开启创意工坊"));
    });
  }
  onShowFansBtn() {
    G.DynamicMng.Ins.isDisable(G.FunctionEnum.FriendScene, !1) || u.default.ins.Enter("FollowScene", e => n(this, void 0, void 0, function* () {
      e.init("fans", this.detail.authorMsg.id);
    }), u.ShiftAnima.moveLeftShift);
  }
  onShowFollowsBtn() {
    G.DynamicMng.Ins.isDisable(G.FunctionEnum.FriendScene, !1) || u.default.ins.Enter("FollowScene", e => n(this, void 0, void 0, function* () {
      e.init("follow", this.detail.authorMsg.id);
    }), u.ShiftAnima.moveLeftShift);
  }
};
i([F(r.default)], N.prototype, "hurryBtn", void 0);
i([F(r.default)], N.prototype, "thumbBtn", void 0);
i([F(r.default)], N.prototype, "collectionBtn", void 0);
i([F(cc.Label)], N.prototype, "authorLabel", void 0);
i([F(cc.Label)], N.prototype, "advertLabel", void 0);
i([F(cc.Label)], N.prototype, "timeLabel", void 0);
i([F(r.default)], N.prototype, "followHeBtn", void 0);
i([F(c.default)], N.prototype, "headIcon", void 0);
i([F(r.default)], N.prototype, "followBtn", void 0);
i([F(r.default)], N.prototype, "fansBtn", void 0);
i([F(l.default)], N.prototype, "gameIcon", void 0);
i([F(cc.Label)], N.prototype, "gameNameLabel", void 0);
i([F(cc.Label)], N.prototype, "versionLabel", void 0);
i([F(d.default)], N.prototype, "progressBar", void 0);
i([F(cc.Label)], N.prototype, "progressLabel", void 0);
i([F(r.default)], N.prototype, "shareBtn", void 0);
i([F(r.default)], N.prototype, "playBtn", void 0);
i([F(cc.Label)], N.prototype, "playTimesLabel", void 0);
i([F(r.default)], N.prototype, "menuBtn", void 0);
i([F(r.default)], N.prototype, "creativeBtn", void 0);
N = i([k], N);
exports.default = N;