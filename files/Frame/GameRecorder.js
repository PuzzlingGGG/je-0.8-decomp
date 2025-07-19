"use strict";

const i = e("../CustomUI/Button"),
  n = e("./CrossPlatform"),
  a = e("./Top"),
  s = e("./TweenUtil"),
  r = e("./UIColor"),
  l = e("../Platform/Recorder/PlatformRecorderApp"),
  c = new class {
    constructor() {
      this._startStamp = 0;
      this._videoDuration = 0;
      this._videoPath = "";
      this._recordering = !1;
      this._inited = !1;
      this._wxShareBtn = null;
      this._platformRecorder = null;
      this._recordBtn = null;
      this._shareData = null;
      this._busy = !1;
    }
    get hasVideo() {
      cc.log("video: " + this._videoPath);
      return "" != this._videoPath;
    }
    attachRecordButton(e, t) {
      this._recordBtn = e;
      this._shareData = t;
      this._recordBtn.node.on(i.default.CLICK, this._onTap, this);
      this._videoPath = "";
      this._updateButton();
    }
    dettachRecordButton() {
      this._recordBtn && (this._recordBtn = null);
    }
    _onTap() {
      "" != this._videoPath ? this._platformRecorder.isButtonShare() ? this.share(this._shareData) : this.stopAndClear() : this._recordering ? this.stop() : this.start();
      this._updateButton();
    }
    _updateButton() {
      if (this._recordBtn) if ("" != this._videoPath) {
        if (this._platformRecorder.isButtonShare()) {
          this._recordBtn.label.string = "发布";
          this._recordBtn.background.node.color = r.UIColor.blue;
          s.TweenUtil.applyBreath(this._recordBtn.node);
        } else {
          this._recordBtn.label.string = "重置";
          this._recordBtn.background.node.color = r.UIColor.pink;
          this.showWxShareBtn(this._shareData.query);
        }
      } else if (this._recordering) {
        this._recordBtn.label.string = "录制中";
        this._recordBtn.background.node.color = r.UIColor.pink;
      } else {
        this._recordBtn.label.string = "录屏";
        this._recordBtn.background.node.color = r.UIColor.green;
      }
    }
    init() {
      if (!this._inited) {
        this._inited = !0;
        this._platformRecorder = new l.default();
        window.screenRecorder = this._platformRecorder;
        this._platformRecorder.onStart((e => {
          this._videoDuration = 0;
          this._startStamp = orange.TimeUtil.serverTime;
          this._recordering = !0;
          this._busy = !1;
          this._updateButton();
          console.log("GameRecorder.onStart", JSON.stringify(e));
        }).bind(this));
        this._platformRecorder.onStop((e => {
          this._busy = !1;
          console.log("GameRecorder.onStop", JSON.stringify(e));
          this._recordering = !1;
          this._videoPath = e.videoPath;
          this._videoDuration = orange.TimeUtil.serverTime - this._startStamp;
          if (this._videoDuration < 4e3) {
            this._recordBtn && a.default.showToast("Recording too short...");
            this._videoPath = "";
          }
          this._updateButton();
        }).bind(this));
      }
    }
    start(e = 300) {
      if (!this._busy) {
        this._busy = !0;
        this._platformRecorder.start(e);
      }
    }
    stop() {
      if (this._inited && this._recordering && !this._busy) {
        this._busy = !0;
        this._platformRecorder.stop();
      }
    }
    stopAndClear() {
      this.stop();
      this._wxShareBtn && this._wxShareBtn.hide();
    }
    share(e) {
      a.default.showLoading("分享录屏准备中");
      this._platformRecorder.share({
        channel: "video",
        query: e.query,
        extra: {
          videoPath: this._videoPath,
          videoTopics: e.topics,
          hashtag_list: e.topics,
          withVideoId: !0
        },
        success: (t => {
          if (e.succ) {
            a.default.showToast("Succeed share to TikTok!");
            a.default.hideLoading();
            e.succ(t);
          } else a.default.hideLoading("分享成功");
        }).bind(this),
        fail: (t => {
          if (e.fail) {
            a.default.hideLoading();
            e.fail(t);
          } else {
            var o = "分享失败";
            t && t.errMsg && (o = t.errMsg);
            a.default.hideLoading(o);
          }
        }).bind(this)
      });
    }
    isResultShareable() {
      return !!this._inited && null != this._platformRecorder && this._platformRecorder.isButtonShare();
    }
    showWxShareBtn(e) {
      let t = {
        query: e,
        title: {
          template: "default.score",
          data: {
            score: 1
          }
        },
        bgm: "",
        timeRange: [[0, 6e4]]
      };
      if (!this._wxShareBtn) {
        let e = n.systemInfo.windowWidth / 2 - 50;
        this._wxShareBtn = n.wx.createGameRecorderShareButton({
          text: "分享录屏",
          icon: null,
          image: "",
          style: {
            left: 0,
            top: n.systemInfo.windowHeight - 50,
            height: 50,
            paddingLeft: e,
            paddingRight: e
          },
          share: t
        });
      }
      this._wxShareBtn.share = t;
      this._wxShareBtn.show();
    }
    hideWxShareBtn() {
      this._wxShareBtn && this._wxShareBtn.hide();
    }
  }();
exports.default = c;