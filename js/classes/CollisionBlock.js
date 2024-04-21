// создаем клас столкновений
class CollisionBlock {
  // построение спрайта
  constructor({ position, width = 16, height = 16 }) {
    this.position = position;
    // создаем размер плиток касания
    this.width = width;
    this.height = height;
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
