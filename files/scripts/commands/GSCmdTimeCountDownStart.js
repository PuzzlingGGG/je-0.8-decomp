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
exports.GSCmdTimeCountDownStart = void 0;
const n = e("../../Frame/SceneManager"),
  a = e("../../Game/Player/TriggerMng"),
  s = e("../../Scene/GameScene/GameScene"),
  r = e("../GSRunnerMng");
exports.GSCmdTimeCountDownStart = class {
  constructor() {}
  setParam(e) {
    this._isComplete = !1;
    let t = r.GSRunnerMng.instance.getRunner(this.runnerId);
    t ? t.log(`>>call game script time count down start command!timer[${e.timer}]`) : console.log(`>>call game script time count down start command!timer[${e.timer}]`);
    this.startTime(e.timer, e.timerType, e.evts);
  }
  excute() {}
  setp() {}
  isComplete() {
    return this._isComplete;
  }
  startTime(e, t, o) {
    return i(this, void 0, void 0, function* () {
      let i = n.default.ins.findScene(s.default);
      if (i) {
        let n = r.GSRunnerMng.instance.getRunner(this.runnerId),
          s = n ? n.actor : null;
        yield i.onStartGameTimer(e, t, () => {
          a.default.Ins.emitTrigger(o, s);
        });
      }
      this._isComplete = !0;
    });
  }
};