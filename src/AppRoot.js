import { BaseComponent } from './core/BaseComponent.js';
import { HeaderLogos } from './components/HeaderLogos.js';
import { TitleBlock } from './components/TitleBlock.js';
import { SearchPanel } from './components/SearchPanel.js';
import { LogoCarousel } from './components/LogoCarousel.js';
import { PlayerCard } from './components/PlayerCard.js';
import { ClubCarouselController } from './services/ClubCarouselController.js';
import { AssetPathResolver } from './services/AssetPathResolver.js';

export class AppRoot extends BaseComponent {
  constructor(clubs) {
    super('div'); this.clubs = clubs; this.assetResolver = new AssetPathResolver(''); this.controller = new ClubCarouselController(clubs);
  }

  compose() {
    this.element.id = 'app-shell';
    this.element.innerHTML = '';
    const header = new HeaderLogos(this.assetResolver.buildPath('roganov_logo.png'), this.assetResolver.buildPath('khl_logo.png')).render();
    const title = new TitleBlock('УГАДАЙ', 'кто поедет на матч звезд КХЛ').render();
    const search = new SearchPanel('Роман Горбунов').render();
    const roster = document.createElement('div'); roster.className = 'roster';
    const carousel = new LogoCarousel(this.controller, this.assetResolver, (club) => this.#refreshRoster(roster, club)).render();
    this.element.append(header, title, search, carousel, roster);
    this.#refreshRoster(roster, this.controller.getActiveClub());
  }

  #refreshRoster(roster, club) {
    roster.innerHTML = '';
    this.#buildPlaceholderRoster(club).forEach((player) => new PlayerCard(player, this.assetResolver).mount(roster));
  }

  #buildPlaceholderRoster(club) {
    return Array.from({ length: 4 }, () => ({
      fullName: 'Имя Фамилия',
      position: '—',
      nation: '?',
      clubLogo: club.logo,
      clubColor: club.accent
    }));
  }
}
