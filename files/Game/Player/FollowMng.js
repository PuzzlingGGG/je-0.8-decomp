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
exports.FollowMng = void 0;
const n = e("../../../scripts/_autogen/cmd/cmd"),
  a = e("../../Frame/NetworkMgr"),
  s = e("../../Role"),
  r = e("./DynamicMng"),
  l = e("./GameCoverMng"),
  c = e("./PlayerDetailMng");
class d {
  constructor() {
    this.playerId = -1;
    this.followIds = null;
    this.fansIds = [];
    this.otherFollowIdsMap = new Map();
    this.otherFansIdsMap = new Map();
    this.newFansCnt = 0;
    this.playerInfoMap = new Map();
  }
  follow(e) {
    return i(this, void 0, void 0, function* () {
      try {
        let t = {
          followId: e
        };
        if (!(yield a.NetIns.SendCmdAsync({
          cmd: n.CMDS.Game_FollowUser,
          params: t
        }, n.Game_RFollowUser))) return -1;
        this.followIds.unshift(e);
        let o = this.playerInfoMap.get(e);
        o && (exports.isFollow = !0);
        let i = c.default.Ins.cache.get(e);
        if (i) {
          i.isFollow = !0;
          i.fansCount++;
        }
        l.default.Ins.cache.forEach(t => {
          if (t.authorMsg && t.authorMsg.id == e) {
            t.authorMsg.isFollow = !0;
            t.authorMsg.fansCount++;
          }
        });
      } catch (e) {}
      return 1;
    });
  }
  unFollow(e) {
    return i(this, void 0, void 0, function* () {
      try {
        let t = {
          followId: e
        };
        if (!(yield a.NetIns.SendCmdAsync({
          cmd: n.CMDS.Game_CancelFollowUser,
          params: t
        }, n.Game_RFollowUser))) return -1;
        let o = this.followIds.indexOf(e);
        o >= 0 && this.followIds.splice(o, 1);
        let i = this.playerInfoMap.get(e);
        i && (i.isFollow = !1);
        let s = c.default.Ins.cache.get(e);
        if (s) {
          s.isFollow = !1;
          s.fansCount--;
        }
        l.default.Ins.cache.forEach(t => {
          if (t.authorMsg && t.authorMsg.id == e) {
            t.authorMsg.isFollow = !1;
            t.authorMsg.fansCount--;
          }
        });
      } catch (e) {}
      return 1;
    });
  }
  loadInfos(e) {
    return i(this, void 0, void 0, function* () {
      let t = [];
      for (let o = 0; o < e.length; o++) {
        let i = e[o];
        this.playerInfoMap.has(i) || t.push(i);
      }
      if (t.length > 0) {
        let e = {
            ids: t
          },
          o = yield a.NetIns.SendCmdAsync({
            cmd: n.CMDS.Game_GetUserSimpleMsg,
            params: e
          }, n.Game_RGetUserSimpleMsg);
        if (o) for (let e = 0; e < o.userSimpleMsgList.length; e++) {
          let t = o.userSimpleMsgList[e];
          this.playerInfoMap.set(t.playerId, t);
        }
      }
      let o = [];
      for (let t = 0; t < e.length; t++) {
        let i = this.playerInfoMap.get(e[t]);
        i && o.push(i);
      }
      return o;
    });
  }
  isSelf() {
    return this.playerId == s.default.Ins.role.uId;
  }
  getFollowIds() {
    return i(this, void 0, void 0, function* () {
      if (this.playerId == s.default.Ins.role.uId) return this.followIds;
      this.otherFollowIdsMap.has(this.playerId) || (yield this.loadOtherFollowIds());
      return this.otherFollowIdsMap.get(this.playerId);
    });
  }
  getFansIds() {
    if (this.playerId == s.default.Ins.role.uId) return this.fansIds;
    this.otherFansIdsMap.has(this.playerId) || this.otherFansIdsMap.set(this.playerId, []);
    return this.otherFansIdsMap.get(this.playerId);
  }
  loadOtherFollowIds() {
    return i(this, void 0, void 0, function* () {
      let e = {
          rid: this.playerId
        },
        t = yield a.NetIns.SendCmdAsync({
          cmd: n.CMDS.Game_GetFollow,
          params: e
        }, n.Game_RGetFollow);
      t && this.otherFollowIdsMap.set(this.playerId, t.ids);
    });
  }
  appendLoadFansIds(e = 10) {
    return i(this, void 0, void 0, function* () {
      this.playerId = s.default.Ins.role.uId;
      return yield this.appendOtherLoadFansIds(e);
    });
  }
  appendOtherLoadFansIds(e = 10) {
    return i(this, void 0, void 0, function* () {
      if (r.DynamicMng.Ins.isInspectVersion()) return [];
      let t = this.getFansIds().length,
        o = t + e;
      if (t >= o) return this.getFansIds();
      let i = {
          startIndex: t,
          endIndex: o,
          rid: this.playerId
        },
        s = yield a.NetIns.SendCmdAsync({
          cmd: n.CMDS.Game_GetFans,
          params: i
        }, n.Game_RGetFans);
      if (s) {
        let e = s.ids;
        if (this.isSelf()) {
          this.fansIds = this.fansIds.concat(e);
          this.newFansCnt = s.newFansCnt;
        } else if (this.otherFansIdsMap.has(this.playerId)) {
          let t = this.otherFansIdsMap.get(this.playerId);
          t = t.concat(e);
          this.otherFansIdsMap.set(this.playerId, t);
        } else this.otherFansIdsMap.set(this.playerId, e);
      }
      return this.getFansIds();
    });
  }
  clearFansIds() {
    this.fansIds = [];
  }
  clearOtherIdsMap() {
    this.otherFollowIdsMap = new Map();
    this.otherFansIdsMap = new Map();
  }
  clearFansDot() {
    return i(this, void 0, void 0, function* () {
      yield a.NetIns.SendCmdAsync({
        cmd: n.CMDS.Game_ClearNewFans,
        params: {}
      }, n.Game_RClearNewFans);
      this.newFansCnt = 0;
    });
  }
}
exports.FollowMng = d;
d.Ins = new d();