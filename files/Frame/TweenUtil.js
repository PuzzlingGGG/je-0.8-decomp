"use strict";

exports.TweenUtil = exports.Easing = void 0;
const i = e("../../i18n/i18nMgr"),
  n = e("./Util");
(function (e) {
  e.linear = "linear";
  e.quadIn = "quadIn";
  e.quadOut = "quadOut";
  e.quadInOut = "quadInOut";
  e.quadOutIn = "quadOutIn";
  e.cubicIn = "cubicIn";
  e.cubicOut = "cubicOut";
  e.cubicInOut = "cubicInOut";
  e.cubicOutIn = "cubicOutIn";
  e.quartIn = "quartIn";
  e.quartOut = "quartOut";
  e.quartInOut = "quartInOut";
  e.quartOutIn = "quartOutIn";
  e.quintIn = "quintIn";
  e.quintOut = "quintOut";
  e.quintInOut = "quintInOut";
  e.quintOutIn = "quintOutIn";
  e.sineIn = "sineIn";
  e.sineOut = "sineOut";
  e.sineInOut = "sineInOut";
  e.sineOutIn = "sineOutIn";
  e.expoIn = "expoIn";
  e.expoOut = "expoOut";
  e.expoInOut = "expoInOut";
  e.expoOutIn = "expoOutIn";
  e.circIn = "circIn";
  e.circOut = "circOut";
  e.circInOut = "circInOut";
  e.circOutIn = "circOutIn";
  e.elasticIn = "elasticIn";
  e.elasticOut = "elasticOut";
  e.elasticInOut = "elasticInOut";
  e.elasticOutIn = "elasticOutIn";
  e.backIn = "backIn";
  e.backOut = "backOut";
  e.backInOut = "backInOut";
  e.backOutIn = "backOutIn";
  e.bounceIn = "bounceIn";
  e.bounceOut = "bounceOut";
  e.bounceInOut = "bounceInOut";
  e.bounceOutIn = "bounceOutIn";
  e.fade = "fade";
})(o.Easing || (exports.Easing = {}));
(function (e) {
  e.applyBreath = function (e, t = .8, o = 1.1) {
    if (e) return e.runAction(cc.repeatForever(cc.sequence(cc.scaleTo(t, o, o), cc.scaleTo(t, 1, 1))));
  };
  e.applyBubble = function (e) {
    if (e) return e.runAction(cc.repeatForever(cc.sequence(cc.scaleTo(.5, 1.05, .95), cc.scaleTo(1, .95, 1.05), cc.scaleTo(.5, 1, 1))));
  };
  e.applyScaleBounce = function (e, t, o, i = null, n = null) {
    if (e) {
      e.scale = t;
      cc.tween(e).to(.16, {
        scale: o
      }, {
        easing: "backIn"
      }).call(() => {
        i && i();
      }).to(.24, {
        scale: t
      }, {
        easing: "backOut"
      }).call(() => {
        n && n();
      }).start();
    }
  };
  e.applyScaleBounce2 = function (e, t, o, i = null, n = null) {
    if (e) {
      e.scale = t;
      cc.tween(e).to(.3, {
        scale: o
      }, {
        easing: "quadOut"
      }).call(() => {
        i && i();
      }).to(.3, {
        scale: t
      }, {
        easing: "quadIn"
      }).call(() => {
        n && n();
      }).start();
    }
  };
  e.applyAppear = function (e) {
    void 0 === e.fromScale && (e.fromScale = 0);
    void 0 === e.toScale && (e.toScale = 1);
    void 0 === e.delay && (e.delay = 0);
    void 0 === e.time && (e.time = .3);
    e.node.scale = e.fromScale;
    cc.tween(e.node).delay(e.delay).to(e.time, {
      scale: e.toScale
    }, {
      easing: cc.easing.backOut
    }).call(() => {
      e.callback && e.callback();
    }).start();
  };
  e.applyDisappear = function (e) {
    void 0 === e.time && (e.time = .3);
    cc.tween(e.node).to(e.time, {
      scale: 0
    }, {
      easing: "backIn"
    }).call(() => {
      e.callback && e.callback();
    }).start();
  };
  function t(e, t, o = null) {
    if (e.shake) {
      e.shake.stop();
      e.position = e.shakeOriPos;
    }
    let i = t.speed,
      a = t.range,
      s = t.times,
      r = cc.tween(e),
      l = e.position,
      c = e.position;
    l.z = 0;
    c.z = 0;
    for (let e = 0; e < s; e++) {
      let e = cc.v2(n.Util.randomInt(-a, a) + c.x, n.Util.randomInt(-a, a) + c.y),
        t = c.sub(e).mag();
      r.to(t / i, {
        position: e
      });
      c = e;
    }
    let d = c.sub(l).mag();
    r.to(d / i, {
      position: l
    });
    r.call(() => {
      delete e.shake;
      delete e.shakeOriPos;
      o && o();
    });
    r.start();
    e.shake = r;
    e.shakeOriPos = l;
  }
  e.applyShake = t;
  e.applyShakeShort = function (e, o = 3) {
    t(e, {
      speed: 200,
      range: 6,
      times: o
    });
  };
  e.applyFloat = function (e) {
    e.runAction(cc.repeatForever(cc.spawn(cc.sequence(cc.moveBy(.125, 0, 1.2), cc.moveBy(.25, 0, -2.4), cc.moveBy(.125, 0, 1.2)), cc.sequence(cc.rotateBy(.125, 1.5), cc.rotateBy(.25, -3), cc.rotateBy(.125, 1.5)))));
  };
  e.fadeIn = function (e, t = .3, o = null) {
    e.opacity = 0;
    return cc.tween(e).to(t, {
      opacity: 255
    }).call(o).start();
  };
  e.fadeOut = function (e, t = .3, o = null) {
    return cc.tween(e).to(t, {
      opacity: 0
    }).call(o).start();
  };
  e.applayTextAnim = function (e, t, o = .1, n = null) {
    t = i.I18nMgr.getI18nStringByZh(t);
    e.string = "";
    for (let i = 0; i <= t.length; i++) e.scheduleOnce(() => {
      e.string = t.substr(0, i);
      i == t.length && n && n();
    }, i * o);
  };
  e.applayDeleteTextAnim = function (e, t, o = null) {
    e.string = t;
    for (let i = t.length; i >= 0; i--) e.scheduleOnce(() => {
      e.string = t.substr(0, i);
      0 == i && o && o();
    }, .1 * (t.length - i));
  };
})(o.TweenUtil || (exports.TweenUtil = {}));