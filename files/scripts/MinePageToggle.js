"use strict";

var i,
  n = this && this.__decorate || function (e, t, o, i) {
    var n,
      a = arguments.length,
      s = a < 3 ? t : null === i ? i = Object.getOwnPropertyDescriptor(t, o) : i;
    if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) s = Reflect.decorate(e, t, o, i);else for (var r = e.length - 1; r >= 0; r--) (n = e[r]) && (s = (a < 3 ? n(s) : a > 3 ? n(t, o, s) : n(t, o)) || s);
    return a > 3 && s && Object.defineProperty(t, o, s), s;
  };
const a = e("../../../CustomUI/Button"),
  s = e("../../../Frame/CrossPlatform"),
  r = e("../../../Game/Player/GuideMng"),
  {
    ccclass: l,
    property: c
  } = cc._decorator;
let d = i = class extends cc.Component {
  constructor() {
    super(...arguments);
    this.bubble = null;
    this.dotNode = null;
  }
  onLoad() {
    this.node.on(a.default.CLICK, this.onClick, this);
    cc.game.on("refreshPasswordDot", this.refreshDot, this);
    this.refreshDot();
  }
  onDestroy() {
    cc.game.off("refreshPasswordDot", this.refreshDot, this);
  }
  onClick() {
    this.bubble.scale = 0;
  }
  onEnable() {
    this.bubble.scale = 0;
    i.ENABEL_TIMES++;
    if (!r.default.Ins.isComplete(r.GuideId.CreateGame) && i.ENABEL_TIMES >= 5) {
      i.ENABEL_TIMES = 0;
      cc.tween(this.bubble).to(.2, {
        scaleX: -1,
        scaleY: 1
      }).start();
    }
  }
  refreshDot() {
    let e = s.crossPlatform.getStorageSync("isSetPassword");
    this.dotNode.active = !e;
  }
};
d.ENABEL_TIMES = -1;
n([c(cc.Node)], d.prototype, "bubble", void 0);
n([c(cc.Node)], d.prototype, "dotNode", void 0);
d = i = n([l], d);
exports.default = d;