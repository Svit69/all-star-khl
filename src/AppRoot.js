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
  #clubs; #assetResolver; #controller; #rosterProvider;

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
    const title = new TitleBlock('Матч всех звёзд КХЛ', 'Выбери клуб и посмотри, как выглядит карточка игрока.').render();
    const suggestions = document.createElement('div');
    suggestions.className = 'search-suggestions';
    const debugInfo = document.createElement('div');
    debugInfo.className = 'search-debug';
    const search = new SearchPanel('Найди игрока или клуб', (value) => this.#handleSearch(value, suggestions, debugInfo)).render();
    const roster = document.createElement('div');
    roster.className = 'roster';
    const carousel = new LogoCarousel(this.#controller, this.#assetResolver, (club) => this.#refreshRoster(roster, club)).render();
    this.element.append(header, title, search, suggestions, debugInfo, carousel, roster);
    this.#refreshRoster(roster, this.#controller.getActiveClub());
  }

  #refreshRoster(roster, club) {
    roster.innerHTML = '';
    const players = this.#rosterProvider.buildRosterForClub(club.name);
    players.forEach((player) => new PlayerCard(player, this.#assetResolver).mount(roster));
  }

  #handleSearch(value, suggestionsNode, debugNode) {
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
        suggestionsNode.innerHTML = '';
      });
      suggestionsNode.appendChild(item);
    });

    const club = this.#controller.getActiveClub();
    const count = this.#rosterProvider.countParticipantsByClub(club.name);
    debugNode.textContent = `Клуб ${club.name}: участников в allstar — ${count}`;
  }
}
