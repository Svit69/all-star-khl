import { BaseComponent } from '../core/BaseComponent.js';
import { PlayerPositionLine } from './PlayerPositionLine.js';
import { PlayerNationLine } from './PlayerNationLine.js';
import { PlayerAllStarLine } from './PlayerAllStarLine.js';

export class PlayerMeta extends BaseComponent {
  #data;
  constructor(playerId, fullName, position, nation, allstarTeam, nationFlagSrc, allstarTeamLogoSrc, isGuessed, assetResolver, onHintUsed) {
    super('div');
    this.#data = { playerId, fullName, position, nation, allstarTeam, nationFlagSrc, allstarTeamLogoSrc, isGuessed, assetResolver, onHintUsed };
  }
  compose() {
    const { playerId, fullName, position, nation, allstarTeam, nationFlagSrc, allstarTeamLogoSrc, isGuessed, assetResolver, onHintUsed } = this.#data;
    this.element.className = 'player-meta';
    this.element.innerHTML = '';
    const name = document.createElement('p');
    name.className = 'player-name';
    name.textContent = isGuessed ? (fullName || 'Неизвестный игрок') : 'Угадай игрока';
    const details = document.createElement('div');
    details.className = 'player-details';
    details.append(
      new PlayerPositionLine(position, isGuessed, playerId, onHintUsed).render(),
      new PlayerNationLine(nation, nationFlagSrc, isGuessed, assetResolver, playerId, onHintUsed).render(),
      new PlayerAllStarLine(allstarTeam, allstarTeamLogoSrc, isGuessed, assetResolver, playerId, onHintUsed).render()
    );
    this.element.append(name, details);
  }
}
