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
  s = e("../../CustomUI/ScrollList"),
  r = e("../../CustomUI/ToggleGroup"),
  l = e("../../Frame/Config"),
  c = e("../../Frame/Panel"),
  d = e("../../Frame/Sound"),
  h = e("../../Frame/Util"),
  {
    ccclass: p,
    property: u
  } = cc._decorator;
let m = i = class extends c.default {
  constructor() {
    super(...arguments);
    this.list = null;
    this.toggleGroup = null;
    this.okBtn = null;
    this.evt = null;
    this.call = null;
  }
  onLoad() {
    super.onLoad();
    this.toggleGroup.node.on(r.default.TOGGLE_CHANGE, this.onToggleChange, this);
    this.list.node.on(s.default.CLICK_ITEM, this.onClickItem, this);
    this.okBtn.node.on(a.default.CLICK, this.onOkBtn, this);
  }
  onOpend() {
    cc.game.emit(i.SelectSoundPanel_Opend, this);
  }
  setData(e) {
    this.evt = h.Util.deepCopy(e);
    this.evt.extra || (this.evt.extra = {
      soundId: 31
    });
    let t = this.evt.extra.soundId,
      o = l.Config.soundConfs.find(e => e.id == t);
    this.toggleGroup.selectIdx(o.type);
    let i = this.list.getDataArr().findIndex(e => e.id == t);
    this.list.selectByIdx(i);
  }
  onToggleChange(e) {
    let t = e,
      o = l.Config.soundConfs.filter(e => e.type == t);
    this.list.setDataArr(o);
  }
  onClickItem(e, t) {
    d.Sound.play(t.url);
    this.evt.extra.soundId = t.id;
    cc.game.emit(i.SelectSoundPanel_Select);
  }
  onOkBtn() {
    this.closePanel();
    this.call && this.call(this.evt);
  }
};
m.SelectSoundPanel_Opend = "SelectSoundPanel_Opend";
m.SelectSoundPanel_Select = "SelectSoundPanel_Select";
n([u(s.default)], m.prototype, "list", void 0);
n([u(r.default)], m.prototype, "toggleGroup", void 0);
n([u(a.default)], m.prototype, "okBtn", void 0);
m = i = n([p], m);
exports.default = m;