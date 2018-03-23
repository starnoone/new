$(function(){

	//加入购物车
	$("a.add").bind('click', function() {
		$(".footer").css("display","none");
		$(".addCar").css("display","block");
	});
	//关闭
	$(".close").bind('click', function() {
		$(".addCar").css("display","none");
		$(".footer").css("display","block");
	});

		//console.log("data");
		var goods;
		var goodsIndex = 0;
		var arr = {name:[],weid:[]};
		var str1 = "<h2>包装</h2><ul>";
		var str2 = "<h2>口味</h2><ul>";
		$.ajax({
			url:"data/shop_car.json",
			type:"get",
			dataType:"json",
			async:false,
			success:function(data){
				goods = data.goodsData;
				console.log(goods);
				setInfo(goods);
				select();
			}
		})

		//动态生成包装和口味选项
		function setInfo(data){
			//console.log(data.goodsData);
				for(var i=0;i<goods.length;i++){
					//console.log(tempArr[i].att_name);
					arr.name.push(goods[i].att_name.split("|")[0]);
					arr.weid.push(goods[i].att_name.split("|")[1])
				}
				//去重
				$.unique(arr.name);
				$.unique(arr.weid);
				//console.log(arr.name);
				//包装
				for(var k=0;k<arr.name.length;k++){
					//console.log(arr.name[k]);
					str1 += "<li>"+arr.name[k]+"</li>"
				}
				str1 += "</ul>";
				$(".attr").append(str1);

				//口味
				for(var j=0;j<arr.weid.length;j++){
					//console.log(arr.weid[j]);
					str2 += "<li>"+arr.weid[j]+"</li>"
				}
				str2 += "</ul>";
				//console.log(str2);
				$(".taste").append(str2);
		}


		//封装select函数，通过动态索引值index选取到相应的信息
		function select(index = goodsIndex){
			var curGoods = goods[index];
			console.log(curGoods);
			//动态设置图片
			var domain = 'http://t.lld8839.com/';
			$(".pic").html("<img src='"+domain+curGoods.att_img+"'>");
			$(".pic img").css({'width':'100%','height':'100%'});
			//动态同步产品信息
			$(".info p").html('价格:<span class="price">￥'+curGoods.att_price+'</span>可用消费券:<span class="quan">￥'+curGoods.att_reduce+'</span>pv:<span class="pv">'+curGoods.att_pv+'</span>库存:<span class="num">'+curGoods.att_kc+'</span>');

			//设置数据对应的当前选中
			var attNameA = curGoods.att_name.split("|")[0];
			var attNameT = curGoods.att_name.split("|")[1];
			//console.log(attName);
			//包装
			$(".attr li").each(function(){
				//console.log($(this).text());
				if($(this).text() == attNameA){
					$(this).addClass("on").siblings().removeClass("on");
				}
			})

			//口味
			$(".taste li").each(function(){
				//console.log($(this).text());
				if($(this).text() == attNameT){
					$(this).addClass("on").siblings().removeClass("on");
				}
			})	
		}
		
		//点击包装属性选中当前并获取信息
		$(".attr li").each(function(){
			$(this).click(function(){
				$(this).addClass("on").siblings().removeClass("on");
				//获取当前得到的goods的att_name;
				var curName = $(this).text() + "|" + $(".taste li.on").text();
				//console.log(curName);
				//匹配得到的att_name 获取索引
				for(var i = 0;i<=goods.length;i++){
					if(goods[i].att_name == curName){
						goodsIndex = i;
						break;
					}
				}
				console.log(goodsIndex);
				select();
			})
		})

		//点击口味属性选中当前并获取信息
		$(".taste li").each(function(){
			$(this).click(function(){
				$(this).addClass("on").siblings().removeClass("on");
				//获取当前得到的goods的att_name;
				var curName = $(".attr li.on").text() + "|" + $(this).text();
				//console.log(curName);
				//匹配得到的att_name 获取索引
				for(var i = 0;i<=goods.length;i++){
					if(goods[i].att_name == curName){
						goodsIndex = i;
						break;
					}
				}
				console.log(goodsIndex);
				select();
			})
		})

		//点击确定弹出信息
		$("#send").click(function(){
			console.log(goods[goodsIndex]);
		})
})