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
const a = e("../../Frame/Scene"),
  s = e("../../Frame/SceneManager"),
  r = e("../../Game/Hortor"),
  l = e("../../Frame/CrossPlatform"),
  c = e("../../Game/Player/Mng"),
  d = e("../../Game/GameEnv"),
  h = e("../../Frame/Util"),
  p = e("../../Game/Player/DynamicMng"),
  u = e("../../Game/Player/CreditMng"),
  m = e("../../Frame/Top"),
  f = e("../../Frame/ScreenRect"),
  g = e("../../TGA"),
  y = e("../../../scripts/_autogen/cmd/cmd"),
  v = e("../../Frame/NetworkMgr"),
  C = e("../../Role"),
  _ = e("../../Game/Player/CollectionMng"),
  S = e("../../Game/Player/FollowMng"),
  I = e("../../Frame/FightSystem"),
  G = e("../../Frame/Music"),
  T = e("../../Frame/Sound"),
  b = e("../../Frame/Vibrate"),
  M = e("../../../scripts/_autogen/data/data"),
  P = e("../../Game/Player/CoinMng"),
  D = e("../../Game/Player/ShopMng"),
  w = e("../../Game/Player/MsgMng"),
  B = e("../../Frame/UIColor"),
  R = e("../../Game/Player/GameCellDataMng"),
  x = e("../../Game/Player/DiscoverMng"),
  L = e("../../Frame/AD"),
  k = e("../../Game/Player/RcmdMng"),
  F = e("../../Game/Player/WsMng"),
  N = e("../../Game/Player/GuideMng"),
  A = e("../../Game/Player/ColorMng"),
  O = e("../../Game/Player/GiftRankMng"),
  U = e("../../CustomUI/Button"),
  E = e("../../Frame/GameRecorder"),
  {
    ccclass: j,
    property: H,
    menu: W
  } = cc._decorator;
