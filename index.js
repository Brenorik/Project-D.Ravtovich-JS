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

// Столкновение с полом
const floor2D = [];
// перебераем наш масив в 2д. мы знаем что ширина нашей карты 176 плиток
for (let i = 0; i < floor.length; i += 176) {
  // создаем под масив  и вырезаем нужные блоки (каждый ряд и+1 и и+176)
  floor2D.push(floor.slice(i, i + 176));
}
// console.log(floor2D);

// тут будут столкновения
const collisionBlocks = [];
// определились с точками столкновения теперь их нужно извлечь (  каждую строку! - row)
//  (y -ссылка на наш индекс . где находиться припядствие)
floor2D.forEach((row, y) => {
  row.forEach((symbol, x) => {
    // console.log(symbol);
    if (symbol === 3773) {
      // мы нашли эти блоки теперь нужно написать что делаем с ними
      // console.log('блоки тута');

      // вот столкновение создаем
      collisionBlocks.push(
        new CollisionsBlock({
          position: {
            x: x * 16,
            y: y * 16,
          },
        })
      );
    }
  });
});
// console.log(collisionBlocks);

// Столкновение с gkjoflrfvb
const platform2D = [];
for (let i = 0; i < platformCollisions.length; i += 176) {
  platform2D.push(platformCollisions.slice(i, i + 176));
}
// console.log(platform2D);

const platformCollisionsBlocks = [];
// определились с точками столкновения теперь их нужно извлечь (  каждую строку! - row)
//  (y -ссылка на наш индекс . где находиться припядствие)
platform2D.forEach((row, y) => {
  row.forEach((symbol, x) => {
    // console.log(symbol);
    if (symbol === 3666) {
      // мы нашли эти блоки теперь нужно написать что делаем с ними
      // console.log('блоки тута');

      // вот столкновение создаем
      platformCollisionsBlocks.push(
        new CollisionsBlock({
          position: {
            x: x * 16,
            y: y * 16,
          },
        })
      );
    }
  });
});

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

// начальная точко появления игрока
const player = new Player({
  position: {
    x: 110,
    y: 0,
  },

  collisionBlocks: collisionBlocks,
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
  // вывод сталкновения
  collisionBlocks.forEach((collisionBlock) => {
    collisionBlock.update();
  });
  //  сталкновение платформы
  platformCollisionsBlocks.forEach((block) => {
    block.update();
  });

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
