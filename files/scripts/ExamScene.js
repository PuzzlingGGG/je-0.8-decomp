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
const a = e("../../../i18n/i18nMgr"),
  s = e("../../../scripts/_autogen/cmd/cmd"),
  r = e("../../CustomUI/Button"),
  l = e("../../CustomUI/ScrollList"),
  c = e("../../CustomUI/Toggle"),
  d = e("../../CustomUI/ToggleGroup"),
  h = e("../../Frame/NetworkMgr"),
  p = e("../../Frame/Scene"),
  u = e("../../Frame/SceneManager"),
  m = e("../../Frame/Top"),
  f = e("../../Frame/TweenUtil"),
  g = e("../../Frame/UIColor"),
  y = e("../../Frame/Util"),
  v = e("../../Role"),
  C = e("../../Scene/HomeScene/DiscoverSubPage/GameBanner"),
  {
    ccclass: _,
    property: S
  } = cc._decorator;
let I = class extends p.default {
  constructor() {
    super(...arguments);
    this.backBtn = null;
    this.titleLabel = null;
    this.prepare = null;
    this.exam = null;
    this.result = null;
    this.scrollList = null;
    this.toggleGroup = null;
    this.preBtn = null;
    this.nextBtn = null;
    this.examBtn = null;
    this.questionLabel = null;
    this.questionSprite = null;
    this.anwserLayout = null;
    this.anwserToggle = null;
    this.preQuestionBtn = null;
    this.nextQuestionBtn = null;
    this.submitBtn = null;
    this.questionToggleGroup = null;
    this.scoreLabel = null;
    this.tipLabel = null;
    this.resultLabel = null;
    this.reviewBtn = null;
    this.exitBtn = null;
    this.questionIdx = 0;
    this.anwserArr = [];
    this.prepareDatas = [{
      title: "转正测试规则",
      str: "        你好！在你准备大展身手之前，建议先来个小测试。转正成为正式开发者！\n        你可以在“测前准备”中学习平台规则，了解平台的提倡行为和禁止行为，请各位开发者一定要详细阅读哦，接下来测试的考点都在这了！\n        在测试中，获得100分，即可转正成为正式开发者！加油！",
      img: ""
    }, {
      title: "正式开发者可以做什么？",
      str: "        1. 发布游戏，通过你精致的画风和有创意的玩法，收获大批粉丝。\n        2. 上传素材，帮助别人更快更好的做出游戏，同时，你也可以赚取大量的G币。",
      img: "image2"
    }, {
      title: "什么样的作品是被禁止的？",
      str: "        以下内容属于严重禁止的内容，如果你提交了这类内容，我们有权删除你的游戏工程，并以封号处理：\n        1. 色情低俗。\n        2. 政治敏感：近现代国家的国旗、国徽，军事战争等。例如，苏联徽章、国家球动画、二战。\n        3. 挑拨引战：例如，我的世界与迷你互喷。\n        4. 引人不适：在游戏中出现粗俗文字或素材，辱骂他人，竖中指等。",
      img: "image3"
    }, {
      title: "特殊提醒",
      str: "        在创游中，以下内容因涉及恐怖文化，也被禁止：\n        1. SCP（如：096，173，警笛头）\n        2. 恐怖暗黑游戏（比如：脑叶公司、玩具熊的五夜后宫）\n        如果遇到上述类型游戏，请举报。",
      img: "image4"
    }, {
      title: "Bug反馈",
      str: "        游戏过程中遇到bug，请到“我的”-“bug”反馈：",
      img: "image5"
    }, {
      title: "投稿“小编精选”的正确姿势：",
      str: "        抖音小游戏的用户，可以录制你的游戏视频，并@创游小助手，这样小助手可以更快找到你的游戏！\n        App的用户可以去应用商店的评论区，发布你的游戏截图并@小助手！",
      img: "image6"
    }, {
      title: "如何获得G币？",
      str: "        1. 看广告，不过广告数量有限制哦，每天最多15个。\n        2. 上架自己的素材。\n        3.在游戏内放置道具商店和广告点\n        4.玩家在你游戏内复活你也可以收到G币",
      img: ""
    }, {
      title: "如何做合格的创游公民",
      str: "        1. 发现好游戏时，请不要吝惜赞美之言，一键三连，送TA上推荐!\n        2.发现违规的游戏，请马上点举报。",
      img: "image8"
    }];
    this.questionDatas = [{
      question: "以下哪个游戏作品是创游不允许的？",
      anwserIdxs: [3],
      score: 10,
      anwsers: [{
        str: "我的冒险",
        img: "我的冒险"
      }, {
        str: "小道李自然",
        img: "小道李自然"
      }, {
        str: "狗头卡包",
        img: "狗头卡包"
      }, {
        str: "scp",
        img: "秘密实验室"
      }]
    }, {
      question: "遇到这个游戏，你应该怎么做？",
      img: "炸掉迷你世界",
      anwserIdxs: [0],
      score: 10,
      anwsers: [{
        str: "举报",
        img: ""
      }, {
        str: "点赞收藏",
        img: ""
      }, {
        str: "转发给身边的朋友",
        img: ""
      }]
    }, {
      question: "在游戏里遇到了bug，应该怎么处理？",
      anwserIdxs: [1],
      score: 10,
      anwsers: [{
        str: "在评论区破口大骂",
        img: ""
      }, {
        str: "点击“我的”页面中bug反馈",
        img: ""
      }, {
        str: "去创游小助手的抖音账号喷他",
        img: ""
      }]
    }, {
      question: "创游会优先推荐哪种游戏？",
      anwserIdxs: [2],
      score: 10,
      anwsers: [{
        str: "剧情精彩的恐怖游戏",
        img: ""
      }, {
        str: "画质绝美的引战游戏",
        img: ""
      }, {
        str: "极具创意的原创游戏",
        img: ""
      }]
    }, {
      question: "以下哪些游戏是创游禁止的？<color=#F18AA5>（多选）</color>",
      anwserIdxs: [0, 1, 3],
      score: 10,
      anwsers: [{
        str: "波兰球",
        img: "波兰球"
      }, {
        str: "sb",
        img: "快火起来"
      }, {
        str: "对战游戏",
        img: "vs"
      }, {
        str: "诺曼底登陆战",
        img: "诺曼底登陆战"
      }]
    }, {
      question: "以下哪个人物是创游世界里不能出现的？",
      anwserIdxs: [0],
      score: 10,
      anwsers: [{
        str: "警笛头",
        img: "警笛头"
      }, {
        str: "太空人",
        img: "太空人"
      }, {
        str: "狗头",
        img: "狗头"
      }, {
        str: "兽设",
        img: "兽设"
      }]
    }, {
      question: "表达对一个作品的喜爱，可以采用哪些方式？<color=#F18AA5>（多选）</color>",
      anwserIdxs: [0, 1, 3],
      score: 10,
      anwsers: [{
        str: "点赞",
        img: ""
      }, {
        str: "收藏",
        img: ""
      }, {
        str: "照抄",
        img: ""
      }, {
        str: "催更",
        img: ""
      }]
    }, {
      question: "想让自己的游戏上精选，应该怎么做？<color=#F18AA5>（多选）</color>",
      anwserIdxs: [0, 2],
      score: 10,
      anwsers: [{
        str: "@创游小助手投稿",
        img: ""
      }, {
        str: "去别人的评论区里刷屏宣传",
        img: ""
      }, {
        str: "分享给自己的朋友玩，提升游戏热度",
        img: ""
      }]
    }, {
      question: "素材没人买，可能是什么原因？<color=#F18AA5>（多选）</color>",
      anwserIdxs: [0, 1],
      score: 10,
      anwsers: [{
        str: "定价太高",
        img: ""
      }, {
        str: "画的太丑",
        img: ""
      }, {
        str: "别人没眼光",
        img: ""
      }]
    }, {
      question: "如何获得G币？<color=#F18AA5>（多选）</color>",
      anwserIdxs: [0, 1, 2],
      score: 10,
      anwsers: [{
        str: "看广告",
        img: ""
      }, {
        str: "去商店卖素材",
        img: ""
      }, {
        str: "制作游戏赚G币",
        img: ""
      }, {
        str: "外挂刷G币",
        img: ""
      }]
    }];
  }
  onLoad() {
    this.toggleGroup.node.on(d.default.TOGGLE_CHANGE, this.onToggleChange, this);
    this.scrollList.node.on(cc.Node.EventType.TOUCH_END, this.onTouchEnd10, this);
    this.scrollList.node.on(cc.Node.EventType.TOUCH_CANCEL, this.onTouchEnd10, this);
    this.backBtn.node.on(r.default.CLICK, this.onBackBtn, this);
    this.preBtn.node.on(r.default.CLICK, this.onPreBtn, this);
    this.nextBtn.node.on(r.default.CLICK, this.onNextBtn, this);
    this.examBtn.node.on(r.default.CLICK, this.onExamBtn, this);
    this.preQuestionBtn.node.on(r.default.CLICK, this.onPreQuestionBtn, this);
    this.nextQuestionBtn.node.on(r.default.CLICK, this.onNextQuestionBtn, this);
    this.submitBtn.node.on(r.default.CLICK, this.onSubmitBtn, this);
    this.reviewBtn.node.on(r.default.CLICK, this.onReviewBtn, this);
    this.exitBtn.node.on(r.default.CLICK, this.onBackBtn, this);
    this.questionToggleGroup.node.on(d.default.TOGGLE_CHANGE, this.onQuestionToggleChange, this);
  }
  onBackBtn() {
    u.default.ins.Back();
  }
  start() {
    this.setPrepareState();
  }
  setPrepareState() {
    this.prepare.active = !0;
    this.exam.active = !1;
    this.result.active = !1;
    this.titleLabel.string = "测前准备";
    y.Util.makeBro(this.toggleGroup.node.children[0], this.prepareDatas.length);
    this.scrollList.setDataArr(this.prepareDatas);
    this.toggleGroup.selectIdx(0);
  }
  onPreBtn() {
    return n(this, void 0, void 0, function* () {
      let e = this.scrollList.curSelectIdx;
      e > 0 && this.toggleGroup.selectIdx(e - 1);
    });
  }
  onNextBtn() {
    return n(this, void 0, void 0, function* () {
      let e = this.scrollList.curSelectIdx;
      e < this.scrollList.getDataArr().length - 1 && this.toggleGroup.selectIdx(e + 1);
    });
  }
  onExamBtn() {
    return n(this, void 0, void 0, function* () {
      u.default.ins.OpenPanelByName("MessageBox", e => {
        e.label.string = "是否开始测试？";
        e.setLeftBtn({
          text: "再准备一下",
          color: g.UIColor.blue
        });
        e.setRightBtn({
          text: "开始测试",
          color: g.UIColor.pink,
          call: () => {
            this.setExamState();
          }
        });
      });
    });
  }
  onToggleChange(e) {
    this.scrollList.centerToIdx(e, .3);
    this.scrollList.selectByIdx(e);
    let t = e == this.scrollList.getDataArr().length - 1;
    this.examBtn.node.active = t;
    this.nextBtn.node.active = !t;
  }
  onTouchEnd10(e) {
    let t = e.target,
      o = t.convertToWorldSpaceAR(e.getStartLocation()),
      i = t.convertToWorldSpaceAR(e.getLocation()).sub(o),
      n = this.scrollList.curSelectIdx;
    if (i.x > 50 && n > 0) this.toggleGroup.selectIdx(n - 1);else if (i.x < -50 && n < this.scrollList.getDataArr().length - 1) this.toggleGroup.selectIdx(n + 1);else {
      this.onToggleChange(n);
      if (i.magSqr() < 10) {
        let e = this.scrollList.getExtraData(n);
        if (e && e.item) {
          let t = e.item.getComponent(C.default);
          t && t.onClick();
        }
      }
    }
  }
  setExamState() {
    this.prepare.active = !1;
    this.exam.active = !0;
    this.result.active = !1;
    this.titleLabel.string = "测试";
    this.anwserArr = [];
    for (let e = 0; e < this.questionDatas.length; e++) this.anwserArr.push([!1, !1, !1, !1]);
    this.initQuestion(this.questionIdx);
    y.Util.makeBro(this.questionToggleGroup.node.children[0], this.questionDatas.length);
    this.questionToggleGroup.selectIdx(0);
  }
  onQuestionToggleChange(e, t, o) {
    o && this.initQuestion(e);
  }
  initQuestion(e) {
    return n(this, void 0, void 0, function* () {
      this.questionIdx = e;
      let t = this.questionDatas[e],
        o = 1 == t.anwserIdxs.length;
      this.questionLabel.string = `${e + 1}. ${t.question}`;
      if (t.img) {
        this.questionSprite.node.active = !0;
        this.questionSprite.spriteFrame = yield y.Util.loadBundleRes("Atlas/Exam/Question/" + t.img, cc.SpriteFrame);
      } else this.questionSprite.node.active = !1;
      let i = e == this.questionDatas.length - 1;
      this.nextQuestionBtn.node.active = !i;
      this.submitBtn.node.active = i;
      let a = this.anwserArr[e];
      y.Util.makeBro(this.anwserToggle.node, t.anwsers.length, (i, s) => n(this, void 0, void 0, function* () {
        let n = i.getComponent(c.default);
        n.isChecked = a[s];
        let l = t.anwsers[s];
        n.label.string = `${["A", "B", "C", "D"][s]}. ${l.str}`;
        n.background.spriteFrame = null;
        if (l.img) {
          this.anwserLayout.spacingY = 80;
          n.label.node.y = -160;
          n.node.width = 250;
          n.node.height = 250;
          n.background.node.active = !0;
          n.background.spriteFrame = yield y.Util.loadBundleRes("Atlas/Exam/Anwser/" + l.img, cc.SpriteFrame);
        } else {
          this.anwserLayout.spacingY = 10;
          n.label.node.y = 0;
          n.node.width = 550;
          n.node.height = 100;
          n.background.node.active = !1;
        }
        y.Util.updateAllWidget(n.node);
        n.node.targetOff(this);
        n.node.on(r.default.CLICK, () => {
          if (o) {
            let e = this.anwserLayout.node.parent.getComponentsInChildren(c.default);
            for (let o = 0; o < t.anwsers.length; o++) if (o != s) {
              this.anwserArr[this.questionIdx][o] = !1;
              e[o].isChecked = !1;
            }
          }
          this.anwserArr[this.questionIdx][s] = n.isChecked;
          this.questionToggleGroup.node.children[e].getComponent(c.default).background.node.color = g.UIColor.white;
        }, this);
      }));
    });
  }
  onPreQuestionBtn() {
    this.questionIdx > 0 && this.questionToggleGroup.selectIdx(this.questionIdx - 1);
  }
  onNextQuestionBtn() {
    this.questionIdx < this.questionDatas.length && this.questionToggleGroup.selectIdx(this.questionIdx + 1);
  }
  onSubmitBtn() {
    let e = [];
    for (let t = 0; t < this.anwserArr.length; t++) this.anwserArr[t].every(e => 0 == e) && e.push(t);
    if (e.length > 0) {
      for (let t = 0; t < this.questionToggleGroup.node.childrenCount; t++) this.questionToggleGroup.node.children[t].getComponent(c.default).background.node.color = e.includes(t) ? g.UIColor.red : g.UIColor.white;
      for (let t = 0; t < e.length; t++) e[t]++;
      m.default.showToast(`还未作答第${e.join(",")}题`);
    } else u.default.ins.OpenPanelByName("MessageBox", e => {
      e.label.string = "是否交卷？";
      e.setLeftBtn({
        text: "再检查一下",
        color: g.UIColor.blue
      });
      e.setRightBtn({
        text: "交卷",
        color: g.UIColor.pink,
        call: () => {
          m.default.showLoading("提交中");
          this.scheduleOnce(() => n(this, void 0, void 0, function* () {
            m.default.hideLoading();
            let e = 0,
              t = [];
            for (let o = 0; o < this.questionDatas.length; o++) {
              let i = this.anwserArr[o],
                n = this.questionDatas[o],
                a = !0;
              for (let e = 0; e < n.anwsers.length; e++) n.anwserIdxs.includes(e) !== i[e] && (a = !1);
              if (a) e += this.questionDatas[o].score;else {
                t.push(o + 1);
                console.log("第" + o + "错了", i, n.anwserIdxs);
              }
            }
            let o = {
              score: e
            };
            yield h.NetIns.SendCmdAsync({
              cmd: s.CMDS.Game_UploadTakeExamScore,
              params: o
            }, s.Game_RUploadTakeExamScore);
            v.default.Ins.role.examScore = e;
            this.setResultState(e, t);
          }), .4);
        }
      });
    });
  }
  setResultState(e, t) {
    this.prepare.active = !1;
    this.exam.active = !1;
    this.result.active = !0;
    this.titleLabel.string = "结果公布";
    this.scoreLabel.string = "" + e;
    let o = "";
    o = e >= 100 ? "恭喜您通过了测试！" : e >= 90 ? "好遗憾啊，就差一点！" : e >= 60 ? "及格了，满分才可以哦" : "啊这，乱答是不行的哦";
    let i = 100 == e;
    this.tipLabel.string = i ? "已转正！获得发布游戏的能力" : a.I18nMgr.exceI18nStringByZh('第${errorIdxs.join(",")}题答错了', [{
      paramName: 'errorIdxs.join(",")',
      param: t.join(",")
    }]);
    f.TweenUtil.applayTextAnim(this.resultLabel, a.I18nMgr.getI18nStringByZh(o), .1);
    this.reviewBtn.node.active = !i;
    this.exitBtn.node.active = i;
  }
  onReviewBtn() {
    this.setPrepareState();
  }
};
i([S(r.default)], I.prototype, "backBtn", void 0);
i([S(cc.Label)], I.prototype, "titleLabel", void 0);
i([S(cc.Node)], I.prototype, "prepare", void 0);
i([S(cc.Node)], I.prototype, "exam", void 0);
i([S(cc.Node)], I.prototype, "result", void 0);
i([S(l.default)], I.prototype, "scrollList", void 0);
i([S(d.default)], I.prototype, "toggleGroup", void 0);
i([S(r.default)], I.prototype, "preBtn", void 0);
i([S(r.default)], I.prototype, "nextBtn", void 0);
i([S(r.default)], I.prototype, "examBtn", void 0);
i([S(cc.RichText)], I.prototype, "questionLabel", void 0);
i([S(cc.Sprite)], I.prototype, "questionSprite", void 0);
i([S(cc.Layout)], I.prototype, "anwserLayout", void 0);
i([S(c.default)], I.prototype, "anwserToggle", void 0);
i([S(r.default)], I.prototype, "preQuestionBtn", void 0);
i([S(r.default)], I.prototype, "nextQuestionBtn", void 0);
i([S(r.default)], I.prototype, "submitBtn", void 0);
i([S(d.default)], I.prototype, "questionToggleGroup", void 0);
i([S(cc.Label)], I.prototype, "scoreLabel", void 0);
i([S(cc.Label)], I.prototype, "tipLabel", void 0);
i([S(cc.Label)], I.prototype, "resultLabel", void 0);
i([S(r.default)], I.prototype, "reviewBtn", void 0);
i([S(r.default)], I.prototype, "exitBtn", void 0);
I = i([_], I);
exports.default = I;