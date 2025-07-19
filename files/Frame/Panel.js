"use strict";

var i = this && this.__decorate || function (e, t, o, i) {
  var n,
    a = arguments.length,
    s = a < 3 ? t : null === i ? i = Object.getOwnPropertyDescriptor(t, o) : i;
  if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) s = Reflect.decorate(e, t, o, i);else for (var r = e.length - 1; r >= 0; r--) (n = e[r]) && (s = (a < 3 ? n(s) : a > 3 ? n(t, o, s) : n(t, o)) || s);
  return a > 3 && s && Object.defineProperty(t, o, s), s;
};
const n = e("./DataBind"),
  a = e("./SceneManager"),
  s = e("../CustomUI/Button"),
  r = e("./TweenUtil"),
  {
    ccclass: l,
    property: c
  } = cc._decorator;
var d;
(function (e) {
  e[e.None = 0] = "None";
  e[e.Normal = 1] = "Normal";
  e[e.MoveUpDown = 2] = "MoveUpDown";
})(d || (d = {}));
let h = class extends n.DB.DataBindComponent {
  constructor() {
    super(...arguments);
    this.autoHidePrePanel = !0;
    this.panelAnimType = d.Normal;
    this.closeBtn = null;
    this.panelStack = null;
    this.panelQueue = null;
    this.closeCallback = null;
  }
  onLoad() {
    this.closeBtn && this.closeBtn.node.on("click", this.onCloseBtnTap, this);
  }
  onDestroy() {
    super.onDestroy();
    this.closeCallback = null;
  }
  closeAnim(e = null) {
    switch (this.panelAnimType) {
      case d.None:
        e && e();
        break;
      case d.Normal:
        cc.tween(this.node).to(.1, {
          opacity: 0
        }).start();
        cc.tween(this.node).to(.15, {
          scale: .8
        }, {
          easing: r.Easing.quadOut
        }).call(e).start();
        break;
      case d.MoveUpDown:
        cc.tween(this.node).to(.2, {
          y: this.node.y - this.node.height
        }, {
          easing: r.Easing.quadOut
        }).call(() => {
          e && e();
        }).start();
    }
  }
  openAnim(e = null) {
    switch (this.panelAnimType) {
      case d.None:
        e && e();
        this.onOpend();
        break;
      case d.Normal:
        this.node.scale = .8;
        this.node.opacity = 0;
        cc.tween(this.node).to(.1, {
          opacity: 255
        }).start();
        cc.tween(this.node).to(.15, {
          scale: 1
        }, {
          easing: r.Easing.backOut
        }).call(() => {
          e && e();
          this.onOpend();
        }).start();
        break;
      case d.MoveUpDown:
        let t = this.node.getComponent(cc.Widget);
        t.bottom = -this.node.height;
        t.updateAlignment();
        cc.tween(this.node).to(.2, {
          y: this.node.y + this.node.height
        }, {
          easing: r.Easing.quadOut
        }).call(() => {
          e && e();
          this.onOpend();
        }).start();
    }
  }
  onOpend() {}
  closePanel() {
    this.panelStack && a.default.ins.popPanel();
    this.panelQueue && this.panelQueue.checkNext();
  }
  onCloseBtnTap() {
    this.closePanel();
  }
};
i([c], h.prototype, "autoHidePrePanel", void 0);
i([c({
  type: cc.Enum(d),
  displayName: "PanelAnimType"
})], h.prototype, "panelAnimType", void 0);
i([c(s.default)], h.prototype, "closeBtn", void 0);
h = i([l], h);
exports.default = h;