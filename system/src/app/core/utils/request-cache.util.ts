import { Injectable, afterNextRender } from "@angular/core";
import { SessionUtil } from "./session.util";

type CacheType = Map<string, Record<string, Record<string, unknown>>>;

@Injectable({
    providedIn: 'root'
  })
export class RequestCache {
    private _cache: CacheType = new Map();
    private _sessionKey = 'request-cache';

    constructor(private _session: SessionUtil) {
        afterNextRender(() =>{
            this._getOnSession();
        });
    }

    public set(url: string, method: string, response: unknown, params: Record<string, unknown> = {}) {
        const paramsString = JSON.stringify(params);
        this._cache.set(url, { [method]: { [paramsString]: response, criated_at: Date.now() } });
        this._saveOnSession();
    }

    public get<T>(url: string, method: string, params: Record<string, unknown> = {}): T | null {
        const paramsString = JSON.stringify(params)
        const cachedUrl = this._cache.get(url);
        if (!cachedUrl) return null;
        const cachedMethod = cachedUrl[method];
        if (!cachedMethod) return null;
        const cachedParams = cachedMethod[paramsString]
        return cachedParams ? cachedParams as T : null;
    }

    private _saveOnSession() {
        this._session.store(this._sessionKey, Array.from(this._cache.entries()));
    }

    private _getOnSession() {
        const savedOnSession = this._session.get<any>(this._sessionKey);
        if (savedOnSession) {
            this._cache = new Map(savedOnSession);
        }
    }
}
