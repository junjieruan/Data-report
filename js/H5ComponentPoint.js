/*散点图表组件对象*/
var H5ComponentPoint=function(name,cfg){
	var component=new H5ComponentBase(name,cfg);
	
	var base=cfg.data[0][1];             //以第一个数据的比例为大小的100%

     //输出每个point
	$.each(cfg.data,function(idx,item){       //each循环数组项
        var point=$('<div class="point point_'+idx+'">');

        var name = $('<div class="name">'+item[0]+'</div>');
        var rate = $('<div class="per">'+(item[1]*100)+'%</div>');

        name.append(rate);
        point.append(name);
 
        var per=(item[1]/base*100)+"%";      //item[1]指data中数据项第二个参数的项目数值，求占base的百分比
        point.width(per).height(per);        //大小缩放

        if(item[2]){                         //背景颜色
        	point.css("backgroundColor",item[2]);
        }
        if (item[3] != undefined && item[4] != undefined){      //散点相对位置
        	point.css("left",item[3]).css("top",item[4]);
        }
        component.append(point);
	})                     

	return component;
}