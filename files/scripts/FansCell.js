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
  s = e("../../CustomUI/HeadIcon"),
  r = e("../../CustomUI/ScrollList"),
  l = e("../../Frame/SceneManager"),
  c = e("../../Frame/Util"),
  d = e("../../Game/Player/FollowMng"),
  {
    ccclass: h,
    property: p
  } = cc._decorator;
let u = class extends cc.Component {
  constructor() {
    super(...arguments);
    this.nameLabel = null;
    this.introLabel = null;
    this.headIcon = null;
    this.followBtn = null;
    this.dot = null;
    this.info = null;
  }
  onLoad() {
    this.node.on(r.default.SET_DATA, this.setData, this);
    this.followBtn.node.on(a.default.CLICK, this.onFollowBtn, this);
    this.node.on(a.default.CLICK, this.enterFriendScene, this);
  }
  setData(e) {
    return n(this, void 0, void 0, function* () {
      if (e) {
        d.FollowMng.Ins.isSelf() || (this.followBtn.node.active = !1);
        this.info = e;
        this.nameLabel.string = e.userName;
        this.introLabel && (this.introLabel.string = c.Util.clampStr(e.userIntro, 12, ".."));
        this.headIcon.loadUrl(e.userImg);
        this.headIcon.setLevel(e.level);
        this.followBtn.label.string = e.isFollow ? "互相关注" : "回关";
        this.dot && (this.dot.active = e.isNew);
      }
    });
  }
  onFollowBtn() {
    return n(this, void 0, void 0, function* () {
      if (this.info) if (this.info.isFollow) {
        if (1 == (yield d.FollowMng.Ins.unFollow(this.info.playerId))) {
          this.info.isFollow = !1;
          this.followBtn.label.string = "回关";
        }
      } else if (1 == (yield d.FollowMng.Ins.follow(this.info.playerId))) {
        this.info.isFollow = !0;
        this.followBtn.label.string = "互相关注";
      }
    });
  }
  enterFriendScene() {
    if (this.info) {
      if (this.dot) {
        this.info.isNew = !1;
        this.dot.active = !1;
      }
      l.default.ins.Enter("FriendScene", e => {
        e.setData(this.info.playerId);
      }, l.ShiftAnima.moveLeftShift);
    }
  }
};
i([p(cc.Label)], u.prototype, "nameLabel", void 0);
i([p(cc.Label)], u.prototype, "introLabel", void 0);
i([p(s.default)], u.prototype, "headIcon", void 0);
i([p(a.default)], u.prototype, "followBtn", void 0);
i([p(cc.Node)], u.prototype, "dot", void 0);
u = i([h], u);
exports.default = u;