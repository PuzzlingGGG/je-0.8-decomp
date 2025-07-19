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
  l = e("../../Game/Player/GameIconMng"),
  c = e("../../Scene/GameCoverScene/GameCoverScene"),
  {
    ccclass: d,
    property: h
  } = cc._decorator;
let p = class extends s.default {
  constructor() {
    super(...arguments);
    this.gameNameLabel = null;
    this.titleLabel = null;
    this.sprite = null;
    this.okBtn = null;
    this.data = null;
  }
  onLoad() {
    super.onLoad();
    this.okBtn.node.on(a.default.CLICK, this.onOkBtn, this);
  }
  setData(e, t) {
    return n(this, void 0, void 0, function* () {
      this.titleLabel.string = e;
      this.data = t;
      this.gameNameLabel.string = `《${t.name}》`;
      l.GameIconMng.Ins.setSprite(this.sprite, t.iconTextureName, 300);
    });
  }
  onOkBtn() {
    this.closePanel();
    let e = this.data.id,
      t = r.default.ins.findScene(c.default);
    t ? t.setData(e) : r.default.ins.Enter("GameCoverScene", t => {
      t.setData(e);
    });
  }
};
i([h(cc.Label)], p.prototype, "gameNameLabel", void 0);
i([h(cc.Label)], p.prototype, "titleLabel", void 0);
i([h(cc.Sprite)], p.prototype, "sprite", void 0);
i([h(a.default)], p.prototype, "okBtn", void 0);
p = i([d], p);
exports.default = p;