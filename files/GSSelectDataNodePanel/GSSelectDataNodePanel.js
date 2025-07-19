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
  s = e("../../Frame/Panel"),
  r = e("../../CustomUI/ScrollList"),
  l = e("../../Frame/SceneManager"),
  c = e("../../CustomUI/ToggleGroup"),
  {
    ccclass: d,
    property: h
  } = cc._decorator;
let p = i = class extends s.default {
  constructor() {
    super(...arguments);
    this.toggleGroup = null;
    this.list = null;
  }
  static openEditDataPanel(e, t, o) {
    if (e == a.GSDataNodeType.GFLOW_WAIT) l.default.ins.OpenPanelByName("GSDataNodeFlowWaitPanel", e => {
      e.setData(t, o);
    });else if (e == a.GSDataNodeType.GINTERACTION_Dialog) l.default.ins.OpenPanelByName("GSDataNodeDialogPanel", e => {
      e.setData(t, o);
    });else if (e == a.GSDataNodeType.GDATA_ChangeActorProperty) l.default.ins.OpenPanelByName("GSDataNodeChangeActPanel", e => {
      e.setData(t, o);
    });else if (e == a.GSDataNodeType.GDATA_ChangeHeroProperty) l.default.ins.OpenPanelByName("GSDataNodeChangeHeroPanel", e => {
      e.setData(t, o);
    });else if (e == a.GSDataNodeType.GDATA_ChangeVariable) l.default.ins.OpenPanelByName("GSDataNodeChangeVariable", e => {
      e.setData(t, o);
    });else if (e == a.GSDataNodeType.GDATA_DropItem) l.default.ins.OpenPanelByName("GSDataNodeDropItemPanel", e => {
      e.setData(t, o);
    });else if (e == a.GSDataNodeType.GDATA_ChangeBagItem) l.default.ins.OpenPanelByName("GSDataNodeBagItemPanel", e => {
      e.setData(t, o);
    });else if (e == a.GSDataNodeType.GSYS_ShowGameWin) l.default.ins.OpenPanelByName("GSDataNodeGameWinPanel", e => {
      e.setData(t, o);
    });else if (e == a.GSDataNodeType.GSYS_ShowGameOver) l.default.ins.OpenPanelByName("GSDataNodeGameOverPanel", e => {
      e.setData(t, o);
    });else if (e == a.GSDataNodeType.GSYS_SwitchMap) l.default.ins.OpenPanelByName("GSDataNodeShiftWorldPanel", e => {
      e.setData(t, o);
    });else if (e == a.GSDataNodeType.GSYS_SwitchHero) l.default.ins.OpenPanelByName("SelectHeroPanel", e => {
      let i = t;
      i = i || a.GSDataNodeBuildHelper.NewGSDataNode(a.GSDataNodeType.GSYS_SwitchHero);
      e.setData(i.confId);
      e.selectCall = (e => {
        e && (i.confId = e.id);
        o(i);
      }).bind(this);
    });else if (e == a.GSDataNodeType.GSYS_TimeCountDownStart) l.default.ins.OpenPanelByName("GSDataNodeTimeCountDownStartPanel", e => {
      e.setData(t, o);
    });else if (e == a.GSDataNodeType.GSCREEN_CameraShake) l.default.ins.OpenPanelByName("GSDataNodeCameraShakePanel", e => {
      e.setData(t, o);
    });else if (!t) {
      let t = a.GSDataNodeBuildHelper.NewGSDataNode(e);
      o && o(t);
    }
  }
  onLoad() {
    super.onLoad();
    this.toggleGroup.node.on(c.default.TOGGLE_CHANGE, this.onToggleChange, this);
    this.list.node.on(r.default.CLICK_ITEM, this.onClickCell, this);
  }
  onToggleChange(e, t, o) {
    let i = [{
        str: "条件：如果",
        type: a.GSDataNodeType.GFLOW_If
      }, {
        str: "条件：如果-否则",
        type: a.GSDataNodeType.GFLOW_IfElse
      }, {
        str: "等待",
        type: a.GSDataNodeType.GFLOW_WAIT
      }, {
        str: "操作变量",
        type: a.GSDataNodeType.GDATA_ChangeVariable
      }],
      n = [{
        str: "剧情对话",
        type: a.GSDataNodeType.GINTERACTION_Dialog
      }, {
        str: "主角属性指令",
        type: a.GSDataNodeType.GDATA_ChangeHeroProperty
      }, {
        str: "调整属性",
        type: a.GSDataNodeType.GDATA_ChangeActorProperty
      }, {
        str: "生成道具",
        type: a.GSDataNodeType.GDATA_DropItem
      }, {
        str: "背包道具增减",
        type: a.GSDataNodeType.GDATA_ChangeBagItem
      }, {
        str: "屏幕震动",
        type: a.GSDataNodeType.GSCREEN_CameraShake
      }, {
        str: "开始计时",
        type: a.GSDataNodeType.GSYS_TimeCountDownStart
      }, {
        str: "停止计时",
        type: a.GSDataNodeType.GSYS_TimeCountDownStop
      }],
      s = [{
        str: "进入通关界面",
        type: a.GSDataNodeType.GSYS_ShowGameWin
      }, {
        str: "进入失败界面",
        type: a.GSDataNodeType.GSYS_ShowGameOver
      }, {
        str: "切换地图",
        type: a.GSDataNodeType.GSYS_SwitchMap
      }, {
        str: "切换主角",
        type: a.GSDataNodeType.GSYS_SwitchHero
      }];
    switch (e) {
      case 0:
        this.list.setDataArr(i);
        break;
      case 1:
        this.list.setDataArr(n);
        break;
      case 2:
        this.list.setDataArr(s);
    }
  }
  setData(e, t) {
    this._opCallBack = t;
    this._editData = e;
  }
  onClickCell(e, t) {
    this.closePanel();
    i.openEditDataPanel(t.type, this._editData, this._opCallBack);
  }
};
n([h(c.default)], p.prototype, "toggleGroup", void 0);
n([h(r.default)], p.prototype, "list", void 0);
p = i = n([d], p);
exports.default = p;