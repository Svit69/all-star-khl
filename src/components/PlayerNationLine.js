import { BaseComponent } from '../core/BaseComponent.js';

export class PlayerNationLine extends BaseComponent {
  #nation; #flagSrc; #isGuessed; #hintRevealed = false; #assetResolver;
  constructor(nation, flagSrc, isGuessed = false, assetResolver) {
    super('span');
    this.#nation = nation || '—';
    this.#flagSrc = flagSrc || '';
    this.#isGuessed = Boolean(isGuessed);
    this.#assetResolver = assetResolver;
  }
  compose() {
    this.element.className = 'player-detail-line';
    this.element.innerHTML = '';
    const revealed = this.#isGuessed || this.#hintRevealed;
    if (revealed) {
      const value = document.createElement('span');
      value.className = 'detail-value';
      value.textContent = this.#nation;
      if (this.#flagSrc) value.prepend(this.#buildIcon(this.#flagSrc, 'Флаг'));
      this.element.append(value);
      return;
    }
    const label = document.createElement('span');
    label.className = 'label';
    label.textContent = 'СТРАНА';
    const hint = this.#buildHintButton(() => {
      this.#hintRevealed = true;
      this.compose();
    });
    this.element.append(label, hint);
  }
  #buildHintButton(onClick) {
    const hint = document.createElement('button');
    hint.type = 'button';
    hint.className = 'position-hint';
    hint.textContent = '?';
    hint.addEventListener('click', onClick);
    return hint;
  }
  #buildIcon(src, alt) {
    const icon = document.createElement('img');
    icon.className = 'detail-icon';
    icon.src = this.#assetResolver ? this.#assetResolver.buildPath(src) : src;
    icon.alt = alt;
    icon.loading = 'lazy';
    icon.draggable = false;
    return icon;
  }
}
