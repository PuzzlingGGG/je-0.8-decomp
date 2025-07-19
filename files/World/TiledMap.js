"use strict";

var i = this && this.__decorate || function (e, t, o, i) {
  var n,
    a = arguments.length,
    s = a < 3 ? t : null === i ? i = Object.getOwnPropertyDescriptor(t, o) : i;
  if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) s = Reflect.decorate(e, t, o, i);else for (var r = e.length - 1; r >= 0; r--) (n = e[r]) && (s = (a < 3 ? n(s) : a > 3 ? n(t, o, s) : n(t, o)) || s);
  return a > 3 && s && Object.defineProperty(t, o, s), s;
};
const n = e("../../Frame/Pool"),
  a = e("../../Frame/Top"),
  s = e("../../GameData/GameTypeDefine"),
  r = e("./Tile"),
  {
    ccclass: l,
    property: c
  } = cc._decorator;
let d = class extends cc.Component {
  constructor() {
    super(...arguments);
    this.nCol = 0;
    this.nRow = 0;
    this.leftWall = null;
    this.rightWall = null;
    this.topWall = null;
    this.bottomWall = null;
    this.tilePool = null;
    this.tileLayers = [];
    this._selectedLayerIdx = 0;
    this._tileLayerVisableMask = -1;
    this._tileLayerGrids = [];
    this._tmpP1 = new cc.Vec2();
    this._tmpP2 = new cc.Vec2();
  }
  get selectedLayerIdx() {
    return this._selectedLayerIdx;
  }
  set selectedLayerIdx(e) {
    this._selectedLayerIdx = e;
  }
  canPlaceTile(e, t) {
    if (!e) return !1;
    null == e.tilePhyType && (e.tilePhyType = s.TilePhysicType.Block);
    if (e.tilePhyType != s.TilePhysicType.Block && e.tilePhyType != s.TilePhysicType.Destroy && e.tilePhyType != s.TilePhysicType.Pass && this.tileLayers.length > 1 && this._selectedLayerIdx == this.tileLayers.length - 1) {
      t && a.default.showToast(`顶层不能摆放${r.default.getTilePhyTypeName(e.tilePhyType)}地块`);
      return !1;
    }
    return !0;
  }
  setLayerVisable(e, t) {
    t ? this._tileLayerVisableMask |= 1 << e : this._tileLayerVisableMask &= ~(1 << e);
    this.tileLayers[e].active = t;
  }
  isLayerVisable(e) {
    return (this._tileLayerVisableMask & 1 << e) > 0;
  }
  setLayerOpacity(e, t) {
    this.tileLayers[e].opacity = t;
  }
  checkOutScreen(e) {
    for (let t = 0; t < this.nRow; ++t) for (let o = 0; o < this.nCol; ++o) for (let i of this._tileLayerGrids) {
      let n = i[t][o];
      if (n) {
        let t = n.node.getBoundingBox(),
          o = e.intersects(t);
        n.sprite.enabled = o;
      }
    }
  }
  get tileGrid() {
    return this._tileLayerGrids[this._selectedLayerIdx];
  }
  setSize(e, t) {
    this.nCol = e;
    this.nRow = t;
    this.node.width = e * r.default.SIZE;
    this.node.height = t * r.default.SIZE;
    this._tileLayerGrids = [];
    for (let o of this.tileLayers) {
      let o = [];
      this._tileLayerGrids.push(o);
      for (let i = 0; i < t; i++) {
        let t = [];
        for (let o = 0; o < e; o++) t.push(null);
        o.push(t);
      }
    }
    let o = (e, t, o, i, n) => {
      e.node.width = i;
      e.node.height = n;
      e.node.position = cc.v2(t, o);
      e.size = cc.size(i, n);
    };
    o(this.leftWall, -r.default.SIZE / 2, this.node.height / 2, r.default.SIZE, this.node.height + 2e3);
    o(this.rightWall, this.node.width + r.default.SIZE / 2, this.node.height / 2, r.default.SIZE, this.node.height + 2e3);
    o(this.bottomWall, this.node.width / 2, -r.default.SIZE / 2 - 500, this.node.width + 2e3, r.default.SIZE);
    o(this.topWall, this.node.width / 2, this.node.height + r.default.SIZE / 2, this.node.width + 2e3, r.default.SIZE);
  }
  addTile(e, t) {
    return this.addTileInLayer(this._selectedLayerIdx, e, t);
  }
  addTileInLayer(e, t, o) {
    let i = this.tilePool.get();
    i.off(r.default.TILE_GRIDPOS_CHANGE, this.onTileGridPosChange, this);
    this.tileLayers[e].addChild(i);
    i.x = r.default.SIZE * (t + i.anchorX);
    i.y = r.default.SIZE * (o + i.anchorY);
    let n = i.getComponent(r.default);
    this._tileLayerGrids[e][o][t] = n;
    i.on(r.default.TILE_GRIDPOS_CHANGE, this.onTileGridPosChange, this);
    return n;
  }
  removeTile(e, t) {
    let o = this.getTile(e, t);
    if (o) {
      o.node.emit(n.default.PUT);
      this.tileGrid[t][e] = null;
    }
  }
  removeTileByLayer(e, t, o) {
    let i = this._tileLayerGrids[e],
      a = this.getLayerTile(e, t, o);
    if (a) {
      a.node.emit(n.default.PUT);
      i[o][t] = null;
    }
  }
  getTileByDataId(e) {
    for (let t of this._tileLayerGrids) for (let o = 0; o < t.length; o++) {
      let i = t[o];
      for (let t = 0; t < i.length; t++) if (i[t] && i[t].data.id == e) return i[t];
    }
    return null;
  }
  getTile(e, t) {
    return t >= 0 && t < this.tileGrid.length ? this.tileGrid[t][e] : null;
  }
  getLayerTile(e, t, o) {
    let i = this._tileLayerGrids[e];
    return o >= 0 && o < i.length ? i[o][t] : null;
  }
  canPass(e, t) {
    let o = this.getTiles(e, t);
    for (let e of o) if (!e.canPass) return !1;
    return !0;
  }
  getTiles(e, t) {
    let o = [];
    for (let i = this._tileLayerGrids.length - 1; i >= 0; --i) {
      let n = this._tileLayerGrids[i];
      t >= 0 && t < n.length && n[t][e] && o.push(n[t][e]);
    }
    return o;
  }
  getTilesByPos(e, t) {
    let o = Math.floor(e / r.default.SIZE),
      i = Math.floor(t / r.default.SIZE),
      n = [];
    for (let e = this._tileLayerGrids.length - 1; e >= 0; --e) {
      let t = this._tileLayerGrids[e];
      i >= 0 && i < t.length && t[i][o] && n.push(t[i][o]);
    }
    return n;
  }
  getAllTiles() {
    let e = [];
    for (let t of this._tileLayerGrids) for (let o = 0; o < t.length; o++) {
      let i = t[o];
      for (let t = 0; t < i.length; t++) i[t] && e.push(i[t]);
    }
    return e;
  }
  getGridPos(e, t) {
    return {
      iCol: Math.floor(e / r.default.SIZE),
      iRow: Math.floor(t / r.default.SIZE)
    };
  }
  onTileGridPosChange(e) {
    let t = e.data.layerIdx || 0,
      o = this._tileLayerGrids[t];
    if (o) {
      for (let t = 0; t < o.length; t++) {
        let i = o[t];
        for (let t = 0; t < i.length; t++) i[t] == e && (i[t] = null);
      }
      let t = e.iRow,
        i = e.iCol;
      if (t >= 0 && t < this.nRow && i >= 0 && i < this.nCol) {
        o[t][i] && console.error("onTileGridPosChange error");
        o[t][i] = e;
      }
    }
  }
  reset() {
    let e = this._selectedLayerIdx;
    for (let e = 0; e < this._tileLayerGrids.length; ++e) {
      this._selectedLayerIdx = e;
      let t = this.tileGrid;
      for (let e = 0; e < t.length; e++) {
        let o = t[e];
        for (let t = 0; t < o.length; t++) this.removeTile(t, e);
      }
    }
    this._selectedLayerIdx = e;
  }
  getValidJumpOverTilePoint(e, t, o) {
    this._tmpP1.set(e);
    this._tmpP2.set(t);
    e = this._tmpP1;
    t = this._tmpP2;
    let i = {
        p1: this._tmpP1,
        p2: this._tmpP2
      },
      n = this.getGridPos(i.p1.x, i.p1.y),
      a = this.getTiles(n.iCol, n.iRow);
    if (!a || 0 == a.length) {
      let e = i.p2.x - i.p1.x,
        t = i.p2.y - i.p1.y,
        o = Math.sqrt(e * e + t * t);
      if (o > 0) {
        e /= o;
        t /= o;
        i.p1.x += 5 * e;
        i.p1.y += 5 * t;
        n = this.getGridPos(i.p1.x, i.p1.y);
        a = this.getTiles(n.iCol, n.iRow);
      }
      if (!a || 0 == a.length) return !1;
    }
    for (; a && a.length > 0;) {
      let e = a.shift();
      if (e.canJumpOver(i)) {
        e.getJumpOverTilePoint(i, o);
        let t = this.getGridPos(o.x, o.y);
        if (t.iCol < 0 || t.iCol > this.nCol || t.iRow < 0 || t.iRow > this.nRow) return !1;
        let n = this.getTiles(t.iCol, t.iRow),
          s = null,
          l = !1;
        if (!(n && n.length > 0)) return !0;
        for (let e of n) if (e && e.block) {
          s = e;
          let t = i.p2.x - i.p1.x,
            n = i.p2.y - i.p1.y,
            a = Math.sqrt(t * t + n * n);
          if (a > 0) {
            l = !0;
            t /= a;
            n /= a;
            i.p1.set(o);
            i.p2.x = i.p1.x + t * r.default.SIZE;
            i.p2.y = i.p1.y + n * r.default.SIZE;
            break;
          }
        }
        if (!s) return !0;
        if (!l) return !1;
        a.length = 0;
        a.push(s);
      }
    }
    return !1;
  }
};
i([c(cc.BoxCollider)], d.prototype, "leftWall", void 0);
i([c(cc.BoxCollider)], d.prototype, "rightWall", void 0);
i([c(cc.BoxCollider)], d.prototype, "topWall", void 0);
i([c(cc.BoxCollider)], d.prototype, "bottomWall", void 0);
i([c(n.default)], d.prototype, "tilePool", void 0);
i([c([cc.Node])], d.prototype, "tileLayers", void 0);
d = i([l], d);
exports.default = d;