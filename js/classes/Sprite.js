// создаем клас изоброжения
class Sprite {
  // построение спрайта
  constructor({ position, imageSrc, frameRate = 1 }) {
    this.position = position;
    this.image = new Image();

    // Загружаем наш спрайт персонажа (нужно время)
    this.image.onload = () => {
      this.width = this.image.width / this.frameRate;
      this.height = this.image.height;
    };

    this.image.src = imageSrc;
    this.frameRate = frameRate;
  }

  // метод рисования
  draw() {
    if (!this.image) return;
    // обрезаем спрайт персонажа
    const cropbox = {
      position: {
        x: 0,
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
  }
}
