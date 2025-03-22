var _____WB$wombat$assign$function_____ = function (name) { return (self._wb_wombat && self._wb_wombat.local_init && self._wb_wombat.local_init(name)) || self[name]; };
if (!self.__WB_pmw) { self.__WB_pmw = function (obj) { this.__WB_source = obj; return this; } }
{
    let window = _____WB$wombat$assign$function_____("window");
    let self = _____WB$wombat$assign$function_____("self");
    let document = _____WB$wombat$assign$function_____("document");
    let location = _____WB$wombat$assign$function_____("location");
    let top = _____WB$wombat$assign$function_____("top");
    let parent = _____WB$wombat$assign$function_____("parent");
    let frames = _____WB$wombat$assign$function_____("frames");
    let opener = _____WB$wombat$assign$function_____("opener");

    window.boot = function () {
        var settings = window._CCSettings;
        window._CCSettings = undefined;
        var onProgress = null;

        let { RESOURCES, INTERNAL, MAIN, START_SCENE } = cc.AssetManager.BuiltinBundleName;
        function setLoadingDisplay() {
            // Loading splash scene
            var splash = document.getElementById('splash');
            var progressBar = splash.querySelector('.progress-bar span');
            onProgress = function (finish, total) {
                var percent = 100 * finish / total;
                if (progressBar) {
                    progressBar.style.width = percent.toFixed(2) + '%';
                }
            };
            splash.style.display = 'block';
            progressBar.style.width = '0%';

            cc.director.once(cc.Director.EVENT_AFTER_SCENE_LAUNCH, function () {
                splash.style.display = 'none';
            });
        }

        var onStart = function () {

            cc.view.enableRetina(true);
            cc.view.resizeWithBrowserSize(true);

            if (cc.sys.isBrowser) {
                setLoadingDisplay();
            }

            if (cc.sys.isMobile) {
                if (settings.orientation === 'landscape') {
                    cc.view.setOrientation(cc.macro.ORIENTATION_LANDSCAPE);
                }
                else if (settings.orientation === 'portrait') {
                    cc.view.setOrientation(cc.macro.ORIENTATION_PORTRAIT);
                }
                cc.view.enableAutoFullScreen([
                    cc.sys.BROWSER_TYPE_BAIDU,
                    cc.sys.BROWSER_TYPE_BAIDU_APP,
                    cc.sys.BROWSER_TYPE_WECHAT,
                    cc.sys.BROWSER_TYPE_MOBILE_QQ,
                    cc.sys.BROWSER_TYPE_MIUI,
                ].indexOf(cc.sys.browserType) < 0);
            }

            // Limit downloading max concurrent task to 2,
            // more tasks simultaneously may cause performance draw back on some android system / browsers.
            // You can adjust the number based on your own test result, you have to set it before any loading process to take effect.
            if (cc.sys.isBrowser && cc.sys.os === cc.sys.OS_ANDROID) {
                cc.assetManager.downloader.maxConcurrency = 2;
                cc.assetManager.downloader.maxRequestsPerFrame = 2;
            }

            var launchScene = settings.launchScene;
            var bundle = cc.assetManager.bundles.find(function (b) {
                return b.getSceneInfo(launchScene);
            });

            bundle.loadScene(launchScene, null, onProgress,
                function (err, scene) {
                    if (!err) {
                        cc.director.runSceneImmediate(scene);
                        if (cc.sys.isBrowser) {
                            // show canvas
                            var canvas = document.getElementById('GameCanvas');
                            canvas.style.visibility = '';
                            var div = document.getElementById('GameDiv');
                            if (div) {
                                div.style.backgroundImage = '';
                            }
                            console.log('Success to load scene: ' + launchScene);
                        }
                    }
                }
            );

        };

        var option = {
            id: 'GameCanvas',
            debugMode: settings.debug ? cc.debug.DebugMode.INFO : cc.debug.DebugMode.ERROR,
            showFPS: settings.debug,
            frameRate: 60,
            groupList: settings.groupList,
            collisionMatrix: settings.collisionMatrix,
        };

        cc.assetManager.init({
            bundleVers: settings.bundleVers,
            remoteBundles: settings.remoteBundles,
            server: settings.server
        });

        let bundleRoot = [INTERNAL, MAIN, "localBundle", "remoteBundle"];
        settings.hasStartSceneBundle && bundleRoot.push(START_SCENE);
        settings.hasResourcesBundle && bundleRoot.push(RESOURCES);

        var count = 0;
        function cb(err) {
            if (err) return console.error(err.message, err.stack);
            count++;
            if (count === bundleRoot.length + 1) {
                cc.game.run(option, onStart);
            }
        }

        cc.assetManager.loadScript(settings.jsList.map(function (x) { return 'src/' + x; }), cb);

        for (let i = 0; i < bundleRoot.length; i++) {
            cc.assetManager.loadBundle(bundleRoot[i], cb);
        }
    };

    if (window.jsb) {
        var isRuntime = (typeof loadRuntime === 'function');
        if (isRuntime) {
            require('src/settings.eed44.js');
            require('src/cocos2d-runtime.js');
            if (CC_PHYSICS_BUILTIN || CC_PHYSICS_CANNON) {
                require('src/physics.js');
            }
            require('jsb-adapter/engine/index.js');
        }
        else {
            require('src/settings.eed44.js');
            require('src/cocos2d-jsb.js');
            if (CC_PHYSICS_BUILTIN || CC_PHYSICS_CANNON) {
                require('src/physics.js');
            }
            require('jsb-adapter/jsb-engine.js');
        }

        cc.macro.CLEANUP_IMAGE_CACHE = true;
        window.boot();
    }

}
/*
     FILE ARCHIVED ON 13:46:40 Nov 16, 2021 AND RETRIEVED FROM THE
     INTERNET ARCHIVE ON 05:44:16 Mar 22, 2025.
     JAVASCRIPT APPENDED BY WAYBACK MACHINE, COPYRIGHT INTERNET ARCHIVE.

     ALL OTHER CONTENT MAY ALSO BE PROTECTED BY COPYRIGHT (17 U.S.C.
     SECTION 108(a)(3)).
*/
/*
playback timings (ms):
  captures_list: 0.427
  exclusion.robots: 0.018
  exclusion.robots.policy: 0.008
  esindex: 0.01
  cdx.remote: 8.606
  LoadShardBlock: 1951.517 (3)
  PetaboxLoader3.datanode: 2055.296 (5)
  load_resource: 194.943
  PetaboxLoader3.resolve: 70.4
  loaddict: 53.106
*/