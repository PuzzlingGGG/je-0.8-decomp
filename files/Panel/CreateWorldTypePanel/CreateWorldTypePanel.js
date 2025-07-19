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
  s = e("../../Frame/Config"),
  r = e("../../Frame/Panel"),
  l = e("../../Frame/Top"),
  c = e("../../Frame/UIColor"),
  d = e("../../Frame/Util"),
  h = e("../../Game/Player/GuideMng"),
  p = e("../../GameData/GameTypeDefine"),
  {
    ccclass: u,
    property: m
  } = cc._decorator;
let f = i = class extends r.default {
  constructor() {
    super(...arguments);
    this.jumpBtn = null;
    this.rpgBtn = null;
    this.shootBtn = null;
    this.moreBtn = null;
    this.onSeleteType = null;
  }
  onLoad() {
    super.onLoad();
    this.jumpBtn.node.on(a.default.CLICK, this.onJumpBtnTap, this);
    this.rpgBtn.node.on(a.default.CLICK, this.onRpgBtnTap, this);
    this.shootBtn.node.on(a.default.CLICK, this.onShootBtnTap, this);
    this.moreBtn.node.on(a.default.CLICK, this.onMoreBtnTap, this);
    this.jumpBtn.label.string = s.Config.getWorldTypeActName(p.WorldType.Jump);
    this.rpgBtn.label.string = s.Config.getWorldTypeActName(p.WorldType.Rpg);
    this.shootBtn.label.string = s.Config.getWorldTypeActName(p.WorldType.Shoot);
    this.lockBtn(this.rpgBtn, h.default.Ins.isComplete(h.GuideId.EditWorld));
  }
  openAnim(e) {
    super.openAnim(() => {
      e && e();
      cc.game.emit(i.CreateWorldTypePanel_Opend, this);
    });
  }
  onJumpBtnTap() {
    this.select(p.WorldType.Jump);
  }
  onRpgBtnTap() {
    h.default.Ins.isComplete(h.GuideId.EditWorld) ? this.select(p.WorldType.Rpg) : l.default.showToast("请先在‘平台跳跃’里完成基础教程");
  }
  onShootBtnTap() {
    this.select(p.WorldType.Shoot);
  }
  onMoreBtnTap() {
    l.default.showToast("佛系开发中");
  }
  select(e) {
    this.closePanel();
    this.onSeleteType && this.onSeleteType(e);
  }
  lockBtn(e, t) {
    e.background.node.color = t ? c.UIColor.white : c.UIColor.gray;
    let o = d.Util.searchChild(e.node, "lock");
    o && (exports.active = !t);
  }
};
f.CreateWorldTypePanel_Opend = "CreateWorldTypePanel_Opend";
n([m(a.default)], f.prototype, "jumpBtn", void 0);
n([m(a.default)], f.prototype, "rpgBtn", void 0);
n([m(a.default)], f.prototype, "shootBtn", void 0);
n([m(a.default)], f.prototype, "moreBtn", void 0);
f = i = n([u], f);
exports.default = f;