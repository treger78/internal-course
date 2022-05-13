import { EventEmitter } from './utils/EventEmitter.js';
import { CONSTS } from './utils/constants.js';
import { Player } from './components/Player.js';
import { Zombie } from './components/Zombie.js';
import { Score } from './components/Score.js';

export class ZombieInvasionModel extends EventEmitter {
  constructor(playerIcon, zombieIcon) {
    super();

    this.playerIcon = playerIcon;
    this.zombieIcon = zombieIcon;

    this.player = new Player(this.playerIcon);
    this.zombie = new Zombie(this.zombieIcon);

    this.points = 0;

    this.score = this.createScore(this.points);
    this.emit('renderScore', this.score);

    this.currentInvasionSpeed = CONSTS.INITIAL_INVASION_SPEED;
  }

  createGameBoard(gameBoardClass) {
    const gameBoard = gameBoardClass.createBoard;

    this.on('renderGameBoard', gameBoardClass.renderBoard);

    return gameBoard();
  }

  createScore(points) {
    const score = new Score();

    this.on('renderScore', score.renderScore);
    this.on('updateScore', score.updateScore);

    return score.createScore(points);
  }

  createPlayer(position) {
    if (!this.events.hasOwnProperty('renderPlayer')) {
      this.on('renderPlayer', this.player.renderPlayer);
    }

    return this.player.createPlayer(position);
  }

  playerMove() {
    document.addEventListener('keydown', (event) => {
      const newPlayerPosition = this.player.move(event);

      if (!newPlayerPosition) return;

      this.emit('renderPlayer', this.createPlayer(newPlayerPosition));
    });
  }

  createZombies(zombiePositions) {
    const positions = zombiePositions || [];

    let zombiesNumber;

    if (!zombiePositions) {
      zombiesNumber =
        CONSTS.MIN_ZOMBIE_NUMBER +
        Math.floor(Math.random() * (CONSTS.MAX_ZOMBIE_NUMBER - CONSTS.MIN_ZOMBIE_NUMBER + 1));

      for (let i = 0; i < zombiesNumber; i += 1) {
        const position =
          CONSTS.MIN_ZOMBIE_INITIAL_POSITION +
          Math.floor(
            Math.random() * (CONSTS.MAX_ZOMBIE_INITIAL_POSITION - CONSTS.MIN_ZOMBIE_INITIAL_POSITION + 1)
          );

        if (!positions.includes(position)) {
          positions.push(position);
        } else {
          i -= 1;
        }
      }
    }

    zombiesNumber = positions.length;

    const zombies = [];

    const zombie = this.zombie;

    for (let i = 0; i < zombiesNumber; i += 1) {
      zombies.push(zombie.createZombie(positions[i]));
    }

    if (!this.events.hasOwnProperty('renderZombie')) {
      this.on('renderZombie', zombie.renderZombies);
    }

    return zombies;
  }

  moveZombies() {
    this.emit('renderZombie', this.createZombies(this.zombie.move()));
  }

  playerShootsZombies() {
    document.addEventListener('keyup', (event) => {
      if (event.key !== ' ') return;

      const point = this.player.shotZombies(event);
      const currentPoints = this.points;

      if (point) {
        this.points += point;

        this.emit('updateScore', this.points);
      } else if (point === 0) {
        this.moveZombies();
        this.emit('renderZombie', this.createZombies());
      }

      if (currentPoints < this.points && this.points % CONSTS.SPEED_UP === 0) {
        this.currentInvasionSpeed -= CONSTS.SPEED_UP;
      }
    });
  }
}
