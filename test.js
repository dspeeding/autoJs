toastLog("test start...");


var gPosStartX = 128;
var gPosStartY = 1000;

var gPosDX = 262;
var gPosDY = 288;
var gPosX = [];
var gPosY = [];
var gLevel = [];
var basePath = "/sdcard/myjs/陀螺世界/";

for(var i =0;i<3;i++){
  for(var j=0;j<4;j++){
    gPosX[i*4+j] = gPosStartX+j*gPosDX;
    gPosY[i*4+j] = gPosStartY+i*gPosDY;
  }
}
for(var i=0;i<12;i++){
  gLevel[i] = 0;
}

toastLog("启动测试代码....");

if (!requestScreenCapture()) {
    toast("请求截图失败");
    exit();
};
sleep(5000);

for(var k=0;k<12;k++){
  log("第["+k +"]位置分析...");

  for(var level = 33;level <= 37 ;level++){
    log("--->等级["+level +"]分析...");
      var img_a = images.read(basePath+level+".png");
      var ret = images.findImageInRegion(captureScreen(), img_a, gPosX[k]-50, gPosY[k]-50, 150, 150);
      if(ret){
        log("第["+k +"]位置 是["+level+"]等级...");
          gLevel[k] = level;
          break;
      }
  }
}

toastLog("test end...");
exit();