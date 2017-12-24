//v5.0

keys={};
keys.codes={left:37,up:38,right:39,down:40,space:32,a:65,b:66,c:67,d:68,e:69,f:70,g:71,h:72,i:73,j:74,k:75,l:76,m:77,n:78,o:79,p:80,q:81,r:82,s:83,t:84,u:85,v:86,w:87,x:88,y:89,z:90};
keys.reset=function()
{
	keys.down={};
	keys.press={};
	keys.release={};
	
	for (var i in keys.codes)
	{
		keys.down[i]=false;
		keys.press[i]=false;
		keys.release[i]=false;
	}
}
keys.reset();

keys.frame=function()
{
	for (var i in keys.codes)
	{
		keys.press[i]=false;
		keys.release[i]=false;
	}
}

keys.pressedDown=function(e)
{
	for (var i in keys.codes)
	{
		if (e.keyCode==keys.codes[i])
		{
			if (!keys.down[i])
			{
				keys.down[i]=true;
				keys.press[i]=true;
			}
			
			break;
		}
	}
}
keys.pressedUp=function(e)
{
	for (var i in keys.codes)
	{
		if (e.keyCode==keys.codes[i])
		{
			keys.down[i]=false;
			keys.release[i]=true;
			
			break;
		}
	}
}

window.addEventListener("keydown",keys.pressedDown);
window.addEventListener("keyup",keys.pressedUp);
window.addEventListener("blur",keys.reset);