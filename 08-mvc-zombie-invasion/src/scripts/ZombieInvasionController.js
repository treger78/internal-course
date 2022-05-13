import { CONSTS } from "./utils/constants.js";

export class ZombieInvasionController {
  constructor(model, view) {
    this.model = model;
    this.view = view;

    this.lastInvasionSpeed = this.model.currentInvasionSpeed;

    this.zombieInvasion = this.startZombieInvasion();

    this.gameOver = this.checkGameOver();
  }

  startZombieInvasion() {
    const invasion = setInterval(() => {
      const currentInvasionSpeed = this.model.currentInvasionSpeed;

      if (this.lastInvasionSpeed > currentInvasionSpeed) {
        clearInterval(this.zombieInvasion);
        clearInterval(invasion);
        clearInterval(this.gameOver);

        this.zombieInvasion = this.startZombieInvasion();
        this.gameOver = this.checkGameOver();

        this.lastInvasionSpeed = currentInvasionSpeed;
      }

      this.model.moveZombies();
      this.model.emit('renderZombie', this.model.createZombies());
    }, this.model.currentInvasionSpeed);

    return invasion;
  }

  checkGameOver() {
    const check = setInterval(() => {
      const zombies = document.getElementsByClassName('zombie');

      for (let i = 0; i < zombies.length; i += 1) {
        const isGameOver =
          Number(zombies[i].id) >= Number(CONSTS.RIGHT_BOARD_WALL) &&
          Number(zombies[i].id) <= Number(CONSTS.LEFT_BOARD_WALL);

        if (isGameOver) {
          clearInterval(this.zombieInvasion);
          clearInterval(check);

          const player = document.getElementsByClassName('player')[0];

          player.firstChild.remove();
          player.classList.remove('player');

          return alert('Game over!');
        }
      }
    }, this.model.currentInvasionSpeed);
  }
}
