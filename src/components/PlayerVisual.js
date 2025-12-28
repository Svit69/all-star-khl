import { BaseComponent } from '../core/BaseComponent.js';

export class PlayerVisual extends BaseComponent {
  #assetResolver;
  #clubLogo;
  #photoSrc;
  #isGuessed;

  constructor(assetResolver, clubLogo, photoSrc, isGuessed = false) {
    super('div');
    this.#assetResolver = assetResolver;
    this.#clubLogo = clubLogo;
    this.#photoSrc = photoSrc;
    this.#isGuessed = Boolean(isGuessed);
  }

  compose() {
    this.element.className = 'player-visual';
    this.element.classList.toggle('guessed', this.#isGuessed);
    this.element.innerHTML = '';
    this.element.append(
      this.#buildBaseLayer(),
      this.#buildAccentLayer(),
      this.#buildPlaceholderLayer(),
      this.#buildPhotoLayer(),
      this.#buildLogoLayer()
    );
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

  #buildPlaceholderLayer() {
    const placeholder = document.createElement('img');
    placeholder.className = 'player-visual-placeholder';
    placeholder.src = this.#assetResolver.buildPath('default.png');
    placeholder.alt = 'Силуэт игрока';
    placeholder.loading = 'lazy';
    return placeholder;
  }

  #buildPhotoLayer() {
    const photo = document.createElement('img');
    photo.className = 'player-visual-photo';
    photo.src = this.#assetResolver.buildPath(this.#photoSrc || 'default.png');
    photo.alt = 'Фото игрока';
    photo.loading = 'lazy';
    return photo;
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
