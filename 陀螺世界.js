toastLog('脚本开启');

//-----全局参数-----

var count = 1;
var basePath = "/sdcard/myjs/陀螺世界/";

sleep(500);
startMain();

var gPosStartX = 115;
var gPosStartY = 1000;

var gPosDX = 280;
var gPosDY = 280;
var gPosX = [];
var gPosY = [];
var gLevel = [];

//为点位赋值xy坐标点
for(var i =0;i<3;i++){
  for(var j=0;j<4;j++){
    gPosX[i*4+j] = gPosStartX+j*gPosDY;
    gPosY[i*4+j] = gPosStartY+i*gPosDX;
  }
}
for(var i=0;i<12;i++){
    gLevel[i] = 0;
}

//选择文本进入 公共方法
function clickByTextDesc(energyType,paddingY,noFindExit,exceptionMsg){
    if(descEndsWith(energyType).exists()){
        descEndsWith(energyType).find().forEach(function(pos){
            var posb=pos.bounds();
            click(posb.centerX(),posb.centerY()-paddingY);
            return true;
        });
    }else if(textEndsWith(energyType).exists()){
        textEndsWith(energyType).find().forEach(function(pos){
            var posb=pos.bounds();
            click(posb.centerX(),posb.centerY()-paddingY);
            return true;
        });
    }else{
        if(noFindExit!=null && noFindExit){
            if(exceptionMsg !=null){
                toastLog(exceptionMsg);
                exit();
            }else{
                toastLog("程序当前所处状态不合预期,脚本退出");
				exit();
            }
        }else{
            if(exceptionMsg !=null){
                toastLog(exceptionMsg);
            }
            return false;
        }
    }
}


//打开app
function openApp(){
    launchApp("陀螺世界");
    toastLog("等待陀螺世界启动");

    var w = text("我的").findOne(300);
    if(w){
        //进入主界面
        toastLog("进入主界面...");
        killAd();
        return ;
    }

    id("tt_splash_skip_btn").findOne(5000).click();
    sleep(5000);

    //判断是否进入

    var img_a = images.read(basePath+"离线视频领取.png");
    var ret = images.findImage(captureScreen(), img_a);
    if(ret != null){
        toastLog("找到离线收益，不观看视频领取...");
        sleep(3000);        //跳过关闭倒数按钮
        click(967,510);
        sleep(3000);
        //点击领取奖励
        click(535,1411);
        sleep(3000);
    }

    w = text("我的").findOne();
    if(w == null){
        toastLog("没找到主界面...退出");
        exit();
    }
    //进入主界面
    toastLog("进入主界面...");
    
}

//签到
function signProc(){

    //进入打工界面
    toastLog("执行签到流程...,切换到打工界面...");
    killAd();
    text("打工").findOne().click();
    sleep(3000);

    var ret = colors.equals(images.pixel(captureScreen(), 1042, 161), "#ffff0000");
    if(ret == true){
        toastLog("今天还未签到，进入签到流程...");
        click(964, 190);        //点击右上角签到
        sleep(3000);

        click(580, 1785);       //点击签到按钮

        sleep(3000);
        click(556, 1329);       //点击确认领取按钮
        toastLog("签到完成...");
    }else{
        toastLog("今天已经签到过了...");
    }

    //切换回主界面
    id("game_img_uncheck").findOne().click();
    sleep(3000);
}

//关闭广告
function killAd(){
    //检测广告关闭
    var ad = id("interstitial_close").findOnce();
    if(ad){
        ad.click();
        sleep(1000);
    }
}

//一键收矿流程
function shoukuangProc(){
    toastLog("一键收矿开始...");

    var img_a = images.read(basePath+"收矿采集中.png");
    var ret = images.findImageInRegion(captureScreen(), img_a, 435, 408, 410, 234);
    if(ret){
        toastLog("还在采集中...");
        return ;
    }

    click(690, 488);
    sleep(500);
    toastLog("一键收矿结束...");
}

