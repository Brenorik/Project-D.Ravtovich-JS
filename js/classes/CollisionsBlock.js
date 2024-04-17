// создаем клас столкновений
class CollisionsBlock {
  // построение спрайта
  constructor({ position }) {
    this.position = position;
    // создаем размер плиток касания
    this.width = 16;
    this.height = 16;
  }

  // метод рисования
  draw() {
    // светим блоки столкновения
    c.fillStyle = 'rgba(255, 0, 0, 0.5)';
    c.fillRect(this.position.x, this.position.y, this.width, this.height);
  }

  // метод обновления
  update() {
    this.draw();
  }
}
