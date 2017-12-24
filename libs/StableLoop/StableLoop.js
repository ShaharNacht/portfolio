//v1.1
/*

Usage (code example):

let loop = new StableLoop( 60, 10, false );
loop.update = function()
{
	//game logic
}
loop.draw = function()
{
	//game rendering
}
loop.start();

*/

class StableLoop
{
	constructor( desiredFps, maxFrameSkips, autoStart )
	{
		this.desiredFps = (typeof(desiredFps)!="undefined")? desiredFps : 60;
		this.maxFrameSkips = (typeof(maxFrameSkips)!="undefined")? maxFrameSkips : 10;
		autoStart = (typeof(autoStart)!="undefined")? autoStart : true;
		
		this.started = false;
		this.requestId = 0;
		this.previous = 0;
		this.remainder = 0;
		this.fps = 0;
		this._fpsCounter = 0;
		this.intervalId = 0;
		this.delta = 0;
		
		if (autoStart)
		{
			this.start();
		}
	}
	
	update() {} //define this yourself
	draw() {} //define this yourself
	
	step(t)
	{
		if (!this.started)
		{
			this.previous = t;
			this.started = true;
		}
		
		this.delta = t - this.previous;
		
		this.remainder += t - this.previous;
		this.previous = t;
		
		let updateCount = 0;
		while ( this.remainder >= 1000 / this.desiredFps )
		{
			this.update();
			this.remainder -= 1000 / this.desiredFps;
			
			updateCount++;
			if ( updateCount >= this.maxFrameSkips )
			{
				this.remainder = 0;
				break;
			}
		}
		
		if (updateCount)
		{
			this.draw();
			
			this._fpsCounter++;
		}
		
		this.requestId = requestAnimationFrame( this.step.bind(this) );
	}
	
	everySecond()
	{
		this.fps = this._fpsCounter;
		this._fpsCounter = 0;
	}
	
	start()
	{
		if (!this.started)
		{
			this.requestId = requestAnimationFrame( this.step.bind(this) );
			this.intervalId = setInterval( this.everySecond.bind(this), 1000);
		}
	}
	
	stop()
	{
		if (this.started)
		{
			this.started = false;
			cancelAnimationFrame(this.requestId);
			this.requestId = 0;
			clearInterval(this.intervalId);
			this.intervalId = 0;
		}
	}
}