let V = class extends a.default {
  constructor() {
    super(...arguments);
    this.versionLabel = null;
    this.loadingLabel = null;
    this.startBtn = null;
    this.accountBtn = null;
    this.earth = null;
    this.gmRoleId = 0;
    this.gmSecret = "";
  }
  onLoad() {
    this.startBtn.node.on(U.default.CLICK, this.onStartBtn, this);
    this.accountBtn.node.on(U.default.CLICK, this.onAccountBtn, this);
    this.startBtn.node.active = !1;
    this.accountBtn.node.active = !1;
    cc.dynamicAtlasManager.enabled = !1;
    CC_DEV = !1;
    this.loadingLabel.string = "3";
    this.earth && this.earth.runAction(cc.repeatForever(cc.sequence(cc.rotateBy(30, 360), cc.rotateBy(0, 0))));
  }
  onDestroy() {
    this.startBtn.node.off(U.default.CLICK, this.onStartBtn, this);
    this.accountBtn.node.off(U.default.CLICK, this.onAccountBtn, this);
  }
  onStartBtn() {
    return n(this, void 0, void 0, function* () {
      s.default.ins.OpenPanelByName("LoginCreateAccountPanel", e => {
        e.onCreate = e => {
          this.loginFlow(r.PlatType.Visitor, e);
        };
      });
    });
  }
  onAccountBtn() {
    return n(this, void 0, void 0, function* () {
      s.default.ins.OpenPanelByName("LoginWithAccountPanel", e => {
        e.onLogin = e => {
          this.loginFlow(r.PlatType.Visitor, e);
        };
      });
    });
  }
  start() {
    return n(this, void 0, void 0, function* () {
      this.versionLabel.string = "v" + d.gameEnv.creatorVersion;
      yield r.Hortor.initJSBridge();
      r.Hortor.initChannel();
      I.FightSystem.init();
      c.Mng.switchMine();
      F.default.Ins.init();
      E.default.init();
      this.loadSetting();
      yield orange.startup({
        debug: !1,
        url: d.gameEnv.urlRoot
      });
      r.Hortor.platformUid = l.crossPlatform.getStorageSync("platformUid");
      r.Hortor.bindPlatformUIdMap = l.crossPlatform.getStorageSync("bindPlatformUIdMap") || {};
      r.Hortor.bindPlatformUId = r.Hortor.bindPlatformUIdMap[r.Hortor.platformUid] || "";
      r.Hortor.loginPlatform = "thecanvas";
      l.tt ? r.Hortor.loginPlatform = "hortor-tt" : l.wx ? r.Hortor.loginPlatform = "hortor" : r.Hortor.isApp() && (r.Hortor.loginPlatform = "hortor-native");
      this.openLoginPanel();
    });
  }
  openLoginPanel() {
    return n(this, void 0, void 0, function* () {
      if (r.Hortor.isMiniGame()) {
        this.checkUpdateMiniGame();
        r.Hortor.InitMiniSDK();
        this.loginFlow(r.PlatType.None, null);
      } else if (r.Hortor.isApp()) {
        let e = r.PlatType.Visitor,
          t = l.crossPlatform.getStorageSync("lastLoginSelectPlat");
        if (t) {
          e = r.PlatType[t];
          yield r.Hortor.InitAppSDK();
          if (yield this.checkUpdateApp()) return;
          yield this.loginFlow(e, null);
        } else r.Hortor.isMobileLogin ? s.default.ins.OpenPanelByName("LoginPanel2", e => {
          e.call = (e, t) => n(this, void 0, void 0, function* () {
            yield this.loginFlow(e, t);
          });
        }) : s.default.ins.OpenPanelByName("LoginPanel", e => {
          e.call = e => n(this, void 0, void 0, function* () {
            yield this.loginFlow(e, null);
          });
        });
      } else {
        let e = l.crossPlatform.getStorageSync("lastLoginOTP"),
          t = l.crossPlatform.getStorageSync("lastLoginAccount");
        if (e && t) this.loginFlow(r.PlatType.TheCanvas, {
          otp: e,
          account: t,
          password: ""
        });else {
          this.startBtn.node.active = !0;
          this.accountBtn.node.active = !0;
        }
      }
    });
  }
  loginFlow(e, t) {
    return n(this, void 0, void 0, function* () {
      this.loadingLabel.enable = !0;
      this.loadingLabel.string = "初始化";
      yield this.checkSwitch();
      this.loadingLabel.string = "登录中.";
      let o = yield this.platformLogin(e, t);
      if (!o) return;
      this.loadingLabel.string = "登录中..";
      if (!(yield this.orangeLogin(o))) return;
      this.loadingLabel.string = "登录中...";
      let i = yield this.roleLogin();
      yield this.checkAdGM();
      s.default.ins.Enter("HomeScene", e => {
        e.checkPanel(i);
        L.AD.preloadRewardVideo();
      });
      l.crossPlatform.setStorageSync("lastLoginSelectPlat", r.PlatType[e]);
      l.crossPlatform.setStorageSync("platformUid", r.Hortor.platformUid);
    });
  }
  checkSwitch() {
    return n(this, void 0, void 0, function* () {
      try {
        let e = yield r.Hortor.checkSwitches(["envIsReview", "isWxReviewCity"]);
        if (e) {
          console.log("checkSwitches", e);
          let t = !e.envIsReview,
            o = e.isWxReviewCity;
          d.InitGameEnv(t, o);
        } else d.InitGameEnv(!0, !1);
      } catch (e) {
        d.InitGameEnv(!0, !1);
      }
    });
  }
  platformLogin(e, t) {
    return n(this, void 0, void 0, function* () {
      let o = null;
      if (r.Hortor.isApp()) {
        HAPP.setTGAUserAccountId({
          userAccountId: r.Hortor.bindPlatformUId,
          isForce: !!r.Hortor.bindPlatformUId
        });
        if (e == r.PlatType.Mobile) {
          let e = yield r.Hortor.loginWithMobile(t);
          if (!e) {
            this.openLoginPanel();
            return null;
          }
          o = JSON.stringify(e);
        } else {
          let t = yield r.Hortor.loginApp(e);
          if (!t) {
            this.openLoginPanel();
            return null;
          }
          o = JSON.stringify(t);
        }
      } else if (r.Hortor.hasMiniGameSdk) {
        let e = yield r.Hortor.loginMiniGame();
        if (!e) {
          this.openLoginPanel();
          return null;
        }
        o = JSON.stringify(e);
      } else {
        let e = new M.CDAccountLoginInfo();
        e.account = t.account;
        e.oTP = t.otp;
        e.password = t.password;
        o = JSON.stringify(e);
      }
      return o;
    });
  }
  orangeLogin(e) {
    return n(this, void 0, void 0, function* () {
      let t = null;
      r.Hortor.loginAuthInfo = e;
      if (this.gmRoleId > 0) {
        let o = {
            platform: r.Hortor.loginPlatform,
            info: e,
            roleId: this.gmRoleId,
            secret: this.gmSecret
          },
          i = yield v.NetIns.sendHttpAsync({
            cmd: y.CMDS.Login_GMAuthUserSingle,
            params: o
          });
        if (i.code) return !1;
        t = i.decBody;
      } else {
        let o = {
            platform: r.Hortor.loginPlatform,
            info: e,
            isAppVisitor: r.Hortor.isApp() && r.Hortor.isPlatformVisitorLogin,
            clientVersion: d.gameEnv.creatorVersion,
            visitorUId: r.Hortor.distinctId
          },
          i = yield v.NetIns.sendHttpAsync({
            cmd: y.CMDS.Login_AuthUserSingle,
            params: o
          });
        if (i.code) {
          switch (i.code) {
            case 20002:
              m.default.showToast("Username does not exist!");
              break;
            case 20004:
              m.default.showToast("Wrong Password!");
          }
          return !1;
        }
        if (i.decBody.ext) {
          let e = JSON.parse(i.decBody.ext);
          l.crossPlatform.setStorageSync("lastLoginAccount", e.account);
          l.crossPlatform.setStorageSync("lastLoginOTP", e.oTP);
          l.crossPlatform.setStorageSync("isSetPassword", !!e.isSetPassword);
        }
        t = i.decBody;
      }
      r.Hortor.linkAccountType = r.PlatType.None;
      if (t && t.bindInfo) {
        t.bindInfo.bindType == M.GDBindType.tikTok ? r.Hortor.linkAccountType = r.PlatType.TT : t.bindInfo.bindType == M.GDBindType.wechat ? r.Hortor.linkAccountType = r.PlatType.WeChat : t.bindInfo.bindType == M.GDBindType.qQ ? r.Hortor.linkAccountType = r.PlatType.QQ : t.bindInfo.bindType == M.GDBindType.apple && (r.Hortor.linkAccountType = r.PlatType.Apple);
        t.bindPlatformUId && "" != t.bindPlatformUId && (r.Hortor.bindPlatformUId = t.bindPlatformUId);
      }
      if (r.Hortor.isApp()) {
        r.Hortor.bindPlatformUIdMap[r.Hortor.platformUid] = r.Hortor.bindPlatformUId;
        l.crossPlatform.setStorageSync("bindPlatformUIdMap", r.Hortor.bindPlatformUIdMap);
        HAPP.setTGAUserAccountId({
          userAccountId: r.Hortor.bindPlatformUId,
          isForce: !!r.Hortor.bindPlatformUId
        });
      }
      let o = d.gameEnv.urlRoot + "/agent";
      o = cc.sys.platform != cc.sys.ANDROID && d.gameEnv.useWss ? o.replace("https", "wss").replace("http", "wss") : o.replace("https", "ws").replace("http", "ws");
      yield v.NetIns.connect(t.roleToken, orange.Encoding.LX, {
        role: null
      }, o);
      v.NetIns.watchNetWork();
      return !0;
    });
  }
  roleLogin() {
    return n(this, void 0, void 0, function* () {
      let e = null;
      if (this.gmRoleId > 0) {
        let t = {
          roleId: this.gmRoleId,
          secret: this.gmSecret
        };
        e = yield v.NetIns.SendCmdAsync({
          cmd: y.CMDS.Game_GMLogin,
          params: t
        }, y.Game_RLogin);
      } else {
        let t = {
          channel: r.Hortor.channel
        };
        e = yield v.NetIns.SendCmdAsync({
          cmd: y.CMDS.Game_Login,
          params: t
        }, y.Game_RLogin);
      }
      console.log("roleLogin: " + e);
      if (!e) return new Promise(e => {
        this.scheduleOnce(() => n(this, void 0, void 0, function* () {
          e(this.roleLogin());
        }), 3);
      });
      p.DynamicMng.Ins.init(e.dynamicConfig);
      C.default.Ins.init(e.role);
      c.Mng.initMine(e);
      u.CreditMng.Ins.credit = e.role.creditScore;
      _.CollectionMng.Ins.init(e.role);
      O.GiftRankMng.Ins.checkVersion(e.giftCfgVersion);
      S.FollowMng.Ins.followIds = e.role.follows || [];
      P.default.Ins.setCoin(e.role.coin);
      D.default.Ins.myGoodsIds = e.role.goodsIds || [];
      C.default.Ins.gameSlotUnlockLvls = e.gameSlotUnlockLvls;
      C.default.Ins.goodsSlotUnlockLvls = e.goodsSlotUnlockLvls;
      w.MsgMng.Ins.newCommentCnt = e.newCommentCnt || 0;
      S.FollowMng.Ins.newFansCnt = e.newFansCnt || 0;
      w.MsgMng.Ins.newAggregateMsgCnt = e.newAggregateMsgCnt || 0;
      L.AD.addCoinByAdvertCnt = e.addCoinByAdvertCnt || 0;
      N.default.Ins.completeTaskIds = e.role.completeTaskIds;
      N.default.Ins.init();
      A.ColorMng.Ins.customColors = e.role.customColors;
      if (p.DynamicMng.Ins.isInspectVersion()) {
        S.FollowMng.Ins.followIds = [];
        _.CollectionMng.Ins.ids = [];
        C.default.Ins.role.follows = [];
        C.default.Ins.role.fansCount = 0;
      }
      if (e.newGameDatas) {
        x.default.Ins.freshGames = e.newGameDatas;
        for (let t = 0; t < e.newGameDatas.length; t++) {
          let o = e.newGameDatas[t];
          R.default.Ins.cache.set(o.id, o);
        }
      }
      e.followGameDatas && (x.default.Ins.followGameDatas = e.followGameDatas);
      k.default.Ins.startUpdate();
      g.TGA.track("login");
      return e;
    });
  }
  checkAdGM() {
    return n(this, void 0, void 0, function* () {
      if (!p.DynamicMng.Ins.isGmPlayer()) return;
      let e = yield h.Util.loadBundleRes("Prefab/GM"),
        t = cc.instantiate(e);
      f.default.Ins.node.addChild(t);
    });
  }
  loadSetting() {
    let e = l.crossPlatform.getStorageSync("setting");
    console.log("setting");
    if (e) {
      G.default.volume = .5;
      T.Sound.volume = .5;
      b.Vibrate.enable = !0;
      void 0 !== e.music && (G.default.volume = e.music);
      void 0 !== e.sound && (T.Sound.volume = e.sound);
      void 0 !== e.vibrate && (b.Vibrate.enable = e.vibrate);
    }
  }
  checkUpdateMiniGame() {
    let e = l.systemInfo.SDKVersion;
    if (h.Util.compareVersion(e, "1.9.0") < 0) {
      console.log("基础库不支持更新检查");
      return;
    }
    let t = l.crossPlatform.getUpdateManager();
    t.onCheckForUpdate(e => {
      const {
        hasUpdate: t
      } = e;
      t && m.default.showToast("即将有更新请留意");
    });
    t.onUpdateReady(() => {
      l.crossPlatform.showModal({
        title: "更新提示",
        content: "新版本准备好了，点击开始吧！",
        showCancel: !1,
        success: e => {
          e.confirm && t.applyUpdate();
        }
      });
    });
    t.onUpdateFailed(() => n(this, void 0, void 0, function* () {
      m.default.showToast("更新失败，请重启后再试!");
    }));
  }
  checkUpdateApp() {
    return new Promise(e => n(this, void 0, void 0, function* () {
      let t = {
          version: d.gameEnv.creatorVersion,
          channel: r.Hortor.channel
        },
        o = (yield v.NetIns.sendHttpAsync({
          cmd: y.CMDS.Login_GetAppUpdateInfo,
          params: t
        })).decBody;
      if (o) {
        console.log("Login_GetAppUpdateInfo", o.find, d.gameEnv);
        o.isForceUpdate ? s.default.ins.OpenPanelByName("DownloadNewVerPanel", t => {
          t.setData(o.url);
          t.callComplete = () => {
            e(!0);
          };
        }) : h.Util.compareVersion(o.version, d.gameEnv.creatorVersion) > 0 ? s.default.ins.OpenPanelByName("MessageBox", t => {
          t.label.string = "发现新版本";
          t.closeBtn.node.active = !1;
          t.setLeftBtn({
            text: "关闭",
            color: B.UIColor.blue,
            call: () => {
              e(!1);
            }
          });
          t.setRightBtn({
            text: "更新",
            color: B.UIColor.green,
            call: () => {
              s.default.ins.OpenPanelByName("DownloadNewVerPanel", t => {
                t.setData(o.url);
                t.callComplete = () => {
                  e(!0);
                };
              });
            }
          });
        }) : e(!1);
      } else e(!1);
    }));
  }
};
i([H(cc.Label)], V.prototype, "versionLabel", void 0);
i([H(cc.Label)], V.prototype, "loadingLabel", void 0);
i([H(U.default)], V.prototype, "startBtn", void 0);
i([H(U.default)], V.prototype, "accountBtn", void 0);
i([H(cc.Node)], V.prototype, "earth", void 0);
V = i([j, W("场景/LoginScene")], V);
exports.default = V;