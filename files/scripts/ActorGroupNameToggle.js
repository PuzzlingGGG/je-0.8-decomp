"use strict";

var i = this && this.__decorate || function (e, t, o, i) {
  var n,
    a = arguments.length,
    s = a < 3 ? t : null === i ? i = Object.getOwnPropertyDescriptor(t, o) : i;
  if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) s = Reflect.decorate(e, t, o, i);else for (var r = e.length - 1; r >= 0; r--) (n = e[r]) && (s = (a < 3 ? n(s) : a > 3 ? n(t, o, s) : n(t, o)) || s);
  return a > 3 && s && Object.defineProperty(t, o, s), s;
};
const n = e("../../CustomUI/Button"),
  a = e("../../CustomUI/ScrollList"),
  s = e("../../CustomUI/Toggle"),
  r = e("../../Frame/DataBind"),
  l = e("../../Frame/SceneManager"),
  c = e("../../Frame/Top"),
  d = e("../../Game/Player/Mng"),
  {
    ccclass: h,
    property: p
  } = cc._decorator;
let u = class extends r.DB.DataBindComponent {
  constructor() {
    super(...arguments);
    this.toggle = null;
    this.lableName = null;
    this.btnCreate = null;
    this._data = null;
  }
  onLoad() {
    this.node.on(a.default.SET_DATA, this.setData, this);
    this.toggle.node.on(s.default.STATE_CHANGE, this.onStateChange, this);
    this.btnCreate.node.on(n.default.CLICK, () => {
      d.Mng.Ins.assetGroupMng.customGroups.length >= 10 ? c.default.showToast("最多可创建10个分组") : l.default.ins.OpenPanelByName("ActorGroupCreatePanel", e => {
        e.setData(!1, e => {
          e && this.node.parent.emit("onRefreshGroup");
        });
      });
    }, this);
  }
  setData(e) {
    this._data = e;
    this.lableName.string = e.groupName;
    this._data.isSelect ? this.toggle.check() : this.toggle.uncheck();
    this.btnCreate.node.active = e.isCreateBtn;
  }
  onStateChange() {
    this._data.isSelect = this.toggle.isChecked;
  }
};
i([p(s.default)], u.prototype, "toggle", void 0);
i([p(cc.Label)], u.prototype, "lableName", void 0);
i([p(n.default)], u.prototype, "btnCreate", void 0);
u = i([h], u);
exports.default = u;