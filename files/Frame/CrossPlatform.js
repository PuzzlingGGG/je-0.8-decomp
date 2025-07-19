"use strict";

exports.systemInfo = exports.tt = exports.wx = exports.crossPlatform = exports.CrossPlatform = exports.AppName = exports.Image = exports.Context = exports.Canvas = exports.GameRecorderShareButton = exports.DownloadTask = exports.UploadTask = exports.UserGameData = exports.KVData = exports.SystemInfo = exports.BannerAd = exports.VideoAd = void 0;
class i {
  show() {
    return new Promise(e => {
      e(null);
    });
  }
  load() {
    return new Promise(e => {
      e(null);
    });
  }
  onLoad(e) {}
  offLoad(e) {}
  onError(e) {}
  offError(e) {}
  onClose(e) {}
  offClose(e) {}
}
exports.VideoAd = i;
class n {
  show() {
    return new Promise(e => {
      e(null);
    });
  }
  hide() {}
  destroy() {}
  onLoad(e) {}
  offLoad(e) {}
  onError(e) {}
  offError(e) {}
  onResize(e) {}
  offResize(e) {}
}
exports.BannerAd = n;
class a {}
exports.SystemInfo = a;
exports.KVData = class {};
exports.UserGameData = class {};
exports.UploadTask = class {
  abort() {}
  onProgressUpdate(e) {}
  offProgressUpdate(e) {}
  onHeadersReceived(e) {}
  offHeadersReceived(e) {}
};
class s {
  onProgressUpdate(e) {}
  offProgressUpdate(e) {}
  onHeadersReceived(e) {}
  offHeadersReceived(e) {}
}
exports.DownloadTask = s;
class r {
  show() {}
  hide() {}
  onTap(e) {}
  offTap(e) {}
}
exports.GameRecorderShareButton = r;
class l {
  getContext(e) {
    return new c();
  }
  toTempFilePath(e) {
    e.success({
      tempFilePath: ""
    });
  }
  toTempFilePathSync(e) {
    return "#tempFilePath#";
  }
}
exports.Canvas = l;
class c {
  fillRect(e, t, o, i) {}
  drawImage(e, t, o, i, n, a, s, r, l) {}
}
exports.Context = c;
class d {
  onload(e) {}
  onerror(e) {}
}
exports.Image = d;
(function (e) {
  e.Toutiao = "Toutiao";
  e.Douyin = "Douyin";
  e.XiGua = "XiGua";
  e.NewsLite = "news_article_lite";
})(o.AppName || (exports.AppName = {}));
class h {
  constructor() {
    this.isDebug = !0;
    this.env = {
      USER_DATA_PATH: "Root:"
    };
    this.onShowListeners = [];
    this.onHideListeners = [];
    this._onKeyboardConfirmIdx = 0;
  }
  onNetworkStatusChange(e) {
    throw new Error("onNetworkStatusChange not implemented.");
  }
  fakeLeaveAndBack(e) {
    for (let e = 0; e < this.onHideListeners.length; e++) this.onHideListeners[e]();
    setTimeout(() => {
      for (let t = 0; t < this.onShowListeners.length; t++) this.onShowListeners[t](e);
    }, 400);
  }
  onShow(e) {
    this.onShowListeners.push(e);
  }
  onHide(e) {
    this.onHideListeners.push(e);
  }
  getLaunchOptionsSync() {
    return {
      scene: 1e3,
      query: null,
      shareTicket: "",
      referrerInfo: null
    };
  }
  shareAppMessage(e) {
    e.success && e.success({});
    console.log("分享", e);
  }
  setStorage(e) {
    this.setStorageSync(e.key, e.data);
  }
  setStorageSync(e, t) {
    localStorage.setItem(e, JSON.stringify(t));
  }
  getStorage(e) {
    let t = this.getStorageSync(e.key);
    e.success(t);
  }
  getStorageSync(e) {
    let t = localStorage.getItem(e);
    null == (t = JSON.parse(t)) && (t = "");
    return t;
  }
  removeStorageSync(e) {
    localStorage.removeItem(e);
  }
  clearStorageSync() {
    localStorage.clear();
  }
  exitMiniProgram() {
    console.log("退出游戏");
  }
  getFileSystemManager() {
    return {
      saveFile(e) {
        e.success(e.filePath);
      },
      saveFileSync: (e, t) => t + ":" + e,
      accessSync(e) {},
      mkdirSync(e, t) {},
      writeFileSync(e, t, o = "binary") {},
      readFileSync: () => "",
      unlinkSync(e) {}
    };
  }
  createGameRecorderShareButton(e) {
    return new r();
  }
  getGameRecorder() {
    return {
      start(e) {
        console.log("开始录屏");
        return new Promise(() => {});
      },
      stop() {
        console.log("结束录屏");
        return new Promise(() => {});
      },
      pause() {},
      resume() {},
      on(e, t) {},
      off(e, t) {},
      recordClip(e) {},
      clipVideo(e) {},
      onInterruptionBegin(e) {},
      onInterruptionEnd(e) {}
    };
  }
  getGameRecorderManager() {
    return {
      start(e) {
        console.log("开始录屏");
      },
      pause() {},
      recordClip(e) {},
      clipVideo(e) {},
      resume() {},
      stop() {
        console.log("结束录屏");
        return "视频地址";
      },
      onStart(e) {},
      onResume(e) {},
      onPause(e) {},
      onStop(e) {},
      onError(e) {},
      onInterruptionBegin(e) {},
      onInterruptionEnd(e) {}
    };
  }
  createCanvas() {
    return new l();
  }
  createImage() {
    return new d();
  }
  getOpenDataContext() {
    return {
      postMessage(e) {}
    };
  }
  getSystemInfoSync() {
    let e = new a();
    e.system = "Android";
    e.SDKVersion = "99.99.99";
    return e;
  }
  createRewardedVideoAd(e) {
    return new i();
  }
  createBannerAd(e) {
    return new n();
  }
  reportAnalytics(e, t) {
    console.log("Analytics", e, t);
  }
  vibrateShort() {}
  vibrateLong() {}
  login(e) {
    e.success({
      code: 1
    });
  }
  setUserGroup(e) {}
  setUserCloudStorage(e) {
    e.success && e.success();
  }
  getFriendCloudStorage(e) {
    e.success([]);
  }
  downloadFile(e) {
    return new s();
  }
  uploadFile(e) {
    return new s();
  }
  showKeyboard(e) {}
  hideKeyboard(e) {}
  offKeyboardConfirm(e) {}
  onKeyboardConfirm(e) {
    e && e({
      value: "哈哈哈" + this._onKeyboardConfirmIdx++
    });
  }
  getSetting(e) {}
  authorize(e) {}
  getUserInfo(e) {}
  onShareAppMessage(e) {}
  onShareTimeline(e) {}
  showShareMenu(e) {}
  getUpdateManager() {
    return {
      onCheckForUpdate: () => {},
      onUpdateReady: () => {},
      applyUpdate: () => {},
      onUpdateFailed: () => {}
    };
  }
  saveImageToPhotosAlbum(e) {
    e.success();
  }
  openSetting(e) {}
  showModal(e) {}
  request(e) {}
  openAwemeUserProfile() {}
  navigateToVideoView(e) {
    e.success({});
  }
  setClipboardData(e) {
    e.success && e.success(null);
    navigator.clipboard.writeText(e.data);
  }
  getMenuButtonLayout() {
    return {
      width: 84,
      height: 32,
      top: 26,
      bottom: 58,
      left: 280,
      right: 369
    };
  }
}
exports.CrossPlatform = h;
exports.crossPlatform = new h();
exports.wx = window.wx;
exports.tt = window.tt;
if (o.tt) {
  exports.crossPlatform = o.tt;
  exports.wx = null;
}
o.wx && (exports.crossPlatform = o.wx);
exports.systemInfo = o.crossPlatform.getSystemInfoSync();