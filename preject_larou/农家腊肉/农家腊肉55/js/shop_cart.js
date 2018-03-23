$(function(){
	var data=[
		{"att_name":"\u7cbe\u81f4\u88c5\uff08500g\uff09|\u4e94\u9999\u5473","att_price":"85.00","att_reduce":"7.00","att_pv":"0.00","att_kc":"100","att_stamp":"150394442863926","att_img":"20170829\/28352d557ffb3396af3f8d1f953cd0c3.png"},
		{"att_name":"\u793c\u76d2\u88c5\uff08600g\uff09|\u4e94\u9999\u5473","att_price":"138.00","att_reduce":"14.00","att_pv":"0.00","att_kc":"100","att_stamp":"15039994768488","att_img":"20170831\/79cc6288bb901efdded696eed77a7110.png"},
		{"att_name":"\u6563\u5305\u88c5\uff08300g\uff09|\u4e94\u9999\u5473","att_price":"55.00","att_reduce":"5.00","att_pv":"0.00","att_kc":"100","att_stamp":"150414384003918","att_img":"20170831\/461bd3ab8ca1899adb9d493b198f5446.png"},
		{"att_name":"\u7cbe\u81f4\u88c5\uff08500g\uff09|\u9999\u8fa3\u5473","att_price":"85.00","att_reduce":"7.00","att_pv":"0.00","att_kc":"100","att_stamp":"150414607015840","att_img":"20170831\/99389db830e22f3e677359117c8073de.png"},
		{"att_name":"\u793c\u76d2\u88c5\uff08600g\uff09|\u9999\u8fa3\u5473","att_price":"138.00","att_reduce":"14.00","att_pv":"0.00","att_kc":"100","att_stamp":"150414608999218","att_img":"20170831\/ab4a7d3bdf383aa925522c65ca4cd6ee.png"},
		{"att_name":"\u6563\u5305\u88c5\uff08300g\uff09|\u9999\u8fa3\u5473","att_price":"55.00","att_reduce":"5.00","att_pv":"0.00","att_kc":"100","att_stamp":"150414611695249","att_img":"20170831\/42a82b9db0323b41c4e5c2a8cbe63d4a.png"}
	];
	
	
	$.ajax({
		type:"get",
		url:"xxx.json",
		async:true,
		success:function(res){
			var data = res;
			console.log(data);
		},
		error:function(){
			
		}
	});
	
	console.log(data);
	choise();
	
	//动态显示属性结构
	var tempArr = [];
	data.forEach(function(t,i){
		if($.inArray(t.att_name,tempArr) == -1){
			tempArr.push(t.att_name);
		}
	});
	
	console.log(tempArr);
	
	//分割属性
	var attr = tempArr[0].split('|');   
	var num = attr.length; 
	var attrNameArr = [];               
	for(var i=0;i<num;i++){
		attrNameArr.push([attr[i]]);
	}
	
	console.log(attrNameArr);
	
	//属性循环
	data.forEach(function(d){   
		var item = d.att_name.split('|');
		for(var i=0;i<item.length;i++){
			if($.inArray(item[i],attrNameArr[i]) == -1){
				attrNameArr[i].push(item[i]);
			}
		}     
	});

	//动态渲染
	var html = '';
	attrNameArr.forEach(function(a){
		html += "<h3>属性</h3><ul>";
		a.forEach(function(item,i){
			var classVal='';
			if(i == 0){
				classVal='class="on"';  //默认第一个选中
			}
			html += "<li "+classVal+">"+item+"</li>";
		});
		html += "</ul>";
	});

	$("#property").append(html);

	//点击切换
	var liObjs = $('.pro_details ul li');
		for(var i=0;i<=liObjs.length-1;i++){
			+function(){
				var r = i;
				liObjs[r].onclick = function(event){
					$(this).addClass('on').siblings().removeClass('on');
				};
			}();
		};


	$('.join').click(function(){
		$('.pro_details').css('display','block');
	});

	$("#property ul li").each(function(){
		$(this).click(function(){
			choise();
		});
	});
	
	

	//选择函数
	function choise(){
		var str = '';
		$("#property ul li.on").each(function(){
			str += $(this).text() + '|';
		});
		str=str.substring(0,str.length-1);
		var arr  = []; 
		for(var i=0;i<data.length;i++){
		 	if(data[i].att_name.indexOf(str) != -1){
		 		arr.push(data[i]);
		 	}
		 }
		

		
		//数据动态呈现
		$(".att_img>img").attr('src','http://t.lld8839.com/'+arr[0].att_img);
		$(".info .price").text('￥'+arr[0].att_price);
		$(".info .quan").text('￥'+arr[0].att_reduce);
		$(".info .pv").text(arr[0].att_pv);
		$(".info .num").text(arr[0].att_kc);
	}
	
	//确定弹出属性
	$('.true').click(function(){
		choise();
		var name = $("#property ul li.on").text();
		var img = $(".att_img>img").attr('src');
		var price = $(".info .price").text();
		var reduce = $(".info .quan").text();
		var pv = $(".info .pv").text();
		var kc = $(".info .num").text();
		var goods = {'att_name':name,'att_price':price,'att_reduce':reduce,'att_pv':pv,'att_kc':kc,'att_img':img};
		var str = JSON.stringify(goods);  	
		alert(str);
	});
	
	//点击关闭
	$('#close').click(function(){
		$('.pro_details').css('display','none');
	});
	
});