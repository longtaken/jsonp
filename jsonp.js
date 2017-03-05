function jsonp(opations){
	//整理参数
	opations=opations||{};
	opations.data=opations.data||{};
	opations.timeout=opations.timeout||0;
	
	//随机回调掉函数的名字
	var cbName='jsonp'+Math.random();
	cbName=cbName.replace('.','');//函数名不可含有点
	opations.data[opations.callback]=cbName;
	
	//定义回调函数
	window[opations.data[opations.callback]]=function(json){
		clearTimeout(timer);
		opations.success && opations.success(json);
		document.head.removeChild(oScript);	//清除用过的script标签
		window[opations.data[opations.callback]]=null;//释放window头上用过的属性
	};
	
	//拼URL
	var arr=[];
	for(var key in opations.data){
		arr.push(key+'='+encodeURIComponent(opations.data[key]));//参数有可能为中文
	}
	opations.url=opations.url+'?'+arr.join('&');
	//创建script
	var oScript=document.createElement('script');
	oScript.src=opations.url;
	document.head.appendChild(oScript);
	
	//设定超时	
	if(opations.timeout){
		var timer=setTimeout(function(){
			document.head.removeChild(oScript);	
			window[opations.data[opations.callback]]=function(){};
			opations.error && opations.error();	
		},opations.timeout);	
	}
}