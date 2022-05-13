import { EventEmitter } from './utils/EventEmitter.js';
import { GameBoard } from './components/GameBoard.js';
import { CONSTS } from './utils/constants.js';

export class ZombieInvasionView extends EventEmitter {
  constructor(model) {
    super();

    this.model = model;

    this.model.emit('renderGameBoard', this.model.createGameBoard(new GameBoard()));

    this.player = this.model.createPlayer(CONSTS.INITIAL_PLAYER_POSITION);
    this.model.emit('renderPlayer', this.player);

    this.model.playerMove();

    this.model.playerShootsZombies();
  }
}
