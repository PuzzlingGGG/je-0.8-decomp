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
  s = e("../../../Frame/CrossPlatform"),
  r = e("../../../Frame/Util"),
  l = e("../../../Game/Player/DynamicMng"),
  c = e("../../../Game/Player/GameCellDataMng"),
  {
    ccclass: d,
    property: h
  } = cc._decorator;
let p = class extends cc.Component {
  constructor() {
    super(...arguments);
    this.list = null;
  }
  onLoad() {
    return n(this, void 0, void 0, function* () {
      this.list.getPrefabName = e => e.prefabName;
      cc.game.on("refreshChosenSubPage", this.refresh, this);
    });
  }
  onDestroy() {
    cc.game.off("refreshChosenSubPage", this.refresh, this);
  }
  start() {
    this.refresh();
  }
  refresh() {
    return n(this, void 0, void 0, function* () {
      let e = [];
      s.tt && s.AppName.Douyin == s.systemInfo.appName && s.crossPlatform.openAwemeUserProfile && r.Util.compareVersion(s.systemInfo.SDKVersion, "1.84.0") >= 0 && e.push({
        prefabName: "FollowBanner"
      });
      let t = (yield l.DynamicMng.Ins.loadOne("GameChosenIds")) || [];
      if (s.wx) {
        let e = (yield l.DynamicMng.Ins.loadOne("IpGameIds")) || [];
        t = t.filter(t => !e.includes(t));
      }
      l.DynamicMng.Ins.isInspectVersion() && (t = l.DynamicMng.Ins.inspectGameIds);
      let o = yield c.default.Ins.loadGames(t);
      for (let t = 0; t < o.length; t += 2) e.push({
        prefabName: "ChosenRowComp",
        games: [o[t], o[t + 1]]
      });
      this.list.setDataArr(e);
    });
  }
};
i([h(a.default)], p.prototype, "list", void 0);
p = i([d], p);
exports.default = p;