"use strict";

var i = this && this.__decorate || function (e, t, o, i) {
  var n,
    a = arguments.length,
    s = a < 3 ? t : null === i ? i = Object.getOwnPropertyDescriptor(t, o) : i;
  if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) s = Reflect.decorate(e, t, o, i);else for (var r = e.length - 1; r >= 0; r--) (n = e[r]) && (s = (a < 3 ? n(s) : a > 3 ? n(t, o, s) : n(t, o)) || s);
  return a > 3 && s && Object.defineProperty(t, o, s), s;
};
exports.GraphicsSelectBoxState = void 0;
const n = e("../../Frame/Util"),
  {
    ccclass: a,
    property: s
  } = cc._decorator;
var r;
(function (e) {
  e[e.resize = 0] = "resize";
  e[e.move = 1] = "move";
})(r = o.GraphicsSelectBoxState || (exports.GraphicsSelectBoxState = {}));
let l = class extends cc.Component {
  constructor() {
    super(...arguments);
    this.sprite = null;
    this.graphics = null;
    this.leftDown = null;
    this.rightDown = null;
    this.leftTop = null;
    this.rightTop = null;
    this.srcX = 0;
    this.srcY = 0;
    this.srcW = 0;
    this.srcH = 0;
    this.state = r.resize;
    this.pixels = null;
    this.pixelsW = 0;
    this.pixelsH = 0;
    this.scaledPixels = null;
    this.scaledW = 0;
    this.scaledH = 0;
    this.parentScale = 1;
    this.parentWidth = 256;
    this.parentHeight = 256;
    this.anchorPos = null;
  }
  onLoad() {
    this.leftDown.on(cc.Node.EventType.TOUCH_START, this.onTouchCorrnerStart, this);
    this.leftDown.on(cc.Node.EventType.TOUCH_MOVE, this.onTouchCorrnerMove, this);
    this.leftDown.on(cc.Node.EventType.TOUCH_END, this.onTouchCorrnerMove, this);
    this.rightDown.on(cc.Node.EventType.TOUCH_START, this.onTouchCorrnerStart, this);
    this.rightDown.on(cc.Node.EventType.TOUCH_MOVE, this.onTouchCorrnerMove, this);
    this.rightDown.on(cc.Node.EventType.TOUCH_END, this.onTouchCorrnerMove, this);
    this.leftTop.on(cc.Node.EventType.TOUCH_START, this.onTouchCorrnerStart, this);
    this.leftTop.on(cc.Node.EventType.TOUCH_MOVE, this.onTouchCorrnerMove, this);
    this.leftTop.on(cc.Node.EventType.TOUCH_END, this.onTouchCorrnerMove, this);
    this.rightTop.on(cc.Node.EventType.TOUCH_START, this.onTouchCorrnerStart, this);
    this.rightTop.on(cc.Node.EventType.TOUCH_MOVE, this.onTouchCorrnerMove, this);
    this.rightTop.on(cc.Node.EventType.TOUCH_END, this.onTouchCorrnerMove, this);
  }
  onTouchCorrnerStart(e) {
    let t = null;
    e.target == this.leftDown && (t = this.rightTop);
    e.target == this.rightTop && (t = this.leftDown);
    e.target == this.rightDown && (t = this.leftTop);
    e.target == this.leftTop && (t = this.rightDown);
    let o = n.Util.convertPosition(t, this.node.parent);
    exports.x = Math.floor(o.x);
    exports.y = Math.floor(o.y);
    this.anchorPos = o;
    e.stopPropagation();
    this.refreshGrashice();
  }
  onTouchCorrnerMove(e) {
    let t = e.getPreviousLocation();
    this.node.parent.convertToNodeSpaceAR(t, t);
    t.x = Math.floor(t.x);
    t.y = Math.floor(t.y);
    if (!this.pixels) {
      cc.game.emit("cutPixelsToSelectBox", !0);
      this.clearSrc = !0;
    }
    this.dragSize(this.anchorPos, t);
    this.node.width === this.scaledW && this.node.height != this.scaledH || this.updateScalePixles();
    e.stopPropagation();
    this.refreshGrashice();
  }
  dragSize(e, t) {
    let o = Math.min(e.x, t.x),
      i = Math.max(e.x, t.x),
      n = Math.min(e.y, t.y),
      a = Math.max(e.y, t.y);
    o = Math.max(o, 0);
    i = Math.min(i, this.parentWidth);
    n = Math.max(n, 0);
    a = Math.min(a, this.parentHeight);
    this.node.x = o;
    this.node.y = n;
    this.node.width = i - o;
    this.node.height = a - n;
  }
  saveSrcPosSize() {
    this.srcX = this.node.x;
    this.srcY = this.node.y;
    this.srcW = this.node.width;
    this.srcH = this.node.height;
  }
  setParentScale(e) {
    this.parentScale = e;
    let t = t => {
      let o = 4 / e,
        i = -o * t.width;
      t.scale = o;
      let n = t.getComponent(cc.Widget);
      n.left = i;
      n.right = i;
      n.top = i;
      n.bottom = i;
    };
    t(this.leftTop);
    t(this.leftDown);
    t(this.rightTop);
    t(this.rightDown);
  }
  setParentSize(e, t) {
    this.parentWidth = e;
    this.parentHeight = t;
  }
  setOriPixels(e, t, o) {
    this.pixels = e;
    this.pixelsW = t;
    this.pixelsH = o;
    this.displayPixels(e, t, o);
  }
  updateScalePixles() {
    let e = this.node.width,
      t = this.node.height,
      o = new Uint8Array(e * t * 4);
    for (let i = 0; i < e; i++) for (let n = 0; n < t; n++) {
      let a = Math.floor(i * this.srcW / e),
        s = 4 * (Math.floor(n * this.srcH / t) * this.srcW + a),
        r = 4 * (n * e + i);
      exports.r = this.pixels[s];
      o[r + 1] = this.pixels[s + 1];
      o[r + 2] = this.pixels[s + 2];
      o[r + 3] = this.pixels[s + 3];
    }
    this.scaledPixels = o;
    this.scaledW = e;
    this.scaledH = t;
    this.displayPixels(o, e, t);
  }
  displayPixels(e, t, o) {
    let i = e,
      n = new cc.RenderTexture();
    n.setFilters(cc.Texture2D.Filter.NEAREST, cc.Texture2D.Filter.NEAREST);
    let a = cc.game._renderContext;
    n.initWithSize(t, o, a.STENCIL_INDEX8);
    n.initWithData(i, cc.Texture2D.PixelFormat.RGBA8888, t, o);
    this.sprite.spriteFrame = new cc.SpriteFrame();
    this.sprite.spriteFrame.setTexture(n);
  }
  clearPixels() {
    this.pixels = null;
    this.scaledPixels = null;
    this.sprite.spriteFrame = null;
  }
  refreshGrashice() {
    let e = 20 / this.parentScale,
      t = 4 / this.parentScale,
      o = this.graphics;
    exports.lineWidth = t;
    o.clear();
    exports.fillColor = exports.strokeColor = cc.Color.BLACK;
    let i = this.node.width,
      n = this.node.height;
    for (let a = 0; a < i; a += 2 * e) {
      let s = Math.min(a + e, i);
      o.moveTo(a, -t / 2);
      o.lineTo(s, -t / 2);
      o.stroke();
      o.moveTo(a, n + t / 2);
      o.lineTo(s, n + t / 2);
      o.stroke();
    }
    for (let a = 0; a < n; a += 2 * e) {
      let s = Math.min(a + e, n);
      o.moveTo(-t / 2, a);
      o.lineTo(-t / 2, s);
      o.stroke();
      o.moveTo(i + t / 2, a);
      o.lineTo(i + t / 2, s);
      o.stroke();
    }
  }
};
i([s(cc.Sprite)], l.prototype, "sprite", void 0);
i([s(cc.Graphics)], l.prototype, "graphics", void 0);
i([s(cc.Node)], l.prototype, "leftDown", void 0);
i([s(cc.Node)], l.prototype, "rightDown", void 0);
i([s(cc.Node)], l.prototype, "leftTop", void 0);
i([s(cc.Node)], l.prototype, "rightTop", void 0);
l = i([a], l);
exports.default = l;