class Enemy extends Sprite {
  constructor({ x, y, imageSrcRight, imageSrcLeft, frameRate, frameBuffer, scale = 0.5, targetX, speed }) {
    // Вызываем конструктор родительского класса Sprite
    super({
      position: { x, y },
      imageSrc: imageSrcRight, // Устанавливаем начальное изображение вправо
      frameRate,
      frameBuffer,
      scale,
    });

    // Дополнительные свойства для управления врагом
    this.targetX = targetX;
    this.speed = speed;
    this.direction = 1; // Направление движения (1 - вправо, -1 - влево)
    this.imageSrcRight = imageSrcRight; // Путь к изображению вправо
    this.imageSrcLeft = imageSrcLeft; // Путь к изображению влево
  }

  // Метод для установки нового пути к изображению
  setImageSrc(src) {
    this.imageSrc = src; // Обновляем путь к изображению
    // Загружаем новое изображение
    this.image.onload = () => {
      // При загрузке изображения обновляем его размеры
      this.width = (this.image.width / this.frameRate) * this.scale;
      this.height = this.image.height * this.scale;
      this.loaded = true;
    };
    this.image.src = src; // Устанавливаем путь к изображению для загрузки
  }

  // Метод для обновления состояния врага
  update() {
    // Вызываем метод update родительского класса Sprite
    super.update();

    // Двигаем врага вправо или влево в зависимости от текущего направления
    this.position.x += this.speed * this.direction;

    // Если враг достигает границы, меняем направление и изображение
    if (this.position.x >= this.targetX || this.position.x <= this.targetX - 100) {
      this.direction *= -1; // Изменяем направление движения
      // Меняем изображение в зависимости от направления
      if (this.direction === 1) {
        this.setImageSrc(this.imageSrcRight); // Изменяем на изображение вправо
      } else {
        this.setImageSrc(this.imageSrcLeft); // Изменяем на изображение влево
      }
    }
  }
}

// Создаем экземпляр врага с использованием нового класса Enemy
const enemyBee = new Enemy({
  x: 30,
  y: 450,
  imageSrcRight: './img/Small Bee/Fly/FlyRight.png', // Путь к изображению вправо
  imageSrcLeft: './img/Small Bee/Fly/FlyLeft.png', // Путь к изображению влево
  frameRate: 4,
  frameBuffer: 4,
  scale: 0.5,
  targetX: 100, // Целевая координата X, к которой враг будет двигаться
  speed: 1, // Скорость движения врага
});
