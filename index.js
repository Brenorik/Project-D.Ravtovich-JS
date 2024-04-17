const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');
// console.log(c);

// Размеры поля canvas
canvas.width = 1024;
canvas.height = 576;

// нужно опустить изоброжение
const scaledCanvas = {
  width: canvas.width / 4,
  height: canvas.height / 4,
};

const gravity = 0.5;

// рисуем прямоугольник (цвет. размеры)
// c.fillStyle = 'white';
// c.fillRect(10, 10, 50, 50);

// рисуем поле на размер canvas
// c.fillStyle = 'white';
// c.fillRect(0, 0, canvas.width, canvas.height);

// рисуем красный квадрат для опытов
// c.fillStyle = 'red';
// c.fillRect(200, 100, 100, 100);

// создаем клас изоброжения
class Sprite {
  // построение спрайта
  constructor({ position, imageSrc }) {
    this.position = position;
    this.image = new Image();
    this.image.src = imageSrc;
  }

  // метод рисования
  draw() {
    if (!this.image) return;
    c.drawImage(this.image, this.position.x, this.position.y);
  }

  // метод обновления
  update() {
    this.draw();
  }
}

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

const player = new Player({
  x: 0,
  y: 0,
});

// создаем еременную для изменяющтхся координат квадрата
let y = 100;
let y2 = 100;

// создаем ключи упровления

const keys = {
  KeyD: {
    pressed: false,
  },
  KeyA: {
    pressed: false,
  },
  Space: {
    pressed: false,
  },
};

// Добавим фон
const background = new Sprite({
  position: {
    x: 0,
    y: 0,
  },
  imageSrc: './img/background.png',
});

// создаем функции анимации
function animate() {
  window.requestAnimationFrame(animate);

  // console.log('Go');
  // добовляем поле на canvas чтобы при каждом тики обновлять поле канвас
  c.fillStyle = 'white';
  c.fillRect(0, 0, canvas.width, canvas.height);

  // нужно массштабировать только бэк граун
  c.save();

  // увеличиваем масштаб бэкграунда
  c.scale(4, 4);
  // опускаем камеру
  c.translate(0, -background.image.height + scaledCanvas.height);

  // рисуем фон до создания игроков
  background.update();
  // нужно массштабировать только бэк граун (продолжение)
  c.restore();

  // запуск игрока
  // player.draw();
  player.update();
  // пихаем квадрат для анимации
  // c.fillStyle = 'red';
  // c.fillRect(200, y, 100, 100);
  // // y++;

  // добовляем второго игрока к  примеру
  // c.fillStyle = 'red';
  // c.fillRect(400, y, 100, 100);
  // // y2++;

  // перемещение на кнопку (можем скорость поставить)
  player.velocity.x = 0;
  if (keys.KeyD.pressed) player.velocity.x = 5;
  else if (keys.KeyA.pressed) player.velocity.x = -5;
}

animate();

// это я добавиль чтобы отжать клавишу
let isJumping = false;
// нажатие клавиш
window.addEventListener('keydown', (event) => {
  // смотрим ключи клавиш

  switch (event.code) {
    // нужно проработать вопрос с переключением языка
    case 'KeyD':
      // console.log('на право');
      // player.velocity.x = 1;

      keys.KeyD.pressed = true;
      break;
    case 'KeyA':
      // player.velocity.x = -1;
      keys.KeyA.pressed = true;
      break;
    case 'Space':
    case 'KeyW':
      if (!isJumping) {
        player.velocity.y = -20;
        isJumping = true;
      }
      break;
  }
});

// при отжатии клавиш
window.addEventListener('keyup', (event) => {
  // смотрим ключи клавиш

  switch (event.code) {
    case 'KeyD':
      keys.KeyD.pressed = false;
      break;
    case 'KeyA':
      keys.KeyA.pressed = false;
      break;
    case 'Space':
    case 'KeyW':
      if (isJumping) {
        isJumping = false;
      }
      break;
  }
});
