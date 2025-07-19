"use strict";

const i = window.b2;
class n {
  constructor() {
    this._aabb = null;
    this._point = new i.Vec2();
    this._isPoint = !1;
    this._fixtures = [];
  }
  init(e, t) {
    this._aabb = e;
    if (t) {
      this._isPoint = !0;
      this._point.x = t.x;
      this._point.y = t.y;
    } else this._isPoint = !1;
    this._fixtures.length = 0;
  }
  ReportFixture(e) {
    if (this._isPoint) e.TestPoint(this._point) && this._fixtures.push(e);else {
      for (var t = !1, o = e.GetShape().GetChildCount(), n = 0; n < o; n++) {
        var a = e.GetAABB(n);
        if (i.TestOverlapAABB(this._aabb, a)) {
          t = !0;
          break;
        }
      }
      t && this._fixtures.push(e);
    }
    return !0;
  }
  getFixture() {
    return this._fixtures[0];
  }
  getFixtures() {
    return this._fixtures;
  }
}
exports.default = n;
var a = new i.AABB(),
  s = new i.Vec2(),
  r = new n();
cc.PhysicsManager.prototype.testPoint2 = function (e) {
  const t = cc.PhysicsManager.PTM_RATIO;
  var o = s.x = e.x / t,
    i = s.y = e.y / t,
    n = .2 / t;
  a.lowerBound.x = o - n;
  a.lowerBound.y = i - n;
  a.upperBound.x = o + n;
  a.upperBound.y = i + n;
  var l = r;
  l.init(a, s);
  this._world.QueryAABB(l, a);
  return l.getFixtures().map(function (e) {
    return e.collider;
  });
};
cc.PhysicsManager.prototype.testAABB2 = function (e) {
  const t = cc.PhysicsManager.PTM_RATIO;
  a.lowerBound.x = e.xMin / t;
  a.lowerBound.y = e.yMin / t;
  a.upperBound.x = e.xMax / t;
  a.upperBound.y = e.yMax / t;
  var o = r;
  o.init(a);
  this._world.QueryAABB(o, a);
  return o.getFixtures().map(function (e) {
    return e.collider;
  });
};