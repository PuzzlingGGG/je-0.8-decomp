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
const a = e("../../../CustomUI/ScrollList"),
  s = e("../../../Frame/SceneManager"),
  r = e("../../../Game/Player/GameIconMng"),
  l = e("../../../Game/Player/RcmdMng"),
  c = e("../../../TGA"),
  {
    ccclass: d,
    property: h
  } = cc._decorator;
let p = class extends cc.Component {
  constructor() {
    super(...arguments);
    this.nameLabel = null;
    this.sprite = null;
    this.data = null;
  }
  onLoad() {
    this.node.on(a.default.SET_DATA, this.setData, this);
  }
  setData(e) {
    return n(this, void 0, void 0, function* () {
      this.data = e;
      l.default.Ins.gameShow(e.id, "banner");
      this.nameLabel.string = e.name;
      yield r.GameIconMng.Ins.setSprite(this.sprite, e.iconTextureName, 680);
    });
  }
  onClick() {
    return n(this, void 0, void 0, function* () {
      s.default.ins.Enter("GameCoverScene", e => {
        e.setData(this.data.id);
      });
      c.TGA.track("clickGameCell", {
        gameId: this.data.id,
        from: "Banner"
      });
    });
  }
};
i([h(cc.Label)], p.prototype, "nameLabel", void 0);
i([h(cc.Sprite)], p.prototype, "sprite", void 0);
p = i([d], p);
exports.default = p;