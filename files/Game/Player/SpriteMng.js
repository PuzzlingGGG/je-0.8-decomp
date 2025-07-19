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
const n = e("../../Frame/Util");
class a {
  constructor() {
    this.propmiseCache = new Map();
    this.cache = new Map();
  }
  loadSpriteFrame(e) {
    return i(this, void 0, void 0, function* () {
      let t = this.cache.get(e);
      if (!t) {
        if (n.Util.isCdnPng(e)) {
          let o = this.propmiseCache.get(e);
          if (!o) {
            o = n.Util.downLoadPng(e);
            this.propmiseCache.set(e, o);
          }
          (t = yield o).getTexture().setFilters(cc.Texture2D.Filter.NEAREST, cc.Texture2D.Filter.NEAREST);
          this.propmiseCache.delete(e);
        } else t = yield n.Util.loadBundleRes("Atlas/" + e, cc.SpriteFrame);
        this.cache.set(e, t);
      }
      t || (t = yield n.Util.loadBundleRes("Atlas/UI/error", cc.SpriteFrame));
      return t;
    });
  }
  setSprite(e, t, o, n = 1.28) {
    return i(this, void 0, void 0, function* () {
      null == t && (t = "UI/error");
      e.type = cc.Sprite.Type.SIMPLE;
      e.sizeMode = cc.Sprite.SizeMode.RAW;
      e.trim = !1;
      if (e) {
        e.spriteFrame = null;
        e.__textureName__ = t;
      }
      let i = yield this.loadSpriteFrame(t);
      if (i && e && e.node) {
        o *= n;
        if (e && e.__textureName__ == t) {
          e.spriteFrame = i;
          e.node.width = e.node.height = Math.ceil(o);
        }
      }
    });
  }
  setTileSprite(e, t, o) {
    return i(this, void 0, void 0, function* () {
      yield this.setSprite(e, t, o);
    });
  }
  setActorSprite(e, t, o) {
    return i(this, void 0, void 0, function* () {
      yield this.setSprite(e, t, o);
    });
  }
  setWeaponSprite(e, t, o) {
    return i(this, void 0, void 0, function* () {
      yield this.setSprite(e, t, o);
    });
  }
  setBullletSprite(e, t, o) {
    return i(this, void 0, void 0, function* () {
      yield this.setSprite(e, t, o);
    });
  }
  setDeviceSprite(e, t, o) {
    return i(this, void 0, void 0, function* () {
      yield this.setSprite(e, t, o);
    });
  }
  setPropSprite(e, t, o) {
    return i(this, void 0, void 0, function* () {
      yield this.setSprite(e, t, o);
    });
  }
  setShopSprite(e, t, o) {
    return i(this, void 0, void 0, function* () {
      yield this.setSprite(e, t, o, 1);
    });
  }
  setRankSprite(e, t, o) {
    return i(this, void 0, void 0, function* () {
      yield this.setSprite(e, t, o);
    });
  }
}
exports.default = a;
a.UPDATE_SPRITE = "UPDATE_SPRITE";