"use strict";

var i = this && this.__awaiter || function (e, t, o, i) {
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
const n = e("../../GameScript/index"),
  a = e("../../../scripts/_autogen/cmd/cmd"),
  s = e("../../Frame/NetworkMgr"),
  r = e("../../Frame/Top"),
  l = e("../../Frame/Util"),
  c = e("../../GameData/GameTypeDefine"),
  d = e("../../Role"),
  h = e("../GameEnv"),
  p = e("./CreativeRankMng"),
  u = e("./FreshGameMng"),
  m = e("./GameCellDataMng"),
  f = e("./GameCoverMng"),
  g = e("./GamePackageMng"),
  y = e("./HotGameMng"),
  v = e("./Mng"),
  C = e("./PlayerDetailMng"),
  _ = e("../../../scripts/_autogen/data/data"),
  S = e("./GameRankMng"),
  I = e("../../Frame/Config");
class G {
  publish(e) {
    return i(this, void 0, void 0, function* () {
      r.default.showLoading("正在打包");
      let t = yield this.makeGamePackRaw(e.worldIds);
      r.default.showLoading("正在检测文本");
      t.checkStrItems.unshift({
        from: "广告词",
        str: e.advert
      });
      t.checkStrItems.unshift({
        from: "游戏名",
        str: e.name
      });
      let o = new Set();
      for (let e = 0; e < t.checkStrItems.length; e++) o.add(t.checkStrItems[e].str);
      let i = {
          msg: Array.from(o).join("哈")
        },
        n = yield s.NetIns.SendCmdAsync({
          cmd: a.CMDS.Game_SensitiveMsg,
          params: i
        }, a.Game_RSensitiveMsg);
      if (!n) {
        r.default.hideLoading();
        return {
          msg: "发布失败"
        };
      }
      if (n.sensitiveWords && n.sensitiveWords.length > 0) {
        r.default.hideLoading();
        return {
          checkStrItems: t.checkStrItems,
          sensitiveWords: n.sensitiveWords
        };
      }
      r.default.showLoading("正在压缩");
      let c = {
          id: e.id,
          name: e.name,
          gameData: e,
          worldDatas: t.worldDatas,
          tileConfs: t.tileConfs,
          actorConfs: t.actorConfs,
          deviceConfs: t.deviceConfs,
          propConfs: t.propConfs,
          weaponConfs: t.weaponConfs,
          bulletConfs: t.bulletConfs,
          gameShopConfs: t.gameShopConfs,
          gameRankConfs: t.gameRankConfs,
          creatorVersion: h.gameEnv.creatorVersion
        },
        v = bon.encode(c),
        S = pako.gzip(v, {
          level: 1
        }),
        I = "";
      {
        r.default.showLoading("正在上传(1/3)");
        let t = {
            dataVersion: e.version,
            content: S
          },
          o = yield s.NetIns.SendCmdAsync({
            cmd: a.CMDS.Game_UploadReleaseGame,
            params: t
          }, a.Game_RUploadReleaseGame);
        if (!o) {
          r.default.hideLoading();
          return {
            msg: "发布失败"
          };
        }
        I = o.cdnUrl;
      }
      let G,
        T = new Map();
      {
        r.default.showLoading("正在上传(2/3)");
        let o = [];
        for (let e = 0; e < t.assets.length; e++) {
          let i = t.assets[e];
          o.push(i.textureName);
        }
        "icon1" !== e.iconTextureName && o.push(e.iconTextureName);
        let i = {
            imageList: o
          },
          n = yield s.NetIns.SendCmdAsync({
            cmd: a.CMDS.Game_GetNeedReviewImageList,
            params: i
          }, a.Game_RGetNeedReviewImageList);
        if (!n) {
          r.default.hideLoading();
          return {
            msg: "发布失败"
          };
        }
        let c = 0;
        for (; c < n.needImageList.length;) {
          let e = n.needImageList.slice(c, c + 64),
            t = yield l.Util.mergeImage(e);
          console.log(h.gameEnv.fileCDN + t);
          T.set(t, e);
          c += 64;
        }
      }
      G = e.creativeOp.isClose ? [] : e.creativeOp.isOpenAll ? e.worldIds : e.creativeOp.openWorldIds;
      let b = {
        id: e.id,
        name: e.name,
        advert: e.advert,
        dataVersion: e.version,
        iconTextureName: e.iconTextureName,
        gameDataCdnUrl: I,
        gameTags: ["ZongBang"],
        openCreativeGame: !e.creativeOp.isClose,
        openData: {
          openWorldIds: G,
          creativeResList: t.assets
        },
        reviewStr: "",
        reviewImageMap: T
      };
      r.default.showLoading("正在上传(3/3)");
      e.status = _.GameStatus.inReview;
      if (!(yield s.NetIns.SendCmdAsync({
        cmd: a.CMDS.Game_PublishGame,
        params: b
      }, a.Game_RPublishGame))) {
        r.default.hideLoading();
        return {
          msg: "发布失败"
        };
      }
      r.default.hideLoading("上传成功");
      m.default.Ins.deleteCache(e.id);
      f.default.Ins.deleteCache(e.id);
      if (e.parnetGame) {
        f.default.Ins.deleteCache(e.parnetGame.id);
        p.default.Ins.deleteCache(e.parnetGame.id);
      } else p.default.Ins.deleteCache(e.id);
      C.default.Ins.deleteCache(d.default.Ins.role.id);
      y.default.Ins.clearAll();
      u.default.Ins.clear();
      g.default.Ins.addCache(I, c);
    });
  }
  makeGamePackRaw(e) {
    return i(this, void 0, void 0, function* () {
      let t = [],
        o = new Set(),
        a = new Set(),
        s = new Set(),
        r = new Set(),
        l = new Set(),
        d = new Set(),
        p = new Set(),
        u = new Set(),
        m = [],
        f = e => i(this, void 0, void 0, function* () {
          if (e) for (var t in e) {
            if (!e.hasOwnProperty(t)) continue;
            let o = e[t];
            if ("object" == typeof o) {
              o && o.gunId && l.add(o.gunId);
              o && o.bulletId && d.add(o.bulletId);
              o && o.propConfId && r.add(o.propConfId);
              o && o.actorConfId && a.add(o.actorConfId);
              o && o.gameShopId && p.add(o.gameShopId);
              yield f(o);
            }
          }
        });
      yield v.Mng.Ins.worldMng.loadMany(e, !0);
      for (let i = 0; i < e.length; i++) {
        let l = e[i],
          c = yield v.Mng.Ins.worldMng.loadOne(l, !0);
        if (!c || !c.worldLayout) continue;
        let d = c.worldLayout,
          h = {
            id: c.id,
            info: c.info,
            layoutMin: void 0,
            worldLayout: d
          };
        t.push(h);
        m.push({
          from: "地图名",
          str: h.info.name
        });
        d.tiles && d.tiles.forEach(e => {
          o.add(e.data.confId);
        });
        d.actors && d.actors.forEach(e => {
          a.add(e.data.confId);
        });
        d.devices && d.devices.forEach(e => {
          s.add(e.data.confId);
        });
        d.props && d.props.forEach(e => {
          r.add(e.data.confId);
        });
        let p = n.GSMng.instance.getNodesByType(l, n.GSDataNodeType.GDATA_DropItem);
        p && p.forEach(e => {
          e.itemId && r.add(e.itemId);
        });
        let u = n.GSMng.instance.getNodesByType(l, n.GSDataNodeType.GDATA_ChangeBagItem);
        u && u.forEach(e => {
          e.itemId && r.add(e.itemId);
        });
        yield f(d);
        this.collectCheckStr(d, m);
      }
      let g = Array.from(p);
      yield v.Mng.Ins.gameShopMng.loadMany(g);
      let y = [];
      for (let e = 0; e < g.length; e++) {
        let t = g[e],
          o = yield v.Mng.Ins.gameShopMng.loadOne(t);
        if (o) {
          a.add(o.actorId);
          for (let e = 0; e < o.goodses.length; e++) {
            let t = o.goodses[e];
            r.add(t.propId);
          }
          y.push(o);
        }
      }
      let C = Array.from(u);
      yield v.Mng.Ins.gameRankMng.loadMany(g);
      let _ = [];
      for (let e = 0; e < C.length; e++) {
        let t = C[e],
          o = yield v.Mng.Ins.gameRankMng.loadOne(t);
        if (o) {
          o.propId && o.rankType == S.GameRankType.PropRank && r.add(o.propId);
          _.push(o);
        }
      }
      let G = Array.from(r);
      yield v.Mng.Ins.propMng.loadMany(G);
      let T = [];
      for (let e = 0; e < G.length; e++) {
        let t = G[e],
          o = yield v.Mng.Ins.propMng.loadOne(t);
        if (o && !o.isBuildIn) {
          T.push(o);
          m.push({
            from: "道具名",
            str: o.name
          });
          m.push({
            from: "道具介绍",
            str: o.intro
          });
          yield f(o);
        }
      }
      let b = Array.from(o);
      yield v.Mng.Ins.tileMng.loadMany(b);
      let M = [];
      for (let e = 0; e < b.length; e++) {
        let t = b[e],
          o = yield v.Mng.Ins.tileMng.loadOne(t);
        if (o && !o.isBuildIn) {
          M.push(o);
          m.push({
            from: "地块名",
            str: o.name
          });
        }
      }
      let P = Array.from(a);
      yield v.Mng.Ins.actorMng.loadMany(P);
      let D = [];
      for (let e = 0; e < P.length; e++) {
        let t = P[e],
          o = yield v.Mng.Ins.actorMng.loadOne(t);
        if (o && !o.isBuildIn) {
          D.push(o);
          m.push({
            from: "角色名",
            str: o.name
          });
        }
      }
      let w = Array.from(s);
      yield v.Mng.Ins.deviceMng.loadMany(w);
      let B = [];
      for (let e = 0; e < w.length; e++) {
        let t = w[e],
          o = yield v.Mng.Ins.deviceMng.loadOne(t);
        if (o && !o.isBuildIn) {
          B.push(o);
          m.push({
            from: "装置名",
            str: o.name
          });
        }
      }
      let R = Array.from(l);
      yield v.Mng.Ins.weaponMng.loadMany(R);
      let x = [];
      for (let e = 0; e < R.length; e++) {
        let t = R[e],
          o = yield v.Mng.Ins.weaponMng.loadOne(t);
        if (o && !o.isBuildIn) {
          x.push(o);
          m.push({
            from: "武器名",
            str: o.name
          });
          o.gun && o.gun.bulletId && d.add(o.gun.bulletId);
          o.cast && o.cast.bulletId && d.add(o.cast.bulletId);
        }
      }
      let L = Array.from(d);
      yield v.Mng.Ins.bulletMng.loadMany(L);
      let k = [];
      for (let e = 0; e < L.length; e++) {
        let t = L[e],
          o = yield v.Mng.Ins.bulletMng.loadOne(t);
        if (o && !o.isBuildIn) {
          k.push(o);
          m.push({
            from: "子弹名",
            str: o.name
          });
        }
      }
      let F = [];
      M.forEach(e => {
        F.push({
          name: e.name,
          textureName: e.textureName,
          typeName: "地块"
        });
      });
      D.forEach(e => {
        F.push({
          name: e.name,
          textureName: e.textureName,
          typeName: "角色"
        });
      });
      B.forEach(e => {
        let t = I.Config.getDeviceTypeName(e.deviceType);
        F.push({
          name: e.name,
          textureName: e.textureName,
          typeName: t
        });
      });
      T.forEach(e => {
        F.push({
          name: e.name,
          textureName: e.textureName,
          typeName: "道具"
        });
      });
      x.forEach(e => {
        let t = "";
        t = e.weaponType == c.WeaponType.Gun ? "直射武器" : e.weaponType == c.WeaponType.Melee ? "近战武器" : "武器";
        F.push({
          name: e.name,
          textureName: e.textureName,
          typeName: t
        });
      });
      return {
        worldDatas: t,
        tileConfs: M,
        actorConfs: D,
        deviceConfs: B,
        weaponConfs: x,
        bulletConfs: k,
        propConfs: T,
        creatorVersion: h.gameEnv.creatorVersion,
        gameShopConfs: y,
        gameRankConfs: _,
        checkStrItems: m,
        assets: F
      };
    });
  }
  collectCheckStr(e, t) {
    if (e) for (var o in e) {
      if (!e.hasOwnProperty(o)) continue;
      let i = e[o];
      if ("object" == typeof i) {
        if (i && i.act == c.TriggerAct.Dialog && i.extra && i.extra.lines) {
          let e = i.extra.lines;
          for (let o = 0; o < e.length; o++) t.push({
            from: "剧情对话",
            str: e[o].str
          });
        }
        i && i.act == c.TriggerAct.GameWin && i.extra && i.extra.str && t.push({
          from: "游戏胜利文本",
          str: i.extra.str
        });
        i && i.act == c.TriggerAct.GameOver && i.extra && i.extra.str && t.push({
          from: "游戏失败文本",
          str: i.extra.str
        });
        i && i.act == c.TriggerAct.ShareGame && i.extra && i.extra.str && t.push({
          from: "分享面板",
          str: i.extra.str
        });
        this.collectCheckStr(i, t);
      }
    }
  }
  makeReviewStr(e, t, o) {
    let i = new Set(),
      n = new Set(),
      a = new Set(),
      s = new Set(),
      r = new Set(),
      l = new Set(),
      c = new Set(),
      d = new Set(),
      h = new Set();
    o.checkStrItems.forEach(e => {
      "地图名" == e.from && i.add(e.str);
      "地块名" == e.from && n.add(e.str);
      "角色名" == e.from && a.add(e.str);
      "装置名" == e.from && s.add(e.str);
      "道具名" == e.from && r.add(e.str);
      "道具介绍" == e.from && l.add(e.str);
      "武器名" == e.from && c.add(e.str);
      "子弹名" == e.from && d.add(e.str);
      "剧情对话" == e.from && h.add(e.str);
    });
    let p = "";
    p += "游戏名：" + e + "哈\n";
    p += "介绍：" + t + "哈\n";
    p += "地图名：" + Array.from(i).join("哈") + "\n";
    p += "地块名：" + Array.from(n).join("哈") + "\n";
    p += "角色名：" + Array.from(a).join("哈") + "\n";
    p += "装置名：" + Array.from(s).join("哈") + "\n";
    p += "武器名：" + Array.from(c).join("哈") + "\n";
    return (p += "子弹名：" + Array.from(d).join("哈") + "\n") + "剧情：\n" + Array.from(h).join("哈\n") + "\n";
  }
}
exports.default = G;
G.Ins = new G();