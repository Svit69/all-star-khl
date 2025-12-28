const normalize = (value) =>
  (value || '')
    .toLowerCase()
    .replace(/\s+/g, ' ')
    .trim()
    .replace(/ё/g, 'е');

const buildNgrams = (text, n = 3) => {
  if (text.length === 0) return [];
  const padded = ` ${text} `;
  const grams = [];
  for (let i = 0; i <= padded.length - n; i += 1) {
    grams.push(padded.slice(i, i + n));
  }
  return grams;
};

const scoreNgramDice = (query, target) => {
  const q = new Set(buildNgrams(query));
  const t = new Set(buildNgrams(target));
  if (q.size === 0 || t.size === 0) return 0;
  let intersect = 0;
  q.forEach((g) => {
    if (t.has(g)) intersect += 1;
  });
  return (2 * intersect) / (q.size + t.size);
};

export class FuzzyPlayerSearch {
  #index;

  constructor(players) {
    this.#index = players.map((p) => {
      const first = p.first_name || '';
      const last = p.last_name || '';
      const lastNorm = p.last_name_normalized || normalize(last);
      const normalized = normalize(`${lastNorm} ${first}`);
      return {
        id: p.khl_player_id,
        displayName: `${first} ${last}`.trim(),
        normalized,
        raw: p
      };
    });
  }

  search(query, limit = 5) {
    const normalizedQuery = normalize(query);
    if (normalizedQuery.length < 3) return [];
    return this.#index
      .map((item) => ({
        item,
        score: scoreNgramDice(normalizedQuery, item.normalized)
      }))
      .filter(({ score }) => score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, limit)
      .map(({ item }) => item);
  }
}
