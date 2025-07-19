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
exports.CreditMng = void 0;
const n = e("../../../scripts/_autogen/cmd/cmd"),
  a = e("../../Frame/NetworkMgr");
class s {
  constructor() {
    this.credit = 3;
    this.max = 3;
    this.creditScoreRecoverProcess = 0;
    this.userCreditMsgList = null;
  }
  loadData() {
    return i(this, void 0, void 0, function* () {
      if (null == this.userCreditMsgList) {
        let e = {},
          t = yield a.NetIns.SendCmdAsync({
            cmd: n.CMDS.Game_GetUserCreditMsg,
            params: e
          }, n.Game_RGetUserCreditMsg);
        if (t) {
          this.creditScoreRecoverProcess = t.creditScoreRecoverProcess;
          this.userCreditMsgList = t.userCreditMsgList || [];
        }
      }
    });
  }
}
exports.CreditMng = s;
s.Ins = new s();