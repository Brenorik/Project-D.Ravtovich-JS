class Enemy extends Sprite {
  constructor({ x, y, imageSrcRight, imageSrcLeft, frameRate, frameBuffer, scale = 0.5, targetX, speed }) {
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

    this.position.x += this.speed * this.direction;

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
});
