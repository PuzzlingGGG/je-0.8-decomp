"use strict";

var i = this && this.__awaiter || function (e, t, o, i) {
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
exports.AiComDirLineMover = void 0;
const n = e("../../../../Frame/TweenUtil"),
  a = e("../../../../Frame/Util"),
  s = e("../../../../GameData/GameTypeDefine"),
  r = e("../../Tile"),
  l = new cc.Vec2(),
  c = new cc.Vec2();
new cc.Vec2();
exports.AiComDirLineMover = class {
  constructor() {
    this._moveDir = new cc.Vec2();
    this._moveSpeed = 0;
    this._moveDistance = 0;
    this._moveStart = new cc.Vec2();
    this._moveTarget = new cc.Vec2();
    this._movet = 0;
    this._totalMoveTime = 0;
    this._moveCurrent = new cc.Vec2();
    this._useTween = !1;
  }
  onDestroy() {
    if (this._moveTween) {
      this._moveTween.stop();
      this._moveTween = null;
    }
  }
  setData(e, t, o = !1) {
    if (this._moveTween) {
      this._moveTween.stop();
      this._moveTween = null;
    }
    this._data = t;
    this._body = e;
    this._useTween = o;
    this.refresh();
  }
  refresh() {
    this._moveSpeed = this._data.speed * r.default.SIZE;
    this._moveDistance = this._data.distance * r.default.SIZE;
    this._moveDir.x = 0;
    this._moveDir.y = 0;
    switch (this._data.moveDir) {
      case s.MoveDirType.Up:
        this._moveDir.y = 1;
        break;
      case s.MoveDirType.UpLeft:
        this._moveDir.y = 1;
        this._moveDir.x = -1;
        break;
      case s.MoveDirType.UpRight:
        this._moveDir.y = 1;
        this._moveDir.x = 1;
        break;
      case s.MoveDirType.Down:
        this._moveDir.y = -1;
        break;
      case s.MoveDirType.DownLeft:
        this._moveDir.y = -1;
        this._moveDir.x = -1;
        break;
      case s.MoveDirType.DownRight:
        this._moveDir.y = -1;
        this._moveDir.x = 1;
        break;
      case s.MoveDirType.Left:
        this._moveDir.x = -1;
        break;
      case s.MoveDirType.Right:
        this._moveDir.x = 1;
    }
    this._moveStart.set(this._body.node.position);
    cc.Vec2.scaleAndAdd(this._moveTarget, this._moveStart, this._moveDir, this._moveDistance);
    this._movet = 0;
    this._totalMoveTime = this._moveDistance / this._moveSpeed;
    if (this._moveTween) {
      this._moveTween.stop();
      this._moveTween = null;
    }
    if (this._useTween) {
      this._moveTween = cc.tween(this._body).repeatForever(cc.tween(this._body).to(this._totalMoveTime, {
        Move2PositionX: this._moveTarget.x,
        Move2PositionY: this._moveTarget.y
      }, {
        easing: n.Easing.sineInOut
      }).delay(.2).to(this._totalMoveTime, {
        Move2PositionX: this._moveStart.x,
        Move2PositionY: this._moveStart.y
      }, {
        easing: n.Easing.sineInOut
      }).delay(.2));
      this._moveTween.start();
    }
  }
  static displayInspector(e, t) {
    let o = [{
        str: "上",
        type: s.MoveDirType.Up
      }, {
        str: "左上",
        type: s.MoveDirType.UpLeft
      }, {
        str: "右上",
        type: s.MoveDirType.UpRight
      }, {
        str: "下",
        type: s.MoveDirType.Down
      }, {
        str: "左下",
        type: s.MoveDirType.DownLeft
      }, {
        str: "右下",
        type: s.MoveDirType.DownRight
      }, {
        str: "左",
        type: s.MoveDirType.Left
      }, {
        str: "右",
        type: s.MoveDirType.Right
      }],
      n = o.findIndex(e => e.type == t.moveDir);
    -1 == n && (n = 0);
    e.addDropDownBox("移动方向", o, n, (e, o) => i(this, void 0, void 0, function* () {
      t.moveDir = o.type;
    }));
    e.addNumberEditBox("移动速度(格/秒)", t.speed, 0, 99, e => {
      t.speed = e;
    });
    e.addNumberEditBox("移动距离(格)", t.distance, 0, 64, e => {
      e = a.Util.clamp(e, 0, 64);
      t.distance = e;
    });
  }
  run(e) {
    this.updateState(e);
  }
  toggleMove() {
    l.set(this._moveStart);
    this._moveStart.set(this._moveTarget);
    this._moveTarget.set(l);
    this._movet = 0;
    this._totalMoveTime = this._moveDistance / this._moveSpeed;
  }
  updateState(e) {
    if (this._moveSpeed <= 0 || this._useTween) return;
    this._movet += e;
    let t = this._movet / this._totalMoveTime;
    t > 1 && (t = 1);
    let o = this._moveCurrent;
    o.set(this._body.targetPosition);
    cc.Vec2.lerp(c, this._moveStart, this._moveTarget, t);
    this._movet >= this._totalMoveTime && this.toggleMove();
    let i = c.x - o.x,
      n = c.y - o.y;
    this._body.PositionMoveDelta(i, n);
  }
};