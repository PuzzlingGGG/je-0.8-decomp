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
const s = e("../../GameData/GameTypeDefine"),
  r = e("../Player/Mng"),
  l = e("../World/Device"),
  {
    ccclass: c,
    property: d
  } = cc._decorator;
let h = i = class extends l.default {
  constructor() {
    super(...arguments);
    this.sprite = null;
  }
  onLoad() {
    super.onLoad();
  }
  getBoundingBox() {
    let e = this.width,
      t = this.height,
      o = this.node.x + this.node.parent.x - this.node.width * Math.abs(this.node.scaleX) * this.node.anchorX,
      i = this.node.y + this.node.parent.y - this.node.height * Math.abs(this.node.scaleY) * this.node.anchorY;
    this._boundingBox.x = o;
    this._boundingBox.y = i;
    this._boundingBox.width = e;
    this._boundingBox.height = t;
    return this._boundingBox;
  }
  setData(e, t) {
    super.setData(e, t);
    e = this.data;
    r.Mng.Ins.spriteMng.setDeviceSprite(this.sprite, t.textureName, 64);
    e.extra || (e.extra = {
      layer: s.DecoratorLayerType.Background02,
      scale: 8,
      flipx: !1,
      flipy: !1,
      angle: 0,
      opacity: 255
    });
    this.node.angle = e.extra.angle;
    this.node.scale = e.extra.scale;
    this.sprite.node.scaleX = this.data.extra.flipx ? -1 : 1;
    this.sprite.node.scaleY = this.data.extra.flipy ? -1 : 1;
    this.sprite.node.opacity = this.data.extra.opacity || 255;
    this.world.addToLayer(this.data.extra.layer, this.node);
  }
  getLayer() {
    let e = s.DecoratorLayerType.MapFore;
    this.data && this.data.extra && (e = this.data.extra.layer);
    return e;
  }
  initInspector(e) {
    i.initInspector(e, this.conf, this, this.data);
  }
  static initInspector(e, t, o = null, i = null) {
    let n = i || t;
    n.extra = n.extra || {
      layer: s.DecoratorLayerType.Background02,
      scale: 8,
      flipx: !1,
      flipy: !1,
      angle: 0
    };
    o && e.addHead(t.name, t.textureName);
    let r = null,
      l = [],
      c = [{
        str: "超远景",
        type: s.DecoratorLayerType.Background02
      }, {
        str: "远景",
        type: s.DecoratorLayerType.Background01
      }, {
        str: "地图后面",
        type: s.DecoratorLayerType.MapBack
      }, {
        str: "角色后",
        type: s.DecoratorLayerType.Map
      }, {
        str: "地图前面",
        type: s.DecoratorLayerType.MapFore
      }, {
        str: "近景",
        type: s.DecoratorLayerType.Foreground01
      }],
      d = [{
        str: "超远景",
        type: s.DecoratorLayerType.Background02
      }, {
        str: "远景",
        type: s.DecoratorLayerType.Background01
      }, {
        str: "地图后面",
        type: s.DecoratorLayerType.MapBack
      }, {
        str: "与角色排序",
        type: s.DecoratorLayerType.Map
      }, {
        str: "地图前面",
        type: s.DecoratorLayerType.MapFore
      }, {
        str: "近景",
        type: s.DecoratorLayerType.Foreground01
      }];
    o ? (r = o.world).worldLayout.type == s.WorldType.Jump ? l = c : r.worldLayout.type == s.WorldType.Rpg && (l = d) : l = d;
    let h = l.findIndex(e => e.type == n.extra.layer);
    -1 == h && (h = 0);
    e.addDropDownBox("所在层", l, h, (e, t) => a(this, void 0, void 0, function* () {
      n.extra.layer = t.type;
      r && o && r.addToLayer(n.extra.layer, o.node);
    }));
    e.addNumberEditBox("透明度", n.extra.opacity || 255, 0, 255, e => {
      n.extra.opacity = e;
      o && (o.sprite.node.opacity = e);
    });
    e.addNumberEditBox("缩放", n.extra.scale, .2, 16, e => {
      n.extra.scale = e;
      if (r && o) {
        o.node.scale = e;
        r.placeGizmos.setScale(e);
      }
    });
    e.addNumberEditBox("角度", n.extra.angle, 0, 360, e => {
      n.extra.angle = e;
      o && (o.node.angle = e);
    });
    e.addToggle("水平翻转", n.extra.flipx, e => {
      n.extra.flipx = e;
      o && (o.sprite.node.scaleX = e ? -1 : 1);
    });
    e.addToggle("上下翻转", n.extra.flipy, e => {
      n.extra.flipy = e;
      o && (o.sprite.node.scaleY = e ? -1 : 1);
    });
  }
};
n([d({
  override: !0,
  type: cc.Sprite
})], h.prototype, "sprite", void 0);
h = i = n([c], h);
exports.default = h;