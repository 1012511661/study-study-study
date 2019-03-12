$(document).ready(function(){
	var page = 0;//设置开始轮播第一个图片
	var len = $(".img-box a").length; //图片数量
	var stop = false;//设置轮播是否停止
	var t;//定时函数名
	/**定义轮播函数**/
	function slide(){
		if(!stop){
		    //判断下标的界限
			if(page == len){
				page = 0;//当page大于图片数量时，从第一个图片开始播放
			}
		    //隐藏。
		   $(".page-con li").eq(page).siblings().css({"background":"#3e3e3e"});//其他按钮不改变背景
		   $(".img-box a").eq(page).siblings().css("display","none");//其他图片img所在的a标签隐藏
		   //显示
		   $(".page-con li").eq(page).css({"background":"#b61b1f"});//相应底部按钮背景改变
		   $(".img-box a").eq(page).css("display","block");//相应img显示
			page++;//当前轮播加1（下一个图片显示）
		}
		t=setTimeout(slide,1500);

	}
	slide();//开始轮播

	/**悬浮到轮播图  **/
	$(".focus").hover(function(){
		stop = true;//停止轮播
	},
	function(){
		stop = false;//鼠标离开 开始轮播
	});

	/**按钮点击**/
	$(".page-con li").click(function(){
		 clearTimeout(t);//清除定时
		page = $(this).index();//将page 设置成当前点击按钮的 下标值
		slide();
	});
});