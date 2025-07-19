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
  r = e("../../CustomUI/ScrollList"),
  l = e("../../Frame/NetworkMgr"),
  c = e("../../Frame/Scene"),
  d = e("../../Frame/SceneManager"),
  h = e("../../Frame/Util"),
  {
    ccclass: p,
    property: u
  } = cc._decorator;
let m = class extends c.default {
  constructor() {
    super(...arguments);
    this.list = null;
    this.backBtn = null;
    this.appendBtn = null;
    this.exportBtn = null;
    this.gameDatas = [];
  }
  onLoad() {
    super.onLoad();
    this.backBtn.node.on(s.default.CLICK, this.onBackBtn, this);
    this.appendBtn.node.on(s.default.CLICK, this.onAppendBtn, this);
    this.exportBtn.node.on(s.default.CLICK, this.onExportBtn, this);
  }
  onBackBtn() {
    d.default.ins.Back();
  }
  onAppendBtn() {
    return n(this, void 0, void 0, function* () {
      let e = {
          start: this.gameDatas.length,
          end: this.gameDatas.length + 1e3
        },
        t = yield l.NetIns.SendCmdAsync({
          cmd: a.CMDS.Game_GetPlayGameStatistics,
          params: e
        }, a.Game_RGetPlayGameStatistics);
      if (t) {
        for (let e = 0; e < t.gameDatas.length; e++) {
          let o = t.gameDatas[e];
          this.gameDatas.push(o);
        }
        for (let e = 0; e < this.gameDatas.length; e++) this.gameDatas[e].rank = e + 1;
        this.gameDatas.sort((e, t) => t.playCntStatistics - e.playCntStatistics);
        this.list.setDataArr(this.gameDatas);
        this.appendBtn.label.string = `追加（${this.gameDatas.length}）`;
      }
    });
  }
  onExportBtn() {
    let e = "";
    for (let t = 0; t < this.gameDatas.length; t++) {
      let o = this.gameDatas[t];
      e += `${o.name},${h.Util.fixedNum(o.playAveTime, 3)},${o.playCntStatistics},${h.Util.fixedNum(o.playAllCnt / o.playCntStatistics, 3)}\n`;
    }
    h.Util.downloadTxt("1.txt", e);
  }
};
i([u(r.default)], m.prototype, "list", void 0);
i([u(s.default)], m.prototype, "backBtn", void 0);
i([u(s.default)], m.prototype, "appendBtn", void 0);
i([u(s.default)], m.prototype, "exportBtn", void 0);
m = i([p], m);
exports.default = m;