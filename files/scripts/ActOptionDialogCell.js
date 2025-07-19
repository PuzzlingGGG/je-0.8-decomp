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
  l = e("../../Frame/Top"),
  c = e("../../Frame/UIColor"),
  d = e("../../Frame/Util"),
  h = e("../../Game/Player/Mng"),
  {
    ccclass: p,
    property: u
  } = cc._decorator;
let m = class extends cc.Component {
  constructor() {
    super(...arguments);
    this.sprite = null;
    this.editBox = null;
    this.headBtn = null;
    this.itemBtn = null;
    this.addBtn = null;
    this.data = null;
  }
  onLoad() {
    this.node.on(s.default.SET_DATA, this.setData, this);
    this.node.on(s.default.ITEM_STATE_CHANGE, this.onStateChange, this);
    this.headBtn.node.on(a.default.CLICK, this.onHeadBtn, this);
    this.addBtn.node.on(a.default.CLICK, this.onAddBtn, this);
  }
  setData(e) {
    return n(this, void 0, void 0, function* () {
      this.data = e;
      e.items = e.items || [];
      if (e.evts) {
        e.items.push({
          str: "点击屏幕继续",
          evts: e.evts
        });
        delete e.evts;
      }
      this.editBox.string = e.str;
      let t = yield h.Mng.Ins.actorMng.loadOne(e.actorConfId);
      t && h.Mng.Ins.spriteMng.setActorSprite(this.sprite, t.textureName, 120);
      this.refreshItems();
    });
  }
  refreshItems() {
    d.Util.makeBro(this.itemBtn.node, this.data.items.length, (e, t) => {
      let o = e.getComponent(a.default),
        i = this.data.items[t];
      o.label.string = i.str;
      o.node.off(a.default.CLICK, this.onItemBtn, this);
      o.node.on(a.default.CLICK, this.onItemBtn, this);
    });
  }
  onEditBoxTextChange() {
    this.data.str = this.editBox.textLabel.string;
  }
  onStateChange(e) {
    this.node.color = e ? c.UIColor.blue : cc.color(230, 230, 230);
  }
  onHeadBtn() {
    r.default.ins.OpenPanelByName("SelectActorPanel", e => {
      e.setData(this.data.actorConfId);
      e.selectCall = e => {
        this.data.actorConfId = e.id;
        this.setData(this.data);
      };
    });
  }
  onItemBtn(e) {
    let t = e.target.getSiblingIndex();
    console.log(t);
    let o = this.data.items[t];
    r.default.ins.OpenPanelByName("ActOptionDialogItemPanel", e => {
      e.setData(o);
      e.okCall = e => {
        this.data.items[t] = e;
        this.refreshItems();
      };
      e.deleteCall = () => {
        this.data.items.splice(t, 1);
        this.refreshItems();
      };
    });
  }
  onAddBtn() {
    if (this.data.items.length >= 4) {
      l.default.showToast("4 options at most");
      return;
    }
    let e,
      t = 1;
    do {
      e = "Option " + t;
      t++;
    } while (this.data.items.findIndex(t => t.str == e) >= 0);
    let o = {
      str: e,
      evts: []
    };
    this.data.items.push(o);
    this.refreshItems();
  }
};
i([u(cc.Sprite)], m.prototype, "sprite", void 0);
i([u(cc.EditBox)], m.prototype, "editBox", void 0);
i([u(a.default)], m.prototype, "headBtn", void 0);
i([u(a.default)], m.prototype, "itemBtn", void 0);
i([u(a.default)], m.prototype, "addBtn", void 0);
m = i([p], m);
exports.default = m;