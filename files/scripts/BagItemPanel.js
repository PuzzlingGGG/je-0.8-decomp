"use strict";

var i = this && this.__decorate || function (e, t, o, i) {
    var n,
      a = arguments.length,
      s = a < 3 ? t : null === i ? i = Object.getOwnPropertyDescriptor(t, o) : i;
    if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) s = Reflect.decorate(e, t, o, i);else for (var r = e.length - 1; r >= 0; r--) (n = e[r]) && (s = (a < 3 ? n(s) : a > 3 ? n(t, o, s) : n(t, o)) || s);
    return a > 3 && s && Object.defineProperty(t, o, s), s;
  },
  n = this && this.__awaiter || function (e, t, o, i) {
    return new (o || (o = Promise))(function (n, a) {
      function s(e) {
        try {
          l(i.next(e));
        } catch (e) {
          a(e);
        }
      }
      function r(e) {
        try {
          l(i.throw(e));
        } catch (e) {
          a(e);
        }
      }
      function l(e) {
        e.done ? n(e.value) : (t = e.value, t instanceof o ? t : new o(function (e) {
          e(t);
        })).then(s, r);
        var t;
      }
      l((i = i.apply(e, t || [])).next());
    });
  };
const a = e("../../CustomUI/Button"),
  s = e("../../Frame/Panel"),
  r = e("../../Frame/SceneManager"),
  l = e("../../Frame/Top"),
  c = e("../../Frame/Util"),
  d = e("../../Game/Player/GameBagMng"),
  h = e("../../Game/Player/Mng"),
  p = e("../../Game/Player/TriggerMng"),
  u = e("../../Scene/GameScene/GameScene"),
  {
    ccclass: m,
    property: f
  } = cc._decorator;
let g = class extends s.default {
  constructor() {
    super(...arguments);
    this.nameLabel = null;
    this.cntLabel = null;
    this.introLabel = null;
    this.sprite = null;
    this.useBtn = null;
    this.dropBtn = null;
    this.data = null;
    this.conf = null;
    this.useCall = null;
    this.dropCall = null;
  }
  onLoad() {
    super.onLoad();
    this.useBtn.node.on(a.default.CLICK, this.onUseBtn, this);
    this.dropBtn.node.on(a.default.CLICK, this.onDropBtn, this);
  }
  setData(e) {
    return n(this, void 0, void 0, function* () {
      this.data = e;
      this.refreshCnt();
      let t = yield h.Mng.Ins.propMng.loadOne(e.propConfId);
      this.conf = t;
      if (t) {
        this.nameLabel.string = t.name;
        this.introLabel.string = t.intro;
        h.Mng.Ins.spriteMng.setPropSprite(this.sprite, t.textureName, 300);
      }
    });
  }
  refreshCnt() {
    this.cntLabel.string = "x" + d.default.Ins.getCnt(this.data.propConfId);
  }
  onUseBtn() {
    if (this.conf) if (d.default.Ins.getCnt(this.data.propConfId) > 0) {
      if (this.conf.once) {
        d.default.Ins.sub(this.data.propConfId, 1);
        this.refreshCnt();
      }
      let e = r.default.ins.findScene(u.default).world.hero,
        t = c.Util.deepCopy(this.conf.onUse, []);
      p.default.Ins.emitTrigger(t, e.node);
      this.useCall && this.useCall();
      this.closePanel();
      l.default.showToast("使用了道具：" + this.conf.name);
    } else l.default.showToast("道具用光了");
  }
  onDropBtn() {
    if (this.conf) if (d.default.Ins.getCnt(this.data.propConfId) > 0) {
      d.default.Ins.sub(this.data.propConfId, 1);
      this.refreshCnt();
      let e = r.default.ins.findScene(u.default).world.hero,
        t = c.Util.deepCopy(this.conf.onDrop, []);
      p.default.Ins.emitTrigger(t, e.node);
      this.dropCall && this.dropCall();
    } else l.default.showToast("数量不足");
  }
};
i([f(cc.Label)], g.prototype, "nameLabel", void 0);
i([f(cc.Label)], g.prototype, "cntLabel", void 0);
i([f(cc.Label)], g.prototype, "introLabel", void 0);
i([f(cc.Sprite)], g.prototype, "sprite", void 0);
i([f(a.default)], g.prototype, "useBtn", void 0);
i([f(a.default)], g.prototype, "dropBtn", void 0);
g = i([m], g);
exports.default = g;