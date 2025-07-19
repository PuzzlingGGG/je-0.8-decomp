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
const n = e("../../../scripts/_autogen/cmd/cmd"),
  a = e("../../Frame/AD"),
  s = e("../../Frame/NetworkMgr");
class r {
  constructor() {
    this.coin = 0;
    this.flyCoinCnt = 0;
  }
  setCoin(e) {
    this.coin = e || 0;
    cc.game.emit("refreshCoinBar");
  }
  requestAddCoinByAd() {
    return i(this, void 0, void 0, function* () {
      let e = yield s.NetIns.SendCmdAsync({
        cmd: n.CMDS.Game_AddCoinByAdvert,
        params: {}
      }, n.Game_RAddCoinByAdvert);
      if (!e) return;
      let t = this.coin,
        o = e.coin,
        i = o - t;
      this.flyCoinCnt += i;
      this.coin = o;
      a.AD.addCoinByAdvertCnt = e.addCoinByAdvertCnt;
      cc.game.emit("refreshCoinBar");
      return [{
        type: "coin",
        cnt: i
      }];
    });
  }
  requestAddCoinByShare() {
    return i(this, void 0, void 0, function* () {
      let e = yield s.NetIns.SendCmdAsync({
        cmd: n.CMDS.Game_AddCoinByShareVideo,
        params: {}
      }, n.Game_RAddCoinByShareVideo);
      if (!e) return;
      let t = this.coin,
        o = e.coin,
        i = o - t;
      this.flyCoinCnt += i;
      this.coin = o;
      cc.game.emit("refreshCoinBar");
      return [{
        type: "coin",
        cnt: i
      }];
    });
  }
  requestTTCoin0319() {
    return i(this, void 0, void 0, function* () {
      let e = yield s.NetIns.SendCmdAsync({
        cmd: n.CMDS.Game_ObtainTTCoin0319,
        params: {}
      }, n.Game_RObtainTTCoin0319);
      if (!e) return;
      let t = this.coin,
        o = e.coin,
        i = o - t;
      this.flyCoinCnt += i;
      this.coin = o;
      cc.game.emit("refreshCoinBar");
      return {
        type: "coin",
        cnt: i
      };
    });
  }
  requestCostCoinInGame(e, t, o, a, r) {
    return i(this, void 0, void 0, function* () {
      let i = {
          type: e,
          gameId: o,
          coin: t,
          name: a,
          textureName: r
        },
        l = yield s.NetIns.SendCmdAsync({
          cmd: n.CMDS.Game_CostCoinInGame,
          params: i
        }, n.Game_RCostCoinInGame);
      if (!l) return !1;
      this.coin = l.curCoin;
      cc.game.emit("refreshCoinBar");
      return !0;
    });
  }
  coinArrive(e) {
    return i(this, void 0, void 0, function* () {
      this.flyCoinCnt -= e;
      cc.game.emit("refreshCoinBar");
    });
  }
  getViewCoinCnt() {
    return Math.max(this.coin - this.flyCoinCnt, 0);
  }
  costCoin(e) {
    this.coin -= e;
    cc.game.emit("refreshCoinBar");
  }
}
exports.default = r;
r.Ins = new r();