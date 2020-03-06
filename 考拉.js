toastLog("test start...");

var i=0;
while(i<10000){
    className("android.view.View").text("发弹幕").findOne().parent().click();
    sleep(1000);
    i++;
}

toastLog("test end...");
exit();