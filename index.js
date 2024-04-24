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
        new CollisionBlock({
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

const platformCollisionBlocks = [];
// определились с точками столкновения теперь их нужно извлечь (  каждую строку! - row)
//  (y -ссылка на наш индекс . где находиться припядствие)
platform2D.forEach((row, y) => {
  row.forEach((symbol, x) => {
    // console.log(symbol);
    if (symbol === 3666) {
      // мы нашли эти блоки теперь нужно написать что делаем с ними
      // console.log('блоки тута');

      // вот столкновение создаем
      platformCollisionBlocks.push(
        new CollisionBlock({
          position: {
            x: x * 16,
            y: y * 16,
          },
          height: 11,
        })
      );
    }
  });
});

// шипы

// Столкновение с полом
const thorns2D = [];
// перебераем наш масив в 2д. мы знаем что ширина нашей карты 176 плиток
for (let i = 0; i < thorns.length; i += 176) {
  // создаем под масив  и вырезаем нужные блоки (каждый ряд и+1 и и+176)
  thorns2D.push(thorns.slice(i, i + 176));
}
// console.log(Thorns2D);

// тут будут столкновения
const thornsBlocks = [];
// определились с точками столкновения теперь их нужно извлечь (  каждую строку! - row)
//  (y -ссылка на наш индекс . где находиться припядствие)
thorns2D.forEach((row, y) => {
  row.forEach((symbol, x) => {
    // console.log(symbol);
    if (symbol === 453) {
      // мы нашли эти блоки теперь нужно написать что делаем с ними
      // console.log('блоки тута');

      // вот столкновение создаем
      thornsBlocks.push(
        new CollisionBlock({
          position: {
            x: x * 16,
            y: y * 16,
          },
        })
      );
    }
  });
});
// console.log(thornsBlocks);

const gravity = 0.1;

// начальная точко появления игрока
const player = new Player({
  position: {
    x: 30,
    y: 450,
  },

  collisionBlocks: collisionBlocks,
  platformCollisionBlocks: platformCollisionBlocks,
  thornsBlocks: thornsBlocks,

  // вставляем картинку игрока
  imageSrc: './img/Martial Hero 3/Sprite/Idle.png',
  frameRate: 10,
  // создаем различные анимации
  animations: {
    Idle: {
      imageSrc: './img/Martial Hero 3/Sprite/Idle.png',
      frameRate: 10,
      frameBuffer: 3,
    },
    Run: {
      imageSrc: './img/Martial Hero 3/Sprite/Run.png',
      frameRate: 8,
      frameBuffer: 4,
    },
    GoingUp: {
      imageSrc: './img/Martial Hero 3/Sprite/Going Up.png',
      frameRate: 3,
      frameBuffer: 4,
    },
    GoingDown: {
      imageSrc: './img/Martial Hero 3/Sprite/Going Down.png',
      frameRate: 3,
      frameBuffer: 4,
    },
    LeftIdle: {
      imageSrc: './img/Martial Hero 3/Sprite/Left_Idle.png',
      frameRate: 10,
      frameBuffer: 3,
    },
    LeftRun: {
      imageSrc: './img/Martial Hero 3/Sprite/Left_Run.png',
      frameRate: 8,
      frameBuffer: 4,
    },
    LeftGoingUp: {
      imageSrc: './img/Martial Hero 3/Sprite/Left_Going Up.png',
      frameRate: 3,
      frameBuffer: 4,
    },
    LeftGoingDown: {
      imageSrc: './img/Martial Hero 3/Sprite/Left_Going Down.png',
      frameRate: 3,
      frameBuffer: 4,
    },
    Death: {
      imageSrc: './img/Martial Hero 3/Sprite/Death.png',
      frameRate: 11,
      frameBuffer: 6,
    },
  },
});

const gameUI = new GameUI();

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

const backgroundImageHeight = 576;

const camera = {
  position: {
    x: 0,
    y: -backgroundImageHeight + scaledCanvas.height,
  },
};

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
  c.translate(camera.position.x, camera.position.y);

  // рисуем фон до создания игроков
  background.update();

  // выделение платформ
  // вывод сталкновения
  collisionBlocks.forEach((collisionBlock) => {
    collisionBlock.update();
  });
  //  сталкновение платформы
  platformCollisionBlocks.forEach((block) => {
    block.update();
  });

  // проверка на рамки канвас
  player.checkForHorizontalCanvasCollision();

  // запуск игрока
  // player.draw();
  player.update();

  // перемещение на кнопку (можем скорость поставить)
  player.velocity.x = 0;
  if (!player.deathAnimationPlayed) {
    // Добавляем проверку здесь
    if (keys.KeyD.pressed) {
      // метод переключения спрайта
      player.switchSprite('Run');
      player.velocity.x = 2;
      player.lastDirection = 'right';
      // камера
      player.shouldPanCameraToTheLeft({ canvas, camera });
    } else if (keys.KeyA.pressed) {
      player.switchSprite('LeftRun');
      player.velocity.x = -2;
      player.lastDirection = 'Left';
      // камера на лево
      player.shouldPanCameraToTheRight({ canvas, camera });
    } else if (player.velocity.y === 0) {
      if (player.lastDirection === 'right') player.switchSprite('Idle');
      else player.switchSprite('LeftIdle');
    }
  }

  // прыжок
  if (player.velocity.y < 0) {
    player.shouldPanCameraDown({ canvas, camera });
    if (player.lastDirection === 'right') player.switchSprite('GoingUp');
    else player.switchSprite('LeftGoingUp');
  } else if (player.velocity.y > 0) {
    player.shouldPanCameraUp({ canvas, camera });
    if (player.lastDirection === 'right') player.switchSprite('GoingDown');
    else player.switchSprite('LeftGoingDown');
  }
  // нужно массштабировать только бэк граун (продолжение)
  c.restore();
}

animate();

// это я добавиль чтобы отжать клавишу
let isJumping = false;
// Нажатие клавиш
// При нажатии клавиш
window.addEventListener('keydown', (event) => {
  // Проверяем, проигрывается ли анимация смерти

  switch (event.code) {
    case 'KeyD':
      keys.KeyD.pressed = true;
      break;
    case 'KeyA':
      keys.KeyA.pressed = true;
      break;
    case 'Space':
    case 'KeyW':
      // Вызываем метод прыжка у игрока
      player.jump();
      break;
  }
});

// При отжатии клавиш
window.addEventListener('keyup', (event) => {
  // Проверяем, проигрывается ли анимация смерти

  switch (event.code) {
    case 'KeyD':
      keys.KeyD.pressed = false;
      break;
    case 'KeyA':
      keys.KeyA.pressed = false;
      break;
    case 'Space':
    case 'KeyW':
      // Проверяем, был ли прыжок и необходимо ли прекратить его
      if (isJumping) {
        isJumping = false;
      }
      break;
  }
});
