import { BaseComponent } from '../core/BaseComponent.js';

export class PlayerPositionLine extends BaseComponent {
  #position; #isGuessed; #hintRevealed = false; #playerId; #onHintUsed;
  constructor(position, isGuessed = false, playerId = null, onHintUsed = null) {
    super('span');
    this.#position = position || '-';
    this.#isGuessed = Boolean(isGuessed);
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
      value.textContent = this.#position;
      this.element.append(value);
      return;
    }
    const label = document.createElement('span');
    label.className = 'label';
    label.textContent = 'ПОЗИЦИЯ';
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
}
