"use strict";

exports.GSMng = void 0;
const i = e("../Frame/Util"),
  n = e("./commands/GSCmdAwait"),
  a = e("./commands/GSCmdCameraShake"),
  s = e("./commands/GSCmdChangeActProperty"),
  r = e("./commands/GSCmdChangeBagItem"),
  l = e("./commands/GSCmdChangeHeroProperty"),
  c = e("./commands/GSCmdDialogue"),
  d = e("./commands/GSCmdDropItem"),
  h = e("./commands/GSCmdSetVariable"),
  p = e("./commands/GSCmdShowGameOver"),
  u = e("./commands/GSCmdShowGameWin"),
  m = e("./commands/GSCmdSwitchHero"),
  f = e("./commands/GSCmdSwitchMap"),
  g = e("./commands/GSCmdTest"),
  y = e("./commands/GSCmdTimeCountDownStart"),
  v = e("./commands/GSCmdTimeCountDownStop"),
  C = e("./GameScriptData"),
  _ = e("./GameScriptDefines"),
  S = e("./GSCmdMng"),
  I = e("./GSRunnerMng"),
  G = e("./GSUtil");
class T {
  constructor() {
    this._idMaxMap = new Map();
    this._map = new Map();
  }
  static get instance() {
    if (!this._instance) {
      this._instance = new T();
      S.GSCmdMng.instance.registCmd(_.GSCmdType.Test, g.GSCmdTest);
      S.GSCmdMng.instance.registCmd(_.GSCmdType.Wait, n.GSCmdAwait);
      S.GSCmdMng.instance.registCmd(_.GSCmdType.SetVariable, h.GSCmdSetVariable);
      S.GSCmdMng.instance.registCmd(_.GSCmdType.Dialog, c.GSCmdDialogue);
      S.GSCmdMng.instance.registCmd(_.GSCmdType.DropItem, d.GSCmdDropItem);
      S.GSCmdMng.instance.registCmd(_.GSCmdType.ChangeBagItem, r.GSCmdChangeBagItem);
      S.GSCmdMng.instance.registCmd(_.GSCmdType.ChangeActorProperty, s.GSCmdChangeActProperty);
      S.GSCmdMng.instance.registCmd(_.GSCmdType.ShowGameWin, u.GSCmdShowGameWin);
      S.GSCmdMng.instance.registCmd(_.GSCmdType.ShowGameOver, p.GSCmdShowGameOver);
      S.GSCmdMng.instance.registCmd(_.GSCmdType.SwitchMap, f.GSCmdSwitchMap);
      S.GSCmdMng.instance.registCmd(_.GSCmdType.CameraShake, a.GSCmdCameraShake);
      S.GSCmdMng.instance.registCmd(_.GSCmdType.SwitchHero, m.GSCmdSwitchHero);
      S.GSCmdMng.instance.registCmd(_.GSCmdType.ChangeHeroProperty, l.GSCmdChangeHeroProperty);
      S.GSCmdMng.instance.registCmd(_.GSCmdType.TimeCountDownStart, y.GSCmdTimeCountDownStart);
      S.GSCmdMng.instance.registCmd(_.GSCmdType.TimeCountDownStop, v.GSCmdTimeCountDownStop);
    }
    return this._instance;
  }
  _idMax(e) {
    this._idMaxMap.has(e) || this._idMaxMap.set(e, 1);
    return this._idMaxMap.get(e);
  }
  _idxMaxPlus(e) {
    if (this._idMaxMap.has(e)) {
      let t = this._idMaxMap.get(e);
      this._idMaxMap.set(e, t + 1);
    }
  }
  _restIdxMaxUseBigger(e, t) {
    this._idMax(e) <= t && this._idMaxMap.set(e, t + 1);
  }
  load(e) {
    if (e) {
      this._map.has(e.worldId) && this._map.delete(e.worldId);
      this._map.set(e.worldId, new Map());
      if (e.scriptArray) for (let t of e.scriptArray) this.AddScript(e.worldId, t);
    }
  }
  getNodesByType(e, t) {
    let o = this._map.get(e);
    if (!o) return null;
    let i = [],
      n = Array.from(o.values());
    for (let e of n) {
      let o = [];
      o.push(e.data);
      for (; o.length > 0;) {
        let e = o.length;
        for (let n = 0; n < e; ++n) {
          let e = o.shift();
          if (null == e) continue;
          e.type == t && i.push(e);
          let n = G.GSUtil.getNodeChildsInfo(e),
            a = n.childs1,
            s = n.childs2;
          if (a) for (let e of a) o.push(e);
          if (s) for (let e of s) o.push(e);
        }
      }
    }
    return i;
  }
  getWorldSaveData(e, t) {
    if (!this._map.has(e)) return null;
    let o = [],
      i = this._map.get(e),
      n = Array.from(i.keys());
    for (let e of n) {
      if (t && t.indexOf(e) < 0) continue;
      let n = i.get(e);
      n && o.push(n);
    }
    return o;
  }
  CreateNewScript(e) {
    this._map.has(e) || this._map.set(e, new Map());
    let t = this.getWorldScriptDefaultNameNum(e);
    return {
      id: this._idMax(e),
      name: "Script " + t,
      data: C.GSDataNodeBuildHelper.NewGSDataNode(C.GSDataNodeType.G_Start)
    };
  }
  getWorldScriptDefaultNameNum(e) {
    if (!this._map.has(e)) return 1;
    let t = Array.from(this._map.get(e).values()),
      o = [];
    for (let e of t) o.push(e.name);
    return i.Util.getDefaultNameNum("Scripts", o);
  }
  AddScript(e, t) {
    if (t && t.data && t.data.childs && 0 != t.data.childs.length) {
      this._map.has(e) || this._map.set(e, new Map());
      if (-1 == t.id || this._map.get(e).has(t.id)) {
        t.id = this._idMax(e);
        this._idxMaxPlus(e);
      } else this._restIdxMaxUseBigger(e, t.id);
      this._map.get(e).set(t.id, t);
    }
  }
  RemoveScript(e, t) {
    this._map.has(e) && this._map.get(e).has(t) && this._map.get(e).delete(t);
  }
  GetScriptData(e, t) {
    return this._map.has(e) && this._map.get(e).get(t) ? this._map.get(e).get(t) : null;
  }
  ExcuteScript(e, t, o) {
    let i = this.GetScriptData(t, o);
    I.GSRunnerMng.instance.excuteByScriptData(e, i, !1);
  }
}
exports.GSMng = T;