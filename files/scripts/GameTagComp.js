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
const a = e("../../../../i18n/i18nMgr"),
  s = e("../../../CustomUI/Button"),
  r = e("../../../Frame/SceneManager"),
  l = e("../../../Frame/Util"),
  c = e("../../../Game/Player/DynamicMng"),
  {
    ccclass: d,
    property: h
  } = cc._decorator;
let p = class extends cc.Component {
  constructor() {
    super(...arguments);
    this.btn = null;
  }
  onLoad() {}
  setData(e) {
    return n(this, void 0, void 0, function* () {
      let e = (yield c.DynamicMng.Ins.loadOne("GameTags")) || [],
        t = e.slice(0, 10);
      e.length < 10 && (t = t.concat({
        tag: "更多",
        icon: "更多"
      }));
      l.Util.makeBro(this.btn.node, t.length, (e, o) => {
        let i = t[o],
          c = e.getComponent(s.default);
        c.node.targetOff(this);
        c.label.string = a.I18nMgr.getI18nStringByZh(i.tag);
        l.Util.loadBundleRes("Atlas/TagIcon/" + i.icon, cc.SpriteFrame).then(e => {
          c.background.spriteFrame = e;
        });
        c.node.on(s.default.CLICK, () => n(this, void 0, void 0, function* () {
          r.default.ins.Enter("GameTagScene", e => {
            let t = i.tag;
            "更多" == t && (t = "像素");
            e.setData(t);
          }, r.ShiftAnima.moveLeftShift);
        }), this);
      });
    });
  }
};
i([h(s.default)], p.prototype, "btn", void 0);
p = i([d], p);
exports.default = p;