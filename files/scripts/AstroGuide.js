"use strict";

var i = this && this.__decorate || function (e, t, o, i) {
  var n,
    a = arguments.length,
    s = a < 3 ? t : null === i ? i = Object.getOwnPropertyDescriptor(t, o) : i;
  if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) s = Reflect.decorate(e, t, o, i);else for (var r = e.length - 1; r >= 0; r--) (n = e[r]) && (s = (a < 3 ? n(s) : a > 3 ? n(t, o, s) : n(t, o)) || s);
  return a > 3 && s && Object.defineProperty(t, o, s), s;
};
const n = e("../../i18n/i18nMgr"),
  a = e("../CustomUI/Button"),
  s = e("../Frame/Util"),
  {
    ccclass: r,
    property: l
  } = cc._decorator;
let c = class extends cc.Component {
  constructor() {
    super(...arguments);
    this.ani = null;
    this.astro = null;
    this.bubble = null;
    this.label = null;
    this.continueLabel = null;
    this.touch = null;
    this.block = null;
    this.btn = null;
    this.str = "";
    this.timer = 0;
    this.charIdx = 0;
    this.lineIdx = 0;
    this.playing = !1;
    this.closeCall = null;
    this.timePerWorld = .05;
    this.onEnd = null;
    this.lines = [];
  }
  onLoad() {
    this.maskNode(null);
    this.bubble.active = !1;
    s.Util.makeBro(this.btn.node, 0);
    this.touch.on(cc.Node.EventType.TOUCH_END, this.onTouchEnd, this);
  }
  maskNode(e) {
    if (e) {
      this.touch.active = !1;
      let t = s.Util.convertPosition(e, this.node);
      this.block.width = e.width;
      this.block.height = e.height;
      this.block.position = t;
      this.block.anchorX = e.anchorX;
      this.block.anchorY = e.anchorY;
      s.Util.updateAllWidget(this.block);
    } else {
      this.touch.active = !1;
      this.block.x = 0;
      this.block.y = 1e3;
      this.block.width = 0;
      this.block.height = 0;
      s.Util.updateAllWidget(this.block);
    }
  }
  setMaskOpacity(e) {
    for (let t = 0; t < this.block.childrenCount; t++) this.block.children[t].opacity = e;
  }
  playAnim(e) {
    return new Promise(t => {
      this.ani.play(e);
      this.ani.once(cc.Animation.EventType.STOP, () => {
        t();
      }, this);
    });
  }
  moveLeftRight() {
    return new Promise(e => {
      this.astro.node.runAction(cc.sequence(cc.moveTo(.3, -310, -600), cc.callFunc(e)));
    });
  }
  moveCenter() {
    return new Promise(e => {
      this.astro.node.runAction(cc.sequence(cc.moveTo(.3, -220, -169), cc.callFunc(e)));
    });
  }
  moveUp() {
    return new Promise(e => {
      this.astro.node.runAction(cc.sequence(cc.moveTo(.3, -220, 200), cc.callFunc(e)));
    });
  }
  update(e) {
    if (this.playing) {
      this.timer += e;
      if (this.timer > this.timePerWorld) {
        this.timer -= this.timePerWorld;
        this.charIdx++;
        this.charIdx <= this.str.length ? this.label.string = this.str.substr(0, this.charIdx) : this.endLine();
      }
    }
  }
  showBubble(e) {
    this.node.active = !0;
    this.astro.node.active = !0;
    return new Promise(t => {
      this.touch.active = !0;
      this.bubble.active = !0;
      this.playing = !0;
      this.lines = e;
      this.lineIdx = 0;
      this.onEnd = t;
      if (e.length > 0) {
        let t = e[0];
        this.playLine(t);
      }
    });
  }
  hideBubble() {
    this.bubble.active = !1;
    this.playing = !1;
  }
  playLine(e) {
    this.timer = 0;
    this.charIdx = 0;
    this.str = n.I18nMgr.getI18nStringByZh(e.str);
    this.str.length < 60 ? this.bubble.height = 229 : this.str.length >= 60 ? this.bubble.height = 349 : this.str.length >= 90 && (this.bubble.height = 349);
    this.playing = !0;
    this.label.string = "";
    this.timePerWorld = e.timePerWorld || .05;
    s.Util.makeBro(this.btn.node, 0);
    this.continueLabel.node.active = !1;
  }
  nextLine() {
    this.touch.active = !0;
    this.lineIdx++;
    if (this.lineIdx < this.lines.length) this.playLine(this.lines[this.lineIdx]);else {
      this.hideBubble();
      s.Util.makeBro(this.btn.node, 0);
      let e = this.onEnd;
      if (e) {
        this.onEnd = null;
        e();
      }
    }
  }
  endLine() {
    this.label.string = this.str;
    this.playing = !1;
    let e = this.lines[this.lineIdx];
    if (e.btnStr) {
      this.touch.active = !1;
      s.Util.makeBro(this.btn.node, 1, t => {
        let o = t.getComponent(a.default);
        o.label.string = e.btnStr;
        o.node.targetOff(this);
        o.node.on(a.default.CLICK, this.onTouchEnd, this);
      });
    } else if (e.options) {
      this.touch.active = !1;
      s.Util.makeBro(this.btn.node, e.options.length, (t, o) => {
        let i = t.getComponent(a.default),
          n = e.options[o];
        i.label.string = n.str;
        i.node.targetOff(this);
        i.node.on(a.default.CLICK, () => {
          n.lines && this.insert(n.lines);
          n.call && n.call();
          this.nextLine();
        }, this);
      });
    } else this.continueLabel.node.active = !0;
  }
  onTouchEnd() {
    this.lines ? this.playing ? this.endLine() : this.nextLine() : this.hideBubble();
  }
  insert(e) {
    let t = this.lineIdx + 1,
      o = this.lines.slice(0, t),
      i = this.lines.slice(t, this.lines.length);
    this.lines = o.concat(e).concat(i);
  }
};
i([l(cc.Animation)], c.prototype, "ani", void 0);
i([l(cc.Sprite)], c.prototype, "astro", void 0);
i([l(cc.Node)], c.prototype, "bubble", void 0);
i([l(cc.Label)], c.prototype, "label", void 0);
i([l(cc.Label)], c.prototype, "continueLabel", void 0);
i([l(cc.Node)], c.prototype, "touch", void 0);
i([l(cc.Node)], c.prototype, "block", void 0);
i([l(a.default)], c.prototype, "btn", void 0);
c = i([r], c);
exports.default = c;