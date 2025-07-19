"use strict";

exports.GSDataNodeBuildHelper = exports.GSDataNodeType = exports.ActPropertyValueType = exports.ActType = exports.GSSelectValueType = exports.GSComputeTypeStrMap = exports.GSCompareTypeStrMap = exports.GSPerDepthNodeCount = void 0;
const i = e("./GameScriptDefines");
exports.GSPerDepthNodeCount = 1e4;
exports.GSCompareTypeStrMap = new Map([[i.GSCompareType.GREATER, ">"], [i.GSCompareType.GREATER_EQUAL, ">="], [i.GSCompareType.LESS, "<"], [i.GSCompareType.LESS_EQUAL, "<="], [i.GSCompareType.EQUAL, "="]]);
exports.GSComputeTypeStrMap = new Map([[i.GSComputeType.EQUAL, "设置为"], [i.GSComputeType.ADD, "加上"], [i.GSComputeType.SUB, "减去"], [i.GSComputeType.MUL, "乘以"], [i.GSComputeType.DIV, "除以"]]);
var n, a, s;
(function (e) {
  e[e.Variable = 0] = "Variable";
  e[e.Item = 1] = "Item";
})(n = o.GSSelectValueType || (exports.GSSelectValueType = {}));
(function (e) {
  e[e.Tile = 0] = "Tile";
  e[e.Hero = 1] = "Hero";
  e[e.Enemy = 2] = "Enemy";
  e[e.Npc = 3] = "Npc";
  e[e.Device = 4] = "Device";
})(a = o.ActType || (exports.ActType = {}));
(function (e) {
  e[e.Float = 0] = "Float";
  e[e.Bool = 1] = "Bool";
  e[e.Weapon = 2] = "Weapon";
})(o.ActPropertyValueType || (exports.ActPropertyValueType = {}));
(function (e) {
  e[e.G_Start = 1] = "G_Start";
  e[e.G_Add = 2] = "G_Add";
  e[e.GFLOW_If = 1001] = "GFLOW_If";
  e[e.GFLOW_IfElse = 1002] = "GFLOW_IfElse";
  e[e.GFLOW_WAIT = 1003] = "GFLOW_WAIT";
  e[e.GINTERACTION_Dialog = 2001] = "GINTERACTION_Dialog";
  e[e.GDATA_DropItem = 3001] = "GDATA_DropItem";
  e[e.GDATA_ChangeBagItem = 3002] = "GDATA_ChangeBagItem";
  e[e.GDATA_ChangeVariable = 3003] = "GDATA_ChangeVariable";
  e[e.GDATA_ChangeActorProperty = 3004] = "GDATA_ChangeActorProperty";
  e[e.GDATA_ChangeHeroProperty = 3005] = "GDATA_ChangeHeroProperty";
  e[e.GSYS_ShowGameWin = 4001] = "GSYS_ShowGameWin";
  e[e.GSYS_ShowGameOver = 4002] = "GSYS_ShowGameOver";
  e[e.GSYS_SwitchMap = 4003] = "GSYS_SwitchMap";
  e[e.GSYS_SwitchHero = 4004] = "GSYS_SwitchHero";
  e[e.GSYS_TimeCountDownStart = 4005] = "GSYS_TimeCountDownStart";
  e[e.GSYS_TimeCountDownStop = 4006] = "GSYS_TimeCountDownStop";
  e[e.GSCREEN_CameraShake = 5001] = "GSCREEN_CameraShake";
  e[e.GSOUND_PlaySfx = 6001] = "GSOUND_PlaySfx";
})(s = o.GSDataNodeType || (exports.GSDataNodeType = {}));
class r {
  static ResetDataNodeIdx(e) {
    this._dataNodeIdx = e;
  }
  static NewGSDataCompareValue() {
    return {
      type: n.Variable,
      compare: i.GSCompareType.EQUAL
    };
  }
  static NewGSDataConditione(e) {
    return {
      a: e,
      logicType: i.GSLogicType.AND,
      next: null
    };
  }
  static NewGSDataDialogueLine() {
    return {
      actorConfId: null,
      dialogue: ""
    };
  }
  static NewGSDataNode(e) {
    let t = null;
    switch (e) {
      case s.G_Start:
        t = this.NewGSDataNodeStart();
        break;
      case s.G_Add:
        t = this.NewGSDataNodeAdd();
        break;
      case s.GFLOW_If:
        t = this.NewGSDataNodeFlowIf();
        break;
      case s.GFLOW_IfElse:
        t = this.NewGSDataNodeFlowIfElse();
        break;
      case s.GFLOW_WAIT:
        t = this.NewGSDataNodeFlowWait();
        break;
      case s.GINTERACTION_Dialog:
        t = this.NewGSDataNodeInteractionDialog();
        break;
      case s.GDATA_DropItem:
        t = this.NewGSDataNodeDataDropItem();
        break;
      case s.GDATA_ChangeBagItem:
        t = this.NewGSDataNodeDataChangeBagItem();
        break;
      case s.GDATA_ChangeVariable:
        t = this.NewGSDataNodeDataChangeVariable();
        break;
      case s.GDATA_ChangeActorProperty:
        t = this.NewGSDataNodeDataChangeActorProperty();
        break;
      case s.GDATA_ChangeHeroProperty:
        t = this.NewGSDataNodeDataChangeHeroProperty();
        break;
      case s.GSYS_ShowGameWin:
        t = this.NewGSDataNodeSysShowGameWin();
        break;
      case s.GSYS_ShowGameOver:
        t = this.NewGSDataNodeSysShowGameOver();
        break;
      case s.GSYS_SwitchMap:
        t = this.NewGSDataNodeSysSwitchMap();
        break;
      case s.GSYS_SwitchHero:
        t = this.NewGSDataNodeSysSwitchHero();
        break;
      case s.GSYS_TimeCountDownStart:
        t = this.NewGSDataNodeSysTimeCountDownStart();
        break;
      case s.GSYS_TimeCountDownStop:
        t = this.NewGSDataNodeSysTimeCountDownStop();
        break;
      case s.GSCREEN_CameraShake:
        t = this.NewGSDataNodeScreenCameraShake();
        break;
      case s.GSOUND_PlaySfx:
        t = this.NewGSDataNodeSoundPlaySfx();
    }
    t.id = this._dataNodeIdx++;
    return t;
  }
  static NewGSDataNodeStart() {
    return {
      type: s.G_Start,
      childs: [r.NewGSDataNode(s.G_Add)]
    };
  }
  static NewGSDataNodeAdd() {
    return {
      type: s.G_Add
    };
  }
  static NewGSDataNodeFlowIf() {
    return {
      type: s.GFLOW_If,
      condition: {
        a: null,
        logicType: i.GSLogicType.AND,
        next: null
      },
      childs: [r.NewGSDataNode(s.G_Add)]
    };
  }
  static NewGSDataNodeFlowIfElse() {
    return {
      type: s.GFLOW_IfElse,
      condition: {
        a: null,
        logicType: i.GSLogicType.AND,
        next: null
      },
      childs_true: [r.NewGSDataNode(s.G_Add)],
      childs_false: [r.NewGSDataNode(s.G_Add)]
    };
  }
  static NewGSDataNodeFlowWait() {
    return {
      type: s.GFLOW_WAIT,
      waitSecond: 0
    };
  }
  static NewGSDataNodeInteractionDialog() {
    return {
      type: s.GINTERACTION_Dialog,
      dialogueLines: []
    };
  }
  static NewGSDataNodeDataDropItem() {
    return {
      type: s.GDATA_DropItem,
      compareValue: 1,
      useGravity: !1
    };
  }
  static NewGSDataNodeDataChangeBagItem() {
    return {
      type: s.GDATA_ChangeBagItem,
      addValue: 1,
      isReduce: !1
    };
  }
  static NewGSDataNodeDataChangeVariable() {
    return {
      type: s.GDATA_ChangeVariable,
      v: i.GSNodeBuildHelper.NewIGSNodeValue(!0, -1, i.GSValueType.FLOAT, "0"),
      hasCompute: !1,
      computeType: i.GSComputeType.ADD,
      a: i.GSNodeBuildHelper.NewIGSNodeValue(!1, -1, i.GSValueType.FLOAT, "0")
    };
  }
  static NewGSDataNodeDataChangeActorProperty() {
    return {
      type: s.GDATA_ChangeActorProperty,
      actorId: null,
      actType: a.Hero,
      opType: -1,
      propertyName: "",
      propertyValue: "0",
      isTileUnit: !1
    };
  }
  static NewGSDataNodeDataChangeHeroProperty() {
    return {
      type: s.GDATA_ChangeHeroProperty,
      opType: -1,
      propertyName: "",
      propertyValue: "0",
      isTileUnit: !1
    };
  }
  static NewGSDataNodeSysShowGameWin() {
    return {
      type: s.GSYS_ShowGameWin,
      content: ""
    };
  }
  static NewGSDataNodeSysShowGameOver() {
    return {
      type: s.GSYS_ShowGameOver,
      content: ""
    };
  }
  static NewGSDataNodeSysSwitchMap() {
    return {
      type: s.GSYS_SwitchMap,
      worldId: null,
      coor: {
        iCol: 0,
        iRow: 0
      }
    };
  }
  static NewGSDataNodeSysSwitchHero() {
    return {
      type: s.GSYS_SwitchHero,
      confId: null
    };
  }
  static NewGSDataNodeSysTimeCountDownStart() {
    return {
      type: s.GSYS_TimeCountDownStart,
      timer: 10,
      timerType: 0,
      evts: []
    };
  }
  static NewGSDataNodeSysTimeCountDownStop() {
    return {
      type: s.GSYS_TimeCountDownStop
    };
  }
  static NewGSDataNodeScreenCameraShake() {
    return {
      type: s.GSCREEN_CameraShake,
      speed: 200,
      range: 6,
      times: 3
    };
  }
  static NewGSDataNodeSoundPlaySfx() {
    return {
      type: s.GSOUND_PlaySfx,
      data: i.GSNodeBuildHelper.NewIGSNodeCall(i.GSCmdType.PlaySfx, {})
    };
  }
}
exports.GSDataNodeBuildHelper = r;
r._dataNodeIdx = 0;