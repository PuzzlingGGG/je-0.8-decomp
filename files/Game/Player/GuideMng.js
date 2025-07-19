"use strict";

var i = this && this.__awaiter || function (e, t, o, i) {
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
exports.GuideId = void 0;
const n = e("../../../scripts/_autogen/cmd/cmd"),
  a = e("../../Frame/CrossPlatform"),
  s = e("../../Frame/NetworkMgr"),
  r = e("../../Frame/SceneManager"),
  l = e("../../Frame/ScreenRect"),
  c = e("../../Frame/Top"),
  d = e("../../Frame/UIColor"),
  h = e("../../Frame/Util"),
  p = e("../../GameData/GameTypeDefine"),
  u = e("../../Panel/CreateGamePanel/CreateGamePanel"),
  m = e("../../Panel/CreateWorldInfoPanel/CreateWorldInfoPanel"),
  f = e("../../Panel/CreateWorldTypePanel/CreateWorldTypePanel"),
  g = e("../../Role"),
  y = e("../../Scene/EditGameScene/EditGameScene"),
  v = e("../../Scene/EditWorldScene/ActorCell"),
  C = e("../../Scene/EditWorldScene/DeviceCell"),
  _ = e("../../Scene/EditWorldScene/EditWorldScene"),
  S = e("../../Scene/EditWorldScene/ElementBox"),
  I = e("../../Scene/EditWorldScene/Page/ActorPage"),
  G = e("../../Scene/EditWorldScene/Page/DevicePage"),
  T = e("../../Scene/EditWorldScene/Page/PropPage"),
  b = e("../../Scene/EditWorldScene/Page/TilePage"),
  M = e("../../Scene/EditWorldScene/TouchWorldShowGizmos"),
  P = e("../../Scene/GameScene/GameScene"),
  D = e("../../Scene/HomeScene/DiscoverPage"),
  w = e("../../Scene/HomeScene/HomeScene"),
  B = e("../../Scene/HomeScene/MinePage/MinePage"),
  R = e("../../TGA"),
  x = e("../ArrowGuide"),
  L = e("../AstroGuide"),
  k = e("../BannerGuide"),
  F = e("../GameEnv"),
  N = e("../Hortor"),
  A = e("../PaintGuide"),
  O = e("../World/CameraDragCtrl"),
  U = e("../World/Gizmos/PlaceGizmos"),
  E = e("./DynamicMng"),
  j = e("./Mng");
var H;
(function (e) {
  e[e.None = 0] = "None";
  e[e.Intro = 1] = "Intro";
  e[e.CreateGame = 2] = "CreateGame";
  e[e.CreateWorld = 3] = "CreateWorld";
  e[e.EditWorld = 4] = "EditWorld";
  e[e.Tile = 1001] = "Tile";
  e[e.Actor = 1002] = "Actor";
  e[e.Device = 1003] = "Device";
  e[e.Prop = 1004] = "Prop";
  e[e.Dialog = 1101] = "Dialog";
  e[e.ShiftWolrd = 1102] = "ShiftWolrd";
})(H = o.GuideId || (exports.GuideId = {}));
class W {
  constructor() {
    this.completeTaskIds = [];
    this.playCnt = 0;
    this.basicCourses = [{
      id: H.CreateGame,
      title: "创建第一个游戏",
      detail: ""
    }, {
      id: H.CreateWorld,
      title: "创建第一个地图",
      detail: ""
    }, {
      id: H.EditWorld,
      title: "基础操作",
      detail: ""
    }];
    this.middleCourses = [{
      id: H.Tile,
      title: "地块详细介绍",
      detail: ""
    }, {
      id: H.Actor,
      title: "角色详细介绍",
      detail: ""
    }, {
      id: H.Device,
      title: "装置详细介绍",
      detail: ""
    }, {
      id: H.Prop,
      title: "道具详细介绍",
      detail: ""
    }, {
      id: H.Dialog,
      title: "剧情对话",
      detail: ""
    }, {
      id: H.ShiftWolrd,
      title: "切换地图",
      detail: ""
    }];
    this.highCourses = [{
      id: H.Tile,
      title: "地块详细介绍",
      detail: ""
    }, {
      id: H.Actor,
      title: "角色详细介绍",
      detail: ""
    }, {
      id: H.Device,
      title: "装置详细介绍",
      detail: ""
    }, {
      id: H.Prop,
      title: "道具详细介绍",
      detail: ""
    }, {
      id: H.Dialog,
      title: "剧情对话",
      detail: ""
    }, {
      id: H.ShiftWolrd,
      title: "切换地图",
      detail: ""
    }];
    this.actualCourses = [{
      id: H.Tile,
      title: "地块详细介绍",
      detail: ""
    }, {
      id: H.Actor,
      title: "角色详细介绍",
      detail: ""
    }, {
      id: H.Device,
      title: "装置详细介绍",
      detail: ""
    }, {
      id: H.Prop,
      title: "道具详细介绍",
      detail: ""
    }, {
      id: H.Dialog,
      title: "剧情对话",
      detail: ""
    }, {
      id: H.ShiftWolrd,
      title: "切换地图",
      detail: ""
    }];
  }
  init() {
    return i(this, void 0, void 0, function* () {
      let e = (yield E.DynamicMng.Ins.loadOne("GuideOnLineTime")) || 0,
        t = g.default.Ins.role.createAt.getTime() < e;
      if (!this.isComplete(H.EditWorld) && (t || a.tt || N.Hortor.isVisitor())) {
        for (let e = 1; e <= H.EditWorld; e++) this.completeTaskIds.push(e);
        yield this.save();
      }
      if (this.isComplete(H.Intro)) this.isComplete(H.CreateGame) ? this.isComplete(H.CreateWorld) ? this.isComplete(H.EditWorld) || this.guideEditWorld() : this.guideCreateWorld() : this.guideCreateGame();else {
        let e = (yield E.DynamicMng.Ins.loadOne("GameChosenIds")) || [],
          t = ["GD:8343758:7", "GD:8193036:17", "GD:6480222:12", "GD:5144459:7", "GD:7672378:13", "GD:298182:27"];
        for (let o = 0; o < t.length; o++) {
          let i = t[o],
            n = e.indexOf(i);
          n >= 0 && e.splice(n, 1);
          e.unshift(i);
        }
      }
    });
  }
  doGuide(e) {
    switch (e) {
      case H.Tile:
        this.guideTile();
        break;
      case H.Actor:
        this.guideActor();
        break;
      case H.Device:
        this.guideDevice();
        break;
      case H.Prop:
        this.guideProp();
    }
  }
  isComplete(e) {
    return this.completeTaskIds.includes(e);
  }
  complete(e) {
    return i(this, void 0, void 0, function* () {
      this.completeTaskIds.push(e);
      yield this.save();
      R.TGA.track("Guide", {
        guideId: e
      });
    });
  }
  save() {
    return i(this, void 0, void 0, function* () {
      let e = {
        guideVersion: F.gameEnv.creatorVersion,
        completeTaskIds: this.completeTaskIds
      };
      yield s.NetIns.SendCmdAsync({
        cmd: n.CMDS.Game_SaveGuide,
        params: e
      }, n.Game_RSaveGuide);
    });
  }
  addAstroGuide(e) {
    return i(this, void 0, void 0, function* () {
      let t = yield h.Util.loadBundleRes("Prefab/AstroGuide"),
        o = cc.instantiate(t);
      e.addChild(o);
      return o.getComponent(L.default);
    });
  }
  addArrowGuide(e) {
    return i(this, void 0, void 0, function* () {
      let t = yield h.Util.loadBundleRes("Prefab/ArrowGuide"),
        o = cc.instantiate(t);
      e.addChild(o);
      return o.getComponent(x.default);
    });
  }
  addPaintGuide(e) {
    return i(this, void 0, void 0, function* () {
      let t = yield h.Util.loadBundleRes("Prefab/PaintGuide"),
        o = cc.instantiate(t);
      e.addChild(o);
      return o.getComponent(A.default);
    });
  }
  addBannerGuide(e) {
    return i(this, void 0, void 0, function* () {
      let t = yield h.Util.loadBundleRes("Prefab/BannerGuide"),
        o = cc.instantiate(t);
      e.addChild(o);
      exports.x = 0;
      exports.y = l.default.height / 2 - 200;
      return o.getComponent(k.default);
    });
  }
  guideIntro() {
    return i(this, void 0, void 0, function* () {
      yield this.complete(H.None);
      let e = null,
        t = r.default.ins.findScene(w.default);
      t && (e = t.getComponentInChildren(D.default));
      e || (e = (yield h.Util.once(w.default.PAGE_LOADED)).getComponent(D.default));
      if (!e) return;
      e.toggleGroup.selectIdx(1);
      let o = yield this.addAstroGuide(t.node);
      yield o.playAnim("Hello");
      yield o.showBubble([{
        str: "嘿哈！少年！"
      }, {
        str: "欢迎来到创游编辑器！"
      }, {
        str: "这里是一个游戏创作平台！"
      }, {
        str: "每天有无数创作者在此制作并上传Ta的作品。"
      }, {
        str: "你想要制作游戏并获得万千粉丝吗？！"
      }, {
        str: "快来体验吧！"
      }]);
      o.node.destroy();
      yield this.complete(H.Intro);
      this.guideCreateGame();
    });
  }
  guideCreateGame() {
    return i(this, void 0, void 0, function* () {
      yield h.Util.once(B.default.GAME_LIST_LOADED);
      let e = r.default.ins.findScene(w.default).getComponentInChildren(B.default);
      e.gameList.scrollTo(cc.Vec2.ZERO, .2);
      yield h.Util.delay(.3);
      let t = e.gameList.getDataArr().findIndex(e => "create" == e.type),
        o = e.gameList.getExtraData(t).item,
        i = yield this.addArrowGuide(o);
      i.play(cc.v2(-200, 50), -145);
      yield h.Util.once(u.default.CREATE_GAME);
      this.guideCreateWorld();
      yield this.complete(H.CreateGame);
      i.node.destroy();
    });
  }
  guideCreateWorld() {
    return i(this, void 0, void 0, function* () {
      let e = yield h.Util.once(y.default.EditGameScene_Entered),
        t = e;
      t.backBtn.node.active = !1;
      t.deleteBtn.node.active = !1;
      let o = yield this.addAstroGuide(r.default.ins.node);
      o.setMaskOpacity(100);
      yield o.playAnim("moveIn");
      yield o.showBubble([{
        str: "恭喜你创建了第一个游戏！"
      }, {
        str: "这里是【游戏工程界面】"
      }, {
        str: "在这里，你可以创建多个地图。"
      }, {
        str: "多个地图串在一起，就是一个完整的游戏啦！"
      }, {
        str: "那我们来创建第一个地图吧！"
      }, {
        str: "看，右下角！"
      }]);
      o.node.active = !1;
      let i = yield this.addArrowGuide(t.newWorldBtn.node);
      i.play(cc.v2(-50, 30), -145);
      e = yield h.Util.once(f.default.CreateWorldTypePanel_Opend);
      i.node.active = !1;
      let n = e;
      o.node.active = !0;
      o.maskNode(n.jumpBtn.node);
      o.astro.node.active = !1;
      yield h.Util.once(m.default.CreateWorldInfoPanel_Open);
      o.maskNode(null);
      let a = yield h.Util.once(m.default.CreateWorldInfoPanel_Opend);
      o.node.active = !0;
      o.maskNode(a.createBtn.node);
      o.astro.node.active = !1;
      let s = yield h.Util.once(y.default.EditGameScene_CreateWorldCell);
      o.astro.node.active = !0;
      o.maskNode(null);
      yield o.showBubble([{
        str: "这个就是刚刚创建的地图啦！"
      }, {
        str: "点他进去看一下"
      }]);
      o.node && o.node.destroy();
      i.node.active = !0;
      h.Util.moveToNewParent(i.node, s.node);
      i.play(cc.v2(50, 50), 145);
      yield this.complete(H.CreateWorld);
      t.backBtn.node.active = !0;
      t.deleteBtn.node.active = !0;
      this.guideEditWorld();
      yield h.Util.once(b.default.TilePage_Enable);
      i.node.destroy();
    });
  }
  guideEditWorld() {
    return i(this, void 0, void 0, function* () {
      let e = yield h.Util.once(b.default.TilePage_Enable),
        t = r.default.ins.findScene(_.default),
        o = (e, t) => {
          e.interactable = !t;
          e.node.color = t ? d.UIColor.gray : d.UIColor.white;
        },
        i = t.elementBox.pageToggleGroup.toggleItems[0],
        n = t.elementBox.pageToggleGroup.toggleItems[1],
        a = t.elementBox.pageToggleGroup.toggleItems[2],
        s = t.elementBox.pageToggleGroup.toggleItems[3];
      o(i, !0);
      o(n, !0);
      o(a, !0);
      o(s, !0);
      t.hideUnuseBtns();
      c.default.blockInput(!0, "addAstroGuide");
      let l = yield this.addAstroGuide(r.default.ins.node);
      c.default.blockInput(!1, "addAstroGuide");
      l.setMaskOpacity(100);
      yield l.playAnim("moveIn");
      yield l.showBubble([{
        str: "嘿哈！"
      }, {
        str: "这里是【地图编辑界面】"
      }, {
        str: "我们先来学习一下操作吧！"
      }]);
      yield l.moveLeftRight();
      e.tileList.selectByIdx(2);
      let u = e.toggleGroup.toggleItems[0].node,
        m = e.toggleGroup.toggleItems[1].node,
        f = e.toggleGroup.toggleItems[2].node;
      o(i, !1);
      l.maskNode(i.node);
      yield l.showBubble([{
        str: "你当前在【地块】栏"
      }, {
        str: "操作【地块】时需要用到这些工具："
      }]);
      l.maskNode(u);
      yield l.showBubble([{
        str: "这个是【视角工具】"
      }, {
        str: "可以用来移动、缩放显示范围"
      }]);
      l.maskNode(m);
      yield l.showBubble([{
        str: "这个是【铅笔工具】"
      }, {
        str: "可以用来在地图上摆放【地块】"
      }]);
      l.maskNode(f);
      yield l.showBubble([{
        str: "这个是【橡皮工具】"
      }, {
        str: "可以擦掉你不想要的【地块】"
      }]);
      l.maskNode(e.toggleGroup.node);
      yield l.showBubble([{
        str: "来实际操作一下吧"
      }]);
      l.node.active = !1;
      let g = yield this.addBannerGuide(t.node);
      g.guideMove();
      yield h.Util.once(O.default.CAMERA_DRAG);
      if (cc.sys.platform != cc.sys.DESKTOP_BROWSER) {
        g.guideZoomMax();
        yield h.Util.once(O.default.CAMERA_ZOOM_MAX);
        g.guideZoomMin();
        yield h.Util.once(O.default.CAMERA_ZOOM_MIN);
      }
      let y = 5;
      for (; y > 0;) {
        g.guidePencil(y);
        yield h.Util.once(b.default.TilePage_PUT_TILE);
        y--;
      }
      y = 2;
      for (; y > 0;) {
        g.guideErase(y);
        yield h.Util.once(b.default.TilePage_DEL_TILE);
        y--;
      }
      g.node.active = !1;
      l.maskNode(null);
      yield l.showBubble([{
        str: "厉害！你学会了【地块】的操作工具！"
      }, {
        str: "接下来，请切换到【角色】栏！"
      }]);
      o(n, !1);
      l.maskNode(n.node);
      let D = yield h.Util.once(I.default.ActorPage_Enable);
      l.maskNode(null);
      yield l.showBubble([{
        str: "角色可以分为：主角、队友、NPC、敌人"
      }, {
        str: "他们可以在地图中走动，跳跃"
      }, {
        str: "开始游戏后，你控制的就是主角，队友和敌人由电脑AI控制。"
      }, {
        str: "在编辑【角色】时"
      }, {
        str: "只需要点击一下角色图标"
      }, {
        str: "角色就放置到地图上了"
      }, {
        str: "我们来放置一些史莱姆吧！"
      }]);
      let w = D.list.getDataArr().findIndex(e => "1002" == e.id),
        B = D.list.getExtraData(w).item,
        R = B.getComponent(v.default);
      R.optionBtn.node.active = !1;
      l.maskNode(B);
      D.list.enabled = !1;
      yield h.Util.once(M.default.TouchWorldShowGizmos_CLICK_ACTOR);
      D.list.enabled = !0;
      l.node.active = !1;
      g.node.active = !0;
      g.guidePlaceActor();
      yield h.Util.once(U.default.PlaceGizmos_Confirm);
      R.optionBtn.node.active = !0;
      l.maskNode(null);
      g.node.active = !1;
      yield l.showBubble([{
        str: "好啦，史莱姆已就位！"
      }, {
        str: "一会开始游戏时，不要碰到他哦！"
      }, {
        str: "接下来，请切换到【装置】栏！"
      }]);
      if (t.inspector.node.active && !t.elementBox.node.active) {
        t.inspector.hide();
        t.elementBox.show();
        yield h.Util.once(S.default.ElementBox_ShowEnd);
      }
      o(a, !1);
      l.maskNode(a.node);
      let x = yield h.Util.once(G.default.DevicePage_Enable);
      l.maskNode(null);
      yield l.showBubble([{
        str: "每种【装置】都具有Ta独特的行为"
      }, {
        str: "1.圆锯、火球、地刺、冰锥、炸弹等伤害性装置"
      }, {
        str: "会以自己独特的方式，对角色造成“伤害”"
      }, {
        str: "2.弹簧、梯子、平台、传送带等"
      }, {
        str: "可以影响角色的移动"
      }, {
        str: "3.按钮、接触触发器、区域、存档点、怪物门等"
      }, {
        str: "可以组合出独一无二的游戏玩法"
      }, {
        str: "4.装饰物"
      }, {
        str: "可以点缀你的地图，还可以制造景深的效果。"
      }, {
        str: "目前就是这些啦，之后还会不断的开发新装置哒！"
      }, {
        str: "为简单起见，我们先放置一个圆锯吧！"
      }, {
        str: "操作和放置【角色】一样！"
      }]);
      let L = e => {
        let t = x.list.getDataArr().findIndex(t => t.deviceType == e);
        return x.list.getExtraData(t).item;
      };
      x.list.enabled = !1;
      let k = [p.DeviceType.Saw];
      for (let e = 0; e < k.length; e++) {
        let o = L(k[e]),
          i = o.getComponent(C.default);
        i.optionBtn.node.active = !1;
        0 != e && (yield h.Util.once(S.default.ElementBox_ShowEnd));
        l.node.active = !0;
        l.maskNode(o);
        let n = yield h.Util.once(M.default.TouchWorldShowGizmos_CLICK_DEVICE);
        l.node.active = !1;
        g.node.active = !0;
        g.guidePlaceDevice(n.conf.name, n.conf.textureName);
        yield h.Util.once(U.default.PlaceGizmos_Confirm);
        setTimeout(() => {
          if (t.inspector.node.active && !t.elementBox.node.active) {
            t.inspector.hide();
            t.elementBox.show();
          }
        }, .5);
        i.optionBtn.node.active = !0;
        g.node.active = !1;
      }
      x.list.enabled = !0;
      yield l.showBubble([{
        str: "装置放好啦"
      }, {
        str: "接下来是最后一部分：【道具】"
      }]);
      o(s, !1);
      l.maskNode(s.node);
      yield h.Util.once(T.default.PropPage_Enable);
      l.maskNode(null);
      yield l.showBubble([{
        str: "道具可以被主角捡起，收入背包"
      }, {
        str: "待需要时，可以从背包中使用。"
      }, {
        str: "比如，硬币、药水等就是道具。"
      }, {
        str: "现在，我们放几个药水试试！"
      }]);
      l.node.active = !1;
      let F = yield j.Mng.Ins.propMng.loadOne("2");
      y = 1;
      for (; y > 0;) {
        g.node.active = !0;
        g.guidePutCustomProp(F.name, F.textureName, y);
        if ("2" == (yield h.Util.once(T.default.PropPage_PUT_PROP)).id) {
          yield h.Util.once(U.default.PlaceGizmos_Confirm);
          setTimeout(() => {
            if (t.inspector.node.active && !t.elementBox.node.active) {
              t.inspector.hide();
              t.elementBox.show();
            }
          }, .5);
          y--;
        }
      }
      g.node.active = !1;
      yield l.showBubble([{
        str: "好了，一个简易的地图搭完啦"
      }, {
        str: "我们测试一下吧！"
      }]);
      l.node.active = !1;
      t.playBtn.node.active = !0;
      let N = yield this.addArrowGuide(t.playBtn.node);
      N.play(cc.v2(-50, 20), -145);
      let A = !1;
      for (; !A;) if (!(A = yield h.Util.once(P.default.GameScene_EXIT))) {
        N.node.active = !1;
        l.maskNode(null);
        yield l.showBubble([{
          str: "过不去？"
        }, {
          str: "是不是怪物或圆锯位置太刁钻了哇?"
        }, {
          str: "没关系，我们可以调整一下地图"
        }]);
        l.node.active = !1;
        g.node.active = !0;
        g.guideText("调整怪物或圆锯位置，然后尝试过关");
      }
      g.node.active = !1;
      l.maskNode(null);
      N.node.active = !1;
      yield l.showBubble([{
        str: "恭喜过关!"
      }, {
        str: "怎么样，自己制作游戏好玩吧！"
      }, {
        str: "我们保存一下刚刚的制作成果吧！"
      }]);
      l.node.active = !1;
      t.saveBtn.node.active = !0;
      h.Util.moveNode(N.node, t.saveBtn.node);
      N.node.active = !0;
      N.play(cc.v2(-50, 20), -145);
      yield h.Util.once(_.default.EditWorldScene_Save);
      N.node.active = !1;
      yield l.showBubble([{
        str: "保存成功！"
      }, {
        str: "恭喜完成基础教程！"
      }, {
        str: "您已解锁所有功能，自由发挥吧！"
      }]);
      N.node.destroy();
      l.node.destroy();
      g.node.destroy();
      t.showUnuseBtns();
      this.complete(H.EditWorld);
    });
  }
  openMessageBox(e, t) {
    r.default.ins.OpenPanelByName("MessageBox", o => {
      o.titleLabel.string = "提示";
      o.label.string = e;
      o.leftBtn.node.active = !1;
      o.setRightBtn({
        text: "确定",
        color: d.UIColor.green,
        call: t
      });
    });
  }
  guideTile() {
    return i(this, void 0, void 0, function* () {
      this.openMessageBox("开启教程将会创建一个地图\n是否继续？", () => {
        this.createWorld("地块详细介绍", "GuideTileWorld");
      });
    });
  }
  createWorld(e, t) {
    return i(this, void 0, void 0, function* () {
      let o = {
          id: "",
          info: {
            name: e,
            type: 0,
            size: {
              col: 8,
              row: 8
            }
          },
          layoutMin: null
        },
        i = yield h.Util.loadBundleRes("DefaultWorld/" + t, cc.JsonAsset),
        n = new Uint8Array(i.json),
        a = h.Util.unzip(n);
      o.info.size = a.size;
      o.info.type = a.type;
      exports.layoutMin = h.Util.zip(a);
      exports.worldLayout = a;
      let s = r.default.ins.findScene(y.default);
      yield j.Mng.Ins.worldMng.create(o, s.gameData);
      s.createWorldCell(o.id);
    });
  }
  guideActor() {
    return i(this, void 0, void 0, function* () {});
  }
  guideDevice() {
    return i(this, void 0, void 0, function* () {});
  }
  guideProp() {
    return i(this, void 0, void 0, function* () {});
  }
}
exports.default = W;
W.Ins = new W();