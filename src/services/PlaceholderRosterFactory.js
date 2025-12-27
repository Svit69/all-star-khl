export class PlaceholderRosterFactory {
  createForClub(club, size = 4) {
    return Array.from({ length: size }, (_, index) => ({
      fullName: `Игрок состава #${index + 1}`,
      position: '—',
      nation: '?',
      clubLogo: club.logo,
      clubColor: club.accent
    }));
  }
}
