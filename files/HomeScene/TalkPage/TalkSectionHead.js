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
const a = e("../../../CustomUI/Button"),
  s = e("../../../CustomUI/HeadIcon"),
  r = e("../../../CustomUI/ScrollList"),
  l = e("../../../Frame/SceneManager"),
  c = e("../../../Game/Player/FollowMng"),
  d = e("../../../Role"),
  {
    ccclass: h,
    property: p
  } = cc._decorator;
let u = class extends cc.Component {
  constructor() {
    super(...arguments);
    this.headIcon = null;
    this.nameLabel = null;
    this.followLabel = null;
    this.fansLabel = null;
    this.followBtn = null;
    this.data = null;
  }
  onLoad() {
    this.node.on(r.default.SET_DATA, this.setData, this);
    this.headIcon.node.on(a.default.CLICK, this.enterFriendScene, this);
    this.followBtn.node.on(a.default.CLICK, this.onFollowBtn, this);
  }
  setData(e) {
    return n(this, void 0, void 0, function* () {
      this.data = e;
      this.headIcon.loadUrl(e.userImg);
      this.nameLabel.string = e.userName;
      this.followLabel.string = e.player.followCount + "";
      this.fansLabel.string = e.player.fansCount + "";
      this.followBtn.label.string = e.player.isFollow ? "已关注" : "关注";
      this.followBtn.node.active = e.player.playerId != d.default.Ins.role.id;
    });
  }
  onFollowBtn() {
    return n(this, void 0, void 0, function* () {
      if (this.data) if (this.data.player.isFollow) {
        if (1 == (yield c.FollowMng.Ins.unFollow(this.data.player.playerId))) {
          this.data.player.isFollow = !1;
          this.followBtn.label.string = "关注";
        }
      } else if (1 == (yield c.FollowMng.Ins.follow(this.data.player.playerId))) {
        this.data.player.isFollow = !0;
        this.followBtn.label.string = "已关注";
      }
    });
  }
  enterFriendScene() {
    this.data && l.default.ins.Enter("FriendScene", e => {
      e.setData(this.data.player.playerId);
    }, l.ShiftAnima.moveLeftShift);
  }
};
i([p(s.default)], u.prototype, "headIcon", void 0);
i([p(cc.Label)], u.prototype, "nameLabel", void 0);
i([p(cc.Label)], u.prototype, "followLabel", void 0);
i([p(cc.Label)], u.prototype, "fansLabel", void 0);
i([p(a.default)], u.prototype, "followBtn", void 0);
u = i([h], u);
exports.default = u;