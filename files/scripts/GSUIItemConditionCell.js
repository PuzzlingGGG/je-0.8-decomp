"use strict";

var i = this && this.__decorate || function (e, t, o, i) {
  var n,
    a = arguments.length,
    s = a < 3 ? t : null === i ? i = Object.getOwnPropertyDescriptor(t, o) : i;
  if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) s = Reflect.decorate(e, t, o, i);else for (var r = e.length - 1; r >= 0; r--) (n = e[r]) && (s = (a < 3 ? n(s) : a > 3 ? n(t, o, s) : n(t, o)) || s);
  return a > 3 && s && Object.defineProperty(t, o, s), s;
};
const n = e("../../GameScript/index"),
  a = e("../../CustomUI/DropDownBox"),
  s = e("../../Game/Player/Mng"),
  r = e("../../CustomUI/Button"),
  l = e("../GSConditionSelectTypePanel/GSConditionSelectTypePanel"),
  c = e("./NodeRender/GSDataNodeRender"),
  {
    ccclass: d,
    property: h
  } = cc._decorator;
let p = class extends cc.Component {
  constructor() {
    super(...arguments);
    this.variableLabel = null;
    this.logicDropDownBox = null;
    this.btnDetail = null;
    this._inited = !1;
    this._data = null;
  }
  onLoad() {
    if (!this._inited) {
      this._inited = !0;
      this.btnDetail.node.on(r.default.CLICK, this.onClickDetail, this);
      this.logicDropDownBox.node.active = !0;
      this.logicDropDownBox.node.on(a.default.SELECT_CHANGE, this.onLogicTypeChange, this);
      this.logicDropDownBox.setDataArr([{
        str: "且",
        type: n.GSLogicType.AND
      }, {
        str: "或",
        type: n.GSLogicType.OR
      }]);
    }
  }
  start() {
    this.onRefresh();
  }
  setData(e) {
    this._data = e;
    this.onRefresh();
  }
  onRefresh() {
    if (!this._inited) return;
    let e = this._data;
    if (e) {
      if (e.next) {
        this.logicDropDownBox.node.active = !0;
        this.logicDropDownBox.selectByIdx(e.logicType == n.GSLogicType.AND ? 0 : 1);
      } else this.logicDropDownBox.node.active = !1;
      e.a && (this.variableLabel.string = this.getValueRenderString(e.a));
    }
  }
  onClickDetail() {
    this._data && this._data.a && l.default.openConditionEditPanel(this._data.a.type, this._data.a, (e => {
      if (e) {
        this._data.a = e;
        this.onRefresh();
      } else this.node.parent.emit("DELETECONDITION", this._data);
    }).bind(this));
  }
  onLogicTypeChange(e, t, o) {
    o && this._data && (this._data.logicType = t.type);
  }
  getValueRenderString(e) {
    if (!e) return "";
    let t = e.compareVariableId > 0 && n.GSVariableMng.instance.getVariable(e.compareVariableId);
    if (e.type == n.GSSelectValueType.Variable) {
      let o = e.variableId > 0 && n.GSVariableMng.instance.getVariable(e.variableId);
      if (o) {
        if (o.valueType == n.GSValueType.BOOL) {
          let i = t.valueType == n.GSValueType.BOOL ? `<color=${c.G_NameColor.toHEX()}>${"#" + t.name}</c>` : `<color=${c.G_ValueColor.toHEX()}>${e.compareValue && e.compareValue > 0 ? "开" : "关"}</c>`;
          return `<color=${c.G_NameColor.toHEX()}>${"#" + o.name}</c><color=#000000> 为 ${i}</color>`;
        }
        {
          let i = t ? `<color=${c.G_NameColor.toHEX()}>${"#" + t.name}</c>` : `<color=${c.G_ValueColor.toHEX()}>${e.compareValue}</c>`;
          return `<color=${c.G_NameColor.toHEX()}>${"#" + o.name}</c><color=#000000> ${n.GSCompareTypeStrMap.get(e.compare)} ${i}</color>`;
        }
      }
      {
        let o = t ? `<color=${c.G_NameColor.toHEX()}>${"#" + t.name}</c>` : `<color=${c.G_ValueColor.toHEX()}>${e.compareValue}</c>`;
        return `<color=${c.G_NameColor.toHEX()}>undefined</c><color=#000000> ${n.GSCompareTypeStrMap.get(e.compare)} ${o}</color>`;
      }
    }
    if (e.type == n.GSSelectValueType.Item) {
      let o = e.itemId && s.Mng.Ins.propMng.getOne(e.itemId);
      if (o) {
        let i = t ? `<color=${c.G_NameColor.toHEX()}>${"#" + t.name}</c>` : `<color=${c.G_ValueColor.toHEX()}>${e.compareValue}</c>`;
        return `<color=${c.G_NameColor.toHEX()}>${o.name}</c><color=#000000> ${n.GSCompareTypeStrMap.get(e.compare)} ${i}</color>`;
      }
    }
    return "";
  }
};
i([h(cc.RichText)], p.prototype, "variableLabel", void 0);
i([h(a.default)], p.prototype, "logicDropDownBox", void 0);
i([h(r.default)], p.prototype, "btnDetail", void 0);
p = i([d], p);
exports.default = p;