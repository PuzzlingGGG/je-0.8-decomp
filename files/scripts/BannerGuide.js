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
const a = e("../../i18n/i18nMgr"),
  s = e("../Frame/Util"),
  r = e("./Player/Mng"),
  {
    ccclass: l,
    property: c
  } = cc._decorator;
let d = class extends cc.Component {
  constructor() {
    super(...arguments);
    this.label = null;
    this.sprite = null;
    this.ani = null;
    this.spriteInitialPos = cc.Vec2.ZERO;
  }
  onLoad() {
    this.spriteInitialPos = this.sprite.node.position;
  }
  guideMove() {
    this.ani.play("GestureMove");
  }
  guideZoomMax() {
    this.ani.play("GestureZoomMax");
  }
  guideZoomMin() {
    this.ani.play("GestureZoomMin");
  }
  guidePencil(e) {
    return n(this, void 0, void 0, function* () {
      this.ani.stop();
      this.sprite.node.setPosition(this.spriteInitialPos);
      this.label.string = a.I18nMgr.exceI18nStringByZh("切换到铅笔工具\n并放置${cnt}个地块", [{
        paramName: "cnt",
        param: e
      }]);
      this.sprite.spriteFrame = yield s.Util.loadBundleRes("Atlas/Paint/pencil", cc.SpriteFrame);
    });
  }
  guideErase(e) {
    return n(this, void 0, void 0, function* () {
      this.ani.stop();
      this.sprite.node.setPosition(this.spriteInitialPos);
      this.label.string = a.I18nMgr.exceI18nStringByZh("切换到橡皮工具\n并擦除${cnt}个地块", [{
        paramName: "cnt",
        param: e
      }]);
      this.sprite.spriteFrame = yield s.Util.loadBundleRes("Atlas/Paint/eraser", cc.SpriteFrame);
    });
  }
  guidePutCustomTile(e, t) {
    return n(this, void 0, void 0, function* () {
      this.ani.stop();
      this.sprite.node.setPosition(this.spriteInitialPos);
      this.label.string = a.I18nMgr.exceI18nStringByZh("切换到铅笔工具，然后放置${cnt}个你刚刚画的地块", [{
        paramName: "cnt",
        param: t
      }]);
      r.Mng.Ins.spriteMng.setSprite(this.sprite, e, 100);
    });
  }
  guidePutCustomProp(e, t, o) {
    return n(this, void 0, void 0, function* () {
      this.ani.stop();
      this.sprite.node.setPosition(this.spriteInitialPos);
      this.label.string = a.I18nMgr.exceI18nStringByZh("放置${cnt}个${name}", [{
        paramName: "cnt",
        param: o
      }, {
        paramName: "name",
        param: a.I18nMgr.getI18nStringByZh(e)
      }]);
      r.Mng.Ins.spriteMng.setSprite(this.sprite, t, 100);
    });
  }
  guidePlaceActor() {
    return n(this, void 0, void 0, function* () {
      this.ani.stop();
      this.sprite.node.setPosition(this.spriteInitialPos);
      this.label.string = "拖动史莱姆，把它放到地面上，然后点‘对勾’按钮";
      let e = yield r.Mng.Ins.actorMng.loadOne("1002");
      r.Mng.Ins.spriteMng.setActorSprite(this.sprite, e.textureName, 100);
    });
  }
  guidePlaceDevice(e, t) {
    return n(this, void 0, void 0, function* () {
      this.ani.stop();
      this.sprite.node.setPosition(this.spriteInitialPos);
      this.label.string = a.I18nMgr.exceI18nStringByZh("拖动${name}，摆放到合适的位置", [{
        paramName: "name",
        param: a.I18nMgr.getI18nStringByZh(e)
      }]);
      r.Mng.Ins.spriteMng.setDeviceSprite(this.sprite, t, 100);
    });
  }
  guideText(e) {
    return n(this, void 0, void 0, function* () {
      this.ani.stop();
      this.label.string = e;
      this.label.node.x = 0;
      this.sprite.node.active = !1;
    });
  }
};
i([c(cc.Label)], d.prototype, "label", void 0);
i([c(cc.Sprite)], d.prototype, "sprite", void 0);
i([c(cc.Animation)], d.prototype, "ani", void 0);
d = i([l], d);
exports.default = d;