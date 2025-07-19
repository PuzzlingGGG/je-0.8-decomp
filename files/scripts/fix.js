"use strict";

const i = e("../../../i18n/i18nMgr");
Array.prototype.includes || Object.defineProperty(Array.prototype, "includes", {
  enumerable: !1,
  value: function (e) {
    return -1 !== this.indexOf(e);
  }
});
cc.Node.prototype.getComponentInParent = function (e) {
  let t,
    o = this;
  for (; !(t = o.getComponent(e)) && (o = o.parent) && !(o instanceof cc.Scene););
  return t;
};
cc.Node.prototype.getComponentsInParent = function (e) {
  let t = [],
    o = this;
  do {
    let i = o.getComponent(e);
    i && t.push(i);
  } while ((o = o.parent) && !(o instanceof cc.Scene));
  return t;
};
(function () {
  if (cc.WXSubContextView) {
    let e = cc.WXSubContextView.prototype.onLoad;
    cc.WXSubContextView.prototype.onLoad = function () {
      this._tex.initWithData(new Uint8Array(new ArrayBuffer(4)), cc.Texture2D.PixelFormat.RGBA8888, 1, 1);
      e.call(this);
    };
  }
})();
(function () {
  let e = Object.getOwnPropertyDescriptor(cc.Label.prototype, "string");
  Object.defineProperty(cc.Label.prototype, "string", {
    get: function () {
      return e.get.call(this);
    },
    set: function (t) {
      e.set.call(this, i.I18nMgr.getI18nStringByZh(t));
    }
  });
})();