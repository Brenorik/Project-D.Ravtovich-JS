// конструктор для создания играков
// расширяем клас. чтобы он брал днные из Sprite
class Player extends Sprite {
  constructor({ position, collisionBlocks, imageSrc, frameRate }) {
    // лезет в родительский класс
    super({ imageSrc, frameRate });
    this.position = position;
    // кординаты ускорение по оси [ х и у]
    this.velocity = {
      x: 0,
      y: 1,
    };
    // высота и ширина прямоугольника. которого нет
    // this.width = 25;
    // this.height = 25;
    this.collisionBlocks = collisionBlocks;

    // this.position = {
    //   x: 0,
    //   y: 0,
    // };
  }
  // // создаем игрока Скрываем метод когда начинаем ссылаться на спрайт
  // draw() {
  //   c.fillStyle = 'red';
  //   c.fillRect(this.position.x, this.position.y, this.width, this.height);
  // }
  // изменение координат методом
  update() {
    // создадим квадрат чтобы видить рамки изоброжения
    c.fillStyle = 'rgba(0, 255, 0, 0.2)';
    c.fillRect(this.position.x, this.position.y, this.width, this.height);

    // создание игрока прям тут
    this.draw();

    // добавим скорость по оси х
    this.position.x += this.velocity.x;
    // стены проверяються перед гравитацией
    this.checkForHorizontalCollisions();
    this.applyGravity();
    // проверка на сталкновение
    this.checkForVerticalCollisions();
  }

  // сталкновение стены

  checkForHorizontalCollisions() {
    for (let i = 0; i < this.collisionBlocks.length; i++) {
      const collisionBlock = this.collisionBlocks[i];
      // обноружение столкновения
      if (
        collision({
          object1: this,
          object2: collisionBlock,
        })
      ) {
        // console.log('проверка косания');
        if (this.velocity.x > 0) {
          this.velocity.x = 0;
          this.position.x = collisionBlock.position.x - this.width - 0.01;
          break;
        }
        if (this.velocity.x < 0) {
          this.velocity.x = 0;
          this.position.x = collisionBlock.position.x + collisionBlock.width + 0.01;
          break;
        }
      }
    }
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
    // for (let i = 0; i < this.collisionBlocks.lenght; i++) { БАЛБЕС
    for (let i = 0; i < this.collisionBlocks.length; i++) {
      const collisionBlock = this.collisionBlocks[i];
      // обноружение столкновения

      if (
        collision({
          object1: this,
          object2: collisionBlock,
        })
      ) {
        // console.log('проверка косания');
        if (this.velocity.y > 0) {
          this.velocity.y = 0;
          // тормозим блок на верхней точке добовляем 0.01 для качественного сталкновения
          this.position.y = collisionBlock.position.y - this.height - 0.01;
          break;
        }
        // а это для верха
        if (this.velocity.y < 0) {
          this.velocity.y = 0;
          this.position.y = collisionBlock.position.y + collisionBlock.height + 0.01;
          break;
        }
      }
    }
  }
}
