"use strict";

var i = this && this.__decorate || function (e, t, o, i) {
  var n,
    a = arguments.length,
    s = a < 3 ? t : null === i ? i = Object.getOwnPropertyDescriptor(t, o) : i;
  if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) s = Reflect.decorate(e, t, o, i);else for (var r = e.length - 1; r >= 0; r--) (n = e[r]) && (s = (a < 3 ? n(s) : a > 3 ? n(t, o, s) : n(t, o)) || s);
  return a > 3 && s && Object.defineProperty(t, o, s), s;
};
const n = e("../index"),
  a = e("../GameScriptDefines"),
  s = e("../GSMng"),
  r = e("../GSRunnerMng"),
  {
    ccclass: l,
    property: c
  } = cc._decorator;
let d = class extends cc.Component {
  onLoad() {
    s.GSMng.instance;
    let e = 0,
      t = [],
      o = n.GSVariableMng.instance.addNewVariable({
        id: "1:1:1",
        idx: 0,
        name: "a",
        desc: "",
        valueType: n.GSValueType.INT,
        defaultValue: "11",
        readonly: !1
      }),
      i = n.GSVariableMng.instance.addNewVariable({
        id: "1:1:2",
        idx: 1,
        name: "b",
        desc: "",
        valueType: n.GSValueType.INT,
        defaultValue: "20",
        readonly: !1
      }),
      l = n.GSNodeBuildHelper.NewIGSNodeValue(!0, o, n.GSValueType.INT, null),
      c = n.GSNodeBuildHelper.NewIGSNodeValue(!0, i, n.GSValueType.INT, null),
      d = n.GSNodeBuildHelper.NewIGSNodeValue(!1, -1, n.GSValueType.INT, "15"),
      h = n.GSNodeBuildHelper.NewIGSNodeValue(!1, -1, n.GSValueType.INT, "1"),
      p = n.GSNodeBuildHelper.NewIGSNodeCall(n.GSCmdType.Test, "" + e++);
    t.push(p);
    let u = n.GSNodeBuildHelper.NewIGSNodeBlock();
    for (let t = 0; t < 5; ++t) {
      p = n.GSNodeBuildHelper.NewIGSNodeCall(n.GSCmdType.Test, "" + e++);
      u.childs.push(p);
      let o = n.GSNodeBuildHelper.NewIGSNodeCall(n.GSCmdType.Wait, 1);
      u.childs.push(o);
      if (2 == t) {
        let e = n.GSNodeBuildHelper.NewIGSNodeBlock();
        e.childs.push(n.GSNodeBuildHelper.NewIGSNodeBreak());
        let t = n.GSNodeBuildHelper.NewIGSNodeCompare(n.GSCompareType.EQUAL, l, d),
          o = n.GSNodeBuildHelper.NewIGSNodeIf(t, null, e);
        u.childs.push(o);
        let i = n.GSNodeBuildHelper.NewIGSNodeCompute(a.GSComputeType.ADD, l, h),
          s = n.GSNodeBuildHelper.NewIGSNodeAsign(l, i);
        u.childs.push(s);
      }
    }
    let m = n.GSNodeBuildHelper.NewIGSNodeBlock();
    for (let t = 0; t < 5; ++t) {
      (p = n.GSNodeBuildHelper.NewIGSNodeCall(n.GSCmdType.Test, "" + e++)).param = "" + e++;
      m.childs.push(p);
    }
    let f = n.GSNodeBuildHelper.NewIGSNodeCompare(n.GSCompareType.LESS_EQUAL, l, c),
      g = n.GSNodeBuildHelper.NewIGSNodeLogic(n.GSLogicType.AND, f, null),
      y = n.GSNodeBuildHelper.NewIGSNodeWhile(null, g, u);
    t.push(y);
    r.GSRunnerMng.instance.excuteScript(t, -1);
  }
  start() {}
  update() {
    r.GSRunnerMng.instance.step();
  }
};
d = i([l], d);
exports.default = d;