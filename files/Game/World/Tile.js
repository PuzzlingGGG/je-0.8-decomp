"use strict";

var i,
  n = this && this.__decorate || function (e, t, o, i) {
    var n,
      a = arguments.length,
      s = a < 3 ? t : null === i ? i = Object.getOwnPropertyDescriptor(t, o) : i;
    if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) s = Reflect.decorate(e, t, o, i);else for (var r = e.length - 1; r >= 0; r--) (n = e[r]) && (s = (a < 3 ? n(s) : a > 3 ? n(t, o, s) : n(t, o)) || s);
    return a > 3 && s && Object.defineProperty(t, o, s), s;
  },
  a = this && this.__awaiter || function (e, t, o, i) {
    return new (o || (o = Promise))(function (n, a) {
      function s(e) {
        try {
          l(i.next(e));
        } catch (e) {
          a(e);
        }
      }
      function r(e) {
        try {
          l(i.throw(e));
        } catch (e) {
          a(e);
        }
      }
      function l(e) {
        e.done ? n(e.value) : (t = e.value, t instanceof o ? t : new o(function (e) {
          e(t);
        })).then(s, r);
        var t;
      }
      l((i = i.apply(e, t || [])).next());
    });
  };
const s = e("../../Frame/FightSystem"),
  r = e("../../Frame/Hper"),
  l = e("../../Frame/SceneManager"),
  c = e("../../Frame/TweenUtil"),
  d = e("../../Frame/Util"),
  h = e("../../Game/World/WorldChild"),
  p = e("../../GameData/GameTypeDefine"),
  u = e("../PhyObj"),
  m = e("../Player/GameSaveMng"),
  f = e("../Player/Mng"),
  g = e("../Player/SpriteMng"),
  y = e("../Player/TriggerMng"),
  v = e("./AICtrl/Com/AiComSimplerMover"),
  C = e("./HeroContactTileCtrl"),
  {
    ccclass: _,
    property: S
  } = cc._decorator;
