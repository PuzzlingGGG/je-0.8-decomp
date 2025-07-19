"use strict";

exports.WorldJumpCameraFollower = void 0;
const i = e("../../../Frame/Util");
exports.WorldJumpCameraFollower = class {
  constructor() {
    this._target = null;
    this._boundBox = null;
    this._moveNode = null;
    this._camera = null;
    this._lerpy = .01;
    this._targetLerpy = 1;
    this._yoffset = 0;
    this._lastChangeY = 0;
    this._state = 0;
  }
  setCamera(e, t, o) {
    this._camera = e;
    this._moveNode = t;
    this._boundBox = o;
  }
  setTarget(e) {
    this._target = e;
  }
  centerOnTarget() {
    let e = i.Util.convertPosition(this._target, this._moveNode.parent);
    this._moveNode.position = e;
    this._state = -1;
  }
  doFollow() {
    if (!this._target || !this._camera) return;
    let e = i.Util.convertPosition(this._target, this._moveNode.parent);
    this._moveNode.x = i.Util.lerp(this._moveNode.x, e.x, .2);
    this._moveNode.x = i.Util.clamp(this._moveNode.x, 0, this._boundBox.width);
    let t = this._state,
      o = 300 / this._camera.zoomRatio;
    if (this._moveNode.y + 300 < e.y) {
      this._targetLerpy = .2;
      this._yoffset = 20 - o;
      t = 1;
    } else if (this._moveNode.y - o > e.y) {
      this._targetLerpy = .2;
      this._yoffset = o - 20;
      t = 2;
    } else {
      this._targetLerpy = .01;
      this._yoffset = 0;
      t = 0;
    }
    if (t != this._state) {
      this._state = t;
      let o = e.y + this._yoffset - this._moveNode.y;
      this._lerpy = 0 != o ? this._lastChangeY / o : this._targetLerpy;
    }
    this._lerpy = i.Util.lerp(this._lerpy, this._targetLerpy, .1);
    let n = i.Util.lerp(this._moveNode.y, e.y + this._yoffset, this._lerpy);
    this._lastChangeY = n - this._moveNode.y;
    this._moveNode.y = n;
    this._moveNode.y = i.Util.clamp(this._moveNode.y, 0, this._boundBox.height);
  }
};