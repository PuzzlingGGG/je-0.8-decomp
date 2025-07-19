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
exports.GSCmdDropItem = void 0;
const n = e("../../Frame/SceneManager"),
  a = e("../../Frame/Util"),
  s = e("../../Game/Player/Mng"),
  r = e("../../Game/World/Tile"),
  l = e("../../Scene/GameScene/GameScene"),
  c = e("../GSRunnerMng");
exports.GSCmdDropItem = class {
  constructor() {}
  setParam(e) {
    this._isComplete = !1;
    let t = c.GSRunnerMng.instance.getRunner(this.runnerId);
    if (t) {
      let o = t.actor,
        i = e.itemId,
        r = e.compareValue;
      r = a.Util.clamp(r, 0, 99);
      if (i && r && s.Mng.Ins.propMng.getOne(i)) {
        let a = n.default.ins.findScene(l.default).world;
        for (; r-- > 0;) {
          let t = a.addProp(o.position),
            n = {
              id: "",
              confId: i,
              useGravity: e.useGravity
            };
          this.playPropSpawn(t, n);
        }
        t.log(`>>call game script drop item command!drop [${e.itemId}]`);
      }
    }
  }
  playPropSpawn(e, t) {
    return i(this, void 0, void 0, function* () {
      yield e.setData(t);
      let o = r.default.SIZE,
        i = -o + Math.random() * o * 2,
        n = -o + Math.random() * o * 2,
        a = 2 * i / .4,
        s = 2 * n / .4;
      t.useGravity && (s = 4 * (n = .5 * o + Math.random() * o * .5) / .4);
      e.addImpulse(a, s, .4);
    });
  }
  excute() {
    this._isComplete = !0;
  }
  setp() {}
  isComplete() {
    return this._isComplete;
  }
};