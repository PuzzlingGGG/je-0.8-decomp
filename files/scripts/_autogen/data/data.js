"use strict";

var i = this && this.__decorate || function (e, t, o, i) {
  var n,
    a = arguments.length,
    s = a < 3 ? t : null === i ? i = Object.getOwnPropertyDescriptor(t, o) : i;
  if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) s = Reflect.decorate(e, t, o, i);else for (var r = e.length - 1; r >= 0; r--) (n = e[r]) && (s = (a < 3 ? n(s) : a > 3 ? n(t, o, s) : n(t, o)) || s);
  return a > 3 && s && Object.defineProperty(t, o, s), s;
};
exports.GameRankSortType = exports.GameRankCycleType = exports.GameGiftRank = exports.GameGiftRankScoreInfo = exports.GiftData = exports.GameData = exports.OffReason = exports.ImageOffReason = exports.GameStatus = exports.GameComment = exports.GameCellData = exports.ESCacheData = exports.EMTeamState = exports.EMServerStatus = exports.EMServerBusyStatus = exports.EMRoomType = exports.EMRoomState = exports.EMRoomMsgTarget = exports.DynamicGameGift = exports.DynamicGameGiftCfg = exports.DeviceConf = exports.CustomColor = exports.CreativeGameSortType = exports.CreativeGameScore = exports.CreativeGameData = exports.CreativeConfType = exports.CreativeAttrType = exports.CommentMeData = exports.CommentType = exports.CombImageReviewMap = exports.SensitiveImageResult = exports.SensitiveScore = exports.ManualReview = exports.ReviewCode = exports.ColorData = exports.CDAccountLoginInfo = exports.CDAccountLoginExt = exports.BulletConf = exports.BugMsg = exports.BeBindInfo = exports.GDBindType = exports.AnalyticsGoodsData = exports.AnalyticsGameData = exports.AggregateMsgData = exports.MsgType = exports.AggregateUserInfo = exports.AddCoinByShareType = exports.ActorGroupData = exports.ActorGroupRefData = exports.ActorConf = void 0;
exports.ImageFileType = exports.GoodsSortType = exports.GoodsCellData = exports.GiftRankActivity = exports.GDWorldData = exports.GDVariable = exports.GDUser = exports.GDSubGame = exports.GDServerRole = exports.GDServer = exports.GDRoomFrameSyncMsg = exports.GDRoom = exports.GDRoleThumb = exports.GDRoleSimpleMsg = exports.GDRoleSaleMsg = exports.SaleSummary = exports.SaleGoodsType = exports.GDRolePlayGame = exports.GDRoleMsgList = exports.MsgData = exports.GDRoleGameConf = exports.GDRoleFansData = exports.GDRoleCountMsg = exports.GDRoleCommentLikeMsg = exports.GDRoleBugMsg = exports.GDRole = exports.UserCreditMsg = exports.ManReviewStatus = exports.GDUserInfo = exports.GDReleaseGameData = exports.GDMatch = exports.GDTeam = exports.GDRoomMember = exports.GDGoodsInfo = exports.GoodsType = exports.GoodsStatus = exports.GoodsContent = exports.WeaponConf = exports.TileConf = exports.PropConf = exports.GDGiftScoreInfo = exports.GDGameTopComment = exports.GDDynamicConfig = exports.GDBindRoleInfo = exports.GameTageInfo = exports.GameTagaData = exports.GameStatisticsData = exports.GameShopConf = exports.GameRankScoreInfo = exports.GameRankConf = void 0;
exports.VariableData = exports.UserSimpleMsg = exports.UserDetailMsg = exports.TalkTopComment = exports.TalkSortType = exports.TalkData = exports.TalkType = exports.TalkComment = exports.SecondaryGameData = exports.ScoreInfo = exports.RoleTalkMsg = exports.RoleTalkCommentMsg = exports.RoleStatisticSensitiveImgMsg = exports.RoleReviewGameData = exports.RoleManualSensitiveImgMsg = exports.RoleCreativeWorldLayout = exports.RoleCreativeConf = exports.RoleActivity = exports.ReviewStatus = exports.ReviewResult = exports.ReviewResultType = exports.ReviewInfo = exports.RetVariableData = exports.ReleaseGameGameRank = exports.PlatformRecommend = exports.PlatformRecommendData = exports.OIMMsg = exports.OIMConversation = exports.OIMUser = exports.OIMConversationType = exports.OIMContentType = exports.OffLineChangeMsg = exports.MsgReviewInfo = exports.SensitiveMsgResult = exports.SensitiveMsgData = exports.SensitiveMsgDetails = exports.Score = exports.ImageSize = exports.ImageReviewInfo = exports.ReviewType = void 0;
const n = orange.type,
  a = orange.DataBase;
