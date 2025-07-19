"use strict";

var i = this && this.__decorate || function (e, t, o, i) {
  var n,
    a = arguments.length,
    s = a < 3 ? t : null === i ? i = Object.getOwnPropertyDescriptor(t, o) : i;
  if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) s = Reflect.decorate(e, t, o, i);else for (var r = e.length - 1; r >= 0; r--) (n = e[r]) && (s = (a < 3 ? n(s) : a > 3 ? n(t, o, s) : n(t, o)) || s);
  return a > 3 && s && Object.defineProperty(t, o, s), s;
};
const n = e("../../GameScript/index"),
  a = e("../../CustomUI/ScrollList"),
  s = e("../../Frame/Panel"),
  r = e("../../Frame/SceneManager"),
  l = e("../../Scene/EditWorldScene/EditWorldScene"),
  {
    ccclass: c,
    property: d
  } = cc._decorator;
let h = class extends s.default {
  constructor() {
    super(...arguments);
    this.list = null;
    this.emptyNode = null;
    this._editData = null;
    this._coor = {
      iCol: 0,
      iRow: 0
    };
  }
  onLoad() {
    super.onLoad();
    this.list.node.on(a.default.CLICK_ITEM, this.onClickItem, this);
  }
  setData(e, t) {
    this._opCallBack = t;
    this._editData = e;
    if (this._editData) {
      this._worldId = this._editData.worldId;
      this._coor = this._editData.coor;
    }
    let o = r.default.ins.findScene(l.default);
    if (o) {
      let e = o.gameData,
        t = e.worldIds;
      t = e.worldIds.filter(e => e != o.worldData.id);
      this.list.setDataArr(t);
      this.emptyNode.active = 0 == t.length;
      let i = this._worldId ? t.indexOf(this._worldId) : 0;
      i < 0 && (i = 0);
      this.list.selectByIdx(i);
    }
  }
  onClickItem(e, t) {
    r.default.ins.OpenPanelByName("ActOptionSelectWorldCoorPanel", e => {
      let o = this._coor;
      e.setData(t, o);
      e.selectCall = e => {
        this._worldId = t;
        this._coor = e;
        this.closePanel();
        if (this._opCallBack) {
          let e = this._editData || n.GSDataNodeBuildHelper.NewGSDataNode(n.GSDataNodeType.GSYS_SwitchMap);
          e.worldId = this._worldId;
          e.coor = this._coor;
          this._opCallBack(e);
        }
      };
    });
  }
};
i([d(a.default)], h.prototype, "list", void 0);
i([d(cc.Node)], h.prototype, "emptyNode", void 0);
h = i([c], h);
exports.default = h;