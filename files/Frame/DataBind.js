"use strict";

exports.DB = void 0;
const i = e("./Local");
(function (e) {
  class t {
    constructor() {
      this.value = null;
      this.listeners = [];
    }
    Invoke(e) {
      let t,
        o = this.listeners.length;
      if (e) {
        t = [];
        for (let e = 0; e < o; e++) t.push(this.listeners[e]);
      } else t = this.listeners;
      for (let e = 0; e < o; e++) t[e](this.value);
    }
  }
  e.Data = t;
  let o,
    n = new Map();
  function a(e, o, i = !0) {
    let a = n.get(e);
    if (!a) {
      a = new t();
      n.set(e, a);
    }
    a.listeners.indexOf(o) <= 0 && a.listeners.push(o);
    i && o(a.value);
  }
  e.Bind = a;
  e.BindRemote = function (e, t) {
    a(e, t);
  };
  e.UnBind = function (e, t) {
    let o = n.get(e);
    if (o) {
      let e = o.listeners.indexOf(t);
      e >= 0 && o.listeners.splice(e, 1);
    }
  };
  e.Set = function (e, o, a = !1) {
    e.startsWith("temp/") || i.Local.Set(e, o);
    let s = n.get(e);
    if (s) {
      s.value = o;
      s.Invoke(a);
    } else {
      (s = new t()).value = o;
      n.set(e, s);
    }
  };
  e.Get = function (e) {
    let t = n.get(e);
    return t ? t.value : null;
  };
  e.Invoke = function (e, t = !1) {
    let o = n.get(e);
    o && o.Invoke(t);
  };
  e.DataBindComponent = class extends cc.Component {
    constructor() {
      super(...arguments);
      this.map = new Map();
    }
    Bind(t, o, i = !0) {
      let n = o.bind(this);
      this.map.set(t, n);
      e.Bind(t, n, i);
    }
    UnBind(t) {
      let o = this.map.get(t);
      if (o) {
        this.map.delete(t);
        e.UnBind(t, o);
      }
    }
    onDestroy() {
      this.map.forEach((t, o) => {
        e.UnBind(o, t);
      });
    }
  };
  o = e.Event || (e.Event = {});
})(o.DB || (exports.DB = {}));