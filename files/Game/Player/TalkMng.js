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
exports.TalkSectionType = void 0;
const s = e("../../../scripts/_autogen/cmd/cmd"),
  r = e("../../../scripts/_autogen/data/data"),
  l = e("../../Frame/NetworkMgr"),
  c = e("../../Frame/SceneManager"),
  d = e("../../Frame/Top"),
  h = e("../../Frame/UIColor"),
  p = e("../../Frame/Util"),
  u = e("../../Role"),
  m = e("../../Scene/HomeScene/TalkPage/TalkCell"),
  f = e("../../TGA"),
  g = e("../GameEnv"),
  y = e("../PathConfig"),
  v = e("./CollectionMng"),
  C = e("./CreditMng"),
  _ = e("./DynamicMng"),
  S = e("./Mng"),
  I = e("./PublishMng"),
  G = e("./TalkDraftMng"),
  {
    ccclass: T,
    property: b
  } = cc._decorator;
var M;
(function (e) {
  e[e.Text = 0] = "Text";
  e[e.Imgs = 1] = "Imgs";
  e[e.Game = 2] = "Game";
  e[e.Goods = 3] = "Goods";
  e[e.Project = 4] = "Project";
})(M = o.TalkSectionType || (exports.TalkSectionType = {}));
let P = i = class {
  constructor() {
    this.simpleMap = new Map();
    this.detailMap = new Map();
    this.userTalks = new Map();
    this.collectTalks = new Map();
    this.startMember = "";
    console.log("new TalkMng");
  }
  clearCache() {
    return a(this, void 0, void 0, function* () {
      this.simpleMap.clear();
      this.detailMap.clear();
      this.userTalks.clear();
      this.collectTalks.clear();
      m.default.calcuHeightCache.clear();
      this.startMember = "";
    });
  }
  getTalkList(e, t) {
    let o = this.getKey(e, t),
      i = this.simpleMap.get(o) || [];
    this.simpleMap.set(o, i);
    return i;
  }
  getKey(e, t) {
    return `${e}-${t}`;
  }
  appendLoadTalkList(e, t, o) {
    return a(this, void 0, void 0, function* () {
      let i = this.getTalkList(e, t),
        n = i.length,
        a = {
          talkType: e,
          talkSortType: t,
          start: n,
          end: n + o,
          startMember: this.startMember
        },
        c = yield l.NetIns.SendCmdAsync({
          cmd: s.CMDS.Game_LoadTalk,
          params: a
        }, s.Game_RLoadTalk);
      this.startMember = c.startMember;
      if (c && c.talkList) {
        for (let e = 0; e < c.talkList.length; e++) {
          let t = c.talkList[e];
          t.status == r.ManReviewStatus.success && i.push(t);
        }
        f.TGA.track("Talk", {
          step: "loadTalkData",
          cnt: o,
          talkType: e,
          talkSortType: t
        });
      }
      return i;
    });
  }
  loadTalksByUserId(e = -1) {
    return a(this, void 0, void 0, function* () {
      -1 == e && (e = u.default.Ins.role.uId);
      if (this.userTalks.has(e)) {
        let t = this.userTalks.get(e);
        if (0 != t.length) {
          cc.warn("loadTalksByUserId:EXIST", e, this.userTalks);
          return t;
        }
      } else this.userTalks.set(e, []);
      let t = {
          roleId: e
        },
        o = yield l.NetIns.SendCmdAsync({
          cmd: s.CMDS.Game_LoadOwnTalk,
          params: t
        }, s.Game_RLoadOwnTalk);
      if (o && o.talkList) {
        this.userTalks.set(e, o.talkList);
        return o.talkList;
      }
      return [];
    });
  }
  loadTalksByIds(e) {
    return a(this, void 0, void 0, function* () {
      let t = {
          talkIdList: e
        },
        o = yield l.NetIns.SendCmdAsync({
          cmd: s.CMDS.Game_LoadTalkByIdList,
          params: t
        }, s.Game_RLoadOwnTalk);
      o.talkList.forEach(e => {
        this.collectTalks.set(e.uId, e);
      });
      return o && o.talkList ? o.talkList : [];
    });
  }
  loadTalkDetail(e) {
    return a(this, void 0, void 0, function* () {
      let t = this.detailMap.get(e);
      if (!t) {
        let o = {
            talkId: e
          },
          i = yield l.NetIns.SendCmdAsync({
            cmd: s.CMDS.Game_LoadTalkDetail,
            params: o
          }, s.Game_RLoadTalkDetail);
        if (i && i.talkData) {
          t = i.talkData;
          this.detailMap.set(e, t);
        }
      }
      return t;
    });
  }
  updateCacheProperty(e, t, o) {
    let i = i => {
      i.uId == e && (i[t] = o);
    };
    this.userTalks.forEach(e => {
      e.forEach(i);
    });
    this.collectTalks.forEach(i);
    this.detailMap.forEach(i);
    this.simpleMap.forEach(e => {
      e.forEach(i);
    });
  }
  deleteCacheComment(e) {
    let t = t => {
      for (let o = 0; o < t.comments.length; o++) t.comments[o].id == e && t.comments.splice(o--, 1);
    };
    this.userTalks.forEach(e => {
      e.forEach(t);
    });
    this.collectTalks.forEach(t);
    this.detailMap.forEach(t);
    this.simpleMap.forEach(e => {
      e.forEach(t);
    });
  }
  setTop(e) {
    return a(this, void 0, void 0, function* () {
      let t = {
        talkId: e
      };
      yield l.NetIns.SendCmdAsync({
        cmd: s.CMDS.Game_SetTalkTop,
        params: t
      }, s.Game_RSetTalkTop);
    });
  }
  removeTop(e) {
    return a(this, void 0, void 0, function* () {
      let t = {
        talkId: e
      };
      yield l.NetIns.SendCmdAsync({
        cmd: s.CMDS.Game_DelTalkTop,
        params: t
      }, s.Game_RDelTalkTop);
    });
  }
  setChosen(e) {
    return a(this, void 0, void 0, function* () {
      let t = {
        talkId: e
      };
      yield l.NetIns.SendCmdAsync({
        cmd: s.CMDS.Game_SetTalkChosen,
        params: t
      }, s.Game_RSetTalkChosen);
    });
  }
  removeChosen(e) {
    return a(this, void 0, void 0, function* () {
      let t = {
        talkId: e
      };
      yield l.NetIns.SendCmdAsync({
        cmd: s.CMDS.Game_DelTalkChosen,
        params: t
      }, s.Game_RSetTalkChosen);
    });
  }
  upTalk(e) {
    return a(this, void 0, void 0, function* () {
      let t = {
          talkId: e
        },
        o = yield l.NetIns.SendCmdAsync({
          cmd: s.CMDS.Game_UpTalk,
          params: t
        }, s.Game_RUpTalk);
      this.updateCacheProperty(e, "upCnt", o.upCnt);
      this.updateCacheProperty(e, "isUp", !0);
    });
  }
  downTalk(e) {
    return a(this, void 0, void 0, function* () {
      let t = {
          talkId: e
        },
        o = yield l.NetIns.SendCmdAsync({
          cmd: s.CMDS.Game_DownTalk,
          params: t
        }, s.Game_RDownTalk);
      this.updateCacheProperty(e, "upCnt", o.upCnt);
      this.updateCacheProperty(e, "isDown", !0);
    });
  }
  cancelUpTalk(e) {
    return a(this, void 0, void 0, function* () {
      let t = {
          talkId: e
        },
        o = yield l.NetIns.SendCmdAsync({
          cmd: s.CMDS.Game_CancelUpTalk,
          params: t
        }, s.Game_RCancelUpTalk);
      this.updateCacheProperty(e, "upCnt", o.upCnt);
      this.updateCacheProperty(e, "isUp", !1);
    });
  }
  cancelDownTalk(e) {
    return a(this, void 0, void 0, function* () {
      let t = {
          talkId: e
        },
        o = yield l.NetIns.SendCmdAsync({
          cmd: s.CMDS.Game_CancelDownTalk,
          params: t
        }, s.Game_RCancelDownTalk);
      this.updateCacheProperty(e, "upCnt", o.upCnt);
      this.updateCacheProperty(e, "isDown", !1);
    });
  }
  publishTalk(e, t, o, n) {
    return a(this, void 0, void 0, function* () {
      d.default.showLoading("发布中(1/3)");
      let a = o,
        r = [],
        c = [{
          from: "标题",
          str: o
        }];
      n = n.filter(e => !!e);
      for (let e = 0; e < n.length; e++) {
        let t = n[e];
        switch (t.type) {
          case M.Text:
            a += "哈" + t.text;
            c.push({
              from: "文字",
              str: t.text
            });
            break;
          case M.Imgs:
            for (let e = 0; e < t.imgDatas.length; e++) {
              let o = t.imgDatas[e].url;
              r.includes(o) || r.push(o);
            }
            break;
          case M.Game:
          case M.Goods:
            break;
          case M.Project:
            {
              let e = yield S.Mng.Ins.gameMng.loadOne(t.gameId);
              if (e) {
                a += "哈" + e.name + "哈" + e.advert;
                let t = yield I.default.Ins.makeGamePackRaw(e.worldIds),
                  o = new Set();
                for (let e = 0; e < t.checkStrItems.length; e++) o.add(t.checkStrItems[e].str);
                a += "哈" + Array.from(o).join("哈");
                "icon1" != e.iconTextureName && r.push(e.iconTextureName);
                for (let e = 0; e < t.assets.length; e++) {
                  let o = t.assets[e];
                  r.includes(o.textureName) || r.push(o.textureName);
                }
              }
              break;
            }
        }
      }
      let h = new Map();
      {
        d.default.showLoading("发布中(2/3)");
        let e = {
            imageList: r
          },
          t = yield l.NetIns.SendCmdAsync({
            cmd: s.CMDS.Game_GetNeedReviewImageList,
            params: e
          }, s.Game_RGetNeedReviewImageList),
          o = 0;
        for (; o < t.needImageList.length;) {
          let e = t.needImageList.slice(o, o + 64),
            i = yield p.Util.mergeImage(e);
          console.log(g.gameEnv.fileCDN + i);
          h.set(i, e);
          o += 64;
        }
      }
      let m = {
          sections: n
        },
        f = n.filter(e => e.type == M.Text),
        y = [];
      for (let e = 0; e < f.length; e++) y.push(f[e].text);
      let v = n.find(e => e.type !== M.Text),
        C = {
          title: o,
          text: p.Util.clampStr(y.join("\n"), 60, "..【查看全文】"),
          specialSection: v,
          firstSection: v
        };
      d.default.showLoading("发布中(3/3)");
      if (t) {
        if (e) {
          let e = {
            talkId: t,
            title: o,
            content: m,
            simpleContent: C
          };
          yield l.NetIns.SendCmdAsync({
            cmd: s.CMDS.Game_ModifyOfficialTalk,
            params: e
          }, s.Game_RModifyTalk);
        } else {
          let e = {
              talkId: t,
              title: o,
              content: m,
              simpleContent: C,
              reviewStr: a,
              reviewImageMap: h
            },
            i = yield l.NetIns.SendCmdAsync({
              cmd: s.CMDS.Game_ModifyTalk,
              params: e
            }, s.Game_RModifyTalk);
          if (i.sensitiveWords && i.sensitiveWords.length) {
            d.default.hideLoading();
            return {
              msg: "发布失败",
              checkStrItems: c,
              sensitiveWords: i.sensitiveWords
            };
          }
          if (this.userTalks.has(u.default.Ins.role.uId)) {
            let e = this.userTalks.get(u.default.Ins.role.uId),
              o = e.findIndex(e => e.uId == t);
            o >= 0 && e.splice(o, 1);
            e.unshift(i.talkData);
          }
        }
      } else if (e) {
        let e = {
          title: o,
          content: m,
          simpleContent: C
        };
        yield l.NetIns.SendCmdAsync({
          cmd: s.CMDS.Game_CreateOfficialTalk,
          params: e
        }, s.Game_RCreateTalk);
      } else {
        let e = {
            title: o,
            content: m,
            simpleContent: C,
            reviewStr: a,
            reviewImageMap: h
          },
          t = yield l.NetIns.SendCmdAsync({
            cmd: s.CMDS.Game_CreateTalk,
            params: e
          }, s.Game_RCreateTalk);
        if (t && t.sensitiveWords && t.sensitiveWords.length) {
          d.default.hideLoading();
          return {
            msg: "发布失败",
            checkStrItems: c,
            sensitiveWords: t.sensitiveWords
          };
        }
        this.userTalks.has(u.default.Ins.role.uId) && this.userTalks.get(u.default.Ins.role.uId).unshift(t.talkData);
      }
      this.clearCache();
      cc.game.emit(i.Talk_Refresh);
      d.default.hideLoading();
    });
  }
  deleteTalk(e) {
    return a(this, void 0, void 0, function* () {
      let t = {
        talkId: e
      };
      yield l.NetIns.SendCmdAsync({
        cmd: s.CMDS.Game_DeleteTalk,
        params: t
      }, s.Game_RDeleteTalk);
      if (this.userTalks.has(u.default.Ins.role.uId)) {
        let t = this.userTalks.get(u.default.Ins.role.uId);
        for (let o = 0; o < t.length; o++) t[o].uId == e && t.splice(o--, 1);
      }
      this.detailMap.delete(e);
      this.simpleMap.forEach(t => {
        for (let o = 0; o < t.length; o++) t[o].uId == e && t.splice(o--, 1);
      });
      G.default.Ins.deleteDraftByTalkId(e);
      cc.game.emit(i.Talk_Del);
    });
  }
  bindTalkCell(e) {
    return a(this, void 0, void 0, function* () {
      if (0 == e.prefabs.length) {
        d.default.showLoading("加载中");
        let t = yield p.Util.loadBundleRes("Scene/HomeScene/TalkCell"),
          o = cc.instantiate(t);
        e.node.addChild(o);
        exports.x = -2e3;
        let i = o.getComponent(m.default);
        e.prefabs.push(o);
        e.calculateSizeFunc = e => ({
          w: 710,
          h: i.calcuHeight(e)
        });
        d.default.hideLoading();
      }
    });
  }
  onReportBtn(e) {
    C.CreditMng.Ins.credit <= 2 ? d.default.showToast("近期违规，不可举报") : e && c.default.ins.Enter("ReportScene", t => {
      t.initReportTalk(e.uId);
    }, c.ShiftAnima.moveLeftShift);
  }
  onMenuBtn(e, t) {
    return a(this, void 0, void 0, function* () {
      let o = [];
      if (u.default.Ins.role.id == e.playerId) {
        o.push({
          str: "修改",
          icon: {
            url: "Atlas/Paint/pencil",
            color: h.UIColor.white,
            w: 40,
            h: 40
          },
          call: () => a(this, void 0, void 0, function* () {
            let t = yield i.Ins.loadTalkDetail(e.uId);
            c.default.ins.Enter("EditTalkScene", e => {
              e.toModifyStyle(t);
            }, c.ShiftAnima.moveLeftShift);
          })
        });
        o.push({
          str: "删除",
          color: h.UIColor.pink,
          icon: {
            url: "Atlas/UI/closeBtn",
            color: h.UIColor.green,
            w: 40,
            h: 40
          },
          call: () => {
            c.default.ins.OpenPanelByName("MessageBox", t => {
              t.titleLabel.string = "提醒";
              t.label.string = "是否删除帖子？\n(与之关联的草稿也会被删除)";
              t.setLeftBtn({
                text: "删除",
                color: h.UIColor.pink,
                call: () => a(this, void 0, void 0, function* () {
                  yield i.Ins.deleteTalk(e.uId);
                  yield i.Ins.clearCache();
                  cc.game.emit(i.Talk_Refresh);
                })
              });
              t.setRightBtn({
                text: "点错了",
                color: h.UIColor.blue
              });
            });
          }
        });
      } else {
        o.push({
          str: "举报",
          icon: {
            url: "Atlas/UI/reportBtn",
            color: h.UIColor.white,
            w: 50,
            h: 40
          },
          call: () => {
            this.onReportBtn(e);
          }
        });
        let t = v.CollectionMng.Ins.isCollectTalk(e.uId);
        o.push({
          str: t ? "取消收藏" : "收藏",
          icon: {
            url: y.default.ICON_MENU_COLLECTION,
            color: t ? h.UIColor.yellow : h.UIColor.gray,
            w: 40,
            h: 40
          },
          call: () => a(this, void 0, void 0, function* () {
            t ? v.CollectionMng.Ins.unCollectTalk(e.uId) : v.CollectionMng.Ins.collectTalk(e.uId);
          })
        });
      }
      if (_.DynamicMng.Ins.isGmPlayer()) {
        o.push({
          str: "删除",
          color: h.UIColor.pink,
          icon: {
            url: "Atlas/UI/closeBtn",
            color: h.UIColor.green,
            w: 40,
            h: 40
          },
          call: () => {
            c.default.ins.OpenPanelByName("MessageBox", t => {
              t.titleLabel.string = "提醒";
              t.label.string = "是否删除帖子？";
              t.setLeftBtn({
                text: "删除",
                color: h.UIColor.pink,
                call: () => a(this, void 0, void 0, function* () {
                  let t = {
                    talkId: e.uId
                  };
                  yield l.NetIns.SendCmdAsync({
                    cmd: s.CMDS.Game_OfficialDeleteTalk,
                    params: t
                  }, s.Game_ROfficialDeleteTalk);
                  yield i.Ins.clearCache();
                  cc.game.emit(i.Talk_Refresh);
                })
              });
              t.setRightBtn({
                text: "点错了",
                color: h.UIColor.blue
              });
            });
          }
        });
        e.talkType == r.TalkType.trends && o.push({
          str: "精华",
          icon: {
            url: "Atlas/UI/plusBtn",
            color: h.UIColor.white,
            w: 50,
            h: 40
          },
          call: () => a(this, void 0, void 0, function* () {
            console.log("Julian setChosen", e.title);
            yield i.Ins.setChosen(e.uId);
            yield i.Ins.clearCache();
            cc.game.emit(i.Talk_Refresh);
          })
        });
        e.talkType == r.TalkType.chosen && o.push({
          str: "移除精华",
          icon: {
            url: "Atlas/UI/plusBtn",
            color: h.UIColor.white,
            w: 50,
            h: 40
          },
          call: () => a(this, void 0, void 0, function* () {
            console.log("Julian removeChosen", e.title);
            yield i.Ins.removeChosen(e.uId);
            yield i.Ins.clearCache();
            cc.game.emit(i.Talk_Refresh);
          })
        });
        e.isTop && o.push({
          str: "移除置顶",
          icon: {
            url: "Atlas/UI/plusBtn",
            color: h.UIColor.white,
            w: 50,
            h: 40
          },
          call: () => a(this, void 0, void 0, function* () {
            console.log("Julian removeTop", e.title);
            yield i.Ins.removeTop(e.uId);
            yield i.Ins.clearCache();
            cc.game.emit(i.Talk_Refresh);
          })
        });
        e.isTop || o.push({
          str: "置顶",
          icon: {
            url: "Atlas/UI/plusBtn",
            color: h.UIColor.white,
            w: 50,
            h: 40
          },
          call: () => a(this, void 0, void 0, function* () {
            console.log("Julian setTop", e.title);
            yield i.Ins.setTop(e.uId);
            yield i.Ins.clearCache();
            cc.game.emit(i.Talk_Refresh);
          })
        });
      }
      d.default.showMenu(t.node, o);
    });
  }
  updateStatus(e) {
    if (this.userTalks.has(u.default.Ins.role.uId)) {
      let t = this.userTalks.get(u.default.Ins.role.uId).find(t => t.uId == e.talkId);
      if (t) {
        t.status = e.status;
        t.offReason = e.offReason;
      }
      cc.game.emit(i.Talk_StatusChange);
    }
  }
};
P.Talk_Del = "Talk_Del";
P.Talk_Refresh = "Talk_Refresh";
P.Talk_StatusChange = "Talk_StatusChange";
P.Ins = new i();
P.UnlockPublishLvl = 5;
P = i = n([T], P);
exports.default = P;