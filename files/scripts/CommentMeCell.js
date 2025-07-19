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
const a = e("../../../../scripts/_autogen/data/data"),
  s = e("../../../CustomUI/Button"),
  r = e("../../../CustomUI/HeadIcon"),
  l = e("../../../CustomUI/ScrollList"),
  c = e("../../../Frame/SceneManager"),
  d = e("../../../Frame/Util"),
  h = e("../../../Game/Player/GameIconMng"),
  p = e("../../../Game/Player/TalkMng"),
  u = e("../../../TGA"),
  {
    ccclass: m,
    property: f
  } = cc._decorator;
let g = class extends cc.Component {
  constructor() {
    super(...arguments);
    this.headIcon = null;
    this.nameLabel = null;
    this.commentLabel = null;
    this.dot = null;
    this.gameIcon = null;
    this.data = null;
  }
  onLoad() {
    this.node.on(l.default.SET_DATA, this.setData, this);
    this.headIcon.node.on(s.default.CLICK, this.enterFriendScene, this);
    this.nameLabel.node.on(s.default.CLICK, this.enterFriendScene, this);
    this.node.on(s.default.CLICK, this.onClick, this);
  }
  setData(e) {
    return n(this, void 0, void 0, function* () {
      this.data = e;
      let t = "";
      "string" == typeof e.content ? t = e.content : "object" == typeof e.content && (t = e.content.msg);
      e.reportCnt >= 5 && (t = "给大佬递茶！");
      this.commentLabel.string = d.Util.clampStr(t, 18, "..") + "      " + d.Util.parseDataString(e.stamp);
      this.headIcon.loadUrl(e.userImg);
      this.headIcon.setLevel(e.userLevel);
      this.nameLabel.string = e.userName;
      this.dot.active = e.isNew;
      if (e.type == a.CommentType.gameType) {
        this.gameIcon.node.active = !0;
        h.GameIconMng.Ins.setSprite(this.gameIcon, e.gameIcon, 120);
      } else e.type == a.CommentType.talkType && (this.gameIcon.node.active = !1);
    });
  }
  enterFriendScene() {
    if (this.data) {
      this.data.isNew = !1;
      this.dot.active = !1;
      c.default.ins.Enter("FriendScene", e => {
        e.setData(this.data.playerId);
      }, c.ShiftAnima.moveLeftShift);
    }
  }
  onClick() {
    this.data.isNew = !1;
    this.dot.active = !1;
    if (this.data.type == a.CommentType.gameType) {
      c.default.ins.Enter("GameCoverScene", e => {
        e.setData(this.data.id, this.data.commentId);
        e.backAnima = c.ShiftAnima.moveRightShift;
      }, c.ShiftAnima.moveLeftShift);
      u.TGA.track("clickGameCell", {
        gameId: this.data.id,
        from: "CommentMeCell"
      });
    } else if (this.data.type == a.CommentType.talkType) {
      p.default.Ins.detailMap.delete(this.data.id);
      c.default.ins.Enter("TalkScene", e => {
        e.setData(this.data.id, this.data.commentId);
      }, c.ShiftAnima.moveLeftShift);
    }
  }
};
i([f(r.default)], g.prototype, "headIcon", void 0);
i([f(cc.Label)], g.prototype, "nameLabel", void 0);
i([f(cc.Label)], g.prototype, "commentLabel", void 0);
i([f(cc.Node)], g.prototype, "dot", void 0);
i([f(cc.Sprite)], g.prototype, "gameIcon", void 0);
g = i([m], g);
exports.default = g;