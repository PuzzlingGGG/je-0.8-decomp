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
  h = e("../../Frame/TweenUtil"),
  p = e("../../Frame/UIColor"),
  u = e("../../Frame/Util"),
  m = e("../../Game/Player/Mng"),
  f = e("../../TGA"),
  g = e("../HomeScene/HomeScene"),
  y = e("./WorldCell"),
  v = e("./WorldCellMenu"),
  C = e("../../Game/OperationFlow"),
  _ = e("../../Game/Player/DynamicMng"),
  S = e("../../Game/World/CameraDragCtrl"),
  I = e("../../../scripts/_autogen/data/data"),
  G = e("../../Game/Player/GuideMng"),
  T = e("../../Game/Hortor"),
  {
    ccclass: b,
    property: M
  } = cc._decorator;
let P = i = class extends l.default {
  constructor() {
    super(...arguments);
    this.touchNode = null;
    this.backBtn = null;
    this.deleteBtn = null;
    this.gameNameLabel = null;
    this.newWorldBtn = null;
    this.playBtn = null;
    this.variablesBtn = null;
    this.publishBtn = null;
    this.guideBtn = null;
    this.offBtn = null;
    this.cameraDragCtrl = null;
    this.content = null;
    this.worldCell = null;
    this.menu = null;
    this.examBtn = null;
    this.gameData = null;
  }
  onLoad() {
    super.onLoad();
    cc.game.on("GameDataChange", this.onGameDataChange, this);
    this.backBtn.node.on(s.default.CLICK, this.onBackBtnTap, this);
    this.deleteBtn.node.on(s.default.CLICK, this.onDeleteBtnClick, this);
    this.newWorldBtn.node.on(s.default.CLICK, this.onNewWorldBtn, this);
    this.publishBtn.node.on(s.default.CLICK, this.onPublishBtn, this);
    this.guideBtn.node.on(s.default.CLICK, this.onGuideBtn, this);
    this.offBtn.node.on(s.default.CLICK, this.onOffBtn, this);
    this.playBtn.node.on(s.default.CLICK, this.onPlayBtn, this);
    this.variablesBtn.node.on(s.default.CLICK, this.onVariablesBtn, this);
    this.examBtn.node.on(s.default.CLICK, this.onExamBtn, this);
    this.menu.hide();
  }
  onShow(e) {
    C.OperationFlow.deelOnShow(e);
  }
  onEnable() {
    this.examBtn.node.active = !1;
    this.guideBtn.node.active = !1;
  }
  onDestroy() {
    cc.game.off("GameDataChange", this.onGameDataChange, this);
  }
  onGameDataChange(e) {
    if (e && e.id == this.gameData.id) {
      this.gameNameLabel.string = e.name;
      this.offBtn.node.active = e.status == I.GameStatus.success;
      this.deleteBtn.node.active = e.status !== I.GameStatus.success;
    }
  }
  onBackBtnTap() {
    return a(this, void 0, void 0, function* () {
      yield m.Mng.Ins.gameMng.save(this.gameData);
      m.Mng.resetExtra();
      c.default.ins.BackTo("HomeScene", e => {
        e instanceof g.default && e.seletePage(g.HomePageIdx.Mine);
      });
    });
  }
  onNewWorldBtn() {
    c.default.ins.OpenPanelByName("CreateWorldTypePanel", e => {
      e.onSeleteType = e => {
        c.default.ins.OpenPanelByName("CreateWorldInfoPanel", t => {
          t.setData(e, this.gameData);
          t.onCreate = e => a(this, void 0, void 0, function* () {
            yield m.Mng.Ins.worldMng.create(e, this.gameData);
            this.createWorldCell(e.id);
          });
        });
      };
    });
  }
  createWorldCell(e) {
    return a(this, void 0, void 0, function* () {
      let t = cc.instantiate(this.worldCell.node);
      this.worldCell.node.parent.addChild(t);
      t.active = !0;
      let o = t.getComponent(y.default);
      yield o.setData(e, this.gameData);
      h.TweenUtil.applyAppear({
        node: t
      });
      this.gameData.worldIds.indexOf(this.gameData.firstWorldId) < 0 && this.setFirstWorld(e);
      cc.game.emit(i.EditGameScene_CreateWorldCell, o);
    });
  }
  onExamBtn() {
    c.default.ins.OpenPanelByName("BeginExamPanel");
  }
  onPlayBtn() {
    this.gameData.worldIds.length <= 0 ? d.default.showToast("游戏至少包含一个地图") : c.default.ins.Enter("GameScene", e => {
      e.mode = "Prod";
      e.play(this.gameData);
    });
  }
  onVariablesBtn() {
    c.default.ins.OpenPanelByName("VariablesPanel", e => {
      e.setData(this.gameData, -1, !1);
    });
  }
  onGuideBtn() {
    c.default.ins.OpenPanelByName("GuidePanel");
  }
  onPublishBtn() {
    _.DynamicMng.Ins.isDisable(_.FunctionEnum.PublishGame, !0) || (T.Hortor.isVisitor() ? C.OperationFlow.openVisitorPanel() : this.gameData.worldIds.length <= 0 ? d.default.showToast("游戏至少包含一个地图") : c.default.ins.OpenPanelByName("PublishGamePanel", e => {
      e.setData(this.gameData);
    }));
  }
  onOffBtn() {
    let e = () => {
      c.default.ins.OpenPanelByName("MessageBox", e => {
        e.label.string = "真的真的真的真的真的\n真的要下架这个游戏吗？";
        e.setLeftBtn({
          text: "确定下架",
          color: p.UIColor.pink,
          call: () => a(this, void 0, void 0, function* () {
            let e = this.gameData;
            d.default.showLoading("正在下架");
            yield m.Mng.Ins.gameMng.off(e.id);
            this.deleteBtn.node.active = !0;
            this.offBtn.node.active = !1;
            d.default.hideLoading("下架成功");
            f.TGA.track("gameOperate", {
              gameId: e.id,
              name: e.name,
              ver: e.version,
              step: "off"
            });
          })
        });
        e.setRightBtn({
          text: "刚刚点错了",
          color: p.UIColor.blue
        });
      });
    };
    c.default.ins.OpenPanelByName("MessageBox", t => {
      t.label.string = "是否下架游戏？（游玩、点赞等数据将会清零）\n";
      t.setLeftBtn({
        text: "下架",
        color: p.UIColor.pink,
        call: e
      });
      t.setRightBtn({
        text: "点错了",
        color: p.UIColor.blue
      });
    });
  }
  onDeleteBtnClick() {
    let e = () => {
      c.default.ins.OpenPanelByName("MessageBox", e => {
        e.label.string = "真的真的真的真的真的\n真的要删除这个游戏吗？";
        e.setLeftBtn({
          text: "确定删除",
          color: p.UIColor.pink,
          call: () => a(this, void 0, void 0, function* () {
            let e = this.gameData;
            d.default.showLoading("正在删除");
            yield m.Mng.Ins.gameMng.delete(e.id);
            d.default.hideLoading("删除成功");
            c.default.ins.Back(e => {
              e.seletePage(g.HomePageIdx.Mine);
            });
            f.TGA.track("gameOperate", {
              gameId: e.id,
              name: e.name,
              ver: e.version,
              step: "delete"
            });
          })
        });
        e.setRightBtn({
          text: "刚刚点错了",
          color: p.UIColor.blue
        });
      });
    };
    c.default.ins.OpenPanelByName("MessageBox", t => {
      t.label.string = "真的要删除这个游戏吗？\n";
      t.setLeftBtn({
        text: "删除",
        color: p.UIColor.pink,
        call: e
      });
      t.setRightBtn({
        text: "点错了",
        color: p.UIColor.blue
      });
    });
  }
  onEnterScene() {
    r.default.Ins.mainCamera.node.active = !1;
  }
  onExitScene() {
    r.default.Ins.mainCamera.node.active = !0;
  }
  setData(e) {
    return a(this, void 0, void 0, function* () {
      cc.game.emit(i.EditGameScene_Entered, this);
      yield m.Mng.switchMineGame(e.id);
      this.gameData = e;
      this.gameNameLabel.string = e.name;
      this.menu.gameData = e;
      this.offBtn.node.active = e.status == I.GameStatus.success;
      this.deleteBtn.node.active = e.status !== I.GameStatus.success;
      u.Util.makeBro(this.worldCell.node, 0);
      d.default.showLoading("加载地图数据");
      yield m.Mng.Ins.variableMng.switchGame(e);
      let t = e.worldIds.concat(m.Mng.Ins.worldMng.extraIds);
      yield m.Mng.Ins.worldMng.loadMany(t);
      this.cameraDragCtrl.camera.node.position = cc.v2(330, 500);
      let o = 0,
        n = 0;
      u.Util.makeBro(this.worldCell.node, t.length, (i, s) => a(this, void 0, void 0, function* () {
        let a = t[s],
          r = i.getComponent(y.default);
        yield r.setData(a, e);
        h.TweenUtil.applyAppear({
          node: i
        });
        o += r.node.x;
        n += r.node.y;
        s == t.length - 1 && (this.cameraDragCtrl.camera.node.position = cc.v2(o / t.length, n / t.length));
      }));
      d.default.hideLoading();
      0 == t.length && G.default.Ins.isComplete(G.GuideId.CreateWorld) && this.onNewWorldBtn();
    });
  }
  setFirstWorld(e) {
    return a(this, void 0, void 0, function* () {
      let t = this.gameData.firstWorldId;
      this.gameData.firstWorldId = e;
      let o = this.worldCell.node.parent;
      for (let i = 0; i < o.childrenCount; i++) {
        let n = o.children[i].getComponent(y.default);
        n.worldId == t && (n.firstFlag.active = !1);
        n.worldId == e && (n.firstFlag.active = !0);
      }
      yield m.Mng.Ins.gameMng.save(this.gameData);
    });
  }
};
P.EditGameScene_Entered = "EditGameScene_Entered";
P.EditGameScene_CreateWorldCell = "EditGameScene_CreateWorldCell";
n([M(cc.Node)], P.prototype, "touchNode", void 0);
n([M(s.default)], P.prototype, "backBtn", void 0);
n([M(s.default)], P.prototype, "deleteBtn", void 0);
n([M(cc.Label)], P.prototype, "gameNameLabel", void 0);
n([M(s.default)], P.prototype, "newWorldBtn", void 0);
n([M(s.default)], P.prototype, "playBtn", void 0);
n([M(s.default)], P.prototype, "variablesBtn", void 0);
n([M(s.default)], P.prototype, "publishBtn", void 0);
n([M(s.default)], P.prototype, "guideBtn", void 0);
n([M(s.default)], P.prototype, "offBtn", void 0);
n([M(S.default)], P.prototype, "cameraDragCtrl", void 0);
n([M(cc.Node)], P.prototype, "content", void 0);
n([M(y.default)], P.prototype, "worldCell", void 0);
n([M(v.default)], P.prototype, "menu", void 0);
n([M(s.default)], P.prototype, "examBtn", void 0);
P = i = n([b], P);
exports.default = P;