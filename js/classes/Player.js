// конструктор для создания играков
// расширяем клас. чтобы он брал днные из Sprite
class Player extends Sprite {
  constructor({
    position,
    collisionBlocks,
    platformCollisionBlocks,
    thornsBlocks,
    imageSrc,
    frameRate,
    scale = 0.5,
    animations,
  }) {
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
    this.thornsBlocks = thornsBlocks;
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

    // Добавим флаг для отслеживания прыжка
    this.isJumping = false;

    // анимации разные нужно зациклить с помощью ключей
    for (let key in this.animations) {
      const image = new Image();
      image.src = this.animations[key].imageSrc;

      this.animations[key].image = image;
    }
    this.deathAnimationPlayed = false;
    this.isAttacking = false;
  }

  // Метод для атаки
  attack() {
    if (!this.isAttacking) {
      // Проверяем, не проигрывается ли уже атака
      this.isAttacking = true; // Устанавливаем переменную состояния атаки
      if (this.lastDirection === 'right') this.switchSprite('Attack3Right');
      else this.switchSprite('Attack3Left');

      // Проверяем столкновение с врагами при атаке
      for (let i = 0; i < enemies.length; i++) {
        const enemy = enemies[i];
        if (
          collision({
            object1: {
              // Позиция и размеры спрайта персонажа
              position: {
                x: this.position.x,
                y: this.position.y + 20,
              },
              width: this.width + 3,
              height: 21,
            },
            object2: enemy.hitbox,
          })
        ) {
          // Обнаружено столкновение с врагом
          console.log('Столкновение при атаке!');
          // Уничтожаем врага
          enemy.destroy();
        }
      }
    }
  }
  // Метод для завершения атаки
  finishAttack() {
    this.isAttacking = false; // Сбрасываем переменную состояния атаки
  }

  checkForEnemyCollisions(enemies) {
    for (let i = 0; i < enemies.length; i++) {
      const enemy = enemies[i];
      if (
        collision({
          object1: this.hitbox,
          object2: enemy.hitbox,
        })
      ) {
        // Обнаружено столкновение с врагом
        // console.log('Столкновение с вражеским хитбоксом!');
        this.resetGame();
        // Здесь вызовите метод уничтожения врага, например:
      }
    }
  }

  // Метод для выполнения прыжка
  jump() {
    if (!this.isJumping) {
      // Проверяем, не прыгает ли персонаж уже
      this.velocity.y = -4; // Устанавливаем начальную вертикальную скорость вверх
      this.isJumping = true; // Указываем, что персонаж начал прыжок
    }
  }

  // метод обновления(другого слайда)dd

  switchSprite(key) {
    if (
      (this.image === this.animations.Attack3Left.image &&
        this.currentFrame < this.animations.Attack3Left.frameRate - 1) ||
      (this.image === this.animations.Attack3Right.image &&
        this.currentFrame < this.animations.Attack3Right.frameRate - 1)
    )
      return;
    if (this.image === this.animations.Death.image) {
      if (this.currentFrame === this.animations.Death.frameRate - 1) {
        this.deathAnimationPlayed = true; // Устанавливаем флаг, указывающий, что анимация смерти была воспроизведена
        gameUI.showGameOverModal(); // Показываем модальное окно при смерти персонажа; // Вызываем метод resetGame() после завершения анимации смерти
      }
      return;
    }
    if (this.image === this.animations[key].image || !this.loaded) return;

    this.currentFrame = 0;
    this.image = this.animations[key].image;
    this.frameBuffer = this.animations[key].frameBuffer;
    this.frameRate = this.animations[key].frameRate;
  }

