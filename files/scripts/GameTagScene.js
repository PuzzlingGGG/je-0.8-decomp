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
  l = e("../../CustomUI/ToggleGroup"),
  c = e("../../Frame/Scene"),
  d = e("../../Frame/SceneManager"),
  h = e("../../Frame/Util"),
  p = e("../../Game/Player/DynamicMng"),
  u = e("../../Game/Player/GameTagMng"),
  {
    ccclass: m,
    property: f
  } = cc._decorator;
let g = class extends c.default {
  constructor() {
    super(...arguments);
    this.backBtn = null;
    this.toggleGroup = null;
    this.scrollView = null;
    this.scrollList = null;
    this.emptyLabel = null;
    this.tagConfs = [];
  }
  onLoad() {
    this.backBtn.node.on(s.default.CLICK, this.onBackBtn, this);
    this.toggleGroup.node.on(l.default.TOGGLE_CHANGE, this.onChange, this);
    this.emptyLabel.node.active = !1;
  }
  onBackBtn() {
    d.default.ins.Back(() => {}, d.ShiftAnima.moveRightShift);
  }
  setData(e) {
    return n(this, void 0, void 0, function* () {
      let t = this.toggleGroup.toggleItems[0],
        o = (yield p.DynamicMng.Ins.loadOne("GameTags")) || [];
      this.tagConfs = o.concat();
      let i = this.tagConfs.findIndex(t => t.tag == e);
      if (i < 0) {
        this.tagConfs.unshift({
          tag: e,
          icon: ""
        });
        i = 0;
      }
      h.Util.makeBro(t.node, this.tagConfs.length, (e, t) => {
        let o = e.getComponent(cc.Toggle),
          i = this.tagConfs[t],
          n = o.getComponentInChildren(cc.Label);
        n.string = a.I18nMgr.getI18nStringByZh(i.tag);
        h.Util.updateLabel(n);
        o.node.width = n.node.width + 40;
      });
      this.scheduleOnce(() => {
        this.toggleGroup.idx == i ? this.onChange(i, 0, !0) : this.toggleGroup.selectIdx(i);
      });
    });
  }
  onChange(e, t, o) {
    return n(this, void 0, void 0, function* () {
      if (o) {
        let t = this.toggleGroup.toggleItems[e],
          o = this.tagConfs[e],
          i = this.scrollView.node.width,
          n = this.scrollView.content.width,
          a = (t.node.x - i / 2) / (n - i);
        this.scrollView.scrollToPercentHorizontal(a, .3);
        let s = o.tag,
          r = yield u.default.Ins.getGames(s);
        if (0 == r.length) {
          yield u.default.Ins.appendLoadGame(s, 12);
          r = yield u.default.Ins.getGames(s);
        }
        this.scrollList.setDataArr(r);
        this.emptyLabel.node.active = 0 == r.length;
        this.scrollList.scrollToTop(.3);
      }
    });
  }
  onScrollEvt(e, t, o) {
    return n(this, void 0, void 0, function* () {
      e.getScrollOffset().y;
      switch (t) {
        case cc.ScrollView.EventType.BOUNCE_BOTTOM:
          let e = this.toggleGroup.idx,
            o = this.toggleGroup.toggleItems[e].getComponentInChildren(cc.Label).string;
          yield u.default.Ins.appendLoadGame(o, 12);
          let i = yield u.default.Ins.getGames(o);
          this.scrollList.setDataArr(i);
          break;
        case cc.ScrollView.EventType.SCROLLING:
      }
    });
  }
};
i([f(s.default)], g.prototype, "backBtn", void 0);
i([f(l.default)], g.prototype, "toggleGroup", void 0);
i([f(cc.ScrollView)], g.prototype, "scrollView", void 0);
i([f(r.default)], g.prototype, "scrollList", void 0);
i([f(cc.Label)], g.prototype, "emptyLabel", void 0);
g = i([m], g);
exports.default = g;