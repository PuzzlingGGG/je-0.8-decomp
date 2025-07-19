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
const s = e("./../../GameScript/index"),
  r = e("../../Frame/Pool"),
  l = e("../../Frame/Util"),
  c = e("./Prop"),
  d = e("./Tile"),
  h = e("./TiledMap"),
  p = e("./Actor"),
  u = e("./Device"),
  m = e("../../Game/World/FloatLabel"),
  f = e("./CameraFollowCtrl"),
  g = e("./Gizmos/PlaceGizmos"),
  y = e("./Gizmos/SelectGizmos"),
  v = e("./Weapon/Bullet"),
  C = e("./Gizmos/InteractGizmos"),
  _ = e("./Interactable"),
  S = e("./TilePhysics"),
  I = e("./WorldNodeBody"),
  G = e("../Player/Mng"),
  T = e("./BgLayerCtrl"),
  b = e("../Player/TriggerMng"),
  M = e("../../GameData/GameTypeDefine"),
  P = e("../../Frame/DataStructs/UnionSet"),
  D = e("./AICtrl/AiCtrlBase"),
  w = e("../../Frame/ScreenRect"),
  B = e("./StartPoint"),
  R = e("../Player/GameSaveMng"),
  x = e("./Mover/Mover"),
  L = e("./TextBubble"),
  {
    ccclass: k,
    property: F
  } = cc._decorator;
