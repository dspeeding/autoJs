toastLog('好车主 脚本开启...');

//-----全局参数-----

startMain();





//打开app
function openApp(){
    launchApp("平安好车主");
    toastLog("等待平安好车主启动");
    sleep(2000);

    //找到跳过按钮
    var tg = id("splansh_time_tv").findOne(2000);
    if(tg){
        toastLog("找到跳过按钮,点击跳过...");
        tg.click();
        sleep(1000);
    }else{
        sleep(5000);
    }

    //找到开屏广告 点击关闭
    var ad = id("ad_cancel").findOne(5000);
    if(ad){
        toastLog("找到广告按钮,点击关闭...");
        ad.click();
        sleep(1000);
    }

    //找到首页
    var main = id("main_page_tab_menu1").findOne(5000);
    if(main){
        toastLog("成功进入首页...");
    }else{
        toastLog("没有找到首页，退出...");
        exit();
    }
}

//开始签到流程
function startSign(){
    toastLog("开始签到流程...");
    //进入到 主页 页面
    var k = id("main_page_tab_menu1").findOne();
    click(k.bounds().centerX(), k.bounds().centerY());
    sleep(1000);

    var a = text("签到领积分").findOne(2000);
    if(a){
        a.click();
        sleep(5000);
        //回退到主界面
        back();
    }else{
        toastLog("今日已签到...");
    }
}

//任务： 一键提醒好友
function taskRemain(){

    //点击 邀请待完成 进入我的邀请界面
    className("android.view.View").text("邀请待完成").findOne().parent().click();

    //等待界面加载完成
    className("android.view.View").text("我的邀请").waitFor();

    //点击一键提醒按钮
    var p = text("一键提醒");
    if(p){
        p.click();
    }
    sleep(1000);

    //TODO 是否有弹出框

    back();
}

//任务： 邀请一次好友
function taskInvite(){

    var p = className("android.view.View").text("分享赚钱").findOne().parent();
    p.children().forEach(function(child){
        if(child.indexInParent() == 2){
            child.click();
        }
    });

    sleep(2000);
    text("微信").findOne().parent().click();
    
    sleep(1000);
    text("选择").waitFor();

    back();
    sleep(2000);
}

//任务： 为好友点赞
function taskToFriend(){

    //在分享赚钱页面 点击我的排名 进入到排行榜
    className("android.view.View").textStartsWith("我的排名").findOne().parent().click();

    className("android.view.View").text("排行榜").waitFor();

    //找到第二个排行榜（第一个有问题）
    var p = className("android.view.View").text("2").findOne().parent();
    p.children().forEach(function(child){
        if(child.className() == "android.widget.Image" && child.indexInParent() == 6){ 
          click(child.bounds().centerX(), child.bounds().centerY());
        }
    });
    sleep(1000);
    back();
    sleep(500);
}

//任务： 完成海报分享
function taskToHaibao(index){
    
    var p = className("android.view.View").text("更多").find()[index];
    p.parent().click();

    className("android.view.View").text("海报").waitFor();

    //点击一个热推海报
    var p = className("android.view.View").text("热推").findOne();
    var haibao = p.parent();
    click(haibao.bounds().centerX(), haibao.bounds().centerY());

    className("android.view.View").text("优选海报").waitFor();

    text("复制文案分享").findOne().click();

    sleep(2000);
    text("微信").findOne().parent().click();

    sleep(1000);
    text("选择").waitFor();
    back(); //回退到优选海报
    sleep(1000);
    back(); //回退到海报列表
    sleep(1000);
    back(); //回退到任务列表
}

//任务： 完成一次功能指引
function taskGongneng(index){
    var p = className("android.view.View").text("更多").find()[index];
    p.parent().click();

    className("android.view.View").text("功能指引").waitFor();

    //点击立即分享
    var p = text("立即分享").findOne().parent();
    click(p.bounds().centerX(), p.bounds().centerY());

    sleep(2000);
    var a = text("立即分享").findOne(3000);
    a.click();
    
    var b = text("微信").findOne(3000);
    if(b){
        b.parent().click();
    }else{
        click(a.bounds().centerX(), a.bounds().centerY());
        b = text("微信").findOne(3000);
        if(b == null){
            toastLog("没点出来微信。。。");
            back(); //回退到功能指引列表
            sleep(3000);
            back();
            sleep(3000);
            return 1;
        }
    }

    sleep(1000);
    text("选择").waitFor();
    back(); //回退到分享详情
    sleep(1000);
    back(); //回退到功能指引列表
    sleep(1000);
    back(); //回退到任务列表
    return 0;
}

//任务： 完成一次非车险产品分享
function taskIns(index){
    var p = className("android.view.View").text("更多").find()[index];
    p.parent().click();

    className("android.view.View").text("热卖保险").waitFor();

    sleep(2000);
    //点击立即分享
    var p = text("立即分享").findOne().parent();
    click(p.bounds().centerX(), p.bounds().centerY());

    text("微信").findOne().parent().click();

    sleep(1000);
    text("选择").waitFor();
    back(); //回退到车险产品列表
    sleep(1000);
    back(); //回退到任务列表
}

