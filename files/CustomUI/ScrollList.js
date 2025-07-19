"use strict";

var i,
  n = this && this.__decorate || function (e, t, o, i) {
    var n,
      a = arguments.length,
      s = a < 3 ? t : null === i ? i = Object.getOwnPropertyDescriptor(t, o) : i;
    if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) s = Reflect.decorate(e, t, o, i);else for (var r = e.length - 1; r >= 0; r--) (n = e[r]) && (s = (a < 3 ? n(s) : a > 3 ? n(t, o, s) : n(t, o)) || s);
    return a > 3 && s && Object.defineProperty(t, o, s), s;
  };
exports.ExtraData = void 0;
const {
  ccclass: a,
  menu: s,
  property: r
} = cc._decorator;
var l;
(function (e) {
  e[e.Hor = 0] = "Hor";
  e[e.Ver = 1] = "Ver";
  e[e.Grid = 2] = "Grid";
})(l || (l = {}));
class c {
  constructor() {
    this.data = null;
    this.prefab = null;
    this.item = null;
    this.x = 0;
    this.y = 0;
    this.top = 0;
    this.bottom = 0;
    this.left = 0;
    this.right = 0;
  }
}
exports.ExtraData = c;
let d = i = class extends cc.ScrollView {
  constructor() {
    super(...arguments);
    this.paddingLeft = 0;
    this.paddingRight = 0;
    this.paddingTop = 0;
    this.paddingBottom = 0;
    this.spacingX = 0;
    this.spacingY = 0;
    this.layoutType = l.Hor;
    this.autoCenter = !1;
    this.emitContentMove = !1;
    this.prefabs = [];
    this.mask = null;
    this.dataArr = [];
    this.extraArr = [];
    this._offset = null;
    this._pos = null;
    this._isDirty = !0;
    this.lastStartIdx = -1;
    this.lastEndIdx = -1;
    this.getPrefabName = () => this.prefabs[0].name;
    this.calculateSizeFunc = (e, t) => ({
      w: t.prefab.width,
      h: t.prefab.height
    });
    this.canSelect = () => !0;
    this.pools = new Map();
    this.curSelectIdx = -1;
  }
  onLoad() {
    for (let e = 0; e < this.prefabs.length; e++) this.prefabs[e].active = !1;
    this.node.on("scrolling", this.onScrolling, this);
    this.node.on(cc.Node.EventType.TOUCH_END, this.onTouchEnd3, this);
    this.node.on(cc.Node.EventType.TOUCH_CANCEL, this.onTouchEnd3, this);
  }
  onTouchEnd3() {
    if (this.autoCenter) {
      let e = this.getScrollOffset();
      if (this.layoutType == l.Ver) {
        let t = -e.y + this.mask.node.height / 2,
          o = 1e5,
          i = 0;
        for (let e = 0; e < this.extraArr.length; e++) {
          let n = this.extraArr[e],
            a = Math.abs(n.y - t);
          if (a < o) {
            o = a;
            i = e;
          }
        }
        this.centerToIdx(i, .3);
      } else if (this.layoutType == l.Hor) {
        let t = -e.x + this.mask.node.width / 2,
          o = 1e5,
          i = 0;
        for (let e = 0; e < this.extraArr.length; e++) {
          let n = this.extraArr[e],
            a = Math.abs(n.x - t);
          if (a < o) {
            o = a;
            i = e;
          }
        }
        this.centerToIdx(i, .3);
      }
    }
  }
  onDisable() {
    this._pos = this.content.getPosition();
    this._offset = this.getScrollOffset();
    super.onDisable();
  }
  onEnable() {
    super.onEnable();
    this._offset && this.scheduleOnce(() => {
      console.log(`setContentPosition ${this._offset}`);
      this.content.setPosition(this._pos);
      this.scrollToOffset(this._offset, 0);
      this._isDirty = !0;
    });
  }
  onScrolling() {
    this.scheduleOnce(() => {
      this._isDirty = !0;
    });
  }
  update(e) {
    super.update(e);
    if (this._isDirty) {
      this.updateList();
      this._isDirty = !1;
    }
  }
  updateList() {
    let e = this.getScrollOffset(),
      t = -1,
      o = -1;
    for (let i = 0; i < this.extraArr.length; i++) {
      let n = this.extraArr[i];
      if (this.layoutType == l.Ver) {
        -n.bottom > e.y && -1 == t && (t = i);
        -n.top < e.y + this.mask.node.height && (o = i);
      } else if (this.layoutType == l.Hor) {
        n.right > -e.x && -1 == t && (t = i);
        n.left < -e.x + this.mask.node.width && (o = i);
      } else {
        -n.bottom > e.y && -1 == t && (t = i);
        -n.top < e.y + this.mask.node.height && (o = i);
      }
    }
    if (this.lastStartIdx !== t || this.lastEndIdx !== o) {
      this.lastStartIdx = t;
      this.lastEndIdx = o;
      for (let e = 0; e < this.dataArr.length; e++) {
        let n = this.dataArr[e],
          a = this.extraArr[e];
        if (a) if (e >= t && e <= o) {
          if (!a.item) {
            a.item = this.newItem(a.prefab);
            a.item.x = a.x;
            a.item.y = a.y;
            a.item.emit(i.SET_DATA, n);
            a.item.emit(i.ITEM_STATE_CHANGE, e == this.curSelectIdx);
          }
        } else if (a.item) {
          this.returnPool(a.prefab, a.item);
          a.item = null;
        }
      }
    }
    if (this.emitContentMove) {
      let t = e.sub(cc.v2(this.mask.node.width / 2, this.mask.node.height / 2));
      for (let e = 0; e < this.extraArr.length; e++) {
        let o = this.extraArr[e];
        o.item && o.item.emit(i.CONTENT_MOVE, t);
      }
    }
  }
  setDataArr(e) {
    this.reset();
    e = e || [];
    this.dataArr = e;
    for (; this.extraArr.length < e.length;) this.extraArr.push(new c());
    let t = this.paddingTop,
      o = this.paddingLeft,
      i = 0;
    for (let n = 0; n < e.length; n++) {
      let a = e[n],
        s = this.extraArr[n];
      s.data = a;
      let r = this.getPrefabName(a, s);
      for (let e = 0; e < this.prefabs.length; e++) if (this.prefabs[e].name == r) {
        s.prefab = this.prefabs[e];
        break;
      }
      let c = this.calculateSizeFunc(a, s);
      if (this.layoutType == l.Ver) {
        s.top = -t;
        t += (1 - s.prefab.anchorY) * c.h;
        s.x = 0;
        s.y = -t;
        t += s.prefab.anchorY * c.h;
        s.bottom = -t;
        t += this.spacingY;
      } else if (this.layoutType == l.Hor) {
        s.left = o;
        o += (1 - s.prefab.anchorX) * c.w;
        s.x = o;
        o += s.prefab.anchorX * c.w;
        s.right = o;
        o += this.spacingX;
      } else {
        if (this.mask.node.width - o - this.paddingRight < c.w) {
          o = this.paddingLeft;
          i = (t += c.h + this.spacingY) + c.h + this.paddingBottom;
        }
        s.top = -t;
        s.bottom = -c.h - t;
        s.y = -t - (1 - s.prefab.anchorY) * c.h;
        s.left = o;
        o += (1 - s.prefab.anchorX) * c.w;
        s.x = o;
        o += s.prefab.anchorX * c.w;
        s.right = o;
        o += this.spacingX;
      }
    }
    if (this.layoutType == l.Ver) {
      t += this.paddingBottom;
      this.content.height = t;
    } else if (this.layoutType == l.Hor) {
      o += this.paddingRight;
      this.content.width = o;
    } else {
      this.content.width = this.mask.node.width;
      this.content.height = i;
    }
    this.scheduleOnce(() => {
      this._isDirty = !0;
    });
  }
  reset() {
    this.lastStartIdx = -1;
    this.lastEndIdx = -1;
    for (let e = 0; e < this.extraArr.length; e++) {
      let t = this.extraArr[e];
      if (t.item) {
        this.returnPool(t.prefab, t.item);
        t.item = null;
      }
    }
  }
  centerToIdx(e, t) {
    if (this.layoutType == l.Ver) {
      if (e < 0) this.scrollTo(cc.v2(1, 1), t);else if (e >= this.extraArr.length) this.scrollTo(cc.v2(0, 0), t);else {
        let o = 1 - (-this.extraArr[e].top - this.mask.node.height / 2) / (this.content.height - this.mask.node.height);
        this.scrollTo(cc.v2(0, o), t);
      }
    } else if (this.layoutType == l.Hor) if (e < 0) this.scrollTo(cc.v2(0, 0), t);else if (e >= this.extraArr.length) this.scrollTo(cc.v2(1, 1), t);else {
      let o = (this.extraArr[e].x - this.mask.node.width / 2) / (this.content.width - this.mask.node.width);
      this.scrollTo(cc.v2(o, 0), t);
    }
  }
  newItem(e) {
    let t = this.pools.get(e) || [];
    this.pools.set(e, t);
    let o = null;
    if (t.length > 0) o = t.shift();else {
      o = cc.instantiate(e);
      this.content.addChild(o);
      o.on("click", this.onItemTap, this);
    }
    exports.active = !0;
    this.layoutType == l.Ver ? exports.x = 0 : this.layoutType == l.Hor && (exports.y = 0);
    return o;
  }
  returnPool(e, t) {
    let o = this.pools.get(e) || [];
    this.pools.set(e, o);
    o.push(t);
    t.active = !1;
    this.layoutType == l.Ver ? t.x = -1e5 : this.layoutType == l.Hor ? t.y = -1e5 : t.x = t.y = -1e5;
  }
  onItemTap(e) {
    let t = e.target,
      o = this.extraArr,
      n = this.dataArr;
    for (let e = 0; e < n.length; e++) {
      let a = n[e],
        s = o[e];
      if (s.item == t) {
        this.canSelect(a, s) && this.selectByIdx(e);
        this.node.emit(i.CLICK_ITEM, e, a);
      }
    }
  }
  selectByIdx(e) {
    if (this.curSelectIdx >= 0 && this.curSelectIdx < this.extraArr.length) {
      let e = this.extraArr[this.curSelectIdx];
      e.item && e.item.emit(i.ITEM_STATE_CHANGE, !1);
    }
    this.curSelectIdx != e && this.node.emit(i.SELECT_ITEM, e, this.dataArr[e]);
    this.curSelectIdx = e;
    let t = this.extraArr[e];
    t && t.item && t.item.emit(i.ITEM_STATE_CHANGE, !0);
  }
  getCurData() {
    return this.dataArr[this.curSelectIdx];
  }
  getExtraData(e) {
    return this.extraArr[e];
  }
  getDataArr() {
    return this.dataArr;
  }
};
d.SET_DATA = "SET_DATA";
d.CONTENT_MOVE = "CONTENT_MOVE";
d.ITEM_STATE_CHANGE = "ITEM_STATE_CHANGE";
d.SELECT_ITEM = "SELECT_ITEM";
d.CLICK_ITEM = "CLICK_ITEM";
n([r], d.prototype, "paddingLeft", void 0);
n([r], d.prototype, "paddingRight", void 0);
n([r], d.prototype, "paddingTop", void 0);
n([r], d.prototype, "paddingBottom", void 0);
n([r], d.prototype, "spacingX", void 0);
n([r], d.prototype, "spacingY", void 0);
n([r({
  type: cc.Enum(l),
  displayName: "LayoutType"
})], d.prototype, "layoutType", void 0);
n([r], d.prototype, "autoCenter", void 0);
n([r], d.prototype, "emitContentMove", void 0);
n([r({
  type: [cc.Node]
})], d.prototype, "prefabs", void 0);
n([r(cc.Mask)], d.prototype, "mask", void 0);
d = i = n([a, s("自定义UI/ScrollList")], d);
exports.default = d;