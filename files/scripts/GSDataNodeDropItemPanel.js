"use strict";

var i = this && this.__decorate || function (e, t, o, i) {
  var n,
    a = arguments.length,
    s = a < 3 ? t : null === i ? i = Object.getOwnPropertyDescriptor(t, o) : i;
  if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) s = Reflect.decorate(e, t, o, i);else for (var r = e.length - 1; r >= 0; r--) (n = e[r]) && (s = (a < 3 ? n(s) : a > 3 ? n(t, o, s) : n(t, o)) || s);
  return a > 3 && s && Object.defineProperty(t, o, s), s;
};
const n = e("../../GameScript/index"),
  a = e("../../Frame/Panel"),
  s = e("../../CustomUI/Button"),
  r = e("../../Frame/Top"),
  l = e("../../Game/Player/Mng"),
  c = e("../../Frame/SceneManager"),
  d = e("../../CustomUI/Toggle"),
  {
    ccclass: h,
    property: p
  } = cc._decorator;
let u = class extends a.default {
  constructor() {
    super(...arguments);
    this.icon = null;
    this.nameLabel = null;
    this.valueEdit = null;
    this.useGravity = null;
    this.btnItem = null;
    this.btnOk = null;
    this._editData = null;
    this._selectItemId = null;
  }
  onLoad() {
    super.onLoad();
    this.btnItem.node.on(s.default.CLICK, this.onClickItem, this);
    this.btnOk.node.on(s.default.CLICK, this.onClickOk, this);
  }
  setData(e, t) {
    this._opCallBack = t;
    this._editData = e;
    if (this._editData) {
      this._selectItemId = this._editData.itemId;
      this.valueEdit.string = this._editData.compareValue ? this._editData.compareValue + "" : "0";
      this._editData.useGravity ? this.useGravity.check() : this.useGravity.uncheck();
    }
    this.onRefresh();
  }
  onEditValueChange() {
    let e = parseFloat(this.valueEdit.string);
    isNaN(e) && (e = 0);
    this.valueEdit.string = e + "";
  }
  onRefresh() {
    let e = this._selectItemId ? l.Mng.Ins.propMng.getOne(this._selectItemId) : null;
    this.nameLabel.string = e ? e.name : "";
    e ? l.Mng.Ins.spriteMng.setPropSprite(this.icon, e.textureName, 100) : this.icon.spriteFrame = null;
  }
  onClickItem() {
    c.default.ins.OpenPanelByName("SelectPropPanel", e => {
      e.setData(this._selectItemId);
      e.selectCall = (e => {
        this._selectItemId = e.id;
        this.onRefresh();
      }).bind(this);
    });
  }
  onClickOk() {
    if (this._selectItemId && "" != this._selectItemId) {
      this.closePanel();
      if (this._opCallBack) {
        let e = this._editData || n.GSDataNodeBuildHelper.NewGSDataNode(n.GSDataNodeType.GDATA_DropItem);
        e.itemId = this._selectItemId;
        let t = parseFloat(this.valueEdit.string);
        isNaN(t) && (t = 0);
        e.compareValue = t;
        e.useGravity = this.useGravity.isChecked;
        this._opCallBack(e);
      }
    } else r.default.showToast("请选择道具");
  }
};
i([p(cc.Sprite)], u.prototype, "icon", void 0);
i([p(cc.Label)], u.prototype, "nameLabel", void 0);
i([p(cc.EditBox)], u.prototype, "valueEdit", void 0);
i([p(d.default)], u.prototype, "useGravity", void 0);
i([p(s.default)], u.prototype, "btnItem", void 0);
i([p(s.default)], u.prototype, "btnOk", void 0);
u = i([h], u);
exports.default = u;