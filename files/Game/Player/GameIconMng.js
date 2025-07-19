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
exports.GameIconMng = void 0;
const n = e("../../Frame/Util");
class a {
  constructor() {
    this.cache = new Map();
    this.promiseCache = new Map();
    this.defaultIcon = null;
  }
  setSprite(e, t, o) {
    return i(this, void 0, void 0, function* () {
      e && (e.spriteFrame = null);
      let i = yield this.getSF(t);
      if (i && e && e.node) {
        e.spriteFrame = i;
        e.node.width = e.node.height = o;
      }
    });
  }
  getSF(e) {
    return i(this, void 0, void 0, function* () {
      let t = this.cache.get(e);
      if (!t) {
        if (n.Util.isCdnPng(e)) {
          let o = this.promiseCache.get(e);
          if (!o) {
            o = n.Util.downLoadPng(e);
            this.promiseCache.set(e, o);
          }
          t = yield o;
          this.promiseCache.delete(e);
          t && this.cache.set(e, t);
          if (this.cache.size > 100) {
            let e = this.cache.keys().next().value;
            this.cache.get(e);
          }
        }
        if (!t) {
          this.defaultIcon || (this.defaultIcon = yield n.Util.loadBundleRes("Atlas/GameIcon/icon1", cc.SpriteFrame));
          t = this.defaultIcon;
        }
      }
      return t;
    });
  }
}
exports.GameIconMng = a;
a.Ins = new a();