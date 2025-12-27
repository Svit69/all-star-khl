import { BaseComponent } from '../core/BaseComponent.js';

export class PlayerVisual extends BaseComponent {
  #assetResolver;
  #clubLogo;

  constructor(assetResolver, clubLogo) {
    super('div');
    this.#assetResolver = assetResolver;
    this.#clubLogo = clubLogo;
  }

  compose() {
    this.element.className = 'player-visual';
    this.element.innerHTML = '';
    this.element.append(this.#buildBaseLayer(), this.#buildAccentLayer(), this.#buildLogoLayer());
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

  #buildLogoLayer() {
    const logo = document.createElement('img');
    logo.className = 'player-visual-logo';
    logo.src = this.#assetResolver.buildPath(this.#clubLogo);
    logo.alt = 'Логотип клуба на карточке';
    logo.loading = 'lazy';
    return logo;
  }
}
