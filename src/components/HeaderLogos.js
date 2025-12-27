import { BaseComponent } from '../core/BaseComponent.js';

export class HeaderLogos extends BaseComponent {
  #leftLogoSrc;
  #rightLogoSrc;

  constructor(leftLogoSrc, rightLogoSrc) {
    super('div');
    this.#leftLogoSrc = leftLogoSrc;
    this.#rightLogoSrc = rightLogoSrc;
  }

  compose() {
    this.element.className = 'header-logos';
    this.element.innerHTML = '';
    const leftLogo = this.#createLogo(this.#leftLogoSrc, 'Логотип левого партнёра');
    const divider = document.createElement('span');
    divider.className = 'logo-divider';
    divider.textContent = 'x';
    const rightLogo = this.#createLogo(this.#rightLogoSrc, 'Логотип КХЛ');
    this.element.append(leftLogo, divider, rightLogo);
  }

  #createLogo(src, alt) {
    const logo = document.createElement('img');
    logo.src = src;
    logo.alt = alt;
    return logo;
  }
}
