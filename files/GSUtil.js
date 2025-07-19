"use strict";

exports.GSUtil = void 0;
const i = e("./GameScriptData");
exports.GSUtil = class {
  static getNodeChildsInfo(e) {
    let t, o;
    if (e) if (e.type == i.GSDataNodeType.G_Start) t = e.childs;else if (e.type == i.GSDataNodeType.GFLOW_If) t = e.childs;else if (e.type == i.GSDataNodeType.GFLOW_IfElse) {
      let i = e;
      t = i.childs_true;
      o = i.childs_false;
    }
    return {
      childs1: t,
      childs2: o
    };
  }
  static caculateNodeRenderHeight(e, t, o) {
    if (!e) return 0;
    let i = this.getNodeChildsInfo(e),
      n = t;
    if (i.childs1) {
      for (let e of i.childs1) {
        n += o;
        n += this.caculateNodeRenderHeight(e, t, o);
      }
      i.childs2 && (n += o);
    }
    if (i.childs2) {
      n += t;
      for (let e of i.childs2) {
        n += o;
        n += this.caculateNodeRenderHeight(e, t, o);
      }
    }
    return n;
  }
  static getTargetNodeStayedInChilds(e, t) {
    let o = null,
      i = [],
      n = [];
    i.push(t);
    for (; i.length > 0;) {
      let t = i.length;
      for (let a = 0; a < t; ++a) {
        let t = i.shift();
        if (null == t) {
          o = n.shift();
          continue;
        }
        let a = this.getNodeChildsInfo(t),
          s = a.childs1,
          r = a.childs2;
        if (t.id == e) return o;
        if (s) {
          i.push(null);
          n.push({
            parent: t,
            childs: s
          });
          for (let e of s) i.push(e);
        }
        if (r) {
          i.push(null);
          n.push({
            parent: t,
            childs: r
          });
          for (let e of r) i.push(e);
        }
      }
    }
    return null;
  }
};