//任务： 完成一次活动攻略分享
function taskHuodong(index){
    var p = className("android.view.View").text("更多").find()[index];
    p.parent().click();

    className("android.view.View").text("活动攻略").waitFor();

    sleep(2000);
    //点击立即分享
    var p = text("立即分享").findOne().parent();
    click(p.bounds().centerX(), p.bounds().centerY());

    sleep(1000);
    text("立即分享").findOne().click();

    text("微信").findOne().parent().click();

    sleep(1000);
    text("选择").waitFor();
    back(); //回退到分享详情
    sleep(1000);
    back(); //回退到活动攻略列表
    sleep(1000);
    back(); //回退到任务列表
}

//任务： 参与热门活动
function taskHot(index){
    var p = className("android.view.View").text("更多").find()[index];
    p.parent().click();

    className("android.view.View").text("热门活动").waitFor();

    sleep(1000);
    var p = className("android.view.View").text("热推").findOne(2000);
    if(p){
        log("找到热推...");
        p = p.parent();
        click(p.bounds().centerX(), p.bounds().centerY());
    }else{
        //如果没有热推则点击屏幕中央位置
        click(device.width/2, device.height/2);
    }

    sleep(5000);

    var p = className("android.view.View").text("热门活动").findOne(1000);
    if(p == null){
        back(); //回退到热门活动列表
        sleep(2000);
    }
    if(className("android.view.View").text("热门活动").findOne(1000)){
        back(); //回退到任务列表
        sleep(2000);
    }
}

//任务： 完成一次平安资讯分享
function toastZiXun(){

    var p = className("android.view.View").text("首页").findOne(1000);
    if(p){
        var a = className("android.widget.TextView").text("分享赚钱").findOne();
        click(a.bounds().centerX(), a.bounds().centerY());

        //等待分享页面
        className("android.view.View").text("分享赚钱").waitFor();
    }

    //下滑到平安资讯那里
    var i=0;
    while(i<11){
        swipe(device.width/2, device.height/2, device.width/2, device.height/4, 500);
        sleep(100);
        i++;
    }

    click(device.width/2, device.height/2);

    sleep(5000);

    id("post_detail_forwarding").findOne().parent().click();

    sleep(500);
    text("微信").findOne().parent().click();

    sleep(1000);
    text("选择").waitFor();
    back(); //回退到文章页面

    var ad = id("im_share_close").findOne(2000);
    if(ad){
        ad.click();
    }

    back();     //返回到分享首页
    sleep(500);

    //回滚到最上边
    i=0;
    while(i<11){
        swipe(device.width/2, device.height/4, device.width/2, device.height/2, 500);
        sleep(100);
        i++;
    }
}

//领取奖励
function getGlod(name){
    var a = className("android.view.View").text("您有0个积分球待领取").findOne(500);
    if(a){
        return ;
    }
    while(1){
        var p = className("android.view.View").text(name).findOne(3000);
        if(p == null){
            break;
        }
        p.parent().click();
        sleep(2000);
    }
}

//分享赚钱
function shareProc(){
    //进入我的界面
    var k = id("main_page_tab_menu5").findOne();
    click(k.bounds().centerX(), k.bounds().centerY());
    sleep(3000);

    var a = className("android.widget.TextView").text("分享赚钱").findOne();
    click(a.bounds().centerX(), a.bounds().centerY());

    //等待分享页面
    className("android.view.View").text("分享赚钱").waitFor();

    //点击做任务按钮  
    var rw = className("android.view.View").depth(19).drawingOrder(0).indexInParent(3).findOne();
    rw.click();

    //获取到所有任务
    var subRW = text("连续签到5天").findOne();
    var list = subRW.parent().children();
    var taskList = [];
    var obj = {};

    toastLog("共有["+ list.length/4 +"]任务...");
    for(var i = 0; i < list.length; i++){
        var child = list[i];
        if(i%4 == 1){
            obj.taskName = child.text();
        }
        if(i%4 == 3){
            obj.finish = child.text();
            obj.kj = child;
            taskList.push(obj);
            obj = {};
        }
    }

    //关闭任务列表 目前没办法找到关闭按钮 退出该界面再重新进入
    back();
    sleep(1000);

    a = className("android.widget.TextView").text("分享赚钱").findOne();
    click(a.bounds().centerX(), a.bounds().centerY());

    //等待分享页面
    className("android.view.View").text("分享赚钱").waitFor();

    //到这里就重新进入到分享页面了
    //先分享一次
    taskInvite();

    for(var i = 0; i < taskList.length; i++){
        var task = taskList[i];

            //先判断任务是否完成
        if(task.finish == "已完成"){
            toastLog("任务[" +task.taskName + "]已经完成..");
            continue;
        }
        if(task.taskName == "连续签到5天"){
            continue;
        }else if(task.taskName == "一键提醒好友"){
            toastLog("开始任务 一键提醒好友");
            taskRemain();
        }else if(task.taskName == "邀请一次好友"){
            toastLog("开始任务 邀请一次好友...");
            taskInvite();
        }else if(task.taskName == "为好友点赞"){
            toastLog("开始任务 为好友点赞...");
            taskToFriend();
        }else if(task.taskName == "完成一次海报分享"){
            toastLog("开始任务 完成一次海报分享...");
            taskToHaibao(0);
        }else if(task.taskName == "完成一次功能指引分享"){
            toastLog("开始任务 完成一次功能指引分享...");
            var ret = taskGongneng(1);
            if(ret == 1){
                taskGongneng(1);
            }
        }else if(task.taskName == "完成一次非车险产品分享"){
            toastLog("开始任务 完成一次非车险产品分享...");
            taskIns(4);
        }else if(task.taskName == "完成一次活动攻略分享"){
            toastLog("开始任务 完成一次活动攻略分享...");
            taskHuodong(2);
        }else if(task.taskName == "参与热门活动"){
            toastLog("开始任务 参与热门活动...");
            taskHot(3);
        }else if(task.taskName == "完成一次平安资讯分享"){
            toastLog("开始任务 完成一次平安资讯分享");
            toastZiXun();
        }

        //每次任务完成 等待分享页面
        className("android.view.View").text("分享赚钱").waitFor();
    }
    
    
    //完成全部任务后
    toastLog("已完成全部任务...,领取奖励");
    //获取奖励
    getGlod("任务奖励");
    getGlod("分享奖励");
    getGlod("参与奖励");
    getGlod("活动参与奖励");
    getGlod("新人奖励");
    getGlod("参与奖励");
    getGlod("任务奖励");

    toastLog("已领取全部奖励...");

    back(); //回退到我的界面

}

