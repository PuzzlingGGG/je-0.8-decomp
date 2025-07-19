"use strict";

exports.Local = void 0;
const i = e("./CrossPlatform");
(function (e) {
  let t = new Map(),
    o = [];
  e.Get = function (e) {
    if (t.has(e)) return t.get(e);
    {
      let o = i.crossPlatform.getStorageSync(e);
      t.set(e, o);
      return o;
    }
  };
  e.GetAsync = function (e, o) {
    t.has(e) ? o(t.get(e)) : i.crossPlatform.getStorage({
      key: e,
      success: i => {
        t.set(e, i);
        o(i);
      },
      fail: () => {
        o("");
      }
    });
  };
  e.Set = function (e, i) {
    t.set(e, i);
    o.indexOf(e) < 0 && o.push(e);
    n();
  };
  function n() {
    for (let e = 0; e < o.length; e++) {
      let n = o[e],
        a = t.get(n);
      i.crossPlatform.setStorage({
        key: n,
        data: a
      });
    }
    o = [];
  }
  e.Save = n;
  e.setDirty = function (e) {
    o.indexOf(e) < 0 && o.push(e);
    n();
  };
})(o.Local || (exports.Local = {}));