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
  r = e("../../../Frame/Util"),
  l = e("../../../Game/OperationFlow"),
  c = e("../../../Game/Player/DynamicMng"),
  d = e("../../../Game/Player/Mng"),
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
    this.list.node.on(s.default.CLICK_ITEM, this.onClickCell, this);
    this.node.on("refreshDeviceList", this.refreshList, this);
  }
  onEnable() {
    return a(this, void 0, void 0, function* () {
      cc.game.on("refreshDeviceList", this.refreshList, this);
      yield this.refreshList();
      this.editWorldScene.gameData.parnetGame || cc.game.emit(i.DevicePage_Enable, this);
    });
  }
  onDisable() {
    cc.game.off("refreshDeviceList", this.refreshList, this);
  }
  refreshList() {
    return a(this, void 0, void 0, function* () {
      this.editWorldScene.elementBox.emptyLabel.node.active = !1;
      let e = this.editWorldScene.elementBox.filter.getCurData(),
        t = yield d.Mng.Ins.assetGroupMng.findGroup(e.str);
      t || (t = d.Mng.Ins.assetGroupMng.all);
      let o = [];
      for (let e of t.refDataList) e.confType == p.CommonDataType.Device && o.push(e.confId);
      let i = yield d.Mng.Ins.deviceMng.loadMany(o),
        n = [];
      c.DynamicMng.Ins.isDisable(c.FunctionEnum.PaintAsset, !1) || n.push({
        createNew: !0
      });
      n = n.concat(i);
      this.list.setDataArr(n);
      this.list.selectByIdx(0);
      this.editWorldScene.elementBox.emptyLabel.node.active = 1 == n.length;
    });
  }
  onClickCell(e, t) {
    return a(this, void 0, void 0, function* () {
      if (t.createNew) l.OperationFlow.paintDevice(() => {
        this.refreshList();
      });else {
        this.instanceDevice(t);
        cc.game.emit(i.DevicePage_PUT_DEVICE, t);
      }
    });
  }
  instanceDevice(e) {
    return a(this, void 0, void 0, function* () {
      let t = this.editWorldScene.world,
        o = t.camera.node.position,
        i = Math.round(o.x / h.default.SIZE),
        n = Math.round(o.y / h.default.SIZE),
        a = "device" + t.worldLayout.incId++,
        s = {
          confId: e.id,
          id: a,
          isBuildIn: e.isBuildIn,
          rotateIdx: e.rotateIdx,
          ignoreDmgEnemy: e.ignoreDmgEnemy,
          extra: e.extra ? r.Util.deepCopy(e.extra) : void 0
        },
        l = yield t.addDevice({
          iCol: i,
          iRow: n
        }, e.prefabName);
      l.setData(s, e);
      m.default.Ins.clickDevice(l);
    });
  }
};
v.DevicePage_Enable = "DevicePage_Enable";
v.DevicePage_PUT_DEVICE = "DevicePage_PUT_DEVICE";
v.DevicePage_DEL_DEVICE = "DevicePage_DEL_DEVICE";
n([y(u.default)], v.prototype, "editWorldScene", void 0);
n([y(s.default)], v.prototype, "list", void 0);
v = i = n([g], v);
exports.default = v;