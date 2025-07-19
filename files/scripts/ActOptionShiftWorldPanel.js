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
const a = e("../../CustomUI/Button"),
  s = e("../../CustomUI/DropDownBox"),
  r = e("../../Frame/Config"),
  l = e("../../Frame/Panel"),
  c = e("../../Frame/SceneManager"),
  d = e("../../Frame/Top"),
  h = e("../../Frame/TweenUtil"),
  p = e("../../Frame/Util"),
  u = e("../../Game/Player/Mng"),
  m = e("../../Game/World/Tile"),
  f = e("../../Scene/EditWorldScene/EditWorldScene"),
  g = e("../../Scene/EditWorldScene/Inspector/TriggerItem"),
  {
    ccclass: y,
    property: v
  } = cc._decorator;
let C = class extends l.default {
  constructor() {
    super(...arguments);
    this.worldBtn = null;
    this.coorBtn = null;
    this.animDropDown = null;
    this.okBtn = null;
    this.triggerItem = null;
    this.call = null;
    this.evt = null;
  }
  onLoad() {
    super.onLoad();
    this.worldBtn.node.on(a.default.CLICK, this.onWorldBtn, this);
    this.coorBtn.node.on(a.default.CLICK, this.onCoorBtn, this);
    this.okBtn.node.on(a.default.CLICK, this.onOkBtn, this);
  }
  setData(e) {
    return n(this, void 0, void 0, function* () {
      this.evt = p.Util.deepCopy(e);
      this.evt.extra = this.evt.extra || {};
      this.evt.extra.evts = this.evt.extra.evts || [];
      this.updateWorldBtn(this.evt.extra.worldId);
      this.updateCoorBtn(this.evt.extra.coor);
      let t = this.evt.extra.animId || 2,
        o = r.Config.shiftWorldAnims || [],
        i = o.findIndex(e => e.id == t);
      this.animDropDown.setDataArr(o);
      this.animDropDown.selectByIdx(i);
      this.triggerItem.setData("切换地图后", this.evt.extra.evts, !1);
    });
  }
  autoSelectWorldPos(e) {
    return n(this, void 0, void 0, function* () {
      let t = yield u.Mng.Ins.worldMng.loadOne(e, !0);
      if (t && t.worldLayout.startPoint && t.worldLayout.startPoint.pos) {
        let e = t.worldLayout.startPoint.pos;
        return {
          iCol: Math.floor(e.x / m.default.SIZE),
          iRow: Math.floor(e.y / m.default.SIZE)
        };
      }
      return null;
    });
  }
  updateCoorBtn(e) {
    if (e) {
      let t = e.iCol || 0,
        o = e.iRow || 0;
      this.coorBtn.label.string = `(${t},${o})`;
    } else this.coorBtn.label.string = "请选择";
  }
  updateWorldBtn(e) {
    return n(this, void 0, void 0, function* () {
      let t = yield u.Mng.Ins.worldMng.loadOne(e);
      this.worldBtn.label.string = t ? t.info.name : "请选择";
      if (!this.evt.extra.coor) {
        this.evt.extra.coor = yield this.autoSelectWorldPos(this.evt.extra.worldId);
        this.updateCoorBtn(this.evt.extra.coor);
      }
    });
  }
  onWorldBtn() {
    c.default.ins.OpenPanelByName("SelectWorldPanel", e => {
      let t = c.default.ins.findScene(f.default),
        o = t.gameData.worldIds;
      o = o.filter(e => e != t.worldData.id);
      e.setData(o, this.evt.extra.worldId);
      e.call = e => {
        this.evt.extra.worldId = e;
        this.updateWorldBtn(e);
      };
    });
  }
  onCoorBtn() {
    return n(this, void 0, void 0, function* () {
      let e = this.evt.extra.worldId;
      (yield u.Mng.Ins.worldMng.loadOne(e)) ? c.default.ins.OpenPanelByName("ActOptionSelectWorldCoorPanel", t => {
        let o = this.evt.extra.coor;
        t.setData(e, o);
        t.selectCall = e => {
          this.evt.extra.coor = e;
          this.updateCoorBtn(e);
        };
      }) : d.default.showToast("请先选择地图");
    });
  }
  onOkBtn() {
    return n(this, void 0, void 0, function* () {
      let e = this.evt.extra.worldId,
        t = yield u.Mng.Ins.worldMng.loadOne(e),
        o = this.evt.extra.coor;
      if (t) {
        if (o) {
          this.closePanel();
          this.evt.extra.animId = this.animDropDown.getCurData().id;
          this.call && this.call(this.evt);
        } else {
          d.default.showToast("请选择坐标");
          h.TweenUtil.applyScaleBounce2(this.coorBtn.node, 1, 1.2);
        }
      } else {
        d.default.showToast("请选择地图");
        h.TweenUtil.applyScaleBounce2(this.worldBtn.node, 1, 1.2);
      }
    });
  }
};
i([v(a.default)], C.prototype, "worldBtn", void 0);
i([v(a.default)], C.prototype, "coorBtn", void 0);
i([v(s.default)], C.prototype, "animDropDown", void 0);
i([v(a.default)], C.prototype, "okBtn", void 0);
i([v(g.default)], C.prototype, "triggerItem", void 0);
C = i([y], C);
exports.default = C;