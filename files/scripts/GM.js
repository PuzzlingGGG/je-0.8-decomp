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
const a = e("../Frame/CrossPlatform"),
  s = e("../Frame/Util"),
  r = e("../Frame/AD"),
  l = e("../Scene/EditWorldScene/EditWorldScene"),
  c = e("../Frame/SceneManager"),
  d = e("../Frame/Top"),
  h = e("../../scripts/_autogen/cmd/cmd"),
  p = e("../Frame/NetworkMgr"),
  u = e("./Player/ShopMng"),
  m = e("./Player/ReportMng"),
  f = e("./Player/DynamicMng"),
  g = e("../Role"),
  y = e("./Player/GuideMng"),
  v = e("./Player/GameRankDataMng"),
  {
    ccclass: C,
    property: _
  } = cc._decorator;
let S = class extends cc.Component {
  constructor() {
    super(...arguments);
    this.openBtn = null;
    this.closeBtn = null;
    this.buttonPrefab = null;
    this.panel = null;
    this.content = null;
  }
  onLoad() {
    this.openBtn.node.on("click", () => {
      this.panel.active = !this.panel.active;
    }, this);
    this.closeBtn.node.on("click", () => {
      this.closePanel();
    }, this);
    this.buttonPrefab.active = !1;
    this.closePanel();
    this.initBtn();
  }
  initBtn() {
    this.addBtn("清空缓存", () => {
      a.crossPlatform.clearStorageSync();
      a.crossPlatform.exitMiniProgram();
    });
    this.addBtn("大退", () => {
      a.crossPlatform.exitMiniProgram();
    });
    this.addBtn("跳过广告", () => {
      r.AD.skip = !r.AD.skip;
    }, () => r.AD.skip ? "跳过广告" : "正常广告");
    this.addBtn("输出压缩关卡", () => n(this, void 0, void 0, function* () {
      let e = c.default.ins.findScene(l.default);
      if (e) {
        let t = e.world.makeWorldLayout(),
          o = s.Util.zip(t),
          i = Array.from(o);
        console.log(JSON.stringify(i));
      }
    }));
    this.addBtn("恢复信誉分", () => n(this, void 0, void 0, function* () {
      this.closePanel();
      c.default.ins.OpenPanelByName("NumberInputPanel", e => {
        e.setData("ID", "", e => n(this, void 0, void 0, function* () {
          let t = {
            playerId: e,
            incScore: 3
          };
          yield p.NetIns.SendCmdAsync({
            cmd: h.CMDS.Game_IncCreditScore,
            params: t
          }, h.Game_RIncCreditScore);
          d.default.showToast("恢复成功");
        }));
      });
    }));
    this.addBtn("处理违规游戏", () => n(this, void 0, void 0, function* () {
      this.closePanel();
      c.default.ins.Enter("DeelReportScene", e => {
        e.setData(m.ReportType.game);
      });
    }));
    this.addBtn("处理违规玩家", () => n(this, void 0, void 0, function* () {
      this.closePanel();
      c.default.ins.Enter("DeelReportScene", e => {
        e.setData(m.ReportType.player);
      });
    }));
    this.addBtn("处理违规商品", () => n(this, void 0, void 0, function* () {
      this.closePanel();
      c.default.ins.Enter("DeelReportScene", e => {
        e.setData(m.ReportType.goods);
      });
    }));
    this.addBtn("处理违规评论", () => n(this, void 0, void 0, function* () {
      this.closePanel();
      c.default.ins.Enter("DeelReportScene", e => {
        e.setData(m.ReportType.comment);
      });
    }));
    this.addBtn("处理违规帖子", () => n(this, void 0, void 0, function* () {
      this.closePanel();
      c.default.ins.Enter("DeelReportScene", e => {
        e.setData(m.ReportType.talk);
      });
    }));
    this.addBtn("输出Ip", () => n(this, void 0, void 0, function* () {
      this.closePanel();
      let e = (yield f.DynamicMng.Ins.loadOne("IpGameIds")) || [],
        t = (yield f.DynamicMng.Ins.loadOne("IpGoodsIds")) || [];
      console.log("IpGameIds", JSON.stringify(e));
      console.log("IpGoodsIds", JSON.stringify(t));
    }));
    this.addBtn("上传精选游戏", () => n(this, void 0, void 0, function* () {
      this.closePanel();
      let e = {
        gameIds: (yield f.DynamicMng.Ins.loadOne("GameChosenIds")) || []
      };
      (yield p.NetIns.SendCmdAsync({
        cmd: h.CMDS.Game_ResetChosenGames,
        params: e
      }, h.Game_RResetChosenGames)) && d.default.showToast("上传成功");
    }));
    this.addBtn("上传精选商品", () => n(this, void 0, void 0, function* () {
      this.closePanel();
      let e = yield u.default.Ins.gmLoadAllChosenGoodsIds(),
        t = [];
      for (let o = 0; o < e.length; o++) {
        let i = e[o];
        "string" == typeof i && t.push(i);
      }
      let o = {
        goodsIds: t
      };
      (yield p.NetIns.SendCmdAsync({
        cmd: h.CMDS.Game_ResetChosenGoods,
        params: o
      }, h.Game_RResetChosenGoods)) && d.default.showToast("上传成功");
    }));
    this.addBtn("统计", () => n(this, void 0, void 0, function* () {
      this.closePanel();
      c.default.ins.Enter("GameStatisticsScene");
    }));
    this.addBtn("重置考试", () => n(this, void 0, void 0, function* () {
      this.closePanel();
      yield p.NetIns.SendCmdAsync({
        cmd: h.CMDS.Game_UploadTakeExamScore,
        params: {
          score: 0
        }
      }, h.Game_RUploadTakeExamScore);
      g.default.Ins.role.examScore = 0;
      d.default.showToast("已重置");
    }));
    this.addBtn("通过考试", () => n(this, void 0, void 0, function* () {
      this.closePanel();
      yield p.NetIns.SendCmdAsync({
        cmd: h.CMDS.Game_UploadTakeExamScore,
        params: {
          score: 100
        }
      }, h.Game_RUploadTakeExamScore);
      g.default.Ins.role.examScore = 100;
      d.default.showToast("已通过");
    }));
    this.addBtn("加减G币", () => n(this, void 0, void 0, function* () {
      this.closePanel();
      c.default.ins.OpenPanelByName("NumberInputPanel", e => {
        e.setData("请输入ID", "", e => n(this, void 0, void 0, function* () {
          c.default.ins.OpenPanelByName("NumberInputPanel", t => {
            t.setData("请输入G币", "0", t => n(this, void 0, void 0, function* () {
              let o = {
                  targetId: e,
                  incCoin: t
                },
                i = yield p.NetIns.SendCmdAsync({
                  cmd: h.CMDS.Game_GMIncOtherCoin,
                  params: o
                }, h.Game_RGMIncOtherCoin);
              i ? d.default.showToast("玩家" + e + "还剩coin" + i.coin) : d.default.showToast("操作失败");
            }));
          });
        }));
      });
    }));
    let e = (e, t) => {
      this.addBtn(e, () => n(this, void 0, void 0, function* () {
        this.closePanel();
        y.default.Ins.completeTaskIds = [];
        for (let e = 0; e < t; e++) y.default.Ins.completeTaskIds.push(e);
        y.default.Ins.save();
      }));
    };
    e("重置到最初", y.GuideId.Intro);
    e("重置到创建游戏", y.GuideId.CreateGame);
    e("重置到创建地图", y.GuideId.CreateWorld);
    e("重置到编辑地图", y.GuideId.EditWorld);
    e("完成教学", y.GuideId.EditWorld + 1);
    this.addBtn("排行榜大小", () => n(this, void 0, void 0, function* () {
      this.closePanel();
      c.default.ins.OpenPanelByName("NumberInputPanel", e => {
        e.setData("大小", v.default.Ins.max, e => n(this, void 0, void 0, function* () {
          v.default.Ins.max = e;
        }));
      });
    }));
    this.addBtn("实名认证", () => n(this, void 0, void 0, function* () {
      this.closePanel();
      a.tt.authenticateRealName({
        success(e) {
          console.log("用户实名认证成功");
        },
        fail(e) {
          console.log("用户实名认证失败", e.errMsg);
        }
      });
    }));
  }
  closePanel() {
    this.panel.active = !1;
  }
  addBtn(e, t, o = null) {
    let i = cc.instantiate(this.buttonPrefab);
    i.active = !0;
    i.on("click", t, this);
    let n = i.getComponentInChildren(cc.Label);
    if (o) {
      n.string = o();
      i.on("click", () => {
        n.string = o();
      }, this);
    } else n.string = e;
    this.content.addChild(i);
    return i;
  }
};
i([_(cc.Button)], S.prototype, "openBtn", void 0);
i([_(cc.Button)], S.prototype, "closeBtn", void 0);
i([_(cc.Node)], S.prototype, "buttonPrefab", void 0);
i([_(cc.Node)], S.prototype, "panel", void 0);
i([_(cc.Node)], S.prototype, "content", void 0);
S = i([C], S);
exports.default = S;