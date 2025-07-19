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
exports.CollectionMng = void 0;
const n = e("../../../scripts/_autogen/cmd/cmd"),
  a = e("../../Frame/NetworkMgr"),
  s = e("../../Frame/Top"),
  r = e("../../Role"),
  l = e("./GameCellDataMng"),
  c = e("./ShopMng"),
  d = e("./TalkMng");
class h {
  constructor() {
    this.ids = [];
    this.talkIds = null;
    this.goodsIds = null;
  }
  init(e) {
    this.ids = e.collectionGames || [];
    this.talkIds = new Set(e.collectionTalks || []);
    this.goodsIds = new Set(e.collectionGoods || []);
  }
  collectGame(e) {
    return i(this, void 0, void 0, function* () {
      s.default.blockInput(!0, "collectGame");
      let t = {
        ids: [e]
      };
      if (yield a.NetIns.SendCmdAsync({
        cmd: n.CMDS.Game_CollectionGames,
        params: t
      }, n.Game_RCollectionGames)) {
        this.ids.unshift(e);
        s.default.blockInput(!1, "collectGame");
      } else {
        s.default.showToast("网络错误！");
        s.default.blockInput(!1, "collectGame");
      }
    });
  }
  unCollectGame(e) {
    return i(this, void 0, void 0, function* () {
      const t = "unCollectGame";
      s.default.blockInput(!0, t);
      let o = {
        ids: [e]
      };
      if (yield a.NetIns.SendCmdAsync({
        cmd: n.CMDS.Game_CancelCollectionGames,
        params: o
      }, n.Game_RCancelCollectionGames)) {
        this.ids.indexOf(e) >= 0 && this.ids.splice(e, 1);
        s.default.blockInput(!1, t);
      } else {
        s.default.showToast("网络错误！");
        s.default.blockInput(!1, t);
      }
    });
  }
  collectTalk(e) {
    return i(this, void 0, void 0, function* () {
      let t = {
          iD: e
        },
        o = yield a.NetIns.SendCmdAsync({
          cmd: n.CMDS.Game_CollectionTalk,
          params: t
        }, n.Game_RCollectionTalk);
      if (o) {
        if (1 != o.code) {
          s.default.showToast("收藏成功");
          this.talkIds.add(e);
          s.default.blockInput(!1, "collectTalk");
        } else s.default.showToast("收藏数量已满");
      } else {
        s.default.showToast("网络错误！");
        s.default.blockInput(!1, "collectTalk");
      }
    });
  }
  unCollectTalk(e) {
    return i(this, void 0, void 0, function* () {
      let t = {
        iD: e
      };
      if (yield a.NetIns.SendCmdAsync({
        cmd: n.CMDS.Game_CancelCollectionTalk,
        params: t
      }, n.Game_RCancelCollectionTalk)) {
        this.talkIds.delete(e);
        s.default.blockInput(!1, "unCollectTalk");
      } else {
        s.default.showToast("网络错误！");
        s.default.blockInput(!1, "unCollectTalk");
      }
    });
  }
  collectGoods(e) {
    return i(this, void 0, void 0, function* () {
      let t = {
        ids: [e]
      };
      if (yield a.NetIns.SendCmdAsync({
        cmd: n.CMDS.Game_CollectionGGoods,
        params: t
      }, n.Game_RCollectionGGoods)) {
        s.default.showToast("收藏成功");
        this.goodsIds.add(e);
        s.default.blockInput(!1, "collectGoods");
      } else {
        s.default.showToast("网络错误！");
        s.default.blockInput(!1, "collectGoods");
      }
    });
  }
  unCollectGoods(e) {
    return i(this, void 0, void 0, function* () {
      let t = {
        ids: [e]
      };
      if (yield a.NetIns.SendCmdAsync({
        cmd: n.CMDS.Game_CancelCollectionGoods,
        params: t
      }, n.Game_RCancelCollectionGoods)) {
        this.goodsIds.delete(e);
        s.default.blockInput(!1, "unCollectGoods");
      } else {
        s.default.showToast("网络错误！");
        s.default.blockInput(!1, "unCollectGoods");
      }
    });
  }
  loadGames() {
    return i(this, void 0, void 0, function* () {
      return yield l.default.Ins.loadGames(this.ids);
    });
  }
  loadTalks() {
    return i(this, void 0, void 0, function* () {
      return yield d.default.Ins.loadTalksByIds(Array.from(this.talkIds));
    });
  }
  loadGoods() {
    return i(this, void 0, void 0, function* () {
      return yield c.default.Ins.loadGoodsCellDatas(Array.from(this.goodsIds));
    });
  }
  isCollectTalk(e) {
    return this.talkIds.has(e);
  }
  isCollectGoods(e) {
    return this.goodsIds.has(e);
  }
  getNumCollection() {
    return r.default.Ins.role.collectionGames.length + this.talkIds.size + this.goodsIds.size;
  }
}
exports.CollectionMng = h;
h.Ins = new h();