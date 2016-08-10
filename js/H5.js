/*内容管理对象*/
var jdata=[];
var H5=function(){
	this.id=('h5_'+Math.random()).replace('.','_');
	this.el=$('<div class="h5" id="'+this.id+'">').hide();
	this.page=[];
	$('body').append(this.el);

    /*新增一个页*/
	this.addPage=function(name,text){
		jdata.push({isPage:true,name:name,text:text});
		var page=$('<div class="h5_page section">');            //section适配fullpage方法
		if(name != undefined){
			page.addClass('h5_page_'+name);
		}
		if(text != undefined){
			page.text(text);
		}
		this.el.append(page);   //this.el指line:4定义的DOM元素
		this.page.push(page);           //便于新增component时拿到所属page
		if(typeof this.whenAddPage ==='function'){
			this.whenAddPage();
		}
		return this;
	}

    /*新增组件*/
	this.addComponent=function(name,cfg){
		jdata.push({isPage:false,name:name,cfg:cfg});
		var cfg =cfg || {};
		cfg=$.extend({                    //若无，则添加一个type
 			type:'base'
		},cfg)

		var component;                   //定义一个变量，存储组件元素
 		var page=this.page.slice(-1)[0];             //拿到所属page
 		switch(cfg.type){
 			case 'base':
 				component = new H5ComponentBase(name,cfg);
 			break;
 			case 'polyline':
 				component = new H5ComponentPolyline(name,cfg);
 			break;
 			case 'pie':
 				component = new H5ComponentPie(name,cfg);
 			break;
 			case 'bar':
 				component = new H5ComponentBar(name,cfg);
 			break;
 			case 'bar_v':
 				component = new H5ComponentBar_v(name,cfg);
 			break;
 			case 'radar':
 				component = new H5ComponentRadar(name,cfg);
 			break;
 			case 'ring':
 				component = new H5ComponentRing(name,cfg);
 			break;
 			case 'point':
 				component = new H5ComponentPoint(name,cfg);
 			break;
 			default:
 		}
        page.append(component);
		return this;
	}

	/*H5对象初始化呈现*/
	this.loader=function(firstPage){
		this.el.fullpage({                        //fullpage
			 onLeave:function(index,nextIndex,direction){
		     	$(this).find('.h5_component').trigger('onLeave');      
		     },
		     afterLoad:function(anchorLink,index){
		     	$(this).find('.h5_component').trigger('onLoad');   
		     }
		});
		this.el.show();
		if(firstPage){
			$.fn.fullpage.moveTo(firstPage);
		}
	}
	this.loader =typeof H5_loading=='function' ? H5_loading:this.loader;
	return this;


}