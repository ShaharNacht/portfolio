function convertXMLtoJSON(xmlstring)
{
	//Temporary Function Definitions
	var replaceAll=function(string,search,replacement)
	{
		return string.split(search).join(replacement);
	}
	
	var findEnd=function(start)
	{
		var end=start;
		var depth=1;
		while (depth>0)
		{
			end++;
			var current=tokens[end];
			if (current.type=="open")
			{
				depth++;
			}
			else if (current.type=="close")
			{
				depth--;
			}
		}
		
		return end;
	}
	
	var buildTree=function(start,end)
	{
		if (typeof start == "undefined")
		{
			start=0;
		}
		if (typeof end == "undefined")
		{
			end=tokens.length;
		}
		
		var ret=[];
		for (var i=start;i<end;i++)
		{
			tokens[i].children=[];
			
			ret.push(tokens[i]);
			
			if (tokens[i].type=="open")
			{
				tokens[i].children=buildTree(i+1,tokens[i].end);
				i=tokens[i].end;
			}
		}
		
		return ret;
	}
	
	var finalTree=function(oldtree)
	{
		var ret=[];
		
		oldtree.forEach(function(i)
		{
			if (i.type=="text")
			{
				ret.push({name:"",attributes:{},text:i.data,children:[]});
			}
			else
			{
				var data=i.data;
				data=data.slice(1,data.length-1);
				if (data.endsWith("/"))
				{
					data=data.slice(0,data.length-1);
				}
				var info=data.split(" ");
				info.forEach(function(j)
				{
					if (j=="")
					{
						info.splice(info.indexOf(j),1);
					}
				});
				
				var name="";
				var attributes={};
				var text="";
				var children=[];
				
				name=info.splice(0,1)[0];
				
				info.forEach(function(j)
				{
					if (j.indexOf("=")==-1)
					{
						info[info.indexOf(j)-1]+=" "+j;
						info.splice(info.indexOf(j),1);
					}
				});
				while (info.length>0)
				{
					var current=info.splice(0,1)[0];
					current=current.split("=");
					if (current[1].startsWith("\"") || current[1].startsWith("'"))
					{
						current[1]=current[1].slice(1,current[1].length-1);
					}
					
					attributes[current[0]]=current[1];
				}
				
				if (i.children.length>0)
				{
					children=finalTree(i.children);
				}
				
				children.forEach(function(j)
				{
					if (j.name=="")
					{
						text+=" "+j.text;
						children.splice(children.indexOf(j),1);
					}
				});
				text=text.slice(1);
				
				ret.push({name:name,attributes:attributes,text:text,children:children});
			}
		});
		
		return ret;
	}
	
	//Remove Linebreaks and Tabs
	xmlstring=replaceAll(xmlstring,"\n","");
	xmlstring=replaceAll(xmlstring,"\t","");
	
	//Seperate Into Elements
	var elements=[];
	var element="";
	for (var i in xmlstring)
	{
		var character=xmlstring[i];
		
		element+=character;
		
		if (character=="<")
		{
			if (element!="<")
			{
				element=element.slice(0,element.length-1);
				elements.push(element);
				element="<";
			}
		}
		else if (character==">")
		{
			elements.push(element);
			element="";
		}
		else if (i==xmlstring.length-1)
		{
			elements.push(element);
		}
	}
	
	//Figure out Element Types
	var tokens=[];
	for (var i=0;i<elements.length;i++)
	{
		var data=elements[i];
		if (data.startsWith("</"))
		{
			var type="close";
		}
		else if (data.startsWith("<"))
		{
			var type="open";
			if (data.endsWith("/>"))
			{
				type="openclose";
			}
		}
		else
		{
			var type="text";
		}
		
		tokens.push({type:type,data:data});
	}
	
	//Prepare for Building Tree
	for (var i=0;i<tokens.length;i++)
	{
		if (tokens[i].type=="open")
		{
			tokens[i].end=findEnd(i);
		}
	}
	
	//Build Tree
	var tree=buildTree();
	
	//Convert Tree to Final Form
	var ret=finalTree(tree);
	
	//Finish and Return
	return ret;
}