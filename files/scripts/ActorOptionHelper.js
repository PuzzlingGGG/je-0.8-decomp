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
exports.ActorOptionHelper = void 0;
const n = e("../../../scripts/_autogen/data/data"),
  a = e("../../Frame/SceneManager"),
  s = e("../../Frame/Util"),
  r = e("../../Game/Player/Mng"),
  l = e("../../Game/World/Actor"),
  c = e("../../Scene/EditWorldScene/EditWorldScene"),
  d = e("./CommonOptionHelper");
exports.ActorOptionHelper = class extends d.CommonOptionHelper {
  constructor() {
    super(...arguments);
    this.actorConf = null;
    this.imageFileType = n.ImageFileType.actor;
    this.optionName = "角色";
    this.refreshMsgName = "refreshActorList";
    this.changeDataMsgName = null;
  }
  setConf(e) {
    super.setConf(e);
    this.actorConf = e;
  }
  saveAsncFunc() {
    return i(this, void 0, void 0, function* () {
      yield r.Mng.Ins.actorMng.save(this.actorConf);
    });
  }
  deleteAsncFunc() {
    return i(this, void 0, void 0, function* () {
      yield r.Mng.Ins.actorMng.delete(this.actorConf);
    });
  }
  displayWorldType() {
    return !0;
  }
  initInspector(e) {
    if (e) {
      e.reset();
      if (null == this._worldType) {
        let e = a.default.ins.findScene(c.default);
        this._worldType = e.worldData.info.type;
      }
      l.default.displayConfInspector(this._worldType, e, this.actorConf, () => {
        this.initInspector(e);
      });
    }
  }
  onShiftWorldType(e, t) {
    this._worldType = e;
    t && this.initInspector(t);
  }
  onModifyTexture(e, t) {
    let o = s.Util.getPixelTirmBounds(e, 256, 256),
      i = s.Util.bounds2OffsetAndSize(o);
    t.collider = i;
  }
};