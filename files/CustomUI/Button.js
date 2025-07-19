"use strict";

var i = this && this.__decorate || function (e, t, o, i) {
    var n,
      a = arguments.length,
      s = a < 3 ? t : null === i ? i = Object.getOwnPropertyDescriptor(t, o) : i;
    if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) s = Reflect.decorate(e, t, o, i);else for (var r = e.length - 1; r >= 0; r--) (n = e[r]) && (s = (a < 3 ? n(s) : a > 3 ? n(t, o, s) : n(t, o)) || s);
    return a > 3 && s && Object.defineProperty(t, o, s), s;
  },
  n = this && this.__awaiter || function (e, t, o, i) {
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
const a = e("../Frame/Vibrate"),
  s = e("../Frame/Sound"),
  r = e("../Frame/Util"),
  {
    ccclass: l,
    menu: c,
    property: d
  } = cc._decorator;
let h = class extends cc.Button {
  constructor() {
    super(...arguments);
    this.vibrate = !0;
    this.soundName = "clickBtn";
    this.background = null;
    this.icon = null;
    this.label = null;
    this.dot = null;
    this.dotLabel = null;
  }
  onLoad() {
    this.target || (this.target = this.node);
    this.transition == cc.Button.Transition.NONE && (this.transition = cc.Button.Transition.SCALE);
    this.node.on("click", this.onClick, this);
  }
  onClick() {
    s.Sound.play(this.soundName);
    this.vibrate && a.Vibrate.short();
  }
  tempDisable(e) {
    this.interactable = !1;
    setTimeout(() => {
      this.interactable = !0;
    }, e);
  }
  showDot(e) {
    this.dot && (this.dot.active = e);
  }
  setIconUrl(e) {
    return n(this, void 0, void 0, function* () {
      this.icon && e && (this.icon.spriteFrame = yield r.Util.loadBundleRes(e, cc.SpriteFrame));
    });
  }
};
h.CLICK = "click";
i([d], h.prototype, "vibrate", void 0);
i([d], h.prototype, "soundName", void 0);
i([d(cc.Sprite)], h.prototype, "background", void 0);
i([d(cc.Sprite)], h.prototype, "icon", void 0);
i([d(cc.Label)], h.prototype, "label", void 0);
i([d(cc.Node)], h.prototype, "dot", void 0);
i([d(cc.Label)], h.prototype, "dotLabel", void 0);
h = i([l, c("自定义UI/Button")], h);
exports.default = h;