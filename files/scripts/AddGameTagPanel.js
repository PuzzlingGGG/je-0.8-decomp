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
  r = e("../../Frame/Top"),
  l = e("../../Frame/UIColor"),
  c = e("../../Frame/Util"),
  d = e("../../Game/Player/DynamicMng"),
  h = e("../../Game/Player/GameTagMng"),
  p = e("../../Scene/GameCoverScene/GameCoverScene"),
  {
    ccclass: u,
    property: m
  } = cc._decorator;
let f = class extends s.default {
  constructor() {
    super(...arguments);
    this.tagBtn = null;
    this.editBox = null;
    this.scrollView = null;
    this.okBtn = null;
    this.tagsByMe = [];
    this.data = null;
    this.tipLabel = null;
  }
  setTip(e) {
    this.tipLabel.string = `同一标签达到${e}人次时，游戏才能获得这个标签`;
  }
  onLoad() {
    super.onLoad();
    this.okBtn.node.on(a.default.CLICK, this.onOkBtn, this);
  }
  setData(e) {
    this.data = e;
    this.tagsByMe = h.default.Ins.getTagsByMe(e.gameId);
    this.refresh();
  }
  refresh() {
    return n(this, void 0, void 0, function* () {
      let e = [],
        t = (yield d.DynamicMng.Ins.loadOne("GameTags")) || [];
      for (let o = 0; o < t.length; o++) {
        let i = t[o];
        e.push(i.tag);
      }
      for (let t = 0; t < this.data.tagList.length; t++) {
        let o = this.data.tagList[t];
        !e.includes(o.tagMsg) && o.recommendTimes > 0 && e.push(o.tagMsg);
      }
      for (let t = 0; t < this.tagsByMe.length; t++) {
        let o = this.tagsByMe[t];
        e.includes(o) || e.push(o);
      }
      c.Util.makeBro(this.tagBtn.node, e.length, (t, o) => {
        let i = t.getComponent(a.default),
          n = e[o],
          s = this.tagsByMe.includes(n);
        this.initBtn(i, n, s);
      });
      c.Util.flowLayout(this.tagBtn.node.parent, 10, 10);
    });
  }
  initBtn(e, t, o) {
    e.taged = o;
    e.label.string = t;
    this.updateBtn(e, o);
    c.Util.updateLabel(e.label);
    e.node.width = e.label.node.width + 20;
    e.node.targetOff(this);
    e.node.on(a.default.CLICK, () => {
      let t = e.taged;
      t = !t;
      e.taged = t;
      this.updateBtn(e, t);
    }, this);
  }
  updateBtn(e, t) {
    e.node.color = t ? l.UIColor.lightBlue : l.UIColor.lightGray;
    e.label.node.color = t ? l.UIColor.darkBlue : l.UIColor.gray;
  }
  onEditEnd() {
    let e = this.editBox.textLabel.string;
    if ((e = e.trim()).length > 10) {
      r.default.showToast("最多10个字");
      return;
    }
    if (!e) return;
    let t = this.tagBtn.node.parent;
    for (let o = 0; o < t.childrenCount; o++) if (t.children[o].getComponentInChildren(cc.Label).string == e) {
      r.default.showToast("标签已存在");
      return;
    }
    this.editBox.string = "";
    let o = cc.instantiate(this.tagBtn.node);
    this.tagBtn.node.parent.addChild(o);
    let i = o.getComponent(a.default);
    this.initBtn(i, e, !0);
    c.Util.flowLayout(this.tagBtn.node.parent, 10, 10);
    this.scrollView.scrollToBottom(.3);
  }
  onOkBtn() {
    return n(this, void 0, void 0, function* () {
      let e = [],
        t = [],
        o = [],
        i = this.tagBtn.node.parent;
      for (let n = 0; n < i.children.length; n++) {
        let s = i.children[n];
        if (s.active) {
          let i = s.getComponent(a.default),
            n = i.label.string;
          i.taged && o.push(n);
          this.tagsByMe.includes(n) && !i.taged && t.push(n);
          !this.tagsByMe.includes(n) && i.taged && e.push(n);
        }
      }
      if (o.length > 5) r.default.showToast("最多可选5个标签");else {
        if (e.length || t.length) {
          r.default.showLoading("正在上传");
          if (yield h.default.Ins.uploadGameTag(this.data.gameId, e, t)) {
            r.default.hideLoading("编辑已提交");
            h.default.Ins.saveTagsByMe(this.data.gameId, o);
            cc.game.emit(p.default.GameCoverScene_Refresh);
          } else r.default.hideLoading("上传标签失败");
        }
        this.closePanel();
      }
    });
  }
};
i([m(a.default)], f.prototype, "tagBtn", void 0);
i([m(cc.EditBox)], f.prototype, "editBox", void 0);
i([m(cc.ScrollView)], f.prototype, "scrollView", void 0);
i([m(a.default)], f.prototype, "okBtn", void 0);
i([m(cc.Label)], f.prototype, "tipLabel", void 0);
f = i([u], f);
exports.default = f;