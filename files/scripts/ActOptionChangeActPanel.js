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
  s = e("../../Frame/SceneManager"),
  r = e("../../Game/Player/Mng"),
  l = e("../../CustomUI/Button"),
  c = e("../../CustomUI/DropDownBox"),
  d = e("../../CustomUI/Toggle"),
  h = e("../../Scene/EditWorldScene/Inspector/NumberEditBoxItem"),
  p = e("../../Frame/Util"),
  u = e("../../Frame/Top"),
  m = e("../GSDataNodeChangeActPanel/GSDataNodeActPropertyHelper"),
  {
    ccclass: f,
    property: g
  } = cc._decorator;
let y = class extends a.default {
  constructor() {
    super(...arguments);
    this.icon = null;
    this.nameLabel = null;
    this.btnSelAct = null;
    this.addDropDown = null;
    this.propertyDropDown = null;
    this.btnOk = null;
    this.editButton = null;
    this.editValue = null;
    this.editToggle = null;
    this.evt = null;
    this.saveCall = null;
  }
  onLoad() {
    super.onLoad();
    this.btnSelAct.node.on(l.default.CLICK, this.onClickSelAct, this);
    this.btnOk.node.on(l.default.CLICK, this.onClickOk, this);
    this.editButton.node.on(l.default.CLICK, this.onClickEditButton, this);
    this.propertyDropDown.node.on(c.default.SELECT_CHANGE, this.onPropertyNameChange, this);
    this.editToggle.node.on(d.default.STATE_CHANGE, this.onBooleanChange, this);
    this._opArr = [{
      str: "设置",
      type: -1
    }, {
      str: "增加",
      type: n.GSComputeType.ADD
    }, {
      str: "减少",
      type: n.GSComputeType.SUB
    }];
    this.addDropDown.setDataArr(this._opArr);
    this.addDropDown.node.on(c.default.SELECT_CHANGE, this.onAddStateChange, this);
    this._opType = -1;
  }
  setData(e, t) {
    this._worldId = e;
    this.evt = t;
    let o = t.extra;
    if (o) {
      this._actorId = o.actorId;
      this._actorType = o.actType;
      this._opType = o.opType;
      this._propertyName = o.propertyName;
      this.resetPropertyValue();
      this._propertyValue = t.extra.propertyValue;
    } else {
      this._actorType = n.ActType.Hero;
      this._propertyName = "hp";
      this._propertyValue = "0";
      this._actorIcon = null;
      this._actorName = "";
    }
    this.onRefresh();
  }
  onRefresh() {
    let e = m.GSDataNodeActPropertyHelper.instance.GetPropertyInfo(this._actorType, this._propertyName);
    if (!e) {
      let t = m.GSDataNodeActPropertyHelper.instance.GetPropertyInfoArray(this._actorType);
      this._propertyName = t && t.length > 0 && t[0].filedName;
      e = t && t.length > 0 && t[0];
      this._propertyValue = void 0;
      if (!e) {
        console.error(`error!actor[${this._actorId}] has no property`);
        this.closePanel();
      }
      this.resetPropertyValue();
    }
    let t = m.GSDataNodeActPropertyHelper.instance.GetPropertyInfoArray(this._actorType),
      o = t.findIndex(e => e.filedName == this._propertyName);
    o <= 0 && (o = 0);
    this.propertyDropDown.setDataArr(t);
    this.propertyDropDown.selectByIdx(o);
    if (e) if (e.valueType == n.ActPropertyValueType.Float) {
      this.addDropDown.node.active = !0;
      let t = this._opArr.findIndex(e => e.type == this._opType);
      t <= 0 && (t = 0);
      this.addDropDown.selectByIdx(t);
      this.editValue.node.active = !0;
      this.editToggle.node.active = !1;
      this.editButton.node.active = !1;
      this.editValue.setData(e.str, this._propertyValue, t => {
        let o = Number.parseFloat(t) || 0;
        e.valueRange && 2 == e.valueRange.length && (o = p.Util.clamp(o, e.valueRange[0], e.valueRange[1]));
        this._propertyValue = o + "";
        this.editValue.label_num.string = this._propertyValue;
      });
    } else if (e.valueType == n.ActPropertyValueType.Bool) {
      this.addDropDown.node.active = !1;
      this.editValue.node.active = !1;
      this.editToggle.node.active = !0;
      this.editButton.node.active = !1;
      let e = !1;
      this._propertyValue && (e = "true" == this._propertyValue || parseFloat(this._propertyValue) > 0);
      e ? this.editToggle.check() : this.editToggle.uncheck();
    } else if (e.valueType == n.ActPropertyValueType.Weapon) {
      this.addDropDown.node.active = !1;
      this.editValue.node.active = !1;
      this.editToggle.node.active = !1;
      this.editButton.node.active = !0;
      let e = r.Mng.Ins.weaponMng.getOne(this._propertyValue);
      this._editBtnValue = e ? e.name : "";
      this.editButton.label.string = this._editBtnValue;
    }
    this.nameLabel.string = this._actorName;
    this._actorIcon ? r.Mng.Ins.spriteMng.setPropSprite(this.icon, this._actorIcon, 100) : this.icon.spriteFrame = null;
  }
  resetPropertyValue() {
    let e = m.GSDataNodeActPropertyHelper.instance.GetPropertyInfo(this._actorType, this._propertyName);
    switch (this._actorType) {
      case n.ActType.Tile:
        {
          let t = r.Mng.Ins.worldMng.getTileData(this._worldId, this._actorId);
          if (t) {
            let o = r.Mng.Ins.tileMng.getOne(t.data.confId);
            this._actorIcon = o ? o.textureName : null;
            this._actorName = o ? o.name : "";
            this._propertyValue = m.GSDataNodeActPropertyHelper.instance.GetFieldValue(t.data, e);
          }
        }
        break;
      case n.ActType.Hero:
      case n.ActType.Enemy:
      case n.ActType.Npc:
        {
          let t = r.Mng.Ins.worldMng.getActorData(this._worldId, this._actorId);
          if (t) {
            let o = r.Mng.Ins.actorMng.getOne(t.data.confId);
            this._actorIcon = o ? o.textureName : null;
            this._actorName = o ? o.name : "";
            this._propertyValue = m.GSDataNodeActPropertyHelper.instance.GetFieldValue(t.data, e);
          }
        }
        break;
      case n.ActType.Device:
        {
          let t = r.Mng.Ins.worldMng.getDeviceData(this._worldId, this._actorId);
          if (t) {
            let o = r.Mng.Ins.deviceMng.getOne(t.data.confId);
            this._actorIcon = o ? o.textureName : null;
            this._actorName = o ? o.name : "";
            this._propertyValue = m.GSDataNodeActPropertyHelper.instance.GetFieldValue(t.data, e);
          }
        }
    }
  }
  onAddStateChange(e, t, o) {
    o && (this._opType = t.type);
  }
  onPropertyNameChange(e, t, o) {
    if (o) {
      this._propertyName = t.filedName;
      this.resetPropertyValue();
      this.onRefresh();
    }
  }
  onClickSelAct() {
    s.default.ins.OpenPanelByName("ActOptionSelectWorldActPanel", e => {
      e.setData("选择地图对象", this._worldId, this._actorId);
      e.selectCallBack = ((e, t) => {
        if (t && t != this._actorId) {
          this._actorId = t;
          this._actorType = e;
          let o = m.GSDataNodeActPropertyHelper.instance.GetPropertyInfoArray(this._actorType);
          this._propertyName = o && o.length > 0 && o[0].filedName;
          this.resetPropertyValue();
          this.onRefresh();
        }
      }).bind(this);
    });
  }
  onBooleanChange(e, t) {
    t && (this._propertyValue = e ? "1" : "0");
  }
  onClickEditButton() {
    let e = m.GSDataNodeActPropertyHelper.instance.GetPropertyInfo(this._actorType, this._propertyName);
    e && e.valueType == n.ActPropertyValueType.Weapon && s.default.ins.OpenPanelByName("SelectWeaponPanel", e => {
      e.setData(this._propertyValue);
      e.selectCall = e => {
        this._propertyValue = e ? e.id : "";
        this._editBtnValue = e ? e.name : "";
        this.editButton.label.string = this._editBtnValue;
      };
    });
  }
  onClickOk() {
    if (!this._actorId || "" == this._actorId) {
      u.default.showToast("请选择要调整的对象");
      return;
    }
    if ("" == this._propertyName) {
      u.default.showToast("请选择要更改的属性");
      return;
    }
    this.closePanel();
    let e = m.GSDataNodeActPropertyHelper.instance.GetPropertyInfo(this._actorType, this._propertyName),
      t = {
        type: n.GSDataNodeType.GDATA_ChangeActorProperty,
        actorId: this._actorId,
        actType: this._actorType,
        opType: this._opType,
        propertyName: this._propertyName,
        propertyValue: this._propertyValue,
        isTileUnit: e.isTileUnit
      };
    this.evt.extra = t;
    this.saveCall && this.saveCall(this.evt);
  }
};
i([g(cc.Sprite)], y.prototype, "icon", void 0);
i([g(cc.Label)], y.prototype, "nameLabel", void 0);
i([g(l.default)], y.prototype, "btnSelAct", void 0);
i([g(c.default)], y.prototype, "addDropDown", void 0);
i([g(c.default)], y.prototype, "propertyDropDown", void 0);
i([g(l.default)], y.prototype, "btnOk", void 0);
i([g(l.default)], y.prototype, "editButton", void 0);
i([g(h.default)], y.prototype, "editValue", void 0);
i([g(d.default)], y.prototype, "editToggle", void 0);
y = i([f], y);
exports.default = y;