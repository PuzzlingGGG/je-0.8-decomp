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
  c = e("../../Game/Player/FollowMng"),
  {
    ccclass: d,
    property: h
  } = cc._decorator;
let p = class extends cc.Component {
  constructor() {
    super(...arguments);
    this.nameLabel = null;
    this.headIcon = null;
    this.followBtn = null;
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
        this.info = e;
        this.nameLabel.string = e.userName;
        this.headIcon.loadUrl(e.userImg);
        this.headIcon.setLevel(e.level);
        this.followBtn.label.string = e.isFollow ? "已关注" : "关注";
      }
    });
  }
  onFollowBtn() {
    return n(this, void 0, void 0, function* () {
      if (this.info) if (this.info.isFollow) {
        if (1 == (yield c.FollowMng.Ins.unFollow(this.info.playerId))) {
          this.info.isFollow = !1;
          this.followBtn.label.string = "关注";
        }
      } else if (1 == (yield c.FollowMng.Ins.follow(this.info.playerId))) {
        this.info.isFollow = !0;
        this.followBtn.label.string = "已关注";
      }
    });
  }
  enterFriendScene() {
    this.info && l.default.ins.Enter("FriendScene", e => {
      e.setData(this.info.playerId);
    }, l.ShiftAnima.moveLeftShift);
  }
};
i([h(cc.Label)], p.prototype, "nameLabel", void 0);
i([h(s.default)], p.prototype, "headIcon", void 0);
i([h(a.default)], p.prototype, "followBtn", void 0);
p = i([d], p);
exports.default = p;