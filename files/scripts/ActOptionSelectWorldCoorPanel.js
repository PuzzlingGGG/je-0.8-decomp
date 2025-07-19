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
  s = e("../../Frame/Panel"),
  r = e("../../Frame/Util"),
  l = e("../../Game/Player/Mng"),
  c = e("../../Game/World/Tile"),
  d = e("../../GameData/GameTypeDefine"),
  {
    ccclass: h,
    property: p
  } = cc._decorator;
let u = class extends s.default {
  constructor() {
    super(...arguments);
    this.mask = null;
    this.content = null;
    this.spritePrefab = null;
    this.select = null;
    this.okBtn = null;
    this.selectCall = null;
    this.hero = null;
  }
  onLoad() {
    super.onLoad();
    this.okBtn.node.on(a.default.CLICK, this.onOkBtn, this);
    this.mask.node.on(cc.Node.EventType.TOUCH_END, this.onTouchEnd8, this);
    this.mask.node.on(cc.Node.EventType.TOUCH_MOVE, this.onTouchMove8, this);
  }
  onTouchMove8(e) {
    let t = this.content.position;
    t.addSelf(e.getDelta());
    this.content.position = t;
  }
  onTouchEnd8(e) {
    if (e.getLocation().sub(e.getStartLocation()).magSqr() < 10) {
      let t = this.content.convertToNodeSpaceAR(e.getLocation());
      if (t.x >= 0 && t.x < this.content.width && t.y >= 0 && t.y < this.content.height) {
        let e = Math.floor(t.x / c.default.SIZE),
          o = Math.floor(t.y / c.default.SIZE);
        this.selectCoor(e, o);
      }
    }
  }
  selectCoor(e, t) {
    this.select.x = (e + .5) * c.default.SIZE;
    this.select.y = (t + .5) * c.default.SIZE;
    this.select.getComponentInChildren(cc.Label).string = `(${e},${t})`;
    if (this.hero) {
      this.hero.x = this.select.x;
      this.hero.y = this.select.y;
    }
  }
  setData(e, t) {
    return n(this, void 0, void 0, function* () {
      let o = yield l.Mng.Ins.worldMng.loadOne(e, !0);
      if (!o) return;
      let i = o.worldLayout.bgColor;
      this.content.color = cc.color(i.r, i.g, i.b, i.a);
      this.content.width = o.worldLayout.size.col * c.default.SIZE;
      this.content.height = o.worldLayout.size.row * c.default.SIZE;
      for (let e = 0; e < o.worldLayout.actors.length; e++) {
        let t = cc.instantiate(this.spritePrefab);
        this.content.insertChild(t, 0);
        let i = o.worldLayout.actors[e],
          n = yield l.Mng.Ins.actorMng.loadOne(i.data.confId);
        t.x = i.pos.x;
        t.y = i.pos.y;
        let a = t.getComponent(cc.Sprite);
        l.Mng.Ins.spriteMng.setActorSprite(a, n.textureName, c.default.SIZE);
        this.hero || i.data.team != d.Team.Hero || (this.hero = t);
      }
      for (let e = 0; e < o.worldLayout.devices.length; e++) {
        let t = cc.instantiate(this.spritePrefab);
        this.content.insertChild(t, 0);
        let i = o.worldLayout.devices[e],
          n = yield l.Mng.Ins.deviceMng.loadOne(i.data.confId);
        t.x = i.pos.x;
        t.y = i.pos.y;
        let a = t.getComponent(cc.Sprite);
        l.Mng.Ins.spriteMng.setDeviceSprite(a, n.textureName, c.default.SIZE);
      }
      for (let e = 0; e < o.worldLayout.props.length; e++) {
        let t = cc.instantiate(this.spritePrefab);
        this.content.insertChild(t, 0);
        let i = o.worldLayout.props[e],
          n = yield l.Mng.Ins.propMng.loadOne(i.data.confId);
        t.x = i.pos.x;
        t.y = i.pos.y;
        let a = t.getComponent(cc.Sprite);
        l.Mng.Ins.spriteMng.setTileSprite(a, n.textureName, c.default.SIZE);
      }
      for (let e = 0; e < o.worldLayout.tiles.length; e++) {
        let t = cc.instantiate(this.spritePrefab);
        this.content.insertChild(t, 0);
        let i = o.worldLayout.tiles[e],
          n = yield l.Mng.Ins.tileMng.loadOne(i.data.confId);
        t.x = (i.pos.iCol + .5) * t.width;
        t.y = (i.pos.iRow + .5) * t.height;
        let a = t.getComponent(cc.Sprite);
        l.Mng.Ins.spriteMng.setTileSprite(a, n.textureName, c.default.SIZE);
      }
      if (!t || 0 == t.iCol && 0 == t.iRow) {
        if (this.hero) {
          let e = Math.floor(this.hero.x / c.default.SIZE),
            t = Math.floor(this.hero.y / c.default.SIZE);
          this.selectCoor(e, t);
        } else if (o.worldLayout.startPoint && o.worldLayout.startPoint.pos) {
          let e = o.worldLayout.startPoint.pos,
            t = Math.floor(e.x / c.default.SIZE),
            i = Math.floor(e.y / c.default.SIZE);
          this.selectCoor(t, i);
        }
      } else this.selectCoor(t.iCol, t.iRow);
      if (this.hero) {
        let e = r.Util.convertPosition(this.content, this.mask.node, this.hero.position);
        this.content.x = -e.x;
        this.content.y = -e.y;
      } else if (o.worldLayout.startPoint && o.worldLayout.startPoint.pos) {
        let e = o.worldLayout.startPoint.pos;
        this.content.x = -e.x;
        this.content.y = -e.y;
      }
    });
  }
  onOkBtn() {
    this.closePanel();
    let e = Math.floor(this.select.x / c.default.SIZE),
      t = Math.floor(this.select.y / c.default.SIZE);
    this.selectCall && this.selectCall({
      iCol: e,
      iRow: t
    });
  }
};
i([p(cc.Mask)], u.prototype, "mask", void 0);
i([p(cc.Node)], u.prototype, "content", void 0);
i([p(cc.Node)], u.prototype, "spritePrefab", void 0);
i([p(cc.Node)], u.prototype, "select", void 0);
i([p(a.default)], u.prototype, "okBtn", void 0);
u = i([h], u);
exports.default = u;