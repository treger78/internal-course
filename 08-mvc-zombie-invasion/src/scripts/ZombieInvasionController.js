import { CONSTS } from "./utils/constants.js";

export class ZombieInvasionController {
  constructor(model, view) {
    this.model = model;
    this.view = view;

    this.lastInvasionSpeed = this.model.currentInvasionSpeed;

    this.zombieInvasion = this.startZombieInvasion();

    this.isGameOver = false;
  }

  startZombieInvasion() {
    const invasion = setInterval(() => {
      const currentInvasionSpeed = this.model.currentInvasionSpeed;

      if (this.lastInvasionSpeed > currentInvasionSpeed) {
        clearInterval(this.zombieInvasion);
        clearInterval(invasion);

        this.zombieInvasion = this.startZombieInvasion();

        this.lastInvasionSpeed = currentInvasionSpeed;
      }

      this.checkGameOver();

      if (this.isGameOver) return;

      this.model.moveZombies();
      this.model.emit('renderZombie', this.model.createZombies());
    }, this.model.currentInvasionSpeed);

    return invasion;
  }

  checkGameOver() {
    const zombies = document.getElementsByClassName('zombie');

    for (let i = 0; i < zombies.length; i += 1) {
      this.isGameOver =
        Number(zombies[i].id) >= Number(CONSTS.RIGHT_BOARD_WALL) &&
        Number(zombies[i].id) <= Number(CONSTS.LEFT_BOARD_WALL);

      if (this.isGameOver) {
        clearInterval(this.zombieInvasion);

        const player = document.getElementsByClassName('player')[0];

        player.firstChild.remove();
        player.classList.remove('player');

        return alert('Game over!');
      }
    }
  }
}
