import { BaseComponent } from '../core/BaseComponent.js';

export class PlayerMeta extends BaseComponent {
  #fullName; #position; #nation; #isGuessed; #hintRevealed = false;

  constructor(fullName, position, nation, isGuessed = false) {
    super('div');
    this.#fullName = fullName || 'Неизвестный игрок';
    this.#position = position || '-';
    this.#nation = nation || '?';
    this.#isGuessed = Boolean(isGuessed);
  }

  compose() {
    this.element.className = 'player-meta';
    this.element.innerHTML = '';
    this.element.append(this.#buildName(), this.#buildDetails());
  }

  #buildName() {
    const name = document.createElement('p');
    name.className = 'player-name';
    name.textContent = this.#isGuessed ? this.#fullName : 'Угадай игрока';
    return name;
  }

  #buildDetails() {
    const details = document.createElement('div');
    details.className = 'player-details';
    details.append(this.#buildPositionLine(), this.#buildNationTag());
    return details;
  }

  #buildNationTag() {
    const tag = document.createElement('span');
    tag.className = 'nation-tag';
    const icon = document.createElement('span');
    icon.className = 'nation-icon';
    icon.textContent = this.#nation;
    const label = document.createElement('span');
    label.className = 'nation-label';
    label.textContent = 'СТРАНА';
    tag.append(icon, label);
    return tag;
  }

  #buildPositionLine() {
    const wrap = document.createElement('span');
    wrap.className = 'player-detail-line';

    const showReal = this.#isGuessed || this.#hintRevealed;
    if (showReal) {
      const valueNode = document.createElement('span');
      valueNode.className = 'position-value revealed';
      valueNode.textContent = this.#position;
      wrap.append(valueNode);
      return wrap;
    }

    const labelNode = document.createElement('span');
    labelNode.className = 'label';
    labelNode.textContent = 'ПОЗИЦИЯ';

    wrap.append(labelNode);

    const hintButton = document.createElement('button');
    hintButton.type = 'button';
    hintButton.className = 'position-hint';
    hintButton.textContent = '?';
    hintButton.addEventListener('click', () => {
      this.#hintRevealed = true;
      wrap.replaceChildren(this.#buildPositionLine());
    });
    wrap.append(hintButton);

    return wrap;
  }
}