  // Метод для сброса игры
  resetGame() {
    // Сброс позиции и скорости игрока
    this.position = { x: 30, y: 450 };
    this.velocity = { x: 0, y: 1 };
    // Сброс флага проигрывания анимации смерти
    this.deathAnimationPlayed = false;
    // Сброс позиции камеры
    camera.position = { x: 0, y: -backgroundImageHeight + scaledCanvas.height };
    // Очистка текущего изображения
    this.image = null;

    // Очистка массива яблок
    appleManager.apples = [];

    // Пересоздаем яблоки
    appleManager.createApples(apple2D);

    // Пересоздаем всех врагов
    for (let i = 0; i < enemies.length; i++) {
      const enemy = enemies[i];
      enemy.position = { x: enemy.startX, y: enemy.position.y }; // Возвращаем врага на начальную позицию
      enemy.direction = 1; // Устанавливаем начальное направление движения
      enemy.setImageSrc(enemy.imageSrcRight); // Устанавливаем изображение врага в правильное направление
    }
  }

  // метод апдейт камеры
  updateCamerabox() {
    //  создаем камера бокс для камеры (можно подрегулировать)
    this.camerabox = {
      position: {
        x: this.position.x - 70,
        y: this.position.y - 25,
      },
      width: 220,
      height: 100,
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

  // изменение координат методом
  update() {
    // нам нужно анимация персонажа обновляем фрейм
    this.updateFrames();

    this.updateHitbox();
    this.updateCamerabox();

    if (this.deathAnimationPlayed) {
      return;
    }
    // создадим квадрат чтобы видить камеры
    // c.fillStyle = 'rgba(0, 0, 255, 0.2)';
    // c.fillRect(this.camerabox.position.x, this.camerabox.position.y, this.camerabox.width, this.camerabox.height);
    // создадим квадрат чтобы видить удао
    c.fillStyle = 'rgba(0, 0, 255, 0.2)';
    c.fillRect(this.position.x, this.position.y + 20, this.width + 3, 21);
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

    this.checkForEnemyCollisions(enemies);

    // Если персонаж касается земли, сбрасываем флаг прыжка
    if (this.isOnGround()) {
      this.isJumping = false;
    }

    // Проверка на падение за нижнюю рамку канваса
    if (this.position.y > canvas.height) {
      // Вызов метода resetGame() при падении за нижнюю рамку канваса
      gameUI.showGameOverModal();
      return; // Прерываем выполнение метода, чтобы избежать дальнейших операций
    }
  }

  isOnGround() {
    for (let i = 0; i < this.collisionBlocks.length; i++) {
      const collisionBlock = this.collisionBlocks[i];
      if (
        collision({
          object1: this.hitbox,
          object2: collisionBlock,
        })
      ) {
        return true; // Если есть столкновение с блоком, значит персонаж на земле
      }
    }
    return false; // В противном случае персонаж не на земле
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

          this.position.x = collisionBlock.position.x + collisionBlock.width - offset + 0.01;
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
      const platformCollisionBlock = this.platformCollisionBlocks[i];
      // обноружение столкновения

      if (
        platformCollision({
          object1: this.hitbox,
          object2: platformCollisionBlock,
        })
      ) {
        // console.log('проверка косания');
        if (this.velocity.y > 0) {
          this.velocity.y = 0;
          this.isJumping = false; // Сбросить флаг прыжка
          // считаем правильное размещение хитбокса
          const offset = this.hitbox.position.y - this.position.y + this.hitbox.height;

          // тормозим блок на верхней точке добовляем 0.01 для качественного сталкновения
          this.position.y = platformCollisionBlock.position.y - offset - 0.01;
          break;
        }
      }
    }

    for (let i = 0; i < this.thornsBlocks.length; i++) {
      const thornsBlock = this.thornsBlocks[i];
      // обнаружение столкновения со шпиками
      if (
        collision({
          object1: this.hitbox,
          object2: thornsBlock,
        })
      ) {
        this.switchSprite('Death'); // Проигрываем анимацию смерти
        if (this.velocity.y > 0) {
          this.velocity.y = 0;

          // считаем правильное размещение хитбокса
          const offset = this.hitbox.position.y - this.position.y + this.hitbox.height;

          // тормозим блок на верхней точке добовляем 0.01 для качественного сталкновения
          this.position.y = thornsBlock.position.y - offset - 0.01;
          break;
        }
      }
    }
  }
}
