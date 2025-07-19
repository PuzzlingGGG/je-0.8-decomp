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
  s = e("../../Frame/EngineManager"),
  r = e("../../Frame/NetworkMgr"),
  l = e("../../Role");
class c {
  constructor() {
    this.gameShowDatas = [];
    this.tempGameShowDatas = [];
    this.goodsShowDatas = [];
    this.tempGoodsShowDatas = [];
  }
  startUpdate() {
    s.default.Ins.startSchedule(() => {
      this.checkUploadGameShow();
      this.checkUploadGoodsShow();
    }, 1);
  }
  gameShow(e, t, o = 0, i = "", n = "") {
    "GD:8616435:2" == e && console.log("dasdasd");
    o || (o = orange.TimeUtil.serverTime);
    let a = this.gameShowDatas.find(o => o.gameId == e && o.showType == t);
    a || (a = this.tempGameShowDatas.find(o => o.gameId == e && o.showType == t));
    if (!a) {
      let a = {
        gameId: e,
        showType: t,
        showId: l.default.Ins.role.id + "-" + o,
        bk: i,
        st: n
      };
      this.tempGameShowDatas.unshift(a);
    }
  }
  checkUploadGameShow() {
    return i(this, void 0, void 0, function* () {
      if (this.tempGameShowDatas.length > 0) {
        let e = [];
        for (let t = 0; t < this.tempGameShowDatas.length; t++) e.push(this.tempGameShowDatas[t].gameId);
        let t = {
          showList: []
        };
        for (let e = 0; e < this.tempGameShowDatas.length; e++) {
          let o = this.tempGameShowDatas[e],
            i = new a.AnalyticsGameData();
          i.gameId = o.gameId;
          i.showType = o.showType;
          i.showId = o.showId;
          i.bk = o.bk;
          i.st = o.st;
          t.showList.push(i);
          this.gameShowDatas.unshift(o);
        }
        this.tempGameShowDatas = [];
        yield r.NetIns.SendCmdAsync({
          cmd: n.CMDS.Game_ReportGameShow,
          params: t
        }, n.Game_RReportGameShow);
      }
    });
  }
  gameClick(e, t, o = "", s = "") {
    return i(this, void 0, void 0, function* () {
      let i = this.tempGameShowDatas.concat(this.gameShowDatas).find(o => o.gameId == e && o.showType == t);
      if (i) {
        let l = new a.AnalyticsGameData();
        l.gameId = e;
        l.showType = t;
        l.showId = i.showId;
        l.bk = o;
        l.st = s;
        let c = {
          clickGameData: l
        };
        console.log("RcmdMng.gameClick", c);
        yield r.NetIns.SendCmdAsync({
          cmd: n.CMDS.Game_ReportGameClick,
          params: c
        }, n.Game_RReportGameClick);
      }
    });
  }
  goodsShow(e, t, o = 0, i = "", n = "") {
    o || (o = orange.TimeUtil.serverTime);
    let a = this.goodsShowDatas.find(o => o.goodsId == e && o.showType == t);
    a || (a = this.tempGoodsShowDatas.find(o => o.goodsId == e && o.showType == t));
    if (!a) {
      let a = {
        goodsId: e,
        showType: t,
        showId: l.default.Ins.role.id + "-" + o,
        bk: i,
        st: n
      };
      this.tempGoodsShowDatas.unshift(a);
    }
  }
  checkUploadGoodsShow() {
    return i(this, void 0, void 0, function* () {
      if (this.tempGoodsShowDatas.length > 0) {
        let e = {
          showList: []
        };
        for (let t = 0; t < this.tempGoodsShowDatas.length; t++) {
          let o = this.tempGoodsShowDatas[t],
            i = new a.AnalyticsGoodsData();
          i.goodsId = o.goodsId;
          i.showType = o.showType;
          i.showId = o.showId;
          i.bk = o.bk;
          i.st = o.st;
          e.showList.push(i);
          this.goodsShowDatas.unshift(o);
        }
        this.tempGoodsShowDatas = [];
        yield r.NetIns.SendCmdAsync({
          cmd: n.CMDS.Game_ReportGoodsShow,
          params: e
        }, n.Game_RReportGoodsShow);
      }
    });
  }
  goodsClick(e, t, o = "", s = "") {
    return i(this, void 0, void 0, function* () {
      let i = this.tempGoodsShowDatas.concat(this.goodsShowDatas).find(o => o.goodsId == e && o.showType == t);
      if (i) {
        let l = new a.AnalyticsGoodsData();
        l.goodsId = e;
        l.showType = t;
        l.showId = i.showId;
        l.bk = o;
        l.st = s;
        let c = {
          clickGameData: l
        };
        console.log("RcmdMng.goodsClick", c);
        yield r.NetIns.SendCmdAsync({
          cmd: n.CMDS.Game_ReportGoodsClick,
          params: c
        }, n.Game_RReportGoodsClick);
      }
    });
  }
}
exports.default = c;
c.Ins = new c();