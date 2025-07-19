"use strict";

var i,
  n = this && this.__decorate || function (e, t, o, i) {
    var n,
      a = arguments.length,
      s = a < 3 ? t : null === i ? i = Object.getOwnPropertyDescriptor(t, o) : i;
    if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) s = Reflect.decorate(e, t, o, i);else for (var r = e.length - 1; r >= 0; r--) (n = e[r]) && (s = (a < 3 ? n(s) : a > 3 ? n(t, o, s) : n(t, o)) || s);
    return a > 3 && s && Object.defineProperty(t, o, s), s;
  };
const a = e("../../Game/Device/Decorator"),
  s = e("../../Game/World/Gizmos/PlaceGizmos"),
  r = e("../../Game/World/TouchWorldCtrl"),
  l = e("../../GameData/GameTypeDefine"),
  c = e("./EditWorldScene"),
  d = e("./Page/ActorPage"),
  h = e("./Page/TilePage"),
  {
    ccclass: p,
    property: u
  } = cc._decorator;
let m = i = class extends cc.Component {
  constructor() {
    super(...arguments);
    this.editWorldScene = null;
    this.lastList = [];
    this.clickIdx = 0;
  }
  onLoad() {
    i.Ins = this;
    cc.game.on(r.default.CLICK_WORLD, this.onClickWorld, this);
  }
  onDestroy() {
    i.Ins = null;
    cc.game.off(r.default.CLICK_WORLD, this.onClickWorld, this);
  }
  onClickWorld(e) {
    let t = this.editWorldScene.world;
    if (!t) return;
    if (t.placeGizmos.node.active) {
      t.placeGizmos.hide();
      cc.game.emit(s.default.PlaceGizmos_Confirm);
    }
    let o = this.editWorldScene.elementBox.getComponentInChildren(h.default);
    if (o && o.isPencilOrEraser()) return;
    let i = cc.v2(e.x, e.y),
      n = [],
      r = t.tiledMap.tileLayers.length - 1;
    if (t.tiledMap.isLayerVisable(r) && e.iCol >= 0 && e.iCol < t.tiledMap.nCol && e.iRow >= 0 && e.iRow < t.tiledMap.nRow) {
      let o = t.tiledMap.getLayerTile(r, e.iCol, e.iRow);
      o && n.push({
        type: "tile",
        target: o
      });
    }
    --r;
    for (let e = t.actors.length - 1; e >= 0; e--) {
      let o = t.actors[e];
      o.getBoundingBox().contains(i) && n.push({
        type: "actor",
        target: o
      });
    }
    for (let e = t.props.length - 1; e >= 0; e--) {
      let o = t.props[e];
      o.getBoundingBox().contains(i) && n.push({
        type: "prop",
        target: o
      });
    }
    for (let e = t.devices.length - 1; e >= 0; e--) {
      let o = t.devices[e];
      if (o instanceof a.default) {
        let e = o.getLayer();
        if (e != l.DecoratorLayerType.Map && e != l.DecoratorLayerType.MapFore && e != l.DecoratorLayerType.Foreground01) continue;
      }
      o.getBoundingBox().contains(i) && n.push({
        type: "device",
        target: o
      });
    }
    t.startPoint.node.active && t.startPoint.getBoundingBox().contains(i) && n.push({
      type: "startPoint",
      target: t.startPoint
    });
    for (; r >= 0;) {
      if (t.tiledMap.isLayerVisable(r) && e.iCol >= 0 && e.iCol < t.tiledMap.nCol && e.iRow >= 0 && e.iRow < t.tiledMap.nRow) {
        let o = t.tiledMap.getLayerTile(r, e.iCol, e.iRow);
        o && n.push({
          type: "tile",
          target: o
        });
      }
      --r;
    }
    for (let e = t.devices.length - 1; e >= 0; e--) {
      let o = t.devices[e];
      if (o instanceof a.default) {
        let e = o.getLayer();
        if (e != l.DecoratorLayerType.Background01 && e != l.DecoratorLayerType.Background02 && e != l.DecoratorLayerType.MapBack) continue;
      }
      o.getBoundingBox().contains(i) && n.push({
        type: "device",
        target: o
      });
    }
    let c = n.length == this.lastList.length;
    if (c) for (let e = 0; e < n.length; e++) if (n[e].target != this.lastList[e].target) {
      c = !1;
      break;
    }
    if (!c) {
      this.lastList = n;
      this.clickIdx = -1;
    }
    if (0 == n.length) {
      this.editWorldScene.elementBox.show();
      this.editWorldScene.inspector.hide();
      return;
    }
    this.clickIdx = (this.clickIdx + 1) % n.length;
    let d = n[this.clickIdx];
    switch (d.type) {
      case "tile":
        this.clickTile(d.target);
        break;
      case "actor":
        this.clickActor(d.target);
        break;
      case "device":
        this.clickDevice(d.target);
        break;
      case "prop":
        this.clickProp(d.target);
        break;
      case "startPoint":
        this.clickStartPoint(d.target);
    }
  }
  clickStartPoint(e) {
    this.editWorldScene.inspector.tempData = null;
    this.editWorldScene.inspector.selectType = "";
    let t = this.editWorldScene,
      o = t.world;
    t.elementBox.hide();
    t.inspector.reset();
    e.initInspector(t.inspector);
    t.inspector.tempData = e;
    t.inspector.selectType = "startPoint";
    t.inspector.show();
    o.placeGizmos.show({
      scale: 1,
      target: null,
      body: e,
      canPlaceType: s.CanPlaceType.All,
      noCancel: !0,
      onConfirm: () => {},
      onCancel: () => {},
      onComplete: () => {
        t.elementBox.show();
        t.inspector.hide();
      },
      onRotate: () => {}
    });
  }
  clickActor(e) {
    this.editWorldScene.inspector.tempData = null;
    this.editWorldScene.inspector.selectType = "";
    let t = this.editWorldScene,
      o = t.world;
    t.elementBox.hide();
    t.inspector.reset();
    e.initInspector(t.inspector);
    t.inspector.tempData = e;
    t.inspector.selectType = "actor";
    t.inspector.show();
    o.placeGizmos.show({
      scale: e.data.scale,
      target: null,
      body: e,
      canPlaceType: s.CanPlaceType.DecorateTile | s.CanPlaceType.EmptySpace,
      showFlipX: !0,
      onConfirm: () => {},
      onCancel: () => {
        o.removeActor(e);
        cc.game.emit(d.default.ActorPage_DEL_ACTOR, e.data);
      },
      onComplete: () => {
        t.elementBox.show();
        t.inspector.hide();
      },
      onFlipX: () => {
        e.setScaleX(-e.getScaleX());
      }
    });
    cc.game.emit(i.TouchWorldShowGizmos_CLICK_ACTOR, e);
  }
  clickDevice(e) {
    this.editWorldScene.inspector.tempData = null;
    this.editWorldScene.inspector.selectType = "";
    let t = this.editWorldScene,
      o = t.world;
    t.elementBox.hide();
    t.inspector.reset();
    e.initInspector(t.inspector);
    t.inspector.tempData = e;
    t.inspector.selectType = "device";
    t.inspector.show();
    o.placeGizmos.show({
      scale: e.data.extra ? e.data.extra.scale : 1,
      target: null,
      body: e,
      canPlaceType: s.CanPlaceType.All,
      rotateArr: e.rotateAngles,
      rotateIdx: e.data.rotateIdx,
      onConfirm: () => {},
      onCancel: () => {
        o.removeDevice(e);
      },
      onComplete: () => {
        t.elementBox.show();
        t.inspector.hide();
      },
      onRotate: t => {
        e.data.rotateIdx = t;
      }
    });
    cc.game.emit(i.TouchWorldShowGizmos_CLICK_DEVICE, e);
  }
  clickProp(e) {
    this.editWorldScene.inspector.tempData = null;
    let t = this.editWorldScene,
      o = t.world;
    t.elementBox.hide();
    t.inspector.reset();
    e.initInspector(t.inspector);
    t.inspector.tempData = e;
    t.inspector.selectType = "prop";
    t.inspector.show();
    o.placeGizmos.show({
      target: null,
      body: e,
      canPlaceType: s.CanPlaceType.DecorateTile | s.CanPlaceType.EmptySpace,
      onConfirm: () => {},
      onCancel: () => {
        o.removeProp(e);
      },
      onComplete: () => {
        t.elementBox.show();
        t.inspector.hide();
      }
    });
  }
  clickTile(e) {
    this.editWorldScene.inspector.tempData = null;
    this.editWorldScene.inspector.selectType = "";
    let t = this.editWorldScene,
      o = t.world;
    t.selectTileMapLayer(e.data.layerIdx || 0);
    t.elementBox.hide();
    t.inspector.reset();
    e.initInspector(t.inspector);
    t.inspector.tempData = e;
    t.inspector.selectType = "tile";
    t.inspector.show();
    o.placeGizmos.show({
      target: e.node,
      body: null,
      canPlaceType: s.CanPlaceType.EmptySpace,
      layerIdx: e.data.layerIdx || 0,
      onConfirm: () => {},
      onCancel: () => {
        o.tiledMap.removeTile(e.iCol, e.iRow);
      },
      onComplete: () => {
        t.elementBox.show();
        t.inspector.hide();
      }
    });
  }
};
m.TouchWorldShowGizmos_CLICK_ACTOR = "TouchWorldShowGizmos_CLICK_ACTOR";
m.TouchWorldShowGizmos_CLICK_DEVICE = "TouchWorldShowGizmos_CLICK_DEVICE";
m.Ins = null;
n([u(c.default)], m.prototype, "editWorldScene", void 0);
m = i = n([p], m);
exports.default = m;