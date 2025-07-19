"use strict";

var i = this && this.__decorate || function (e, t, o, i) {
  var n,
    a = arguments.length,
    s = a < 3 ? t : null === i ? i = Object.getOwnPropertyDescriptor(t, o) : i;
  if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) s = Reflect.decorate(e, t, o, i);else for (var r = e.length - 1; r >= 0; r--) (n = e[r]) && (s = (a < 3 ? n(s) : a > 3 ? n(t, o, s) : n(t, o)) || s);
  return a > 3 && s && Object.defineProperty(t, o, s), s;
};
const n = e("../../../GameScript/index"),
  a = e("../../../CustomUI/Button"),
  s = e("../../../Frame/SceneManager"),
  r = e("../../../Game/Player/Mng"),
  l = e("../EditWorldScene"),
  c = e("./SpawnMonsterItem"),
  {
    ccclass: d,
    property: h
  } = cc._decorator;
let p = class extends cc.Component {
  constructor() {
    super(...arguments);
    this.actBtn = null;
    this.deleteBtn = null;
    this.spawnMonster = null;
  }
  onLoad() {
    this.actBtn.node.on(a.default.CLICK, this.onActBtn, this);
    this.deleteBtn.node.on(a.default.CLICK, this.onDeleteBtn, this);
  }
  setData(e) {
    this.spawnMonster = e;
    this.updateActLabel();
  }
  updateActLabel() {
    let e = s.default.ins.findScene(l.default).worldData.id,
      t = r.Mng.Ins.worldMng.getActorData(e, this.spawnMonster.actorId),
      o = t ? r.Mng.Ins.actorMng.getOne(t.data.confId) : null,
      i = o ? o.name : "请选择模版";
    this.actBtn.label.string = i;
  }
  onActBtn() {
    let e = s.default.ins.findScene(l.default);
    e.saveToTempWorldDataMap();
    s.default.ins.OpenPanelByName("ActOptionSelectWorldActPanel", t => {
      t.setData("请选择敌人阵营角色", e.worldData.id, this.spawnMonster.actorId, [n.ActType.Enemy]);
      t.selectCallBack = ((e, t) => {
        if (t && t != this.spawnMonster.actorId) {
          this.spawnMonster.actorId = t;
          this.updateActLabel();
        }
      }).bind(this);
    });
  }
  onDeleteBtn() {
    let e = this.node.getComponentInParent(c.default);
    e && e.removeSpawn(this.spawnMonster);
  }
};
i([h(a.default)], p.prototype, "actBtn", void 0);
i([h(a.default)], p.prototype, "deleteBtn", void 0);
p = i([d], p);
exports.default = p;