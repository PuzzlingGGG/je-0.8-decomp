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
  d = e("../../../Game/World/Tile"),
  h = e("../../../GameData/GameTypeDefine"),
  p = e("../EditWorldScene"),
  u = e("../TouchWorldShowGizmos"),
  m = e("./EditPageBase"),
  {
    ccclass: f,
    property: g
  } = cc._decorator;
let y = i = class extends m.EditPageBase {
  constructor() {
    super(...arguments);
    this.editWorldScene = null;
    this.list = null;
  }
  onLoad() {
    this.list.node.on(s.default.CLICK_ITEM, this.onClickPropCell, this);
  }
  onEnable() {
    cc.game.on("refreshPropList", this.refreshList, this);
    this.refreshList();
    this.editWorldScene.gameData.parnetGame || cc.game.emit(i.PropPage_Enable, this);
  }
  onDisable() {
    cc.game.off("refreshPropList", this.refreshList, this);
  }
  refreshList() {
    return a(this, void 0, void 0, function* () {
      this.editWorldScene.elementBox.emptyLabel.node.active = !1;
      let e = this.editWorldScene.elementBox.filter.getCurData(),
        t = yield c.Mng.Ins.assetGroupMng.findGroup(e.str);
      t || (t = c.Mng.Ins.assetGroupMng.all);
      let o = [];
      for (let e of t.refDataList) e.confType == h.CommonDataType.Prop && o.push(e.confId);
      let i = yield c.Mng.Ins.propMng.loadMany(o),
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
  onClickPropCell(e, t) {
    if (t.createNew) this.createPropConf();else {
      this.instanceProp(t);
      cc.game.emit(i.PropPage_PUT_PROP, t);
    }
  }
  createPropConf() {
    r.OperationFlow.paintProp(e => {
      this.refreshList();
      cc.game.emit(i.PropPage_CREATE_PROP, e);
    });
  }
  instanceProp(e) {
    return a(this, void 0, void 0, function* () {
      let t = this.editWorldScene.world,
        o = t.camera.node.position,
        i = Math.round(o.x / d.default.SIZE),
        n = Math.round(o.y / d.default.SIZE),
        a = t.addProp({
          iCol: i,
          iRow: n
        }),
        s = {
          id: "prop" + t.worldLayout.incId++,
          confId: e.id,
          useGravity: !1
        };
      yield a.setData(s);
      u.default.Ins.clickProp(a);
    });
  }
};
y.PropPage_Enable = "PropPage_Enable";
y.PropPage_PUT_PROP = "PropPage_PUT_PROP";
y.PropPage_CREATE_PROP = "PropPage_CREATE_PROP";
n([g(p.default)], y.prototype, "editWorldScene", void 0);
n([g(s.default)], y.prototype, "list", void 0);
y = i = n([f], y);
exports.default = y;