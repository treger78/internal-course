import { CONSTS } from "../utils/constants.js";

export class Player {
  constructor(playerIcon) {
    this.playerIcon = playerIcon;
  }

  createPlayer(position) {
    let playerPosition = position;

    if (typeof playerPosition === 'number') {
      playerPosition = document.getElementById(position);
    }

    playerPosition.style.display = 'flex';
    playerPosition.style.justifyContent = 'center';
    playerPosition.classList.add('player');

    const player = document.createElement('img');
    player.src = `${this.playerIcon}`;

    return {
      player,
      playerPosition
    };
  }

  renderPlayer(player) {
    return player.playerPosition.appendChild(player.player);
  }

  move(event) {
      const direction = event.key;

      if (direction !== CONSTS.RIGHT && direction !== CONSTS.LEFT) return;

      const playerCurrentPosition = document.getElementsByClassName('player')[0];

      const isWrongMove =
        (playerCurrentPosition === undefined) ||
        (playerCurrentPosition.id === CONSTS.RIGHT_BOARD_WALL && direction === CONSTS.RIGHT) ||
        (playerCurrentPosition.id === CONSTS.LEFT_BOARD_WALL && direction === CONSTS.LEFT);

      if (isWrongMove) return;

      let newPlayerPosition;

      if (direction === CONSTS.RIGHT) {
        newPlayerPosition = playerCurrentPosition.nextSibling;
      } else {
        newPlayerPosition = playerCurrentPosition.previousSibling;
      }

      playerCurrentPosition.firstChild.remove();
      playerCurrentPosition.classList.remove('player');

      return newPlayerPosition;
  }

  shotZombies() {
    const zombies = document.getElementsByClassName('zombie');
    const player = document.getElementsByClassName('player')[0];

    if (!player) return;

    const zombiesPositions = [];

    for (let i = 0; i < zombies.length; i += 1) {
      zombiesPositions.push(zombies[i].id);
    }

    let cellAbovePlayer = Number(player.id) + Number(CONSTS.LEFT_BOARD_WALL);

    while (cellAbovePlayer < 105) {
      if (zombiesPositions.includes(cellAbovePlayer.toString())) {
        const zombie = document.getElementById(cellAbovePlayer);

        zombie.firstChild.remove();
        zombie.classList.remove('zombie');

        return CONSTS.SCORES_POINT;
      }

      cellAbovePlayer += Number(CONSTS.LEFT_BOARD_WALL);
    }

    return CONSTS.MISS_SHOT;
  }
};
