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
const s = e("../../CustomUI/Button"),
  r = e("../../Frame/EngineManager"),
  l = e("../../Frame/Scene"),
  c = e("../../Frame/SceneManager"),
  d = e("../../Frame/Top"),
  h = e("../../Frame/UIColor"),
  p = e("../../Frame/Util"),
  u = e("../../Game/GameBoard"),
  m = e("../../Game/Player/Mng"),
  f = e("../../Game/World/CameraDragCtrl"),
  g = e("../../Game/World/TouchWorldCtrl"),
  y = e("../../Game/World/World"),
  v = e("./ElementBox"),
  C = e("./Inspector"),
  _ = e("../../Game/OperationFlow"),
  S = e("../../Frame/CrossPlatform"),
  I = e("../../Game/Player/LifeMng"),
  G = e("../../CustomUI/DropDownBox"),
  T = e("../../Game/World/Actor"),
  b = e("../../Game/Player/TriggerMng"),
  M = e("../../GameData/GameTypeDefine"),
  {
    ccclass: P,
    property: D
  } = cc._decorator;
let w = i = class extends l.default {
  constructor() {
    super(...arguments);
    this.cameraDragCtrl = null;
    this.touchWorldCtrl = null;
    this.backBtn = null;
    this.guideBtn = null;
    this.playBtn = null;
    this.saveBtn = null;
    this.submitBtn = null;
    this.applyBtn = null;
    this.inspector = null;
    this.elementBox = null;
    this.optionBtn = null;
    this.worldNameLabel = null;
    this.dropDownTileMapLayer = null;
    this.world = null;
    this.gameData = null;
    this.worldData = null;
    this.mode = "Mine";
    this.submitCall = null;
    this.applyCall = null;
    this._testHeroData = null;
  }
  onLoad() {
    b.default.init();
    this.backBtn.node.on(s.default.CLICK, this.onBackBtnTap, this);
    this.guideBtn.node.on(s.default.CLICK, this.onGuideBtn, this);
    this.playBtn.node.on(s.default.CLICK, this.onPlayBtnTap, this);
    this.saveBtn.node.on(s.default.CLICK, this.onSaveBtnTap, this);
    this.optionBtn.node.on(s.default.CLICK, this.onOptionBtn, this);
    this.submitBtn.node.on(s.default.CLICK, this.onSubmitBtn, this);
    this.applyBtn.node.on(s.default.CLICK, this.onApplyBtn, this);
    this.cameraDragCtrl.node.on(f.default.ZOOM_CHANGE, this.onCameraZoom, this);
    this.inspector.node.active = !1;
    this.submitBtn.node.active = !1;
    this.applyBtn.node.active = !1;
    this.schedule(this.saveToLocal, 60);
    this.dropDownTileMapLayer.node.on(G.default.SELECT_CHANGE, this.onDropDownTileMapLayerChange, this);
  }
  onDropDownTileMapLayerChange(e, t, o) {
    this.world.tiledMap.selectedLayerIdx = t.layerIdx;
    this.world.tiledMap.setLayerVisable(t.layerIdx, !0);
  }
  selectTileMapLayer(e) {
    this.world.tiledMap.selectedLayerIdx = e;
    this.world.tiledMap.setLayerVisable(e, !0);
    this.dropDownTileMapLayer.selectByIdx(this.world.tiledMap.tileLayers.length - 1 - e);
  }
  isTileMapLayerVisable(e) {
    return this.world.tiledMap.isLayerVisable(e);
  }
  setTileMapLayerVisable(e, t) {
    this.world.tiledMap.setLayerVisable(e, t);
  }
  onShow(e) {
    _.OperationFlow.deelOnShow(e);
  }
  onOptionBtn() {
    c.default.ins.OpenPanelByName("WorldOptionPanel", e => {
      e.setData(this.worldData, this.world.worldLayout);
      e.call = () => {
        this.world.setBgColor(this.world.worldLayout.bgColor);
        this.world.repaintGrid();
      };
    });
  }
  onCameraZoom(e) {
    if (this.world) {
      this.world.graphics.lineWidth = 2 / e;
      this.world.repaintGrid();
    }
  }
  onEnterScene() {
    u.GameBoard.IS_EDITOR_MODE = !0;
    r.default.Ins.mainCamera.node.active = !1;
    this.inspector.node.active ? this.inspector.show() : this.elementBox.show(!0);
  }
  onExitScene() {
    u.GameBoard.IS_EDITOR_MODE = !1;
    r.default.Ins.mainCamera.node.active = !0;
    S.crossPlatform.removeStorageSync("EditWorldSceneTempSave");
  }
  setDataByTalkProject(e, t, o) {
    return a(this, void 0, void 0, function* () {
      this.mode = "TalkProject";
      this.submitBtn.node.active = !e;
      this.applyBtn.node.active = e;
      yield this.setData(t, o);
      this.saveBtn.node.active = !1;
    });
  }
  setData(e, t, o = null) {
    return a(this, void 0, void 0, function* () {
      d.default.blockInput(!0, "loadWorld");
      this.gameData = e;
      this.worldData = t;
      m.Mng.Ins.assetGroupMng.curGroupName = t.info.selectedActorGroup;
      this.elementBox.refresh();
      this.saveBtn.node.active = !t.belongGameId;
      this.worldNameLabel.string = t.info.name;
      let n = yield p.Util.loadBundleRes("Prefab/World"),
        s = cc.instantiate(n);
      this.node.insertChild(s, 1);
      let r = s.getComponent(y.default);
      this.world = r;
      o || (o = t.worldLayout);
      o || (o = {
        type: t.info.type,
        size: t.info.size,
        bgColor: {
          r: 255,
          g: 255,
          b: 255,
          a: 255
        },
        tiles: [],
        actors: [],
        devices: [],
        props: [],
        incId: 0,
        onStart: [],
        gsData: {
          worldId: this.worldData.id,
          scriptArray: []
        },
        cameraRatio: 1
      });
      o = p.Util.deepCopy(o);
      r.setWorldData(t);
      yield r.initByWorldLayout(o);
      r.actors.forEach(e => a(this, void 0, void 0, function* () {
        (yield e.getTeamGizmo()).setTeam(e.data.team);
      }));
      this.touchWorldCtrl.setWorld(r);
      this.cameraDragCtrl.setCamera(r.camera, r.node);
      let l = r.findHeroActor();
      l ? this.cameraDragCtrl.centerOn(l.node) : this.cameraDragCtrl.centerOn(this.world.startPoint.node);
      r.hero = l;
      d.default.blockInput(!1, "loadWorld");
      this.worldData.belongGameId && (S.crossPlatform.getStorageSync("templateWorldTip") || c.default.ins.OpenPanelByName("TemplateWorldTipPanel", e => {
        e.call = e => {
          e && S.crossPlatform.setStorageSync("templateWorldTip", !0);
        };
      }));
      let h = [{
          str: "顶层",
          layerIdx: 2,
          delSetVisable: this.setTileMapLayerVisable.bind(this),
          delIsVisable: this.isTileMapLayerVisable.bind(this)
        }, {
          str: "中层",
          layerIdx: 1,
          delSetVisable: this.setTileMapLayerVisable.bind(this),
          delIsVisable: this.isTileMapLayerVisable.bind(this)
        }, {
          str: "底层",
          layerIdx: 0,
          delSetVisable: this.setTileMapLayerVisable.bind(this),
          delIsVisable: this.isTileMapLayerVisable.bind(this)
        }],
        u = 50 * h.length + 1;
      this.dropDownTileMapLayer.list.node.height = u;
      this.dropDownTileMapLayer.list.node.y = u - 10;
      p.Util.updateAllWidget(this.dropDownTileMapLayer.node);
      this.dropDownTileMapLayer.setDataArr(h);
      t.info.type == M.WorldType.Jump ? this.dropDownTileMapLayer.selectByIdx(1) : t.info.type == M.WorldType.Rpg && this.dropDownTileMapLayer.selectByIdx(2);
      cc.game.emit(i.EditWorldScene_Entered, this);
    });
  }
  onBackBtnTap() {
    return a(this, void 0, void 0, function* () {
      this.worldData.info.selectedActorGroup = m.Mng.Ins.assetGroupMng.curGroupName;
      if (this.worldData.belongGameId) {
        c.default.ins.Back();
        return;
      }
      let e = this.worldData.worldLayout,
        t = this.world.makeWorldLayout();
      p.Util.deepCompare(e, t) ? c.default.ins.Back() : c.default.ins.OpenPanelByName("MessageBox", e => {
        if ("Mine" == this.mode) {
          e.label.string = "是否保存地图？";
          e.setLeftBtn({
            text: "放弃修改",
            color: h.UIColor.pink,
            call: () => {
              c.default.ins.Back();
            }
          });
          e.setRightBtn({
            text: "保存退出",
            color: h.UIColor.blue,
            call: () => a(this, void 0, void 0, function* () {
              yield this.onSaveBtnTap();
              c.default.ins.Back();
            })
          });
        } else if ("TalkProject" == this.mode) {
          e.label.string = "是否放弃修改？";
          e.setLeftBtn({
            text: "放弃修改",
            color: h.UIColor.pink,
            call: () => {
              c.default.ins.Back();
            }
          });
          e.setRightBtn({
            text: "点错了",
            color: h.UIColor.blue
          });
        }
      });
    });
  }
  onGuideBtn() {}
  onPlayBtnTap() {
    this.world.findHeroActor() ? this.testPlay() : c.default.ins.OpenPanelByName("SelectHeroPanel", e => {
      e.titleLabel.string = "选择主角，开始测试";
      e.setData(this._testHeroData ? this._testHeroData.confId : null);
      e.selectCall = e => {
        this._testHeroData = T.default.createActorData(e, M.Team.Hero, this.world.worldLayout);
        this.testPlay();
      };
    });
  }
  testPlay() {
    let e = this.saveToTempWorldDataMap();
    c.default.ins.Enter("GameScene", t => {
      t.mode = "Test";
      I.LifeMng.Ins.setLife(this.gameData.id, I.LifeMng.Ins.max);
      t.play(this.gameData, e.id, this._testHeroData);
    });
  }
  saveToTempWorldDataMap() {
    let e = {
      id: this.worldData.id,
      info: this.worldData.info,
      layoutMin: null,
      worldLayout: this.world.makeWorldLayout(),
      belongGameId: this.worldData.belongGameId
    };
    m.Mng.Ins.worldMng.tempCache.set(e.id, e);
    return e;
  }
  onSaveBtnTap() {
    return a(this, void 0, void 0, function* () {
      d.default.showLoading("正在保存");
      this.worldData.info.selectedActorGroup = m.Mng.Ins.assetGroupMng.curGroupName;
      let e = this.world.makeWorldLayout();
      this.worldData.layoutMin = p.Util.zip(e);
      if (yield m.Mng.Ins.worldMng.save(this.worldData, !0)) {
        S.crossPlatform.removeStorageSync("EditWorldSceneTempSave");
        this.worldData.worldLayout = e;
        d.default.hideLoading("保存成功");
        cc.game.emit(i.EditWorldScene_Save, this);
      } else d.default.hideLoading("保存失败");
    });
  }
  onSubmitBtn() {
    return a(this, void 0, void 0, function* () {
      let e = this.world.makeWorldLayout();
      p.Util.deepCompare(e, this.world.worldLayout) ? d.default.showToast("没有任何改动") : c.default.ins.OpenPanelByName("SubmitWorldPanel", e => {
        e.call = e => a(this, void 0, void 0, function* () {
          let t = this.submitCall,
            o = this.world.makeWorldLayout();
          c.default.ins.Back(() => {
            t && t(e, o);
          });
        });
      });
    });
  }
  onApplyBtn() {
    return a(this, void 0, void 0, function* () {
      c.default.ins.OpenPanelByName("ApplyWorldPanel", e => {
        "test" == this.worldData.id ? e.tipLabel.string = `此地图【${this.worldData.info.name}】将会添加到你的游戏中` : e.tipLabel.string = `将会覆盖你原来的地图【${this.worldData.info.name}】`;
        e.call = e => {
          let t = this.applyCall,
            o = this.world.makeWorldLayout();
          c.default.ins.Back(() => {
            t && t(e, o);
          });
        };
      });
    });
  }
  saveToLocal() {
    if (!this.worldData || this.worldData.belongGameId) return;
    if ("Mine" !== this.mode) return;
    let e = this.world.makeWorldLayout();
    S.crossPlatform.setStorage({
      key: "EditWorldSceneTempSave",
      data: {
        gameId: this.gameData.id,
        worldId: this.worldData.id,
        worldLayout: e
      }
    });
  }
  setHero(e) {
    return a(this, void 0, void 0, function* () {
      for (let t = 0; t < this.world.actors.length; t++) {
        let o = this.world.actors[t];
        o.data.id == e && (yield o.getTeamGizmo()).setTeam(M.Team.Hero);
      }
    });
  }
  hideUnuseBtns() {
    this.dropDownTileMapLayer.node.active = !1;
    this.worldNameLabel.node.active = !1;
    this.backBtn.node.active = !1;
    this.optionBtn.node.active = !1;
    this.saveBtn.node.active = !1;
    this.playBtn.node.active = !1;
  }
  showUnuseBtns() {
    this.dropDownTileMapLayer.node.active = !0;
    this.worldNameLabel.node.active = !0;
    this.backBtn.node.active = !0;
    this.optionBtn.node.active = !0;
    this.saveBtn.node.active = !0;
    this.playBtn.node.active = !0;
  }
};
w.EditWorldScene_Entered = "EditWorldScene_Entered";
w.EditWorldScene_Save = "EditWorldScene_Save";
n([D(f.default)], w.prototype, "cameraDragCtrl", void 0);
n([D(g.default)], w.prototype, "touchWorldCtrl", void 0);
n([D(s.default)], w.prototype, "backBtn", void 0);
n([D(s.default)], w.prototype, "guideBtn", void 0);
n([D(s.default)], w.prototype, "playBtn", void 0);
n([D(s.default)], w.prototype, "saveBtn", void 0);
n([D(s.default)], w.prototype, "submitBtn", void 0);
n([D(s.default)], w.prototype, "applyBtn", void 0);
n([D(C.default)], w.prototype, "inspector", void 0);
n([D(v.default)], w.prototype, "elementBox", void 0);
n([D(s.default)], w.prototype, "optionBtn", void 0);
n([D(cc.Label)], w.prototype, "worldNameLabel", void 0);
n([D(G.default)], w.prototype, "dropDownTileMapLayer", void 0);
w = i = n([P], w);
exports.default = w;