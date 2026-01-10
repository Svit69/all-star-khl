export class ClubCarouselController {
  #clubs;
  #activeIndex;

  constructor(clubs) {
    this.#clubs = clubs;
    this.#activeIndex = 0;
  }

  setActiveByIndex(index) {
    if (index < 0 || index >= this.#clubs.length) return this.getActiveClub();
    this.#activeIndex = index;
    return this.getActiveClub();
  }

  setActiveByName(name) {
    const index = this.#clubs.findIndex((club) => club.name === name);
    return this.setActiveByIndex(index);
  }

  getActiveClub() {
    return this.#clubs[this.#activeIndex];
  }

  getClubs() {
    return this.#clubs;
  }

  reorderByCompletion(completedNames = []) {
    const completed = new Set(completedNames);
    const active = this.getActiveClub();
    const pending = this.#clubs.filter((club) => !completed.has(club.name));
    const done = this.#clubs.filter((club) => completed.has(club.name));
    this.#clubs = [...pending, ...done];
    this.#activeIndex = this.#clubs.findIndex((club) => club.name === active.name);
    if (this.#activeIndex < 0) this.#activeIndex = 0;
  }
}
