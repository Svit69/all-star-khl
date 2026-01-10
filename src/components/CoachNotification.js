import { BaseComponent } from '../core/BaseComponent.js';
import { buildCoachNotificationLayout } from './CoachNotificationLayout.js';

export class CoachNotification extends BaseComponent {
  #avatar; #name; #message;

  constructor() {
    super('div');
  }

  compose() {
    this.element.className = 'coach-notification';
    const layout = buildCoachNotificationLayout();
    this.element.append(layout.avatar, layout.content);
    this.#avatar = layout.avatar;
    this.#name = layout.name;
    this.#message = layout.message;
  }

  setContent({ avatarSrc, name, message }) {
    this.#avatar.src = avatarSrc;
    this.#avatar.alt = name;
    this.#name.textContent = name;
    this.#message.textContent = message;
  }

  setVisible(isVisible) {
    this.element.classList.toggle('show', isVisible);
  }
}
