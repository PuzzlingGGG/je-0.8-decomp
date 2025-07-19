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
  a = e("../../../scripts/_autogen/data/data"),
  s = e("../../Frame/CrossPlatform"),
  r = e("../../Frame/NetworkMgr"),
  l = e("../../TGA"),
  c = e("../GameEnv"),
  d = e("./DynamicMng"),
  h = e("./Mng"),
  p = e("./RcmdMng");
class u {
  constructor() {
    this.chosenRanks = new Map();
    this.normalRanks = new Map();
    this.cellDataCache = new Map();
    this.infoCache = new Map();
    this.myGoodsIds = [];
    this.packageSizeMax = 12;
    this.rcmdGoods = [];
  }
  getRankIds(e, t) {
    let o = e + "-" + t;
    return this.normalRanks.get(o) || [];
  }
  appendLoadRankIds(e, t) {
    return i(this, void 0, void 0, function* () {
      if (d.DynamicMng.Ins.isInspectVersion()) return d.DynamicMng.Ins.inspectGoodsIds;
      let o = e + "-" + t,
        i = this.normalRanks.get(o) || [],
        s = i.length,
        c = s + 11;
      if (s >= (c = Math.min(c, 999))) return i;
      let h = {
          goodsType: e,
          goodsSort: t,
          start: s,
          end: c,
          startMember: ""
        },
        p = null;
      if (t == a.GoodsSortType.goodsUpStampDesc) {
        let e = yield r.NetIns.SendCmdAsync({
          cmd: n.CMDS.Game_GetNewGoods,
          params: h
        }, n.Game_RGetNewGoods);
        if (e) {
          (p = new n.Game_RGetGoodsIds()).startMember = e.startMember;
          for (let t = 0; t < e.goodsInfoList.length; t++) {
            let o = e.goodsInfoList[t];
            p.goodsIds.push(e.goodsInfoList[t].id);
            this.cellDataCache.set(o.id, o);
          }
        }
      } else p = yield r.NetIns.SendCmdAsync({
        cmd: n.CMDS.Game_GetGoodsIds,
        params: h
      }, n.Game_RGetGoodsIds);
      if (p) {
        let e = p.goodsIds;
        for (let t = 0; t < e.length; t++) {
          let o = e[t];
          i.includes(o) || i.push(o);
        }
        i.push(null);
        this.normalRanks.set(o, i);
      }
      l.TGA.track("shopPage", {
        sort: t,
        type: e,
        page: "排行榜"
      });
      return i;
    });
  }
  getChosenIds(e, t) {
    let o = e + "-" + t;
    return this.chosenRanks.get(o) || [];
  }
  appendLoadChosenIds(e, t) {
    return i(this, void 0, void 0, function* () {
      if (d.DynamicMng.Ins.isInspectVersion()) return d.DynamicMng.Ins.inspectGoodsIds;
      let o = e + "-" + t,
        i = this.chosenRanks.get(o) || [],
        a = i.length,
        s = a + 10;
      if (a >= (s = Math.min(s, 999))) return i;
      let c = {
          goodsType: e,
          goodsSort: t,
          start: a,
          end: s
        },
        h = yield r.NetIns.SendCmdAsync({
          cmd: n.CMDS.Game_GetChosenGoodsIds,
          params: c
        }, n.Game_RGetChosenGoodsIds);
      if (h) {
        let e = h.goodsIds;
        for (let t = 0; t < e.length; t++) {
          let o = e[t],
            n = yield this.canShow(o);
          !i.includes(o) && n && i.push(o);
        }
        this.chosenRanks.set(o, i);
      }
      l.TGA.track("shopPage", {
        sort: t,
        type: e,
        page: "精选"
      });
      return i;
    });
  }
  appendLoadRcmdGoods(e) {
    return i(this, void 0, void 0, function* () {
      p.default.Ins.tempGoodsShowDatas.length > 0 && (yield p.default.Ins.checkUploadGoodsShow());
      let t = {
          count: e,
          showType: "rcmd"
        },
        o = yield r.NetIns.SendCmdAsync({
          cmd: n.CMDS.Game_GetRecommendGoodsIdList,
          params: t
        }, n.Game_RGetRecommendGoodsIdList);
      if (o) {
        let e = [];
        for (let t = 0; t < o.recommendList.length; t++) {
          let i = o.recommendList[t];
          e.push(i.id);
        }
        let t = yield this.loadGoodsCellDatas(e),
          i = orange.TimeUtil.serverTime;
        for (let e = 0; e < o.recommendList.length; e++) {
          let n = o.recommendList[e],
            a = t.find(e => e.id == n.id);
          a ? this.rcmdGoods.push({
            goodsCellData: a,
            bk: n.bk,
            st: n.st
          }) : p.default.Ins.goodsShow(n.id, "rcmd", i, n.bk, n.st);
        }
      }
      return this.rcmdGoods;
    });
  }
  loadGoodsCellDatas(e) {
    return i(this, void 0, void 0, function* () {
      let t = new Set();
      for (let o = 0; o < e.length; o++) {
        let i = e[o];
        i && this.canShow(i) && (this.cellDataCache.has(i) || t.add(i));
      }
      if (t.size > 0) {
        let e = {
            ids: Array.from(t)
          },
          o = yield r.NetIns.SendCmdAsync({
            cmd: n.CMDS.Game_GetSimpleGoods,
            params: e
          }, n.Game_RGetSimpleGoods);
        if (o) for (let e = 0; e < o.goodsInfoList.length; e++) {
          let t = o.goodsInfoList[e];
          this.cellDataCache.set(t.id, t);
        }
      }
      let o = [];
      for (let t = 0; t < e.length; t++) {
        let i = e[t],
          n = this.cellDataCache.get(i);
        n && o.push(n);
      }
      return o;
    });
  }
  canShow(e) {
    return i(this, void 0, void 0, function* () {
      let t = !0;
      s.wx && !d.DynamicMng.Ins.isGmPlayer() && c.gameEnv.isWxReviewCity && ((yield d.DynamicMng.Ins.loadOne("IpGoodsIds")) || []).includes(e) && (t = !0);
      return t;
    });
  }
  loadGoodsInfos(e) {
    return i(this, void 0, void 0, function* () {
      let t = [];
      for (let o = 0; o < e.length; o++) {
        let i = e[o];
        this.infoCache.get(i) || t.push(i);
      }
      if (t.length > 0) {
        let e = {
            ids: t
          },
          o = yield r.NetIns.SendCmdAsync({
            cmd: n.CMDS.Game_GetGoodsInfos,
            params: e
          }, n.Game_RGetGoodsInfos);
        for (let e = 0; e < o.goodsInfoList.length; e++) {
          let t = o.goodsInfoList[e];
          this.infoCache.set(t.id, t);
        }
      }
      let o = [];
      for (let t = 0; t < e.length; t++) {
        let i = e[t],
          n = this.infoCache.get(i);
        n && o.push(n);
      }
      return o;
    });
  }
  loadMyGoodsInfos() {
    return i(this, void 0, void 0, function* () {
      let e = this.myGoodsIds,
        t = [];
      for (let o = 0; o < e.length; o++) {
        let i = e[o];
        this.infoCache.get(i) || t.push(i);
      }
      if (t.length > 0) {
        let e = {
            ids: t
          },
          o = yield r.NetIns.SendCmdAsync({
            cmd: n.CMDS.Game_GetOwnGoodsInfos,
            params: e
          }, n.Game_RGetOwnGoodsInfos);
        for (let e = 0; e < o.goodsInfoList.length; e++) {
          let t = o.goodsInfoList[e];
          this.infoCache.set(t.id, t);
        }
      }
      let o = [];
      for (let t = 0; t < e.length; t++) {
        let i = e[t],
          n = this.infoCache.get(i);
        if (n) o.push(n);else {
          let e = new a.GDGoodsInfo();
          e.id = i;
          e.name = "已失效";
          o.push(e);
        }
      }
      return o;
    });
  }
  offGoods(e) {
    return i(this, void 0, void 0, function* () {
      let t = {
        id: e
      };
      if (yield r.NetIns.SendCmdAsync({
        cmd: n.CMDS.Game_OffGoods,
        params: t
      }, n.Game_ROffGoods)) {
        let t = this.myGoodsIds.indexOf(e);
        t >= 0 && this.myGoodsIds.splice(t, 1);
      }
    });
  }
  uploadGoods(e) {
    return i(this, void 0, void 0, function* () {
      let t = yield r.NetIns.SendCmdAsync({
        cmd: n.CMDS.Game_UploadGoods,
        params: e
      }, n.Game_RUploadGoods);
      if (t) if (e.goodsId) {
        this.cellDataCache.delete(e.goodsId);
        this.infoCache.delete(e.goodsId);
      } else t.sensitiveWords && t.sensitiveWords.length > 0 || u.Ins.myGoodsIds.unshift(t.id);
      return t;
    });
  }
  buy(e, t) {
    return i(this, void 0, void 0, function* () {
      let o = {
          id: e,
          isDiscount: 1 != t
        },
        i = yield r.NetIns.SendCmdAsync({
          cmd: n.CMDS.Game_BuyGoods,
          params: o
        }, n.Game_RBuyGoods),
        s = [];
      if (i) {
        if (i.tileConfs) for (let t = 0; t < i.tileConfs.length; t++) {
          let o = i.tileConfs[t];
          o.conf.id = o.id;
          o.conf.goodsUId = e;
          h.Mng.Ins.tileMng.customCache.set(o.id, o.conf);
          h.Mng.Ins.tileMng.customIds.unshift(o.id);
          s.push({
            type: "tile",
            id: o.id
          });
        }
        if (i.actorConfs) for (let t = 0; t < i.actorConfs.length; t++) {
          let o = i.actorConfs[t];
          o.conf.id = o.id;
          o.conf.goodsUId = e;
          h.Mng.Ins.actorMng.customCache.set(o.id, o.conf);
          h.Mng.Ins.actorMng.customIds.unshift(o.id);
          s.push({
            type: "actor",
            id: o.id
          });
        }
        if (i.deviceConfs) for (let t = 0; t < i.deviceConfs.length; t++) {
          let o = i.deviceConfs[t];
          o.conf.id = o.id;
          o.conf.goodsUId = e;
          h.Mng.Ins.deviceMng.customCache.set(o.id, o.conf);
          h.Mng.Ins.deviceMng.customIds.unshift(o.id);
          s.push({
            type: "device",
            id: o.id
          });
        }
        if (i.propConfs) for (let t = 0; t < i.propConfs.length; t++) {
          let o = i.propConfs[t];
          o.conf.id = o.id;
          o.conf.goodsUId = e;
          h.Mng.Ins.propMng.customCache.set(o.id, o.conf);
          h.Mng.Ins.propMng.customIds.unshift(o.id);
          s.push({
            type: "prop",
            id: o.id
          });
        }
        if (i.bulletConfs) for (let t = 0; t < i.bulletConfs.length; t++) {
          let o = i.bulletConfs[t];
          o.conf.id = o.id;
          o.conf.goodsUId = e;
          h.Mng.Ins.bulletMng.customCache.set(o.id, o.conf);
          h.Mng.Ins.bulletMng.customIds.unshift(o.id);
        }
        if (i.weaponConfs) for (let t = 0; t < i.weaponConfs.length; t++) {
          let o = i.weaponConfs[t];
          o.conf.id = o.id;
          o.conf.goodsUId = e;
          h.Mng.Ins.weaponMng.customCache.set(o.id, o.conf);
          h.Mng.Ins.weaponMng.customIds.unshift(o.id);
          s.push({
            type: "weapon",
            id: o.id
          });
          if (o.conf && o.conf.gun && o.conf.gun.bulletId) {
            let e = i.bulletMap.get(o.conf.gun.bulletId);
            if (e) {
              o.conf.gun.bulletId = e;
              yield h.Mng.Ins.weaponMng.save(o.conf);
            }
          }
        }
        let t = this.cellDataCache.get(e);
        t && t instanceof a.GDGoodsInfo && t.saleCnt++;
      }
      return s;
    });
  }
  clear() {
    this.cellDataCache.clear();
    this.normalRanks.clear();
    this.rcmdGoods = [];
  }
  gmLoadAllChosenGoodsIds() {
    return i(this, void 0, void 0, function* () {
      let e = a.GoodsType.all + "-" + a.GoodsSortType.comprehensive,
        t = u.Ins.chosenRanks.get(e) || [],
        o = {
          goodsType: a.GoodsType.all,
          goodsSort: a.GoodsSortType.comprehensive,
          start: 0,
          end: 1e4
        },
        i = yield r.NetIns.SendCmdAsync({
          cmd: n.CMDS.Game_GetChosenGoodsIds,
          params: o
        }, n.Game_RGetChosenGoodsIds);
      if (i) for (let e = 0; e < i.goodsIds.length; e++) {
        let o = i.goodsIds[e];
        t.includes(o) || t.push(o);
      }
      return t;
    });
  }
}
exports.default = u;
u.Ins = new u();