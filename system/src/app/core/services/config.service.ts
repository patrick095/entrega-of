import { Injectable, afterNextRender } from '@angular/core';
import { StorageUtil } from '../utils/storage.util';
import { IConfig } from '../interfaces/config.interface';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  private _gitUrl: string;
  private _gitToken: string;
  private _gitApiVersion: number;
  private _useCache: boolean;
  private _saveStorage: boolean;
  private _storageKey = 'config';

  constructor(private _storage: StorageUtil) {
    afterNextRender(() => {
      const savedConfig = this._storage.get<IConfig>(this._storageKey);
      if (savedConfig) {
        const { gitUrl, gitToken, gitApiVersion, useCache, saveStorage } = savedConfig;
        this._gitUrl = gitUrl;
        this._gitToken = gitToken;
        this._gitApiVersion = gitApiVersion;
        this._useCache = useCache;
        this._saveStorage = saveStorage ?? false;
        return;
      }
    });
    this._gitUrl = '';
    this._gitToken = '';
    this._gitApiVersion = 4;
    this._useCache = true;
    this._saveStorage = true;
  }

  public saveConfig(config: IConfig): void {
    if (config) {
      const { gitUrl, gitToken, gitApiVersion, useCache, saveStorage } = config;
      this._gitUrl = gitUrl
      this._gitToken = gitToken;
      this._gitApiVersion = gitApiVersion;
      this._useCache = useCache;
      this._saveStorage = saveStorage ?? false;

      if (saveStorage) {
        this._storage.store(this._storageKey, config);
      }
    }
  }

  public getGitUrl(): string {
    return this._gitUrl;
  }

  public getGitToken(): string {
    return this._gitToken;
  }

  public getGitApiVersion(): number {
    return this._gitApiVersion;
  }

  public setGitApiVersion(version: number) {
    this._gitApiVersion = version;
    if (this._saveStorage) {
      this._storage.store(this._storageKey, {
        gitUrl: this._gitUrl,
        gitToken: this._gitToken,
        gitApiVersion: version,
        useCache: this._useCache,
        saveStorage: this._saveStorage
      } as IConfig);
    }
  }

  public useCache(): boolean {
    return this._useCache;
  }

  public getAllConfig(): IConfig {
    return {
      gitUrl: this._gitUrl,
      gitToken: this._gitToken,
      gitApiVersion: this._gitApiVersion,
      useCache: this._useCache,
      saveStorage: this._saveStorage
    }
  }
}
