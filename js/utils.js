// функция столкновения персонажа
// обноружение столкновения
// нижгяя позиция + высота блока
// меняем  this на  object1, а collisions на  object2
function collision({ object1, object2 }) {
  return (
    object1.position.y + object1.height >= object2.position.y &&
    object1.position.y <= object2.position.y + object2.height &&
    // стены
    object1.position.x <= object2.position.x + object2.width &&
    object1.position.x + object1.width >= object2.position.x
  );
}
