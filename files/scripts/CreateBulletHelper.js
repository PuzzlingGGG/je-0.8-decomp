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
exports.CreateBulletHelper = void 0;
const n = e("../../../scripts/_autogen/data/data"),
  a = e("../../Frame/SceneManager"),
  s = e("../../Game/Player/Mng"),
  r = e("../../GameData/GameTypeDefine"),
  l = e("../../Role"),
  c = e("./CreateCommonHelper");
exports.CreateBulletHelper = class extends c.CreateCommonHelper {
  constructor() {
    super(...arguments);
    this.bulletConf = null;
    this.propConf = null;
    this.imageFileType = n.ImageFileType.bullet;
    this.displayName = "子弹";
    this.refreshMsgName = "refreshBulletList";
  }
  buildConf() {
    return i(this, void 0, void 0, function* () {
      let e,
        t = yield s.Mng.Ins.bulletMng.loadAll(),
        o = 1;
      do {
        e = "子弹" + o;
        o++;
      } while (t.find(t => t.name == e));
      this.bulletConf = {
        author: l.default.Ins.userName,
        type: r.CommonDataType.Bullet,
        id: "",
        name: e,
        textureName: "",
        speed: 5,
        range: 5,
        damage: 1,
        hitShake: !0,
        hitDestroy: !0,
        angleSpeed: 0
      };
      return this.bulletConf;
    });
  }
  setConf(e) {
    this.bulletConf = e;
  }
  saveAsncFunc() {
    return i(this, void 0, void 0, function* () {
      if (this.bulletConf) return yield s.Mng.Ins.bulletMng.create(this.bulletConf);
    });
  }
  initInspector(e) {
    e.reset();
    this.loadCostProp();
    e.addNumberEditBox("伤害值", this.bulletConf.damage, 0, 999990, e => {
      this.bulletConf.damage = e;
    });
    e.addNumberEditBox("自旋转(度/秒)", this.bulletConf.angleSpeed, 0, 36e3, e => {
      this.bulletConf.angleSpeed = e;
    });
    let t = e.addButton("消耗道具", this.propConf ? this.propConf.name : this.bulletConf.costPropId && "" != this.bulletConf.costPropId ? "" : "无道具", () => {
      a.default.ins.OpenPanelByName("SelectPropPanel", e => {
        e.setData(this.bulletConf.costPropId);
        e.selectCall = e => {
          this.propConf = e;
          this.bulletConf.costPropId = e.id;
          t.button.label.string = e.name;
        };
      });
    });
    e.addToggle("击中震屏", this.bulletConf.hitShake, e => {
      this.bulletConf.hitShake = e;
    });
    e.addToggle("击中销毁", this.bulletConf.hitDestroy, e => {
      this.bulletConf.hitDestroy = e;
    });
    this.bulletConf.onHit = this.bulletConf.onHit || [];
    e.addTrigger("击中时", this.bulletConf.onHit, !1);
    this.bulletConf.onDestroy = this.bulletConf.onDestroy || [];
    e.addTrigger("销毁时", this.bulletConf.onDestroy, !1);
  }
  loadCostProp() {
    return i(this, void 0, void 0, function* () {
      if (this.bulletConf.costPropId) {
        let e = yield s.Mng.Ins.propMng.loadOne(this.bulletConf.costPropId);
        if (this.propConf != e) {
          this.propConf = e;
          this.isDirty = !0;
        }
      }
    });
  }
};