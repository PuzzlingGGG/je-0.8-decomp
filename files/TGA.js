"use strict";

exports.TGA = void 0;
const i = e("./Frame/CrossPlatform"),
  n = e("./Game/GameEnv"),
  a = e("./Game/Hortor"),
  s = e("./Role");
(function (e) {
  e.track = function (e, t = {}) {
    t.ver = n.gameEnv.creatorVersion;
    t.cyId = s.default.Ins.role.id;
    t.stamp = orange.TimeUtil.serverTime;
    t.loginType = a.Hortor.loginPlatType;
    i.tt && (t.game_channel = "tt");
    i.wx && (t.game_channel = "wx");
    a.Hortor.tgaTrack(e, t);
  };
  e.userSet = function (e = {}) {
    a.Hortor.userSet(e);
  };
})(o.TGA || (exports.TGA = {}));