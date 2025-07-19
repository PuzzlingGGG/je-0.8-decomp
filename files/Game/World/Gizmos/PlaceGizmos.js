"use strict";

var i,
  n = this && this.__decorate || function (e, t, o, i) {
    var n,
      a = arguments.length,
      s = a < 3 ? t : null === i ? i = Object.getOwnPropertyDescriptor(t, o) : i;
    if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) s = Reflect.decorate(e, t, o, i);else for (var r = e.length - 1; r >= 0; r--) (n = e[r]) && (s = (a < 3 ? n(s) : a > 3 ? n(t, o, s) : n(t, o)) || s);
    return a > 3 && s && Object.defineProperty(t, o, s), s;
  };
exports.CanPlaceType = void 0;
const a = e("../../../CustomUI/Button"),
  s = e("../Tile"),
  r = e("../TiledMap"),
  l = e("../TouchWorldCtrl"),
  {
    ccclass: c,
    property: d
  } = cc._decorator;
var h;
(function (e) {
  e[e.EmptySpace = 1] = "EmptySpace";
  e[e.DecorateTile = 2] = "DecorateTile";
  e[e.BlockTile = 4] = "BlockTile";
  e[e.All = 7] = "All";
})(h = o.CanPlaceType || (exports.CanPlaceType = {}));
let p = i = class extends cc.Component {
  constructor() {
    super(...arguments);
    this.touchNode = null;
    this.confirmBtn = null;
    this.cancelBtn = null;
    this.rotateBtn = null;
    this.flipXBtn = null;
    this.camera = null;
    this.tiledMap = null;
    this.data = null;
    this.rotateIdx = 0;
  }
  onLoad() {
    this.confirmBtn.node.on(a.default.CLICK, this.onConfirmBtnTap, this);
    this.cancelBtn.node.on(a.default.CLICK, this.onCancelBtnTap, this);
    this.rotateBtn.node.on(a.default.CLICK, this.onRotateBtnTap, this);
    this.flipXBtn.node.on(a.default.CLICK, this.onFlipXBtn, this);
    this.touchNode.on(cc.Node.EventType.TOUCH_MOVE, this.onTouchMove6, this);
    this.touchNode.on(cc.Node.EventType.TOUCH_END, this.onTouchEnd, this);
  }
  setScale(e) {
    this.touchNode.scale = e || 1;
  }
  onTouchEnd(e) {
    let t = this.touchToGrid(e);
    e.getLocation().sub(e.getStartLocation()).magSqr() < 100 && cc.game.emit(l.default.CLICK_WORLD, t);
  }
  onTouchMove6(e) {
    let t = this.touchToGrid(e),
      o = this.touchNode.scale,
      i = t.iCol - Math.floor(.5 * o),
      n = t.iRow - Math.floor(.5 * o),
      a = t.iCol + Math.floor(.5 * o),
      r = t.iRow + Math.floor(.5 * o),
      l = !0;
    for (let e = n; e <= r; ++e) {
      for (let t = i; t <= a; ++t) {
        let o = !0,
          i = this.tiledMap.getTile(t, e);
        if (i) {
          this.data.canPlaceType & h.BlockTile && i.block && (o = !1);
          this.data.canPlaceType & h.DecorateTile && (i.block || (o = !1));
          let e = i.data.layerIdx || 0;
          this.data.canPlaceType & h.EmptySpace && e != this.data.layerIdx && (o = !1);
        } else this.data.canPlaceType & h.EmptySpace && (o = !1);
        if (o) {
          l = !1;
          break;
        }
      }
      if (!l) break;
    }
    if (l) {
      let e = (t.iCol + .5) * s.default.SIZE,
        o = (t.iRow + .5) * s.default.SIZE,
        i = cc.v2(e, o);
      this.node.position = i;
      this.data.target ? this.data.target.position = i : this.data.body.SetPosition(i.x, i.y);
    }
  }
  touchToGrid(e) {
    let t = e.getLocation();
    this.camera.getScreenToWorldPoint(t, t);
    this.node.parent.convertToNodeSpaceAR(t, t);
    let o = Math.floor(t.x / s.default.SIZE),
      i = Math.floor(t.y / s.default.SIZE);
    return {
      x: t.x,
      y: t.y,
      iCol: o,
      iRow: i
    };
  }
  onConfirmBtnTap() {
    this.hide();
    this.data.onConfirm && this.data.onConfirm();
    this.data.onComplete && this.data.onComplete();
    cc.game.emit(i.PlaceGizmos_Confirm);
  }
  onCancelBtnTap() {
    this.hide();
    this.data.onCancel && this.data.onCancel();
    this.data.onComplete && this.data.onComplete();
  }
  onRotateBtnTap() {
    this.rotateIdx++;
    let e = this.data.target ? this.data.target : this.data.body.node,
      t = this.data.rotateArr,
      o = this.rotateIdx % t.length;
    e.angle = t[o];
    this.data.onRotate && this.data.onRotate(o, e.angle);
  }
  onFlipXBtn() {
    this.data.onFlipX && this.data.onFlipX();
  }
  show(e) {
    this.node.active && cc.game.emit(i.PlaceGizmos_Confirm);
    this.touchNode.scale = e.scale || 1;
    this.data = e;
    this.rotateIdx = 0;
    this.node.active = !0;
    let t = this.data.target ? this.data.target : this.data.body.node;
    this.node.x = t.x;
    this.node.y = t.y;
    if (e.rotateArr && e.rotateArr.length > 0) {
      this.rotateBtn.node.active = !0;
      this.rotateIdx = e.rotateIdx || 0;
    } else this.rotateBtn.node.active = !1;
    this.flipXBtn.node.active = !!e.showFlipX;
    this.cancelBtn.node.active = !e.noCancel;
    cc.game.emit(i.PlaceGizmos_Show, this);
  }
  hide() {
    this.node.active = !1;
  }
};
p.PlaceGizmos_Show = "PlaceGizmos_Show";
p.PlaceGizmos_Confirm = "PlaceGizmos_Confirm";
n([d(cc.Node)], p.prototype, "touchNode", void 0);
n([d(a.default)], p.prototype, "confirmBtn", void 0);
n([d(a.default)], p.prototype, "cancelBtn", void 0);
n([d(a.default)], p.prototype, "rotateBtn", void 0);
n([d(a.default)], p.prototype, "flipXBtn", void 0);
n([d(cc.Camera)], p.prototype, "camera", void 0);
n([d(r.default)], p.prototype, "tiledMap", void 0);
p = i = n([c], p);
exports.default = p;