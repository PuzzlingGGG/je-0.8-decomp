"use strict";

var i,
  n = this && this.__decorate || function (e, t, o, i) {
    var n,
      a = arguments.length,
      s = a < 3 ? t : null === i ? i = Object.getOwnPropertyDescriptor(t, o) : i;
    if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) s = Reflect.decorate(e, t, o, i);else for (var r = e.length - 1; r >= 0; r--) (n = e[r]) && (s = (a < 3 ? n(s) : a > 3 ? n(t, o, s) : n(t, o)) || s);
    return a > 3 && s && Object.defineProperty(t, o, s), s;
  };
const a = e("../../Frame/TweenUtil"),
  s = e("../../Frame/Util"),
  {
    ccclass: r,
    property: l
  } = cc._decorator;
let c = i = class extends cc.Component {
  constructor() {
    super(...arguments);
    this.camera = null;
    this.boundBox = null;
    this.distance = 0;
    this.zoomChange = 0;
  }
  onEnable() {
    this.node.on(cc.Node.EventType.TOUCH_MOVE, this.onTouchMove3, this);
    this.node.on(cc.Node.EventType.MOUSE_WHEEL, this.onMouseWheel, this);
  }
  onDisable() {
    this.node.off(cc.Node.EventType.TOUCH_MOVE, this.onTouchMove3, this);
    this.node.off(cc.Node.EventType.MOUSE_WHEEL, this.onMouseWheel, this);
  }
  setCamera(e, t) {
    this.camera = e;
    this.boundBox = t;
    this.setZoom(e.zoomRatio);
  }
  onTouchMove3(e) {
    if (!this.camera || !this.boundBox) return;
    let t = e.getTouches();
    if (1 == t.length) {
      let t = e.getDelta();
      this.camera.node.x -= t.x / this.camera.zoomRatio;
      this.camera.node.y -= t.y / this.camera.zoomRatio;
      this.clampCamera();
      this.distance += t.mag();
      if (this.distance > 300) {
        this.distance = 0;
        cc.game.emit(i.CAMERA_DRAG);
      }
    } else if (2 == t.length) {
      let e = t[0],
        o = t[1],
        i = e.getLocation().sub(e.getDelta()),
        n = o.getLocation().sub(o.getDelta()),
        a = i.sub(n).mag(),
        s = e.getLocation().sub(o.getLocation()).mag();
      this.setZoom(this.camera.zoomRatio * s / a);
    }
  }
  onMouseWheel(e) {
    if (this.camera && this.boundBox && "mousewheel" == e.type) {
      let t = e.getScrollY();
      this.setZoom(this.camera.zoomRatio + t / 720);
    }
  }
  clampCamera() {
    if (this.camera && this.boundBox) {
      this.camera.node.x = s.Util.clamp(this.camera.node.x, 0, this.boundBox.width);
      this.camera.node.y = s.Util.clamp(this.camera.node.y, 0, this.boundBox.height);
    }
  }
  setZoom(e) {
    if (this.camera && this.boundBox) {
      e <= 1 && cc.game.emit(i.CAMERA_ZOOM_MIN);
      e >= 3 && cc.game.emit(i.CAMERA_ZOOM_MAX);
      e = s.Util.clamp(e, .5, 4);
      this.camera.zoomRatio = e;
      this.node.emit("ZOOM_CHANGE", e);
    }
  }
  centerOn(e) {
    let t = s.Util.convertPosition(e, this.camera.node.parent);
    cc.tween(this.camera.node).to(.2, {
      position: t
    }, {
      easing: a.Easing.quadOut
    }).start();
  }
};
c.ZOOM_CHANGE = "ZOOM_CHANGE";
c.CAMERA_DRAG = "CAMERA_DRAG";
c.CAMERA_ZOOM_MIN = "CAMERA_ZOOM_MIN";
c.CAMERA_ZOOM_MAX = "CAMERA_ZOOM_MAX";
n([l(cc.Camera)], c.prototype, "camera", void 0);
n([l(cc.Node)], c.prototype, "boundBox", void 0);
c = i = n([r], c);
exports.default = c;