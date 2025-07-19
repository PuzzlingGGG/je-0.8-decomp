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
  d = e("../../CustomUI/DropDownBox"),
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
    this.compareBox = null;
    this.btnItem = null;
    this.btnDelete = null;
    this.btnOk = null;
    this._editData = null;
    this._selectItemId = null;
  }
  onLoad() {
    super.onLoad();
    this.btnItem.node.on(s.default.CLICK, this.onClickItem, this);
    this.btnDelete.node.on(s.default.CLICK, this.onClickDelete, this);
    this.btnOk.node.on(s.default.CLICK, this.onClickOk, this);
    this.compareBox.node.on(d.default.SELECT_CHANGE, this.onCompareTypeChange, this);
    this._compareType = n.GSCompareType.EQUAL;
    let e = [];
    e = [{
      str: "等于",
      type: n.GSCompareType.EQUAL
    }, {
      str: "大于",
      type: n.GSCompareType.GREATER
    }, {
      str: "大于等于",
      type: n.GSCompareType.GREATER_EQUAL
    }, {
      str: "小于",
      type: n.GSCompareType.LESS
    }, {
      str: "小于等于",
      type: n.GSCompareType.LESS_EQUAL
    }, {
      str: "不等于",
      type: n.GSCompareType.NONEQUAL
    }];
    this._compareArray = e;
    this.compareBox.setDataArr(e);
  }
  setData(e, t) {
    this._opCallBack = t;
    this._editData = e;
    if (this._editData) {
      this._selectItemId = this._editData.itemId;
      this._compareType = this._editData.compare;
      this.valueEdit.string = this._editData.compareValue ? this._editData.compareValue + "" : "0";
    } else {
      this.btnOk.node.width = 500;
      this.btnDelete.node.active = !1;
    }
    this.onRefresh();
  }
  onEditValueChange() {
    let e = parseFloat(this.valueEdit.string);
    isNaN(e) && (e = 0);
    this.valueEdit.string = e + "";
  }
  onCompareTypeChange(e, t, o) {
    this._compareType = t.type;
  }
  onRefresh() {
    let e = this._selectItemId ? l.Mng.Ins.propMng.getOne(this._selectItemId) : null;
    this.nameLabel.string = e ? e.name : "";
    e ? l.Mng.Ins.spriteMng.setPropSprite(this.icon, e.textureName, 100) : this.icon.spriteFrame = null;
    let t = this._compareArray.findIndex(e => e.type == this._compareType);
    t <= 0 && (t = 0);
    this.compareBox.selectByIdx(t);
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
  onClickDelete() {
    this.closePanel();
    this._editData && this._opCallBack && this._opCallBack(null);
  }
  onClickOk() {
    if (this._selectItemId && "" != this._selectItemId) {
      this.closePanel();
      if (this._opCallBack) {
        let e = this._editData || n.GSDataNodeBuildHelper.NewGSDataCompareValue();
        e.type = n.GSSelectValueType.Item;
        e.itemId = this._selectItemId;
        e.compare = this._compareType;
        e.compareVariableId = -1;
        let t = parseFloat(this.valueEdit.string);
        isNaN(t) && (t = 0);
        e.compareValue = t;
        this._opCallBack(e);
      }
    } else r.default.showToast("请选择道具");
  }
};
i([p(cc.Sprite)], u.prototype, "icon", void 0);
i([p(cc.Label)], u.prototype, "nameLabel", void 0);
i([p(cc.EditBox)], u.prototype, "valueEdit", void 0);
i([p(d.default)], u.prototype, "compareBox", void 0);
i([p(s.default)], u.prototype, "btnItem", void 0);
i([p(s.default)], u.prototype, "btnDelete", void 0);
i([p(s.default)], u.prototype, "btnOk", void 0);
u = i([h], u);
exports.default = u;