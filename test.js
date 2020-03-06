toastLog("test start...");


 //点击热门 领油
 var a = text("活动中心").findOne().parent();
 click(a.bounds().centerX(), a.bounds().centerY());
 text("活动").waitFor();

 
log("横向滑动找到免费领油界面");
a = text("签到赚积分").findOne().parent();
swipe(device.width*5/6, a.bounds().centerY(), device.width/6, a.bounds().centerY(), 100);
a = text("免费领油").findOne().parent();
 
 click(a.bounds().centerX(), a.bounds().centerY());
toastLog("test end...");
exit();