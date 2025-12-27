import { BaseComponent } from '../core/BaseComponent.js';

export class PlayerVisual extends BaseComponent {
  #assetResolver;

  constructor(assetResolver) {
    super('div');
    this.#assetResolver = assetResolver;
  }

  compose() {
    this.element.className = 'player-visual';
    this.element.innerHTML = '';
    this.element.append(this.#buildBaseLayer(), this.#buildAccentLayer());
  }

  #buildBaseLayer() {
    const base = document.createElement('div');
    base.className = 'player-visual-base';
    base.setAttribute('aria-hidden', 'true');
    return base;
  }

  #buildAccentLayer() {
    const accent = document.createElement('div');
    accent.className = 'player-visual-accent';
    accent.setAttribute('aria-hidden', 'true');
    return accent;
  }
}