//领取油奖励
function getOil(name){
    while(1){
        var p ;
        if(name=="签到送油"){
            p =  className("android.view.View").text(name).find();
            if(p.length < 2){
                break;
            }
        }else{
            p = className("android.view.View").text(name).findOne(1000);
            if(p == null){
                break;
            }
            
            p.parent().parent().click();
            sleep(2000);
        }
    }
}

//领油
function startOil(){
    toastLog("开始领油流程...");
    var k = id("main_page_tab_menu1").findOne();
    click(k.bounds().centerX(), k.bounds().centerY());
    sleep(1000);

    //点击热门 领油
    var a = text("活动中心").findOne().parent();
    click(a.bounds().centerX(), a.bounds().centerY());
    text("活动").waitFor();

    log("横向滑动找到免费领油界面");
    a = text("签到赚积分").findOne().parent();
    swipe(device.width*5/6, a.bounds().centerY(), device.width/6, a.bounds().centerY(), 100);
    a = text("免费领油").findOne().parent();

    //等待进入页面
    className("android.view.View").text("天天来攒油").waitFor();

    //点击打卡按钮
    var a = text("今日已领").findOne(1000);
    if(a){
        toastLog("今日已打卡...");
    }else{
        className("android.widget.Button").text("打卡").findOne().click();
        sleep(1000);
    }
    
    //进入偷油页面
    className("android.view.View").text("偷油").findOne().parent().click();

    //等待进入页面
    className("android.view.View").text("偷汽油").waitFor();


    //先做任务领取剩余次数
    className("android.view.View").text("剩余次数").findOne().parent().click();
    sleep(5000);

    while(1){
        //点击去体验
        var p = className("android.view.View").text("去体验").findOne(1000);
        if(p == null){
            break;
        }

        p.click();
        sleep(3000);
        back();
        sleep(1000);
    }

    //去找关闭按钮
    var p = className("android.view.View").text("做任务 得次数").findOne().parent();
    p.children().forEach(function(child){
        if(child.className()=="android.widget.Image" && child.indexInParent() == 3){
            child.click();
            sleep(1000);
        }
    });

    var count = 0;
    while(1){
        toastLog("开始偷油..."+(parseInt(count)+1));
        var p = className("android.view.View").text("0次").findOne(1000);
        if(p){
            toastLog("次数已用完...");
            break;
        }
        //点击偷油按钮
        p = className("android.widget.Button").text("偷油").findOne(2000);
        if(p == null){
            toastLog("没有找到偷油按钮，不让偷了...");
            sleep(1000);
            back();     //回退到攒油主界面
            className("android.view.View").text("天天来攒油").waitFor();
            sleep(1000);
            //进入偷油页面
            className("android.view.View").text("偷油").findOne().parent().click();

            //等待进入页面
            className("android.view.View").text("偷汽油").waitFor();
        }else{
            p.click();
        }
        sleep(5000);
        count++;
    }
    
    toastLog("偷了["+count+"]次...");
    back();
    sleep(1000);

    toastLog("开始领油滴...");
    

    var p = className("android.view.View").text("一键收油").findOne(1000);
    if(p){
        toastLog("一键收油...");
        p.parent().click();
    }
    sleep(2000);

    toastLog("领油滴结束,回到首页...");
    back();
    

    toastLog("领油流程结束...");
}

//开始流程
function startProc(){

    var ret = 0;
    //签到
    ret = startSign();

    //分享
    shareProc();

    //领油
    startOil();
    
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
    
    registEvent();
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

    exitApp();

}