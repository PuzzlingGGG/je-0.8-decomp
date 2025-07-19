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
const a = e("../../CustomUI/Button"),
  s = e("../../CustomUI/ScrollList"),
  r = e("../../CustomUI/ToggleGroup"),
  l = e("../../Frame/Panel"),
  c = e("../../Frame/Top"),
  d = e("../../Game/Player/Mng"),
  h = e("../../Game/Player/ShopMng"),
  {
    ccclass: p,
    property: u
  } = cc._decorator;
let m = class extends l.default {
  constructor() {
    super(...arguments);
    this.okBtn = null;
    this.cntLabel = null;
    this.toggleGroup = null;
    this.scrollList = null;
    this.call = null;
    this.param = null;
  }
  onLoad() {
    super.onLoad();
    this.okBtn.node.on(a.default.CLICK, this.onOkBtn, this);
    this.toggleGroup.node.on(r.default.TOGGLE_CHANGE, this.onToggleGroup, this);
    this.scrollList.node.on(s.default.CLICK_ITEM, this.onClickGoodsCell, this);
  }
  setData(e) {
    this.param = e;
    this.refreshList();
    this.refreshCnt();
  }
  selectToggle(e) {
    this.toggleGroup.selectIdx(e);
  }
  onToggleGroup(e, t, o) {
    o && this.refreshList();
  }
  onOkBtn() {
    this.closePanel();
    this.call && this.call();
  }
  onClickGoodsCell(e, t) {
    let o = null,
      i = this.param;
    switch (t.type) {
      case "tile":
        o = i.tileConfIds;
        break;
      case "actor":
        o = i.actorConfIds;
        break;
      case "device":
        o = i.deviceConfIds;
        break;
      case "prop":
        o = i.propConfIds;
        break;
      case "weapon":
        o = i.weaponConfIds;
    }
    if (o) {
      if (t.selected) {
        t.selected = !1;
        let e = o.indexOf(t.id);
        o.splice(e, 1);
        this.refreshCnt();
      } else if (this.getCnt() < h.default.Ins.packageSizeMax) {
        t.selected = !0;
        o.push(t.id);
        this.refreshCnt();
      } else c.default.showToast(`最多选择${h.default.Ins.packageSizeMax}个`);
      let i = this.scrollList.getExtraData(e);
      i.item && i.item.emit(s.default.SET_DATA, i.data);
    }
  }
  getCnt() {
    let e = this.param;
    return e.tileConfIds.concat(e.actorConfIds).concat(e.deviceConfIds).concat(e.propConfIds).concat(e.weaponConfIds).length;
  }
  refreshCnt() {
    let e = this.getCnt();
    this.cntLabel.string = `Selected（${e}/${h.default.Ins.packageSizeMax}）`;
  }
  refreshList() {
    return n(this, void 0, void 0, function* () {
      let e = [];
      switch (this.toggleGroup.idx) {
        case 0:
          {
            let t = yield d.Mng.Ins.tileMng.loadAll();
            for (let o = 0; o < t.length; o++) {
              let i = t[o];
              i.goodsUId || i.importOthersImg || i.belongGameId || e.push({
                type: "tile",
                id: i.id,
                name: i.name,
                textureName: i.textureName,
                selected: this.param.tileConfIds.includes(i.id)
              });
            }
            break;
          }
        case 1:
          {
            let t = yield d.Mng.Ins.actorMng.loadAll();
            for (let o = 0; o < t.length; o++) {
              let i = t[o];
              i.goodsUId || i.importOthersImg || i.belongGameId || e.push({
                type: "actor",
                id: i.id,
                name: i.name,
                textureName: i.textureName,
                selected: this.param.actorConfIds.includes(i.id)
              });
            }
            break;
          }
        case 2:
          {
            let t = yield d.Mng.Ins.deviceMng.loadAll();
            for (let o = 0; o < t.length; o++) {
              let i = t[o];
              i.goodsUId || i.importOthersImg || i.belongGameId || e.push({
                type: "device",
                id: i.id,
                name: i.name,
                textureName: i.textureName,
                selected: this.param.deviceConfIds.includes(i.id)
              });
            }
            break;
          }
        case 3:
          {
            let t = yield d.Mng.Ins.propMng.loadAll();
            for (let o = 0; o < t.length; o++) {
              let i = t[o];
              i.goodsUId || i.importOthersImg || i.belongGameId || e.push({
                type: "prop",
                id: i.id,
                name: i.name,
                textureName: i.textureName,
                selected: this.param.propConfIds.includes(i.id)
              });
            }
            break;
          }
        case 4:
          {
            let t = yield d.Mng.Ins.weaponMng.loadAll();
            for (let o = 0; o < t.length; o++) {
              let i = t[o];
              i.goodsUId || i.importOthersImg || i.belongGameId || e.push({
                type: "weapon",
                id: i.id,
                name: i.name,
                textureName: i.textureName,
                selected: this.param.weaponConfIds.includes(i.id)
              });
            }
            break;
          }
      }
      this.scrollList.setDataArr(e);
    });
  }
};
i([u(a.default)], m.prototype, "okBtn", void 0);
i([u(cc.Label)], m.prototype, "cntLabel", void 0);
i([u(r.default)], m.prototype, "toggleGroup", void 0);
i([u(s.default)], m.prototype, "scrollList", void 0);
m = i([p], m);
exports.default = m;