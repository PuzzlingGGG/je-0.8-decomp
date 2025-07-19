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
exports.GSCmdSwitchHero = void 0;
const n = e("../../Frame/SceneManager"),
  a = e("../../Scene/GameScene/GameScene"),
  s = e("../GSRunnerMng");
exports.GSCmdSwitchHero = class {
  constructor() {}
  setParam(e) {
    this._isComplete = !1;
    let t = s.GSRunnerMng.instance.getRunner(this.runnerId);
    t ? t.log(`>>call game script switch hero command!hero[${!e.confId}]`) : console.log(`>>call game script switch hero command!hero[${!e.confId}]`);
    this.shiftHero(e.confId);
  }
  excute() {}
  setp() {}
  isComplete() {
    return this._isComplete;
  }
  shiftHero(e) {
    return i(this, void 0, void 0, function* () {
      let t = n.default.ins.findScene(a.default);
      t && (yield t.shiftHero(e));
      this._isComplete = !0;
    });
  }
};