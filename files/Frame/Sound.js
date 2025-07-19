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
exports.Sound = void 0;
const n = e("./Util");
(function (e) {
  let t = new Map();
  e.volume = .5;
  e.play = function (o, a = !1) {
    return i(this, void 0, void 0, function* () {
      if (!o) return;
      if (e.volume <= 0) return;
      let i = t.get(o);
      if (i) cc.audioEngine.play(i, a, .5 * e.volume);else {
        let i = yield n.Util.loadBundleRes("Sound/" + o, cc.AudioClip);
        t.set(o, i);
        cc.audioEngine.play(i, !1, .5 * e.volume);
      }
    });
  };
})(o.Sound || (exports.Sound = {}));