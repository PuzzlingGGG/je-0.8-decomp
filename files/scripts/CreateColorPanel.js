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
const a = e("../../../scripts/_autogen/data/data"),
  s = e("../../CustomUI/Button"),
  r = e("../../CustomUI/Slider"),
  l = e("../../Frame/Panel"),
  c = e("../../Frame/SceneManager"),
  d = e("../../Frame/Util"),
  h = e("../../Game/Player/ColorMng"),
  p = e("../../Scene/PaintScene/PaintScene"),
  u = e("../../Frame/UIColor"),
  {
    ccclass: m,
    property: f
  } = cc._decorator;
let g = class extends l.default {
  constructor() {
    super(...arguments);
    this.sprite = null;
    this.createBtn = null;
    this.saveBtn = null;
    this.deleteBtn = null;
    this.rSlider = null;
    this.gSlider = null;
    this.bSlider = null;
    this.colorDataId = 0;
    this.call = null;
  }
  onLoad() {
    super.onLoad();
    this.createBtn.node.on(s.default.CLICK, this.onCreateBtn, this);
    this.deleteBtn.node.on(s.default.CLICK, this.onDeleteBtn, this);
    this.saveBtn.node.on(s.default.CLICK, this.onSaveBtn, this);
    let e = (e, t, o, i) => {
      let a = e.getComponentInChildren(cc.Graphics),
        l = e.getComponentInChildren(s.default);
      for (let n = 0; n < e.node.width; n++) {
        let s = 255 * n / e.node.width;
        a.fillColor = cc.color(s * t, s * o, s * i);
        a.fillRect(n, 0, 1, e.node.height);
        a.fill();
      }
      l.node.on(s.default.CLICK, () => {
        c.default.ins.OpenPanelByName("NumberInputPanel", t => {
          let o = e.value;
          t.setData("摄像机缩放", o, t => n(this, void 0, void 0, function* () {
            t = d.Util.clamp(t, 0, 255);
            e.value = t;
          }));
        });
      });
      e.node.on(r.default.MOVE, e => {
        l.label.string = e;
        let t = this.rSlider.value,
          o = this.gSlider.value,
          i = this.bSlider.value;
        this.sprite.node.color = cc.color(t, o, i);
      }, this);
    };
    e(this.rSlider, 1, 0, 0);
    e(this.gSlider, 0, 1, 0);
    e(this.bSlider, 0, 0, 1);
  }
  setColor(e, t) {
    this.colorDataId = e;
    this.rSlider.value = t.r;
    this.gSlider.value = t.g;
    this.bSlider.value = t.b;
  }
  setCreateStyle(e) {
    this.createBtn.node.active = e;
    this.saveBtn.node.active = !e;
    this.deleteBtn.node.active = !e;
  }
  setSaveStyle(e) {
    this.saveBtn.node.active = e;
    this.createBtn.node.active = !e;
    this.deleteBtn.node.active = !e;
  }
  onCreateBtn() {
    return n(this, void 0, void 0, function* () {
      let e = new a.CustomColor();
      e.id = 0;
      e.data = new a.ColorData();
      e.data.r = this.rSlider.value;
      e.data.g = this.gSlider.value;
      e.data.b = this.bSlider.value;
      let t = yield h.ColorMng.Ins.save([e]);
      if (t && t.length > 0) {
        let e = t[t.length - 1].id,
          o = c.default.ins.findScene(p.default);
        o.refreshColorList(e);
        let i = o.colorList.getDataArr().findIndex(t => t.id == e),
          n = o.colorList.getExtraData(i);
        n && n.item && o.addColorGuide(n.item);
      }
      this.closePanel();
    });
  }
  onSaveBtn() {
    return n(this, void 0, void 0, function* () {
      let e = new a.CustomColor();
      e.id = this.colorDataId;
      e.data = new a.ColorData();
      e.data.r = this.rSlider.value;
      e.data.g = this.gSlider.value;
      e.data.b = this.bSlider.value;
      this.call && this.call(e);
      this.closePanel();
    });
  }
  onDeleteBtn() {
    c.default.ins.OpenPanelByName("MessageBox", e => {
      e.label.string = "提示";
      e.label.string = "是否删除该颜色？";
      e.setLeftBtn({
        text: "好的",
        color: u.UIColor.pink,
        call: () => n(this, void 0, void 0, function* () {
          yield h.ColorMng.Ins.delete(this.colorDataId);
          c.default.ins.findScene(p.default).refreshColorList(this.colorDataId);
          this.closePanel();
        })
      });
      e.setRightBtn({
        text: "点错了",
        color: u.UIColor.blue
      });
    });
  }
};
i([f(cc.Sprite)], g.prototype, "sprite", void 0);
i([f(s.default)], g.prototype, "createBtn", void 0);
i([f(s.default)], g.prototype, "saveBtn", void 0);
i([f(s.default)], g.prototype, "deleteBtn", void 0);
i([f(r.default)], g.prototype, "rSlider", void 0);
i([f(r.default)], g.prototype, "gSlider", void 0);
i([f(r.default)], g.prototype, "bSlider", void 0);
g = i([m], g);
exports.default = g;