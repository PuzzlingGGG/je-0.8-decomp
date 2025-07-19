"use strict";

exports.WorldRpgCameraFollower = void 0;
const i = e("../../../Frame/Util");
exports.WorldRpgCameraFollower = class {
  constructor() {
    this._target = null;
    this._boundBox = null;
    this._moveNode = null;
    this._camera = null;
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
  }
  doFollow() {
    if (!this._target || !this._camera) return;
    let e = i.Util.convertPosition(this._target, this._moveNode.parent);
    this._moveNode.x = i.Util.lerp(this._moveNode.x, e.x, .2);
    this._moveNode.x = i.Util.clamp(this._moveNode.x, 0, this._boundBox.width);
    this._moveNode.y = i.Util.lerp(this._moveNode.y, e.y, .2);
    this._moveNode.y = i.Util.clamp(this._moveNode.y, 0, this._boundBox.height);
  }
};