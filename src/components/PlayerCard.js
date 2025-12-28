import { BaseComponent } from '../core/BaseComponent.js';
import { PlayerVisual } from './PlayerVisual.js';
import { PlayerMeta } from './PlayerMeta.js';

export class PlayerCard extends BaseComponent {
  #player;
  #assetResolver;

  constructor(player, assetResolver) {
    super('div');
    this.#player = player;
    this.#assetResolver = assetResolver;
  }

  compose() {
    const { fullName, position, nation, clubColor, clubLogo, photoSrc, isGuessed } = this.#player;
    this.element.className = 'player-card';
    this.element.style.setProperty('--accent', clubColor);
    this.element.innerHTML = '';

    const visual = new PlayerVisual(this.#assetResolver, clubLogo, photoSrc, isGuessed).render();
    const meta = new PlayerMeta(fullName, position, nation, isGuessed).render();

    this.element.append(visual, meta);
  }
}
