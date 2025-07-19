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
exports.PropOptionHelper = void 0;
const n = e("../../../scripts/_autogen/data/data"),
  a = e("../../Game/Player/Mng"),
  s = e("./CommonOptionHelper");
exports.PropOptionHelper = class extends s.CommonOptionHelper {
  constructor() {
    super(...arguments);
    this.propConf = null;
    this.imageFileType = n.ImageFileType.prop;
    this.optionName = "道具";
    this.refreshMsgName = "refreshPropList";
    this.changeDataMsgName = null;
  }
  setConf(e) {
    super.setConf(e);
    this.propConf = e;
  }
  saveAsncFunc() {
    return i(this, void 0, void 0, function* () {
      yield a.Mng.Ins.propMng.save(this.propConf);
    });
  }
  deleteAsncFunc() {
    return i(this, void 0, void 0, function* () {
      yield a.Mng.Ins.propMng.delete(this.propConf);
    });
  }
  displayWorldType() {
    return !1;
  }
  initInspector(e) {
    e.reset();
    this.propConf.onPick = this.propConf.onPick || [];
    this.propConf.onUse = this.propConf.onUse || [];
    this.propConf.onDrop = this.propConf.onDrop || [];
    e.addEditBox("道具描述：", this.propConf.intro, e => {
      this.propConf.intro = e;
    });
    e.addNumberEditBox("商店售价：", this.propConf.defaultPrice || 10, 1, 999999, e => {
      this.propConf.defaultPrice = e;
    });
    e.addNumberEditBox("商店回收价：", this.propConf.salePrice || 1, 1, 999999, e => {
      this.propConf.salePrice = e;
    });
    e.addToggle("一次性道具：", this.propConf.once, e => {
      this.propConf.once = e;
    });
    e.addToggle("捡起时立刻使用：", this.propConf.useWhenPick, e => {
      this.propConf.useWhenPick = e;
    });
    e.addTrigger("捡起时：", this.propConf.onPick, !1);
    e.addTrigger("使用时：", this.propConf.onUse, !1);
    e.addTrigger("丢弃时：", this.propConf.onDrop, !1);
  }
};