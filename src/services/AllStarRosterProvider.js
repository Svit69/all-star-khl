export class AllStarRosterProvider {
  #participantsByClub;
  #playersById;
  #clubsByName;

  constructor(participants, players, clubs) {
    this.#participantsByClub = participants.reduce((acc, participant) => {
      const club = participant.club || '';
      if (!acc[club]) acc[club] = [];
      acc[club].push(participant);
      return acc;
    }, {});
    this.#playersById = players.reduce((acc, player) => {
      acc[player.khl_player_id] = player;
      return acc;
    }, {});
    this.#clubsByName = clubs.reduce((acc, club) => {
      acc[club.name] = club;
      return acc;
    }, {});
  }

  buildRosterForClub(clubName) {
    const participants = this.#participantsByClub[clubName] || [];
    const clubMeta = this.#clubsByName[clubName] || {};
    return participants.map((participant) => {
      const player = this.#playersById[participant.khl_player_id] || {};
      return {
        fullName: this.#composeFullName(player),
        position: player.position || '—',
        nation: player.nation || '?',
        clubLogo: clubMeta.logo,
        clubColor: clubMeta.accent || '#d11c2e'
      };
    });
  }

  #composeFullName(player) {
    const first = player.first_name || 'Неизвестный';
    const last = player.last_name || 'Игрок';
    return `${first} ${last}`.trim();
  }
}
