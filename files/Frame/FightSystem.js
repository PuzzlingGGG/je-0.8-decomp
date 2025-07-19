"use strict";

exports.FightSystem = void 0;
const i = e("../GameData/GameTypeDefine"),
  n = e("./Damager"),
  a = e("./Hper");
(function (e) {
  e.enable = !1;
  e.BeatData = class {};
  let t;
  (function (e) {
    e.BeatHper = "BeatHper";
    e.KillHper = "KillHper";
    e.Beaten = "Beaten";
    e.Killed = "Killed";
    e.HpChange = "HpChange";
    e.HpMaxChange = "HpMaxChange";
  })(t = e.Event || (e.Event = {}));
  let o = [];
  e.init = function () {
    for (let e = 0; e < 10; e++) {
      let e = [];
      for (let t = 0; t < 10; t++) e.push(!1);
      o.push(e);
    }
    o[i.Team.HeroBullet][i.Team.Enemy] = !0;
    o[i.Team.HeroBullet][i.Team.Tile] = !0;
    o[i.Team.Enemy][i.Team.Hero] = !0;
    o[i.Team.Enemy][i.Team.Ally] = !0;
    o[i.Team.EnemyBullet][i.Team.Hero] = !0;
    o[i.Team.EnemyBullet][i.Team.Ally] = !0;
    o[i.Team.EnemyBullet][i.Team.Tile] = !0;
    o[i.Team.AllyBullet][i.Team.Enemy] = !0;
    o[i.Team.AllyBullet][i.Team.Tile] = !0;
    o[i.Team.Device][i.Team.Hero] = !0;
    o[i.Team.Device][i.Team.Enemy] = !0;
    o[i.Team.Device][i.Team.Ally] = !0;
    o[i.Team.Device][i.Team.Tile] = !0;
    let t = cc.director.getCollisionManager(),
      r = t._doCollide;
    t._doCollide = function (i, l) {
      r.call(t, i, l);
      if ((1 === i || 2 === i) && e.enable) {
        var c,
          d,
          h,
          p = l.collider1,
          u = l.collider2,
          m = p.node._components,
          f = u.node._components,
          g = null,
          y = null,
          v = null,
          C = null;
        for (c = 0, d = m.length; c < d; c++) {
          (h = m[c]) instanceof a.default && (g = h);
          h instanceof n.default && (y = h);
        }
        for (c = 0, d = f.length; c < d; c++) {
          (h = f[c]) instanceof a.default && (v = h);
          h instanceof n.default && (C = h);
        }
        g && C && g.enabled && C.enabled && o[C.team][g.team] && s(C, g);
        v && y && v.enabled && y.enabled && o[y.team][v.team] && s(y, v);
      }
    };
  };
  e.doCollisionTile = function (e, t) {
    var i,
      r,
      l,
      c = e._components,
      d = t._components,
      h = null,
      p = null,
      u = null,
      m = null;
    for (i = 0, r = c.length; i < r; i++) {
      (l = c[i]) instanceof a.default && (h = l);
      l instanceof n.default && (p = l);
    }
    for (i = 0, r = d.length; i < r; i++) {
      (l = d[i]) instanceof a.default && (u = l);
      l instanceof n.default && (m = l);
    }
    h && m && h.enabled && m.enabled && o[m.team][h.team] && s(m, h);
    u && p && u.enabled && p.enabled && o[p.team][u.team] && s(p, u);
  };
  function s(e, o) {
    if (e.ignoreTeam == o.team) return;
    if (o.hp <= 0) return;
    if (e.remainTimes <= 0) return;
    if (!e.tryDmgTarget(o)) return;
    let i = e.dmg;
    o.lockHp && (i = 0);
    let n = o.hp - i,
      a = {
        hper: o,
        damager: e,
        dmg: i,
        isCrit: !1,
        causeDeath: n <= 0
      };
    e.remainTimes--;
    (e.emitTarget || e.node).emit(t.BeatHper, a);
    if (!o.lockHp) {
      exports.hp = Math.max(0, n);
      (o.emitTarget || o.node).emit(t.Beaten, a);
      if (o.hp <= 0) {
        (e.emitTarget || e.node).emit(t.KillHper, a);
        (o.emitTarget || o.node).emit(t.Killed, a);
      }
    }
  }
})(o.FightSystem || (exports.FightSystem = {}));