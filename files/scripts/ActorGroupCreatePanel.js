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
  r = e("../../Frame/Panel"),
  l = e("../../Frame/SceneManager"),
  c = e("../../Frame/Top"),
  d = e("../../Game/Player/Mng"),
  {
    ccclass: h,
    property: p
  } = cc._decorator;
let u = class extends r.default {
  constructor() {
    super(...arguments);
    this.editGroupName = null;
    this.btnOk = null;
    this._delOnResult = null;
    this._popSelect = !1;
  }
  onLoad() {
    super.onLoad();
    this.btnOk.node.on(s.default.CLICK, this.onClickOk, this);
  }
  setData(e, t) {
    this._delOnResult = t;
    this._popSelect = e;
  }
  onClickOk() {
    let e = this.editGroupName.string;
    null != e && "" != e ? d.Mng.Ins.assetGroupMng.isGroupNameExist(e) ? c.default.showToast("分组名字已经存在") : this.onCreate(e) : c.default.showToast("分组名字不能为空");
  }
  onCreate(e) {
    return n(this, void 0, void 0, function* () {
      let t = new a.ActorGroupData();
      t.groupName = e;
      if (t = yield d.Mng.Ins.assetGroupMng.save(t)) {
        cc.game.emit("refreshElementBox");
        this.closePanel();
        d.Mng.Ins.assetGroupMng.curGroupName = e;
        l.default.ins.OpenPanelByName("EditAssetGroupPanel", e => {
          e.setData(t);
        });
      }
    });
  }
};
i([p(cc.EditBox)], u.prototype, "editGroupName", void 0);
i([p(s.default)], u.prototype, "btnOk", void 0);
u = i([h], u);
exports.default = u;