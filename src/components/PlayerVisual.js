import { BaseComponent } from '../core/BaseComponent.js';

export class PlayerVisual extends BaseComponent {
  #assetResolver;
  #clubLogo;
  #photoSrc;
  #isGuessed;
  #defaultVisualSrc;

  constructor(assetResolver, clubLogo, photoSrc, isGuessed = false, defaultVisualSrc = 'default.png') {
    super('div');
    this.#assetResolver = assetResolver;
    this.#clubLogo = clubLogo;
    this.#photoSrc = photoSrc;
    this.#isGuessed = Boolean(isGuessed);
    this.#defaultVisualSrc = defaultVisualSrc;
  }

  compose() {
    this.element.className = 'player-visual';
    this.element.classList.toggle('guessed', this.#isGuessed);
    this.element.innerHTML = '';
    this.element.append(
      this.#buildDefaultLayer(),
      this.#buildPhotoLayer(),
      this.#buildLogoLayer()
    );
  }

  #buildDefaultLayer() {
    const base = document.createElement('img');
    base.className = 'player-visual-default';
    base.src = this.#assetResolver.buildPath(this.#defaultVisualSrc || 'default.png');
    base.alt = 'Карточка клуба';
    base.loading = 'lazy';
    return base;
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
