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
  s = e("../../CustomUI/Toggle"),
  r = e("../../CustomUI/ToggleGroup"),
  l = e("../../Frame/CrossPlatform"),
  c = e("../../Frame/Util"),
  d = e("../../Game/GameEnv"),
  h = e("../../Game/Player/DynamicMng"),
  {
    ccclass: p,
    property: u
  } = cc._decorator;
let m = class extends cc.Component {
  constructor() {
    super(...arguments);
    this.toggle = null;
    this.toggleGroup = null;
    this.scrollView = null;
    this.top = null;
    this.content = null;
    this.pageMap = new Map();
    this.datas = [];
    this.promiseCache = new Map();
  }
  onLoad() {
    this.toggleGroup.node.on(r.default.TOGGLE_CHANGE, this.onToggleChange, this);
    h.DynamicMng.Ins.isDisable(h.FunctionEnum.DiscoverPage, !1) || l.wx && d.gameEnv.isWxReviewCity ? this.datas = [{
      name: "精选",
      prefab: "ChosenSubPage"
    }, {
      name: "关注",
      prefab: "FollowGamesSubPage"
    }] : this.datas = [{
      name: "发现",
      prefab: "DiscoverSubPage"
    }, {
      name: "精选",
      prefab: "ChosenSubPage"
    }, {
      name: "新游",
      prefab: "FreshSubPage"
    }, {
      name: "关注",
      prefab: "FollowGamesSubPage"
    }];
    c.Util.makeBro(this.toggle.node, this.datas.length, (e, t) => {
      let o = e.getComponent(s.default),
        i = this.datas[t];
      o.label.string = a.I18nMgr.getI18nStringByZh(i.name);
      c.Util.updateLabel(o.label);
      o.node.width = o.label.node.width + 40;
      c.Util.updateAllWidget(o.node);
    });
  }
  onToggleChange(e, t, o) {
    return n(this, void 0, void 0, function* () {
      this.pageMap.forEach(e => {
        e.active = !1;
      });
      let t = this.datas[e].prefab,
        o = this.pageMap.get(t);
      if (!o) {
        let i = this.promiseCache.get(t);
        if (!i) {
          i = c.Util.loadBundleRes("Scene/HomeScene/DiscoverPage/" + t);
          this.promiseCache.set(t, i);
        }
        let n = yield i;
        if (e !== this.toggleGroup.idx) return;
        if (!(o = this.pageMap.get(t))) {
          o = cc.instantiate(n);
          this.content.addChild(o);
          this.pageMap.set(t, o);
        }
      }
      exports.active = !0;
      let i = this.toggleGroup.toggleItems[e],
        n = this.scrollView.node.width,
        a = this.scrollView.content.width,
        s = (i.node.x - n / 2) / (a - n);
      this.scrollView.scrollToPercentHorizontal(s, .3);
    });
  }
  selectPage(e) {
    this.toggleGroup.selectIdx(e);
  }
};
i([u(s.default)], m.prototype, "toggle", void 0);
i([u(r.default)], m.prototype, "toggleGroup", void 0);
i([u(cc.ScrollView)], m.prototype, "scrollView", void 0);
i([u(cc.Node)], m.prototype, "top", void 0);
i([u(cc.Node)], m.prototype, "content", void 0);
m = i([p], m);
exports.default = m;