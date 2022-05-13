import { CONSTS } from '../utils/constants.js';
export class Zombie {
  constructor(zombieIcon) {
    this.zombieIcon = zombieIcon;
  }

  createZombie(positionID) {
    const zombiePosition = document.getElementById(positionID);
    zombiePosition.style.display = 'flex';
    zombiePosition.style.justifyContent = 'center';
    zombiePosition.classList.add('zombie');

    const zombie = document.createElement('img');
    zombie.src = `${this.zombieIcon}`;

    return {
      zombie,
      zombiePosition
    };
  }

  renderZombies(zombies) {
    for (let i = 0; i < zombies.length; i += 1) {
      zombies[i].zombiePosition.appendChild(zombies[i].zombie);
    }
  }

  move() {
    const zombies = document.getElementsByClassName('zombie');

    let zombiesNewPositions = [];

    // т. к. массив zombies является динамическим, его размер изменяется автоматически
    // при удалении класса 'zombie' у html-элемента,
    // поэтому в качестве условия цикла используется размер массива,
    // а в качестве zombie всегда используется первый (нулевой) элемент массива,
    // т. к. прошлый элемент автоматически удаляется при удалении класса 'zombie' у html-элемента.
    while (zombies.length !== 0) {
      const zombie = zombies[0];

      zombiesNewPositions.push(zombie.id - CONSTS.BOARD_WIDTH);

      zombie.firstChild.remove();
      zombie.classList.remove('zombie');
    }

    return zombiesNewPositions;
  }
};
