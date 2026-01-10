import { CoachNotification } from '../components/CoachNotification.js';

export class CoachNotificationService {
  #view; #timer; #shownKeys = new Set();

  constructor() {
    this.#view = new CoachNotification();
  }

  mount(parent) {
    this.#view.mount(parent);
    return this;
  }

  showOnce(key, data) {
    if (this.#shownKeys.has(key)) return;
    this.#shownKeys.add(key);
    this.show(data);
  }

  show(data) {
    this.#view.setContent(data);
    this.#view.setVisible(true);
    window.clearTimeout(this.#timer);
    this.#timer = window.setTimeout(() => this.#view.setVisible(false), 4200);
  }
}
