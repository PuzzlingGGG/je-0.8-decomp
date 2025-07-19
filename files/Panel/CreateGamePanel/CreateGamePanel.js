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
const s = e("../../../scripts/_autogen/cmd/cmd"),
  r = e("../../CustomUI/Button"),
  l = e("../../Frame/NetworkMgr"),
  c = e("../../Frame/Panel"),
  d = e("../../Frame/SceneManager"),
  h = e("../../Frame/Top"),
  p = e("../../Game/Player/Mng"),
  u = e("../../TGA"),
  {
    ccclass: m,
    property: f
  } = cc._decorator;
let g = i = class extends c.default {
  constructor() {
    super(...arguments);
    this.nameEditbox = null;
    this.createBtn = null;
    this.richText = null;
    this.parentGame = null;
    this.call = null;
  }
  onLoad() {
    super.onLoad();
    this.createBtn.node.on("click", this.onCreateBtnTap, this);
    let e = this.richText.node.width + 750;
    this.richText.node.x = 350;
    this.richText.node.runAction(cc.repeatForever(cc.sequence(cc.moveBy(15, -e, 0), cc.moveBy(0, e, 0))));
  }
  setData(e, t) {
    return a(this, void 0, void 0, function* () {
      this.nameEditbox.string = e;
      this.parentGame = t;
    });
  }
  onCreateBtnTap() {
    return a(this, void 0, void 0, function* () {
      p.Mng.switchMine();
      let e = this.nameEditbox.textLabel.string;
      if ("" == e.trim()) {
        h.default.showToast("必须填写游戏名！");
        return;
      }
      let t = {
          msg: e
        },
        o = yield l.NetIns.SendCmdAsync({
          cmd: s.CMDS.Game_SensitiveMsg,
          params: t
        }, s.Game_RSensitiveMsg);
      if (o && o.sensitiveWords && o.sensitiveWords.length) {
        h.default.showToast("名称违规");
        return;
      }
      h.default.showLoading("正在创建");
      let n = yield p.Mng.Ins.gameMng.create(e, this.parentGame);
      if (n) {
        cc.game.emit(i.CREATE_GAME);
        h.default.hideLoading("创建成功");
        this.closePanel();
        this.call && this.call(n);
        d.default.ins.Enter("EditGameScene", e => a(this, void 0, void 0, function* () {
          e.setData(n);
        }));
        u.TGA.track("gameOperate", {
          gameId: n.id,
          step: "create",
          gameVer: n.version,
          gameName: n.name
        });
        cc.game.emit("MyGameChange");
      } else {
        h.default.hideLoading("创建失败");
        this.closePanel();
      }
    });
  }
};
g.CREATE_GAME = "CREATE_GAME";
n([f(cc.EditBox)], g.prototype, "nameEditbox", void 0);
n([f(r.default)], g.prototype, "createBtn", void 0);
n([f(cc.RichText)], g.prototype, "richText", void 0);
g = i = n([m], g);
exports.default = g;