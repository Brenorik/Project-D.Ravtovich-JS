// конструктор для создания играков
class Player {
  constructor(position) {
    this.position = position;
    // кординаты ускорение по оси [ х и у]
    this.velocity = {
      x: 0,
      y: 1,
    };
    this.height = 100;

    // this.position = {
    //   x: 0,
    //   y: 0,
    // };
  }
  // создаем игрока
  draw() {
    c.fillStyle = 'red';
    c.fillRect(this.position.x, this.position.y, 100, this.height);
  }
  // изменение координат методом
  update() {
    // создание игрока прям тут
    this.draw();

    // добавим скорость по оси х
    this.position.x += this.velocity.x;

    // добавим сюда скорость при падении
    this.position.y += this.velocity.y;
    // добовляем логику стоп при дохождении до края
    if (this.position.y + this.height + this.velocity.y < canvas.height) this.velocity.y += gravity;
    else this.velocity.y = 0;
  }
}
