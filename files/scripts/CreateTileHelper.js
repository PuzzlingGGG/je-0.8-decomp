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
exports.TileOptionHelper = void 0;
const n = e("../../../scripts/_autogen/data/data"),
  a = e("../../Game/Player/Mng"),
  s = e("../../Game/World/Tile"),
  r = e("../../GameData/GameTypeDefine"),
  l = e("../../Role"),
  c = e("./CreateCommonHelper");
exports.TileOptionHelper = class extends c.CreateCommonHelper {
  constructor() {
    super(...arguments);
    this.tileConf = null;
    this.imageFileType = n.ImageFileType.tile;
    this.displayName = "地块";
    this.refreshMsgName = "refreshTileList";
  }
  buildConf() {
    return i(this, void 0, void 0, function* () {
      this.tileConf = {
        type: r.CommonDataType.Tile,
        id: "",
        tileType: r.TileType.All,
        name: "自定义地块",
        author: l.default.Ins.userName,
        textureName: "",
        tilePhyType: r.TilePhysicType.Block,
        shape: r.TileShape.Normal
      };
      return this.tileConf;
    });
  }
  setConf(e) {
    this.tileConf = e;
  }
  saveAsncFunc() {
    return i(this, void 0, void 0, function* () {
      return yield a.Mng.Ins.tileMng.create(this.tileConf);
    });
  }
  initInspector(e) {
    e.reset();
    s.default.displayInspector(e, this.tileConf, () => {
      this.initInspector(e);
    });
  }
};