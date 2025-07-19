"use strict";

var i = this && this.__decorate || function (e, t, o, i) {
  var n,
    a = arguments.length,
    s = a < 3 ? t : null === i ? i = Object.getOwnPropertyDescriptor(t, o) : i;
  if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) s = Reflect.decorate(e, t, o, i);else for (var r = e.length - 1; r >= 0; r--) (n = e[r]) && (s = (a < 3 ? n(s) : a > 3 ? n(t, o, s) : n(t, o)) || s);
  return a > 3 && s && Object.defineProperty(t, o, s), s;
};
const n = e("../../../GameScript/index"),
  a = e("../../../CustomUI/Button"),
  s = e("../../../Frame/SceneManager"),
  r = e("./TriggerItem"),
  l = e("../EditWorldScene"),
  c = e("../../../Frame/UIColor"),
  d = e("../../../Frame/Config"),
  h = e("../../../GameData/GameTypeDefine"),
  {
    ccclass: p,
    property: u
  } = cc._decorator;
let m = class extends cc.Component {
  constructor() {
    super(...arguments);
    this.actBtn = null;
    this.optionBtn = null;
    this.deleteBtn = null;
    this.evt = null;
    this.isWorldData = !1;
  }
  onLoad() {
    this.actBtn.node.on(a.default.CLICK, this.onActBtn, this);
    this.optionBtn.node.on(a.default.CLICK, this.onOptionBtn, this);
    this.deleteBtn.node.on(a.default.CLICK, this.onDeleteBtn, this);
  }
  setData(e, t) {
    this.evt = e;
    this.isWorldData = t;
    this.updateActLabel();
  }
  updateActLabel() {
    let e = d.Config.getTriggerActDisplay(this.evt);
    this.actBtn.label.string = e;
  }
  onActBtn() {
    s.default.ins.OpenPanelByName("TriggerActPanel", e => {
      e.setData(this.evt.act, this.isWorldData);
      e.call = e => {
        if (this.evt.act != e) {
          if (this.evt.act == h.TriggerAct.GameScript) s.default.ins.OpenPanelByName("MessageBox", t => {
            t.label.string = "切换事件将删除脚本\n确定要切换吗？";
            t.setLeftBtn({
              text: "切换",
              color: c.UIColor.pink,
              call: () => {
                let t = s.default.ins.findScene(l.default);
                if (t.world.worldLayout && t.world.worldLayout.gsData) {
                  let e = t.world.worldLayout.gsData,
                    o = e.scriptArray.findIndex(e => e.id == this.evt.extra);
                  o >= 0 && e.scriptArray.splice(o, 1);
                }
                n.GSMng.instance.RemoveScript(t.worldData.id, this.evt.extra);
                this.evt.act = e;
                this.evt.extra = null;
                this.updateActLabel();
                this.onOptionBtn();
              }
            });
            t.setRightBtn({
              text: "点错了",
              color: c.UIColor.blue
            });
          });else {
            this.evt.act = e;
            this.evt.extra = null;
            this.updateActLabel();
            this.onOptionBtn();
          }
        } else this.onOptionBtn();
      };
    });
  }
  onOptionBtn() {
    let e = this.evt.act;
    e == h.TriggerAct.ShiftWorld && s.default.ins.OpenPanelByName("ActOptionShiftWorldPanel", e => {
      e.setData(this.evt);
      e.call = e => {
        this.evt.extra = e.extra;
        this.setData(this.evt, this.isWorldData);
      };
    });
    e == h.TriggerAct.Dialog && s.default.ins.OpenPanelByName("ActOptionDialogPanel", e => {
      e.setData(this.evt);
      e.call = e => {
        this.evt.extra = e.extra;
        this.setData(this.evt, this.isWorldData);
      };
    });
    e == h.TriggerAct.Sound && s.default.ins.OpenPanelByName("SelectSoundPanel", e => {
      e.setData(this.evt);
      e.call = e => {
        this.evt.extra = e.extra;
        this.setData(this.evt, this.isWorldData);
      };
    });
    e == h.TriggerAct.GameWin && s.default.ins.OpenPanelByName("ActOptionGameWinPanel", e => {
      e.setData(this.evt);
      e.call = e => {
        this.evt.extra = e.extra;
        this.setData(this.evt, this.isWorldData);
      };
    });
    e == h.TriggerAct.GameOver && s.default.ins.OpenPanelByName("ActOptionGameOverPanel", e => {
      e.setData(this.evt);
      e.call = e => {
        this.evt.extra = e.extra;
        this.setData(this.evt, this.isWorldData);
      };
    });
    e == h.TriggerAct.ShiftWeapon && s.default.ins.OpenPanelByName("SelectWeaponPanel", e => {
      this.evt.extra || (this.evt.extra = {
        gunId: "1"
      });
      e.setData(this.evt.extra.gunId);
      e.selectCall = e => {
        this.evt.extra.gunId = e.id;
        this.setData(this.evt, this.isWorldData);
      };
    });
    e == h.TriggerAct.DropProp && s.default.ins.OpenPanelByName("ActOptionDropPropPanel", e => {
      e.setData(this.evt);
      e.call = e => {
        this.evt.extra = e.extra;
        this.setData(this.evt, this.isWorldData);
      };
    });
    e == h.TriggerAct.RecoverHP && s.default.ins.OpenPanelByName("ActOptionRecoverHpPanel", e => {
      e.setData(this.evt);
      e.call = e => {
        this.evt.extra = e.extra;
        this.setData(this.evt, this.isWorldData);
      };
    });
    e == h.TriggerAct.CameraShake && s.default.ins.OpenPanelByName("ActOptionCameraShakePanel", e => {
      e.setData(this.evt);
      e.call = e => {
        this.evt.extra = e.extra;
        this.setData(this.evt, this.isWorldData);
      };
    });
    e == h.TriggerAct.GameShop && s.default.ins.OpenPanelByName("SelectGameShopPanel", e => {
      e.setData(this.evt);
      e.call = e => {
        this.evt.extra = e.extra;
        this.setData(this.evt, this.isWorldData);
      };
    });
    e == h.TriggerAct.GameScript && s.default.ins.OpenPanelByName("EditGameScriptPanel", e => {
      let t = s.default.ins.findScene(l.default).saveToTempWorldDataMap();
      e.setData(t.id, this.evt);
      e.saveCall = e => {
        this.evt.extra = e.extra;
        this.setData(this.evt, this.isWorldData);
      };
    });
    e == h.TriggerAct.ChangeAct && s.default.ins.OpenPanelByName("ActOptionChangeActPanel", e => {
      let t = s.default.ins.findScene(l.default).saveToTempWorldDataMap();
      e.setData(t.id, this.evt);
      e.saveCall = e => {
        this.evt.extra = e.extra;
        this.setData(this.evt, this.isWorldData);
      };
    });
    if (e == h.TriggerAct.ChangeHero) {
      this.evt.extra = this.evt.extra || {
        confId: null
      };
      let e = this.evt.extra;
      s.default.ins.OpenPanelByName("GSDataNodeChangeHeroPanel", t => {
        t.setData(e, e => {
          this.evt.extra = e;
          this.updateActLabel();
        });
      });
    }
    e == h.TriggerAct.ShiftHero && s.default.ins.OpenPanelByName("SelectHeroPanel", e => {
      this.evt.extra = this.evt.extra || {
        confId: null
      };
      e.setData(this.evt.extra.confId);
      e.selectCall = (e => {
        e && (this.evt.extra.confId = e.id);
      }).bind(this);
    });
    e == h.TriggerAct.StartTimeCountDown && s.default.ins.OpenPanelByName("GSDataNodeTimeCountDownStartPanel", e => {
      this.evt.extra = this.evt.extra || {
        timer: 10,
        evts: []
      };
      let t = this.evt.extra;
      e.setData(t, e => {
        this.evt.extra = e;
      });
    });
    e == h.TriggerAct.StopTimeCountDown && (this.evt.extra = this.evt.extra || {});
    e == h.TriggerAct.ShareGame && s.default.ins.OpenPanelByName("ActOptionGameSharePanel", e => {
      e.setData(this.evt);
      e.call = e => {
        this.evt.extra = e.extra;
        this.setData(this.evt, this.isWorldData);
      };
    });
    e == h.TriggerAct.AD && s.default.ins.OpenPanelByName("ActOptionGameAdPanel", e => {
      e.setData(this.evt);
      e.call = e => {
        this.evt.extra = e.extra;
        this.setData(this.evt, this.isWorldData);
      };
    });
    e == h.TriggerAct.Random && s.default.ins.OpenPanelByName("ActOptionRandomPanel", e => {
      e.setData(this.evt);
      e.call = e => {
        this.evt.extra = e.extra;
        this.setData(this.evt, this.isWorldData);
      };
    });
    if (e == h.TriggerAct.BagItem) {
      this.evt.extra = this.evt.extra || {
        confId: null
      };
      let e = this.evt.extra;
      s.default.ins.OpenPanelByName("GSDataNodeBagItemPanel", t => {
        t.setData(e, e => {
          this.evt.extra = e;
          this.updateActLabel();
        });
      });
    }
    e == h.TriggerAct.GameRank && s.default.ins.OpenPanelByName("SelectGameRankPanel", e => {
      this.evt.extra || (this.evt.extra = {
        gameRankId: ""
      });
      e.setData(this.evt.extra.gameRankId);
      e.selectCall = e => {
        this.evt.extra.gameRankId = e;
        this.setData(this.evt, this.isWorldData);
      };
    });
    e == h.TriggerAct.UploadRankScore && s.default.ins.OpenPanelByName("ActOptionUploadRankScorePanel", e => {
      e.setData(this.evt);
      e.call = e => {
        this.evt.extra = e.extra;
        this.setData(this.evt, this.isWorldData);
      };
    });
  }
  onDeleteBtn() {
    let e = this.node.getComponentInParent(r.default);
    if (e) {
      let t = this.evt;
      e.removeEvt(t);
      if (t.act == h.TriggerAct.GameScript) {
        let e = s.default.ins.findScene(l.default);
        if (e.world.worldLayout && e.world.worldLayout.gsData) {
          let o = e.world.worldLayout.gsData,
            i = o.scriptArray.findIndex(e => e.id == t.extra);
          i >= 0 && o.scriptArray.splice(i, 1);
        }
        n.GSMng.instance.RemoveScript(e.worldData.id, t.extra);
      }
    }
  }
};
i([u(a.default)], m.prototype, "actBtn", void 0);
i([u(a.default)], m.prototype, "optionBtn", void 0);
i([u(a.default)], m.prototype, "deleteBtn", void 0);
m = i([p], m);
exports.default = m;