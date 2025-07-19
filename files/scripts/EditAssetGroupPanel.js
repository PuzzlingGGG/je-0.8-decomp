"use strict";

var i = this && this.__decorate || function (e, t, o, i) {
    var n,
      a = arguments.length,
      s = a < 3 ? t : null === i ? i = Object.getOwnPropertyDescriptor(t, o) : i;
    if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) s = Reflect.decorate(e, t, o, i);else for (var r = e.length - 1; r >= 0; r--) (n = e[r]) && (s = (a < 3 ? n(s) : a > 3 ? n(t, o, s) : n(t, o)) || s);
    return a > 3 && s && Object.defineProperty(t, o, s), s;
  },
  n = this && this.__awaiter || function (e, t, o, i) {
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
const a = e("../../../scripts/_autogen/data/data"),
  s = e("../../CustomUI/Button"),
  r = e("../../CustomUI/ScrollList"),
  l = e("../../CustomUI/ToggleGroup"),
  c = e("../../Frame/Panel"),
  d = e("../../Frame/SceneManager"),
  h = e("../../Frame/Top"),
  p = e("../../Frame/UIColor"),
  u = e("../../Game/Player/Mng"),
  m = e("../../GameData/GameTypeDefine"),
  {
    ccclass: f,
    property: g
  } = cc._decorator;
let y = class extends c.default {
  constructor() {
    super(...arguments);
    this.labelSelectInfo = null;
    this.editGroupName = null;
    this.toggleGroup = null;
    this.scrollList = null;
    this.btnOk = null;
    this.btnDel = null;
    this.data = null;
  }
  onLoad() {
    super.onLoad();
    this.scrollList.node.on(r.default.CLICK_ITEM, this.onClickItem, this);
    this.toggleGroup.node.on(l.default.TOGGLE_CHANGE, this.refreshPage, this);
    this.btnOk.node.on(s.default.CLICK, this.onOkBtn, this);
    this.btnDel.node.on(s.default.CLICK, this.onDeletBtn, this);
  }
  refreshPage() {
    return n(this, void 0, void 0, function* () {
      let e = [];
      switch (this.toggleGroup.idx) {
        case 0:
          e = yield u.Mng.Ins.tileMng.loadAll();
          break;
        case 1:
          e = yield u.Mng.Ins.actorMng.loadAll();
          break;
        case 2:
          e = yield u.Mng.Ins.deviceMng.loadAll();
          break;
        case 3:
          e = yield u.Mng.Ins.propMng.loadAll();
      }
      e = e.filter(e => !e.belongGameId && !e.importOthersImg && !e.goodsUId);
      let t = [];
      for (let o = 0; o < e.length; o++) {
        let i = e[o],
          n = this.data.refDataList.find(e => e.confId == i.id);
        t.push({
          id: i.id,
          type: i.type,
          textureName: i.textureName,
          check: !!n
        });
      }
      this.scrollList.setDataArr(t);
    });
  }
  onClickItem(e, t) {
    let o = this.data.refDataList.findIndex(e => e.confId == t.id);
    if (o >= 0) this.data.refDataList.splice(o, 1);else {
      let e = new a.ActorGroupRefData();
      e.confId = t.id;
      e.confType = t.type;
      this.data.refDataList.unshift(e);
    }
    this.refreshPage();
    this.refreshCnt();
  }
  setData(e) {
    this.data = e;
    this.editGroupName.string = e.groupName;
    this.toggleGroup.selectIdx(0);
    this.refreshCnt();
  }
  refreshCnt() {
    return n(this, void 0, void 0, function* () {
      let e = 0;
      for (let t = 0; t < this.data.refDataList.length; t++) {
        let o = this.data.refDataList[t];
        (yield this.getConf(o.confType, o.confId)) && e++;
      }
      this.labelSelectInfo.string = `Selected（${e}）`;
    });
  }
  onOkBtn() {
    return n(this, void 0, void 0, function* () {
      let e = this.data.groupName,
        t = this.editGroupName.textLabel.string;
      if (t) {
        if (e != t && u.Mng.Ins.assetGroupMng.isGroupNameExist(t)) h.default.showToast("分组名已存在");else {
          this.closePanel();
          for (let e = 0; e < this.data.refDataList.length; e++) {
            let t = this.data.refDataList[e];
            (yield this.getConf(t.confType, t.confId)) || this.data.refDataList.splice(e--, 1);
          }
          if (e != t) {
            yield u.Mng.Ins.assetGroupMng.delete(e);
            this.data.groupName = t;
          }
          yield u.Mng.Ins.assetGroupMng.save(this.data);
          u.Mng.Ins.assetGroupMng.curGroupName = t;
          cc.game.emit("refreshElementBox");
        }
      } else h.default.showToast("请输入分组名");
    });
  }
  onDeletBtn() {
    d.default.ins.OpenPanelByName("MessageBox", e => {
      e.label.string = "是否确定删除分组？";
      e.setLeftBtn({
        text: "是",
        color: p.UIColor.pink,
        call: () => n(this, void 0, void 0, function* () {
          yield u.Mng.Ins.assetGroupMng.delete(this.data.groupName);
          this.closePanel();
          cc.game.emit("EditAssetGroupPanel.deleteGroup");
        })
      });
      e.setRightBtn({
        text: "点错了",
        color: p.UIColor.blue
      });
    });
  }
  getConf(e, t) {
    return n(this, void 0, void 0, function* () {
      switch (e) {
        case m.CommonDataType.Tile:
          return yield u.Mng.Ins.tileMng.loadOne(t);
        case m.CommonDataType.Actor:
          return yield u.Mng.Ins.actorMng.loadOne(t);
        case m.CommonDataType.Device:
          return yield u.Mng.Ins.deviceMng.loadOne(t);
        case m.CommonDataType.Prop:
          return yield u.Mng.Ins.propMng.loadOne(t);
        case m.CommonDataType.Weapon:
          return yield u.Mng.Ins.weaponMng.loadOne(t);
        case m.CommonDataType.Bullet:
          return yield u.Mng.Ins.bulletMng.loadOne(t);
      }
    });
  }
};
i([g(cc.Label)], y.prototype, "labelSelectInfo", void 0);
i([g(cc.EditBox)], y.prototype, "editGroupName", void 0);
i([g(l.default)], y.prototype, "toggleGroup", void 0);
i([g(r.default)], y.prototype, "scrollList", void 0);
i([g(s.default)], y.prototype, "btnOk", void 0);
i([g(s.default)], y.prototype, "btnDel", void 0);
y = i([f], y);
exports.default = y;