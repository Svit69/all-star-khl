import { BaseComponent } from './core/BaseComponent.js';
import { HeaderLogos } from './components/HeaderLogos.js';
import { TitleBlock } from './components/TitleBlock.js';
import { SearchPanel } from './components/SearchPanel.js';
import { LogoCarousel } from './components/LogoCarousel.js';
import { PlayerCard } from './components/PlayerCard.js';
import { ClubCarouselController } from './services/ClubCarouselController.js';
import { AssetPathResolver } from './services/AssetPathResolver.js';

export class AppRoot extends BaseComponent {
  #clubs; #assetResolver; #controller; #rosterProvider;

  constructor(clubs, rosterProvider) {
    super('div');
    this.#clubs = clubs;
    this.#assetResolver = new AssetPathResolver('');
    this.#controller = new ClubCarouselController(clubs);
    this.#rosterProvider = rosterProvider;
  }

  compose() {
    this.element.id = 'app-shell';
    this.element.innerHTML = '';
    const header = new HeaderLogos(this.#assetResolver.buildPath('roganov_logo.png'), this.#assetResolver.buildPath('khl_logo.png')).render();
    const title = new TitleBlock('Матч всех звёзд КХЛ', 'Выбери клуб и посмотри, как выглядит карточка игрока.').render();
    const search = new SearchPanel('Найди игрока или клуб').render();
    const roster = document.createElement('div');
    roster.className = 'roster';
    const carousel = new LogoCarousel(this.#controller, this.#assetResolver, (club) => this.#refreshRoster(roster, club)).render();
    this.element.append(header, title, search, carousel, roster);
    this.#refreshRoster(roster, this.#controller.getActiveClub());
  }

  #refreshRoster(roster, club) {
    roster.innerHTML = '';
    const players = this.#rosterProvider.buildRosterForClub(club.name);
    players.forEach((player) => new PlayerCard(player, this.#assetResolver).mount(roster));
  }
}
