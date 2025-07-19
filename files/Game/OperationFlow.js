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
exports.OperationFlow = void 0;
const n = e("../Frame/Top"),
  a = e("../Frame/Util"),
  s = e("../Frame/Sound"),
  r = e("../Frame/SceneManager"),
  l = e("./Player/Mng"),
  c = e("./World/Tile"),
  d = e("../TGA"),
  h = e("../Role"),
  p = e("../../scripts/_autogen/cmd/cmd"),
  u = e("../Frame/NetworkMgr"),
  m = e("../../scripts/_autogen/data/data"),
  f = e("../GameData/GameTypeDefine"),
  g = e("./Player/GameCellDataMng"),
  y = e("./Player/ShopMng"),
  v = e("../Frame/UIColor"),
  C = e("../Scene/GameCoverScene/GameCoverScene"),
  _ = e("./Player/DynamicMng"),
  S = e("../CustomUI/Button"),
  I = e("../../i18n/i18nMgr");
(function (e) {
  e.flyCoin = function (e) {
    let t = e.cnt;
    if (t <= 0) return;
    let o = 5;
    o = t >= 800 ? 40 : t >= 400 ? 20 : t >= 200 ? 10 : 5;
    let i = Math.ceil(t / o),
      r = Math.min(1 / i, 50);
    n.default.bezierSprite({
      url: "Atlas/UI/coin",
      from: a.Util.convertPosition(e.fromNode, n.default.node),
      to: a.Util.convertPosition(e.toNode, n.default.node),
      time: .6,
      cnt: i,
      deltaT: r,
      onEnd: n => {
        s.Sound.play("gainCoin");
        if (n) {
          let n = t - o * (i - 1);
          n > 0 && e.onArrive(n);
        } else e.onArrive(o);
      }
    });
  };
  e.flyEnergy = function (e) {
    n.default.bezierSprite({
      url: "Atlas/UI/energy",
      from: a.Util.convertPosition(e.fromNode, n.default.node),
      to: a.Util.convertPosition(e.toNode, n.default.node),
      time: .6,
      cnt: e.cnt,
      onEnd: t => {
        s.Sound.play("gainEnergy");
        e.onArrive(1, t);
      }
    });
  };
  e.flyDiamond = function (e) {
    n.default.bezierSprite({
      url: "Atlas/UI/diamond",
      from: a.Util.convertPosition(e.fromNode, n.default.node),
      to: a.Util.convertPosition(e.toNode, n.default.node),
      time: .6,
      cnt: e.cnt,
      onBegin: () => {
        s.Sound.play("gainDiamond1");
      },
      onEnd: t => {
        s.Sound.play("gainDiamond2");
        e.onArrive(1, t);
      }
    });
  };
  e.getConfTypeByRewardType = function (e) {
    switch (e) {
      case "tile":
        return f.CommonDataType.Tile;
      case "actor":
        return f.CommonDataType.Actor;
      case "device":
        return f.CommonDataType.Device;
      case "prop":
        return f.CommonDataType.Prop;
      case "weapon":
        return f.CommonDataType.Weapon;
    }
    return -1;
  };
  e.openRewards = function (e, t = null) {
    for (let t = 0; t < e.length; t++) {
      let o = e[t];
      switch (o.type) {
        case "coin":
          r.default.ins.pushPanel("GainCoinPanel", e => {
            e.setData(o.cnt);
          });
          break;
        case "tile":
          r.default.ins.pushPanel("GainTilePanel", e => {
            e.setData(o.id);
          });
          break;
        case "actor":
          r.default.ins.pushPanel("GainActorPanel", e => {
            e.setData(o.id);
          });
          break;
        case "device":
          r.default.ins.pushPanel("GainDevicePanel", e => {
            e.setData(o.id);
          });
          break;
        case "prop":
          r.default.ins.pushPanel("GainPropPanel", e => {
            e.setData(o.id);
          });
          break;
        case "weapon":
          r.default.ins.pushPanel("GainWeaponPanel", e => {
            e.setData(o.id);
          });
          break;
        case "PublishTicket":
          r.default.ins.pushPanel("GainPublishTicketPanel", e => {
            e.setData(o.cnt);
          });
          break;
        case "unlock":
          r.default.ins.pushPanel("UnlockPanel", e => {
            e.setData(o.title, o.str);
          });
      }
    }
    r.default.ins.pushCall(() => {
      t && t();
    });
    r.default.ins.checkNextPanel();
  };
  e.paintTile = function (e, t) {
    r.default.ins.Enter("PaintScene", o => {
      o.toPaintTile();
      exports.completeCall = (o, n, a) => i(this, void 0, void 0, function* () {
        r.default.ins.OpenPanelByName("CreateCommonPanel", s => {
          let c = {
            type: f.CommonDataType.Tile,
            id: "",
            tileType: e,
            name: "自定义地块",
            author: h.default.Ins.userName,
            textureName: "",
            tilePhyType: f.TilePhysicType.Block,
            shape: f.TileShape.Normal,
            importOthersImg: n,
            belongGameId: a
          };
          s.setData(f.CommonDataType.Tile, c, null, e => i(this, void 0, void 0, function* () {
            yield l.Mng.Ins.assetGroupMng.curGroupAppend(e);
            r.default.ins.Back();
            t(e);
            d.TGA.track("paint", {
              type: "tile"
            });
          }));
          s.setPixel(o);
        });
      });
    });
  };
  e.paintActor = function (e) {
    r.default.ins.Enter("PaintScene", t => {
      t.toPaintActor();
      t.completeCall = (t, o, s, p) => i(this, void 0, void 0, function* () {
        r.default.ins.OpenPanelByName("CreateActorPanel", u => {
          let g = a.Util.getPixelTirmBounds(t, 256, 256),
            y = a.Util.bounds2OffsetAndSize(g),
            v = {
              type: f.CommonDataType.Actor,
              id: "",
              name: "自定义角色",
              textureName: "",
              author: h.default.Ins.userName,
              gunId: "",
              hp: 1,
              hpMax: 1,
              collider: y,
              rpgConf: {
                moveSpeed: 256,
                aiMoveType: f.AIMoveType.None,
                beatenLockHpTime: .8
              },
              jumpPlatformConf: {
                moveSpeed: 3 * c.default.SIZE,
                jumpStep: 2,
                jumpHight: 2.5 * c.default.SIZE,
                aiMoveType: f.AIMoveType.None,
                beatenLockHpTime: .8
              },
              importOthersImg: o,
              belongGameId: s
            };
          u.setData(v, t);
          u.confirmCall = o => i(this, void 0, void 0, function* () {
            n.default.showLoading("正在上传（1/2）");
            let i = yield a.Util.uploadPng(t, m.ImageFileType.actor, p);
            if (i.err) n.default.hideLoading("图片违规：" + i.err);else {
              exports.textureName = i.url;
              n.default.showLoading("正在上传（2/2）");
              if (yield l.Mng.Ins.actorMng.create(o)) {
                yield l.Mng.Ins.assetGroupMng.curGroupAppend(o);
                n.default.hideLoading("上传成功");
                r.default.ins.Back();
                e();
                d.TGA.track("paint", {
                  type: "actor"
                });
              } else n.default.hideLoading("网络错误，上传失败!");
            }
          });
        });
      });
    });
  };
  e.paintDevice = function (e) {
    r.default.ins.OpenPanelByName("DeviceTypePanel", t => {
      t.call = t => {
        r.default.ins.Enter("PaintScene", o => {
          o.toPaintTile();
          exports.completeCall = (o, s, c, p) => i(this, void 0, void 0, function* () {
            r.default.ins.OpenPanelByName("CreateDevicePanel", u => {
              let f = a.Util.deepCopy(t);
              u.setData(f, o);
              u.confirmCall = () => i(this, void 0, void 0, function* () {
                f.author = h.default.Ins.userName;
                f.importOthersImg = s;
                f.belongGameId = c;
                n.default.showLoading("正在上传（1/2）");
                let t = yield a.Util.uploadPng(o, m.ImageFileType.device, p);
                if (t.err) n.default.hideLoading("图片违规：" + t.err);else {
                  n.default.showLoading("正在上传（2/2）");
                  f.textureName = t.url;
                  delete f.isBuildIn;
                  yield l.Mng.Ins.deviceMng.create(f);
                  yield l.Mng.Ins.assetGroupMng.curGroupAppend(f);
                  n.default.hideLoading("上传成功");
                  r.default.ins.Back();
                  e();
                  d.TGA.track("paint", {
                    type: "device"
                  });
                }
              });
            });
          });
        });
      };
    });
  };
  e.paintProp = function (e) {
    r.default.ins.Enter("PaintScene", t => {
      t.toPaintTile();
      t.completeCall = (t, o, s, c) => i(this, void 0, void 0, function* () {
        r.default.ins.OpenPanelByName("CreatePropPanel", p => {
          let u = {
            type: f.CommonDataType.Prop,
            id: "",
            name: "自定义物品",
            intro: "",
            textureName: "",
            author: h.default.Ins.userName,
            once: !0,
            useWhenPick: !1,
            defaultPrice: 10,
            salePrice: 5,
            importOthersImg: o,
            belongGameId: s
          };
          p.setData(u, t);
          p.confirmCall = o => i(this, void 0, void 0, function* () {
            n.default.showLoading("正在上传（1/2）");
            let i = yield a.Util.uploadPng(t, m.ImageFileType.prop, c);
            if (i.err) n.default.hideLoading("图片违规：" + i.err);else {
              n.default.showLoading("正在上传（2/2）");
              exports.textureName = i.url;
              if (yield l.Mng.Ins.propMng.create(o)) {
                yield l.Mng.Ins.assetGroupMng.curGroupAppend(o);
                n.default.hideLoading("上传成功");
                r.default.ins.Back();
                e(o);
                d.TGA.track("paint", {
                  type: "prop"
                });
              } else n.default.hideLoading("上传失败");
            }
          });
        });
      });
    });
  };
  e.paintHeadIcon = function (e, t) {
    r.default.ins.Enter("PaintScene", o => i(this, void 0, void 0, function* () {
      o.toPaintHeadIcon();
      if (a.Util.isCdnPng(e)) {
        let t = yield a.Util.downloadPngPixel(e);
        o.graphics.drawPixels(t);
      }
      exports.completeCall = (e, o, s, l) => {
        r.default.ins.OpenPanelByName("MessageBox", o => {
          o.titleLabel.string = "提示";
          o.label.string = "是否上传头像？";
          o.leftBtn.node.active = !1;
          o.setRightBtn({
            text: "确定",
            color: v.UIColor.blue,
            call: () => i(this, void 0, void 0, function* () {
              n.default.showLoading("正在上传（1/2）");
              let o = yield a.Util.uploadPng(e, m.ImageFileType.actor, l);
              if (o.err) {
                n.default.hideLoading("图片违规：" + o.err);
                return;
              }
              n.default.showLoading("正在上传（2/2）");
              let i = {
                newUserImg: o.url
              };
              if (yield u.NetIns.SendCmdAsync({
                cmd: p.CMDS.Game_UpdateUserImg,
                params: i
              }, p.Game_RUpdateUserImg)) {
                h.default.Ins.role.newUserImg = o.url;
                h.default.Ins.role.newUserImgReviewStatus = m.ManReviewStatus.inReview;
                n.default.hideLoading("上传成功");
                r.default.ins.Back();
                t();
              } else n.default.hideLoading("网络错误，上传失败！");
            })
          });
        });
      };
    }));
  };
  e.paintWeapon = function (e, t) {
    let o = e;
    var s = () => {
      r.default.ins.Enter("PaintScene", e => {
        e.toPaintWeapon(o);
        e.completeCall = (e, s, p, u) => i(this, void 0, void 0, function* () {
          r.default.ins.OpenPanelByName("CreateWeaponPanel", g => i(this, void 0, void 0, function* () {
            let y,
              v = yield l.Mng.Ins.weaponMng.loadAll(),
              C = 1;
            do {
              y = I.I18nMgr.getI18nStringByZh("武器") + C;
              C++;
            } while (v.find(e => e.name == y));
            let _ = null;
            o == f.WeaponType.Gun ? _ = {
              author: h.default.Ins.userName,
              type: f.CommonDataType.Weapon,
              id: "",
              name: y,
              textureName: "Weapon/BuildIn1/gun",
              ROF: 5,
              weaponType: f.WeaponType.Gun,
              gun: {
                scatter: 0,
                fireShake: !1,
                muzzles: [cc.Vec2.ZERO],
                bulletId: "1",
                bulletSpeed: 5 * c.default.SIZE,
                bulletRange: 5 * c.default.SIZE
              },
              importOthersImg: s,
              belongGameId: p
            } : o == f.WeaponType.Melee ? _ = {
              author: h.default.Ins.userName,
              type: f.CommonDataType.Weapon,
              id: "",
              name: y,
              textureName: "Weapon/BuildIn2/melee1",
              ROF: 2,
              weaponType: f.WeaponType.Melee,
              melee: {
                damage: 1,
                scale: 1.5,
                actType: f.MeleeActType.Swing
              },
              importOthersImg: s
            } : o == f.WeaponType.Cast && (_ = {
              author: h.default.Ins.userName,
              type: f.CommonDataType.Weapon,
              id: "",
              name: y,
              textureName: "Weapon/BuildIn3/cast1",
              ROF: 1,
              weaponType: f.WeaponType.Cast,
              cast: {
                fireShake: !1,
                bulletId: "5",
                outSpeed: 18 * c.default.SIZE,
                flyDistance: 16 * c.default.SIZE,
                airResistanceCof: .1,
                defaultAngle: 70,
                dragInverse: !1
              },
              importOthersImg: s
            });
            g.setData(_, e);
            g.confirmCall = o => i(this, void 0, void 0, function* () {
              n.default.showLoading("正在上传（1/2）");
              let i = yield a.Util.uploadPng(e, m.ImageFileType.bullet, u);
              if (i.err) n.default.hideLoading("图片违规：" + i.err);else {
                n.default.showLoading("正在上传（2/2）");
                exports.textureName = i.url;
                if (yield l.Mng.Ins.weaponMng.create(o)) {
                  n.default.hideLoading("上传成功");
                  r.default.ins.Back();
                  t(o.id);
                  d.TGA.track("paint", {
                    type: "weapon"
                  });
                } else n.default.hideLoading("上传失败");
              }
            });
          }));
        });
      });
    };
    null == o ? r.default.ins.OpenPanelByName("WeaponTypePanel", e => {
      e.call = e => {
        o = e.type;
        s();
      };
    }) : s();
  };
  e.paintBullet = function (e) {
    r.default.ins.Enter("PaintScene", t => {
      t.toPaintTile();
      t.completeCall = (t, o, s, c) => i(this, void 0, void 0, function* () {
        r.default.ins.OpenPanelByName("CreateBulletPanel", p => i(this, void 0, void 0, function* () {
          let u,
            g = yield l.Mng.Ins.bulletMng.loadAll(),
            y = 1;
          do {
            u = I.I18nMgr.getI18nStringByZh("子弹") + y;
            y++;
          } while (g.find(e => e.name == u));
          let v = {
            author: h.default.Ins.userName,
            type: f.CommonDataType.Bullet,
            id: "",
            name: u,
            textureName: "",
            speed: 5,
            range: 5,
            damage: 1,
            hitShake: !0,
            hitDestroy: !0,
            angleSpeed: 0,
            importOthersImg: o,
            belongGameId: s
          };
          p.setData(v, t);
          p.confirmCall = o => i(this, void 0, void 0, function* () {
            n.default.showLoading("正在上传（1/2）");
            let i = yield a.Util.uploadPng(t, m.ImageFileType.bullet, c);
            if (i.err) n.default.hideLoading("图片违规：" + i.err);else {
              n.default.showLoading("正在上传（2/2）");
              exports.textureName = i.url;
              yield l.Mng.Ins.bulletMng.create(o);
              n.default.hideLoading("上传成功");
              r.default.ins.Back();
              e(o.id);
              d.TGA.track("paint", {
                type: "bullet"
              });
            }
          });
        }));
      });
    });
  };
  e.deelOnShow = function (e) {
    return i(this, void 0, void 0, function* () {
      if (n.default.isBlocking()) return;
      console.log("scene.onShow", e);
      let t = e.query;
      if (t) {
        let e = t.type || "game";
        if ("game" == e) {
          let e = t.cyGameId || t.gameId;
          if (e && !e.includes("game-")) {
            let o = yield g.default.Ins.loadGames([e]);
            o && o[0] && r.default.ins.pushPanel("OpenGamePanel", e => {
              let i = "";
              i = !0 === t.isMine || void 0 === t.isMine ? "欢迎你玩我的游戏！" : "这个游戏超好玩！";
              e.setData(i, o[0]);
            });
          }
        }
        if ("goods" == e) {
          let e = t.goodsId;
          if (e) {
            let t = yield y.default.Ins.loadGoodsInfos([e]);
            t && t[0] && r.default.ins.pushPanel("BuyGoodsPanel", e => {
              e.setData(t[0]);
              e.buyCall = () => {
                cc.game.emit("RefreshShopList");
              };
            });
          }
        }
        if ("gameRank" == e) {
          let e = e => i(this, void 0, void 0, function* () {
            let o = t.cyGameId;
            e.setData(o);
            let i = yield a.Util.once(C.default.GameCoverScene_GamePackLoaded),
              n = yield l.Mng.Ins.gameRankMng.loadOne(t.gameRankId);
            n && o == i.gameData.id && r.default.ins.OpenPanelByName("GameRankPanel", e => {
              e.setData(n, i.gameData);
            });
          });
          r.default.ins.curScene instanceof C.default ? e(r.default.ins.curScene) : r.default.ins.Enter("GameCoverScene", e);
        }
        r.default.ins.checkNextPanel();
      }
    });
  };
  e.openVisitorPanel = function () {
    return i(this, void 0, void 0, function* () {
      r.default.ins.OpenPanelByName("MessageBox", e => {
        e.titleLabel.string = "提示";
        e.label.string = "        游客登陆不支持编辑个人资料、发布作品、写评论等，为避免您的作品丢失，请选择其他登陆方式。";
        e.leftBtn.node.active = !1;
        e.setRightBtn({
          text: "好的",
          color: v.UIColor.blue
        });
      });
    });
  };
  e.getReviewImageMap = function (e) {
    return i(this, void 0, void 0, function* () {
      let t = [];
      for (let o = 0; o < e.tileConfIds.length; o++) {
        let i = e.tileConfIds[o],
          n = yield l.Mng.Ins.tileMng.loadOne(i);
        n && t.push(n.textureName);
      }
      for (let o = 0; o < e.actorConfIds.length; o++) {
        let i = e.actorConfIds[o],
          n = yield l.Mng.Ins.actorMng.loadOne(i);
        n && t.push(n.textureName);
      }
      for (let o = 0; o < e.deviceConfIds.length; o++) {
        let i = e.deviceConfIds[o],
          n = yield l.Mng.Ins.deviceMng.loadOne(i);
        n && t.push(n.textureName);
      }
      for (let o = 0; o < e.propConfIds.length; o++) {
        let i = e.propConfIds[o],
          n = yield l.Mng.Ins.propMng.loadOne(i);
        n && t.push(n.textureName);
      }
      for (let o = 0; o < e.weaponConfIds.length; o++) {
        let i = e.weaponConfIds[o],
          n = yield l.Mng.Ins.weaponMng.loadOne(i);
        n && t.push(n.textureName);
      }
      let o = new Map();
      {
        n.default.showLoading("正在上传(2/3)");
        let e = {
            imageList: t
          },
          i = yield u.NetIns.SendCmdAsync({
            cmd: p.CMDS.Game_GetNeedReviewImageList,
            params: e
          }, p.Game_RGetNeedReviewImageList);
        if (!i) {
          n.default.hideLoading();
          return null;
        }
        let s = 0;
        for (; s < i.needImageList.length;) {
          let e = i.needImageList.slice(s, s + 64),
            t = yield a.Util.mergeImage(e);
          o.set(t, e);
          s += 64;
        }
      }
      return o;
    });
  };
  e.getImgGridSize = function (e) {
    return {
      row: Math.ceil(e / 3),
      col: 3
    };
  };
  e.makeOffReason = function (e) {
    let t = [];
    if (!e) return t;
    for (let o = 0; o < e.imageOffReasonList.length; o++) {
      let i = e.imageOffReasonList[o],
        n = i.sensitiveImageResult.score,
        a = [];
      n.Porn && a.push(I.I18nMgr.getI18nStringByZh("图片涉黄"));
      n.Cartoon_leader && a.push(I.I18nMgr.getI18nStringByZh("领导人漫画"));
      n.Anniversary_flag && a.push(I.I18nMgr.getI18nStringByZh("特殊标志"));
      n.Sensitive_flag && a.push(I.I18nMgr.getI18nStringByZh("敏感旗帜"));
      n.Sensitive_text && a.push(I.I18nMgr.getI18nStringByZh("敏感文字"));
      n.Leader_recognition && a.push(I.I18nMgr.getI18nStringByZh("敏感人物"));
      n.Bloody && a.push(I.I18nMgr.getI18nStringByZh("图片血腥"));
      n.Fandongtaibiao && a.push(I.I18nMgr.getI18nStringByZh("未准入台标"));
      n.Plant_ppx && a.push(I.I18nMgr.getI18nStringByZh("图片涉毒"));
      n.High_risk_social_event && a.push(I.I18nMgr.getI18nStringByZh("社会事件"));
      n.High_risk_boom && a.push(I.I18nMgr.getI18nStringByZh("爆炸"));
      n.High_risk_money && a.push(I.I18nMgr.getI18nStringByZh("人民币"));
      n.High_risk_terrorist_uniform && a.push(I.I18nMgr.getI18nStringByZh("极端服饰"));
      n.High_risk_sensitive_map && a.push(I.I18nMgr.getI18nStringByZh("敏感地图"));
      n.Great_hall && a.push(I.I18nMgr.getI18nStringByZh("大会堂"));
      n.Cartoon_porn && a.push(I.I18nMgr.getI18nStringByZh("色情动漫"));
      n.Party_founding_memorial && a.push(I.I18nMgr.getI18nStringByZh("建党纪念"));
      n.Abuse && a.push(I.I18nMgr.getI18nStringByZh("谩骂"));
      n.Polity && a.push(I.I18nMgr.getI18nStringByZh("涉政"));
      n.Terror && a.push(I.I18nMgr.getI18nStringByZh("恐怖"));
      t.push({
        imageUrl: i.imageUrl,
        reason: a.join("，")
      });
    }
    return t;
  };
  e.setNameLabel = function (e, t, o, i = 99) {
    if (_.DynamicMng.Ins.isDisable(_.FunctionEnum.UserName, !1)) {
      let t = e.getComponent(S.default);
      t && t.destroy();
      e.string = I.I18nMgr.exceI18nStringByZh("玩家${playerId}", [{
        paramName: "playerId",
        param: o
      }]);
    } else {
      t = a.Util.clampStr(t, i, "..");
      e.string = t || I.I18nMgr.exceI18nStringByZh("玩家${playerId}", [{
        paramName: "playerId",
        param: o
      }]);
    }
  };
})(o.OperationFlow || (exports.OperationFlow = {}));