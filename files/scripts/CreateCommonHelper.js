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
exports.CreateCommonHelper = void 0;
exports.CreateCommonHelper = class {
  constructor() {
    this.conf = null;
    this.isDirty = !1;
  }
  createConf(e) {
    return i(this, void 0, void 0, function* () {
      this.params = e;
      this.conf = yield this.buildConf();
      return this.conf;
    });
  }
  paintCall(e) {
    e.toPaintTile();
  }
};