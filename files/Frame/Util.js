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
exports.Util = void 0;
const n = e("../../i18n/i18nMgr"),
  a = e("../../scripts/_autogen/cmd/cmd"),
  s = e("../../scripts/_autogen/data/data"),
  r = e("../Game/GameEnv"),
  l = e("../Game/Hortor"),
  c = e("./CrossPlatform"),
  d = e("./NetworkMgr"),
  h = e("./Top");
(function (e) {
  let t = new Map();
  e.loadBundleRes = function (e, n) {
    return i(this, void 0, void 0, function* () {
      let i = t.get(e);
      if (i) return i;
      let a = yield o("localBundle");
      if (a.getInfoWithPath(e)) i = yield p(a, e, n);else {
        let t = yield o("remoteBundle");
        i = yield p(t, e, n);
      }
      t.set(e, i);
      return i;
    });
  };
  function o(e) {
    return new Promise((t, o) => {
      cc.assetManager.loadBundle(e, (e, i) => {
        if (e) {
          console.error(e);
          o();
        } else t(i);
      });
    });
  }
  function p(e, t, o) {
    return new Promise(i => {
      e.load(t, o, (e, t) => {
        e && console.log(e);
        i(t);
      });
    });
  }
  e.rawUrl = function (e) {
    var t = cc.url.raw(e);
    cc.loader.md5Pipe && (t = cc.loader.md5Pipe.transformURL(t));
    return t;
  };
  e.enableAllCollider = function (e) {
    let t = e.getComponents(cc.Collider);
    for (let e = 0; e < t.length; e++) t[e].enabled = !0;
  };
  e.disableAllCollider = function (e) {
    let t = e.getComponents(cc.Collider);
    for (let e = 0; e < t.length; e++) t[e].enabled = !1;
  };
  e.getTimeStamp = function () {
    return new Date().getTime();
  };
  e.customEvent = function (e, t = !0, o = null) {
    let i = new cc.Event.EventCustom("", !1);
    i.type = e;
    i.bubbles = t;
    i.detail = o;
    return i;
  };
  function u(e) {
    if (0 == e.x && 0 == e.y) return 0;
    let t = e.angle(cc.Vec2.RIGHT);
    e.y < 0 && (t = 2 * Math.PI - t);
    return t;
  }
  e.radian = u;
  e.angle = function (e) {
    return 180 * u(e) / Math.PI;
  };
  function m(e) {
    return cc.v2(Math.cos(e), Math.sin(e));
  }
  e.radToVec2 = m;
  e.angleToVec2 = function (e) {
    return m(f(e));
  };
  function f(e) {
    return Math.PI * e / 180;
  }
  e.angleToRad = f;
  e.setAnchor = function (e, t, o) {
    let i = (t - e.anchorX) * e.width,
      n = (o - e.anchorY) * e.height;
    e.x += i;
    e.y += n;
    for (let t = 0; t < e.childrenCount; t++) {
      let o = e.children[t];
      exports.x -= i;
      exports.y -= n;
    }
    e.anchorX = t;
    e.anchorY = o;
  };
  function g(e) {
    return Math.floor(Math.random() * e);
  }
  e.randomIdx = g;
  e.randomInt = function (e, t) {
    return Math.round(Math.random() * (t - e)) + e;
  };
  e.randomFloat = function (e, t) {
    return Math.random() * (t - e) + e;
  };
  function y(e, t, o = !1) {
    let i = e.toFixed(t);
    if (o) {
      let e = i.indexOf(".");
      if (-1 == e) i = i + "." + "0".repeat(t);else if (i.length - e < t) {
        let o = t - (i.length - e);
        i += "0".repeat(o);
      }
    }
    return i;
  }
  e.fixedNum = y;
  e.bigNumStr = function (e) {
    return e > 1e4 ? y(e / 1e4, 1) + n.I18nMgr.getI18nStringByZh("万") : e;
  };
  e.parseLeftTime = function (e) {
    let t = "",
      o = Math.floor(e / 60 / 60),
      i = Math.floor(e / 60 % 60),
      n = Math.floor(e % 60);
    return t = o > 24 ? `${o / 24}天${o %= 24}小时${i}分` : o > 0 ? `${o}小时${i}分${n}秒` : i > 0 ? `${i}分${n}秒` : `${n}秒`;
  };
  e.parseTimeHHMMSS = function (e) {
    let t = Math.floor(e / 1e3 / 60 / 60),
      o = Math.floor(e / 1e3 / 60 % 60),
      i = Math.floor(e / 1e3 % 60),
      n = "";
    n += ("0" + t).substr(-2) + ":";
    return (n += ("0" + o).substr(-2) + ":") + ("0" + i).substr(-2);
  };
  e.parseDateHHMM = function (e) {
    let t = new Date(e),
      o = t.getHours(),
      i = t.getMinutes(),
      n = "";
    return (n += ("0" + o).substr(-2) + ":") + ("0" + i).substr(-2);
  };
  e.parseDateMMDD = function (e) {
    let t = new Date(e),
      o = t.getMonth() + 1,
      i = t.getDate(),
      a = "";
    return (a += ("0" + o).substr(-2) + n.I18nMgr.getI18nStringByZh("月")) + (("0" + i).substr(-2) + n.I18nMgr.getI18nStringByZh("日"));
  };
  e.parseDateMMSS = function (e) {
    let t = new Date(e),
      o = t.getMinutes(),
      i = t.getSeconds(),
      a = "";
    return (a += ("0" + o).substr(-2) + n.I18nMgr.getI18nStringByZh("分")) + (("0" + i).substr(-2) + n.I18nMgr.getI18nStringByZh("秒"));
  };
  e.parseDateYMDHM = function (e) {
    let t = new Date(e),
      o = t.getFullYear(),
      i = t.getMonth() + 1,
      n = t.getDate(),
      a = t.getHours(),
      s = t.getMinutes(),
      r = "";
    r += o;
    r += "-" + ("0" + i).substr(-2);
    r += "-" + ("0" + n).substr(-2);
    r += " ";
    return (r += ("0" + a).substr(-2) + ":") + ("0" + s).substr(-2);
  };
  e.parseDateMDHM = function (e) {
    let t = new Date(e),
      o = t.getMonth() + 1,
      i = t.getDate(),
      n = t.getHours(),
      a = t.getMinutes(),
      s = "";
    s += ("0" + o).substr(-2);
    s += "-" + ("0" + i).substr(-2);
    s += " ";
    return (s += ("0" + n).substr(-2) + ":") + ("0" + a).substr(-2);
  };
  e.parseDataString = function (t) {
    t = t || 0;
    if (e.isToday(t)) {
      let e = orange.TimeUtil.serverTime - t,
        o = Math.floor(e / 1e3 / 60 / 60),
        i = Math.floor(e / 1e3 / 60 % 60),
        a = Math.floor(e / 1e3 % 60);
      return o > 0 ? o + n.I18nMgr.getI18nStringByZh("小时前") : i > 0 ? i + n.I18nMgr.getI18nStringByZh("分钟前") : a > 5 ? a + n.I18nMgr.getI18nStringByZh("秒前") : n.I18nMgr.getI18nStringByZh("刚刚");
    }
    return e.isYestoday(t) ? n.I18nMgr.getI18nStringByZh("昨天") + e.parseDateHM(t) : e.parseDateMDHM(t);
  };
  e.parseDateHM = function (e) {
    let t = new Date(e),
      o = t.getHours(),
      i = t.getMinutes(),
      n = "";
    return (n += ("0" + o).substr(-2) + ":") + ("0" + i).substr(-2);
  };
  e.toChineseNum = function (e) {
    return "零一双三四五六七八九十"[e];
  };
  e.toMagnitudeNum = function (e) {
    let t = 0;
    for (; e >= 1e3;) {
      e /= 1e3;
      t++;
    }
    return 0 == t ? e.toString() : e.toFixed(1) + ["", "k", "m", "g", "t", "p", "e", "z", "y"][t];
  };
  e.clampStr = function (e, t, o = "...") {
    t *= 2;
    for (var i = function (e) {
        for (var t = [], o = 0, i = 0, n = 0; n < e.length;) {
          var a = n;
          if (65039 != (o = e.charCodeAt(n++))) if (i) {
            var s = 65536 + (i - 55296 << 10) + (o - 56320);
            t.push({
              v: s,
              pos: a
            });
            i = 0;
          } else 55296 <= o && o <= 56319 ? i = o : t.push({
            v: o,
            pos: a
          });
        }
        return t;
      }(e), n = 0, a = 0, s = 0; s < i.length; ++s) {
      var r = 1;
      i[s].v >= 128 && (r = 2);
      if (n + r > t) break;
      a = s;
      n += r;
    }
    if (i.length - 1 == a) return e;
    var l = o ? 1 : 0;
    return a - l >= 0 && a - l < i.length ? e.substring(0, i[a - l].pos + 1) + o : e;
  };
  function v(e, t, o) {
    return (t - e) * o + e;
  }
  e.lerp = v;
  function C(e, t, o) {
    return v(e, t, o = S(o));
  }
  e.lerp01 = C;
  function _(e, t, o) {
    return Math.min(Math.max(e, t), o);
  }
  e.clamp = _;
  function S(e) {
    return Math.min(Math.max(e, 0), 1);
  }
  e.clamp01 = S;
  e.sign = function (e) {
    return e > 0 ? 1 : e < 0 ? -1 : 0;
  };
  e.move = function (e, t, o) {
    return Math.abs(t - e) > o ? e < t ? e + o : e - o : t;
  };
  e.shuffle = function (e) {
    for (let t = e.length - 1; t > 0; t--) {
      let o = g(t),
        i = e[t];
      e[t] = e[o];
      e[o] = i;
    }
  };
  e.lerpVec2 = function (e, t, o) {
    let i = v(e.x, t.x, o),
      n = v(e.y, t.y, o);
    return cc.v2(i, n);
  };
  e.lerpVec201 = function (e, t, o) {
    let i = C(e.x, t.x, o),
      n = C(e.y, t.y, o);
    return cc.v2(i, n);
  };
  e.moveVec2 = function (e, t, o) {
    let i = t.sub(e);
    if (i.magSqr() > o * o) {
      i.normalize(i);
      i.mulSelf(o);
      return i.addSelf(e);
    }
    return t;
  };
  function I(e, t, o = cc.Vec2.ZERO) {
    if (!e || !t) return cc.Vec2.ZERO;
    let i = cc.v2();
    e.convertToWorldSpaceAR(o, i);
    i.x = i.x || 0;
    i.y = i.y || 0;
    t.convertToNodeSpaceAR(i, i);
    return i;
  }
  e.convertPosition = I;
  e.moveToNewParent = function (e, t) {
    let o = I(e, t);
    e.removeFromParent(!1);
    t.addChild(e);
    e.position = o;
  };
  e.searchChild = function e(t, o) {
    for (let i = 0; i < t.childrenCount; i++) {
      let n = t.children[i];
      if (n.name == o) return n;
      {
        let t = e(n, o);
        if (t) return t;
      }
    }
  };
  e.emitAllChild = function (e, t) {
    if (!e) return;
    let o = e => {
      e.emit(t);
      for (let t = 0; t < e.childrenCount; t++) o(e.children[t]);
    };
    o(e);
  };
  e.moveNode = function (e, t) {
    let o = cc.v2();
    e.convertToWorldSpaceAR(cc.Vec2.ZERO, o);
    t.convertToNodeSpaceAR(o, o);
    e.parent && e.removeFromParent(!1);
    t.addChild(e);
    e.position = o;
  };
  function G(e) {
    let t = e.getBoundingBoxToWorld(),
      o = cc.view._devicePixelRatio,
      i = cc.view.getScaleX() / o,
      n = cc.v2(t.x, t.y);
    cc.view._convertPointWithScale(n);
    return {
      left: t.x * i,
      top: c.systemInfo.screenHeight - (t.y + t.height) * i,
      width: t.width * i,
      height: t.height * i
    };
  }
  e.convertToWindowSpace = G;
  e.convertToCocosSpace = function (e) {
    let t = cc.view._devicePixelRatio,
      o = cc.view.getScaleX() / t,
      i = e.width / o,
      n = e.height / o;
    return {
      x: e.left / o,
      y: ((c.systemInfo.screenHeight || 667) - e.top) / o - e.height,
      width: i,
      height: n
    };
  };
  e.setColorMat = function (e) {
    let t = t => {
        let o = e.getComponentsInChildren(cc.Sprite).concat(e.getComponents(cc.Sprite));
        for (let e = 0; e < o.length; e++) o[e].setMaterial(0, t);
      },
      o = e._material_;
    o ? t(o) : cc.loader.loadRes("materials/gray-sprite", cc.Material, function (o, i) {
      var n = cc.Material.getInstantiatedMaterial(i, e);
      t(n);
    });
  };
  e.compareSDKVersion = function (e) {
    return !c.systemInfo || T(c.systemInfo.SDKVersion, e) >= 0;
  };
  function T(e, t) {
    let o = e.split("."),
      i = t.split(".");
    for (let e = 0; e < o.length; e++) {
      let t = parseFloat(o[e]),
        n = parseFloat(i[e]);
      if (t < n) return -1;
      if (t > n) return 1;
    }
    return 0;
  }
  e.compareVersion = T;
  e.nextVersion = function (e) {
    let t = (e = b(e)).split("."),
      o = [];
    for (let e = 0; e < t.length; e++) {
      let i = parseFloat(t[e]) || 0;
      i = Math.max(i, 0);
      o.push(i);
    }
    o[2]++;
    for (let e = t.length - 1; e >= 0; e--) if (o[e] > 9 && e - 1 >= 0) {
      o[e - 1]++;
      exports.e = 0;
    }
    return o.join(".");
  };
  function b(e) {
    if (!e) return "0.0.1";
    let t = e.split("."),
      o = [];
    for (let e = 0; e < t.length; e++) {
      let i = parseFloat(t[e]) || 0;
      i = _(i, 0, 99);
      o.push(i);
    }
    for (; o.length < 3;) o.push(0);
    return o.join(".");
  }
  e.parseVersion = b;
  e.compareAppName = function (e) {
    return e == c.systemInfo.appName;
  };
  e.newSprite = function (e) {
    let t = new cc.Node().addComponent(cc.Sprite);
    cc.loader.loadRes(e, cc.SpriteFrame, (e, o) => {
      t.spriteFrame = o;
    });
    return t;
  };
  e.addOpenContentIn = function (e, t) {
    let o = new cc.Node();
    e.addChild(o);
    exports.width = e.width;
    exports.height = e.height;
    c.crossPlatform.getOpenDataContext().postMessage(t);
    return null;
  };
  e.screenShotToTexture = function (e) {
    let t = new cc.Node();
    t.parent = e;
    let o = t.addComponent(cc.Camera);
    exports.cullingMask = 4294967295;
    let i = new cc.RenderTexture(),
      n = cc.game._renderContext;
    i.initWithSize(e.width, e.height, n.STENCIL_INDEX8);
    exports.targetTexture = i;
    exports.alignWithScreen = !1;
    exports.orthoSize = e.height / 2;
    o.render();
    t.removeFromParent();
    return i;
  };
  e.screenShotToTempFilePath = function (e) {
    return new Promise(t => {
      if (c.crossPlatform.isDebug) {
        setTimeout(() => {
          t("");
        }, 100);
        return;
      }
      let o = cc.game.canvas,
        i = o.width / o.clientWidth,
        n = G(e);
      n.left *= i;
      n.top *= i;
      n.width *= i;
      n.height *= i;
      console.log("style", n);
      o.toTempFilePath({
        x: n.left,
        y: n.top,
        width: n.width,
        height: n.height,
        success: e => {
          console.log("res", e);
          t(e.tempFilePath);
        },
        fail: () => {
          t("");
        }
      });
    });
  };
  e.chromeTxt = function (e, t) {
    var o = document.createElement("a");
    o.setAttribute("href", "data:text/plain;charset=utf-8," + encodeURIComponent(t));
    o.setAttribute("download", e);
    o.style.display = "none";
    document.body.appendChild(o);
    o.click();
    document.body.removeChild(o);
  };
  e.toQueryStr = function (e) {
    if (!e) return "";
    let t = "";
    for (let o in e) {
      let i = e[o];
      t += "object" == typeof i ? `${o}=${JSON.stringify(i)}&` : `${o}=${i}&`;
    }
    t.endsWith("&") && (t = t.slice(0, t.length - 1));
    return t;
  };
  let M,
    P = null,
    D = null;
  e.initCcKeyBoard = function (e) {
    (D = e) && D.node.on("editing-did-ended", e => {
      M && M({
        value: e.string
      });
      M = null;
    });
  };
  e.showKeyBoard = function (e, t) {
    c.crossPlatform.showKeyboard({
      defaultValue: e,
      maxLength: 20,
      multiple: !1,
      confirmHold: !0,
      confirmType: "done",
      complete: e => {
        console.log(e);
      }
    });
    P && c.crossPlatform.offKeyboardConfirm(P);
    P = e => {
      console.log("onConfirm", e);
      t(e.value);
      c.crossPlatform.offKeyboardConfirm(P);
      P = null;
      c.crossPlatform.hideKeyboard({});
    };
    if (l.Hortor.isMiniGame()) c.crossPlatform.onKeyboardConfirm(P);else if (D) {
      D.string = e;
      let t = D._impl;
      if (t && t.beginEditing) {
        t.beginEditing();
        M = P;
      } else P("");
    }
  };
  e.hideKeyBoard = function () {
    if (P) {
      c.crossPlatform.offKeyboardConfirm(P);
      P = null;
    }
    c.crossPlatform.hideKeyboard({});
  };
  e.enCodeHtml = function (e) {
    return (e = (e = (e = (e = (e = (e = e.replace(/%/g, "%25")).replace(/\+/g, "%2B")).replace(/\//g, "%2F")).replace(/\?/g, "%3F")).replace(/\#/g, "%23")).replace(/\&/g, "%26")).replace(/\=/g, "%3d");
  };
  e.isAndroid = function () {
    return !c.systemInfo || c.systemInfo.system.startsWith("Android");
  };
  e.isIOS = function () {
    return !c.systemInfo || c.systemInfo.system.startsWith("iOS");
  };
  e.isWindows = function () {
    return !c.systemInfo || c.systemInfo.system.startsWith("Windows");
  };
  e.isMacOS = function () {
    return !c.systemInfo || c.systemInfo.system.startsWith("macOS");
  };
  e.useTimeline = !1;
  e.canShareTimeLine = function () {
    return e.isAndroid() && e.compareSDKVersion("2.12.0") && e.useTimeline;
  };
  e.isToday = function (e) {
    let t = new Date(e),
      o = orange.TimeUtil.serverTime,
      i = new Date(o);
    return t.setHours(0, 0, 0, 0) == i.setHours(0, 0, 0, 0);
  };
  e.isYestoday = function (e) {
    let t = new Date(e),
      o = new Date(orange.TimeUtil.serverTime);
    return t.setHours(0, 0, 0, 0) == o.setHours(0, 0, 0, 0) - 864e5;
  };
  e.saveImageToPhotosAlbum = function () {};
  e.updateLabel = function (e) {
    e && e._forceUpdateRenderData(!0);
  };
  e.updateWidget = function (e) {
    var t;
    null === (t = e.getComponent(cc.Widget)) || void 0 === t || t.updateAlignment();
  };
  e.updateAllWidget = function (e) {
    let t = [],
      o = (e, i) => {
        null == t[i] && (t[i] = []);
        let n = t[i],
          a = e.getComponent(cc.Widget);
        a && n.push(a);
        for (let t = 0; t < e.childrenCount; t++) o(e.children[t], i + 1);
      };
    o(e, 0);
    let i = [];
    for (let e = 0; e < t.length; e++) {
      let o = t[e];
      for (let e = 0; e < o.length; e++) i.push(o[e]);
    }
    for (let e = 0; e < i.length; e++) i[e].updateAlignment();
  };
  e.updateLayout = function (e) {
    var t;
    null === (t = e.getComponent(cc.Layout)) || void 0 === t || t.updateLayout();
  };
  e.updateAllLayout = function (e) {
    let t = [],
      o = (e, i) => {
        null == t[i] && (t[i] = []);
        let n = t[i],
          a = e.getComponent(cc.Layout);
        a && n.push(a);
        for (let t = 0; t < e.childrenCount; t++) o(e.children[t], i + 1);
      };
    o(e, 0);
    let i = [];
    for (let e = 0; e < t.length; e++) {
      let o = t[e];
      for (let e = 0; e < o.length; e++) i.push(o[e]);
    }
    for (let e = i.length - 1; e >= 0; e--) i[e].updateLayout();
  };
  e.flowLayout = function (e, t, o) {
    let i = e.children[0];
    if (!i) return;
    let n = i.height,
      a = 0,
      s = -n / 2;
    for (let r = 0; r < e.children.length; r++) if ((i = e.children[r]).active) {
      if (a + i.width > e.width) {
        s -= o + n;
        a = 0;
      }
      i.x = a + i.width / 2;
      i.y = s;
      a += i.width + t;
    }
    s -= n / 2;
    e.height = -s;
    for (let t = 0; t < e.children.length; t++) {
      (i = e.children[t]).x -= e.width / 2;
      i.y += e.height / 2;
    }
  };
  e.compressPixels = function (e) {
    const t = lz4.compress(e);
    console.log("pako原大小：" + e.length + ",压缩后大小：" + t.length + ",压缩比：" + t.length / e.length);
    return t;
  };
  e.decompressionPixels = function (e) {
    try {
      return lz4.decompress(e);
    } catch (e) {
      console.log(e);
      return null;
    }
  };
  e.makeBro = function (e, t, o = null) {
    let i = e.parent;
    for (; i.childrenCount < t;) {
      let t = cc.instantiate(e);
      i.addChild(t);
    }
    for (let e = 0; e < i.childrenCount; e++) {
      let n = i.children[e];
      if (e < t) {
        n.active = !0;
        o && o(n, e);
      } else n.active = !1;
    }
  };
  e.rectRect = function (e, t) {
    var o = e.x,
      i = e.y,
      n = e.x + e.width,
      a = e.y + e.height,
      s = t.x,
      r = t.y,
      l = t.x + t.width,
      c = t.y + t.height;
    let d = .001;
    return o < l - d && n - d > s && i < c - d && a - d > r;
  };
  e.deepCopy = function e(t, o = null) {
    if (null == t || NaN === t || "object" != typeof t) return t;
    null == o && (o = t.constructor === Array ? [] : t.constructor === Uint8Array ? new Uint8Array() : {});
    let i = Object.getOwnPropertyNames(t);
    for (let n = 0; n < i.length; n++) {
      let a = i[n];
      exports.a = e(t[a]);
    }
    return o;
  };
  e.deepCompare = function e(t, o) {
    if (null == t || null == o) return !(t !== o);
    if ("number" == typeof t && isNaN(t)) return !("number" != typeof o || !isNaN(o));
    if ("number" == typeof o && isNaN(o)) return !("number" != typeof t || !isNaN(t));
    if ("object" == typeof t && "object" == typeof o) {
      let i = Object.getOwnPropertyNames(t),
        n = Object.getOwnPropertyNames(o);
      if (i.length != n.length) return !1;
      if (t.constructor == o.constructor) {
        let n = !0;
        for (let a = 0; a < i.length; a++) {
          let s = i[a];
          if (!e(t[s], o[s])) {
            n = !1;
            break;
          }
        }
        return n;
      }
      return !1;
    }
    return !(t !== o);
  };
  e.getEnumKeys = function (e) {
    let t = [];
    for (var o in e) {
      var i = o;
      isNaN(i) && t.push(i);
    }
    return t;
  };
  e.getEnumValues = function (e) {
    let t = [];
    for (var o in e) {
      var i = o;
      isNaN(i) && t.push(e[i]);
    }
    return t;
  };
  e.getNoteRight = function (e) {
    let t = e.right,
      o = e;
    do {
      o.scaleX < 0 && (t.x = -t.x);
      o = o.parent;
    } while (o.parent);
    return cc.v2(t.x, t.y);
  };
  e.strBytesLen = function (e) {
    for (var t = 0, o = 0, i = e.length; o < i; o++) {
      var n = e.charCodeAt(o);
      t += n >= 1 && n <= 126 || 65376 <= n && n <= 65439 ? 1 : 2;
    }
    return t;
  };
  e.zip = function (e) {
    return lz4.compress(bon.encode(e));
  };
  e.unzip = function (e) {
    return bon.decode(lz4.decompress(e));
  };
  e.makeSpriteFrameByPixel = function (t, o, i) {
    let n = e.decompressionPixels(t),
      a = new cc.RenderTexture();
    a.setFilters(cc.Texture2D.Filter.NEAREST, cc.Texture2D.Filter.NEAREST);
    a.initWithData(n, cc.Texture2D.PixelFormat.RGBA8888, o, i);
    return new cc.SpriteFrame(a);
  };
  e.isPixels = function (e) {
    return (e = e || "icon").indexOf("pixel/") >= 0;
  };
  e.dotLabelString = function (e) {
    return e > 99 ? "99+" : "" + e;
  };
  e.isAlphaPixels = function (e) {
    if (!e) return !0;
    let t = Math.floor(e.length / 4);
    for (let o = 0; o < t; o++) if (0 != e[4 * o + 3]) return !1;
    return !0;
  };
  e.isCdnPng = function (e) {
    return (e = e || "icon").indexOf("pixel/") >= 0;
  };
  e.getPixelTirmBounds = function (e, t, o) {
    let i = (e, t) => 4 * (256 * (256 - t - 1) + e);
    return {
      ymin: (() => {
        for (let n = 0; n < o; n++) for (let o = 0; o < t; o++) {
          let t = i(o, n);
          if (0 != e[t + 3]) return n;
        }
      })(),
      ymax: (() => {
        for (let n = o - 1; n >= 0; n--) for (let o = 0; o < t; o++) {
          let t = i(o, n);
          if (0 != e[t + 3]) return n;
        }
      })(),
      xmin: (() => {
        for (let n = 0; n < t; n++) for (let t = 0; t < o; t++) {
          let o = i(n, t);
          if (0 != e[o + 3]) return n;
        }
      })(),
      xmax: (() => {
        for (let n = t - 1; n >= 0; n--) for (let t = 0; t < o; t++) {
          let o = i(n, t);
          if (0 != e[o + 3]) return n;
        }
      })()
    };
  };
  e.bounds2OffsetAndSize = function (e) {
    let t = e.xmax - e.xmin,
      o = e.ymax - e.ymin;
    t *= .32;
    o *= .32;
    let i = (e.xmin + e.xmax) / 2 - 128,
      n = (e.ymin + e.ymax) / 2 - 128;
    return {
      offset: {
        x: i *= .32,
        y: n *= .32
      },
      size: {
        w: t,
        h: o
      }
    };
  };
  e.uploadBin = function (e) {
    return i(this, void 0, void 0, function* () {
      return e;
    });
  };
  e.downLoadBin = function (e) {
    return i(this, void 0, void 0, function* () {
      return new Promise(t => {
        cc.loader.load({
          url: r.gameEnv.fileCDN + e,
          type: "bin"
        }, (e, o) => {
          t(e ? null : new Uint8Array(o));
        });
      });
    });
  };
  e.uploadPng = function (e, t, o) {
    return i(this, void 0, void 0, function* () {
      if (!e) return;
      let i = pnglite.encode({
          width: 256,
          height: 256,
          data: e
        }),
        n = {
          imageFileType: t,
          content: i,
          imgThumbs: [],
          checkImgSec: !0,
          useWechat: !1,
          sensitiveName: o
        },
        s = yield d.NetIns.SendCmdAsync({
          cmd: a.CMDS.Game_UploadImage,
          params: n
        }, a.Game_RUploadImage);
      return {
        err: s ? s.reason : "error",
        url: s ? s.url : ""
      };
    });
  };
  e.releaseLoadedPng = function (e) {
    cc.loader.release(r.gameEnv.fileCDN + e);
  };
  e.downLoadPng = function (e) {
    return i(this, void 0, void 0, function* () {
      return new Promise(t => {
        cc.loader.load({
          url: r.gameEnv.fileCDN + e,
          type: "png"
        }, (e, o) => {
          if (e) t(null);else {
            let e = new cc.SpriteFrame(o);
            t(e);
          }
        });
      });
    });
  };
  e.downloadPngPixel = function (t) {
    return i(this, void 0, void 0, function* () {
      let o = yield e.downLoadBin(t);
      if (!o) {
        console.warn(">>downloadPngPixel error, urlPath=", t);
        return null;
      }
      return png.decode(o).data;
    });
  };
  e.downloadTxt = function (e, t) {
    var o = document.createElement("a");
    o.setAttribute("href", "data:text/plain;charset=utf-8," + encodeURIComponent(t));
    o.setAttribute("download", e);
    o.style.display = "none";
    document.body.appendChild(o);
    o.click();
    document.body.removeChild(o);
  };
  e.getDefaultNameNum = function (e, t) {
    if (0 == t.length || !e || "" == e) return 1;
    let o = [];
    for (let i of t) {
      let t = i.indexOf(e);
      if (t < 0) continue;
      let n = parseFloat(i.substr(t + 2));
      Number.isNaN(n) || o.push(n);
    }
    o.sort((e, t) => e - t);
    let i = o.length,
      n = 0;
    for (let e = 0; e < i && !(o[e] - n > 1); ++e) n = o[e];
    return n + 1;
  };
  e.mergeImage = function (t) {
    return i(this, void 0, void 0, function* () {
      let o = t.length,
        i = 0;
      for (; o > i * i;) i++;
      let l = 128 * i,
        c = new Uint8Array(l * l * 4);
      for (let o = 0; o < i; o++) for (let a = 0; a < i; a++) {
        let s = o * i + a,
          r = t[s];
        if (!r) continue;
        h.default.showLoading(n.I18nMgr.exceI18nStringByZh("打包图集(${idx + 1}/${urls.length})", [{
          paramName: "idx + 1",
          param: s + 1
        }, {
          paramName: "urls.length",
          param: t.length
        }]));
        let d = yield e.downloadPngPixel(r);
        if (d) for (let e = 0; e < 256; e += 2) for (let t = 0; t < 256; t += 2) {
          let i = 4 * ((128 * o + e / 2) * l + 128 * a + t / 2),
            n = 4 * (256 * e + t);
          c[i] = d[n];
          c[i + 1] = d[n + 1];
          c[i + 2] = d[n + 2];
          c[i + 3] = d[n + 3];
        }
      }
      let p = pnglite.encode({
          width: l,
          height: l,
          data: c
        }),
        u = {
          imageFileType: s.ImageFileType.actor,
          content: p,
          imgThumbs: [],
          checkImgSec: !1,
          useWechat: !1,
          sensitiveName: ""
        };
      h.default.showLoading("上传图集");
      let m = yield d.NetIns.SendCmdAsync({
        cmd: a.CMDS.Game_UploadImage,
        params: u
      }, a.Game_RUploadImage);
      console.log(r.gameEnv.fileCDN + m.url);
      return m.url;
    });
  };
  e.once = function (e, t = 0) {
    return i(this, void 0, void 0, function* () {
      return new Promise(o => {
        cc.game.once(e, e => {
          t ? setTimeout(() => {
            o(e);
          }, 1e3 * t) : o(e);
        }, this);
      });
    });
  };
  e.delay = function (e = 0) {
    return i(this, void 0, void 0, function* () {
      return new Promise(t => {
        setTimeout(t, 1e3 * e);
      });
    });
  };
})(o.Util || (exports.Util = {}));