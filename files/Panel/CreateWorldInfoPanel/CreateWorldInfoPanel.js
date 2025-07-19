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
const s = e("../../../i18n/i18nMgr"),
  r = e("../../../scripts/_autogen/cmd/cmd"),
  l = e("../../CustomUI/Button"),
  c = e("../../CustomUI/ColorBox"),
  d = e("../../Frame/Config"),
  h = e("../../Frame/NetworkMgr"),
  p = e("../../Frame/Panel"),
  u = e("../../Frame/SceneManager"),
  m = e("../../Frame/Top"),
  f = e("../../Frame/Util"),
  g = e("../../Game/Player/Mng"),
  y = e("../../GameData/GameTypeDefine"),
  {
    ccclass: v,
    property: C
  } = cc._decorator;
let _ = i = class extends p.default {
  constructor() {
    super(...arguments);
    this.nameEditbox = null;
    this.colBtn = null;
    this.rowBtn = null;
    this.createBtn = null;
    this.typeLabel = null;
    this.colorBox = null;
    this.gameData = null;
    this.type = 0;
    this.onCreate = null;
  }
  onLoad() {
    super.onLoad();
    this.createBtn.node.on("click", this.onCreateBtnTap, this);
    this.colBtn.node.on(l.default.CLICK, this.onColBtnTap, this);
    this.rowBtn.node.on(l.default.CLICK, this.onRowBtnTap, this);
  }
  openAnim(e) {
    cc.game.emit(i.CreateWorldInfoPanel_Open, this);
    super.openAnim(e);
  }
  onOpend() {
    cc.game.emit(i.CreateWorldInfoPanel_Opend, this);
  }
  setData(e, t) {
    return a(this, void 0, void 0, function* () {
      this.type = e;
      this.typeLabel.string = s.I18nMgr.exceI18nStringByZh("创建【${Config.getWorldTypeActName(type)}】地图", [{
        paramName: "Config.getWorldTypeActName(type)",
        param: s.I18nMgr.getI18nStringByZh(d.Config.getWorldTypeActName(e))
      }]);
      this.gameData = t;
      let o,
        i = [];
      for (let e = 0; e < t.worldIds.length; e++) {
        let o = t.worldIds[e],
          n = yield g.Mng.Ins.worldMng.loadOne(o);
        n && i.push(n.info.name);
      }
      let n = 1;
      do {
        o = "我的地图" + n;
        n++;
      } while (i.indexOf(o) >= 0);
      this.nameEditbox.string = o;
      this.colorBox.setDataArr(d.Config.colors);
      this.colorBox.select(19);
    });
  }
  onColBtnTap() {
    u.default.ins.OpenPanelByName("NumberInputPanel", e => {
      e.setData("宽", this.colBtn.label.string, e => a(this, void 0, void 0, function* () {
        this.colBtn.label.string = e;
      }));
    });
  }
  onRowBtnTap() {
    u.default.ins.OpenPanelByName("NumberInputPanel", e => {
      e.setData("高", this.rowBtn.label.string, e => a(this, void 0, void 0, function* () {
        this.rowBtn.label.string = e;
      }));
    });
  }
  onCreateBtnTap() {
    return a(this, void 0, void 0, function* () {
      let e = this.nameEditbox.textLabel.string,
        t = this.colBtn.label.string,
        o = this.rowBtn.label.string;
      if ("" == e.trim()) {
        m.default.showToast("必须填写名字");
        return;
      }
      let i = Number.parseInt(t) || 8,
        n = Number.parseInt(o) || 8;
      if (i > 64 || n > 64) {
        m.default.showToast("尺寸超出范围64*64");
        return;
      }
      if (i < 8 || n < 8) {
        m.default.showToast("尺寸太小，至少8*8");
        return;
      }
      let a = {
          msg: e
        },
        s = yield h.NetIns.SendCmdAsync({
          cmd: r.CMDS.Game_SensitiveMsg,
          params: a
        }, r.Game_RSensitiveMsg);
      if (s && s.sensitiveWords && s.sensitiveWords.length) {
        m.default.showToast("名称违规");
        return;
      }
      m.default.showLoading("正在创建");
      let l = this.colorBox.getColor(),
        c = {
          id: "",
          info: {
            name: e,
            type: this.type,
            size: {
              col: i,
              row: n
            }
          },
          layoutMin: null
        },
        d = null;
      if (this.type == y.WorldType.Jump) {
        let e = yield f.Util.loadBundleRes("DefaultWorld/PlatformJump", cc.JsonAsset);
        d = new Uint8Array(e.json);
      } else if (this.type == y.WorldType.Rpg) {
        let e = yield f.Util.loadBundleRes("DefaultWorld/RPG", cc.JsonAsset);
        d = new Uint8Array(e.json);
      }
      let p = f.Util.unzip(d);
      if (0 !== this.gameData.worldIds.length) {
        let e = p.actors.findIndex(e => e.data.team == y.Team.Hero);
        if (e >= 0) {
          let t = p.actors[e];
          p.startPoint = {
            pos: t.pos,
            data: {
              heroConfId: t.data.confId
            }
          };
          p.actors.splice(e, 1);
        }
      }
      p.size = c.info.size;
      p.bgColor = {
        r: l.r,
        g: l.g,
        b: l.b,
        a: l.a
      };
      c.layoutMin = f.Util.zip(p);
      c.worldLayout = p;
      m.default.hideLoading();
      this.closePanel();
      this.onCreate && this.onCreate(c);
    });
  }
};
_.CreateWorldInfoPanel_Open = "CreateWorldInfoPanel_Open";
_.CreateWorldInfoPanel_Opend = "CreateWorldInfoPanel_Opend";
n([C(cc.EditBox)], _.prototype, "nameEditbox", void 0);
n([C(l.default)], _.prototype, "colBtn", void 0);
n([C(l.default)], _.prototype, "rowBtn", void 0);
n([C(l.default)], _.prototype, "createBtn", void 0);
n([C(cc.Label)], _.prototype, "typeLabel", void 0);
n([C(c.default)], _.prototype, "colorBox", void 0);
_ = i = n([v], _);
exports.default = _;