"use strict";

exports.GSNodeBuildHelper = exports.HaseReturnValue = exports.GSCmdType = exports.GSLogicType = exports.GSCompareType = exports.GSComputeType = exports.GSNodeType = exports.GSValueRefType = exports.GSValueType = void 0;
var i, n;
(function (e) {
  e[e.INT = 0] = "INT";
  e[e.FLOAT = 1] = "FLOAT";
  e[e.BOOL = 2] = "BOOL";
  e[e.STRING = 3] = "STRING";
})(o.GSValueType || (exports.GSValueType = {}));
(function (e) {
  e[e.VARIABLE = 0] = "VARIABLE";
  e[e.ITEM = 1] = "ITEM";
})(i = o.GSValueRefType || (exports.GSValueRefType = {}));
(function (e) {
  e[e.BLOCK = 0] = "BLOCK";
  e[e.VALUE = 1] = "VALUE";
  e[e.ASSIGN = 2] = "ASSIGN";
  e[e.COMPUTE = 3] = "COMPUTE";
  e[e.COMPARE = 4] = "COMPARE";
  e[e.LOGIC = 5] = "LOGIC";
  e[e.CALL = 6] = "CALL";
  e[e.IF = 7] = "IF";
  e[e.IF_ELSE = 8] = "IF_ELSE";
  e[e.WHILE_COUNT = 9] = "WHILE_COUNT";
  e[e.WHILE = 10] = "WHILE";
  e[e.BREAK = 11] = "BREAK";
  e[e.STOP = 12] = "STOP";
})(n = o.GSNodeType || (exports.GSNodeType = {}));
(function (e) {
  e[e.EQUAL = -1] = "EQUAL";
  e[e.ADD = 0] = "ADD";
  e[e.SUB = 1] = "SUB";
  e[e.MUL = 2] = "MUL";
  e[e.DIV = 3] = "DIV";
})(o.GSComputeType || (exports.GSComputeType = {}));
(function (e) {
  e[e.GREATER = 0] = "GREATER";
  e[e.GREATER_EQUAL = 1] = "GREATER_EQUAL";
  e[e.LESS = 2] = "LESS";
  e[e.LESS_EQUAL = 3] = "LESS_EQUAL";
  e[e.EQUAL = 4] = "EQUAL";
  e[e.NONEQUAL = 5] = "NONEQUAL";
})(o.GSCompareType || (exports.GSCompareType = {}));
(function (e) {
  e[e.AND = 0] = "AND";
  e[e.OR = 1] = "OR";
})(o.GSLogicType || (exports.GSLogicType = {}));
(function (e) {
  e[e.Test = 0] = "Test";
  e[e.SetVariable = 1] = "SetVariable";
  e[e.Wait = 2] = "Wait";
  e[e.Dialog = 3] = "Dialog";
  e[e.DropItem = 4] = "DropItem";
  e[e.ChangeBagItem = 5] = "ChangeBagItem";
  e[e.ChangeActorProperty = 6] = "ChangeActorProperty";
  e[e.ShowGameWin = 7] = "ShowGameWin";
  e[e.ShowGameOver = 8] = "ShowGameOver";
  e[e.SwitchMap = 9] = "SwitchMap";
  e[e.CameraShake = 10] = "CameraShake";
  e[e.PlaySfx = 11] = "PlaySfx";
  e[e.SwitchHero = 12] = "SwitchHero";
  e[e.ChangeHeroProperty = 13] = "ChangeHeroProperty";
  e[e.TimeCountDownStart = 14] = "TimeCountDownStart";
  e[e.TimeCountDownStop = 15] = "TimeCountDownStop";
})(o.GSCmdType || (exports.GSCmdType = {}));
exports.HaseReturnValue = function (e) {
  return e == n.VALUE || e == n.COMPUTE || e == n.COMPARE || e == n.LOGIC;
};
exports.GSNodeBuildHelper = class {
  static NewIGSNodeBlock() {
    return {
      nodeType: n.BLOCK,
      childs: []
    };
  }
  static NewIGSNodeValue(e, t, o, a) {
    return {
      nodeType: n.VALUE,
      isRef: e,
      refType: i.VARIABLE,
      refId: t,
      valueType: o,
      value: a
    };
  }
  static NewIGSNodeRefValue(e, t, o) {
    return {
      nodeType: n.VALUE,
      isRef: !0,
      refType: t,
      refId: e,
      valueType: 0,
      value: o
    };
  }
  static NewIGSNodeAsign(e, t) {
    return {
      nodeType: n.ASSIGN,
      a: e,
      b: t
    };
  }
  static NewIGSNodeCompute(e, t, o) {
    return {
      nodeType: n.COMPUTE,
      computeType: e,
      a: t,
      b: o
    };
  }
  static NewIGSNodeCompare(e, t, o) {
    return {
      nodeType: n.COMPARE,
      compareType: e,
      a: t,
      b: o
    };
  }
  static NewIGSNodeLogic(e, t, o) {
    return {
      nodeType: n.LOGIC,
      logicType: e,
      a: t,
      b: o
    };
  }
  static NewIGSNodeCall(e, t) {
    return {
      nodeType: n.CALL,
      cmdType: e,
      param: t
    };
  }
  static NewIGSNodeIf(e, t, o) {
    return {
      nodeType: n.IF,
      compare: e,
      logic: t,
      block: o
    };
  }
  static NewIGSNodeIfElse(e, t, o, i) {
    return {
      nodeType: n.IF_ELSE,
      compare: e,
      logic: t,
      block1: o,
      block2: i
    };
  }
  static NewIGSNodeWhileCount(e, t) {
    return {
      nodeType: n.WHILE_COUNT,
      count: e,
      block: t
    };
  }
  static NewIGSNodeWhile(e, t, o) {
    return {
      nodeType: n.WHILE,
      compare: e,
      logic: t,
      block: o
    };
  }
  static NewIGSNodeBreak() {
    return {
      nodeType: n.BREAK
    };
  }
};