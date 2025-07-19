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
const a = e("../../Frame/SceneManager"),
  s = e("../../Frame/Util"),
  r = e("../Player/GameBagMng"),
  l = e("../Player/GameSaveMng"),
  c = e("../Player/Mng"),
  d = e("../Player/SpriteMng"),
  h = e("../Player/TriggerMng"),
  p = e("./AICtrl/Com/AiComSimplerMover"),
  u = e("./WorldNodeBody"),
  {
    ccclass: m,
    property: f
  } = cc._decorator;
let g = class extends u.default {
  constructor() {
    super(...arguments);
    this.sprite = null;
    this.conf = null;
    this.data = null;
    this.box = null;
    this.rigi = null;
    this.canPick = !0;
  }
  get gravity() {
    return this.data && this.data.useGravity ? -1500 : 0;
  }
  setCutting(e) {
    this.sprite.enabled = !e;
  }
  onLoad() {
    cc.game.on(d.default.UPDATE_SPRITE, this.onPixelsUpdate, this);
    this.box = this.getComponent(cc.PhysicsBoxCollider);
    this.rigi = this.getComponent(cc.RigidBody);
  }
  onDestroy() {
    cc.game.off(d.default.UPDATE_SPRITE, this.onPixelsUpdate, this);
  }
  onPixelsUpdate(e, t) {
    return n(this, void 0, void 0, function* () {
      this.conf && this.conf.id == e && c.Mng.Ins.spriteMng.setPropSprite(this.sprite, t, 64);
    });
  }
  setData(e) {
    return n(this, void 0, void 0, function* () {
      this.data = e;
      let t = yield c.Mng.Ins.propMng.loadOne(e.confId);
      this.conf = t;
      c.Mng.Ins.spriteMng.setPropSprite(this.sprite, t ? t.textureName : void 0, 64);
      this.canPick = !1;
      this.scheduleOnce(() => {
        this.canPick = !0;
      }, .3);
      this.collider = this.getComponent(cc.Collider);
      this._mover = new p.AiComSimplerMover();
      this._mover.setBody(this);
    });
  }
  addImpulse(e, t, o) {
    this._mover && this._mover.addForceMover({
      impulse: !0,
      sx: e,
      sy: t,
      duration: o
    });
  }
  update(e) {
    let t = this.world;
    if (t.playing) {
      this.node.y < -500 && t.removeProp(this);
      this._mover.run(e);
    }
  }
  onCollisionEnter(e, t) {
    let o = this.world;
    if (o.playing && this.canPick && this.conf && o.isHeroActor(e.node)) if (0 == r.default.Ins.add(this.conf.id, 1)) {
      let e = s.Util.deepCopy(this.conf.onPick, []);
      h.default.Ins.emitTrigger(e, this.node);
      if (this.conf.useWhenPick) {
        this.conf.once && r.default.Ins.sub(this.conf.id, 1);
        let e = s.Util.deepCopy(this.conf.onUse, []);
        h.default.Ins.emitTrigger(e, this.node);
      }
      this.canPick = !1;
      o.removeProp(this);
      this.data.onlyOnce && l.default.Ins.setPropFlag(o.worldData.id, this.data.id);
    } else {
      let e = this.node.position;
      e.y += this.node.height / 2;
      o.playFloatLabel({
        str: "背包已满",
        pos: e,
        color: cc.Color.YELLOW,
        anim: "FlashLabel",
        size: 40
      });
    }
  }
  initInspector(e) {
    e.addHead(this.conf ? this.conf.name : "错误道具", this.conf ? this.conf.textureName : void 0);
    if (this.conf) {
      this.conf.isBuildIn ? e.addLabel("内置道具不可编辑属性") : e.addButton("编辑道具", "点击编辑", () => {
        a.default.ins.OpenPanelByName("CommonOptionPanel", e => {
          e.setData(this.conf);
        });
      });
      e.addToggle("是否受到重力？", this.data.useGravity, e => {
        this.data.useGravity = e;
      });
      e.addToggle("捡起后不再出现：", this.data.onlyOnce, e => {
        this.data.onlyOnce = e;
      });
    } else e.addLabel("道具模版已被删除");
  }
};
i([f(cc.Sprite)], g.prototype, "sprite", void 0);
g = i([m], g);
exports.default = g;