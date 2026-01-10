import { BaseComponent } from '../core/BaseComponent.js';
import { PlayerVisual } from './PlayerVisual.js';
import { PlayerMeta } from './PlayerMeta.js';

export class PlayerCard extends BaseComponent {
  #player;
  #assetResolver;
  #onHintUsed;

  constructor(player, assetResolver, onHintUsed = null) {
    super('div');
    this.#player = player;
    this.#assetResolver = assetResolver;
    this.#onHintUsed = onHintUsed;
  }

  compose() {
    const { khlPlayerId, fullName, position, nation, allstarTeam, nationFlagSrc, allstarTeamLogoSrc, clubColor, clubLogo, photoSrc, isGuessed, defaultVisualSrc } = this.#player;
    this.element.className = 'player-card';
    this.element.style.setProperty('--accent', clubColor);
    this.element.innerHTML = '';

    const visual = new PlayerVisual(this.#assetResolver, clubLogo, photoSrc, isGuessed, defaultVisualSrc).render();
    const meta = new PlayerMeta(
      khlPlayerId,
      fullName,
      position,
      nation,
      allstarTeam,
      nationFlagSrc,
      allstarTeamLogoSrc,
      isGuessed,
      this.#assetResolver,
      this.#onHintUsed
    ).render();

    this.element.append(visual, meta);
  }
}
