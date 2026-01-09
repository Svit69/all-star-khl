import { BaseComponent } from '../core/BaseComponent.js';
import { PlayerPositionLine } from './PlayerPositionLine.js';
import { PlayerNationLine } from './PlayerNationLine.js';
import { PlayerAllStarLine } from './PlayerAllStarLine.js';

export class PlayerMeta extends BaseComponent {
  #data;
  constructor(fullName, position, nation, allstarTeam, nationFlagSrc, allstarTeamLogoSrc, isGuessed, assetResolver) {
    super('div');
    this.#data = { fullName, position, nation, allstarTeam, nationFlagSrc, allstarTeamLogoSrc, isGuessed, assetResolver };
  }
  compose() {
    const { fullName, position, nation, allstarTeam, nationFlagSrc, allstarTeamLogoSrc, isGuessed, assetResolver } = this.#data;
    this.element.className = 'player-meta';
    this.element.innerHTML = '';
    const name = document.createElement('p');
    name.className = 'player-name';
    name.textContent = isGuessed ? (fullName || 'Неизвестный игрок') : 'Угадай игрока';
    const details = document.createElement('div');
    details.className = 'player-details';
    details.append(
      new PlayerPositionLine(position, isGuessed).render(),
      new PlayerNationLine(nation, nationFlagSrc, isGuessed, assetResolver).render(),
      new PlayerAllStarLine(allstarTeam, allstarTeamLogoSrc, isGuessed, assetResolver).render()
    );
    this.element.append(name, details);
  }
}
