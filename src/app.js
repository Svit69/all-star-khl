import { clubs } from './data/clubs.js';
import { AppRoot } from './AppRoot.js';
import { CsvDataLoader } from './services/CsvDataLoader.js';
import { AllStarRosterProvider } from './services/AllStarRosterProvider.js';

const mountNode = document.getElementById('app');

async function bootstrap() {
  const [players, allstars] = await Promise.all([
    CsvDataLoader.load('src/data/khl_players_clean.csv'),
    CsvDataLoader.load('src/data/allstar_participants_v2.csv')
  ]);
  const rosterProvider = new AllStarRosterProvider(allstars, players, clubs);
  new AppRoot(clubs, rosterProvider).mount(mountNode);
}

bootstrap().catch((error) => {
  console.error('Ошибка инициализации приложения', error);
});
