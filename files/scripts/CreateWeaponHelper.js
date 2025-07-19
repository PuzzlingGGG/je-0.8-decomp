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
exports.CreateWeaponHelper = void 0;
const n = e("../../../scripts/_autogen/data/data"),
  a = e("../../Frame/SceneManager"),
  s = e("../../Frame/Util"),
  r = e("../../Game/Player/Mng"),
  l = e("../../Game/World/Tile"),
  c = e("../../GameData/GameTypeDefine"),
  d = e("../../Role"),
  h = e("./CreateCommonHelper");
exports.CreateWeaponHelper = class extends h.CreateCommonHelper {
  constructor() {
    super(...arguments);
    this.weaponType = c.WeaponType.Gun;
    this.weaponConf = null;
    this.bulletConf = null;
    this.imageFileType = n.ImageFileType.weapon;
    this.displayName = "武器";
    this.refreshMsgName = "refreshWeaponList";
  }
  buildConf() {
    return i(this, void 0, void 0, function* () {
      this.weaponType = c.WeaponType.Gun;
      this.params && this.params.length > 0 && (this.weaponType = this.params[0]);
      let e,
        t = yield r.Mng.Ins.weaponMng.loadAll(),
        o = 1;
      do {
        e = "武器" + o;
        o++;
      } while (t.find(t => t.name == e));
      this.weaponType == c.WeaponType.Gun ? this.weaponConf = {
        author: d.default.Ins.userName,
        type: c.CommonDataType.Weapon,
        id: "",
        name: e,
        textureName: "Weapon/BuildIn1/gun",
        ROF: 5,
        weaponType: c.WeaponType.Gun,
        gun: {
          scatter: 0,
          fireShake: !1,
          muzzles: [cc.Vec2.ZERO],
          bulletId: "1",
          bulletSpeed: 5 * l.default.SIZE,
          bulletRange: 5 * l.default.SIZE
        }
      } : this.weaponType == c.WeaponType.Melee ? this.weaponConf = {
        author: d.default.Ins.userName,
        type: c.CommonDataType.Weapon,
        id: "",
        name: e,
        textureName: "Weapon/BuildIn2/melee1",
        ROF: 2,
        weaponType: c.WeaponType.Melee,
        melee: {
          damage: 1,
          scale: 1.5,
          actType: c.MeleeActType.Swing
        }
      } : this.weaponType == c.WeaponType.Cast && (this.weaponConf = {
        author: d.default.Ins.userName,
        type: c.CommonDataType.Weapon,
        id: "",
        name: e,
        textureName: "Weapon/BuildIn3/cast1",
        ROF: 1,
        weaponType: c.WeaponType.Cast,
        cast: {
          fireShake: !1,
          bulletId: "1",
          outSpeed: 18 * l.default.SIZE,
          flyDistance: 16 * l.default.SIZE,
          airResistanceCof: .1,
          defaultAngle: 70,
          dragInverse: !1
        }
      });
      return this.weaponConf;
    });
  }
  setConf(e) {
    this.weaponConf = e;
    this.weaponType = e.weaponType;
  }
  saveAsncFunc() {
    return i(this, void 0, void 0, function* () {
      if (this.weaponConf) return yield r.Mng.Ins.weaponMng.create(this.weaponConf);
    });
  }
  paintCall(e) {
    e.toPaintWeapon(this.weaponType);
  }
  initInspector(e) {
    e.reset();
    this.weaponConf.weaponType == c.WeaponType.Gun ? this.drawGunInspector(e) : this.weaponConf.weaponType == c.WeaponType.Melee ? this.drawMeleeInspector(e) : this.weaponConf.weaponType == c.WeaponType.Cast && this.drawCastInspector(e);
  }
  loadBullet(e) {
    return i(this, void 0, void 0, function* () {
      if (e) {
        let t = yield r.Mng.Ins.bulletMng.loadOne(e);
        if (t != this.bulletConf) {
          this.bulletConf = t;
          this.isDirty = !0;
        }
      }
    });
  }
  drawGunInspector(e) {
    this.loadBullet(this.weaponConf.gun.bulletId);
    if (this.bulletConf) {
      null == this.weaponConf.gun.bulletRange && (this.weaponConf.gun.bulletRange = this.bulletConf.range);
      null == this.weaponConf.gun.bulletSpeed && (this.weaponConf.gun.bulletSpeed = this.bulletConf.speed);
    }
    let t = e.addButton("子弹", this.bulletConf ? this.bulletConf.name : this.weaponConf.gun.bulletId, () => {
      a.default.ins.OpenPanelByName("SelectBulletPanel", e => {
        e.setData(this.weaponConf.gun.bulletId);
        e.selectCall = e => {
          this.bulletConf = e;
          this.weaponConf.gun.bulletId = e.id;
          t.button.label.string = e.name;
        };
      });
    });
    e.addNumberEditBox("子弹速度(格/秒)", this.weaponConf.gun.bulletSpeed / l.default.SIZE, 0, 64, e => {
      let t = Number.parseFloat(e) || 0;
      t = s.Util.clamp(t, 0, 64);
      this.weaponConf.gun.bulletSpeed = t * l.default.SIZE;
    });
    e.addNumberEditBox("射速(发/秒)", this.weaponConf.ROF, 0, 2, e => {
      this.weaponConf.ROF = e;
    });
    e.addNumberEditBox("射程(格)", this.weaponConf.gun.bulletRange / l.default.SIZE, 0, 16, e => {
      this.weaponConf.gun.bulletRange = e * l.default.SIZE;
    });
    e.addNumberEditBox("散射(度)", this.weaponConf.gun.scatter, 0, 360, e => {
      this.weaponConf.gun.scatter = e;
    });
    this.weaponConf.gun.onFire = this.weaponConf.gun.onFire || [];
    e.addTrigger("发射时", this.weaponConf.gun.onFire, !1);
  }
  drawMeleeInspector(e) {
    let t = [{
        str: "突刺",
        type: c.MeleeActType.Jab
      }, {
        str: "挥舞",
        type: c.MeleeActType.Swing
      }],
      o = t.findIndex(e => e.type == this.weaponConf.melee.actType);
    -1 == o && (o = 0);
    e.addDropDownBox("动作", t, o, (e, t) => i(this, void 0, void 0, function* () {
      this.weaponConf.melee.actType = t.type;
    }));
    e.addNumberEditBox("伤害值", this.weaponConf.melee.damage, 0, 999999, e => {
      this.weaponConf.melee.damage = e;
    });
    e.addNumberEditBox("缩放", this.weaponConf.melee.scale, 0, 10, e => {
      this.weaponConf.melee.scale = e;
    });
    e.addNumberEditBox("攻速(次/秒)", this.weaponConf.ROF, 0, 50, e => {
      this.weaponConf.ROF = e;
    });
    this.weaponConf.melee.onAttack = this.weaponConf.melee.onAttack || [];
    e.addTrigger("攻击时", this.weaponConf.melee.onAttack, !1);
  }
  drawCastInspector(e) {
    this.loadBullet(this.weaponConf.cast.bulletId);
    if (this.bulletConf) {
      null == this.weaponConf.cast.flyDistance && (this.weaponConf.cast.flyDistance = this.bulletConf.range);
      null == this.weaponConf.cast.outSpeed && (this.weaponConf.cast.outSpeed = this.bulletConf.speed);
    }
    let t = e.addButton("子弹", this.bulletConf ? this.bulletConf.name : this.weaponConf.cast.bulletId, () => {
      a.default.ins.OpenPanelByName("SelectBulletPanel", e => {
        e.setData(this.weaponConf.cast.bulletId);
        e.selectCall = e => {
          this.bulletConf = e;
          this.weaponConf.cast.bulletId = e.id;
          t.button.label.string = e.name;
        };
      });
    });
    e.addNumberEditBox("子弹速度(格/秒)", this.weaponConf.cast.outSpeed / l.default.SIZE, 0, 64, e => {
      this.weaponConf.cast.outSpeed = e * l.default.SIZE;
    });
    e.addNumberEditBox("射速(发/秒)", this.weaponConf.ROF, 0, 50, e => {
      this.weaponConf.ROF = e;
    });
    e.addNumberEditBox("射程(格)", this.weaponConf.cast.flyDistance / l.default.SIZE, 0, 32, e => {
      this.weaponConf.cast.flyDistance = e * l.default.SIZE;
    });
    e.addNumberEditBox("空气阻力系数", this.weaponConf.cast.airResistanceCof, 0, 10, e => {
      this.weaponConf.cast.airResistanceCof = e;
    });
    e.addNumberEditBox("默认角度", this.weaponConf.cast.defaultAngle, 0, 360, e => {
      this.weaponConf.cast.defaultAngle = e;
    });
    e.addToggle("操作反转", this.weaponConf.cast.dragInverse, e => {
      this.weaponConf.cast.dragInverse = e;
    });
    this.weaponConf.cast.onFire = this.weaponConf.cast.onFire || [];
    e.addTrigger("发射时", this.weaponConf.cast.onFire, !1);
  }
};