

var BasicDrawingMethods = {
  mouseDown: function(e, color, size) {
    this.drawInitialStroke();
    this.drawing = true;
  },

  mouseMove: function (e) {
    this.prevX = this.currX;
    this.prevY = this.currY;

    this.currX = (e.pageX - this.canvas.offsetLeft
      - this.canvas.offsetParent.offsetLeft
      - this.canvas.offsetParent.offsetParent.offsetLeft);
    this.currY = (e.pageY - this.canvas.offsetTop
      - this.canvas.offsetParent.offsetTop
      - this.canvas.offsetParent.offsetParent.offsetTop);

    if (this.drawing) {
      this.draw();
    } else {
      this.preview();
    }
  },

  mouseUp: function (e) {
    this.history.shift();
    this.history.push(this.getImageData());

    this.drawing = false;
  },

  mouseOut: function (e) {
    if(this.drawing) {
      this.history.shift();
      this.history.push(this.getImageData());
    }

    this.setToLastFrame();

    this.drawing = false;
  },

  setToLastFrame: function() {
    this.clear();
    this.putImageData(this.history[this.history.length - 1]);
  },


  setColor: function (color) {
    this.color = color;
  },

  setSize: function (size) {
    this.size = size;
  },

  undo: function () {
    this.history.unshift(null);
    this.history.pop();
    this.setToLastFrame();
  },

  preview: function () {
    this.setToLastFrame();
    this.ctx.globalAlpha = 0.4;
    this.draw();
    this.ctx.globalAlpha = 1.0;
  },

  draw: function () {
    if (this.stamping) {
      this.drawStamp();
    } else {
      this.drawStroke();
    }
  },

  drawStroke: function () {
    this.ctx.beginPath();
    this.ctx.moveTo(this.prevX, this.prevY);
    this.ctx.lineTo(this.currX, this.currY);
    this.ctx.strokeStyle = this.color;
    this.ctx.lineWidth = this.size;
    this.ctx.stroke();
    this.ctx.closePath();
  },

  drawStamp: function (transparent) {
    var img = new Image();
    img.src = this.stampImg;
    this.ctx.drawImage(img, this.currX-this.stampSize/2, this.currY-this.stampSize/2);
  },

  drawInitialStroke: function (transparent) {
    this.ctx.beginPath();
    this.ctx.moveTo(this.currX+1, this.currY+1);
    this.ctx.lineTo(this.currX, this.currY);
    this.ctx.strokeStyle = this.color;
    this.ctx.lineWidth = this.size;
    this.ctx.stroke();
    this.ctx.closePath();
  },

  toggleStamping: function() {
    this.stamping = !this.stamping;
  },

  setStamp: function(stampImg, stampSize) {
    this.stampImg = stampImg;
    this.stampSize = stampSize;
  },

  toData: function () {
    return this.canvas.toDataURL("image/png");
  },

  clear: function () {
    this.ctx.clearRect(0, 0, this.width, this.length);
  },

  loadImage: function (url) {
    var img = new Image();
    img.crossOrigin="anonymous";
    img.src = url;
    img.onload = function() {
      this.ctx.drawImage(img, 0, 0);
    }.bind(this);
  },

  getImageData: function () {
    return this.ctx.getImageData(0,0,this.width,this.length);
  },

  putImageData: function (imageData) {
    this.clear();
    this.ctx.putImageData(imageData, 0, 0);
  },

  hardReset: function () {
    this.clear();
    this.history = [this.getImageData(), this.getImageData(), this.getImageData(), this.getImageData(), this.getImageData()];
  }
};
