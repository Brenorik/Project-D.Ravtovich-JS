// Клас изоброжения
class Sprite {
  // построение спрайта
  constructor({ position, imageSrc, frameRate = 1, frameBuffer = 3, scale = 1 }) {
    this.position = position;
    // настраиваем изоброжение спрайта игрока сами размеры
    this.scale = scale;
    // намнужно удостовериться что слайд загружен
    this.loaded = false;

    this.image = new Image();

    // Загружаем наш спрайт персонажа (нужно время)
    this.image.onload = () => {
      this.width = (this.image.width / this.frameRate) * this.scale;
      this.height = this.image.height * this.scale;
      this.loaded = true;
    };

    this.image.src = imageSrc;
    this.frameRate = frameRate;
    // Это первый кадр где мы находимся
    this.currentFrame = 0;
    // буфер кадров для снижения скорости анимации персонажа
    this.frameBuffer = frameBuffer;
    // прошедчие кадры
    this.elapsedFrame = 0;
    this.dead = false;
  }

  // метод рисования
  draw() {
    if (!this.image) return;
    // обрезаем спрайт персонажа
    const cropbox = {
      position: {
        x: this.currentFrame * (this.image.width / this.frameRate),
        y: 0,
      },
      width: this.image.width / this.frameRate,
      height: this.image.height,
    };
    c.drawImage(
      this.image,
      // cropbox это коробки анимации персонажа
      cropbox.position.x,
      cropbox.position.y,
      cropbox.width,
      cropbox.height,
      this.position.x,
      this.position.y,
      this.width,
      this.height
    );
  }

  // метод обновления
  update() {
    this.draw();
    this.updateFrames();
  }

  // метод обновления кадра
  updateFrames() {
    this.elapsedFrame++;
    if (this.elapsedFrame % this.frameBuffer === 0) {
      if (this.currentFrame < this.frameRate - 1) {
        this.currentFrame++;
      } else {
        this.currentFrame = 0;
      }
    }
  }
}
