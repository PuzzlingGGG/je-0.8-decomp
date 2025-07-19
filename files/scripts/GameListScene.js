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
const a = e("../../../i18n/i18nMgr"),
  s = e("../../CustomUI/Button"),
  r = e("../../CustomUI/ScrollList"),
  l = e("../../Frame/Scene"),
  c = e("../../Frame/SceneManager"),
  d = e("../../Frame/Top"),
  h = e("../HomeScene/GameCell"),
  {
    ccclass: p,
    property: u
  } = cc._decorator;
let m = class extends l.default {
  constructor() {
    super(...arguments);
    this.list = null;
    this.backBtn = null;
    this.titleLabel = null;
    this.data = null;
  }
  onLoad() {
    super.onLoad();
    this.backBtn.node.on(s.default.CLICK, this.onBackBtn, this);
  }
  onBackBtn() {
    c.default.ins.Back();
  }
  setData(e) {
    return n(this, void 0, void 0, function* () {
      this.data = e;
      this.titleLabel.string = a.I18nMgr.getI18nStringByZh(e.title);
      this.list.prefabs[0].getComponent(h.default).from = e.from;
      this.list.setDataArr(e.games);
    });
  }
  onScrollEvt(e, t) {
    return n(this, void 0, void 0, function* () {
      switch (t) {
        case cc.ScrollView.EventType.BOUNCE_BOTTOM:
          let e = yield this.data.appendFunc();
          if (e && e.length > 0) {
            for (let t = 0; t < e.length; t++) this.data.games.push(e[t]);
            this.list.setDataArr(this.data.games);
          } else d.default.showToast("没有了...");
      }
    });
  }
};
i([u(r.default)], m.prototype, "list", void 0);
i([u(s.default)], m.prototype, "backBtn", void 0);
i([u(cc.Label)], m.prototype, "titleLabel", void 0);
m = i([p], m);
exports.default = m;