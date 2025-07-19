"use strict";

var i = this && this.__decorate || function (e, t, o, i) {
    var n,
      a = arguments.length,
      s = a < 3 ? t : null === i ? i = Object.getOwnPropertyDescriptor(t, o) : i;
    if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) s = Reflect.decorate(e, t, o, i);else for (var r = e.length - 1; r >= 0; r--) (n = e[r]) && (s = (a < 3 ? n(s) : a > 3 ? n(t, o, s) : n(t, o)) || s);
    return a > 3 && s && Object.defineProperty(t, o, s), s;
  },
  n = this && this.__awaiter || function (e, t, o, i) {
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
const a = e("../CustomUI/Button"),
  s = e("../Frame/Util"),
  r = e("./Player/Mng"),
  l = e("./Player/TriggerMng"),
  c = e("../GameScript/commands/GSCmdDialogue"),
  {
    ccclass: d,
    property: h
  } = cc._decorator;
let p = class extends cc.Component {
  constructor() {
    super(...arguments);
    this.sprite = null;
    this.nameLabel = null;
    this.dialogLabel = null;
    this.continueLabel = null;
    this.itemBtn = null;
    this.touchNode = null;
    this.triggerSource = null;
    this.timePerWorld = .05;
    this.str = "";
    this.items = [];
    this.timer = 0;
    this.charIdx = 0;
    this.lineIdx = 0;
    this.playing = !1;
    this.showing = !1;
    this.closeCall = null;
    this.lines = [];
  }
  onLoad() {
    this.touchNode.on(cc.Node.EventType.TOUCH_END, this.onTouchEnd, this);
    s.Util.makeBro(this.itemBtn.node, 0);
  }
  playLine(e) {
    return n(this, void 0, void 0, function* () {
      this.timer = 0;
      this.charIdx = 0;
      this.str = c.GSCmdDialogue.parseDialogue(e.str);
      this.items = e.items || [];
      if (e.evts) {
        this.items.push({
          str: "点击屏幕继续",
          evts: e.evts
        });
        delete e.evts;
      }
      this.playing = !0;
      this.dialogLabel.string = "";
      this.continueLabel.node.active = !1;
      let t = yield r.Mng.Ins.actorMng.loadOne(e.actorConfId);
      if (t) {
        this.sprite.node.active = !0;
        this.nameLabel.string = t.name + "：";
        r.Mng.Ins.spriteMng.setActorSprite(this.sprite, t.textureName, 140);
      } else {
        this.sprite.node.active = !1;
        this.nameLabel.string = "";
      }
    });
  }
  update(e) {
    if (this.playing) {
      this.timer += e;
      if (this.timer > this.timePerWorld) {
        this.timer -= this.timePerWorld;
        this.charIdx++;
        this.charIdx <= this.str.length ? this.dialogLabel.string = this.str.substr(0, this.charIdx) : this.endLine();
      }
    }
  }
  endLine() {
    this.dialogLabel.string = this.str;
    this.playing = !1;
    this.continueLabel.node.active = !0;
    if (this.items && this.items.length >= 2) {
      this.continueLabel.string = "请选择..";
      s.Util.makeBro(this.itemBtn.node, this.items.length, (e, t) => {
        let o = this.items[t],
          i = e.getComponent(a.default);
        i.label.string = `${t + 1}.  ${o.str}`;
        i.node.off(a.default.CLICK, this.onItemBtn, this);
        i.node.on(a.default.CLICK, this.onItemBtn, this);
      });
    } else this.items && 1 == this.items.length ? this.continueLabel.string = this.items[0].str + ".." : this.continueLabel.string = "点击屏幕继续..";
  }
  nextLine() {
    this.lineIdx++;
    this.lineIdx < this.lines.length ? this.playLine(this.lines[this.lineIdx]) : this.hide();
  }
  onItemBtn(e) {
    let t = e.target.getSiblingIndex(),
      o = this.items[t];
    if (o && o.evts) {
      l.default.Ins.emitTrigger(o.evts, this.triggerSource);
      this.nextLine();
    }
    s.Util.makeBro(this.itemBtn.node, 0);
  }
  onTouchEnd() {
    if (this.lines) {
      if (this.playing) this.endLine();else {
        if (this.items && this.items.length >= 2) return;
        this.items && 1 == this.items.length && l.default.Ins.emitTrigger(this.items[0].evts, this.triggerSource);
        this.nextLine();
      }
    } else this.hide();
  }
  show(e, t) {
    this.showing = !0;
    this.lines = e.lines.concat();
    this.triggerSource = t;
    this.node.active = !0;
    this.lineIdx = 0;
    if (e.lines.length > 0) {
      let t = e.lines[0];
      this.playLine(t);
    }
  }
  insert(e) {
    let t = this.lineIdx + 1,
      o = this.lines.slice(0, t),
      i = this.lines.slice(t, this.lines.length);
    this.lines = o.concat(e.lines).concat(i);
  }
  hide() {
    this.showing = !1;
    this.playing = !1;
    this.lines = null;
    this.node.active = !1;
    this.closeCall && this.closeCall();
    this.triggerSource = null;
  }
  check(e) {
    return e && e.lines && e.lines.length > 0;
  }
};
p.SHOW_DIALOG_BOX = "SHOW_DIALOG_BOX";
i([h(cc.Sprite)], p.prototype, "sprite", void 0);
i([h(cc.Label)], p.prototype, "nameLabel", void 0);
i([h(cc.Label)], p.prototype, "dialogLabel", void 0);
i([h(cc.Label)], p.prototype, "continueLabel", void 0);
i([h(a.default)], p.prototype, "itemBtn", void 0);
i([h(cc.Node)], p.prototype, "touchNode", void 0);
p = i([d], p);
exports.default = p;