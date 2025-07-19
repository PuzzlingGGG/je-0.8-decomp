"use strict";

exports.TilePhysics = void 0;
const i = e("../../Frame/FightSystem"),
  n = e("../../Frame/Util"),
  a = e("./Tile"),
  s = cc.v2(),
  r = (cc.v2(), cc.v3());
exports.TilePhysics = class {
  constructor() {
    this._acenter = new cc.Vec2();
    this._arect = new cc.Rect();
    this._testRect = new cc.Rect();
    this._out = new cc.Rect();
    this._geomAabb = new cc.geomUtils.Aabb();
    this._geomObb = new cc.geomUtils.Obb();
    this._aworldMatrix = new cc.Mat4();
  }
  Init(e) {
    this._tiledMap = e;
    this._canvas = cc.director.getScene().getComponentInChildren(cc.Canvas);
  }
  GetBodyById(e) {
    return this._worldBodys.find(t => t.id == e);
  }
  Step(e) {
    if (!this._tiledMap) return;
    this._worldBodys = e;
    let t = e.length;
    for (let o = 0; o < t; ++o) {
      let t = e[o];
      if (t.ignoreTile || null == t.collider || !t.collider.enabled || !t.collider.node.active) continue;
      let l = t.getPhyPos();
      t.node.getWorldMatrix(this._aworldMatrix);
      let c,
        d,
        h,
        p,
        u = this._aworldMatrix.getScale(r),
        m = Math.ceil(t.node.width * u.x),
        f = Math.ceil(t.node.height * u.y),
        g = Math.ceil(t.boundingBoxExtInTiledPhysics.width * u.x),
        y = Math.ceil(t.boundingBoxExtInTiledPhysics.height * u.y),
        v = Math.ceil(t.boundingBoxExtInTiledPhysics.x * u.x),
        C = Math.ceil(t.boundingBoxExtInTiledPhysics.y * u.y),
        _ = this._arect,
        S = l.x - t.node.x,
        I = l.y - t.node.y;
      if (t.onBlockedByTile || !t.useObb) {
        c = t.node.x - m * t.node.anchorX + v;
        d = t.node.y - f * t.node.anchorY + C;
        h = l.x - m * t.node.anchorX + v;
        p = l.y - f * t.node.anchorY + C;
        _.x = c;
        _.y = d;
        _.width = m + g;
        _.height = f + y;
      } else {
        let e = t.node.getBoundingBoxToWorld();
        h = c = e.x - this._canvas.node.position.x;
        p = d = e.y - this._canvas.node.position.y;
        _.x = c;
        _.y = d;
        _.width = e.width;
        _.height = e.height;
      }
      _.x = Math.round(_.x);
      _.y = Math.round(_.y);
      this._acenter.x = _.xMin + .5 * _.width;
      this._acenter.y = _.yMin + .5 * _.height;
      let G = this._testRect;
      G.x = h < c ? h : c;
      G.y = p < d ? p : d;
      G.width = _.width + Math.abs(h - c);
      G.height = _.height + Math.abs(p - d);
      let T = G.x,
        b = G.y,
        M = Math.floor(G.x / a.default.SIZE),
        P = Math.floor(G.y / a.default.SIZE),
        D = Math.floor((G.x + G.width) / a.default.SIZE),
        w = Math.floor((G.y + G.height) / a.default.SIZE),
        B = !1,
        R = this._out;
      for (let e = P; e <= w; ++e) for (let o = M; o <= D; ++o) {
        let a = this._tiledMap.getTiles(o, e);
        for (let e of a) {
          if (!e || !e.node.active) continue;
          let o = e.tileRect;
          if (e.block) {
            if (n.Util.rectRect(o, G)) {
              e.intersection(R, G);
              if (R.width <= 0 && R.height <= 0) continue;
              if (!t.onBlockedByTile && t.useObb && e.canDestroy) {
                s.x = t.node.x;
                s.y = t.node.y;
                t.node.parent.convertToWorldSpaceAR(s, s);
                s.subSelf(this._canvas.node.position);
                let e = cc.geomUtils.Aabb.set(this._geomAabb, .5 * (o.xMin + o.xMax), .5 * (o.yMin + o.yMax), 0, .5 * o.width, .5 * o.height, 0),
                  i = cc.geomUtils.Obb.set(this._geomObb, s.x, s.y, 0, .5 * m, .5 * f, 0, t.node.right.x, t.node.right.y, t.node.right.z, t.node.up.x, t.node.up.y, t.node.up.z, t.node.forward.x, t.node.forward.y, t.node.forward.z);
                if (cc.geomUtils.intersect.aabb_obb(e, i) <= 0) continue;
              }
              i.FightSystem.doCollisionTile(t.node, e.node);
              t.doCollisionTile && t.doCollisionTile(e.node);
              if (!t.onBlockedByTile) continue;
              let n = G.x,
                a = G.y,
                r = cc.Vec2.subtract(s, _.center, o.center),
                l = Math.abs(r.x) - Math.abs(r.y),
                c = (o.width - o.height) / 2;
              if (l >= c) if (r.x < 0) {
                if (_.xMin < o.xMax && (o.yMin <= _.yMin && _.yMin < o.yMax || o.yMin < _.yMax && _.yMax <= o.yMax || o.yMin >= _.yMin && _.yMax >= o.yMax)) {
                  let t = !1;
                  if (Math.abs(S) > 1 && Math.abs(S) > Math.abs(I)) {
                    let o = this.checkSlope({
                      x: 1,
                      y: 0
                    }, e, _, R);
                    t = 0 != o;
                    a += o;
                  }
                  t || (R.width >= o.width ? n = o.xMin - G.width : n -= R.width);
                }
              } else if (r.x > 0 && o.xMin < _.xMax && (o.yMin <= _.yMin && _.yMin < o.yMax || o.yMin < _.yMax && _.yMax <= o.yMax || o.yMin >= _.yMin && _.yMax >= o.yMax)) {
                let t = !1;
                if (Math.abs(S) > 1 && Math.abs(S) > Math.abs(I)) {
                  let o = this.checkSlope({
                    x: -1,
                    y: 0
                  }, e, _, R);
                  t = 0 != o;
                  a += o;
                }
                t || (R.width >= o.width ? n = o.xMax : n += R.width);
              }
              if (l <= c) if (r.y < 0) {
                if (_.yMin < o.yMax && (o.xMin <= _.xMin && _.xMin < o.xMax || o.xMin < _.xMax && _.xMax <= o.xMax || o.xMin >= _.xMin && _.xMax >= o.xMax)) {
                  let i = !1;
                  if (!t.useGravity && Math.abs(I) > 1 && Math.abs(I) > Math.abs(S)) {
                    let t = this.checkSlope({
                      x: 0,
                      y: 1
                    }, e, _, R);
                    i = 0 != t;
                    n += t;
                  }
                  i || (R.height >= o.height ? a = o.yMin - G.height : a -= R.height);
                }
              } else if (r.y > 0 && o.yMin < _.yMax && (o.xMin <= _.xMin && _.xMin < o.xMax || o.xMin < _.xMax && _.xMax <= o.xMax || o.xMin >= _.xMin && _.xMax >= o.xMax)) {
                let i = !1;
                if (!t.useGravity && Math.abs(I) > 1 && Math.abs(I) > Math.abs(S)) {
                  let t = this.checkSlope({
                    x: 0,
                    y: -1
                  }, e, _, R);
                  i = 0 != t;
                  n += t;
                }
                i || (R.height >= o.height ? a = o.yMax : a += R.height);
              }
              G.x = n;
              G.y = a;
              B = !0;
            }
          } else {
            e.canDamage && t.onDamageByTile && n.Util.rectRect(o, G) && e.giveDamage(t);
            if (e.canFall && t.onFallFromTile) {
              let i = this._acenter.x - 2,
                n = this._acenter.x + 2,
                a = this._acenter.y - 2,
                s = this._acenter.y + 2;
              i > o.xMin && n < o.xMax && a > o.yMin && s < o.yMax && e.giveFallDamage(t);
            }
          }
        }
      }
      if (B && t.onBlockedByTile) {
        let e = G.x - T,
          o = G.y - b;
        0 == e && 0 == o || t.onBlockedByTile({
          moveBackX: e,
          moveBackY: o
        });
      }
    }
  }
  checkSlope(e, t, o, i) {
    if (!t) return 0;
    let n = t.getSlope();
    if (0 == n || !(i.height > 0 && i.width < 10 && i.width / i.height >= 1)) return 0;
    let a = t.tileRect,
      s = t.iCol,
      r = t.iRow,
      l = 0;
    if (0 != e.x) {
      if (e.x * n > 0) {
        console.log("moveUp");
        if (o.yMax >= a.yMin) {
          let e = this._tiledMap.getTiles(s, r + 1),
            t = !1;
          for (let o of e) o.block && (t = !0);
          t || (l += i.height);
        } else {
          let e = this._tiledMap.getTiles(s, r - 1),
            t = !1;
          for (let o of e) o.block && (t = !0);
          t || (l -= i.height);
        }
      } else {
        console.log("moveDown");
        if (o.yMin > a.yMax) {
          let e = this._tiledMap.getTiles(s, r + 1),
            t = !1;
          for (let o of e) if (o.block) {
            t = !0;
            break;
          }
          t || (l += i.height);
        } else {
          let e = this._tiledMap.getTiles(s, r - 1),
            t = !1;
          for (let o of e) if (o.block) {
            t = !0;
            break;
          }
          t || (l -= i.height);
        }
      }
    } else if (0 != e.y) if (e.y * n > 0) {
      console.log("moveRight");
      if (o.xMax >= a.xMin) {
        let e = this._tiledMap.getTiles(s + 1, r),
          t = !1;
        for (let o of e) o.block && (t = !0);
        t || (l += i.width);
      } else {
        let e = this._tiledMap.getTiles(s - 1, r),
          t = !1;
        for (let o of e) o.block && (t = !0);
        t || (l -= i.width);
      }
    } else {
      console.log("moveLeft");
      if (o.xMin > a.xMax) {
        let e = this._tiledMap.getTiles(s + 1, r),
          t = !1;
        for (let o of e) o.block && (t = !0);
        t || (l += i.width);
      } else {
        let e = this._tiledMap.getTiles(s - 1, r),
          t = !1;
        for (let o of e) o.block && (t = !0);
        t || (l -= i.width);
      }
    }
    console.log("ts>>", l);
    return l;
  }
};