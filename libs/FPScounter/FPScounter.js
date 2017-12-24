//FPScounter.js v1.0
//A JavaScript plugin that counts the performance of a page in frames per second.
//Made by Shahar Nacht

FPS=function()
{
	return FPS.fps;
}

FPS.fps=0;
FPS.frames=0;

FPS.element=document.createElement("span");
FPS.element.style.position="absolute";
FPS.element.style.left=8;
FPS.element.style.top=8;
FPS.element.style.fontFamily="arial";
FPS.element.style.fontSize=18;
FPS.element.style.color="yellow";
FPS.element.style.textShadow="-1px -1px 0 #000,1px -1px 0 #000,-1px 1px 0 #000,1px 1px 0 #000";
FPS.addElement=function()
{
	document.body.appendChild(FPS.element);
}
FPS.removeElement=function()
{
	document.body.removeChild(FPS.element);
}

FPS.anim=function()
{
	requestAnimationFrame(FPS.anim);
	FPS.frames++;
}
requestAnimationFrame(FPS.anim);

FPS.second=function()
{
	FPS.fps=FPS.frames;
	FPS.frames=0;
	
	FPS.element.innerHTML=FPS.fps;
}
setInterval(FPS.second,1000);