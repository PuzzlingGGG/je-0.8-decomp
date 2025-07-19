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
const s = e("../../../scripts/_autogen/cmd/cmd"),
  r = e("../../Frame/CrossPlatform"),
  l = e("../../Frame/NetworkMgr"),
  c = e("../../Frame/Util"),
  d = e("./DynamicMng"),
  h = e("./GameCellDataMng"),
  p = e("./RcmdMng"),
  {
    ccclass: u,
    property: m
  } = cc._decorator;
let f = i = class extends cc.Component {
  constructor() {
    super(...arguments);
    this.data = null;
    this.ids = ["GD:6480222:4", "GD:5752094:4", "GD:105104:87", "GD:1573118:45", "GD:87704:7", "GD:332828:12", "GD:2024199:53", "GD:4360969:10", "GD:349221:17", "GD:28939:29", "GD:2829101:9", "GD:6949682:2", "GD:363049:27", "GD:956653:2", "GD:2192113:12", "GD:202631:65", "GD:1451169:37", "GD:2922683:8", "GD:293378:11", "GD:235658:11", "GD:1405045:1", "GD:4457553:15", "GD:862722:15", "GD:1363747:4", "GD:4169726:4", "GD:5421578:16", "GD:3237816:5", "GD:104358:12", "GD:4316218:4", "GD:520296:1", "GD:4316218:6", "GD:4478617:6", "GD:601700:7", "GD:14327:13", "GD:4334986:9", "GD:49939:8", "GD:1777449:2", "GD:213720:5", "GD:88568:26", "GD:745658:1", "GD:4289370:1", "GD:2981787:2", "GD:18623:12", "GD:523140:12", "GD:90819:27", "GD:818203:19", "GD:60682:62", "GD:717699:1", "GD:3922352:1", "GD:2789310:3", "GD:3078773:6", "GD:18301:2", "GD:1728739:7", "GD:862722:12", "GD:1329319:7", "GD:1364672:19"];
    this.hotGameIds = [];
    this.hotOpenCnt = 0;
    this.freshGames = [];
    this.followGameDatas = [];
    this.creativeGameDatas = [];
    this.rcmdGames = [];
  }
  loadHotGameIds() {
    return a(this, void 0, void 0, function* () {
      if (0 == this.hotGameIds.length) {
        let e = r.crossPlatform.getStorageSync("hotGameIds") || [],
          t = r.crossPlatform.getStorageSync("hotGameIdsStamp") || 0;
        if (c.Util.isToday(t) && e.length > 0) this.hotGameIds = e;else {
          let e = {
              gameTag: "ZongBang",
              start: 0,
              end: 500
            },
            t = yield l.NetIns.SendCmdAsync({
              cmd: s.CMDS.Game_GetGameIdListByGameTag,
              params: e
            }, s.Game_RGetGameIdListByGameTag);
          if (t) {
            this.hotGameIds = t.gameIdList;
            c.Util.shuffle(this.hotGameIds);
            this.hotGameIds = this.hotGameIds.slice(0, 20);
            r.crossPlatform.setStorageSync("hotGameIds", this.hotGameIds);
            r.crossPlatform.setStorageSync("hotGameIdsStamp", orange.TimeUtil.serverTime);
          }
        }
      }
      return this.hotGameIds;
    });
  }
  initLoadHotGames(e) {
    return a(this, void 0, void 0, function* () {
      let t = yield this.loadHotGameIds();
      t = t.slice(0, e);
      this.hotOpenCnt = e;
      return h.default.Ins.loadGames(t);
    });
  }
  appendLoadHotGames(e) {
    return a(this, void 0, void 0, function* () {
      let t = this.hotOpenCnt,
        o = t + e;
      o = Math.min(o, this.hotGameIds.length);
      this.hotOpenCnt = o;
      let i = this.hotGameIds.slice(t, o);
      return h.default.Ins.loadGames(i);
    });
  }
  loadOpenHotGames() {
    return a(this, void 0, void 0, function* () {
      let e = this.hotGameIds.slice(0, this.hotOpenCnt);
      return h.default.Ins.loadGames(e);
    });
  }
  initLoadFreshGames(e) {
    return a(this, void 0, void 0, function* () {
      this.freshGames.length < e && (yield this.appendLoadFreshGames(e));
      return this.freshGames.slice(0, e);
    });
  }
  appendLoadFreshGames(e) {
    return a(this, void 0, void 0, function* () {
      let t = "";
      this.freshGames.length > 0 && (t = this.freshGames[0].id);
      let o = this.freshGames.length,
        i = o + e,
        n = {
          start: o,
          end: i = Math.min(i, 20),
          startMember: t
        },
        a = yield l.NetIns.SendCmdAsync({
          cmd: s.CMDS.Game_GetNewGameList,
          params: n
        }, s.Game_RGetNewGameList);
      if (a) {
        for (let e = 0; e < a.gameDatas.length; e++) {
          let t = a.gameDatas[e];
          this.freshGames.push(t);
          h.default.Ins.cache.set(t.id, t);
        }
        return a.gameDatas;
      }
      return [];
    });
  }
  appendLoadFollowGames(e) {
    return a(this, void 0, void 0, function* () {
      let t = {
          startIndex: this.followGameDatas.length,
          endIndex: this.followGameDatas.length + e
        },
        o = yield l.NetIns.SendCmdAsync({
          cmd: s.CMDS.Game_GetHomepageFollowUserGames,
          params: t
        }, s.Game_RGetHomepageFollowUserGames);
      if (o) {
        for (let e = 0; e < o.gameDatas.length; e++) this.followGameDatas.push(o.gameDatas[e]);
        return o.gameDatas;
      }
      return [];
    });
  }
  initLoadCreativeGames(e) {
    return a(this, void 0, void 0, function* () {
      if (d.DynamicMng.Ins.isInspectVersion()) return [];
      this.creativeGameDatas.length < e && (yield this.appendLoadCreativeGames(e));
      return this.creativeGameDatas.slice(0, e);
    });
  }
  appendLoadCreativeGames(e) {
    return a(this, void 0, void 0, function* () {
      let t = {
          start: this.creativeGameDatas.length,
          end: this.creativeGameDatas.length + e
        },
        o = yield l.NetIns.SendCmdAsync({
          cmd: s.CMDS.Game_GetSourceCreativeGameRank,
          params: t
        }, s.Game_RGetSourceCreativeGameRank);
      if (o) {
        for (let e = 0; e < o.gameDatas.length; e++) this.creativeGameDatas.push(o.gameDatas[e]);
        return o.gameDatas;
      }
      return [];
    });
  }
  appendLoadRcmdGames(e) {
    return a(this, void 0, void 0, function* () {
      if (p.default.Ins.tempGameShowDatas.length > 0) {
        console.log("julian", p.default.Ins.tempGameShowDatas.length);
        yield p.default.Ins.checkUploadGameShow();
      }
      let t = {
          count: e,
          showType: "RecommendComp"
        },
        o = yield l.NetIns.SendCmdAsync({
          cmd: s.CMDS.Game_GetRecommendGameIdList,
          params: t
        }, s.Game_RGetRecommendGameIdList);
      if (o) {
        let e = [];
        for (let t = 0; t < o.recommendList.length; t++) {
          let i = o.recommendList[t];
          e.push(i.id);
        }
        let t = yield h.default.Ins.loadGames(e),
          i = orange.TimeUtil.serverTime;
        for (let e = 0; e < o.recommendList.length; e++) {
          let n = o.recommendList[e],
            a = t.find(e => e.id == n.id);
          a ? this.rcmdGames.push({
            gameCellData: a,
            bk: n.bk,
            st: n.st
          }) : p.default.Ins.gameShow(n.id, "RecommendComp", i, n.bk, n.st);
        }
      }
      return this.rcmdGames;
    });
  }
};
f.Ins = new i();
f = i = n([u], f);
exports.default = f;