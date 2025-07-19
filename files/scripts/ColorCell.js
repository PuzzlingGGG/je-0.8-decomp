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
  s = e("../../CustomUI/ScrollList"),
  r = e("../../Frame/SceneManager"),
  l = e("../../Frame/UIColor"),
  c = e("../../Game/Player/ColorMng"),
  d = e("../../Scene/PaintScene/PaintScene"),
  {
    ccclass: h,
    property: p
  } = cc._decorator;
let u = class extends cc.Component {
  constructor() {
    super(...arguments);
    this.label = null;
    this.sprite = null;
    this.optionBtn = null;
    this.data = null;
  }
  onLoad() {
    this.node.on(s.default.SET_DATA, this.setData, this);
    this.node.on(s.default.ITEM_STATE_CHANGE, this.stateChange, this);
    this.optionBtn.node.on(a.default.CLICK, this.onOptionBtn, this);
  }
  setData(e) {
    this.data = e;
    this.label.string = `(${e.data.r},${e.data.g},${e.data.b})`;
    this.sprite.node.color = cc.color(this.data.data.r, this.data.data.g, this.data.data.b);
  }
  refreshData(e) {
    this.data.id = e.id;
    this.data.data.r = e.data.r;
    this.data.data.g = e.data.g;
    this.data.data.b = e.data.b;
    this.label.string = `(${e.data.r},${e.data.g},${e.data.b})`;
    this.sprite.node.color = cc.color(this.data.data.r, this.data.data.g, this.data.data.b);
  }
  stateChange(e) {
    this.node.color = e ? l.UIColor.blue : l.UIColor.white;
  }
  onOptionBtn() {
    r.default.ins.OpenPanelByName("CreateColorPanel", e => {
      let t = cc.color(this.data.data.r, this.data.data.g, this.data.data.b);
      e.setColor(this.data.id, t);
      e.setSaveStyle(!0);
      e.call = e => {
        this.refreshData(e);
      };
    });
  }
  onDeleteBtn() {
    r.default.ins.OpenPanelByName("MessageBox", e => {
      e.label.string = "提示";
      e.label.string = "是否删除该颜色？";
      e.setLeftBtn({
        text: "好的",
        color: l.UIColor.pink,
        call: () => n(this, void 0, void 0, function* () {
          yield c.ColorMng.Ins.delete(this.data.id);
          r.default.ins.findScene(d.default).refreshColorList(this.data.id);
        })
      });
      e.setRightBtn({
        text: "点错了",
        color: l.UIColor.blue
      });
    });
  }
};
i([p(cc.Label)], u.prototype, "label", void 0);
i([p(cc.Sprite)], u.prototype, "sprite", void 0);
i([p(a.default)], u.prototype, "optionBtn", void 0);
u = i([h], u);
exports.default = u;