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
exports.GameTagFlowData = void 0;
const a = e("../../../i18n/i18nMgr"),
  s = e("../../CustomUI/Button"),
  r = e("../../CustomUI/ScrollList"),
  l = e("../../Frame/SceneManager"),
  c = e("../../Frame/Top"),
  d = e("../../Frame/UIColor"),
  h = e("../../Frame/Util"),
  p = e("../../Game/Player/DynamicMng"),
  u = e("../../Game/Player/GameTagMng"),
  m = e("../../Role"),
  f = e("./GameCoverScene"),
  {
    ccclass: g,
    property: y
  } = cc._decorator;
exports.GameTagFlowData = class {};
let v = class extends cc.Component {
  constructor() {
    super(...arguments);
    this.tag = null;
    this.data = null;
    this.limitLevel = 10;
    this.limitMinCount = 10;
  }
  onLoad() {
    this.node.on(r.default.SET_DATA, this.setData, this);
  }
  setData(e) {
    this.data = e;
    let t = e.tagList.concat();
    (t = t.filter(e => e.recommendTimes >= this.limitMinCount)).push(null);
    h.Util.makeBro(this.tag.node, t.length, (e, o) => {
      let i = e.getComponent(s.default),
        n = t[o];
      this.initBtn(i, n);
    });
    h.Util.flowLayout(this.tag.node.parent, 10, 10);
  }
  initBtn(e, t) {
    e.label.string = t ? t.tagMsg : " + ";
    h.Util.updateLabel(e.label);
    e.node.width = e.label.node.width + 20;
    e.node.targetOff(this);
    let o = 0;
    e.node.on(cc.Node.EventType.TOUCH_START, () => {
      o = h.Util.getTimeStamp();
    }, this);
    e.node.on(cc.Node.EventType.TOUCH_END, () => {
      p.DynamicMng.Ins.isDisable(p.FunctionEnum.PublishGameTag, !1) || (t ? h.Util.getTimeStamp() - o > 500 && (p.DynamicMng.Ins.isGmPlayer() || m.default.Ins.role.id == this.data.roleId) ? l.default.ins.OpenPanelByName("MessageBox", e => {
        e.label.string = "是否删除标签？";
        e.setLeftBtn({
          text: "删除",
          color: d.UIColor.pink,
          call: () => n(this, void 0, void 0, function* () {
            yield u.default.Ins.gmSetTagCnt(this.data.gameId, t.tagMsg, 0);
            cc.game.emit(f.default.GameCoverScene_Refresh);
          })
        });
        e.setRightBtn({
          text: "点错了",
          color: d.UIColor.blue
        });
      }) : l.default.ins.Enter("GameTagScene", e => {
        e.setData(t.tagMsg);
      }, l.ShiftAnima.moveLeftShift) : m.default.Ins.role.level >= this.limitLevel ? l.default.ins.OpenPanelByName("AddGameTagPanel", e => {
        e.setData(this.data);
        e.setTip(this.limitMinCount);
      }) : c.default.showToast(a.I18nMgr.exceI18nStringByZh("等级${this.limitLevel}后解锁加标签功能", [{
        paramName: "this.limitLevel",
        param: this.limitLevel
      }])));
    }, this);
  }
  calcuHeight(e) {
    this.setData(e);
    return this.node.height;
  }
};
i([y(s.default)], v.prototype, "tag", void 0);
v = i([g], v);
exports.default = v;