export class AllStarRosterProvider {
  #participantsByClub;
  #playersById;
  #clubsByName;
  #guessedByAllStarId;
  players;
  participants;

  static #normalizeClub(name = '') {
    const normalized = name.toLowerCase().replace(/\s+/g, ' ').trim().replace(/ё/g, 'е');
    const aliases = {
      'шанхайские драконы': 'дрэгонс',
      'кунлунь ред стар': 'куньлунь',
      'кунлунь редстар': 'куньлунь',
      'куньлунь ред стар': 'куньлунь'
    };
    return aliases[normalized] || normalized;
  }

  static #defaultVisualByClub(clubName) {
    const key = AllStarRosterProvider.#normalizeClub(clubName);
    const map = {
      'авангард': 'avangard_default.png',
      'автомобилист': 'avtomobilist_default.png',
      'адмирал': 'admiral_default.png',
      'ак барс': 'ак_bars_default.png',
      'амур': 'amur_default.png',
      'барыс': 'barys_default.png',
      'дрэгонс': 'dragons_default.png',
      'динамо минск': 'minsk_default.png',
      'динамо москва': 'dynamo_default.png',
      'лада': 'lada_default.png',
      'локомотив': 'lokomotiv_default.png',
      'металлург': 'metallurg_default.png',
      'нефтехимик': 'neftekhimik_default.png',
      'салават юлаев': 'salavat_default.png',
      'северсталь': 'severstal_default.png',
      'сибирь': 'sibir_default.png',
      'ска': 'ska_default.png',
      'сочи': 'sochi_default.png',
      'спартак': 'spartak_default.png',
      'торпедо': 'torpedo_default.png',
      'трактор': 'traktor_default.png',
      'цска': 'cska_default.png'
    };
    return map[key] || 'default.png';
  }

  static #normalizeId(id = '') {
    return (id || '').toLowerCase().trim();
  }

  constructor(participants, players, clubs, guesses = []) {
    this.#playersById = players.reduce((acc, player) => {
      const key = AllStarRosterProvider.#normalizeId(player.khl_player_id);
      acc[key] = player;
      return acc;
    }, {});
    this.#clubsByName = clubs.reduce((acc, club) => {
      const key = AllStarRosterProvider.#normalizeClub(club.name || '');
      acc[key] = club;
      return acc;
    }, {});
    this.#participantsByClub = participants.reduce((acc, participant) => {
      const playerKey = AllStarRosterProvider.#normalizeId(participant.khl_player_id);
      const player = this.#playersById[playerKey] || {};
      const clubName = player.club || participant.club || '';
      const clubKey = AllStarRosterProvider.#normalizeClub(clubName);
      if (!acc[clubKey]) acc[clubKey] = [];
      acc[clubKey].push(participant);
      return acc;
    }, {});
    this.#guessedByAllStarId = guesses.reduce((acc, guess) => {
      acc[guess.allstar_player_id] = true;
      return acc;
    }, {});
    this.players = players;
    this.participants = participants;
  }

  buildRosterForClub(clubName) {
    const clubKey = AllStarRosterProvider.#normalizeClub(clubName);
    const participants = this.#participantsByClub[clubKey] || [];
    const clubMeta = this.#clubsByName[clubKey] || {};
    return participants.map((participant) => {
      const player = this.#playersById[AllStarRosterProvider.#normalizeId(participant.khl_player_id)] || {};
      const isGuessed = Boolean(this.#guessedByAllStarId[participant.allstar_player_id]);
      const defaultVisualSrc = AllStarRosterProvider.#defaultVisualByClub(clubName);
      return {
        fullName: this.#composeFullName(player),
        position: player.position || '—',
        nation: player.nation || '?',
        clubLogo: clubMeta.logo,
        clubColor: clubMeta.accent || '#d11c2e',
        defaultVisualSrc,
        photoSrc: participant.photo_file ? `photo/${participant.photo_file}` : '',
        isGuessed
      };
    });
  }

  markGuessedByPlayerId(khlPlayerId) {
    const key = AllStarRosterProvider.#normalizeId(khlPlayerId);
    (this.participants || []).forEach((participant) => {
      if (AllStarRosterProvider.#normalizeId(participant.khl_player_id) === key) {
        this.#guessedByAllStarId[participant.allstar_player_id] = true;
      }
    });
  }

  countParticipantsByClub(clubName) {
    const clubKey = AllStarRosterProvider.#normalizeClub(clubName);
    return (this.#participantsByClub[clubKey] || []).length;
  }

  #composeFullName(player) {
    const first = player.first_name || 'Неизвестный';
    const last = player.last_name || 'Игрок';
    return `${first} ${last}`.trim();
  }
}
