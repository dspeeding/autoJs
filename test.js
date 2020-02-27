toastLog("test start...");

function test(){
//点击立即分享
var p = text("立即分享").findOne().parent();
click(p.bounds().centerX(), p.bounds().centerY());

sleep(5000);
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
        return 1;
    }
}
return 0;
}

var a = test();
if(a ==1){
    test();
}

    

toastLog("test end...");
exit();