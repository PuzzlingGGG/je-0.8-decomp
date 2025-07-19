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
const a = e("../../../scripts/_autogen/cmd/cmd"),
  s = e("../../CustomUI/Button"),
  r = e("../../Frame/NetworkMgr"),
  l = e("../../Frame/Panel"),
  c = e("../../Frame/SceneManager"),
  d = e("../../Frame/Top"),
  h = e("../../Frame/Util"),
  p = e("../../Game/Player/DynamicMng"),
  {
    ccclass: u,
    property: m
  } = cc._decorator;
let f = class extends l.default {
  constructor() {
    super(...arguments);
    this.btn = null;
  }
  onLoad() {
    const e = Object.create(null, {
      onLoad: {
        get: () => super.onLoad
      }
    });
    return n(this, void 0, void 0, function* () {
      e.onLoad.call(this);
      let t = (yield p.DynamicMng.Ins.loadOne("BugList")) || [];
      h.Util.makeBro(this.btn.node, t.length, (e, o) => {
        let i = t[o],
          a = e.getComponent(s.default);
        a.label.string = i;
        a.node.on(s.default.CLICK, () => {
          c.default.ins.OpenPanelByName("InputPanel", e => {
            e.titleLabel.string = "详细描述";
            e.minChar = 20;
            e.call = e => n(this, void 0, void 0, function* () {
              yield this.reportBug(i, e);
              this.closePanel();
              d.default.showToast("感谢您的反馈！");
            });
          });
        }, this);
      });
    });
  }
  reportBug(e, t) {
    return n(this, void 0, void 0, function* () {
      let o = {
        type: e,
        msg: t
      };
      yield r.NetIns.SendCmdAsync({
        cmd: a.CMDS.Game_ReportBugMsg,
        params: o
      }, a.Game_RReportBugMsg);
    });
  }
};
i([m(s.default)], f.prototype, "btn", void 0);
f = i([u], f);
exports.default = f;