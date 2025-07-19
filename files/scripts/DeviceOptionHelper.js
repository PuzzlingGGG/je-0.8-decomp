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
exports.DeviceOptionHelper = void 0;
const n = e("../../../scripts/_autogen/data/data"),
  a = e("../../Frame/Top"),
  s = e("../../Game/Device/Billboard"),
  r = e("../../Game/Device/Bomb"),
  l = e("../../Game/Device/ConveyorPlatform"),
  c = e("../../Game/Device/Decorator"),
  d = e("../../Game/Device/DeviceButton"),
  h = e("../../Game/Device/DeviceToggle"),
  p = e("../../Game/Device/FireBallLine"),
  u = e("../../Game/Device/Flag"),
  m = e("../../Game/Device/IceCone"),
  f = e("../../Game/Device/Ladder"),
  g = e("../../Game/Device/LoadPoint"),
  y = e("../../Game/Device/Lurker"),
  v = e("../../Game/Device/MonsterSpawner"),
  C = e("../../Game/Device/MovePlatform"),
  _ = e("../../Game/Device/SavePoint"),
  S = e("../../Game/Device/Saw"),
  I = e("../../Game/Device/Spring"),
  G = e("../../Game/Device/TrapPlatform"),
  T = e("../../Game/Player/Mng"),
  b = e("../../GameData/GameTypeDefine"),
  M = e("./CommonOptionHelper");
exports.DeviceOptionHelper = class extends M.CommonOptionHelper {
  constructor() {
    super(...arguments);
    this.deviceConf = null;
    this.imageFileType = n.ImageFileType.device;
    this.optionName = "装置";
    this.refreshMsgName = "refreshDeviceList";
    this.changeDataMsgName = "deviceDataChange";
  }
  setConf(e) {
    super.setConf(e);
    this.deviceConf = e;
  }
  saveAsncFunc() {
    return i(this, void 0, void 0, function* () {
      a.default.showLoading("正在上传(1/2)");
      yield T.Mng.Ins.deviceMng.save(this.deviceConf);
      a.default.hideLoading("上传成功");
    });
  }
  deleteAsncFunc() {
    return i(this, void 0, void 0, function* () {
      yield T.Mng.Ins.deviceMng.delete(this.deviceConf);
    });
  }
  displayWorldType() {
    return !1;
  }
  initInspector(e) {
    e.reset();
    this.deviceConf.deviceType == b.DeviceType.Saw ? S.default.initInspector(e, this.deviceConf) : this.deviceConf.deviceType == b.DeviceType.FireBallLine ? p.default.initInspector(e, this.deviceConf) : this.deviceConf.deviceType == b.DeviceType.Lurker ? y.default.initInspector(e, this.deviceConf) : this.deviceConf.deviceType == b.DeviceType.IceCone ? m.default.initInspector(e, this.deviceConf) : this.deviceConf.deviceType == b.DeviceType.MonsterSpawner ? v.default.initInspector(e, this.deviceConf) : this.deviceConf.deviceType == b.DeviceType.Button ? d.default.initInspector(e, this.deviceConf) : this.deviceConf.deviceType == b.DeviceType.Spring ? I.default.initInspector(e, this.deviceConf) : this.deviceConf.deviceType == b.DeviceType.Flag ? u.default.initInspector(e, this.deviceConf) : this.deviceConf.deviceType == b.DeviceType.Bomb ? r.default.initInspector(e, this.deviceConf) : this.deviceConf.deviceType == b.DeviceType.TrapPlatform ? G.default.initInspector(e, this.deviceConf) : this.deviceConf.deviceType == b.DeviceType.ConveyorPlatform ? l.default.initInspector(e, this.deviceConf) : this.deviceConf.deviceType == b.DeviceType.MovePlatform ? C.default.initInspector(e, this.deviceConf) : this.deviceConf.deviceType == b.DeviceType.Ladder ? f.default.initInspector(e, this.deviceConf) : this.deviceConf.deviceType == b.DeviceType.Decorator ? c.default.initInspector(e, this.deviceConf) : this.deviceConf.deviceType == b.DeviceType.SavePoint ? _.default.initInspector(e, this.deviceConf) : this.deviceConf.deviceType == b.DeviceType.LoadPoint ? g.default.initInspector(e, this.deviceConf) : this.deviceConf.deviceType == b.DeviceType.Toggle ? h.default.initInspector(e, this.deviceConf) : this.deviceConf.deviceType == b.DeviceType.Billboard && s.default.initInspector(e, this.deviceConf);
  }
};