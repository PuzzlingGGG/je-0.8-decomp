"use strict";

var i = this && this.__decorate || function (e, t, o, i) {
  var n,
    a = arguments.length,
    s = a < 3 ? t : null === i ? i = Object.getOwnPropertyDescriptor(t, o) : i;
  if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) s = Reflect.decorate(e, t, o, i);else for (var r = e.length - 1; r >= 0; r--) (n = e[r]) && (s = (a < 3 ? n(s) : a > 3 ? n(t, o, s) : n(t, o)) || s);
  return a > 3 && s && Object.defineProperty(t, o, s), s;
};
const n = e("../../CustomUI/Button"),
  a = e("../../Frame/SceneManager"),
  s = e("../../Frame/TweenUtil"),
  {
    ccclass: r,
    property: l
  } = cc._decorator;
let c = class extends n.default {
  constructor() {
    super(...arguments);
    this.bubble = null;
    this.bubbleLabel = null;
  }
  onLoad() {
    this.bubble.scale = 0;
    this.dot.active = !1;
    this.node.on(n.default.CLICK, this.onBtn, this);
  }
  showBubble(e, t) {
    this.label.string = e;
    this.bubble.scale = 0;
    cc.tween(this.bubble).delay(.5).to(.5, {
      scaleX: -1,
      scaleY: -1
    }, {
      easing: s.Easing.backOut
    }).delay(t).to(.5, {
      scaleX: 0,
      scaleY: 0
    }).start();
  }
  onBtn() {
    a.default.ins.OpenPanelByName("TaskListPanel");
  }
};
i([l(cc.Node)], c.prototype, "bubble", void 0);
i([l(cc.Label)], c.prototype, "bubbleLabel", void 0);
c = i([r], c);
exports.default = c;