class s extends a {
  constructor() {
    super(...arguments);
    this.id = "";
    this.goodsUId = "";
    this.conf = {};
  }
}
i([n(0)], s.prototype, "id", void 0);
i([n(0)], s.prototype, "goodsUId", void 0);
i([n(0)], s.prototype, "conf", void 0);
exports.ActorConf = s;
class r extends a {
  constructor() {
    super(...arguments);
    this.confType = 0;
    this.confId = "";
  }
}
i([n(0)], r.prototype, "confType", void 0);
i([n(0)], r.prototype, "confId", void 0);
exports.ActorGroupRefData = r;
class l extends a {
  constructor() {
    super(...arguments);
    this.groupName = "";
    this.refDataList = new Array();
  }
}
i([n(0)], l.prototype, "groupName", void 0);
i([n(2, r)], l.prototype, "refDataList", void 0);
exports.ActorGroupData = l;
var c, d, h, p, u, m, f, g, y, v, C, _, S, I, G, T, b, M, P, D, w;
(function (e) {
  e[e.game = 0] = "game";
  e[e.draw = 1] = "draw";
})(o.AddCoinByShareType || (exports.AddCoinByShareType = {}));
class B extends a {
  constructor() {
    super(...arguments);
    this.playerId = 0;
    this.userLevel = 0;
    this.userName = "";
    this.userImg = "";
    this.stamp = 0;
  }
}
i([n(0)], B.prototype, "playerId", void 0);
i([n(0)], B.prototype, "userLevel", void 0);
i([n(0)], B.prototype, "userName", void 0);
i([n(0)], B.prototype, "userImg", void 0);
i([n(0)], B.prototype, "stamp", void 0);
exports.AggregateUserInfo = B;
(function (e) {
  e[e.collectionGame = 0] = "collectionGame";
  e[e.thumbGame = 1] = "thumbGame";
  e[e.playGame = 2] = "playGame";
  e[e.commentGame = 3] = "commentGame";
  e[e.hurryGame = 4] = "hurryGame";
  e[e.followYou = 5] = "followYou";
  e[e.buyGoods = 6] = "buyGoods";
})(c = o.MsgType || (exports.MsgType = {}));
class R extends a {
  constructor() {
    super(...arguments);
    this.type = c.collectionGame;
    this.lastStamp = 0;
    this.gameId = "";
    this.gameIcon = "";
    this.goodsId = "";
    this.goodsTextureName = "";
    this.userInfoList = new Array();
  }
}
i([n(0)], R.prototype, "type", void 0);
i([n(0)], R.prototype, "lastStamp", void 0);
i([n(0)], R.prototype, "gameId", void 0);
i([n(0)], R.prototype, "gameIcon", void 0);
i([n(0)], R.prototype, "goodsId", void 0);
i([n(0)], R.prototype, "goodsTextureName", void 0);
i([n(2, B)], R.prototype, "userInfoList", void 0);
exports.AggregateMsgData = R;
class x extends a {
  constructor() {
    super(...arguments);
    this.showId = "";
    this.showType = "";
    this.gameId = "";
    this.st = "";
    this.bk = "";
  }
}
i([n(0)], x.prototype, "showId", void 0);
i([n(0)], x.prototype, "showType", void 0);
i([n(0)], x.prototype, "gameId", void 0);
i([n(0)], x.prototype, "st", void 0);
i([n(0)], x.prototype, "bk", void 0);
exports.AnalyticsGameData = x;
class L extends a {
  constructor() {
    super(...arguments);
    this.showId = "";
    this.showType = "";
    this.goodsId = "";
    this.st = "";
    this.bk = "";
  }
}
i([n(0)], L.prototype, "showId", void 0);
i([n(0)], L.prototype, "showType", void 0);
i([n(0)], L.prototype, "goodsId", void 0);
i([n(0)], L.prototype, "st", void 0);
i([n(0)], L.prototype, "bk", void 0);
exports.AnalyticsGoodsData = L;
(function (e) {
  e.tikTok = "tt";
  e.wechat = "wx";
  e.qQ = "qq";
  e.apple = "apple";
})(d = o.GDBindType || (exports.GDBindType = {}));
class k extends a {
  constructor() {
    super(...arguments);
    this.userKey = "";
    this.roleId = 0;
    this.bindIP = "";
    this.bindType = d.tikTok;
    this.bindCode = "";
    this.bindTime = new Date(-621355968e5);
  }
}
i([n(0)], k.prototype, "userKey", void 0);
i([n(0)], k.prototype, "roleId", void 0);
i([n(0)], k.prototype, "bindIP", void 0);
i([n(0)], k.prototype, "bindType", void 0);
i([n(0)], k.prototype, "bindCode", void 0);
i([n(4)], k.prototype, "bindTime", void 0);
exports.BeBindInfo = k;
class F extends a {
  constructor() {
    super(...arguments);
    this.type = "";
    this.msg = "";
    this.stamp = 0;
  }
}
i([n(0)], F.prototype, "type", void 0);
i([n(0)], F.prototype, "msg", void 0);
i([n(0)], F.prototype, "stamp", void 0);
exports.BugMsg = F;
class N extends a {
  constructor() {
    super(...arguments);
    this.id = "";
    this.goodsUId = "";
    this.conf = {};
  }
}
i([n(0)], N.prototype, "id", void 0);
i([n(0)], N.prototype, "goodsUId", void 0);
i([n(0)], N.prototype, "conf", void 0);
exports.BulletConf = N;
class A extends a {
  constructor() {
    super(...arguments);
    this.account = "";
    this.oTP = "";
    this.isSetPassword = !1;
  }
}
i([n(0)], A.prototype, "account", void 0);
i([n(0)], A.prototype, "oTP", void 0);
i([n(0)], A.prototype, "isSetPassword", void 0);
exports.CDAccountLoginExt = A;
class O extends a {
  constructor() {
    super(...arguments);
    this.account = "";
    this.oTP = "";
    this.password = "";
  }
}
i([n(0)], O.prototype, "account", void 0);
i([n(0)], O.prototype, "oTP", void 0);
i([n(0)], O.prototype, "password", void 0);
exports.CDAccountLoginInfo = O;
class U extends a {
  constructor() {
    super(...arguments);
    this.r = 0;
    this.g = 0;
    this.b = 0;
  }
}
i([n(0)], U.prototype, "r", void 0);
i([n(0)], U.prototype, "g", void 0);
i([n(0)], U.prototype, "b", void 0);
exports.ColorData = U;
(function (e) {
  e[e.fail = 1] = "fail";
  e[e.success = 2] = "success";
  e[e.inReview = 5] = "inReview";
})(h = o.ReviewCode || (exports.ReviewCode = {}));
class E extends a {
  constructor() {
    super(...arguments);
    this.contentId = "";
    this.content = "";
    this.batchId = "";
  }
}
i([n(0)], E.prototype, "contentId", void 0);
i([n(0)], E.prototype, "content", void 0);
i([n(0)], E.prototype, "batchId", void 0);
exports.ManualReview = E;
class j extends a {
  constructor() {
    super(...arguments);
    this.Ad = 0;
    this.Normal = 0;
    this.Sexy = 0;
    this.Porn = 0;
    this.Abuse = 0;
    this.Polity = 0;
    this.Terror = 0;
    this.Anniversary_flag = 0;
    this.Cartoon_leader = 0;
    this.Sensitive_flag = 0;
    this.Sensitive_text = 0;
    this.Leader_recognition = 0;
    this.Bloody = 0;
    this.Fandongtaibiao = 0;
    this.Plant_ppx = 0;
    this.High_risk_social_event = 0;
    this.High_risk_boom = 0;
    this.High_risk_money = 0;
    this.High_risk_terrorist_uniform = 0;
    this.High_risk_sensitive_map = 0;
    this.Great_hall = 0;
    this.Cartoon_porn = 0;
    this.Party_founding_memorial = 0;
  }
}
i([n(0)], j.prototype, "Ad", void 0);
i([n(0)], j.prototype, "Normal", void 0);
i([n(0)], j.prototype, "Sexy", void 0);
i([n(0)], j.prototype, "Porn", void 0);
i([n(0)], j.prototype, "Abuse", void 0);
i([n(0)], j.prototype, "Polity", void 0);
i([n(0)], j.prototype, "Terror", void 0);
i([n(0)], j.prototype, "Anniversary_flag", void 0);
i([n(0)], j.prototype, "Cartoon_leader", void 0);
i([n(0)], j.prototype, "Sensitive_flag", void 0);
i([n(0)], j.prototype, "Sensitive_text", void 0);
i([n(0)], j.prototype, "Leader_recognition", void 0);
i([n(0)], j.prototype, "Bloody", void 0);
i([n(0)], j.prototype, "Fandongtaibiao", void 0);
i([n(0)], j.prototype, "Plant_ppx", void 0);
i([n(0)], j.prototype, "High_risk_social_event", void 0);
i([n(0)], j.prototype, "High_risk_boom", void 0);
i([n(0)], j.prototype, "High_risk_money", void 0);
i([n(0)], j.prototype, "High_risk_terrorist_uniform", void 0);
i([n(0)], j.prototype, "High_risk_sensitive_map", void 0);
i([n(0)], j.prototype, "Great_hall", void 0);
i([n(0)], j.prototype, "Cartoon_porn", void 0);
i([n(0)], j.prototype, "Party_founding_memorial", void 0);
exports.SensitiveScore = j;
class H extends a {
  constructor() {
    super(...arguments);
    this.result = 0;
    this.source = "";
    this.score = new j();
    this.manualReview = new E();
  }
}
i([n(0)], H.prototype, "result", void 0);
i([n(0)], H.prototype, "source", void 0);
i([n(1, j)], H.prototype, "score", void 0);
i([n(1, E)], H.prototype, "manualReview", void 0);
exports.SensitiveImageResult = H;
class W extends a {
  constructor() {
    super(...arguments);
    this.combImageUrl = "";
    this.imageUrlList = new Array();
    this.imageUrlHashList = new Array();
    this.applyTime = new Date(-621355968e5);
    this.reviewCode = h.fail;
    this.reviewTime = new Date(-621355968e5);
    this.sensitiveImageResult = new H();
  }
}
i([n(0)], W.prototype, "combImageUrl", void 0);
i([n(2)], W.prototype, "imageUrlList", void 0);
i([n(2)], W.prototype, "imageUrlHashList", void 0);
i([n(4)], W.prototype, "applyTime", void 0);
i([n(0)], W.prototype, "reviewCode", void 0);
i([n(4)], W.prototype, "reviewTime", void 0);
i([n(1, H)], W.prototype, "sensitiveImageResult", void 0);
exports.CombImageReviewMap = W;
(function (e) {
  e[e.gameType = 0] = "gameType";
  e[e.talkType = 1] = "talkType";
})(p = o.CommentType || (exports.CommentType = {}));
class V extends a {
  constructor() {
    super(...arguments);
    this.id = "";
    this.commentId = "";
    this.type = p.gameType;
    this.playerId = 0;
    this.userLevel = 0;
    this.userImg = "";
    this.userName = "";
    this.gameIcon = "";
    this.content = {};
    this.targetPlayerId = 0;
    this.targetPlayerName = "";
    this.stamp = 0;
    this.thumbCnt = 0;
    this.reportCnt = 0;
  }
}
i([n(0)], V.prototype, "id", void 0);
i([n(0)], V.prototype, "commentId", void 0);
i([n(0)], V.prototype, "type", void 0);
i([n(0)], V.prototype, "playerId", void 0);
i([n(0)], V.prototype, "userLevel", void 0);
i([n(0)], V.prototype, "userImg", void 0);
i([n(0)], V.prototype, "userName", void 0);
i([n(0)], V.prototype, "gameIcon", void 0);
i([n(0)], V.prototype, "content", void 0);
i([n(0)], V.prototype, "targetPlayerId", void 0);
i([n(0)], V.prototype, "targetPlayerName", void 0);
i([n(0)], V.prototype, "stamp", void 0);
i([n(0)], V.prototype, "thumbCnt", void 0);
i([n(0)], V.prototype, "reportCnt", void 0);
exports.CommentMeData = V;
(function (e) {
  e.tile = "tileConfs";
  e.actor = "actorConfs";
  e.device = "deviceConfs";
  e.prop = "propConfs";
  e.weapon = "weaponConfs";
  e.bullet = "bulletConfs";
  e.shop = "shopConfs";
  e.variable = "variableConfs";
})(o.CreativeAttrType || (exports.CreativeAttrType = {}));
(function (e) {
  e.tile = "tile";
  e.actor = "actor";
  e.device = "device";
  e.prop = "prop";
  e.weapon = "weapon";
  e.bullet = "bullet";
  e.shop = "shop";
  e.rank = "rank";
  e.variable = "variable";
})(o.CreativeConfType || (exports.CreativeConfType = {}));
class K extends a {
  constructor() {
    super(...arguments);
    this.id = "";
    this.playerName = "";
    this.name = "";
    this.iconTextureName = "";
    this.advert = "";
    this.openData = {};
    this.packUrl = "";
    this.secondaryCnt = 0;
    this.secondaryList = new Array();
    this.lastPublishTime = 0;
  }
}
i([n(0)], K.prototype, "id", void 0);
i([n(0)], K.prototype, "playerName", void 0);
i([n(0)], K.prototype, "name", void 0);
i([n(0)], K.prototype, "iconTextureName", void 0);
i([n(0)], K.prototype, "advert", void 0);
i([n(0)], K.prototype, "openData", void 0);
i([n(0)], K.prototype, "packUrl", void 0);
i([n(0)], K.prototype, "secondaryCnt", void 0);
i([n(2)], K.prototype, "secondaryList", void 0);
i([n(0)], K.prototype, "lastPublishTime", void 0);
exports.CreativeGameData = K;
class J extends a {
  constructor() {
    super(...arguments);
    this.gameUId = "";
    this.score = 0;
  }
}
i([n(0)], J.prototype, "gameUId", void 0);
i([n(0)], J.prototype, "score", void 0);
exports.CreativeGameScore = J;
(function (e) {
  e[e.comprehensive = 0] = "comprehensive";
  e[e.creativeGameUpStampDesc = 1] = "creativeGameUpStampDesc";
})(o.CreativeGameSortType || (exports.CreativeGameSortType = {}));
class Z extends a {
  constructor() {
    super(...arguments);
    this.id = 0;
    this.data = new U();
  }
}
i([n(0)], Z.prototype, "id", void 0);
i([n(1, U)], Z.prototype, "data", void 0);
exports.CustomColor = Z;
class z extends a {
  constructor() {
    super(...arguments);
    this.id = "";
    this.goodsUId = "";
    this.conf = {};
  }
}
i([n(0)], z.prototype, "id", void 0);
i([n(0)], z.prototype, "goodsUId", void 0);
i([n(0)], z.prototype, "conf", void 0);
exports.DeviceConf = z;
class X extends a {
  constructor() {
    super(...arguments);
    this.id = 0;
    this.exp = 0;
    this.coin = 0;
    this.iconUrl = "";
    this.name = "";
    this.intr = "";
  }
}
i([n(0)], X.prototype, "id", void 0);
i([n(0)], X.prototype, "exp", void 0);
i([n(0)], X.prototype, "coin", void 0);
i([n(0)], X.prototype, "iconUrl", void 0);
i([n(0)], X.prototype, "name", void 0);
i([n(0)], X.prototype, "intr", void 0);
exports.DynamicGameGiftCfg = X;
class q extends a {
  constructor() {
    super(...arguments);
    this.version = "";
    this.datas = new Map();
  }
}
i([n(0)], q.prototype, "version", void 0);
i([n(5, X)], q.prototype, "datas", void 0);
exports.DynamicGameGift = q;
(function (e) {
  e[e.all = 0] = "all";
  e[e.others = 1] = "others";
  e[e.ids = 2] = "ids";
  e[e.master = 3] = "master";
})(o.EMRoomMsgTarget || (exports.EMRoomMsgTarget = {}));
(function (e) {
  e.idle = "idle";
  e.starting = "starting";
  e.started = "started";
  e.ended = "ended";
})(u = o.EMRoomState || (exports.EMRoomState = {}));
(function (e) {
  e.match = "match";
  e.free = "free";
})(m = o.EMRoomType || (exports.EMRoomType = {}));
(function (e) {
  e[e.normal = 0] = "normal";
  e[e.full = 1] = "full";
  e[e.recommend = 2] = "recommend";
})(f = o.EMServerBusyStatus || (exports.EMServerBusyStatus = {}));
(function (e) {
  e[e.closed = 0] = "closed";
  e[e.open = 1] = "open";
  e[e.maintain = 2] = "maintain";
})(g = o.EMServerStatus || (exports.EMServerStatus = {}));
(function (e) {
  e.idle = "idle";
  e.matching = "matching";
  e.matchingBusy = "matchingBusy";
  e.vS = "vs";
})(y = o.EMTeamState || (exports.EMTeamState = {}));
class Y extends a {
  constructor() {
    super(...arguments);
    this.id = "";
    this.name = "";
  }
}
i([n(0)], Y.prototype, "id", void 0);
i([n(0)], Y.prototype, "name", void 0);
exports.ESCacheData = Y;
class $ extends a {
  constructor() {
    super(...arguments);
    this.id = "";
    this.iconTextureName = "";
    this.name = "";
    this.rank = 0;
    this.thumbCnt = 0;
    this.collectionCnt = 0;
    this.playCnt = 0;
    this.hurryCnt = 0;
    this.advert = "";
    this.openCreativeGame = !1;
    this.lastPublishTime = 0;
  }
}
i([n(0)], $.prototype, "id", void 0);
i([n(0)], $.prototype, "iconTextureName", void 0);
i([n(0)], $.prototype, "name", void 0);
i([n(0)], $.prototype, "rank", void 0);
i([n(0)], $.prototype, "thumbCnt", void 0);
i([n(0)], $.prototype, "collectionCnt", void 0);
i([n(0)], $.prototype, "playCnt", void 0);
i([n(0)], $.prototype, "hurryCnt", void 0);
i([n(0)], $.prototype, "advert", void 0);
i([n(0)], $.prototype, "openCreativeGame", void 0);
i([n(0)], $.prototype, "lastPublishTime", void 0);
exports.GameCellData = $;
class Q extends a {
  constructor() {
    super(...arguments);
    this.gameId = "";
    this.id = "";
    this.playerId = 0;
    this.msg = "";
    this.userLevel = 0;
    this.userImg = "";
    this.userName = "";
    this.gameIcon = "";
    this.targetPlayerId = 0;
    this.targetPlayerName = "";
    this.stamp = 0;
    this.likeCnt = 0;
    this.reportCnt = 0;
    this.subCommentsCnt = 0;
    this.commentIds = new Array();
    this.openCnt = 0;
    this.comments = new Array();
  }
}
i([n(0)], Q.prototype, "gameId", void 0);
i([n(0)], Q.prototype, "id", void 0);
i([n(0)], Q.prototype, "playerId", void 0);
i([n(0)], Q.prototype, "msg", void 0);
i([n(0)], Q.prototype, "userLevel", void 0);
i([n(0)], Q.prototype, "userImg", void 0);
i([n(0)], Q.prototype, "userName", void 0);
i([n(0)], Q.prototype, "gameIcon", void 0);
i([n(0)], Q.prototype, "targetPlayerId", void 0);
i([n(0)], Q.prototype, "targetPlayerName", void 0);
i([n(0)], Q.prototype, "stamp", void 0);
i([n(0)], Q.prototype, "likeCnt", void 0);
i([n(0)], Q.prototype, "reportCnt", void 0);
i([n(0)], Q.prototype, "subCommentsCnt", void 0);
i([n(2)], Q.prototype, "commentIds", void 0);
i([n(0)], Q.prototype, "openCnt", void 0);
i([n(2, Q)], Q.prototype, "comments", void 0);
exports.GameComment = Q;
(function (e) {
  e[e.noPublish = 0] = "noPublish";
  e[e.success = 1] = "success";
  e[e.inReview = 2] = "inReview";
  e[e.fail = 3] = "fail";
  e[e.off = 4] = "off";
})(v = o.GameStatus || (exports.GameStatus = {}));
class ee extends a {
  constructor() {
    super(...arguments);
    this.imageUrl = "";
    this.sensitiveImageResult = new H();
  }
}
i([n(0)], ee.prototype, "imageUrl", void 0);
i([n(1, H)], ee.prototype, "sensitiveImageResult", void 0);
exports.ImageOffReason = ee;
class te extends a {
  constructor() {
    super(...arguments);
    this.images = new Array();
    this.strs = new Array();
    this.imageOffReasonList = new Array();
  }
}
i([n(2)], te.prototype, "images", void 0);
i([n(2)], te.prototype, "strs", void 0);
i([n(2, ee)], te.prototype, "imageOffReasonList", void 0);
exports.OffReason = te;
class oe extends a {
  constructor() {
    super(...arguments);
    this.uId = "";
    this.playerId = 0;
    this.id = "";
    this.thumbCnt = 0;
    this.collectionCnt = 0;
    this.playCnt = 0;
    this.hurryCnt = 0;
    this.worldIds = new Array();
    this.variableIds = new Array();
    this.gameShopIds = new Array();
    this.gameRankIds = new Array();
    this.name = "";
    this.advert = "";
    this.variableDatas = new Array();
    this.data = {};
    this.thawTime = 0;
    this.isOldTangData = !1;
    this.iconTextureName = "";
    this.isOff = !1;
    this.status = v.noPublish;
    this.offReason = new te();
    this.openCreativeGame = !1;
    this.publishTimes = 0;
    this.creativeSourceUId = "";
    this.openData = {};
    this.gameDataCdnUrl = "";
    this.firstPublishTime = 0;
    this.lastPublishTime = 0;
  }
}
i([n(0)], oe.prototype, "uId", void 0);
i([n(0)], oe.prototype, "playerId", void 0);
i([n(0)], oe.prototype, "id", void 0);
i([n(0)], oe.prototype, "thumbCnt", void 0);
i([n(0)], oe.prototype, "collectionCnt", void 0);
i([n(0)], oe.prototype, "playCnt", void 0);
i([n(0)], oe.prototype, "hurryCnt", void 0);
i([n(2)], oe.prototype, "worldIds", void 0);
i([n(2)], oe.prototype, "variableIds", void 0);
i([n(2)], oe.prototype, "gameShopIds", void 0);
i([n(2)], oe.prototype, "gameRankIds", void 0);
i([n(0)], oe.prototype, "name", void 0);
i([n(0)], oe.prototype, "advert", void 0);
i([n(2)], oe.prototype, "variableDatas", void 0);
i([n(0)], oe.prototype, "data", void 0);
i([n(0)], oe.prototype, "thawTime", void 0);
i([n(0)], oe.prototype, "isOldTangData", void 0);
i([n(0)], oe.prototype, "iconTextureName", void 0);
i([n(0)], oe.prototype, "isOff", void 0);
i([n(0)], oe.prototype, "status", void 0);
i([n(1, te)], oe.prototype, "offReason", void 0);
i([n(0)], oe.prototype, "openCreativeGame", void 0);
i([n(0)], oe.prototype, "publishTimes", void 0);
i([n(0)], oe.prototype, "creativeSourceUId", void 0);
i([n(0)], oe.prototype, "openData", void 0);
i([n(0)], oe.prototype, "gameDataCdnUrl", void 0);
i([n(0)], oe.prototype, "firstPublishTime", void 0);
i([n(0)], oe.prototype, "lastPublishTime", void 0);
exports.GameData = oe;
class ie extends a {
  constructor() {
    super(...arguments);
    this.giftID = 0;
    this.giftCount = 0;
  }
}
i([n(0)], ie.prototype, "giftID", void 0);
i([n(0)], ie.prototype, "giftCount", void 0);
exports.GiftData = ie;
class ne extends a {
  constructor() {
    super(...arguments);
    this.roleId = 0;
    this.userLevel = 0;
    this.userName = "";
    this.userImg = "";
    this.userIntro = "";
    this.score = 0;
    this.rank = 0;
    this.giftDatas = new Array();
  }
}
i([n(0)], ne.prototype, "roleId", void 0);
i([n(0)], ne.prototype, "userLevel", void 0);
i([n(0)], ne.prototype, "userName", void 0);
i([n(0)], ne.prototype, "userImg", void 0);
i([n(0)], ne.prototype, "userIntro", void 0);
i([n(0)], ne.prototype, "score", void 0);
i([n(0)], ne.prototype, "rank", void 0);
i([n(2, ie)], ne.prototype, "giftDatas", void 0);
exports.GameGiftRankScoreInfo = ne;
class ae extends a {
  constructor() {
    super(...arguments);
    this.rankKey = "";
    this.rid = 0;
    this.score = 0;
    this.gameName = "";
    this.gameIcon = "";
    this.gameDataCdnUrl = "";
    this.rankList = new Array();
  }
}
i([n(0)], ae.prototype, "rankKey", void 0);
i([n(0)], ae.prototype, "rid", void 0);
i([n(0)], ae.prototype, "score", void 0);
i([n(0)], ae.prototype, "gameName", void 0);
i([n(0)], ae.prototype, "gameIcon", void 0);
i([n(0)], ae.prototype, "gameDataCdnUrl", void 0);
i([n(2, ne)], ae.prototype, "rankList", void 0);
exports.GameGiftRank = ae;
(function (e) {
  e[e.day = 0] = "day";
  e[e.week = 1] = "week";
  e[e.month = 2] = "month";
  e[e.forever = 3] = "forever";
})(C = o.GameRankCycleType || (exports.GameRankCycleType = {}));
(function (e) {
  e[e.asc = 0] = "asc";
  e[e.desc = 1] = "desc";
})(_ = o.GameRankSortType || (exports.GameRankSortType = {}));
class se extends a {
  constructor() {
    super(...arguments);
    this.id = "";
    this.sortType = _.asc;
    this.cycleType = C.day;
    this.conf = {};
  }
}
i([n(0)], se.prototype, "id", void 0);
i([n(0)], se.prototype, "sortType", void 0);
i([n(0)], se.prototype, "cycleType", void 0);
i([n(0)], se.prototype, "conf", void 0);
exports.GameRankConf = se;
class re extends a {
  constructor() {
    super(...arguments);
    this.roleId = 0;
    this.userLevel = 0;
    this.userName = "";
    this.userImg = "";
    this.userIntro = "";
    this.score = 0;
    this.rank = 0;
  }
}
i([n(0)], re.prototype, "roleId", void 0);
i([n(0)], re.prototype, "userLevel", void 0);
i([n(0)], re.prototype, "userName", void 0);
i([n(0)], re.prototype, "userImg", void 0);
i([n(0)], re.prototype, "userIntro", void 0);
i([n(0)], re.prototype, "score", void 0);
i([n(0)], re.prototype, "rank", void 0);
exports.GameRankScoreInfo = re;
class le extends a {
  constructor() {
    super(...arguments);
    this.id = "";
    this.conf = {};
  }
}
i([n(0)], le.prototype, "id", void 0);
i([n(0)], le.prototype, "conf", void 0);
exports.GameShopConf = le;
class ce extends a {
  constructor() {
    super(...arguments);
    this.id = "";
    this.iconTextureName = "";
    this.name = "";
    this.rank = 0;
    this.playCnt = 0;
    this.advert = "";
    this.playCntStatistics = 0;
    this.playAllCnt = 0;
    this.playAllTime = 0;
    this.playAveTime = 0;
  }
}
i([n(0)], ce.prototype, "id", void 0);
i([n(0)], ce.prototype, "iconTextureName", void 0);
i([n(0)], ce.prototype, "name", void 0);
i([n(0)], ce.prototype, "rank", void 0);
i([n(0)], ce.prototype, "playCnt", void 0);
i([n(0)], ce.prototype, "advert", void 0);
i([n(0)], ce.prototype, "playCntStatistics", void 0);
i([n(0)], ce.prototype, "playAllCnt", void 0);
i([n(0)], ce.prototype, "playAllTime", void 0);
i([n(0)], ce.prototype, "playAveTime", void 0);
exports.GameStatisticsData = ce;
class de extends a {
  constructor() {
    super(...arguments);
    this.tagMsg = "";
    this.recommendTimes = 0;
    this.lastEditTime = 0;
  }
}
i([n(0)], de.prototype, "tagMsg", void 0);
i([n(0)], de.prototype, "recommendTimes", void 0);
i([n(0)], de.prototype, "lastEditTime", void 0);
exports.GameTagaData = de;
class he extends a {
  constructor() {
    super(...arguments);
    this.id = "";
    this.sortType = _.asc;
    this.cycleType = C.day;
    this.conf = {};
    this.rankList = new Array();
  }
}
i([n(0)], he.prototype, "id", void 0);
i([n(0)], he.prototype, "sortType", void 0);
i([n(0)], he.prototype, "cycleType", void 0);
i([n(0)], he.prototype, "conf", void 0);
i([n(2, re)], he.prototype, "rankList", void 0);
exports.GameTageInfo = he;
class pe extends a {
  constructor() {
    super(...arguments);
    this.id = 0;
    this.bindIP = "";
    this.bindType = d.tikTok;
    this.bindCode = "";
    this.bindTime = new Date(-621355968e5);
  }
}
i([n(0)], pe.prototype, "id", void 0);
i([n(0)], pe.prototype, "bindIP", void 0);
i([n(0)], pe.prototype, "bindType", void 0);
i([n(0)], pe.prototype, "bindCode", void 0);
i([n(4)], pe.prototype, "bindTime", void 0);
exports.GDBindRoleInfo = pe;
class ue extends a {
  constructor() {
    super(...arguments);
    this.id = 0;
  }
}
i([n(0)], ue.prototype, "id", void 0);
exports.GDDynamicConfig = ue;
class me extends a {
  constructor() {
    super(...arguments);
    this.uId = "";
    this.gameId = "";
    this.id = "";
    this.commentsCnt = 0;
    this.commentsCntSum = 0;
    this.comments = new Array();
  }
}
i([n(0)], me.prototype, "uId", void 0);
i([n(0)], me.prototype, "gameId", void 0);
i([n(0)], me.prototype, "id", void 0);
i([n(0)], me.prototype, "commentsCnt", void 0);
i([n(0)], me.prototype, "commentsCntSum", void 0);
i([n(2, Q)], me.prototype, "comments", void 0);
exports.GDGameTopComment = me;
class fe extends a {
  constructor() {
    super(...arguments);
    this.fGiftScore = 0;
    this.mGiftScore = 0;
    this.wGiftScore = 0;
    this.mBeginDay = "";
    this.wBeginDay = "";
    this.holidayGiftScore = 0;
    this.hBeginDay = "";
  }
}
i([n(0)], fe.prototype, "fGiftScore", void 0);
i([n(0)], fe.prototype, "mGiftScore", void 0);
i([n(0)], fe.prototype, "wGiftScore", void 0);
i([n(0)], fe.prototype, "mBeginDay", void 0);
i([n(0)], fe.prototype, "wBeginDay", void 0);
i([n(0)], fe.prototype, "holidayGiftScore", void 0);
i([n(0)], fe.prototype, "hBeginDay", void 0);
exports.GDGiftScoreInfo = fe;
class ge extends a {
  constructor() {
    super(...arguments);
    this.id = "";
    this.goodsUId = "";
    this.conf = {};
  }
}
i([n(0)], ge.prototype, "id", void 0);
i([n(0)], ge.prototype, "goodsUId", void 0);
i([n(0)], ge.prototype, "conf", void 0);
exports.PropConf = ge;
class ye extends a {
  constructor() {
    super(...arguments);
    this.id = "";
    this.goodsUId = "";
    this.conf = {};
  }
}
i([n(0)], ye.prototype, "id", void 0);
i([n(0)], ye.prototype, "goodsUId", void 0);
i([n(0)], ye.prototype, "conf", void 0);
exports.TileConf = ye;
class ve extends a {
  constructor() {
    super(...arguments);
    this.id = "";
    this.goodsUId = "";
    this.conf = {};
  }
}
i([n(0)], ve.prototype, "id", void 0);
i([n(0)], ve.prototype, "goodsUId", void 0);
i([n(0)], ve.prototype, "conf", void 0);
exports.WeaponConf = ve;
class Ce extends a {
  constructor() {
    super(...arguments);
    this.tileConfs = new Array();
    this.actorConfs = new Array();
    this.deviceConfs = new Array();
    this.propConfs = new Array();
    this.weaponConfs = new Array();
    this.bulletConfs = new Array();
  }
}
i([n(2, ye)], Ce.prototype, "tileConfs", void 0);
i([n(2, s)], Ce.prototype, "actorConfs", void 0);
i([n(2, z)], Ce.prototype, "deviceConfs", void 0);
i([n(2, ge)], Ce.prototype, "propConfs", void 0);
i([n(2, ve)], Ce.prototype, "weaponConfs", void 0);
i([n(2, N)], Ce.prototype, "bulletConfs", void 0);
exports.GoodsContent = Ce;
(function (e) {
  e[e.noPublish = 0] = "noPublish";
  e[e.success = 1] = "success";
  e[e.inReview = 2] = "inReview";
  e[e.fail = 3] = "fail";
  e[e.off = 4] = "off";
})(S = o.GoodsStatus || (exports.GoodsStatus = {}));
(function (e) {
  e[e.all = 0] = "all";
  e[e.package = 1] = "package";
  e[e.tile = 2] = "tile";
  e[e.actor = 3] = "actor";
  e[e.device = 4] = "device";
  e[e.prop = 5] = "prop";
  e[e.weapon = 6] = "weapon";
})(I = o.GoodsType || (exports.GoodsType = {}));
class _e extends a {
  constructor() {
    super(...arguments);
    this.playerId = 0;
    this.id = "";
    this.goodsType = I.all;
    this.name = "";
    this.iconTextureName = "";
    this.advert = "";
    this.isOff = !1;
    this.status = S.noPublish;
    this.offReason = new te();
    this.goodsContent = new Ce();
    this.price = 0;
    this.saleCnt = 0;
    this.saleCoin = 0;
    this.upStamp = 0;
    this.isAgainUpload = !1;
    this.collectionCnt = 0;
  }
}
i([n(0)], _e.prototype, "playerId", void 0);
i([n(0)], _e.prototype, "id", void 0);
i([n(0)], _e.prototype, "goodsType", void 0);
i([n(0)], _e.prototype, "name", void 0);
i([n(0)], _e.prototype, "iconTextureName", void 0);
i([n(0)], _e.prototype, "advert", void 0);
i([n(0)], _e.prototype, "isOff", void 0);
i([n(0)], _e.prototype, "status", void 0);
i([n(1, te)], _e.prototype, "offReason", void 0);
i([n(1, Ce)], _e.prototype, "goodsContent", void 0);
i([n(0)], _e.prototype, "price", void 0);
i([n(0)], _e.prototype, "saleCnt", void 0);
i([n(0)], _e.prototype, "saleCoin", void 0);
i([n(0)], _e.prototype, "upStamp", void 0);
i([n(0)], _e.prototype, "isAgainUpload", void 0);
i([n(0)], _e.prototype, "collectionCnt", void 0);
exports.GDGoodsInfo = _e;
class Se extends a {
  constructor() {
    super(...arguments);
    this.id = 0;
    this.name = "";
    this.group = 0;
    this.idxInGroup = 0;
    this.matchScore = 0;
    this.avatar = new Array();
    this.custom = new Map();
  }
}
i([n(0)], Se.prototype, "id", void 0);
i([n(0)], Se.prototype, "name", void 0);
i([n(0)], Se.prototype, "group", void 0);
i([n(0)], Se.prototype, "idxInGroup", void 0);
i([n(0)], Se.prototype, "matchScore", void 0);
i([n(2)], Se.prototype, "avatar", void 0);
i([n(5)], Se.prototype, "custom", void 0);
exports.GDRoomMember = Se;
class Ie extends a {
  constructor() {
    super(...arguments);
    this.id = "";
    this.owner = 0;
    this.size = 0;
    this.createAt = 0;
    this.state = y.idle;
    this.password = "";
    this.members = new Map();
    this.custom = new Map();
  }
}
i([n(0)], Ie.prototype, "id", void 0);
i([n(0)], Ie.prototype, "owner", void 0);
i([n(0)], Ie.prototype, "size", void 0);
i([n(0)], Ie.prototype, "createAt", void 0);
i([n(0)], Ie.prototype, "state", void 0);
i([n(0)], Ie.prototype, "password", void 0);
i([n(3, Se)], Ie.prototype, "members", void 0);
i([n(5)], Ie.prototype, "custom", void 0);
exports.GDTeam = Ie;
class Ge extends a {
  constructor() {
    super(...arguments);
    this.type = "";
    this.scoreDiff = 0;
    this.teamSize = 0;
    this.teamNum = 0;
    this.timeoutAt = 0;
    this.team = new Ie();
    this.score = 0;
  }
}
i([n(0)], Ge.prototype, "type", void 0);
i([n(0)], Ge.prototype, "scoreDiff", void 0);
i([n(0)], Ge.prototype, "teamSize", void 0);
i([n(0)], Ge.prototype, "teamNum", void 0);
i([n(0)], Ge.prototype, "timeoutAt", void 0);
i([n(1, Ie)], Ge.prototype, "team", void 0);
i([n(0)], Ge.prototype, "score", void 0);
exports.GDMatch = Ge;
class Te extends a {
  constructor() {
    super(...arguments);
    this.id = "";
    this.name = "";
    this.iconTextureName = "";
    this.advert = "";
    this.status = v.noPublish;
    this.isPlay = !1;
    this.isThumb = !1;
    this.isHurry = !1;
    this.isCollection = !1;
    this.thumbCnt = 0;
    this.collectionCnt = 0;
    this.playCnt = 0;
    this.hurryCnt = 0;
    this.reportCnt = 0;
    this.dataVersion = "";
    this.gameDataCdnUrl = "";
    this.gameTags = new Array();
    this.playCntStatistics = 0;
    this.playAllCnt = 0;
    this.playAllTime = 0;
    this.playAveTime = 0;
    this.isInRecommendPool = !1;
    this.recommendFansCnt = 0;
    this.recommendLevel = 0;
    this.recommendClickAllCnt = 0;
    this.recommendCnt = 0;
    this.recommendAllCnt = 0;
    this.recommendScore = 0;
    this.needRecommendCnt = 0;
    this.recommendTagTime = 0;
    this.openCreativeGame = !1;
    this.creativeSourceUId = "";
    this.openData = {};
    this.reviewRecommendScore = 0;
    this.hurryList = new Array();
    this.playUserList = new Array();
    this.lastPublishTime = 0;
    this.tagList = new Array();
    this.gDGiftScoreInfo = new fe();
  }
}
i([n(0)], Te.prototype, "id", void 0);
i([n(0)], Te.prototype, "name", void 0);
i([n(0)], Te.prototype, "iconTextureName", void 0);
i([n(0)], Te.prototype, "advert", void 0);
i([n(0)], Te.prototype, "status", void 0);
i([n(0)], Te.prototype, "isPlay", void 0);
i([n(0)], Te.prototype, "isThumb", void 0);
i([n(0)], Te.prototype, "isHurry", void 0);
i([n(0)], Te.prototype, "isCollection", void 0);
i([n(0)], Te.prototype, "thumbCnt", void 0);
i([n(0)], Te.prototype, "collectionCnt", void 0);
i([n(0)], Te.prototype, "playCnt", void 0);
i([n(0)], Te.prototype, "hurryCnt", void 0);
i([n(0)], Te.prototype, "reportCnt", void 0);
i([n(0)], Te.prototype, "dataVersion", void 0);
i([n(0)], Te.prototype, "gameDataCdnUrl", void 0);
i([n(2)], Te.prototype, "gameTags", void 0);
i([n(0)], Te.prototype, "playCntStatistics", void 0);
i([n(0)], Te.prototype, "playAllCnt", void 0);
i([n(0)], Te.prototype, "playAllTime", void 0);
i([n(0)], Te.prototype, "playAveTime", void 0);
i([n(0)], Te.prototype, "isInRecommendPool", void 0);
i([n(0)], Te.prototype, "recommendFansCnt", void 0);
i([n(0)], Te.prototype, "recommendLevel", void 0);
i([n(0)], Te.prototype, "recommendClickAllCnt", void 0);
i([n(0)], Te.prototype, "recommendCnt", void 0);
i([n(0)], Te.prototype, "recommendAllCnt", void 0);
i([n(0)], Te.prototype, "recommendScore", void 0);
i([n(0)], Te.prototype, "needRecommendCnt", void 0);
i([n(0)], Te.prototype, "recommendTagTime", void 0);
i([n(0)], Te.prototype, "openCreativeGame", void 0);
i([n(0)], Te.prototype, "creativeSourceUId", void 0);
i([n(0)], Te.prototype, "openData", void 0);
i([n(0)], Te.prototype, "reviewRecommendScore", void 0);
i([n(2)], Te.prototype, "hurryList", void 0);
i([n(2)], Te.prototype, "playUserList", void 0);
i([n(0)], Te.prototype, "lastPublishTime", void 0);
i([n(2, de)], Te.prototype, "tagList", void 0);
i([n(1, fe)], Te.prototype, "gDGiftScoreInfo", void 0);
exports.GDReleaseGameData = Te;
class be extends a {
  constructor() {
    super(...arguments);
    this.platformUId = "";
    this.openId = "";
    this.unionId = "";
    this.userName = "";
    this.userImg = "";
    this.userSex = 0;
    this.province = "";
    this.city = "";
  }
}
i([n(0)], be.prototype, "platformUId", void 0);
i([n(0)], be.prototype, "openId", void 0);
i([n(0)], be.prototype, "unionId", void 0);
i([n(0)], be.prototype, "userName", void 0);
i([n(0)], be.prototype, "userImg", void 0);
i([n(0)], be.prototype, "userSex", void 0);
i([n(0)], be.prototype, "province", void 0);
i([n(0)], be.prototype, "city", void 0);
exports.GDUserInfo = be;
(function (e) {
  e[e.noPublish = 0] = "noPublish";
  e[e.success = 1] = "success";
  e[e.inReview = 2] = "inReview";
  e[e.fail = 3] = "fail";
  e[e.off = 4] = "off";
  e[e.delete = 5] = "delete";
  e[e.unknown = 6] = "unknown";
})(G = o.ManReviewStatus || (exports.ManReviewStatus = {}));
class Me extends a {
  constructor() {
    super(...arguments);
    this.score = 0;
    this.reason = "";
    this.stamp = 0;
  }
}
i([n(0)], Me.prototype, "score", void 0);
i([n(0)], Me.prototype, "reason", void 0);
i([n(0)], Me.prototype, "stamp", void 0);
exports.UserCreditMsg = Me;
class Pe extends a {
  constructor() {
    super(...arguments);
    this.id = 0;
    this.uId = 0;
    this.sId = 0;
    this.uKey = "";
    this.userInfo = new be();
    this.coin = 0;
    this.diamond = 0;
    this.creditScore = 0;
    this.reviewCreditScore = 0;
    this.examScore = 0;
    this.publishGameTimes = 0;
    this.publishGoodsTimes = 0;
    this.creditTime = new Date(-621355968e5);
    this.creditMsgList = new Array();
    this.goodsIds = new Array();
    this.myGameMaxCnt = 0;
    this.myGoodsMaxCnt = 0;
    this.authed = !1;
    this.creatorVersion = "";
    this.userName = "";
    this.exp = 0;
    this.level = 0;
    this.userImg = "";
    this.userIntro = "";
    this.gameIncId = 0;
    this.worldIncId = 0;
    this.variableIncId = 0;
    this.customColorIncId = 0;
    this.games = new Array();
    this.collectionGames = new Array();
    this.worlds = new Array();
    this.variables = new Array();
    this.fansCount = 0;
    this.bindRoleCode = "";
    this.beBindList = new Array();
    this.channel = "";
    this.customActorGroups = new Array();
    this.customColors = new Array();
    this.guideVersion = "";
    this.completeTaskIds = new Array();
    this.follows = new Array();
    this.createAt = new Date(-621355968e5);
    this.collectionGoods = new Array();
    this.collectionTalks = new Array();
    this.newUserImg = "";
    this.userImgTime = new Date(-621355968e5);
    this.newUserImgReviewStatus = G.noPublish;
    this.offReason = new ee();
  }
}
i([n(0)], Pe.prototype, "id", void 0);
i([n(0)], Pe.prototype, "uId", void 0);
i([n(0)], Pe.prototype, "sId", void 0);
i([n(0)], Pe.prototype, "uKey", void 0);
i([n(1, be)], Pe.prototype, "userInfo", void 0);
i([n(0)], Pe.prototype, "coin", void 0);
i([n(0)], Pe.prototype, "diamond", void 0);
i([n(0)], Pe.prototype, "creditScore", void 0);
i([n(0)], Pe.prototype, "reviewCreditScore", void 0);
i([n(0)], Pe.prototype, "examScore", void 0);
i([n(0)], Pe.prototype, "publishGameTimes", void 0);
i([n(0)], Pe.prototype, "publishGoodsTimes", void 0);
i([n(4)], Pe.prototype, "creditTime", void 0);
i([n(2, Me)], Pe.prototype, "creditMsgList", void 0);
i([n(2)], Pe.prototype, "goodsIds", void 0);
i([n(0)], Pe.prototype, "myGameMaxCnt", void 0);
i([n(0)], Pe.prototype, "myGoodsMaxCnt", void 0);
i([n(0)], Pe.prototype, "authed", void 0);
i([n(0)], Pe.prototype, "creatorVersion", void 0);
i([n(0)], Pe.prototype, "userName", void 0);
i([n(0)], Pe.prototype, "exp", void 0);
i([n(0)], Pe.prototype, "level", void 0);
i([n(0)], Pe.prototype, "userImg", void 0);
i([n(0)], Pe.prototype, "userIntro", void 0);
i([n(0)], Pe.prototype, "gameIncId", void 0);
i([n(0)], Pe.prototype, "worldIncId", void 0);
i([n(0)], Pe.prototype, "variableIncId", void 0);
i([n(0)], Pe.prototype, "customColorIncId", void 0);
i([n(2)], Pe.prototype, "games", void 0);
i([n(2)], Pe.prototype, "collectionGames", void 0);
i([n(2)], Pe.prototype, "worlds", void 0);
i([n(2)], Pe.prototype, "variables", void 0);
i([n(0)], Pe.prototype, "fansCount", void 0);
i([n(0)], Pe.prototype, "bindRoleCode", void 0);
i([n(2, k)], Pe.prototype, "beBindList", void 0);
i([n(0)], Pe.prototype, "channel", void 0);
i([n(2, l)], Pe.prototype, "customActorGroups", void 0);
i([n(2, Z)], Pe.prototype, "customColors", void 0);
i([n(0)], Pe.prototype, "guideVersion", void 0);
i([n(2)], Pe.prototype, "completeTaskIds", void 0);
i([n(2)], Pe.prototype, "follows", void 0);
i([n(4)], Pe.prototype, "createAt", void 0);
i([n(2)], Pe.prototype, "collectionGoods", void 0);
i([n(2)], Pe.prototype, "collectionTalks", void 0);
i([n(0)], Pe.prototype, "newUserImg", void 0);
i([n(4)], Pe.prototype, "userImgTime", void 0);
i([n(0)], Pe.prototype, "newUserImgReviewStatus", void 0);
i([n(1, ee)], Pe.prototype, "offReason", void 0);
exports.GDRole = Pe;
class De extends a {
  constructor() {
    super(...arguments);
    this.id = 0;
    this.lastReportTime = 0;
    this.lastDealTime = 0;
    this.bugMap = new Map();
  }
}
i([n(0)], De.prototype, "id", void 0);
i([n(0)], De.prototype, "lastReportTime", void 0);
i([n(0)], De.prototype, "lastDealTime", void 0);
i([n(5, F)], De.prototype, "bugMap", void 0);
exports.GDRoleBugMsg = De;
class we extends a {
  constructor() {
    super(...arguments);
    this.id = 0;
    this.lastCommentStamp = 0;
    this.gameCommentMap = new Map();
    this.lastReportStamp = 0;
    this.reportCommentMap = new Map();
  }
}
i([n(0)], we.prototype, "id", void 0);
i([n(0)], we.prototype, "lastCommentStamp", void 0);
i([n(5)], we.prototype, "gameCommentMap", void 0);
i([n(0)], we.prototype, "lastReportStamp", void 0);
i([n(5)], we.prototype, "reportCommentMap", void 0);
exports.GDRoleCommentLikeMsg = we;
class Be extends a {
  constructor() {
    super(...arguments);
    this.id = 0;
    this.lastLoginThumbCount = 0;
    this.thumbCount = 0;
    this.lastLoginPlayCount = 0;
    this.playCount = 0;
    this.lastLoginCollectionCount = 0;
    this.collectionCount = 0;
    this.hurryCount = 0;
  }
}
i([n(0)], Be.prototype, "id", void 0);
i([n(0)], Be.prototype, "lastLoginThumbCount", void 0);
i([n(0)], Be.prototype, "thumbCount", void 0);
i([n(0)], Be.prototype, "lastLoginPlayCount", void 0);
i([n(0)], Be.prototype, "playCount", void 0);
i([n(0)], Be.prototype, "lastLoginCollectionCount", void 0);
i([n(0)], Be.prototype, "collectionCount", void 0);
i([n(0)], Be.prototype, "hurryCount", void 0);
exports.GDRoleCountMsg = Be;
class Re extends a {
  constructor() {
    super(...arguments);
    this.uId = "";
    this.playerId = 0;
    this.targetId = 0;
  }
}
i([n(0)], Re.prototype, "uId", void 0);
i([n(0)], Re.prototype, "playerId", void 0);
i([n(0)], Re.prototype, "targetId", void 0);
exports.GDRoleFansData = Re;
class xe extends a {
  constructor() {
    super(...arguments);
    this.id = 0;
    this.tileConfIds = new Array();
    this.actorConfIds = new Array();
    this.propConfIds = new Array();
    this.deviceConfIds = new Array();
    this.weaponConfIds = new Array();
    this.bulletConfIds = new Array();
    this.gameShopConfIds = new Array();
    this.gameRankConfIds = new Array();
  }
}
i([n(0)], xe.prototype, "id", void 0);
i([n(2)], xe.prototype, "tileConfIds", void 0);
i([n(2)], xe.prototype, "actorConfIds", void 0);
i([n(2)], xe.prototype, "propConfIds", void 0);
i([n(2)], xe.prototype, "deviceConfIds", void 0);
i([n(2)], xe.prototype, "weaponConfIds", void 0);
i([n(2)], xe.prototype, "bulletConfIds", void 0);
i([n(2)], xe.prototype, "gameShopConfIds", void 0);
i([n(2)], xe.prototype, "gameRankConfIds", void 0);
exports.GDRoleGameConf = xe;
class Le extends a {
  constructor() {
    super(...arguments);
    this.type = c.collectionGame;
    this.playerId = 0;
    this.userLevel = 0;
    this.userName = "";
    this.userImg = "";
    this.gameId = "";
    this.gameIcon = "";
    this.goodsId = "";
    this.goodsTextureName = "";
  }
}
i([n(0)], Le.prototype, "type", void 0);
i([n(0)], Le.prototype, "playerId", void 0);
i([n(0)], Le.prototype, "userLevel", void 0);
i([n(0)], Le.prototype, "userName", void 0);
i([n(0)], Le.prototype, "userImg", void 0);
i([n(0)], Le.prototype, "gameId", void 0);
i([n(0)], Le.prototype, "gameIcon", void 0);
i([n(0)], Le.prototype, "goodsId", void 0);
i([n(0)], Le.prototype, "goodsTextureName", void 0);
exports.MsgData = Le;
class ke extends a {
  constructor() {
    super(...arguments);
    this.id = 0;
    this.newMsgCnt = 0;
    this.msgList = new Array();
    this.offLineAggregateMsgMap = new Map();
    this.newAggregateMsgCnt = 0;
    this.aggregateMsgList = new Array();
    this.newFansCnt = 0;
    this.newFansList = new Array();
    this.newCommentCnt = 0;
    this.newCommentIdList = new Array();
  }
}
i([n(0)], ke.prototype, "id", void 0);
i([n(0)], ke.prototype, "newMsgCnt", void 0);
i([n(2, Le)], ke.prototype, "msgList", void 0);
i([n(5, R)], ke.prototype, "offLineAggregateMsgMap", void 0);
i([n(0)], ke.prototype, "newAggregateMsgCnt", void 0);
i([n(2, R)], ke.prototype, "aggregateMsgList", void 0);
i([n(0)], ke.prototype, "newFansCnt", void 0);
i([n(2)], ke.prototype, "newFansList", void 0);
i([n(0)], ke.prototype, "newCommentCnt", void 0);
i([n(2)], ke.prototype, "newCommentIdList", void 0);
exports.GDRoleMsgList = ke;
class Fe extends a {
  constructor() {
    super(...arguments);
    this.id = 0;
    this.playGames = new Map();
    this.playGamesStatistics = new Map();
  }
}
i([n(0)], Fe.prototype, "id", void 0);
i([n(5)], Fe.prototype, "playGames", void 0);
i([n(5)], Fe.prototype, "playGamesStatistics", void 0);
exports.GDRolePlayGame = Fe;
(function (e) {
  e.shopGoods = "shopGoods";
  e.gameGoods = "gameGoods";
  e.gameExchange = "gameExchange";
  e.gameAdvert = "ad";
  e.gameReborn = "reborn";
})(T = o.SaleGoodsType || (exports.SaleGoodsType = {}));
class Ne extends a {
  constructor() {
    super(...arguments);
    this.type = T.shopGoods;
    this.gameId = "";
    this.name = "";
    this.textureName = "";
    this.earnCoin = 0;
    this.saleCnt = 0;
  }
}
i([n(0)], Ne.prototype, "type", void 0);
i([n(0)], Ne.prototype, "gameId", void 0);
i([n(0)], Ne.prototype, "name", void 0);
i([n(0)], Ne.prototype, "textureName", void 0);
i([n(0)], Ne.prototype, "earnCoin", void 0);
i([n(0)], Ne.prototype, "saleCnt", void 0);
exports.SaleSummary = Ne;
class Ae extends a {
  constructor() {
    super(...arguments);
    this.id = 0;
    this.saleCntMap = new Map();
    this.gameSaleCntMap = new Map();
    this.saleTypeCntMap = new Map();
  }
}
i([n(0)], Ae.prototype, "id", void 0);
i([n(5, Ne)], Ae.prototype, "saleCntMap", void 0);
i([n(5, Ne)], Ae.prototype, "gameSaleCntMap", void 0);
i([n(5, Ne)], Ae.prototype, "saleTypeCntMap", void 0);
exports.GDRoleSaleMsg = Ae;
class Oe extends a {
  constructor() {
    super(...arguments);
    this.id = 0;
    this.userName = "";
    this.coin = 0;
    this.diamond = 0;
    this.level = 0;
    this.creditScore = 0;
    this.isFollow = !1;
    this.authed = !1;
    this.userImg = "";
    this.fansCount = 0;
    this.followsCount = 0;
  }
}
i([n(0)], Oe.prototype, "id", void 0);
i([n(0)], Oe.prototype, "userName", void 0);
i([n(0)], Oe.prototype, "coin", void 0);
i([n(0)], Oe.prototype, "diamond", void 0);
i([n(0)], Oe.prototype, "level", void 0);
i([n(0)], Oe.prototype, "creditScore", void 0);
i([n(0)], Oe.prototype, "isFollow", void 0);
i([n(0)], Oe.prototype, "authed", void 0);
i([n(0)], Oe.prototype, "userImg", void 0);
i([n(0)], Oe.prototype, "fansCount", void 0);
i([n(0)], Oe.prototype, "followsCount", void 0);
exports.GDRoleSimpleMsg = Oe;
class Ue extends a {
  constructor() {
    super(...arguments);
    this.id = 0;
    this.thumbGames = new Map();
  }
}
i([n(0)], Ue.prototype, "id", void 0);
i([n(5)], Ue.prototype, "thumbGames", void 0);
exports.GDRoleThumb = Ue;
class Ee extends a {
  constructor() {
    super(...arguments);
    this.id = "";
    this.type = m.match;
    this.subGameId = "";
    this.name = "";
    this.owner = 0;
    this.ownerName = "";
    this.state = u.idle;
    this.frameRate = 0;
    this.custom = new Map();
    this.teams = new Array();
    this.groupNum = 0;
    this.memberNumPerGroup = 0;
    this.audienceNum = 0;
    this.useMaster = !1;
    this.members = new Map();
    this.locked = !1;
    this.createAt = new Date(-621355968e5);
  }
}
i([n(0)], Ee.prototype, "id", void 0);
i([n(0)], Ee.prototype, "type", void 0);
i([n(0)], Ee.prototype, "subGameId", void 0);
i([n(0)], Ee.prototype, "name", void 0);
i([n(0)], Ee.prototype, "owner", void 0);
i([n(0)], Ee.prototype, "ownerName", void 0);
i([n(0)], Ee.prototype, "state", void 0);
i([n(0)], Ee.prototype, "frameRate", void 0);
i([n(5)], Ee.prototype, "custom", void 0);
i([n(2, Ie)], Ee.prototype, "teams", void 0);
i([n(0)], Ee.prototype, "groupNum", void 0);
i([n(0)], Ee.prototype, "memberNumPerGroup", void 0);
i([n(0)], Ee.prototype, "audienceNum", void 0);
i([n(0)], Ee.prototype, "useMaster", void 0);
i([n(3, Se)], Ee.prototype, "members", void 0);
i([n(0)], Ee.prototype, "locked", void 0);
i([n(4)], Ee.prototype, "createAt", void 0);
exports.GDRoom = Ee;
class je extends a {
  constructor() {
    super(...arguments);
    this.roleId = 0;
    this.frame = 0;
    this.msg = {};
  }
}
i([n(0)], je.prototype, "roleId", void 0);
i([n(0)], je.prototype, "frame", void 0);
i([n(0)], je.prototype, "msg", void 0);
exports.GDRoomFrameSyncMsg = je;
class He extends a {
  constructor() {
    super(...arguments);
    this.id = 0;
    this.name = "";
    this.status = g.closed;
    this.busyStatus = f.normal;
  }
}
i([n(0)], He.prototype, "id", void 0);
i([n(0)], He.prototype, "name", void 0);
i([n(0)], He.prototype, "status", void 0);
i([n(0)], He.prototype, "busyStatus", void 0);
exports.GDServer = He;
class We extends a {
  constructor() {
    super(...arguments);
    this.id = 0;
    this.sId = 0;
    this.name = "";
    this.lv = 0;
    this.loginAt = new Date(-621355968e5);
  }
}
i([n(0)], We.prototype, "id", void 0);
i([n(0)], We.prototype, "sId", void 0);
i([n(0)], We.prototype, "name", void 0);
i([n(0)], We.prototype, "lv", void 0);
i([n(4)], We.prototype, "loginAt", void 0);
exports.GDServerRole = We;
class Ve extends a {
  constructor() {
    super(...arguments);
    this.id = "";
    this.name = "";
    this.desc = "";
    this.version = "";
    this.creatorId = 0;
    this.creatorName = "";
    this.createAt = new Date(-621355968e5);
  }
}
i([n(0)], Ve.prototype, "id", void 0);
i([n(0)], Ve.prototype, "name", void 0);
i([n(0)], Ve.prototype, "desc", void 0);
i([n(0)], Ve.prototype, "version", void 0);
i([n(0)], Ve.prototype, "creatorId", void 0);
i([n(0)], Ve.prototype, "creatorName", void 0);
i([n(4)], Ve.prototype, "createAt", void 0);
exports.GDSubGame = Ve;
class Ke extends a {
  constructor() {
    super(...arguments);
    this.id = 0;
    this.key = "";
    this.platform = "";
    this.platformUId = "";
    this.platformId = 0;
    this.visitorUId = "";
    this.openId = "";
    this.unionId = "";
    this.userName = "";
    this.userImg = "";
    this.userSex = 0;
    this.shareCode = "";
    this.loginPlatform = "";
    this.province = "";
    this.city = "";
    this.isSubscribe = !1;
    this.authed = !1;
    this.channel = "";
    this.scene = 0;
    this.referrerInfo = "";
    this.clientVersion = "";
    this.clientIp = "";
    this.isAppVisitor = !1;
    this.regTime = new Date(-621355968e5);
    this.bindInfo = new pe();
    this.roles = new Map();
  }
}
i([n(0)], Ke.prototype, "id", void 0);
i([n(0)], Ke.prototype, "key", void 0);
i([n(0)], Ke.prototype, "platform", void 0);
i([n(0)], Ke.prototype, "platformUId", void 0);
i([n(0)], Ke.prototype, "platformId", void 0);
i([n(0)], Ke.prototype, "visitorUId", void 0);
i([n(0)], Ke.prototype, "openId", void 0);
i([n(0)], Ke.prototype, "unionId", void 0);
i([n(0)], Ke.prototype, "userName", void 0);
i([n(0)], Ke.prototype, "userImg", void 0);
i([n(0)], Ke.prototype, "userSex", void 0);
i([n(0)], Ke.prototype, "shareCode", void 0);
i([n(0)], Ke.prototype, "loginPlatform", void 0);
i([n(0)], Ke.prototype, "province", void 0);
i([n(0)], Ke.prototype, "city", void 0);
i([n(0)], Ke.prototype, "isSubscribe", void 0);
i([n(0)], Ke.prototype, "authed", void 0);
i([n(0)], Ke.prototype, "channel", void 0);
i([n(0)], Ke.prototype, "scene", void 0);
i([n(0)], Ke.prototype, "referrerInfo", void 0);
i([n(0)], Ke.prototype, "clientVersion", void 0);
i([n(0)], Ke.prototype, "clientIp", void 0);
i([n(0)], Ke.prototype, "isAppVisitor", void 0);
i([n(4)], Ke.prototype, "regTime", void 0);
i([n(1, pe)], Ke.prototype, "bindInfo", void 0);
i([n(3, We)], Ke.prototype, "roles", void 0);
exports.GDUser = Ke;
class Je extends a {
  constructor() {
    super(...arguments);
    this.id = "";
    this.data = {};
  }
}
i([n(0)], Je.prototype, "id", void 0);
i([n(0)], Je.prototype, "data", void 0);
exports.GDVariable = Je;
class Ze extends a {
  constructor() {
    super(...arguments);
    this.id = "";
    this.info = {};
    this.layoutMin = null;
  }
}
i([n(0)], Ze.prototype, "id", void 0);
i([n(0)], Ze.prototype, "info", void 0);
i([n(0)], Ze.prototype, "layoutMin", void 0);
exports.GDWorldData = Ze;
class ze extends a {
  constructor() {
    super(...arguments);
    this.endStamp = 0;
    this.startStamp = 0;
    this.name = "";
  }
}
i([n(0)], ze.prototype, "endStamp", void 0);
i([n(0)], ze.prototype, "startStamp", void 0);
i([n(0)], ze.prototype, "name", void 0);
exports.GiftRankActivity = ze;
class Xe extends a {
  constructor() {
    super(...arguments);
    this.playerId = 0;
    this.id = "";
    this.goodsType = I.all;
    this.name = "";
    this.iconTextureName = "";
    this.advert = "";
    this.price = 0;
    this.saleCnt = 0;
    this.upStamp = 0;
    this.goodsContentCnt = 0;
    this.goodsInfoList = new Array();
  }
}
i([n(0)], Xe.prototype, "playerId", void 0);
i([n(0)], Xe.prototype, "id", void 0);
i([n(0)], Xe.prototype, "goodsType", void 0);
i([n(0)], Xe.prototype, "name", void 0);
i([n(0)], Xe.prototype, "iconTextureName", void 0);
i([n(0)], Xe.prototype, "advert", void 0);
i([n(0)], Xe.prototype, "price", void 0);
i([n(0)], Xe.prototype, "saleCnt", void 0);
i([n(0)], Xe.prototype, "upStamp", void 0);
i([n(0)], Xe.prototype, "goodsContentCnt", void 0);
i([n(2, Xe)], Xe.prototype, "goodsInfoList", void 0);
exports.GoodsCellData = Xe;
(function (e) {
  e[e.comprehensive = 0] = "comprehensive";
  e[e.goodsPriceAsc = 1] = "goodsPriceAsc";
  e[e.goodsPriceDesc = 2] = "goodsPriceDesc";
  e[e.goodsSaleAsc = 3] = "goodsSaleAsc";
  e[e.goodsSaleDesc = 4] = "goodsSaleDesc";
  e[e.goodsUpStampDesc = 5] = "goodsUpStampDesc";
})(o.GoodsSortType || (exports.GoodsSortType = {}));
(function (e) {
  e.tile = "tile";
  e.actor = "actor";
  e.device = "device";
  e.prop = "prop";
  e.gameIcon = "gameIcon";
  e.headIcon = "headIcon";
  e.weapon = "weapon";
  e.bullet = "bullet";
  e.forum = "forum";
})(o.ImageFileType || (exports.ImageFileType = {}));
(function (e) {
  e.game = "game";
  e.goods = "goods";
  e.talk = "talk";
  e.talkComment = "talkComment";
  e.userImg = "userImg";
})(b = o.ReviewType || (exports.ReviewType = {}));
class qe extends a {
  constructor() {
    super(...arguments);
    this.reviewImage = "";
    this.reviewType = b.game;
    this.applyIdList = new Array();
    this.applyPlayerIdList = new Array();
    this.applyTime = new Date(-621355968e5);
    this.reviewCode = h.fail;
    this.reviewTime = new Date(-621355968e5);
    this.isAppeal = !1;
    this.appealPlayerId = 0;
    this.sensitiveImageResult = new H();
  }
}
i([n(0)], qe.prototype, "reviewImage", void 0);
i([n(0)], qe.prototype, "reviewType", void 0);
i([n(2)], qe.prototype, "applyIdList", void 0);
i([n(2)], qe.prototype, "applyPlayerIdList", void 0);
i([n(4)], qe.prototype, "applyTime", void 0);
i([n(0)], qe.prototype, "reviewCode", void 0);
i([n(4)], qe.prototype, "reviewTime", void 0);
i([n(0)], qe.prototype, "isAppeal", void 0);
i([n(0)], qe.prototype, "appealPlayerId", void 0);
i([n(1, H)], qe.prototype, "sensitiveImageResult", void 0);
exports.ImageReviewInfo = qe;
class Ye extends a {
  constructor() {
    super(...arguments);
    this.width = 0;
    this.height = 0;
  }
}
i([n(0)], Ye.prototype, "width", void 0);
i([n(0)], Ye.prototype, "height", void 0);
exports.ImageSize = Ye;
class $e extends a {
  constructor() {
    super(...arguments);
    this.abuse = 0;
    this.ad = 0;
    this.porn = 0;
    this.terror = 0;
  }
}
i([n(0)], $e.prototype, "abuse", void 0);
i([n(0)], $e.prototype, "ad", void 0);
i([n(0)], $e.prototype, "porn", void 0);
i([n(0)], $e.prototype, "terror", void 0);
exports.Score = $e;
class Qe extends a {
  constructor() {
    super(...arguments);
    this.word = "";
    this.source = "";
    this.label = "";
  }
}
i([n(0)], Qe.prototype, "word", void 0);
i([n(0)], Qe.prototype, "source", void 0);
i([n(0)], Qe.prototype, "label", void 0);
exports.SensitiveMsgDetails = Qe;
class et extends a {
  constructor() {
    super(...arguments);
    this.result = 0;
    this.source = "";
    this.score = new $e();
    this.details = new Array();
  }
}
i([n(0)], et.prototype, "result", void 0);
i([n(0)], et.prototype, "source", void 0);
i([n(1, $e)], et.prototype, "score", void 0);
i([n(2, Qe)], et.prototype, "details", void 0);
exports.SensitiveMsgData = et;
class tt extends a {
  constructor() {
    super(...arguments);
    this.errCode = 0;
    this.errMsg = "";
    this.data = new et();
  }
}
i([n(0)], tt.prototype, "errCode", void 0);
i([n(0)], tt.prototype, "errMsg", void 0);
i([n(1, et)], tt.prototype, "data", void 0);
exports.SensitiveMsgResult = tt;
class ot extends a {
  constructor() {
    super(...arguments);
    this.reviewStr = "";
    this.reviewType = b.game;
    this.applyIdList = new Array();
    this.applyPlayerIdList = new Array();
    this.applyTime = new Date(-621355968e5);
    this.reviewCode = h.fail;
    this.reviewTime = new Date(-621355968e5);
    this.isAppeal = !1;
    this.appealPlayerId = 0;
    this.sensitiveMsgResult = new tt();
  }
}
i([n(0)], ot.prototype, "reviewStr", void 0);
i([n(0)], ot.prototype, "reviewType", void 0);
i([n(2)], ot.prototype, "applyIdList", void 0);
i([n(2)], ot.prototype, "applyPlayerIdList", void 0);
i([n(4)], ot.prototype, "applyTime", void 0);
i([n(0)], ot.prototype, "reviewCode", void 0);
i([n(4)], ot.prototype, "reviewTime", void 0);
i([n(0)], ot.prototype, "isAppeal", void 0);
i([n(0)], ot.prototype, "appealPlayerId", void 0);
i([n(1, tt)], ot.prototype, "sensitiveMsgResult", void 0);
exports.MsgReviewInfo = ot;
class it extends a {
  constructor() {
    super(...arguments);
    this.exp = 0;
    this.incExp = 0;
    this.levelUpNeedExp = 0;
    this.oldLevel = 0;
    this.level = 0;
    this.incPlayCount = 0;
    this.incThumbCount = 0;
  }
}
i([n(0)], it.prototype, "exp", void 0);
i([n(0)], it.prototype, "incExp", void 0);
i([n(0)], it.prototype, "levelUpNeedExp", void 0);
i([n(0)], it.prototype, "oldLevel", void 0);
i([n(0)], it.prototype, "level", void 0);
i([n(0)], it.prototype, "incPlayCount", void 0);
i([n(0)], it.prototype, "incThumbCount", void 0);
exports.OffLineChangeMsg = it;
(function (e) {
  e[e.text = 0] = "text";
  e[e.image = 1] = "image";
  e[e.voice = 2] = "voice";
  e[e.custom = 99] = "custom";
})(M = o.OIMContentType || (exports.OIMContentType = {}));
(function (e) {
  e[e.system = 0] = "system";
  e[e.peer = 1] = "peer";
  e[e.group = 2] = "group";
  e[e.chatRoom = 3] = "chatRoom";
  e[e.world = 4] = "world";
  e[e.server = 5] = "server";
})(P = o.OIMConversationType || (exports.OIMConversationType = {}));
class nt extends a {
  constructor() {
    super(...arguments);
    this.id = 0;
    this.name = "";
    this.avatar = "";
    this.extra = "";
  }
}
i([n(0)], nt.prototype, "id", void 0);
i([n(0)], nt.prototype, "name", void 0);
i([n(0)], nt.prototype, "avatar", void 0);
i([n(0)], nt.prototype, "extra", void 0);
exports.OIMUser = nt;
class at extends a {
  constructor() {
    super(...arguments);
    this.convType = P.system;
    this.oppId = 0;
    this.oppInfo = new nt();
    this.time = new Date(-621355968e5);
  }
}
i([n(0)], at.prototype, "convType", void 0);
i([n(0)], at.prototype, "oppId", void 0);
i([n(1, nt)], at.prototype, "oppInfo", void 0);
i([n(4)], at.prototype, "time", void 0);
exports.OIMConversation = at;
class st extends a {
  constructor() {
    super(...arguments);
    this.id = 0;
    this.from = new nt();
    this.oppId = 0;
    this.time = new Date(-621355968e5);
    this.convType = P.system;
    this.contType = M.text;
    this.content = "";
    this.extra = "";
  }
}
i([n(0)], st.prototype, "id", void 0);
i([n(1, nt)], st.prototype, "from", void 0);
i([n(0)], st.prototype, "oppId", void 0);
i([n(4)], st.prototype, "time", void 0);
i([n(0)], st.prototype, "convType", void 0);
i([n(0)], st.prototype, "contType", void 0);
i([n(0)], st.prototype, "content", void 0);
i([n(0)], st.prototype, "extra", void 0);
exports.OIMMsg = st;
class rt extends a {
  constructor() {
    super(...arguments);
    this.st = "";
    this.bk = "";
    this.refine = 0;
    this.id = "";
    this.type = "";
    this.scoreOpt = 0;
  }
}
i([n(0)], rt.prototype, "st", void 0);
i([n(0)], rt.prototype, "bk", void 0);
i([n(0)], rt.prototype, "refine", void 0);
i([n(0)], rt.prototype, "id", void 0);
i([n(0)], rt.prototype, "type", void 0);
i([n(0)], rt.prototype, "scoreOpt", void 0);
exports.PlatformRecommendData = rt;
class lt extends a {
  constructor() {
    super(...arguments);
    this.data = new Array();
  }
}
i([n(2, rt)], lt.prototype, "data", void 0);
exports.PlatformRecommend = lt;
class ct extends a {
  constructor() {
    super(...arguments);
    this.id = "";
    this.sortType = _.asc;
    this.cycleType = C.day;
    this.conf = {};
    this.rankList = new Array();
  }
}
i([n(0)], ct.prototype, "id", void 0);
i([n(0)], ct.prototype, "sortType", void 0);
i([n(0)], ct.prototype, "cycleType", void 0);
i([n(0)], ct.prototype, "conf", void 0);
i([n(2, re)], ct.prototype, "rankList", void 0);
exports.ReleaseGameGameRank = ct;
class dt extends a {
  constructor() {
    super(...arguments);
    this.gameId = "";
    this.id = "";
  }
}
i([n(0)], dt.prototype, "gameId", void 0);
i([n(0)], dt.prototype, "id", void 0);
exports.RetVariableData = dt;
class ht extends a {
  constructor() {
    super(...arguments);
    this.reviewType = b.game;
    this.applyId = "";
    this.applyPlayerId = 0;
    this.reviewImageMap = new Map();
    this.combImageList = new Array();
    this.reviewImageList = new Array();
    this.successImageList = new Array();
    this.failImageList = new Array();
    this.reviewStr = "";
    this.failStrList = new Array();
    this.applyTime = new Date(-621355968e5);
    this.reviewTime = new Date(-621355968e5);
    this.reviewImageCode = h.fail;
    this.reviewMsgCode = h.fail;
  }
}
i([n(0)], ht.prototype, "reviewType", void 0);
i([n(0)], ht.prototype, "applyId", void 0);
i([n(0)], ht.prototype, "applyPlayerId", void 0);
i([n(5)], ht.prototype, "reviewImageMap", void 0);
i([n(2)], ht.prototype, "combImageList", void 0);
i([n(2)], ht.prototype, "reviewImageList", void 0);
i([n(2)], ht.prototype, "successImageList", void 0);
i([n(2)], ht.prototype, "failImageList", void 0);
i([n(0)], ht.prototype, "reviewStr", void 0);
i([n(2)], ht.prototype, "failStrList", void 0);
i([n(4)], ht.prototype, "applyTime", void 0);
i([n(4)], ht.prototype, "reviewTime", void 0);
i([n(0)], ht.prototype, "reviewImageCode", void 0);
i([n(0)], ht.prototype, "reviewMsgCode", void 0);
exports.ReviewInfo = ht;
(function (e) {
  e.normal = "normal";
  e.nationalFlag = "nationalFlag";
  e.porn = "porn";
  e.argue = "argue";
  e.politically = "politically";
  e.abuse = "abuse";
  e.terror = "terror";
})(D = o.ReviewResultType || (exports.ReviewResultType = {}));
class pt extends a {
  constructor() {
    super(...arguments);
    this.reviewId = 0;
    this.resultType = D.normal;
    this.describe = "";
  }
}
i([n(0)], pt.prototype, "reviewId", void 0);
i([n(0)], pt.prototype, "resultType", void 0);
i([n(0)], pt.prototype, "describe", void 0);
exports.ReviewResult = pt;
(function (e) {
  e[e.success = 0] = "success";
  e[e.inReview = 1] = "inReview";
  e[e.fail = 2] = "fail";
})(o.ReviewStatus || (exports.ReviewStatus = {}));
class ut extends a {
  constructor() {
    super(...arguments);
    this.id = 0;
    this.activityTT20210319Time = 0;
  }
}
i([n(0)], ut.prototype, "id", void 0);
i([n(0)], ut.prototype, "activityTT20210319Time", void 0);
exports.RoleActivity = ut;
class mt extends a {
  constructor() {
    super(...arguments);
    this.id = "";
    this.confMap = new Map();
  }
}
i([n(0)], mt.prototype, "id", void 0);
i([n(5)], mt.prototype, "confMap", void 0);
exports.RoleCreativeConf = mt;
class ft extends a {
  constructor() {
    super(...arguments);
    this.id = "";
    this.worldLayoutMap = new Map();
  }
}
i([n(0)], ft.prototype, "id", void 0);
i([n(5)], ft.prototype, "worldLayoutMap", void 0);
exports.RoleCreativeWorldLayout = ft;
class gt extends a {
  constructor() {
    super(...arguments);
    this.sensitiveImgUrl = "";
    this.sensitiveImageResult = new H();
  }
}
i([n(0)], gt.prototype, "sensitiveImgUrl", void 0);
i([n(1, H)], gt.prototype, "sensitiveImageResult", void 0);
exports.RoleManualSensitiveImgMsg = gt;
class yt extends a {
  constructor() {
    super(...arguments);
    this.id = "";
    this.name = "";
    this.iconTextureName = "";
    this.dataVersion = "";
    this.advert = "";
    this.gameDataCdnUrl = "";
    this.gameTags = new Array();
    this.openCreativeGame = !1;
    this.creativeSourceUId = "";
    this.openData = {};
    this.publishTime = 0;
  }
}
i([n(0)], yt.prototype, "id", void 0);
i([n(0)], yt.prototype, "name", void 0);
i([n(0)], yt.prototype, "iconTextureName", void 0);
i([n(0)], yt.prototype, "dataVersion", void 0);
i([n(0)], yt.prototype, "advert", void 0);
i([n(0)], yt.prototype, "gameDataCdnUrl", void 0);
i([n(2)], yt.prototype, "gameTags", void 0);
i([n(0)], yt.prototype, "openCreativeGame", void 0);
i([n(0)], yt.prototype, "creativeSourceUId", void 0);
i([n(0)], yt.prototype, "openData", void 0);
i([n(0)], yt.prototype, "publishTime", void 0);
exports.RoleReviewGameData = yt;
class vt extends a {
  constructor() {
    super(...arguments);
    this.sensitiveImgUrl = "";
    this.sensitiveImageResult = new H();
  }
}
i([n(0)], vt.prototype, "sensitiveImgUrl", void 0);
i([n(1, H)], vt.prototype, "sensitiveImageResult", void 0);
exports.RoleStatisticSensitiveImgMsg = vt;
class Ct extends a {
  constructor() {
    super(...arguments);
    this.id = 0;
    this.lastStamp = 0;
    this.commentIdList = new Array();
    this.upMap = new Map();
    this.downMap = new Map();
    this.thumbMap = new Map();
    this.unThumbMap = new Map();
    this.lastReportStamp = 0;
    this.reportMap = new Map();
  }
}
i([n(0)], Ct.prototype, "id", void 0);
i([n(0)], Ct.prototype, "lastStamp", void 0);
i([n(2)], Ct.prototype, "commentIdList", void 0);
i([n(5)], Ct.prototype, "upMap", void 0);
i([n(5)], Ct.prototype, "downMap", void 0);
i([n(5)], Ct.prototype, "thumbMap", void 0);
i([n(5)], Ct.prototype, "unThumbMap", void 0);
i([n(0)], Ct.prototype, "lastReportStamp", void 0);
i([n(5)], Ct.prototype, "reportMap", void 0);
exports.RoleTalkCommentMsg = Ct;
class _t extends a {
  constructor() {
    super(...arguments);
    this.id = 0;
    this.lastStamp = 0;
    this.talkIdList = new Array();
    this.officialTalkIdList = new Array();
    this.upMap = new Map();
    this.downMap = new Map();
    this.thumbMap = new Map();
    this.unThumbMap = new Map();
    this.lastReportStamp = 0;
    this.reportMap = new Map();
  }
}
i([n(0)], _t.prototype, "id", void 0);
i([n(0)], _t.prototype, "lastStamp", void 0);
i([n(2)], _t.prototype, "talkIdList", void 0);
i([n(2)], _t.prototype, "officialTalkIdList", void 0);
i([n(5)], _t.prototype, "upMap", void 0);
i([n(5)], _t.prototype, "downMap", void 0);
i([n(5)], _t.prototype, "thumbMap", void 0);
i([n(5)], _t.prototype, "unThumbMap", void 0);
i([n(0)], _t.prototype, "lastReportStamp", void 0);
i([n(5)], _t.prototype, "reportMap", void 0);
exports.RoleTalkMsg = _t;
class St extends a {
  constructor() {
    super(...arguments);
    this.id = "";
    this.score = 0;
  }
}
i([n(0)], St.prototype, "id", void 0);
i([n(0)], St.prototype, "score", void 0);
exports.ScoreInfo = St;
class It extends a {
  constructor() {
    super(...arguments);
    this.id = "";
    this.creativeSourceUId = "";
    this.comprehensiveScore = 0;
    this.lastPublishTime = 0;
  }
}
i([n(0)], It.prototype, "id", void 0);
i([n(0)], It.prototype, "creativeSourceUId", void 0);
i([n(0)], It.prototype, "comprehensiveScore", void 0);
i([n(0)], It.prototype, "lastPublishTime", void 0);
exports.SecondaryGameData = It;
class Gt extends a {
  constructor() {
    super(...arguments);
    this.talkId = "";
    this.id = "";
    this.playerId = 0;
    this.content = {};
    this.userLevel = 0;
    this.userImg = "";
    this.userName = "";
    this.userIntro = "";
    this.replayCommentId = "";
    this.targetPlayerId = 0;
    this.targetPlayerName = "";
    this.thumbCnt = 0;
    this.reportCnt = 0;
    this.subCommentsCnt = 0;
    this.commentIds = new Array();
    this.openCnt = 0;
    this.comments = new Array();
    this.status = G.noPublish;
    this.offReason = new te();
    this.stamp = 0;
  }
}
i([n(0)], Gt.prototype, "talkId", void 0);
i([n(0)], Gt.prototype, "id", void 0);
i([n(0)], Gt.prototype, "playerId", void 0);
i([n(0)], Gt.prototype, "content", void 0);
i([n(0)], Gt.prototype, "userLevel", void 0);
i([n(0)], Gt.prototype, "userImg", void 0);
i([n(0)], Gt.prototype, "userName", void 0);
i([n(0)], Gt.prototype, "userIntro", void 0);
i([n(0)], Gt.prototype, "replayCommentId", void 0);
i([n(0)], Gt.prototype, "targetPlayerId", void 0);
i([n(0)], Gt.prototype, "targetPlayerName", void 0);
i([n(0)], Gt.prototype, "thumbCnt", void 0);
i([n(0)], Gt.prototype, "reportCnt", void 0);
i([n(0)], Gt.prototype, "subCommentsCnt", void 0);
i([n(2)], Gt.prototype, "commentIds", void 0);
i([n(0)], Gt.prototype, "openCnt", void 0);
i([n(2, Gt)], Gt.prototype, "comments", void 0);
i([n(0)], Gt.prototype, "status", void 0);
i([n(1, te)], Gt.prototype, "offReason", void 0);
i([n(0)], Gt.prototype, "stamp", void 0);
exports.TalkComment = Gt;
(function (e) {
  e.trends = "trends";
  e.chosen = "chosen";
  e.official = "official";
  e.top = "top";
})(w = o.TalkType || (exports.TalkType = {}));
class Tt extends a {
  constructor() {
    super(...arguments);
    this.uId = "";
    this.playerId = 0;
    this.userLevel = 0;
    this.userImg = "";
    this.userName = "";
    this.userIntro = "";
    this.talkType = w.trends;
    this.title = "";
    this.simpleContent = {};
    this.content = {};
    this.upCnt = 0;
    this.reportCnt = 0;
    this.commentsCnt = 0;
    this.commentsCntSum = 0;
    this.isTop = !1;
    this.isUp = !1;
    this.isDown = !1;
    this.topComment = new Gt();
    this.comments = new Array();
    this.status = G.noPublish;
    this.offReason = new te();
    this.createStamp = 0;
    this.newCommentStamp = 0;
    this.upStamp = 0;
    this.collectionCntSum = 0;
  }
}
i([n(0)], Tt.prototype, "uId", void 0);
i([n(0)], Tt.prototype, "playerId", void 0);
i([n(0)], Tt.prototype, "userLevel", void 0);
i([n(0)], Tt.prototype, "userImg", void 0);
i([n(0)], Tt.prototype, "userName", void 0);
i([n(0)], Tt.prototype, "userIntro", void 0);
i([n(0)], Tt.prototype, "talkType", void 0);
i([n(0)], Tt.prototype, "title", void 0);
i([n(0)], Tt.prototype, "simpleContent", void 0);
i([n(0)], Tt.prototype, "content", void 0);
i([n(0)], Tt.prototype, "upCnt", void 0);
i([n(0)], Tt.prototype, "reportCnt", void 0);
i([n(0)], Tt.prototype, "commentsCnt", void 0);
i([n(0)], Tt.prototype, "commentsCntSum", void 0);
i([n(0)], Tt.prototype, "isTop", void 0);
i([n(0)], Tt.prototype, "isUp", void 0);
i([n(0)], Tt.prototype, "isDown", void 0);
i([n(1, Gt)], Tt.prototype, "topComment", void 0);
i([n(2, Gt)], Tt.prototype, "comments", void 0);
i([n(0)], Tt.prototype, "status", void 0);
i([n(1, te)], Tt.prototype, "offReason", void 0);
i([n(0)], Tt.prototype, "createStamp", void 0);
i([n(0)], Tt.prototype, "newCommentStamp", void 0);
i([n(0)], Tt.prototype, "upStamp", void 0);
i([n(0)], Tt.prototype, "collectionCntSum", void 0);
exports.TalkData = Tt;
(function (e) {
  e.talkTime = "talkTime";
  e.thumbCnt = "thumbCnt";
  e.newCommentTime = "newCommentTime";
})(o.TalkSortType || (exports.TalkSortType = {}));
class bt extends a {
  constructor() {
    super(...arguments);
    this.uId = "";
    this.talkId = "";
    this.id = "";
    this.upCnt = 0;
    this.reportCnt = 0;
    this.commentsCnt = 0;
    this.commentsCntSum = 0;
    this.topComment = new Gt();
    this.comments = new Array();
  }
}
i([n(0)], bt.prototype, "uId", void 0);
i([n(0)], bt.prototype, "talkId", void 0);
i([n(0)], bt.prototype, "id", void 0);
i([n(0)], bt.prototype, "upCnt", void 0);
i([n(0)], bt.prototype, "reportCnt", void 0);
i([n(0)], bt.prototype, "commentsCnt", void 0);
i([n(0)], bt.prototype, "commentsCntSum", void 0);
i([n(1, Gt)], bt.prototype, "topComment", void 0);
i([n(2, Gt)], bt.prototype, "comments", void 0);
exports.TalkTopComment = bt;
class Mt extends a {
  constructor() {
    super(...arguments);
    this.playerId = 0;
    this.userName = "";
    this.userImg = "";
    this.userIntro = "";
    this.level = 0;
    this.isFollow = !1;
    this.fansCount = 0;
    this.followCount = 0;
    this.goodsIds = new Array();
    this.gameDatas = new Array();
  }
}
i([n(0)], Mt.prototype, "playerId", void 0);
i([n(0)], Mt.prototype, "userName", void 0);
i([n(0)], Mt.prototype, "userImg", void 0);
i([n(0)], Mt.prototype, "userIntro", void 0);
i([n(0)], Mt.prototype, "level", void 0);
i([n(0)], Mt.prototype, "isFollow", void 0);
i([n(0)], Mt.prototype, "fansCount", void 0);
i([n(0)], Mt.prototype, "followCount", void 0);
i([n(2)], Mt.prototype, "goodsIds", void 0);
i([n(2, $)], Mt.prototype, "gameDatas", void 0);
exports.UserDetailMsg = Mt;
class Pt extends a {
  constructor() {
    super(...arguments);
    this.playerId = 0;
    this.channel = "";
    this.userName = "";
    this.userImg = "";
    this.userIntro = "";
    this.level = 0;
    this.isFollow = !1;
  }
}
i([n(0)], Pt.prototype, "playerId", void 0);
i([n(0)], Pt.prototype, "channel", void 0);
i([n(0)], Pt.prototype, "userName", void 0);
i([n(0)], Pt.prototype, "userImg", void 0);
i([n(0)], Pt.prototype, "userIntro", void 0);
i([n(0)], Pt.prototype, "level", void 0);
i([n(0)], Pt.prototype, "isFollow", void 0);
exports.UserSimpleMsg = Pt;
class Dt extends a {
  constructor() {
    super(...arguments);
    this.gameId = "";
    this.id = "";
    this.data = {};
  }
}
i([n(0)], Dt.prototype, "gameId", void 0);
i([n(0)], Dt.prototype, "id", void 0);
i([n(0)], Dt.prototype, "data", void 0);
exports.VariableData = Dt;