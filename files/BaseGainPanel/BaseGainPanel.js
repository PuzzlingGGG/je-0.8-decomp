"use strict";

var i = this && this.__decorate || function (e, t, o, i) {
  var n,
    a = arguments.length,
    s = a < 3 ? t : null === i ? i = Object.getOwnPropertyDescriptor(t, o) : i;
  if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) s = Reflect.decorate(e, t, o, i);else for (var r = e.length - 1; r >= 0; r--) (n = e[r]) && (s = (a < 3 ? n(s) : a > 3 ? n(t, o, s) : n(t, o)) || s);
  return a > 3 && s && Object.defineProperty(t, o, s), s;
};
const n = e("../../Frame/Panel"),
  a = e("../../CustomUI/Button"),
  s = e("../../Frame/TweenUtil"),
  r = e("../../Frame/Sound"),
  {
    ccclass: l,
    menu: c,
    property: d
  } = cc._decorator;
let h = class extends n.default {
  constructor() {
    super(...arguments);
    this.titleLabel = null;
    this.subTitleLabel = null;
    this.lightNode = null;
    this.rewardPos = null;
    this.gainBtn = null;
    this.gainCallback = null;
  }
  onLoad() {
    super.onLoad();
    this.subTitleLabel && (this.subTitleLabel.string = "");
    this.gainBtn.node.on("click", this.onGainBtnTap, this);
    this.initLight();
    r.Sound.play("openGainPanel");
  }
  openAnim(e = null) {
    s.TweenUtil.applyAppear({
      node: this.node,
      callback: e
    });
    s.TweenUtil.applyAppear({
      node: this.rewardPos,
      delay: .25,
      time: .3
    });
    s.TweenUtil.applyAppear({
      node: this.gainBtn.node,
      delay: .25,
      time: .3
    });
  }
  initLight() {
    for (; this.lightNode.childrenCount < 7;) {
      let e = cc.instantiate(this.lightNode.children[0]);
      this.lightNode.addChild(e);
    }
    for (let e = 0; e < 7; e++) {
      let t = this.lightNode.children[e];
      t.angle = 360 * e / 7;
      t.runAction(cc.repeatForever(cc.rotateBy(10, 360)));
    }
  }
  onGainBtnTap() {
    this.gainCallback && this.gainCallback();
    this.closePanel();
  }
};
i([d(cc.Label)], h.prototype, "titleLabel", void 0);
i([d(cc.Label)], h.prototype, "subTitleLabel", void 0);
i([d(cc.Node)], h.prototype, "lightNode", void 0);
i([d(cc.Node)], h.prototype, "rewardPos", void 0);
i([d(a.default)], h.prototype, "gainBtn", void 0);
h = i([l, c("面板/RewardPanel")], h);
exports.default = h;