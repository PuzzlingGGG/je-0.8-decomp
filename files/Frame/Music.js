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
const s = e("./Util"),
  {
    ccclass: r,
    property: l
  } = cc._decorator;
let c = i = class extends cc.Component {
  constructor() {
    super(...arguments);
    this.clip = null;
    this.loop = !1;
    this.volume = 1;
    this.id = null;
    this.playing = !1;
    this.pausing = !1;
    this.playingWhenDisable = !1;
    this.url = "";
  }
  onLoad() {}
  onEnable() {
    this.playingWhenDisable && this.resume();
  }
  onDisable() {
    this.playingWhenDisable = this.playing;
    this.playing && this.pause();
  }
  onDestroy() {
    this.stop();
  }
  loadMusic(e, t = null) {
    return a(this, void 0, void 0, function* () {
      this.url = e;
      this.clip = null;
      let o = yield s.Util.loadBundleRes("Music/" + e, cc.AudioClip);
      if (this.url == e) {
        this.clip = o;
        if (t && this.isValid) {
          t();
          this.node.emit(i.Loaded);
        }
      }
    });
  }
  play() {
    if (!(this.volume <= 0)) {
      null != this.id && this.stop();
      this.id = cc.audioEngine.play(this.clip, this.loop, this.volume * i.volume);
      this.pausing && this.pause();
      cc.audioEngine.setFinishCallback(this.id, e => {
        this.node.emit(i.Finish);
        this.playing = !1;
        this.id = null;
        console.log("Music Finish", e);
      });
      this.playing = !0;
    }
  }
  stop() {
    cc.audioEngine.stop(this.id);
    this.id = null;
    this.playing = !1;
  }
  pause() {
    this.pausing = !0;
    if (this.id) {
      cc.audioEngine.pause(this.id);
      this.playing = !1;
    }
  }
  resume() {
    this.pausing = !1;
    if (this.id) {
      cc.audioEngine.resume(this.id);
      this.playing = !0;
    }
  }
  getDuration() {
    return cc.audioEngine.getDuration(this.id);
  }
  setCurrentTime(e) {
    cc.audioEngine.setCurrentTime(this.id, e);
  }
  getCurrentTime() {
    return cc.audioEngine.getCurrentTime(this.id);
  }
  getState() {
    return cc.audioEngine.getState(this.id);
  }
  hasId() {
    return null !== this.id;
  }
  isLoaded() {
    return null !== this.clip;
  }
};
c.Finish = "MusicFinish";
c.Loaded = "MusicLoaded";
c.volume = 1;
n([l({
  type: cc.AudioClip
})], c.prototype, "clip", void 0);
n([l], c.prototype, "loop", void 0);
n([l], c.prototype, "volume", void 0);
c = i = n([r], c);
exports.default = c;