import { clubs } from './data/clubs.js';
import { AppRoot } from './AppRoot.js';

const mountNode = document.getElementById('app');
new AppRoot(clubs).mount(mountNode);
