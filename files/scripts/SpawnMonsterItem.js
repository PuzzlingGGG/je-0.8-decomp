"use strict";

var i = this && this.__decorate || function (e, t, o, i) {
  var n,
    a = arguments.length,
    s = a < 3 ? t : null === i ? i = Object.getOwnPropertyDescriptor(t, o) : i;
  if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) s = Reflect.decorate(e, t, o, i);else for (var r = e.length - 1; r >= 0; r--) (n = e[r]) && (s = (a < 3 ? n(s) : a > 3 ? n(t, o, s) : n(t, o)) || s);
  return a > 3 && s && Object.defineProperty(t, o, s), s;
};
const n = e("../../../CustomUI/Button"),
  a = e("../../../Frame/TweenUtil"),
  s = e("../../../Frame/Util"),
  r = e("./SpawnMonsterCell"),
  {
    ccclass: l,
    property: c
  } = cc._decorator;
let d = class extends cc.Component {
  constructor() {
    super(...arguments);
    this.nameLabel = null;
    this.createBtn = null;
    this.spawnActorCell = null;
    this.spawnMonsters = null;
  }
  onLoad() {
    this.createBtn.node.on(n.default.CLICK, this.onCreateNewBtn, this);
  }
  setData(e, t) {
    this.spawnMonsters = t || [];
    this.nameLabel.string = e;
    this.refreshActorList();
  }
  refreshActorList() {
    s.Util.makeBro(this.spawnActorCell.node, this.spawnMonsters.length, (e, t) => {
      e.getComponent(r.default).setData(this.spawnMonsters[t]);
    });
  }
  onCreateNewBtn() {
    this.spawnMonsters.push({
      actorId: null
    });
    this.refreshActorList();
    s.Util.updateAllLayout(this.node.parent);
    let e = this.spawnActorCell.node.parent.children[this.spawnMonsters.length - 1];
    a.TweenUtil.applyScaleBounce2(e, 1, 1.05);
  }
  removeSpawn(e) {
    for (let t = 0; t < this.spawnMonsters.length; t++) if (this.spawnMonsters[t] == e) {
      this.spawnMonsters.splice(t, 1);
      this.refreshActorList();
      s.Util.updateAllLayout(this.node.parent);
      return;
    }
  }
};
i([c(cc.Label)], d.prototype, "nameLabel", void 0);
i([c(n.default)], d.prototype, "createBtn", void 0);
i([c(r.default)], d.prototype, "spawnActorCell", void 0);
d = i([l], d);
exports.default = d;