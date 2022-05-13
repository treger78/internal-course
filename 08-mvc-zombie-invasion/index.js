import { ZombieInvasionModel } from './src/scripts/ZombieInvasionModel.js';
import { ZombieInvasionView } from './src/scripts/ZombieInvasionView.js';
import { ZombieInvasionController } from './src/scripts/ZombieInvasionController.js';

const playerIcon = './src/assets/images/playerIcon.png';
const zombieIcon = './src/assets/images/zombieIcon.png';

window.addEventListener('load', () => {
  const zombieInvasionModel = new ZombieInvasionModel(playerIcon, zombieIcon);
  const zombieInvasionView = new ZombieInvasionView(zombieInvasionModel);
  const zombieInvasionController = new ZombieInvasionController(zombieInvasionModel, zombieInvasionView);
});
