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
  r = e("../../../Game/OperationFlow"),
  l = e("../../../Game/Player/DynamicMng"),
  c = e("../../../Game/Player/Mng"),
  d = e("../../../Game/World/Actor"),
  h = e("../../../Game/World/Tile"),
  p = e("../../../GameData/GameTypeDefine"),
  u = e("../EditWorldScene"),
  m = e("../TouchWorldShowGizmos"),
  f = e("./EditPageBase"),
  {
    ccclass: g,
    property: y
  } = cc._decorator;
let v = i = class extends f.EditPageBase {
  constructor() {
    super(...arguments);
    this.editWorldScene = null;
    this.list = null;
  }
  onLoad() {
    this.list.node.on(s.default.CLICK_ITEM, this.onClickActorCell, this);
  }
  onEnable() {
    return a(this, void 0, void 0, function* () {
      cc.game.on("refreshActorList", this.refreshList, this);
      yield this.refreshList();
      this.editWorldScene.gameData.parnetGame || cc.game.emit(i.ActorPage_Enable, this);
    });
  }
  onDisable() {
    cc.game.off("refreshActorList", this.refreshList, this);
  }
  refreshList() {
    return a(this, void 0, void 0, function* () {
      this.editWorldScene.elementBox.emptyLabel.node.active = !1;
      let e = this.editWorldScene.elementBox.filter.getCurData(),
        t = yield c.Mng.Ins.assetGroupMng.findGroup(e.str);
      t || (t = c.Mng.Ins.assetGroupMng.all);
      let o = [];
      for (let e of t.refDataList) e.confType == p.CommonDataType.Actor && o.push(e.confId);
      let i = yield c.Mng.Ins.actorMng.loadMany(o),
        n = [];
      l.DynamicMng.Ins.isDisable(l.FunctionEnum.PaintAsset, !1) || n.push({
        createNew: !0
      });
      n = n.concat(i);
      this.list.setDataArr(n);
      this.list.selectByIdx(1);
      this.editWorldScene.elementBox.emptyLabel.node.active = 1 == n.length;
    });
  }
  onClickActorCell(e, t) {
    if (t && t.createNew) this.createActorConf();else {
      this.instanceActor(t);
      cc.game.emit(i.ActorPage_PUT_ACTOR, t);
    }
  }
  createActorConf() {
    r.OperationFlow.paintActor(() => {
      this.refreshList();
    });
  }
  instanceActor(e) {
    return a(this, void 0, void 0, function* () {
      let t = this.editWorldScene.world,
        o = t.camera.node.position,
        i = Math.round(o.x / h.default.SIZE),
        n = Math.round(o.y / h.default.SIZE),
        a = d.default.createActorData(e, p.Team.Hero, t.worldLayout),
        s = t.addActor({
          iCol: i,
          iRow: n
        });
      if (a.team == p.Team.Hero) if (t.hero) a.team = p.Team.Enemy;else {
        t.hero = s;
        t.startPoint.SetPosition(s.node.x, s.node.y);
      }
      yield s.setData(a);
      (yield s.getTeamGizmo()).setTeam(a.team);
      m.default.Ins.clickActor(s);
    });
  }
};
v.ActorPage_Enable = "ActorPage_Enable";
v.ActorPage_PUT_ACTOR = "ActorPage_PUT_ACTOR";
v.ActorPage_DEL_ACTOR = "ActorPage_DEL_ACTOR";
n([y(u.default)], v.prototype, "editWorldScene", void 0);
n([y(s.default)], v.prototype, "list", void 0);
v = i = n([g], v);
exports.default = v;