let N = i = class extends cc.Component {
  constructor() {
    super(...arguments);
    this.bg = null;
    this.cameraFollowCtrl = null;
    this.camera = null;
    this.startPoint = null;
    this.actorPool = null;
    this.propPool = null;
    this.bulletPool = null;
    this.floatLabelPool = null;
    this.textBubblePool = null;
    this.graphics = null;
    this.tiledMap = null;
    this.content = null;
    this.layerContents = [];
    this.actorContent = null;
    this.deviceContent = null;
    this.bulletContent = null;
    this.propContent = null;
    this.effectContent = null;
    this.placeGizmos = null;
    this.selectGizmos = null;
    this.interactGizmos = null;
    this.floatLabelContent = null;
    this.headContent = null;
    this.bodys = [];
    this.hero = null;
    this.actors = [];
    this.devices = [];
    this.props = [];
    this.bullets = [];
    this.interacts = [];
    this.playing = !1;
    this.isGameScene = !1;
    this.worldLayout = null;
    this.worldData = null;
    this.devicePrefabMap = new Map();
    this.tilePhysics = new S.TilePhysics();
    this._rect_t = new cc.Rect();
  }
  AddBody(e) {
    e.init();
    e.SetPosition(e.node.x, e.node.y);
    this.bodys.push(e);
  }
  RemoveBody(e) {
    for (let t = 0; t < this.bodys.length; ++t) this.bodys[t] == e && this.bodys.splice(t--, 1);
  }
  GetActNodeByDataId(e) {
    for (let t of this.bodys) if (null != t.dataId && null != t.dataId && t.dataId == e) return t;
    return null;
  }
  GetTileByDataId(e) {
    return this.tiledMap.getTileByDataId(e);
  }
  GetActNodeByDataUnionId(e) {
    for (let t of this.bodys) if (null != t.dataId && null != t.dataId && i.unionActSet.find(t.dataId) == e) return t;
    return null;
  }
  get useGravity() {
    let e = !1;
    this.worldLayout.type == M.WorldType.Jump && (e = !0);
    return e;
  }
  centerLayers() {
    for (let e of this.layerContents) e.setCamera(this.cameraFollowCtrl.node);
  }
  addToLayer(e, t) {
    e == M.DecoratorLayerType.Map && this.worldData.info.type == M.WorldType.Rpg ? t.parent = this.actorContent : t.parent = this._decoratorLayerMap.get(e).node;
  }
  ready() {}
  play() {
    this.worldLayout && this.worldLayout.onStart && this.hero && b.default.Ins.emitTrigger(this.worldLayout.onStart, this.hero.node);
  }
  pause() {
    this.playing && this.tilePhysics.Step(this.bodys);
    this.playing = !1;
    this.node.emit(i.PAUSE);
  }
  resume() {
    this.playing = !0;
    this.node.emit(i.RESUME);
  }
  onLoad() {
    this.placeGizmos.node.active = !1;
    this.selectGizmos.node.active = !1;
    this.interactGizmos.node.active = !1;
    if (!this.headContent) {
      this.headContent = new cc.Node();
      let e = this.actorContent.zIndex;
      this.actorContent.parent.addChild(this.headContent, e + 1);
    }
    this._decoratorLayerMap = new Map([[M.DecoratorLayerType.Foreground01, this.layerContents[0]], [M.DecoratorLayerType.MapFore, this.layerContents[1]], [M.DecoratorLayerType.MapBack, this.layerContents[2]], [M.DecoratorLayerType.Background01, this.layerContents[3]], [M.DecoratorLayerType.Background02, this.layerContents[4]], [M.DecoratorLayerType.Map, this.layerContents[5]]]);
  }
  onEnable() {
    cc.director.getCollisionManager().enabled = !0;
    console.log("enable col");
  }
  onDisable() {
    cc.director.getCollisionManager().enabled = !1;
    console.log("disable col");
  }
  initSize(e, t) {
    this.node.width = e * d.default.SIZE;
    this.node.height = t * d.default.SIZE;
    l.Util.updateAllWidget(this.bg);
    this.tiledMap.setSize(e, t);
  }
  getContentNode(e) {
    return this.worldData.info.type == M.WorldType.Rpg && e != M.CommonDataType.Device ? this.actorContent : e == M.CommonDataType.Actor ? this.actorContent : e == M.CommonDataType.Device ? this.deviceContent : e == M.CommonDataType.Prop ? this.propContent : e == M.CommonDataType.Bullet ? this.bulletContent : this.actorContent;
  }
  addActor(e) {
    let t = this.actorPool.get();
    this.getContentNode(M.CommonDataType.Actor).addChild(t);
    if (void 0 !== e.x && void 0 !== e.y) {
      t.x = e.x;
      t.y = e.y;
    } else if (void 0 !== e.iCol && void 0 !== e.iRow) {
      t.x = (e.iCol + .5) * d.default.SIZE;
      t.y = (e.iRow + .5) * d.default.SIZE;
    } else {
      t.x = 0;
      t.y = 0;
    }
    let o = t.getComponent(p.default);
    this.actors.push(o);
    this.AddBody(o);
    o.gun && o.gun.boxDamager && this.AddBody(o.gun.boxDamager);
    o.resetPhysicsState();
    return o;
  }
  removeActor(e) {
    i.clearAi(e);
    this.RemoveBody(e);
    e.gun && e.gun.boxDamager && this.RemoveBody(e.gun.boxDamager);
    for (let t = 0; t < this.actors.length; t++) if (this.actors[t] == e) {
      this.actors.splice(t--, 1);
      e.node.emit(r.default.PUT);
    }
    if (!this.isGameScene && this.hero == e) {
      this.hero = this.findHeroActor();
      this.hero && this.startPoint.SetPosition(this.hero.node.x, this.hero.node.y);
    }
  }
  addDevice(e, t) {
    return a(this, void 0, void 0, function* () {
      let o = this.devicePrefabMap.get(t);
      if (!o) {
        o = yield l.Util.loadBundleRes("Prefab/Device/" + t);
        this.devicePrefabMap.set(t, o);
      }
      if (!o) return;
      let i = cc.instantiate(o);
      this.getContentNode(M.CommonDataType.Device).addChild(i);
      let n = i.getComponent(u.default);
      this.devices.push(n);
      let a = i.getComponent(_.default);
      a && this.interacts.push(a);
      if (void 0 !== e.x && void 0 !== e.y) {
        i.x = e.x;
        i.y = e.y;
      } else if (void 0 !== e.iCol && void 0 !== e.iRow) {
        i.x = (e.iCol + .5) * d.default.SIZE;
        i.y = (e.iRow + .5) * d.default.SIZE;
      } else {
        i.x = 0;
        i.y = 0;
      }
      this.AddBody(n);
      return n;
    });
  }
  removeDevice(e) {
    this.RemoveBody(e);
    for (let t = 0; t < this.devices.length; t++) if (this.devices[t] == e) {
      let o = e.node.getComponent(_.default);
      if (o) for (let e = 0; e < this.interacts.length; e++) this.interacts[e] == o && this.interacts.splice(e--, 1);
      this.devices.splice(t--, 1);
      e.node.destroy();
    }
  }
  addProp(e) {
    let t = this.propPool.get();
    this.getContentNode(M.CommonDataType.Prop).addChild(t);
    if (void 0 !== e.x && void 0 !== e.y) {
      t.x = e.x;
      t.y = e.y;
    } else if (void 0 !== e.iCol && void 0 !== e.iRow) {
      t.x = (e.iCol + .5) * d.default.SIZE;
      t.y = (e.iRow + .5) * d.default.SIZE;
    } else {
      t.x = 0;
      t.y = 0;
    }
    let o = t.getComponent(c.default);
    this.props.push(o);
    this.AddBody(o);
    return o;
  }
  removeProp(e) {
    this.RemoveBody(e);
    for (let t = 0; t < this.props.length; t++) if (this.props[t] == e) {
      this.props.splice(t--, 1);
      e.node.emit(r.default.PUT);
    }
  }
  addBullet(e) {
    if (!this.bulletContent) return null;
    let t = this.bulletPool.get();
    this.getContentNode(M.CommonDataType.Bullet).addChild(t);
    if (void 0 !== e.x && void 0 !== e.y) {
      t.x = e.x;
      t.y = e.y;
    } else if (void 0 !== e.iCol && void 0 !== e.iRow) {
      t.x = (e.iCol + .5) * d.default.SIZE;
      t.y = (e.iRow + .5) * d.default.SIZE;
    } else {
      t.x = 0;
      t.y = 0;
    }
    let o = t.getComponent(v.default);
    exports.enabled = !0;
    this.bullets.push(o);
    this.AddBody(o);
    return o;
  }
  removeBullet(e) {
    this.RemoveBody(e);
    for (let t = 0; t < this.bullets.length; t++) if (this.bullets[t] == e) {
      this.bullets.splice(t--, 1);
      e.node.emit(r.default.PUT);
    }
  }
  static clearAi(e) {
    let t = e.getComponents(D.default);
    if (t && t.length > 0) for (let e of t) e.destroy();
    let o = e.getComponents(x.default);
    if (o && o.length > 0) for (let e of o) e.destroy();
  }
  onReCheckHero() {
    if (!this.hero || this.hero.data.team != M.Team.Hero) {
      this.hero = this.findHeroActor();
      this.hero && this.startPoint.SetPosition(this.hero.node.x, this.hero.node.y);
    }
  }
  playFloatLabel(e) {
    let t = this.floatLabelPool.get();
    this.floatLabelContent.addChild(t);
    t.position = e.pos;
    let o = t.getComponent(m.default);
    o.label.string = e.str;
    o.label.node.color = e.color || cc.Color.BLACK;
    o.label.fontSize = e.size || 36;
    e.anim && o.play(e.anim);
  }
  showTextBubble(e) {
    let t = this.textBubblePool.get();
    e.parent.addChild(t);
    t.x = 0;
    t.y = e.parent.height / 2;
    let o = t.getComponent(L.default);
    o.node.scale = 1;
    o.show(e.text);
    return o;
  }
  playEffect(e) {
    return a(this, void 0, void 0, function* () {
      if (!this.effectContent) return null;
      let t = yield G.Mng.Ins.worldMng.getEffect(e.effectName);
      this.effectContent.addChild(t);
      t.position = e.pos;
      t.getComponent(cc.Animation).play();
      t.getComponent(cc.Animation).on(cc.Animation.EventType.FINISHED, () => {
        t.parent = null;
        G.Mng.Ins.worldMng.backEffect(e.effectName, t);
      }, this);
      return t;
    });
  }
  repaintGrid() {
    let e = this.tiledMap.nRow,
      t = this.tiledMap.nCol;
    this.graphics.clear();
    let o = this.worldLayout.bgColor;
    this.graphics.strokeColor = cc.color(255 - o.r, 255 - o.g, 255 - o.b, 255);
    let i = t * d.default.SIZE,
      n = e * d.default.SIZE;
    for (let t = 0; t <= e; t++) {
      this.graphics.moveTo(0, t * d.default.SIZE);
      this.graphics.lineTo(i, t * d.default.SIZE);
      this.graphics.stroke();
    }
    for (let e = 0; e <= t; e++) {
      this.graphics.moveTo(e * d.default.SIZE, 0);
      this.graphics.lineTo(e * d.default.SIZE, n);
      this.graphics.stroke();
    }
  }
  findActor(e) {
    return this.actors.find(t => t.data.id == e);
  }
  findHeroActor() {
    return this.actors.find(e => e.data.team == M.Team.Hero);
  }
  moveActor(e, t) {
    if (e) {
      let o = (t.iCol + .5) * d.default.SIZE,
        i = (t.iRow + .5) * d.default.SIZE;
      e.SetPosition(o, i);
    }
  }
  isHeroActor(e) {
    return e.getComponent(p.default) == this.hero;
  }
  setWorldData(e) {
    this.worldData = e;
  }
  initByWorldLayout(e, t = null) {
    return a(this, void 0, void 0, function* () {
      I.default.ResetId();
      this.worldLayout = e;
      this.initSize(e.size.col, e.size.row);
      this.setBgColor(e.bgColor);
      e.tiles = e.tiles || [];
      e.actors = e.actors || [];
      e.devices = e.devices || [];
      e.props = e.props || [];
      e.startPoint = e.startPoint || {
        pos: null
      };
      this.isGameScene ? this.camera.zoomRatio = e.cameraRatio || 1 : this.camera.zoomRatio = 1;
      let o = new Set(),
        i = new Set(),
        n = new Set(),
        a = new Set(),
        s = new Set();
      for (let t = 0; t < e.tiles.length; t++) {
        let i = e.tiles[t];
        o.add(i.data.confId);
      }
      let r = e.startPoint.pos;
      for (let t = 0; t < e.actors.length; t++) {
        let o = e.actors[t];
        i.add(o.data.confId);
        o.data.gunId && s.add(o.data.gunId);
        r || o.data.team != M.Team.Hero || (r = o.pos);
      }
      r || (r = {
        x: 0,
        y: 0
      });
      e.startPoint.pos = r;
      for (let t = 0; t < e.devices.length; t++) {
        let o = e.devices[t];
        n.add(o.data.confId);
      }
      for (let t = 0; t < e.props.length; t++) {
        let o = e.props[t];
        a.add(o.data.confId);
      }
      yield G.Mng.Ins.tileMng.loadMany(Array.from(o));
      yield G.Mng.Ins.actorMng.loadMany(Array.from(i));
      yield G.Mng.Ins.deviceMng.loadMany(Array.from(n));
      yield G.Mng.Ins.propMng.loadMany(Array.from(a));
      yield G.Mng.Ins.weaponMng.loadMany(Array.from(s));
      if (!this.isGameScene) {
        this.startPoint.node.x = e.startPoint.pos.x;
        this.startPoint.node.y = e.startPoint.pos.y;
        this.startPoint.SetPosition(e.startPoint.pos.x, e.startPoint.pos.y);
      }
      this.startPoint.node.active = !this.isGameScene;
      let l = new Map();
      for (let t = 0; t < e.tiles.length; t++) {
        let o = e.tiles[t];
        o.data.layerIdx = o.data.layerIdx || 0;
        let i = l.get(o.data.confId) || [];
        i.push(o);
        l.set(o.data.confId, i);
      }
      let c = Array.from(l);
      for (let e = 0; e < c.length; e++) {
        let o = c[e][1];
        for (let e = 0; e < o.length; e++) {
          let i = o[e];
          if (!i.data.onlyOnce || !R.default.Ins.getTileFlag(t, i.data.id)) {
            let e = this.tiledMap.addTileInLayer(i.data.layerIdx, i.pos.iCol, i.pos.iRow);
            e.node.name = i.data.id;
            yield e.setData(i.data);
          }
        }
      }
      for (let o = 0; o < e.actors.length; o++) {
        let i = e.actors[o];
        if (!i.data.onlyOnce || !R.default.Ins.getActorFlag(t, i.data.id)) {
          let e = this.addActor(i.pos);
          yield e.setData(i.data);
        }
      }
      for (let o = 0; o < e.devices.length; o++) {
        let i = e.devices[o];
        if (!i.data.onlyOnce || !R.default.Ins.getDeviceFlag(t, i.data.id)) {
          let e = yield G.Mng.Ins.deviceMng.loadOne(i.data.confId);
          if (e) {
            let t = yield this.addDevice(i.pos, e ? e.prefabName : "ErrorDevice");
            t ? yield t.setData(i.data, e) : console.log("Julian", e.prefabName);
          }
        }
      }
      for (let o = 0; o < e.props.length; o++) {
        let i = e.props[o];
        if (!i.data.onlyOnce || !R.default.Ins.getPropFlag(t, i.data.id)) {
          let e = yield this.addProp(i.pos);
          yield e.setData(i.data);
        }
      }
      this.tilePhysics.Init(this.tiledMap);
    });
  }
  makeWorldLayout() {
    this.worldLayout.startPoint.pos = {
      x: this.startPoint.node.x,
      y: this.startPoint.node.y
    };
    let e = {
      type: this.worldLayout.type,
      bgColor: {
        r: this.bg.color.r,
        g: this.bg.color.g,
        b: this.bg.color.b,
        a: this.bg.color.a
      },
      size: {
        col: this.tiledMap.nCol,
        row: this.tiledMap.nRow
      },
      actors: [],
      devices: [],
      props: [],
      tiles: [],
      incId: this.worldLayout.incId,
      onStart: this.worldLayout.onStart || [],
      gsData: this.worldLayout.gsData,
      cameraRatio: this.worldLayout.cameraRatio,
      startPoint: this.worldLayout.startPoint
    };
    void 0 === e.gsData && delete e.gsData;
    void 0 === e.cameraRatio && delete e.cameraRatio;
    for (let t = 0; t < this.actors.length; t++) {
      let o = this.actors[t];
      e.actors.push({
        pos: {
          x: o.node.x,
          y: o.node.y
        },
        data: l.Util.deepCopy(o.data)
      });
    }
    for (let t = 0; t < this.devices.length; t++) {
      let o = this.devices[t];
      e.devices.push({
        pos: {
          x: o.node.x,
          y: o.node.y
        },
        data: l.Util.deepCopy(o.data)
      });
    }
    for (let t = 0; t < this.props.length; t++) {
      let o = this.props[t];
      e.props.push({
        pos: {
          x: o.node.x,
          y: o.node.y
        },
        data: o.data
      });
    }
    let t = this.tiledMap.getAllTiles();
    for (let o = 0; o < t.length; o++) {
      let i = t[o];
      e.tiles.push({
        pos: {
          iCol: i.iCol,
          iRow: i.iRow
        },
        data: l.Util.deepCopy(i.data)
      });
    }
    return e;
  }
  reset() {
    this.tiledMap.reset();
    let e = this.actors,
      t = this.devices,
      o = this.props,
      i = this.bullets;
    for (let t = e.length - 1; t >= 0; t--) this.removeActor(e[t]);
    for (let e = t.length - 1; e >= 0; e--) this.removeDevice(t[e]);
    for (let e = o.length - 1; e >= 0; e--) this.removeProp(o[e]);
    for (let e = i.length - 1; e >= 0; e--) this.removeBullet(i[e]);
    this.actors = [];
    this.devices = [];
    this.props = [];
    this.bullets = [];
    this.setBgColor(cc.Color.BLACK);
  }
  clear() {}
  setBgColor(e) {
    this.bg.color = cc.color(e.r, e.g, e.b, 255);
  }
  update(e) {
    let t = this.cameraFollowCtrl.node;
    if (!this.isGameScene) {
      t = this.camera.node;
      this.startPoint.node.active = !this.hero;
      this.hero && this.startPoint.SetPosition(this.hero.node.x, this.hero.node.y);
      this.startPoint.ApplyPosition();
    }
    orange.TimeUtil.serverTime;
    this.playing && this.tilePhysics.Step(this.bodys);
    orange.TimeUtil.serverTime;
    let o = w.default.width / this.camera.zoomRatio,
      i = w.default.height / this.camera.zoomRatio,
      n = t.anchorX,
      a = t.anchorY,
      r = t.x - o * n,
      l = t.y - i * a;
    this._rect_t.x = r;
    this._rect_t.y = l;
    this._rect_t.width = o;
    this._rect_t.height = i;
    orange.TimeUtil.serverTime;
    for (let e of this.bodys) {
      e.ApplyPosition();
      if (this.worldData.info.type == M.WorldType.Rpg) {
        e.node.parent == this.actorContent && (e.node.zIndex = -e.getBoundingBox().yMin);
        e.node.getComponent(p.default) && (e.node.zIndex += 10);
      }
      if (!e.setCutting) continue;
      let t = e.getBoundingBox(),
        o = this._rect_t.intersects(t);
      e.setCutting(!o);
    }
    orange.TimeUtil.serverTime;
    this.tiledMap.checkOutScreen(this._rect_t);
    orange.TimeUtil.serverTime;
    s.GSRunnerMng.instance.step();
  }
};
N.PAUSE = "WorldPause";
N.RESUME = "WorldResume";
N.HERO_MOVE = "HERO_MOVE";
N.unionActSet = new P.UnionSet();
n([F(cc.Node)], N.prototype, "bg", void 0);
n([F(f.default)], N.prototype, "cameraFollowCtrl", void 0);
n([F(cc.Camera)], N.prototype, "camera", void 0);
n([F(B.default)], N.prototype, "startPoint", void 0);
n([F(r.default)], N.prototype, "actorPool", void 0);
n([F(r.default)], N.prototype, "propPool", void 0);
n([F(r.default)], N.prototype, "bulletPool", void 0);
n([F(r.default)], N.prototype, "floatLabelPool", void 0);
n([F(r.default)], N.prototype, "textBubblePool", void 0);
n([F(cc.Graphics)], N.prototype, "graphics", void 0);
n([F(h.default)], N.prototype, "tiledMap", void 0);
n([F(cc.Node)], N.prototype, "content", void 0);
n([F([T.default])], N.prototype, "layerContents", void 0);
n([F(cc.Node)], N.prototype, "actorContent", void 0);
n([F(cc.Node)], N.prototype, "deviceContent", void 0);
n([F(cc.Node)], N.prototype, "bulletContent", void 0);
n([F(cc.Node)], N.prototype, "propContent", void 0);
n([F(cc.Node)], N.prototype, "effectContent", void 0);
n([F(g.default)], N.prototype, "placeGizmos", void 0);
n([F(y.default)], N.prototype, "selectGizmos", void 0);
n([F(C.default)], N.prototype, "interactGizmos", void 0);
n([F(cc.Node)], N.prototype, "floatLabelContent", void 0);
N = i = n([k], N);
exports.default = N;