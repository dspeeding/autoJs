toastLog("启动测试代码....");
sleep(2000);
//var basePath = "/sdcard/myjs/全民养龙/";
var basePath = "/sdcard/myjs/陀螺世界/";

if (!requestScreenCapture()) {
    toast("请求截图失败");
    exit();
};
sleep(5000);
var img = captureScreen();


toast("开始截图....");




var clip = images.clip(img, 480,1266,44,48);
images.save(clip, basePath+"37.png");

//var clip = images.clip(img, 372,799,346,87);
//images.save(clip, basePath+"观看视频获取.png");

//var clip = images.clip(img, 158,700,212,165);
//images.save(clip, basePath+"黄金翼龙.png");

//var clip = images.clip(img, 435,247,221,80);
//images.save(clip, basePath+"商店标题.png");


//var clip = images.clip(img, 655,527,116,39);
//images.save(clip, basePath+"收矿采集中.png");

//var clip = images.clip(img, 354,795,390,90);
//images.save(clip, basePath+"离线视频领取.png");



//var clip = images.clip(img, 922,259,67,71);
//images.save(clip, basePath+"恐龙商店关闭.png");


//var clip = images.clip(img, 424,882,300,85);
//images.save(clip, basePath+"广告完成领取.png");


//var clip = images.clip(img, 177,883,215,55);
//images.save(clip, basePath+"离线普通领取.png");

sleep(1000);
toast("截图完成....");
//var clip = images.clip(img, 331,852,430,80);
//images.save(clip, basePath+"免费获取金币.png");



