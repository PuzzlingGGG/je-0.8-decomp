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
  r = e("../../Frame/SceneManager"),
  l = e("../../Frame/Top"),
  c = e("../../Game/Player/Mng"),
  d = e("../../Scene/EditWorldScene/EditWorldScene"),
  h = e("../../../scripts/_autogen/data/data"),
  p = e("../../CustomUI/DropDownBox"),
  u = e("../../CustomUI/ToggleGroup"),
  m = e("../../Role"),
  f = e("./../../GameScript/index"),
  g = e("../../Game/Player/GameRankMng"),
  y = e("../../GameData/GameTypeDefine"),
  v = e("../../../i18n/i18nMgr"),
  {
    ccclass: C,
    property: _
  } = cc._decorator;
let S = class extends s.default {
  constructor() {
    super(...arguments);
    this.titleLabel = null;
    this.nameEditBox = null;
    this.typeDropDownBox = null;
    this.idDropDown = null;
    this.cycleDropDownBox = null;
    this.sortToggleGroup = null;
    this.createBtn = null;
    this.timmerLabel = null;
    this.createCall = null;
    this.data = null;
  }
  onLoad() {
    super.onLoad();
    this.createBtn.node.on(a.default.CLICK, this.onCreateBtn, this);
    this.typeDropDownBox.node.on(p.default.SELECT_CHANGE, this.onTypeChange, this);
    this.idDropDown.node.on(p.default.SELECT_CHANGE, this.onIdChange, this);
    this.sortToggleGroup.node.on(u.default.TOGGLE_CHANGE, this.onSortTypeChange, this);
    this.cycleDropDownBox.node.on(p.default.SELECT_CHANGE, this.onCycleChange, this);
    this.cycleDropDownBox.setDataArr([{
      str: "日榜",
      type: h.GameRankCycleType.day
    }, {
      str: "周榜",
      type: h.GameRankCycleType.week
    }, {
      str: "月榜",
      type: h.GameRankCycleType.month
    }, {
      str: "永久",
      type: h.GameRankCycleType.forever
    }]);
    this.typeDropDownBox.setDataArr([{
      str: "用时最短榜",
      type: g.GameRankType.ShortTime
    }, {
      str: "活得最久榜",
      type: g.GameRankType.LongTime
    }, {
      str: "道具榜",
      type: g.GameRankType.PropRank
    }, {
      str: "变量榜",
      type: g.GameRankType.CustomRank
    }]);
  }
  setData(e) {
    this.data = e;
    this.nameEditBox.string = e.name;
    this.sortToggleGroup.selectIdx(e.sortType);
    let t = this.cycleDropDownBox.getDataArr(),
      o = t.findIndex(t => t.type == e.cycleType);
    o >= 0 && this.cycleDropDownBox.selectByIdx(o);
    (o = (t = this.typeDropDownBox.getDataArr()).findIndex(t => t.type == e.rankType)) >= 0 && this.typeDropDownBox.selectByIdx(o);
  }
  onSortTypeChange(e, t, o) {
    this.data && (0 == e ? this.data.sortType = h.GameRankSortType.asc : 1 == e && (this.data.sortType = h.GameRankSortType.desc));
  }
  onTypeChange(e, t, o) {
    return n(this, void 0, void 0, function* () {
      this.idDropDown.node.active = !1;
      this.sortToggleGroup.node.active = !1;
      this.timmerLabel.node.active = !1;
      if (this.data && t) {
        this.data.rankType = t.type;
        switch (t.type) {
          case 0:
            this.data.sortType = h.GameRankSortType.asc;
            this.timmerLabel.node.active = !0;
            break;
          case 1:
            this.data.sortType = h.GameRankSortType.desc;
            this.timmerLabel.node.active = !0;
            break;
          case 2:
            {
              this.idDropDown.node.active = !0;
              let e = [],
                t = yield c.Mng.Ins.propMng.loadAll(!0);
              for (let o = 0; o < t.length; o++) {
                let i = t[o];
                e.unshift({
                  str: i.name,
                  id: i.id
                });
              }
              let o = e.findIndex(e => e.id == this.data.propId);
              o < 0 && (o = 0);
              this.idDropDown.setDataArr(e, o);
              this.data.sortType = h.GameRankSortType.desc;
              break;
            }
          case 3:
            {
              this.idDropDown.node.active = !0;
              this.sortToggleGroup.node.active = !0;
              let e = [],
                t = yield c.Mng.Ins.variableMng.loadAll();
              for (let o = 0; o < t.length; o++) {
                let i = t[o];
                i.valueType == f.GSValueType.FLOAT && e.push({
                  str: i.name,
                  id: i.id
                });
              }
              let o = e.findIndex(e => e.id == this.data.variableId);
              o < 0 && (o = 0);
              this.idDropDown.setDataArr(e, o);
              this.sortToggleGroup.selectIdx(0);
              break;
            }
        }
      }
    });
  }
  onIdChange(e, t) {
    if (this.data && t) {
      this.data.rankType == g.GameRankType.PropRank && (this.data.propId = t.id);
      this.data.rankType == g.GameRankType.CustomRank && (this.data.variableId = t.id);
    }
  }
  onCycleChange(e, t, o) {
    this.data && (this.data.cycleType = t.type);
  }
  toCreateStyle() {
    return n(this, void 0, void 0, function* () {
      let e,
        t = {
          type: y.CommonDataType.Rank,
          id: null,
          roleId: m.default.Ins.role.id,
          name: "",
          rankType: g.GameRankType.ShortTime,
          sortType: h.GameRankSortType.asc,
          cycleType: h.GameRankCycleType.day,
          propId: "1",
          belongGameId: "",
          textureName: "",
          textureName2: ""
        },
        o = r.default.ins.findScene(d.default).gameData,
        i = yield c.Mng.Ins.gameRankMng.loadMany(o.gameRankIds),
        n = 1;
      do {
        e = v.I18nMgr.getI18nStringByZh("排行榜") + n;
        n++;
      } while (i.findIndex(t => t.name == e) >= 0);
      t.name = e;
      this.titleLabel.string = "创建排行榜";
      this.setData(t);
    });
  }
  onCreateBtn() {
    return n(this, void 0, void 0, function* () {
      let e = this.nameEditBox.textLabel.string;
      if (e.length > 8) {
        l.default.showToast("名字最多8个字");
        return;
      }
      this.closePanel();
      let t = r.default.ins.findScene(d.default).gameData;
      this.data.name = e;
      if (yield c.Mng.Ins.gameRankMng.create(this.data, t)) {
        this.createCall && this.createCall(this.data);
        l.default.showToast("创建成功");
      } else l.default.showToast("创建失败");
    });
  }
};
i([_(cc.Label)], S.prototype, "titleLabel", void 0);
i([_(cc.EditBox)], S.prototype, "nameEditBox", void 0);
i([_(p.default)], S.prototype, "typeDropDownBox", void 0);
i([_(p.default)], S.prototype, "idDropDown", void 0);
i([_(p.default)], S.prototype, "cycleDropDownBox", void 0);
i([_(u.default)], S.prototype, "sortToggleGroup", void 0);
i([_(a.default)], S.prototype, "createBtn", void 0);
i([_(cc.Label)], S.prototype, "timmerLabel", void 0);
S = i([C], S);
exports.default = S;