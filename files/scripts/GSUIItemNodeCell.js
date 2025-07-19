"use strict";

var i,
  n = this && this.__decorate || function (e, t, o, i) {
    var n,
      a = arguments.length,
      s = a < 3 ? t : null === i ? i = Object.getOwnPropertyDescriptor(t, o) : i;
    if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) s = Reflect.decorate(e, t, o, i);else for (var r = e.length - 1; r >= 0; r--) (n = e[r]) && (s = (a < 3 ? n(s) : a > 3 ? n(t, o, s) : n(t, o)) || s);
    return a > 3 && s && Object.defineProperty(t, o, s), s;
  };
const a = e("../../GameScript/index"),
  s = e("./GSUIItemNodeInfoCell"),
  r = e("./NodeRender/GSDataNodeRender"),
  l = e("./NodeRender/GSDataNodeRenderFactory"),
  c = e("./SimpleNodeList"),
  {
    ccclass: d,
    property: h
  } = cc._decorator;
let p = i = class extends cc.Component {
  constructor() {
    super(...arguments);
    this.cellPrefab = null;
    this.nodeInfo1 = null;
    this.nodeInfo2 = null;
    this._inited = !1;
    this._depth = 0;
    this._parentNodeInfo = null;
    this._nodeData = null;
  }
  onLoad() {
    if (!this._inited) {
      this._inited = !0;
      this.node.on(r.GSDataNodeRenderEvent_Refresh, this.onNodeChange, this);
      this.node.on("OnAddNew", () => {
        this._parentNodeInfo && this._parentNodeInfo.onAddNew();
      }, this);
      this.node.on(c.default.ADD_NEW_ITEM, e => {
        this._parentNodeInfo && this._parentNodeInfo.node.emit(c.default.ADD_NEW_ITEM, e);
      }, this);
      this.node.on(c.default.SET_SELECT_ITEM_NODE, e => {
        if (this._nodeData) {
          if (this.nodeInfo1.node.active && this.nodeInfo1.childNodeDatas && this.nodeInfo1.childNodeDatas.length > 0) {
            let t = this.nodeInfo1.childNodeDatas,
              o = t.length;
            for (let i = 0; i < o; ++i) if (t[i].id == e) {
              this.nodeInfo1.childCellList.selectItem(i);
              return;
            }
          }
          if (this.nodeInfo2.node.active && this.nodeInfo2.childNodeDatas && this.nodeInfo2.childNodeDatas.length > 0) {
            let t = this.nodeInfo2.childNodeDatas,
              o = t.length;
            for (let i = 0; i < o; ++i) if (t[i].id == e) {
              this.nodeInfo2.childCellList.selectItem(i);
              return;
            }
          }
          this.nodeInfo1.node.active && this.nodeInfo1.childNodeDatas && this.nodeInfo1.childNodeDatas.length > 0 && this.nodeInfo1.childCellList.node.emit(c.default.SET_SELECT_ITEM_NODE, e);
          this.nodeInfo2.node.active && this.nodeInfo2.childNodeDatas && this.nodeInfo2.childNodeDatas.length > 0 && this.nodeInfo2.childCellList.node.emit(c.default.SET_SELECT_ITEM_NODE, e);
        }
      }, this);
      this.nodeInfo1.childCellList.node.on(c.default.SELECT_ITEM_NODE, (e, t) => {
        this.node.parent.emit(c.default.SELECT_ITEM_NODE, e, t);
      }, this);
      this.nodeInfo1.childCellList.callThis = this;
      this.nodeInfo1.childCellList.SetItemPrefab(this.cellPrefab.node, i);
      this.nodeInfo1.childCellList.itemRender = (e, t) => {
        this.nodeInfo1.childNodeDatas && this.nodeInfo1.childNodeDatas.length > e && t.setData(this._depth + 1, this.nodeInfo1.childNodeDatas[e], this.nodeInfo1);
      };
      this.nodeInfo1.childCellList.itemSize = (e, t) => {
        if (this.nodeInfo1.childNodeDatas && e < this.nodeInfo1.childNodeDatas.length) {
          let o = this.nodeInfo1.childNodeDatas[e],
            i = a.GSUtil.caculateNodeRenderHeight(o, 70, 2);
          t.x = 0;
          t.y = i;
        } else {
          t.x = 0;
          t.y = 0;
        }
      };
      this.nodeInfo2.childCellList.node.on(c.default.SELECT_ITEM_NODE, (e, t) => {
        this.node.parent.emit(c.default.SELECT_ITEM_NODE, e, t);
      }, this);
      this.nodeInfo2.childCellList.callThis = this;
      this.nodeInfo2.childCellList.SetItemPrefab(this.cellPrefab.node, i);
      this.nodeInfo2.childCellList.itemRender = (e, t) => {
        this.nodeInfo2.childNodeDatas && this.nodeInfo2.childNodeDatas.length > e && t.setData(this._depth + 1, this.nodeInfo2.childNodeDatas[e], this.nodeInfo2);
      };
      this.nodeInfo2.childCellList.itemSize = (e, t) => {
        if (this.nodeInfo2.childNodeDatas && e < this.nodeInfo2.childNodeDatas.length) {
          let o = this.nodeInfo2.childNodeDatas[e],
            i = a.GSUtil.caculateNodeRenderHeight(o, 70, 2);
          t.x = 0;
          t.y = i;
        } else {
          t.x = 0;
          t.y = 0;
        }
      };
    }
  }
  start() {
    this.onRefresh();
  }
  setData(e, t, o) {
    this.node.dataNodeId = t.id;
    this._depth = e;
    this._nodeData = t;
    this._parentNodeInfo = o;
    this.onRefresh();
  }
  onRefresh() {
    this._inited && l.GSDataNodeRenderFactory.instance.GetRender(this._nodeData.type).render(this._depth, this._nodeData, this);
  }
  onNodeChange() {
    l.GSDataNodeRenderFactory.instance.GetRender(this._nodeData.type).render(this._depth, this._nodeData, this);
  }
};
n([h(i)], p.prototype, "cellPrefab", void 0);
n([h(s.default)], p.prototype, "nodeInfo1", void 0);
n([h(s.default)], p.prototype, "nodeInfo2", void 0);
p = i = n([d], p);
exports.default = p;