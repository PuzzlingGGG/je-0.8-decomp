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
const s = e("../../Frame/FightSystem"),
  r = e("../../Frame/SceneManager"),
  l = e("../../Scene/GameScene/GameScene"),
  c = e("../Player/Mng"),
  d = e("../Player/TriggerMng"),
  h = e("../World/Actor"),
  p = e("../World/Device"),
  {
    ccclass: u,
    property: m
  } = cc._decorator;
let f = i = class extends p.default {
  constructor() {
    super(...arguments);
    this.sprite = null;
    this._liveLimitCount = 1;
    this._spawnedTotalCount = 0;
    this._spawnedCount = 0;
    this._curSpawnIdx = 0;
    this._spawnList = [];
    this._liveMonsterIds = [];
    this._spawnTimer = .01;
    this._spawnInterval = 0;
    this._isRandom = !1;
  }
  onLoad() {
    super.onLoad();
  }
  update(e) {
    if (this.world.playing && this._spawnList && 0 != this._spawnList.length) if (this._spawnTimer >= 0) this._spawnTimer -= e;else {
      this._spawnTimer = this._spawnInterval;
      if (this._spawnedCount < this._spawnedTotalCount && this._liveMonsterIds.length < this._liveLimitCount) {
        this._isRandom && (this._curSpawnIdx = Math.floor(this._spawnList.length * Math.random()));
        this._curSpawnIdx >= this._spawnList.length && (this._curSpawnIdx = 0);
        let e = this._spawnList[this._curSpawnIdx++];
        this.spawn(e);
      }
    }
  }
  spawn(e) {
    return a(this, void 0, void 0, function* () {
      if (!e) return;
      let t = r.default.ins.findScene(l.default);
      if (!t) return;
      let o = c.Mng.Ins.worldMng.getActorData(t.curWorldId, e.actorId);
      if (!o) return;
      let i = this.node.getComponent(cc.Animation);
      i.play();
      i.once(cc.Animation.EventType.STOP, () => a(this, void 0, void 0, function* () {
        let e = this.world.addActor(this.node.position.add(cc.v2(0, 10)));
        this._liveMonsterIds.push(e.id);
        ++this._spawnedCount;
        e.node.on(s.FightSystem.Event.Killed, this.onMonsterDead, this);
        yield e.setData(o.data);
        t.initAi(t.world.worldLayout.type, e);
        d.default.Ins.emitTrigger(this.data.extra.onSpawn, this.node);
      }));
    });
  }
  onMonsterDead(e) {
    if (!e || !e.hper) return;
    let t = e.hper.getComponent(h.default);
    if (t) {
      let e = this._liveMonsterIds.findIndex(e => e == t.id);
      if (e >= 0) {
        this._liveMonsterIds.splice(e, 1);
        t.node.off(s.FightSystem.Event.Killed, this.onMonsterDead, this);
      }
    }
  }
  setData(e, t) {
    const o = Object.create(null, {
      setData: {
        get: () => super.setData
      }
    });
    return a(this, void 0, void 0, function* () {
      o.setData.call(this, e, t);
      e = this.data;
      let i = this.world;
      e.extra || (e.extra = {
        count: 10,
        interval: 1,
        isRandom: !1,
        spawnMonsters: [],
        liveLimitCount: 3,
        onSpawn: [],
        scale: 1
      });
      e.extra.scale = e.extra.scale || 1;
      this.node.scale = e.extra.scale;
      this._isRandom = e.extra.isRandom;
      this._spawnInterval = e.extra.interval;
      this._spawnedTotalCount = e.extra.count;
      this._liveLimitCount = e.extra.liveLimitCount;
      this._spawnedCount = 0;
      this._curSpawnIdx = 0;
      this._spawnList = e.extra.spawnMonsters;
      if (i.isGameScene && this._spawnList) for (let e of this._spawnList) {
        let t = i.GetActNodeByDataId(e.actorId);
        t instanceof h.default && i.removeActor(t);
      }
      yield c.Mng.Ins.spriteMng.setDeviceSprite(this.sprite, t.textureName, 64);
      let n = this.sprite.node.height;
      this.sprite.node.anchorY = (n - 64) / 2 / n;
    });
  }
  initInspector(e) {
    i.initInspector(e, this.conf, this, this.data);
  }
  static initInspector(e, t, o = null, i = null) {
    let n = i || t;
    n.extra = n.extra || {
      count: 10,
      interval: 1,
      isRandom: !1,
      spawnMonsters: [],
      liveLimitCount: 3,
      onSpawn: [],
      scale: 1
    };
    o && e.addHead(t.name, t.textureName);
    e.addNumberEditBox("缩放", n.extra.scale, .2, 8, e => {
      n.extra.scale = e;
      if (o) {
        o.node.scale = e;
        o.world.placeGizmos.setScale(e);
      }
    });
    e.addNumberEditBox("生成总数量", n.extra.count, 0, 99999, e => {
      n.extra.count = e;
    });
    e.addNumberEditBox("同时存在数", n.extra.liveLimitCount, 1, 999999, e => {
      n.extra.liveLimitCount = e;
    });
    e.addNumberEditBox("生成间隔（秒）", n.extra.interval, 0, 999999, e => {
      n.extra.interval = e;
    });
    e.addToggle("随机生成", n.extra.isRandom, e => {
      n.extra.isRandom = e;
    });
    o && e.addSpawnMonster("怪物列表：", n.extra.spawnMonsters);
    e.addTrigger("当生成怪物时：", n.extra.onSpawn, !1);
  }
};
n([m({
  override: !0,
  type: cc.Sprite
})], f.prototype, "sprite", void 0);
f = i = n([u], f);
exports.default = f;