"use strict";

exports.GSInstructionHelper = void 0;
const i = e("../GameScriptDefines"),
  n = e("../GameScriptValueType"),
  a = e("./GSExecuteBlock"),
  s = e("./GSExecuteCall"),
  r = e("./GSExecuteCompare"),
  l = e("./GSExecuteIf"),
  c = e("./GSExecuteIfElse"),
  d = e("./GSExecuteLogic"),
  h = e("./GSExecuteWhile"),
  p = e("./GSExecuteWhileCount"),
  u = e("../GSParam"),
  m = e("./GSExecuteBreak"),
  f = e("./GSExecuteAssign"),
  g = e("./GSExecuteCompute");
exports.GSInstructionHelper = class {
  static ProcessGSNode(e, t) {
    if (!e || !t) return;
    let o = this.CreateExecute(t, e.id);
    if (o) {
      o.e && e.pushInstruction(o.e);
      o.p && e.pushParam(o.p);
    }
  }
  static CreateExecute(e, t) {
    if (!e) return null;
    let o = {
      e: null,
      p: null
    };
    switch (e.nodeType) {
      case i.GSNodeType.BLOCK:
        {
          let t = e;
          exports.e = new a.GSExecuteBlock(t.childs);
        }
        break;
      case i.GSNodeType.VALUE:
        {
          let t,
            a = e;
          t = a.isRef ? a.refType == i.GSValueRefType.ITEM ? n.NewGSValue(i.GSValueType.STRING, a.value) : n.NewGSValue(i.GSValueType.INT, a.refId + "") : n.NewGSValue(a.valueType, a.value);
          exports.p = new u.GSParam(a.isRef, t, a.refType);
        }
        break;
      case i.GSNodeType.ASSIGN:
        {
          let t = e;
          exports.e = new f.GSExecuteAssign(t.a, t.b);
        }
        break;
      case i.GSNodeType.COMPUTE:
        {
          let t = e;
          exports.e = new g.GSExecuteCompute(t.computeType, t.a, t.b);
        }
        break;
      case i.GSNodeType.COMPARE:
        {
          let t = e;
          exports.e = new r.GSExecuteCompare(t.compareType, t.a, t.b);
        }
        break;
      case i.GSNodeType.LOGIC:
        {
          let t = e;
          exports.e = new d.GSExecuteLogic(t.logicType, t.a, t.b);
        }
        break;
      case i.GSNodeType.CALL:
        {
          let t = e;
          exports.e = new s.GSExecuteCall(t.cmdType, t.param);
        }
        break;
      case i.GSNodeType.IF:
        {
          let t = e;
          exports.e = new l.GSExecuteIf(t.compare, t.logic, t.block);
        }
        break;
      case i.GSNodeType.IF_ELSE:
        {
          let t = e;
          exports.e = new c.GSExecuteIfElse(t.compare, t.logic, t.block1, t.block2);
        }
        break;
      case i.GSNodeType.WHILE_COUNT:
        {
          let t = e;
          exports.e = new p.GSExecuteWhileCount(t.count, t.block);
        }
        break;
      case i.GSNodeType.WHILE:
        {
          let t = e;
          exports.e = new h.GSExecuteWhile(t.compare, t.logic, t.block);
        }
        break;
      case i.GSNodeType.BREAK:
        exports.e = new m.GSExecuteBreak();
        break;
      default:
        console.warn(`>>GSNode ${e.nodeType} not implements excute class.`);
    }
    o.e && (o.e.runnerId = t);
    return o;
  }
};