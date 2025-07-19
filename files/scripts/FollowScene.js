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
const a = e("../../CustomUI/Button"),
  s = e("../../CustomUI/ScrollList"),
  r = e("../../CustomUI/ToggleGroup"),
  l = e("../../Frame/Scene"),
  c = e("../../Frame/SceneManager"),
  d = e("../../Frame/Util"),
  h = e("../../Game/OperationFlow"),
  p = e("../../Game/Player/DynamicMng"),
  u = e("../../Game/Player/FollowMng"),
  m = e("../../Game/Player/PlayerDetailMng"),
  f = e("../../Role"),
  {
    ccclass: g,
    property: y
  } = cc._decorator;
let v = class extends l.default {
  constructor() {
    super(...arguments);
    this.backBtn = null;
    this.nameLabel = null;
    this.toggleGroup = null;
    this.followList = null;
    this.fansList = null;
    this.emptyLabel = null;
    this.backCall = null;
    this.playerId = -1;
    this.countPreLoad = 10;
  }
  onLoad() {
    this.backBtn.node.on(a.default.CLICK, this.onBackBtn, this);
    this.toggleGroup.node.on(r.default.TOGGLE_CHANGE, this.onToggleChange, this);
    this.emptyLabel.node.active = !1;
    d.Util.updateAllWidget(this.node);
  }
  onShow(e) {
    h.OperationFlow.deelOnShow(e);
  }
  init(e, t) {
    return n(this, void 0, void 0, function* () {
      if (t == f.default.Ins.role.uId) {
        this.playerId = f.default.Ins.role.uId;
        this.nameLabel.string = f.default.Ins.userName;
      } else {
        this.playerId = t;
        let e = yield m.default.Ins.load(t);
        this.nameLabel.string = d.Util.clampStr(e.userName, 6, "..");
      }
      u.FollowMng.Ins.playerId = this.playerId;
      if ("follow" == e) {
        this.toggleGroup.selectIdx(0);
        this.onToggleChange(0, -1, !0);
      } else "fans" == e ? this.toggleGroup.selectIdx(1) : cc.error("FollowScene Open Failed: #Which# Not In Range");
    });
  }
  onBackBtn() {
    u.FollowMng.Ins.playerId = -1;
    c.default.ins.Back(() => {
      this.backCall && this.backCall();
    }, c.ShiftAnima.moveRightShift);
  }
  onToggleChange(e, t, o) {
    return n(this, void 0, void 0, function* () {
      if (o) {
        u.FollowMng.Ins.playerId = this.playerId;
        this.followList.node.active = !1;
        this.fansList.node.active = !1;
        if (0 == e) {
          this.followList.node.active = !0;
          let e = yield u.FollowMng.Ins.loadInfos(yield u.FollowMng.Ins.getFollowIds());
          p.DynamicMng.Ins.isInspectVersion() && (e = []);
          this.followList.setDataArr(e);
          this.emptyLabel.node.active = 0 == e.length;
          this.emptyLabel.string = "暂无关注数据";
        }
        if (1 == e) {
          this.fansList.node.active = !0;
          let e = u.FollowMng.Ins.getFansIds();
          e.length < this.countPreLoad && (e = yield u.FollowMng.Ins.appendOtherLoadFansIds());
          let t = yield u.FollowMng.Ins.loadInfos(e);
          this.fansList.setDataArr(t);
          this.emptyLabel.node.active = 0 == t.length;
          this.emptyLabel.string = "暂无粉丝数据";
        }
      }
    });
  }
  onScrollFansEvt(e, t, o) {
    return n(this, void 0, void 0, function* () {
      if (t != cc.ScrollView.EventType.BOUNCE_BOTTOM) return;
      let e = yield u.FollowMng.Ins.appendOtherLoadFansIds(),
        o = yield u.FollowMng.Ins.loadInfos(e);
      this.fansList.setDataArr(o);
    });
  }
};
i([y(a.default)], v.prototype, "backBtn", void 0);
i([y(cc.Label)], v.prototype, "nameLabel", void 0);
i([y(r.default)], v.prototype, "toggleGroup", void 0);
i([y(s.default)], v.prototype, "followList", void 0);
i([y(s.default)], v.prototype, "fansList", void 0);
i([y(cc.Label)], v.prototype, "emptyLabel", void 0);
i([y], v.prototype, "countPreLoad", void 0);
v = i([g], v);
exports.default = v;