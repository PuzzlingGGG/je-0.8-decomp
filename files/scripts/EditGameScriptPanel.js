"use strict";

var i = this && this.__decorate || function (e, t, o, i) {
    var n,
      a = arguments.length,
      s = a < 3 ? t : null === i ? i = Object.getOwnPropertyDescriptor(t, o) : i;
    if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) s = Reflect.decorate(e, t, o, i);else for (var r = e.length - 1; r >= 0; r--) (n = e[r]) && (s = (a < 3 ? n(s) : a > 3 ? n(t, o, s) : n(t, o)) || s);
    return a > 3 && s && Object.defineProperty(t, o, s), s;
  },
  n = this && this.__awaiter || function (e, t, o, i) {
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
const a = e("../../GameScript/index"),
  s = e("../../CustomUI/Button"),
  r = e("../../Frame/Panel"),
  l = e("./SimpleNodeList"),
  c = e("./GSUIItemNodeCell"),
  d = e("../../CustomUI/Layout/AutoFixedSizeByTargetNode"),
  h = e("../../Frame/SceneManager"),
  p = e("../../Frame/Top"),
  u = e("../../Scene/EditWorldScene/EditWorldScene"),
  m = e("../../Frame/Util"),
  f = e("../../Frame/UIColor"),
  g = e("../../Game/Player/Mng"),
  {
    ccclass: y,
    property: v
  } = cc._decorator;
let C = class extends r.default {
  constructor() {
    super(...arguments);
    this.returnBtn = null;
    this.scriptBtn = null;
    this.nameEditbox = null;
    this.selectBg = null;
    this.selectFg = null;
    this.nodeList = null;
    this.itemCellContent = null;
    this.itemCell = null;
    this.upBtn = null;
    this.downBtn = null;
    this.addBtn = null;
    this.delBtn = null;
    this.saveBtn = null;
    this._scriptData = null;
    this.oriScript = null;
    this.evt = null;
    this.saveCall = null;
    this._maxNodeId = 0;
    this._selectId = -1;
    this._selectBgY = 0;
  }
  onLoad() {
    super.onLoad();
    this.itemCell && (this.itemCell.node.active = !1);
    this.nodeList.SetItemPrefab(this.itemCell.node, c.default);
    this.nodeList.itemRender = this.onRenderNodeItem;
    this.nodeList.itemSize = (e, t) => {
      let o,
        i = 0;
      if (0 == e) i = this.itemCell.node.height;else {
        o = this._scriptData.data.childs[e - 1];
        i = a.GSUtil.caculateNodeRenderHeight(o, this.itemCell.node.height, 2);
      }
      t.x = 0;
      t.y = i;
    };
    this.nodeList.callThis = this;
    this.scriptBtn.node.active = !1;
    this.returnBtn.node.on(s.default.CLICK, this.onClickReturn, this);
    this.scriptBtn.node.on(s.default.CLICK, this.onClickScript, this);
    this.upBtn.node.on(s.default.CLICK, this.onClickUp, this);
    this.downBtn.node.on(s.default.CLICK, this.onClickDown, this);
    this.addBtn.node.on(s.default.CLICK, this.onClickAdd, this);
    this.delBtn.node.on(s.default.CLICK, this.onClickDel, this);
    this.saveBtn.node.on(s.default.CLICK, this.onClickSave, this);
    this.nodeList.node.on(l.default.SELECT_ITEM_NODE, this.onSelectNodeItem, this);
    this.node.on(l.default.ADD_NEW_ITEM, e => {
      this.nodeList.numberItems = this._scriptData.data.childs.length + 1;
      this.setSelectNodeData(e);
    }, this);
  }
  setData(e, t) {
    return n(this, void 0, void 0, function* () {
      yield g.Mng.Ins.actorMng.loadAll();
      yield g.Mng.Ins.propMng.loadAll();
      this.evt = t;
      this.evt.extra = t.extra || -1;
      this._worldId = e;
      this.oriScript = a.GSMng.instance.GetScriptData(e, this.evt.extra);
      let o = m.Util.deepCopy(this.oriScript);
      o = this.oriScript ? m.Util.deepCopy(this.oriScript) : a.GSMng.instance.CreateNewScript(e);
      this._scriptData = o;
      this._maxNodeId = 1;
      this.dfsTreeGetMaxNodeId(o.data);
      a.GSDataNodeBuildHelper.ResetDataNodeIdx(this._maxNodeId + 1);
      0 != o.data.childs.length && o.data.childs[o.data.childs.length - 1].type == a.GSDataNodeType.G_Add || o.data.childs.push(a.GSDataNodeBuildHelper.NewGSDataNode(a.GSDataNodeType.G_Add));
      this.nodeList.numberItems = o.data.childs.length + 1;
      this.selectBg.height = 0;
      this.selectFg.height = 0;
      this.nameEditbox.string = o.name;
    });
  }
  onClickReturn() {
    let e = h.default.ins.findScene(u.default);
    if (e && e.world && e.world.worldData && e.world.worldData.belongGameId) {
      this.closePanel();
      return;
    }
    let t = !0;
    this.oriScript && (t = !m.Util.deepCompare(this.oriScript, this._scriptData));
    t ? h.default.ins.OpenPanelByName("MessageBox", e => {
      e.label.string = "保存退出？";
      e.setLeftBtn({
        text: "放弃修改",
        color: f.UIColor.pink,
        call: () => n(this, void 0, void 0, function* () {
          this.closePanel();
        })
      });
      e.setRightBtn({
        text: "保存",
        color: f.UIColor.blue,
        call: () => {
          this.onClickSave();
        }
      });
    }) : this.closePanel();
  }
  onClickSave() {
    return n(this, void 0, void 0, function* () {
      this._scriptData.name = this.nameEditbox.string;
      this.evt.extra = this._scriptData.id;
      this.closePanel();
      this.saveCall && this.saveCall(this.evt);
      let e = h.default.ins.findScene(u.default);
      if (e && e.world && e.world.worldData && e.world.worldData.belongGameId) {
        p.default.showToast("模版地图不能保存");
        return;
      }
      let t = a.GSMng.instance.GetScriptData(this._worldId, this._scriptData.id);
      if (t) {
        t.name = this._scriptData.name;
        t.data = this._scriptData.data;
      } else a.GSMng.instance.AddScript(this._worldId, this._scriptData);
      p.default.showToast("已保存");
      if (e && e.world && e.world.worldLayout) {
        e.world.worldLayout.gsData || (e.world.worldLayout.gsData = {
          worldId: this._worldId,
          scriptArray: []
        });
        let t = e.world.worldLayout.gsData.scriptArray,
          o = t.length,
          i = !1;
        if (o > 0) for (let e = 0; e < o; ++e) if (t[e].id == this._scriptData.id) {
          t[e] = this._scriptData;
          i = !0;
          break;
        }
        i || t.push(this._scriptData);
      }
    });
  }
  setSelectNodeData(e) {
    if (!this._scriptData || !this._scriptData.data || !this._scriptData.data.childs) return;
    let t = this._scriptData.data.childs,
      o = t.length,
      i = -1;
    if (0 == o) i = 0;else for (let n = 0; n < o; ++n) if (t[n].id == e) {
      i = n + 1;
      break;
    }
    i >= 0 ? this.scheduleOnce(() => {
      this.nodeList.selectItem(i);
    }, .1) : this.scheduleOnce(() => {
      this.nodeList.node.emit(l.default.SET_SELECT_ITEM_NODE, e);
    }, .1);
  }
  onClickScript() {}
  onClickUp() {
    this.moveNodeUp(this._selectId, null, -1);
  }
  onClickDown() {
    this.moveNodeDown(this._selectId, null, -1);
  }
  moveNodeUp(e, t, o) {
    let i = null,
      n = null,
      s = -1;
    if (i && e <= 0) {
      i = this._scriptData.data.childs;
      e < 0 && (s = i.length - 1);
    } else {
      let o = a.GSUtil.getTargetNodeStayedInChilds(e, this._scriptData.data);
      i = o && o.childs;
      n = o && o.parent;
      i || t || (i = this._scriptData.data.childs);
    }
    if (i) {
      for (let t = 0; t < i.length; ++t) if (i[t].id == e) {
        s = t;
        break;
      }
      if (t && t.length > 0 && o >= 0 && o < t.length) {
        s < 0 && (s = 0);
        let e = t[o];
        i.splice(s, 0, t[o]);
        t.splice(o, 1);
        this.nodeList.numberItems = this._scriptData.data.childs.length + 1;
        this.setSelectNodeData(e.id);
      } else if (s >= 0 && s < i.length) {
        if (i[s].type == a.GSDataNodeType.G_Add) return;
        if (0 == s) {
          if (n) {
            let t = a.GSUtil.getNodeChildsInfo(n);
            if (t && t.childs1 && t.childs1 != i) {
              let o = i[s];
              i.splice(s, 1);
              t.childs1[t.childs1.length - 1].type == a.GSDataNodeType.G_Add ? t.childs1.splice(t.childs1.length - 1, 0, o) : t.childs1.push(o);
              this.nodeList.numberItems = this._scriptData.data.childs.length + 1;
              this.setSelectNodeData(e);
            } else n.id > 0 && this.moveNodeUp(n.id, i, s);
          }
        } else {
          let t = a.GSUtil.getNodeChildsInfo(i[s - 1]);
          if (t.childs2) {
            let o = i[s];
            i.splice(s, 1);
            t.childs2[t.childs2.length - 1].type == a.GSDataNodeType.G_Add ? t.childs2.splice(t.childs2.length - 1, 0, o) : t.childs2.push(o);
            this.nodeList.numberItems = this._scriptData.data.childs.length + 1;
            this.setSelectNodeData(e);
          } else if (t.childs1) {
            let o = i[s];
            i.splice(s, 1);
            t.childs1[t.childs1.length - 1].type == a.GSDataNodeType.G_Add ? t.childs1.splice(t.childs1.length - 1, 0, o) : t.childs1.push(o);
            this.nodeList.numberItems = this._scriptData.data.childs.length + 1;
            this.setSelectNodeData(e);
          } else if (s - 1 >= 0 && i[s].type != a.GSDataNodeType.G_Add) {
            let t = i[s];
            i[s] = i[s - 1];
            i[s - 1] = t;
            this.nodeList.numberItems = this._scriptData.data.childs.length + 1;
            this.setSelectNodeData(e);
          }
        }
      }
    }
  }
  moveNodeDown(e, t, o) {
    let i = null,
      n = null,
      s = -1;
    if (e <= 0) (i = this._scriptData.data.childs) && e < 0 && (s = i.length - 1);else {
      let o = a.GSUtil.getTargetNodeStayedInChilds(e, this._scriptData.data);
      i = o && o.childs;
      n = o && o.parent;
      i || t || (i = this._scriptData.data.childs);
    }
    if (i) {
      for (let t = 0; t < i.length; ++t) if (i[t].id == e) {
        s = t;
        break;
      }
      if (t && t.length > 0 && o >= 0 && o < t.length) {
        let e = t[o];
        s < 0 && (s = 0);
        i[s].type == a.GSDataNodeType.G_Add && --s;
        i.splice(s + 1, 0, t[o]);
        t.splice(o, 1);
        this.nodeList.numberItems = this._scriptData.data.childs.length + 1;
        this.setSelectNodeData(e.id);
      } else if (s >= 0 && s < i.length) {
        if (i[s].type == a.GSDataNodeType.G_Add) return;
        let t = s == i.length - 1;
        !t && s + 1 < i.length && i[s + 1].type == a.GSDataNodeType.G_Add && (t = !0);
        if (t) {
          if (n) {
            let t = a.GSUtil.getNodeChildsInfo(n);
            if (t && t.childs2 && t.childs2 != i) {
              let o = i[s];
              i.splice(s, 1);
              t.childs2.unshift(o);
              this.nodeList.numberItems = this._scriptData.data.childs.length + 1;
              this.setSelectNodeData(e);
            } else n.id > 0 && this.moveNodeDown(n.id, i, s);
          }
        } else {
          let t = a.GSUtil.getNodeChildsInfo(i[s + 1]);
          if (t.childs1) {
            let o = i[s];
            i.splice(s, 1);
            t.childs1.unshift(o);
            this.nodeList.numberItems = this._scriptData.data.childs.length + 1;
            this.setSelectNodeData(e);
          } else if (t.childs2) {
            let o = i[s];
            i.splice(s, 1);
            t.childs2.unshift(o);
            this.nodeList.numberItems = this._scriptData.data.childs.length + 1;
            this.setSelectNodeData(e);
          } else {
            let t = i[s];
            i[s] = i[s + 1];
            i[s + 1] = t;
            this.nodeList.numberItems = this._scriptData.data.childs.length + 1;
            this.setSelectNodeData(e);
          }
        }
      }
    }
  }
  dfsTreeGetMaxNodeId(e) {
    if (!e) return;
    this._maxNodeId < e.id && (this._maxNodeId = e.id);
    let t = a.GSUtil.getNodeChildsInfo(e),
      o = t.childs1,
      i = t.childs2;
    if (o) for (let e of o) this.dfsTreeGetMaxNodeId(e);
    if (i) for (let e of i) this.dfsTreeGetMaxNodeId(e);
  }
  onAddNew() {
    let e = this._scriptData.data.childs.length - 1,
      t = this._scriptData.data.childs,
      o = o => {
        t.splice(e, 0, o);
        this.nodeList.numberItems = this._scriptData.data.childs.length + 1;
        this.setSelectNodeData(o.id);
      };
    o.bind(this);
    h.default.ins.OpenPanelByName("GSSelectDataNodePanel", e => {
      e.setData(null, o);
    });
  }
  onClickAdd() {
    let e = null,
      t = -1;
    if (this._selectId <= 0) {
      e = this._scriptData.data.childs;
      this._selectId < 0 && (t = e.length - 1);
    } else {
      let t = a.GSUtil.getTargetNodeStayedInChilds(this._selectId, this._scriptData.data);
      (e = t && t.childs) || (e = this._scriptData.data.childs);
    }
    if (e) {
      for (let o = 0; o < e.length; ++o) if (e[o].id == this._selectId) {
        t = o;
        break;
      }
      t >= 0 && e[t].type == a.GSDataNodeType.G_Add && --t;
      let o = o => {
        e.splice(t + 1, 0, o);
        this.nodeList.numberItems = this._scriptData.data.childs.length + 1;
        this.setSelectNodeData(o.id);
      };
      o.bind(this);
      h.default.ins.OpenPanelByName("GSSelectDataNodePanel", e => {
        e.setData(null, o);
      });
    }
  }
  onClickDel() {
    let e = a.GSUtil.getTargetNodeStayedInChilds(this._selectId, this._scriptData.data),
      t = e && e.childs;
    t || (t = this._scriptData.data.childs);
    let o = -1;
    if (t) {
      for (let e = 0; e < t.length; ++e) if (t[e].id == this._selectId) {
        o = e;
        break;
      }
      if (o >= 0) {
        if (t[o].type == a.GSDataNodeType.G_Add) return;
        t.splice(o, 1);
        this.nodeList.numberItems = this._scriptData.data.childs.length + 1;
        let i = -1;
        if (t.length > 0) {
          o >= t.length && (o = t.length - 1);
          i = t[o].id;
        } else e.parent && (i = e.parent.id);
        this.setSelectNodeData(i);
      }
    }
  }
  onRenderNodeItem(e, t) {
    0 == e ? t.setData(0, this._scriptData.data, null) : t.setData(0, this._scriptData.data.childs[e - 1], this);
  }
  onSelectNodeItem(e, t) {
    if (!t) {
      this._selectBgY = 0;
      this.selectBg.height = 0;
      this.selectFg.height = 0;
      return;
    }
    let o = t.getComponent(d.default);
    o && o.updateNodeSizeByChild(!0);
    this._selectId = t.dataNodeId;
    let i = t,
      n = i.position.y,
      a = t.height + 10;
    for (; i && i.parent != this.nodeList.node;) n += (i = i.parent).position.y;
    this.selectBg.height = a;
    this.selectFg.height = a;
    this._selectBgY = n - .5 * a + 5;
    this.selectBg.y = this._selectBgY;
    this.selectFg.y = this._selectBgY;
  }
  lateUpdate() {
    this.selectBg.y = this._selectBgY + this.itemCellContent.position.y;
    this.selectFg.y = this._selectBgY + this.itemCellContent.position.y;
    this.selectBg.x = this.itemCellContent.position.x + this.itemCellContent.width * (this.selectBg.anchorX - this.itemCellContent.anchorX);
    this.selectFg.x = this.itemCellContent.position.x + this.itemCellContent.width * (this.selectBg.anchorX - this.itemCellContent.anchorX);
  }
  onSelectScript(e) {}
};
i([v(s.default)], C.prototype, "returnBtn", void 0);
i([v(s.default)], C.prototype, "scriptBtn", void 0);
i([v(cc.EditBox)], C.prototype, "nameEditbox", void 0);
i([v(cc.Node)], C.prototype, "selectBg", void 0);
i([v(cc.Node)], C.prototype, "selectFg", void 0);
i([v(l.default)], C.prototype, "nodeList", void 0);
i([v(cc.Node)], C.prototype, "itemCellContent", void 0);
i([v(c.default)], C.prototype, "itemCell", void 0);
i([v(s.default)], C.prototype, "upBtn", void 0);
i([v(s.default)], C.prototype, "downBtn", void 0);
i([v(s.default)], C.prototype, "addBtn", void 0);
i([v(s.default)], C.prototype, "delBtn", void 0);
i([v(s.default)], C.prototype, "saveBtn", void 0);
C = i([y], C);
exports.default = C;