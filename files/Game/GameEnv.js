"use strict";

exports.InitGameEnv = exports.gameEnv = void 0;
let i = {
    useWss: !0,
    isProd: !1,
    env: "Test",
    gameId: "GameCreatorTest",
    appGameId: "GameCreator-app",
    creatorVersion: "0.8.0",
    urlRoot: "https://thecanvas-test.hortorgames.com",
    fileCDN: "https://thecanvas-res.hortorgames.com/TheCanvasTest/",
    toponAdPlacementId_Android: "b6035bea57dc18",
    toponAdPlacementId_Ios: "b6035be62ae892",
    androidChannel: "hortor"
  },
  n = {
    useWss: !0,
    isProd: !1,
    env: "Test",
    gameId: "GameCreatorTest",
    appGameId: "GameCreator-app",
    creatorVersion: "0.8.0",
    urlRoot: "http://cysj-audit-api.hortorgames.com",
    fileCDN: "https://cysj-res.hortorgames.com/GameCreatorTest/",
    toponAdPlacementId_Android: "b6035bea57dc18",
    toponAdPlacementId_Ios: "b6035be62ae892",
    androidChannel: "hortor"
  };
exports.gameEnv = i;
exports.InitGameEnv = function (e, t) {
  exports.gameEnv = e ? i : n;
  o.gameEnv.isWxReviewCity = t;
};