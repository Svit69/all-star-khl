export class CsvDataLoader {
  static async load(url, encoding = 'utf-8') {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`Не удалось загрузить CSV: ${url}`);
    const buffer = await response.arrayBuffer();
    let text;
    try {
      text = new TextDecoder(encoding).decode(buffer);
    } catch (error) {
      console.warn(`TextDecoder ${encoding} не поддерживается, fallback на utf-8`);
      text = new TextDecoder('utf-8').decode(buffer);
    }
    return this.#parse(text);
  }

  static #parse(text) {
    const [headerLine, ...rows] = text.trim().split(/\r?\n/);
    const headers = headerLine.replace(/^\uFEFF/, '').split(',');
    return rows
      .filter(Boolean)
      .map((line) => line.split(','))
      .map((cells) =>
        headers.reduce((acc, key, idx) => {
          acc[key] = (cells[idx] || '').trim();
          return acc;
        }, {})
      );
  }
}
