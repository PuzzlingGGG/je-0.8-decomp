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
const a = e("../../Frame/Util"),
  s = e("../Player/Mng"),
  r = e("../Player/SpriteMng"),
  l = e("./Tile"),
  c = e("./WorldNodeBody"),
  {
    ccclass: d,
    property: h
  } = cc._decorator;
let p = class extends c.default {
  constructor() {
    super(...arguments);
    this.sprite = null;
    this.conf = null;
    this.data = null;
    this.rotateAngles = [];
  }
  initInspector(e) {
    throw new Error("Method not implemented.");
  }
  get dataId() {
    return this.data.id;
  }
  onLoad() {
    super.onLoad();
    this.sprite && cc.game.on(r.default.UPDATE_SPRITE, this.onPixelsUpdate, this);
  }
  get width() {
    return this.sprite ? this.sprite.node.width * Math.abs(this.node.scaleX) : this.node.width * Math.abs(this.node.scaleX);
  }
  get height() {
    return this.sprite ? this.sprite.node.height * Math.abs(this.node.scaleY) : this.node.height * Math.abs(this.node.scaleY);
  }
  onDestroy() {
    this.sprite && cc.game.off(r.default.UPDATE_SPRITE, this.onPixelsUpdate, this);
  }
  onPixelsUpdate(e, t) {
    return n(this, void 0, void 0, function* () {
      this.conf && this.conf.id == e && this.sprite && s.Mng.Ins.spriteMng.setDeviceSprite(this.sprite, t, 64);
    });
  }
  setCutting(e) {
    this.sprite && (this.sprite.enabled = !e);
  }
  setProperty(e, t, o, i, n) {
    let a = typeof this.data[e];
    if ("boolean" == a) {
      let o = "true" == t || "1" == t;
      this.data[e] = o;
      "isShow" == e && (this.node.active = o);
    } else if ("number" == a) {
      let a = parseFloat(t);
      Number.isNaN(a) && (a = 0);
      o && (a *= -1);
      n && (a *= l.default.SIZE);
      (i || o) && (a += this.data[e]);
      this.data[e] = a;
      "scale" == e && (this.node.scale = a);
    } else "string" == a ? this.data[e] = t : console.error(`>>not support device property[${e}] type[${a}]`);
  }
  setData(e, t) {
    this.world.isGameScene && (e = a.Util.deepCopy(e));
    this.data = e;
    this.data.isShow = this.data.isShow || !0;
    this.node.active = this.data.isShow;
    this.conf = t;
    if (this.rotateAngles.length > 0) {
      let e = this.data.rotateIdx || 0;
      this.node.angle = this.rotateAngles[e];
    }
  }
  applyConf(e) {
    this.conf = e;
  }
  isHeroActor(e) {
    return this.world.isHeroActor(e.node);
  }
};
i([h(cc.Sprite)], p.prototype, "sprite", void 0);
i([h({
  displayName: "rotateAngles",
  type: [cc.Integer]
})], p.prototype, "rotateAngles", void 0);
p = i([d], p);
exports.default = p;