"use strict";

var i,
  n = this && this.__decorate || function (e, t, o, i) {
    var n,
      a = arguments.length,
      s = a < 3 ? t : null === i ? i = Object.getOwnPropertyDescriptor(t, o) : i;
    if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) s = Reflect.decorate(e, t, o, i);else for (var r = e.length - 1; r >= 0; r--) (n = e[r]) && (s = (a < 3 ? n(s) : a > 3 ? n(t, o, s) : n(t, o)) || s);
    return a > 3 && s && Object.defineProperty(t, o, s), s;
  };
const a = e("../../../CustomUI/Button"),
  s = e("../../../Frame/TweenUtil"),
  r = e("../../../Frame/Util"),
  l = e("../../../GameData/GameTypeDefine"),
  c = e("./TriggerEvtCell"),
  {
    ccclass: d,
    property: h
  } = cc._decorator;
let p = i = class extends cc.Component {
  constructor() {
    super(...arguments);
    this.nameLabel = null;
    this.createEvtBtn = null;
    this.triggerEvtCell = null;
    this.evts = null;
    this.isWorldData = !1;
  }
  onLoad() {
    this.createEvtBtn.node.on(a.default.CLICK, this.onCreateNewBtn, this);
  }
  setData(e, t, o) {
    this.evts = t || [];
    this.isWorldData = o;
    this.nameLabel.string = e;
    this.refreshEvtList();
  }
  refreshEvtList() {
    r.Util.makeBro(this.triggerEvtCell.node, this.evts.length, (e, t) => {
      e.getComponent(c.default).setData(this.evts[t], this.isWorldData);
    });
  }
  onCreateNewBtn() {
    let e = {
      act: l.TriggerAct.None
    };
    this.evts.push(e);
    this.refreshEvtList();
    r.Util.updateAllLayout(this.node.parent);
    let t = this.triggerEvtCell.node.parent.children[this.evts.length - 1];
    s.TweenUtil.applyScaleBounce2(t, 1, 1.05);
    let o = this.triggerEvtCell.node.parent,
      n = o.children[o.childrenCount - 1].getComponent(c.default);
    cc.game.emit(i.TriggerItem_Create, n);
  }
  removeEvt(e) {
    for (let t = 0; t < this.evts.length; t++) if (this.evts[t] == e) {
      this.evts.splice(t, 1);
      this.refreshEvtList();
      r.Util.updateAllLayout(this.node.parent);
      return;
    }
  }
};
p.TriggerItem_Create = "TriggerItem_Create";
n([h(cc.Label)], p.prototype, "nameLabel", void 0);
n([h(a.default)], p.prototype, "createEvtBtn", void 0);
n([h(c.default)], p.prototype, "triggerEvtCell", void 0);
p = i = n([d], p);
exports.default = p;