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
  r = e("../../CustomUI/DropDownBox"),
  l = e("../../CustomUI/ScrollList"),
  c = e("../../Frame/Panel"),
  d = e("../../Frame/SceneManager"),
  h = e("../../Game/Player/Mng"),
  p = e("../../Scene/EditGameScene/EditGameScene"),
  {
    ccclass: u,
    property: m
  } = cc._decorator;
let f = class extends c.default {
  constructor() {
    super(...arguments);
    this.addBtn = null;
    this.deleteBtn = null;
    this.moveUpBtn = null;
    this.moveDownBtn = null;
    this.okBtn = null;
    this.filter = null;
    this.list = null;
    this.emptyNode = null;
    this.callSelect = null;
    this._gameData = null;
    this._selectedId = -1;
    this._isSelectMode = !1;
    this._selectVid = -1;
    this._selectVariableType = -1;
    this._variableArray = [];
    this._variableTotalArray = [];
  }
  onLoad() {
    super.onLoad();
    cc.game.on("editVaribleComplete", this.onRefreshVariableArray, this);
    this.okBtn.node.on(s.default.CLICK, this.onOkBtn, this);
    this.addBtn.node.on(s.default.CLICK, this.onAddBtn, this);
    this.deleteBtn.node.on(s.default.CLICK, this.onDeleteBtn, this);
    this.moveUpBtn.node.on(s.default.CLICK, this.onMoveUpBtn, this);
    this.moveDownBtn.node.on(s.default.CLICK, this.onMoveDownBtn, this);
    this.filter.node.on(r.default.SELECT_CHANGE, this.onFilterTypeChange, this);
    this.filter.setDataArr([{
      str: "全部",
      type: -1
    }, {
      str: "数字",
      type: a.GSValueType.FLOAT
    }, {
      str: "开关",
      type: a.GSValueType.BOOL
    }]);
    this.filter.selectByIdx(0);
    this.list.node.on(l.default.SELECT_ITEM, (e, t) => {
      this.deleteBtn.node.active = !1;
      let o = a.GSVariableMng.instance.getVariable(t),
        i = h.Mng.Ins.variableMng.getData(o.idstr);
      this.deleteBtn.node.active = i && !i.belongGameId;
    }, this);
  }
  onDestroy() {
    cc.game.off("editVaribleComplete", this.onRefreshVariableArray, this);
  }
  setData(e, t, o) {
    this._gameData = e;
    this._selectedId = t;
    if (!this._gameData) {
      let e = d.default.ins.findScene(p.default);
      this._gameData = e && e.gameData;
    }
    this._isSelectMode = o;
    this._selectVariableType = -1;
    this.onRefreshVariableArray();
  }
  onOkBtn() {
    this.processOk();
  }
  processOk() {
    return n(this, void 0, void 0, function* () {
      yield h.Mng.Ins.variableMng.saveAll();
      if (this._isSelectMode && this._variableArray && this.list.curSelectIdx < this._variableArray.length) {
        this._selectVid = this._variableArray[this.list.curSelectIdx];
        this.callSelect && this.callSelect(this._selectVid);
      }
      this.closePanel();
    });
  }
  onFilterTypeChange(e, t, o) {
    this._selectVariableType = t.type;
    this.onRefreshVariableArray();
  }
  onRefreshVariableArray() {
    this.deleteBtn.node.active = !1;
    this._variableTotalArray = a.GSVariableMng.instance.getVariableIdList();
    this._variableArray.length = 0;
    for (let e of this._variableTotalArray) {
      let t = a.GSVariableMng.instance.getVariable(e);
      -1 != this._selectVariableType && t.valueType != this._selectVariableType || this._variableArray.push(e);
    }
    this.list.setDataArr(this._variableArray);
    if (this._variableArray.length > 0) {
      let e = 0;
      for (let t = 0; t < this._variableArray.length; ++t) if (this._variableArray[t] == this._selectedId) {
        e = t;
        break;
      }
      this.list.selectByIdx(e);
    }
    this.emptyNode.active = 0 == this._variableArray.length;
  }
  onAddBtn() {
    d.default.ins.OpenPanelByName("CreateVariablePanel", e => {
      e.call = e => n(this, void 0, void 0, function* () {
        let t = this.list.curSelectIdx;
        if (e = yield h.Mng.Ins.variableMng.create(e)) {
          e.idx = t + 1;
          let o = a.GSVariableMng.instance.insertVariable(e);
          this._variableArray.splice(t + 1, 0, o);
          this.list.setDataArr(this._variableArray);
          this.list.selectByIdx(t + 1);
          this.emptyNode.active = 0 == this._variableArray.length;
        }
      });
    });
  }
  onDeleteBtn() {
    return n(this, void 0, void 0, function* () {
      let e = this.list.curSelectIdx,
        t = this._variableArray[e];
      if (this._variableTotalArray.find(e => e == t) >= 0) {
        let o = a.GSVariableMng.instance.getVariable(t),
          i = h.Mng.Ins.variableMng.getData(o.idstr);
        if (i && i.belongGameId) return;
        yield h.Mng.Ins.variableMng.delete(o.idstr);
        a.GSVariableMng.instance.removeVariable(t);
        this._variableArray.splice(e, 1);
        this.list.setDataArr(this._variableArray);
        this.emptyNode.active = 0 == this._variableArray.length;
      }
    });
  }
  onMoveUpBtn() {
    let e = this.list.curSelectIdx;
    if (e > 0) {
      let t = this._variableArray[e],
        o = this._variableArray[e - 1],
        i = this._variableTotalArray,
        n = i.findIndex(t => t == this._variableArray[e]),
        s = i.findIndex(t => t == this._variableArray[e - 1]);
      if (n >= 0 && s >= 0) {
        a.GSVariableMng.instance.swapVariablePosition(e, e - 1);
        this._variableArray[e] = o;
        this._variableArray[e - 1] = t;
        this.list.setDataArr(this._variableArray);
        this.list.selectByIdx(e - 1);
      }
    }
  }
  onMoveDownBtn() {
    let e = this.list.curSelectIdx;
    if (e < this._variableArray.length - 1) {
      let t = this._variableArray[e],
        o = this._variableArray[e + 1],
        i = this._variableTotalArray,
        n = i.findIndex(t => t == this._variableArray[e]),
        s = i.findIndex(t => t == this._variableArray[e + 1]);
      if (n >= 0 && s >= 0) {
        a.GSVariableMng.instance.swapVariablePosition(e, e + 1);
        this._variableArray[e] = o;
        this._variableArray[e + 1] = t;
        this.list.setDataArr(this._variableArray);
        this.list.selectByIdx(e + 1);
      }
    }
  }
};
i([m(s.default)], f.prototype, "addBtn", void 0);
i([m(s.default)], f.prototype, "deleteBtn", void 0);
i([m(s.default)], f.prototype, "moveUpBtn", void 0);
i([m(s.default)], f.prototype, "moveDownBtn", void 0);
i([m(s.default)], f.prototype, "okBtn", void 0);
i([m(r.default)], f.prototype, "filter", void 0);
i([m(l.default)], f.prototype, "list", void 0);
i([m(cc.Node)], f.prototype, "emptyNode", void 0);
f = i([u], f);
exports.default = f;