let I = i = class extends h.default {
  constructor() {
    super(...arguments);
    this.sprite = null;
    this.hper = null;
    this.box = null;
    this.data = null;
    this.tileRect = cc.rect();
    this._damageInterval = 250;
    this._p1 = cc.v2();
    this._p2 = cc.v2();
    this._p3 = cc.v2();
    this._p4 = cc.v2();
  }
  get iCol() {
    return Math.floor(this.node.x / i.SIZE);
  }
  get iRow() {
    return Math.floor(this.node.y / i.SIZE);
  }
  get canDestroy() {
    return this.data.isTemplete ? this._conf.tilePhyType == p.TilePhysicType.Destroy : this.data.tilePhyType == p.TilePhysicType.Destroy;
  }
  get block() {
    return this.data.isTemplete ? this._conf.tilePhyType == p.TilePhysicType.Block || this._conf.tilePhyType == p.TilePhysicType.Destroy || this._conf.tilePhyType == p.TilePhysicType.JumpOver : this.data.tilePhyType == p.TilePhysicType.Block || this.data.tilePhyType == p.TilePhysicType.Destroy || this.data.tilePhyType == p.TilePhysicType.JumpOver;
  }
  get canDamage() {
    return this.data.isTemplete ? this._conf.tilePhyType == p.TilePhysicType.Damage : this.data.tilePhyType == p.TilePhysicType.Damage;
  }
  get canFall() {
    return this.data.isTemplete ? this._conf.tilePhyType == p.TilePhysicType.Fall : this.data.tilePhyType == p.TilePhysicType.Fall;
  }
  get canPass() {
    return this.data.isTemplete ? !!this._conf && (this._conf.tilePhyType == p.TilePhysicType.Pass || this._conf.tilePhyType == p.TilePhysicType.Damage) : this.data.tilePhyType == p.TilePhysicType.Pass || this.data.tilePhyType == p.TilePhysicType.Damage;
  }
  giveDamage(e) {
    let t = cc.director.getTotalTime(),
      o = 0;
    i._damagedHistorysMap.has(e.id) && (o = i._damagedHistorysMap.get(e.id));
    if (t >= o) {
      i._damagedHistorysMap.set(e.id, t + this._damageInterval);
      if (this._conf.dataDamgae) {
        let t = .01 * this._conf.dataDamgae.perDmg * (this._damageInterval / 1e3);
        t > 0 && e.onDamageByTile(t);
      }
    }
  }
  giveFallDamage(e) {
    e.onFallFromTile && e.onFallFromTile(this.node, .01 * this._conf.dataFall.hpPercent);
  }
  isEdgeCanJumpOver(e) {
    return !(!this.canJumpOver || !this._conf.dataJumpOver) && (this._conf.dataJumpOver.jumpPassMask & 1 << e) > 0;
  }
  setEdgeJumpOver(e, t) {
    if (this.canJumpOver) {
      this._conf.dataJumpOver = this._conf.dataJumpOver || {
        jumpPassMask: 0
      };
      t ? this._conf.dataJumpOver.jumpPassMask |= 1 << e : this._conf.dataJumpOver.jumpPassMask &= ~(1 << e);
    }
  }
  getJumpOverTilePoint(e, t) {
    t.x = e.p2.x;
    t.y = e.p2.y;
    if (this.tileRect.contains(t)) {
      let o = 5,
        i = this.tileRect.xMin - o,
        n = this.tileRect.xMax + o,
        a = this.tileRect.yMin - o,
        s = this.tileRect.yMax + o,
        r = e.p2.x - e.p1.x,
        l = e.p2.y - e.p1.y;
      if (0 != r && 0 != l) {
        let o = 0,
          c = 0,
          d = 0,
          h = 0;
        if (r > 0) {
          if (e.p1.x <= i) {
            o = n - i;
            d = i;
          } else {
            o = n - e.p1.x;
            d = e.p1.x;
          }
        } else if (r < 0) if (e.p1.x >= n) {
          o = i - n;
          d = n;
        } else {
          o = i - e.p1.x;
          d = e.p1.x;
        }
        if (l > 0) {
          if (e.p1.y <= a) {
            c = s - a;
            h = a;
          } else {
            c = s - e.p1.y;
            h = e.p1.y;
          }
        } else if (l < 0) if (e.p1.y >= s) {
          c = a - s;
          h = s;
        } else {
          c = a - e.p1.y;
          h = e.p1.y;
        }
        let p = r / l,
          u = o / c;
        Math.abs(p) <= Math.abs(u) ? c = o / p : o = c * p;
        t.x = d + o;
        t.y = h + c;
      } else 0 == r ? t.y = l > 0 ? s : a : t.x = r > 0 ? n : i;
    }
  }
  canJumpOver(e) {
    if (!this.canJumpOver || !this._conf.dataJumpOver || 0 == this._conf.dataJumpOver.jumpPassMask) return !1;
    let t = e.p2.x - e.p1.x,
      o = e.p2.y - e.p1.y,
      i = !1,
      n = !1,
      a = !1,
      s = !1;
    if (0 != t && e.p1.y >= this.tileRect.yMin && e.p1.y <= this.tileRect.yMax || e.p2.y >= this.tileRect.yMin && e.p2.y <= this.tileRect.yMax) {
      if (this.isEdgeCanJumpOver(0) && e.p1.x < e.p2.x && e.p1.x <= this.tileRect.xMin + 10) {
        i = !0;
        if (0 == o) return !0;
      }
      if (this.isEdgeCanJumpOver(2) && e.p2.x < e.p1.x && e.p1.x >= this.tileRect.xMax - 10) {
        n = !0;
        if (0 == o) return !0;
      }
    }
    if (0 != o && e.p1.x >= this.tileRect.xMin && e.p1.x <= this.tileRect.xMax || e.p2.x >= this.tileRect.xMin && e.p2.x <= this.tileRect.xMax) {
      if (this.isEdgeCanJumpOver(1) && e.p1.y > e.p2.y && e.p1.y >= this.tileRect.yMax - 10) {
        a = !0;
        if (0 == t || t > 0 && i || t < 0 && n) return !0;
      }
      if (this.isEdgeCanJumpOver(3) && e.p1.y < e.p2.y && e.p1.y <= this.tileRect.yMin + 10) {
        s = !0;
        if (0 == t || t > 0 && i || t < 0 && n) return !0;
      }
    }
    if ((i || n) && !a && !s) {
      e.p2.y = e.p1.y;
      if (Math.abs(o / t) > 1) {
        i = !1;
        n = !1;
      }
    }
    if ((a || s) && !i && !n) {
      e.p2.x = e.p1.x;
      if (Math.abs(t / o) > 1) {
        a = !1;
        s = !1;
      }
    }
    return i || n || a || s;
  }
  onLoad() {
    super.onLoad();
    cc.game.on(g.default.UPDATE_SPRITE, this.onPixelsUpdate, this);
    this.box = this.getComponent(cc.BoxCollider);
    this.hper = this.getComponent(r.default);
    this.node.on(cc.Node.EventType.POSITION_CHANGED, this.onTilePositionChange, this);
    this.node.on(s.FightSystem.Event.Beaten, this.onBeaten, this);
    this.node.on(C.default.HERO_ENTER_TILE, this.onHeroEnterTile, this);
    this.node.on(C.default.HERO_LEAFE_TILE, this.onHeroLeaveTile, this);
  }
  onTilePositionChange() {
    this.node.emit(i.TILE_GRIDPOS_CHANGE, this);
  }
  onDestroy() {
    cc.game.off(g.default.UPDATE_SPRITE, this.onPixelsUpdate, this);
  }
  setProperty(e, t, o, n, a) {
    let s = typeof this.data[e];
    if ("boolean" == s) {
      let o = "true" == t || "1" == t;
      this.data[e] = o;
      if ("isShow" == e) this.node.active = o;else if ("block" == e) this.updatePhyTypeInRunTime();else if ("canDestroy" == e) {
        this.hper.lockHp = !o;
        this.updatePhyTypeInRunTime();
      }
    } else if ("number" == s) {
      let s = parseFloat(t);
      Number.isNaN(s) && (s = 0);
      a && (s *= i.SIZE);
      o && (s *= -1);
      (n || o) && (s += this.data[e]);
      this.data[e] = s;
      if ("hp" == e) {
        this.hper.hp = s;
        s <= 0 && this.destroyThisTile();
      }
    } else "string" == s || console.error(`>>not support tile property[${e}] type[${s}]`);
  }
  updatePhyTypeInRunTime() {
    if (this.world.isGameScene) if (this.data.block) {
      if (this.data.canDestroy) {
        this.data.tilePhyType = p.TilePhysicType.Destroy;
        this.data.dataDestroy = this.data.dataDestroy || {
          hp: this.data.hp
        };
      } else {
        this.data.tilePhyType = p.TilePhysicType.Block;
        this.data.dataBlock = this.data.block || {};
      }
    } else {
      this.data.tilePhyType = p.TilePhysicType.Pass;
      this.data.dataPass = this.data.dataPass || {};
    }
  }
  copyConfToData(e, t) {
    if (t.isTemplete) {
      t.isTemplete = !1;
      t.tilePhyType = e.tilePhyType;
      t.dataBlock = e.dataBlock;
      t.dataDestroy = e.dataDestroy;
      t.dataPass = e.dataPass;
    }
    t.dataBlock = e.dataBlock || {};
    t.dataDestroy = e.dataDestroy || {
      hp: 1
    };
    t.dataPass = e.dataPass || {};
  }
  updateDataToNew() {
    if (this._conf && null == this._conf.tilePhyType) if (this._conf.block) {
      if (this._conf.canDestroy) {
        this._conf.tilePhyType = p.TilePhysicType.Destroy;
        this._conf.dataDestroy = this._conf.dataDestroy || {
          hp: this.data.hp
        };
      } else {
        this._conf.tilePhyType = p.TilePhysicType.Block;
        this._conf.dataBlock = this._conf.block || {};
      }
    } else {
      this._conf.tilePhyType = p.TilePhysicType.Pass;
      this._conf.dataPass = this._conf.dataPass || {};
    }
    if (!this.data.isTemplete && null == this.data.tilePhyType) if (this.data.block) {
      if (this.data.canDestroy) {
        this.data.tilePhyType = p.TilePhysicType.Destroy;
        this.data.dataDestroy = this.data.dataDestroy || {
          hp: this.data.hp
        };
      } else {
        this.data.tilePhyType = p.TilePhysicType.Block;
        this.data.dataBlock = this.data.block || {};
      }
    } else {
      this.data.tilePhyType = p.TilePhysicType.Pass;
      this.data.dataPass = this.data.dataPass || {};
    }
  }
  setData(e) {
    return a(this, void 0, void 0, function* () {
      let t = this.world;
      t.isGameScene && (e = d.Util.deepCopy(e));
      this.data = e;
      this._conf = yield f.Mng.Ins.tileMng.loadOne(this.data.confId);
      this._conf || (this._conf = f.Mng.Ins.tileMng.errorTile);
      f.Mng.Ins.spriteMng.setTileSprite(this.sprite, this._conf.textureName, 64);
      this.updateDataToNew();
      t.isGameScene && this.copyConfToData(this._conf, this.data);
      this.data.isShow = this.data.isShow || !0;
      this.node.active = this.data.isShow;
      this.box.enabled = !1;
      this.hper.hp = 1;
      this.data.isTemplete ? this._conf.dataDestroy && (this.hper.hp = this._conf.dataDestroy.hp || 1) : this.data.dataDestroy && (this.hper.hp = this.data.dataDestroy.hp);
      this.hper.HpMax = this.hper.hp;
      this.hper.lockHp = !this.canDestroy;
      let o = this.tileRect,
        n = p.TileShape.Normal;
      null == this._conf.shape && (this._conf.shape = p.TileShape.Normal);
      switch (n = this._conf.shape) {
        case p.TileShape.Slope_45:
        case p.TileShape.Slope_45_Flip:
        case p.TileShape.Slope_135:
        case p.TileShape.Slope_135_Flip:
        case p.TileShape.Normal:
          exports.x = this.node.x - .5 * i.SIZE;
          exports.y = this.node.y - .5 * i.SIZE;
          exports.width = i.SIZE;
          exports.height = i.SIZE;
          break;
        case p.TileShape.Half_Top:
          exports.x = this.node.x - .5 * i.SIZE;
          exports.y = this.node.y;
          exports.width = i.SIZE;
          exports.height = .5 * i.SIZE;
          break;
        case p.TileShape.Half_Btm:
          exports.x = this.node.x - .5 * i.SIZE;
          exports.y = this.node.y - .5 * i.SIZE;
          exports.width = i.SIZE;
          exports.height = .5 * i.SIZE;
      }
    });
  }
  getSlope() {
    let e = 0;
    if (this._conf) switch (this._conf.shape) {
      case p.TileShape.Normal:
      case p.TileShape.Half_Top:
      case p.TileShape.Half_Btm:
        break;
      case p.TileShape.Slope_45:
        e = 1;
        break;
      case p.TileShape.Slope_45_Flip:
        e = -1;
        break;
      case p.TileShape.Slope_135:
        e = 1;
        break;
      case p.TileShape.Slope_135_Flip:
        e = -1;
    }
    return e;
  }
  canMovexThrough(e) {
    if (!this.data.block) return !0;
    let t = this.getSlope();
    return e > 0 && t > 0 && t <= 1 || e < 0 && t < 0 && t <= -1;
  }
  getDirxNextTileGridPos(e) {
    let t = this.getSlope();
    return {
      iCol: this.iCol + e,
      iRow: this.iRow + Math.floor(0 == t ? 0 : e / t)
    };
  }
  intersection(e, t) {
    let o = p.TileShape.Normal;
    this._conf && (o = this._conf.shape);
    switch (o) {
      case p.TileShape.Normal:
      case p.TileShape.Half_Top:
      case p.TileShape.Half_Btm:
        this.tileRect.intersection(e, t);
        break;
      case p.TileShape.Slope_45:
        this.tileRect.intersection(e, t);
        if (e.width > 0 || e.height > 0) {
          this._p1.x = e.x;
          this._p1.y = e.y;
          this._p2.x = e.x + e.width;
          this._p2.y = e.y;
          this._p3.x = e.x;
          this._p3.y = e.y + e.height;
          this._p4.x = e.x + e.width;
          this._p4.y = e.y + e.height;
          let t = this._p1.x - this.tileRect.x + this.tileRect.y,
            o = this._p2.x - this.tileRect.x + this.tileRect.y;
          if (this._p3.y > t && this._p1.y < t) e.height = t - e.yMin;else if (this._p4.y >= o && this._p2.y <= o) {
            e.height = .707 * (o - e.yMin);
            e.width = e.height;
          } else if (this._p1.y >= t && this._p2.y >= o) {
            e.width = 0;
            e.height = 0;
          }
        }
        break;
      case p.TileShape.Slope_45_Flip:
        this.tileRect.intersection(e, t);
        if (e.width > 0 || e.height > 0) {
          this._p1.x = e.x;
          this._p1.y = e.y;
          this._p2.x = e.x + e.width;
          this._p2.y = e.y;
          this._p3.x = e.x;
          this._p3.y = e.y + e.height;
          this._p4.x = e.x + e.width;
          this._p4.y = e.y + e.height;
          let t = this.tileRect.width - (this._p1.x - this.tileRect.x) + this.tileRect.y,
            o = this.tileRect.width - (this._p2.x - this.tileRect.x) + this.tileRect.y;
          if (this._p3.y >= t && this._p1.y <= t) {
            e.height = .707 * (t - e.yMin);
            e.width = e.height;
          } else if (this._p4.y > o && this._p2.y < o) e.height = o - e.yMin;else if (this._p1.y >= t && this._p2.y >= o) {
            e.width = 0;
            e.height = 0;
          }
        }
        break;
      case p.TileShape.Slope_135:
        this.tileRect.intersection(e, t);
        if (e.width > 0 || e.height > 0) {
          this._p1.x = e.x;
          this._p1.y = e.y;
          this._p2.x = e.x + e.width;
          this._p2.y = e.y;
          this._p3.x = e.x;
          this._p3.y = e.y + e.height;
          this._p4.x = e.x + e.width;
          this._p4.y = e.y + e.height;
          let t = this._p1.x - this.tileRect.x + this.tileRect.y,
            o = this._p2.x - this.tileRect.x + this.tileRect.y;
          if (this._p3.y >= t && this._p1.y <= t) {
            e.height = .707 * (e.yMax - t);
            e.width = e.height;
          } else if (this._p3.y > o && this._p1.y < o) e.height = e.yMax - o;else if (this._p3.y <= t && this._p4.y <= o) {
            e.width = 0;
            e.height = 0;
          }
        }
        break;
      case p.TileShape.Slope_135_Flip:
        this.tileRect.intersection(e, t);
        if (e.width > 0 || e.height > 0) {
          this._p1.x = e.x;
          this._p1.y = e.y;
          this._p2.x = e.x + e.width;
          this._p2.y = e.y;
          this._p3.x = e.x;
          this._p3.y = e.y + e.height;
          this._p4.x = e.x + e.width;
          this._p4.y = e.y + e.height;
          let t = this.tileRect.width - (this._p1.x - this.tileRect.x) + this.tileRect.y,
            o = this.tileRect.width - (this._p2.x - this.tileRect.x) + this.tileRect.y;
          if (this._p3.y > t && this._p1.y < t) e.height = e.yMax - t;else if (this._p4.y >= o && this._p2.y <= o) {
            e.height = .707 * (e.yMax - o);
            e.width = e.height;
          } else if (this._p3.y <= t && this._p4.y <= o) {
            e.width = 0;
            e.height = 0;
          }
        }
    }
    return e;
  }
  onBeaten(e) {
    e.dmg > 0 && y.default.Ins.emitTrigger(this.data.onBeaten, this.node);
    e.causeDeath ? this.destroyThisTile() : c.TweenUtil.applyShakeShort(this.sprite.node);
  }
  destroyThisTile() {
    return a(this, void 0, void 0, function* () {
      let e = this.world;
      this.data.onlyOnce && m.default.Ins.setTileFlag(e.worldData.id, this.data.id);
      if (e.worldLayout.type == p.WorldType.Rpg) {
        let t = v.GameActorDeadSubstitute.Create(),
          o = t.node.getComponent(cc.Sprite);
        o || (o = t.addComponent(cc.Sprite));
        o && (exports.spriteFrame = this.sprite.spriteFrame);
        e.content.addChild(t.node);
        t.node.position = this.node.position;
        t.node.width = this.sprite.node.width;
        t.node.height = this.sprite.node.height;
        let n = .4,
          a = i.SIZE,
          s = 2 * (-a + Math.random() * a * 2) / n,
          r = 4 * (.5 * a + Math.random() * a * .5) / n;
        t.addImpulse(s, r, n);
      } else {
        let t = new cc.Node();
        t.addComponent(cc.Sprite).spriteFrame = this.sprite.spriteFrame;
        e.content.addChild(t);
        t.position = this.node.position;
        t.width = this.sprite.node.width;
        t.height = this.sprite.node.height;
        let o = t.addComponent(u.default);
        e.worldLayout.type == p.WorldType.Jump && o.fly(d.Util.randomInt(-100, 100), d.Util.randomInt(200, 300), d.Util.randomInt(-300, 300));
        o.fadeOut();
      }
      y.default.Ins.emitTrigger(this.data.onDestroy, this.node);
      e.tiledMap.removeTileByLayer(this.data.layerIdx, this.iCol, this.iRow);
    });
  }
  onHeroEnterTile() {
    y.default.Ins.emitTrigger(this.data.onHeroEnter, this.node);
  }
  onHeroLeaveTile() {
    y.default.Ins.emitTrigger(this.data.onHeroLeave, this.node);
  }
  onPixelsUpdate(e, t) {
    return a(this, void 0, void 0, function* () {
      this._conf && this._conf.id == e && f.Mng.Ins.spriteMng.setTileSprite(this.sprite, t, 64);
    });
  }
  static getTilePhyTypeName(e) {
    return i._tilePhysicTypeMap.get(e).str;
  }
  initInspector(e) {
    this.data.onDestroy = this.data.onDestroy || [];
    this.data.onBeaten = this.data.onBeaten || [];
    this.data.onHeroEnter = this.data.onHeroEnter || [];
    this.data.onHeroLeave = this.data.onHeroLeave || [];
    this._conf = f.Mng.Ins.tileMng.getOne(this.data.confId);
    this._conf ? e.addHead(this._conf.name, this._conf.textureName) : e.addHead("错误地块", void 0);
    if (1 == this.data.isTemplete) {
      if (this._conf) {
        let t = this.data.isTemplete ? this._conf.tilePhyType : this.data.tilePhyType;
        e.addButton("类型", i._tilePhysicTypeMap.get(t).str, () => {
          l.default.ins.OpenPanelByName("CommonOptionPanel", t => {
            t.setData(this._conf, t => {
              this._conf = t;
              e.reset();
              this.initInspector(e);
            });
          });
        });
        t == p.TilePhysicType.Destroy && i.displayInspectorTileDestroyEvent(e, this.data);
        e.addTrigger("当主角接触此地块时：", this.data.onHeroEnter, !0);
      } else e.addLabel("模版已被删除");
    } else {
      let t = Array.from(i._tilePhysicTypeMap.values()).filter(e => e.type == p.TilePhysicType.Block || e.type == p.TilePhysicType.Destroy || e.type == p.TilePhysicType.Pass),
        o = t.findIndex(e => e.type == this.data.tilePhyType);
      -1 == o && (o = 0);
      e.addDropDownBox("地块类型", t, o, (t, o, i) => a(this, void 0, void 0, function* () {
        let t = this.data.tilePhyType != o.type;
        this.data.tilePhyType = o.type;
        if (i && t) {
          e.reset();
          this.initInspector(e);
        }
      }));
      this.data.tilePhyType == p.TilePhysicType.Block ? i.displayInspectorTileBlock(e, this.data) : this.data.tilePhyType == p.TilePhysicType.Destroy ? i.displayInspectorTileDestroy(e, this.data) : this.data.tilePhyType == p.TilePhysicType.Pass && i.displayInspectorTilePass(e, this.data);
      e.addTrigger("当主角接触此地块时：", this.data.onHeroEnter, !0);
    }
  }
  static displayInspector(e, t, o) {
    {
      let o = [{
          str: "所有",
          type: p.TileType.All
        }, {
          str: "平台跳跃",
          type: p.TileType.Jump
        }, {
          str: "俯视冒险",
          type: p.TileType.RPG
        }],
        i = o.findIndex(e => t.tileType == e.type);
      i < 0 && (i = 0);
      e.addDropDownBox("所属地图", o, i, (e, o) => a(this, void 0, void 0, function* () {
        t.tileType = o.type;
      }));
    }
    let n = Array.from(i._tilePhysicTypeMap.values()),
      s = n.findIndex(e => e.type == t.tilePhyType);
    -1 == s && (s = 0);
    e.addDropDownBox("地块类型", n, s, (e, i, n) => a(this, void 0, void 0, function* () {
      let e = t.tilePhyType != i.type;
      t.tilePhyType = i.type;
      n && e && o && o();
    }));
    t.tilePhyType == p.TilePhysicType.Block ? i.displayInspectorTileBlock(e, t) : t.tilePhyType == p.TilePhysicType.Destroy ? i.displayInspectorTileDestroy(e, t) : t.tilePhyType == p.TilePhysicType.Fall ? i.displayInspectorTileFall(e, t) : t.tilePhyType == p.TilePhysicType.JumpOver ? i.displayInspectorTileJumpOver(e, t) : t.tilePhyType == p.TilePhysicType.Damage ? i.displayInspectorTileDamage(e, t) : t.tilePhyType == p.TilePhysicType.Pass && i.displayInspectorTilePass(e, t);
    let r = [p.TileShape.Normal, p.TileShape.Half_Btm, p.TileShape.Half_Top, p.TileShape.Slope_45, p.TileShape.Slope_45_Flip, p.TileShape.Slope_135, p.TileShape.Slope_135_Flip],
      l = r.findIndex(e => e == t.shape);
    l <= 0 && (l = 0);
    e.addImgBtnHList("物理形状", r, l, (e, o) => a(this, void 0, void 0, function* () {
      t.shape = o;
    }));
  }
  static displayInspectorTileBlock(e, t) {
    t.dataBlock = t.dataBlock || {};
  }
  static displayInspectorTileDestroyEvent(e, t) {
    t.onlyOnce = t.onlyOnce || !1;
    e.addToggle("摧毁后不再出现？", t.onlyOnce, e => {
      t.onlyOnce = e;
    });
    e.addTrigger("当此地块摧毁时：", t.onDestroy, !0);
    e.addTrigger("当此地块受击时：", t.onBeaten, !0);
  }
  static displayInspectorTileDestroy(e, t) {
    t.dataDestroy = t.dataDestroy || {
      hp: 1
    };
    e.addNumberEditBox("血量", t.dataDestroy.hp, 0, 999999, e => {
      t.dataDestroy.hp = e = e;
    });
  }
  static displayInspectorTileFall(e, t) {
    t.dataFall = t.dataFall || {
      hpPercent: 1
    };
    let o = e.addNumberEditBox2("掉落损失生命", "%", t.dataFall.hpPercent, e => {
      let i = Number.parseFloat(e) || 0;
      t.dataFall.hpPercent = i = d.Util.clamp(i, 0, 100);
      o.label_num.string = i + "";
    });
  }
  static displayInspectorTileJumpOver(e, t) {
    t.dataJumpOver = t.dataJumpOver || {
      jumpPassMask: 0
    };
    let o = e => (t.dataJumpOver.jumpPassMask & 1 << e) > 0,
      i = (e, o) => {
        o ? t.dataJumpOver.jumpPassMask |= 1 << e : t.dataJumpOver.jumpPassMask &= ~(1 << e);
      },
      n = o(0),
      a = o(1),
      s = o(2),
      r = o(3);
    e.addToggle("左->右", n, e => {
      i(0, e);
    });
    e.addToggle("右->左", s, e => {
      i(2, e);
    });
    e.addToggle("上->下", a, e => {
      i(1, e);
    });
    e.addToggle("下->上", r, e => {
      i(3, e);
    });
  }
  static displayInspectorTileDamage(e, t) {
    t.dataDamgae = t.dataDamgae || {
      perDmg: 1
    };
    let o = e.addNumberEditBox2("损失生命/秒", "%", t.dataDamgae.perDmg, e => {
      let i = Number.parseFloat(e) || 0;
      t.dataDamgae.perDmg = i = d.Util.clamp(i, 0, 100);
      o.label_num.string = i + "";
    });
  }
  static displayInspectorTilePass(e, t) {
    t.dataPass = t.dataPass || {};
  }
};
I.TILE_GRIDPOS_CHANGE = "TILE_GRIDPOS_CHANGE";
I.SIZE = 64;
I._damagedHistorysMap = new Map();
I._tilePhysicTypeMap = new Map([[p.TilePhysicType.Pass, {
  str: "可通行",
  type: p.TilePhysicType.Pass
}], [p.TilePhysicType.Damage, {
  str: "持续伤害",
  type: p.TilePhysicType.Damage
}], [p.TilePhysicType.Block, {
  str: "坚不可摧",
  type: p.TilePhysicType.Block
}], [p.TilePhysicType.Destroy, {
  str: "可摧毁",
  type: p.TilePhysicType.Destroy
}], [p.TilePhysicType.Fall, {
  str: "深渊(RPG)",
  type: p.TilePhysicType.Fall
}], [p.TilePhysicType.JumpOver, {
  str: "单向通行(RPG)",
  type: p.TilePhysicType.JumpOver
}]]);
n([S(cc.Sprite)], I.prototype, "sprite", void 0);
n([S(cc.BoxCollider)], I.prototype, "box", void 0);
I = i = n([_], I);
exports.default = I;