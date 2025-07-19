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
const s = e("../../../CustomUI/ScrollList"),
  r = e("../../../CustomUI/ToggleGroup"),
  l = e("../../../Game/OperationFlow"),
  c = e("../../../Game/Player/DynamicMng"),
  d = e("../../../Game/Player/Mng"),
  h = e("../../../Game/World/TouchWorldCtrl"),
  p = e("../../../GameData/GameTypeDefine"),
  u = e("../EditWorldScene"),
  m = e("./EditPageBase"),
  {
    ccclass: f,
    property: g
  } = cc._decorator;
var y;
(function (e) {
  e[e.Move = 0] = "Move";
  e[e.Pencil = 1] = "Pencil";
  e[e.Eraser = 2] = "Eraser";
})(y || (y = {}));
let v = i = class extends m.EditPageBase {
  constructor() {
    super(...arguments);
    this.editWorldScene = null;
    this.toggleGroup = null;
    this.tileList = null;
    this.preEraserTool = y.Move;
  }
  onLoad() {
    this.node.on(h.default.BRUSH_TILE, this.onBrushTile, this);
    this.toggleGroup.node.on(r.default.TOGGLE_CHANGE, this.onToggleChange, this);
    this.tileList.node.on(s.default.CLICK_ITEM, this.onClickTileCell, this);
    this.tileList.node.on(s.default.SELECT_ITEM, this.onSelectTile, this);
    this.tileList.canSelect = e => !e.createNew;
  }
  onEnable() {
    return a(this, void 0, void 0, function* () {
      cc.game.on("refreshTileList", this.refreshList, this);
      this.toggleGroup.selectIdx(y.Move);
      yield this.refreshList();
      this.editWorldScene.gameData.parnetGame || cc.game.emit(i.TilePage_Enable, this);
    });
  }
  onDisable() {
    cc.game.off("refreshTileList", this.refreshList, this);
    this.editWorldScene.cameraDragCtrl.enabled = !0;
    this.toggleGroup.selectIdx(y.Move);
  }
  refreshList() {
    return a(this, void 0, void 0, function* () {
      this.editWorldScene.elementBox.emptyLabel.node.active = !1;
      let e = this.editWorldScene.elementBox.filter.getCurData();
      if (!e) return;
      let t = yield d.Mng.Ins.assetGroupMng.findGroup(e.str);
      t || (t = d.Mng.Ins.assetGroupMng.all);
      let o = [];
      for (let e of t.refDataList) e.confType == p.CommonDataType.Tile && o.push(e.confId);
      let i = yield d.Mng.Ins.tileMng.loadMany(o);
      i = i.filter(e => e && e.id);
      let n = [];
      c.DynamicMng.Ins.isDisable(c.FunctionEnum.PaintAsset, !1) || n.push({
        createNew: !0
      });
      n = n.concat(i);
      this.tileList.setDataArr(n);
      this.tileList.selectByIdx(1);
      this.editWorldScene.elementBox.emptyLabel.node.active = 1 == n.length;
    });
  }
  isPencilOrEraser() {
    let e = this.toggleGroup.idx;
    return e == y.Pencil || e == y.Eraser;
  }
  onSelectTile(e) {
    this.toggleGroup.idx == y.Eraser && this.toggleGroup.selectIdx(this.preEraserTool);
  }
  onToggleChange(e, t) {
    this.editWorldScene.cameraDragCtrl.enabled = e == y.Move;
    e == y.Eraser && (this.preEraserTool = t);
  }
  onBrushTile(e) {
    let t = this.tileList.getCurData(),
      o = this.editWorldScene.world.tiledMap;
    if (!(e.iCol < 0 || e.iRow < 0 || e.iCol >= o.nCol || e.iRow >= o.nRow)) switch (this.toggleGroup.idx) {
      case y.Pencil:
        this.instanceTile(e.iCol, e.iRow, t);
        cc.game.emit(i.TilePage_PUT_TILE, t);
        break;
      case y.Eraser:
        o.removeTile(e.iCol, e.iRow);
        cc.game.emit(i.TilePage_DEL_TILE);
    }
  }
  instanceTile(e, t, o) {
    if (!o) return;
    let i = this.editWorldScene.world,
      n = i.tiledMap;
    n.setLayerVisable(n.selectedLayerIdx, !0);
    if (!n.canPlaceTile(o, !0)) return;
    let a = n.getTile(e, t);
    a || (a = n.addTile(e, t));
    let s = null,
      r = {
        id: s = a.data ? a.data.id : "tile" + i.worldLayout.incId++,
        layerIdx: n.selectedLayerIdx,
        confId: o.id,
        isTemplete: !0,
        tilePhyType: o.tilePhyType,
        dataBlock: o.dataBlock,
        dataDestroy: o.dataDestroy,
        dataPass: o.dataPass
      };
    a.setData(r);
  }
  onClickTileCell(e, t) {
    let o = this.editWorldScene.world;
    if (t && t.createNew) {
      let e = p.TileType.All;
      o.worldData.info.type == p.WorldType.Jump && (e = p.TileType.Jump);
      o.worldData.info.type == p.WorldType.Rpg && (e = p.TileType.RPG);
      l.OperationFlow.paintTile(e, e => {
        this.refreshList();
        cc.game.emit(i.TilePage_CREATE_TILE, e);
      });
    }
  }
};
v.TilePage_Enable = "TilePage_Enable";
v.TilePage_PUT_TILE = "TilePage_PUT_TILE";
v.TilePage_DEL_TILE = "TilePage_DEL_TILE";
v.TilePage_CREATE_TILE = "TilePage_CREATE_TILE";
n([g(u.default)], v.prototype, "editWorldScene", void 0);
n([g(r.default)], v.prototype, "toggleGroup", void 0);
n([g(s.default)], v.prototype, "tileList", void 0);
v = i = n([f], v);
exports.default = v;