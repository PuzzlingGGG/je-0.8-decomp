var _____WB$wombat$assign$function_____ = function (name) {
    return (self._wb_wombat && self._wb_wombat.local_init && self._wb_wombat.local_init(name)) || self[name];
};
if (!self.__WB_pmw) {
    self.__WB_pmw = function (obj) {
        this.__WB_source = obj;
        return this;
    }
}
{
    let window = _____WB$wombat$assign$function_____("window");
    let self = _____WB$wombat$assign$function_____("self");
    let document = _____WB$wombat$assign$function_____("document");
    let location = _____WB$wombat$assign$function_____("location");
    let top = _____WB$wombat$assign$function_____("top");
    let parent = _____WB$wombat$assign$function_____("parent");
    let frames = _____WB$wombat$assign$function_____("frames");
    let opener = _____WB$wombat$assign$function_____("opener");

    window._CCSettings = {
        platform: "web-mobile",
        groupList: ["default", "UI", "World", "Tile", "Actor", "Device", "Bullet", "Damager", "Ground", "Prop", "New Group 12", "New Group 13", "New Group 14", "New Group 15", "New Group 16", "New Group 17", "New Group 18", "New Group 19", "New Group 20", "New Group 21", "New Group 22", "New Group 23", "New Group 24", "New Group 25", "New Group 26"],
        collisionMatrix: [[false], [false, false, false], [false, false, false, null, false, null, null, null, false], [false, false, false, false, true, false, false, true, false], [false, false, false, true, true, true, true, true, true, true, false], [false, false, false, false, true, false, true, true], [false, false, false, false, true, true, false, null, false], [false, false, false, true, true, true, false, false], [false, false, false, false, true, false, false, false, false, false], [false, false, false, false, true, false, false, false, false, false], [false, false, false, false, false, false, false, false, false, false, false], [false, false, false, false, false, false, false, false, false, false, false, false], [false, false, false, false, false, false, false, false, false, false, false, false, false], [false, false, false, false, false, false, false, false, false, false, false, false, false, false], [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false], [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false], [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false], [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false], [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false], [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false], [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false], [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false], [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false], [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false], [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false]],
        hasResourcesBundle: true,
        hasStartSceneBundle: false,
        remoteBundles: [],
        subpackages: [],
        launchScene: "db://assets/Game.fire",
        orientation: "portrait",
        jsList: ["assets/Sdk/HAPP/HAPP.min.58d0b.js", "assets/scripts/libs/bon/bon.min.6ecee.js", "assets/scripts/libs/lz4/lz4.min.a4e02.js", "assets/scripts/libs/orange/cocos-extend.e04ec.js", "assets/scripts/libs/orange/orange.5c081.js", "assets/scripts/libs/pako/pako.min.c51a1.js", "assets/scripts/libs/png/png.min.779cf.js", "assets/scripts/libs/pnglite/pnglite.713b1.js"],
        bundleVers: {
            internal: "468ae",
            localBundle: "5abb3",
            remoteBundle: "d6c5f",
            resources: "f8eb5",
            main: "5e2be"
        }
    };

}