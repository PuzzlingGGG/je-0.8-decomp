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
const n = e("../../Frame/Util"),
  a = e("./Mng");
class s {
  constructor() {
    this.cache = [];
  }
  load(e) {
    return i(this, void 0, void 0, function* () {
      let t = this.cache.find(t => t && t.url == e);
      if (t) return t.data;
      {
        let t = this.downloadGamePack(e);
        this.addCache(e, t);
        return t;
      }
    });
  }
  downloadGamePack(e) {
    return i(this, void 0, void 0, function* () {
      let t = yield n.Util.downLoadBin(e);
      if (!t) return null;
      let o = bon.decode(pako.ungzip(t));
      if (o.worldDatas) for (let e of o.worldDatas) if (e.layoutMin) {
        e.worldLayout = n.Util.unzip(e.layoutMin);
        e.layoutMin = void 0;
      }
      let i = (e, t) => {
        e && e.forEach(e => {
          t.upgradeConf(e);
        });
      };
      i(o.tileConfs, a.Mng.Ins.tileMng);
      i(o.actorConfs, a.Mng.Ins.actorMng);
      i(o.deviceConfs, a.Mng.Ins.deviceMng);
      i(o.propConfs, a.Mng.Ins.propMng);
      i(o.weaponConfs, a.Mng.Ins.weaponMng);
      i(o.bulletConfs, a.Mng.Ins.bulletMng);
      i(o.gameRankConfs, a.Mng.Ins.gameRankMng);
      i(o.gameShopConfs, a.Mng.Ins.gameShopMng);
      exports.gameRankConfs = o.gameRankConfs || [];
      return o;
    });
  }
  addCache(e, t) {
    this.cache.unshift({
      url: e,
      data: t
    });
    this.cache = this.cache.slice(0, 5);
  }
}
exports.default = s;
s.Ins = new s();