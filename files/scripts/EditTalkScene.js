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
  r = e("../../Frame/CrossPlatform"),
  l = e("../../Frame/Pool"),
  c = e("../../Frame/Scene"),
  d = e("../../Frame/SceneManager"),
  h = e("../../Frame/Top"),
  p = e("../../Frame/UIColor"),
  u = e("../../Frame/Util"),
  m = e("../../Game/Player/DynamicMng"),
  f = e("../../Game/Player/TalkDraftMng"),
  g = e("../../Game/Player/TalkMng"),
  y = e("./TalkSectionEditorBase"),
  {
    ccclass: v,
    property: C
  } = cc._decorator;
let _ = class extends c.default {
  constructor() {
    super(...arguments);
    this.backBtn = null;
    this.titleLabel = null;
    this.titleEditBox = null;
    this.scrollView = null;
    this.appendBtn = null;
    this.draftBtn = null;
    this.menu = null;
    this.closeMenuBtn = null;
    this.textBtn = null;
    this.imgBtn = null;
    this.gameBtn = null;
    this.goodsBtn = null;
    this.projectBtn = null;
    this.publishBtn = null;
    this.officePublishBtn = null;
    this.textPool = null;
    this.imgsPool = null;
    this.gamePool = null;
    this.goodsPool = null;
    this.projectPool = null;
    this.block = null;
    this.backCall = null;
    this.publishCall = null;
    this.cancelCall = null;
    this.talkData = null;
    this.draft = null;
  }
  onLoad() {
    this.backBtn.node.on(s.default.CLICK, this.onBackBtn, this);
    this.appendBtn.node.on(s.default.CLICK, this.onAppendBtn, this);
    this.draftBtn.node.on(s.default.CLICK, this.onDraftBtn, this);
    this.textBtn.node.on(s.default.CLICK, this.onTextBtn, this);
    this.imgBtn.node.on(s.default.CLICK, this.onImgBtn, this);
    this.gameBtn.node.on(s.default.CLICK, this.onGameBtn, this);
    this.goodsBtn.node.on(s.default.CLICK, this.onGoodsBtn, this);
    this.projectBtn.node.on(s.default.CLICK, this.onProjectBtn, this);
    this.closeMenuBtn.node.on(s.default.CLICK, this.hideAppendMenu, this);
    this.block.node.on(s.default.CLICK, () => {
      r.crossPlatform.hideKeyboard({});
      this.block.node.active = !1;
    }, this);
    this.publishBtn.node.on(s.default.CLICK, () => {
      this.onPublishBtn(!1);
    }, this);
    this.officePublishBtn.node.on(s.default.CLICK, () => {
      this.onPublishBtn(!0);
    }, this);
    this.officePublishBtn.node.active = m.DynamicMng.Ins.isGmPlayer();
    this.hideAppendMenu();
    this.block.node.active = !1;
  }
  onBackBtn() {
    this.backScene(!1);
  }
  backScene(e) {
    r.crossPlatform.hideKeyboard({});
    d.default.ins.Back(() => {
      this.backCall && this.backCall();
      e ? this.publishCall && this.publishCall() : this.cancelCall && this.cancelCall();
    }, d.ShiftAnima.moveRightShift);
  }
  toCreateStyle() {
    this.titleLabel.string = "创建新帖";
  }
  toModifyStyleByDraft(e) {
    this.draft = e;
    let t = new a.TalkData();
    t.uId = e.talkId;
    t.title = e.title;
    let o = {
      sections: e.sections
    };
    t.content = o;
    this.toModifyStyle(t);
  }
  toModifyStyleTitleSections(e, t) {
    let o = new a.TalkData();
    exports.title = e;
    let i = {
      sections: t || []
    };
    exports.content = i;
    this.toModifyStyle(o);
  }
  toModifyStyle(e) {
    this.titleLabel.string = "编辑帖子";
    this.talkData = e;
    this.titleEditBox.string = e.title;
    let t = e.content;
    for (let e = 0; e < t.sections.length; e++) {
      let o = t.sections[e],
        i = null;
      switch (o.type) {
        case g.TalkSectionType.Text:
          i = this.textPool.get();
          break;
        case g.TalkSectionType.Imgs:
          i = this.imgsPool.get();
          break;
        case g.TalkSectionType.Game:
          i = this.gamePool.get();
          break;
        case g.TalkSectionType.Goods:
          i = this.goodsPool.get();
          break;
        case g.TalkSectionType.Project:
          i = this.projectPool.get();
      }
      let n = i.getComponent(y.default);
      n.menuBtn.node.on(s.default.CLICK, () => {
        this.showMenu(n);
      }, this);
      this.scrollView.content.addChild(i);
      n.setData(o);
      this.appendBtn.node.setSiblingIndex(this.scrollView.content.childrenCount - 1);
    }
  }
  onAppendBtn() {
    r.crossPlatform.hideKeyboard({});
    this.showAppendMenu(this.appendBtn.node.getSiblingIndex());
    this.scrollView.scrollTo(cc.Vec2.ZERO, .3);
  }
  showAppendMenu(e) {
    this.appendBtn.node.active = !1;
    this.menu.active = !0;
    this.scrollView.content.insertChild(this.menu, e);
    u.Util.updateAllLayout(this.scrollView.content);
  }
  hideAppendMenu() {
    this.appendBtn.node.active = !0;
    this.menu.active = !1;
    this.menu.removeFromParent(!1);
  }
  onTextBtn() {
    this.appendSectionEditor(this.textPool.get());
  }
  onImgBtn() {
    this.appendSectionEditor(this.imgsPool.get());
  }
  onGameBtn() {
    this.appendSectionEditor(this.gamePool.get());
  }
  onGoodsBtn() {
    this.appendSectionEditor(this.goodsPool.get());
  }
  onProjectBtn() {
    this.appendSectionEditor(this.projectPool.get());
  }
  makeSections() {
    let e = [],
      t = this.scrollView.content.getComponentsInChildren(y.default);
    for (let o = 0; o < t.length; o++) {
      let i = t[o].getData();
      i.type == g.TalkSectionType.Text && "" == i.text.trim() || i.type == g.TalkSectionType.Imgs && 0 == i.imgDatas.length || (i.type != g.TalkSectionType.Game || i.gameId) && (i.type != g.TalkSectionType.Goods || i.goodsId) && e.push(i);
    }
    return e;
  }
  onDraftBtn() {
    let e = this.titleEditBox.textLabel.string;
    e && "" != e.trim() ? this.draft ? d.default.ins.OpenPanelByName("MessageBox", e => {
      e.titleLabel.string = "提示";
      e.label.string = "是否更新草稿？";
      e.setLeftBtn({
        text: "点错了",
        color: p.UIColor.blue
      });
      e.setRightBtn({
        text: "是",
        color: p.UIColor.green,
        call: () => {
          this.draft.title = this.titleEditBox.textLabel.string;
          this.draft.sections = this.makeSections();
          f.default.Ins.saveDraft(this.draft);
          this.backScene(!1);
        }
      });
    }) : d.default.ins.OpenPanelByName("MessageBox", t => {
      t.titleLabel.string = "提示";
      t.label.string = "是否保存为草稿？";
      t.setLeftBtn({
        text: "点错了",
        color: p.UIColor.blue
      });
      t.setRightBtn({
        text: "是",
        color: p.UIColor.green,
        call: () => {
          var t;
          this.draft = {
            id: orange.TimeUtil.serverTime,
            talkId: null === (t = this.talkData) || void 0 === t ? void 0 : t.uId,
            title: e,
            sections: this.makeSections()
          };
          f.default.Ins.addDraft(this.draft);
          this.backScene(!1);
        }
      });
    }) : h.default.showToast("还没有写标题～");
  }
  onPublishBtn(e) {
    let t = this.titleEditBox.textLabel.string;
    t && "" != t.trim() ? d.default.ins.OpenPanelByName("MessageBox", o => {
      o.titleLabel.string = "提示";
      o.label.string = "是否确认发布？";
      o.setLeftBtn({
        text: "再改改",
        color: p.UIColor.blue
      });
      o.setRightBtn({
        text: "确定",
        color: p.UIColor.green,
        call: () => n(this, void 0, void 0, function* () {
          var o;
          let i = this.makeSections(),
            n = null === (o = this.talkData) || void 0 === o ? void 0 : o.uId,
            a = yield g.default.Ins.publishTalk(e, n, t, i);
          if (a && a.sensitiveWords) {
            a.msg && h.default.showToast(a.msg);
            a.checkStrItems && a.sensitiveWords && d.default.ins.OpenPanelByName("MessageBox", e => {
              e.titleLabel.string = "发布失败";
              e.label.string = "检测到敏感词,请修改后重新发布";
              e.leftBtn.node.active = !1;
              e.setRightBtn({
                text: "定位敏感词",
                color: p.UIColor.pink,
                call: () => {
                  d.default.ins.OpenPanelByName("SensitiveCheckPanel", e => {
                    e.setData(a.checkStrItems, a.sensitiveWords);
                  });
                }
              });
            });
          } else {
            this.draft && f.default.Ins.deleteDraft(this.draft.id);
            this.backScene(!0);
          }
        })
      });
    }) : h.default.showToast("还没有写标题～");
  }
  appendSectionEditor(e) {
    let t = this.menu.getSiblingIndex();
    this.hideAppendMenu();
    this.scrollView.content.insertChild(e, t);
    let o = e.getComponent(y.default);
    o.reset();
    o.menuBtn.node.targetOff(this);
    o.menuBtn.node.on(s.default.CLICK, () => {
      this.showMenu(o);
    }, this);
  }
  showMenu(e) {
    let t = e.node.getSiblingIndex(),
      o = e.node.parent.childrenCount,
      i = [{
        str: "删除",
        color: p.UIColor.pink,
        icon: {
          url: "Atlas/UI/closeBtn",
          color: p.UIColor.green,
          w: 40,
          h: 40
        },
        call: () => {
          d.default.ins.OpenPanelByName("MessageBox", t => {
            t.titleLabel.string = "提醒";
            t.label.string = "是否删除该段落？";
            t.setLeftBtn({
              text: "删除",
              color: p.UIColor.pink,
              call: () => {
                e.node.emit(l.default.PUT);
              }
            });
            t.setRightBtn({
              text: "点错了",
              color: p.UIColor.blue
            });
          });
        }
      }, {
        str: "添加",
        color: p.UIColor.blue,
        icon: {
          url: "Atlas/UI/plusBtn",
          color: p.UIColor.green,
          w: 40,
          h: 40
        },
        call: () => {
          this.menu.parent && this.hideAppendMenu();
          this.showAppendMenu(e.node.getSiblingIndex() + 1);
        }
      }];
    t > 1 && i.push({
      str: "上移",
      color: p.UIColor.blue,
      icon: {
        url: "Atlas/UI/moveUp",
        color: p.UIColor.green,
        w: 40,
        h: 40
      },
      call: () => {
        e.node.setSiblingIndex(t - 1);
      }
    });
    t < o - 2 && i.push({
      str: "下移",
      color: p.UIColor.blue,
      icon: {
        url: "Atlas/UI/moveDown",
        color: p.UIColor.green,
        w: 40,
        h: 40
      },
      call: () => {
        e.node.setSiblingIndex(t + 1);
      }
    });
    h.default.showMenu(e.menuBtn.node, i);
  }
  onEditingDigBegin() {
    console.log("onEditingDigBegin");
    this.block.node.active = !0;
  }
  onEditingDigEnd() {
    console.log("onEditingDigEnd");
    this.block.node.active = !1;
  }
};
i([C(s.default)], _.prototype, "backBtn", void 0);
i([C(cc.Label)], _.prototype, "titleLabel", void 0);
i([C(cc.EditBox)], _.prototype, "titleEditBox", void 0);
i([C(cc.ScrollView)], _.prototype, "scrollView", void 0);
i([C(s.default)], _.prototype, "appendBtn", void 0);
i([C(s.default)], _.prototype, "draftBtn", void 0);
i([C(cc.Node)], _.prototype, "menu", void 0);
i([C(s.default)], _.prototype, "closeMenuBtn", void 0);
i([C(s.default)], _.prototype, "textBtn", void 0);
i([C(s.default)], _.prototype, "imgBtn", void 0);
i([C(s.default)], _.prototype, "gameBtn", void 0);
i([C(s.default)], _.prototype, "goodsBtn", void 0);
i([C(s.default)], _.prototype, "projectBtn", void 0);
i([C(s.default)], _.prototype, "publishBtn", void 0);
i([C(s.default)], _.prototype, "officePublishBtn", void 0);
i([C(l.default)], _.prototype, "textPool", void 0);
i([C(l.default)], _.prototype, "imgsPool", void 0);
i([C(l.default)], _.prototype, "gamePool", void 0);
i([C(l.default)], _.prototype, "goodsPool", void 0);
i([C(l.default)], _.prototype, "projectPool", void 0);
i([C(cc.BlockInputEvents)], _.prototype, "block", void 0);
_ = i([v], _);
exports.default = _;