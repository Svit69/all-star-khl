export class AssetPathResolver {
  #basePath;

  constructor(basePath = '') {
    this.#basePath = basePath;
  }

  buildPath(fileName) {
    const rawPath = `${this.#basePath}/${fileName}`.replace(/\/{2,}/g, '/');
    return encodeURI(rawPath);
  }
}
