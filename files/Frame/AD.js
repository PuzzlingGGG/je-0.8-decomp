"use strict";

exports.AD = exports.VideoError = exports.AdUnitId = void 0;
const i = e("./CrossPlatform"),
  n = e("./Top"),
  a = e("./Util"),
  s = e("../TGA"),
  r = e("../Game/Hortor"),
  l = e("../Game/GameEnv");
var c;
(function (e) {
  e.Reborn = "kb0lqcnqc8i219obn8";
  e.PublishGame = "7kg5cfllmk37i8b5b8";
  e.Coin = "18g20044mi3ljo1741";
  e.GameAD = "f5e1kd57ec93ocrn9q";
  if (i.wx) {
    e.Reborn = "adunit-edb036d0a505aaa6";
    e.PublishGame = "adunit-3953452cbd3b6c60";
    e.Coin = "adunit-513ba7ca83fc4882";
    e.GameAD = "adunit-c7e755f780fd6e4e";
  }
})(o.AdUnitId || (exports.AdUnitId = {}));
(function (e) {
  e[e.UserCancel = 0] = "UserCancel";
  e[e.NoAd = 1] = "NoAd";
  e[e.LowSdk = 2] = "LowSdk";
})(c = o.VideoError || (exports.VideoError = {}));
(function (e) {
  e.skip = !1;
  let t = 0;
  e.addCoinByAdvertCnt = 0;
  e.hasAD = function () {
    return orange.TimeUtil.serverTime > t + 1e4 && e.addCoinByAdvertCnt < 15;
  };
  e.preloadRewardVideo = function () {
    if (r.Hortor.isApp() && "233" !== this.channel) {
      let e = r.Hortor.platformSysBigType == r.PlatformSysBigType.Android ? l.gameEnv.toponAdPlacementId_Android : l.gameEnv.toponAdPlacementId_Ios;
      HAPP.preloadVideoAd({
        id: e
      });
    }
  };
  let o = 0;
  e.showVideoAd = function (e) {
    let d = orange.TimeUtil.serverTime;
    if (r.Hortor.isApp()) {
      if (o > cc.director.getTotalTime()) return;
      o = cc.director.getTotalTime() + 1e3;
      let i = r.Hortor.platformSysBigType == r.PlatformSysBigType.Android ? l.gameEnv.toponAdPlacementId_Android : l.gameEnv.toponAdPlacementId_Ios;
      r.Hortor.showRewardvideoAd(i, "rewardvideo", o => {
        if (o) {
          e.succ && e.succ();
          t = d;
        } else e.fail && e.fail();
      });
    } else if (i.tt || i.wx) {
      if (i.tt && !a.Util.compareSDKVersion("1.3.0")) {
        e.fail && e.fail(c.LowSdk);
        n.default.hideLoading("播放广告失败");
        return;
      }
      if (i.wx && !a.Util.compareSDKVersion("2.0.4")) {
        e.fail && e.fail(c.LowSdk);
        n.default.hideLoading("播放广告失败");
        return;
      }
      if (i.crossPlatform.createRewardedVideoAd) {
        s.TGA.track("showVideoAd", {
          adUnitId: e.id,
          step: "click"
        });
        let o = i.crossPlatform.createRewardedVideoAd({
            adUnitId: e.id
          }),
          a = i => {
            if (i.isEnded) {
              e.succ && e.succ();
              t = d;
              s.TGA.track("showVideoAd", {
                adUnitId: e.id,
                step: "succ"
              });
            } else {
              console.log(i);
              e.fail && e.fail(c.UserCancel);
            }
            o.offClose(a);
            o.offError(r);
            n.default.hideLoading();
          },
          r = t => {
            console.log("video onError", t);
            e.fail && e.fail(c.NoAd);
            o.offClose(a);
            o.offError(r);
            n.default.hideLoading("播放广告失败");
          };
        o.onError(r);
        n.default.showLoading("广告准备中");
        o.show().then(() => {
          o.onClose(a);
        }).catch(() => {
          o.load().then(() => {
            o.show().then(() => {
              o.onClose(a);
            }).catch(t => {
              console.log(t);
              e.fail && e.fail(c.NoAd);
              o.offError(r);
            });
          }).catch(t => {
            console.log(t);
            e.fail && e.fail(c.NoAd);
            o.offError(r);
          });
        });
      } else {
        e.succ && e.succ();
        t = d;
      }
    } else {
      e.fail && e.fail(c.NoAd);
      n.default.showToast("暂无广告");
    }
  };
  e.showBanner = function (e, t) {
    if (i.tt) {
      if (i.systemInfo.appName == i.AppName.Douyin) return;
      let o = i.crossPlatform.createBannerAd({
        adUnitId: e,
        adIntervals: 30,
        style: t
      });
      o.onResize(e => {
        o.style.top = i.systemInfo.windowHeight - e.height;
        o.style.left = (i.systemInfo.windowWidth - e.width) / 2;
      });
      let n = () => {
        o.show().then(() => {
          console.log("广告显示成功");
        }).catch(e => {
          console.log("广告组件出现问题", e);
        });
        o.offLoad(n);
      };
      o.onLoad(n);
      return o;
    }
    return null;
  };
})(o.AD || (exports.AD = {}));