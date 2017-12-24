function collide(obj1,obj2,moveX1,moveY1,moveX2,moveY2)
{
	var x1=obj1.x;
	var y1=obj1.y;
	var x2=obj2.x;
	var y2=obj2.y;
	var w1=obj1.width;
	var h1=obj1.height;
	var w2=obj2.width;
	var h2=obj2.height;
	
	if (typeof obj1.xOffset!="undefined")
	{
		x1-=obj1.xOffset;
	}
	if (typeof obj1.yOffset!="undefined")
	{
		y1-=obj1.yOffset;
	}
	if (typeof obj2.xOffset!="undefined")
	{
		x2-=obj2.xOffset;
	}
	if (typeof obj2.yOffset!="undefined")
	{
		y2-=obj2.yOffset;
	}
	
	if (typeof moveX1!="undefined")
	{
		x1+=moveX1;
	}
	if (typeof moveY1!="undefined")
	{
		y1+=moveY1;
	}
	if (typeof moveX2!="undefined")
	{
		x2+=moveX2;
	}
	if (typeof moveY2!="undefined")
	{
		y2+=moveY2;
	}
	
	return ((x2+w2)>x1 && x2<(x1+w1) && (y2+h2)>y1 && y2<(y1+h1));
}