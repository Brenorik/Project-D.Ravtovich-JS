// создаем клас изоброжения
class Sprite {
  // построение спрайта
  constructor({ position, imageSrc }) {
    this.position = position;
    this.image = new Image();
    this.image.src = imageSrc;
  }

  // метод рисования
  draw() {
    if (!this.image) return;
    c.drawImage(this.image, this.position.x, this.position.y);
  }

  // метод обновления
  update() {
    this.draw();
  }
}
