"use strict";

var i,
  n = this && this.__decorate || function (e, t, o, i) {
    var n,
      a = arguments.length,
      s = a < 3 ? t : null === i ? i = Object.getOwnPropertyDescriptor(t, o) : i;
    if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) s = Reflect.decorate(e, t, o, i);else for (var r = e.length - 1; r >= 0; r--) (n = e[r]) && (s = (a < 3 ? n(s) : a > 3 ? n(t, o, s) : n(t, o)) || s);
    return a > 3 && s && Object.defineProperty(t, o, s), s;
  };
const a = e("../../CustomUI/Button"),
  s = e("../../CustomUI/ToggleGroup"),
  r = e("../../Frame/Config"),
  l = e("../../Frame/Panel"),
  c = e("../../Frame/UIColor"),
  d = e("../../Frame/Util"),
  h = e("../../GameData/GameTypeDefine"),
  {
    ccclass: p,
    property: u
  } = cc._decorator;
let m = i = class extends l.default {
  constructor() {
    super(...arguments);
    this.btn = null;
    this.toggleGroup = null;
    this.isWorldData = !1;
    this.call = null;
    this.curAct = null;
    this.actConfig = [[h.TriggerAct.Dialog, h.TriggerAct.ShiftWorld, h.TriggerAct.DropProp, h.TriggerAct.StartTimeCountDown, h.TriggerAct.StopTimeCountDown, h.TriggerAct.ChangeAct, h.TriggerAct.BagItem, h.TriggerAct.Random, h.TriggerAct.GameScript], [h.TriggerAct.ShiftHero, h.TriggerAct.ShiftWeapon, h.TriggerAct.RecoverHP, h.TriggerAct.ChangeHero], [h.TriggerAct.GameWin, h.TriggerAct.GameOver, h.TriggerAct.GameShop, h.TriggerAct.GameRank, h.TriggerAct.UploadRankScore], [h.TriggerAct.Save, h.TriggerAct.Load, h.TriggerAct.ClearSave], [h.TriggerAct.Sound, h.TriggerAct.CameraShake], [h.TriggerAct.ShareGame, h.TriggerAct.AD]];
  }
  onLoad() {
    super.onLoad();
    this.toggleGroup.node.on(s.default.TOGGLE_CHANGE, this.onToggleChange, this);
  }
  onOpend() {
    cc.game.emit(i.TriggerActPanel_Opend, this);
  }
  setData(e, t) {
    this.curAct = e;
    this.isWorldData = t;
    let o = 0;
    for (let t = 0; t < this.actConfig.length; t++) if (this.actConfig[t].includes(e)) {
      o = t;
      break;
    }
    this.toggleGroup.selectIdx(o);
    this.updateActList();
  }
  onToggleChange() {
    this.updateActList();
    cc.game.emit(i.TriggerActPanel_ToggleChange, this.toggleGroup.idx);
  }
  updateActList() {
    let e = this.toggleGroup.idx,
      t = this.actConfig[e];
    d.Util.makeBro(this.btn.node, t.length, (e, o) => {
      let i = t[o];
      e.act = i;
      let n = e.getComponent(a.default);
      n.label.string = r.Config.getTriggerActName(i);
      n.background.node.color = i == this.curAct ? c.UIColor.green : c.UIColor.blue;
      n.node.on(a.default.CLICK, this.onBtn, this);
    });
    d.Util.updateAllLayout(this.btn.node.parent);
  }
  onBtn(e) {
    this.closePanel();
    let t = e.target.act;
    this.call && this.call(t);
  }
};
m.TriggerActPanel_Opend = "TriggerActPanel_Opend";
m.TriggerActPanel_ToggleChange = "TriggerActPanel_ToggleChange";
n([u(a.default)], m.prototype, "btn", void 0);
n([u(s.default)], m.prototype, "toggleGroup", void 0);
m = i = n([p], m);
exports.default = m;