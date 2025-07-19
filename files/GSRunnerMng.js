"use strict";

exports.GSRunnerMng = void 0;
const i = e("./GameScriptDefines"),
  n = e("./executes/GSInstructionHelper"),
  a = e("./GSRunner"),
  s = e("./GameScriptData"),
  r = e("./GSVariableMng");
class l {
  constructor() {
    this._idMax = 1;
    this._runnerMap = new Map();
    this._isDirty = !1;
  }
  static get instance() {
    this._instance = this._instance || new l();
    return this._instance;
  }
  excuteScript(e, t, o) {
    null == o && (o = null);
    let i = this._idMax++,
      s = new a.GSRunner(i, t);
    s.actor = o;
    for (let t = e.length - 1; t >= 0; --t) n.GSInstructionHelper.ProcessGSNode(s, e[t]);
    this._runnerMap.set(i, s);
    this._isDirty = !0;
    s.excute();
  }
  excuteByScriptData(e, t, o) {
    if (!t) return;
    if (!o) {
      let o = Array.from(this._runnerMap.values());
      if (o) for (let i of o) if (i.actor == e && i.scriptDataId == t.id) return;
    }
    let i = this.parseDataNode(t.data);
    i && this.excuteScript([i], t.id, e);
  }
  getRunner(e) {
    return this._runnerMap.has(e) ? this._runnerMap.get(e) : null;
  }
  step() {
    !this._isDirty && this._runnerArray || (this._runnerArray = Array.from(this._runnerMap.values()));
    for (let e of this._runnerArray) {
      e.step();
      if (e.isComplete()) {
        this._runnerMap.delete(e.id);
        this._isDirty = !0;
      }
    }
  }
  parseDataCondition(e) {
    let t = [],
      o = e;
    for (; o;) {
      t.push(o);
      o = o.next;
    }
    let n,
      a = [];
    for (; t.length > 0;) {
      let e = t.pop(),
        o = e.a;
      if (e.a) {
        let t,
          l = i.GSValueType.FLOAT;
        if (e.a.type == s.GSSelectValueType.Item) t = i.GSNodeBuildHelper.NewIGSNodeRefValue(-1, i.GSValueRefType.ITEM, o.itemId);else {
          t = i.GSNodeBuildHelper.NewIGSNodeValue(!0, o.variableId, i.GSValueType.FLOAT, null);
          let e = r.GSVariableMng.instance.getVariable(t.refId);
          e && (l = e.valueType);
        }
        let c = null;
        o.compareVariableId > 0 ? r.GSVariableMng.instance.getVariable(o.compareVariableId) && (c = i.GSNodeBuildHelper.NewIGSNodeValue(!0, o.compareVariableId, i.GSValueType.FLOAT, null)) : c = i.GSNodeBuildHelper.NewIGSNodeValue(!1, -1, l, o.compareValue + "");
        let d = i.GSNodeBuildHelper.NewIGSNodeCompare(o.compare, t, c),
          h = i.GSNodeBuildHelper.NewIGSNodeLogic(e.logicType, d, n);
        a.push(h);
        n = h;
      }
    }
    return n;
  }
  parseDataNode(e) {
    if (!e) return null;
    let t = null;
    switch (e.type) {
      case s.GSDataNodeType.G_Start:
        {
          let o = e,
            n = t = i.GSNodeBuildHelper.NewIGSNodeBlock();
          if (o.childs) for (let e of o.childs) {
            let t = this.parseDataNode(e);
            t && n.childs.push(t);
          }
        }
        break;
      case s.GSDataNodeType.G_Add:
        break;
      case s.GSDataNodeType.GFLOW_If:
        {
          let o = e,
            n = this.parseDataCondition(o.condition),
            a = t = i.GSNodeBuildHelper.NewIGSNodeBlock();
          if (o.childs) for (let e of o.childs) {
            let t = this.parseDataNode(e);
            t && a.childs.push(t);
          }
          t = i.GSNodeBuildHelper.NewIGSNodeIf(null, n, a);
        }
        break;
      case s.GSDataNodeType.GFLOW_IfElse:
        {
          let o = e,
            n = this.parseDataCondition(o.condition),
            a = t = i.GSNodeBuildHelper.NewIGSNodeBlock();
          if (o.childs_true) for (let e of o.childs_true) {
            let t = this.parseDataNode(e);
            t && a.childs.push(t);
          }
          let s = t = i.GSNodeBuildHelper.NewIGSNodeBlock();
          if (o.childs_false) for (let e of o.childs_false) {
            let t = this.parseDataNode(e);
            t && s.childs.push(t);
          }
          t = i.GSNodeBuildHelper.NewIGSNodeIfElse(null, n, a, s);
        }
        break;
      case s.GSDataNodeType.GFLOW_WAIT:
        {
          let o = e;
          t = i.GSNodeBuildHelper.NewIGSNodeCall(i.GSCmdType.Wait, o.waitSecond);
        }
        break;
      case s.GSDataNodeType.GINTERACTION_Dialog:
        {
          let o = e;
          t = i.GSNodeBuildHelper.NewIGSNodeCall(i.GSCmdType.Dialog, o.dialogueLines);
        }
        break;
      case s.GSDataNodeType.GDATA_DropItem:
        {
          let o = e;
          t = i.GSNodeBuildHelper.NewIGSNodeCall(i.GSCmdType.DropItem, {
            itemId: o.itemId,
            compareValue: o.compareValue,
            useGravity: o.useGravity
          });
        }
        break;
      case s.GSDataNodeType.GDATA_ChangeBagItem:
        {
          let o = e;
          t = i.GSNodeBuildHelper.NewIGSNodeCall(i.GSCmdType.ChangeBagItem, {
            itemId: o.itemId,
            addValue: o.addValue,
            isReduce: o.isReduce
          });
        }
        break;
      case s.GSDataNodeType.GDATA_ChangeVariable:
        {
          let o = e;
          if (o.hasCompute) {
            let e = i.GSNodeBuildHelper.NewIGSNodeCompute(o.computeType, o.v, o.a);
            t = i.GSNodeBuildHelper.NewIGSNodeAsign(o.v, e);
          } else t = i.GSNodeBuildHelper.NewIGSNodeAsign(o.v, o.a);
        }
        break;
      case s.GSDataNodeType.GDATA_ChangeActorProperty:
        {
          let o = e;
          t = i.GSNodeBuildHelper.NewIGSNodeCall(i.GSCmdType.ChangeActorProperty, {
            actorId: o.actorId,
            actType: o.actType,
            opType: o.opType,
            propertyName: o.propertyName,
            propertyValue: o.propertyValue,
            isTileUnit: o.isTileUnit
          });
        }
        break;
      case s.GSDataNodeType.GDATA_ChangeHeroProperty:
        {
          let o = e;
          t = i.GSNodeBuildHelper.NewIGSNodeCall(i.GSCmdType.ChangeHeroProperty, {
            opType: o.opType,
            propertyName: o.propertyName,
            propertyValue: o.propertyValue,
            isTileUnit: o.isTileUnit
          });
        }
        break;
      case s.GSDataNodeType.GSYS_ShowGameWin:
        {
          let o = e;
          t = i.GSNodeBuildHelper.NewIGSNodeCall(i.GSCmdType.ShowGameWin, {
            content: o.content
          });
        }
        break;
      case s.GSDataNodeType.GSYS_ShowGameOver:
        {
          let o = e;
          t = i.GSNodeBuildHelper.NewIGSNodeCall(i.GSCmdType.ShowGameOver, {
            content: o.content
          });
        }
        break;
      case s.GSDataNodeType.GSYS_SwitchMap:
        {
          let o = e;
          t = i.GSNodeBuildHelper.NewIGSNodeCall(i.GSCmdType.SwitchMap, {
            worldId: o.worldId,
            coor: o.coor
          });
        }
        break;
      case s.GSDataNodeType.GSYS_SwitchHero:
        {
          let o = e;
          t = i.GSNodeBuildHelper.NewIGSNodeCall(i.GSCmdType.SwitchHero, {
            confId: o.confId
          });
        }
        break;
      case s.GSDataNodeType.GSYS_TimeCountDownStart:
        {
          let o = e;
          t = i.GSNodeBuildHelper.NewIGSNodeCall(i.GSCmdType.TimeCountDownStart, {
            timer: o.timer,
            timerType: o.timerType,
            evts: o.evts
          });
        }
        break;
      case s.GSDataNodeType.GSYS_TimeCountDownStop:
        t = i.GSNodeBuildHelper.NewIGSNodeCall(i.GSCmdType.TimeCountDownStop, {});
        break;
      case s.GSDataNodeType.GSCREEN_CameraShake:
        {
          let o = e;
          t = i.GSNodeBuildHelper.NewIGSNodeCall(i.GSCmdType.CameraShake, {
            speed: o.speed,
            range: o.range,
            times: o.times
          });
        }
        break;
      case s.GSDataNodeType.GSOUND_PlaySfx:
    }
    return t;
  }
}
exports.GSRunnerMng = l;