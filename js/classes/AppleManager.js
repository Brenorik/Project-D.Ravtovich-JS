class AppleManager {
  constructor(appleData) {
    this.apples = [];
    this.createApples(appleData);
  }

  createApples(appleData) {
    appleData.forEach((row, y) => {
      row.forEach((symbol, x) => {
        if (symbol === 5201) {
          this.apples.push(
            new Sprite({
              position: {
                x: x * 16,
                y: y * 16,
              },
              imageSrc: './img/Apple.png',
              frameRate: 17,
              scale: 0.5,
            })
          );
        }
      });
    });
  }

  update() {
    this.apples.forEach((apple) => {
      apple.update();
    });
  }

  draw() {
    this.apples.forEach((apple) => {
      apple.draw();
    });
  }

  checkApple(player) {
    // Обновляем хитбокс игрока перед проверкой столкновения с яблоками
    player.updateHitbox();

    for (let i = 0; i < this.apples.length; i++) {
      const apple = this.apples[i];
      // Проверяем столкновение игрока с яблоком
      if (
        player.hitbox.position.x < apple.position.x + apple.width &&
        player.hitbox.position.x + player.hitbox.width > apple.position.x &&
        player.hitbox.position.y < apple.position.y + apple.height &&
        player.hitbox.position.y + player.hitbox.height > apple.position.y
      ) {
        // Если столкновение произошло, удаляем яблоко из массива
        this.apples.splice(i, 1);
        // Вернуть true, чтобы указать, что столкновение произошло
        return true;
      }
    }
    // Если столкновение не произошло, вернуть false
    return false;
  }
}
