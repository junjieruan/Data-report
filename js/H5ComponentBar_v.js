/* 垂直柱图组件对象 */

var H5ComponentBar_v = function(name, cfg){
    var component = new H5ComponentBar(name, cfg);//基于水平柱图来改变
    var width = (100/cfg.data.length) >> 0;
    component.find('.line').width(width+'%');//设定20%宽度

    $.each(component.find('.rate'), function(){
        var w = $(this).css('width');
        $(this).height(w).width('');//宽变高
    });

    $.each(component.find('.per'), function(){
        $(this).appendTo($(this).prev());/*将per添加到rate中，方便使用绝对定位（因为变为竖直模式了
        无法使用左右浮动）*/
    });

    return component;
}