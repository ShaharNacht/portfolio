Object.prototype.clone=function()
{
	var temp={};
	for (var i in this)
	{
		if (typeof this[i]=="object")
		{
			temp[i]=this[i].clone();
		}
		else
		{
			temp[i]=this[i];
		}
	}
	return temp;
}