const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');
// console.log(c);

// Размеры поля canvas
canvas.width = 1024;
canvas.height = 576;
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
// создаем функции анимации
function animate() {
  window.requestAnimationFrame(animate);

  // console.log('Go');
  // добовляем поле на canvas чтобы при каждом тики обновлять поле канвас
  c.fillStyle = 'white';
  c.fillRect(0, 0, canvas.width, canvas.height);

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
}

animate();
