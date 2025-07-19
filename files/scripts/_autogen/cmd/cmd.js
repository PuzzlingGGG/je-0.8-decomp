"use strict";

var i = this && this.__decorate || function (e, t, o, i) {
  var n,
    a = arguments.length,
    s = a < 3 ? t : null === i ? i = Object.getOwnPropertyDescriptor(t, o) : i;
  if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) s = Reflect.decorate(e, t, o, i);else for (var r = e.length - 1; r >= 0; r--) (n = e[r]) && (s = (a < 3 ? n(s) : a > 3 ? n(t, o, s) : n(t, o)) || s);
  return a > 3 && s && Object.defineProperty(t, o, s), s;
};
exports.Game_RDelGameRank = exports.Game_RDelGameComment = exports.Game_RDeleteTalk = exports.Game_RDeleteGameRankScore = exports.Game_RDelCustomColors = exports.Game_RDelActorGroups = exports.Game_RDebugGetRecommendGameMsg = exports.Game_RDealWithReportPlayer = exports.Game_RDealWithReportGoods = exports.Game_RDealWithReportGameComment = exports.Game_RCreateTalk = exports.Game_RCreateOfficialTalk = exports.Game_RCostCoinRecommendGame = exports.Game_RCostCoinInGame = exports.Game_RCommentTalk = exports.Game_RCommentGame = exports.Game_RCollectionTalk = exports.Game_RCollectionGGoods = exports.Game_RCollectionGames = exports.Game_RClickRecommendsGames = exports.Game_RClearReportTalkComment = exports.Game_RClearReportTalk = exports.Game_RClearReportPlayer = exports.Game_RClearReportGoods = exports.Game_RClearReportGameComment = exports.Game_RClearReportGame = exports.Game_RClearNewMsg = exports.Game_RClearNewFans = exports.Game_RClearNewComment = exports.Game_RCancelUpTalk = exports.Game_RCancelThumbTalkComment = exports.Game_RCancelThumbTalk = exports.Game_RCancelThumbGames = exports.Game_RCancelThumbGameComment = exports.Game_RCancelFollowUser = exports.Game_RCancelDownTalk = exports.Game_RCancelCollectionTalk = exports.Game_RCancelCollectionGoods = exports.Game_RCancelCollectionGames = exports.Game_RBuyGoods = exports.Game_RBindRole = exports.Game_RAdminSetGameStatus = exports.Game_RAdminGetGameMsgByReviewId = exports.Game_RAddOtherCoinByAdvert = exports.Game_RAddGameTage = exports.Game_RAddCoinByShareVideo = exports.Game_RAddCoinByAdvert = exports.Account_SetPasswordR = exports.RESPS = exports.CMDS = void 0;
exports.Game_RGetOneDynamicConfig = exports.Game_RGetNewGoods = exports.Game_RGetNewGameList = exports.Game_RGetNewGameIdList = exports.Game_RGetNewCommentListV2 = exports.Game_RGetNewCommentList = exports.Game_RGetNeedReviewImageList = exports.Game_RGetMsgList = exports.Game_RGetManualReportSensitiveImg = exports.Game_RGetHomepageRecommendsGames = exports.Game_RGetHomepageNewGames = exports.Game_RGetHomepageGameData = exports.Game_RGetHomepageFollowUserGames = exports.Game_RGetGoodsInfos = exports.Game_RGetGoodsIds = exports.Game_RGetGiftRankData = exports.Game_RGetGiftDynCfg = exports.Game_RGetGameShopIds = exports.Game_RGetGameShop = exports.Game_RGetGameRank = exports.Game_RGetGameIdListByGameTag = exports.Game_RGetGameDetail = exports.Game_RGetFollow = exports.Game_RGetFans = exports.Game_RGetCreativeRank = exports.Game_RGetCostCoinRecommendGames = exports.Game_RGetChosenGoodsIds = exports.Game_RGetBindRoleMsg = exports.Game_RGetBeReportGameData = exports.Game_RGetAggregateMsgList = exports.Game_RGameStatusNotify = exports.Game_RFollowUser = exports.Game_RDownTalkComment = exports.Game_RDownTalk = exports.Game_RDelWorldData = exports.Game_RDelVariable = exports.Game_RDelTalkTop = exports.Game_RDelTalkCommentTop = exports.Game_RDelTalkComment = exports.Game_RDelTalkChosen = exports.Game_RDelRoleWeaponConf = exports.Game_RDelRoleTileConf = exports.Game_RDelRolePropConf = exports.Game_RDelRoleGameData = exports.Game_RDelRoleDeviceConf = exports.Game_RDelRoleCreativeConf = exports.Game_RDelRoleBulletConf = exports.Game_RDelRoleActorConf = exports.Game_RDelReleaseGameRank = exports.Game_RDelGameShop = void 0;
exports.Game_RLoadGameComment = exports.Game_RLoadFirstLevelTalkComment = exports.Game_RLoadFirstLevelGameComment = exports.Game_RIncCreditScore = exports.Game_RHurryGames = exports.Game_RGoodsStatusNotify = exports.Game_RGMSetGameTage = exports.Game_RGMRevokeBindRole = exports.Game_RGMIncOtherCoin = exports.Game_RGMBindRole = exports.Game_RGetWorldDataIds = exports.Game_RGetWorldData = exports.Game_RGetVariableIds = exports.Game_RGetVariable = exports.Game_RGetUserSimpleMsg = exports.Game_RGetUserDetailMsg = exports.Game_RGetUserCreditMsg = exports.Game_RGetThumbTalkComment = exports.Game_RGetThumbGameComment = exports.Game_RGetSourceCreativeGameRank = exports.Game_RGetSimpleGoods = exports.Game_RGetRoleWeaponIds = exports.Game_RGetRoleWeaponConf = exports.Game_RGetRoleTileIds = exports.Game_RGetRoleTileConf = exports.Game_RGetRolePropIds = exports.Game_RGetRolePropConf = exports.Game_RGetRoleGiftRankData = exports.Game_RGetRoleGameIds = exports.Game_RGetRoleGameData = exports.Game_RGetRoleDeviceIds = exports.Game_RGetRoleDeviceConf = exports.Game_RGetRoleCreativeConf = exports.Game_RGetRoleBulletIds = exports.Game_RGetRoleBulletConf = exports.Game_RGetRoleActorIds = exports.Game_RGetRoleActorConf = exports.Game_RGetReviewGameData = exports.Game_RGetReportTalkList = exports.Game_RGetReportTalkCommentList = exports.Game_RGetReportSensitiveImg = exports.Game_RGetReportPlayerList = exports.Game_RGetReportGoodsList = exports.Game_RGetReportGameList = exports.Game_RGetReportGameCommentList = exports.Game_RGetReleaseGameRank = exports.Game_RGetRecommendGoodsIdList = exports.Game_RGetRecommendGameIdList = exports.Game_RGetPlayGameStatistics = exports.Game_RGetOwnGoodsInfos = void 0;
exports.Game_RSaveRoleActorConf = exports.Game_RSaveGuide = exports.Game_RSaveGameShop = exports.Game_RSaveGameRank = exports.Game_RSaveCustomColors = exports.Game_RSaveAllVariable = exports.Game_RSaveAllCustomColors = exports.Game_RSaveActorGroups = exports.Game_RRoleNewUserImgNotify = exports.Game_RRevokeReportPlayer = exports.Game_RRevokeReportGoods = exports.Game_RRevokeReportGameComment = exports.Game_RRevokeReportGame = exports.Game_RReviewGame = exports.Game_RResetChosenGoods = exports.Game_RResetChosenGames = exports.Game_RResetBannerGames = exports.Game_RReportTalkComment = exports.Game_RReportTalk = exports.Game_RReportPlayer = exports.Game_RReportGoodsShow = exports.Game_RReportGoodsClick = exports.Game_RReportGoods = exports.Game_RReportGameShow = exports.Game_RReportGameComment = exports.Game_RReportGameClick = exports.Game_RReportGame = exports.Game_RReportBugMsg = exports.Game_RReplyTalkComment = exports.Game_RPublishGame = exports.Game_RPlayGameStatistics = exports.Game_RPlayGames = exports.Game_ROwnOffGame = exports.Game_ROfficialDeleteTalk = exports.Game_ROffGoods = exports.Game_ROffGame = exports.Game_RObtainTTCoin0319 = exports.Game_RNewSearchGoods = exports.Game_RModifyTalkComment = exports.Game_RModifyTalk = exports.Game_RModifyOfficialTalk = exports.Game_RLogin = exports.Game_RLoadTalkSubComment = exports.Game_RLoadTalkDetail = exports.Game_RLoadTalkComment = exports.Game_RLoadTalkByIdList = exports.Game_RLoadTalk = exports.Game_RLoadOwnTalkComment = exports.Game_RLoadOwnTalk = exports.Game_RLoadGameSubComment = void 0;
exports.Room_FrameSyncStartP = exports.Room_FrameMsgP = exports.Room_DismissP = exports.Room_CustomChangeP = exports.RespSync = exports.RespNone = exports.OIMNewMsgNotify = exports.OIM_GetHistoryResp = exports.OIM_GetConversationListResp = exports.Login_RSelectServer = exports.Login_RGetAppUpdateInfo = exports.Login_RAuthUserSingle = exports.Login_RAuthUser = exports.Login_CreateAccountR = exports.Login_CheckAccountR = exports.Game_SubGameListR = exports.Game_RUpTalkComment = exports.Game_RUpTalk = exports.Game_RUploadTakeExamScore = exports.Game_RUploadReleaseGame = exports.Game_RUploadImage = exports.Game_RUploadGoods = exports.Game_RUploadGameRankScore = exports.Game_RUpdateUserInfo = exports.Game_RUpdateUserImg = exports.Game_RThumbTalkComment = exports.Game_RThumbTalk = exports.Game_RThumbGames = exports.Game_RThumbGameComment = exports.Game_RTalkStatusNotify = exports.Game_RTalkCommentStatusNotify = exports.Game_RSetTalkTop = exports.Game_RSetTalkCommentTop = exports.Game_RSetTalkChosen = exports.Game_RSensitiveMsg = exports.Game_RSendGift = exports.Game_RSearchTalk = exports.Game_RSearchRole = exports.Game_RSearchGoods = exports.Game_RSearchGameByTag = exports.Game_RSearchGame = exports.Game_RSaveWorldData = exports.Game_RSaveVariable = exports.Game_RSaveRoleWeaponConf = exports.Game_RSaveRoleTileConf = exports.Game_RSaveRolePropConf = exports.Game_RSaveRoleGameData = exports.Game_RSaveRoleDeviceConf = exports.Game_RSaveRoleCreativeConf = exports.Game_RSaveRoleBulletConf = void 0;
exports.Room_UnlockP = exports.Room_StopP = exports.Room_StartP = exports.Room_StartingP = exports.Room_StartFailP = exports.Room_Resp = exports.Room_REnter = exports.Room_PingR = exports.Room_MsgP = exports.Room_MemberLeaveP = exports.Room_MemberJoinP = exports.Room_MemberGroupChangeP = exports.Room_LockP = exports.Room_ListR = exports.Room_FrameSyncStopP = void 0;
const n = e("../data/data"),
  a = e("../data/data"),
  s = e("../data/data"),
  r = e("../data/data"),
  l = e("../data/data"),
  c = e("../data/data"),
  d = e("../data/data"),
  h = e("../data/data"),
  p = e("../data/data"),
  u = e("../data/data"),
  m = e("../data/data"),
  f = e("../data/data"),
  g = e("../data/data"),
  y = e("../data/data"),
  v = e("../data/data"),
  C = e("../data/data"),
  _ = e("../data/data"),
  S = e("../data/data"),
  I = e("../data/data"),
  G = e("../data/data"),
  T = e("../data/data"),
  b = e("../data/data"),
  M = e("../data/data"),
  P = e("../data/data"),
  D = e("../data/data"),
  w = e("../data/data"),
  B = e("../data/data"),
  R = e("../data/data"),
  x = e("../data/data"),
  L = e("../data/data"),
  k = e("../data/data"),
  F = e("../data/data"),
  N = e("../data/data"),
  A = e("../data/data"),
  O = e("../data/data"),
  U = e("../data/data"),
  E = e("../data/data"),
  j = e("../data/data"),
  H = e("../data/data"),
  W = e("../data/data"),
  V = e("../data/data"),
  K = e("../data/data"),
  J = e("../data/data"),
  Z = e("../data/data"),
  z = e("../data/data"),
  X = e("../data/data"),
  q = e("../data/data"),
  Y = e("../data/data"),
  $ = e("../data/data"),
  Q = e("../data/data"),
  ee = e("../data/data"),
  te = e("../data/data"),
  oe = e("../data/data"),
  ie = e("../data/data"),
  ne = e("../data/data"),
  ae = e("../data/data");
