//v2.1

assets=[];
assets.loaded=[];
assets.urls={};
assets.init=function(){};

if (typeof THREE!="undefined")
{
	assets.JSONLoader=new THREE.JSONLoader();
	assets.textureLoader=new THREE.TextureLoader();
}

assets.add=function(url,type,callback)
{
	assets.loaded.push(false);
	var index=assets.loaded.length-1;
	assets.urls[url]=index;
	
	if (typeof callback=="undefined")
	{
		callback=function(){};
	}
	
	if (type=="image")
	{
		var item=new Image();
		item.src=url;
		item.onload=function()
		{
			assets[index]=item;
			assets.loaded[index]=true;
			callback(item);
			assets.finished();
		}
	}
	if (type=="audio")
	{
		var item=new Audio();
		item.src=url;
		item.oncanplaythrough=function()
		{
			assets[index]=item;
			assets.loaded[index]=true;
			callback(item);
			assets.finished();
		}
	}
	if (type=="json")
	{
		assets.JSONLoader.load(url,function(geometry,materials)
		{
			var item={geometry:geometry,materials:materials};
			assets[index]=item;
			assets.loaded[index]=true;
			callback(item);
			assets.finished();
		});
	}
	if (type=="texture")
	{
		var item=assets.textureLoader.load(url,function()
		{
			assets[index]=item;
			assets.loaded[index]=true;
			callback(item);
			assets.finished();
		});
	}
}
assets.start=function(callback)
{
	assets.init=callback;
}
assets.finished=function()
{
	if (assets.loaded.indexOf(false)==-1)
	{
		assets.init();
	}
}
assets.get=function(url)
{
	return assets[assets.urls[url]];
}