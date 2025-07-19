"use strict";

var i,
  n = this && this.__decorate || function (e, t, o, i) {
    var n,
      a = arguments.length,
      s = a < 3 ? t : null === i ? i = Object.getOwnPropertyDescriptor(t, o) : i;
    if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) s = Reflect.decorate(e, t, o, i);else for (var r = e.length - 1; r >= 0; r--) (n = e[r]) && (s = (a < 3 ? n(s) : a > 3 ? n(t, o, s) : n(t, o)) || s);
    return a > 3 && s && Object.defineProperty(t, o, s), s;
  },
  a = this && this.__awaiter || function (e, t, o, i) {
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
const s = e("../../GameScript/index"),
  r = e("../../Frame/Config"),
  l = e("../../Frame/SceneManager"),
  c = e("../../Frame/Sound"),
  d = e("../../Frame/TweenUtil"),
  h = e("../../Frame/Util"),
  p = e("../../Scene/GameScene/GameScene"),
  u = e("../World/Interactable"),
  m = e("./Mng"),
  f = e("../World/Tile"),
  g = e("../../Panel/GSDataNodeChangeActPanel/GSDataNodeActPropertyHelper"),
  y = e("../../GameData/GameTypeDefine"),
  {
    ccclass: v,
    property: C
  } = cc._decorator;
let _ = i = class extends cc.Component {
  static init() {
    let e = r.Config.getTriggerAct(y.TriggerAct.ChangeHero);
    e && (e.getDisplayStr = t => {
      if (!t.extra) return e.name;
      let o = t.extra,
        i = g.GSDataNodeActPropertyHelper.instance.GetPropertyInfo(s.ActType.Hero, o.propertyName);
      return h.Util.clampStr(`${e.name}：${i ? i.str : "None"}`, 13, "..");
    });
  }
  onLoad() {
    i.Ins = this;
  }
  onDestroy() {
    i.Ins = null;
  }
  emitTrigger(e, t = null) {
    return a(this, void 0, void 0, function* () {
      if (!e) return;
      let o = l.default.ins.findScene(p.default);
      for (let n = 0; n < e.length; n++) {
        let a = e[n];
        switch (a.act) {
          case y.TriggerAct.GameScript:
            if (o) {
              if (!a.extra) return;
              s.GSMng.instance.ExcuteScript(t, o.curWorldId, a.extra);
            }
            break;
          case y.TriggerAct.ShiftWorld:
            o.triggerShiftWorld(a);
            break;
          case y.TriggerAct.Dialog:
            if (!a.extra) continue;
            if (a.extra.onlyOnce) {
              a.extra.triggered || cc.game.emit(p.default.SHOW_DIALOG_BOX, a.extra, t);
              a.extra.triggered = !0;
              if (t) {
                let e = t.getComponent(u.default);
                e && (e.canInteract = !1);
              }
            } else cc.game.emit(p.default.SHOW_DIALOG_BOX, a.extra, t);
            break;
          case y.TriggerAct.GameShop:
            cc.game.emit(p.default.GAME_SHOP, a.extra, t);
            break;
          case y.TriggerAct.GameRank:
            cc.game.emit(p.default.GAME_RANK, a.extra, t);
            break;
          case y.TriggerAct.UploadRankScore:
            cc.game.emit(p.default.UPLOAD_GAME_RANK_SCORE, a.extra, t);
            break;
          case y.TriggerAct.GameOver:
            cc.game.emit(p.default.GAME_OVER, a.extra);
            break;
          case y.TriggerAct.GameWin:
            cc.game.emit(p.default.GAME_WIN, a.extra);
            break;
          case y.TriggerAct.Sound:
            if (a.extra && a.extra.soundId) {
              let e = a.extra.soundId,
                t = r.Config.soundConfs.find(t => t.id == e);
              t && c.Sound.play(t.url);
            }
            break;
          case y.TriggerAct.ShiftWeapon:
            if (a.extra && a.extra.gunId) {
              let e = a.extra.gunId,
                t = o.world.hero;
              o && t && t.setupGun(e);
            }
            break;
          case y.TriggerAct.DropProp:
            {
              if (!t || !a.extra) continue;
              let e = a.extra.propConfId,
                i = a.extra.cnt;
              i = h.Util.clamp(i, 0, 99);
              let n = a.extra.useGravity;
              if (e && i && (yield m.Mng.Ins.propMng.loadOne(e))) for (; i-- > 0;) {
                let i = o.world.addProp(t.position),
                  a = {
                    id: "",
                    confId: e,
                    useGravity: n
                  };
                yield i.setData(a);
                let s = .4,
                  r = f.default.SIZE,
                  l = -r + Math.random() * r * 2,
                  c = -r + Math.random() * r * 2,
                  d = 2 * l / s,
                  h = 2 * c / s;
                a.useGravity && (h = 4 * (c = .5 * r + Math.random() * r * .5) / s);
                i.addImpulse(d, h, s);
              }
              break;
            }
          case y.TriggerAct.RecoverHP:
            {
              if (!a.extra) continue;
              let e = o.world.hero;
              if (e) {
                let t = a.extra.cnt || 0;
                e.hper.hp = h.Util.clamp(e.hper.hp + t, 0, e.hper.HpMax);
                e.data.hp = e.hper.hp;
                e.hper.hp <= 0 && e.doDead();
              }
              break;
            }
          case y.TriggerAct.CameraShake:
            {
              let e = {
                speed: 200,
                range: 6,
                times: 3
              };
              a.extra && (e = a.extra);
              let t = o.world;
              d.TweenUtil.applyShake(t.camera.node, e);
              break;
            }
          case y.TriggerAct.ChangeAct:
            s.GSCmdMng.instance.getCmd(0, s.GSCmdType.ChangeActorProperty).setParam(a.extra);
            break;
          case y.TriggerAct.ChangeHero:
            s.GSCmdMng.instance.getCmd(0, s.GSCmdType.ChangeHeroProperty).setParam(a.extra);
            break;
          case y.TriggerAct.ShiftHero:
            yield o.shiftHero(a.extra.confId);
            break;
          case y.TriggerAct.StartTimeCountDown:
            {
              let e = a.extra.timerType || a.extra.type;
              yield o.onStartGameTimer(a.extra.timer, e, () => {
                i.Ins.emitTrigger(a.extra.evts, t);
              });
              break;
            }
          case y.TriggerAct.StopTimeCountDown:
            yield o.onStopGameTimer();
            break;
          case y.TriggerAct.Save:
            o.save(a.extra, t);
            break;
          case y.TriggerAct.Load:
            o.load(a.extra, t);
            break;
          case y.TriggerAct.ClearSave:
            o.clearSave(a.extra, t);
            break;
          case y.TriggerAct.ShareGame:
            cc.game.emit(p.default.SHARE_GAME, a.extra, t);
            break;
          case y.TriggerAct.AD:
            cc.game.emit(p.default.SHOW_AD, a.extra, t);
            break;
          case y.TriggerAct.BagItem:
            s.GSCmdMng.instance.getCmd(0, s.GSCmdType.ChangeBagItem).setParam(a.extra);
            break;
          case y.TriggerAct.Random:
            {
              if (!a.extra) return;
              let e = a.extra.probabilitys,
                o = Math.random(),
                i = 0;
              for (let n = 0; n < e.length; n++) if ((i += e[n].value) > o) {
                this.emitTrigger(e[n].evts, t);
                break;
              }
              break;
            }
        }
      }
    });
  }
};
_.TRIGGER_ACT = "TRIGGER_ACT";
_.Ins = null;
_ = i = n([v], _);
exports.default = _;