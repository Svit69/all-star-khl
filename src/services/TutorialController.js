import { TutorialOverlay } from '../components/TutorialOverlay.js';
import { TutorialStepRunner } from './TutorialStepRunner.js';

export class TutorialController {
  #steps; #index = 0; #overlay; #runner; #updateLayout; #blockScroll; #blockZoom;

  constructor(steps) {
    this.#steps = steps;
    this.#overlay = new TutorialOverlay();
    this.#runner = new TutorialStepRunner(this.#overlay, this.#steps, () => this.next(), () => this.skip());
    this.#updateLayout = () => this.#runner.runStep(this.#index);
    this.#blockScroll = (event) => event.preventDefault();
    this.#blockZoom = (event) => event.preventDefault();
  }

  mount(parent) {
    this.#overlay.mount(parent);
    return this;
  }

  start() {
    if (!this.#steps.length) return;
    this.#overlay.setVisible(true);
    this.#lockInteraction();
    this.#runner.runStep(this.#index);
    window.addEventListener('resize', this.#updateLayout);
    window.addEventListener('scroll', this.#updateLayout, true);
  }

  next() {
    this.#index += 1;
    if (this.#index >= this.#steps.length) return this.skip();
    this.#runner.runStep(this.#index);
  }

  skip() {
    this.#overlay.setVisible(false);
    this.#unlockInteraction();
    window.removeEventListener('resize', this.#updateLayout);
    window.removeEventListener('scroll', this.#updateLayout, true);
  }

  #lockInteraction() {
    document.body.classList.add('tutorial-lock');
    document.addEventListener('wheel', this.#blockScroll, { passive: false });
    document.addEventListener('touchmove', this.#blockScroll, { passive: false });
    document.addEventListener('gesturestart', this.#blockZoom, { passive: false });
    document.addEventListener('gesturechange', this.#blockZoom, { passive: false });
    document.addEventListener('gestureend', this.#blockZoom, { passive: false });
  }

  #unlockInteraction() {
    document.body.classList.remove('tutorial-lock');
    document.removeEventListener('wheel', this.#blockScroll);
    document.removeEventListener('touchmove', this.#blockScroll);
    document.removeEventListener('gesturestart', this.#blockZoom);
    document.removeEventListener('gesturechange', this.#blockZoom);
    document.removeEventListener('gestureend', this.#blockZoom);
  }

}
