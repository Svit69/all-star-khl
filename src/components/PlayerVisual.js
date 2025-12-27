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
    this.element.append(this.#buildAccentLayer(), this.#buildShapeImage());
  }

  #buildAccentLayer() {
    const accent = document.createElement('div');
    accent.className = 'player-visual-accent';
    accent.setAttribute('aria-hidden', 'true');
    return accent;
  }

  #buildShapeImage() {
    const shape = document.createElement('img');
    shape.className = 'player-visual-shape';
    shape.src = this.#assetResolver.buildPath('Polygon 1.svg');
    shape.alt = 'Силуэт карточки игрока';
    shape.setAttribute('aria-hidden', 'false');
    return shape;
  }
}
