;(function($){
	$.fn.slider = function(settings){
		var defaults = {
			iSpeed   : 10,
			delay    : 2,
			arr      : [['src1','src1'],['src2','src2'],['src2','src2'],['src2','src2']],
			iTimer   : null,
			isBtn    : true,
			isPoint  : true
		}
		var settings = $.extend(true, defaults ,settings);
		this.each(function(){
			
			var 
				delay  = settings.delay * 1000,
				arr    = settings.arr,
				iCount = arr.length,
				iWidth = settings.width,
				isPoint= settings.isPoint;
			create({
				obj : this,
				arr : arr,
				iWidth : iWidth,
				isPoint : isPoint
			});
			control({
				obj:this,
				iWidth:iWidth,
				iLeft:0,
				times:0,
				count:0,
				iCount:iCount,
				delay:delay,
				isPoint:isPoint
			});
		})
	}
	//生成dom节点
	function create({obj,arr,iWidth,isPoint}){
		
		//生成图片容器
		$('.slider').append(`<ul class="slider-list"></ul>`)
		$('.slider-list').css('width',iWidth * (arr.length + 1))
		//生成圆点容器
		if(isPoint){
			$('.slider').append(`<ul class="point"></ul>`)
		}
		
		//生成图片外套以及图片
		arr.forEach(function(v){
			$('.slider-list').append(`<li class="slider-pic"><a href="${v[0]}"><img src="${v[1]}"/></a></li>`)
			if(isPoint){
				$('.point').append(`<span></span>`)
			}
		})
		var oLastPic = $('.slider-list .slider-pic').eq(0).clone();
		$('.slider-list').append(oLastPic);
		
		if(isPoint){
			var 
				iPointWidth = 18 * arr.length + 8,
				iLeft  = (iWidth - iPointWidth) / 2;
			$('.point').css('left',iLeft);
			$('.point span').eq(0).addClass('active');
		}
	}
	//运动
	function move({obj,iWidth,iLeft,times,count,iCount,delay,isPoint}){
		//每次运动十分之一
		iLeft -= iWidth / 10;
		times += 1;
		//清除自身的延时器
		clearTimeout(obj.iTimer);
		//开启运动
		$('.slider-list').css('left',iLeft);
		//判断是否继续
		if(times === 10){
			count ++;
			if(count == iCount){
				count = 0;
			}
			if(isPoint){
				$('.point span').eq(count).addClass('active').siblings().removeClass('active');
			}
			times = 0;
			iLeft = -iWidth * count;
			$('.slider-list').css('left',iLeft);
			obj.iTimer = setTimeout(function(){
				move({obj,iWidth,iLeft,times,count,iCount,delay,isPoint});
			},delay)
		}else{
			obj.iTimer = setTimeout(function(){
				move({obj,iWidth,iLeft,times,count,iCount,delay,isPoint});
			},75)
		}
	}
	//手动运动
	function handmove({obj,iIndex,iWidth,count}){
		$('.point span').on('mouseenter',function(){
			iIndex  = $(this).index();
			iLeft = - iWidth * iIndex;
			$('.slider-list').stop(true).animate({'left':iLeft},function(){
				$('.point span').eq(iIndex).addClass('active').siblings().removeClass('active')
			})
		})
	}
	//操作
	function control({obj,iWidth,iLeft,iIndex,times,count,iCount,delay,isPoint}){
		move({obj,iWidth,iLeft,times,count,iCount,delay,isPoint});
		$('.slider .point').hover(function(){
			clearTimeout(obj.iTimer);
			handmove({obj,iIndex,iWidth});
		},function(){
			count = $('.point .active').index();
			iLeft = - iWidth * count;
			obj.iTimer = setTimeout(function(){
				move({obj,iWidth,iLeft,times,count,iCount,delay,isPoint});
			},delay)
		})
	}
}(jQuery))
