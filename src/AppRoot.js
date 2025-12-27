import { BaseComponent } from './core/BaseComponent.js';
import { HeaderLogos } from './components/HeaderLogos.js';
import { TitleBlock } from './components/TitleBlock.js';
import { SearchPanel } from './components/SearchPanel.js';
import { LogoCarousel } from './components/LogoCarousel.js';
import { PlayerCard } from './components/PlayerCard.js';
import { ClubCarouselController } from './services/ClubCarouselController.js';
import { AssetPathResolver } from './services/AssetPathResolver.js';
import { PlaceholderRosterFactory } from './services/PlaceholderRosterFactory.js';

export class AppRoot extends BaseComponent {
  #clubs; #assetResolver; #controller; #rosterFactory;

  constructor(clubs) {
    super('div');
    this.#clubs = clubs;
    this.#assetResolver = new AssetPathResolver('');
    this.#controller = new ClubCarouselController(clubs);
    this.#rosterFactory = new PlaceholderRosterFactory();
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
    this.#rosterFactory.createForClub(club).forEach((player) =>
      new PlayerCard(player, this.#assetResolver).mount(roster)
    );
  }
}
