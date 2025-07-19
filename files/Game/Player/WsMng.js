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
  a = e("../../Frame/NetworkMgr"),
  s = e("../../Role"),
  r = e("../OperationFlow"),
  l = e("./Mng"),
  c = e("./ShopMng"),
  d = e("./TalkMng");
class h {
  init() {
    a.NetIns.on(n.RESPS.Game_RGameStatusNotify, this.onGameStatusNotify, this);
    a.NetIns.on(n.RESPS.Game_RGoodsStatusNotify, this.onGoodsStatusNotify, this);
    a.NetIns.on(n.RESPS.Game_RTalkStatusNotify, this.onTalkStatusNotify, this);
    a.NetIns.on(n.RESPS.Game_RRoleNewUserImgNotify, this.onNewUserImgNotify, this);
  }
  DecodeMsg(e, t) {
    let o = new t();
    o.setValue(e);
    return o;
  }
  onGameStatusNotify(e) {
    if (!e.data || !e.data.decBody) return;
    let t = e.data.decBody;
    setTimeout(() => i(this, void 0, void 0, function* () {
      console.log("WsMng:" + n.RESPS.Game_RGameStatusNotify, t);
      let e = yield l.Mng.mine.gameMng.loadOne(t.gameId);
      e.status = t.status;
      e.offReason = r.OperationFlow.makeOffReason(t.offReason);
      cc.game.emit("GameDataChange", e);
    }), 1e3);
  }
  onGoodsStatusNotify(e) {
    if (!e.data || !e.data.decBody) return;
    let t = e.data.decBody;
    setTimeout(() => i(this, void 0, void 0, function* () {
      console.log("WsMng:" + n.RESPS.Game_RGoodsStatusNotify, t);
      let e = yield c.default.Ins.loadGoodsInfos([t.goodsId]);
      if (e && e[0]) {
        e[0].status = t.status;
        e[0].offReason = t.offReason;
        cc.game.emit("GoodsStatusChange");
      }
    }), 1e3);
  }
  onTalkStatusNotify(e) {
    if (!e.data || !e.data.decBody) return;
    let t = e.data.decBody;
    setTimeout(() => i(this, void 0, void 0, function* () {
      console.log("WsMng:" + n.RESPS.Game_RTalkStatusNotify, t);
      d.default.Ins.updateStatus(t);
    }), 1e3);
  }
  onNewUserImgNotify(e) {
    if (!e.data || !e.data.decBody) return;
    let t = e.data.decBody;
    setTimeout(() => i(this, void 0, void 0, function* () {
      console.log("WsMng:" + n.RESPS.Game_RRoleNewUserImgNotify, t);
      s.default.Ins.role.newUserImgReviewStatus = t.status;
      s.default.Ins.role.userImg = t.userImg;
      cc.game.emit(s.default.UserImgChange);
    }), 1e3);
  }
}
exports.default = h;
h.Ins = new h();