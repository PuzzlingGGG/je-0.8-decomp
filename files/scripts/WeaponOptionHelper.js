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
exports.WeaponOptionHelper = void 0;
const n = e("../../../scripts/_autogen/data/data"),
  a = e("../../Frame/SceneManager"),
  s = e("../../Frame/Top"),
  r = e("../../Game/Player/Mng"),
  l = e("../../Game/World/Tile"),
  c = e("../../GameData/GameTypeDefine"),
  d = e("./CommonOptionHelper");
exports.WeaponOptionHelper = class extends d.CommonOptionHelper {
  constructor() {
    super(...arguments);
    this.weaponConf = null;
    this.imageFileType = n.ImageFileType.weapon;
    this.optionName = "武器";
    this.refreshMsgName = "refreshWeaponList";
    this.changeDataMsgName = "weaponDataChange";
  }
  setConf(e) {
    super.setConf(e);
    this.weaponConf = e;
  }
  saveAsncFunc() {
    return i(this, void 0, void 0, function* () {
      s.default.showLoading("正在上传(1/2)");
      yield r.Mng.Ins.weaponMng.save(this.weaponConf);
      s.default.hideLoading("上传成功");
    });
  }
  deleteAsncFunc() {
    return i(this, void 0, void 0, function* () {
      yield r.Mng.Ins.weaponMng.delete(this.weaponConf);
    });
  }
  paintCall(e) {
    e.toPaintWeapon(this.weaponConf.weaponType);
  }
  displayWorldType() {
    return !1;
  }
  initInspector(e) {
    e.reset();
    this.weaponConf && (this.weaponConf.weaponType == c.WeaponType.Gun ? this.drawGunInspector(e) : this.weaponConf.weaponType == c.WeaponType.Melee ? this.drawMeleeInspector(e) : this.weaponConf.weaponType == c.WeaponType.Cast && this.drawCastInspector(e));
  }
  drawGunInspector(e) {
    return i(this, void 0, void 0, function* () {
      let t = yield r.Mng.Ins.bulletMng.loadOne(this.weaponConf.gun.bulletId);
      this.weaponConf.gun.fireShake = !0;
      if (this.weaponConf.gun.fireShake && !this.weaponConf.gun.onFire) {
        let e = {
          speed: 200,
          range: 6,
          times: 3
        };
        this.weaponConf.gun.onFire = [];
        this.weaponConf.gun.onFire.push({
          act: c.TriggerAct.CameraShake,
          extra: e
        });
      }
      let o = e.addButton("子弹", t ? t.name : this.weaponConf.gun.bulletId, () => {
        a.default.ins.OpenPanelByName("SelectBulletPanel", e => {
          e.setData(this.weaponConf.gun.bulletId);
          e.selectCall = e => {
            this.weaponConf.gun.bulletId = e.id;
            o.button.label.string = e.name;
          };
        });
      });
      e.addNumberEditBox("子弹速度(格/秒)", this.weaponConf.gun.bulletSpeed / l.default.SIZE, 0, 64, e => {
        this.weaponConf.gun.bulletSpeed = e * l.default.SIZE;
      });
      e.addNumberEditBox("射速(发/秒)", this.weaponConf.ROF, 0, 50, e => {
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
    });
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
    e.addNumberEditBox("伤害值", this.weaponConf.melee.damage, 0, 999990, e => {
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
    return i(this, void 0, void 0, function* () {
      let t = yield r.Mng.Ins.bulletMng.loadOne(this.weaponConf.cast.bulletId);
      if (t) {
        null == this.weaponConf.cast.flyDistance && (this.weaponConf.cast.flyDistance = t.range);
        null == this.weaponConf.cast.outSpeed && (this.weaponConf.cast.outSpeed = t.speed);
      }
      this.weaponConf.cast.fireShake = !0;
      if (this.weaponConf.cast.fireShake && !this.weaponConf.cast.onFire) {
        let e = {
          speed: 200,
          range: 6,
          times: 3
        };
        this.weaponConf.cast.onFire = [];
        this.weaponConf.cast.onFire.push({
          act: c.TriggerAct.CameraShake,
          extra: e
        });
      }
      let o = e.addButton("子弹", t ? t.name : this.weaponConf.cast.bulletId, () => {
        a.default.ins.OpenPanelByName("SelectBulletPanel", e => {
          e.setData(this.weaponConf.cast.bulletId);
          e.selectCall = e => {
            this.weaponConf.cast.bulletId = e.id;
            o.button.label.string = e.name;
          };
        });
      });
      e.addNumberEditBox("子弹速度(格/秒)", this.weaponConf.cast.outSpeed / l.default.SIZE, 0, 64, e => {
        this.weaponConf.cast.outSpeed = e * l.default.SIZE;
      });
      e.addNumberEditBox("射速(发/秒)", this.weaponConf.ROF, 0, 2, e => {
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
    });
  }
};