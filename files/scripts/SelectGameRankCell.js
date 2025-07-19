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
const a = e("../../../scripts/_autogen/data/data"),
  s = e("../../CustomUI/Button"),
  r = e("../../CustomUI/ScrollList"),
  l = e("../../Frame/SceneManager"),
  c = e("../../Frame/Top"),
  d = e("../../Frame/UIColor"),
  h = e("../../Game/Player/GameRankMng"),
  p = e("../../Game/Player/Mng"),
  u = e("../../Scene/EditWorldScene/EditWorldScene"),
  {
    ccclass: m,
    property: f
  } = cc._decorator;
let g = class extends cc.Component {
  constructor() {
    super(...arguments);
    this.normalNode = null;
    this.nameLabel = null;
    this.typeLabel = null;
    this.deleteBtn = null;
    this.createNode = null;
    this.data = null;
  }
  onLoad() {
    this.node.on(r.default.SET_DATA, this.setData, this);
    this.node.on(r.default.ITEM_STATE_CHANGE, this.onStateChange, this);
    this.deleteBtn.node.on(s.default.CLICK, this.onDeleteBtn, this);
  }
  setData(e) {
    return n(this, void 0, void 0, function* () {
      this.data = e;
      this.normalNode.active = !1;
      this.createNode.active = !1;
      if (e) {
        this.normalNode.active = !0;
        let t = "";
        switch (e.cycleType) {
          case a.GameRankCycleType.day:
            t = "Daily rank";
            break;
          case a.GameRankCycleType.week:
            t = "Weekly rank";
            break;
          case a.GameRankCycleType.month:
            t = "Monthly rank";
            break;
          case a.GameRankCycleType.forever:
            t = "Forever";
        }
        this.nameLabel.string = `${e.name}·${t}`;
        switch (e.rankType) {
          case h.GameRankType.ShortTime:
            this.typeLabel.string = "用时最短榜";
            break;
          case h.GameRankType.LongTime:
            this.typeLabel.string = "活得最久榜";
            break;
          case h.GameRankType.PropRank:
            {
              let t = yield p.Mng.Ins.propMng.loadOne(e.propId);
              this.typeLabel.string = `道具榜（${(null == t ? void 0 : t.name) || "道具丢失"}）`;
              break;
            }
          case h.GameRankType.CustomRank:
            {
              let t = yield p.Mng.Ins.variableMng.loadOne(e.variableId),
                o = e.sortType == a.GameRankSortType.asc ? "升序" : "降序";
              this.typeLabel.string = `变量榜（${(null == t ? void 0 : t.name) || "变量丢失"}-${o}）`;
              break;
            }
        }
      } else this.createNode.active = !0;
    });
  }
  onDeleteBtn() {
    l.default.ins.OpenPanelByName("MessageBox", e => {
      e.label.string = "是否删除该排行榜？";
      e.setLeftBtn({
        text: "删除",
        color: d.UIColor.pink,
        call: () => n(this, void 0, void 0, function* () {
          let e = l.default.ins.findScene(u.default).gameData;
          yield p.Mng.Ins.gameRankMng.delete(this.data, e);
          cc.game.emit("refreshGameRankList");
          c.default.showToast("已删除");
        })
      });
      e.setRightBtn({
        text: "点错了",
        color: d.UIColor.blue
      });
    });
  }
  onStateChange(e) {
    this.node.color = e && this.data ? d.UIColor.blue : cc.Color.WHITE;
  }
};
i([f(cc.Node)], g.prototype, "normalNode", void 0);
i([f(cc.Label)], g.prototype, "nameLabel", void 0);
i([f(cc.Label)], g.prototype, "typeLabel", void 0);
i([f(s.default)], g.prototype, "deleteBtn", void 0);
i([f(cc.Node)], g.prototype, "createNode", void 0);
g = i([m], g);
exports.default = g;