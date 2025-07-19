"use strict";

var i,
  n = this && this.__decorate || function (e, t, o, i) {
    var n,
      a = arguments.length,
      s = a < 3 ? t : null === i ? i = Object.getOwnPropertyDescriptor(t, o) : i;
    if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) s = Reflect.decorate(e, t, o, i);else for (var r = e.length - 1; r >= 0; r--) (n = e[r]) && (s = (a < 3 ? n(s) : a > 3 ? n(t, o, s) : n(t, o)) || s);
    return a > 3 && s && Object.defineProperty(t, o, s), s;
  },
  a = this && this.__awaiter || function (e, t, o, i) {
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
const s = e("../../Frame/Damager"),
  r = e("../../GameData/GameTypeDefine"),
  l = e("../CollisionEmiter"),
  c = e("../Player/Mng"),
  d = e("../Player/TriggerMng"),
  h = e("../World/Device"),
  {
    ccclass: p,
    property: u
  } = cc._decorator;
let m = i = class extends h.default {
  constructor() {
    super(...arguments);
    this.sprite = null;
    this.damager = null;
    this.collider = null;
    this.timer = 0;
    this.showing = !0;
  }
  onLoad() {
    super.onLoad();
    this.node.on(l.default.onCollisionEnter, this.onCollisionEnter, this);
    this.damager = this.sprite.getComponent(s.default);
    this.collider = this.sprite.getComponent(cc.Collider);
  }
  update(e) {
    if (!this.world.playing) return;
    this.timer += e;
    let t = this.shouldShow(this.timer);
    t != this.showing && (t ? this.show() : this.hide());
  }
  onCollisionEnter(e, t) {
    this.world.playing && this.isHeroActor(e) && d.default.Ins.emitTrigger(this.data.extra.onActorEnter, this.node);
  }
  show(e = !0) {
    this.showing = !0;
    this.enableCollider(!0);
    if (e) {
      this.sprite.node.scaleY = 0;
      cc.tween(this.sprite.node).to(.1, {
        scaleY: 1
      }).start();
    } else this.sprite.node.scaleY = this.data.extra.scale;
  }
  enableCollider(e) {
    this.collider instanceof cc.BoxCollider && (this.collider.offset = e ? cc.v2(0, 32) : cc.v2(1e5, 1e5));
  }
  hide(e = !0) {
    this.showing = !1;
    if (e) {
      this.sprite.node.scaleY = 1;
      cc.tween(this.sprite.node).to(.1, {
        scaleY: 0
      }).call(() => {
        this.enableCollider(!1);
      }).start();
    } else {
      this.sprite.node.scaleY = 0;
      this.enableCollider(!1);
    }
  }
  setData(e, t) {
    const o = Object.create(null, {
      setData: {
        get: () => super.setData
      }
    });
    return a(this, void 0, void 0, function* () {
      o.setData.call(this, e, t);
      (e = this.data).extra || (e.extra = {
        speed: 300,
        showTime: 1.5,
        hideTime: 1.5,
        timer: 0,
        dmg: 1,
        scale: 1,
        onActorEnter: []
      });
      this.timer = e.extra.timer;
      for (; this.timer < 0;) this.timer += e.extra.showTime + e.extra.hideTime;
      yield c.Mng.Ins.spriteMng.setDeviceSprite(this.sprite, t.textureName, 64);
      let i = this.sprite.node.height;
      this.sprite.node.anchorY = (i - 64) / 2 / i;
      this.data.extra.scale = Math.min(this.data.extra.scale, 8);
      this.node.scale = this.data.extra.scale;
      this.damager.dmg = e.extra.dmg;
      this.damager.ignoreTeam = this.data.ignoreDmgEnemy ? r.Team.Enemy : r.Team.None;
    });
  }
  shouldShow(e) {
    let t = this.data.extra.showTime;
    return (e %= t + this.data.extra.hideTime) < t;
  }
  initInspector(e) {
    i.initInspector(e, this.conf, this, this.data);
  }
  static initInspector(e, t, o = null, i = null) {
    let n = i || t;
    n.extra = n.extra || {
      speed: 300,
      showTime: 1.5,
      hideTime: 1.5,
      timer: 0,
      dmg: 1,
      scale: 1,
      onActorEnter: []
    };
    o && e.addHead(t.name, t.textureName);
    e.addNumberEditBox("刺出时间(秒)", n.extra.showTime, 0, 999999, e => {
      n.extra.showTime = e;
    });
    e.addNumberEditBox("隐藏时间(秒)", n.extra.hideTime, 0, 999999, e => {
      n.extra.hideTime = e;
    });
    e.addNumberEditBox("时间偏移(秒)", n.extra.timer, -999999, 999999, e => {
      n.extra.timer = e;
    });
    e.addNumberEditBox("缩放", n.extra.scale, .2, 8, e => {
      n.extra.scale = e;
      if (o) {
        o.node.scale = n.extra.scale;
        o.world.placeGizmos.setScale(e);
      }
    });
    e.addTrigger("当接触主角时：", n.extra.onActorEnter, !0);
    e.addToggle("伤害敌人", !n.ignoreDmgEnemy, e => {
      n.ignoreDmgEnemy = !e;
    });
    e.addNumberEditBox("伤害", n.extra.dmg, 0, 999999, e => {
      n.extra.dmg = e;
    });
  }
};
n([u({
  override: !0,
  type: cc.Sprite
})], m.prototype, "sprite", void 0);
m = i = n([p], m);
exports.default = m;