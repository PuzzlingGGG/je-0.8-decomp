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
  l = e("../../Frame/Util"),
  c = e("../../Game/Player/Mng"),
  d = e("../../Game/World/Tile"),
  h = e("./ActOptionActCell"),
  p = e("../../GameData/GameTypeDefine"),
  {
    ccclass: u,
    property: m
  } = cc._decorator;
let f = class extends r.default {
  constructor() {
    super(...arguments);
    this.labelTitle = null;
    this.mask = null;
    this.content = null;
    this.actPrefab = null;
    this.select = null;
    this.okBtn = null;
    this._allActs = [];
  }
  onLoad() {
    super.onLoad();
    this.okBtn.node.on(s.default.CLICK, this.onOkBtn, this);
    this.mask.node.on(cc.Node.EventType.TOUCH_END, this.onTouchEnd, this);
    this.mask.node.on(cc.Node.EventType.TOUCH_MOVE, this.onTouchMove, this);
  }
  onTouchMove(e) {
    let t = this.content.position;
    t.addSelf(e.getDelta());
    this.content.position = t;
  }
  onTouchEnd(e) {
    if (e.getLocation().sub(e.getStartLocation()).magSqr() < 10) {
      let t = this.content.convertToNodeSpaceAR(e.getLocation());
      if (t.x >= 0 && t.x < this.content.width && t.y >= 0 && t.y < this.content.height) {
        let e = Math.floor(t.x / d.default.SIZE),
          o = Math.floor(t.y / d.default.SIZE);
        this.selectAct(e, o);
      }
    }
  }
  selectAct(e, t) {
    this.select.x = (e + .5) * d.default.SIZE;
    this.select.y = (t + .5) * d.default.SIZE;
    this.select.getComponentInChildren(cc.Label).string = `(${e},${t})`;
    for (let o of this._allActs) {
      let i = Math.floor(o.node.x / d.default.SIZE),
        n = Math.floor(o.node.y / d.default.SIZE);
      if (i == e && n == t) {
        this._selectAct = o;
        break;
      }
    }
  }
  canSelectAct(e) {
    if (!this._filters || 0 == this._filters.length) return !0;
    for (let t of this._filters) if (t == e) return !0;
    return !1;
  }
  setData(e, t, o, i) {
    return n(this, void 0, void 0, function* () {
      this._filters = i;
      let n = yield c.Mng.Ins.worldMng.loadOne(t, !0);
      if (!n) return;
      this._allActs.length = 0;
      let s,
        r = n.worldLayout.bgColor;
      this.content.color = cc.color(r.r, r.g, r.b, r.a);
      this.content.width = n.worldLayout.size.col * d.default.SIZE;
      this.content.height = n.worldLayout.size.row * d.default.SIZE;
      this.labelTitle.string = e;
      for (let e = 0; e < n.worldLayout.actors.length; e++) {
        let t = a.ActType.Hero,
          i = n.worldLayout.actors[e];
        i.data.team == p.Team.Hero ? t = a.ActType.Hero : i.data.team == p.Team.Enemy ? t = a.ActType.Enemy : i.data.team == p.Team.NPC && (t = a.ActType.Npc);
        if (!this.canSelectAct(t)) continue;
        let r = yield c.Mng.Ins.actorMng.loadOne(i.data.confId);
        if (r) {
          let e = cc.instantiate(this.actPrefab.node);
          this.content.insertChild(e, 0);
          let n = e.getComponent(h.default);
          n.actType = t;
          t == a.ActType.Hero && (s = n);
          this._allActs.push(n);
          e.x = i.pos.x;
          e.y = i.pos.y;
          c.Mng.Ins.spriteMng.setActorSprite(n.sprite, r.textureName, d.default.SIZE);
          n.actId = i.data.id;
          o == i.data.id && (this._selectAct = n);
        }
      }
      if (this.canSelectAct(a.ActType.Device)) for (let e = 0; e < n.worldLayout.devices.length; e++) {
        let t = n.worldLayout.devices[e],
          i = yield c.Mng.Ins.deviceMng.loadOne(t.data.confId);
        if (i) {
          let e = cc.instantiate(this.actPrefab.node);
          this.content.insertChild(e, 0);
          let n = e.getComponent(h.default);
          this._allActs.push(n);
          e.x = t.pos.x;
          e.y = t.pos.y;
          c.Mng.Ins.spriteMng.setDeviceSprite(n.sprite, i.textureName, d.default.SIZE);
          n.actId = t.data.id;
          n.actType = a.ActType.Device;
          o == t.data.id && (this._selectAct = n);
        }
      }
      for (let e = 0; e < n.worldLayout.tiles.length; e++) {
        let t = n.worldLayout.tiles[e],
          i = yield c.Mng.Ins.tileMng.loadOne(t.data.confId);
        if (i) {
          let e = cc.instantiate(this.actPrefab.node);
          this.content.insertChild(e, 0);
          let n = e.getComponent(h.default);
          e.x = (t.pos.iCol + .5) * e.width;
          e.y = (t.pos.iRow + .5) * e.height;
          c.Mng.Ins.spriteMng.setTileSprite(n.sprite, i.textureName, d.default.SIZE);
          n.actId = t.data.id;
          n.actType = a.ActType.Tile;
          if (this.canSelectAct(a.ActType.Tile)) {
            this._allActs.push(n);
            o == t.data.id && (this._selectAct = n);
          }
        }
      }
      this._selectAct || (this._selectAct = s);
      !this._selectAct && this._allActs.length > 0 && (this._selectAct = this._allActs[0]);
      if (this._selectAct) {
        let e = Math.floor(this._selectAct.node.x / d.default.SIZE),
          t = Math.floor(this._selectAct.node.y / d.default.SIZE);
        this.selectAct(e, t);
      }
      if (this._selectAct) {
        let e = l.Util.convertPosition(this.content, this.mask.node, this._selectAct.node.position);
        this.content.x = -e.x;
        this.content.y = -e.y;
      }
    });
  }
  onOkBtn() {
    this.closePanel();
    this._selectAct && this.selectCallBack && this.selectCallBack(this._selectAct.actType, this._selectAct.actId);
  }
};
i([m(cc.Label)], f.prototype, "labelTitle", void 0);
i([m(cc.Mask)], f.prototype, "mask", void 0);
i([m(cc.Node)], f.prototype, "content", void 0);
i([m(h.default)], f.prototype, "actPrefab", void 0);
i([m(cc.Node)], f.prototype, "select", void 0);
i([m(s.default)], f.prototype, "okBtn", void 0);
f = i([u], f);
exports.default = f;