// конструктор для создания играков
// расширяем клас. чтобы он брал днные из Sprite
class Player extends Sprite {
  constructor({ position, collisionBlocks, platformCollisionBlocks, imageSrc, frameRate, scale = 0.5, animations }) {
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
    this.platformCollisionBlocks = platformCollisionBlocks;
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
    // по умолчанию герой смотрит на право
    this.lastDirection = 'right';

    // анимации разные нужно зациклить с помощью ключей
    for (let key in this.animations) {
      const image = new Image();
      image.src = this.animations[key].imageSrc;

      this.animations[key].image = image;
    }
  }

  // метод обновления(другого слайда)dd

  switchSprite(key) {
    if (this.image === this.animations[key].image || !this.loaded) return;

    this.currentFrame = 0;
    this.image = this.animations[key].image;
    this.frameBuffer = this.animations[key].frameBuffer;
    this.frameRate = this.animations[key].frameRate;
    // console.log(this.image);
  }

  // метод апдейт камеры
  updateCamerabox() {
    //  создаем камера бокс для камеры (можно подрегулировать)
    this.camerabox = {
      position: {
        x: this.position.x - 50,
        y: this.position.y,
      },
      width: 200,
      height: 80,
    };
  }

  // не убегай за рамки канвас=)
  checkForHorizontalCanvasCollision() {
    if (
      this.hitbox.position.x + this.hitbox.width + this.velocity.x >= 2816 ||
      this.hitbox.position.x + this.velocity.x <= 0
    ) {
      this.velocity.x = 0;
    }
  }

  // метод двежения камеры в лево
  shouldPanCameraToTheLeft({ canvas, camera }) {
    const cameraboxRightSide = this.camerabox.position.x + this.camerabox.width;
    const scaledDownCanvasWidth = canvas.width / 4;

    if (cameraboxRightSide >= 2816) return;

    if (cameraboxRightSide >= scaledDownCanvasWidth + Math.abs(camera.position.x)) {
      // console.log('камера влево');
      camera.position.x -= this.velocity.x;
    }
  }

  // метод двежения камеры в право
  shouldPanCameraToTheRight({ canvas, camera }) {
    if (this.camerabox.position.x <= 0) return;

    if (this.camerabox.position.x <= Math.abs(camera.position.x)) {
      camera.position.x -= this.velocity.x;
    }
  }

  shouldPanCameraDown({ canvas, camera }) {
    if (this.camerabox.position.y + this.velocity.y <= 0) return;

    if (this.camerabox.position.y <= Math.abs(camera.position.y)) {
      camera.position.y -= this.velocity.y;
    }
  }

  shouldPanCameraUp({ canvas, camera }) {
    if (this.camerabox.position.y + this.camerabox.height + this.velocity.y >= 576) return;

    const scaledCanvasHeight = canvas.height / 4;

    if (this.camerabox.position.y + this.camerabox.height >= Math.abs(camera.position.y) + scaledCanvasHeight) {
      camera.position.y -= this.velocity.y;
    }
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
    this.updateCamerabox();
    // создадим квадрат чтобы видить камеры
    // c.fillStyle = 'rgba(0, 0, 255, 0.2)';
    // c.fillRect(this.camerabox.position.x, this.camerabox.position.y, this.camerabox.width, this.camerabox.height);

    // // создадим квадрат чтобы видить рамки изоброжения
    // c.fillStyle = 'rgba(0, 255, 0, 0.2)';
    // c.fillRect(this.position.x, this.position.y, this.width, this.height);

    // // создадим квадрат чтобы видить ХИТБОКСА
    // c.fillStyle = 'rgba(255, 0, 0, 0.2)';
    // c.fillRect(this.hitbox.position.x, this.hitbox.position.y, this.hitbox.width, this.hitbox.height);

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

      // width: 22, правильно
      // height: 21, правильно
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

    // платформы
    for (let i = 0; i < this.platformCollisionBlocks.length; i++) {
      const platformCollisionBlocks = this.platformCollisionBlocks[i];
      // обноружение столкновения

      if (
        platformCollision({
          object1: this.hitbox,
          object2: platformCollisionBlocks,
        })
      ) {
        // console.log('проверка косания');
        if (this.velocity.y > 0) {
          this.velocity.y = 0;

          // считаем правильное размещение хитбокса
          const offset = this.hitbox.position.y - this.position.y + this.hitbox.height;

          // тормозим блок на верхней точке добовляем 0.01 для качественного сталкновения
          this.position.y = platformCollisionBlocks.position.y - offset - 0.01;
          break;
        }
      }
    }
  }
}
