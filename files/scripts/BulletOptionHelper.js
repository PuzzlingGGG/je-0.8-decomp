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
exports.BulletOptionHelper = void 0;
const n = e("../../../scripts/_autogen/data/data"),
  a = e("../../Frame/SceneManager"),
  s = e("../../Frame/Top"),
  r = e("../../Game/Player/Mng"),
  l = e("./CommonOptionHelper");
exports.BulletOptionHelper = class extends l.CommonOptionHelper {
  constructor() {
    super(...arguments);
    this.bulletConf = null;
    this.propConf = null;
    this.imageFileType = n.ImageFileType.bullet;
    this.optionName = "子弹";
    this.refreshMsgName = "refreshBulletList";
    this.changeDataMsgName = null;
  }
  setConf(e) {
    super.setConf(e);
    this.bulletConf = e;
  }
  saveAsncFunc() {
    return i(this, void 0, void 0, function* () {
      s.default.showLoading("正在上传(1/2)");
      yield r.Mng.Ins.bulletMng.save(this.bulletConf);
      s.default.hideLoading("上传成功");
    });
  }
  deleteAsncFunc() {
    return i(this, void 0, void 0, function* () {
      yield r.Mng.Ins.bulletMng.delete(this.bulletConf);
    });
  }
  displayWorldType() {
    return !1;
  }
  initInspector(e) {
    e.reset();
    this.loadCostProp();
    e.addNumberEditBox("伤害值", this.bulletConf.damage, 0, 999999, e => {
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
        let e = yield r.Mng.Ins.propMng.loadOne(this.bulletConf.costPropId);
        this.propConf != e && (this.propConf = e);
      }
    });
  }
};