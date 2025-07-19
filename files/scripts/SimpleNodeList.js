"use strict";

var i,
  n = this && this.__decorate || function (e, t, o, i) {
    var n,
      a = arguments.length,
      s = a < 3 ? t : null === i ? i = Object.getOwnPropertyDescriptor(t, o) : i;
    if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) s = Reflect.decorate(e, t, o, i);else for (var r = e.length - 1; r >= 0; r--) (n = e[r]) && (s = (a < 3 ? n(s) : a > 3 ? n(t, o, s) : n(t, o)) || s);
    return a > 3 && s && Object.defineProperty(t, o, s), s;
  };
const {
  ccclass: a,
  property: s
} = cc._decorator;
let r = i = class extends cc.Component {
  constructor() {
    super(...arguments);
    this.scrollView = null;
    this.useVirtual = !1;
    this._viewMask = null;
    this._isStart = !1;
    this._isVirtual = !1;
    this._startIdx = 0;
    this._lastStartIdx = 0;
    this._renderNum = 0;
    this._lastRenderNum = 0;
    this._maskRect = new cc.Rect();
    this._itemSizeList = [];
    this._offset = new cc.Vec2();
    this._viewNode = null;
    this._localTopY = 0;
    this._numberItems = 0;
    this._needEmitSelectIdx = -1;
    this._itemList = [];
    this._tmpV3_1 = new cc.Vec3();
    this._tmpV3_2 = new cc.Vec3();
    this._tmpV2 = new cc.Vec2();
    this._tmpMat = new cc.Mat4();
  }
  onLoad() {
    if (this.scrollView) {
      this.scrollView.node.on("scrolling", this.onScrolling, this);
      let e = null;
      for (let t of this.scrollView.node.children) if (e = t.getComponent(cc.Mask)) break;
      this._viewMask = e;
      this.resetMaskSize();
    }
  }
  resetMaskSize() {
    if (!this.useVirtual) return;
    let e = this._viewMask;
    if (e) {
      this._viewNode = e.node;
      let t = e.node.width,
        o = e.node.height;
      this._maskRect.x = 0 - e.node.anchorX * t;
      this._maskRect.y = 0 - e.node.anchorY * o;
      this._maskRect.width = t;
      this._maskRect.height = o;
      this._isVirtual = !0;
    }
  }
  onDestroy() {
    this.scrollView && this.scrollView.node.off("scrolling", this.onScrolling, this);
  }
  start() {
    this._isStart = !0;
    this.node.on(i.SET_SELECT_ITEM_NODE, e => {
      let t = this.node.children;
      for (let o of t) o.emit(i.SET_SELECT_ITEM_NODE, e);
    }, this);
    this._layout = this.getComponent(cc.Layout);
    this._layout || (this._layout = this.addComponent(cc.Layout));
    this._isVirtual && this.itemSize && (this._layout.enabled = !1);
    this._localTopY = this.node.y;
    this.refreshVirtual();
    this.refreshItems(this._renderNum);
    this._lastRenderNum = this._renderNum;
    this._lastStartIdx = this._startIdx;
  }
  SetItemPrefab(e, t) {
    e.parent = null;
    this._prefab = e;
    this._type = t;
    this._childPool = new cc.NodePool();
    this.resetMaskSize();
  }
  set numberItems(e) {
    this._numberItems = e;
    if (this._isStart) {
      this.refreshVirtual();
      this.refreshItems(this._renderNum);
      this._lastRenderNum = this._renderNum;
      this._lastStartIdx = this._startIdx;
    }
  }
  selectItem(e) {
    this._needEmitSelectIdx = e;
    if ((e -= this._startIdx) < 0 || e >= this._itemList.length) {
      this.node.emit(i.SELECT_ITEM, e, null);
      this.node.emit(i.SELECT_ITEM_NODE, e, null);
    } else {
      this._needEmitSelectIdx = -1;
      this.node.emit(i.SELECT_ITEM, e, this._itemList[e]);
      this.node.emit(i.SELECT_ITEM_NODE, e, this._itemList[e].node);
    }
  }
  onItemClick(e) {
    let t = this.node.children;
    for (let o = 0; o < t.length; ++o) {
      let n = t[o];
      if (e.target == n) {
        this._needEmitSelectIdx = -1;
        this.node.emit(i.SELECT_ITEM, o, n.getComponent(this._type));
        this.node.emit(i.SELECT_ITEM_NODE, o, n);
        break;
      }
    }
  }
  get itemList() {
    return this._itemList;
  }
  refreshItems(e) {
    let t = this.node,
      o = t.children;
    this._itemList.length = 0;
    for (let t = 0; t < e && t < o.length; ++t) {
      let e = o[t],
        i = e.getComponent(this._type);
      if (i) {
        e.active = !0;
        this._itemList.push(i);
      }
    }
    let i = o.length - this._itemList.length;
    if (i > 0) {
      let e = o.length - i;
      for (let t = o.length - 1; t >= e; --t) this._childPool.put(o[t]);
    }
    for (let o = this._itemList.length; o < e; ++o) {
      let e = this._childPool.get();
      e || (e = cc.instantiate(this._prefab)).on("click", this.onItemClick, this);
      e.parent = t;
      e.active = !0;
      null == e.parent && (e.parent = t);
      this._itemList.push(e.getComponent(this._type));
    }
    this.updateItemPosition();
    if (this.itemRender) for (let e = 0; e < this._itemList.length; ++e) this.itemRender.call(this.callThis, this._startIdx + e, this._itemList[e]);
    this._layout.enabled && this._layout.updateLayout();
  }
  updateVirtualItems() {
    let e = this.node,
      t = this._startIdx + this._renderNum,
      o = this._lastStartIdx + this._lastRenderNum,
      i = this._startIdx - this._lastStartIdx;
    if (i > 0) {
      let e = i;
      for (; e > 0 && this._itemList.length > 0;) {
        let t = this._itemList.shift();
        this._childPool.put(t.node);
        --e;
      }
    } else if (i < 0) {
      let t = -i,
        o = 0;
      for (; t > 0;) {
        let i = this._childPool.get();
        i || (i = cc.instantiate(this._prefab)).on("click", this.onItemClick, this);
        i.parent = e;
        i.active = !0;
        null == i.parent && (i.parent = e);
        this._itemList.unshift(i.getComponent(this._type));
        this.itemRender && this.itemRender.call(this.callThis, this._startIdx + o, this._itemList[0]);
        --t;
        ++o;
      }
    }
    let n = t - o;
    if (n < 0) {
      let e = -n;
      for (; e > 0 && this._itemList.length > 0;) {
        let t = this._itemList.pop();
        this._childPool.put(t.node);
        --e;
      }
    } else if (n > 0) {
      let t = n,
        o = this._itemList.length;
      for (; t > 0;) {
        let i = this._childPool.get();
        i || (i = cc.instantiate(this._prefab)).on("click", this.onItemClick, this);
        i.parent = e;
        i.active = !0;
        null == i.parent && (i.parent = e);
        this._itemList.push(i.getComponent(this._type));
        this.itemRender && this.itemRender.call(this.callThis, this._startIdx + o, this._itemList[o]);
        --t;
        ++o;
      }
    }
  }
  onScrolling() {
    if (this._isVirtual && this.itemSize && 0 != this._numberItems) {
      this.refreshVirtual();
      if (this._lastRenderNum != this._renderNum || this._lastStartIdx != this._startIdx) {
        this.updateVirtualItems();
        this._needEmitSelectIdx >= 0 && this.selectItem(this._needEmitSelectIdx);
        this._lastRenderNum = this._renderNum;
        this._lastStartIdx = this._startIdx;
      }
      this.updateItemPosition();
    }
  }
  refreshVirtual() {
    if (!this._isVirtual || !this.itemSize || 0 == this._numberItems) {
      this._startIdx = 0;
      this._renderNum = this._numberItems;
      return;
    }
    this.resetMaskSize();
    this._viewNode.getWorldMatrix(this._tmpMat);
    let e = this._tmpMat.getTranslation(this._tmpV3_1);
    this.node.parent.getWorldMatrix(this._tmpMat);
    let t = this._tmpMat.getTranslation(this._tmpV3_2).y - e.y;
    this.node.getWorldMatrix(this._tmpMat);
    let o = t + this.node.y,
      i = o;
    this._startIdx = 0;
    for (let e = 0; e < this._numberItems; ++e) {
      this.itemSize(e, this._tmpV2);
      let t = this._tmpV2.y;
      this._layout && (t += this._layout.spacingY);
      if (i - t < this._maskRect.yMax) break;
      i -= t;
      ++this._startIdx;
    }
    this._renderNum = 0;
    this._offset.y = i - t;
    this._itemSizeList.length = 0;
    for (let e = this._startIdx; e < this._numberItems; ++e) {
      this.itemSize(e, this._tmpV2);
      this._itemSizeList.push({
        w: this._tmpV2.x,
        h: this._tmpV2.y
      });
      let t = this._tmpV2.y;
      this._layout && (t += this._layout.spacingY);
      if (i + t < this._maskRect.yMin) break;
      ++this._renderNum;
      i -= t;
    }
    if (i > this._maskRect.yMin && this._renderNum < this._lastRenderNum && this._lastRenderNum <= this._numberItems) {
      this._startIdx = this._lastStartIdx;
      this._renderNum = this._lastRenderNum;
      this._startIdx + this._renderNum > this._numberItems && (this._renderNum = this._numberItems - this._startIdx);
      i = o;
      for (let e = 0; e < this._startIdx; ++e) {
        this.itemSize(e, this._tmpV2);
        let t = this._tmpV2.y;
        this._layout && (t += this._layout.spacingY);
        i -= t;
      }
      this._offset.y = i - t;
      this._itemSizeList.length = 0;
      for (let e = 0; e < this._renderNum; ++e) {
        this.itemSize(this._startIdx + e, this._tmpV2);
        this._itemSizeList.push({
          w: this._tmpV2.x,
          h: this._tmpV2.y
        });
      }
    }
  }
  updateItemPosition() {
    if (!this._isVirtual || !this.itemSize || 0 == this._numberItems) return;
    let e = this._renderNum,
      t = this._offset.y - this.node.y - this._layout.paddingTop;
    for (let o = 0; o < e; ++o) {
      this._itemList[o].node.y = t;
      t -= this._itemSizeList[o].h;
      this._layout && (t -= this._layout.spacingY);
    }
    this.node.height = -t;
  }
};
r.SELECT_ITEM = "SELECT_ITEM";
r.SELECT_ITEM_NODE = "SELECT_ITEM_NODE";
r.SET_SELECT_ITEM_NODE = "SET_SELECT_ITEM_NODE";
r.ADD_NEW_ITEM = "ADD_NEW_ITEM";
n([s(cc.ScrollView)], r.prototype, "scrollView", void 0);
r = i = n([a], r);
exports.default = r;