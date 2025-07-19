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
  s = e("../../CustomUI/ToggleGroup"),
  r = e("../../Frame/Panel"),
  l = e("../../Frame/SceneManager"),
  c = e("../../Frame/Top"),
  d = e("../../Frame/UIColor"),
  h = e("../../Frame/Util"),
  p = e("../../Game/Player/ReportMng"),
  u = e("../../Game/Player/ShopMng"),
  {
    ccclass: m,
    property: f
  } = cc._decorator;
let g = class extends r.default {
  constructor() {
    super(...arguments);
    this.btn = null;
    this.btnLayout = null;
    this.scoreToggleGroup = null;
    this.msgEditBox = null;
    this.okBtn = null;
    this.goodsId = 0;
  }
  onLoad() {
    super.onLoad();
    this.okBtn.node.on(a.default.CLICK, this.onOkBtn, this);
  }
  addBtn(e, t, o) {
    let i = cc.instantiate(this.btn.node);
    this.btnLayout.addChild(i);
    i.getComponent(a.default).label.string = e;
    i.on(a.default.CLICK, () => {
      this.scoreToggleGroup.selectIdx(t);
      this.msgEditBox.string = o;
    });
  }
  setData(e) {
    return n(this, void 0, void 0, function* () {
      this.goodsId = e;
      let t = (yield u.default.Ins.loadGoodsCellDatas([e]))[0];
      this.addBtn("SCP", 0, "应抖音审核方要求，不能发布SCP相关内容");
      this.addBtn("挑拨引战", 1, `您的素材：《${t.name}》由于‘挑拨引战’被下架`);
      this.addBtn("引人不适", 1, `您的素材：《${t.name}》由于‘引人不适’被下架`);
      this.addBtn("图标违规", 1, `您的素材：《${t.name}》由于‘图标违规’被下架`);
      this.addBtn("低俗色情", 3, `您的素材：《${t.name}》由于‘低俗色情’被下架`);
      this.addBtn("政治敏感", 3, `您的素材：《${t.name}》由于‘政治敏感’被下架`);
      this.btn.node.active = !1;
    });
  }
  onOkBtn() {
    return n(this, void 0, void 0, function* () {
      l.default.ins.OpenPanelByName("MessageBox", e => {
        e.label.string = "是否下架商品？";
        e.setLeftBtn({
          text: "是",
          color: d.UIColor.pink,
          call: () => n(this, void 0, void 0, function* () {
            yield this.doBanGoods();
            this.node.dispatchEvent(h.Util.customEvent("refreshList"));
            this.closePanel();
          })
        });
        e.setRightBtn({
          text: "取消",
          color: d.UIColor.blue
        });
      });
    });
  }
  doBanGoods() {
    return n(this, void 0, void 0, function* () {
      let e = this.msgEditBox.textLabel.string,
        t = -this.scoreToggleGroup.idx;
      p.ReportMng.Ins.banGoods(this.goodsId, e, t);
      c.default.hideLoading("下线完成");
    });
  }
};
i([f(a.default)], g.prototype, "btn", void 0);
i([f(cc.Node)], g.prototype, "btnLayout", void 0);
i([f(s.default)], g.prototype, "scoreToggleGroup", void 0);
i([f(cc.EditBox)], g.prototype, "msgEditBox", void 0);
i([f(a.default)], g.prototype, "okBtn", void 0);
g = i([m], g);
exports.default = g;