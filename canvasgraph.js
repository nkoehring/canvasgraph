// neat little helper
function bind(context, name){ 
  return function(){ 
    return context[name].apply(context, arguments); 
  }; 
} 

var Graph = function(canvasid, data, options) {
  for (var option in options) {
    this[option] = options[option];
  }

  this.canvas = document.getElementById(canvasid);
  if (!this.canvas.getContext) {
    this.active = false;
  } else {
    //TODO: use a safe method to get the following two values
    this.width = this.canvas.width;
    this.height = this.canvas.height;

    this.context = this.canvas.getContext('2d');
   
    this.data = data;
    this.init();
    this.draw();
  }
}

Graph.prototype = {
  canvas: null,
  context: false,
  width: 0,
  height: 0,
  background: 'black',
  foreground: 'white',
  active: true,

  init: function() {
    this.context.fillStyle = this.background;
    this.context.strokeStyle = this.foreground;
    this.context.lineWidth = 1;

    this.space = Math.round(this.width / this.data.length);
    max = parseFloat(Math.max.apply(Math, this.data));
    for (var i=0; i<this.data.length; i++ ) {
      this.data[i] = parseInt(this.data[i] * this.height / max)
    }
  },

  draw: function() {
    if (!this.context || !this.active) { return; }
    ctx = this.context;
    data = this.data;
    ctx.fillRect(0, 0, this.width, this.height);
    
    ctx.beginPath();
    ctx.moveTo(0, data[0]);
    var x = this.space; // horizontal position
    for (var i=1; i<data.length; i++) {
      ctx.lineTo(x, data[i]);
      x += this.space;
    }
    ctx.stroke();
  },
}

