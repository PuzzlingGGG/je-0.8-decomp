"use strict";

var i = this && this.__awaiter || function (e, t, o, i) {
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
exports.GiftRankMng = exports.GiftRankType = void 0;
const n = e("../../../scripts/_autogen/cmd/cmd"),
  a = e("../../Frame/CrossPlatform"),
  s = e("../../Frame/NetworkMgr"),
  r = e("../../Frame/Util"),
  l = e("../../Scene/HomeScene/RankSubPage/GiftRankCell");
(function (e) {
  e[e.Week = 1] = "Week";
  e[e.Month = 2] = "Month";
  e[e.Forever = 3] = "Forever";
  e[e.Holidy = 4] = "Holidy";
})(o.GiftRankType || (exports.GiftRankType = {}));
class c {
  constructor() {
    this.giftItemsVersion = "";
    this.giftItemsMap = new Map();
    this.giftSpriteFrame = new Map();
    this.giftSpritePromiseMap = new Map();
    this.giftRankMap = new Map();
  }
  loadSF(e) {
    return i(this, void 0, void 0, function* () {
      let t = this.giftSpriteFrame.get(e);
      if (!t) {
        let o = this.giftItemsMap.get(e),
          i = this.giftSpritePromiseMap.get(e);
        if (!i) {
          i = r.Util.downLoadPng("gift/" + o.iconUrl + ".png");
          this.giftSpritePromiseMap.set(e, i);
        }
        t = yield i;
        this.giftSpriteFrame.set(e, t);
        this.giftSpritePromiseMap.delete(e);
      }
      return t;
    });
  }
  getCost(e) {
    return this.giftItemsMap.get(e).coin;
  }
  checkVersion(e) {
    return i(this, void 0, void 0, function* () {
      this.giftItemsMap.clear();
      let t = a.crossPlatform.getStorageSync("gift_version"),
        o = a.crossPlatform.getStorageSync("gift_confs");
      if (o && t == e) {
        this.giftItemsVersion = t;
        for (let e in o) this.giftItemsMap.set(e, o[e]);
      } else {
        let t = {},
          o = yield s.NetIns.SendCmdAsync({
            cmd: n.CMDS.Game_GetGiftDynCfg,
            params: t
          }, n.Game_RGetGiftDynCfg);
        if (o) {
          this.giftItemsVersion = e;
          let t = {};
          o.cfg.datas.forEach((e, o) => {
            t[o] = e;
            this.giftItemsMap.set(o, e);
          });
          a.crossPlatform.setStorageSync("gift_version", e);
          a.crossPlatform.setStorageSync("gift_confs", t);
        } else cc.error("礼物列表加载失败");
      }
    });
  }
  loadGiftItems() {
    return i(this, void 0, void 0, function* () {
      let e = yield s.NetIns.SendCmdAsync({
        cmd: n.CMDS.Game_GetGiftDynCfg,
        params: {}
      }, n.Game_RGetGiftDynCfg);
      if (e) {
        this.giftItemsMap = e.cfg.datas;
        this.giftItemsMap.forEach((e, t) => i(this, void 0, void 0, function* () {
          let o = new cc.SpriteFrame();
          o = yield r.Util.downLoadPng("gift/" + e.iconUrl + ".png");
          this.giftSpriteFrame.set(t, o);
        }));
      } else cc.error("礼物列表加载失败");
    });
  }
  sendGift(e, t, o) {
    return i(this, void 0, void 0, function* () {
      let i = {
        gameId: e,
        giftID: t,
        giftCount: o
      };
      return yield s.NetIns.SendCmdAsync({
        cmd: n.CMDS.Game_SendGift,
        params: i
      }, n.Game_RSendGift);
    });
  }
  getGiftRank(e) {
    return this.giftRankMap.get(e) || [];
  }
  deleteGiftRank(e) {
    this.giftRankMap.delete(e);
  }
  appendLoadGiftRank(e, t) {
    return i(this, void 0, void 0, function* () {
      let t = this.getGiftRank(e);
      this.giftRankMap.set(e, t);
      let o = t.length,
        i = {
          rankType: e,
          beginIndex: o
        },
        a = yield s.NetIns.SendCmdAsync({
          cmd: n.CMDS.Game_GetGiftRankData,
          params: i
        }, n.Game_RGetGiftRankData);
      if (null != a) for (let e = 0; e < a.rankList.length; e++) {
        let o = a.rankList[e];
        if (!t.find(e => e.gameId == o.rankKey)) {
          let e = new l.GiftRankCellData(o.rankKey, o.gameName, o.gameIcon, t.length + 1, o.score);
          t.push(e);
        }
      }
      return t;
    });
  }
  loadGameGiftRank(e, t) {
    return i(this, void 0, void 0, function* () {
      let o = {
        gameId: e,
        beginIndex: t
      };
      return yield s.NetIns.SendCmdAsync({
        cmd: n.CMDS.Game_GetRoleGiftRankData,
        params: o
      }, n.Game_RGetRoleGiftRankData);
    });
  }
}
exports.GiftRankMng = c;
c.Ins = new c();