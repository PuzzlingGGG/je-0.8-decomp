"use strict";

exports.Config = exports.FillActorDataHelper = void 0;
const i = e("./Util"),
  n = e("../GameData/GameTypeDefine");
exports.FillActorDataHelper = class {
  static fillActorDataByRpgConf(e, t) {
    e.moveSpeed = t.moveSpeed || 256;
    e.aiMoveType = t.aiMoveType;
    e.beatenLockHpTime = t.beatenLockHpTime;
    e.onBeaten = i.Util.deepCopy(t.onBeaten);
    e.onMove = i.Util.deepCopy(t.onMove);
    e.onDie = i.Util.deepCopy(t.onDie);
    e.onHeroEnter = i.Util.deepCopy(t.onHeroEnter);
    e.isEnteredWorldTypes = e.isEnteredWorldTypes || [];
    e.isEnteredWorldTypes[n.WorldType.Rpg] = !0;
  }
  static fillActorDataByJumpPlatformConf(e, t) {
    e.moveSpeed = t.moveSpeed;
    e.g = t.g;
    e.jumpStep = t.jumpStep;
    e.jumpHight = t.jumpHight;
    e.jumpInterval = t.jumpInterval;
    e.aiMoveType = t.aiMoveType;
    e.beatenLockHpTime = t.beatenLockHpTime;
    e.beatenBackRange = t.beatenBackRange;
    e.enableClimbWall = t.enableClimbWall;
    e.traceHeroRange = t.traceHeroRange;
    e.dirLineMoveData = t.dirLineMoveData;
    e.onBeaten = i.Util.deepCopy(t.onBeaten);
    e.onJump = i.Util.deepCopy(t.onJump);
    e.onMove = i.Util.deepCopy(t.onMove);
    e.onGroundMove = i.Util.deepCopy(t.onGroundMove);
    e.onAirMove = i.Util.deepCopy(t.onAirMove);
    e.onDie = i.Util.deepCopy(t.onDie);
    e.onHeroEnter = i.Util.deepCopy(t.onHeroEnter);
    e.isEnteredWorldTypes = e.isEnteredWorldTypes || [];
    e.isEnteredWorldTypes[n.WorldType.Jump] = !0;
  }
};
(function (e) {
  e.tagConfs = [{
    tag: "像素",
    icon: "像素"
  }, {
    tag: "二次元",
    icon: "二次元"
  }, {
    tag: "科幻",
    icon: "科幻"
  }, {
    tag: "萌系",
    icon: "萌系"
  }, {
    tag: "古风",
    icon: "古风"
  }, {
    tag: "音游",
    icon: "音游"
  }, {
    tag: "狗头",
    icon: "狗头"
  }, {
    tag: "兽设",
    icon: "兽设"
  }, {
    tag: "太空人",
    icon: "太空人"
  }];
  e.actorConfs = [{
    type: n.CommonDataType.Actor,
    id: "2",
    name: "Astro",
    textureName: "Actor/disuse/astro",
    author: "Julian",
    team: n.Team.Hero,
    gunId: "",
    hp: 1,
    hpMax: 1,
    collider: {
      offset: {
        x: 0,
        y: 0
      },
      size: {
        w: 32,
        h: 52
      }
    },
    isBuildIn: !0,
    rpgConf: {
      moveSpeed: 256,
      aiMoveType: n.AIMoveType.None,
      beatenLockHpTime: .8
    },
    jumpPlatformConf: {
      moveSpeed: 192,
      jumpStep: 2,
      jumpHight: 160,
      aiMoveType: n.AIMoveType.None,
      beatenLockHpTime: .8
    },
    disuse: !0
  }, {
    type: n.CommonDataType.Actor,
    id: "6",
    name: "Farmer",
    textureName: "Actor/disuse/civilian",
    author: "Julian",
    team: n.Team.Hero,
    gunId: "",
    hp: 1,
    hpMax: 1,
    collider: {
      offset: {
        x: 0,
        y: 0
      },
      size: {
        w: 32,
        h: 32
      }
    },
    isBuildIn: !0,
    rpgConf: {
      moveSpeed: 256,
      aiMoveType: n.AIMoveType.None,
      beatenLockHpTime: .8
    },
    jumpPlatformConf: {
      moveSpeed: 192,
      jumpStep: 1,
      jumpHight: 160,
      aiMoveType: n.AIMoveType.None,
      beatenLockHpTime: .8
    },
    disuse: !0
  }, {
    type: n.CommonDataType.Actor,
    id: "0",
    name: "Sheep",
    textureName: "Actor/disuse/sheep",
    author: "Julian",
    team: n.Team.Ally,
    gunId: "",
    hp: 1,
    hpMax: 1,
    collider: {
      offset: {
        x: 0,
        y: 0
      },
      size: {
        w: 32,
        h: 32
      }
    },
    isBuildIn: !0,
    rpgConf: {
      moveSpeed: 256,
      aiMoveType: n.AIMoveType.None,
      beatenLockHpTime: .8
    },
    jumpPlatformConf: {
      moveSpeed: 192,
      jumpStep: 1,
      jumpHight: 160,
      aiMoveType: n.AIMoveType.None,
      beatenLockHpTime: .8
    },
    disuse: !0
  }, {
    type: n.CommonDataType.Actor,
    id: "1",
    name: "Chicky",
    textureName: "Actor/disuse/chick",
    author: "Julian",
    team: n.Team.NPC,
    gunId: "",
    hp: 1,
    hpMax: 1,
    collider: {
      offset: {
        x: 0,
        y: 0
      },
      size: {
        w: 32,
        h: 32
      }
    },
    isBuildIn: !0,
    rpgConf: {
      moveSpeed: 256,
      aiMoveType: n.AIMoveType.None,
      beatenLockHpTime: .8
    },
    jumpPlatformConf: {
      moveSpeed: 192,
      jumpStep: 1,
      jumpHight: 160,
      aiMoveType: n.AIMoveType.None,
      beatenLockHpTime: .8
    },
    disuse: !0
  }, {
    type: n.CommonDataType.Actor,
    id: "4",
    name: "Monster Abby",
    textureName: "Actor/disuse/monster1",
    author: "Julian",
    team: n.Team.Enemy,
    gunId: "",
    hp: 1,
    hpMax: 1,
    collider: {
      offset: {
        x: 0,
        y: 0
      },
      size: {
        w: 32,
        h: 32
      }
    },
    isBuildIn: !0,
    rpgConf: {
      moveSpeed: 256,
      aiMoveType: n.AIMoveType.None,
      beatenLockHpTime: .8
    },
    jumpPlatformConf: {
      moveSpeed: 192,
      jumpStep: 1,
      jumpHight: 160,
      aiMoveType: n.AIMoveType.None,
      beatenLockHpTime: .8
    },
    disuse: !0
  }, {
    type: n.CommonDataType.Actor,
    id: "5",
    name: "Monster Bob",
    textureName: "Actor/disuse/monster2",
    author: "Julian",
    team: n.Team.Enemy,
    gunId: "",
    hp: 1,
    hpMax: 1,
    collider: {
      offset: {
        x: 0,
        y: 0
      },
      size: {
        w: 32,
        h: 32
      }
    },
    isBuildIn: !0,
    rpgConf: {
      moveSpeed: 256,
      aiMoveType: n.AIMoveType.None,
      beatenLockHpTime: .8
    },
    jumpPlatformConf: {
      moveSpeed: 192,
      jumpStep: 1,
      jumpHight: 160,
      aiMoveType: n.AIMoveType.None,
      beatenLockHpTime: .8
    },
    disuse: !0
  }, {
    type: n.CommonDataType.Actor,
    id: "7",
    name: "Knight",
    textureName: "Actor/disuse/knight",
    author: "Julian",
    team: n.Team.Enemy,
    gunId: "",
    hp: 1,
    hpMax: 1,
    collider: {
      offset: {
        x: 0,
        y: 0
      },
      size: {
        w: 32,
        h: 32
      }
    },
    isBuildIn: !0,
    rpgConf: {
      moveSpeed: 256,
      aiMoveType: n.AIMoveType.None,
      beatenLockHpTime: .8
    },
    jumpPlatformConf: {
      moveSpeed: 192,
      jumpStep: 1,
      jumpHight: 160,
      aiMoveType: n.AIMoveType.None,
      beatenLockHpTime: .8
    },
    disuse: !0
  }, {
    type: n.CommonDataType.Actor,
    id: "101",
    name: "Orangie",
    textureName: "Actor/astro/green",
    author: "Julian",
    team: n.Team.Hero,
    gunId: "",
    hp: 3,
    hpMax: 3,
    collider: {
      offset: {
        x: 0,
        y: 0
      },
      size: {
        w: 32,
        h: 52
      }
    },
    isBuildIn: !0,
    rpgConf: {
      moveSpeed: 256,
      aiMoveType: n.AIMoveType.None,
      beatenLockHpTime: .8
    },
    jumpPlatformConf: {
      moveSpeed: 192,
      jumpStep: 2,
      jumpHight: 160,
      aiMoveType: n.AIMoveType.None,
      beatenLockHpTime: .8
    }
  }, {
    type: n.CommonDataType.Actor,
    id: "102",
    name: "Berry",
    textureName: "Actor/astro/blue",
    author: "Julian",
    team: n.Team.Hero,
    gunId: "",
    hp: 3,
    hpMax: 3,
    collider: {
      offset: {
        x: 0,
        y: 0
      },
      size: {
        w: 32,
        h: 52
      }
    },
    isBuildIn: !0,
    rpgConf: {
      moveSpeed: 256,
      aiMoveType: n.AIMoveType.None,
      beatenLockHpTime: .8
    },
    jumpPlatformConf: {
      moveSpeed: 192,
      jumpStep: 2,
      jumpHight: 160,
      aiMoveType: n.AIMoveType.None,
      beatenLockHpTime: .8
    }
  }, {
    type: n.CommonDataType.Actor,
    id: "103",
    name: "Tango",
    textureName: "Actor/astro/orange",
    author: "Julian",
    team: n.Team.Hero,
    gunId: "",
    hp: 3,
    hpMax: 3,
    collider: {
      offset: {
        x: 0,
        y: 0
      },
      size: {
        w: 32,
        h: 52
      }
    },
    isBuildIn: !0,
    rpgConf: {
      moveSpeed: 256,
      aiMoveType: n.AIMoveType.None,
      beatenLockHpTime: .8
    },
    jumpPlatformConf: {
      moveSpeed: 192,
      jumpStep: 2,
      jumpHight: 160,
      aiMoveType: n.AIMoveType.None,
      beatenLockHpTime: .8
    }
  }, {
    type: n.CommonDataType.Actor,
    id: "104",
    name: "Baby",
    textureName: "Actor/astro/baby",
    author: "Julian",
    team: n.Team.Hero,
    gunId: "",
    hp: 1,
    hpMax: 1,
    collider: {
      offset: {
        x: 0,
        y: -5
      },
      size: {
        w: 32,
        h: 40
      }
    },
    isBuildIn: !0,
    rpgConf: {
      moveSpeed: 256,
      aiMoveType: n.AIMoveType.None,
      beatenLockHpTime: .8
    },
    jumpPlatformConf: {
      moveSpeed: 192,
      jumpStep: 2,
      jumpHight: 160,
      aiMoveType: n.AIMoveType.None,
      beatenLockHpTime: .8
    }
  }, {
    type: n.CommonDataType.Actor,
    id: "1002",
    name: "Slime",
    textureName: "Actor/monster/monster2",
    author: "太空人蓝莓",
    team: n.Team.Enemy,
    gunId: "",
    hp: 1,
    hpMax: 1,
    collider: {
      offset: {
        x: 0,
        y: 0
      },
      size: {
        w: 32,
        h: 32
      }
    },
    isBuildIn: !0,
    rpgConf: {
      moveSpeed: 256,
      aiMoveType: n.AIMoveType.Grid_Random,
      beatenLockHpTime: .8
    },
    jumpPlatformConf: {
      moveSpeed: 64,
      jumpInterval: 1,
      jumpStep: 1,
      jumpHight: 64,
      aiMoveType: n.AIMoveType.PlatformJump_Jump_WallBack,
      beatenLockHpTime: .8
    }
  }, {
    type: n.CommonDataType.Actor,
    id: "1001",
    name: "Fatty",
    textureName: "Actor/monster/monster1",
    author: "太空人蓝莓",
    team: n.Team.Enemy,
    gunId: "",
    hp: 1,
    hpMax: 1,
    collider: {
      offset: {
        x: 0,
        y: 0
      },
      size: {
        w: 32,
        h: 32
      }
    },
    isBuildIn: !0,
    rpgConf: {
      moveSpeed: 256,
      aiMoveType: n.AIMoveType.Grid_Random,
      beatenLockHpTime: .8
    },
    jumpPlatformConf: {
      moveSpeed: 64,
      jumpStep: 1,
      jumpHight: 160,
      aiMoveType: n.AIMoveType.PlatformJump_Ground_MisstepBack,
      beatenLockHpTime: .8
    }
  }, {
    type: n.CommonDataType.Actor,
    id: "1003",
    name: "蜘蛛怪",
    textureName: "Actor/monster/monster3",
    author: "太空人蓝莓",
    team: n.Team.Enemy,
    gunId: "",
    hp: 1,
    hpMax: 1,
    collider: {
      offset: {
        x: 0,
        y: 0
      },
      size: {
        w: 32,
        h: 32
      }
    },
    isBuildIn: !0,
    rpgConf: {
      moveSpeed: 256,
      aiMoveType: n.AIMoveType.Grid_Random,
      beatenLockHpTime: .8
    },
    jumpPlatformConf: {
      moveSpeed: 196,
      jumpStep: 1,
      jumpHight: 160,
      aiMoveType: n.AIMoveType.PlatformJump_Ground_MisstepBack,
      beatenLockHpTime: .8
    }
  }, {
    type: n.CommonDataType.Actor,
    id: "1004",
    name: "Snakey",
    textureName: "Actor/monster/monster4",
    author: "太空人蓝莓",
    team: n.Team.Enemy,
    gunId: "8",
    hp: 1,
    hpMax: 1,
    collider: {
      offset: {
        x: 0,
        y: 0
      },
      size: {
        w: 32,
        h: 32
      }
    },
    isBuildIn: !0,
    rpgConf: {
      moveSpeed: 256,
      aiMoveType: n.AIMoveType.Grid_Random,
      beatenLockHpTime: .8
    },
    jumpPlatformConf: {
      moveSpeed: 64,
      jumpStep: 1,
      jumpHight: 160,
      aiMoveType: n.AIMoveType.PlatformJump_Ground_MisstepBack,
      beatenLockHpTime: .8
    }
  }, {
    type: n.CommonDataType.Actor,
    id: "1005",
    name: "Jelly",
    textureName: "Actor/monster/monster5",
    author: "太空人蓝莓",
    team: n.Team.Enemy,
    gunId: "",
    hp: 1,
    hpMax: 1,
    collider: {
      offset: {
        x: 0,
        y: 0
      },
      size: {
        w: 32,
        h: 32
      }
    },
    isBuildIn: !0,
    rpgConf: {
      moveSpeed: 256,
      aiMoveType: n.AIMoveType.Grid_Random,
      beatenLockHpTime: .8
    },
    jumpPlatformConf: {
      moveSpeed: 64,
      jumpStep: 1,
      jumpHight: 160,
      aiMoveType: n.AIMoveType.PlatformJump_DirLine,
      beatenLockHpTime: .8,
      dirLineMoveData: {
        moveDir: n.MoveDirType.Up,
        speed: 1,
        distance: 2
      }
    }
  }, {
    type: n.CommonDataType.Actor,
    id: "1006",
    name: "Hurry",
    textureName: "Actor/monster/monster6",
    author: "太空人蓝莓",
    team: n.Team.Enemy,
    gunId: "",
    hp: 1,
    hpMax: 1,
    collider: {
      offset: {
        x: 0,
        y: 0
      },
      size: {
        w: 32,
        h: 32
      }
    },
    isBuildIn: !0,
    rpgConf: {
      moveSpeed: 256,
      aiMoveType: n.AIMoveType.Grid_Random,
      beatenLockHpTime: .8
    },
    jumpPlatformConf: {
      moveSpeed: 128,
      jumpStep: 1,
      jumpHight: 160,
      aiMoveType: n.AIMoveType.PlatformJump_Ground_WallBack,
      beatenLockHpTime: .8
    }
  }, {
    type: n.CommonDataType.Actor,
    id: "1007",
    name: "Cloudy",
    textureName: "Actor/monster/monster7",
    author: "太空人蓝莓",
    team: n.Team.Enemy,
    gunId: "7",
    hp: 1,
    hpMax: 1,
    collider: {
      offset: {
        x: 0,
        y: 0
      },
      size: {
        w: 32,
        h: 32
      }
    },
    isBuildIn: !0,
    rpgConf: {
      moveSpeed: 256,
      aiMoveType: n.AIMoveType.Grid_Random,
      beatenLockHpTime: .8
    },
    jumpPlatformConf: {
      moveSpeed: 64,
      jumpStep: 1,
      jumpHight: 160,
      aiMoveType: n.AIMoveType.PlatformJump_DirLine,
      beatenLockHpTime: .8,
      dirLineMoveData: {
        moveDir: n.MoveDirType.Right,
        speed: 1,
        distance: 3
      }
    }
  }, {
    type: n.CommonDataType.Actor,
    id: "1008",
    name: "Panty",
    textureName: "Actor/monster/monster8",
    author: "太空人蓝莓",
    team: n.Team.Enemy,
    gunId: "",
    hp: 1,
    hpMax: 1,
    collider: {
      offset: {
        x: 0,
        y: 0
      },
      size: {
        w: 32,
        h: 32
      }
    },
    isBuildIn: !0,
    rpgConf: {
      moveSpeed: 256,
      aiMoveType: n.AIMoveType.Grid_Random,
      beatenLockHpTime: .8
    },
    jumpPlatformConf: {
      moveSpeed: 64,
      jumpStep: 1,
      jumpHight: 160,
      aiMoveType: n.AIMoveType.PlatformJump_DirLine,
      beatenLockHpTime: .8,
      dirLineMoveData: {
        moveDir: n.MoveDirType.Right,
        speed: 1,
        distance: 3
      }
    }
  }, {
    type: n.CommonDataType.Actor,
    id: "1009",
    name: "Stary",
    textureName: "Actor/monster/monster9",
    author: "太空人蓝莓",
    team: n.Team.Enemy,
    gunId: "",
    hp: 1,
    hpMax: 1,
    collider: {
      offset: {
        x: 0,
        y: 0
      },
      size: {
        w: 32,
        h: 32
      }
    },
    isBuildIn: !0,
    rpgConf: {
      moveSpeed: 256,
      aiMoveType: n.AIMoveType.Grid_Random,
      beatenLockHpTime: .8
    },
    jumpPlatformConf: {
      moveSpeed: 64,
      jumpStep: 1,
      jumpHight: 160,
      aiMoveType: n.AIMoveType.PlatformJump_DirLine,
      beatenLockHpTime: .8,
      dirLineMoveData: {
        moveDir: n.MoveDirType.Right,
        speed: 1,
        distance: 3
      }
    }
  }, {
    type: n.CommonDataType.Actor,
    id: "1010",
    name: "Ghost",
    textureName: "Actor/monster/monster10",
    author: "太空人蓝莓",
    team: n.Team.Enemy,
    gunId: "",
    hp: 1,
    hpMax: 1,
    collider: {
      offset: {
        x: 0,
        y: 0
      },
      size: {
        w: 32,
        h: 32
      }
    },
    isBuildIn: !0,
    rpgConf: {
      moveSpeed: 256,
      aiMoveType: n.AIMoveType.Grid_Random,
      beatenLockHpTime: .8
    },
    jumpPlatformConf: {
      moveSpeed: 64,
      jumpStep: 1,
      jumpHight: 160,
      aiMoveType: n.AIMoveType.PlatformJump_Ground_MisstepBack,
      beatenLockHpTime: .8
    }
  }, {
    type: n.CommonDataType.Actor,
    id: "1011",
    name: "Bubble",
    textureName: "Actor/monster/monster11",
    author: "太空人蓝莓",
    team: n.Team.Enemy,
    gunId: "",
    hp: 1,
    hpMax: 1,
    collider: {
      offset: {
        x: 0,
        y: 0
      },
      size: {
        w: 32,
        h: 32
      }
    },
    isBuildIn: !0,
    rpgConf: {
      moveSpeed: 256,
      aiMoveType: n.AIMoveType.Grid_Random,
      beatenLockHpTime: .8
    },
    jumpPlatformConf: {
      moveSpeed: 64,
      jumpStep: 1,
      jumpHight: 160,
      aiMoveType: n.AIMoveType.PlatformJump_DirLine,
      beatenLockHpTime: .8,
      dirLineMoveData: {
        moveDir: n.MoveDirType.Right,
        speed: 1,
        distance: 3
      }
    }
  }, {
    type: n.CommonDataType.Actor,
    id: "1012",
    name: "Rocky",
    textureName: "Actor/monster/monster12",
    author: "太空人蓝莓",
    team: n.Team.Enemy,
    gunId: "",
    hp: 1,
    hpMax: 1,
    collider: {
      offset: {
        x: 0,
        y: 0
      },
      size: {
        w: 32,
        h: 32
      }
    },
    isBuildIn: !0,
    rpgConf: {
      moveSpeed: 256,
      aiMoveType: n.AIMoveType.Grid_Random,
      beatenLockHpTime: .8
    },
    jumpPlatformConf: {
      moveSpeed: 196,
      jumpStep: 1,
      jumpHight: 160,
      aiMoveType: n.AIMoveType.PlatformJump_Ground_MisstepBack,
      beatenLockHpTime: .8
    }
  }];
  e.propConfs = [{
    type: n.CommonDataType.Prop,
    id: "1",
    name: "Coin",
    intro: "",
    textureName: "Prop/coin",
    author: "Julian",
    isBuildIn: !0,
    once: !0,
    useWhenPick: !1,
    onPick: [{
      act: n.TriggerAct.Sound,
      extra: {
        soundId: 1005
      }
    }],
    defaultPrice: 1,
    salePrice: 1
  }, {
    type: n.CommonDataType.Prop,
    id: "2",
    name: "Recovery Potion",
    intro: "",
    textureName: "Prop/potion",
    author: "Julian",
    isBuildIn: !0,
    once: !0,
    useWhenPick: !1,
    onUse: [{
      act: n.TriggerAct.RecoverHP,
      extra: {
        cnt: 10
      }
    }, {
      act: n.TriggerAct.Sound,
      extra: {
        soundId: 6010
      }
    }],
    defaultPrice: 10,
    salePrice: 5
  }];
  e.deviceConfs = [{
    type: n.CommonDataType.Device,
    deviceType: n.DeviceType.Decorator,
    id: "12",
    name: "装饰物",
    author: "Julian",
    prefabName: "Decorator",
    textureName: "Device/Decorator",
    isBuildIn: !0
  }, {
    type: n.CommonDataType.Device,
    deviceType: n.DeviceType.Saw,
    id: "1",
    name: "圆锯",
    author: "Julian",
    prefabName: "Saw",
    textureName: "Device/Saw",
    isBuildIn: !0
  }, {
    type: n.CommonDataType.Device,
    deviceType: n.DeviceType.FireBallLine,
    id: "2",
    name: "火球",
    author: "Julian",
    prefabName: "FireBallLine",
    textureName: "Device/FireBall",
    isBuildIn: !0
  }, {
    type: n.CommonDataType.Device,
    deviceType: n.DeviceType.Lurker,
    id: "3",
    name: "地刺",
    author: "Julian",
    prefabName: "Lurker",
    textureName: "Device/Lurker",
    isBuildIn: !0
  }, {
    type: n.CommonDataType.Device,
    deviceType: n.DeviceType.IceCone,
    id: "14",
    name: "冰锥",
    author: "Julian",
    prefabName: "IceCone",
    textureName: "Device/IceCone",
    isBuildIn: !0
  }, {
    type: n.CommonDataType.Device,
    deviceType: n.DeviceType.Bomb,
    id: "7",
    name: "炸弹",
    author: "Julian",
    prefabName: "Bomb",
    textureName: "Device/Bomb",
    isBuildIn: !0
  }, {
    type: n.CommonDataType.Device,
    deviceType: n.DeviceType.Button,
    id: "4",
    name: "按钮",
    author: "Julian",
    prefabName: "DeviceButton",
    textureName: "Device/DeviceButton",
    isBuildIn: !0
  }, {
    type: n.CommonDataType.Device,
    deviceType: n.DeviceType.Flag,
    id: "6",
    name: "过关旗",
    author: "Julian",
    prefabName: "Flag",
    textureName: "Device/Flag",
    isBuildIn: !0
  }, {
    type: n.CommonDataType.Device,
    deviceType: n.DeviceType.Region,
    id: "18",
    name: "区域",
    author: "Julian",
    prefabName: "Region",
    textureName: "Device/Region",
    isBuildIn: !0,
    forbidCustomCreate: !0
  }, {
    type: n.CommonDataType.Device,
    deviceType: n.DeviceType.Billboard,
    id: "19",
    name: "告示牌",
    author: "Julian",
    prefabName: "Billboard",
    textureName: "Device/Billboard",
    isBuildIn: !0
  }, {
    type: n.CommonDataType.Device,
    deviceType: n.DeviceType.SavePoint,
    id: "15",
    name: "存档点",
    author: "Julian",
    prefabName: "SavePoint",
    textureName: "Device/SavePoint",
    isBuildIn: !0
  }, {
    type: n.CommonDataType.Device,
    deviceType: n.DeviceType.LoadPoint,
    id: "16",
    name: "读档点",
    author: "Julian",
    prefabName: "LoadPoint",
    textureName: "Device/LoadPoint",
    isBuildIn: !0
  }, {
    type: n.CommonDataType.Device,
    deviceType: n.DeviceType.MonsterSpawner,
    id: "13",
    name: "怪物门",
    author: "Julian",
    prefabName: "MonsterSpawner",
    textureName: "Device/MonsterSpawner",
    isBuildIn: !0
  }, {
    type: n.CommonDataType.Device,
    deviceType: n.DeviceType.Spring,
    id: "5",
    name: "弹簧",
    author: "Julian",
    prefabName: "Spring",
    textureName: "Device/Spring",
    isBuildIn: !0
  }, {
    type: n.CommonDataType.Device,
    deviceType: n.DeviceType.TrapPlatform,
    id: "8",
    name: "陷阱平台",
    author: "Julian",
    prefabName: "TrapPlatform",
    textureName: "Device/TrapPlatform",
    isBuildIn: !0
  }, {
    type: n.CommonDataType.Device,
    deviceType: n.DeviceType.ConveyorPlatform,
    id: "9",
    name: "传送带",
    author: "Julian",
    prefabName: "ConveyorPlatform",
    textureName: "Device/ConveyorPlatform",
    isBuildIn: !0
  }, {
    type: n.CommonDataType.Device,
    deviceType: n.DeviceType.MovePlatform,
    id: "10",
    name: "移动平台",
    author: "Julian",
    prefabName: "MovePlatform",
    textureName: "Device/MovePlatform",
    isBuildIn: !0
  }, {
    type: n.CommonDataType.Device,
    deviceType: n.DeviceType.Ladder,
    id: "11",
    name: "梯子",
    author: "Julian",
    prefabName: "Ladder",
    textureName: "Device/Ladder",
    isBuildIn: !0
  }];
  e.playerLvConfs = [{
    id: 0,
    exp: 0
  }, {
    id: 1,
    exp: 10
  }, {
    id: 2,
    exp: 30
  }, {
    id: 3,
    exp: 50
  }, {
    id: 4,
    exp: 100
  }, {
    id: 5,
    exp: 150
  }, {
    id: 6,
    exp: 200
  }, {
    id: 7,
    exp: 300
  }, {
    id: 8,
    exp: 400
  }, {
    id: 9,
    exp: 500
  }, {
    id: 10,
    exp: 700
  }, {
    id: 11,
    exp: 900
  }, {
    id: 12,
    exp: 1100
  }, {
    id: 13,
    exp: 1300
  }, {
    id: 14,
    exp: 1500
  }, {
    id: 15,
    exp: 2e3
  }, {
    id: 16,
    exp: 2500
  }, {
    id: 17,
    exp: 3e3
  }, {
    id: 18,
    exp: 3500
  }, {
    id: 19,
    exp: 4e3
  }, {
    id: 20,
    exp: 4500
  }, {
    id: 21,
    exp: 5e3
  }, {
    id: 22,
    exp: 5500
  }, {
    id: 23,
    exp: 6e3
  }, {
    id: 24,
    exp: 6500
  }, {
    id: 25,
    exp: 7e3
  }, {
    id: 26,
    exp: 7500
  }, {
    id: 27,
    exp: 8e3
  }, {
    id: 28,
    exp: 8500
  }, {
    id: 29,
    exp: 9e3
  }, {
    id: 30,
    exp: 9500
  }, {
    id: 31,
    exp: 1e4
  }, {
    id: 32,
    exp: 11e3
  }, {
    id: 33,
    exp: 12e3
  }, {
    id: 34,
    exp: 13e3
  }, {
    id: 35,
    exp: 14e3
  }, {
    id: 36,
    exp: 15e3
  }, {
    id: 37,
    exp: 16e3
  }, {
    id: 38,
    exp: 17e3
  }, {
    id: 39,
    exp: 18e3
  }, {
    id: 40,
    exp: 19e3
  }, {
    id: 41,
    exp: 2e4
  }, {
    id: 42,
    exp: 21e3
  }, {
    id: 43,
    exp: 22e3
  }, {
    id: 44,
    exp: 23e3
  }, {
    id: 45,
    exp: 24e3
  }, {
    id: 46,
    exp: 25e3
  }, {
    id: 47,
    exp: 26e3
  }, {
    id: 48,
    exp: 27e3
  }, {
    id: 49,
    exp: 28e3
  }, {
    id: 50,
    exp: 29e3
  }, {
    id: 51,
    exp: 3e4
  }, {
    id: 52,
    exp: 31e3
  }, {
    id: 53,
    exp: 32e3
  }, {
    id: 54,
    exp: 33e3
  }, {
    id: 55,
    exp: 34e3
  }, {
    id: 56,
    exp: 35e3
  }, {
    id: 57,
    exp: 36e3
  }, {
    id: 58,
    exp: 37e3
  }, {
    id: 59,
    exp: 38e3
  }, {
    id: 60,
    exp: 39e3
  }, {
    id: 61,
    exp: 4e4
  }, {
    id: 62,
    exp: 41e3
  }, {
    id: 63,
    exp: 42e3
  }, {
    id: 64,
    exp: 43e3
  }, {
    id: 65,
    exp: 44e3
  }, {
    id: 66,
    exp: 45e3
  }, {
    id: 67,
    exp: 46e3
  }, {
    id: 68,
    exp: 47e3
  }, {
    id: 69,
    exp: 48e3
  }, {
    id: 70,
    exp: 49e3
  }, {
    id: 71,
    exp: 5e4
  }, {
    id: 72,
    exp: 51e3
  }, {
    id: 73,
    exp: 52e3
  }, {
    id: 74,
    exp: 53e3
  }, {
    id: 75,
    exp: 54e3
  }, {
    id: 76,
    exp: 55e3
  }, {
    id: 77,
    exp: 56e3
  }, {
    id: 78,
    exp: 57e3
  }, {
    id: 79,
    exp: 58e3
  }, {
    id: 80,
    exp: 59e3
  }, {
    id: 81,
    exp: 6e4
  }, {
    id: 82,
    exp: 61e3
  }, {
    id: 83,
    exp: 62e3
  }, {
    id: 84,
    exp: 63e3
  }, {
    id: 85,
    exp: 64e3
  }, {
    id: 86,
    exp: 65e3
  }, {
    id: 87,
    exp: 66e3
  }, {
    id: 88,
    exp: 67e3
  }, {
    id: 89,
    exp: 68e3
  }, {
    id: 90,
    exp: 69e3
  }, {
    id: 91,
    exp: 7e4
  }, {
    id: 92,
    exp: 71e3
  }, {
    id: 93,
    exp: 72e3
  }, {
    id: 94,
    exp: 73e3
  }, {
    id: 95,
    exp: 74e3
  }, {
    id: 96,
    exp: 75e3
  }, {
    id: 97,
    exp: 76e3
  }, {
    id: 98,
    exp: 77e3
  }, {
    id: 99,
    exp: 999999
  }];
  e.tileConfs = [{
    disuse: !0,
    type: n.CommonDataType.Tile,
    id: "1",
    name: "草地",
    tileType: n.TileType.Jump,
    author: "Julian",
    isBuildIn: !0,
    textureName: "Tile/disuse/glassland_jump1",
    tilePhyType: n.TilePhysicType.Block,
    shape: n.TileShape.Normal
  }, {
    disuse: !0,
    type: n.CommonDataType.Tile,
    id: "2",
    name: "草地2",
    tileType: n.TileType.Jump,
    author: "Julian",
    isBuildIn: !0,
    textureName: "Tile/disuse/glassland_jump2",
    tilePhyType: n.TilePhysicType.Block,
    shape: n.TileShape.Normal
  }, {
    disuse: !0,
    type: n.CommonDataType.Tile,
    id: "3",
    name: "石头",
    tileType: n.TileType.Jump,
    author: "Julian",
    isBuildIn: !0,
    textureName: "Tile/disuse/stone",
    tilePhyType: n.TilePhysicType.Block,
    shape: n.TileShape.Normal
  }, {
    disuse: !0,
    type: n.CommonDataType.Tile,
    id: "4",
    name: "云",
    tileType: n.TileType.Jump,
    author: "Julian",
    isBuildIn: !0,
    textureName: "Tile/disuse/cloud",
    tilePhyType: n.TilePhysicType.Pass,
    shape: n.TileShape.Normal
  }, {
    type: n.CommonDataType.Tile,
    id: "11",
    name: "草地",
    tileType: n.TileType.Jump,
    author: "太空人蓝莓",
    isBuildIn: !0,
    textureName: "Tile/Jump/grass1",
    tilePhyType: n.TilePhysicType.Block,
    shape: n.TileShape.Slope_45
  }, {
    type: n.CommonDataType.Tile,
    id: "12",
    name: "草地",
    tileType: n.TileType.Jump,
    author: "太空人蓝莓",
    isBuildIn: !0,
    textureName: "Tile/Jump/grass2",
    tilePhyType: n.TilePhysicType.Block,
    shape: n.TileShape.Normal
  }, {
    type: n.CommonDataType.Tile,
    id: "13",
    name: "草地",
    tileType: n.TileType.Jump,
    author: "太空人蓝莓",
    isBuildIn: !0,
    textureName: "Tile/Jump/grass3",
    tilePhyType: n.TilePhysicType.Block,
    shape: n.TileShape.Slope_45_Flip
  }, {
    type: n.CommonDataType.Tile,
    id: "14",
    name: "草地1",
    tileType: n.TileType.Jump,
    author: "太空人蓝莓",
    isBuildIn: !0,
    textureName: "Tile/Jump/grass4",
    tilePhyType: n.TilePhysicType.Block,
    shape: n.TileShape.Normal
  }, {
    type: n.CommonDataType.Tile,
    id: "15",
    name: "草地2",
    tileType: n.TileType.Jump,
    author: "太空人蓝莓",
    isBuildIn: !0,
    textureName: "Tile/Jump/grass5",
    tilePhyType: n.TilePhysicType.Block,
    shape: n.TileShape.Normal
  }, {
    type: n.CommonDataType.Tile,
    id: "16",
    name: "草地3",
    tileType: n.TileType.Jump,
    author: "太空人蓝莓",
    isBuildIn: !0,
    textureName: "Tile/Jump/grass6",
    tilePhyType: n.TilePhysicType.Block,
    shape: n.TileShape.Normal
  }, {
    type: n.CommonDataType.Tile,
    id: "21",
    name: "石头",
    tileType: n.TileType.Jump,
    author: "太空人蓝莓",
    isBuildIn: !0,
    textureName: "Tile/Jump/wall1",
    tilePhyType: n.TilePhysicType.Block,
    shape: n.TileShape.Slope_45
  }, {
    type: n.CommonDataType.Tile,
    id: "22",
    name: "石头",
    tileType: n.TileType.Jump,
    author: "太空人蓝莓",
    isBuildIn: !0,
    textureName: "Tile/Jump/wall2",
    tilePhyType: n.TilePhysicType.Block,
    shape: n.TileShape.Normal
  }, {
    type: n.CommonDataType.Tile,
    id: "23",
    name: "石头",
    tileType: n.TileType.Jump,
    author: "太空人蓝莓",
    isBuildIn: !0,
    textureName: "Tile/Jump/wall3",
    tilePhyType: n.TilePhysicType.Block,
    shape: n.TileShape.Slope_45_Flip
  }, {
    type: n.CommonDataType.Tile,
    id: "24",
    name: "石头",
    tileType: n.TileType.Jump,
    author: "太空人蓝莓",
    isBuildIn: !0,
    textureName: "Tile/Jump/wall4",
    tilePhyType: n.TilePhysicType.Block,
    shape: n.TileShape.Normal
  }, {
    type: n.CommonDataType.Tile,
    id: "25",
    name: "石头",
    tileType: n.TileType.Jump,
    author: "太空人蓝莓",
    isBuildIn: !0,
    textureName: "Tile/Jump/wall5",
    tilePhyType: n.TilePhysicType.Block,
    shape: n.TileShape.Normal
  }, {
    type: n.CommonDataType.Tile,
    id: "26",
    name: "石头",
    tileType: n.TileType.Jump,
    author: "太空人蓝莓",
    isBuildIn: !0,
    textureName: "Tile/Jump/wall6",
    tilePhyType: n.TilePhysicType.Block,
    shape: n.TileShape.Normal
  }, {
    type: n.CommonDataType.Tile,
    id: "31",
    name: "木头",
    tileType: n.TileType.Jump,
    author: "Julian",
    isBuildIn: !0,
    textureName: "Tile/Jump/wood1",
    tilePhyType: n.TilePhysicType.Block,
    shape: n.TileShape.Slope_45
  }, {
    type: n.CommonDataType.Tile,
    id: "32",
    name: "木头",
    tileType: n.TileType.Jump,
    author: "Julian",
    isBuildIn: !0,
    textureName: "Tile/Jump/wood2",
    tilePhyType: n.TilePhysicType.Block,
    shape: n.TileShape.Normal
  }, {
    type: n.CommonDataType.Tile,
    id: "33",
    name: "木头",
    tileType: n.TileType.Jump,
    author: "Julian",
    isBuildIn: !0,
    textureName: "Tile/Jump/wood3",
    tilePhyType: n.TilePhysicType.Block,
    shape: n.TileShape.Slope_45_Flip
  }, {
    type: n.CommonDataType.Tile,
    id: "34",
    name: "木头",
    tileType: n.TileType.Jump,
    author: "Julian",
    isBuildIn: !0,
    textureName: "Tile/Jump/wood4",
    tilePhyType: n.TilePhysicType.Block,
    shape: n.TileShape.Half_Top
  }, {
    type: n.CommonDataType.Tile,
    id: "35",
    name: "木头",
    tileType: n.TileType.Jump,
    author: "Julian",
    isBuildIn: !0,
    textureName: "Tile/Jump/wood5",
    tilePhyType: n.TilePhysicType.Block,
    shape: n.TileShape.Half_Top
  }, {
    type: n.CommonDataType.Tile,
    id: "36",
    name: "木头",
    tileType: n.TileType.Jump,
    author: "Julian",
    isBuildIn: !0,
    textureName: "Tile/Jump/wood6",
    tilePhyType: n.TilePhysicType.Block,
    shape: n.TileShape.Half_Top
  }, {
    type: n.CommonDataType.Tile,
    id: "41",
    name: "地牢",
    tileType: n.TileType.Jump,
    author: "太空人蓝莓",
    isBuildIn: !0,
    textureName: "Tile/Jump/dungeon1",
    tilePhyType: n.TilePhysicType.Block,
    shape: n.TileShape.Slope_45
  }, {
    type: n.CommonDataType.Tile,
    id: "42",
    name: "地牢",
    tileType: n.TileType.Jump,
    author: "太空人蓝莓",
    isBuildIn: !0,
    textureName: "Tile/Jump/dungeon2",
    tilePhyType: n.TilePhysicType.Block,
    shape: n.TileShape.Normal
  }, {
    type: n.CommonDataType.Tile,
    id: "43",
    name: "地牢",
    tileType: n.TileType.Jump,
    author: "太空人蓝莓",
    isBuildIn: !0,
    textureName: "Tile/Jump/dungeon3",
    tilePhyType: n.TilePhysicType.Block,
    shape: n.TileShape.Slope_45_Flip
  }, {
    type: n.CommonDataType.Tile,
    id: "44",
    name: "地牢",
    tileType: n.TileType.Jump,
    author: "太空人蓝莓",
    isBuildIn: !0,
    textureName: "Tile/Jump/dungeon4",
    tilePhyType: n.TilePhysicType.Block,
    shape: n.TileShape.Normal
  }, {
    type: n.CommonDataType.Tile,
    id: "45",
    name: "地牢",
    tileType: n.TileType.Jump,
    author: "太空人蓝莓",
    isBuildIn: !0,
    textureName: "Tile/Jump/dungeon5",
    tilePhyType: n.TilePhysicType.Block,
    shape: n.TileShape.Normal
  }, {
    type: n.CommonDataType.Tile,
    id: "46",
    name: "地牢",
    tileType: n.TileType.Jump,
    author: "太空人蓝莓",
    isBuildIn: !0,
    textureName: "Tile/Jump/dungeon6",
    tilePhyType: n.TilePhysicType.Block,
    shape: n.TileShape.Normal
  }, {
    type: n.CommonDataType.Tile,
    id: "601",
    name: "岩浆",
    tileType: n.TileType.Jump,
    author: "Julian",
    isBuildIn: !0,
    textureName: "Tile/Jump/lava",
    tilePhyType: n.TilePhysicType.Damage,
    shape: n.TileShape.Normal,
    dataDamgae: {
      perDmg: 1
    }
  }, {
    type: n.CommonDataType.Tile,
    id: "602",
    name: "浓酸",
    tileType: n.TileType.Jump,
    author: "Julian",
    isBuildIn: !0,
    textureName: "Tile/Jump/acid",
    tilePhyType: n.TilePhysicType.Damage,
    shape: n.TileShape.Normal,
    dataDamgae: {
      perDmg: 1
    }
  }, {
    type: n.CommonDataType.Tile,
    id: "603",
    name: "沼泽",
    tileType: n.TileType.Jump,
    author: "Julian",
    isBuildIn: !0,
    textureName: "Tile/Jump/swamp",
    tilePhyType: n.TilePhysicType.Damage,
    shape: n.TileShape.Normal,
    dataDamgae: {
      perDmg: 1
    }
  }, {
    type: n.CommonDataType.Tile,
    id: "801",
    name: "箱子",
    tileType: n.TileType.Jump,
    author: "Julian",
    isBuildIn: !0,
    textureName: "Tile/Jump/box",
    tilePhyType: n.TilePhysicType.Destroy,
    shape: n.TileShape.Normal
  }, {
    type: n.CommonDataType.Tile,
    id: "802",
    name: "酒桶",
    tileType: n.TileType.Jump,
    author: "Julian",
    isBuildIn: !0,
    textureName: "Tile/Jump/barrel",
    tilePhyType: n.TilePhysicType.Destroy,
    shape: n.TileShape.Normal
  }, {
    type: n.CommonDataType.Tile,
    id: "803",
    name: "陶罐",
    tileType: n.TileType.Jump,
    author: "Julian",
    isBuildIn: !0,
    textureName: "Tile/Jump/jar",
    tilePhyType: n.TilePhysicType.Pass,
    shape: n.TileShape.Normal
  }, {
    disuse: !0,
    type: n.CommonDataType.Tile,
    id: "1001",
    name: "草地",
    tileType: n.TileType.RPG,
    author: "Julian",
    isBuildIn: !0,
    textureName: "Tile/disuse/glassland_rpg1",
    tilePhyType: n.TilePhysicType.Pass,
    shape: n.TileShape.Normal
  }, {
    disuse: !0,
    type: n.CommonDataType.Tile,
    id: "1002",
    name: "草地",
    tileType: n.TileType.RPG,
    author: "Julian",
    isBuildIn: !0,
    textureName: "Tile/disuse/glassland_rpg2",
    tilePhyType: n.TilePhysicType.Pass,
    shape: n.TileShape.Normal
  }, {
    disuse: !0,
    type: n.CommonDataType.Tile,
    id: "1003",
    name: "树",
    tileType: n.TileType.RPG,
    author: "Julian",
    isBuildIn: !0,
    textureName: "Tile/disuse/tree",
    tilePhyType: n.TilePhysicType.Destroy,
    dataDestroy: {
      hp: 1
    },
    shape: n.TileShape.Normal
  }, {
    type: n.CommonDataType.Tile,
    id: "301",
    name: "草地1",
    tileType: n.TileType.RPG,
    author: "巳木",
    isBuildIn: !0,
    textureName: "Tile/Rpg/grassland1",
    tilePhyType: n.TilePhysicType.Pass,
    shape: n.TileShape.Normal
  }, {
    type: n.CommonDataType.Tile,
    id: "302",
    name: "草地1",
    tileType: n.TileType.RPG,
    author: "巳木",
    isBuildIn: !0,
    textureName: "Tile/Rpg/grassland2",
    tilePhyType: n.TilePhysicType.Pass,
    shape: n.TileShape.Normal
  }, {
    type: n.CommonDataType.Tile,
    id: "303",
    name: "草地1",
    tileType: n.TileType.RPG,
    author: "巳木",
    isBuildIn: !0,
    textureName: "Tile/Rpg/grassland3",
    tilePhyType: n.TilePhysicType.Pass,
    shape: n.TileShape.Normal
  }, {
    type: n.CommonDataType.Tile,
    id: "311",
    name: "土地1",
    tileType: n.TileType.RPG,
    author: "巳木",
    isBuildIn: !0,
    textureName: "Tile/Rpg/soil1",
    tilePhyType: n.TilePhysicType.Pass,
    shape: n.TileShape.Normal
  }, {
    type: n.CommonDataType.Tile,
    id: "312",
    name: "土地1",
    tileType: n.TileType.RPG,
    author: "巳木",
    isBuildIn: !0,
    textureName: "Tile/Rpg/soil2",
    tilePhyType: n.TilePhysicType.Pass,
    shape: n.TileShape.Normal
  }, {
    type: n.CommonDataType.Tile,
    id: "313",
    name: "土地1",
    tileType: n.TileType.RPG,
    author: "巳木",
    isBuildIn: !0,
    textureName: "Tile/Rpg/soil3",
    tilePhyType: n.TilePhysicType.Pass,
    shape: n.TileShape.Normal
  }, {
    type: n.CommonDataType.Tile,
    id: "321",
    name: "木板1",
    tileType: n.TileType.RPG,
    author: "巳木",
    isBuildIn: !0,
    textureName: "Tile/Rpg/plank1",
    tilePhyType: n.TilePhysicType.Pass,
    shape: n.TileShape.Normal
  }, {
    type: n.CommonDataType.Tile,
    id: "322",
    name: "木板1",
    tileType: n.TileType.RPG,
    author: "巳木",
    isBuildIn: !0,
    textureName: "Tile/Rpg/plank2",
    tilePhyType: n.TilePhysicType.Pass,
    shape: n.TileShape.Normal
  }, {
    type: n.CommonDataType.Tile,
    id: "323",
    name: "木板1",
    tileType: n.TileType.RPG,
    author: "巳木",
    isBuildIn: !0,
    textureName: "Tile/Rpg/plank3",
    tilePhyType: n.TilePhysicType.Pass,
    shape: n.TileShape.Normal
  }, {
    type: n.CommonDataType.Tile,
    id: "324",
    name: "木板1",
    tileType: n.TileType.RPG,
    author: "巳木",
    isBuildIn: !0,
    textureName: "Tile/Rpg/plank4",
    tilePhyType: n.TilePhysicType.Pass,
    shape: n.TileShape.Normal
  }, {
    type: n.CommonDataType.Tile,
    id: "325",
    name: "木板1",
    tileType: n.TileType.RPG,
    author: "巳木",
    isBuildIn: !0,
    textureName: "Tile/Rpg/plank5",
    tilePhyType: n.TilePhysicType.Pass,
    shape: n.TileShape.Normal
  }, {
    type: n.CommonDataType.Tile,
    id: "326",
    name: "木板1",
    tileType: n.TileType.RPG,
    author: "巳木",
    isBuildIn: !0,
    textureName: "Tile/Rpg/plank6",
    tilePhyType: n.TilePhysicType.Pass,
    shape: n.TileShape.Normal
  }, {
    type: n.CommonDataType.Tile,
    id: "331",
    name: "石路1",
    tileType: n.TileType.RPG,
    author: "巳木",
    isBuildIn: !0,
    textureName: "Tile/Rpg/slateRoad1",
    tilePhyType: n.TilePhysicType.Pass,
    shape: n.TileShape.Normal
  }, {
    type: n.CommonDataType.Tile,
    id: "332",
    name: "石路1",
    tileType: n.TileType.RPG,
    author: "巳木",
    isBuildIn: !0,
    textureName: "Tile/Rpg/slateRoad2",
    tilePhyType: n.TilePhysicType.Pass,
    shape: n.TileShape.Normal
  }, {
    type: n.CommonDataType.Tile,
    id: "333",
    name: "石路1",
    tileType: n.TileType.RPG,
    author: "巳木",
    isBuildIn: !0,
    textureName: "Tile/Rpg/slateRoad3",
    tilePhyType: n.TilePhysicType.Pass,
    shape: n.TileShape.Normal
  }, {
    type: n.CommonDataType.Tile,
    id: "341",
    name: "雪地1",
    tileType: n.TileType.RPG,
    author: "巳木",
    isBuildIn: !0,
    textureName: "Tile/Rpg/snow1",
    tilePhyType: n.TilePhysicType.Pass,
    shape: n.TileShape.Normal
  }, {
    type: n.CommonDataType.Tile,
    id: "342",
    name: "雪地2",
    tileType: n.TileType.RPG,
    author: "巳木",
    isBuildIn: !0,
    textureName: "Tile/Rpg/snow2",
    tilePhyType: n.TilePhysicType.Pass,
    shape: n.TileShape.Normal
  }, {
    type: n.CommonDataType.Tile,
    id: "343",
    name: "雪地3",
    tileType: n.TileType.RPG,
    author: "巳木",
    isBuildIn: !0,
    textureName: "Tile/Rpg/snow3",
    tilePhyType: n.TilePhysicType.Pass,
    shape: n.TileShape.Normal
  }, {
    type: n.CommonDataType.Tile,
    id: "501",
    name: "石头1",
    tileType: n.TileType.RPG,
    author: "太空人蓝莓",
    isBuildIn: !0,
    textureName: "Tile/Rpg/stone1",
    tilePhyType: n.TilePhysicType.Destroy,
    dataDestroy: {
      hp: 5
    },
    shape: n.TileShape.Normal
  }, {
    type: n.CommonDataType.Tile,
    id: "511",
    name: "草1",
    tileType: n.TileType.RPG,
    author: "太空人蓝莓",
    isBuildIn: !0,
    textureName: "Tile/Rpg/grass1",
    tilePhyType: n.TilePhysicType.Pass,
    shape: n.TileShape.Normal
  }, {
    type: n.CommonDataType.Tile,
    id: "512",
    name: "草2",
    tileType: n.TileType.RPG,
    author: "太空人蓝莓",
    isBuildIn: !0,
    textureName: "Tile/Rpg/grass2",
    tilePhyType: n.TilePhysicType.Pass,
    shape: n.TileShape.Normal
  }, {
    type: n.CommonDataType.Tile,
    id: "521",
    name: "树1",
    tileType: n.TileType.RPG,
    author: "太空人蓝莓",
    isBuildIn: !0,
    textureName: "Tile/Rpg/tree1",
    tilePhyType: n.TilePhysicType.Destroy,
    dataDestroy: {
      hp: 3
    },
    shape: n.TileShape.Normal
  }, {
    type: n.CommonDataType.Tile,
    id: "522",
    name: "树2",
    tileType: n.TileType.RPG,
    author: "太空人蓝莓",
    isBuildIn: !0,
    textureName: "Tile/Rpg/tree2",
    tilePhyType: n.TilePhysicType.Destroy,
    dataDestroy: {
      hp: 3
    },
    shape: n.TileShape.Normal
  }, {
    type: n.CommonDataType.Tile,
    id: "523",
    name: "树3",
    tileType: n.TileType.RPG,
    author: "太空人蓝莓",
    isBuildIn: !0,
    textureName: "Tile/Rpg/tree3",
    tilePhyType: n.TilePhysicType.Destroy,
    dataDestroy: {
      hp: 3
    },
    shape: n.TileShape.Normal
  }];
  e.weaponConfs = [{
    type: n.CommonDataType.Weapon,
    id: "1",
    name: "冲锋枪",
    textureName: "Weapon/BuildIn1/gun",
    isBuildIn: !0,
    ROF: 10,
    weaponType: n.WeaponType.Gun,
    gun: {
      scatter: 10,
      fireShake: !1,
      muzzles: [cc.Vec2.ZERO],
      bulletId: "1",
      bulletSpeed: 500,
      bulletRange: 300
    }
  }, {
    type: n.CommonDataType.Weapon,
    id: "2",
    name: "飞刀",
    textureName: "Weapon/BuildIn1/gun",
    isBuildIn: !0,
    ROF: 3,
    weaponType: n.WeaponType.Gun,
    gun: {
      scatter: 0,
      fireShake: !1,
      muzzles: [cc.Vec2.ZERO],
      bulletId: "2",
      bulletSpeed: 300,
      bulletRange: 300
    }
  }, {
    type: n.CommonDataType.Weapon,
    id: "3",
    name: "狙击枪",
    textureName: "Weapon/BuildIn1/gun",
    isBuildIn: !0,
    ROF: 2,
    weaponType: n.WeaponType.Gun,
    gun: {
      scatter: 0,
      fireShake: !0,
      muzzles: [cc.Vec2.ZERO],
      bulletId: "3",
      bulletSpeed: 600,
      bulletRange: 600
    }
  }, {
    type: n.CommonDataType.Weapon,
    id: "4",
    name: "燃烧瓶",
    textureName: "Weapon/BuildIn1/gun",
    isBuildIn: !0,
    ROF: 1,
    weaponType: n.WeaponType.Gun,
    gun: {
      scatter: 0,
      fireShake: !1,
      muzzles: [cc.Vec2.ZERO],
      bulletId: "4",
      bulletSpeed: 300,
      bulletRange: 200
    }
  }, {
    type: n.CommonDataType.Weapon,
    id: "5",
    name: "火箭炮",
    textureName: "Weapon/BuildIn1/gun",
    isBuildIn: !0,
    ROF: 1,
    weaponType: n.WeaponType.Gun,
    gun: {
      scatter: 0,
      fireShake: !0,
      muzzles: [cc.Vec2.ZERO],
      bulletId: "5",
      bulletSpeed: 400,
      bulletRange: 300
    }
  }, {
    type: n.CommonDataType.Weapon,
    id: "6",
    name: "刀光",
    textureName: "Weapon/BuildIn1/gun",
    isBuildIn: !0,
    ROF: 3,
    weaponType: n.WeaponType.Gun,
    gun: {
      scatter: 0,
      fireShake: !1,
      muzzles: [cc.Vec2.ZERO],
      bulletId: "6",
      bulletSpeed: 200,
      bulletRange: 200
    }
  }, {
    type: n.CommonDataType.Weapon,
    id: "7",
    name: "闪电",
    textureName: "Weapon/BuildIn1/lightning",
    isBuildIn: !0,
    ROF: .5,
    weaponType: n.WeaponType.Gun,
    gun: {
      scatter: 360,
      fireShake: !1,
      muzzles: [cc.Vec2.ZERO],
      bulletId: "7",
      bulletSpeed: 200,
      bulletRange: 200
    }
  }, {
    type: n.CommonDataType.Weapon,
    id: "8",
    name: "毒液",
    textureName: "Weapon/BuildIn1/gun",
    isBuildIn: !0,
    ROF: .5,
    weaponType: n.WeaponType.Gun,
    gun: {
      scatter: 0,
      fireShake: !1,
      muzzles: [cc.Vec2.ZERO],
      bulletId: "8",
      bulletSpeed: 200,
      bulletRange: 200
    }
  }, {
    type: n.CommonDataType.Weapon,
    id: "1001",
    name: "大刀",
    textureName: "Weapon/BuildIn2/melee1",
    isBuildIn: !0,
    ROF: 2,
    weaponType: n.WeaponType.Melee,
    melee: {
      damage: 1,
      scale: 1.5,
      actType: n.MeleeActType.Swing
    }
  }, {
    type: n.CommonDataType.Weapon,
    id: "1002",
    name: "长矛",
    textureName: "Weapon/BuildIn2/melee2",
    isBuildIn: !0,
    ROF: 2,
    weaponType: n.WeaponType.Melee,
    melee: {
      damage: 1,
      scale: 1.5,
      actType: n.MeleeActType.Jab
    }
  }, {
    type: n.CommonDataType.Weapon,
    id: "2001",
    name: "弹弓",
    textureName: "Weapon/BuildIn3/cast1",
    isBuildIn: !0,
    ROF: 1,
    weaponType: n.WeaponType.Cast,
    cast: {
      fireShake: !0,
      bulletId: "5",
      outSpeed: 1152,
      flyDistance: 1024,
      airResistanceCof: .1,
      defaultAngle: 70,
      dragInverse: !0
    }
  }];
  e.bulletConfs = [{
    type: n.CommonDataType.Bullet,
    id: "1",
    name: "子弹",
    textureName: "Bullet/bullet1",
    isBuildIn: !0,
    speed: 500,
    range: 300,
    angleSpeed: 0,
    damage: 1,
    hitShake: !1,
    hitDestroy: !0
  }, {
    type: n.CommonDataType.Bullet,
    id: "2",
    name: "飞刀",
    textureName: "Bullet/bullet2",
    isBuildIn: !0,
    speed: 300,
    range: 300,
    angleSpeed: 360,
    damage: 1,
    hitShake: !1,
    hitDestroy: !0
  }, {
    type: n.CommonDataType.Bullet,
    id: "3",
    name: "狙击子弹",
    textureName: "Bullet/bullet3",
    isBuildIn: !0,
    speed: 600,
    range: 600,
    angleSpeed: 0,
    damage: 1,
    hitShake: !1,
    hitDestroy: !1
  }, {
    type: n.CommonDataType.Bullet,
    id: "4",
    name: "燃烧瓶",
    textureName: "Bullet/bullet4",
    isBuildIn: !0,
    speed: 300,
    range: 200,
    angleSpeed: 360,
    damage: 1,
    hitShake: !0,
    hitDestroy: !0
  }, {
    type: n.CommonDataType.Bullet,
    id: "5",
    name: "导弹",
    textureName: "Bullet/bullet5",
    isBuildIn: !0,
    speed: 400,
    range: 300,
    angleSpeed: 0,
    damage: 1,
    hitShake: !0,
    hitDestroy: !0
  }, {
    type: n.CommonDataType.Bullet,
    id: "6",
    name: "刀光",
    textureName: "Bullet/bullet6",
    isBuildIn: !0,
    speed: 200,
    range: 200,
    angleSpeed: 0,
    damage: 1,
    hitShake: !1,
    hitDestroy: !1
  }, {
    type: n.CommonDataType.Bullet,
    id: "7",
    name: "闪电",
    textureName: "Bullet/lightning",
    isBuildIn: !0,
    speed: 100,
    range: 200,
    angleSpeed: 0,
    damage: 5,
    hitShake: !1,
    hitDestroy: !1
  }, {
    type: n.CommonDataType.Bullet,
    id: "8",
    name: "毒液",
    textureName: "Bullet/venom",
    isBuildIn: !0,
    speed: 100,
    range: 200,
    angleSpeed: 0,
    damage: 5,
    hitShake: !1,
    hitDestroy: !1
  }];
  e.worldConf = [{
    type: n.WorldType.Jump,
    name: "平台跳跃",
    moveType: n.MoveType.PlatformJump
  }, {
    type: n.WorldType.Rpg,
    name: "平面冒险",
    moveType: n.MoveType.RpgMove
  }, {
    type: n.WorldType.Shoot,
    name: "弹幕射击",
    moveType: n.MoveType.Drag
  }];
  e.moveAIConfs = [{
    type: n.MoveAI.Static,
    name: "静止"
  }, {
    type: n.MoveAI.Line,
    name: "直线发射"
  }, {
    type: n.MoveAI.Follow,
    name: "跟踪主角"
  }, {
    type: n.MoveAI.Patrol,
    name: "两点巡逻"
  }];
  e.colors = [{
    id: 1,
    color: cc.color(0, 0, 0)
  }, {
    id: 2,
    color: cc.color(34, 32, 52)
  }, {
    id: 3,
    color: cc.color(69, 40, 60)
  }, {
    id: 4,
    color: cc.color(102, 57, 49)
  }, {
    id: 5,
    color: cc.color(143, 86, 59)
  }, {
    id: 6,
    color: cc.color(223, 113, 38)
  }, {
    id: 7,
    color: cc.color(217, 160, 102)
  }, {
    id: 8,
    color: cc.color(238, 195, 154)
  }, {
    id: 9,
    color: cc.color(251, 242, 54)
  }, {
    id: 10,
    color: cc.color(153, 229, 80)
  }, {
    id: 11,
    color: cc.color(106, 190, 48)
  }, {
    id: 12,
    color: cc.color(55, 148, 110)
  }, {
    id: 13,
    color: cc.color(75, 105, 47)
  }, {
    id: 14,
    color: cc.color(82, 75, 36)
  }, {
    id: 15,
    color: cc.color(50, 60, 57)
  }, {
    id: 16,
    color: cc.color(63, 63, 116)
  }, {
    id: 17,
    color: cc.color(48, 96, 130)
  }, {
    id: 18,
    color: cc.color(91, 110, 225)
  }, {
    id: 19,
    color: cc.color(99, 155, 255)
  }, {
    id: 20,
    color: cc.color(95, 205, 228)
  }, {
    id: 21,
    color: cc.color(203, 219, 252)
  }, {
    id: 22,
    color: cc.color(255, 255, 255)
  }, {
    id: 23,
    color: cc.color(155, 173, 183)
  }, {
    id: 24,
    color: cc.color(132, 126, 135)
  }, {
    id: 25,
    color: cc.color(105, 106, 106)
  }, {
    id: 26,
    color: cc.color(89, 86, 82)
  }, {
    id: 27,
    color: cc.color(118, 66, 138)
  }, {
    id: 28,
    color: cc.color(172, 50, 50)
  }, {
    id: 29,
    color: cc.color(217, 87, 99)
  }, {
    id: 30,
    color: cc.color(215, 123, 186)
  }, {
    id: 31,
    color: cc.color(143, 151, 74)
  }, {
    id: 32,
    color: cc.color(138, 111, 48)
  }];
  e.soundConfs = [{
    id: 1001,
    type: n.SoundTyp.coin,
    name: "coin1",
    url: "coin/coin1"
  }, {
    id: 1002,
    type: n.SoundTyp.coin,
    name: "coin2",
    url: "coin/coin2"
  }, {
    id: 1003,
    type: n.SoundTyp.coin,
    name: "coin3",
    url: "coin/coin3"
  }, {
    id: 1004,
    type: n.SoundTyp.coin,
    name: "coin4",
    url: "coin/coin4"
  }, {
    id: 1005,
    type: n.SoundTyp.coin,
    name: "coin5",
    url: "coin/coin5"
  }, {
    id: 1006,
    type: n.SoundTyp.coin,
    name: "coin6",
    url: "coin/coin6"
  }, {
    id: 1007,
    type: n.SoundTyp.coin,
    name: "coin7",
    url: "coin/coin7"
  }, {
    id: 1008,
    type: n.SoundTyp.coin,
    name: "coin8",
    url: "coin/coin8"
  }, {
    id: 1009,
    type: n.SoundTyp.coin,
    name: "coin9",
    url: "coin/coin9"
  }, {
    id: 1010,
    type: n.SoundTyp.coin,
    name: "coin10",
    url: "coin/coin10"
  }, {
    id: 2001,
    type: n.SoundTyp.explosion,
    name: "explosion1",
    url: "explosion/explosion1"
  }, {
    id: 2002,
    type: n.SoundTyp.explosion,
    name: "explosion2",
    url: "explosion/explosion2"
  }, {
    id: 2003,
    type: n.SoundTyp.explosion,
    name: "explosion3",
    url: "explosion/explosion3"
  }, {
    id: 2004,
    type: n.SoundTyp.explosion,
    name: "explosion4",
    url: "explosion/explosion4"
  }, {
    id: 2005,
    type: n.SoundTyp.explosion,
    name: "explosion5",
    url: "explosion/explosion5"
  }, {
    id: 2006,
    type: n.SoundTyp.explosion,
    name: "explosion6",
    url: "explosion/explosion6"
  }, {
    id: 2007,
    type: n.SoundTyp.explosion,
    name: "explosion7",
    url: "explosion/explosion7"
  }, {
    id: 2008,
    type: n.SoundTyp.explosion,
    name: "explosion8",
    url: "explosion/explosion8"
  }, {
    id: 2009,
    type: n.SoundTyp.explosion,
    name: "explosion9",
    url: "explosion/explosion9"
  }, {
    id: 2010,
    type: n.SoundTyp.explosion,
    name: "explosion10",
    url: "explosion/explosion10"
  }, {
    id: 3001,
    type: n.SoundTyp.hurt,
    name: "hurt1",
    url: "hurt/hurt1"
  }, {
    id: 3002,
    type: n.SoundTyp.hurt,
    name: "hurt2",
    url: "hurt/hurt2"
  }, {
    id: 3003,
    type: n.SoundTyp.hurt,
    name: "hurt3",
    url: "hurt/hurt3"
  }, {
    id: 3004,
    type: n.SoundTyp.hurt,
    name: "hurt4",
    url: "hurt/hurt4"
  }, {
    id: 3005,
    type: n.SoundTyp.hurt,
    name: "hurt5",
    url: "hurt/hurt5"
  }, {
    id: 3006,
    type: n.SoundTyp.hurt,
    name: "hurt6",
    url: "hurt/hurt6"
  }, {
    id: 3007,
    type: n.SoundTyp.hurt,
    name: "hurt7",
    url: "hurt/hurt7"
  }, {
    id: 3008,
    type: n.SoundTyp.hurt,
    name: "hurt8",
    url: "hurt/hurt8"
  }, {
    id: 3009,
    type: n.SoundTyp.hurt,
    name: "hurt9",
    url: "hurt/hurt9"
  }, {
    id: 3010,
    type: n.SoundTyp.hurt,
    name: "hurt10",
    url: "hurt/hurt10"
  }, {
    id: 4001,
    type: n.SoundTyp.jump,
    name: "jump1",
    url: "jump/jump1"
  }, {
    id: 4002,
    type: n.SoundTyp.jump,
    name: "jump2",
    url: "jump/jump2"
  }, {
    id: 4003,
    type: n.SoundTyp.jump,
    name: "jump3",
    url: "jump/jump3"
  }, {
    id: 4004,
    type: n.SoundTyp.jump,
    name: "jump4",
    url: "jump/jump4"
  }, {
    id: 4005,
    type: n.SoundTyp.jump,
    name: "jump5",
    url: "jump/jump5"
  }, {
    id: 4006,
    type: n.SoundTyp.jump,
    name: "jump6",
    url: "jump/jump6"
  }, {
    id: 4007,
    type: n.SoundTyp.jump,
    name: "jump7",
    url: "jump/jump7"
  }, {
    id: 4008,
    type: n.SoundTyp.jump,
    name: "jump8",
    url: "jump/jump8"
  }, {
    id: 4009,
    type: n.SoundTyp.jump,
    name: "jump9",
    url: "jump/jump9"
  }, {
    id: 4010,
    type: n.SoundTyp.jump,
    name: "jump10",
    url: "jump/jump10"
  }, {
    id: 5001,
    type: n.SoundTyp.laser,
    name: "laser1",
    url: "laser/laser1"
  }, {
    id: 5002,
    type: n.SoundTyp.laser,
    name: "laser2",
    url: "laser/laser2"
  }, {
    id: 5003,
    type: n.SoundTyp.laser,
    name: "laser3",
    url: "laser/laser3"
  }, {
    id: 5004,
    type: n.SoundTyp.laser,
    name: "laser4",
    url: "laser/laser4"
  }, {
    id: 5005,
    type: n.SoundTyp.laser,
    name: "laser5",
    url: "laser/laser5"
  }, {
    id: 5006,
    type: n.SoundTyp.laser,
    name: "laser6",
    url: "laser/laser6"
  }, {
    id: 5007,
    type: n.SoundTyp.laser,
    name: "laser7",
    url: "laser/laser7"
  }, {
    id: 5008,
    type: n.SoundTyp.laser,
    name: "laser8",
    url: "laser/laser8"
  }, {
    id: 5009,
    type: n.SoundTyp.laser,
    name: "laser9",
    url: "laser/laser9"
  }, {
    id: 5010,
    type: n.SoundTyp.laser,
    name: "laser10",
    url: "laser/laser10"
  }, {
    id: 6001,
    type: n.SoundTyp.powerup,
    name: "powerup1",
    url: "powerup/powerup1"
  }, {
    id: 6002,
    type: n.SoundTyp.powerup,
    name: "powerup2",
    url: "powerup/powerup2"
  }, {
    id: 6003,
    type: n.SoundTyp.powerup,
    name: "powerup3",
    url: "powerup/powerup3"
  }, {
    id: 6004,
    type: n.SoundTyp.powerup,
    name: "powerup4",
    url: "powerup/powerup4"
  }, {
    id: 6005,
    type: n.SoundTyp.powerup,
    name: "powerup5",
    url: "powerup/powerup5"
  }, {
    id: 6006,
    type: n.SoundTyp.powerup,
    name: "powerup6",
    url: "powerup/powerup6"
  }, {
    id: 6007,
    type: n.SoundTyp.powerup,
    name: "powerup7",
    url: "powerup/powerup7"
  }, {
    id: 6008,
    type: n.SoundTyp.powerup,
    name: "powerup8",
    url: "powerup/powerup8"
  }, {
    id: 6009,
    type: n.SoundTyp.powerup,
    name: "powerup9",
    url: "powerup/powerup9"
  }, {
    id: 6010,
    type: n.SoundTyp.powerup,
    name: "powerup10",
    url: "powerup/powerup10"
  }, {
    id: 31,
    type: n.SoundTyp.piano,
    name: "钢琴1",
    url: "piano/piano31"
  }, {
    id: 32,
    type: n.SoundTyp.piano,
    name: "钢琴2",
    url: "piano/piano32"
  }, {
    id: 33,
    type: n.SoundTyp.piano,
    name: "钢琴3",
    url: "piano/piano33"
  }, {
    id: 34,
    type: n.SoundTyp.piano,
    name: "钢琴4",
    url: "piano/piano34"
  }, {
    id: 35,
    type: n.SoundTyp.piano,
    name: "钢琴5",
    url: "piano/piano35"
  }, {
    id: 36,
    type: n.SoundTyp.piano,
    name: "钢琴6",
    url: "piano/piano36"
  }, {
    id: 37,
    type: n.SoundTyp.piano,
    name: "钢琴7",
    url: "piano/piano37"
  }, {
    id: 41,
    type: n.SoundTyp.piano,
    name: "钢琴8",
    url: "piano/piano41"
  }, {
    id: 42,
    type: n.SoundTyp.piano,
    name: "钢琴9",
    url: "piano/piano42"
  }, {
    id: 43,
    type: n.SoundTyp.piano,
    name: "钢琴10",
    url: "piano/piano43"
  }, {
    id: 44,
    type: n.SoundTyp.piano,
    name: "钢琴11",
    url: "piano/piano44"
  }, {
    id: 45,
    type: n.SoundTyp.piano,
    name: "钢琴12",
    url: "piano/piano45"
  }, {
    id: 46,
    type: n.SoundTyp.piano,
    name: "钢琴13",
    url: "piano/piano46"
  }, {
    id: 47,
    type: n.SoundTyp.piano,
    name: "钢琴14",
    url: "piano/piano47"
  }, {
    id: 51,
    type: n.SoundTyp.piano,
    name: "钢琴15",
    url: "piano/piano51"
  }];
  e.shiftWorldAnims = [{
    id: 1,
    str: "无",
    animName: "None"
  }, {
    id: 2,
    str: "黑底白字",
    animName: "BlackBgWhiteLabel"
  }];
  e.getWorldConfByType = function (t) {
    for (let o = 0; o < e.worldConf.length; o++) if (e.worldConf[o].type === t) return e.worldConf[o];
  };
  e.getMoveAIConfByType = function (t) {
    for (let o = 0; o < e.moveAIConfs.length; o++) if (e.moveAIConfs[o].type === t) return e.moveAIConfs[o];
  };
  e.getDeviceConf = function (t) {
    for (let o = 0; o < e.deviceConfs.length; o++) {
      let i = e.deviceConfs[o];
      if (i.id == t) return i;
    }
  };
  let t = new Map([[n.TriggerAct.None, {
      name: "无"
    }], [n.TriggerAct.Dialog, {
      name: "剧情对话"
    }], [n.TriggerAct.ShiftWorld, {
      name: "切换地图"
    }], [n.TriggerAct.DropProp, {
      name: "生成道具"
    }], [n.TriggerAct.Sound, {
      name: "播放音效"
    }], [n.TriggerAct.ShiftWeapon, {
      name: "切换武器"
    }], [n.TriggerAct.ShiftHero, {
      name: "切换主角"
    }], [n.TriggerAct.RecoverHP, {
      name: "恢复血量"
    }], [n.TriggerAct.CameraShake, {
      name: "屏幕震动"
    }], [n.TriggerAct.ChangeAct, {
      name: "调整属性"
    }], [n.TriggerAct.GameScript, {
      name: "游戏脚本(实验版)"
    }], [n.TriggerAct.Save, {
      name: "存档"
    }], [n.TriggerAct.Load, {
      name: "读档"
    }], [n.TriggerAct.ClearSave, {
      name: "清空存档"
    }], [n.TriggerAct.ShareGame, {
      name: "分享游戏"
    }], [n.TriggerAct.AD, {
      name: "广告"
    }], [n.TriggerAct.BagItem, {
      name: "加减物品"
    }], [n.TriggerAct.BagSize, {
      name: "调整背包大小"
    }], [n.TriggerAct.Random, {
      name: "随机事件"
    }], [n.TriggerAct.ChangeHero, {
      name: "调整主角属性"
    }], [n.TriggerAct.StartTimeCountDown, {
      name: "开始计时"
    }], [n.TriggerAct.StopTimeCountDown, {
      name: "停止计时"
    }], [n.TriggerAct.GameShop, {
      name: "商店界面"
    }], [n.TriggerAct.GameOver, {
      name: "失败界面"
    }], [n.TriggerAct.GameWin, {
      name: "胜利界面"
    }], [n.TriggerAct.GameRank, {
      name: "排行榜"
    }], [n.TriggerAct.UploadRankScore, {
      name: "上传排行榜分数"
    }]]),
    o = new Map([[n.DeviceType.Saw, "圆锯"], [n.DeviceType.FireBallLine, "火球"], [n.DeviceType.Lurker, "地刺"], [n.DeviceType.Button, "按钮"], [n.DeviceType.Flag, "接触触发器"], [n.DeviceType.Spring, "弹簧"], [n.DeviceType.Bomb, "炸弹"], [n.DeviceType.TrapPlatform, "陷阱平台"], [n.DeviceType.ConveyorPlatform, "传送带"], [n.DeviceType.MovePlatform, "移动平台"], [n.DeviceType.Ladder, "梯子"], [n.DeviceType.Decorator, "装饰物"], [n.DeviceType.MonsterSpawner, "怪物门"], [n.DeviceType.IceCone, "冰锥"], [n.DeviceType.SavePoint, "存档点"], [n.DeviceType.LoadPoint, "读档点"], [n.DeviceType.Toggle, "操纵杆"], [n.DeviceType.Region, "区域"], [n.DeviceType.Billboard, "告示牌"]]),
    i = new Map([[n.WorldType.Jump, "平台跳跃"], [n.WorldType.Rpg, "俯视冒险"], [n.WorldType.Shoot, "射击"]]);
  e.getDeviceTypeName = function (e) {
    return o.get(e);
  };
  e.getWorldTypeActName = function (e) {
    return i.get(e);
  };
  e.getTriggerAct = function (e) {
    return t.get(e);
  };
  e.getTriggerActName = function (e) {
    return t.get(e).name;
  };
  e.getTriggerActDisplay = function (e) {
    let o = t.get(e.act);
    return o.getDisplayStr ? o.getDisplayStr(e) : o.name;
  };
  e.weaponTypeConfs = [{
    type: n.WeaponType.Gun,
    name: "直射",
    textureName: "Weapon/BuildIn1/gun"
  }, {
    type: n.WeaponType.Melee,
    name: "近战",
    textureName: "Weapon/BuildIn2/melee1"
  }, {
    type: n.WeaponType.Cast,
    name: "弹射",
    textureName: "Weapon/BuildIn3/cast1"
  }];
})(o.Config || (exports.Config = {}));