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
exports.GamePetMng = void 0;
const n = e("../../Frame/SceneManager"),
  a = e("../../Scene/GameScene/GameScene"),
  s = e("../World/Actor"),
  r = e("../World/World");
class l {
  constructor() {
    this._petRegMap = new Map();
  }
  static get Ins() {
    this._instance || (this._instance = new l());
    return this._instance;
  }
  RegPet(e, t) {
    e = r.default.unionActSet.find(e);
    this._petRegMap.has(e) || this._petRegMap.set(e, []);
    let o = this._petRegMap.get(e);
    o.findIndex(e => e.id == t.id) < 0 && o.push(t);
  }
  RemovePet(e, t) {
    e = r.default.unionActSet.find(e);
    if (!this._petRegMap.has(e)) return;
    let o = this._petRegMap.get(e),
      i = o.findIndex(e => e.id == t);
    i >= 0 && o.splice(i, 1);
  }
  Save() {
    return Array.from(this._petRegMap);
  }
  Read(e) {
    this._petRegMap = new Map(e);
  }
  Clear() {
    this._petRegMap.clear();
  }
  InitWorldPets(e) {
    return i(this, void 0, void 0, function* () {
      let t = n.default.ins.findScene(a.default),
        o = Array.from(this._petRegMap.keys());
      for (let i of o) {
        let o = e.GetActNodeByDataUnionId(i);
        if (!(o && o instanceof s.default)) continue;
        let n = this._petRegMap.get(i);
        for (let i of n) {
          let n = e.GetActNodeByDataId(i.id);
          if (n) {
            n.SetPosition(o.node.x, o.node.y);
            n.ApplyPosition();
          } else {
            n = e.addActor(o.node.position);
            yield n.setData(i);
            t.initAi(e.worldLayout.type, n);
          }
          o.addPet(n);
        }
      }
    });
  }
}
exports.GamePetMng = l;