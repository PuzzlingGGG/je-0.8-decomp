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
const a = e("../../scripts/_autogen/data/data"),
  s = e("../CustomUI/Button"),
  r = e("../CustomUI/ScrollList"),
  l = e("../Frame/SceneManager"),
  c = e("../Frame/Share"),
  d = e("../Frame/Top"),
  h = e("../Frame/UIColor"),
  p = e("../Frame/Util"),
  u = e("../Panel/GameRankPanel/GameRankCell"),
  m = e("../Role"),
  f = e("../TGA"),
  g = e("./GameEnv"),
  y = e("./Player/GameRankDataMng"),
  v = e("./Player/Mng"),
  C = e("./Player/TalkMng"),
  {
    ccclass: _,
    property: S
  } = cc._decorator;
let I = class extends cc.Component {
  constructor() {
    super(...arguments);
    this.titleLabel = null;
    this.list = null;
    this.myRankCell = null;
    this.shareBtn = null;
    this.emptyLabel = null;
    this.rank = null;
    this.gameData = null;
    this.rankList = [];
    this.showMe = !1;
  }
  onLoad() {
    this.node.on("GameRankCell.onDelete", this.onDelete, this);
    this.list.getPrefabName = e => e instanceof a.GameRankScoreInfo ? "GameRankCell" : "GameRankTop3Cell";
    this.shareBtn && this.shareBtn.node.on(s.default.CLICK, this.onShareBtn, this);
  }
  setData(e, t, o) {
    return n(this, void 0, void 0, function* () {
      this.showMe = o;
      this.rank = e;
      this.gameData = t;
      this.myRankCell.node.active = !1;
      this.list.setDataArr([]);
      this.rankList = yield this.loadRankList(e.id);
      this.refreshList();
      let i = this.rankList.find(e => e.roleId == m.default.Ins.role.id);
      if (i) {
        let t = y.default.Ins.getHistoryScore(e.id);
        if ("number" != typeof t) {
          y.default.Ins.saveHistoryScore(e.id, i.score);
          return;
        }
        if (e.sortType == a.GameRankSortType.asc && i.score < t || e.sortType == a.GameRankSortType.desc && i.score > t) {
          y.default.Ins.saveHistoryScore(e.id, i.score);
          this.scheduleOnce(() => {
            l.default.ins.OpenPanelByName("GameRankSharePanel", e => {
              e.setData(i, this.rank, this.gameData);
              e.shareCall = this.onShareBtn.bind(this);
            });
          }, .5);
        }
      } else y.default.Ins.deleteHistoryScore(e.id);
    });
  }
  loadRankList(e) {
    return n(this, void 0, void 0, function* () {
      let t = yield y.default.Ins.loadRank(e);
      if (t) return t.rankList;
      d.default.showToast("获取失败");
      return [];
    });
  }
  refreshList() {
    return n(this, void 0, void 0, function* () {
      this.myRankCell.node.active = !1;
      let e = this.rankList.concat(),
        t = yield v.Mng.Ins.gameRankMng.loadOne(this.rank.id);
      this.titleLabel.string = t.name;
      let o = this.list.getComponent(cc.Widget);
      e.sort((e, o) => t.sortType == a.GameRankSortType.asc ? e.score - o.score : o.score - e.score);
      e = e.slice(0, y.default.Ins.max);
      for (let o = 0; o < e.length; o++) {
        e[o].rank = o + 1;
        e[o].rankConf = t;
      }
      this.emptyLabel.node.active = 0 == e.length;
      let i = [e.slice(0, 3)];
      i = i.concat(e);
      let n = e.find(e => e.roleId == m.default.Ins.role.id);
      if (n && this.showMe) {
        this.myRankCell.node.active = !0;
        exports.bottom = 177;
        n.userName = "我";
        this.myRankCell.setData(n);
      } else {
        this.myRankCell.node.active = !1;
        exports.bottom = 30;
      }
      p.Util.updateAllWidget(this.list.node);
      this.list.setDataArr(i);
    });
  }
  onDelete(e) {
    let t = e.detail;
    l.default.ins.OpenPanelByName("MessageBox", e => {
      e.titleLabel.string = "提示";
      e.label.string = `是否删除"${t.userName}"的分数？`;
      e.setLeftBtn({
        text: "删除",
        color: h.UIColor.pink,
        call: () => n(this, void 0, void 0, function* () {
          yield y.default.Ins.deleteScore(this.rank.id, t.roleId);
          this.rankList = this.rankList.filter(e => e.roleId !== t.roleId);
          d.default.showToast("已删除");
          this.refreshList();
        })
      });
      e.setRightBtn({
        text: "点错了",
        color: h.UIColor.blue
      });
    });
  }
  onShareBtn() {
    let e = this.rankList.find(e => e.roleId == m.default.Ins.role.id),
      t = {
        type: "gameRank",
        cyGameId: this.gameData.id,
        gameRankId: this.rank.id
      },
      o = `我在"${this.rank.name}"中排名第${e.rank}名，`;
    o = 1 == e.rank ? `我创造了"${this.rank.name} "新纪录！` : e.rank <= 3 ? `"${this.rank.name} "晋级前三甲！` : "我已进入世界100强！";
    let i = {
        shareType: "shareGame",
        title: o += "谁能超过我，我倒立洗头！",
        desc: this.gameData.advert,
        imageUrl: "",
        query: p.Util.toQueryStr(t),
        imageName: this.gameData.iconTextureName,
        success: () => {
          d.default.showToast("分享成功");
          f.TGA.track("share", t);
        },
        fail: () => {
          d.default.showToast("分享失败");
        },
        talk: {
          title: o,
          sections: [{
            type: C.TalkSectionType.Game,
            gameId: this.gameData.id
          }]
        }
      },
      n = this.gameData.iconTextureName;
    n && "icon1" !== n ? i.imageUrl = g.gameEnv.fileCDN + n : delete i.imageUrl;
    c.Share.share(i);
  }
};
i([S(cc.Label)], I.prototype, "titleLabel", void 0);
i([S(r.default)], I.prototype, "list", void 0);
i([S(u.default)], I.prototype, "myRankCell", void 0);
i([S(s.default)], I.prototype, "shareBtn", void 0);
i([S(cc.Label)], I.prototype, "emptyLabel", void 0);
I = i([_], I);
exports.default = I;