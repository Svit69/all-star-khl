import { BaseComponent } from '../core/BaseComponent.js';

export class PlayerAllStarLine extends BaseComponent {
  #team; #logoSrc; #isGuessed; #hintRevealed = false; #assetResolver; #playerId; #onHintUsed;
  constructor(team, logoSrc, isGuessed = false, assetResolver, playerId = null, onHintUsed = null) {
    super('span');
    this.#team = team || '-';
    this.#logoSrc = logoSrc || '';
    this.#isGuessed = Boolean(isGuessed);
    this.#assetResolver = assetResolver;
    this.#playerId = playerId;
    this.#onHintUsed = onHintUsed;
  }
  compose() {
    this.element.className = 'player-detail-line';
    this.element.innerHTML = '';
    const revealed = this.#isGuessed || this.#hintRevealed;
    if (revealed) {
      const value = document.createElement('span');
      value.className = 'detail-value';
      value.textContent = this.#team;
      if (this.#logoSrc) value.prepend(this.#buildIcon(this.#logoSrc, 'Команда МЗ'));
      this.element.append(value);
      return;
    }
    const label = document.createElement('span');
    label.className = 'label';
    label.textContent = 'КОМАНДА МЗ';
    const hint = this.#buildHintButton(() => {
      this.#hintRevealed = true;
      if (this.#onHintUsed) this.#onHintUsed(this.#playerId);
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
