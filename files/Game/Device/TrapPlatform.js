"use strict";

var i,
  n = this && this.__decorate || function (e, t, o, i) {
    var n,
      a = arguments.length,
      s = a < 3 ? t : null === i ? i = Object.getOwnPropertyDescriptor(t, o) : i;
    if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) s = Reflect.decorate(e, t, o, i);else for (var r = e.length - 1; r >= 0; r--) (n = e[r]) && (s = (a < 3 ? n(s) : a > 3 ? n(t, o, s) : n(t, o)) || s);
    return a > 3 && s && Object.defineProperty(t, o, s), s;
  };
const a = e("../../Frame/TweenUtil"),
  s = e("../../Frame/Util"),
  r = e("../../GameData/GameTypeDefine"),
  l = e("../PhyObj"),
  c = e("../Player/Mng"),
  d = e("./Platform"),
  {
    ccclass: h,
    property: p
  } = cc._decorator;
var u;
(function (e) {
  e[e.Wait = 0] = "Wait";
  e[e.Active = 1] = "Active";
  e[e.Spawning = 2] = "Spawning";
})(u || (u = {}));
let m = i = class extends d.Platform {
  constructor() {
    super(...arguments);
    this.platform = null;
    this.content = null;
    this._state = u.Wait;
    this._stateTimer = 0;
    this._contentPhyObj = null;
  }
  get width() {
    return this._boxCollider.size.width;
  }
  get height() {
    return this._boxCollider.size.height;
  }
  onLoad() {
    super.onLoad();
    s.Util.makeBro(this.platform, 0);
    this._contentPhyObj = this.content.getComponent(l.default);
    if (!this._contentPhyObj) {
      this._contentPhyObj = this.content.addComponent(l.default);
      this._contentPhyObj.needDestroy = !1;
    }
    this._contentDisposeTween = cc.tween().to(.1, {
      opacity: 0
    }).to(.1, {
      opacity: 255
    });
  }
  setCutting(e) {
    if (this.content) {
      let t = this.data.extra.cnt * this.data.extra.cnty;
      t > this.content.childrenCount && (t = this.content.childrenCount);
      for (let o = 0; o < t; ++o) this.content.children[o].active = !e;
    }
  }
  initCollider() {
    this._boxCollider = this.content.getComponent(cc.BoxCollider);
  }
  onActorOnPlatform(e) {
    let t = this.world;
    t && !t.playing || this._state == u.Wait && this.gotoState(u.Active);
  }
  onActorExistPlatform(e) {}
  update(e) {
    this.world.playing && this.updateState(e);
  }
  setData(e, t) {
    super.setData(e, t);
    (e = this.data).extra || (e.extra = {
      jitterTime: 1,
      respawnTime: 5,
      cnt: 3,
      cnty: 1
    });
    e.extra.cnty = e.extra.cnty || 1;
    this.refresh(e, t);
  }
  refresh(e, t) {
    let o = e.extra.cnt,
      i = e.extra.cnty;
    s.Util.makeBro(this.platform, o * i, (e, i) => {
      let n = i % o,
        a = Math.floor(i / o),
        s = cc.v2(64 * n, 64 * a);
      e.position = s;
      let r = e.getComponent(cc.Sprite);
      c.Mng.Ins.spriteMng.setDeviceSprite(r, t.textureName, 64);
    });
    let n = this._boxCollider.size;
    n.width = 64 * e.extra.cnt;
    n.height = 64 * e.extra.cnty;
    this._boxCollider.size = n;
    let a = this._boxCollider.offset;
    a.x = .5 * n.width - 32;
    a.y = .5 * n.height - 32;
    this._boxCollider.offset = a;
  }
  gotoState(e) {
    switch (e) {
      case u.Wait:
        this.content.position = cc.Vec2.ZERO;
        this.content.angle = 0;
        this.content.active = !0;
        this.content.opacity = 255;
        this.content.scale = 1;
        this._boxCollider.enabled = !0;
        cc.Tween.stopAllByTarget(this.content);
        break;
      case u.Active:
        this._stateTimer = 1e3 * this.data.extra.jitterTime + cc.director.getTotalTime();
        cc.tween(this.content).repeat(Math.floor(this.data.extra.jitterTime / .2), this._contentDisposeTween).call(() => {
          this._boxCollider.enabled = !1;
          let e = this.world;
          e.worldLayout.type == r.WorldType.Jump ? this._contentPhyObj.fly(s.Util.randomInt(-100, 100), s.Util.randomInt(200, 300), s.Util.randomInt(-300, 300)) : e.worldLayout.type == r.WorldType.Rpg && cc.tween(this.content).to(.7, {
            scale: 0
          }, {
            easing: a.Easing.quadIn
          }).to(1, {}).start();
          this._contentPhyObj.fadeOut();
        }).start();
        break;
      case u.Spawning:
        this._stateTimer = 1e3 * this.data.extra.respawnTime + cc.director.getTotalTime();
    }
    this._state = e;
  }
  updateState(e) {
    let t = cc.director.getTotalTime() >= this._stateTimer;
    switch (this._state) {
      case u.Wait:
        break;
      case u.Active:
        t && this.gotoState(u.Spawning);
        break;
      case u.Spawning:
        t && this.gotoState(u.Wait);
    }
  }
  initInspector(e) {
    i.initInspector(e, this.conf, this, this.data);
  }
  static initInspector(e, t, o = null, i = null) {
    let n = i || t;
    n.extra = n.extra || {
      jitterTime: 1,
      respawnTime: 5,
      cnt: 3,
      cnty: 1
    };
    o && e.addHead(t.name, t.textureName);
    e.addNumberEditBox("抖动时间(秒)", n.extra.jitterTime, -999999, 999999, e => {
      n.extra.jitterTime = e;
    });
    e.addNumberEditBox("重生时间(秒)", n.extra.respawnTime, -999999, 999999, e => {
      n.extra.respawnTime = e;
    });
    e.addNumberEditBox("横向个数", n.extra.cnt, 1, 64, e => {
      n.extra.cnt = e;
      o && o.refresh(i, t);
    });
    e.addNumberEditBox("纵向个数", n.extra.cnty, 1, 64, e => {
      n.extra.cnty = e;
      o && o.refresh(i, t);
    });
  }
};
n([p(cc.Node)], m.prototype, "platform", void 0);
n([p(cc.Node)], m.prototype, "content", void 0);
m = i = n([h], m);
exports.default = m;