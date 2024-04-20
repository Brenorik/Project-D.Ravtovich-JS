// конструктор для создания играков
// расширяем клас. чтобы он брал днные из Sprite
class Player extends Sprite {
  constructor({ position, collisionBlocks, imageSrc, frameRate, scale = 0.5, animations }) {
    // лезет в родительский класс
    super({ imageSrc, frameRate, scale });
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

    // нужно обрезать хитбокс чтобы был только персонаж
    this.hitbox = {
      // цифрами коректируем чтоб обвелся наш спрайт
      position: {
        x: this.position.x,
        y: this.position.y,
      },
      width: 10,
      height: 10,
    };

    // разные анимации
    this.animations = animations;

    // анимации разные нужно зациклить с помощью ключей
    for (let key in this.animations) {
      const image = new Image();
      image.src = this.animations[key].imageSrc;

      this.animations[key].image = image;
    }

    // this.position = {
    //   x: 0,
    //   y: 0,
    // };
  }

  // метод обновления(другого слайда)dd

  switchSprite(key) {
    if (this.image === this.animations[key] || !this.loaded) return;
    this.image = this.animations[key].image;
    this.frameBuffer = this.animations[key].frameBuffer;
    this.frameRate = this.animations[key].frameRate;
  }

  // // создаем игрока Скрываем метод когда начинаем ссылаться на спрайт
  // draw() {
  //   c.fillStyle = 'red';
  //   c.fillRect(this.position.x, this.position.y, this.width, this.height);
  // }
  // изменение координат методом
  update() {
    // нам нужно анимация персонажа обновляем фрейм
    this.updateFrames();

    this.updateHitbox();

    // создадим квадрат чтобы видить рамки изоброжения
    c.fillStyle = 'rgba(0, 255, 0, 0.2)';
    c.fillRect(this.position.x, this.position.y, this.width, this.height);

    // создадим квадрат чтобы видить ХИТБОКСА
    c.fillStyle = 'rgba(255, 0, 0, 0.2)';
    c.fillRect(this.hitbox.position.x, this.hitbox.position.y, this.hitbox.width, this.hitbox.height);

    // создание игрока прям тут
    this.draw();

    // добавим скорость по оси х
    this.position.x += this.velocity.x;
    this.updateHitbox();
    // стены проверяються перед гравитацией
    this.checkForHorizontalCollisions();
    this.applyGravity();
    this.updateHitbox();
    // проверка на сталкновение
    this.checkForVerticalCollisions();
  }

  // метод для хитбокса персонажа
  updateHitbox() {
    // нужно обрезать хитбокс чтобы был только персонаж
    this.hitbox = {
      // цифрами коректируем чтоб обвелся наш спрайт
      position: {
        x: this.position.x + 23,
        y: this.position.y + 20,
      },
      width: 22,
      height: 21,
    };
  }

  // сталкновение стены
  checkForHorizontalCollisions() {
    for (let i = 0; i < this.collisionBlocks.length; i++) {
      const collisionBlock = this.collisionBlocks[i];
      // обноружение столкновения
      if (
        collision({
          object1: this.hitbox,
          object2: collisionBlock,
        })
      ) {
        // console.log('проверка косания');
        if (this.velocity.x > 0) {
          this.velocity.x = 0;
          const offset = this.hitbox.position.x - this.position.x + this.hitbox.width;
          this.position.x = collisionBlock.position.x - offset - 0.01;
          break;
        }
        if (this.velocity.x < 0) {
          this.velocity.x = 0;
          const offset = this.hitbox.position.x - this.position.x;

          this.position.x = collisionBlock.position.x - offset + 0.01;
          break;
        }
      }
    }
  }

  // метод гравитации
  applyGravity() {
    // // добовляем логику стоп при дохождении до края (добавили блоки скрываем)
    // if (this.position.y + this.height + this.velocity.y < canvas.height) this.velocity.y += gravity;
    // else this.velocity.y = 0;
    this.velocity.y += gravity;
    // добавим сюда скорость при паденииdd
    this.position.y += this.velocity.y;
  }
  // метод проверки сталкновение под воздействием гравитации
  checkForVerticalCollisions() {
    // for (let i = 0; i < this.collisionBlocks.lenght; i++) { БАЛБЕС
    for (let i = 0; i < this.collisionBlocks.length; i++) {
      const collisionBlock = this.collisionBlocks[i];
      // обноружение столкновения

      if (
        collision({
          object1: this.hitbox,
          object2: collisionBlock,
        })
      ) {
        // console.log('проверка косания');
        if (this.velocity.y > 0) {
          this.velocity.y = 0;

          // считаем правильное размещение хитбокса
          const offset = this.hitbox.position.y - this.position.y + this.hitbox.height;

          // тормозим блок на верхней точке добовляем 0.01 для качественного сталкновения
          this.position.y = collisionBlock.position.y - offset - 0.01;
          break;
        }
        // а это для верха
        if (this.velocity.y < 0) {
          this.velocity.y = 0;
          const offset = this.hitbox.position.y - this.position.y;
          this.position.y = collisionBlock.position.y + collisionBlock.height - offset + 0.01;
          break;
        }
      }
    }
  }
}
