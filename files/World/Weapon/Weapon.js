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
exports.Weapon = void 0;
const a = e("../../../CustomUI/CustomSpriteLine"),
  s = e("../../../Frame/Damager"),
  r = e("../../../GameData/GameTypeDefine"),
  l = e("../../Player/Mng"),
  c = e("../WorldChild"),
  d = e("./CastCtl"),
  h = e("./GunCtl"),
  p = e("./MeleeCtl"),
  {
    ccclass: u,
    property: m
  } = cc._decorator;
let f = class extends c.default {
  constructor() {
    super(...arguments);
    this.skin = null;
    this.spark = null;
    this.box = null;
    this.boxDamager = null;
    this.spLine = null;
    this.team = 0;
    this.conf = null;
    this.firing = !1;
    this._ctl = null;
    this._ctlMap = new Map();
  }
  get context() {
    return this._context;
  }
  onLoad() {
    super.onLoad();
    this.spark.node.active = !1;
    this.boxDamager && (this.boxDamager.node.active = !1);
    cc.game.on("weaponDataChange", this.onWeaponDataChange, this);
  }
  setCutting(e) {
    this.skin.enabled = !e;
    this.spark.enabled = !e;
  }
  setData(e, t) {
    return n(this, void 0, void 0, function* () {
      this._context = t;
      if (e) {
        this.conf = e;
        l.Mng.Ins.spriteMng.setWeaponSprite(this.skin, e.textureName, 48);
      } else {
        this.conf = null;
        this.skin.spriteFrame = null;
      }
      if (this.conf) {
        this.conf.ROF = this.conf.ROF || .001;
        this.conf.weaponType != r.WeaponType.Gun || this._ctlMap.has(r.WeaponType.Gun) || this._ctlMap.set(this.conf.weaponType, new h.GunCtl(this));
        this.conf.weaponType != r.WeaponType.Melee || this._ctlMap.has(r.WeaponType.Melee) || this._ctlMap.set(this.conf.weaponType, new p.MeleeCtl(this));
        this.conf.weaponType != r.WeaponType.Cast || this._ctlMap.has(r.WeaponType.Cast) || this._ctlMap.set(this.conf.weaponType, new d.CastCtl(this));
      }
      this.reset();
    });
  }
  reset() {
    this.spLine && (this.spLine.node.active = !1);
    this.node.scale = 1;
    if (this.boxDamager) {
      this.boxDamager.node.active = !1;
      this.boxDamager.team = this.team;
      this.team == r.Team.Hero ? this.boxDamager.team = r.Team.HeroBullet : this.team == r.Team.Enemy ? this.boxDamager.team = r.Team.EnemyBullet : this.team == r.Team.Ally && (this.boxDamager.team = r.Team.AllyBullet);
      this.boxDamager.node.x = .5;
      this.boxDamager.node.y = .5;
    }
    this._ctl = null;
    if (this.conf) {
      this._ctl = this._ctlMap.get(this.conf.weaponType);
      this.boxDamager.init();
      this.boxDamager.useObb = !1;
      if (this.boxDamager && this.conf.weaponType == r.WeaponType.Melee) {
        this.boxDamager.dmg = this.conf.melee.damage;
        this.boxDamager.useObb = !0;
      }
      this._ctl.init();
    }
    this.setDir(0, 0);
  }
  onWeaponDataChange(e) {
    if (this.conf && this.conf.id == e.id) {
      this.conf = e;
      this.reset();
    }
  }
  update(e) {
    this.conf && this._ctl && this._ctl.run(e);
    this.conf && this.boxDamager && this.boxDamager.node.active && (this.boxDamager.remainTimes = 1e3);
  }
  setDir(e, t) {
    this._ctl && this._ctl.setDir(e, t);
  }
  readyFire() {
    this._ctl && this._ctl.readyFire();
  }
  updateFirePower(e) {
    this._ctl && this._ctl.updateFirePower(e);
  }
  updateFireDir(e, t) {
    this._ctl && this._ctl.setFireDir(e, t);
  }
  fire(e) {
    this._ctl && this._ctl.fire(e);
  }
};
i([m(cc.Sprite)], f.prototype, "skin", void 0);
i([m(cc.Sprite)], f.prototype, "spark", void 0);
i([m(cc.BoxCollider)], f.prototype, "box", void 0);
i([m(s.default)], f.prototype, "boxDamager", void 0);
i([m(a.default)], f.prototype, "spLine", void 0);
f = i([u], f);
exports.Weapon = f;