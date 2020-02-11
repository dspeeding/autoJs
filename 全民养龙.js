toastLog('脚本开启');

//-----全局参数-----

var count = 1;
var basePath = "/sdcard/myjs/全民养龙/";

sleep(2000);
startMain();




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
    launchApp("全民养龙");
    toastLog("等待全民养龙启动");
    sleep(15000);

    //判断是否进入


    var img_a = images.read(basePath+"离线普通领取.png");
    var ret = images.findImage(captureScreen(), img_a);
    if(ret != null){
        toastLog("找到离线收益，点击普通领取...");
        click(264, 900);
        sleep(3000);
        //点击领取奖励
        click(521,880);
        sleep(3000);
    }

    var w = text("我的").findOne();
    if(w == null){
        toastLog("没找到主界面...退出");
        exit();
    }
    //进入主界面
    toastLog("进入主界面...");
    
}

//开始点击广告流程
function startProc(){
    while(1){

        toastLog("开始第"+count+"次流程...");
        //先查找恐龙商店界面是否打开
        var img_a = images.read(basePath+"恐龙商店关闭.png");
        var ret = images.findImage(captureScreen(), img_a);
        if(ret == null){
            toastLog("没有找到恐龙商店界面，点击打开...");
            click(810,1917);
            sleep(3000);
        }

        var num = 5;
        while(num > 0){
            //选择33级龙
            toastLog("点击恐龙商店当前龙按钮..."+ num);
            click(852,1018);
            sleep(3000);

            img_a = images.read(basePath+"免费获取金币.png");
            ret = images.findImage(captureScreen(), img_a);
            if(ret){
                toastLog("进入免费获取金币界面...");
                break;
            }
            num--;
        }
        if(n <= 0){
            toastLog("没有进入免费获取金币界面，退出...");
            exitApp();
            return ;
        }

        toastLog("找到免费领取金币，开始点击播放广告...");
        click(563,900);
        sleep(3000);

        //判断广告是否全部点击完  如果都完成则 退出程序
        img_a = images.read(basePath+"免费获取金币.png");
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
            id("tt_video_ad_close").findOne(5000).parent().click();
            num++;
        }

        toastLog("广告关闭");
        click(965, 80);
        sleep(3000);

        //找到领取金币的按钮
        img_a = images.read(basePath+"广告完成领取.png");
        ret = images.findImage(captureScreen(), img_a);
        if(ret == null){
            toastLog("没有找到广告完成领取，退出...");
            exitApp();
            return ;
        }

        click(525,930);

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

    //开始流程
    startProc();

}