//分析坑位等级
function analysisPoc(){

    for(var k=0;k<12;k++){
        toastLog("第["+k +"]位置分析...");

        for(var level = 33;level <= 37 ;level++){
            var img_a = images.read(basePath+level+".png");
            var ret = images.findImageInRegion(captureScreen(), img_a, gPosX[k], gPosY[k], 160, 160);
            if(ret){
                toastLog("第["+k +"]位置 是["+level+"]等级...");
                gLevel[k] = level;
                break;
            }
        }
    }

}

//位置满的操作过程
function fullOpt(){

    toastLog("位置满了...");

    //关闭商店
    click(919, 294);
    sleep(1000);

    var img_a = images.read(basePath+"33.png");
    var ret = images.findImage(captureScreen(), img_a, 435, 408, 410, 234);
    if(ret){
        toastLog("还在采集中...");
        return ;
    }
    
}


//开始点击广告流程
function startProc(){
    while(1){

        toastLog("开始第"+count+"次流程...");
        killAd();

        //点击商店
        var img_a = images.read(basePath+"商店标题.png");
        var ret = images.findImage(captureScreen(), img_a);
        if(ret == null){
            toastLog("没有找到商店界面，点击打开...");
            click(825,1892);
            sleep(3000);
        }

        //找到黄金翼龙
        img_a = images.read(basePath+"黄金翼龙.png");
        ret = images.findImage(captureScreen(), img_a);
        if(ret == null){
            toastLog("没有找到黄金翼龙，滑动找...");
            //定位到33级龙
            var n =0;
            while(n<9){
                swipe(550, 1400, 550, 700, 200);
                sleep(200);
                n++;
            }
        }
        
        //这里已经打开商店页面 也定位到33级龙了
        var num = 5;
        while(num > 0){
            toastLog("点击恐龙商店当前龙按钮..."+ num);
            click(804, 790);
            sleep(2000);

            img_a = images.read(basePath+"观看视频获取.png");
            ret = images.findImage(captureScreen(), img_a);
            if(ret){
                toastLog("进入观看视频获取界面...");
                break;
            }
            num--;
        }
        if(num <= 0){
            toastLog("位置满了，需要调整....");
            fullOpt();
        }

        toastLog("点击按钮观看视频...");
        click(564, 845);

        //判断广告是否全部点击完  如果都完成则 退出程序
        img_a = images.read(basePath+"观看视频获取.png");
        ret = images.findImage(captureScreen(), img_a);
        if(ret){
            toastLog("还在免费领取金币按钮界面，共完成" + count + "次循环, 已经完成任务，退出...");
            exitApp();
            return ;
        }

        toastLog("等待广告...");
        num = 0;
        while(num < 8){
            toastLog("等待广告 "+num*5+"s...");
            var a = id("tt_video_ad_close").findOne(5000)
            if(a){
                a.parent().click();
                break;
            }
            num++;
        }

        toastLog("广告关闭");
        click(542, 1415);       //点击领取金币

        count++;
        toastLog("等待15秒 进入下一个循环...");
        sleep(15000);

    }
}

/**
 * 设置按键监听 当脚本执行时候按音量减 退出脚本
 */
function registEvent() {
    //启用按键监听
    events.observeKey();
    //监听音量上键按下
    events.onKeyDown("KEYCODE_VOLUME_DOWN", function(event){
        toastLog("脚本手动退出");
        exit();
    });
}

//初始化操作
function initProc(){
    //设置屏幕分辨率
    //setScreenMetrics(1080, 2160);
    //请求截图
   if(!requestScreenCapture()){
        toastLog("请求截图失败,脚本退出");
        exit();
    }

    //registEvent();
}



function exitApp(){
    back();
    sleep(500);
    back();
    exit();
}

//程序主入口
function startMain(){

    //初始化操作
    initProc();

    //打开app
    openApp();

    //签到操作
    signProc();

    //一键收矿
    shoukuangProc();

    //开始流程
    startProc();

}