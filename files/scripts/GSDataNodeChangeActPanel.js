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
  l = e("../../Scene/EditWorldScene/EditWorldScene"),
  c = e("../../CustomUI/Button"),
  d = e("../../CustomUI/DropDownBox"),
  h = e("../../CustomUI/Toggle"),
  p = e("./GSDataNodeActPropertyHelper"),
  u = e("../../Scene/EditWorldScene/Inspector/NumberEditBoxItem"),
  m = e("../../Frame/Util"),
  f = e("../../Frame/Top"),
  {
    ccclass: g,
    property: y
  } = cc._decorator;
let v = class extends a.default {
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
    this._editData = null;
  }
  onLoad() {
    super.onLoad();
    this.btnSelAct.node.on(c.default.CLICK, this.onClickSelAct, this);
    this.btnOk.node.on(c.default.CLICK, this.onClickOk, this);
    this.editButton.node.on(c.default.CLICK, this.onClickEditButton, this);
    this.propertyDropDown.node.on(d.default.SELECT_CHANGE, this.onPropertyNameChange, this);
    this.editToggle.node.on(h.default.STATE_CHANGE, this.onBooleanChange, this);
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
    this.addDropDown.node.on(d.default.SELECT_CHANGE, this.onAddStateChange, this);
    this._opType = -1;
  }
  setData(e, t) {
    this._opCallBack = t;
    this._editData = e;
    let o = s.default.ins.findScene(l.default);
    o.saveToTempWorldDataMap();
    this._worldId = o.worldData.id;
    if (this._editData) {
      this._actorId = this._editData.actorId;
      this._actorType = this._editData.actType;
      this._opType = this._editData.opType;
      this._propertyName = this._editData.propertyName;
      this.resetPropertyValue();
      this._propertyValue = this._editData.propertyValue;
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
    let e = p.GSDataNodeActPropertyHelper.instance.GetPropertyInfo(this._actorType, this._propertyName);
    if (!e) {
      let t = p.GSDataNodeActPropertyHelper.instance.GetPropertyInfoArray(this._actorType);
      this._propertyName = t && t.length > 0 && t[0].filedName;
      e = t && t.length > 0 && t[0];
      this._propertyValue = void 0;
      if (!e) {
        console.error(`error!actor[${this._actorId}] has no property`);
        this.closePanel();
      }
      this.resetPropertyValue();
    }
    let t = p.GSDataNodeActPropertyHelper.instance.GetPropertyInfoArray(this._actorType),
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
        e.valueRange && 2 == e.valueRange.length && (o = m.Util.clamp(o, e.valueRange[0], e.valueRange[1]));
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
    let e = p.GSDataNodeActPropertyHelper.instance.GetPropertyInfo(this._actorType, this._propertyName);
    switch (this._actorType) {
      case n.ActType.Tile:
        {
          let t = r.Mng.Ins.worldMng.getTileData(this._worldId, this._actorId);
          if (t) {
            let o = r.Mng.Ins.tileMng.getOne(t.data.confId);
            this._actorIcon = o ? o.textureName : null;
            this._actorName = o ? o.name : "";
            this._propertyValue = p.GSDataNodeActPropertyHelper.instance.GetFieldValue(t.data, e);
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
            this._propertyValue = p.GSDataNodeActPropertyHelper.instance.GetFieldValue(t.data, e);
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
            this._propertyValue = p.GSDataNodeActPropertyHelper.instance.GetFieldValue(t.data, e);
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
          let o = p.GSDataNodeActPropertyHelper.instance.GetPropertyInfoArray(this._actorType);
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
    let e = p.GSDataNodeActPropertyHelper.instance.GetPropertyInfo(this._actorType, this._propertyName);
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
    if (this._actorId && "" != this._actorId) {
      if ("" != this._propertyName) {
        this.closePanel();
        if (this._opCallBack) {
          let e = this._editData || n.GSDataNodeBuildHelper.NewGSDataNode(n.GSDataNodeType.GDATA_ChangeActorProperty);
          e.actorId = this._actorId;
          e.actType = this._actorType;
          e.opType = this._opType;
          e.propertyName = this._propertyName;
          let t = p.GSDataNodeActPropertyHelper.instance.GetPropertyInfo(this._actorType, this._propertyName);
          e.isTileUnit = t.isTileUnit;
          e.propertyValue = this._propertyValue;
          this._opCallBack(e);
        }
      } else f.default.showToast("请选择要更改的属性");
    } else f.default.showToast("请选择要调整的对象");
  }
};
i([y(cc.Sprite)], v.prototype, "icon", void 0);
i([y(cc.Label)], v.prototype, "nameLabel", void 0);
i([y(c.default)], v.prototype, "btnSelAct", void 0);
i([y(d.default)], v.prototype, "addDropDown", void 0);
i([y(d.default)], v.prototype, "propertyDropDown", void 0);
i([y(c.default)], v.prototype, "btnOk", void 0);
i([y(c.default)], v.prototype, "editButton", void 0);
i([y(u.default)], v.prototype, "editValue", void 0);
i([y(h.default)], v.prototype, "editToggle", void 0);
v = i([g], v);
exports.default = v;