(function (e) {
  e.Account_SetPassword = "account_setpassword";
  e.Game_AddCoinByAdvert = "game_addcoinbyadvert";
  e.Game_AddCoinByShareVideo = "game_addcoinbysharevideo";
  e.Game_AddGameTage = "game_addgametage";
  e.Game_AddItem = "game_additem";
  e.Game_AddOtherCoinByAdvert = "game_addothercoinbyadvert";
  e.Game_AdminGetGameMsgByReviewId = "game_admingetgamemsgbyreviewid";
  e.Game_AdminSetGameStatus = "game_adminsetgamestatus";
  e.Game_BindRole = "game_bindrole";
  e.Game_BuyGoods = "game_buygoods";
  e.Game_CancelCollectionGames = "game_cancelcollectiongames";
  e.Game_CancelCollectionGoods = "game_cancelcollectiongoods";
  e.Game_CancelCollectionTalk = "game_cancelcollectiontalk";
  e.Game_CancelDownTalk = "game_canceldowntalk";
  e.Game_CancelFollowUser = "game_cancelfollowuser";
  e.Game_CancelThumbGameComment = "game_cancelthumbgamecomment";
  e.Game_CancelThumbGames = "game_cancelthumbgames";
  e.Game_CancelThumbTalk = "game_cancelthumbtalk";
  e.Game_CancelThumbTalkComment = "game_cancelthumbtalkcomment";
  e.Game_CancelUpTalk = "game_canceluptalk";
  e.Game_ClearNewComment = "game_clearnewcomment";
  e.Game_ClearNewFans = "game_clearnewfans";
  e.Game_ClearNewMsg = "game_clearnewmsg";
  e.Game_ClearReportGame = "game_clearreportgame";
  e.Game_ClearReportGameComment = "game_clearreportgamecomment";
  e.Game_ClearReportGoods = "game_clearreportgoods";
  e.Game_ClearReportPlayer = "game_clearreportplayer";
  e.Game_ClearReportTalk = "game_clearreporttalk";
  e.Game_ClearReportTalkComment = "game_clearreporttalkcomment";
  e.Game_ClickRecommendsGames = "game_clickrecommendsgames";
  e.Game_CollectionGames = "game_collectiongames";
  e.Game_CollectionGGoods = "game_collectionggoods";
  e.Game_CollectionTalk = "game_collectiontalk";
  e.Game_CommentGame = "game_commentgame";
  e.Game_CommentTalk = "game_commenttalk";
  e.Game_CostCoinInGame = "game_costcoiningame";
  e.Game_CostCoinRecommendGame = "game_costcoinrecommendgame";
  e.Game_CreateOfficialTalk = "game_createofficialtalk";
  e.Game_CreateTalk = "game_createtalk";
  e.Game_DealWithReportGameComment = "game_dealwithreportgamecomment";
  e.Game_DealWithReportGoods = "game_dealwithreportgoods";
  e.Game_DealWithReportPlayer = "game_dealwithreportplayer";
  e.Game_DebugGetRecommendGameMsg = "game_debuggetrecommendgamemsg";
  e.Game_DelActorGroups = "game_delactorgroups";
  e.Game_DelCustomColors = "game_delcustomcolors";
  e.Game_DeleteGameRankScore = "game_deletegamerankscore";
  e.Game_DeleteTalk = "game_deletetalk";
  e.Game_DelGameComment = "game_delgamecomment";
  e.Game_DelGameRank = "game_delgamerank";
  e.Game_DelGameShop = "game_delgameshop";
  e.Game_DelReleaseGameRank = "game_delreleasegamerank";
  e.Game_DelRoleActorConf = "game_delroleactorconf";
  e.Game_DelRoleBulletConf = "game_delrolebulletconf";
  e.Game_DelRoleCreativeConf = "game_delrolecreativeconf";
  e.Game_DelRoleDeviceConf = "game_delroledeviceconf";
  e.Game_DelRoleGameData = "game_delrolegamedata";
  e.Game_DelRolePropConf = "game_delrolepropconf";
  e.Game_DelRoleTileConf = "game_delroletileconf";
  e.Game_DelRoleWeaponConf = "game_delroleweaponconf";
  e.Game_DelTalkChosen = "game_deltalkchosen";
  e.Game_DelTalkComment = "game_deltalkcomment";
  e.Game_DelTalkCommentTop = "game_deltalkcommenttop";
  e.Game_DelTalkTop = "game_deltalktop";
  e.Game_DelVariable = "game_delvariable";
  e.Game_DelWorldData = "game_delworlddata";
  e.Game_DownTalk = "game_downtalk";
  e.Game_DownTalkComment = "game_downtalkcomment";
  e.Game_FollowUser = "game_followuser";
  e.Game_GetAggregateMsgList = "game_getaggregatemsglist";
  e.Game_GetBeReportGameData = "game_getbereportgamedata";
  e.Game_GetBindRoleMsg = "game_getbindrolemsg";
  e.Game_GetChosenGoodsIds = "game_getchosengoodsids";
  e.Game_GetCostCoinRecommendGames = "game_getcostcoinrecommendgames";
  e.Game_GetCreativeRank = "game_getcreativerank";
  e.Game_GetFans = "game_getfans";
  e.Game_GetFollow = "game_getfollow";
  e.Game_GetGameDetail = "game_getgamedetail";
  e.Game_GetGameIdListByGameTag = "game_getgameidlistbygametag";
  e.Game_GetGameRank = "game_getgamerank";
  e.Game_GetGameShop = "game_getgameshop";
  e.Game_GetGameShopIds = "game_getgameshopids";
  e.Game_GetGiftDynCfg = "game_getgiftdyncfg";
  e.Game_GetGiftRankData = "game_getgiftrankdata";
  e.Game_GetGoodsIds = "game_getgoodsids";
  e.Game_GetGoodsInfos = "game_getgoodsinfos";
  e.Game_GetHomepageFollowUserGames = "game_gethomepagefollowusergames";
  e.Game_GetHomepageGameData = "game_gethomepagegamedata";
  e.Game_GetHomepageNewGames = "game_gethomepagenewgames";
  e.Game_GetHomepageRecommendsGames = "game_gethomepagerecommendsgames";
  e.Game_GetManualReportSensitiveImg = "game_getmanualreportsensitiveimg";
  e.Game_GetMsgList = "game_getmsglist";
  e.Game_GetNeedReviewImageList = "game_getneedreviewimagelist";
  e.Game_GetNewCommentList = "game_getnewcommentlist";
  e.Game_GetNewCommentListV2 = "game_getnewcommentlistv2";
  e.Game_GetNewGameIdList = "game_getnewgameidlist";
  e.Game_GetNewGameList = "game_getnewgamelist";
  e.Game_GetNewGoods = "game_getnewgoods";
  e.Game_GetOneDynamicConfig = "game_getonedynamicconfig";
  e.Game_GetOwnGoodsInfos = "game_getowngoodsinfos";
  e.Game_GetPlayGameStatistics = "game_getplaygamestatistics";
  e.Game_GetRecommendGameIdList = "game_getrecommendgameidlist";
  e.Game_GetRecommendGoodsIdList = "game_getrecommendgoodsidlist";
  e.Game_GetReleaseGameRank = "game_getreleasegamerank";
  e.Game_GetReportGameCommentList = "game_getreportgamecommentlist";
  e.Game_GetReportGameIdList = "game_getreportgameidlist";
  e.Game_GetReportGoodsIdList = "game_getreportgoodsidlist";
  e.Game_GetReportPlayerIdList = "game_getreportplayeridlist";
  e.Game_GetReportSensitiveImg = "game_getreportsensitiveimg";
  e.Game_GetReportTalkCommentList = "game_getreporttalkcommentlist";
  e.Game_GetReportTalkList = "game_getreporttalklist";
  e.Game_GetReviewGameData = "game_getreviewgamedata";
  e.Game_GetRoleActorConf = "game_getroleactorconf";
  e.Game_GetRoleActorIds = "game_getroleactorids";
  e.Game_GetRoleBulletConf = "game_getrolebulletconf";
  e.Game_GetRoleBulletIds = "game_getrolebulletids";
  e.Game_GetRoleCreativeConf = "game_getrolecreativeconf";
  e.Game_GetRoleDeviceConf = "game_getroledeviceconf";
  e.Game_GetRoleDeviceIds = "game_getroledeviceids";
  e.Game_GetRoleGameData = "game_getrolegamedata";
  e.Game_GetRoleGameIds = "game_getrolegameids";
  e.Game_GetRoleGiftRankData = "game_getrolegiftrankdata";
  e.Game_GetRolePropConf = "game_getrolepropconf";
  e.Game_GetRolePropIds = "game_getrolepropids";
  e.Game_GetRoleTileConf = "game_getroletileconf";
  e.Game_GetRoleTileIds = "game_getroletileids";
  e.Game_GetRoleWeaponConf = "game_getroleweaponconf";
  e.Game_GetRoleWeaponIds = "game_getroleweaponids";
  e.Game_GetSimpleGoods = "game_getsimplegoods";
  e.Game_GetSourceCreativeGameRank = "game_getsourcecreativegamerank";
  e.Game_GetThumbGameComment = "game_getthumbgamecomment";
  e.Game_GetThumbTalkComment = "game_getthumbtalkcomment";
  e.Game_GetUserCreditMsg = "game_getusercreditmsg";
  e.Game_GetUserDetailMsg = "game_getuserdetailmsg";
  e.Game_GetUserSimpleMsg = "game_getusersimplemsg";
  e.Game_GetVariable = "game_getvariable";
  e.Game_GetVariableIds = "game_getvariableids";
  e.Game_GetWorldData = "game_getworlddata";
  e.Game_GetWorldDataIds = "game_getworlddataids";
  e.Game_GMBindRole = "game_gmbindrole";
  e.Game_GMIncOtherCoin = "game_gmincothercoin";
  e.Game_GMLogin = "game_gmlogin";
  e.Game_GMRevokeBindRole = "game_gmrevokebindrole";
  e.Game_GMSetGameTage = "game_gmsetgametage";
  e.Game_GmSetGold = "game_gmsetgold";
  e.Game_HurryGames = "game_hurrygames";
  e.Game_IncCreditScore = "game_inccreditscore";
  e.Game_LoadFirstLevelGameComment = "game_loadfirstlevelgamecomment";
  e.Game_LoadFirstLevelTalkComment = "game_loadfirstleveltalkcomment";
  e.Game_LoadGameComment = "game_loadgamecomment";
  e.Game_LoadGameSubComment = "game_loadgamesubcomment";
  e.Game_LoadOwnTalk = "game_loadowntalk";
  e.Game_LoadOwnTalkComment = "game_loadowntalkcomment";
  e.Game_LoadTalk = "game_loadtalk";
  e.Game_LoadTalkByIdList = "game_loadtalkbyidlist";
  e.Game_LoadTalkComment = "game_loadtalkcomment";
  e.Game_LoadTalkDetail = "game_loadtalkdetail";
  e.Game_LoadTalkSubComment = "game_loadtalksubcomment";
  e.Game_Login = "game_login";
  e.Game_ModifyOfficialTalk = "game_modifyofficialtalk";
  e.Game_ModifyTalk = "game_modifytalk";
  e.Game_ModifyTalkComment = "game_modifytalkcomment";
  e.Game_NewSearchGoods = "game_newsearchgoods";
  e.Game_ObtainTTCoin0319 = "game_obtainttcoin0319";
  e.Game_OffGame = "game_offgame";
  e.Game_OffGoods = "game_offgoods";
  e.Game_OfficialDeleteTalk = "game_officialdeletetalk";
  e.Game_OwnOffGame = "game_ownoffgame";
  e.Game_PlayGames = "game_playgames";
  e.Game_PlayGameStatistics = "game_playgamestatistics";
  e.Game_PublishGame = "game_publishgame";
  e.Game_ReplyTalkComment = "game_replytalkcomment";
  e.Game_ReportBugMsg = "game_reportbugmsg";
  e.Game_ReportGame = "game_reportgame";
  e.Game_ReportGameClick = "game_reportgameclick";
  e.Game_ReportGameComment = "game_reportgamecomment";
  e.Game_ReportGameShow = "game_reportgameshow";
  e.Game_ReportGoods = "game_reportgoods";
  e.Game_ReportGoodsClick = "game_reportgoodsclick";
  e.Game_ReportGoodsShow = "game_reportgoodsshow";
  e.Game_ReportPlayer = "game_reportplayer";
  e.Game_ReportTalk = "game_reporttalk";
  e.Game_ReportTalkComment = "game_reporttalkcomment";
  e.Game_ResetBannerGames = "game_resetbannergames";
  e.Game_ResetChosenGames = "game_resetchosengames";
  e.Game_ResetChosenGoods = "game_resetchosengoods";
  e.Game_ReviewGame = "game_reviewgame";
  e.Game_RevokeReportGame = "game_revokereportgame";
  e.Game_RevokeReportGameComment = "game_revokereportgamecomment";
  e.Game_RevokeReportGoods = "game_revokereportgoods";
  e.Game_RevokeReportPlayer = "game_revokereportplayer";
  e.Game_SaveActorGroups = "game_saveactorgroups";
  e.Game_SaveAllCustomColors = "game_saveallcustomcolors";
  e.Game_SaveAllVariable = "game_saveallvariable";
  e.Game_SaveCustomColors = "game_savecustomcolors";
  e.Game_SaveGameRank = "game_savegamerank";
  e.Game_SaveGameShop = "game_savegameshop";
  e.Game_SaveGuide = "game_saveguide";
  e.Game_SaveRoleActorConf = "game_saveroleactorconf";
  e.Game_SaveRoleBulletConf = "game_saverolebulletconf";
  e.Game_SaveRoleCreativeConf = "game_saverolecreativeconf";
  e.Game_SaveRoleDeviceConf = "game_saveroledeviceconf";
  e.Game_SaveRoleGameData = "game_saverolegamedata";
  e.Game_SaveRolePropConf = "game_saverolepropconf";
  e.Game_SaveRoleTileConf = "game_saveroletileconf";
  e.Game_SaveRoleWeaponConf = "game_saveroleweaponconf";
  e.Game_SaveVariable = "game_savevariable";
  e.Game_SaveWorldData = "game_saveworlddata";
  e.Game_SearchGame = "game_searchgame";
  e.Game_SearchGameByTag = "game_searchgamebytag";
  e.Game_SearchGoods = "game_searchgoods";
  e.Game_SearchRole = "game_searchrole";
  e.Game_SearchTalk = "game_searchtalk";
  e.Game_SendGift = "game_sendgift";
  e.Game_SensitiveMsg = "game_sensitivemsg";
  e.Game_SetTalkChosen = "game_settalkchosen";
  e.Game_SetTalkCommentTop = "game_settalkcommenttop";
  e.Game_SetTalkTop = "game_settalktop";
  e.Game_SubGameList = "game_subgamelist";
  e.Game_ThumbGameComment = "game_thumbgamecomment";
  e.Game_ThumbGames = "game_thumbgames";
  e.Game_ThumbTalk = "game_thumbtalk";
  e.Game_ThumbTalkComment = "game_thumbtalkcomment";
  e.Game_UpdateUserImg = "game_updateuserimg";
  e.Game_UpdateUserInfo = "game_updateuserinfo";
  e.Game_UploadGameRankScore = "game_uploadgamerankscore";
  e.Game_UploadGoods = "game_uploadgoods";
  e.Game_UploadImage = "game_uploadimage";
  e.Game_UploadReleaseGame = "game_uploadreleasegame";
  e.Game_UploadTakeExamScore = "game_uploadtakeexamscore";
  e.Game_UpTalk = "game_uptalk";
  e.Game_UpTalkComment = "game_uptalkcomment";
  e.Login_AuthUser = "login_authuser";
  e.Login_AuthUserSingle = "login_authusersingle";
  e.Login_CheckAccount = "login_checkaccount";
  e.Login_CreateAccount = "login_createaccount";
  e.Login_GetAppUpdateInfo = "login_getappupdateinfo";
  e.Login_GMAuthUserSingle = "login_gmauthusersingle";
  e.Login_SelectServer = "login_selectserver";
  e.OIM_DelConversation = "oim_delconversation";
  e.OIM_GetConversationList = "oim_getconversationlist";
  e.OIM_GetHistory = "oim_gethistory";
  e.OIM_SendMsg = "oim_sendmsg";
  e.Room_ChangeCustom = "room_changecustom";
  e.Room_ChangeMemberGroup = "room_changemembergroup";
  e.Room_Create = "room_create";
  e.Room_Dismiss = "room_dismiss";
  e.Room_Enter = "room_enter";
  e.Room_Join = "room_join";
  e.Room_Leave = "room_leave";
  e.Room_List = "room_list";
  e.Room_Lock = "room_lock";
  e.Room_MasterJoin = "room_masterjoin";
  e.Room_Msg = "room_msg";
  e.Room_Ping = "room_ping";
  e.Room_SendFrameMsg = "room_sendframemsg";
  e.Room_Start = "room_start";
  e.Room_StartFrameSync = "room_startframesync";
  e.Room_Stop = "room_stop";
  e.Room_StopFrameSync = "room_stopframesync";
  e.Room_Unlock = "room_unlock";
})(o.CMDS || (exports.CMDS = {}));
(function (e) {
  e.Account_SetPasswordR = "Account_SetPasswordR";
  e.Game_RAddCoinByAdvert = "Game_RAddCoinByAdvert";
  e.Game_RAddCoinByShareVideo = "Game_RAddCoinByShareVideo";
  e.Game_RAddGameTage = "Game_RAddGameTage";
  e.Game_RAddOtherCoinByAdvert = "Game_RAddOtherCoinByAdvert";
  e.Game_RAdminGetGameMsgByReviewId = "Game_RAdminGetGameMsgByReviewId";
  e.Game_RAdminSetGameStatus = "Game_RAdminSetGameStatus";
  e.Game_RBindRole = "Game_RBindRole";
  e.Game_RBuyGoods = "Game_RBuyGoods";
  e.Game_RCancelCollectionGames = "Game_RCancelCollectionGames";
  e.Game_RCancelCollectionGoods = "Game_RCancelCollectionGoods";
  e.Game_RCancelCollectionTalk = "Game_RCancelCollectionTalk";
  e.Game_RCancelDownTalk = "Game_RCancelDownTalk";
  e.Game_RCancelFollowUser = "Game_RCancelFollowUser";
  e.Game_RCancelThumbGameComment = "Game_RCancelThumbGameComment";
  e.Game_RCancelThumbGames = "Game_RCancelThumbGames";
  e.Game_RCancelThumbTalk = "Game_RCancelThumbTalk";
  e.Game_RCancelThumbTalkComment = "Game_RCancelThumbTalkComment";
  e.Game_RCancelUpTalk = "Game_RCancelUpTalk";
  e.Game_RClearNewComment = "Game_RClearNewComment";
  e.Game_RClearNewFans = "Game_RClearNewFans";
  e.Game_RClearNewMsg = "Game_RClearNewMsg";
  e.Game_RClearReportGame = "Game_RClearReportGame";
  e.Game_RClearReportGameComment = "Game_RClearReportGameComment";
  e.Game_RClearReportGoods = "Game_RClearReportGoods";
  e.Game_RClearReportPlayer = "Game_RClearReportPlayer";
  e.Game_RClearReportTalk = "Game_RClearReportTalk";
  e.Game_RClearReportTalkComment = "Game_RClearReportTalkComment";
  e.Game_RClickRecommendsGames = "Game_RClickRecommendsGames";
  e.Game_RCollectionGames = "Game_RCollectionGames";
  e.Game_RCollectionGGoods = "Game_RCollectionGGoods";
  e.Game_RCollectionTalk = "Game_RCollectionTalk";
  e.Game_RCommentGame = "Game_RCommentGame";
  e.Game_RCommentTalk = "Game_RCommentTalk";
  e.Game_RCostCoinInGame = "Game_RCostCoinInGame";
  e.Game_RCostCoinRecommendGame = "Game_RCostCoinRecommendGame";
  e.Game_RCreateOfficialTalk = "Game_RCreateOfficialTalk";
  e.Game_RCreateTalk = "Game_RCreateTalk";
  e.Game_RDealWithReportGameComment = "Game_RDealWithReportGameComment";
  e.Game_RDealWithReportGoods = "Game_RDealWithReportGoods";
  e.Game_RDealWithReportPlayer = "Game_RDealWithReportPlayer";
  e.Game_RDebugGetRecommendGameMsg = "Game_RDebugGetRecommendGameMsg";
  e.Game_RDelActorGroups = "Game_RDelActorGroups";
  e.Game_RDelCustomColors = "Game_RDelCustomColors";
  e.Game_RDeleteGameRankScore = "Game_RDeleteGameRankScore";
  e.Game_RDeleteTalk = "Game_RDeleteTalk";
  e.Game_RDelGameComment = "Game_RDelGameComment";
  e.Game_RDelGameRank = "Game_RDelGameRank";
  e.Game_RDelGameShop = "Game_RDelGameShop";
  e.Game_RDelReleaseGameRank = "Game_RDelReleaseGameRank";
  e.Game_RDelRoleActorConf = "Game_RDelRoleActorConf";
  e.Game_RDelRoleBulletConf = "Game_RDelRoleBulletConf";
  e.Game_RDelRoleCreativeConf = "Game_RDelRoleCreativeConf";
  e.Game_RDelRoleDeviceConf = "Game_RDelRoleDeviceConf";
  e.Game_RDelRoleGameData = "Game_RDelRoleGameData";
  e.Game_RDelRolePropConf = "Game_RDelRolePropConf";
  e.Game_RDelRoleTileConf = "Game_RDelRoleTileConf";
  e.Game_RDelRoleWeaponConf = "Game_RDelRoleWeaponConf";
  e.Game_RDelTalkChosen = "Game_RDelTalkChosen";
  e.Game_RDelTalkComment = "Game_RDelTalkComment";
  e.Game_RDelTalkCommentTop = "Game_RDelTalkCommentTop";
  e.Game_RDelTalkTop = "Game_RDelTalkTop";
  e.Game_RDelVariable = "Game_RDelVariable";
  e.Game_RDelWorldData = "Game_RDelWorldData";
  e.Game_RDownTalk = "Game_RDownTalk";
  e.Game_RDownTalkComment = "Game_RDownTalkComment";
  e.Game_RFollowUser = "Game_RFollowUser";
  e.Game_RGameStatusNotify = "Game_RGameStatusNotify";
  e.Game_RGetAggregateMsgList = "Game_RGetAggregateMsgList";
  e.Game_RGetBeReportGameData = "Game_RGetBeReportGameData";
  e.Game_RGetBindRoleMsg = "Game_RGetBindRoleMsg";
  e.Game_RGetChosenGoodsIds = "Game_RGetChosenGoodsIds";
  e.Game_RGetCostCoinRecommendGames = "Game_RGetCostCoinRecommendGames";
  e.Game_RGetCreativeRank = "Game_RGetCreativeRank";
  e.Game_RGetFans = "Game_RGetFans";
  e.Game_RGetFollow = "Game_RGetFollow";
  e.Game_RGetGameDetail = "Game_RGetGameDetail";
  e.Game_RGetGameIdListByGameTag = "Game_RGetGameIdListByGameTag";
  e.Game_RGetGameRank = "Game_RGetGameRank";
  e.Game_RGetGameShop = "Game_RGetGameShop";
  e.Game_RGetGameShopIds = "Game_RGetGameShopIds";
  e.Game_RGetGiftDynCfg = "Game_RGetGiftDynCfg";
  e.Game_RGetGiftRankData = "Game_RGetGiftRankData";
  e.Game_RGetGoodsIds = "Game_RGetGoodsIds";
  e.Game_RGetGoodsInfos = "Game_RGetGoodsInfos";
  e.Game_RGetHomepageFollowUserGames = "Game_RGetHomepageFollowUserGames";
  e.Game_RGetHomepageGameData = "Game_RGetHomepageGameData";
  e.Game_RGetHomepageNewGames = "Game_RGetHomepageNewGames";
  e.Game_RGetHomepageRecommendsGames = "Game_RGetHomepageRecommendsGames";
  e.Game_RGetManualReportSensitiveImg = "Game_RGetManualReportSensitiveImg";
  e.Game_RGetMsgList = "Game_RGetMsgList";
  e.Game_RGetNeedReviewImageList = "Game_RGetNeedReviewImageList";
  e.Game_RGetNewCommentList = "Game_RGetNewCommentList";
  e.Game_RGetNewCommentListV2 = "Game_RGetNewCommentListV2";
  e.Game_RGetNewGameIdList = "Game_RGetNewGameIdList";
  e.Game_RGetNewGameList = "Game_RGetNewGameList";
  e.Game_RGetNewGoods = "Game_RGetNewGoods";
  e.Game_RGetOneDynamicConfig = "Game_RGetOneDynamicConfig";
  e.Game_RGetOwnGoodsInfos = "Game_RGetOwnGoodsInfos";
  e.Game_RGetPlayGameStatistics = "Game_RGetPlayGameStatistics";
  e.Game_RGetRecommendGameIdList = "Game_RGetRecommendGameIdList";
  e.Game_RGetRecommendGoodsIdList = "Game_RGetRecommendGoodsIdList";
  e.Game_RGetReleaseGameRank = "Game_RGetReleaseGameRank";
  e.Game_RGetReportGameCommentList = "Game_RGetReportGameCommentList";
  e.Game_RGetReportGameList = "Game_RGetReportGameList";
  e.Game_RGetReportGoodsList = "Game_RGetReportGoodsList";
  e.Game_RGetReportPlayerList = "Game_RGetReportPlayerList";
  e.Game_RGetReportSensitiveImg = "Game_RGetReportSensitiveImg";
  e.Game_RGetReportTalkCommentList = "Game_RGetReportTalkCommentList";
  e.Game_RGetReportTalkList = "Game_RGetReportTalkList";
  e.Game_RGetReviewGameData = "Game_RGetReviewGameData";
  e.Game_RGetRoleActorConf = "Game_RGetRoleActorConf";
  e.Game_RGetRoleActorIds = "Game_RGetRoleActorIds";
  e.Game_RGetRoleBulletConf = "Game_RGetRoleBulletConf";
  e.Game_RGetRoleBulletIds = "Game_RGetRoleBulletIds";
  e.Game_RGetRoleCreativeConf = "Game_RGetRoleCreativeConf";
  e.Game_RGetRoleDeviceConf = "Game_RGetRoleDeviceConf";
  e.Game_RGetRoleDeviceIds = "Game_RGetRoleDeviceIds";
  e.Game_RGetRoleGameData = "Game_RGetRoleGameData";
  e.Game_RGetRoleGameIds = "Game_RGetRoleGameIds";
  e.Game_RGetRoleGiftRankData = "Game_RGetRoleGiftRankData";
  e.Game_RGetRolePropConf = "Game_RGetRolePropConf";
  e.Game_RGetRolePropIds = "Game_RGetRolePropIds";
  e.Game_RGetRoleTileConf = "Game_RGetRoleTileConf";
  e.Game_RGetRoleTileIds = "Game_RGetRoleTileIds";
  e.Game_RGetRoleWeaponConf = "Game_RGetRoleWeaponConf";
  e.Game_RGetRoleWeaponIds = "Game_RGetRoleWeaponIds";
  e.Game_RGetSimpleGoods = "Game_RGetSimpleGoods";
  e.Game_RGetSourceCreativeGameRank = "Game_RGetSourceCreativeGameRank";
  e.Game_RGetThumbGameComment = "Game_RGetThumbGameComment";
  e.Game_RGetThumbTalkComment = "Game_RGetThumbTalkComment";
  e.Game_RGetUserCreditMsg = "Game_RGetUserCreditMsg";
  e.Game_RGetUserDetailMsg = "Game_RGetUserDetailMsg";
  e.Game_RGetUserSimpleMsg = "Game_RGetUserSimpleMsg";
  e.Game_RGetVariable = "Game_RGetVariable";
  e.Game_RGetVariableIds = "Game_RGetVariableIds";
  e.Game_RGetWorldData = "Game_RGetWorldData";
  e.Game_RGetWorldDataIds = "Game_RGetWorldDataIds";
  e.Game_RGMBindRole = "Game_RGMBindRole";
  e.Game_RGMIncOtherCoin = "Game_RGMIncOtherCoin";
  e.Game_RGMRevokeBindRole = "Game_RGMRevokeBindRole";
  e.Game_RGMSetGameTage = "Game_RGMSetGameTage";
  e.Game_RGoodsStatusNotify = "Game_RGoodsStatusNotify";
  e.Game_RHurryGames = "Game_RHurryGames";
  e.Game_RIncCreditScore = "Game_RIncCreditScore";
  e.Game_RLoadFirstLevelGameComment = "Game_RLoadFirstLevelGameComment";
  e.Game_RLoadFirstLevelTalkComment = "Game_RLoadFirstLevelTalkComment";
  e.Game_RLoadGameComment = "Game_RLoadGameComment";
  e.Game_RLoadGameSubComment = "Game_RLoadGameSubComment";
  e.Game_RLoadOwnTalk = "Game_RLoadOwnTalk";
  e.Game_RLoadOwnTalkComment = "Game_RLoadOwnTalkComment";
  e.Game_RLoadTalk = "Game_RLoadTalk";
  e.Game_RLoadTalkByIdList = "Game_RLoadTalkByIdList";
  e.Game_RLoadTalkComment = "Game_RLoadTalkComment";
  e.Game_RLoadTalkDetail = "Game_RLoadTalkDetail";
  e.Game_RLoadTalkSubComment = "Game_RLoadTalkSubComment";
  e.Game_RLogin = "Game_RLogin";
  e.Game_RModifyOfficialTalk = "Game_RModifyOfficialTalk";
  e.Game_RModifyTalk = "Game_RModifyTalk";
  e.Game_RModifyTalkComment = "Game_RModifyTalkComment";
  e.Game_RNewSearchGoods = "Game_RNewSearchGoods";
  e.Game_RObtainTTCoin0319 = "Game_RObtainTTCoin0319";
  e.Game_ROffGame = "Game_ROffGame";
  e.Game_ROffGoods = "Game_ROffGoods";
  e.Game_ROfficialDeleteTalk = "Game_ROfficialDeleteTalk";
  e.Game_ROwnOffGame = "Game_ROwnOffGame";
  e.Game_RPlayGames = "Game_RPlayGames";
  e.Game_RPlayGameStatistics = "Game_RPlayGameStatistics";
  e.Game_RPublishGame = "Game_RPublishGame";
  e.Game_RReplyTalkComment = "Game_RReplyTalkComment";
  e.Game_RReportBugMsg = "Game_RReportBugMsg";
  e.Game_RReportGame = "Game_RReportGame";
  e.Game_RReportGameClick = "Game_RReportGameClick";
  e.Game_RReportGameComment = "Game_RReportGameComment";
  e.Game_RReportGameShow = "Game_RReportGameShow";
  e.Game_RReportGoods = "Game_RReportGoods";
  e.Game_RReportGoodsClick = "Game_RReportGoodsClick";
  e.Game_RReportGoodsShow = "Game_RReportGoodsShow";
  e.Game_RReportPlayer = "Game_RReportPlayer";
  e.Game_RReportTalk = "Game_RReportTalk";
  e.Game_RReportTalkComment = "Game_RReportTalkComment";
  e.Game_RResetBannerGames = "Game_RResetBannerGames";
  e.Game_RResetChosenGames = "Game_RResetChosenGames";
  e.Game_RResetChosenGoods = "Game_RResetChosenGoods";
  e.Game_RReviewGame = "Game_RReviewGame";
  e.Game_RRevokeReportGame = "Game_RRevokeReportGame";
  e.Game_RRevokeReportGameComment = "Game_RRevokeReportGameComment";
  e.Game_RRevokeReportGoods = "Game_RRevokeReportGoods";
  e.Game_RRevokeReportPlayer = "Game_RRevokeReportPlayer";
  e.Game_RRoleNewUserImgNotify = "Game_RRoleNewUserImgNotify";
  e.Game_RSaveActorGroups = "Game_RSaveActorGroups";
  e.Game_RSaveAllCustomColors = "Game_RSaveAllCustomColors";
  e.Game_RSaveAllVariable = "Game_RSaveAllVariable";
  e.Game_RSaveCustomColors = "Game_RSaveCustomColors";
  e.Game_RSaveGameRank = "Game_RSaveGameRank";
  e.Game_RSaveGameShop = "Game_RSaveGameShop";
  e.Game_RSaveGuide = "Game_RSaveGuide";
  e.Game_RSaveRoleActorConf = "Game_RSaveRoleActorConf";
  e.Game_RSaveRoleBulletConf = "Game_RSaveRoleBulletConf";
  e.Game_RSaveRoleCreativeConf = "Game_RSaveRoleCreativeConf";
  e.Game_RSaveRoleDeviceConf = "Game_RSaveRoleDeviceConf";
  e.Game_RSaveRoleGameData = "Game_RSaveRoleGameData";
  e.Game_RSaveRolePropConf = "Game_RSaveRolePropConf";
  e.Game_RSaveRoleTileConf = "Game_RSaveRoleTileConf";
  e.Game_RSaveRoleWeaponConf = "Game_RSaveRoleWeaponConf";
  e.Game_RSaveVariable = "Game_RSaveVariable";
  e.Game_RSaveWorldData = "Game_RSaveWorldData";
  e.Game_RSearchGame = "Game_RSearchGame";
  e.Game_RSearchGameByTag = "Game_RSearchGameByTag";
  e.Game_RSearchGoods = "Game_RSearchGoods";
  e.Game_RSearchRole = "Game_RSearchRole";
  e.Game_RSearchTalk = "Game_RSearchTalk";
  e.Game_RSendGift = "Game_RSendGift";
  e.Game_RSensitiveMsg = "Game_RSensitiveMsg";
  e.Game_RSetTalkChosen = "Game_RSetTalkChosen";
  e.Game_RSetTalkCommentTop = "Game_RSetTalkCommentTop";
  e.Game_RSetTalkTop = "Game_RSetTalkTop";
  e.Game_RTalkCommentStatusNotify = "Game_RTalkCommentStatusNotify";
  e.Game_RTalkStatusNotify = "Game_RTalkStatusNotify";
  e.Game_RThumbGameComment = "Game_RThumbGameComment";
  e.Game_RThumbGames = "Game_RThumbGames";
  e.Game_RThumbTalk = "Game_RThumbTalk";
  e.Game_RThumbTalkComment = "Game_RThumbTalkComment";
  e.Game_RUpdateUserImg = "Game_RUpdateUserImg";
  e.Game_RUpdateUserInfo = "Game_RUpdateUserInfo";
  e.Game_RUploadGameRankScore = "Game_RUploadGameRankScore";
  e.Game_RUploadGoods = "Game_RUploadGoods";
  e.Game_RUploadImage = "Game_RUploadImage";
  e.Game_RUploadReleaseGame = "Game_RUploadReleaseGame";
  e.Game_RUploadTakeExamScore = "Game_RUploadTakeExamScore";
  e.Game_RUpTalk = "Game_RUpTalk";
  e.Game_RUpTalkComment = "Game_RUpTalkComment";
  e.Game_SubGameListR = "Game_SubGameListR";
  e.Login_CheckAccountR = "Login_CheckAccountR";
  e.Login_CreateAccountR = "Login_CreateAccountR";
  e.Login_RAuthUser = "Login_RAuthUser";
  e.Login_RAuthUserSingle = "Login_RAuthUserSingle";
  e.Login_RGetAppUpdateInfo = "Login_RGetAppUpdateInfo";
  e.Login_RSelectServer = "Login_RSelectServer";
  e.OIM_GetConversationListResp = "OIM_GetConversationListResp";
  e.OIM_GetHistoryResp = "OIM_GetHistoryResp";
  e.OIMNewMsgNotify = "OIMNewMsgNotify";
  e.RespNone = "RespNone";
  e.RespSync = "RespSync";
  e.Room_CustomChangeP = "Room_CustomChangeP";
  e.Room_DismissP = "Room_DismissP";
  e.Room_FrameMsgP = "Room_FrameMsgP";
  e.Room_FrameSyncStartP = "Room_FrameSyncStartP";
  e.Room_FrameSyncStopP = "Room_FrameSyncStopP";
  e.Room_ListR = "Room_ListR";
  e.Room_LockP = "Room_LockP";
  e.Room_MemberGroupChangeP = "Room_MemberGroupChangeP";
  e.Room_MemberJoinP = "Room_MemberJoinP";
  e.Room_MemberLeaveP = "Room_MemberLeaveP";
  e.Room_MsgP = "Room_MsgP";
  e.Room_PingR = "Room_PingR";
  e.Room_REnter = "Room_REnter";
  e.Room_Resp = "Room_Resp";
  e.Room_StartFailP = "Room_StartFailP";
  e.Room_StartingP = "Room_StartingP";
  e.Room_StartP = "Room_StartP";
  e.Room_StopP = "Room_StopP";
  e.Room_UnlockP = "Room_UnlockP";
})(o.RESPS || (exports.RESPS = {}));
const se = orange.type,
  re = orange.DataBase;
