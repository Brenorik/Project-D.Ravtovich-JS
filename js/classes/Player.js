// конструктор для создания играков
class Player {
  constructor({ position, collisionBlocks }) {
    this.position = position;
    // кординаты ускорение по оси [ х и у]
    this.velocity = {
      x: 0,
      y: 1,
    };
    this.width = 100;
    this.height = 100;
    this.collisionBlocks = collisionBlocks;

    // this.position = {
    //   x: 0,
    //   y: 0,
    // };
  }
  // создаем игрока
  draw() {
    c.fillStyle = 'red';
    c.fillRect(this.position.x, this.position.y, this.width, this.height);
  }
  // изменение координат методом
  update() {
    // создание игрока прям тут
    this.draw();

    // добавим скорость по оси х
    this.position.x += this.velocity.x;
    this.applyGravity();
    // проверка на сталкновение
    this.checkForVerticalCollisions();
  }

  // метод гравитации
  applyGravity() {
    // добавим сюда скорость при падении
    this.position.y += this.velocity.y;
    // // добовляем логику стоп при дохождении до края (добавили блоки скрываем)
    // if (this.position.y + this.height + this.velocity.y < canvas.height) this.velocity.y += gravity;
    // else this.velocity.y = 0;
    this.velocity.y += gravity;
  }
  // метод проверки сталкновение под воздействием гравитации
  checkForVerticalCollisions() {
    for (let i = 0; i < this.collisionBlocks.lenght; i++) {
      const collisionBlock = this.collisionBlocks[i];
      // обноружение столкновения

      if (
        collision({
          object1: this,
          object2: collisionBlock,
        })
      ) {
        console.log('fdgdgdfgdg');
        // if (this.velocity.y > 0) {
        //   this.velocity.y = 0;
        // }
      }
    }
  }
}
