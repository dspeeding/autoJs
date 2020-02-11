toastLog('脚本开启');

//-----全局参数-----
var startTime="07:00";
var endTime="08:50";
var exitCount=2;

sleep(2000);
startMain();


//解锁
function unlock(){
    if(!device.isScreenOn()){
        //点亮屏幕
        toastLog('检测到屏幕未开启，点亮屏幕并解锁');
        device.wakeUp();
        //由于MIUI的解锁有变速检测，因此要点开时间以进入密码界面
        sleep(1000);
        swipe(500, 0, 500, 1900, 2000);
        click(100,150); 
        //输入屏幕解锁密码，其他密码请自行修改
        sleep(2000);
        click(540,1800);
        sleep(500);
       
        click(540,1800);
        sleep(500);
        
        click(240,1620);
        sleep(500);
        
        click(540,1620);
        sleep(500);    
    }
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

//进入蚂蚁庄园
function enterAntFarm(){

    //判断首页是否有蚂蚁森林应用
    if(clickByTextDesc("蚂蚁森林", 0, false, "首页未找到蚂蚁森林应用") == false){
        exitCount += 1;
        //进入更多中查找
        //点击更多按钮
        clickByTextDesc("更多", 0, true, "未找到更多应用");

        sleep(2000);

        //点击蚂蚁森林应用
        clickByTextDesc("蚂蚁森林", 0, true, "未找到蚂蚁森林应用");
    }

    sleep(8000);
}

//收集自己能量
function getMySelf(){
    toastLog("开始收集自己能量...");

    //将能量球存在的区域都点一遍，间隔是能量球的半径
    for(var row = 640;row < 900;row+=100)
           for(var col = 140;col < 800;col+=100){
               click(col,row);
               sleep(100);
               }
    toastLog("自己能量收集完成");
    sleep(100);
}

//检查时间是否在范围内
function checkTime(){
    var now =new Date();
    var hour=now.getHours();
    var minu=now.getMinutes();
    var time_a=startTime.split(":");
    var time_b=endTime.split(":");
    var timea = 60*Number(time_a[0])+Number(time_a[1]);
    var timeb = 60*Number(time_b[0])+Number(time_b[1]);
    var time  = 60*hour + minu;
    if(time>=timea && time<=timeb){
        //sleep(2000);
        return true;
    }else{
        return false;
    }   
}

//打开支付宝app
function openAlipay(){
    launchApp("支付宝");
    toastLog("等待支付宝启动");
    var i=0;
    while (!textEndsWith("扫一扫").exists() && !descEndsWith("扫一扫").exists() && i<=5){
        sleep(2000);
        i++;
    }
	toastLog("第"+i+"次尝试进入支付宝主页");
    if(i>=5){
        toastLog("没有找到支付宝首页，程序退出");
        exit();
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
    setScreenMetrics(1080, 2160);
    //请求截图
   if(!requestScreenCapture()){
        toastLog("请求截图失败,脚本退出");
        exit();
    }

    registEvent();
}

function existApp(){

    var i=0;
    while(i<exitCount){
        i++;
        back();
        sleep(2000);
    }
}

//程序主入口
function startMain(){

    //解锁屏幕
    unlock();

    //初始化操作
    //initProc();

    //打开支付宝
    openAlipay();

    //蚂蚁庄园
	//if(!checkTime()){
        enterAntFarm();
        
        //收集自己的能量
        getMySelf();
	//}

    existApp();
    
    exit();


}