exports.Account_SetPasswordR = class extends re {};
class le extends re {
  constructor() {
    super(...arguments);
    this.coin = 0;
    this.addCoinByAdvertCnt = 0;
    this.addCoinByAdvertLimit = 0;
    this.addCoinByAdvertReset = 0;
  }
}
i([se(0)], le.prototype, "coin", void 0);
i([se(0)], le.prototype, "addCoinByAdvertCnt", void 0);
i([se(0)], le.prototype, "addCoinByAdvertLimit", void 0);
i([se(0)], le.prototype, "addCoinByAdvertReset", void 0);
exports.Game_RAddCoinByAdvert = le;
class ce extends re {
  constructor() {
    super(...arguments);
    this.coin = 0;
  }
}
i([se(0)], ce.prototype, "coin", void 0);
exports.Game_RAddCoinByShareVideo = ce;
class de extends re {
  constructor() {
    super(...arguments);
    this.code = 0;
    this.gameID = "";
    this.sensitiveWords = new Array();
  }
}
i([se(0)], de.prototype, "code", void 0);
i([se(0)], de.prototype, "gameID", void 0);
i([se(2)], de.prototype, "sensitiveWords", void 0);
exports.Game_RAddGameTage = de;
class he extends re {
  constructor() {
    super(...arguments);
    this.coin = 0;
    this.addCoinByAdvertCnt = 0;
    this.addCoinByAdvertLimit = 0;
    this.addCoinByAdvertReset = 0;
  }
}
i([se(0)], he.prototype, "coin", void 0);
i([se(0)], he.prototype, "addCoinByAdvertCnt", void 0);
i([se(0)], he.prototype, "addCoinByAdvertLimit", void 0);
i([se(0)], he.prototype, "addCoinByAdvertReset", void 0);
exports.Game_RAddOtherCoinByAdvert = he;
class pe extends re {
  constructor() {
    super(...arguments);
    this.gameData = new D.GameCellData();
  }
}
i([se(1, D.GameCellData)], pe.prototype, "gameData", void 0);
exports.Game_RAdminGetGameMsgByReviewId = pe;
class ue extends re {
  constructor() {
    super(...arguments);
    this.gameData = new D.GameCellData();
  }
}
i([se(1, D.GameCellData)], ue.prototype, "gameData", void 0);
exports.Game_RAdminSetGameStatus = ue;
class me extends re {
  constructor() {
    super(...arguments);
    this.errorCode = 0;
  }
}
i([se(0)], me.prototype, "errorCode", void 0);
exports.Game_RBindRole = me;
class fe extends re {
  constructor() {
    super(...arguments);
    this.id = "";
    this.tileConfs = new Array();
    this.actorConfs = new Array();
    this.deviceConfs = new Array();
    this.propConfs = new Array();
    this.weaponConfs = new Array();
    this.bulletConfs = new Array();
    this.bulletMap = new Map();
  }
}
i([se(0)], fe.prototype, "id", void 0);
i([se(2, te.TileConf)], fe.prototype, "tileConfs", void 0);
i([se(2, n.ActorConf)], fe.prototype, "actorConfs", void 0);
i([se(2, h.DeviceConf)], fe.prototype, "deviceConfs", void 0);
i([se(2, V.PropConf)], fe.prototype, "propConfs", void 0);
i([se(2, ae.WeaponConf)], fe.prototype, "weaponConfs", void 0);
i([se(2, r.BulletConf)], fe.prototype, "bulletConfs", void 0);
i([se(5)], fe.prototype, "bulletMap", void 0);
exports.Game_RBuyGoods = fe;
class ge extends re {
  constructor() {
    super(...arguments);
    this.ids = new Array();
  }
}
i([se(2)], ge.prototype, "ids", void 0);
exports.Game_RCancelCollectionGames = ge;
class ye extends re {
  constructor() {
    super(...arguments);
    this.ids = new Array();
  }
}
i([se(2)], ye.prototype, "ids", void 0);
exports.Game_RCancelCollectionGoods = ye;
class ve extends re {
  constructor() {
    super(...arguments);
    this.code = 0;
    this.iD = "";
  }
}
i([se(0)], ve.prototype, "code", void 0);
i([se(0)], ve.prototype, "iD", void 0);
exports.Game_RCancelCollectionTalk = ve;
class Ce extends re {
  constructor() {
    super(...arguments);
    this.upCnt = 0;
  }
}
i([se(0)], Ce.prototype, "upCnt", void 0);
exports.Game_RCancelDownTalk = Ce;
class _e extends re {
  constructor() {
    super(...arguments);
    this.followId = 0;
  }
}
i([se(0)], _e.prototype, "followId", void 0);
exports.Game_RCancelFollowUser = _e;
class Se extends re {
  constructor() {
    super(...arguments);
    this.thumbCnt = 0;
  }
}
i([se(0)], Se.prototype, "thumbCnt", void 0);
exports.Game_RCancelThumbGameComment = Se;
class Ie extends re {
  constructor() {
    super(...arguments);
    this.ids = new Array();
  }
}
i([se(2)], Ie.prototype, "ids", void 0);
exports.Game_RCancelThumbGames = Ie;
class Ge extends re {
  constructor() {
    super(...arguments);
    this.thumbCnt = 0;
  }
}
i([se(0)], Ge.prototype, "thumbCnt", void 0);
exports.Game_RCancelThumbTalk = Ge;
class Te extends re {
  constructor() {
    super(...arguments);
    this.thumbCnt = 0;
  }
}
i([se(0)], Te.prototype, "thumbCnt", void 0);
exports.Game_RCancelThumbTalkComment = Te;
class be extends re {
  constructor() {
    super(...arguments);
    this.upCnt = 0;
  }
}
i([se(0)], be.prototype, "upCnt", void 0);
exports.Game_RCancelUpTalk = be;
exports.Game_RClearNewComment = class extends re {};
exports.Game_RClearNewFans = class extends re {};
exports.Game_RClearNewMsg = class extends re {};
exports.Game_RClearReportGame = class extends re {};
exports.Game_RClearReportGameComment = class extends re {};
exports.Game_RClearReportGoods = class extends re {};
exports.Game_RClearReportPlayer = class extends re {};
exports.Game_RClearReportTalk = class extends re {};
exports.Game_RClearReportTalkComment = class extends re {};
class Me extends re {
  constructor() {
    super(...arguments);
    this.id = "";
    this.clickCnt = 0;
  }
}
i([se(0)], Me.prototype, "id", void 0);
i([se(0)], Me.prototype, "clickCnt", void 0);
exports.Game_RClickRecommendsGames = Me;
class Pe extends re {
  constructor() {
    super(...arguments);
    this.ids = new Array();
  }
}
i([se(2)], Pe.prototype, "ids", void 0);
exports.Game_RCollectionGames = Pe;
class De extends re {
  constructor() {
    super(...arguments);
    this.ids = new Array();
  }
}
i([se(2)], De.prototype, "ids", void 0);
exports.Game_RCollectionGGoods = De;
class we extends re {
  constructor() {
    super(...arguments);
    this.code = 0;
    this.iD = "";
  }
}
i([se(0)], we.prototype, "code", void 0);
i([se(0)], we.prototype, "iD", void 0);
exports.Game_RCollectionTalk = we;
class Be extends re {
  constructor() {
    super(...arguments);
    this.code = 0;
    this.sensitiveWords = new Array();
    this.comment = new w.GameComment();
  }
}
i([se(0)], Be.prototype, "code", void 0);
i([se(2)], Be.prototype, "sensitiveWords", void 0);
i([se(1, w.GameComment)], Be.prototype, "comment", void 0);
exports.Game_RCommentGame = Be;
class Re extends re {
  constructor() {
    super(...arguments);
    this.code = 0;
    this.sensitiveWords = new Array();
    this.comment = new Q.TalkComment();
  }
}
i([se(0)], Re.prototype, "code", void 0);
i([se(2)], Re.prototype, "sensitiveWords", void 0);
i([se(1, Q.TalkComment)], Re.prototype, "comment", void 0);
exports.Game_RCommentTalk = Re;
class xe extends re {
  constructor() {
    super(...arguments);
    this.curCoin = 0;
  }
}
i([se(0)], xe.prototype, "curCoin", void 0);
exports.Game_RCostCoinInGame = xe;
class Le extends re {
  constructor() {
    super(...arguments);
    this.errorCode = 0;
  }
}
i([se(0)], Le.prototype, "errorCode", void 0);
exports.Game_RCostCoinRecommendGame = Le;
class ke extends re {
  constructor() {
    super(...arguments);
    this.code = 0;
    this.sensitiveWords = new Array();
    this.talkData = new ee.TalkData();
  }
}
i([se(0)], ke.prototype, "code", void 0);
i([se(2)], ke.prototype, "sensitiveWords", void 0);
i([se(1, ee.TalkData)], ke.prototype, "talkData", void 0);
exports.Game_RCreateOfficialTalk = ke;
class Fe extends re {
  constructor() {
    super(...arguments);
    this.code = 0;
    this.sensitiveWords = new Array();
    this.talkData = new ee.TalkData();
  }
}
i([se(0)], Fe.prototype, "code", void 0);
i([se(2)], Fe.prototype, "sensitiveWords", void 0);
i([se(1, ee.TalkData)], Fe.prototype, "talkData", void 0);
exports.Game_RCreateTalk = Fe;
class Ne extends re {
  constructor() {
    super(...arguments);
    this.id = "";
  }
}
i([se(0)], Ne.prototype, "id", void 0);
exports.Game_RDealWithReportGameComment = Ne;
class Ae extends re {
  constructor() {
    super(...arguments);
    this.id = "";
  }
}
i([se(0)], Ae.prototype, "id", void 0);
exports.Game_RDealWithReportGoods = Ae;
class Oe extends re {
  constructor() {
    super(...arguments);
    this.id = 0;
  }
}
i([se(0)], Oe.prototype, "id", void 0);
exports.Game_RDealWithReportPlayer = Oe;
class Ue extends re {
  constructor() {
    super(...arguments);
    this.allStartupRecommendLeftCnt = 0;
    this.allPastRecommendLeftCnt = 0;
    this.allStartupHadRecommendCount = 0;
    this.allPastHadRecommendCount = 0;
    this.allHadRecommendCount = 0;
    this.allNeedRecommendCount = 0;
    this.lastRecommendScala = 0;
  }
}
i([se(0)], Ue.prototype, "allStartupRecommendLeftCnt", void 0);
i([se(0)], Ue.prototype, "allPastRecommendLeftCnt", void 0);
i([se(0)], Ue.prototype, "allStartupHadRecommendCount", void 0);
i([se(0)], Ue.prototype, "allPastHadRecommendCount", void 0);
i([se(0)], Ue.prototype, "allHadRecommendCount", void 0);
i([se(0)], Ue.prototype, "allNeedRecommendCount", void 0);
i([se(0)], Ue.prototype, "lastRecommendScala", void 0);
exports.Game_RDebugGetRecommendGameMsg = Ue;
exports.Game_RDelActorGroups = class extends re {};
exports.Game_RDelCustomColors = class extends re {};
exports.Game_RDeleteGameRankScore = class extends re {};
class Ee extends re {
  constructor() {
    super(...arguments);
    this.code = 0;
  }
}
i([se(0)], Ee.prototype, "code", void 0);
exports.Game_RDeleteTalk = Ee;
class je extends re {
  constructor() {
    super(...arguments);
    this.commentId = "";
  }
}
i([se(0)], je.prototype, "commentId", void 0);
exports.Game_RDelGameComment = je;
class He extends re {
  constructor() {
    super(...arguments);
    this.ids = new Array();
  }
}
i([se(2)], He.prototype, "ids", void 0);
exports.Game_RDelGameRank = He;
class We extends re {
  constructor() {
    super(...arguments);
    this.ids = new Array();
  }
}
i([se(2)], We.prototype, "ids", void 0);
exports.Game_RDelGameShop = We;
class Ve extends re {
  constructor() {
    super(...arguments);
    this.ids = new Array();
  }
}
i([se(2)], Ve.prototype, "ids", void 0);
exports.Game_RDelReleaseGameRank = Ve;
class Ke extends re {
  constructor() {
    super(...arguments);
    this.ids = new Array();
  }
}
i([se(2)], Ke.prototype, "ids", void 0);
exports.Game_RDelRoleActorConf = Ke;
class Je extends re {
  constructor() {
    super(...arguments);
    this.ids = new Array();
  }
}
i([se(2)], Je.prototype, "ids", void 0);
exports.Game_RDelRoleBulletConf = Je;
class Ze extends re {
  constructor() {
    super(...arguments);
    this.gameId = "";
    this.confId = "";
  }
}
i([se(0)], Ze.prototype, "gameId", void 0);
i([se(0)], Ze.prototype, "confId", void 0);
exports.Game_RDelRoleCreativeConf = Ze;
class ze extends re {
  constructor() {
    super(...arguments);
    this.ids = new Array();
  }
}
i([se(2)], ze.prototype, "ids", void 0);
exports.Game_RDelRoleDeviceConf = ze;
class Xe extends re {
  constructor() {
    super(...arguments);
    this.ids = new Array();
  }
}
i([se(2)], Xe.prototype, "ids", void 0);
exports.Game_RDelRoleGameData = Xe;
class qe extends re {
  constructor() {
    super(...arguments);
    this.ids = new Array();
  }
}
i([se(2)], qe.prototype, "ids", void 0);
exports.Game_RDelRolePropConf = qe;
class Ye extends re {
  constructor() {
    super(...arguments);
    this.ids = new Array();
  }
}
i([se(2)], Ye.prototype, "ids", void 0);
exports.Game_RDelRoleTileConf = Ye;
class $e extends re {
  constructor() {
    super(...arguments);
    this.ids = new Array();
  }
}
i([se(2)], $e.prototype, "ids", void 0);
exports.Game_RDelRoleWeaponConf = $e;
class Qe extends re {
  constructor() {
    super(...arguments);
    this.code = 0;
  }
}
i([se(0)], Qe.prototype, "code", void 0);
exports.Game_RDelTalkChosen = Qe;
class et extends re {
  constructor() {
    super(...arguments);
    this.commentId = "";
  }
}
i([se(0)], et.prototype, "commentId", void 0);
exports.Game_RDelTalkComment = et;
class tt extends re {
  constructor() {
    super(...arguments);
    this.code = 0;
  }
}
i([se(0)], tt.prototype, "code", void 0);
exports.Game_RDelTalkCommentTop = tt;
class ot extends re {
  constructor() {
    super(...arguments);
    this.code = 0;
  }
}
i([se(0)], ot.prototype, "code", void 0);
exports.Game_RDelTalkTop = ot;
class it extends re {
  constructor() {
    super(...arguments);
    this.ids = new Array();
  }
}
i([se(2)], it.prototype, "ids", void 0);
exports.Game_RDelVariable = it;
class nt extends re {
  constructor() {
    super(...arguments);
    this.ids = new Array();
  }
}
i([se(2)], nt.prototype, "ids", void 0);
exports.Game_RDelWorldData = nt;
class at extends re {
  constructor() {
    super(...arguments);
    this.upCnt = 0;
  }
}
i([se(0)], at.prototype, "upCnt", void 0);
exports.Game_RDownTalk = at;
class st extends re {
  constructor() {
    super(...arguments);
    this.upCnt = 0;
  }
}
i([se(0)], st.prototype, "upCnt", void 0);
exports.Game_RDownTalkComment = st;
class rt extends re {
  constructor() {
    super(...arguments);
    this.followId = 0;
  }
}
i([se(0)], rt.prototype, "followId", void 0);
exports.Game_RFollowUser = rt;
class lt extends re {
  constructor() {
    super(...arguments);
    this.gameId = "";
    this.status = 0;
    this.offReason = new H.OffReason();
  }
}
i([se(0)], lt.prototype, "gameId", void 0);
i([se(0)], lt.prototype, "status", void 0);
i([se(1, H.OffReason)], lt.prototype, "offReason", void 0);
exports.Game_RGameStatusNotify = lt;
class ct extends re {
  constructor() {
    super(...arguments);
    this.newMsgCnt = 0;
    this.newAggregateMsgCnt = 0;
    this.aggregateMsgList = new Array();
  }
}
i([se(0)], ct.prototype, "newMsgCnt", void 0);
i([se(0)], ct.prototype, "newAggregateMsgCnt", void 0);
i([se(2, s.AggregateMsgData)], ct.prototype, "aggregateMsgList", void 0);
exports.Game_RGetAggregateMsgList = ct;
class dt extends re {
  constructor() {
    super(...arguments);
    this.gameDatas = new Array();
  }
}
i([se(2, D.GameCellData)], dt.prototype, "gameDatas", void 0);
exports.Game_RGetBeReportGameData = dt;
class ht extends re {
  constructor() {
    super(...arguments);
    this.code = "";
  }
}
i([se(0)], ht.prototype, "code", void 0);
exports.Game_RGetBindRoleMsg = ht;
class pt extends re {
  constructor() {
    super(...arguments);
    this.goodsIds = new Array();
    this.recommendGoodsIds = new Array();
  }
}
i([se(2)], pt.prototype, "goodsIds", void 0);
i([se(2)], pt.prototype, "recommendGoodsIds", void 0);
exports.Game_RGetChosenGoodsIds = pt;
class ut extends re {
  constructor() {
    super(...arguments);
    this.gameDatas = new Array();
  }
}
i([se(2, D.GameCellData)], ut.prototype, "gameDatas", void 0);
exports.Game_RGetCostCoinRecommendGames = ut;
class mt extends re {
  constructor() {
    super(...arguments);
    this.gameDatas = new Array();
    this.sourceReleaseGame = new g.GDReleaseGameData();
  }
}
i([se(2, g.GDReleaseGameData)], mt.prototype, "gameDatas", void 0);
i([se(1, g.GDReleaseGameData)], mt.prototype, "sourceReleaseGame", void 0);
exports.Game_RGetCreativeRank = mt;
class ft extends re {
  constructor() {
    super(...arguments);
    this.newFansCnt = 0;
    this.ids = new Array();
  }
}
i([se(0)], ft.prototype, "newFansCnt", void 0);
i([se(2)], ft.prototype, "ids", void 0);
exports.Game_RGetFans = ft;
class gt extends re {
  constructor() {
    super(...arguments);
    this.ids = new Array();
  }
}
i([se(2)], gt.prototype, "ids", void 0);
exports.Game_RGetFollow = gt;
class yt extends re {
  constructor() {
    super(...arguments);
    this.authorMsg = new C.GDRoleSimpleMsg();
    this.releaseGameData = new g.GDReleaseGameData();
    this.gameTopComment = new m.GDGameTopComment();
    this.creativeGameData = new c.CreativeGameData();
    this.rankList = new Array();
  }
}
i([se(1, C.GDRoleSimpleMsg)], yt.prototype, "authorMsg", void 0);
i([se(1, g.GDReleaseGameData)], yt.prototype, "releaseGameData", void 0);
i([se(1, m.GDGameTopComment)], yt.prototype, "gameTopComment", void 0);
i([se(1, c.CreativeGameData)], yt.prototype, "creativeGameData", void 0);
i([se(2, x.GameGiftRankScoreInfo)], yt.prototype, "rankList", void 0);
exports.Game_RGetGameDetail = yt;
class vt extends re {
  constructor() {
    super(...arguments);
    this.gameIdList = new Array();
  }
}
i([se(2)], vt.prototype, "gameIdList", void 0);
exports.Game_RGetGameIdListByGameTag = vt;
class Ct extends re {
  constructor() {
    super(...arguments);
    this.datas = new Array();
  }
}
i([se(2, L.GameRankConf)], Ct.prototype, "datas", void 0);
exports.Game_RGetGameRank = Ct;
class _t extends re {
  constructor() {
    super(...arguments);
    this.datas = new Array();
  }
}
i([se(2, k.GameShopConf)], _t.prototype, "datas", void 0);
exports.Game_RGetGameShop = _t;
class St extends re {
  constructor() {
    super(...arguments);
    this.ids = new Array();
  }
}
i([se(2)], St.prototype, "ids", void 0);
exports.Game_RGetGameShopIds = St;
class It extends re {
  constructor() {
    super(...arguments);
    this.cfg = new p.DynamicGameGift();
  }
}
i([se(1, p.DynamicGameGift)], It.prototype, "cfg", void 0);
exports.Game_RGetGiftDynCfg = It;
class Gt extends re {
  constructor() {
    super(...arguments);
    this.code = 0;
    this.rankType = 0;
    this.beginIndex = 0;
    this.rankList = new Array();
  }
}
i([se(0)], Gt.prototype, "code", void 0);
i([se(0)], Gt.prototype, "rankType", void 0);
i([se(0)], Gt.prototype, "beginIndex", void 0);
i([se(2, R.GameGiftRank)], Gt.prototype, "rankList", void 0);
exports.Game_RGetGiftRankData = Gt;
class Tt extends re {
  constructor() {
    super(...arguments);
    this.goodsIds = new Array();
    this.recommendGoodsIds = new Array();
    this.startMember = "";
  }
}
i([se(2)], Tt.prototype, "goodsIds", void 0);
i([se(2)], Tt.prototype, "recommendGoodsIds", void 0);
i([se(0)], Tt.prototype, "startMember", void 0);
exports.Game_RGetGoodsIds = Tt;
class bt extends re {
  constructor() {
    super(...arguments);
    this.goodsInfoList = new Array();
  }
}
i([se(2, f.GDGoodsInfo)], bt.prototype, "goodsInfoList", void 0);
exports.Game_RGetGoodsInfos = bt;
class Mt extends re {
  constructor() {
    super(...arguments);
    this.gameDatas = new Array();
  }
}
i([se(2, D.GameCellData)], Mt.prototype, "gameDatas", void 0);
exports.Game_RGetHomepageFollowUserGames = Mt;
class Pt extends re {
  constructor() {
    super(...arguments);
    this.gameDatas = new Array();
  }
}
i([se(2, D.GameCellData)], Pt.prototype, "gameDatas", void 0);
exports.Game_RGetHomepageGameData = Pt;
class Dt extends re {
  constructor() {
    super(...arguments);
    this.startMember = "";
    this.gameDatas = new Array();
  }
}
i([se(0)], Dt.prototype, "startMember", void 0);
i([se(2, D.GameCellData)], Dt.prototype, "gameDatas", void 0);
exports.Game_RGetHomepageNewGames = Dt;
class wt extends re {
  constructor() {
    super(...arguments);
    this.gameDatas = new Array();
  }
}
i([se(2, D.GameCellData)], wt.prototype, "gameDatas", void 0);
exports.Game_RGetHomepageRecommendsGames = wt;
class Bt extends re {
  constructor() {
    super(...arguments);
    this.sensitiveImgMsgList = new Array();
  }
}
i([se(2, Z.RoleManualSensitiveImgMsg)], Bt.prototype, "sensitiveImgMsgList", void 0);
exports.Game_RGetManualReportSensitiveImg = Bt;
class Rt extends re {
  constructor() {
    super(...arguments);
    this.newMsgCnt = 0;
    this.msgList = new Array();
  }
}
i([se(0)], Rt.prototype, "newMsgCnt", void 0);
i([se(2, O.MsgData)], Rt.prototype, "msgList", void 0);
exports.Game_RGetMsgList = Rt;
class xt extends re {
  constructor() {
    super(...arguments);
    this.needImageList = new Array();
  }
}
i([se(2)], xt.prototype, "needImageList", void 0);
exports.Game_RGetNeedReviewImageList = xt;
class Lt extends re {
  constructor() {
    super(...arguments);
    this.startIndex = 0;
    this.newCommentCnt = 0;
    this.commentList = new Array();
  }
}
i([se(0)], Lt.prototype, "startIndex", void 0);
i([se(0)], Lt.prototype, "newCommentCnt", void 0);
i([se(2, w.GameComment)], Lt.prototype, "commentList", void 0);
exports.Game_RGetNewCommentList = Lt;
class kt extends re {
  constructor() {
    super(...arguments);
    this.startIndex = 0;
    this.newCommentCnt = 0;
    this.commentList = new Array();
  }
}
i([se(0)], kt.prototype, "startIndex", void 0);
i([se(0)], kt.prototype, "newCommentCnt", void 0);
i([se(2, l.CommentMeData)], kt.prototype, "commentList", void 0);
exports.Game_RGetNewCommentListV2 = kt;
class Ft extends re {
  constructor() {
    super(...arguments);
    this.gameIdList = new Array();
    this.startMember = "";
  }
}
i([se(2)], Ft.prototype, "gameIdList", void 0);
i([se(0)], Ft.prototype, "startMember", void 0);
exports.Game_RGetNewGameIdList = Ft;
class Nt extends re {
  constructor() {
    super(...arguments);
    this.gameDatas = new Array();
    this.startMember = "";
  }
}
i([se(2, D.GameCellData)], Nt.prototype, "gameDatas", void 0);
i([se(0)], Nt.prototype, "startMember", void 0);
exports.Game_RGetNewGameList = Nt;
class At extends re {
  constructor() {
    super(...arguments);
    this.goodsInfoList = new Array();
    this.recommendGoods = new Array();
    this.startMember = "";
  }
}
i([se(2, N.GoodsCellData)], At.prototype, "goodsInfoList", void 0);
i([se(2, N.GoodsCellData)], At.prototype, "recommendGoods", void 0);
i([se(0)], At.prototype, "startMember", void 0);
exports.Game_RGetNewGoods = At;
class Ot extends re {
  constructor() {
    super(...arguments);
    this.dynamicConfig = {};
  }
}
i([se(0)], Ot.prototype, "dynamicConfig", void 0);
exports.Game_RGetOneDynamicConfig = Ot;
class Ut extends re {
  constructor() {
    super(...arguments);
    this.goodsInfoList = new Array();
  }
}
i([se(2, f.GDGoodsInfo)], Ut.prototype, "goodsInfoList", void 0);
exports.Game_RGetOwnGoodsInfos = Ut;
class Et extends re {
  constructor() {
    super(...arguments);
    this.gameDatas = new Array();
  }
}
i([se(2, F.GameStatisticsData)], Et.prototype, "gameDatas", void 0);
exports.Game_RGetPlayGameStatistics = Et;
class jt extends re {
  constructor() {
    super(...arguments);
    this.recommendList = new Array();
  }
}
i([se(2, W.PlatformRecommendData)], jt.prototype, "recommendList", void 0);
exports.Game_RGetRecommendGameIdList = jt;
class Ht extends re {
  constructor() {
    super(...arguments);
    this.recommendList = new Array();
  }
}
i([se(2, W.PlatformRecommendData)], Ht.prototype, "recommendList", void 0);
exports.Game_RGetRecommendGoodsIdList = Ht;
class Wt extends re {
  constructor() {
    super(...arguments);
    this.datas = new Array();
  }
}
i([se(2, K.ReleaseGameGameRank)], Wt.prototype, "datas", void 0);
exports.Game_RGetReleaseGameRank = Wt;
class Vt extends re {
  constructor() {
    super(...arguments);
    this.reportGameCommentList = new Array();
    this.reportScoreMap = new Map();
  }
}
i([se(2, w.GameComment)], Vt.prototype, "reportGameCommentList", void 0);
i([se(5)], Vt.prototype, "reportScoreMap", void 0);
exports.Game_RGetReportGameCommentList = Vt;
class Kt extends re {
  constructor() {
    super(...arguments);
    this.reportGameIdList = new Array();
    this.reportScoreMap = new Map();
  }
}
i([se(2)], Kt.prototype, "reportGameIdList", void 0);
i([se(5)], Kt.prototype, "reportScoreMap", void 0);
exports.Game_RGetReportGameList = Kt;
class Jt extends re {
  constructor() {
    super(...arguments);
    this.reportGoodsIdList = new Array();
    this.reportScoreMap = new Map();
  }
}
i([se(2)], Jt.prototype, "reportGoodsIdList", void 0);
i([se(5)], Jt.prototype, "reportScoreMap", void 0);
exports.Game_RGetReportGoodsList = Jt;
class Zt extends re {
  constructor() {
    super(...arguments);
    this.reportPlayerIdList = new Array();
    this.reportScoreMap = new Map();
  }
}
i([se(2)], Zt.prototype, "reportPlayerIdList", void 0);
i([se(5)], Zt.prototype, "reportScoreMap", void 0);
exports.Game_RGetReportPlayerList = Zt;
class zt extends re {
  constructor() {
    super(...arguments);
    this.sensitiveImgMsgList = new Array();
  }
}
i([se(2, X.RoleStatisticSensitiveImgMsg)], zt.prototype, "sensitiveImgMsgList", void 0);
exports.Game_RGetReportSensitiveImg = zt;
class Xt extends re {
  constructor() {
    super(...arguments);
    this.comments = new Array();
    this.reportScoreMap = new Map();
  }
}
i([se(2, Q.TalkComment)], Xt.prototype, "comments", void 0);
i([se(5)], Xt.prototype, "reportScoreMap", void 0);
exports.Game_RGetReportTalkCommentList = Xt;
class qt extends re {
  constructor() {
    super(...arguments);
    this.talkList = new Array();
    this.reportScoreMap = new Map();
  }
}
i([se(2, ee.TalkData)], qt.prototype, "talkList", void 0);
i([se(5)], qt.prototype, "reportScoreMap", void 0);
exports.Game_RGetReportTalkList = qt;
class Yt extends re {
  constructor() {
    super(...arguments);
    this.datas = new Array();
  }
}
i([se(2, z.RoleReviewGameData)], Yt.prototype, "datas", void 0);
exports.Game_RGetReviewGameData = Yt;
class $t extends re {
  constructor() {
    super(...arguments);
    this.datas = new Array();
  }
}
i([se(2, n.ActorConf)], $t.prototype, "datas", void 0);
exports.Game_RGetRoleActorConf = $t;
class Qt extends re {
  constructor() {
    super(...arguments);
    this.ids = new Array();
  }
}
i([se(2)], Qt.prototype, "ids", void 0);
exports.Game_RGetRoleActorIds = Qt;
class eo extends re {
  constructor() {
    super(...arguments);
    this.datas = new Array();
  }
}
i([se(2, r.BulletConf)], eo.prototype, "datas", void 0);
exports.Game_RGetRoleBulletConf = eo;
class to extends re {
  constructor() {
    super(...arguments);
    this.ids = new Array();
  }
}
i([se(2)], to.prototype, "ids", void 0);
exports.Game_RGetRoleBulletIds = to;
class oo extends re {
  constructor() {
    super(...arguments);
    this.confMap = new Map();
  }
}
i([se(5)], oo.prototype, "confMap", void 0);
exports.Game_RGetRoleCreativeConf = oo;
class io extends re {
  constructor() {
    super(...arguments);
    this.datas = new Array();
  }
}
i([se(2, h.DeviceConf)], io.prototype, "datas", void 0);
exports.Game_RGetRoleDeviceConf = io;
class no extends re {
  constructor() {
    super(...arguments);
    this.ids = new Array();
  }
}
i([se(2)], no.prototype, "ids", void 0);
exports.Game_RGetRoleDeviceIds = no;
class ao extends re {
  constructor() {
    super(...arguments);
    this.datas = new Array();
  }
}
i([se(2, B.GameData)], ao.prototype, "datas", void 0);
exports.Game_RGetRoleGameData = ao;
class so extends re {
  constructor() {
    super(...arguments);
    this.ids = new Array();
  }
}
i([se(2)], so.prototype, "ids", void 0);
exports.Game_RGetRoleGameIds = so;
class ro extends re {
  constructor() {
    super(...arguments);
    this.code = 0;
    this.score = 0;
    this.beginIndex = 0;
    this.rankList = new Array();
    this.checkerInfo = new x.GameGiftRankScoreInfo();
  }
}
i([se(0)], ro.prototype, "code", void 0);
i([se(0)], ro.prototype, "score", void 0);
i([se(0)], ro.prototype, "beginIndex", void 0);
i([se(2, x.GameGiftRankScoreInfo)], ro.prototype, "rankList", void 0);
i([se(1, x.GameGiftRankScoreInfo)], ro.prototype, "checkerInfo", void 0);
exports.Game_RGetRoleGiftRankData = ro;
class lo extends re {
  constructor() {
    super(...arguments);
    this.datas = new Array();
  }
}
i([se(2, V.PropConf)], lo.prototype, "datas", void 0);
exports.Game_RGetRolePropConf = lo;
class co extends re {
  constructor() {
    super(...arguments);
    this.ids = new Array();
  }
}
i([se(2)], co.prototype, "ids", void 0);
exports.Game_RGetRolePropIds = co;
class ho extends re {
  constructor() {
    super(...arguments);
    this.datas = new Array();
  }
}
i([se(2, te.TileConf)], ho.prototype, "datas", void 0);
exports.Game_RGetRoleTileConf = ho;
class po extends re {
  constructor() {
    super(...arguments);
    this.ids = new Array();
  }
}
i([se(2)], po.prototype, "ids", void 0);
exports.Game_RGetRoleTileIds = po;
class uo extends re {
  constructor() {
    super(...arguments);
    this.datas = new Array();
  }
}
i([se(2, ae.WeaponConf)], uo.prototype, "datas", void 0);
exports.Game_RGetRoleWeaponConf = uo;
class mo extends re {
  constructor() {
    super(...arguments);
    this.ids = new Array();
  }
}
i([se(2)], mo.prototype, "ids", void 0);
exports.Game_RGetRoleWeaponIds = mo;
class fo extends re {
  constructor() {
    super(...arguments);
    this.goodsInfoList = new Array();
  }
}
i([se(2, N.GoodsCellData)], fo.prototype, "goodsInfoList", void 0);
exports.Game_RGetSimpleGoods = fo;
class go extends re {
  constructor() {
    super(...arguments);
    this.gameDatas = new Array();
  }
}
i([se(2, g.GDReleaseGameData)], go.prototype, "gameDatas", void 0);
exports.Game_RGetSourceCreativeGameRank = go;
class yo extends re {
  constructor() {
    super(...arguments);
    this.gameCommentMap = new Map();
  }
}
i([se(5)], yo.prototype, "gameCommentMap", void 0);
exports.Game_RGetThumbGameComment = yo;
class vo extends re {
  constructor() {
    super(...arguments);
    this.thumbMap = new Map();
  }
}
i([se(5)], vo.prototype, "thumbMap", void 0);
exports.Game_RGetThumbTalkComment = vo;
class Co extends re {
  constructor() {
    super(...arguments);
    this.creditScore = 0;
    this.creditScoreRecoverProcess = 0;
    this.userCreditMsgList = new Array();
  }
}
i([se(0)], Co.prototype, "creditScore", void 0);
i([se(0)], Co.prototype, "creditScoreRecoverProcess", void 0);
i([se(2, oe.UserCreditMsg)], Co.prototype, "userCreditMsgList", void 0);
exports.Game_RGetUserCreditMsg = Co;
class _o extends re {
  constructor() {
    super(...arguments);
    this.userDetailMsg = new ie.UserDetailMsg();
  }
}
i([se(1, ie.UserDetailMsg)], _o.prototype, "userDetailMsg", void 0);
exports.Game_RGetUserDetailMsg = _o;
class So extends re {
  constructor() {
    super(...arguments);
    this.userSimpleMsgList = new Array();
  }
}
i([se(2, ne.UserSimpleMsg)], So.prototype, "userSimpleMsgList", void 0);
exports.Game_RGetUserSimpleMsg = So;
class Io extends re {
  constructor() {
    super(...arguments);
    this.datas = new Array();
  }
}
i([se(2, M.GDVariable)], Io.prototype, "datas", void 0);
exports.Game_RGetVariable = Io;
class Go extends re {
  constructor() {
    super(...arguments);
    this.ids = new Array();
  }
}
i([se(2)], Go.prototype, "ids", void 0);
exports.Game_RGetVariableIds = Go;
class To extends re {
  constructor() {
    super(...arguments);
    this.datas = new Array();
  }
}
i([se(2, P.GDWorldData)], To.prototype, "datas", void 0);
exports.Game_RGetWorldData = To;
class bo extends re {
  constructor() {
    super(...arguments);
    this.ids = new Array();
  }
}
i([se(2)], bo.prototype, "ids", void 0);
exports.Game_RGetWorldDataIds = bo;
class Mo extends re {
  constructor() {
    super(...arguments);
    this.errorCode = 0;
    this.user = new b.GDUser();
  }
}
i([se(0)], Mo.prototype, "errorCode", void 0);
i([se(1, b.GDUser)], Mo.prototype, "user", void 0);
exports.Game_RGMBindRole = Mo;
class Po extends re {
  constructor() {
    super(...arguments);
    this.coin = 0;
  }
}
i([se(0)], Po.prototype, "coin", void 0);
exports.Game_RGMIncOtherCoin = Po;
class Do extends re {
  constructor() {
    super(...arguments);
    this.errorCode = 0;
    this.user = new b.GDUser();
  }
}
i([se(0)], Do.prototype, "errorCode", void 0);
i([se(1, b.GDUser)], Do.prototype, "user", void 0);
exports.Game_RGMRevokeBindRole = Do;
class wo extends re {
  constructor() {
    super(...arguments);
    this.code = 0;
    this.gameID = "";
  }
}
i([se(0)], wo.prototype, "code", void 0);
i([se(0)], wo.prototype, "gameID", void 0);
exports.Game_RGMSetGameTage = wo;
class Bo extends re {
  constructor() {
    super(...arguments);
    this.goodsId = "";
    this.status = 0;
    this.offReason = new H.OffReason();
  }
}
i([se(0)], Bo.prototype, "goodsId", void 0);
i([se(0)], Bo.prototype, "status", void 0);
i([se(1, H.OffReason)], Bo.prototype, "offReason", void 0);
exports.Game_RGoodsStatusNotify = Bo;
class Ro extends re {
  constructor() {
    super(...arguments);
    this.ids = new Array();
  }
}
i([se(2)], Ro.prototype, "ids", void 0);
exports.Game_RHurryGames = Ro;
class xo extends re {
  constructor() {
    super(...arguments);
    this.playerId = 0;
    this.incScore = 0;
  }
}
i([se(0)], xo.prototype, "playerId", void 0);
i([se(0)], xo.prototype, "incScore", void 0);
exports.Game_RIncCreditScore = xo;
class Lo extends re {
  constructor() {
    super(...arguments);
    this.comment = new w.GameComment();
  }
}
i([se(1, w.GameComment)], Lo.prototype, "comment", void 0);
exports.Game_RLoadFirstLevelGameComment = Lo;
class ko extends re {
  constructor() {
    super(...arguments);
    this.comment = new Q.TalkComment();
  }
}
i([se(1, Q.TalkComment)], ko.prototype, "comment", void 0);
exports.Game_RLoadFirstLevelTalkComment = ko;
class Fo extends re {
  constructor() {
    super(...arguments);
    this.commentsCnt = 0;
    this.commentsCntSum = 0;
    this.comments = new Array();
  }
}
i([se(0)], Fo.prototype, "commentsCnt", void 0);
i([se(0)], Fo.prototype, "commentsCntSum", void 0);
i([se(2, w.GameComment)], Fo.prototype, "comments", void 0);
exports.Game_RLoadGameComment = Fo;
class No extends re {
  constructor() {
    super(...arguments);
    this.comments = new Array();
  }
}
i([se(2, w.GameComment)], No.prototype, "comments", void 0);
exports.Game_RLoadGameSubComment = No;
class Ao extends re {
  constructor() {
    super(...arguments);
    this.talkList = new Array();
  }
}
i([se(2, ee.TalkData)], Ao.prototype, "talkList", void 0);
exports.Game_RLoadOwnTalk = Ao;
class Oo extends re {
  constructor() {
    super(...arguments);
    this.comments = new Array();
  }
}
i([se(2, Q.TalkComment)], Oo.prototype, "comments", void 0);
exports.Game_RLoadOwnTalkComment = Oo;
class Uo extends re {
  constructor() {
    super(...arguments);
    this.startMember = "";
    this.talkList = new Array();
  }
}
i([se(0)], Uo.prototype, "startMember", void 0);
i([se(2, ee.TalkData)], Uo.prototype, "talkList", void 0);
exports.Game_RLoadTalk = Uo;
class Eo extends re {
  constructor() {
    super(...arguments);
    this.talkList = new Array();
  }
}
i([se(2, ee.TalkData)], Eo.prototype, "talkList", void 0);
exports.Game_RLoadTalkByIdList = Eo;
class jo extends re {
  constructor() {
    super(...arguments);
    this.commentsCnt = 0;
    this.commentsCntSum = 0;
    this.comments = new Array();
  }
}
i([se(0)], jo.prototype, "commentsCnt", void 0);
i([se(0)], jo.prototype, "commentsCntSum", void 0);
i([se(2, Q.TalkComment)], jo.prototype, "comments", void 0);
exports.Game_RLoadTalkComment = jo;
class Ho extends re {
  constructor() {
    super(...arguments);
    this.talkData = new ee.TalkData();
  }
}
i([se(1, ee.TalkData)], Ho.prototype, "talkData", void 0);
exports.Game_RLoadTalkDetail = Ho;
class Wo extends re {
  constructor() {
    super(...arguments);
    this.comments = new Array();
  }
}
i([se(2, Q.TalkComment)], Wo.prototype, "comments", void 0);
exports.Game_RLoadTalkSubComment = Wo;
class Vo extends re {
  constructor() {
    super(...arguments);
    this.role = new y.GDRole();
    this.dynamicConfig = new Map();
    this.roleGameConf = new v.GDRoleGameConf();
    this.offLineChangeMsg = new j.OffLineChangeMsg();
    this.saleSummarys = new Array();
    this.gameSaleSummarys = new Array();
    this.adSummarys = new Array();
    this.rebornSummarys = new Array();
    this.unlockGameRewards = new Array();
    this.unlockGoodsRewards = new Array();
    this.gameSlotUnlockLvls = new Array();
    this.goodsSlotUnlockLvls = new Array();
    this.hotGameIdList = new Array();
    this.newGameDatas = new Array();
    this.followGameDatas = new Array();
    this.newMsgCnt = 0;
    this.newAggregateMsgCnt = 0;
    this.newFansCnt = 0;
    this.newCommentCnt = 0;
    this.canObtainTTCoin = !1;
    this.customActorGroups = new Array();
    this.addCoinByAdvertCnt = 0;
    this.addCoinByAdvertLimit = 0;
    this.addCoinByAdvertReset = 0;
    this.collectionGoods = new Array();
    this.giftCfgVersion = "";
  }
}
i([se(1, y.GDRole)], Vo.prototype, "role", void 0);
i([se(5)], Vo.prototype, "dynamicConfig", void 0);
i([se(1, v.GDRoleGameConf)], Vo.prototype, "roleGameConf", void 0);
i([se(1, j.OffLineChangeMsg)], Vo.prototype, "offLineChangeMsg", void 0);
i([se(2, q.SaleSummary)], Vo.prototype, "saleSummarys", void 0);
i([se(2, q.SaleSummary)], Vo.prototype, "gameSaleSummarys", void 0);
i([se(2, q.SaleSummary)], Vo.prototype, "adSummarys", void 0);
i([se(2, q.SaleSummary)], Vo.prototype, "rebornSummarys", void 0);
i([se(2)], Vo.prototype, "unlockGameRewards", void 0);
i([se(2)], Vo.prototype, "unlockGoodsRewards", void 0);
i([se(2)], Vo.prototype, "gameSlotUnlockLvls", void 0);
i([se(2)], Vo.prototype, "goodsSlotUnlockLvls", void 0);
i([se(2)], Vo.prototype, "hotGameIdList", void 0);
i([se(2, D.GameCellData)], Vo.prototype, "newGameDatas", void 0);
i([se(2, D.GameCellData)], Vo.prototype, "followGameDatas", void 0);
i([se(0)], Vo.prototype, "newMsgCnt", void 0);
i([se(0)], Vo.prototype, "newAggregateMsgCnt", void 0);
i([se(0)], Vo.prototype, "newFansCnt", void 0);
i([se(0)], Vo.prototype, "newCommentCnt", void 0);
i([se(0)], Vo.prototype, "canObtainTTCoin", void 0);
i([se(2, a.ActorGroupData)], Vo.prototype, "customActorGroups", void 0);
i([se(0)], Vo.prototype, "addCoinByAdvertCnt", void 0);
i([se(0)], Vo.prototype, "addCoinByAdvertLimit", void 0);
i([se(0)], Vo.prototype, "addCoinByAdvertReset", void 0);
i([se(2)], Vo.prototype, "collectionGoods", void 0);
i([se(0)], Vo.prototype, "giftCfgVersion", void 0);
exports.Game_RLogin = Vo;
class Ko extends re {
  constructor() {
    super(...arguments);
    this.code = 0;
    this.sensitiveWords = new Array();
    this.talkData = new ee.TalkData();
  }
}
i([se(0)], Ko.prototype, "code", void 0);
i([se(2)], Ko.prototype, "sensitiveWords", void 0);
i([se(1, ee.TalkData)], Ko.prototype, "talkData", void 0);
exports.Game_RModifyOfficialTalk = Ko;
class Jo extends re {
  constructor() {
    super(...arguments);
    this.code = 0;
    this.sensitiveWords = new Array();
    this.talkData = new ee.TalkData();
  }
}
i([se(0)], Jo.prototype, "code", void 0);
i([se(2)], Jo.prototype, "sensitiveWords", void 0);
i([se(1, ee.TalkData)], Jo.prototype, "talkData", void 0);
exports.Game_RModifyTalk = Jo;
class Zo extends re {
  constructor() {
    super(...arguments);
    this.code = 0;
    this.comment = new Q.TalkComment();
  }
}
i([se(0)], Zo.prototype, "code", void 0);
i([se(1, Q.TalkComment)], Zo.prototype, "comment", void 0);
exports.Game_RModifyTalkComment = Zo;
class zo extends re {
  constructor() {
    super(...arguments);
    this.goodsInfoList = new Array();
  }
}
i([se(2, N.GoodsCellData)], zo.prototype, "goodsInfoList", void 0);
exports.Game_RNewSearchGoods = zo;
class Xo extends re {
  constructor() {
    super(...arguments);
    this.coin = 0;
  }
}
i([se(0)], Xo.prototype, "coin", void 0);
exports.Game_RObtainTTCoin0319 = Xo;
class qo extends re {
  constructor() {
    super(...arguments);
    this.id = "";
  }
}
i([se(0)], qo.prototype, "id", void 0);
exports.Game_ROffGame = qo;
class Yo extends re {
  constructor() {
    super(...arguments);
    this.id = "";
  }
}
i([se(0)], Yo.prototype, "id", void 0);
exports.Game_ROffGoods = Yo;
class $o extends re {
  constructor() {
    super(...arguments);
    this.code = 0;
  }
}
i([se(0)], $o.prototype, "code", void 0);
exports.Game_ROfficialDeleteTalk = $o;
class Qo extends re {
  constructor() {
    super(...arguments);
    this.id = "";
  }
}
i([se(0)], Qo.prototype, "id", void 0);
exports.Game_ROwnOffGame = Qo;
class ei extends re {
  constructor() {
    super(...arguments);
    this.ids = new Array();
    this.playCntList = new Array();
  }
}
i([se(2)], ei.prototype, "ids", void 0);
i([se(2)], ei.prototype, "playCntList", void 0);
exports.Game_RPlayGames = ei;
exports.Game_RPlayGameStatistics = class extends re {};
class ti extends re {
  constructor() {
    super(...arguments);
    this.id = "";
    this.code = 0;
    this.sensitiveWords = new Array();
  }
}
i([se(0)], ti.prototype, "id", void 0);
i([se(0)], ti.prototype, "code", void 0);
i([se(2)], ti.prototype, "sensitiveWords", void 0);
exports.Game_RPublishGame = ti;
class oi extends re {
  constructor() {
    super(...arguments);
    this.code = 0;
    this.sensitiveWords = new Array();
    this.comment = new Q.TalkComment();
  }
}
i([se(0)], oi.prototype, "code", void 0);
i([se(2)], oi.prototype, "sensitiveWords", void 0);
i([se(1, Q.TalkComment)], oi.prototype, "comment", void 0);
exports.Game_RReplyTalkComment = oi;
exports.Game_RReportBugMsg = class extends re {};
class ii extends re {
  constructor() {
    super(...arguments);
    this.id = "";
  }
}
i([se(0)], ii.prototype, "id", void 0);
exports.Game_RReportGame = ii;
exports.Game_RReportGameClick = class extends re {};
class ni extends re {
  constructor() {
    super(...arguments);
    this.reportCnt = 0;
  }
}
i([se(0)], ni.prototype, "reportCnt", void 0);
exports.Game_RReportGameComment = ni;
exports.Game_RReportGameShow = class extends re {};
class ai extends re {
  constructor() {
    super(...arguments);
    this.id = "";
  }
}
i([se(0)], ai.prototype, "id", void 0);
exports.Game_RReportGoods = ai;
exports.Game_RReportGoodsClick = class extends re {};
exports.Game_RReportGoodsShow = class extends re {};
class si extends re {
  constructor() {
    super(...arguments);
    this.id = 0;
  }
}
i([se(0)], si.prototype, "id", void 0);
exports.Game_RReportPlayer = si;
class ri extends re {
  constructor() {
    super(...arguments);
    this.reportCnt = 0;
  }
}
i([se(0)], ri.prototype, "reportCnt", void 0);
exports.Game_RReportTalk = ri;
class li extends re {
  constructor() {
    super(...arguments);
    this.reportCnt = 0;
  }
}
i([se(0)], li.prototype, "reportCnt", void 0);
exports.Game_RReportTalkComment = li;
exports.Game_RResetBannerGames = class extends re {};
exports.Game_RResetChosenGames = class extends re {};
exports.Game_RResetChosenGoods = class extends re {};
class ci extends re {
  constructor() {
    super(...arguments);
    this.datas = new Array();
  }
}
i([se(2, z.RoleReviewGameData)], ci.prototype, "datas", void 0);
exports.Game_RReviewGame = ci;
class di extends re {
  constructor() {
    super(...arguments);
    this.id = "";
  }
}
i([se(0)], di.prototype, "id", void 0);
exports.Game_RRevokeReportGame = di;
class hi extends re {
  constructor() {
    super(...arguments);
    this.id = "";
  }
}
i([se(0)], hi.prototype, "id", void 0);
exports.Game_RRevokeReportGameComment = hi;
class pi extends re {
  constructor() {
    super(...arguments);
    this.id = "";
  }
}
i([se(0)], pi.prototype, "id", void 0);
exports.Game_RRevokeReportGoods = pi;
class ui extends re {
  constructor() {
    super(...arguments);
    this.id = 0;
  }
}
i([se(0)], ui.prototype, "id", void 0);
exports.Game_RRevokeReportPlayer = ui;
class mi extends re {
  constructor() {
    super(...arguments);
    this.userImg = "";
    this.status = 0;
    this.offReason = new A.ImageOffReason();
  }
}
i([se(0)], mi.prototype, "userImg", void 0);
i([se(0)], mi.prototype, "status", void 0);
i([se(1, A.ImageOffReason)], mi.prototype, "offReason", void 0);
exports.Game_RRoleNewUserImgNotify = mi;
exports.Game_RSaveActorGroups = class extends re {};
class fi extends re {
  constructor() {
    super(...arguments);
    this.colorDatas = new Array();
  }
}
i([se(2, d.CustomColor)], fi.prototype, "colorDatas", void 0);
exports.Game_RSaveAllCustomColors = fi;
class gi extends re {
  constructor() {
    super(...arguments);
    this.retVariableDatas = new Array();
  }
}
i([se(2, J.RetVariableData)], gi.prototype, "retVariableDatas", void 0);
exports.Game_RSaveAllVariable = gi;
class yi extends re {
  constructor() {
    super(...arguments);
    this.colorDatas = new Array();
  }
}
i([se(2, d.CustomColor)], yi.prototype, "colorDatas", void 0);
exports.Game_RSaveCustomColors = yi;
class vi extends re {
  constructor() {
    super(...arguments);
    this.gameId = "";
    this.id = "";
  }
}
i([se(0)], vi.prototype, "gameId", void 0);
i([se(0)], vi.prototype, "id", void 0);
exports.Game_RSaveGameRank = vi;
class Ci extends re {
  constructor() {
    super(...arguments);
    this.gameId = "";
    this.id = "";
  }
}
i([se(0)], Ci.prototype, "gameId", void 0);
i([se(0)], Ci.prototype, "id", void 0);
exports.Game_RSaveGameShop = Ci;
exports.Game_RSaveGuide = class extends re {};
class _i extends re {
  constructor() {
    super(...arguments);
    this.id = "";
  }
}
i([se(0)], _i.prototype, "id", void 0);
exports.Game_RSaveRoleActorConf = _i;
class Si extends re {
  constructor() {
    super(...arguments);
    this.id = "";
  }
}
i([se(0)], Si.prototype, "id", void 0);
exports.Game_RSaveRoleBulletConf = Si;
class Ii extends re {
  constructor() {
    super(...arguments);
    this.gameId = "";
    this.confId = "";
  }
}
i([se(0)], Ii.prototype, "gameId", void 0);
i([se(0)], Ii.prototype, "confId", void 0);
exports.Game_RSaveRoleCreativeConf = Ii;
class Gi extends re {
  constructor() {
    super(...arguments);
    this.id = "";
  }
}
i([se(0)], Gi.prototype, "id", void 0);
exports.Game_RSaveRoleDeviceConf = Gi;
class Ti extends re {
  constructor() {
    super(...arguments);
    this.id = "";
  }
}
i([se(0)], Ti.prototype, "id", void 0);
exports.Game_RSaveRoleGameData = Ti;
class bi extends re {
  constructor() {
    super(...arguments);
    this.id = "";
  }
}
i([se(0)], bi.prototype, "id", void 0);
exports.Game_RSaveRolePropConf = bi;
class Mi extends re {
  constructor() {
    super(...arguments);
    this.id = "";
  }
}
i([se(0)], Mi.prototype, "id", void 0);
exports.Game_RSaveRoleTileConf = Mi;
class Pi extends re {
  constructor() {
    super(...arguments);
    this.id = "";
  }
}
i([se(0)], Pi.prototype, "id", void 0);
exports.Game_RSaveRoleWeaponConf = Pi;
class Di extends re {
  constructor() {
    super(...arguments);
    this.gameId = "";
    this.id = "";
  }
}
i([se(0)], Di.prototype, "gameId", void 0);
i([se(0)], Di.prototype, "id", void 0);
exports.Game_RSaveVariable = Di;
class wi extends re {
  constructor() {
    super(...arguments);
    this.gameId = "";
    this.id = "";
  }
}
i([se(0)], wi.prototype, "gameId", void 0);
i([se(0)], wi.prototype, "id", void 0);
exports.Game_RSaveWorldData = wi;
class Bi extends re {
  constructor() {
    super(...arguments);
    this.gameDatas = new Array();
  }
}
i([se(2, D.GameCellData)], Bi.prototype, "gameDatas", void 0);
exports.Game_RSearchGame = Bi;
class Ri extends re {
  constructor() {
    super(...arguments);
    this.gameDatas = new Array();
  }
}
i([se(2, D.GameCellData)], Ri.prototype, "gameDatas", void 0);
exports.Game_RSearchGameByTag = Ri;
class xi extends re {
  constructor() {
    super(...arguments);
    this.goodsInfoList = new Array();
  }
}
i([se(2, f.GDGoodsInfo)], xi.prototype, "goodsInfoList", void 0);
exports.Game_RSearchGoods = xi;
class Li extends re {
  constructor() {
    super(...arguments);
    this.roleDatas = new Array();
  }
}
i([se(2, ne.UserSimpleMsg)], Li.prototype, "roleDatas", void 0);
exports.Game_RSearchRole = Li;
class ki extends re {
  constructor() {
    super(...arguments);
    this.talkList = new Array();
  }
}
i([se(2, ee.TalkData)], ki.prototype, "talkList", void 0);
exports.Game_RSearchTalk = ki;
class Fi extends re {
  constructor() {
    super(...arguments);
    this.code = 0;
    this.coin = 0;
  }
}
i([se(0)], Fi.prototype, "code", void 0);
i([se(0)], Fi.prototype, "coin", void 0);
exports.Game_RSendGift = Fi;
class Ni extends re {
  constructor() {
    super(...arguments);
    this.code = 0;
    this.sensitiveWords = new Array();
  }
}
i([se(0)], Ni.prototype, "code", void 0);
i([se(2)], Ni.prototype, "sensitiveWords", void 0);
exports.Game_RSensitiveMsg = Ni;
class Ai extends re {
  constructor() {
    super(...arguments);
    this.code = 0;
  }
}
i([se(0)], Ai.prototype, "code", void 0);
exports.Game_RSetTalkChosen = Ai;
class Oi extends re {
  constructor() {
    super(...arguments);
    this.code = 0;
  }
}
i([se(0)], Oi.prototype, "code", void 0);
exports.Game_RSetTalkCommentTop = Oi;
class Ui extends re {
  constructor() {
    super(...arguments);
    this.code = 0;
  }
}
i([se(0)], Ui.prototype, "code", void 0);
exports.Game_RSetTalkTop = Ui;
class Ei extends re {
  constructor() {
    super(...arguments);
    this.talkCommentId = "";
    this.status = 0;
    this.offReason = new H.OffReason();
  }
}
i([se(0)], Ei.prototype, "talkCommentId", void 0);
i([se(0)], Ei.prototype, "status", void 0);
i([se(1, H.OffReason)], Ei.prototype, "offReason", void 0);
exports.Game_RTalkCommentStatusNotify = Ei;
class ji extends re {
  constructor() {
    super(...arguments);
    this.talkId = "";
    this.status = 0;
    this.offReason = new H.OffReason();
  }
}
i([se(0)], ji.prototype, "talkId", void 0);
i([se(0)], ji.prototype, "status", void 0);
i([se(1, H.OffReason)], ji.prototype, "offReason", void 0);
exports.Game_RTalkStatusNotify = ji;
class Hi extends re {
  constructor() {
    super(...arguments);
    this.thumbCnt = 0;
  }
}
i([se(0)], Hi.prototype, "thumbCnt", void 0);
exports.Game_RThumbGameComment = Hi;
class Wi extends re {
  constructor() {
    super(...arguments);
    this.ids = new Array();
  }
}
i([se(2)], Wi.prototype, "ids", void 0);
exports.Game_RThumbGames = Wi;
class Vi extends re {
  constructor() {
    super(...arguments);
    this.thumbCnt = 0;
  }
}
i([se(0)], Vi.prototype, "thumbCnt", void 0);
exports.Game_RThumbTalk = Vi;
class Ki extends re {
  constructor() {
    super(...arguments);
    this.thumbCnt = 0;
  }
}
i([se(0)], Ki.prototype, "thumbCnt", void 0);
exports.Game_RThumbTalkComment = Ki;
class Ji extends re {
  constructor() {
    super(...arguments);
    this.code = 0;
  }
}
i([se(0)], Ji.prototype, "code", void 0);
exports.Game_RUpdateUserImg = Ji;
class Zi extends re {
  constructor() {
    super(...arguments);
    this.code = 0;
    this.sensitiveWords = new Array();
  }
}
i([se(0)], Zi.prototype, "code", void 0);
i([se(2)], Zi.prototype, "sensitiveWords", void 0);
exports.Game_RUpdateUserInfo = Zi;
class zi extends re {
  constructor() {
    super(...arguments);
    this.gameId = "";
    this.scores = new Array();
  }
}
i([se(0)], zi.prototype, "gameId", void 0);
i([se(2, Y.ScoreInfo)], zi.prototype, "scores", void 0);
exports.Game_RUploadGameRankScore = zi;
class Xi extends re {
  constructor() {
    super(...arguments);
    this.id = "";
    this.code = 0;
    this.sensitiveWords = new Array();
  }
}
i([se(0)], Xi.prototype, "id", void 0);
i([se(0)], Xi.prototype, "code", void 0);
i([se(2)], Xi.prototype, "sensitiveWords", void 0);
exports.Game_RUploadGoods = Xi;
class qi extends re {
  constructor() {
    super(...arguments);
    this.isOK = !1;
    this.sensitiveImageResult = new $.SensitiveImageResult();
    this.url = "";
    this.reason = "";
  }
}
i([se(0)], qi.prototype, "isOK", void 0);
i([se(1, $.SensitiveImageResult)], qi.prototype, "sensitiveImageResult", void 0);
i([se(0)], qi.prototype, "url", void 0);
i([se(0)], qi.prototype, "reason", void 0);
exports.Game_RUploadImage = qi;
class Yi extends re {
  constructor() {
    super(...arguments);
    this.cdnUrl = "";
  }
}
i([se(0)], Yi.prototype, "cdnUrl", void 0);
exports.Game_RUploadReleaseGame = Yi;
class $i extends re {
  constructor() {
    super(...arguments);
    this.score = 0;
  }
}
i([se(0)], $i.prototype, "score", void 0);
exports.Game_RUploadTakeExamScore = $i;
class Qi extends re {
  constructor() {
    super(...arguments);
    this.upCnt = 0;
  }
}
i([se(0)], Qi.prototype, "upCnt", void 0);
exports.Game_RUpTalk = Qi;
class en extends re {
  constructor() {
    super(...arguments);
    this.upCnt = 0;
  }
}
i([se(0)], en.prototype, "upCnt", void 0);
exports.Game_RUpTalkComment = en;
class tn extends re {
  constructor() {
    super(...arguments);
    this.subGameList = new Array();
  }
}
i([se(2, T.GDSubGame)], tn.prototype, "subGameList", void 0);
exports.Game_SubGameListR = tn;
class on extends re {
  constructor() {
    super(...arguments);
    this.ok = !1;
  }
}
i([se(0)], on.prototype, "ok", void 0);
exports.Login_CheckAccountR = on;
class nn extends re {
  constructor() {
    super(...arguments);
    this.account = "";
    this.oTP = "";
  }
}
i([se(0)], nn.prototype, "account", void 0);
i([se(0)], nn.prototype, "oTP", void 0);
exports.Login_CreateAccountR = nn;
class an extends re {
  constructor() {
    super(...arguments);
    this.userToken = "";
    this.uId = 0;
    this.servers = new Array();
    this.roles = new Array();
  }
}
i([se(0)], an.prototype, "userToken", void 0);
i([se(0)], an.prototype, "uId", void 0);
i([se(2, I.GDServer)], an.prototype, "servers", void 0);
i([se(2, G.GDServerRole)], an.prototype, "roles", void 0);
exports.Login_RAuthUser = an;
class sn extends re {
  constructor() {
    super(...arguments);
    this.roleToken = "";
    this.roleId = 0;
    this.bindInfo = new u.GDBindRoleInfo();
    this.bindPlatformUId = "";
    this.ext = "";
  }
}
i([se(0)], sn.prototype, "roleToken", void 0);
i([se(0)], sn.prototype, "roleId", void 0);
i([se(1, u.GDBindRoleInfo)], sn.prototype, "bindInfo", void 0);
i([se(0)], sn.prototype, "bindPlatformUId", void 0);
i([se(0)], sn.prototype, "ext", void 0);
exports.Login_RAuthUserSingle = sn;
class rn extends re {
  constructor() {
    super(...arguments);
    this.isForceUpdate = !1;
    this.version = "";
    this.url = "";
  }
}
i([se(0)], rn.prototype, "isForceUpdate", void 0);
i([se(0)], rn.prototype, "version", void 0);
i([se(0)], rn.prototype, "url", void 0);
exports.Login_RGetAppUpdateInfo = rn;
class ln extends re {
  constructor() {
    super(...arguments);
    this.roleToken = "";
  }
}
i([se(0)], ln.prototype, "roleToken", void 0);
exports.Login_RSelectServer = ln;
class cn extends re {
  constructor() {
    super(...arguments);
    this.convs = new Array();
  }
}
i([se(2, U.OIMConversation)], cn.prototype, "convs", void 0);
exports.OIM_GetConversationListResp = cn;
class dn extends re {
  constructor() {
    super(...arguments);
    this.msgs = new Array();
  }
}
i([se(2, E.OIMMsg)], dn.prototype, "msgs", void 0);
exports.OIM_GetHistoryResp = dn;
class hn extends re {
  constructor() {
    super(...arguments);
    this.msg = new E.OIMMsg();
  }
}
i([se(1, E.OIMMsg)], hn.prototype, "msg", void 0);
exports.OIMNewMsgNotify = hn;
exports.RespNone = class extends re {};
class pn extends re {
  constructor() {
    super(...arguments);
    this.role = new y.GDRole();
  }
}
i([se(1, y.GDRole)], pn.prototype, "role", void 0);
exports.RespSync = pn;
class un extends re {
  constructor() {
    super(...arguments);
    this.room = new _.GDRoom();
  }
}
i([se(1, _.GDRoom)], un.prototype, "room", void 0);
exports.Room_CustomChangeP = un;
class mn extends re {
  constructor() {
    super(...arguments);
    this.room = new _.GDRoom();
  }
}
i([se(1, _.GDRoom)], mn.prototype, "room", void 0);
exports.Room_DismissP = mn;
class fn extends re {
  constructor() {
    super(...arguments);
    this.roomId = "";
    this.frame = 0;
    this.msgs = new Array();
  }
}
i([se(0)], fn.prototype, "roomId", void 0);
i([se(0)], fn.prototype, "frame", void 0);
i([se(2, S.GDRoomFrameSyncMsg)], fn.prototype, "msgs", void 0);
exports.Room_FrameMsgP = fn;
class gn extends re {
  constructor() {
    super(...arguments);
    this.roomId = "";
  }
}
i([se(0)], gn.prototype, "roomId", void 0);
exports.Room_FrameSyncStartP = gn;
class yn extends re {
  constructor() {
    super(...arguments);
    this.roomId = "";
  }
}
i([se(0)], yn.prototype, "roomId", void 0);
exports.Room_FrameSyncStopP = yn;
class vn extends re {
  constructor() {
    super(...arguments);
    this.roomList = new Array();
  }
}
i([se(2, _.GDRoom)], vn.prototype, "roomList", void 0);
exports.Room_ListR = vn;
class Cn extends re {
  constructor() {
    super(...arguments);
    this.room = new _.GDRoom();
  }
}
i([se(1, _.GDRoom)], Cn.prototype, "room", void 0);
exports.Room_LockP = Cn;
class _n extends re {
  constructor() {
    super(...arguments);
    this.room = new _.GDRoom();
  }
}
i([se(1, _.GDRoom)], _n.prototype, "room", void 0);
exports.Room_MemberGroupChangeP = _n;
class Sn extends re {
  constructor() {
    super(...arguments);
    this.room = new _.GDRoom();
    this.roleId = 0;
  }
}
i([se(1, _.GDRoom)], Sn.prototype, "room", void 0);
i([se(0)], Sn.prototype, "roleId", void 0);
exports.Room_MemberJoinP = Sn;
class In extends re {
  constructor() {
    super(...arguments);
    this.room = new _.GDRoom();
    this.roleId = 0;
  }
}
i([se(1, _.GDRoom)], In.prototype, "room", void 0);
i([se(0)], In.prototype, "roleId", void 0);
exports.Room_MemberLeaveP = In;
class Gn extends re {
  constructor() {
    super(...arguments);
    this.roomId = "";
    this.roleId = 0;
    this.msg = {};
  }
}
i([se(0)], Gn.prototype, "roomId", void 0);
i([se(0)], Gn.prototype, "roleId", void 0);
i([se(0)], Gn.prototype, "msg", void 0);
exports.Room_MsgP = Gn;
class Tn extends re {
  constructor() {
    super(...arguments);
    this.roomId = "";
  }
}
i([se(0)], Tn.prototype, "roomId", void 0);
exports.Room_PingR = Tn;
class bn extends re {
  constructor() {
    super(...arguments);
    this.userToken = "";
    this.uId = 0;
    this.servers = new Array();
    this.roles = new Array();
  }
}
i([se(0)], bn.prototype, "userToken", void 0);
i([se(0)], bn.prototype, "uId", void 0);
i([se(2, I.GDServer)], bn.prototype, "servers", void 0);
i([se(2, G.GDServerRole)], bn.prototype, "roles", void 0);
exports.Room_REnter = bn;
class Mn extends re {
  constructor() {
    super(...arguments);
    this.room = new _.GDRoom();
  }
}
i([se(1, _.GDRoom)], Mn.prototype, "room", void 0);
exports.Room_Resp = Mn;
class Pn extends re {
  constructor() {
    super(...arguments);
    this.room = new _.GDRoom();
  }
}
i([se(1, _.GDRoom)], Pn.prototype, "room", void 0);
exports.Room_StartFailP = Pn;
class Dn extends re {
  constructor() {
    super(...arguments);
    this.room = new _.GDRoom();
  }
}
i([se(1, _.GDRoom)], Dn.prototype, "room", void 0);
exports.Room_StartingP = Dn;
class wn extends re {
  constructor() {
    super(...arguments);
    this.room = new _.GDRoom();
  }
}
i([se(1, _.GDRoom)], wn.prototype, "room", void 0);
exports.Room_StartP = wn;
class Bn extends re {
  constructor() {
    super(...arguments);
    this.room = new _.GDRoom();
  }
}
i([se(1, _.GDRoom)], Bn.prototype, "room", void 0);
exports.Room_StopP = Bn;
class Rn extends re {
  constructor() {
    super(...arguments);
    this.room = new _.GDRoom();
  }
}
i([se(1, _.GDRoom)], Rn.prototype, "room", void 0);
exports.Room_UnlockP = Rn;