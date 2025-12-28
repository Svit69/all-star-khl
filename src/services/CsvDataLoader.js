export class CsvDataLoader {
  static async load(url, encoding = 'utf-8') {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`Не удалось загрузить CSV: ${url}`);
    const buffer = await response.arrayBuffer();
    let text = this.#decode(buffer, encoding);
    if (text.includes('�')) {
      const fallback = this.#decode(buffer, 'windows-1251');
      if (!fallback.includes('�')) text = fallback;
    }
    return this.#parse(text);
  }

  static #decode(buffer, encoding) {
    try {
      return new TextDecoder(encoding).decode(buffer);
    } catch {
      return new TextDecoder('utf-8').decode(buffer);
    }
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
