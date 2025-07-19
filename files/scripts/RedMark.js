"use strict";

exports.RedMark = void 0;
const i = e("./DataBind");
(function (e) {
  let t = {};
  i.DB.Set("RedMardRoot", t);
  e.setValue = function (e, n) {
    let a = e.split("/"),
      s = t,
      r = [],
      l = [],
      c = "RedMardRoot";
    for (let e = 0; e < a.length; e++) {
      if (e == a.length - 1) {
        s[a[e]] = n;
        for (let e = r.length - 1; e >= 0; e--) i.DB.Set(l[e], o(r[e]));
        return;
      }
      void 0 === s[a[e]] && (s[a[e]] = {});
      s = s[a[e]];
      r.push(s);
      c += "/" + a[e];
      l.push(c);
    }
  };
  function o(e) {
    let t = Object.keys(e);
    for (let i = 0; i < t.length; i++) {
      let n = e[t[i]];
      if (n.constructor == Object) return o(n);
      if (n) return !0;
    }
    return !1;
  }
})(o.RedMark || (exports.RedMark = {}));