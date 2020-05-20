if(!self.__appxInited) {
self.__appxInited = 1;


require('./config$');


  var AFAppX = self.AFAppX.getAppContext
    ? self.AFAppX.getAppContext().AFAppX
    : self.AFAppX;
  self.getCurrentPages = AFAppX.getCurrentPages;
  self.getApp = AFAppX.getApp;
  self.Page = AFAppX.Page;
  self.App = AFAppX.App;
  self.my = AFAppX.bridge || AFAppX.abridge;
  self.abridge = self.my;
  self.Component = AFAppX.WorkerComponent || function(){};
  self.$global = AFAppX.$global;
  self.requirePlugin = AFAppX.requirePlugin;
          

if(AFAppX.registerApp) {
  AFAppX.registerApp({
    appJSON: appXAppJson,
  });
}



function success() {
require('../../app');
require('../../components/loading/loading?hash=591ac642b6f57a184fac9330fa292ccf33c32471');
require('../../components/recommond/home/swiper/swiper?hash=ec7c5687c7f2ffa836caf3a93e877914426baff6');
require('../../components/recommond/home/live/live?hash=ec7c5687c7f2ffa836caf3a93e877914426baff6');
require('../../components/audioWave/index?hash=ec7c5687c7f2ffa836caf3a93e877914426baff6');
require('../../components/recommond/home/follow/follow?hash=f46d6895382c2391aeba6c17e1c7323530d1335f');
require('../../components/boutique/home/swiper/swiper?hash=ec7c5687c7f2ffa836caf3a93e877914426baff6');
require('../../pages/recommond/home/index?hash=43457c76bce24850419bc3466949fd83828f1a25');
require('../../pages/boutique/home/index?hash=33764254d221f3dc324e3a532aca6757a440c101');
require('../../pages/courseSave/home/index?hash=32d7d2807ed4e666ef03b4b3fe8c38ecf2e34e68');
require('../../pages/me/home/index?hash=32d7d2807ed4e666ef03b4b3fe8c38ecf2e34e68');
}
self.bootstrapApp ? self.bootstrapApp({ success }) : success();
}