class Enemy extends Sprite {
  constructor({
    x,
    y,
    imageSrcRight,
    imageSrcLeft,
    frameRate,
    frameBuffer,
    scale = 0.5,
    targetX,
    speed,
    hitboxWidth,
    hitboxHeight,
  }) {
    super({
      position: { x, y },
      imageSrc: imageSrcRight,
      frameRate,
      frameBuffer,
      scale,
    });

    this.targetX = targetX;
    this.speed = speed;
    this.direction = 1;
    this.imageSrcRight = imageSrcRight;
    this.imageSrcLeft = imageSrcLeft;
    this.startX = x; // Начальная позиция врага
    this.hitbox = {
      position: { x: this.position.x, y: this.position.y },
      width: hitboxWidth,
      height: hitboxHeight,
    };
  }

  setImageSrc(src) {
    this.imageSrc = src;
    this.image.onload = () => {
      this.width = (this.image.width / this.frameRate) * this.scale;
      this.height = this.image.height * this.scale;
      this.loaded = true;
    };
    this.image.src = src;
  }

  update() {
    super.update();
    // создадим квадрат чтобы видить рамки изоброжения
    c.fillStyle = 'rgba(0, 255, 0, 0.2)';
    c.fillRect(this.position.x, this.position.y, this.width, this.height);
    // создадим квадрат чтобы видить ХИТБОКСА
    c.fillStyle = 'rgba(255, 0, 0, 0.2)';
    c.fillRect(this.hitbox.position.x, this.hitbox.position.y, this.hitbox.width, this.hitbox.height);

    this.position.x += this.speed * this.direction;

    // Центрируем хитбокс относительно позиции персонажа
    const hitboxX = this.position.x + (this.width - this.hitbox.width) / 2;
    const hitboxY = this.position.y + (this.height - this.hitbox.height) / 2;

    // Обновляем позицию хитбокса
    this.hitbox.position.x = hitboxX;
    this.hitbox.position.y = hitboxY;

    // Проверяем, достиг ли враг точки, чтобы изменить направление
    if (
      (this.direction === 1 && this.position.x >= this.targetX) ||
      (this.direction === -1 && this.position.x <= this.startX)
    ) {
      this.direction *= -1;
      if (this.direction === 1) {
        this.setImageSrc(this.imageSrcRight);
      } else {
        this.setImageSrc(this.imageSrcLeft);
      }
    }
  }
  destroy() {
    // Убрать врага из игры, например:
    this.position.x = -3000; // Переместить врага за пределы экрана
  }
}

// Создаем экземпляр врага с использованием нового класса Enemy
const enemyBeeOne = new Enemy({
  x: 144,
  y: 448,
  imageSrcRight: './img/Small Bee/Fly/FlyRight.png',
  imageSrcLeft: './img/Small Bee/Fly/FlyLeft.png',
  frameRate: 4,
  frameBuffer: 4,
  scale: 0.5,
  targetX: 352,
  speed: 1,
  hitboxWidth: 20, // Ширина хитбокса
  hitboxHeight: 20, // Высота хитбокса
});

const enemyBeeTwo = new Enemy({
  x: 1008,
  y: 96,
  imageSrcRight: './img/Small Bee/Fly/FlyRight.png',
  imageSrcLeft: './img/Small Bee/Fly/FlyLeft.png',
  frameRate: 4,
  frameBuffer: 4,
  scale: 0.5,
  targetX: 1152,
  speed: 1,
  hitboxWidth: 20,
  hitboxHeight: 20,
});

const enemyBeeThree = new Enemy({
  x: 2304,
  y: 336,
  imageSrcRight: './img/Small Bee/Fly/FlyRight.png',
  imageSrcLeft: './img/Small Bee/Fly/FlyLeft.png',
  frameRate: 4,
  frameBuffer: 4,
  scale: 0.5,
  targetX: 2448,
  speed: 1,
  hitboxWidth: 20,
  hitboxHeight: 20,
});

const enemyBoarOne = new Enemy({
  x: 1232,
  y: 496,
  imageSrcRight: './img/Boar/Run/RunBlackRight.png',
  imageSrcLeft: './img/Boar/Run/RunBlackLeft.png',
  frameRate: 6,
  frameBuffer: 4,
  scale: 1,
  targetX: 1360,
  speed: 0.8,
  hitboxWidth: 25,
  hitboxHeight: 25,
});

const enemyBoarTwo = new Enemy({
  x: 800,
  y: 320,
  imageSrcRight: './img/Boar/Run/RunSheetRight.png',
  imageSrcLeft: './img/Boar/Run/RunSheetLeft.png',
  frameRate: 6,
  frameBuffer: 4,
  scale: 1,
  targetX: 1072,
  speed: 0.8,
  hitboxWidth: 25,
  hitboxHeight: 25,
});

const enemyFlyingEye = new Enemy({
  x: 864,
  y: 368,
  imageSrcRight: './img/Flyingeye/FlightRight.png',
  imageSrcLeft: './img/Flyingeye/FlightLeft.png',
  frameRate: 8,
  frameBuffer: 4,
  scale: 1,
  targetX: 1120,
  speed: 0.8,
  hitboxWidth: 25,
  hitboxHeight: 25,
});

const enemyGoblin = new Enemy({
  x: 976,
  y: 458,
  imageSrcRight: './img/Goblin/RunRight.png',
  imageSrcLeft: './img/Goblin/LeftRun.png',
  frameRate: 8,
  frameBuffer: 4,
  scale: 0.7,
  targetX: 1200,
  speed: 0.8,
  hitboxWidth: 25,
  hitboxHeight: 25,
});

const enemySnail = new Enemy({
  x: 1616,
  y: 208,
  imageSrcRight: './img/Snail/RightSheet.png',
  imageSrcLeft: './img/Snail/LeftSheet.png',
  frameRate: 8,
  frameBuffer: 4,
  scale: 0.5,
  targetX: 1824,
  speed: 0.2,
  hitboxWidth: 20,
  hitboxHeight: 20,
});

const enemies = [
  enemyBeeOne,
  enemyBeeTwo,
  enemyBeeThree,
  enemyBoarOne,
  enemyBoarTwo,
  enemyFlyingEye,
  enemyGoblin,
  enemySnail,
];
