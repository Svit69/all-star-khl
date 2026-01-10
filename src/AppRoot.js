import { BaseComponent } from './core/BaseComponent.js';
import { HeaderLogos } from './components/HeaderLogos.js';
import { TitleBlock } from './components/TitleBlock.js';
import { SearchPanel } from './components/SearchPanel.js';
import { LogoCarousel } from './components/LogoCarousel.js';
import { PlayerCard } from './components/PlayerCard.js';
import { ClubCarouselController } from './services/ClubCarouselController.js';
import { AssetPathResolver } from './services/AssetPathResolver.js';
import { FuzzyPlayerSearch } from './services/FuzzyPlayerSearch.js';

export class AppRoot extends BaseComponent {
  #clubs; #assetResolver; #controller; #rosterProvider; #rosterNode; #feedbackTimer; #carouselHost;

  constructor(clubs, rosterProvider) {
    super('div');
    this.#clubs = clubs;
    this.#assetResolver = new AssetPathResolver('');
    this.#controller = new ClubCarouselController(clubs);
    this.#rosterProvider = rosterProvider;
    this.searchEngine = new FuzzyPlayerSearch(rosterProvider.players || []);
  }

  compose() {
    this.element.id = 'app-shell';
    this.element.innerHTML = '';
    const header = new HeaderLogos(this.#assetResolver.buildPath('roganov_logo.png'), this.#assetResolver.buildPath('khl_logo.png')).render();
    const title = new TitleBlock('УГАДАЙ, КТО', 'поедет на Матч Звезд КХЛ 2026').render();
    const progress = document.createElement('div');
    progress.className = 'guess-progress';
    progress.textContent = this.#buildGuessProgressLabel();
    const suggestions = document.createElement('div');
    suggestions.className = 'search-suggestions';
    const search = new SearchPanel('Нажмите и введите фамилию хоккеиста', (value) => this.#handleSearch(value, suggestions)).render();
    const feedback = document.createElement('div');
    feedback.className = 'answer-feedback';
    const roster = document.createElement('div');
    roster.className = 'roster';
    this.#rosterNode = roster;
    const carouselHost = document.createElement('div');
    carouselHost.className = 'carousel-host';
    this.#carouselHost = carouselHost;
    this.#renderCarousel(carouselHost);
    const patternArea = document.createElement('div');
    patternArea.className = 'pattern-area';
    patternArea.append(header, title, progress, search, suggestions, carouselHost);
    this.element.append(patternArea, roster);
    document.body.appendChild(feedback);
    this.#refreshRoster(roster, this.#controller.getActiveClub());
  }

  #refreshRoster(roster, club) {
    roster.innerHTML = '';
    const players = this.#rosterProvider.buildRosterForClub(club.name);
    players.forEach((player) => new PlayerCard(player, this.#assetResolver).mount(roster));
    const progress = this.element.querySelector('.guess-progress');
    if (progress) progress.textContent = this.#buildGuessProgressLabel();
  }

  #handleSearch(value, suggestionsNode) {
    const matches = this.searchEngine.search(value, 6);
    suggestionsNode.innerHTML = '';
    if (value.trim().length < 3) return;
    if (!matches.length) return;

    matches.forEach((match) => {
      const item = document.createElement('button');
      item.className = 'search-suggestion';
      item.type = 'button';
      item.textContent = match.displayName;
      item.addEventListener('click', () => {
        const isCorrect = this.#rosterProvider.isAllStarPlayer(match.id);
        if (isCorrect) this.#rosterProvider.markGuessedByPlayerId(match.id);
        this.#showAnswerFeedback(isCorrect);
        this.#reorderCompletedClubs();
        if (this.#rosterNode) this.#refreshRoster(this.#rosterNode, this.#controller.getActiveClub());
        suggestionsNode.innerHTML = '';
      });
      suggestionsNode.appendChild(item);
    });
  }

  #showAnswerFeedback(isCorrect) {
    const feedback = document.querySelector('.answer-feedback');
    if (!feedback) return;
    feedback.classList.remove('show', 'correct', 'incorrect');
    feedback.classList.add(isCorrect ? 'correct' : 'incorrect');
    void feedback.offsetWidth;
    feedback.classList.add('show');
    window.clearTimeout(this.#feedbackTimer);
    this.#feedbackTimer = window.setTimeout(() => {
      feedback.classList.remove('show', 'correct', 'incorrect');
    }, 1600);
  }

  #reorderCompletedClubs() {
    const completed = this.#clubs.filter((club) => this.#rosterProvider.isClubComplete(club.name)).map((club) => club.name);
    this.#controller.reorderByCompletion(completed);
    if (this.#carouselHost) this.#renderCarousel(this.#carouselHost);
  }

  #renderCarousel(host) {
    host.innerHTML = '';
    new LogoCarousel(
      this.#controller,
      this.#assetResolver,
      (club) => this.#refreshRoster(this.#rosterNode, club),
      (club) => this.#rosterProvider.isClubComplete(club.name)
    ).mount(host);
  }

  #buildGuessProgressLabel() {
    const total = this.#rosterProvider.participants ? this.#rosterProvider.participants.length : 0;
    const guessed = this.#rosterProvider.countGuessedParticipants ? this.#rosterProvider.countGuessedParticipants() : 0;
    return `${guessed}/${total}`;
  }
}
