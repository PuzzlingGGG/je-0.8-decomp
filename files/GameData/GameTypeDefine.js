"use strict";

exports.GameGoodsCostType = exports.DecoratorLayerType = exports.VariableType = exports.MoveDirType = exports.DeviceType = exports.WeaponType = exports.MeleeActType = exports.SoundTyp = exports.TriggerAct = exports.TileShape = exports.TilePhysicType = exports.WorldType = exports.CommonDataType = exports.TileType = exports.PropEventType = exports.MoveAI = exports.AIMoveType = exports.MoveType = exports.Team = void 0;
(function (e) {
  e[e.None = 0] = "None";
  e[e.Hero = 1] = "Hero";
  e[e.Enemy = 2] = "Enemy";
  e[e.NPC = 3] = "NPC";
  e[e.Ally = 6] = "Ally";
  e[e.Tile = 4] = "Tile";
  e[e.Device = 5] = "Device";
  e[e.HeroBullet = 7] = "HeroBullet";
  e[e.EnemyBullet = 8] = "EnemyBullet";
  e[e.AllyBullet = 9] = "AllyBullet";
})(o.Team || (exports.Team = {}));
(function (e) {
  e[e.PlatformJump = 0] = "PlatformJump";
  e[e.Drag = 1] = "Drag";
  e[e.GridMove = 2] = "GridMove";
  e[e.RpgMove = 3] = "RpgMove";
})(o.MoveType || (exports.MoveType = {}));
(function (e) {
  e[e.None = 0] = "None";
  e[e.PlatformJump_Ground_WallBack = 1] = "PlatformJump_Ground_WallBack";
  e[e.PlatformJump_Ground_MisstepBack = 2] = "PlatformJump_Ground_MisstepBack";
  e[e.Track = 3] = "Track";
  e[e.Grid_Random = 4] = "Grid_Random";
  e[e.Grid_Static = 6] = "Grid_Static";
  e[e.PlatformJump_Static = 5] = "PlatformJump_Static";
  e[e.PlatformJump_IDLE = 7] = "PlatformJump_IDLE";
  e[e.PlatformJump_Jump_WallBack = 8] = "PlatformJump_Jump_WallBack";
  e[e.PlatformJump_Jump_Trace = 9] = "PlatformJump_Jump_Trace";
  e[e.PlatformJump_FollowHero = 10] = "PlatformJump_FollowHero";
  e[e.PlatformJump_DirLine = 11] = "PlatformJump_DirLine";
})(o.AIMoveType || (exports.AIMoveType = {}));
(function (e) {
  e.Static = "静止";
  e.Line = "直线运动";
  e.Follow = "追踪主角";
  e.Patrol = "巡逻";
})(o.MoveAI || (exports.MoveAI = {}));
(function (e) {
  e[e.AddCoin = 0] = "AddCoin";
})(o.PropEventType || (exports.PropEventType = {}));
(function (e) {
  e[e.Jump = 1] = "Jump";
  e[e.RPG = 2] = "RPG";
  e[e.All = 3] = "All";
})(o.TileType || (exports.TileType = {}));
(function (e) {
  e[e.Tile = 0] = "Tile";
  e[e.Actor = 1] = "Actor";
  e[e.Prop = 2] = "Prop";
  e[e.Device = 3] = "Device";
  e[e.Weapon = 4] = "Weapon";
  e[e.Bullet = 5] = "Bullet";
  e[e.Shop = 6] = "Shop";
  e[e.Rank = 7] = "Rank";
})(o.CommonDataType || (exports.CommonDataType = {}));
(function (e) {
  e[e.Jump = 0] = "Jump";
  e[e.Rpg = 1] = "Rpg";
  e[e.Shoot = 2] = "Shoot";
})(o.WorldType || (exports.WorldType = {}));
(function (e) {
  e[e.Block = 0] = "Block";
  e[e.Destroy = 1] = "Destroy";
  e[e.Fall = 2] = "Fall";
  e[e.JumpOver = 3] = "JumpOver";
  e[e.Damage = 4] = "Damage";
  e[e.Pass = 5] = "Pass";
})(o.TilePhysicType || (exports.TilePhysicType = {}));
(function (e) {
  e[e.Normal = 0] = "Normal";
  e[e.Half_Top = 1] = "Half_Top";
  e[e.Half_Btm = 2] = "Half_Btm";
  e[e.Slope_45 = 3] = "Slope_45";
  e[e.Slope_45_Flip = 4] = "Slope_45_Flip";
  e[e.Slope_135 = 5] = "Slope_135";
  e[e.Slope_135_Flip = 6] = "Slope_135_Flip";
})(o.TileShape || (exports.TileShape = {}));
(function (e) {
  e[e.None = 0] = "None";
  e[e.GameOver = 1] = "GameOver";
  e[e.GameWin = 2] = "GameWin";
  e[e.ShiftWorld = 3] = "ShiftWorld";
  e[e.GameShop = 4] = "GameShop";
  e[e.ActorShop = 5] = "ActorShop";
  e[e.Dialog = 6] = "Dialog";
  e[e.LetActor = 7] = "LetActor";
  e[e.LetTile = 8] = "LetTile";
  e[e.DropProp = 9] = "DropProp";
  e[e.Sound = 10] = "Sound";
  e[e.ShiftWeapon = 11] = "ShiftWeapon";
  e[e.ShiftHero = 12] = "ShiftHero";
  e[e.RecoverHP = 13] = "RecoverHP";
  e[e.CameraShake = 14] = "CameraShake";
  e[e.ChangeAct = 15] = "ChangeAct";
  e[e.Save = 16] = "Save";
  e[e.Load = 17] = "Load";
  e[e.ClearSave = 18] = "ClearSave";
  e[e.ShareGame = 19] = "ShareGame";
  e[e.AD = 20] = "AD";
  e[e.BagItem = 21] = "BagItem";
  e[e.BagSize = 22] = "BagSize";
  e[e.Random = 23] = "Random";
  e[e.ChangeHero = 1001] = "ChangeHero";
  e[e.StartTimeCountDown = 2001] = "StartTimeCountDown";
  e[e.StopTimeCountDown = 2002] = "StopTimeCountDown";
  e[e.GameScript = 10001] = "GameScript";
  e[e.GameRank = 10002] = "GameRank";
  e[e.UploadRankScore = 10003] = "UploadRankScore";
})(o.TriggerAct || (exports.TriggerAct = {}));
(function (e) {
  e[e.piano = 0] = "piano";
  e[e.coin = 1] = "coin";
  e[e.explosion = 2] = "explosion";
  e[e.hurt = 3] = "hurt";
  e[e.jump = 4] = "jump";
  e[e.laser = 5] = "laser";
  e[e.powerup = 6] = "powerup";
})(o.SoundTyp || (exports.SoundTyp = {}));
(function (e) {
  e[e.Jab = 0] = "Jab";
  e[e.Swing = 1] = "Swing";
})(o.MeleeActType || (exports.MeleeActType = {}));
(function (e) {
  e[e.Gun = 0] = "Gun";
  e[e.Melee = 1] = "Melee";
  e[e.Cast = 2] = "Cast";
})(o.WeaponType || (exports.WeaponType = {}));
(function (e) {
  e[e.Saw = 0] = "Saw";
  e[e.FireBallLine = 1] = "FireBallLine";
  e[e.Lurker = 2] = "Lurker";
  e[e.Button = 3] = "Button";
  e[e.Spring = 4] = "Spring";
  e[e.Flag = 5] = "Flag";
  e[e.Bomb = 6] = "Bomb";
  e[e.TrapPlatform = 7] = "TrapPlatform";
  e[e.ConveyorPlatform = 8] = "ConveyorPlatform";
  e[e.MovePlatform = 9] = "MovePlatform";
  e[e.Ladder = 10] = "Ladder";
  e[e.Decorator = 11] = "Decorator";
  e[e.MonsterSpawner = 12] = "MonsterSpawner";
  e[e.IceCone = 13] = "IceCone";
  e[e.SavePoint = 14] = "SavePoint";
  e[e.LoadPoint = 15] = "LoadPoint";
  e[e.Toggle = 16] = "Toggle";
  e[e.Region = 17] = "Region";
  e[e.Billboard = 18] = "Billboard";
})(o.DeviceType || (exports.DeviceType = {}));
(function (e) {
  e[e.Up = 0] = "Up";
  e[e.UpLeft = 1] = "UpLeft";
  e[e.UpRight = 2] = "UpRight";
  e[e.Down = 3] = "Down";
  e[e.DownLeft = 4] = "DownLeft";
  e[e.DownRight = 5] = "DownRight";
  e[e.Left = 6] = "Left";
  e[e.Right = 7] = "Right";
})(o.MoveDirType || (exports.MoveDirType = {}));
(function (e) {
  e[e.boolean = 0] = "boolean";
  e[e.number = 1] = "number";
})(o.VariableType || (exports.VariableType = {}));
(function (e) {
  e[e.Foreground01 = 0] = "Foreground01";
  e[e.MapFore = 1] = "MapFore";
  e[e.MapBack = 2] = "MapBack";
  e[e.Background01 = 3] = "Background01";
  e[e.Background02 = 4] = "Background02";
  e[e.Map = 5] = "Map";
})(o.DecoratorLayerType || (exports.DecoratorLayerType = {}));
(function (e) {
  e[e.GCoin = 0] = "GCoin";
  e[e.Coin = 1] = "Coin";
})(o.GameGoodsCostType || (exports.GameGoodsCostType = {}));