class paintView {
  constructor() {
    this.bindDrawSquare();
    this.bindDrawCircle();
    this.bindDrawTriangle();
    this.bindDrawFree();
    this.bindClearCanvas();
    this.bindDrawText();
    this.bindDrawTextGradient();
    this.bindPreviewImage();
    this.bindDrawImage();
    this.bindExport();
  }

  dom = {
    canvas: document.getElementById('canvas'),
    square: document.getElementById('square'),
    circle: document.getElementById('circle'),
    triangle: document.getElementById('triangle'),
    free: document.getElementById('free'),
    clear: document.getElementById('clear'),
    color: document.getElementById('fillColor'),
    text: document.getElementById('text'),
    textInput: document.getElementById('textInput'),
    gradient: document.getElementById('gradient'),
    image: document.getElementById('image'),
    imageInput: document.getElementById('imageInput'),
    imagePreview: document.getElementById('imagePreview'),
    export: document.getElementById('export')
  };

  bindCanvas = handler => {
    this.optionSelected = handler;
    this.dom.canvas.addEventListener('click', handler);
  };

  unbindCanvas = () => {
    this.removeEventListenerDrawFree();
    this.dom.canvas.removeEventListener('click', this.optionSelected);
  };

  getMousePosition(event) {
    const rect = this.dom.canvas.getBoundingClientRect();
    return {
      x: event.clientX - rect.left,
      y: event.clientY - rect.top
    };
  }

  GetFirstPosition = event => {
    this.isDrawing = true;
    [this.lastX, this.lastY] = [event.offsetX, event.offsetY];
  };

  DrawFree = event => {
    const ctx = this.dom.canvas.getContext('2d');
    ctx.lineCap = 'round';
    ctx.lineWidth = 20;
    ctx.strokeStyle = this.dom.color.value;
    if (!this.isDrawing) return;
    ctx.beginPath();
    ctx.moveTo(this.lastX, this.lastY);
    ctx.lineTo(event.offsetX, event.offsetY);
    ctx.stroke();
    [this.lastX, this.lastY] = [event.offsetX, event.offsetY];
  };

  bindDrawFree = () => {
    this.dom.free.addEventListener('click', () => {
      this.unbindCanvas();
      this.bindCanvas(this.addEventListenersDrawFree);
    });
  };

  DrawingFalse = () => (this.isDrawing = false);

  addEventListenersDrawFree = () => {
    this.dom.canvas.addEventListener('mousedown', this.GetFirstPosition);
    this.dom.canvas.addEventListener('mousemove', this.DrawFree);
    this.dom.canvas.addEventListener('mouseup', this.DrawingFalse);
    this.dom.canvas.addEventListener('mouseout', this.DrawingFalse);
  };

  removeEventListenerDrawFree = () => {
    this.dom.canvas.removeEventListener('mousedown', this.GetFirstPosition);
    this.dom.canvas.removeEventListener('mousemove', this.DrawFree);
    this.dom.canvas.removeEventListener('mouseup', this.DrawingFalse);
    this.dom.canvas.removeEventListener('mouseout', this.DrawingFalse);
  };

  drawSquare = event => {
    const positions = this.getMousePosition(event);
    const ctx = this.dom.canvas.getContext('2d');
    ctx.beginPath();
    ctx.lineWidth = 2;
    ctx.strokeStyle = 'black';
    ctx.fillStyle = this.dom.color.value;
    ctx.rect(positions.x, positions.y, 50, 50);
    ctx.fill();
    ctx.stroke();
  };

  bindDrawSquare() {
    this.dom.square.addEventListener('click', () => {
      this.unbindCanvas();
      this.bindCanvas(this.drawSquare);
    });
  }

  drawCircle = event => {
    const positions = this.getMousePosition(event);
    const ctx = this.dom.canvas.getContext('2d');
    ctx.beginPath();
    ctx.fillStyle = this.dom.color.value;
    ctx.arc(positions.x, positions.y, 50, 0, 2 * Math.PI);
    ctx.fill();
    ctx.stroke();
  };

  bindDrawCircle() {
    this.dom.circle.addEventListener('click', () => {
      this.unbindCanvas();
      this.bindCanvas(this.drawCircle);
    });
  }

  drawTriangle = event => {
    const positions = this.getMousePosition(event);
    const ctx = this.dom.canvas.getContext('2d');
    ctx.beginPath();
    ctx.fillStyle = this.dom.color.value;
    ctx.moveTo(positions.x, positions.y);
    ctx.lineTo(positions.x, positions.y - 50);
    ctx.lineTo(positions.x - 50, positions.y);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
  };

  bindDrawTriangle() {
    this.dom.triangle.addEventListener('click', () => {
      this.unbindCanvas();
      this.bindCanvas(this.drawTriangle);
    });
  }

  drawText = event => {
    const positions = this.getMousePosition(event);
    const ctx = this.dom.canvas.getContext('2d');
    const text = this.dom.textInput.value;
    ctx.beginPath();
    ctx.fillStyle = this.dom.color.value;
    ctx.font = '30px Verdana';
    ctx.fillText(text, positions.x, positions.y);
    ctx.stroke();
  };

  bindDrawText() {
    this.dom.text.addEventListener('click', () => {
      this.unbindCanvas();
      this.bindCanvas(this.drawText);
    });
  }

  drawTextGradient = event => {
    const positions = this.getMousePosition(event);
    const ctx = this.dom.canvas.getContext('2d');
    const text = this.dom.textInput.value;
    ctx.beginPath();
    const gradient = ctx.createLinearGradient(0, 0, this.dom.canvas.width, 0);
    gradient.addColorStop('0', this.dom.color.value);
    gradient.addColorStop('0.5', 'yellow');
    gradient.addColorStop('1.0', 'red');
    ctx.font = '30px Verdana';
    ctx.fillStyle = gradient;
    ctx.fillText(text, positions.x, positions.y);
    ctx.stroke();
  };

  bindDrawTextGradient() {
    this.dom.gradient.addEventListener('click', () => {
      this.unbindCanvas();
      this.bindCanvas(this.drawTextGradient);
    });
  }

  bindPreviewImage() {
    this.dom.imageInput.addEventListener('change', () => {
      this.unbindCanvas();
      const preview = this.dom.imagePreview;
      const file = this.dom.imageInput.files[0];
      const reader = new FileReader();
      reader.onloadend = function() {
        preview.src = reader.result;
      };
      file ? reader.readAsDataURL(file) : (preview.src = '');
    });
  }

  drawImage = event => {
    const positions = this.getMousePosition(event);
    const ctx = this.dom.canvas.getContext('2d');
    const image = this.dom.imagePreview;
    ctx.beginPath();
    ctx.drawImage(image, positions.x, positions.y, image.width, image.height);
    ctx.stroke();
  };

  bindDrawImage() {
    this.dom.image.addEventListener('click', () => {
      this.unbindCanvas();
      this.bindCanvas(this.drawImage);
    });
  }

  bindExport() {
    this.dom.export.addEventListener('click', () => {
      this.unbindCanvas();
      const image = this.dom.canvas
        .toDataURL('image/png')
        .replace('image/png', 'image/octet-stream');
      this.dom.export.setAttribute('href', image);
    });
  }

  bindClearCanvas() {
    this.dom.clear.addEventListener('click', () => {
      this.unbindCanvas();
      const ctx = this.dom.canvas.getContext('2d');
      ctx.clearRect(0, 0, this.dom.canvas.width, this.dom.canvas.height);
    });
  }
}
