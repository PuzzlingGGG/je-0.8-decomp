"use strict";

var i,
  n = this && this.__decorate || function (e, t, o, i) {
    var n,
      a = arguments.length,
      s = a < 3 ? t : null === i ? i = Object.getOwnPropertyDescriptor(t, o) : i;
    if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) s = Reflect.decorate(e, t, o, i);else for (var r = e.length - 1; r >= 0; r--) (n = e[r]) && (s = (a < 3 ? n(s) : a > 3 ? n(t, o, s) : n(t, o)) || s);
    return a > 3 && s && Object.defineProperty(t, o, s), s;
  },
  a = this && this.__awaiter || function (e, t, o, i) {
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
const s = e("../../CustomUI/Button"),
  r = e("../../CustomUI/ScrollList"),
  l = e("../../Frame/Config"),
  c = e("../../Frame/SceneManager"),
  d = e("../../Frame/Util"),
  h = e("../../Game/Player/Mng"),
  p = e("./EditGameScene"),
  {
    ccclass: u,
    property: m
  } = cc._decorator;
let f = i = class extends cc.Component {
  constructor() {
    super(...arguments);
    this.nameLabel = null;
    this.sizeLabel = null;
    this.typeLabel = null;
    this.firstFlag = null;
    this.template = null;
    this.menuBtn = null;
    this.gameData = null;
    this.worldData = null;
    this.worldId = null;
    this.pos = cc.Vec2.ZERO;
  }
  onLoad() {
    this.node.on(r.default.SET_DATA, this.setData, this);
    this.node.on(cc.Node.EventType.TOUCH_MOVE, this.onTouchMove9, this);
    this.node.on(cc.Node.EventType.TOUCH_END, this.onTouchEnd9, this);
    this.menuBtn.node.on(s.default.CLICK, this.onMenuBtnClick, this);
    cc.game.on("WorldDataChange", this.onWorldDataChange, this);
  }
  onDestroy() {
    cc.game.off("WorldDataChange", this.onWorldDataChange, this);
  }
  onWorldDataChange(e) {
    e && this.worldData && e.id == this.worldData.id && this.setName(e.info.name);
  }
  setData(e, t) {
    return a(this, void 0, void 0, function* () {
      this.worldId = e;
      this.gameData = t;
      this.node.color = cc.Color.WHITE;
      this.node.x = -1e4;
      this.node.y = -1e4;
      let o = yield h.Mng.Ins.worldMng.loadOne(e);
      if (!o) return;
      this.worldData = o;
      this.setName(o.info.name);
      this.sizeLabel.string = `${o.info.size.col}x${o.info.size.row}`;
      this.typeLabel.string = l.Config.getWorldTypeActName(o.info.type);
      this.firstFlag.active = e == t.firstWorldId;
      this.template.active = !!o.belongGameId;
      t.projectLayout = t.projectLayout || {
        worldCellPos: {}
      };
      let i = t.projectLayout.worldCellPos[e];
      if (!i) {
        i = {
          x: d.Util.randomInt(400, 600),
          y: d.Util.randomInt(400, 600)
        };
        t.projectLayout.worldCellPos[e] = i;
      }
      this.setPos(i.x, i.y);
    });
  }
  setName(e) {
    this.nameLabel.string = d.Util.clampStr(e, 12, "..");
  }
  onTouchMove9(e) {
    if (1 == e.getTouches().length) {
      let t = e.getDelta();
      this.movePos(t.x, t.y);
      let o = this.gameData.projectLayout.worldCellPos[this.worldId] || {
        x: 0,
        y: 0
      };
      exports.x = this.pos.x;
      exports.y = this.pos.y;
      this.gameData.projectLayout.worldCellPos[this.worldId] = o;
    }
    c.default.ins.findScene(p.default).menu.hide();
  }
  onTouchEnd9(e) {
    let t = e.getStartLocation(),
      o = e.getLocation();
    t.sub(o).magSqr() < 100 && this.onClick();
  }
  onClick() {
    return a(this, void 0, void 0, function* () {
      let e = yield h.Mng.Ins.worldMng.loadOne(this.worldData.id, !0);
      if (e && !i.clickLock) {
        i.clickLock = !0;
        c.default.ins.Enter("EditWorldScene", t => a(this, void 0, void 0, function* () {
          t.setData(this.gameData, e);
          i.clickLock = !1;
        }));
      }
    });
  }
  onMenuBtnClick() {
    let e = c.default.ins.findScene(p.default);
    e.menu.node.active ? e.menu.hide() : e.menu.show(this);
  }
  movePos(e, t) {
    this.setPos(this.pos.x + e, this.pos.y + t);
  }
  setPos(e, t) {
    this.pos.x = e;
    this.pos.y = t;
    this.node.x = 32 * Math.floor(this.pos.x / 32);
    this.node.y = 32 * Math.floor(this.pos.y / 32);
  }
  refreshWorldData() {
    this.setData(this.worldData.id, this.gameData);
  }
};
f.clickLock = !1;
n([m(cc.Label)], f.prototype, "nameLabel", void 0);
n([m(cc.Label)], f.prototype, "sizeLabel", void 0);
n([m(cc.Label)], f.prototype, "typeLabel", void 0);
n([m(cc.Node)], f.prototype, "firstFlag", void 0);
n([m(cc.Node)], f.prototype, "template", void 0);
n([m(s.default)], f.prototype, "menuBtn", void 0);
f = i = n([u], f);
exports.default = f;